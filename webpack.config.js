const path = require('path');
const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '../Sites/mls2/'
  },
  entry: {
    index: './src/Ui-kit/index.pug',
    headers_footers: [
      './src/Ui-kit/headers-and-footers.pug',
      './src/Ui-kit/headers-and-footers.scss'
    ],
    colors_type: [
      './src/Ui-kit/colors-and-type.pug',
      './src/Ui-kit/colors-and-type.scss'
    ]
  },
  output: {
    path: path.join(__dirname, '../Sites/mls2/Ui-kit/'),
    publicPath: '/'
  },
  plugins: [
    new PugPlugin(),
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
