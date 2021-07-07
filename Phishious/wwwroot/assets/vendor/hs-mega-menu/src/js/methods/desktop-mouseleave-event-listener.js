import desktopHide from "./desktop-hide";

export default function desktopMouseLeaveEventListener(el, menu, params, itemParams) {
	return function () {
		itemParams.megaMenuTimeOut = setTimeout(function () {
			el.removeClass(itemParams.activeItemClass().slice(1));
			
			desktopHide(el, menu, params, itemParams);
		}, params.delay);
	};
}
