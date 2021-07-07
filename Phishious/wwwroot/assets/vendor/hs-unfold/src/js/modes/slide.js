import smartPosition from "../methods/smart-position";

import slideShow from "../methods/slide-show";
import slideHide from "../methods/slide-hide";
import simpleHide from "../methods/simple-hide";
import simpleShow from "../methods/simple-show";

export default function slide(el, config) {
	$(config.target).addClass(config.slideEffectClass.slice(1)).css('display', 'none');

	function clickFunc() {
		if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {
			slideHide($(config.target), config, function() {
				el.removeClass(config.invokerActiveClass.slice(1));
			});
		} else {
			slideShow($(config.target), config, function() {
				el.addClass(config.invokerActiveClass.slice(1));
			});

			if(!config.smartPositionOff) {
				smartPosition($(config.target), el, config);
			}
		}
	}

	function mouseEnterFunc() {
		slideShow($(config.target), config, function() {
			el.addClass(config.invokerActiveClass.slice(1));
		});

		if(!config.smartPositionOff) {
			smartPosition($(config.target), el, config);
		}
	}

	function mouseLeaveFunc() {
		slideHide($(config.target), config, function() {
			el.removeClass(config.invokerActiveClass.slice(1));
		});
	}

	function initSlide() {
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
		initSlide()
	})

	initSlide()
}
