//ltsummarytable和ltform的入口,根据请求的json内容判断加载不同的模块
;
layui.define(['ltconfig', 'layer'], function (e) {
	var ltconfig = layui.ltconfig, layer = layui.layer;

	if (window.templateName) {
		var rUrl = encodeURI(window.url || ltconfig.getContextPath() + window.templateName + (window.formId?"/"+formId:""));
		
		latoGet(rUrl, function(data){
			var moduleName = '';
			if (data && data.formViewClassId) {
				if (data.formViewClassId == "rangeFormView") {
					moduleName = 'ltform';
					layui.use(moduleName, function() {
						var ltform = layui.ltform;
						ltform.load && ltform.load(data);
					});
					return;
				} else if (data.formViewClassId == "formListGridView") {
					moduleName = 'ltsummarytable';
					layui.use(moduleName, function() {
						var ltsummarytable = layui.ltsummarytable;
						ltsummarytable.load && ltsummarytable.load(data);
					});
					return;
				} else if (data.formViewClassId == "folderView") {
					//文件夹视图,跳转回到主页
					location = ltconfig.url.indexUrl;
				}
			}
			layer.alert('没有找到对应的模板显示数据.', {icon: 1, title: '提示'});
		});
	}
	
	e("ltformentry", {})
});
