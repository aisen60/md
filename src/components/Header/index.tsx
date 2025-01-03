import React from "react";
import Theme from "./Theme";
import Share from "./Share";
import Download from "./Download";

import type { HeaderProps } from "@/types";

const Header: React.FC<HeaderProps> = (props) => {
  const { colorMode, title, content, onTitleChange, onThemeChange } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    onTitleChange(value);
  };

  return (
    <nav className="nav">
      <input type="text" className="input" value={title} onChange={onChange} />
      <div className="links">
        <Theme colorMode={colorMode} onThemeChange={onThemeChange} />
        <Share />
        <Download title={title} content={content} />
      </div>
    </nav>
  );
};

export default Header;
