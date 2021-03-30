//没有页面,在模块中使用
;
layui.define(['ltconfig'], function (e) {
	var ltconfig = layui.ltconfig
	,afterLogout = function() {
		cookie("lato_session_token", "");
		cookie("lato_session_data", "");
		location = ltconfig.url.loginUrl;
	}
	,logout = function() {
		//同步的调用登出动作,登出不管成功与否,都清空cookie并跳转到登录页面
		latoAjax({
			url: ltconfig.url.logoutUrl
			,async: false
			,error: afterLogout
			,success: afterLogout
		});
	}
	
	e("ltlogout", {logout: logout})
});