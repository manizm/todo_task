const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')


/* Set true if NODE_ENV argument passed to npm script is "production" */
const varisProd = process.env.NODE_ENV === 'production'

/* 
** Setting Extract text plugin for css hot module reloading
** differently on production and dev environment 
*/
const varcssDev = ['style-loader', 'css-loader', 'sass-loader']
const varcssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: './'
})

// plguin object - we export this to base webpack config file
const plugobj = {

  cssConfig: varisProd ? varcssProd : varcssDev,
  
  plugins: [
    
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './index.html',
      hash: true
    }),
    
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !varisProd,
      allChunks: true
    }),
    
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, '../src/*.html'))
    })
  
  ]
}


module.exports = plugobj