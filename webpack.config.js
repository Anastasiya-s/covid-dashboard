const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/js/index.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.mp3$/,
        type: 'asset',
        loader: 'file-loader',
        options: {
          outputPath: 'assets/sounds',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Covid-19-Dashboard',
      filename: 'index.html',
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets'),
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './src'),
    open: true,
    compress: true,
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  externals: {
    moment: 'moment',
}
};
