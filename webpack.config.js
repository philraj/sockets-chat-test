module.exports = {
  entry: __dirname + '/src/js/client.js',
  output: {
    filename: __dirname + '/src/js/client-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'sourcemap'
}
