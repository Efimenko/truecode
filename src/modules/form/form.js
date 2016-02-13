$('.form__input input').focus(function(){
	$(this).siblings('label').css('top','-25px');
});

$('.form__input input').blur(function(){
	if (!$(this).val()) {
		$(this).siblings('label').css('top','14px');
	};
});