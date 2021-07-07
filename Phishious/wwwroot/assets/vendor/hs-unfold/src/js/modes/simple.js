import smartPosition from "../methods/smart-position";

import simpleShow from "../methods/simple-show";
import simpleHide from "../methods/simple-hide";

export default function simple(el, config) {
	$(config.target).addClass(config.simpleEffectClass.slice(1));

	function clickFunc() {
		if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {
			el.removeClass(config.invokerActiveClass.slice(1));

			simpleHide($(config.target), config);
		} else {
			el.addClass(config.invokerActiveClass.slice(1));

			simpleShow($(config.target), config);

			if(!config.smartPositionOff) {
				smartPosition($(config.target), el, config);
			}
		}
	}

	function mouseEnterFunc() {
		el.addClass(config.invokerActiveClass.slice(1));

		simpleShow($(config.target), config);

		if(!config.smartPositionOff) {
			smartPosition($(config.target), el, config);
		}
	}

	function mouseLeaveFunc() {
		el.removeClass(config.invokerActiveClass.slice(1));

		simpleHide($(config.target), config);
	}

	function initSimple() {
		if (window.navigator.userAgent.indexOf('Mobile') !== -1) {
			el[0].addEventListener('click', clickFunc);
		} else {
			if (config.event === 'hover') {
				// Hover
				el.parent(config.wrapperSelector)[0].addEventListener('mouseenter', mouseEnterFunc)
				el.parent(config.wrapperSelector)[0].addEventListener('mouseleave', mouseLeaveFunc)
			} else {
				// Click
				el[0].addEventListener('click', clickFunc);
			}
		}
	}

	$(window).on('resize', function () {
		initSimple()
	})

	initSimple()
}
