// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();

const darkCodeTheme = require("./prism-custom-theme");

/** @type {import('@docusaurus/types').Config} */
const config = {
  plugins: [
    "docusaurus-plugin-sass",
    "./src/plugins/docusaurus-plugin-font-preload",
    [
      "./src/plugins/docusaurus-plugin-sass-resources-loader",
      { hoistUseStatements: true, resources: "./src/styles/_resources.scss" },
    ],
  ],

  title: "Solarity",
  tagline: "Solidity-Oriented Development Tooling",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: process.env.URL || "",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/dl-solarity/docs/",
        },
        theme: {
          customCss: require.resolve("./src/styles/app.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
      },
      image: "img/og-image.png",
      navbar: {
        title: "Solarity",
        logo: {
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docGettingStarted",
            position: "right",
            label: "Getting Started",
          },
          {
            type: "docSidebar",
            sidebarId: "docReference",
            position: "right",
            label: "Reference",
          },
          {
            href: "https://github.com/dl-solarity/solidity-lib",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            html: "License: MIT",
          },
        ],
      },
      prism: {
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity"],
      },
    }),
};

module.exports = config;
