export default function cssAnimationHide(target, config, effect) {
	target.removeClass($(target).attr('data-hs-unfold-content-animation-in')).addClass(effect);
}
