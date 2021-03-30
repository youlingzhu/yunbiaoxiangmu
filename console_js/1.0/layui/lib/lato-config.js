 
layui.define(function(exports){
	var hrefLoginPost = "webLogin";  //测试rsa用的,正式需要改为login
	var hrefLogin = "login";
	var hrefLogout = "logout";
	var hrefLoginContent = "login-content.html";
	var hrefIndex = "文件夹";
	//var hrefSummaryTable = "summaryTable.html";
	var hrefFolderView = "folderView.html";
	var getContextPath = function() {
		if (!!parseInt(window.enpId)) {
			return "/" + parseInt(window.enpId) + "/";
		}
		return "";
	};
	exports('ltconfig', {
		getContextPath: getContextPath
		,url: {
			menuUrl: encodeURI(getContextPath() + hrefIndex)
			,indexUrl: encodeURI(getContextPath() + hrefIndex)
			,loginPostUrl: encodeURI(getContextPath() + hrefLoginPost)
			,loginUrl: encodeURI(getContextPath() + hrefLogin)
			,loginContentUrl: encodeURI(getContextPath() + hrefLoginContent)
			,logoutUrl: encodeURI(getContextPath() + hrefLogout)
		}
		,isIndexUrl: function(href) {
			href = (href || location.href) + "/";
			return (href.indexOf(encodeURI("/"+hrefIndex+"/"))>=0)
		}
		,getSummaryTableUrl: function(data) {
			if (data.classTemplateName == "文件夹")
				return getContextPath() + hrefFolderView + "#" + data.latoId;
			else
				return getContextPath() + data.href;  //return getContextPath() + hrefSummaryTable + "#" + data.href
		}
		,getSummaryTableJsonUrl: function(templateName) {
			return encodeURI(getContextPath() + templateName);
		}
		,getStyleFileUrl: function(classInfo) {
			return encodeURI(getContextPath() + classInfo.templateName + "/htmlstyle/" + classInfo.styleFileId);
		}
	});
});
