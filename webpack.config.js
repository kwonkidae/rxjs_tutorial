
const path = require('path');
module.exports = {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }
};
