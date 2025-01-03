import toast from "react-hot-toast";
import { copyToClipboard } from "@/utils";

import type { BytemdPlugin } from "bytemd";

export default function codeCopyPlugin(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const preTags = markdownBody.querySelectorAll("pre");

      preTags.forEach((preTag) => {
        // 创建一个 <div> 元素来包裹 <pre> 标签
        const wrapper = document.createElement("div");
        wrapper.classList.add("pre-code-container");

        preTag.parentNode?.insertBefore(wrapper, preTag);

        wrapper.appendChild(preTag);

        const clipboardNode = document.createElement("div");
        clipboardNode.className = "action-container";
        clipboardNode.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" class="action-icon" style="display: inline-block;">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>

          <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" class="action-icon" style="display: none;">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
          `;
        clipboardNode.addEventListener("click", () => {
          const checkStatus = wrapper.getAttribute("data-check");
          if (checkStatus !== "false") return;

          wrapper.setAttribute("data-check", "true");

          const svgNodes = wrapper.querySelectorAll("svg");
          svgNodes[0].style.display = "none";
          svgNodes[1].style.display = "inline-block";

          setTimeout(() => {
            svgNodes[0].style.display = "inline-block";
            svgNodes[1].style.display = "none";
            wrapper.setAttribute("data-check", "false");
          }, 1500);

          const codeNode = wrapper.querySelector("code") as HTMLElement;
          copyToClipboard(codeNode.innerText);
          toast.success("复制成功");
        });

        wrapper.appendChild(clipboardNode);

        let timerId: unknown;

        const scrollTimeout = 100;

        preTag.addEventListener("scroll", () => {
          clearTimeout(timerId as number);

          clipboardNode.style.display = "none";

          timerId = setTimeout(() => {
            clipboardNode.style.display = "flex";
          }, scrollTimeout);
        });
      });
    },
  };
}
