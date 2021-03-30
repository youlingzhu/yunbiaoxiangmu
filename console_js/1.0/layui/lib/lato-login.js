//配合login.html页面使用
;
layui.define(['form', 'ltconfig'], function (e) {
	var form = layui.form, ltconfig = layui.ltconfig;
	var $loginBody = $(".lato-user-login-body");
	var $username = $("#lato-user-login-username");
	var $password = $("#lato-user-login-password");
	var timeDifference = $("#pageLoadTimestamp").val()?new Date().getTime()-$("#pageLoadTimestamp").val():0; //服务器与本地浏览器的时间差,登录时候会自动计算,以便更加匹配服务器时间
	//用公钥加密密码
	var getEntryptPwd = function (loginRequest){
		var pubKey = $('#pubKey').val();
		var pwd = loginRequest.password;
		if(!pwd || !pubKey){
			layer.alert('密码加密失败,请联系管理人员', {icon: 2, title: '错误'});
			return !1;
		}
		pwd = (new Date().getTime() - timeDifference) + "#" + pwd;  //时间戳#真实密码
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(pubKey);
		loginRequest.authType = "RSA";
		loginRequest.pageLoadTimestamp = $("#pageLoadTimestamp").val();
		loginRequest.pubKey = pubKey;
		loginRequest.password = encrypt.encrypt(pwd);
		return !!1;
    };

	form.verify({
		nickname: function (e, s) {
			return new RegExp("^[a-zA-Z0-9_一-龥\\s·]+$").test(e) ? /(^\_)|(\__)|(\_+$)/.test(e) ? "用户名首尾不能出现下划线'_'" : /^\d+\d+\d$/.test(e) ? "用户名不能全为数字" : void 0 : "用户名不能有特殊字符"
		},
		pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
	});

	form.render();
	

	$loginBody.find('input').on('keypress',function(e){
		if(e.keyCode == 13){
			//模拟点击登陆按钮，触发上面的 Click 事件
			//$loginBody.find('button').click();//ie下会触发两次提交,先不要这么玩了
		}
	});
	//提交
	form.on('submit(lato-user-login-submit)', function (obj) {
		var loginRequest = {"dynPassword":"","deviceId":"web","account":"","password":"","authType":""};
		var username = $username.val();
		var password = $password.val();
		loginRequest.account = username;
		loginRequest.password = password;
		//if (!getEntryptPwd(loginRequest))return;
		//loginRequest.account = obj.field.username;
		//loginRequest.password = obj.field.password;
		//模拟alan账号登录
		//loginRequest = {"dynPassword":"","deviceId":"14F98CAA5C427CF579056C63F6D3E563","password":"95+tdL07BptK3KmoRB9cXH07nUM\/QncbtsenRXVOcqU476pDIMMhJ3JvaBrXvqII",  "account":"ldqk\/nTlL+A="};
		//提交请求登录
		latoAjax({
			type: "POST"
			,url: ltconfig.url.loginPostUrl
			,data: {json:JSON.stringify(loginRequest)}
			,isSetToken: false
			,headers: {}
			,success: function(data) {
				if (data && data.token) {
					cookie(CookieKey.token, data.token);
					//cookie(CookieKey.loginData, encodeURIComponent(JSON.stringify(data)));
					for(var key in localStorage){key.indexOf(CookieKey.loginData+window.enpId+"_")>=0 && localStorage.removeItem(key)}
					localStorage.setItem(CookieKey.loginData+window.enpId+"_"+data.token, encodeURIComponent(JSON.stringify(data)));
					if (typeof(parent.loginSuccessCallBack) == "function") {
						parent.loginSuccessCallBack();
					} else {
						location = data.redirect||ltconfig.url.indexUrl;
					}
				} else {
					layer.alert('登录成功,但是没有获取到token信息,请联系管理人员', {icon: 2, title: '错误'});
				}
			}
			,error: function(XMLHttpRequest, textStatus, errorThrown) {
				var data = XMLHttpRequest.responseJSON;
				if (data && data.Exception && data.Exception.msg) {
					alert(decodeUnicode(data.Exception.msg));
				} else {
					layer.alert(decodeUnicode('登录出错:'+XMLHttpRequest.status+"("+errorThrown+")"+"<br>"+XMLHttpRequest.responseText), {icon: 2, title: '错误'});
				}
			}
		});

	});
	
	$username.focus();

	e("ltlogin", {})
});