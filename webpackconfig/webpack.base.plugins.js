const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const raw = require('raw-loader')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/* Set true if NODE_ENV argument passed to npm script is "production" */
const varisProd = process.env.NODE_ENV === 'production'

/* 
** Setting Extract text plugin for css hot module reloading
** differently on production and dev environment 
*/
const varcssDev = ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
const varcssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'postcss-loader', 'sass-loader'],
  publicPath: './'
})

// plguin object - we export this to base webpack config file
const plugobj = {

  cssConfig: varisProd ? varcssProd : varcssDev,
  
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: true,
    //   test: /\.js($&#124;\?)/i,
    //   sourceMap: true
    // }),

    new HtmlWebpackPlugin({
      title: 'My App',
      template: './index.html',
      inject: true
    }),
    
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !varisProd,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {discardComments: {removeAll: true}},
      canPrint: true
    })
  ]
}
// console.log(plugobj.cssConfig)

module.exports = plugobj