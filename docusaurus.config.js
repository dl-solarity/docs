// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  plugins: [
    "docusaurus-plugin-sass",
    [
      "./src/plugins/docusaurus-plugin-sass-resources-loader",
      { hoistUseStatements: true, resources: ["./src/styles/_resources.scss"] },
    ],
  ],

  title: "Solarity",
  tagline: "The solidity lib",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://docs.solarity.dev/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
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
          editUrl: "https://github.com/dl-solarity/docs/tree/dev/",
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
      image: "img/docusaurus-social-card.jpg",
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
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started/Overview",
              },
              {
                label: "Reference",
                to: "/docs/reference/contracts/Overview",
              },
            ],
          },
          {
            title: "Community",
            items: [],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/dl-solarity/solidity-lib",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Solarity. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
