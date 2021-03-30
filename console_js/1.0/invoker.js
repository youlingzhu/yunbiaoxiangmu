;(function(global){
	var Invoker = function(){
		this.invokeMethod = "fromJSAsynCall";
		this.invoke = function(methodName, params, callback)
		{
			if (callback !== undefined)
			{
				var callbackName = 'jsCallback' + (new Date() - 0) + Math.ceil(Math.random() * 10000)
				global[callbackName] = function(result) {
					delete global[callbackName];
					callback(JSON.parse(result));
				}
			}

			var input = {
				method: methodName,
				callback: callback !== undefined ? callbackName : '',
				params: params
			};

			if (global.cefQuery !== undefined)
			{
				global.cefQuery({
					request: this.invokeMethod + "('" + JSON.stringify(input) + "')"
				});
			}
			else if (global.qwebkit !== undefined)
			{
				global.qwebkit.qwebkit_invoke(methodName, JSON.stringify(input));
			}
		}
	}
	global.invoker = new Invoker();
})(window);
