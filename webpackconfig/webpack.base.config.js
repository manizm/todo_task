const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const raw = require('raw-loader')
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
    publicPath:'/'
  },
  
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        include: CLIENT_DIR
      },
      {
        test: /\.(css)$/,
        use: 'autoprefixer'
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
        test: /\.html?$/,
        use: 'raw-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: 'file-loader' }
        ]
      }
    ]
  },

  plugins: prodPlugins.plugins
  
}

module.exports = webpackConfig;