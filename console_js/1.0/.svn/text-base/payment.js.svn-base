
    
 $(document).ready(function() {
	updatePayType();
    
    //订单金额为0,不显示这么多内容了
    var paymentAmount = $("#lato_payment_amount").val();
    if (paymentAmount <= 0) {
        $(".freePayHide").hide();
        $("#lato_payable_amount").val(0);
        $("#lato_payable_amount_show").text(0);
    } else {
        getOrderVoucherInfo();
	}
	/*$("#error").hide();
	var remainingSum = $("#lato_current_remaining_sum").val();
	var paymentAmount = $("#lato_payment_amount").val();
	var reInt =	parseInt(remainingSum);
	var payIint = parseInt(paymentAmount);
	
	if(reInt >= payIint){
		$("#payment").removeAttr("disabled");
	}else{
	
		$("#error").show();	
		$("#payment").hide();
	}*/
	
	
	$('#sub-item-4').addClass('in');	
    
});

//更新支付方式,根据应支付金额判断
function updatePayType() {
	var amout = $("#lato_payable_amount").val();
	if(amout <= 0)
	{
		document.getElementById ("remainingSum_span").innerHTML="开通";
		$("#ali").hide();
		$("#weixin").hide();
	}else{
		document.getElementById ("remainingSum_span").innerHTML="余额支付";
		$("#ali").show();
		$("#weixin").show();
	}
}

function toRecharge(){
    //var orderFormAction =  #{jsAction @LatoWebDelegate.orderForm(':code') /}
    
    var  orderUrl =orderFormAction({code :$("#lato_order_code").val()});
    //var url = '/orderForm?code='+$("#lato_order_code").val()+'&redirectUrl='+$("#redirectUrl").val();
    orderUrl = orderUrl + '&redirectUrl='+$("#redirectUrl").val();
    //var getRechargeAction = #{jsAction @LatoWebDelegate.getRecharge(':redirect') /}
    
    var  url =getRechargeAction({redirect :orderUrl}) 
    
    window.open(url,"_self","" );
}

function paymentClick(){
    //开通前更新订单使用的代金券信息
    updateOrderVouchers();
    
    $('#loadingModel').modal({
        keyboard: false
    });
    paymentForm();
}

function aliPaymentClick(){
    //开通前更新订单使用的代金券信息
    updateOrderVouchers();
    
    var code = $("#lato_order_code").val();
    
    //var alipayRechargeAction = #{jsAction @LatoWebDelegate.alipayRecharge(':lato_total_fee',':redirect',':orderCode') /}

    var v1= $("#lato_payable_amount").val();
    var  url = alipayRechargeAction({lato_total_fee:v1,redirect :$("#redirectUrl").val(),orderCode:code}) 
    window.open(url,"_self","" );
}

function wxPaymentClick(){
    //开通前更新订单使用的代金券信息
    updateOrderVouchers();
    
    var code = $("#lato_order_code").val();
    
    //var wxPayRechargeAction = #{jsAction @LatoWebDelegate.wxPayRecharge(':lato_total_fee',':redirect',":orderCode") /}

    var v1= $("#lato_payable_amount").val();
    var  url = wxPayRechargeAction({lato_total_fee:v1,redirect :$("#redirectUrl").val(),orderCode:code}) 

    window.open(url,"_self","" );
}

function updateButtonState(){
    $('#defaultForm').bootstrapValidator('disableSubmitButtons', false);  
}

function paymentForm(){
    var params=$("form").serialize();
    $.ajax({
       url: putPaymentFormUrl,
       type:'POST',
       dataType:'json',
       data:params
       ,success:function(data){
           
           if(null != data.errorCode && data.errorCode.length > 0)
           {
               $('#loadingModel').modal('hide');
               showErrorModel("支付出现错误",data.errorMsg);
           }else{
               location.href = data.url;
           }
       },
       beforeSend: function(xhr) {
           //checkIsEversheetWeb(xhr);
       }
       ,error:function(XMLHttpRequest, textStatus, errorThrown){
       
           $('#loadingModel').modal('hide');
           
           var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
           var text1 =	text.replace(/\r\n|\n|\r/g,'');
           var va11 =	decodeURI(text1);
           var val2="支付出现错误";
           var dataObj={};
           try{dataObj=eval("("+va11+")");}catch(e){}
           
           showErrorModel(val2,dataObj.message?dataObj.message:text1);
       }
   });
}

$('#defaultForm')
    .bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    }).on('success.form.bv', function(e) {
            
    })
    .on('error.field.bv', function(e, data) {
        //console.log('error.field.bv -->', data.element);
    })
    .on('success.field.bv', function(e, data) {
        //console.log('success.field.bv -->', data.element);
        
        
    })
    .on('added.field.bv', function(e, data) {
        //console.log('Added element -->', data.field, data.element);
    })
    .on('removed.field.bv', function(e, data) {
        //console.log('Removed element -->', data.field, data.element);
    });
        

//更新订单的代金券信息
function updateOrderVouchers(curVoucherCode){
    var params = {};
    var json = {};
    json["订单编号"] = $("#lato_order_code").val();
    json["明细"] = [];

    //遍历选中的代金券
    $(".voucher-node:not(.notselected)").each(function(i){
        var obj = {};
        obj["代金券编号"] = $(this).attr("data-voucherCode");//获取选中的代金券编号
        obj["代金券类型"] = activeVoucherMap[obj["代金券编号"]]["代金券类型"];
        json["明细"].push(obj);
    });
    
    params["lato_order_code"] = $("#lato_order_code").val();
    params["json"]=JSON.stringify(json);
    $.ajax({
       url: postOrderVouchersUrl,
       type:'POST',
       dataType:'json',
       data:params
       ,success:function(data){
           
           if(data && data.errorCode)
           {
               $('#loadingModel').modal('hide');
               showErrorModel("更新代金券出现错误",data.errorMsg);
               //TODO 发生错误了,取消当前选中的代金券?????
           }else{
               //更新成功,重新返回所有的更新信息
               updateOrderVoucherInfo(data);
           }
       },
       beforeSend: function(xhr) {
           //checkIsEversheetWeb(xhr);
       }
       ,error:function(XMLHttpRequest, textStatus, errorThrown){
       
           $('#loadingModel').modal('hide');
           
           var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
           var text1 =	text.replace(/\r\n|\n|\r/g,'');
           var va11 =	decodeURI(text1);
           var val2="更新代金券出现错误";
           var dataObj=eval("("+va11+")");
           
           showErrorModel(val2,dataObj.message);
       }
   });
}

//获取订单代金券相关信息
function getOrderVoucherInfo(){
    var params = {};
    params["lato_order_code"] = $("#lato_order_code").val();
    $.ajax({
       url: getOrderVoucherInfoUrl,
       type:'GET',
       dataType:'json',
       data:params
       ,success:function(data){
           
           if(data && data.errorCode)
           {
               $('#loadingModel').modal('hide');
               showErrorModel("获取代金券出现错误",data.errorMsg);
           }else{
               //更新成功,重新返回所有的更新信息
               updateOrderVoucherInfo(data);
           }
       },
       beforeSend: function(xhr) {
           //checkIsEversheetWeb(xhr);
       }
       ,error:function(XMLHttpRequest, textStatus, errorThrown){
       
           $('#loadingModel').modal('hide');
           
           var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
           var text1 =	text.replace(/\r\n|\n|\r/g,'');
           var va11 =	decodeURI(text1);
           var val2="获取代金券出现错误";
           var dataObj=eval("("+va11+")");
           
           showErrorModel(val2,dataObj.message);
       }
   });
}

var orderVoucherMap = {};
var activeVoucherMap = {};
//根据获取的代金券信息,更新显示
function updateOrderVoucherInfo(data){
    if (!data)return;
    //data.orderInfo
    //data.orderVoucherList
    //data.activeVoucherList
    
    if (data.orderInfo) {
        //更新金额等信息
        $("#lato_current_remaining_sum").val(convertShowMoney(data.orderInfo["当前余额"]));
        $("#lato_current_remaining_sum_show").text(convertShowMoney(data.orderInfo["当前余额"]));
        $("#lato_voucher_amount").val(convertShowMoney(data.orderInfo["代金券金额"]));
        $("#lato_voucher_amount_show").text(convertShowMoney(data.orderInfo["代金券金额"]));
        $("#lato_payable_amount").val(convertShowMoney(data.orderInfo["应付金额"]));
        $("#lato_payable_amount_show").text(convertShowMoney(data.orderInfo["应付金额"]));
        $("#lato_surplus_remaining_sum").val(convertShowMoney(data.orderInfo["剩余金额"]));
        $("#lato_surplus_remaining_sum_show").text(convertShowMoney(data.orderInfo["剩余金额"]));
        updatePayType();
    }
    
    //第一次的时候才初始化
    if (!activeVoucherMap || JSON.stringify(activeVoucherMap)==="{}") {
        //清空代金券的选择列表
        $("#voucherList").empty();
        if (data.activeVoucherList && data.activeVoucherList.length) {
            for (var i in data.activeVoucherList) {
                if (!data.activeVoucherList[i]["代金券编号"])continue;
                activeVoucherMap[data.activeVoucherList[i]["代金券编号"]] = data.activeVoucherList[i];
                //添加代金券的选择列表
                addVoucher(data.activeVoucherList[i]);
            }
        } else {
            $("#voucherList").html("<li>没有代金券喔~</li>");
        }
    }
    
    orderVoucherMap = {};
    //默认都不选择
    $(".voucher-node[data-voucherCode]").addClass("notselected");
    if (data.orderVoucherList) {
        for (var i in data.orderVoucherList) {
            var voucherCode = data.orderVoucherList[i]["代金券编号"];
            if (!voucherCode)continue;
            orderVoucherMap[voucherCode] = data.orderVoucherList[i];
            //显示已选择的代金券
            //TODO 如果已选择没有,则需要触发一次提交刷新
            $(".voucher-node[data-voucherCode='"+voucherCode+"']").removeClass("notselected").find(".useMoneyNum").text(orderVoucherMap[voucherCode]["使用金额"]);
        }
    }
}
//添加一个代金券选择项
function addVoucher(voucherObj) {
    var obj = jQuery.extend({}, voucherObj);
    var voucherCode = obj["代金券编号"];
    var nodeHtml = $(`<li>
        <div class="coupon-item">
            <div data-voucherCode='${obj["代金券编号"]}' class="style-six voucher-node notselected">
                <div class="info-box">
                    <p class="nick nick-type">${obj["代金券类型"]?"代金券类型："+obj["代金券类型"]:""}${obj["限一次使用"]?"(限一次使用)":""}</p>
                    <div class="coupon-money">
                        <div class="lay of">余额￥<em>${obj["余额"]}</em>
                        </div>
                        <div class="lay">
                            <p class="tit">面额￥${obj["面额"]}</p>
                            <p class="tit useMoney">使用金额￥<span class="useMoneyNum"></span></p>
                            <p class="demand">有效期至${obj["失效时间"]?obj["失效时间"].substr(0,10):""}</p>
                        </div>
                    </div>
                    <p class="nick nick-scope">${obj["适用范围"]?"适用范围："+obj["适用范围"]:""}</p>
                </div>
            </div>
        </div>
    </li>`);
    nodeHtml.click(function(){
        var voucherNode = $(this).find(".voucher-node");
        voucherNode.toggleClass("notselected");
        updateOrderVouchers(voucherNode.attr("data-voucherCode"));
    });
    $("#voucherList").append(nodeHtml);
}
//空值显示为0
function convertShowMoney(money) {
    if (!money)return 0;
    return money;
}
    
	