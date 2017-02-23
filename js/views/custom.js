$( document ).ready(function() {

	$( "#populate" ).on( 'click', function() {
		$( ".lorem" ).clone().insertAfter( ".lorem" );
	});

	$( ".container" ).Positioner({
		comparisonItem	: window,
		comparisonSign	: '<',
		itemsToStyle		: [
			{
				'item' : '.footer',
				'class' : 'custom'
			},
			{
				'item' : '.header',
				'class' : 'custom2'
			}
		]
	});

	var element = document.getElementById( 'content' );
	new ResizeSensor( element, function() {
		$( element ).Positioner({
			comparisonItem	: window,
			comparisonSign	: '<',
			itemsToStyle		: [
				{
					'item' : '.footer',
					'class' : 'custom'
				},
				{
					'item' : '.header',
					'class' : 'custom2'
				}
			]
		});
	});
});
