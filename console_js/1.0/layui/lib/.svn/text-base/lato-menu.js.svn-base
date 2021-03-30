//新建
;
layui.define(['element', 'ltconfig', 'ltlogout'], function (e) {
	var element = layui.element, ltconfig = layui.ltconfig, ltlogout = layui.ltlogout
	d = "layui-show",
	menuUlObj = $("#LAY-system-side-menu"),
	//左侧菜单栏的文件夹点击事件,刷新主页的文件夹
	refreshContainerPage= function(targetObj, data){
		element.tabChange('layadmin-layout-tabs', 'folderView.html');
		$("#LAY_app_body div:first-child").addClass(d).siblings().removeClass(d);
		menuUlObj.find(".layui-this").removeClass("layui-this");
		$(targetObj).addClass("layui-this");
		if (data && data.caption)
			document.title = data.caption;
		var iHome = window.iframeHome;
		if (iHome) {
			//iHome.refreshContainer(data.latoId);
			iHome.location = ltconfig.getSummaryTableUrl(data);
		}
	},
	createMenuObjFunc = function (name, caption, imageIndex, isExpand) {
		return $(['<li data-name="', name,
				'" class="layui-nav-item ',
				isExpand?'layui-nav-itemed':'',
				'"><a href="javascript:;" lay-tips="',
				caption||' ',
				'" lay-direction="2"><i class="lato-menu-icon" style="background-position-x:',
				-16*imageIndex,
				'px"></i><cite>',
				caption||' ',
				'</cite></a><dl class="layui-nav-child"> </dl></li>'
			].join(""));
	},
	createNextLevelObjFunc = function (name, caption, imageIndex, isExpand) {
		return $(['<dd data-name="',
				name||' ',
				'" class="',
				isExpand?'layui-nav-itemed':'',
				'"><a href="javascript:;" lay-tips="',
				caption||' ',
				'" lay-direction="2"><i class="lato-menu-icon" style="background-position-x:',
				-16*imageIndex,
				'px"></i><cite>',
				caption||' ',
				'</cite></a><dl class="layui-nav-child"> </dl></dd>'
			].join(""));
	},
	createTargetObjFunc = function (name, caption, imageIndex, href) {
		return $(['<dd data-name="',
				name||' ',
				'"><a href="javascript:;" lay-tips="',
				caption||' ',
				'" ',
				(href?' lay-href="'+href+'"':' '),
				'><i class="lato-menu-icon" style="background-position-x:',
				-16*imageIndex,
				'px"></i><cite>',
				caption||' ',
				'</cite></a></dd>'
			].join(""));
	},
	//获取目录树的某一个节点的唯一标识
	getTemplateIdentification = function(classTemplateObj) {
		return classTemplateObj?classTemplateObj.classTemplateName+':'+classTemplateObj.latoId:'';
	},
	F = {
		addMenu : function(name, caption, imageIndex, data, isExpand){
			var menuObj = createMenuObjFunc(name, caption, imageIndex, isExpand);
			if (data && data.classTemplateName == "文件夹") {
				menuObj.find("a").removeAttr("lay-href").on("click",function(){
					refreshContainerPage(this,data);
				});
			}
			menuUlObj.append(menuObj);
			return menuObj;
		},
		addNextLevel : function(menuObj, name, caption, imageIndex, data, isExpand){
			var nextLevelObj = createNextLevelObjFunc(name, caption, imageIndex, isExpand);
			if (data && data.classTemplateName == "文件夹") {
				nextLevelObj.find("a").removeAttr("lay-href").on("click",function(){
					refreshContainerPage(this,data);
				});
			}
			menuObj.find("dl:first").append(nextLevelObj);
			return nextLevelObj;
		},
		addTarget : function(menuObj, name, caption, imageIndex, data, href){
			var targetObj = createTargetObjFunc(name, caption, imageIndex, href);
			if (data && data.classTemplateName == "文件夹") {
				targetObj.find("a").removeAttr("lay-href").on("click",function(){
					refreshContainerPage(this,data);
				});
			}
			menuObj.find("dl:first").append(targetObj);
			return this;
		},
		changeNextLevelToTarget: function(nextLevelObj, name, caption, imageIndex, data, href){
			var targetObj = createTargetObjFunc(name, caption, imageIndex, href);
			if (data && data.classTemplateName == "文件夹") {
				targetObj.find("a").removeAttr("lay-href").on("click",function(){
					refreshContainerPage(this,data);
				});
			}
			nextLevelObj.replaceWith(targetObj);
			return this;
		},
		setNavLink: function(extLinkList) {
			var sessionData = $.parseJSON(decodeURIComponent(localStorage.getItem(CookieKey.loginData+window.enpId+"_"+cookie(CookieKey.token))));
			if (sessionData && sessionData.user)
				$("#extLink").find("cite").text(sessionData.user);
			if (extLinkList && extLinkList.length > 0) {
				for (var i=extLinkList.length-1; i >= 0; i--) {
					var dd = $('<dd><a>'+extLinkList[i].caption+'</a></dd>');
					if (extLinkList[i].href) {
						if (extLinkList[i].href.indexOf("/logout")>=0) {
							$("#extLink").find("#logoutLink").on('click', ltlogout.logout);
							continue;
						}
						if (extLinkList[i].zone == 'system')
							dd.find("a").attr('href', extLinkList[i].href).attr('target','_blank');
						else
							dd.find("a").attr('lay-href', extLinkList[i].href);
					}
					$("#extLink .layui-nav-child").prepend(dd);
				}
			}
		}
	},
	//循环递归,显示菜单的子文件夹及子表单项
	recursion = function(d, parentMenu) {
		if (d) {
			var hasChild = false;
			//先显示文件夹项
			layui.each(d.subCatalogList,function(index, item){
				hasChild = true;
				var no = F.addNextLevel(parentMenu, getTemplateIdentification(item), item.caption, item.imageIndex, item);
				recursion(item, no);
			});
			//再显示表单项
			layui.each(d.templateList,function(index, item){
				//有个开关,是否显示在菜单项中
				if (item.isShowInCatalog){
					hasChild = true;
					F.addTarget(parentMenu, getTemplateIdentification(item), item.caption, item.imageIndex, item, ltconfig.getSummaryTableUrl(item));
				}
			});
			//判断是否有子项,如果没有,把文件夹菜单项改为普通菜单项
			if (!hasChild)
				F.changeNextLevelToTarget(parentMenu, getTemplateIdentification(d), d.caption, d.imageIndex, d, ltconfig.getSummaryTableUrl(d));
		}
	};
	
	//公开一个方法,给右侧文件夹面板进行调用,用于找到对应的菜单项并执行单击事件
	window.findTargetLinkAndSelect = function(id){
		var linkObj = $("#LAY-system-side-menu").find("dd[data-name='"+id+"'] > a:first-child");
		linkObj.click();
		return linkObj.length>0;
	};
	
	latoGet(ltconfig.url.menuUrl, function(data){
		if (data && data.treeDataList) {
			//传入到文件夹视图页面,减少一次请求目录树json
			if(window.iframeHome) window.iframeHome.menuData = data;
			//先创建菜单项的根
			var mo = F.addMenu(getTemplateIdentification(data.treeDataList), data.treeDataList.caption, data.treeDataList.imageIndex, data.treeDataList, true);
			mo.find("a:first-child").click();
			//recursion(data.treeDataList, mo);
			//根下的顺序是先显示表单项,再显示文件夹项
			layui.each(data.treeDataList.templateList,function(index, item){
				if (item.isShowInCatalog)
					F.addTarget(mo, getTemplateIdentification(item), item.caption, item.imageIndex, item, ltconfig.getSummaryTableUrl(item));
			});
			layui.each(data.treeDataList.subCatalogList,function(index, item){
				var no = F.addNextLevel(mo, getTemplateIdentification(item), item.caption, item.imageIndex, item);
				recursion(item, no);
			});
			F.setNavLink(data.extLinkList);
		}
		element.init();
	},"json");
	e("ltmenu", F)
});
