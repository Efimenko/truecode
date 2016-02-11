$('.filter__item').click(function(){
	if ($(this).hasClass('filter__item_active')) {
		return false;
	}else{
		var category = $(this).attr('data-filter');
		$('.filter__item').removeClass('filter__item_active');
		$(this).addClass('filter__item_active');
		if (category == 'all') {
			$('.work').fadeIn();
		}else{
			$('.work').not('.work[data-category='+category+']').hide();
			$('.work[data-category='+category+']').fadeIn();
		}
	}
});