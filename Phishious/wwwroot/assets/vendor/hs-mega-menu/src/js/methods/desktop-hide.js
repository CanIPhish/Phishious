export default function desktopHide(el, menu, params, itemParams) {
	if (!menu.length) {
		return this;
	}
	
	if(itemParams.desktop.animationOut) {
		menu.removeClass(itemParams.desktop.animationIn).addClass(itemParams.desktop.animationOut).hide();
	} else {
		menu.removeClass(itemParams.desktop.animationIn).hide();
	}
}
