export default function mobileHide(el, menu, params, itemParams) {
	if (!menu.length) {
		return this;
	}
	
	el.removeClass(itemParams.activeItemClass().slice(1));
	
	menu.slideUp(params.mobileSpeed);
}
