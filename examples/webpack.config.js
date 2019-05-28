const path = require('path');
const VuePlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    bundle: ['./examples/main.js'],
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve('./examples/'),
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        shared: {
          name: 'shared',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    new VuePlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.html'
    })
  ]
};
