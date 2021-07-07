import smartPosition from "../methods/smart-position";

import cssAnimationShow from "../methods/css-animation-show";
import cssAnimationHide from "../methods/css-animation-hide";

export default function cssAnimation(el, config, hideEffect) {
	$(config.target).addClass(`${config.cssAnimationClass.slice(1)} ${config.cssAnimatedClass ? config.cssAnimatedClass.slice(1) : ''}`).css('animation-duration', `${config.duration}ms`);
	
	$(config.target).on('animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function (e) {
		if ($(config.target).hasClass(config.animationOut)) {
			$(config.target).removeClass(config.animationOut).addClass(config.hiddenClass.slice(1));
			
			config.afterClose();
		}
		
		if ($(config.target).hasClass(config.animationIn)) {
			config.afterOpen();
		}
		
		e.preventDefault();
		e.stopPropagation();
	});
	
	$(config.target).on('animationstart webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart', function (e) {
		if ($(config.target).hasClass(config.animationOut)) {
			if (config.hasOverlay) {
				$(config.overlayClass).fadeOut(200);
			}
		} else if ($(config.target).hasClass(config.animationIn)) {
			if (config.hasOverlay) {
				$(config.overlayClass).fadeIn(200);
			}
		}
		
		e.preventDefault();
		e.stopPropagation();
	});
	
	function mouseEnterFunc() {
		if (config.unfoldTimeOut) {
			clearTimeout(config.unfoldTimeOut);
		}
		
		el.addClass(config.invokerActiveClass.slice(1));
		
		cssAnimationShow($(config.target), config);
		
		if(!config.smartPositionOff) {
			smartPosition($(config.target), el, config);
		}
	}
	
	function mouseLeaveFunc() {
		config.unfoldTimeOut = setTimeout(function () {
			el.removeClass(config.invokerActiveClass.slice(1));
			
			cssAnimationHide($(config.target), config, hideEffect);
		}, config.delay);
	}
	
	function clickFunc() {
		if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {
			el.removeClass(config.invokerActiveClass.slice(1));
			
			cssAnimationHide($(config.target), config, hideEffect);
		} else {
			el.addClass(config.invokerActiveClass.slice(1));
			
			cssAnimationShow($(config.target), config);
			
			if(!config.smartPositionOff) {
				smartPosition($(config.target), el, config);
			}
			
			if (config.hasOverlay) {
				$(config.overlayClass).fadeIn(200);
			}
		}
	}
	
	if (config.event === 'hover') {
		// Hover
		$(window).on('resize', function () {
			if (window.navigator.userAgent.indexOf('Mobile') !== -1) {
				el.parent(config.wrapperSelector)[0].removeEventListener('mouseenter', mouseEnterFunc, false);
				el.parent(config.wrapperSelector)[0].removeEventListener('mouseleave', mouseLeaveFunc, false);
				
				el[0].addEventListener('click', clickFunc, false);
			} else {
				el[0].removeEventListener('click', clickFunc, false);
				
				el.parent(config.wrapperSelector)[0].addEventListener('mouseenter', mouseEnterFunc, false);
				el.parent(config.wrapperSelector)[0].addEventListener('mouseleave', mouseLeaveFunc, false);
			}
		}).trigger('resize');
	} else {
		// Click
		el[0].addEventListener('click', clickFunc, false);
	}
}
