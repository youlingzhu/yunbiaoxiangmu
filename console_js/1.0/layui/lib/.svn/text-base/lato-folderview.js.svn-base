//需要配合form.html使用
;
layui.define(['laytpl', 'ltconfig'], function (e) {
	var laytpl = layui.laytpl, ltconfig = layui.ltconfig, $main = $("#lato_main");
	var mainStyle = [''
					,'.lato-container-p{width:auto;float:left;margin: 0;}\n'
					,'.lato-container{width:100px;height:100px;background:#31a66b;text-align: center;border:1px solid transparent;cursor: pointer;}\n'
					,'.lato-container:hover{border:1px solid #e8e8e8}\n'
					,'.lato-container a{width:32px;height:32px;}\n'
					,'.lato-container-img{margin-top:23px;width:32px;height:32px;display:inline-block;background: transparent url(/public/javascripts/layui/images/icon.png) no-repeat scroll 0px 0px;}\n'
					,'.lato-container-selected{background:#ffa66b}\n'
					,'.lato-container-text{padding:10px 2px}\n'
					,'.lato-container-text-info{height:40px;font-size:14px;line-height:20px;width:100%;overflow:hidden;color:#fff;margin-bottom:10px;text-overflow:ellipsis; white-space: nowrap;}\n'
					,'.lato-container-doubleline .lato-container-text{padding:0px 2px!important;}\n'
					,'.lato-container-doubleline .lato-container-text-info{word-break: break-word;white-space: normal!important;}\n'
					].join('');
	var containerTemplate = [''
					,'<div class="lato-container-p">\n'
					,'	<div class="lato-container" onclick="containerClick(this)" ondblclick="containerDblClick(\'{{ d.latoId }}\',\'{{ d.classTemplateName }}\',\'{{ d.caption }}\',\'{{ d.lthref }}\')">\n'
					,'		<div class="lato-container-img" style="background-position-x: {{ -32*d.imageIndex }}px;"></div>\n'
					,'		<div class="lato-container-text">\n'
					,'			<p class="lato-container-text-info" title="{{ d.caption }}">{{ d.caption }}</p>\n'
					,'		</div>\n'
					,'	</div>\n'
					,'</div>\n'
					].join('');
	var mainContent = '<div id="containerList" class="layui-col-space8" ></div>';
	//初始化页面构造
	createStyleTag('main', mainStyle);
	createScriptTag('container', containerTemplate, 'text/html');
	$main.addClass("layui-fluid").html(mainContent);
	//目录的jsonData,支持外部传入后不再次发出请求
	window.menuData = undefined;
	//单击事件
	window.containerClick = function(i){
		$(".lato-container-selected").removeClass("lato-container-selected");
		$(".lato-container-doubleline").removeClass("lato-container-doubleline");
		$(i).addClass("lato-container-selected");
		//判断文字长度超过一行,则换两行显示
		if ($(i).find(".lato-container-text-info").text().replace(/[^\x00-\xff]/g,"01").length > 12)
			$(i).addClass("lato-container-doubleline");
	};
	//双击事件
	window.containerDblClick = function(latoId, classTemplateName,caption,href){
		//清空选择的内容(双击会默认选中部分文字)
		selectionEmpty();
		/*if (classTemplateName == "文件夹") {
			var href = location.href;
			if (href.indexOf("#")>=0)href=href.substring(0,href.indexOf("#"));
			//location = href+"#"+latoId;
			refreshContainer(latoId);
		} else {
			var id = classTemplateName+":"+latoId;
			var findTargetLinkAndSelect = top.findTargetLinkAndSelect;
			if (findTargetLinkAndSelect) {
				findTargetLinkAndSelect(id);
			}
		}*/
		//根据唯一键找到菜单栏对应的菜单项,并触发点击事件
		var id = classTemplateName+":"+latoId;
		var findTargetLinkAndSelect = top.findTargetLinkAndSelect;
		var isSelected = false;
		if (findTargetLinkAndSelect) {
			isSelected = findTargetLinkAndSelect(id);
		}
		//没有找到菜单项,以top身份打开新标签页
		if (!isSelected && href != "undefined") {
			//没有父页面,在本页面打开
			if (top != self && top.layui && top.layui.index && top.layui.index.openTabsPage) {
				top.layui.index.openTabsPage(href, caption);
			} else {
				location = href;
			}
		}
	};
	//循环递归子文件夹,找到指定ID的文件夹对象
	var recursion = function(data, id) {
		if (data) {
			if (data.latoId == id)
				return data;
			if (data.subCatalogList) {
				for(var i = 0; i < data.subCatalogList.length; i++) {
					var d = recursion(data.subCatalogList[i], id);
					if (d)return d;
				}
			}
		}
		return;
	};
	//开始加载数据
	var loadmenuData = function(data, subCatalogId){
		menuData = data;
		//每个图标的模板
		var containerTpl = $("#container").html();
		//先清空之前的内容
		$("#containerList").empty();
		if (data && data.treeDataList && containerTpl) {
			var d = data.treeDataList;
			if (subCatalogId) {
				d = recursion(d, subCatalogId);
			}
			document.title = d.caption;
			//先显示文件夹
			layui.each(d.subCatalogList,function(index,item){
				var newItem = $.extend({}, item, {lthref: ltconfig.getSummaryTableUrl(item)});
				laytpl(containerTpl).render(newItem, function(html){
					$("#containerList").append(html);
				});
			});
			//再显示其他
			layui.each(d.templateList,function(index,item){
				var newItem = $.extend({}, item, {lthref: ltconfig.getSummaryTableUrl(item)});
				laytpl(containerTpl).render(newItem, function(html){
					$("#containerList").append(html);
				});
			});
		}
	};
	//更新面板
	var refreshContainer = function(subCatalogId) {
		selectionEmpty();
		$("#containerList").empty();
		//判断是否已经获取过目录树json了
		if (menuData)
			loadmenuData(menuData, subCatalogId);
		else
			latoGet(ltconfig.url.menuUrl, function(data){loadmenuData(data, subCatalogId)}, "json");
	};
	
	//地址栏的#后面更新事件
	var hashchangeFunc = function() {
		var subCatalogId = decodeURI(location.hash?location.hash.replace(/^[#]/i,""):"");
		if (subCatalogId != "#")
			refreshContainer(subCatalogId);
	};
	$(window).on("hashchange", hashchangeFunc);
	hashchangeFunc();
	
	e("ltfolderview", {})
});
