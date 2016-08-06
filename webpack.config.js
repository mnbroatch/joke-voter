const path = require('path');
const webpack = require('webpack');

let config = {}

if (process.env.NODE_ENV === "development") {
  config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      'bootstrap-loader',
      './src/main.jsx',
      './src/css/style.css',
    ],
    target: 'web',
    output: {
      path: path.resolve(__dirname + '/build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: './src',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          excludes: ['node_modules']
        },
        {
          test: /\.css$/,
          loaders: [
            'classnames',
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss',
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style',
            'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss',
            'sass',
          ],
        },
        {
          test: /\.(woff2?|png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url?limit=10000",
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          loader: 'file'
        },
        // Bootstrap 3
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
      ]
    }
  }
} else {
  config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'bootstrap-loader',
      './src/main.jsx',
      './src/css/style.css',
    ],
    target: 'web',
    output: {
      path: path.resolve(__dirname + '/build'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          excludes: ['node_modules']
        },
        {
          test: /\.css$/,
          loaders: [
            'classnames',
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss',
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style',
            'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
            'postcss',
            'sass',
          ],
        },
        {
          test: /\.(woff2?|png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url?limit=10000",
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          loader: 'file'
        },
        // Bootstrap 3
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
      ]
    }
  }

}

module.exports = config;
