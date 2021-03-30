//需要配合form.html使用
;
layui.define(['ltconfig', 'table','element', 'laypage'], function (e) {
	var table = layui.table, element = layui.element, ltconfig = layui.ltconfig, laypage = layui.laypage, $main = $("#lato_main");
	var mainStyle = '';
	var mainContent = '';
	//初始化页面构造
	createStyleTag('main', mainStyle);
	//$main.html(mainContent);
	
	//根据窗口自动伸缩中间的排版
	var onResize = function() {
		var latoHeader = $('.lato-form-header');
		var latoBody = $('.lato-form-body');
		var latoBodyLeft = $('.lato-form-body-left');
		var latoFluid = $('.lato-form-body-fluid');
		var latoBodyRight = $('.lato-form-body-right');
		var latoFooter = $('.lato-form-footer');
		var latoTabs = $("div[id^='JvDockableForm']");
		$(window).resize(function() {
			var windowWidth = window.innerWidth||$(window).width();
			var windowHeight = (window.innerHeight||$(window).height()) - 3; //减去间隔条两个*3,不然会有上下的滚动条
			
			var latoHeaderWidth = windowWidth;
			var latoFooterWidth = windowWidth;
			var latoBodyWidth = windowWidth;
			var latoBodyHeight = windowHeight - latoHeader.outerHeight() - latoFooter.outerHeight();
			var latoFluidWidth = windowWidth - (latoBodyLeft.outerWidth()+3*latoBodyLeft.size()) - (latoBodyRight.outerWidth()+3*latoBodyRight.size());
			var latoFluidHeight = latoBodyHeight;
			var latoBodyLeftHeight = latoBodyHeight;
			var latoBodyRightHeight = latoBodyHeight;
			latoHeader.width(latoHeaderWidth);
			latoFooter.width(latoFooterWidth);
			latoBody.width(latoBodyWidth).height(latoBodyHeight);
			latoFluid.width(latoFluidWidth).height(latoFluidHeight);
			latoBodyLeft.height(latoBodyLeftHeight);
			latoBodyRight.height(latoBodyRightHeight);
			//tab要特殊计算高度,因为有标签题头占了一部分的固定高度
			latoTabs.find(".layui-tab-content").each(function(){
				var paddingHeight = $(this).outerHeight() - $(this).height();
				var tabContentHeight = $(this).parent().height() - $(this).parent().find(".layui-tab-title").outerHeight() - paddingHeight;
				$(this).height(tabContentHeight);
				$(this).find(".layui-tab-item").height(tabContentHeight);
			});
		});
		$(window).resize();
		if (!window.innerWidth){
			$(window).resize();//解决ie下要二次计算,不然会把滚动条也计算进去
			$(".lato-border-right,.lato-border-bottom").css("border-width","0");
		}
	};
	
	var loadStyle = function(jsonData) {
		if (!(jsonData && jsonData.classInfo))return false;
		
		var styleFileUrl = ltconfig.getStyleFileUrl(jsonData.classInfo);
		
		latoAjax({
			type: "GET"
			,url: styleFileUrl
			//,headers: {}
			,success: function(html) {
				$main.html(html);
				onResize();
				document.title = jsonData.classInfo.caption;  //如何判断 编辑/新建 ??
			}
			,dataType: 'html'
		});
		
	}
	
	e("ltform", {load: loadStyle});
});
