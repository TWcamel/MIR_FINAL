const path = require('path')

const HtmlwebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoader = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolvePath = inputPath => path.join(__dirname, inputPath)

let webpackConfig = {
  mode: isProd ? 'production' : 'development',
  stats: 'minimal',
  entry: {
    app: [resolvePath('./src/main.js')]
  },
  output: {
    filename: '[name].[hash:8].js',
    path: isProd ? resolvePath('../vue-dist') : resolvePath('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolvePath('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, 
              outputPath: 'images/' 
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoader(),

    new HtmlwebpackPlugin({
      template: resolvePath('index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

if (isProd) {
  webpackConfig.plugins.push(
    new CleanWebpackPlugin(resolvePath('../vue-dist'))
  )
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  )
}

module.exports = webpackConfig
