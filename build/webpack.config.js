/* eslint-disable no-undef */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

export default {
    "mode": "development",
    "entry": "src/main/index.js",
    "output": {
        "path": __dirname+'/static',
        "filename": "[name].[chunkhash:8].js"
    },
    "resolve": {
      "extensions": ['.js', '.vue', '.json'],
      "alias": {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolvePath('src'),
      }
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": "eslint-loader"
            },
            {
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "include": [resolve('src')],
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true,
                        "appendTsSuffixTo": [/.vue$/],
                    }
                }
            },
            {
              "test": /\.vue$/,
              "use": 'vue-loader',
            },
            {
                test: /\.(sa|c)ss$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'images/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'media/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
              }
            }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify('development'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'app.css'
      }),
      new CopyWebpackPlugin([{
        from: resolvePath('static'),
        to: resolvePath('www/static'),
      }]),
    ],
  
}
