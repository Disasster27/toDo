const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : {
		app : './src/index.js',
	},
	output : {
		path : path.resolve( __dirname, './dist' ),
		filename : '[name].js',
		publicPath : 'dist/',
	},
	devServer : {
		overlay : true,
	},
	devtool: 'source-map',
	module : {
		rules : [
			{
				test : /\.js$/,
				loader : 'babel-loader',
				exclude : '/node_modules/',
			},
			{
				test : /\.scss$/,
				exclude : '/node_modules/',
				use : [                              // параметры в массив можно передавать в виде {} со своими свойствами
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader : 'css-loader',
						options : { sourceMap : true }
					},
					{
						loader : 'postcss-loader' ,
						options : { sourceMap : true, config : { path : 'src/postcss.config.js' } }
					}, 
					{
					    loader: 'sass-loader',
					    options: { sourceMap: true },
					},
				]
			},
			{
				test : /\.css$/,
				exclude : '/node_modules/',
				use : [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader : 'css-loader',
						options : { sourceMap : true }
					},
					{
						loader : 'postcss-loader' ,
						options : { sourceMap : true, config : { path : 'src/postcss.config.js' } }
					}, 
				],
			},
			{
			  test: /\.(gif|png|jpe?g|svg)$/i,
			  use: 'file-loader'
			},
		]
	},
	
	plugins: [
		new MiniCssExtractPlugin( { 
			filename : '[name].css', // вместо [name] будет подставлено значение из entry ( app : './src/index.js' ) app!
		} ),
		new HtmlWebpackPlugin( {
			template: './src/index.html',
      		filename: 'index.html',
			inject: false,
		} ),
	],
};