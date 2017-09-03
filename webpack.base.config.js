const webpack = require('webpack')
const path = require('path')

const prodPlugins = require('./webpack.base.plugins')


/* Directory Paths */
const DIST_DIR = path.resolve(__dirname, '../dist')
const CLIENT_DIR = path.resolve(__dirname, '../src')



const webpackConfig = {
  context: CLIENT_DIR,
  
  entry: ['./main.js'],
  
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: prodPlugins.cssConfig
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=[name].[ext]&outputPath=images/'
      },
      {
        test:/\.html$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: prodPlugins.plugins
  
}

module.exports = webpackConfig;