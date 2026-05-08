/**
 * 레이어 팝업 오브젝트 생성
 * 
 * @Param option - 팝업 생성 Option
 * option.title - 팝업창 제목
 * option.width - 팝업창 width
 * option.draggable - 드래그 활성화 (default: false)
 * option.resizeable - 리사이즈 활성화 (default: false)
 * option.resizeOption - 리사이즈 옵션 - jquery lib 참고
*/
$.fn.createModal = function(option) {
	var $modal = $($(this).selector);
	$modal.addClass('layer-popup');	
	$modal.css({"width": option.width + 'px'})
	var headerHtml = 
		'<div class="layer_popup_header">' +
			'<label class="layer_popup_title">' + option.title + '</label>' +
			'<div class="layer_popup_header_btn">' +
				'<button class="layer_popup_btn_close"></button>' +
			'</div>' +
		'</div>';
	$modal.prepend(headerHtml); // header 생성
	
	// Drag 활성화 여부
//	if( option.draggable )
//	{
//		$modal.draggable({
//			handle: '.layer_popup_header',
//			opacity: 0.8,
//			containment: "#popMask",
//			scroll: false
//		});
//	}
	
	// Resize 활성화 여부
	if( option.resizeable )
	{
		$modal.resizable(option.resizeableOpt);
	}
	
	// 팝업창 닫기 이벤트
	$(this).find('.layer_popup_btn_close').off().on('click', function() {
		var closeTarget = $(this).parents('.layer_popup').attr('id');
		var closeEvent = null;
		// 콜백 함수가 있으면 실행
		if( typeof option.closed == 'function' )
		{ 
			closeEvent = option.closed;  
		}
		
		closeModal('#'+closeTarget, closeEvent);
	});
	
	// 콜백 함수가 있으면 실행
	if( typeof option.callback == 'function' )
	{ 
		option.callback();  
	}
	
	return false;
}

/**
 * 레이어 팝업 위치 초기화
 * @Param id - selector
*/
function initPositionModal(id) {
	if( $(id).length > 0 )
	{
		var $modal = $(id);
		
		var popMargLeft = ($modal.width() + 24) / 2;
		
		$modal.css({
			'margin-left' : -popMargLeft
		});
	}
}

/**
 * 레이어 팝업 열기
 * @Param id - selector
*/
function openModal(id, callback) {

	if( $(id).length > 0 )
	{
		var $modal = $(id);
		
		$modal.fadeIn(300); // 페이드 인 속도 설정
		
		// 팝업 위치 설정
		//var popMargTop = ($modal.height() - 31) / 2;
		var popMargLeft = ($modal.width() + 24) / 2;
		
		$modal.css({
			//'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		$(window).resize(function() {
			var docWidth = $(window).width() - 80;
			var docHeight = $(window).height();
			
			var $header = $modal.find('.layer_popup_header');
			var $body = $modal.find('.layer_popup_body');
			var $bottom = $modal.find('.layer_popup_footer');
			
			var header = 0;
			var top = 0;
			var bottom = 0;

			if( $header.length > 0 ) header = $header.height();
			if( $body.length > 0 )
			{
				$body.each(function() {
					var _top = $(this).offset().top;
					if( _top > 0 )
					{
						top = _top;
						return false;
					}
				})
			}
			if( $bottom.length > 0 ) bottom = $bottom.height();
			
			$modal.css({
				'max-width' : docWidth + "px"
			});
			
			$modal.find('.layer_popup_body').css({
				'max-height' : (docHeight - (header + top + bottom)) + "px"
			});
		});
		$(window).resize();
		
		// 팝업이 여러개일 경우 마스크 중복 생성 되는 것 방지
		// 팝업이 오픈 되고 배경을 클릭하지 못하도록 투명 마스크를 씌운다.
		if( !$("#popMask").length ) 
		{
			$('body').append('<div id="popMask" class="modal_mask"></div>');
			$('#popMask').fadeIn(300);
		}
		
		// TODO: 팝업창 높이가 브라우저보다 클 경우 자동 스크롤되도록 작업 진행 필요
		/*var windowHeight = $('body').height();
		if( popupObj.height() > windowHeight )
		{		
			popupObj.find('.layer_popup_body').css('height', (windowHeight-200))
		}*/
		
		// 콜백 함수가 있으면 실행
		if( typeof callback == 'function' )
		{ 
			callback();  
		}
	}
	
	return false;
};

/**
 * 레이어 팝업 닫기
 * */
function closeModal(id, callback) {
	$(id).fadeOut(300 , function() {
		// 활성화 된 팝업 갯수가 1개 이하일때 마스크 지우기
		if( $(".layer_popup:visible").length < 1 )
		{
			$('#popMask').remove();
		}
		
		// 팝업창을 닫은 뒤 하위 form 내용 초기화
		$(id).find('input').each(function() {
			var $input = $(this);
			
			if( !$input.hasClass('hasDatepicker') )
			{
				$input.val("");
			}
		})
		$(id).find('textarea').val("");
		//$(id).find('select').find('option:eq(0)').prop("selected", true);
	});
	
	// 콜백 함수가 있으면 실행
	if( typeof callback == 'function' )
	{ 
		callback();  
	}
}

// 팝업 여는 함수 jquery 함수로 만들기
$.fn.openModal = function(option) {
	openModal($(this).selector);
	return this;
}

// 팝업 닫는 함수 jquery 함수로 만들기
$.fn.closeModal = function(option) {
	closeModal($(this).selector);
	return this;
}

/**
 * 기존에 팝업이 생성되었는지 확인하여 boolean을 반환한다.
 * @return boolean
 * */
function isModal(id) {	
	var boolean = false;
	
	// 팝업이 생성되면 header가 동적으로 생성되기 때문에 header기준으로 존재유무를 확인
	if( $(id).find('.layer_popup_header').length )
	{
		boolean = false;
	}
	else
	{
		boolean = true;
	}
	
	return boolean;
}