<<<<<<< HEAD
const webpack = require ('webpack')

const isProd = process.env.NODE_ENV === 'production'

const config = isProd ? require ('./webpackconfig/webpack.base.config') : require('./webpackconfig/webpack.dev.config')
=======
const config = require('./webpack.config.base.js')
>>>>>>> master

module.exports = config