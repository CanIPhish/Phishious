export default function slideShow(target, config, callback) {
	target.removeClass(config.hiddenClass.slice(1)).stop().slideDown({
		duration: config.duration,
		easing: config.easing,
		complete: function () {
			callback();
			config.afterOpen();
		}
	});
	
	if(config.hasOverlay) {
		$(config.overlayClass).fadeIn(200);
	}
}
