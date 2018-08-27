const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: dev ? 'development' : 'production',
	entry: './src/index.jsx',
	output: {
		filename: dev ? '[name].js' : '[name].[chunkhash:5].js',
	},
	devtool: 'source-map',
	module: {
		rules: [{
			test: /.js[x]?$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		},
		{
			test: /\.s?[ac]ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: dev ? '[path][name].[ext]' : '[sha512:hash:base64:10].[ext]',
					outputPath: dev ? '' : 'images/'
				}
			}]
		}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: dev ? '[name].css' : '[name].[hash:5].css',
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
};
