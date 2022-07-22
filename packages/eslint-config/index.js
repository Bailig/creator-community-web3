module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/extensions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          props: {
            properties: false,
          },
          env: {
            environment: false,
          },
        },
      },
    ],
  },
  overrides: [
    {
      files: ["**/containers/*.tsx"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
        "func-names": "off",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
