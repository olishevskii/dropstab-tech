const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleLoader = (mode) => mode === 'production' ?
  MiniCssExtractPlugin.loader : "style-loader";

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
      template: 'src/index.html'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
});