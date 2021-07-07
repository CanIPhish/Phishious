export default function desktopCSSAnimationEnable(menu, itemParams) {
	return function (e) {
		if (menu.hasClass(itemParams.desktop.animationOut)) {
			menu.removeClass(itemParams.desktop.animationOut).hide();
		}
		
		e.preventDefault();
		e.stopPropagation();
	};
}
