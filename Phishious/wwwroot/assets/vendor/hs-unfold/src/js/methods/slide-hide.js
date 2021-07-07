export default function slideHide(target, config, callback) {
	target.slideUp({
		duration: config.duration,
		easing: config.easing,
		complete: function () {
			callback();
			
			config.afterClose();
			
			target.addClass(config.hiddenClass.slice(1));
		}
	});
	
	if(config.hasOverlay) {
		$(config.overlayClass).fadeOut(200);
	}
}
