export default function simpleHide(target, config) {
	target.addClass(config.hiddenClass.slice(1));
	
	if(config.hasOverlay) {
		$(config.overlayClass).hide();
	}
	
	config.afterClose();
}
