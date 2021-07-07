import getType from "./get-type";

import mobileShow from "./mobile-show";
import mobileHide from "./mobile-hide";

export default function mobileClickEventListener(el, menu, params, itemParams) {
	return function () {
		let $siblingInvokers = menu.parent(`${params.classMap.hasMegaMenu}, ${params.classMap.hasSubMenu}`).siblings(`${params.classMap.hasMegaMenu}${params.classMap.hasMegaMenuActive}, ${params.classMap.hasSubMenu}${params.classMap.hasSubMenuActive}`);
		
		if ($siblingInvokers.length) {
			$siblingInvokers.each(function () {
				var $el = $(this),
					$menu = $el.children(`${params.classMap.megaMenu}, ${params.classMap.subMenu}`),
					itemSettings = {};
				itemSettings.activeItemClass = function () {
					return getType($el, params) === 'mega-menu' ? params.classMap.hasMegaMenuActive : params.classMap.hasSubMenuActive;
				};
				
				mobileHide($el, $menu, params, itemSettings);
			});
		}
		
		if (menu.is(':hidden')) {
			mobileShow(el, menu, params, itemParams);
		} else {
			mobileHide(el, menu, params, itemParams);
		}
	};
}
