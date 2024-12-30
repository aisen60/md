import React from "react";
import toast from "react-hot-toast";
import { copyToClipboard } from "@/utils";

const Share: React.FC = () => {
  const copyLink = () => {
    copyToClipboard(location.href);
    toast.success("URL 已复制到剪贴板");
  };

  return (
    <button title="复制分享链接" onClick={copyLink}>
      <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51l6.83 3.98" />
          <path d="M15.41 6.51l-6.82 3.98" />
        </g>
      </svg>
    </button>
  );
};

export default Share;
