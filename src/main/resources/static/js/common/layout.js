$(function(){
	onloadBtnEvent();
});

function onloadBtnEvent() {
	$('#userInfo').on('click', function(){
		var $this = $(this);
		var $ul = $this.next('ul');

		if($ul.is(':visible'))
		{
			$ul.slideUp(200);
			$this.removeClass('open');
		}
		else
		{
			$ul.slideDown(200);
			$this.addClass('open');
		}
	});
	
	$('.menu_wrap li').on('click', function()
	{
		location.href = "/page" + $(this).data('url');
	});
}