let path = require('path')
const webpack= require('webpack')

module.exports = {
  entry: './main.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'fixter.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
}
