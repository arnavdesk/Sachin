const path = require("path");
module.exports = () => {
  return {
    entry: {
      index : ["@babel/polyfill", "./client/src/app.js"],
    },
    output: {
      path: path.join(__dirname, "client/public/scripts"),
      filename: "[name]-bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"]
            }
          }
        }
      ]
    },
    devServer: {
      open: true,
      port: 3000,
      proxy: {
        "/api": "http://localhost:8080/"
      },
      contentBase : path.resolve(__dirname, "client/public"),
      publicPath : "/scripts/",
      historyApiFallback : true
    }
  };
};

