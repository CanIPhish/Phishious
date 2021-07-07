export default function simpleShow(target, config) {
	target.removeClass(config.hiddenClass.slice(1));
	
	if(config.hasOverlay) {
		$(config.overlayClass).show();
	}
	
	config.afterOpen();
}
