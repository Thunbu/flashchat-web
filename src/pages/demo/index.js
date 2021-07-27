import SIM from "thunbu-im-sdk";
import Config from './config.json';

let ResultConfig = Config;
let SIMInstance;

if (localStorage.getItem('config')) {
	ResultConfig = JSON.parse(localStorage.getItem('config'));
} else {
	localStorage.setItem('config', JSON.stringify(Config));
}

window.onload = () => {
	document.getElementById('config_area').value = JSON.stringify(ResultConfig, null, '\t');
	document.getElementById('cleanLog').addEventListener('click', () => {
		const codeContainer = document.getElementById('new_message_container');
		codeContainer.innerHTML = '<i>&para;IM日志区域</i>'
	});
	document.getElementById('apply_config').addEventListener('click', () => {
		const value = document.getElementById('config_area').value;
		ResultConfig = JSON.parse(value);
		localStorage.setItem('config', value);
		if (SIMInstance) {
			window.location.reload();
		}
		const instanceProps = {
			serverip: ResultConfig.serverip,
			apiBaseUrl: ResultConfig.apiBaseUrl,
			debug: true
		};
		SIMInstance = new SIM(instanceProps);
		recordLog(instanceProps, 0, '初始化SIM');
		renderDom();
		renderIMDom();
		bindEvent();
	});
	document.getElementById('http_container').addEventListener('click', (event) => {
		const target = event.target;
		if (target.className === 'event_button') {
			const source = target.getAttribute('source');
			const funcName = target.getAttribute('funcName');
			const params = target.getAttribute('params');
			const text = target.innerText;
			if (funcName) {
				SIMInstance[source][funcName](params ? JSON.parse(params) : undefined).then((res) => {
					recordLog(res, 1, text + '请求成功');
				}).catch((err) => {
					recordLog(err, 1, text + '请求失败');
				});
				recordLog(params, 0, '发起' + text + '请求');
			}
		}
	});
	document.getElementById('IM_container').addEventListener('click', (event) => {
		const target = event.target;
		if (target.className === 'event_button') {
			const params = target.getAttribute('params');
			const JSONParams = JSON.parse(params);
			sendMsg(JSONParams.message, JSONParams.receiver, JSONParams.type);
		}
	})
}

const bindEvent = () => {
	SIMInstance.addEventListener('msg', function (msg) {
		console.log('msg: ', msg); // 接收到新消息
		recordLog(msg, 1, 'msg');
	});
	SIMInstance.addEventListener('notice', function (res) {
		console.log('notice: ', res); // 接收到通知消息
		recordLog(res, 1, 'notice');
	});
	SIMInstance.addEventListener('msgChange', function(res) {
		console.log('msgChange: ', res); // 消息变化通知
		recordLog(res, 1, 'msgChange');
	});
	SIMInstance.addEventListener('connectChange', function(status) {
		console.log('connectChange: ', status); // 链接状态变更
		recordLog(status, 1, 'connectChange');
	});

	const LoginBtn = document.getElementById('login');
	LoginBtn.addEventListener('click', () => {
		const loginParams = {
			appId: ResultConfig.appId,
			userId: ResultConfig.userId,
			userSig: ResultConfig.userSig,
			appversion: ResultConfig.appversion,
			bundleId: ResultConfig.bundleId,
		};
		SIMInstance.login(loginParams).then((res) => {
			console.log('登录成功！');
			recordLog(res, 1, '登录SIM成功');
		}).catch((err) => {
			console.log('登录失败！');
			recordLog(err, 1, '登录SIM失败');
		});
		recordLog(loginParams, 0, '开始登录SIM');
	});
}

function renderIMDom() {
	const IMFunction = ResultConfig.IM;
	const parent = document.getElementById('IM_container');
	const allSection = document.createElement('section');
	for (let i = 0; i < IMFunction.length; i++) {
		const item = IMFunction[i];
		const newSection = document.createElement('section');
		newSection.innerHTML = `<h4>${item.name} <code>sendMsg</code></h4`;
		const button = document.createElement('button');
		button.setAttribute('params', JSON.stringify(item.FunctionParams));
		button.setAttribute('class', 'event_button');
		button.innerText = item.name;
		newSection.appendChild(button);
		allSection.appendChild(newSection);
	}
	parent.appendChild(allSection);
}

function renderDom() {
	const HTTPInterface = ResultConfig.Http;
	const container = document.getElementById('http_container');
	container.innerHTML = "";
	const allSection = document.createElement('section');
	for (let i = 0; i < HTTPInterface.length; i++) {
		const section = document.createElement('section');
		const title = document.createElement('h2');
		title.innerText = HTTPInterface[i].groupName;
		section.appendChild(title);
		for (let k = 0; k < HTTPInterface[i].Functions.length; k++) {
			const item = HTTPInterface[i].Functions[k];
			const newSection = document.createElement('section');
			newSection.innerHTML = `<h4>${item.name} <code>${item.FunctionName}</code></h4`;
			const button = document.createElement('button');
			button.setAttribute('class', 'event_button');
			button.setAttribute('source', HTTPInterface[i].group);
			button.setAttribute('funcName', item.FunctionName);
			button.setAttribute('params', JSON.stringify(item.FunctionParams));
			button.innerText = item.name;
			newSection.appendChild(button);
			section.appendChild(newSection);
		}
		allSection.appendChild(section);
	}
	container.appendChild(allSection);
}

function sendMsg(message, receiver, type) {
	const sendMsgParams = {
		type: type,
		message: message,
		receiver: receiver, // 将消息发送给TA，消息的接收者
		securityType: 0, // 安全类型 默认是0
		cross: 0, // 是否跨域
		sender: ResultConfig.userId, // 发送者的ID，你发送的就是你自己咯
		chatType: 0, // 你和Ta的会话类型，单聊为0， 群聊为1
	};
	SIMInstance.sendMsg(sendMsgParams).then((msgId) => {
		console.log('sendMsg success!', msgId);
		recordLog(msgId, 0, '发送消息成功！');
	}).catch((err) => {
		console.log('sendMsg error! ', err);
	});
	recordLog(sendMsgParams, 0, '发送消息');
}


// type = 0-发送  1-接收
function recordLog(text, type = 0, t = 'msg') {
	const codeContainer = document.getElementById('new_message_container');
	const codeParent = document.getElementById('code_parent');
	codeContainer.innerHTML += `<br /><br /><i>${Date.now()}${
		type === 1 ? '接收到' : '发送出'
	}${t}<br />======================</i><br /><br />${
		(typeof text === 'string') ? text : JSONFormat(text)
	}<br /><br /><i>======================</i><br />`;
	smoothscroll();
	function smoothscroll() {
		const currentScroll = codeParent.scrollTop;   // 已经被卷掉的高度
		const clientHeight = codeParent.offsetHeight; // 容器高度
		const scrollHeight = codeParent.scrollHeight; // 内容总高度
		if (scrollHeight - 10 > currentScroll + clientHeight) {
			window.requestAnimationFrame(smoothscroll);
			codeParent.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
		}
	}
}

function JSONFormat(jsonTemp) {
	let json = ''
	try {
		// stringify 时需指定缩进否则不会显示换行。为了防止传入的string没有指定 在此统一执行一遍
		if (typeof jsonTemp != 'string') {
			json = JSON.stringify(jsonTemp, undefined, 2);
		} else {
			json = JSON.stringify(JSON.parse(jsonTemp), undefined, 2);
		}
		let jsonObj = JSON.parse(json);
		if (typeof jsonObj === 'object') {
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
				let cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
		} else {
			return jsonTemp
		}
	} catch (e) {
		return jsonTemp
	}
}
