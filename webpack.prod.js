const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),

    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: './html/partials/analytics.html',
      location: 'head',
      priority: 'high',
      template_filename: '*',
    }),
  ],
})
