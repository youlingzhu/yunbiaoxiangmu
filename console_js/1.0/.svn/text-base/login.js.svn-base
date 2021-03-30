//默认使用哪种登录方式:0扫码登录,1账号密码
//var defaultLoginSelected=0;
function postLogin(postLoginUrl, formObj) {
    
    //没有就用默认的
    formObj = formObj?$(formObj):$("form:first");
    
    var params=formObj.serialize();
    if (params.indexOf("&type=sms")<0)
        params=params.replace("&password="+$("#password").val(), "&password="+hex_md5($("#password").val()));
    $.ajax({
        url:postLoginUrl,
        type:'POST',
        dataType:'json',
        data:params
        ,success:function(data){
            var errCode = data.errorCode;
            var erroMsg = data.errorMsg;
            var script = data.synLoginHtml;
            var url = data.openUrl;
            if(null != errCode && errCode.length > 0)
            {
                $('#myModal').modal('hide');
                formObj.find(":submit").removeAttr("disabled");
                showErrorModel("登录出现错误",erroMsg);
            }else{
                loginSuccess(data);
            }
        }
        ,beforeSend: function(xhr) {
            $('#myModal').modal({backdrop:'static',keyboard:false}); 
            if(window.checkIsEversheetWeb)
                checkIsEversheetWeb(xhr);
        }
        ,error:function(XMLHttpRequest, textStatus, errorThrown){
            $('#myModal').modal('hide');
            formObj.find(":submit").removeAttr("disabled");
            var data = XMLHttpRequest.responseJSON;
            if (data === undefined && XMLHttpRequest.responseText && XMLHttpRequest.responseText[0] == "{") {
                data = eval('0?0:'+decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20').replace(/\r\n|\n|\r/g,'')));
            }
            showErrorModel(textStatus,(data&&data.message?data.message:'无法访问服务器')); 
        }
    });
}
function loginSuccess(data) {
    location.href = data.redirectUrl;
}


//短信发送
function seedMessage(event){
    if (!$("#phoneNumber").val())return showErrorModel("请输入手机号码","手机号码为必填项,不可为空");
    //发送短信url
    var postVerifiUrl = postVerifiAction({checkPhone:$("#phoneNumber").val(),type:'smsLoginVerifi'}) 
    
    var isPostVerifiSucc = true;
    $.ajax({
        url:postVerifiUrl,
        type:'POST',
        dataType:'json',
        //async: false,
        data:{},
        success:function(data){
            var errCode = data.errorCode;
            var erroMsg = data.errorMsg;
            if(null != errCode && errCode.length > 0)
            {	
                isPostVerifiSucc = false;
                showErrorModel("发送短信出现错误", erroMsg);
            }
        },
        beforeSend: function(xhr) {
            //checkIsEversheetWeb(xhr);
        }
        ,error:function(XMLHttpRequest, textStatus, errorThrown){
            isPostVerifiSucc = false;
            var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
            var text1 =	text.replace(/\r\n|\n|\r/g,'');
            var va11 =	decodeURI(text1);
            var dataObj=eval("("+va11+")");
            
           showErrorModel("发送短信出现错误",dataObj.message);
        }
    });
    if (!isPostVerifiSucc)return;
    //成功发送后执行
    $(event).text(60);
    $(event).unbind();
    setTimer = setInterval(function(){
        if ($(event).text() == 0) {
            clearInterval(setTimer);
            $(event).text("重新发送");
            $(event).bind("click",function(){
                seedMessage(event);
            }); 
            return;
        } else {
            $(event).text(Number($(event).text() - 1));
        }

    }, 1000);  
}