module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": "off",
    "no-console": "off",
    "no-debugger": "off",
    "vue/multi-word-component-names": "off",
    "padded-blocks": "off",
    "no-unused-vars": "off",
    "no-unused-function": "off",
    "no-multiple-empty-lines": "off",
    "eol-last": "off",
  },
};
