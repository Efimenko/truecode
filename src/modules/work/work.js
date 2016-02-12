
$('.work').click(function(e){
	if($(window).width() >= 750){
		e.preventDefault();
		$('.work-iframe').before('<div class="pattern">'+
												'<div class="spinner">'+
													'<div class="spinner__bounce1"></div>'+
													'<div class="spinner__bounce2"></div>'+
												'</div>'+
											'</div>');
		$('.pattern').show();
		$('body').addClass('hidden');

		var tags = $(this).attr('data-tags'),
		tags = tags.split(',');
		for (var i = tags.length - 1; i >= 0; i--) {
			$('.work-iframe__tags').prepend('<li class="tags__item">'+tags[i]+'</li>');
		};

		var iframe = $('<iframe/>', {
				src:$(this).attr('href'),
				load:function(){
					$('.work-iframe').fadeIn();
					$('.pattern .spinner').hide();
				}
			});
		$('.work-iframe').append(iframe);
	}
});

$('.work-iframe__close').click(function(){
	$('.work-iframe, .pattern').hide();
	$('.work-iframe iframe, .pattern, .work-iframe__tags li').remove();
	$
	$('body').removeClass('hidden');
});


$(document).click(function(event) {
	if ($('.work-iframe:visible').length) {
	    if ($(event.target).closest(".work-iframe").length) return;
	    $('.work-iframe, .pattern').hide();
		$('.work-iframe iframe, .pattern, .work-iframe__tags li').remove();
		$('body').removeClass('hidden');
	    event.stopPropagation();
	};
});