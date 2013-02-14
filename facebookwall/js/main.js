$(function() {

	var $container = $('#facebookwall');

	$container.imagesLoaded(function() {
		$container.masonry({
			itemSelector: '.box'
		});
	});

})