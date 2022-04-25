const path = require('path');
const fs = require('fs');
const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let uiKitPages = [];
let allEntries = {
  main: './src/index.js'
};
fs.readdirSync('./src/ui-kit/').forEach(folder => {
  fs.readdirSync('./src/ui-kit/'+folder).forEach(file =>
    file.includes('.pug') ? uiKitPages.push('./src/ui-kit/'+folder+'/'+file) : file.includes('.js') ? allEntries[folder] = './src/ui-kit/'+folder+'/'+file : ''
  );
});

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  entry: allEntries,
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, './src/common.blocks/'),
      assets: path.resolve(__dirname, './src/assets/')
    }
  },
  plugins: [
    ...uiKitPages.map(page => new HtmlWebpackPlugin ({
      template: page,
      filename: page.split('/')[4].replace('.pug','.html'),
      chunks: ['main', page.split('/')[3]]
    })),
    new HtmlWebpackPlugin ({
      template: './src/index.pug',
      filename: 'index.html',
      chunks: ['main']
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
        test: /\.(s[ac]ss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2|woff|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash].[ext]'
        }
      }
    ]
  }
}
