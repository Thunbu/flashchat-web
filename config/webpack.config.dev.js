const baseConfig = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');
const deleteFolderRecursive = require('./tools').deleteFolderRecursive;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css分离打包

const setting = {
	contentBase: path.resolve(__dirname, '../src/pages'),
	hot: false,
	port: 8091,
	open: true,
	host : 'localhost',
	overlay: {
		warnings: true,
		errors: true
	},
	proxy: {
		'/DSSP-PROD': {
			// target: 'https://sdkdev-gateway.sammbo.com:8777/', // dev
			// target: 'https://sdktest-gateway.sammbo.com:18777/', // test
			target: 'http://developer.sammbo.com/', // prod
			changeOrigin: true
		},
		'/DLSP-PROD': {
			target: 'http://developer.sammbo.com/', // prod
			changeOrigin: true
		},
	}
};
baseConfig.devtool = '#eval-source-map';
baseConfig.output.publicPath = '/';
// baseConfig.module.rules.push({
// 	test: /\.tsx?$/,
// 	use: "ts-loader",
// });
baseConfig.module.rules.push({
	test: /\.less$/,
	use: [
		'style-loader',
		'css-loader',
		{
			loader: "less-loader",
			options: {sourceMap: true,javascriptEnabled: true}
		}
	]
});
baseConfig.module.rules.push({
	test: /\.less$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader
		},
		{
			loader: "css-loader",
		},
		{
			loader: "less-loader",
			options: {sourceMap: true,javascriptEnabled: true}
		},
	]
});
baseConfig.plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
baseConfig.devServer = setting; 					// 配置服务以及代理
baseConfig.devtool = 'cheap-module-eval-source-map'; 	// 生成source map 以供调试
baseConfig.plugins.push(
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"development"'
	})
);

console.log('');
console.log('');
console.log('               ----------------------------------------');
console.log('               ----------------------------------------');
console.log('               ----------------------------------------');
console.log('               ----------------DEV---------------------');
console.log('               ----------------------------------------');
console.log('               ----------------------------------------');
console.log('               ----------------------------------------');
console.log('');
console.log('');
console.log('');
console.log('');
console.log('');
deleteFolderRecursive('./dist');

module.exports = baseConfig;
