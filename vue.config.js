const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    // 端口号的配置
    port:1024  
  },
  transpileDependencies: true
})
