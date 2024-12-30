import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { utoa, atou } from "@/utils";
import "@/app.css";

import type { AppData } from "./types";

const DEFAULT_TITLE = "Markdown Playground";

const DEFAULT_CONTENT = "";

function App() {
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const [content, setContent] = useState(DEFAULT_CONTENT);

  const isInitialMount = useRef(true);

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  const onContentChange = (value: string) => {
    setContent(value);
  };

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
          style: {
            borderRadius: "20px",
            fontSize: "14px",
          },
        }}
      />
      <Header title={title} content={content} onTitleChange={onTitleChange} />
      <Main content={content} onContentChange={onContentChange} />
    </>
  );
}

export default App;
