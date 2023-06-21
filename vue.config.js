'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,//开启反向代理
    proxy: { //proxy中可以有多种匹配，使实现多种跨域
      '/demo': {
        target: 'http://music.163.com',
        changeOrigin: true, // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为，即：如果接口跨域，需要进行这个参数配置true
        secure: false,  //忽略https安全提示
        ws: false, // 是否代理websocket,
        pathRewrite: {
          // 重写路径，替换请求地址中的指定路径
          '^/demo': '' // 将请求地址中的/api替换为空，也就是请求地址中不会包含/api/就需要这么做 
          //虽然浏览器上请求的地址还是这样http://localhost:9528/demo/api/search/get/web，但是实际请求的是http://music.163.com/api/search/get/web
        },
        logLevel:'debug' //打印代理后的地址
      },
      // '/bmcapi': {
      //   target: 'https://test-cg.ppio.cloud', // 代理的目标地址为 HTTPS 协议,如果ingress禁止了cors设置，就需要用nginx反向代理去请求下，做到域名替换，这里配置无用。
      //   changeOrigin: true,
      //   // secure: true ,
      //   // ws: true, 
      //   // pathRewrite: {
      //   //   '^/bmcapi': '' 
      //   // },
      //   logLevel:'debug',
      // },
 
      
      '/resolv': {
        target: 'https://118.89.204.198/resolv', // https跨域代理示例
        changeOrigin: true,
        secure: true ,
        ws: false, 
        pathRewrite: {
          '/resolv': '' 
        },
        logLevel:'debug'
      },

      //多种跨域eg:  接口地址有重叠地址时，将匹配度低的放在后面
      // proxy: {
      //     '/api/action|/api/action2': {
      //         target: 'http://192.191.1.3',
      //         changeOrigin: true,
      //         ws: true,
      //         secure: false
      //     },
      //     '/api': {
      //         target: 'http://192.191.1.2',
      //         changeOrigin: true,
      //         ws: true,
      //         secure: false
      //     },
      //     '/': {
      //         target: 'http://192.191.1.1',
      //         changeOrigin: true,
      //         ws: true,
      //         secure: false
      //     }
      // }
    
    },
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
