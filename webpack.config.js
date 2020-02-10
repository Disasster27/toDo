const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	entry : {
		app : './src/index.js',
	},
	output : {
		path : path.resolve( __dirname, './dist' ),
		filename : 'main.js',
		publicPath : 'dist/',
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				loader : 'babel-loader',
				exclude : '/node_modules/',
			},
			{
				test : /\.scss$/,
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
				]
			},
			{
				test : /\.css$/,
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
		]
	},
	devServer : {
		overlay : true,
	},
	plugins: [
		new MiniCssExtractPlugin( { 
			filename : '[name].css', // вместо [name] будет подставлено значение из entry ( app : './src/index.js' ) app!
		} )
	],
};