/*
* HSMegaMenu Plugin
* @version: 2.0.1 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later
* @author: HtmlStream
* @event-namespace: .HSMegaMenu
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2019 Htmlstream
*/

import "lodash";

import getType from "./methods/get-type";
import smartPosition from "./methods/smart-position";

import desktopCSSAnimationEnable from "./methods/desktop-css-animation-enable";
import desktopMouseEnterEventListener from "./methods/desktop-mouseenter-event-listener";
import desktopMouseLeaveEventListener from "./methods/desktop-mouseleave-event-listener";
import desktopClickEventListener from "./methods/desktop-click-event-listener";

import mobileClickEventListener from "./methods/mobile-click-event-listener";

export default class HSMegaMenu {
	constructor(el, settings) {
		this.el = el;
		this.defaults = {
			eventType: 'hover',
			direction: 'horizontal',
			breakpoint: 'lg',
			rtl: false,
			isMenuOpened: false,
			sideBarRatio: 1 / 4,
			pageContainer: $('body'),
			mobileSpeed: 400,
			duration: 300,
			delay: 0,
			
			itemOptions: {
				megaMenuTimeOut: null,
				desktop: {
					animation: 'animated',
					animationIn: 'slideInUp',
					animationOut: false,
					position: null,
					maxWidth: null
				}
			},
			
			classMap: {
				rtl: '.hs-rtl',
				reversed: '.hs-reversed',
				initialized: '.hs-menu-initialized',
				mobileState: '.hs-mobile-state',
				invoker: '.hs-mega-menu-invoker',
				
				subMenu: '.hs-sub-menu',
				hasSubMenu: '.hs-has-sub-menu',
				hasSubMenuActive: '.hs-sub-menu-opened',
				
				megaMenu: '.hs-mega-menu',
				hasMegaMenu: '.hs-has-mega-menu',
				hasMegaMenuActive: '.hs-mega-menu-opened'
			}
		};
		this.settings = settings;
		this.state = null;
	}

	init() {
		var context = this,
			$el = $(context.el),
			defaults = context.defaults,
			dataSettings = $el.attr('data-hs-mega-menu-options') ? JSON.parse($el.attr('data-hs-mega-menu-options')) : {};
		let settings = {};
		settings = _.merge(defaults, settings, dataSettings, context.settings);
		
		// Resolution list
		var resolutionsList = {
			xs: 0,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200
		};
		
		// Keycodes
		var ESC_KEYCODE = 27,
			TAB_KEYCODE = 9,
			ENTER_KEYCODE = 13,
			SPACE_KEYCODE = 32,
			ARROW_UP_KEYCODE = 38,
			ARROW_DOWN_KEYCODE = 40,
			ARROW_RIGHT_KEYCODE = 39,
			ARROW_LEFT_KEYCODE = 37;
		
		// Prevent scroll
		function preventScroll(keycode) {
			return function (e) {
				if (e.which === keycode) {
					e.preventDefault();
				}
			};
		}
		
		// Get Item Settings
		function getItemSettings(el) {
			let $el = el,
				dataSettings = $el.attr('data-hs-mega-menu-item-options') ? JSON.parse($el.attr('data-hs-mega-menu-item-options')) : {},
				itemSettings = settings.itemOptions;
			itemSettings = $.extend(true, itemSettings, dataSettings);
			itemSettings.activeItemClass = function () {
				return getType($el, settings) === 'mega-menu' ? settings.classMap.hasMegaMenuActive : settings.classMap.hasSubMenuActive;
			};
			
			return itemSettings;
		}
		
		// State Detection
		$(window).on('resize', function () {
			if (window.innerWidth < resolutionsList[settings.breakpoint]) {
				context.state = 'mobile';
			} else {
				context.state = 'desktop';
			}
		}).trigger('resize');
		
		// Set RTL
		if (settings.rtl) {
			$el.addClass(settings.classMap.rtl.slice(1));
		}
		
		// Init Menu Items
		$el.find(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`).each(function () {
			context.MegaMenuItem($(this), $(this).children(settings.classMap[getType($(this), settings) === 'mega-menu' ? 'megaMenu' : 'subMenu']), settings);
		});
		
		// Add Initialized Classes
		$el.addClass(`${settings.classMap.initialized.slice(1)} hs-menu-${settings.direction}`);
		
		// *****
		// Start: ACCESSIBILITY
		// *****
		var myPreventScrollSpace = preventScroll(SPACE_KEYCODE),
			myPreventScrollDown = preventScroll(ARROW_DOWN_KEYCODE),
			myPreventScrollUp = preventScroll(ARROW_UP_KEYCODE);
		
		let $items,
			index,
			state = null;
		
		$(document).on('keyup', function () {
			window.removeEventListener('keydown', myPreventScrollSpace, false);
			window.removeEventListener('keydown', myPreventScrollUp, false);
			window.removeEventListener('keydown', myPreventScrollDown, false);
		});
		
		$(document).on('keyup', `${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`, function (e) {
			//
			// Start: PREVENT SCROLL
			//
			e.preventDefault();
			e.stopPropagation();
			
			window.addEventListener('keydown', myPreventScrollSpace, false);
			window.addEventListener('keydown', myPreventScrollUp, false);
			window.addEventListener('keydown', myPreventScrollDown, false);
			
			//
			// End: PREVENT SCROLL
			//
			
			//
			// Start: ELEMENT DETECTION
			//
			if ($(e.target).hasClass(settings.classMap.invoker.slice(1)) && !$(e.target).closest(`${settings.classMap.subMenu}, ${settings.classMap.megaMenu}`).length) {
				// console.log('Top level');
				
				if (state !== 'topLevel') {
					state = 'topLevel';
				}
				
				$items = [].slice.call($(e.target).parent().parent().find(settings.classMap.invoker)).filter(function (item) {
					if (!$(item).closest(`${settings.classMap.subMenu}, ${settings.classMap.megaMenu}`).length) {
						return $(item).is(':visible');
					}
				});
			} else if ($(e.target).closest(`${settings.classMap.subMenu}, ${settings.classMap.megaMenu}`).length && $(e.target).siblings(`${settings.classMap.subMenu}, ${settings.classMap.megaMenu}`).length) {
				// console.log('Has submenu and not top level');
				
				if (state !== 'hasSubmenu') {
					state = 'hasSubmenu';
				}
				
				$items = [].slice.call($(e.target).parent().parent().find(settings.classMap.invoker)).filter(function (item) {
					return $(item).is(':visible');
				});
			} else {
				// console.log('Just element');
				
				if (state !== 'simple') {
					state = 'simple';
				}
				
				$items = [].slice.call($(e.target).closest(`${settings.classMap.subMenu}, ${settings.classMap.megaMenu}`).find('a, button')).filter(function (item) {
					return $(item).is(':visible');
				});
			}
			
			//
			// End: ELEMENT DETECTION
			//
			
			index = $items.indexOf(e.target);
			
			//
			// Start: TOP LEVEL
			//
			
			// Left
			if (
				state === 'topLevel' &&
				e.which === ARROW_LEFT_KEYCODE &&
				index > 0
			) {
				index--;
			}
			
			// Right
			if (
				state === 'topLevel' &&
				e.which === ARROW_RIGHT_KEYCODE &&
				index < ($items.length - 1)
			) {
				index++;
			}
			
			// Open Sub
			if (
				state === 'topLevel' &&
				(
					e.which === ARROW_DOWN_KEYCODE ||
					e.which === SPACE_KEYCODE ||
					e.which === ENTER_KEYCODE
				)
			) {
				if (!$(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length) {
					desktopMouseEnterEventListener($(e.target).parent(), $(e.target).siblings(), settings, getItemSettings($(e.target).parent()))();
				} else if ($(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length) {
					$($(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).find('a')[0]).focus();
					
					return;
				}
			}
			
			// Close Siblings
			if (
				state === 'topLevel' &&
				(
					e.which === TAB_KEYCODE ||
					e.which === ARROW_RIGHT_KEYCODE ||
					e.which === ARROW_LEFT_KEYCODE
				) &&
				$(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`).parent().find(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length
			) {
				desktopMouseLeaveEventListener($(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`), $(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`).parent().find(`${settings.classMap.hasMegaMenuActive} > ${settings.classMap.megaMenu}, ${settings.classMap.hasSubMenuActive} > ${settings.classMap.subMenu}`), settings, getItemSettings($(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`)))();
			}
			
			//
			// End: TOP LEVEL
			//
			
			//
			// Start: HAS SUB-MENU BUT NOT TOP LEVEL
			//
			
			// Up
			if (
				state === 'hasSubmenu' &&
				e.which === ARROW_UP_KEYCODE &&
				index > 0
			) {
				index--;
			}
			
			// Down
			if (
				state === 'hasSubmenu' &&
				e.which === ARROW_DOWN_KEYCODE &&
				index < ($items.length - 1)
			) {
				index++;
			}
			
			// Open Sub
			if (
				state === 'hasSubmenu' &&
				(
					e.which === ARROW_LEFT_KEYCODE ||
					e.which === ARROW_RIGHT_KEYCODE ||
					e.which === SPACE_KEYCODE ||
					e.which === ENTER_KEYCODE
				)
			) {
				if (!$(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length) {
					desktopMouseEnterEventListener($(e.target).parent(), $(e.target).siblings(), settings, getItemSettings($(e.target).parent()))();
				} else if ($(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length) {
					$($(e.target).siblings(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).find('a')[0]).focus();
					
					return;
				}
			}
			
			// Close Siblings
			if (
				state === 'hasSubmenu' &&
				(
					e.which === TAB_KEYCODE ||
					e.which === ARROW_DOWN_KEYCODE ||
					e.which === ARROW_UP_KEYCODE
				) &&
				$(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`).parent().find(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`).length
			) {
				desktopMouseLeaveEventListener($(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`), $(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`).parent().find(`${settings.classMap.hasMegaMenuActive} > ${settings.classMap.megaMenu}, ${settings.classMap.hasSubMenuActive} > ${settings.classMap.subMenu}`), settings, getItemSettings($(e.target).closest(`${settings.classMap.hasMegaMenu}, ${settings.classMap.hasSubMenu}`)))();
			}
			
			//
			// End: HAS SUB-MENU BUT NOT TOP LEVEL
			//
			
			//
			// Start: SIMPLE
			//
			
			// Left, Up
			if (
				state === 'simple' &&
				(
					e.which === ARROW_UP_KEYCODE
				) &&
				index > 0
			) {
				index--;
			}
			
			// Right, Down
			if (
				state === 'simple' &&
				(
					e.which === ARROW_DOWN_KEYCODE
				) &&
				index < ($items.length - 1)
			) {
				index++;
			}
			
			// Close Siblings
			if (
				state === 'simple' &&
				(
					e.which === ARROW_RIGHT_KEYCODE ||
					e.which === ARROW_LEFT_KEYCODE
				) &&
				$(e.target).closest(settings.classMap.hasSubMenu).parent().find(settings.classMap.subMenu).length
			) {
				$(e.target).closest(settings.classMap.hasSubMenu).children(settings.classMap.invoker).focus();
				
				desktopMouseLeaveEventListener($(e.target).closest(settings.classMap.hasSubMenu), $(e.target).closest(settings.classMap.hasSubMenu).parent().find(`${settings.classMap.hasSubMenuActive} > ${settings.classMap.subMenu}`), settings, getItemSettings($(e.target).closest(settings.classMap.hasSubMenu)))();
				
				return;
			}
			
			//
			// End: SIMPLE
			//
			
			// Close Self
			if (
				e.which === ESC_KEYCODE &&
				context.state === 'desktop' &&
				$(e.target).closest(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`).length
			) {
				$(e.target).closest(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`).children(settings.classMap.invoker).focus();
				
				desktopMouseLeaveEventListener($(e.target).closest(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`), $(e.target).closest(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`).find(`${settings.classMap.megaMenu}, ${settings.classMap.subMenu}`), settings, getItemSettings($(e.target).closest(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`)))();
				
				return;
			}
			
			// Reset index
			if (index < 0) {
				index = 0;
			}
			
			$($items[index]).focus();
		});
		
		$(document).on('keyup', function (e) {
			// Close All
			if (
				e.which === TAB_KEYCODE &&
				$(e.target).closest(`${settings.classMap.megaMenu}, ${settings.classMap.subMenu}`).length === 0
			) {
				desktopMouseLeaveEventListener($(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`), $(`${settings.classMap.megaMenu}:visible, ${settings.classMap.subMenu}:visible`), settings, getItemSettings($(`${settings.classMap.hasMegaMenuActive}, ${settings.classMap.hasSubMenuActive}`)))();
			}
		});
		
		// *****
		// End: ACCESSIBILITY
		// *****
	}
	
	MegaMenuItem(el, menu, params) {
		var context = this,
			settings = params,
			itemDataSettings = el.attr('data-hs-mega-menu-item-options') ? JSON.parse(el.attr('data-hs-mega-menu-item-options')) : {},
			$el = el,
			$menu = menu;
		let itemSettings = {
			eventType: itemDataSettings.eventType ? itemDataSettings.eventType : settings.eventType,
			megaMenuTimeOut: null,
			desktop: {
				animation: 'animated',
				animationIn: 'slideInUp',
				animationOut: false,
				position: null,
				maxWidth: null
			}
		};


		itemSettings = _.merge({}, settings, itemSettings, itemDataSettings);
		itemSettings.activeItemClass = function () {
			return getType($el, itemSettings) === 'mega-menu' ? itemSettings.classMap.hasMegaMenuActive : itemSettings.classMap.hasSubMenuActive;
		};
		
		// Set Menu Breakpoint Class
		$menu.addClass(getType($el, itemSettings) === 'mega-menu' ? `hs-mega-menu-desktop-${itemSettings.breakpoint}` : `hs-sub-menu-desktop-${itemSettings.breakpoint}`);
		
		// Listeners
		let myDesktopCSSAnimationEnable = desktopCSSAnimationEnable($menu, itemSettings),
			myDesktopMouseEnterEventListener = desktopMouseEnterEventListener($el, $menu, settings, itemSettings),
			myDesktopMouseLeaveEventListener = desktopMouseLeaveEventListener($el, $menu, settings, itemSettings),
			myDesktopClickEventListener = desktopClickEventListener($el, $menu, settings, itemSettings),
			
			myMobileClickEventListener = mobileClickEventListener($el, $menu, settings, itemSettings);
		let mobileListeners = () => {
				// Remove Desktop Listeners
				$menu[0].removeEventListener('animationend', myDesktopCSSAnimationEnable, false);
				$menu[0].removeEventListener('webkitAnimationEnd', myDesktopCSSAnimationEnable, false);
				$el[0].removeEventListener('mouseenter', myDesktopMouseEnterEventListener, false);
				$el[0].removeEventListener('mouseleave', myDesktopMouseLeaveEventListener, false);
				// $el.children(settings.classMap.invoker)[0].removeEventListener('focus', myDesktopMouseEnterEventListener, false);
				$el.children(itemSettings.classMap.invoker)[0].removeEventListener('click', myDesktopClickEventListener, false);
				
				// Add Mobile Listeners
				$el.children(itemSettings.classMap.invoker)[0].addEventListener('click', myMobileClickEventListener, false);
			},
			desktopListeners = () => {
				// Remove Mobile Listeners
				$el.children(itemSettings.classMap.invoker)[0].removeEventListener('click', myMobileClickEventListener, false);
				
				// Add Desktop Listeners
				$menu[0].addEventListener('animationend', myDesktopCSSAnimationEnable, false);
				$menu[0].addEventListener('webkitAnimationEnd', myDesktopCSSAnimationEnable, false);
				
				if (itemSettings.eventType === 'hover') {
					$el[0].addEventListener('mouseenter', myDesktopMouseEnterEventListener, false);
					$el[0].addEventListener('mouseleave', myDesktopMouseLeaveEventListener, false);
					
					// if (!$el.parents().hasClass(settings.classMap.subMenu.slice(1))) {
					// 	$el.children(settings.classMap.invoker)[0].addEventListener('focus', myDesktopMouseEnterEventListener, false);
					// }
				}
				
				if (itemSettings.eventType === 'click') {
					$el.children(itemSettings.classMap.invoker)[0].addEventListener('click', myDesktopClickEventListener, false);
				}
			};
		
		if (itemSettings.desktop.maxWidth) {
			$menu.css('max-width', itemSettings.desktop.maxWidth);
		}
		
		if (itemSettings.desktop.position) {
			$menu.addClass(`hs-position-${itemSettings.desktop.position}`);
		}
		
		// Document Events
		$(document).on('click', function (e) {
			if ($(e.target).closest($menu).length === 0 && $(e.target).closest(itemSettings.classMap.invoker).length === 0 && context.state === 'desktop') {
				$el.removeClass(itemSettings.activeItemClass().slice(1));
				
				$menu.removeClass(itemSettings.desktop.animationIn);
				
				if (itemSettings.animationOut) {
					$menu.addClass(itemSettings.desktop.animationOut);
				} else {
					$menu.hide();
				}
			}
		});
		
		// Resize and Scroll Events
		$(window).on('resize', function () {
			if (context.state === 'desktop') {
				smartPosition($menu, itemSettings);
			}
		});
		
		// State Detection
		$(window).on('resize', function () {
			if (context.state === 'mobile') {
				$menu.removeClass(itemSettings.desktop.animation).css('animation-duration', '');
				
				mobileListeners();
			} else if (context.state === 'desktop') {
				$menu.addClass(itemSettings.desktop.animation).css('animation-duration', `${itemSettings.duration}ms`);
				
				desktopListeners();
			}
		}).trigger('resize');
	}
}
