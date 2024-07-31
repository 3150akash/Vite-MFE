const { override } = require("customize-cra");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
  const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = override((config) => {
  config.output.publicPath = "auto";
  config.experiments = {
    outputModule: true,
  };
  const deps = require("../package.json").dependencies;
  // console.log(config.plugins)
  config.plugins.shift()
  console.log(config.plugins)
  config.plugins = [
    ...config.plugins,
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "./public/indexModular.html",
          scriptLoading: "module"
        },
        // isEnvProduction
        //   ? {
        //       minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeRedundantAttributes: true,
        //         useShortDoctype: true,
        //         removeEmptyAttributes: true,
        //         removeStyleLinkTypeAttributes: true,
        //         keepClosingSlash: true,
        //         minifyJS: true,
        //         minifyCSS: true,
        //         minifyURLs: true,
        //       },
        //     }
        //   : undefined
      )
    ),
    new ModuleFederationPlugin({
      name: "webpack-host",
      filename: "remoteEntry.js",
      library: { type: "module" },
      remotes: {
        "vite_Remote": `promise import("http://localhost:5001/assets/remoteEntry.js")`,
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ];
  console.log(config.plugins)

  return config;
});
