import toast from "react-hot-toast";
import config from "@/config";

import { SettledImg } from "@/types";

function getTimestamp(): string {
  const now = new Date();

  const format = (value: number, length: number): string =>
    value.toString().padStart(length, "0");

  const datePart = `${now.getFullYear()}${format(
    now.getMonth() + 1,
    2
  )}${format(now.getDate(), 2)}`;

  const timePart = `${format(now.getHours(), 2)}${format(
    now.getMinutes(),
    2
  )}${format(now.getSeconds(), 2)}`;

  const millisPart = format(now.getMilliseconds(), 3);

  return `${datePart}${timePart}${millisPart}`;
}

function getFileExt(fileName: string): string {
  if (!fileName.trim()) return "";

  const parts = fileName.split(".");

  return parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : "";
}

function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

async function uploadImageToGitHub(file: File): Promise<SettledImg> {
  const originFileName = file.name;

  const newFileName = `${getTimestamp()}${getFileExt(file.name)}`;

  const settled = {
    fileName: originFileName,
    pathName: newFileName,
  };

  const url = `https://api.github.com/repos/${config.GITHUB_REPO}/contents/img/${newFileName}`;

  try {
    const content = await convertImageToBase64(file);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload by MD`,
        content,
      }),
    });

    if (!response.ok) {
      throw settled;
    }

    return settled;
  } catch {
    throw settled;
  }
}

function uploadImagesSequentially(files: File[]) {
  const completedResult: SettledImg[] = [];

  const failedResult: SettledImg[] = [];

  return files
    .reduce((promiseChain: Promise<unknown>, file) => {
      return promiseChain.then(() => {
        return uploadImageToGitHub(file)
          .then((data) => completedResult.push(data))
          .catch((reason) => failedResult.push(reason));
      });
    }, Promise.resolve())
    .then(() => [completedResult, failedResult]);
}

export function uploadImagesHelper(fileList: File[]) {
  const imgMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
  ];

  const files = fileList.filter((file) => imgMimeTypes.includes(file.type));

  if (files.length === 0) {
    const message = "选择的文件中没有图片";
    toast.error(message);
    return Promise.reject(message);
  }

  if (files.length > 10) {
    const message = "最多只能选择 10 个图片";
    toast.error(message);
    return Promise.reject(message);
  }

  const toastLoadingId = toast.loading("图片上传中");

  return uploadImagesSequentially(files).then(
    ([completedResult, failedResult]) => {
      toast.dismiss(toastLoadingId);

      const renderImgs = () => {
        return completedResult.map((img) => ({
          alt: img.fileName,
          url: `https://cdn.jsdelivr.net/gh/${config.GITHUB_REPO}/img/${img.pathName}`,
        }));
      };

      if (completedResult.length === 0) {
        const message = "图片上传失败，请重新上传";
        toast.error(message);
        return Promise.reject(message);
      } else if (completedResult.length > 0 && failedResult.length > 0) {
        let message = `以下图片上传失败，请重新上传：`;
        completedResult.forEach(
          (item) => (message += `\n${item.fileName} 上传失败`)
        );

        toast.success("部分图片上传完成");

        toast.error(message, {
          duration: 5000,
          style: {
            borderRadius: "0px",
          },
        });
        return renderImgs();
      } else {
        toast.success("图片上传成功");
        return renderImgs();
      }
    }
  );
}
