$(window).scroll(function(){
	if ($('html, body').scrollTop() >= 100) {
		if (!$('.header').hasClass('header_fixed')) {
			$('.header').css('top', '-74px').animate({'top':'0px'},500).addClass('header_fixed');
		};
	}else{
		$('.header').css('top', '').removeClass('header_fixed');
	}
});