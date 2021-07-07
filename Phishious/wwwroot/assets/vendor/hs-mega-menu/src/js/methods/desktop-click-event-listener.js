import getType from "./get-type";
import smartPosition from "./smart-position";

import desktopShow from "./desktop-show";
import desktopHide from "./desktop-hide";

export default function desktopClickEventListener(el, menu, params, itemParams) {
	return function () {
		let $siblingInvokers = menu.parent(`${params.classMap.hasMegaMenu}, ${params.classMap.hasSubMenu}`).siblings(`${params.classMap.hasMegaMenu}${params.classMap.hasMegaMenuActive}, ${params.classMap.hasSubMenu}${params.classMap.hasSubMenuActive}`);

		if ($siblingInvokers.length) {
			$siblingInvokers.each(function () {
				var $el = $(this),
					$menu = $el.children(`${params.classMap.megaMenu}, ${params.classMap.subMenu}`),
					itemDataSettings = $el.attr('data-hs-mega-menu-item-options') ? JSON.parse($el.attr('data-hs-mega-menu-item-options')) : {};
				let itemSettings = {
					desktop: {
						animation: 'animated',
						animationIn: 'slideInUp',
						animationOut: 'fadeOut',
						position: null
					}
				};
				itemSettings = Object.assign({}, itemSettings, itemDataSettings);
				itemSettings.activeItemClass = function () {
					return getType($el, params) === 'mega-menu' ? params.classMap.hasMegaMenuActive : params.classMap.hasSubMenuActive;
				};

				$el.removeClass(itemSettings.activeItemClass().slice(1));

				desktopHide($el, $menu, params, itemSettings);
			});
		}

		if (menu.is(':hidden')) {
			el.addClass(itemParams.activeItemClass().slice(1));

			desktopShow(el, menu, params, itemParams);

			smartPosition(menu, params);
		} else {
			el.removeClass(itemParams.activeItemClass().slice(1));

			desktopHide(el, menu, params, itemParams);
		}
	};
}
