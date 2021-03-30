/** License By https://www.iyunbiao.com */

///*

//*/
//清空选择的内容,兼容ie,不报错
function selectionEmpty(){
	try {
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	}catch(e){}
}
var CookieKey = 
{
	token: 'lato_session_token'
	,loginData: 'lato_login_data_'
}
// cookie操作
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}
//unicode转中文
function decodeUnicode(str) {
	str = str.replace(/\\/g, "%");
	return unescape(str);
}
//获取cookie中的token值
function getSessionToken() {
	return cookie(CookieKey.token);
}
//转到登录界面
function gotoLogin(url, afterLoginFunc) {
	layui.use(['layer', 'ltconfig'], function(){
		var layer = layui.layer, ltconfig = layui.ltconfig;
		if (ltconfig.isIndexUrl()) {
			//当前页面是主页,跳转到登录页面
			top.location = ltconfig.url.loginUrl;
			return;
		}
		var win = top!=self&&top.layer?top:self;
		var index = win.layer.open({
			type: 2
			,title: '登录'
			,area: ['400px', '300px']
			,content: [ltconfig.url.loginContentUrl, 'no']
		});
		win.loginSuccessCallBack = function() {
			win.layer.close(index);
			afterLoginFunc();
		};
		win.loginFailCallBack = function() {
			//好像没啥要干的
		};
	});
}
//封装一个ajax请求,会自动加入token等请求头,如果超时会提示登录
function latoAjax(config){
	//if (!config.ltconfig)return alert("need ltconfig!!");
	if (!(config && config.url))return alert("error:url=null");
	$.ajax({
		type: config.type||"GET",
		url: config.url,
		data: $.extend({},config.data,{_:new Date().getTime()}),
		headers: config.headers||{
			Accept: "application/x-lato"
		},
		beforeSend: function(request) {
			if (config.isSetToken !== false)
				request.setRequestHeader("token", getSessionToken());
		},
		error: config.error||function(XMLHttpRequest, textStatus, errorThrown) {
			var data = XMLHttpRequest.responseJSON;
			if (data === undefined && XMLHttpRequest.responseText && XMLHttpRequest.responseText[0] == "{") {
				data = eval('0?0:'+XMLHttpRequest.responseText);
			}
			if (data && data.Exception && data.Exception.msg) {
				if (data.Exception.url && data.Exception.url.indexOf("/login")>=0) {
					if(confirm("连接超时,请重新登录.")) {
						gotoLogin(data.Exception.url, function(){latoAjax(config)});
					}
				} else {
					alert(decodeUnicode(XMLHttpRequest.status+"("+errorThrown+")"
					+"\nException.code:"+data.Exception.code
					+"\n"+data.Exception.msg.trim()
					+(data.Exception.detail.trim()!=data.Exception.msg.trim()?"\n"+data.Exception.detail.trim():""))
					);
				}
			}
		},
		async: (config.async!==undefined?config.async:true),
		dataType: config.dataType||'json',
		success: config.success||function(){}
	});
}
//简化get请求
function latoGet(url, successFunc, dataType) {
	latoAjax({
		url: url
		,success: successFunc
		,dataType: dataType
	});
}
//动态创建style标签在head头,id相同时候会覆盖
function createStyleTag(id, content) {
	var nod = document.getElementById(id), newElem = false;
	if (!nod) {
		nod = document.createElement('style');
		newElem = true;
	}
	nod.id = id||'';
	nod.type = 'text/css';
	if(nod.styleSheet){         //ie下
		nod.styleSheet.cssText = content;
	} else {
		nod.innerHTML = content;       //或者写成 nod.appendChild(document.createTextNode(content))
	}
	newElem && document.getElementsByTagName('head')[0].appendChild(nod);
	return nod;
}
//动态创建script标签在head头,主要用于script标签的模板(type=text/html),id相同时候会覆盖
function createScriptTag(id, code, type) {
	var nod = document.getElementById(id), newElem = false;
	if (!nod) {
		nod = document.createElement('script');
		newElem = true;
	}
	nod.id = id||'';
	nod.type = type || "text/javascript";
	try {
		nod.appendChild(document.createTextNode(code));
	} catch (ex) {
		nod.text = code;
	}
	newElem && document.getElementsByTagName('head')[0].appendChild(nod);
	return nod;
}
var utils = {
	str2ArrJoin: function(text) {
		var result = "[''\n";
		var arr = text.replace("\r", "").split("\n");
		for (var i=0; i < arr.length; i++) {
			arr[i] && (result += ",'" + arr[i].replace(/[']/gi,"\\'") + "\\n'\n");
		}
		result += "].join('');"
		return result;
	},
	aa: $(window).keydown(function(e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        if(ctrlKey && (keyCode == 89 || keyCode == 121)) {
        var ctrlKey = e.ctrlKey || e.metaKey;
            layer && layer.open({
				type: 1
				,content: '<textarea id="test" style="width: 98%;height: 97%;"></textarea>'
				,btn: ['str2ArrJoin','arrJoin2Str']
				,area: ['400px', '300px']
				,yes: function(index, layero){
					$("#test").val(utils.str2ArrJoin($("#test").val()));
					return false;
				}
				,btn2: function(index, layero){
					$("#test").val(eval(0?0:$("#test").val()));
					return false;
				}
			});
			return false;
        }
    })
}

//json对象转url参数形式
function json2Params(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}   
//url参数形式转json对象
function params2Json(url) {
    try {
        var index = url.indexOf('?');
        url = index>=0?url.match(/\?([^#]+)/)[1]:url;
        var obj = {}, arr = url.split('&');
        for (var i = 0; i < arr.length; i++) {
            var subArr = arr[i].split('=');
            obj[decodeURIComponent(subArr[0])] = decodeURIComponent(subArr[1]);
        }
        return obj;

    } catch (err) {
        return null;
    }
}
// 获取URL地址参数
function getUrlParam(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == ""){
	    url = window.location.search;
    }else{	
    	url = url.substring(url.indexOf("?"));
    }
    r = url.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null;
}

//自定义模块及所在路径
layui.config({
	base: '../../layui/'
}).extend({
	index: 'lib/index'
	,ltconfig: 'lib/lato-config'
	,ltformentry: 'lib/lato-form-entry'
	,ltmenu: 'lib/lato-menu'
	,ltfolderview: 'lib/lato-folderview'
	,ltsummarytable: 'lib/lato-summary-table'
	,ltform: 'lib/lato-form'
	,ltlogin: 'lib/lato-login'
	,ltlogout: 'lib/lato-logout'
});

