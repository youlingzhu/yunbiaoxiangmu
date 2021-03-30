function checkIsEversheetWeb(xhr){
	
	if (window.external && window.external.useragent){
							xhr.setRequestHeader("eversheet", window.external.useragent);
	}
    
	
}
function IsPC() {
  var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod", "MicroMessenger", "wxwork", "WindowsWechat", "DingTalk"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function ForDight(Dight,How){ 
	Dight = Math.round(Dight*Math.pow(10,How))/Math.pow(10,How); 
	return Dight; 
} 