export default function cssAnimationShow(target, config) {
	if(config.cssAnimatedClass) {
		target.removeClass(`${config.hiddenClass.slice(1)} ${config.animationOut}`).addClass(config.animationIn);
	} else {
		target.removeClass(`${config.hiddenClass.slice(1)} ${config.animationOut}`);
		
		setTimeout(function() {
			target.addClass(config.animationIn);
		});
	}
}
