let path = require('path')

const webPackConfig = {
	entry: {
		javascript: './src/App.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.js'
	},
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        pathRewrite: {'^/api' : ''},
        secure: false
      }
    }
  },
	module: {
		loaders: [{
				test: /jsx?$/,
				exclude: /node_modules/,
				loader: ['react-hot-loader', 'babel-loader']
			},
			{
				test: /\.html$/,
				loader: "file-loader"
			},
			{
				test: /css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
       test: /\.svg/,
       loader: 'svg-url-loader'
     }
		]
	}
}
module.exports = webPackConfig
