export type AppData = {
  time: number;
  title: string;
  data: string;
};

export type AppColorMode = "light" | "dark";

type BaseProps = {
  title: string;
  content: string;
};

export type HeaderProps = BaseProps & {
  onTitleChange: (value: string) => void;
} & ThemeProps;

export type DownloadProps = BaseProps;

export type ThemeProps = {
  colorMode: AppColorMode;
  onThemeChange: () => void;
};

export type MainProps = {
  content: string;
  onContentChange: (value: string) => void;
};

export type SettledImg = {
  fileName: string;
  pathName: string;
};
