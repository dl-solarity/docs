const FontPreloadPlugin = require("webpack-font-preload-plugin");

module.exports = function () {
  return {
    name: "docusaurus-plugin-font-preload",
    configureWebpack() {
      return {
        plugins: [new FontPreloadPlugin()],
      };
    },
  };
};
