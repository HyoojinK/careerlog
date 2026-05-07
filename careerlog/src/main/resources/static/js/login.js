$(function(){
	onloadBtnEvent();
});

function onloadBtnEvent(){
	$('#loginCheck').on('click', function(){
		var loginId = $('#idValue').val();
		var loginPwd = $('#pwValue').val();
		if(gfn_isEmpty(loginId))
		{
			alert("아이디값을 입력해주세요");
			return false;
		}
		if(gfn_isEmpty(loginPwd))
		{
			alert("비밀번호값을 입력해주세요");
			return false;
		}
		
		$('#loginForm').submit();

//		var params={
//			"userId" : loginId
//			, "password" : loginPwd
//		}
//		
//		var onevent = function(isSuccess, data) {
//			if( isSuccess )
//			{
//				
//			}
//		}
//		gfn_ajax("/loginCheck", "POST", params, true, onevent)
	})
	
	$('#btnJoin').on('click', function(){
		
	})
	
}
