const path = require("path");
module.exports = () => {
  return {
    entry: {
      index : ["@babel/polyfill", "./client/src/app.js"],
    },
    output: {
      publicPath: "/scripts/",
      path: path.join(__dirname, "client/public/scripts"),
      filename: "[name]-bundle.js",
      chunkFilename: '[name].bundle.js'
    },  
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: [
                "@babel/plugin-syntax-dynamic-import"
              ]
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

