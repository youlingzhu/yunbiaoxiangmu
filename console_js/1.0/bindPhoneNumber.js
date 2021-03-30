var message = null;
var phoneNumberTip = null;
var messageTip = null;
$(function () {
    if (!IsPC()) {
        $("#mobileRegister").show();
        $("#pcRegister").empty();
    } else {
        $("#pcRegister").show();
        $("#mobileRegister").empty();
    }
    message = new MessageTimer();
    phoneNumberTip = new PhoneNumberTip();
    messageTip = new MessageTip();

    //手机号码验证输入,验证成功后跳到短信验证
    /*$("#nextMessage").click(function () {
        if ($("#phoneNumber").val()) {
            //if (!(/^1[3456789]\d{9}$/.test($("#phoneNumber").val()))) {
            //    phoneNumberTip.show("请输入正确的手机号码");
            //    return false;
            //}
            $("#nextMessage").hide();
            messageBoxShow();
            message.startTimer();
            
        } else {
            phoneNumberTip.show("请输入手机号码");
        }
    })*/
    $("#remainingTime").click(function () {
        MessageTimer.prototype.startTimer();
    });
    $("#nextMessage").hide();
    messageBoxShow();

    //跳到输入信息盒子
    $("#nextInfo").click(function () {
        if ($("#shortMessage").val()) {
            InfoShow();
        } else {
            messageTip.show("请输入验证码")
        }
    })


    var confirmFunc = function () {
        if (!$("#shortMessage").val()) {
            messageTip.show("请输入验证码");
            $("#confirm").one("click",confirmFunc);
            return false;
        } else if (!$("#phoneNumber").val()) {
            phoneNumberTip.show("请输入手机号码");
            $("#confirm").one("click",confirmFunc);
            return false;
        } else if (!!document.getElementById("lato_companies") && !$("#lato_companies").val() && location.href.indexOf("noNeedCompanies")<0) {
            messageTip.show("请输入公司名称");
            $("#confirm").one("click",confirmFunc);
            return false;
        //} else if (!(/^1[3456789]\d{9}$/.test($("#phoneNumber").val()))) {
        //    phoneNumberTip.show("请输入正确的手机号码");
        //    return false;
        } else {
            //成功后执行代码
            var params={};
            params.authType = $("#authType").val();
            params.lato_temp_token = $("#lato_temp_token").val();
            params.lato_phone = $("#phoneNumber").val();
            params.lato_codePhoneText = $("#shortMessage").val();
            params.lato_companies = $("#lato_companies").val();
            params.redirect = $("#redirectUrl").val();
            $.ajax({
                url: postBindPhoneNumberRegister,
                type:'POST',
                dataType:'json',
                data: params
                ,success:function(data){	
                    
                    var errCode = data.errorCode;
                    var erroMsg = data.errorMsg;
                    var script = data.synLoginHtml;
                    var url = data.openUrl;
                    if(errCode)
                    {
                        $("#confirm").one("click",confirmFunc);
                        messageTip.show("完善信息出现错误:"+erroMsg); 
                    }else{
                        //根据是否pc访问(不能简单使用填写公司名,手机端的class名不一样),判断是pc注册还是绑定,绑定则直接跳转走,pc注册则需要显示加群二维码
                        if (!IsPC()) {
                            location.href = url;
                            return;
                        }
                        $(".loginBox .login").empty().append('<div class="qrcodeBackground"></div> <div style="width:350px;text-align:center;margin-top:20px;margin-bottom:20px;">微信扫码加入云表学习群</div> <div class="button_list"><a href="'+url+'">完成</a></div>');
                        //动态加载一次css样式文件,避免缓存导致样式加载不了新的,下次部署可以删除掉了
                        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: "https://www.iyunbiao.com/console/public/stylesheets/1.0/bindPhoneNumber.css?v=1.1"}).appendTo("head");
                    }
                },
                beforeSend: function(xhr) {
                    //checkIsEversheetWeb(xhr);
                }
                ,error:function(XMLHttpRequest, textStatus, errorThrown){
                    $("#confirm").one("click",confirmFunc);
                    var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
                    var text1 =	text.replace(/\r\n|\n|\r/g,'');
                    var va11 =	decodeURI(text1);
                    var dataObj=eval("("+va11+")");
                    
                    messageTip.show("完善信息出现错误:"+dataObj.message); 
                }
            });
        }
    };
    $("#confirm").one("click",confirmFunc);
})






//显示手机输入盒子
function phoneShow() {
    $(".FillInTheMessage").hide();
    $("#FillInTheInfo").hide();
    $("#FillInThePhoneNumber").show();
    $("#phoneNumber").val("");
    phoneNumberTip.hide();
}


//显示短信输入盒子
function messageBoxShow() {
    $(".FillInTheMessage").show();
    $("#confirm").show();
    $("#FillInThePhoneNumber").hide();
    $("#FillInTheInfo").hide();
    $("#phoneNumberPassValue").text($("#phoneNumber").val())
    messageTip.hide();
}

//显示信息输入盒子
function InfoShow() {
    $(".FillInTheMessage").hide();
    $("#FillInThePhoneNumber").hide();
    $("#FillInTheInfo").show();
    $("#shortMessage").val("");
    $("#userName").val("");
    $("#inputPassword").val("");
    $("#inputConfirmPassword").val("");

    userNameTip.hide();
    passWordTip.hide();
    confirmPasswordTip.hide();

}

//短信类
function MessageTimer() {
    //$("#remainingTime").empty();
    let countDown = '剩余<span id="time"></span>S';

    //开始执行定时器
    MessageTimer.prototype.startTimer = function () {
        if (!(/^1[3456789]\d{9}$/.test($("#phoneNumber").val()))) {
            phoneNumberTip.show("请输入正确的手机号码");
            return false;
        }

        phoneNumberTip.hide();
        messageTip.hide();
        $("#remainingTime").html(countDown);
        $("#remainingTime").unbind("click");
        let time = $("#time");
        time.text(60);
        let setTimer = setInterval(function () {
            if (time.text() == 0) {
                MessageTimer.prototype.resetTime();
                clearInterval(setTimer);
                return;
            } else {
                time.text(Number(time.text() - 1));
            }

        }, 1000);
        
        var  postVerifiUrl = postVerifiAction({checkPhone:$("#phoneNumber").val(),type:'register'}) 
        
        $.ajax({
            url:postVerifiUrl,
            type:'POST',
            dataType:'json',
            data:{},
            success:function(data){
                var errCode = data.errorCode;
                var erroMsg = data.errorMsg;
                if(null != errCode && errCode.length > 0)
                {	
                    window.clearInterval(setTimer);
                    messageTip.show("发送短信出现错误:"+erroMsg);
                }
            },
            beforeSend: function(xhr) {
                //checkIsEversheetWeb(xhr);
            }
            ,error:function(XMLHttpRequest, textStatus, errorThrown){
                var text = decodeURIComponent(XMLHttpRequest.responseText.replace(/\+/g, '%20'));
                var text1 =	text.replace(/\r\n|\n|\r/g,'');
                var va11 =	decodeURI(text1);
                var dataObj=eval("("+va11+")");
                
                messageTip.show("发送短信出现错误:"+dataObj.message);
            }
        });
    }

    //清除
    MessageTimer.prototype.clearTime = function () {
        $("#remainingTime").empty();
    }

    //重置
    MessageTimer.prototype.resetTime = function () {
        $("#remainingTime").empty();
        $("#remainingTime").text("重新发送");

        $("#remainingTime").click(function () {
            MessageTimer.prototype.startTimer();
        });
    }
}

//手机号码提示类
function PhoneNumberTip() {
    $("#phoneNumber").keyup(function () {
        if ($("#phoneNumber").val()) {
            PhoneNumberTip.prototype.hide();
        }
    })
    PhoneNumberTip.prototype.show = function (message) {
        $("#inputPhoneNumberTip").css("display", "block")
        $("#inputPhoneNumberTip").text(message ? message : "")
    }

    PhoneNumberTip.prototype.hide = function () {
        $("#inputPhoneNumberTip").css("display", "none")
        $("#inputPhoneNumberTip").text("")
    }
}

//短信号码提示类
function MessageTip() {
    $("#shortMessage").keyup(function () {
        if ($("#shortMessage").val()) {
            MessageTip.prototype.hide();
        }
    })
    MessageTip.prototype.show = function (message) {
        $("#inputMessageTip").css("display", "block")
        $("#inputMessageTip").text(message ? message : "")
    }

    MessageTip.prototype.hide = function () {
        $("#inputMessageTip").css("display", "none")
        $("#inputMessageTip").text("")
    }
}

