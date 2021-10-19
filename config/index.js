/*
 * @Author: your name
 * @Date: 2021-07-15 17:37:27
 * @LastEditTime: 2021-07-15 17:41:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /training_examination/config/index.js
 */

module.exports = {
  proxyTable: {
    '/api': {
      target: 'https://kfkukecrm.kukewang.com',
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      secure: true, // https下设置为true
      pathRewrite: { '^/api': '' },
    },
  },
}
