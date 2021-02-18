const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    home: './src/home/home.js',
    download: './src/download/download.js',
    metadata: './src/metadata/metadata.js',
    header: './src/shared/header.js',
    contact: './src/contact/contact.js',
    ftprsync: './src/ftprsync/ftprsync.js',
    help: './src/help/help.js',
    webservices: './src/webservices/webservices.js',
    opendata: './src/opendata/opendata.js',
    footer: './src/shared/footer.js',
    accessibility: './src/accessibility/accessibility.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?url=false'],
      },

      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
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
  plugins: [
    new CopyPlugin([
      {
        from: 'html/skeleton/*.html',
        flatten: true,
      },
      {
        from: 'html/content/*.html',
        flatten: true,
      },
      {
        from: 'img',
      },
    ]),
  ],
}
