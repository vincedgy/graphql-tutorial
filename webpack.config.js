const nodeExternals = require('webpack-node-externals')
///const PrettierPlugin = require('prettier-webpack-plugin')

module.exports = {
  entry: './dist/index.js',
  ///plugins: [new PrettierPlugin()],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
          //  , 'eslint-loader'
        ],
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.mjs', '.json', '.gql', '.graphql']
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: __dirname + '/dist-prod',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
}
