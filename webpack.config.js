const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const THIS_DIR = path.join(__dirname, './');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          isProd
            ? {
              loader: MiniCssExtractPlugin.loader,
            }
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.m\.\w+$/i,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              implementation: require("less"),
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.gif$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
    ],
  },
  resolve: {
    alias: {
      src: THIS_DIR.concat('src/'),
    },
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json']
  },
  entry: {
    main: THIS_DIR.concat('src/index.js')
  },
  output: {
    path: THIS_DIR.concat('build/'),
    publicPath: '/',
    filename: 'js/[name]_[hash].js',
    chunkFilename: 'js/[name]_[chunkhash].js',
  },
  devServer: {
    hot: true,
    contentBase: THIS_DIR.concat('src/'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: THIS_DIR.concat('src/demo/index.html'),
      favicon: THIS_DIR.concat('src/demo/logo.png'),
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  watch: true,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
}
