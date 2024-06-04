/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API: string;
  readonly VITE_AUTH_USER_ID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
