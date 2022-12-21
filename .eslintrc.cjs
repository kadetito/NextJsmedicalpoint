module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  rules: {
    "no-undef": "off",
    "no-extra-boolean-cast": "off",
    "@typescript-eslint/no-var-requires": "off",
  },

  root: true,
};
