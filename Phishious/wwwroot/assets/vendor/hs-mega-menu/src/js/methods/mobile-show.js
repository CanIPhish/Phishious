export default function mobileShow(el, menu, params, itemParams) {
	if (!menu.length) {
		return this;
	}
	
	el.addClass(itemParams.activeItemClass().slice(1));
	
	menu.slideDown(params.mobileSpeed);
}
