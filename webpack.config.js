const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    download: './src/download.js',
    metadata: './src/metadata.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    openPage: 'download.html',
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
