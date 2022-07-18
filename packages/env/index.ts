import "dotenv/config";

const { GOERLI_URL, ACCOUNT_PRIVATE_KEY } = process.env;

export const getEnv = () => {
  if (GOERLI_URL === undefined || ACCOUNT_PRIVATE_KEY === undefined) {
    throw new Error(
      "Environment variables (GOERLI_URL, ACCOUNT_PRIVATE_KEY) must be provided."
    );
  }
  return {
    GOERLI_URL,
    ACCOUNT_PRIVATE_KEY,
  };
};
