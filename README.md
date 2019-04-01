# Sachin - The Greatest

This app shows you why Sachin Tendulkar is the greatest cricket of all times, by using interactive stories. It uses `react.js` for front-end, `node.js` for back-end and `mongodb` for storing data. The final version of the application is hosted on `Heroku`, see [here.](https://sachin-the-greatest.herokuapp.com/)
## Introduction

### Development
The application runs on `node.js` and `mongodb` so before cloning the repository and starting the development server make sure your computer has [node.js](https://nodejs.org/en/download/) and [mongodb](https://www.mongodb.com/download-center) installed on it. 

### Quick Start 
```bash
# Clone the repository 
git clone https://github.com/invalidtoken/Sachin

# Go inside the directory
cd Sachin

# Install dependencies
npm install

# Parse and Analyse CSV file and store the analysed data into mongodb
npm run parser 

# Start development server 
npm run dev

# Build for production
npm run build 

# Start the server 
npm run start
```
### Documentation
#### File Structure
All the Node.js/Express source code in inside `src` directory and all the React.js source code is inside the `client\src\` directory. The static assets like  images, icons, css files are inside the `client\public\` directory. 

#### Why parsing and analysing the data ?
The data is present in a CSV file, so first we must parse the data and then do some analysis on it. The CSV file contains various important details of every single ODI match that Sachin has ever played. That is a lot of data so rather than storing the data directly to the database, we must filter the data and arrange it in an effective way, here we  are analyse and storing the data on yearly basis. 
Now basically we are planing to make a back-end API that will serve the front-end with all of this data. So rather than storing the data in a file system we must store it in a database so I chose MongoDB for this task. 
`npm run parser` command does all of this and then logs a message that tells whether the operation was successfull or not.
Note that this operation is highly sensitive to the format of the CSV file. 

- The first line of the file must contain headers. 
- All the values that represents a numeric number like batting_score, wickets, runs_conceded, etc must either be a string container number or just the string `-`
- The opponent value must be a string in the given format `v Country Name`. 
- The date value must me in the give format, `DD MMM YYYY`. This is very important, a lot of future operations depends on the date value. 
- The match_result value must only be  one of these three values `won`, `loss`, `n/a`.
- The batting_innings value  must either be `1st` or `2nd`.

### Webpack
[Webpack](https://webpack.js.org/)  is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

[webpack.config.js](https://webpack.js.org/configuration/)  file is used to describe the configurations required for webpack. Below is the webpack.config.js file which I am using.

``` JavaScript
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
```

1. **entry** :  ./client/src/app.js` is where the application starts executing and webpack starts bundling. Note: @babel/polyfill is added to support async/await.
2. **output path and filename:**  absolute path to the target directory and the filename for the bundled output.
3. **module loaders:**  Module loaders are transformations that are applied on the source code of a module. We pass all the js file through  [babel-loader](https://github.com/babel/babel-loader)  to transform JSX to Javascript.
4. **Dev Server:**  Configurations for the webpack-dev-server which will be described in coming section.

### Webpack dev server

[Webpack dev server](https://webpack.js.org/configuration/dev-server/)  is used along with webpack. It provides a development server that provides live reloading for the client side code. This should be used for development only.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server which is given below.
```javascript
devServer: {
   port: 3000,
   open: true,
   proxy: {
      "/api": "http://localhost:8080"
   },
   constantBase: path.resolve(__dirname, "client/public"),
   publicPath: "/scripts/",
   historyApiFallback:true
}
```
[**port**](https://webpack.js.org/configuration/dev-server/#devserver-port)  specifies the Webpack dev server to listen on this particular port (3000 in this case). When  [**open**](https://webpack.js.org/configuration/dev-server/#devserver-open)  is set to true, it will automatically open the home page on startup.  [Proxying](https://webpack.js.org/configuration/dev-server/#devserver-proxy)  URLs can be useful when we have a separate API backend development server and we want to send API requests on the same domain. In our case, we have a Node.js/Express backend where we want to send the API requests to.

The directory given to **contantBase** is served as home directory by webpack dev server, **publicPath** gives the relative path to the directory, inside which the virtual JavaScript files are served by webpack dev server and **historyApiFallback** make sure that `client/public/index.html` file is served on every route. 

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently)  is used to run multiple commands concurrently. I am using it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands used.
```bash
"client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
"server": "nodemon src/server/index.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
```