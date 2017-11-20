var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index.js',
	],
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react', 'stage-2'],
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
		],
	},
	output: {
		path: __dirname + '/public',
		publicPath: '/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './public',
		hot: true,
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
};
