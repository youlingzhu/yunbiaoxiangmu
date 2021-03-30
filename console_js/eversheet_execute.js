	function dayin(){
			var v2 = $("#lato_weituodan_objectId").val();
			window.open('/print?templateName=委托单—存根联&&formId='+v2+'' ); 
		}
		
	
		//选择委托单位
		function getWtdwTableList(){
				
				$('#wtdwModel').modal({
					keyboard: true
			})
				
		}
	
		
		//器具分类选择好后进行弹出模态框
		function weituodanModalTwo(){
			var countVal = $("#lato_apparatusClassification_select option:selected").text();
			//关闭模态框
			 $('#myModal_weituodancungenlian_l1').modal("hide");
				
			//判断指定的器具分类，打开不同模态框
			 if(countVal == "摆式摩擦系数测定仪" ||countVal == "车载式路面激光车辙仪" ||countVal == "车载式路面激光平整度仪"  ||countVal == "通信管道静摩擦系数标准器" || countVal == "通信管道静摩擦系数测量仪")
				{	
					$('#flfsljcxmJcxmTable').bootstrapTable('destroy').bootstrapTable({
						url: '/器具分类检测项目/器具分类检测项目(器具分类)/getJsonData?器具分类='+countVal,
					});
					
					
					
					emptyModul(countVal);
					$("#selectQjfl").val(1);
					$("#lato_flfsljcxmQjfl").val(countVal);
					
					$('#wtdwMode4').modal({
							keyboard: true,
							draggable: true
					})
				}else if(countVal == "逆反射标志测量仪" ||countVal == "逆反射标志标准器组"){
			
					$('#jbxzTable').bootstrapTable('destroy').bootstrapTable({
						url: '/器具分类级别对照表/器具分类检测级别(器具分类)/getJsonData?器具分类='+countVal,
					});
					emptyModul(countVal);
					$("#lato_lfsbzljcxmQjfl").val(countVal);
					$("#selectQjfl").val(2);
					$('#wtdwMode2').modal({
							keyboard: true
					})
				}else if(countVal == "逆反射标线测量仪" ||countVal == "突起路标测量仪" ||countVal == "突起路标标准器组" ||countVal == "逆反射标线标准器组"){
					
					emptyModul(countVal);
					$("#selectQjfl").val(3);
					$('#wtdwMode3').modal({
							keyboard: true
					})
					
					$("#lato_lfsbxtqljcxmQjfl").val(countVal);
					
					
					
					
				}
				$("#selectQjlx").val(countVal);
			 
			 //将层进行显示
			//eidDiv(countVal);
			
		}
		
		//非逆反射类测项目提交
		function subS1AjaxPutForm( ){
			
			var v7 =   $("#lato_flfslxmMxcount").val();
			
			if(v7 < 1){
				alert('明细不允许为空，请添加明细数据');
				return;
			}
		}
		
		
		//添加器具
		function openTwoModal(trSeq){
			//打开模态框
		 	$('#myModal_weituodancungenlian_l1').modal({
					keyboard: true
			})
		
		}
		
		//委托单位选择好后进行赋值操作
		function wtdwModal(){	
				
				//$('#wtdcglForm').data('bootstrapValidator').resetForm(true);
				
                  var ids = $.map($('#wtdwTable').bootstrapTable('getSelections'), function ( row) {
					
				   $("#lato_wtdcglWtdw").val(row.lato_dwmc);
				   $("#lato_wtdcglLxr").val(row.lato_lxr);
				   $("#lato_wtdcglDh").val(row.lato_lxdh);
				   $("#lato_wtdcglCz").val(row.lato_cz);
				   $("#lato_wtdcglEmail").val(row.lato_yx);
				   $("#lato_wtdcglTxdz").val(row.lato_txdz);
				   $("#lato_wtdcglYb").val(row.lato_yb);
				   //模态框隐藏
				  $('#wtdwModel').modal("hide");
				  
                    });
					$('#wtdcglForm').data('bootstrapValidator').validate();
					$('#wtdcglForm').data('bootstrapValidator').updateStatus('lato_wtdcglWtdw','NOT_VALIDATED').validateField('lato_wtdcglWtdw');
					$('#wtdcglForm').data('bootstrapValidator').updateStatus('lato_wtdcglLxr','NOT_VALIDATED').validateField('lato_wtdcglLxr');
					$('#wtdcglForm').data('bootstrapValidator').updateStatus('lato_wtdcglDh','NOT_VALIDATED').validateField('lato_wtdcglDh');

		}
		
		//选择器具分类后进行赋值操作
		function qjfllbxzModal(){
					var ids = $.map($('#qjfllbxzTable').bootstrapTable('getSelections'), function ( row) {
					var qjfl =	$("#selectQjfl").val();
					if(qjfl == 1){
					   $("#lato_flfsljcxmQjmc").val(row.lato_mc);
					   $("#lato_flfsljcxmXhgg").val(row.lato_xhgg);
					   $("#lato_flfsljcxmZzdw").val(row.lato_scdw);
					   
					$('#flfsljcxmForm').data('bootstrapValidator').updateStatus('lato_flfsljcxmQjmc','NOT_VALIDATED').validateField('lato_flfsljcxmQjmc');
					$('#flfsljcxmForm').data('bootstrapValidator').updateStatus('lato_flfsljcxmXhgg','NOT_VALIDATED').validateField('lato_flfsljcxmXhgg');
					$('#flfsljcxmForm').data('bootstrapValidator').updateStatus('lato_flfsljcxmZzdw','NOT_VALIDATED').validateField('lato_flfsljcxmZzdw');
			
				  }else if(qjfl == 2){
					  $("#lato_lfsbzljcxmQjmc").val(row.lato_mc);
					  $("#lato_lfsbzljcxmXhgg").val(row.lato_xhgg);
					  $("#lato_lfsbzljcxmZzdw").val(row.lato_scdw);
					  
				$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmQjmc','NOT_VALIDATED').validateField('lato_lfsbzljcxmQjmc');
					$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmXhgg','NOT_VALIDATED').validateField('lato_lfsbzljcxmXhgg');
					$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmZzdw','NOT_VALIDATED').validateField('lato_lfsbzljcxmZzdw');
					
				  }else if(qjfl == 3){
					   $("#lato_lfsbxtqljcxmQjmc").val(row.lato_mc);
					   $("#lato_lfsbxtqljcxmXhgg").val(row.lato_xhgg);
					   $("#lato_lfsbxtqljcxmZzdw").val(row.lato_scdw);
					   
					$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmQjmc','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmQjmc');
					$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmXhgg','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmXhgg');
					$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmZzdw','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmZzdw');
					//   $("#lfsxtqljcxmForm").data('bootstrapValidator').resetForm();
				  }
				  
				   $('#qjfllbxzModal').modal("hide");
				  
		    });
		}
		
		
		//选择指定的器具
		function openQjfllbxzModal(){
			//打开模态框
		 	$('#qjfllbxzModal').modal({
					keyboard: true
				})
		 
		}
		
		//委托单删除明细表
		function removeWeituodanTr(temp){ 
		
				var countVal = $("#lato_weituodan_mxcount").val();
				var countVal2 = countVal;
				var val2 = Number(countVal2)-1;
			
			$(temp).parents("tr").remove(); 
			 $("#lato_weituodan_mxcount").val(val2);
			//此处$(temp)先获取到<a>对象，.parent()拿到<td>，再.parent()获取到tr 
		}
		
		//删除行
		function removeTr(temp,mxCountName){ 
		
			var countVal2 = mxCountName.value;
			var val2 = Number(countVal2)-1;
		
			$(temp).parents("tr").remove(); 
			
			 mxCountName.value = val2;
			//此处$(temp)先获取到<a>对象，.parent()拿到<td>，再.parent()获取到tr 
		}
		
		//非逆反射类检测项目
		function flfsljcxmSelectModal(){
		
               var value =JSON.stringify($('#flfsljcxmJcxmTable').bootstrapTable('getSelections'));
                 var ids = $.map($('#flfsljcxmJcxmTable').bootstrapTable('getSelections'), function (row) {
                                   var countVal = $("#lato_flfslxmMxcount").val();
								   
								   
                                   var countVal2 = countVal;
                                   var val2 = Number(countVal2)+1;
                                  
                                   var classInfo = "class='warning'";
                                   
									var mxCountName = "lato_flfslxmMxcount";
                                  
								   	var trHtml="<tr "+classInfo+"><td><input type='text' placeholder='请输入编号....' class='form-control' name='lato_flfsljcxmBh_"+val2+"' id='lato_flfsljcxmBh_"+val2+"' readonly='readonly'  value="+row.lato_bh+"></td><td><input type='text' placeholder='请输入检测项目....' class='form-control' readonly='readonly'  name='lato_flfsljcxmJcxm_"+val2+"' id='lato_flfsljcxmJcxm_"+val2+"' value="+row.lato_jcxm+" ></td><td><input type='text' placeholder='请输入备注....' class='form-control' name='lato_flfsljcxmBz_"+val2+"' id='lato_flfsljcxmBz_"+val2+"'></td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' onclick='removeTr(this,"+mxCountName+")'>删除行</button></div></td></tr>";
								  
                                   var $tr=$("#flfsljcxmTable tr").eq(countVal);
                                   if($tr.size()==0){
                                        alert("指定的table id或行数不存在！");
                                        return;
                                   }
                                   $tr.after(trHtml);
                                   $("#lato_flfslxmMxcount").val(val2);
                                   $('#flfsljcxmJcxmlb').modal("hide");
								   
								   
                    });
				var countVal = $("#lato_apparatusClassification_select option:selected").text();
				//刷新表table
				$('#flfsljcxmJcxmTable').bootstrapTable('destroy').bootstrapTable({
						url: '/器具分类检测项目/器具分类检测项目(器具分类)/getJsonData?器具分类='+countVal,
					});	
				
			
          }
		
		//清空模态框里面所有数据
		function emptyModul(countVal){
				
			//判断指定的器具分类，打开不同模态框
			 if(countVal == "摆式摩擦系数测定仪" ||countVal == "车载式路面激光车辙仪" ||countVal == "车载式路面激光平整度仪"  ||countVal == "通信管道静摩擦系数标准器" || countVal == "通信管道静摩擦系数测量仪")
				{	
						
						$("#lato_flfsljcxmQjfl").val("");
						$("#lato_flfsljcxmQjmc").val("");
						$("#lato_flfsljcxmXhgg").val("");
						$("#lato_flfsljcxmCcbh").val("");
						$("#lato_flfsljcxmSl").val("1");
						$("#lato_flfsljcxmZzdw").val("");
						$("#lato_flfsljcxmYwlx").val("");
						$("#lato_flfslxmMxcount").val("");
						$("#lfsljcxmMxIndex").val("");
						$("#lato_flfsljcxmSfjj").prop("checked",false);
						$("#flfsljcxmTable tr:not(:first)").empty();
						$("#flfsljcxmForm").data('bootstrapValidator').resetForm();
						$("#lato_flfsljcxmSfjj").removeAttr('disabled');
						if(countVal == "车载式路面激光车辙仪" ||countVal == "车载式路面激光平整度仪" ){
							 $("#lato_flfsljcxmSfjj").attr("disabled","disabled");
						}
						$("#flfsljcxmTjsj").prop("disabled",false);
						$("#lato_flfsljcxmBdzt").val("");
						$("#lato_flfsljcxmBdbm").val("");
						$("#lato_flfsljcxmObjectId").val("");
						
						$("#tijiao2").prop("disabled",false);	
							$("#lato_flfsljcxmQjmc").prop("disabled",false);	
							$("#lato_flfsljcxmXhgg").prop("disabled",false);	
							$("#lato_flfsljcxmCcbh").prop("disabled",false);	
							$("#lato_flfsljcxmSl").prop("disabled",false);	
							$("#lato_flfsljcxmZzdw").prop("disabled",false);	
								$("#flfsljcxmTjsj").prop("disabled",false);
					
						
				}else if(countVal == "逆反射标志测量仪" ||countVal == "逆反射标志标准器组"){
					
					
						$("#lato_lfsbzljcxmQjfl").val("");
						$("#lato_lfsbzljcxmQjmc").val("");
						
						$("#lato_lfsbzljcxmXhgg").val("");
						$("#lato_lfsbzljcxmCcbh").val("");
						$("#lato_lfsbzljcxmSl").val("1");
						$("#lato_lfsbzljcxmZzdw").val("");
						$("#lato_lfsbzljcxmJcjd").val("");
						$("#lato_lfsljcxmObjectId").val("");
						$("#lato_lfslxmMxcount").val("");
						$("#lfslxmMxIndex").val("");
						$("#lato_lfsbzljcxmSfjj").prop("checked",false);
						$("#lfsbzljcxmTable tr:not(:first)").empty();
						$("#lato_lfsbzljcxmYwlx").val("");
						
						$("#tijiao3").prop("disabled",false);	
							$("#lato_lfsbzljcxmQjmc").prop("disabled",false);	
							$("#lato_lfsbzljcxmXhgg").prop("disabled",false);	
							$("#lato_lfsbzljcxmCcbh").prop("disabled",false);	
							$("#lato_lfsbzljcxmSl").prop("disabled",false);	
							$("#lato_lfsbzljcxmZzdw").prop("disabled",false);	
						
						$("#lato_lfsbzljcxmBdzt").val("");
						$("#lato_lfsbzljcxmBdbm").val("");
						$("#lato_lfsljcxmObjectId").val("");
						
						$("#lfsbzljcxmForm").data('bootstrapValidator').resetForm();
				}else if(countVal == "逆反射标线测量仪" ||countVal == "突起路标测量仪" ||countVal == "突起路标标准器组" ||countVal == "逆反射标线标准器组"){
						
						$("#lfsbxtqljcxmMxIndex").val(null);
						$("#lato_lfsbxtqljcxmQjfl").val(null);
					    $("#lato_lfsbxtqljcxmQjmc").val(null);
						$("#lato_lfsbxtqljcxmXhgg").val(null);
						$("#lato_lfsbxtqljcxmCcbh").val(null);
						$("#lato_lfsbxtqljcxmSl").val("1");
						$("#lato_lfsbxtqljcxmJcjd").val(null);
						$("#lato_lfsbxtqljcxmZzdw").val(null);
						$("#lato_lfsbxtqljcxmObjectId").val(null);
						$("#selectQjlx").val(null);
						$("#lato_lfsbxtqljcxmSfjj").prop("checked",false);
						$("#lato_lfsbxtqljcxmYs_white").prop("checked",false);
						$("#lato_lfsbxtqljcxmYs_yellow").prop("checked",false);
						$("#lfsljcxmTjsj").prop("disabled",false);
						$("#lfsxtqljcxmForm").data('bootstrapValidator').resetForm();
						$("#lato_lfsbxtqljcxmYwlx").val("");
						
						$("#lato_lfsbxtqljcxmBdzt").val("");
						$("#lato_lfsbxtqljcxmObjectId").val("");
						$("#lato_lfsbxtqljcxmBdbm").val("");
						   //$('#lfsxtqljcxmForm').bootstrapValidator('resetForm', true);
						   
							$("#tijiao1").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmQjmc").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmXhgg").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmCcbh").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmSl").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmJcjd").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmSfjj").prop("disabled",false);	
								$("#lato_lfsbxtqljcxmYs_white").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled",false);	
							$("#xzqj").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmZzdw").prop("disabled",false);	   
						   
				}
			
			
		}
		
		
		function editForm(formId,type,templateName,index,temp){
			var trIndex =	$(temp).parents("tr").index();
			
			$.get('/'+templateName+'/'+formId+'/jsonData?trIndex='+trIndex, function(data){
					
					if(templateName == '逆反射标线突起类检测项目'){
						emptyModul(data.lato_lfsbxtqljcxmQjfl);
						$("#lfsbxtqljcxmMxIndex").val(trIndex);
						$("#lato_lfsbxtqljcxmQjfl").val(data.lato_lfsbxtqljcxmQjfl);
					    $("#lato_lfsbxtqljcxmQjmc").val(data.lato_lfsbxtqljcxmQjmc);
						$("#lato_lfsbxtqljcxmXhgg").val(data.lato_lfsbxtqljcxmXhgg);
						$("#lato_lfsbxtqljcxmCcbh").val(data.lato_lfsbxtqljcxmCcbh);
						$("#lato_lfsbxtqljcxmSl").val(data.lato_lfsbxtqljcxmSl);
						$("#lato_lfsbxtqljcxmJcjd").val(data.lato_lfsbxtqljcxmJcjd);
						$("#lato_lfsbxtqljcxmZzdw").val(data.lato_lfsbxtqljcxmZzdw);
						$("#lato_lfsbxtqljcxmObjectId").val(data.lato_lfsbxtqljcxmObjectId);
						
						$("#lato_lfsbxtqljcxmBdzt").val(data.lato_lfsbxtqljcxmBdzt);
						$("#lato_lfsbxtqljcxmObjectId").val(data.lato_lfsbxtqljcxmObjectId);
						$("#lato_lfsbxtqljcxmBdbm").val(data.lato_lfsbxtqljcxmBdbm);
						
						$("#selectQjlx").val(data.lato_lfsbxtqljcxmQjfl);
						
						$("#lato_lfsbxtqljcxmYs_white").prop("checked",data.white);
						$("#lato_lfsbxtqljcxmYs_yellow").prop("checked",data.yellow);
						if(data.lato_lfsbxtqljcxmSfjj == "true"){
							$("#lato_lfsbxtqljcxmSfjj").prop("checked",data.lato_lfsbxtqljcxmSfjj);
						}
						
						//$("#lato_lfsbxtqljcxmYwlx").find("option[value='"+data.lato_lfsbxtqljcxmYwlx+"']").prop("selected",true);
						 $("#lato_lfsbxtqljcxmYwlx").val(data.lato_lfsbxtqljcxmYwlx);
						 
						 if(data.lato_lfsbxtqljcxmYwlx == "检定"){
							$("#lato_lfsbxtqljcxmYs_white").prop("disabled",true);
							$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled",true);
						}
						
						if(data.lato_lfsbxtqljcxmBdzt == "已审核"){
							$("#tijiao1").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmQjmc").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmXhgg").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmCcbh").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmSl").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmJcjd").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmSfjj").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmYs_white").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled","disabled");	
							$("#lato_lfsbxtqljcxmZzdw").prop("disabled","disabled");	
							$("#xzqj").prop("disabled","disabled");
						}else{
						
							$("#tijiao1").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmQjmc").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmXhgg").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmCcbh").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmSl").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmJcjd").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmSfjj").prop("disabled",false);	
								$("#lato_lfsbxtqljcxmYs_white").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled",false);	
							$("#xzqj").prop("disabled",false);	
							$("#lato_lfsbxtqljcxmZzdw").prop("disabled",false);	
						}
						
						$('#wtdwMode3').modal({
							keyboard: true
						})
						
						
						
						
						
						
					}else if(templateName == '逆反射类检测项目'){
					
							$('#jbxzTable').bootstrapTable('destroy').bootstrapTable({
							url: '/器具分类级别对照表/器具分类检测级别(器具分类)/getJsonData?器具分类='+data.lato_lfsbzljcxmQjfl,
						});
						
						emptyModul(data.lato_lfsbzljcxmQjfl);
						$("#lfsljcxmMxIndex").val(trIndex);
						$("#lato_lfsbzljcxmQjfl").val(data.lato_lfsbzljcxmQjfl);
						$("#lato_lfsbzljcxmQjmc").val(data.lato_lfsbzljcxmQjmc);
						$("#lato_lfsbzljcxmXhgg").val(data.lato_lfsbzljcxmXhgg);
						$("#lato_lfsbzljcxmCcbh").val(data.lato_lfsbzljcxmCcbh);
						$("#lato_lfsbzljcxmSl").val(data.lato_lfsbzljcxmSl);
						$("#lato_lfsbzljcxmZzdw").val(data.lato_lfsbzljcxmZzdw);
						
						$("#lato_lfsbzljcxmJcjd").val(data.lato_lfsbzljcxmJcjd);
						$("#lato_lfsljcxmObjectId").val(data.lato_lfsljcxmObjectId);
						
						$("#lato_lfsbzljcxmBdzt").val(data.lato_lfsbzljcxmBdzt);
						$("#lato_lfsbzljcxmBdbm").val(data.lato_lfsbzljcxmBdbm);
						$("#lato_lfsljcxmObjectId").val(data.lato_lfsljcxmObjectId);
						
						if(data.lato_lfsbzljcxmSfjj == "true"){
							$("#lato_lfsbzljcxmSfjj").prop("checked",data.lato_lfsbzljcxmSfjj);
						}
							
							
						//$("#lato_lfsbzljcxmYwlx").find("option[value='"+data.lato_lfsbzljcxmYwlx+"']").prop("selected",true);
						
						$("#lato_lfsbzljcxmYwlx").val(data.lato_lfsbzljcxmYwlx);
						
						var scjy = "";
						var bzjy = "";
						if(data.lato_lfsbzljcxmYwlx == "检定"){
							bzjy = "readonly='readonly' ";
							$("#lfsljcxmTjsj").prop("disabled","disabled");
							scjy = "disabled='disabled'";
						}
							//解析数组
						$.each(data.detailed, function(i, item) {
							
							var count =	$("#lato_lfslxmMxcount").val();
							var countVal = count;
							 var countVal2 = countVal;
							 var mxCountName = "lato_lfslxmMxcount";
							var trHtml="<tr "+item.classInfo+"><td><input type='hidden'  value='"+item.paramMap.lato_lfsljcxm_objectId+"' name='lato_lfsljcxm_objectId"+item.index+"' id='lato_lfsljcxm_objectId"+item.index+"'><input type='text' placeholder='请输入级别....' class='form-control' name='lato_lfsbzljcxmJb_"+item.index+"' readonly='readonly' id='lato_lfsbzljcxmJb_"+item.index+"' value='"+item.paramMap.lato_lfsbzljcxmJb+"'> <input type='hidden'  value='"+item.paramMap.lato_lfsljcxm_objectId+"' name='lato_lfsljcxm_objectId"+item.index+"' id='lato_lfsljcxm_objectId"+item.index+"'>  </td><td><input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+item.index+"' value='红' "+item.paramMap.red+"/> 红 <input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+item.index+"' value='绿' "+item.paramMap.green+" /> 绿 <input type='checkbox' name='lato_lfsbzljcxmYs[]_"+item.index+"'style='width:25px;' value='白'  "+item.paramMap.white+"/> 白<input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+item.index+"' value='黄' "+item.paramMap.yellow+" /> 黄<input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+item.index+"' value='蓝' "+item.paramMap.blue+"/> 蓝</td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' "+scjy+" onclick='removeTr(this,"+mxCountName+")'>删除行</button></div></td></tr>";
								
							var $tr=$("#lfsbzljcxmTable tr").eq(countVal);
							

							$tr.after(trHtml);
							var val2 = Number(countVal2)+1;
							$("#lato_lfslxmMxcount").val(val2);
							
							   
								
								if(data.lato_lfsbzljcxmYwlx == "检定"){
									$("[name='lato_lfsbzljcxmYs[]_"+item.index+"']").attr("disabled","disabled");//禁用
									$("[name='lato_lfsbzljcxmYs[]_"+item.index+"']").attr("checked",'true');//全选 
							 }
							
							
						});
						
						var mxCount = $("#lato_lfslxmMxcount").val();
						$("#lato_query_lfsljcxm_mx_count").val(mxCount);
						
						if(data.lato_lfsbzljcxmBdzt == "已审核"){
							$("#tijiao3").prop("disabled","disabled");	
							$("#lato_lfsbzljcxmQjmc").prop("disabled","disabled");	
							$("#lato_lfsbzljcxmXhgg").prop("disabled","disabled");	
							$("#lato_lfsbzljcxmCcbh").prop("disabled","disabled");	
							$("#lato_lfsbzljcxmSl").prop("disabled","disabled");	
							$("#lato_lfsbzljcxmZzdw").prop("disabled","disabled");	
							$("#lfsljcxmTjsj").prop("disabled","disabled");
						}else{
							$("#tijiao3").prop("disabled",false);	
							$("#lato_lfsbzljcxmQjmc").prop("disabled",false);	
							$("#lato_lfsbzljcxmXhgg").prop("disabled",false);	
							$("#lato_lfsbzljcxmCcbh").prop("disabled",false);	
							$("#lato_lfsbzljcxmSl").prop("disabled",false);	
							$("#lato_lfsbzljcxmZzdw").prop("disabled",false);	
							
						}
						
						
						$('#wtdwMode2').modal({
							keyboard: true
						})
						
						$("#selectQjlx").val(data.lato_lfsbzljcxmQjfl);
						
						
					}else if(templateName == '非逆反射类检测项目')
					{	
					
						emptyModul(data.lato_flfsljcxmQjfl);
						
						$('#flfsljcxmJcxmTable').bootstrapTable('destroy').bootstrapTable({
							url: '/器具分类检测项目/器具分类检测项目(器具分类)/getJsonData?器具分类='+data.lato_flfsljcxmQjfl,
						});
						$("#flfsljcxmMxIndex").val(trIndex);
						
						 //$("#lato_flfsljcxmYwlx").find("option[value='"+data.lato_flfsljcxmYwlx+"']").prop("selected",true);
						 $("#lato_flfsljcxmYwlx").val(data.lato_flfsljcxmYwlx);
						if(data.lato_flfsljcxmSfjj == "true"){
							$("#lato_flfsljcxmSfjj").prop("checked",data.lato_flfsljcxmSfjj);
						}
						
						
						$("#lato_flfsljcxmBdzt").val(data.lato_flfsljcxmBdzt);
						$("#lato_flfsljcxmBdbm").val(data.lato_flfsljcxmBdbm);
						$("#lato_flfsljcxmObjectId").val(data.lato_flfsljcxmObjectId);
						
						$("#lato_flfsljcxmQjfl").val(data.lato_flfsljcxmQjfl);
						
						$("#lato_flfsljcxmQjmc").val(data.lato_flfsljcxmQjmc);
						$("#lato_flfsljcxmXhgg").val(data.lato_flfsljcxmXhgg);
						$("#lato_flfsljcxmCcbh").val(data.lato_flfsljcxmCcbh);
						$("#lato_flfsljcxmSl").val(data.lato_flfsljcxmSl);
						$("#lato_flfsljcxmZzdw").val(data.lato_flfsljcxmZzdw);
						
						$("#selectQjlx").val(data.lato_flfsljcxmQjfl);
						$("#lato_flfsljcxmObjectId").val(data.lato_flfsljcxmObjectId);
						
						var scjy = "";
						var bzjy = "";
						if(data.lato_flfsljcxmYwlx == "检定"){
							scjy ="disabled='disabled'";
							bzjy = "readonly='readonly' ";
							$("#flfsljcxmTjsj").prop("disabled","disabled");
						}
						//解析数组
						$.each(data.detailed, function(i, item) {
							
							var count =	$("#lato_flfslxmMxcount").val();
							var countVal = count;
							 var countVal2 = countVal;
							 
							  var mxCountName = "lato_flfslxmMxcount";
							 
							var trHtml="<tr "+item.classInfo+"><td><input type='hidden' value='"+item.paramMap.lato_flfsljcxm_objectId+"' name='lato_flfsljcxm_objectId"+item.index+"' id='lato_flfsljcxm_objectId"+item.index+"'> <input type='text' placeholder='请输入编号....' class='form-control' name='lato_flfsljcxmBh_"+item.index+"' id='lato_flfsljcxmBh_"+item.index+"' readonly='readonly'  value="+item.paramMap.lato_flfsljcxmBh+"></td><td><input type='text' placeholder='请输入检测项目....' class='form-control' readonly='readonly'  name='lato_flfsljcxmJcxm_"+item.index+"' id='lato_flfsljcxmJcxm_"+item.index+"' value="+item.paramMap.lato_flfsljcxmJcxm+" ></td><td><input type='text' placeholder='请输入备注....' "+bzjy+" class='form-control' name='lato_flfsljcxmBz_"+item.index+"' id='lato_flfsljcxmBz_"+item.index+"' value="+item.paramMap.lato_flfsljcxmBz+"></td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' "+scjy+" onclick='removeTr(this,"+mxCountName+")'>删除行</button></div></td></tr>";
								
							var $tr=$("#flfsljcxmTable tr").eq(countVal);
							

							$tr.after(trHtml);
							var val2 = Number(countVal2)+1;
							$("#lato_flfslxmMxcount").val(val2);
							
						});
						var mxCount = $("#lato_flfslxmMxcount").val();
						
						$("#lato_query_flfslxm_mx_count").val(mxCount);
						
						
						if(data.lato_flfsljcxmBdzt == "已审核"){
							$("#tijiao2").prop("disabled","disabled");	
							$("#lato_flfsljcxmQjmc").prop("disabled","disabled");	
							$("#lato_flfsljcxmXhgg").prop("disabled","disabled");	
							$("#lato_flfsljcxmCcbh").prop("disabled","disabled");	
							$("#lato_flfsljcxmSl").prop("disabled","disabled");	
							$("#lato_flfsljcxmZzdw").prop("disabled","disabled");	
							$("#flfsljcxmTjsj").prop("disabled","disabled");
						}else{
							$("#tijiao2").prop("disabled",false);	
							$("#lato_flfsljcxmQjmc").prop("disabled",false);	
							$("#lato_flfsljcxmXhgg").prop("disabled",false);	
							$("#lato_flfsljcxmCcbh").prop("disabled",false);	
							$("#lato_flfsljcxmSl").prop("disabled",false);	
							$("#lato_flfsljcxmZzdw").prop("disabled",false);	
								$("#flfsljcxmTjsj").prop("disabled",false);
						
						}
						$('#wtdwMode4').modal({
							keyboard: true,
							draggable: true
						})
						
						
						
					}
				
			},'json');
			
		
		}
		
		function selectModal(){
               var value =JSON.stringify($('#jbxzTable').bootstrapTable('getSelections'));
                 var ids = $.map($('#jbxzTable').bootstrapTable('getSelections'), function (row,index) {
									
                                   var countVal = $("#lato_lfslxmMxcount").val();
                                   var countVal2 = countVal;
                                   var val2 = Number(countVal2)+1;
                                  
                                   var classInfo = "class='warning'";
                                   
									var mxCountName = "lato_lfslxmMxcount";
									
								   	var trHtml="<tr "+classInfo+"><td><input type='text' placeholder='请输入级别....' class='form-control' name='lato_lfsbzljcxmJb_"+val2+"' readonly='readonly' id='lato_lfsbzljcxmJb_"+val2+"' value="+row.lato_jb+"></td><td><input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='红' /> 红 <input type='checkbox' name='lato_lfsbzljcxmYs[]_"+val2+"' value='绿' style='width:25px;' /> 绿 <input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='白' /> 白<input type='checkbox'  style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='黄' /> 黄<input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='蓝' /> 蓝</td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' onclick='removeTr(this,"+mxCountName+")'>删除行</button></div></td></tr>";
					
								  
                                   var $tr=$("#lfsbzljcxmTable tr").eq(countVal);
                                   if($tr.size()==0){
                                        alert("指定的table id或行数不存在！");
                                        return;
                                   }
                                   $tr.after(trHtml);
                                   $("#lato_lfslxmMxcount").val(val2);
                                   $('#lfsjcxmJbxz').modal("hide");
								   
								   
                    });
          }
		  
		 
		function addJibieData(){
			$('#lfsjcxmJbxz').modal({
					keyboard: true
				})
		}
		  
		function addData(){
			$('#flfsljcxmJcxmlb').modal({
					keyboard: true
				})
		
		}
		
		
    $(document).ready(function() {
		
		
		$('#sub-item-2').addClass('in');
		var v2 = $("#lato_wtdcglBdzt").val();
		if(v2.length > 0 && "已审核"==v2)
		{	
			$("#tjsj").hide();
			$("#tj").hide();
			$("#tijiao4").hide();
		}
		
		
		
		
		$('#lato_lfsbxtqljcxmJcjd').on('keyup click', function(event){
			
			
			var ywlx =	$("#lato_lfsbxtqljcxmYwlx").val();
			if(ywlx != "检定"){
			var companyList =$("#testList1");
				var me = this;
				 $.get("/逆反射类检测角度/可用检测角度下拉(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
	    		        companyList.empty();
					for(var i = 0; i < data.length; i++)
						companyList.append("<li><a tabindex='-1' class='fromLocationItem' value='"+data[i]+"' >"+data[i]+"</a></li>");
						
					companyList.css({ 
						left:$(me).position().left+"px", 
						top:$(me).position().top+28+"px" 
					});
					companyList.show();    
				},'json');
			}
				
		});
			
		$('#testList1').on('click', '.fromLocationItem', function(e){ 
			
			$("#lato_lfsbxtqljcxmJcjd").val($(this).attr('value'));
			var companyList =$("#testList1");
			
			$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmJcjd','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmJcjd');
			
			companyList.hide();
		})
		
		
		
		$('#lato_lfsbxtqljcxmYwlx').on('keyup click', function(event){
		
			if($("#lato_lfsbxtqljcxmBdzt").val() != "已审核"){
		
				var companyList =$("#testList2");
				var me = this;
				 $.get("/器具分类/器具分类的业务类型(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
	    		        companyList.empty();
					for(var i = 0; i < data.length; i++)
						companyList.append("<li><a tabindex='-1' class='fromLocationItem' value='"+data[i]+"' >"+data[i]+"</a></li>");
						
					companyList.css({ 
						left:$(me).position().left+"px", 
						top:$(me).position().top+28+"px" 
					});
					companyList.show();    
				},'json');
				
			}					
				
			});
			
		$('#testList2').on('click', '.fromLocationItem', function(e){ 
			var value = $(this).attr('value');
			$("#lato_lfsbxtqljcxmYwlx").val(value);
			
			var companyList =$("#testList2");
			$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmYwlx','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmYwlx');
			companyList.hide();
			if(value == "检定"){
				
				$("#lato_lfsbxtqljcxmYs_white").prop("checked",true);
				$("#lato_lfsbxtqljcxmYs_yellow").prop("checked",true);
				$("#lato_lfsbxtqljcxmYs_white").prop("disabled",true);
				$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled",true);
				
				$.get("/逆反射类检测角度/全角度下拉列表(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
					var value =	data[0];
					$("#lato_lfsbxtqljcxmJcjd").val(value);	
				$('#lfsxtqljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbxtqljcxmJcjd','NOT_VALIDATED').validateField('lato_lfsbxtqljcxmJcjd');	
				},'json');
				
				
			}else{
				$("#lato_lfsbxtqljcxmYs_white").prop("checked",false);
				$("#lato_lfsbxtqljcxmYs_yellow").prop("checked",false);
				$("#lato_lfsbxtqljcxmYs_white").prop("disabled",false);
				$("#lato_lfsbxtqljcxmYs_yellow").prop("disabled",false);
				$("#lato_lfsbxtqljcxmJcjd").val("");
			}
			
		})
			
		
		
		$('#lato_lfsbzljcxmYwlx').on('keyup click', function(event){
		
			if($("#lato_lfsbzljcxmBdzt").val() != "已审核"){
				var companyList =$("#testList3");
				var me = this;
				 $.get("/器具分类/器具分类的业务类型(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
	    		        companyList.empty();
					for(var i = 0; i < data.length; i++)
						companyList.append("<li><a tabindex='-1' class='fromLocationItem' value='"+data[i]+"' >"+data[i]+"</a></li>");
						
					companyList.css({ 
						left:$(me).position().left+"px", 
						top:$(me).position().top+28+"px" 
					});
					companyList.show();    
				},'json');
			}
			
			});
			
		$('#testList3').on('click', '.fromLocationItem', function(e){ 
			var value = $(this).attr('value');
			$("#lato_lfsbzljcxmYwlx").val(value);
			
			
			
			$("#lfsbzljcxmTable tr:not(:first)").empty();
			$("#lfsljcxmTjsj").prop("disabled",false);
			 $("#lato_lfslxmMxcount").val(0);
			if(value == "检定"){
			
					 $.get("/器具分类级别对照表/器具分类检测级别(器具分类)/getJsonData?器具分类="+ $("#selectQjlx").val(), function(data){
									$("#lfsljcxmTjsj").prop("disabled",true);
									var data1 = $.parseJSON(data);
									
								    $.each(data1, function(i, item) {
										    var countVal = $("#lato_lfslxmMxcount").val();
										   var countVal2 = countVal;
										   var val2 = Number(countVal2)+1;
										  
										   var classInfo = "class='warning'";
									
											var mxCountName = "lato_lfslxmMxcount";
											var trHtml="<tr "+classInfo+"><td><input type='text' placeholder='请输入级别....' class='form-control' name='lato_lfsbzljcxmJb_"+val2+"' readonly='readonly'  value="+item.lato_jb+"></td><td><input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"'  value='红'  /> 红 <input type='checkbox' name='lato_lfsbzljcxmYs[]_"+val2+"'  value='绿' style='width:25px;'  /> 绿 <input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='白'  /> 白<input type='checkbox'  style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='黄' /> 黄<input type='checkbox' style='width:25px;' name='lato_lfsbzljcxmYs[]_"+val2+"' value='蓝' /> 蓝</td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' disabled='true' onclick='removeTr(this,"+mxCountName+")'>删除行</button>  </div></td></tr>";

										  
										   var $tr=$("#lfsbzljcxmTable tr").eq(countVal);
										   if($tr.size()==0){
												alert("指定的table id或行数不存在！");
												return;
										   }
										   $tr.after(trHtml);
										   $("#lato_lfslxmMxcount").val(val2);
										   
										    $("[name='lato_lfsbzljcxmYs[]_"+val2+"']").attr("checked",'true');//全选 
										   $("[name='lato_lfsbzljcxmYs[]_"+val2+"']").attr("disabled","disabled");//禁用
											
									});
					})
					
					$.get("/逆反射类检测角度/全角度下拉列表(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
								var value = data[0];
								$("#lato_lfsbzljcxmJcjd").val(value);	
								$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmJcjd','NOT_VALIDATED').validateField('lato_lfsbzljcxmJcjd');	
						},'json');
					
					
			}else{
			
				$("#lato_lfsbzljcxmJcjd").val("");	
			}
			
			
			
			var companyList =$("#testList3");
			$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmYwlx','NOT_VALIDATED').validateField('lato_lfsbzljcxmYwlx');
		
			companyList.hide();
		})
		
		
		$('#lato_flfsljcxmYwlx').on('keyup click', function(event){
		
		if($("#lato_flfsljcxmBdzt").val() != "已审核"){
		
				var companyList =$("#testList4");
				var me = this;
				 $.get("/器具分类/器具分类的业务类型(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
	    		        companyList.empty();
					for(var i = 0; i < data.length; i++)
						companyList.append("<li><a tabindex='-1' class='fromLocationItem' value='"+data[i]+"' >"+data[i]+"</a></li>");
						
					companyList.css({ 
						left:$(me).position().left+"px", 
						top:$(me).position().top+28+"px" 
					});
					companyList.show();    
				},'json');
		}
			});
			
		$('#testList4').on('click', '.fromLocationItem', function(e){ 
			var value = $(this).attr('value');
			$("#lato_flfsljcxmYwlx").val(value);
			
			$("#flfsljcxmTable tr:not(:first)").empty();
			$("#flfsljcxmTjsj").prop("disabled",false);
			 $("#lato_flfslxmMxcount").val(0);
			if(value == "检定"){
					 $.get("/器具分类检测项目/器具分类检测项目(器具分类)/getJsonData?器具分类="+ $("#selectQjlx").val(), function(data){
									$("#flfsljcxmTjsj").prop("disabled",true);
									var data1 = $.parseJSON(data);
								    $.each(data1, function(i, item) {
										  var countVal = $("#lato_flfslxmMxcount").val();
										   var countVal2 = countVal;
										   var val2 = Number(countVal2)+1;
										  
										   var classInfo = "class='warning'";
										   
											var mxCountName = "lato_flfslxmMxcount";
										  
											var trHtml="<tr "+classInfo+"><td><input type='text' placeholder='请输入编号....' class='form-control' name='lato_flfsljcxmBh_"+val2+"' id='lato_flfsljcxmBh_"+val2+"' readonly='readonly'  value="+item.lato_bh+"></td><td><input type='text' placeholder='请输入检测项目....' class='form-control' readonly='readonly'  name='lato_flfsljcxmJcxm_"+val2+"' id='lato_flfsljcxmJcxm_"+val2+"' value="+item.lato_jcxm+" ></td><td><input type='text' placeholder='请输入备注....' readonly='readonly' class='form-control' name='lato_flfsljcxmBz_"+val2+"' id='lato_flfsljcxmBz_"+val2+"'></td><td> <div class='col-lg-4'><button type='button' class='btn btn-default btn-sm removeButton' disabled='disabled' onclick='removeTr(this,"+mxCountName+")'>删除行</button></div></td></tr>";
										  
										   var $tr=$("#flfsljcxmTable tr").eq(countVal);
										   if($tr.size()==0){
												alert("指定的table id或行数不存在！");
												return;
										   }
										   $tr.after(trHtml);
										   $("#lato_flfslxmMxcount").val(val2);
										   $('#flfsljcxmJcxmlb').modal("hide");
									});
					})
					
					
			}
			
			var companyList =$("#testList4");
			$('#flfsljcxmForm').data('bootstrapValidator').updateStatus('lato_flfsljcxmYwlx','NOT_VALIDATED').validateField('lato_flfsljcxmYwlx');
		
			companyList.hide();
		})
		
		
		$('#lato_lfsbzljcxmJcjd').on('keyup click', function(event){
				
				if($("#lato_lfsbzljcxmBdzt").val() != "已审核"){
				
					var value = $("#lato_lfsbzljcxmYwlx").val();
					
					if(value != "检定"){
						var companyList =$("#testList");
						var me = this;
						 $.get("/逆反射类检测角度/可用检测角度下拉(器具分类)/getDropListData?器具分类="+ $("#selectQjlx").val(), function(data){
								companyList.empty();
							for(var i = 0; i < data.length; i++)
								companyList.append("<li><a tabindex='-1' class='fromLocationItem' value='"+data[i]+"' >"+data[i]+"</a></li>");
								
							companyList.css({ 
								left:$(me).position().left+"px", 
								top:$(me).position().top+28+"px" 
							});
							companyList.show();    
						},'json');
					
					}
				}
			});
			
		
			
	
	$('#testList').on('click', '.fromLocationItem', function(e){ 
		$("#lato_lfsbzljcxmJcjd").val($(this).attr('value'));
		var companyList =$("#testList");
		
		$('#lfsbzljcxmForm').data('bootstrapValidator').updateStatus('lato_lfsbzljcxmJcjd','NOT_VALIDATED').validateField('lato_lfsbzljcxmJcjd');
		companyList.hide();
	})

		var v1 = $("#lato_weituodan_objectId").val();// "${flash.lato_weituodan_objectId}";
			if(v1.length < 1)
				{
				 $("#print").hide();
				}
		
		 $('#lfsbzljcxmForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
				excluded: [':disabled'],
                fields: {
					'lato_lfsbzljcxmXhgg':{
					
					validators: {
                            notEmpty: {
                                message: '型号规格必须填写必须进行填写...'
                            }
                        }
					},
					'lato_lfsbzljcxmYwlx':{
					  validators: {
                            notEmpty: {
                                message: '业务类型必须填写必须进行填写...'
                            }
                        }
					},
                    'lato_lfsbzljcxmQjfl': {
                        validators: {
                            notEmpty: {
                                message: '器具分类必须进行填写...'
                            }
                        }
                    },
					'lato_lfsbzljcxmJcjd':{
					validators: {
                            notEmpty: {
                                message: '检测角度必须填写...'
                            }
                        }
					
					},
					'lato_lfsbzljcxmQjmc': {
                        validators: {
                            notEmpty: {
                                message: '器具名称必须进行填写...'
                            }
                        }
                    },'lato_lfsbzljcxmGgxh': {
                        validators: {
                            notEmpty: {
                                message: '型号规格必须进行填写...'
                            }
                        }
                    },'lato_lfsbzljcxmCcbh': {
                        validators: {
                            notEmpty: {
                                message: '出厂编号必须进行填写...'
                            }
                        }
                    },'lato_lfsbzljcxmSl': {
                        validators: {
                            notEmpty: {
                                message: '数量必须进行填写,并且必须填写数字...'
                            }
                        }
                    },'lato_lfsbzljcxmZzdw': {
                        validators: {
                            notEmpty: {
                                message: '制造单位必须进行填写...'
                            }
                        }
                    },
                    'lato_lfsbzljcYs[]': {
                        validators: {
                            notEmpty: {
                                message: '必须选择一种颜色'
                            }
                        }
                    },
                    'radio[]': {
                        validators: {
                            notEmpty: {
                                message: 'The radio field is required'
                            }
                        }
                    }
                }
            })
            .on('error.field.bv', function(e, data) {
                //console.log('error.field.bv -->', data.element);
            })
            .on('success.form.bv', function(e, data) {
                //console.log('success.field.bv -->', data.element);
				 e.preventDefault();
				
			var validCode=true;
			var v3 = $("#selectQjlx").val();
			var a1 =	$("#lato_mast_uuid").val();
			$("#lato_lfsbzljcxmBdbm").val(a1);
			debugger;
			var uuIdTest = Math.uuidFast();
			$("#lato_lfsljcxmUuid").val(uuIdTest);
			
			var params=$("form").serialize();
			
			$.ajax({
						url:"/逆反射类检测项目/form",
						type:'POST',
						dataType:'json',
						data:params
						,success:function(data){
							
							
							
							var trIndex = 0;
							var id =  $("#lato_lfsljcxmObjectId").val();
							//生成一个委托单存根联记录
							var countVal = $("#lato_weituodan_mxcount").val();
							var countVal2 = countVal;
							var val2 = Number(countVal2);
							//如果是修改，则将当前行进行删除，并且添加一行新记录
							if(id > 0){
							 trIndex =	$("#lfsljcxmMxIndex").val();
							var removeIndex = Number(trIndex);
							trIndex = removeIndex;
							var text=	$("#weituodanMxTable tr:gt(0):eq("+removeIndex+")").remove();
							val2 = trIndex;
							}else{
								val2 = val2 +1;
								trIndex = val2;
							}
							
							var classInfo = "class='warning'";
							
							
							var formId = data.objectId;
							var type = $("#selectQjlx").val();
							var trHtml="<tr "+classInfo+" ><td><input type='text'  class='form-control' name='lato_wtdcglXh_"+val2+"' id='lato_wtdcglXh_"+val2+"' placeholder='请输入序号...' value='"+val2+"' ></td><td>										<input type='text'  class='form-control' name='lato_wtdcglDqzt_"+val2+"' id='lato_wtdcglDqzt_"+val2+"' placeholder='' value='已提交' readonly='readonly'></td><td><input type='text'  class='form-control' name='lato_wtdcglQjmc_"+val2+"' id='lato_wtdcglQjmc_"+val2+"' placeholder='请输入器具名称...' value='"+$("#lato_lfsbzljcxmQjmc").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglQjfl_"+val2+"' id='lato_wtdcglQjfl_"+val2+"' placeholder='请输入器具类型...' value='"+v3+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglGgxh_"+val2+"' id='lato_wtdcglGgxh_"+val2+"' placeholder='请输入规格型号...' value='"+$("#lato_lfsbzljcxmXhgg").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglCcbh_"+val2+"' id='lato_wtdcglCcbh_"+val2+"' placeholder='请输入出厂编号...' value='"+$("#lato_lfsbzljcxmCcbh").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglSl_"+val2+"' id='lato_wtdcglSl_"+val2+"' placeholder='请输入数量...' value='"+$("#lato_lfsbzljcxmSl").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglScdw_"+val2+"' id='lato_wtdcglScdw_"+val2+"' placeholder='请输入生产单位...' value='"+$("#lato_lfsbzljcxmZzdw").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglYwlx_"+val2+"' id='lato_wtdcglYwlx_"+val2+"' placeholder='请输入业务类型...' value='"+$("#lato_lfsbzljcxmYwlx").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglBs_"+val2+"' id='lato_wtdcglBs_"+val2+"' readonly='readonly' placeholder='' value='"+data.板数+"' ></td> <td> <input type='hidden' name='lato_uuid_"+val2+"' id='lato_uuid_"+val2+"' value="+uuIdTest+" />  <input type='hidden' name='lato_web_"+val2+"' id='lato_web_"+val2+"' value='true' /> <input type='hidden' name='lato_wtdcglJj_"+val2+"' id='lato_wtdcglJj_"+val2+"' value='"+data.是否加急+"' />  <input type='hidden'  name='lato_wtdcgl_mx_objectId_"+val2+"' id='lato_wtdcgl_mx_objectId_"+val2+"'  value="+data.objectId+">  <input type='hidden'  name='lato_templateName_"+val2+"' id='lato_templateName_"+val2+"'  value='逆反射类检测项目'> <button type='button'  class='btn btn-default btn-sm removeButton' onclick='editForm(\""+formId+"\",\""+type+"\",\"逆反射类检测项目\",\""+val2+"\",this)'>编辑</td><td></button><button type='button'  class='btn btn-default btn-sm removeButton' onclick='removeWeituodanTr(this)'>删除行</button></td></tr>";
							
							var $tr=$("#weituodanMxTable tr").eq(trIndex);
							 if($tr.size()==0){
								alert("指定的table id或行数不存在！");
								return;
							 }
							 $tr.after(trHtml);
							 $("#lato_weituodan_mxcount").val(val2);
							 
							 //隐藏模态框
							 $('#wtdwMode2').modal("hide");
							 
						}
						,error:function(XMLHttpRequest, textStatus, errorThrown){
									
									var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
									var text1 =	text.replace(/\r\n|\n|\r/g,'');
									var va11 =	decodeURI(text1);
									var val2="出现异常";
									
									var dataObj=eval("("+va11+")");
									
									document.getElementById("errorTypeSpan").innerText = val2;
									document.getElementById("errorSpan").innerText = dataObj.message;
									$('#errorModel').modal({
										  keyboard: true
									   })
									   
								$("#lfsbzljcxmForm").data('bootstrapValidator').resetForm();
							}
						}
					);
				
            })
            .on('added.field.bv', function(e, data) {
                //console.log('Added element -->', data.field, data.element);
            })
            .on('removed.field.bv', function(e, data) {
                //console.log('Removed element -->', data.field, data.element);
            });
		
		 
			
          $('#lfsxtqljcxmForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
				excluded: [':disabled'],
                fields: {
				    'lato_lfsbxtqljcxmJcjd':{
					
					    validators: {
                            notEmpty: {
                                message: '检测角度必须进行填写...'
                            }
                        }
					
					},'lato_lfsbxtqljcxmYwlx':{
						  validators: {
                            notEmpty: {
                                message: '业务类型必须进行填写...'
                            }
                        }
					
					},
                    'lato_lfsbxtqljcxmQjfl': {
                        validators: {
                            notEmpty: {
                                message: '器具分类必须进行填写...'
                            }
                        }
                    },
					'lato_lfsbxtqljcxmQjmc': {
                        validators: {
                            notEmpty: {
                                message: '器具名称必须进行填写...'
                            }
                        }
                    },'lato_lfsbxtqljcxmXhgg': {
                        validators: {
                            notEmpty: {
                                message: '型号规格必须进行填写...'
                            }
                        }
                    },'lato_lfsbxtqljcxmCcbh': {
                        validators: {
                            notEmpty: {
                                message: '出厂编号必须进行填写...'
                            }
                        }
                    },'lato_lfsbxtqljcxmSl': {
                        validators: {
                            notEmpty: {
                               message: '数量必须进行填写,并且必须填写数字...'
                            }
                        }
                    },'lato_lfsbxtqljcxmZzdw': {
                        validators: {
                            notEmpty: {
                                message: '制造单位必须进行填写...'
                            }
                        }
                    },
                    'lato_lfsbxtqljcxmYs[]': {
                        validators: {
                            notEmpty: {
                                message: '颜色必须要进行选择'
                            }
                        }
                    },
                    'radio[]': {
                        validators: {
                            notEmpty: {
                                message: 'The radio field is required'
                            }
                        }
                    }
                }
            })
            .on('error.field.bv', function(e, data) {
                //console.log('error.field.bv -->', data.element);
            })
            .on('success.form.bv', function(e, data) {
			
				 e.preventDefault();
				 	var uuIdTest = Math.uuidFast();
					$("#lato_lfsbxtqljcxmUuid").val(uuIdTest);
					var validCode=true;
					var countVal = $("#lato_weituodan_mxcount").val();
						debugger;
					var a1 =	$("#lato_mast_uuid").val();
					$("#lato_lfsbxtqljcxmBdbm").val(a1);
					
					
					var params=$("form").serialize();
					$.ajax({
								url:"/逆反射标线突起类检测项目/form",
								type:'POST',
								dataType:'json',
								data:params
								,success:function(data){
									
									
									
									//alert(data.test1);
									var id =  $("#lato_lfsbxtqljcxmObjectId").val();
									//生成一个委托单存根联记录
									
									var countVal2 = countVal;
									var val2 = Number(countVal2);
									//如果是修改，则将当前行进行删除，并且添加一行新记录
									if(id > 0){
										var trIndex =	$("#lfsbxtqljcxmMxIndex").val();
										var removeIndex = Number(trIndex);
										val2 = removeIndex;
										var text=	$("#weituodanMxTable tr:gt(0):eq("+removeIndex+")").remove();
									}else{
										val2 = val2 +1;
										trIndex = val2;
										//只有修改的情况才会进行修改明细记录数
										$("#lato_weituodan_mxcount").val(val2);
									}
									
										var classInfo = "class='warning'";
										
										var formId = data.objectId;
										
										var type = $("#selectQjlx").val();
										
										var trHtml="<tr "+classInfo+" ><td><input type='text'  class='form-control' name='lato_wtdcglXh_"+val2+"' id='lato_wtdcglXh_"+val2+"' placeholder='请输入序号...' value='"+val2+"' ></td><td>										<input type='text'  class='form-control' name='lato_wtdcglDqzt_"+val2+"' id='lato_wtdcglDqzt_"+val2+"' placeholder='' value='已提交'  readonly='readonly'></td><td><input type='text'  class='form-control' name='lato_wtdcglQjmc_"+val2+"' id='lato_wtdcglQjmc_"+val2+"' placeholder='请输入器具名称...' value='"+$("#lato_lfsbxtqljcxmQjmc").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglQjfl_"+val2+"' id='lato_wtdcglQjfl_"+val2+"' placeholder='请输入器具类型...' value='"+type+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglGgxh_"+val2+"' id='lato_wtdcglGgxh_"+val2+"' placeholder='请输入规格型号...' value='"+$("#lato_lfsbxtqljcxmXhgg").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglCcbh_"+val2+"' id='lato_wtdcglCcbh_"+val2+"' placeholder='请输入出厂编号...' value='"+$("#lato_lfsbxtqljcxmCcbh").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglSl_"+val2+"' id='lato_wtdcglSl_"+val2+"' placeholder='请输入数量...' value='"+$("#lato_lfsbxtqljcxmSl").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglScdw_"+val2+"' id='lato_wtdcglScdw_"+val2+"' placeholder='请输入生产单位...' value='"+$("#lato_lfsbxtqljcxmZzdw").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglYwlx_"+val2+"' id='lato_wtdcglYwlx_"+val2+"' placeholder='请输入业务类型...' value='"+$("#lato_lfsbxtqljcxmYwlx").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglBs_"+val2+"' id='lato_wtdcglBs_"+val2+"' placeholder='' readonly='readonly' value='"+data.板数+"' ></td><td> <input type='hidden' name='lato_uuid_"+val2+"' id='lato_uuid_"+val2+"' value="+uuIdTest+" /> <input type='hidden' name='lato_web_"+val2+"' id='lato_web_"+val2+"' value='true' /> <input type='hidden' name='lato_wtdcglJj_"+val2+"' id='lato_wtdcglJj_"+val2+"' value='"+data.是否加急+"' /> <input type='hidden'  name='lato_wtdcgl_mx_objectId_"+val2+"' id='lato_wtdcgl_mx_objectId_"+val2+"'  value="+data.objectId+"> <input type='hidden'  name='lato_templateName_"+val2+"' id='lato_templateName_"+val2+"'  value='逆反射标线突起类检测项目'> <button type='button'  class='btn btn-default btn-sm' onclick='editForm(\""+formId+"\",\""+type+"\",\"逆反射标线突起类检测项目\",\""+val2+"\",this)'>编辑 </button></td><td><button type='button'  class='btn btn-default btn-sm removeButton' onclick='removeWeituodanTr(this)'>删除行</button></td></tr>";
										
										var $tr=$("#weituodanMxTable tr").eq(val2);
										 if($tr.size()==0){
											alert("指定的table id或行数不存在！");
											return;
										 }
										 $tr.after(trHtml);
										//隐藏模态框
									 $('#wtdwMode3').modal("hide"); 
								}
								,error:function(XMLHttpRequest, textStatus, errorThrown){
											
											
										 	 var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
									var text1 =	text.replace(/\r\n|\n|\r/g,'');
									var va11 =	decodeURI(text1);
											var val2="出现异常";
											
											var dataObj=eval("("+va11+")");
											
											document.getElementById("errorTypeSpan").innerText = val2;
											document.getElementById("errorSpan").innerText = dataObj.message;
											$('#errorModel').modal({
												  keyboard: true
											   })
											$("#lfsxtqljcxmForm").data('bootstrapValidator').resetForm();
											
										
									}
								}
							);
			
				 
			
                //console.log('success.field.bv -->', data.element);
            })
            .on('added.field.bv', function(e, data) {
                //console.log('Added element -->', data.field, data.element);
            })
            .on('removed.field.bv', function(e, data) {
                //console.log('Removed element -->', data.field, data.element);
            });  
		
		
		
		$('#flfsljcxmForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
				excluded: [':disabled'],
                fields: {
					'lato_flfsljcxmYwlx':{
					
					  validators: {
                            notEmpty: {
                                message: '业务类型必须进行填写...'
                            }
                        }
					},
                    'lato_flfsljcxmQjmc': {
                        validators: {
                            notEmpty: {
                                message: '器具名称必须进行填写...'
                            }
                        }
                    },'lato_flfsljcxmXhgg':{
					
						  validators: {
                            notEmpty: {
                                message: '型号规格必须填写...'
                            }
                        }
					},'lato_flfsljcxmCcbh':{
					
						  validators: {
                            notEmpty: {
                                message: '出厂编号必须填写...'
                            }
                        }
					},'lato_flfsljcxmSl':{
					
						  validators: {
                            notEmpty: {
                                message: '数量必须进行填写,并且必须填写数字...'
                            }
                        }
					},'lato_flfsljcxmZzdw':{
						  validators: {
                            notEmpty: {
                                message: '制造单位必须填写...'
                            }
                        }
					},'lato_flfsljcxmYwlx':{
					
						  validators: {
                            notEmpty: {
                                message: '业务类型必须填写...'
                            }
                        }
					},
                    'radio[]': {
                        validators: {
                            notEmpty: {
                                message: 'The radio field is required'
                            }
                        }
                    }
                }
            })
            .on('error.field.bv', function(e, data) {
                //console.log('error.field.bv -->', data.element);
            })
            .on('success.form.bv', function(e, data) {
			
			   e.preventDefault();
			  
			  var uuIdTest = Math.uuidFast();
			 $("#lato_flfsljcxmUuid").val(uuIdTest);
			 	debugger;
			 var a1 =	$("#lato_mast_uuid").val();
			$("#lato_flfsljcxmBdbm").val(a1);
			
			var validCode=true;
			var params=$("form").serialize();
			$.ajax({
						url:"/非逆反射类检测项目/form",
						type:'POST',
						dataType:'json',
						data:params
						,success:function(data){
						
							//alert(data.test1);
							
							var trIndex = 0;
							//alert(data.test1);
							var id =  $("#lato_flfsljcxmObjectId").val();
							//生成一个委托单存根联记录
							var countVal = $("#lato_weituodan_mxcount").val();
							var countVal2 = countVal;
							var val2 = Number(countVal2);
							//如果是修改，则将当前行进行删除，并且添加一行新记录
							if(id > 0){
							
									 trIndex =	$("#flfsljcxmMxIndex").val();
									var removeIndex = Number(trIndex);
									trIndex = removeIndex;
									var text=	$("#weituodanMxTable tr:gt(0):eq("+removeIndex+")").remove();
									val2 = trIndex;
							}else{
								val2 = val2 +1;
								trIndex = val2;
							}
							
							var type = $("#selectQjlx").val();
							
							
							var classInfo = "class='warning'";
							
						
							var formId = data.objectId;
							
							var trHtml="<tr "+classInfo+" ><td><input type='text'  class='form-control' name='lato_wtdcglXh_"+val2+"' id='lato_wtdcglXh_"+val2+"' placeholder='请输入序号...' value='"+val2+"' ></td><td>										<input type='text'  class='form-control' name='lato_wtdcglDqzt_"+val2+"' id='lato_wtdcglDqzt_"+val2+"' placeholder='' value='已提交'  readonly='readonly'></td><td><input type='text'  class='form-control' name='lato_wtdcglQjmc_"+val2+"' id='lato_wtdcglQjmc_"+val2+"' placeholder='请输入器具名称...' value='"+$("#lato_flfsljcxmQjmc").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglQjfl_"+val2+"' id='lato_wtdcglQjfl_"+val2+"' placeholder='请输入器具类型...' value='"+type+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglGgxh_"+val2+"' id='lato_wtdcglGgxh_"+val2+"' placeholder='请输入规格型号...' value='"+$("#lato_flfsljcxmXhgg").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglCcbh_"+val2+"' id='lato_wtdcglCcbh_"+val2+"' placeholder='请输入出厂编号...' value='"+$("#lato_flfsljcxmCcbh").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglSl_"+val2+"' id='lato_wtdcglSl_"+val2+"' placeholder='请输入数量...' value='"+$("#lato_flfsljcxmSl").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglScdw_"+val2+"' id='lato_wtdcglScdw_"+val2+"' placeholder='请输入生产单位...' value='"+$("#lato_flfsljcxmZzdw").val()+"'></td><td><input type='text'  class='form-control' name='lato_wtdcglYwlx_"+val2+"' id='lato_wtdcglYwlx_"+val2+"' placeholder='请输入业务类型...' value='"+$("#lato_flfsljcxmYwlx").val()+"' ></td><td><input type='text'  class='form-control' name='lato_wtdcglBs_"+val2+"' readonly='readonly' id='lato_wtdcglBs_"+val2+"'  placeholder='' value='"+data.板数+"' ></td><td><input type='hidden' name='lato_uuid_"+val2+"' id='lato_uuid_"+val2+"' value="+uuIdTest+" /> <input type='hidden' name='lato_web_"+val2+"' id='lato_web_"+val2+"' value='true' /> <input type='hidden' name='lato_wtdcglJj_"+val2+"' id='lato_wtdcglJj_"+val2+"' value='"+data.是否加急+"' /> <input type='hidden'  name='lato_wtdcgl_mx_objectId_"+val2+"' id='lato_wtdcgl_mx_objectId_"+val2+"'  value="+data.objectId+">  <input type='hidden'  name='lato_templateName_"+val2+"' id='lato_templateName_"+val2+"'  value='非逆反射类检测项目'> <button type='button'  class='btn btn-default btn-sm ' onclick='editForm(\""+formId+"\",\""+type+"\",\"非逆反射类检测项目\",\""+val2+"\",this)'>编辑</td><td></button><button type='button'  class='btn btn-default btn-sm removeButton' onclick='removeWeituodanTr(this)'>删除行</button></td></tr>";
							
							var $tr=$("#weituodanMxTable tr").eq(trIndex);
							 if($tr.size()==0){
								alert("指定的table id或行数不存在！");
								return;
							 }
							 $tr.after(trHtml);
							 $("#lato_weituodan_mxcount").val(val2);
							 
							 //隐藏模态框
							 $('#wtdwMode4').modal("hide");
							 
						}
						,error:function(XMLHttpRequest, textStatus, errorThrown){
									
										 var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
									var text1 =	text.replace(/\r\n|\n|\r/g,'');
									var va11 =	decodeURI(text1);
									var val2="出现异常";
									
									var dataObj=eval("("+va11+")");
									
									document.getElementById("errorTypeSpan").innerText = val2;
									document.getElementById("errorSpan").innerText = dataObj.message;
									$('#errorModel').modal({
										  keyboard: true
									   })
									   
							$("#flfsljcxmForm").data('bootstrapValidator').resetForm();
							}
						}
					);
			   
                //console.log('success.field.bv -->', data.element);
            })
            .on('added.field.bv', function(e, data) {
                //console.log('Added element -->', data.field, data.element);
            })
            .on('removed.field.bv', function(e, data) {
                //console.log('Removed element -->', data.field, data.element);
            });
		
		
		
        $('#wtdcglForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
				excluded: [':disabled'],
                fields: {
                    'lato_wtdcglWtdw': {
                        validators: {
                            notEmpty: {
                                message: '委托单位必须填写...'
                            }
                        }
                    },'lato_wtdcglLxr': {
                        validators: {
                            notEmpty: {
                                message: '联系人必须填写...'
                            }
                        }
                    },'lato_wtdcglDh':{
					
						  validators: {
                            notEmpty: {
                                message: '电话必须填写...'
                            }
                        }
					
					
					},
                    'radio[]': {
                        validators: {
                            notEmpty: {
                                message: 'The radio field is required'
                            }
                        }
                    }
                }
            })
            .on('error.field.bv', function(e, data) {
                //console.log('error.field.bv -->', data.element);
            })
            .on('success.form.bv', function(e, data) {
                //console.log('success.field.bv -->', data.element);
            })
            .on('added.field.bv', function(e, data) {
                //console.log('Added element -->', data.field, data.element);
            })
            .on('removed.field.bv', function(e, data) {
                //console.log('Removed element -->', data.field, data.element);
            });
    });