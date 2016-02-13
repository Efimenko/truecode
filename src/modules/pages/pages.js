$('.pages__btn').click(function(){
	$(this).siblings('.pages-list').fadeToggle();
});

$('.pages-list a').click(function(e){
	e.preventDefault();
	$('.work-iframe iframe').attr('src', $(this).attr('href'));
});