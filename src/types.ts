export type AppData = {
  time: number;
  title: string;
  data: string;
};

export type BaseProps = {
  title: string;
  content: string;
};

export type HeaderProps = BaseProps & {
  onTitleChange: (value: string) => void;
};

export type DownloadProps = BaseProps;

export type MainProps = {
  content: string;
  onContentChange: (value: string) => void;
};

export type SettledImg = {
  fileName: string;
  pathName: string;
};
