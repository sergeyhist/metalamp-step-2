const path = require('path');
const fs = require('fs');
const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let uiKitPages = [];
fs.readdirSync('./src/Ui-kit/').forEach(file => file.includes('.pug') ? uiKitPages.push(file) : '');


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  entry: './src/index.js',
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  plugins: [
    ...uiKitPages.map(page => new HtmlWebpackPlugin ({
      template: './src/Ui-kit/'+page,
      filename: 'Ui-kit-'+page.replace('.pug','.html')
    })),
    new HtmlWebpackPlugin ({
      template: './src/index.pug',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css'
    }),
    new CleanWebpackPlugin()
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
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash].[ext]'
        }
      }
    ]
  }
}
