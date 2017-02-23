/*!
 * jQuery Positioner Plugin
 *
 * Subsequent placement of an item based on the height of a selected
 * content area related to the height of the browser window.
 *
 * Copyright 2017 Grávuj Miklós Henrich
 * Released under the MIT license
 * http://henrich.ro
 *
 * Date: 2017-02-22T16:29:22Z
 */

;(function ( $, window, document, undefined ) {

	/* Create the defaults once. */
	var pluginName = "Positioner",
			defaults = {
				comparisonItem	: '',
				comparisonSign	: '',
				itemsToStyle		: []
			};

	/* The actual plugin constructor. */
	function Plugin( element, options ) {

		/* jQuery has an extend method that merges the contents of two or more objects, storing the result in the first object. The first object is generally empty because we don't want to alter the default options for future instances of the plugin. */
		this.element = element;
		this.options = $.extend( {}, defaults, options ) ;
		this.init();

	}

	Plugin.prototype = {

		init: function() {

			/* Store in variables the parameters for a more convenient usage later. Initially we use longer and easy to understand words, by user perspective, in order to make it easier to setup the defaults, but below is more visually appealing, by coding perspective, having shorter parameters. */
			var _item = this.element,
					_compItem = this.options.comparisonItem,
					_compSign = this.options.comparisonSign,
					_toStyle = this.options.itemsToStyle;

			/* The height of the item on which the plugin was initialised, called later as 'basic element'. */
			this.itemHeight = $( _item ).height();
			/* The height of the element to which is compared the 'basic element'. */
			this.compHeight	= $( _compItem ).height();

			/* First we need to check that '_toStyle' is not empty. */
			if ( !jQuery.isEmptyObject( _toStyle ) ) {

				/* Now we compare the height of the two items declared. */
				if ( operators[ _compSign ]( this.itemHeight, this.compHeight ) ) {
					styleIt( _toStyle, check = true );
				} else {
					styleIt( _toStyle, check = false );
				}

			} else {
				console.log( 'jQuery ' + pluginName + ': No items to style were declared. Option: <itemsToStyle>' );
			}

		}

	};

	/* PRIVATE METHODS */

	/**
	 * Defining math operators, so they can be passed as parameters.
	 */
	var operators = {
			'+'		: function( a, b ) { return a + b },
			'-'		: function( a, b ) { return a - b },
			'<'		: function( a, b ) { return a < b },
			'>'		: function( a, b ) { return a > b },
			'=='	: function( a, b ) { return a == b }
	};

	/**
	 * Gaining CSS control over HTML elements.
	 * toStyle - array
	 * check - boolean
	 */
	var styleIt = function( toStyle, check ) {
		$.each( toStyle, function( param, value ) {
			if ( check == true ) {
				$( value.item ).addClass( value.class );
			} else {
				$( value.item ).removeClass( value.class );
			}
		});
	};

	/* Plugin wrapper around the constructor, preventing against multiple instantiations. */
	$.fn[pluginName] = function( options ) {
		return this.each( function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName,
					new Plugin( this, options )
				);
			}
		});
	};

})( jQuery, window, document );
