# 1、集成开发
## 1.1、引入sdk
通过script标签引入：`<script src="https://bossfs.sammbo.com/web-assets/js/shanliao-sdk/0.0.1/thunbuim-web-sdk.js"></script>`。可以使用全局对象window.SIM获取sdk的引用。


## 1.2、浏览器兼容情况
IE浏览器要求IE10及以上才支持；Chrome浏览器需要40版本以上内核支持；Firefox浏览器建议50版本以上。
当浏览器不兼容时，[`SIM.init(config, onSuccess, onFail)`](https://coop-uat.sammbo.com/imsdk-doc/index.html?page=1017#SIM(base)..init)函数会返回一个错误`SCOKET_ENOTSUP（-1000）`。[错误码列表](https://coop-uat.sammbo.com/imsdk-doc/index.html?page=1015)

# 2、请求回调和通知回调
SIM与服务端交互分为主动和被动两种。

主动交互（登录、发送消息等）通常有具体的方法，交互结果通过回调函数返回。如：[`SIM.login(loginInfo, onSuccess, onFail)`](https://coop-uat.sammbo.com/imsdk-doc/)

被动交互（接收消息、系统通知等）通常为服务端主动推送，需要通过[`addEventListener(event, callback)`]()方法注册监听函数。需要释放时可以通过[`removeEventListener(event, callback)`](https://coop-uat.sammbo.com/imsdk-doc/)方法释放。如：

```
let onMsg = (msg) => {
	console.log('新消息: ', msg);
};
window.SIM.addEventListener('msg', onMsg); // 监听新消息

window.SIM.removeEventListener('msg', onMsg); // 释放监听事件
```
