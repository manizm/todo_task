const webpack = require ('webpack')

const isProd = process.env.NODE_ENV === 'production'

const config = isProd ? require ('./webpackconfig/webpack.base.config') : require('./webpackconfig/webpack.dev.config')

module.exports = config