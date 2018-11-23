const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

let optimization = {
  minimizer: [],
};

let outputFileName = 'konami.js';
let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  optimization.minimizer.push(new UglifyJsPlugin());
  outputFileName = 'konami.min.js';
  mode = 'production';
}

const config = {
  entry: path.resolve(__dirname, 'src', 'Konami.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFileName,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[path][name].[ext]?[hash]',
							limit: 15000,
						}
					}
				]
			}
    ],
  },
  optimization,
  mode,
};

module.exports = config;
