const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const varisProd = process.env.NODE_ENV === 'production'

baseConfig.entry = ['webpack-hot-middleware/client', './main.js']
console.log(baseConfig.module)
baseConfig.devServer = {
  contentBase: process.cwd(),
  compress: true,
  hot: true,
  inline: true,
  open: true,
  proxy: {
    '*': 'http://localhost:3000',
  }
}


baseConfig.plugins = [
  new HtmlWebpackPlugin({
    title: 'My App',
    template: './index.html',
    hash: true,
    inject: true
  }),
  
  // new ExtractTextPlugin({
  //   filename: 'style.css',
  //   disable: !varisProd,
  //   allChunks: true
  // }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),

]
console.log(baseConfig.plugins)

module.exports = baseConfig;