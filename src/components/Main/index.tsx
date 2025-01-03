import { Editor } from "@bytemd/react";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import mdLocales from "bytemd/locales/zh_Hans.json";
import gfmLocales from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import mathLocales from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocales from "@bytemd/plugin-mermaid/locales/zh_Hans.json";

import { debounce } from "@/utils";
import { uploadImagesHelper } from "./uploadHelper";
import codeCopyPlugin from "./codeCopyPlugin";

import type { MainProps } from "@/types";

const PLUGINS = [
  frontmatter(),
  gemoji(),
  gfm({
    locale: gfmLocales,
  }),
  highlight(),
  math({
    locale: mathLocales,
    katexOptions: { output: "html" },
  }),
  mediumZoom(),
  mermaid({
    locale: mermaidLocales,
  }),
  codeCopyPlugin(),
].filter((x) => x);

const Main = (props: MainProps) => {
  const { content, onContentChange } = props;

  const onUploadImages = (fileList: File[]) => {
    return uploadImagesHelper(fileList);
  };

  const onChange = debounce((value: string) => {
    onContentChange(value);
  }, 300);

  return (
    <Editor
      value={content}
      mode="auto"
      plugins={PLUGINS}
      locale={mdLocales}
      uploadImages={onUploadImages}
      onChange={onChange}
      editorConfig={{
        lineNumbers: true,
      }}
    />
  );
};

export default Main;
