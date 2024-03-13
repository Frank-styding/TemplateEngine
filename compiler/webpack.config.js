const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './export.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})]
  },
  output: {
    scriptType: 'text/javascript',
    filename: 'templateEngine.js',
    path: path.resolve(__dirname, 'dist'),
    library: '$',
    libraryTarget: 'umd'
  }
}
