const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.config')


baseConfig.entry = ['webpack-hot-middleware/client', './main.js']

baseConfig.devServer = {
  contentBase: path.join(__dirname, '../dist'),
  compress: true,
  hot: true,
  open: true,
  // proxy: {
  //   '*': 'http://localhost:3000',
  // },
}


baseConfig.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

]


module.exports = baseConfig;