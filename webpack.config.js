var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index.js',
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2017', 'react', 'stage-2'],
						},
					},
				],
			},
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192',
			},
		],
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
};
