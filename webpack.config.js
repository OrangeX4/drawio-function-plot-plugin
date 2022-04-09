const path = require('path');

module.exports = {
  entry: './function-plot-plugin.js',
  output: {
    filename: 'function-plot-plugin.webpack.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map'
};