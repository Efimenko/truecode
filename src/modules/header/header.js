$(window).scroll(function(){
	if ($('html, body').scrollTop() >= 100) {
		$('.header').addClass('header_fixed');
	}else{
		$('.header').removeClass('header_fixed');
	}
});