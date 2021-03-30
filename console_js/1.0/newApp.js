
function select(){
	
	  var ids = $.map($('#localServer').bootstrapTable('getSelections'), function ( row) {
						
				   $("#lato_server_code").val(row.服务器编号);
				   $("#lato_server_name").val(row.服务器名称);
				   $("#lato_app_name").val("新应用");
					
				   //模态框隐藏
				  $('#loca_server_model').modal("hide");
				  
                  });
}
		

function alertProduct(idName,limit){
		
	 $( "#"+idName ).val( limit );
	queryMoney();
}

function queryMoney(){
		
		var form = $("#lato_deploy_type").val();
		var formType = "";
		if(form == 'cloud')
			formType = "applyCloudAppForm";
		else
			formType = "applyLocalServiceForm";
		
		var params=$("regForm").serialize();
				var templateName = $('#lato_templateName').val();
				var showUserAction = #{jsAction @LatoWebDelegate.queryProductPrice(':type') /}
		
				var  calculationUrl =showUserAction({type:formType}) 
	
		$("#lato_template_number").val($("#lato_server_template_limit").val());
		 var formParam = $("#defaultForm").serialize();//序列化表格内容为字符串    
			$.ajax({    
				type:'post',        
				url:calculationUrl,    
				data:formParam,    
				cache:false,    
				dataType:'json',    
				success:function(data){  
					var error = data.error;
					if(error.length > 0)
						document.getElementById('productPrice').innerText=error;
					else
						document.getElementById('productPrice').innerText="总费用为："+data.总费用;
				}    
			});    
	}
	
 $(function() {
	var minLength=  $("#minPurchaseLength").val();
	debugger;
	if(null == minLength || minLength.length < 1)
		minLength = 3;
 
    $( "#slider-range-max4" ).slider({
      range: "max",
      min:  3,
      max: 36,
      value:minLength,
      stop: function( event, ui ) {
        $( "#lato_buy_month" ).val( ui.value );
		queryMoney();
      }
    });
	
    $( "#lato_buy_month" ).val( $( "#slider-range-max4" ).slider('value'));
  });
  
 $('#defaultForm')
            .bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
				
					'lato_app_user_number':{
						
					 validators: {
                            notEmpty: {
                                message: '用户数不允许为空...'
                            },integer: {
								message: '只允许输入整数'
							},between: {
								min: 1,
								max: 30,
								message: '用户数请输入有效的值范围,最小值1最大值30'
							}
                        }
					},
				
                    'lato_server_current_limit': {
                        validators: {
                            notEmpty: {
                                message: '并发数不允许为空...'
                            },integer: {
								message: '只允许输入整数'
							},between: {
								min: 1,
								max: 30,
								message: '并发数请输入有效的值范围,最小值1最大值30'
							}
                        }
                    },'lato_app_account':{
					
						  validators: {
                            notEmpty: {
                                message: '空间账号不能为空...'
                            }
                        }
					},'lato_app_password':{
						  validators: {
                           notEmpty: {
                            message: '密码不允许为空'
							} ,stringLength: {
								min: 6,
								max: 30,
								message: '请输入长度最短为6位最长为30位的密码'
							}, identical: {
								field: 'lato_app_password_check',
								message: '输入的验证密码不匹配'
							},
							different: {
								field: 'lato_app_account',
								message: '密码与账号不允许重复'
							}
                        }
					},'lato_app_password_check':{
					
						validators: {
									notEmpty: { message: '确认密码不允许为空'},
											identical: {
												field: 'lato_app_password',
												message: '输入的验证密码不匹配'
										}
									}
					},'lato_server_template_limit': {
                        validators: {
                            notEmpty: {
                                message: '模板数不允许为空...'
                            },integer: {
								message: '只允许输入整数'
							},between: {
								min: 60,
								max: 200,
								message: '模板数请输入有效的值范围,最小值60最大值200'
							}
                        }
                    },'lato_app_name': {
                        validators: {
                            notEmpty: {
                                message: '应用名称不允许为空...'
                            }
                        }
                    },'lato_server_name':{
                        validators: {
                            notEmpty: {
                                message: '服务器名称不允许为空...'
                            }
                        }
                    }
                }
            })
            .on('error.field.bv', function(e, data) {
                //console.log('error.field.bv -->', data.element);
            })
            .on('success.field.bv', function(e, data) {
                //console.log('success.field.bv -->', data.element);
            }).on('success.form.bv', function(e) {
					
					document.getElementById("lato_server_current_limit").disabled=false;
					document.getElementById("lato_server_template_limit").disabled=false;
					document.getElementById("lato_buy_month").disabled=false;
					document.getElementById("slider-range-max4").disabled=false;
					
			})
            .on('added.field.bv', function(e, data) {
                //console.log('Added element -->', data.field, data.element);
            })
            .on('removed.field.bv', function(e, data) {
                //console.log('Removed element -->', data.field, data.element);
            });
  
  //隐藏并发数限制
  function hiddenCurrentLoginLimit(divid, hidden){
	 document.getElementById(divid).style.display=hidden;
  }
  
 $(document).ready(function() {	
	
	
	 document.getElementById("server_div").style.display="none";
	 
	 hiddenCurrentLoginLimit("current_login_limit","none");
	 
	 var productCode = '${productCode}';
	if(productCode.length <= 0){
		//隐藏产品div
		hiddenCurrentLoginLimit("product","none");
	}else{
		//隐藏模板数限制
		hiddenCurrentLoginLimit("template_div","none");
		$("#lato_server_template_limit").val("0");
	}
	
	 
	 //默认选择部署到本地
	 $("#testCheckbox_2").attr("checked","checked");
	 
	 //赋值部署类型为本地
	 $("#lato_deploy_type").val("local");
	 
	 //默认选择部署到新服务器
	 $("#testCheckbox_create").attr("checked","checked");
	 
	 //本地服务器类型为新建服务器
	 $("#lato_local_server_type").val("new");
	 
	 $("#lato_server_name").val("新服务器");
	
	
	//隐藏选择服务器列表按钮
	// hiddenCurrentLoginLimit("select_local_server","none");
	
	var productCode = '${productCode}';
			
		if(productCode.length > 0){
		//隐藏免费版与标准版的选择
		hiddenCurrentLoginLimit("app_type","none");
	 }
	
	 //初始化选择本地免费服务
	 initSelectLocalServer();
	 
	 //部署到本地后，出现服务器选择
	 $("#server_div :radio").click(function(){
		var value1 = $(this).val();
		
		 $("#lato_local_server_type").val(value1);
		
		if(value1 == "select"){
			
			$('#lato_server_name').attr("readonly",true)
			hiddenCurrentLoginLimit("select_local_server","block");
			query();
		}else{	
			hiddenCurrentLoginLimit("select_local_server","none");
		　	$('#lato_server_name').attr("readonly",false)
			$("#lato_server_code").val("");
			$("#lato_server_name").val("新服务器");
			$("#lato_app_name").val("新应用");
			 document.getElementById("server_div").style.display="block";
		}
		
	  });
	 
	 //部署版本选择
	 $("#select_deploy_type :radio").click(function(){

		var value1 = $(this).val();
			
		$("#lato_deploy_type").val(value1);
			
		if(value1 == "cloud"){
			
			selectCloud();
			
		}else{
			selectLocalServer();
		}
		
		queryMoney();
		
	  });
	  
	  function enableFieldValidators(fieldName,isEnable){
		$('#defaultForm').data('bootstrapValidator').enableFieldValidators(fieldName,isEnable);
	  }
	  
		
	  
	  //选择免费版后处理并发数等信息
	  $("#app_type :radio").click(function(){
			
			
			var value1 = $(this).val();
			$("#testCheckbox_create").attr("checked","checked");
			$("#lato_version_type").val(value1);
			
			if(value1 == "free"){
				
				deispayFunction_1(true,"none");
			}else{
				deispayFunction_1(false,"block");
			}
			queryMoney();
		
	  });
	
	
	
	
	function deispayFunction_1(disabled,display){
			
			$("#lato_server_current_limit").val('3');
			
			var productCode = '${productCode}';
			
			if(productCode.length <= 0){
				$("#lato_server_template_limit").val('60');
			}else{
				$("#lato_server_template_limit").val('0');
				$("#lato_buy_month").val('12');
			}
			
			
			
			if(display == 'block')
				hiddenCurrentLoginLimit("freeDesc","none");	
			else
				hiddenCurrentLoginLimit("freeDesc","block");	
			
			document.getElementById("lato_server_current_limit").disabled=disabled;
			document.getElementById("lato_server_template_limit").disabled=disabled;
			document.getElementById("lato_buy_month").disabled=disabled;
			document.getElementById("slider-range-max4").disabled=disabled;
			
			if(disabled == true){
				$( "#slider-range-max4" ).slider('disable');
			}else{
				$( "#slider-range-max4" ).slider('enable');
			}
			
			
			var queryDevice=document.getElementsByName("server_template");
			for(j=0;j<queryDevice.length;j++)
				{
					queryDevice[j].style.display=display;//"none";
				}
			var queryDevice1=document.getElementsByName("server_current_limit");
			for(j=0;j<queryDevice1.length;j++)
				{
					queryDevice1[j].style.display=display;//"none";
				}
	
	}
	
	function deispayFunction(disabled,display){
			
	
	}
	
	//初始化本地服务器选择
	function initSelectLocalServer(){
	
		$("#testCheckbox_app_type").attr("checked","checked");	
		
			debugger;
			var productCode = '${productCode}';
			
			if(productCode.length <= 0){
				$("#lato_version_type").val('free');
			}
			
		//选择本地版本
		selectLocalServer();
	
		
	
	}
	
	//选择本地
	function selectLocalServer(){
	var productCode =	$("#lato_product_code").val();
	
			var versionType = $("#lato_version_type").val();
			
			if(productCode.length <= 0 ){
			
				hiddenCurrentLoginLimit("app_type","block");
				
				if(versionType=='standard'){
					//默认选择标准版
					$("#testCheckbox_app_type1").attr("checked","checked");			
					$("#lato_version_type").val("standard");	
				}
			
			}
			
			
			enableHiddenLocalServer();
			
			if(versionType == "free"){
				
				deispayFunction_1(true,"none");
			}else{
			
				deispayFunction_1(false,"block");
			}
			
	
	}
	
	function enableHiddenLocalServer(){
			
			hiddenCurrentLoginLimit("cloud_root_account","none");
			
			
			//禁用字段的验证
			enableFieldValidators("lato_app_account",false);
			enableFieldValidators("lato_app_password",false);
			enableFieldValidators("lato_app_password_check",false);
			hiddenCurrentLoginLimit("user_limit","none");
			hiddenCurrentLoginLimit("current_login_limit","block");
			document.getElementById("server_div").style.display="block";
			
	}
	
	//选择云端
	function selectCloud(){
	
	
			hiddenCurrentLoginLimit("freeDesc","none");	
			
			hiddenCurrentLoginLimit("cloud_root_account","block");
			hiddenCurrentLoginLimit("app_type","none");
			hiddenCurrentLoginLimit("current_login_limit","none");
			hiddenCurrentLoginLimit("user_limit","block");
			document.getElementById("server_div").style.display="none";
			
			enableFieldValidators("lato_app_account",true);
			enableFieldValidators("lato_app_password",true);
			enableFieldValidators("lato_app_password_check",true);
			$( "#slider-range-max4" ).slider('enable');
			document.getElementById("slider-range-max4").disabled=false;
			document.getElementById("lato_buy_month").disabled=false;
			
			document.getElementById("lato_server_template_limit").disabled=false;
			
			var queryDevice=document.getElementsByName("server_template");
			for(j=0;j<queryDevice.length;j++)
				{
					queryDevice[j].style.display="block";
				}
			
	
	}
	
	
	queryMoney();
	
	$('#sub-item-2').addClass('in');	
    });

