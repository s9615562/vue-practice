module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
<<<<<<< HEAD
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  plugins: ['vue'],
=======
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "airbnb-base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".vue"],
      },
    },
    "import/core-modules": ["vite", "@vitejs/plugin-vue"],
  },
  plugins: ["vue"],
>>>>>>> d79d8da07321306dc9b69eaec5980c83fc553445
  rules: {},
};
