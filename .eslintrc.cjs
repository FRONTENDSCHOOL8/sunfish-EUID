module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-var": "error",
    "no-unreachable": "error",
    "max-depth": ["error", { max: 2 }],
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "off",
    "no-console": "off",
  },
}
