export default function smartPosition(el, params) {
	if (!el && !el.length) return;
	
	if (!params.rtl) {
		if (el.offset().left + el.outerWidth() > window.innerWidth) {
			el.addClass(params.classMap.reversed.slice(1));
		}
	} else {
		if (el.offset().left < 0) {
			el.addClass(params.classMap.reversed.slice(1));
		}
	}
}
