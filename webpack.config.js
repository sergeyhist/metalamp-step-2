const path = require('path');
const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  entry: [
    './src/Ui-kit/headers_footers.pug',
    './src/Ui-kit/headers_footers.scss'
  ],
  output: {
    path: path.join(__dirname, '../Sites/mls2/'),
    publicPath: '/'
  },
  plugins: [
    new PugPlugin({
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        type: 'asset/resource'
      }
    ]
  }
}
