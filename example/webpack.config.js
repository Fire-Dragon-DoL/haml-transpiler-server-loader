var webpack                   = require("webpack");
var path                      = require("path");

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

var config = {
  baseUrl: "http://localhost:8090"
};

var webpackConfig = {
  devtool: "source-map",
  debug:   true,
  context: root("src"),
  entry: {
    "bundle": "./index.js"
  },
  output: {
    pathinfo:          true,
    path:              root("build"),
    filename:          "[name].js",
    sourceMapFilename: "[name].map",
    publicPath:        config.baseUrl + "/"
  },
  target: "web",
  externals: {},
  module: {
    loaders: [
      {
        test: /\.haml$/,
        loader: "raw-loader!haml-transpiler-server-loader",
        exclude: [
          /\.html\.haml$/,
          /node_modules/
        ]
      },
      {
        test: /\.html\.haml$/,
        loader: "file-loader?name=[path][name]!haml-transpiler-server-loader",
        exclude: [
          /node_modules/
        ]
      }
    ]
  },
  resolve: {
    root: [
      root("src")
    ],
    modulesDirectories: [
      root("src"),
      root("node_modules")
    ],
    extensions: ['', '.jsx', '.js', '.json']
  },
  devServer: {
    port:               8090,
    colors:             true,
    progress:           true,
    historyApiFallback: true,
    hot:                false,
    publicPath:         config.baseUrl + "/",
    watchOptions:       { aggregateTimeout: 1000, poll: 1000 }
  }
};

module.exports = webpackConfig;
