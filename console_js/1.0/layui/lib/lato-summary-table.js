//需要配合summaryTable.html/form.html使用
;
layui.define(['ltconfig', 'table','element', 'laypage'], function (e) {
	var table = layui.table, element = layui.element, ltconfig = layui.ltconfig, laypage = layui.laypage, $main = $("#lato_main");
	var mainStyle = [''
					,'.layui-table-view .layui-table td{padding:0px;}\n'
					,'.layui-table td,.layui-table th{min-height:20px;line-height:20px;font-size:12px}\n'
					,'.layui-table th{text-align: center;}\n'
					,'.layui-table th div{padding: 0px;}\n'
					,'.layui-table td div{padding: 0px 2px;}\n'
					,'.layui-table-view{width: 100%;}\n'
					,'.layui-table-page{display:none}\n'
					,'.layui-laypage a, .layui-laypage span {background-color: transparent;color: #333;}\n'
					,'.lato-table-selected{background-color: #fff0b5!important;}\n'
					,'#detailTables{bottom: 0;height: 40%;}\n'
					,'#pagination{position: absolute;bottom: 0;left: 15px;}\n'
					,'/* 解决body加了滚动条后,header错位问题 */\n'
					,'#headerTablePosition ~ .layui-table-view .layui-table-header{margin-right: 17px;}\n'
					].join('');
	var mainContent = [''
						,'<div class="layui-fluid">\n'
						,'<div id="headerTablePosition" style="display:none"></div>\n'
						,'<div id="detailTables" lay-filter="detailTables" class="layui-tab layui-tab-brief" style="display:none"></div>\n'
						,'</div>\n'
						,'<div id="pagination" style="display:none"></div>\n'
						].join('');
	var htmlDetailTables = ['<ul class="layui-tab-title">',
							'</ul>',
							'<div class="layui-tab-content">',
							'</div>'].join('');
	//初始化页面构造
	createStyleTag('main', mainStyle);
	$main.html(mainContent);
	
	var isShowDetail = false, isInitDetail = false, headerTableName = undefined, tableCaption = undefined, objectIdFieldName = undefined, headerTableInitSort = undefined;
	var $headerTablePosition = $("#headerTablePosition");
	var detailTablesId = "detailTables";
	var $detailTables = $("#"+detailTablesId);
	var $pagination = $('#pagination');
	
	$(window).resize(function () {
		var totalHeight = window.innerHeight||$(window).height();
		totalHeight = totalHeight - 22 - parseFloat($headerTablePosition.parent().css("padding-top")) - parseFloat($headerTablePosition.parent().css("padding-bottom"));
		totalHeight = totalHeight - ($pagination.is(':hidden')?0:35);
		totalHeight = totalHeight*($detailTables.is(':hidden')?1:0.6);
		var $view = $headerTablePosition.siblings(".layui-table-view");
		$view.height(totalHeight);
		$view.find(".layui-table-body").height(totalHeight - $view.find(".layui-table-header").innerHeight());
	});
	
	var generateTabel = function(tableMapObj) {
		if (!tableMapObj)return;
		return '<table id="'+tableMapObj.name+'" lay-filter="'+tableMapObj.name+'"></table>'; //tableMapObj.tableCaption
	};
	
	//对fieldMapList冒泡排序(clone一份)
	var bubbleSort = function(fieldMapList){
		var array = [].concat(fieldMapList);
		var i, j, d, len = array.length;
		for(i = 0; i<len; i++){
			for(j=0; j<len; j++){
				if(array[i].col < array[j].col){
					d = array[j];
					array[j] = array[i];
					array[i] = d;
				}
			}
		}
		for(i = len-1; i>=0; i--){
			//隐藏图片类型
			if (array[i].type == 10) {
				array[i].visible = false;
				continue;
			}
			//col=0的倒叙放在最后
			if (array[i].col == 0) {
				array.push(array[i]);
				array[i] = null;
				continue;
			}
		}
		return array;
	};
	
	//表格中某一列为checkbox的形式
	var formatColCheckbox = function(key) {
		//源 '<input type="checkbox" lay-skin="primary" disabled '+(d[key]==1?'checked':'')+'/>'
		var f = '<input type="checkbox" lay-skin="primary" disabled \'+(d["'+key+'"]==1?\'checked\':\'\')+\' />';
		return eval("0?0:(function(d){return '"+f+"'})");
	};
	
	//格式化列为layui格式
	var formatCols = function(fieldMapList) {
		var i,cols = [[{type:'numbers'}]];
		var array = bubbleSort(fieldMapList);
		for (i=0; i < array.length; i++){
			if (!array[i] || !array[i].visible)continue;
			var col = {};
			col.field = array[i].name;
			col.title = array[i].caption;
			col.width = array[i].width;
			col.sort = true;
			if ($.inArray(array[i].type,[1,5,6])>=0)
				col.style = 'text-align: right;';
			if ($.inArray(array[i].type,[3])>=0)
				col.style = 'text-align: center;';
			if (array[i].type == 3) {
				var key = array[i].name;
				col.templet = formatColCheckbox(key);
			}
			cols[0].push(col);
		}
		return cols;
	};

	//格式化数据为数组对象
	var formatData = function(dataTableObj) {
		var i,j,datas = [];
		var metaList = dataTableObj.metaList;
		var valueList = dataTableObj.valueList;
		for (i=0; i < valueList.length; i++){
			if (!valueList[i])continue;
			var data = {};
			for (j=0; j < valueList[i].length && j < metaList.length; j++) {
				data[metaList[j].fieldName] = valueList[i][j];
			}
			datas.push(data);
		}
		return datas;
	};
	
	//给表格单击事件
	var addHeaderTableTrClick = function() {
		$('#'+headerTableName).siblings('.layui-table-view').find(".layui-table-header,table tr").on("click", function(){
			if (!isShowDetail)return;
			var $tr = $(this).is("tr")?$(this):$(this).parent("tr");
			var index = $tr.data("index");
			if (index !== undefined) {
				//判断一下是否重复点击
				var indexOld = $('#'+headerTableName).siblings('.layui-table-view').find(".lato-table-selected").data("index");
				if (indexOld == index)return;
			}
			var datas = table.cache[headerTableName];
			$('#'+headerTableName).siblings('.layui-table-view').find(".lato-table-selected").removeClass("lato-table-selected");
			if (datas && index !== undefined) {
				$tr.addClass("lato-table-selected");
				var data = datas[index];
				//console.log(datas);
				
				data && latoGet(ltconfig.getSummaryTableJsonUrl(tableCaption+"/"+data[objectIdFieldName]), loadDetailTables, "json");
			} else {
				$detailTables.hide();
				$(window).resize();
			}
		}).on("dblclick", function(){
			var $tr = $(this).is("tr")?$(this):$(this).parent("tr");
			var index = $tr.data("index");
			var datas = table.cache[headerTableName];
			if (datas && index !== undefined) {
				var data = datas[index];
				//console.log(datas);
				var href = ltconfig.getSummaryTableJsonUrl(tableCaption+"/"+data[objectIdFieldName]);
				if (top != self && top.layui && top.layui.index && top.layui.index.openTabsPage) {
					top.layui.index.openTabsPage(href, tableCaption);
				} else {
					window.open(href,"_blank");
				}
			}
		});
	};
	
	//加载明细表
	var loadDetailTables = function(data) {
		if (!(data && data.classInfo && data.classInfo.tableMapList && data.classInfo.tableMapList.length>0))return;
		var tableMapList = data.classInfo.tableMapList;
		for (var i=1; i < tableMapList.length; i++) {
			if (!tableMapList[i])continue;
			//初始化明细表tab
			if (!isInitDetail) {
				$detailTables.html(htmlDetailTables);
				isInitDetail = true;
			}
			$detailTables.show();
			
			if ($('#'+tableMapList[i].name).length == 0) {
				element.tabAdd(detailTablesId, {
					id: tableMapList[i].name
					,title: tableMapList[i].tableCaption
					,content: generateTabel(tableMapList[i])
				});
			}
			var cols = [[]], datas = [];
			//格式化列
			if (tableMapList[i] && tableMapList[i].fieldMapList)
				cols = formatCols(tableMapList[i].fieldMapList);
			else 
				continue;
			//格式化数据
			if (data && data.dataTableList && data.dataTableList.length>0){
				for (var j=0; j < data.dataTableList.length; j++) {
					if (data.dataTableList[j] && data.dataTableList[j].tableCaption == tableMapList[i].tableCaption)
						datas = formatData(data.dataTableList[j]);
				}
			}
			//layui的table渲染
			table.render({
				elem: '#'+tableMapList[i].name
				//,page: true //开启分页
				,cols: cols
				,data: datas
			});
			//默认选中第一个
			if (i == 1)
				element.tabChange(detailTablesId, tableMapList[i].name);
		}
		$(window).resize();
	};
	
	//分页加载动作
	var pageJump = function(curPageObj, first, dataPageInfo) {
		//分页信息
		var pageInfo = $.extend({}, dataPageInfo);
		pageInfo.isUseRowIndex = false;
		pageInfo.pageIndex = curPageObj?curPageObj.curr - 1:0;
		pageInfo.pageSize = curPageObj?curPageObj.limit: pageInfo.pageSize;
		//排序信息
		var sortList = []; //{"isDesc":true,"field":"f3"}
		if (headerTableInitSort) {
			sortList.push({
				field: headerTableInitSort.field
				,isDesc: headerTableInitSort.type!='asc'
			});
		}
		if(!first) {
			latoAjax({
				type: "POST",
				url: ltconfig.getSummaryTableJsonUrl(tableCaption+"/query"),
				data: {queryParams:JSON.stringify({pageInfo: pageInfo, sortList:sortList})},
				success: loadSummaryTable
			});
		}
	};
	
	//入口加载总表
	var loadSummaryTable = function(data) {
		if (!(data && data.tableMapList && data.tableMapList.length > 0))return;
		
		document.title = tableCaption = data.caption;
		var cols = [[]], datas = [];
		var headerTableMap = data.tableMapList[0];
		//格式化列
		if (headerTableMap && headerTableMap.fieldMapList)
			cols = formatCols(headerTableMap.fieldMapList);
		else 
			return;
		//格式化数据
		if (data && data.dataTableList && data.dataTableList.length>0){
			for (var j=0; j < data.dataTableList.length; j++) {
				if (data.dataTableList[j] && data.dataTableList[j].tableCaption == headerTableMap.tableCaption)
					datas = formatData(data.dataTableList[0]);
			}
		}
		if (data && data.formListConfig && data.formListConfig.isShowDetail) {
			isShowDetail = true;
		}
		//创建总表的table对象
		var headerTableObj = $(generateTabel(headerTableMap));
		headerTableName = headerTableMap.name;
		objectIdFieldName = headerTableMap.objectIdFieldName; //主键字段
		if ($('#'+headerTableName).length == 0) {
			$headerTablePosition.after(headerTableObj);
		}
		if (data.pageInfo && data.pageInfo.pageCount > 1) {
			//构建分页条
			$pagination.show();
			laypage.render({
				elem: $pagination.attr("id")
				,layout: ['count', 'prev', 'page', 'next', 'skip', 'limit', 'refresh']
				,limits: [5, 10, 20, 50, 70, 100, 200]
				,curr: data.pageInfo.pageIndex+1
				,count: data.pageInfo.total
				,limit: data.pageInfo.pageSize
				//获取不同页的动作函数
				,jump: function(curPageObj, first) {
					pageJump(curPageObj, first, data.pageInfo);
				}
			});
		}
		//layui的table渲染
		var headTableIns = table.render({
			elem: '#'+headerTableName
			,initSort: headerTableInitSort
			,page: {layout:[],limit: (data.pageInfo?data.pageInfo.pageSize:datas.length)}
			,cols: cols
			,data: datas
			,done: function(){
				//渲染完成后,给表格单击事件
				addHeaderTableTrClick();
				$(window).resize();
			}
		});
		table.on('sort('+headerTableName+')', function(obj){
			//排序后,再给表格单击事件
			//addHeaderTableTrClick();
			headerTableInitSort = obj;
			pageJump(!1, !1, data.pageInfo);
			//console.log("捕捉到sort"+JSON.stringify(headerTableInitSort));
		});
		
		$(window).resize();
	};
	/*
	//地址栏的#后面更新事件
	var hashchangeFunc = function() {
		//重新初始化变量
		isShowDetail = false, isInitDetail = false, headerTableName = undefined, tableCaption = undefined, objectIdFieldName = undefined, headerTableInitSort = undefined;
		$detailTables.hide().empty();
		//获取模板名
		tableCaption = decodeURI(location.hash?location.hash.replace(/^[#]+/i,""):"");
		if (!tableCaption && templateName) {
			tableCaption = templateName;
		}
		if (tableCaption) {
			document.title = tableCaption;
			//这个就是获取json数据包的入口
			latoGet(ltconfig.getSummaryTableJsonUrl(tableCaption), loadSummaryTable, "json");
		}
	};
	$(window).on("hashchange", hashchangeFunc);
	hashchangeFunc();
	*/

	element.init();
	
	e("ltsummarytable", {load: loadSummaryTable})
});
