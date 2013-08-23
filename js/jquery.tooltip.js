/**
 * @author mwang
 */
;(function($, window, document, undefined){
	$.fn.tooltip = function(options){
		var defaults = {
			background: '#e3e3e3',
			color: 'black',
			round: false
		},
		options = $.extend({}, defaults,options);
		
		this.each(function() {
			var $this = $(this),
			    title = this.title,
			 	width = $this.width(),
			 	height = $this.height(),
			 	position = $this.position(),
			 	right = $(window).width() - (position.left + width),
			 	top = position.top + height;
			 	
			 	
			 if($this.is('a') && $this.attr('title') != ''){
			 	this.title = '';
			 	$this.hover(function(e){
			 			$('<div id="tooltip" />')
			 			  .appendTo('body')
			 			  .text(title)
			 			  .hide()
			 			  .css({
			 			  	backgroundColor: options.background,
			 			  	color: options.color,
			 			  	top: top,
			 			  	right: right
			 			  })
			 			  .fadeIn(350);
			 	}, function(){
			 		$('#tooltip').remove();
			 	});	
			 }
			 /*
			 $this.mousemove(function(e) {
			 	$('#tooltip').css({
			 		top: top,
			 		right: right
			 	});
			 });
			*/
		});
		
		return this;			
	}
	
	
}(jQuery, window, document));
