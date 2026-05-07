function gfn_isEmpty(obj) {
	// null / undefined / 공백 체크
	if( obj == null ) return true;
	if( obj == 'null' ) return true;
	if( obj == 'Null' ) return true;
	if( obj == 'NULL' ) return true;
	if( obj == "" ) return true;
	if( obj == "NaN" ) return true;
	if( obj == "undefined") return true;
	if( obj == undefined ) return true;
	
	if( obj.length > 0 ) return false;
	if( obj.length == 0 )  return true;

	if( typeof obj == "number" ) return false;
	
	if( typeof obj != "object" ) return true;

	// 오브젝트 하위 요소 체크
	for( var key in obj )
	{
		if( hasOwnProperty.call(obj, key) ) return false;
	}

	return true;
}


function gfn_ajax(url, method, params, async, callback) {
	var contextPath = gv_contextInfo.contextPath;

	if( async == null ) async = true;
	
	$.ajax({
		url: contextPath + url,
		data: params,
		type: method,
		dataType: "JSON",
		async: async,
		success: function(data) {
			if( data.resultCode == 10 )
			{
				gfn_alert("세션정보가 없습니다.", function() {
					gfn_replaceUrl(contextPath + "/session");
				});
			}
			else
			{
				if( typeof callback == 'function' )
				{
					callback(true, data);
				}
			}
		},
		error: function(data, error) {
			if( typeof callback == 'function' )
			{
				e_log("AJAX", "ERROR : " + error)
				callback(false, null);
			}
		}
	});
}