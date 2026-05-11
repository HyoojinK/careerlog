$(function() {
	getQuote();
	onloadBtnEvent();
});

function getQuote(){
	var quoteData = sessionStorage.getItem('quoteData');

	if(quoteData)
	{
		quoteData = JSON.parse(quoteData);
		renderQuote(quoteData);
		return;
	}

	$.ajax(
	{
		url: 'https://korean-advice-open-api.vercel.app/api/advice',
		type: 'GET',
		dataType: 'json',
		success: function(result)
		{
			sessionStorage.setItem('quoteData',JSON.stringify(result));
			renderQuote(result);
		},
		error: function()
		{
			renderQuote(
			{
				message: '오늘의 작은 노력이 내일의 나를 만듭니다.',
				author: 'CareerLog',
				authorProfile: '오늘의 응원'
			});
		}
	});
}

function renderQuote(data) {
	$('#quoteText').text('“' + data.message + '”');
	$('#quoteAuthor').text(data.author);
	$('#quoteAuthorProfile').text(data.authorProfile);
}

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

