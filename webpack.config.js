const path = require('path');
const fs = require('fs');
const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let uiKitPages = [];
let uiKitEntries = {
  main: './src/index.js'
};
fs.readdirSync('./src/Ui-kit/').forEach(folder => {
  fs.readdirSync('./src/Ui-kit/'+folder).forEach(file => 
    file.includes('.pug') ? uiKitPages.push('./src/Ui-kit/'+folder+'/'+file) : file.includes('.js') ? uiKitEntries[folder] = './src/Ui-kit/'+folder+'/'+file : ''
  );
});

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  entry: uiKitEntries,
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  plugins: [
    ...uiKitPages.map(page => new HtmlWebpackPlugin ({
      template: page,
      filename: page.replace('.pug','.html').replace('./src/','').replace(/\//g,'-'),
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
