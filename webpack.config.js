const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleLoader = (mode) => mode === 'production' ?
  MiniCssExtractPlugin.loader : 'style-loader';

module.exports = (env, argv) => ({
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          getStyleLoader(argv.mode),
          {loader: 'css-loader', options: {modules: true}},
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html',
      favicon: 'src/assets/favicon.png',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: { index: '/', disableDotRule: true },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      pages: path.resolve(__dirname, 'src/pages'),
      types: path.resolve(__dirname, 'src/types'),
      utils: path.resolve(__dirname, 'src/utils'),
    }
  },
});