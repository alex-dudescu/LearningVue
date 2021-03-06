var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
var htmlWebpackPlugin = require("html-webpack-plugin");
var cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          require.resolve("bootstrap-vue")
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$':       path.resolve(__dirname, "./node_modules/vue/dist/vue.esm.js"),
      '~':          path.resolve(__dirname, "./node_modules/"),
      'API':        path.resolve(__dirname, "./src/api/"),
      'Assets':     path.resolve(__dirname, "./src/assets/"),
      'Components': path.resolve(__dirname, "./src/components/"),
      'Router':     path.resolve(__dirname, "./src/router/"),
      'Store':      path.resolve(__dirname, "./src/store"),
      'UI':         path.resolve(__dirname, "./src/components/UI"),
      'Utils':      path.resolve(__dirname, "./src/utils/"),
      'Views':      path.resolve(__dirname, "./src/views/")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new cleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'Learning vue',
      showErrors: true
    })
  ]);
}

if (process.env.NODE_ENV === "test") {
  module.exports.externals = [nodeExternals()];
  module.exports.devtool = "inline-cheap-module-source-map";
  module.exports.output = (module.exports.output || {}).concat({
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
  });
}
