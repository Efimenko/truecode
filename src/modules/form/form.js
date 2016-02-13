$('.form__input input').focus(function(){
	$(this).siblings('label').css('top','-29px');
});

$('.form__input input').blur(function(){
	if (!$(this).val()) {
		$(this).siblings('label').css('top','10px');
	};
});