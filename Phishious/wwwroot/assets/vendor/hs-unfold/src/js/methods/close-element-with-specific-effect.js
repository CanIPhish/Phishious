import simpleHide from "../methods/simple-hide";
import cssAnimationHide from "./css-animation-hide";
import slideHide from "../methods/slide-hide";

export default function closeElementWithSpecificEffect(el, config, cssAnimationShowEffect, cssAnimationHideEffect) {
	if (el.hasClass(config.hiddenClass.slice(1))) return;

	if (el.hasClass(config.cssAnimationClass.slice(1))) {
		cssAnimationHide(el, config, cssAnimationHideEffect);

		el.on('animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function (e) {


			if (el.hasClass(cssAnimationHideEffect)) {
				el.removeClass(cssAnimationHideEffect).addClass(config.hiddenClass.slice(1));

				config.afterClose();
			}
			
			if (el.hasClass(cssAnimationShowEffect)) {
				config.afterOpen();
			}
			
			e.preventDefault();
			e.stopPropagation();
		});
	} else if (el.hasClass(config.slideEffectClass.slice(1))) {
		slideHide(el, config, function () {});
	} else {
		simpleHide(el, config);
	}
}
