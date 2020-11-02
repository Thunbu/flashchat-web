# 快速开始

## 1.1 安装依赖

> 注意源， 如果安装错误，试试切换npm 源试一下

### 1.1.1 使用 yarn ```推荐``` ： 

```yarn install```

### 1.1.2 使用 npm

```npm install```

## 1.2 运行

```yarn start```  

```npm start```

## 1.3 注意事项

### 1.3.1 浏览器兼容情况
IE浏览器要求IE10及以上才支持；Chrome浏览器需要40版本以上内核支持；Firefox浏览器建议50版本以上。
当浏览器不兼容时，[`SIM.init(config, onSuccess, onFail)`](https://coop-uat.sammbo.com/imsdk-doc/index.html?page=1017)
函数会返回一个错误`SCOKET_ENOTSUP（-1000）`。[错误码列表](https://coop-uat.sammbo.com/imsdk-doc/index.html?page=1015)

# 1.4 配置更改

配置文件：
> config/webpack.config.dev.js

修改 ```setting.proxy``` 更改代理实现

> src/modules/ChatRoot/config.ts

修改 ```__DefaultWSLocation``` 为ws的地址  
修改 ```__DefaultSDKHTTPLocation``` 对应webpack代理路径

> src/modules/LoginRoot/config.ts

修改 ```RequestBaseURL``` 对应webpack代理路径
