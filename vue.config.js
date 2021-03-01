const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/website/puzzle/annual-report",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  configureWebpack: {
    name: "谜案馆年度机密文件",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
};
