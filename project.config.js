module.exports = {
  env: "production",
  // env: "uat",
  // env: "development",
  proxy: {
    // 业务接口代理
    "/DSSP-PROD": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    },
    // 登录接口代理
    "/DLSP-PROD": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    },
    "/DSSP-TEST": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    },
    "/DLSP-TEST": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    },
    "/DSSP-DEV": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    },
    "/DLSP-DEV": {
      "target": "https://developer.sammbo.com/",
      "changeOrigin": true
    }
  },
}