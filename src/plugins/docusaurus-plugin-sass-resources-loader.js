module.exports = function (_, options = {}) {
  return {
    name: "docusaurus-plugin-sass-resources-loader",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.s[ca]ss$/,
              use: [{ loader: "sass-resources-loader", options }],
            },
          ],
        },
      };
    },
  };
};
