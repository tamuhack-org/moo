// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  tabWidth: 4,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 80,
  bracketSpacing: true,
  semi: true,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
