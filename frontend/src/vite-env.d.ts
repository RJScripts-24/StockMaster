/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_USE_MOCK_DATA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
