import React from "react";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

import type { DownloadProps } from "@/types";

const Download: React.FC<DownloadProps> = (props) => {
  const { title, content } = props;

  const onDownload = () => {
    const blob = new Blob([content], {
      type: "text/markdown",
    });
    saveAs(blob, title + ".md");
    toast.success("下载完成");
  };

  return (
    <button title="下载文件" onClick={onDownload}>
      <svg width="1.7em" height="1.7em" viewBox="0 0 24 24" fill="currentColor">
        <g>
          <rect x="4" y="18" width="16" height="2" rx="1" ry="1" />
          <rect
            x="3"
            y="17"
            width="4"
            height="2"
            rx="1"
            ry="1"
            transform="rotate(-90 5 18)"
          />
          <rect
            x="17"
            y="17"
            width="4"
            height="2"
            rx="1"
            ry="1"
            transform="rotate(-90 19 18)"
          />
          <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39a1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z" />
          <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
        </g>
      </svg>
    </button>
  );
};

export default Download;
