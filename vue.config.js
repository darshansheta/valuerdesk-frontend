const path = require('path')
const webpack = require('webpack')

module.exports = {
    runtimeCompiler: true,
    /*chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'));
    },*/
  configureWebpack: {
    /*resolve: {
      alias: require('./aliases.config').webpack
    },*/
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  outputDir: path.resolve(__dirname, '../public/static'),
  publicPath:'static',
  indexPath: path.resolve(__dirname, '../resources/views/layouts/vue.blade.php'),
  devServer: {
    proxy: {
    // proxy all requests starting with /api to jsonplaceholder
    '/api': {
      target: 'http://dev.valuer.local/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
}
  }
}