export default function getType(el, params) {
	if (!el || !el.length) {
		return false;
	}
	
	return el.hasClass(params.classMap.hasSubMenu.slice(1)) ? 'sub-menu' : (el.hasClass(params.classMap.hasMegaMenu.slice(1)) ? 'mega-menu' : null);
}
