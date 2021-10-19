/*
 * @Author: your name
 * @Date: 2021-07-15 09:04:32
 * @LastEditTime: 2021-07-15 17:39:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /training_examination/vue.config.js
 */
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
  },
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     // "^/api": {
  //     //   target: "http://dzjc.ruantechnology.com/api/",
  //     //   ws: true,
  //     //   changeOrigin: true
  //     // }

  //     // '^/api': {
  //     //   target: 'https://www.zhihu.com',
  //     //   ws: true,
  //     //   // pathRewrite: { '^/api': '' },
  //     //   changeOrigin: true,
  //     // },
  //     '/api': {
  //       target: 'https://kfkukecrm.kukewang.com',
  //       ws: true,
  //       pathRewrite: { '^/api': '' },
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //     },
  //   },

  //   disableHostCheck: true,
  // },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ['*'],
          }),
        ],
      },
    },
  },
}
