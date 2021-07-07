import smartPosition from "./methods/smart-position";
import closeElementWithSpecificEffect from "./methods/close-element-with-specific-effect";

import simple from "./modes/simple";
import simpleShow from "./methods/simple-show";

import cssAnimation from "./modes/css-animation";
import cssAnimationShow from "./methods/css-animation-show";

import slide from "./modes/slide";
import slideShow from "./methods/slide-show";

export default class HSUnfold {
	constructor(elem, settings) {
		this.elem = elem;
		this.defaults = {
			event: 'click',
			type: 'simple',
			duration: 300,
			delay: 350,
			easing: 'linear',
			animationIn: 'slideInUp',
			animationOut: 'fadeOut',
			hideOnScroll: false,
			hasOverlay: false,
			smartPositionOff: false,
      smartPositionOffEl: false,
			isFullWindow: false,

			wrapperSelector: '.hs-unfold',
			contentSelector: '.hs-unfold-content',
			invokerSelector: '.js-hs-unfold-invoker',
			invokerActiveClass: '.hs-active',
			overlayClass: '.hs-unfold-overlay',
			overlayStyles: {},
			initializedClass: '.hs-unfold-content-initialized',
			hiddenClass: '.hs-unfold-hidden',
			simpleEffectClass: '.hs-unfold-simple',
			cssAnimationClass: '.hs-unfold-css-animation',
			cssAnimatedClass: '.animated',
			slideEffectClass: '.hs-unfold-jquery-slide',
			reverseClass: '.hs-unfold-reverse-y',

			unfoldTimeOut: null,

			afterOpen: () => {
			},
			afterClose: () => {
			}
		};
		this.settings = settings;
	}

	init() {
		const context = this;

		// Keycodes
		const ESC_KEYCODE = 27,
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
			const $el = el,
				dataSettings = $el.attr('data-hs-unfold-options') ? JSON.parse($el.attr('data-hs-unfold-options')) : {};
			let options = Object.assign({}, context.defaults, context.settings, dataSettings);

			return options;
		}

		// Init Unfold
		$(this.elem).each(function () {
			context.UnfoldItem($(this));
		});

		// *****
		// Start: ACCESSIBILITY
		// *****
		const myPreventScrollSpace = preventScroll(SPACE_KEYCODE),
			myPreventScrollDown = preventScroll(ARROW_DOWN_KEYCODE),
			myPreventScrollUp = preventScroll(ARROW_UP_KEYCODE);

		let $items,
			index,
			itemSettings;

		$(document).on('keyup', '[data-hs-unfold-invoker], [data-hs-unfold-content]', function (e) {
			if (
				e.which !== ESC_KEYCODE &&
				e.which !== TAB_KEYCODE &&
				e.which !== ENTER_KEYCODE &&
				e.which !== ARROW_UP_KEYCODE &&
				e.which !== ARROW_DOWN_KEYCODE ||
				typeof $(e.target).attr('data-hs-unfold-invoker') == typeof undefined
			) {
				return;
			}

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

			if (
				typeof $(e.target).attr('data-hs-unfold-invoker') !== typeof undefined &&
				$(e.target).attr('data-hs-unfold-invoker') !== false
			) {
				itemSettings = getItemSettings($(e.target));

				$items = [].slice.call($(itemSettings.target).find('a, button, input, select, textarea')).filter(function (item) {
					return $(item).is(':visible');
				});
			}

			index = $items.indexOf(e.target);

			//
			// End: HAS ITEMS
			//

			// Up
			if (
				$items.length > 0 &&
				e.which === ARROW_UP_KEYCODE &&
				index > 0
			) {
				index--;
			}

			// Down
			if (
				$items.length > 0 &&
				e.which === ARROW_DOWN_KEYCODE &&
				index < ($items.length - 1)
			) {
				index++;
			}

			// Open Dropdown
			if (
				$items.length <= 0 &&
				(
					e.which === ARROW_DOWN_KEYCODE ||
					e.which === ARROW_UP_KEYCODE ||
					e.which === SPACE_KEYCODE ||
					e.which === ENTER_KEYCODE
				)
			) {
				if (!$(`${itemSettings.target}:visible`).length) {
					$(e.target).addClass(itemSettings.invokerActiveClass.slice(1));

					if (itemSettings.type === 'css-animation') {
						cssAnimationShow($(itemSettings.target), itemSettings);
					} else if (itemSettings.type === 'jquery-slide') {
						slideShow($(itemSettings.target), itemSettings, () => {
						});
					} else {
						simpleShow($(itemSettings.target), itemSettings);
					}
				} else if ($(`${itemSettings.target}:visible`).length) {
					$($(itemSettings.target).find('a')[0]).focus();

					return;
				}
			}

			// Close Self
			if (e.which === ESC_KEYCODE) {
				let $target = $(`${itemSettings.contentSelector}:not(${itemSettings.hiddenClass})`);

				// $(itemSettings.invokerActiveClass).focus();

				closeElementWithSpecificEffect($target, itemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));

				return;
			}

			// Close All
			if (
				e.which === TAB_KEYCODE &&
				$(e.target).closest('[data-hs-unfold-content]').length === 0
			) {
				var $invoker = $('[data-hs-unfold-invoker].hs-active'),
					$target = $('[data-hs-unfold-content]:visible'),
					openedItemSettings = getItemSettings($invoker);

				$invoker.removeClass('hs-active');

				closeElementWithSpecificEffect($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));

				return;
			}

			//
			// End: HAS ITEMS
			//

			$($items[index]).focus();
		});

		$(document).on('keyup', function (e) {
			var $invoker,
				$target,
				openedItemSettings;

			// Close All
			if (
				e.which === TAB_KEYCODE &&
				$(e.target).closest('[data-hs-unfold-content]').length === 0
			) {
				$invoker = $('[data-hs-unfold-invoker].hs-active');
				$target = $('[data-hs-unfold-content]:visible');
				openedItemSettings = getItemSettings($invoker);

				$invoker.removeClass('hs-active');

				closeElementWithSpecificEffect($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));
			}

			// Close Self
			if (e.which === ESC_KEYCODE) {
				$invoker = $('[data-hs-unfold-invoker].hs-active');
				$target = $('[data-hs-unfold-content]:visible');
				openedItemSettings = getItemSettings($invoker);

				$invoker.removeClass('hs-active');

				closeElementWithSpecificEffect($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));
			}
		});

		// *****
		// End: ACCESSIBILITY
		// *****
	}

	UnfoldItem(el) {
		const context = this,
			$el = el,
			itemDataSettings = el.attr('data-hs-unfold-options') ? JSON.parse(el.attr('data-hs-unfold-options')) : {};
		let options = Object.assign({}, context.defaults, context.settings, itemDataSettings),
			originalEvent = options.event;

		context._prepareObjects($el, $(options.target), options);

    function closeFunc() {
      $(options.contentSelector).not($(options.target)).not($(options.target).parents(options.contentSelector)).each(function () {
        $(options.invokerSelector).removeClass(options.invokerActiveClass.slice(1));

        closeElementWithSpecificEffect($(this), options, $(this).attr('data-hs-unfold-content-animation-in'), $(this).attr('data-hs-unfold-content-animation-out'));
      });
    }

    if (window.navigator.userAgent.indexOf('Mobile') !== -1) {
      options.event = 'click'
    } else {
      options.event = originalEvent
    }

    $el.on(options.event === 'hover' ? 'mouseenter' : 'click', closeFunc);

		$(window).on('resize', function () {
			if (window.navigator.userAgent.indexOf('Mobile') !== -1) {
				options.event = 'click'
			} else {
				options.event = originalEvent
			}

			$el[0].addEventListener(options.event === 'hover' ? 'mouseenter' : 'click', closeFunc);
		})

		if (options.type === 'css-animation') {
			cssAnimation($el, options, options.animationOut);
		} else if (options.type === 'jquery-slide') {
			slide($el, options);
		} else {
			simple($el, options);
		}

		// Document Events
		$(window).on('click', function (e) {
			let targetClass = `${options.contentSelector}:not(${options.hiddenClass})`,
				$target = $(targetClass);

			if ($(e.target).closest(options.contentSelector).length === 0 && $(e.target).closest(options.invokerSelector).length === 0 && $target.length !== 0) {
				$el.removeClass(options.invokerActiveClass.slice(1));

				closeElementWithSpecificEffect($target, options, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));
			} else if ($(e.target).closest(options.contentSelector).length !== 0 && $(e.target).closest(options.contentSelector).find(options.contentSelector).length !== 0 && $(e.target).closest(options.invokerSelector).length === 0 && !options.hasOverlay) {
				closeElementWithSpecificEffect($(e.target).closest(options.contentSelector).find(targetClass), options, $(e.target).closest(options.contentSelector).find(targetClass).data('hs-unfold-content-animation-in'), $(e.target).closest(options.contentSelector).find(targetClass).data('hs-unfold-content-animation-out'));
			}
		});

		// Resize and Scroll Events
		$(window).on('resize scroll', function () {
			if (!options.smartPositionOff) {
				smartPosition($(options.target), $el, options);
			}
		});

		if (options.hideOnScroll) {
			$(window).on('scroll', function () {
				$el.removeClass(options.invokerActiveClass.slice(1));

				closeElementWithSpecificEffect($(options.target), options, options.animationIn, options.animationOut);
			});
		}
	}

	_prepareObjects(el, target, config) {
		el.addClass(config.invokerSelector.slice(1));
		el.attr('data-hs-unfold-target', config.target);
		el.attr('data-hs-unfold-invoker', '');
		target.attr('data-hs-target-height', target.outerHeight());
		target.attr('data-hs-unfold-content', '');
		target.addClass(`${config.hiddenClass.slice(1)} ${config.initializedClass.slice(1)}`);

		if (config.hasOverlay && $(config.overlayClass).length === 0) {
			$('body').append($(`<div class="${config.overlayClass.slice(1)}"></div>`).css(config.overlayStyles));
		}

		if (config.type === 'css-animation') {
			target.attr('data-hs-unfold-content-animation-in', config.animationIn);
			target.attr('data-hs-unfold-content-animation-out', config.animationOut);
		}
	}
}
