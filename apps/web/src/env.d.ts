/// <reference types="vite/client" />

interface ImportMetaEnvironment {
  readonly VITA_GOERLI_URL: string;
  readonly VITE_GOERLI_CONTRACT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
