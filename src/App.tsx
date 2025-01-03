import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { useColorMode } from "@/hooks";
import { utoa, atou } from "@/utils";
import "@/styles/index.scss";

import type { AppData } from "./types";

const DEFAULT_TITLE = "Markdown Playground";

const DEFAULT_CONTENT = "";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [title, setTitle] = useState(DEFAULT_TITLE);

  const [content, setContent] = useState(DEFAULT_CONTENT);

  const isInitialMount = useRef(true);

  const onThemeChange = () => {
    toggleColorMode();
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  const onContentChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const htmlNode = document.querySelector("html") as HTMLHtmlElement;
    const editor = document.querySelector(".CodeMirror") as HTMLDivElement;

    if (colorMode === "light") {
      htmlNode.classList.remove("dark-theme");
      editor.classList.remove("cm-s-dark");
      editor.classList.add("cm-s-light");
    }
    if (colorMode === "dark") {
      htmlNode.classList.add("dark-theme");
      editor.classList.remove("cm-s-light");
      editor.classList.add("cm-s-dark");
    }
  }, [colorMode]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const appData: AppData = {
        time: new Date().getTime(),
        title,
        data: content,
      };
      const hash = "#" + utoa(JSON.stringify(appData));
      history.replaceState({}, "", hash);
    }
  }, [title, content]);

  useEffect(() => {
    let initialTitle, initialContent;

    try {
      const hash = location.hash.slice(1);
      const appData: AppData = JSON.parse(atou(hash));
      initialTitle = appData.title;
      initialContent = appData.data;
    } catch {
      initialTitle = DEFAULT_TITLE;
      initialContent = DEFAULT_CONTENT;
    }

    setTitle(initialTitle);

    setContent(initialContent);

    isInitialMount.current = false;
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          className: "md-toast",
        }}
      />
      <Header
        colorMode={colorMode}
        title={title}
        content={content}
        onTitleChange={onTitleChange}
        onThemeChange={onThemeChange}
      />
      <Main content={content} onContentChange={onContentChange} />
    </>
  );
}

export default App;
