$('.burger').click(function(){
	var burger = $(this),
	nav = '#'+burger.attr('data-nav');

	burger.toggleClass('burger_active');
	$(nav).fadeToggle();
});