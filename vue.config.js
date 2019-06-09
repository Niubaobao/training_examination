const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://dzjc.ruantechnology.com/api/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ["*"]
          })
        ]
      }
    }
  }
};
