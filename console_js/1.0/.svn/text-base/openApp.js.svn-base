
function isIos() {
	var a = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	return a
}

function isIos9() {
	return !(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i)) && Boolean(navigator.userAgent.match(/OS ([9]|1[0-9])_\d[_\d]* like Mac OS X/i))
}

function eversheetAppByLogin(url) {

	if (!url)
		return;

	if (isIos() && isIos9()) {
		location = url;
		return;
	}

	var timeout,
	t = 1000,
	hasApp = true;
	setTimeout(function () {
		if (!hasApp) {
			//没有安装微信

		} else {
			//安装微信
		}
		document.body.removeChild(ifr);
	}, 2000)

	var t1 = Date.now();
	var ifr = document.createElement("iframe");
	ifr.setAttribute('src', url);
	ifr.setAttribute('style', 'display:none');
	document.body.appendChild(ifr);
	timeout = setTimeout(function () {
			var t2 = Date.now();
			if (!t1 || t2 - t1 < t + 100) {
				hasApp = false;
			}
		}, t);
}

function eversheetApp(url) {
	if (weixinOpen())
		return;

	if (!url)
		return;
    
    //协议替换
    if (url.indexOf("://")>=0 && url.toLowerCase().indexOf("http")==0)
        url = "eversheet://" + url.substr(url.indexOf("://")+3);
    else if (url.indexOf("://") < 0)
        url = "eversheet://" + location.host + (url.indexOf("/")<0?location.pathname+"/":"") + url;

	if (isIos() && isIos9()) {
		location.href = url;
		return;
	}

	var timeout,
	t = 1000,
	hasApp = true;
	setTimeout(function () {
		if (!hasApp) {
			//没有安装微信
			var r = confirm("您没有安装云表APP，请先安装云表APP!");
			if (r == true) {
				location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.latosoft.eversheet.multiDevice';
			}
		} else {
			//安装微信
		}
		document.body.removeChild(ifr);
	}, 2000)

	var t1 = Date.now();
	var ifr = document.createElement("iframe");
	ifr.setAttribute('src', url);
	ifr.setAttribute('style', 'display:none');
	document.body.appendChild(ifr);
	timeout = setTimeout(function () {
			var t2 = Date.now();
			if (!t1 || t2 - t1 < t + 100) {
				hasApp = false;
			}
		}, t);
}

function weixinOpen() {

	var is_weixin = (function () {
		return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
	})();

	var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight; //兼容IOS，不需要的可以去掉
	var btn = document.getElementById('J_weixin');
	var tip = document.getElementById('weixin-tip');

	if (is_weixin) {

		tip.style.height = winHeight + 'px'; //兼容IOS弹窗整屏
		tip.style.display = 'block';

		tip.onclick = function () {
			tip.style.display = 'none';
		}

	}

	return is_weixin;

}