export default function desktopShow(el, menu, params, itemParams) {
	menu.removeClass(itemParams.desktop.animationOut).show().addClass(itemParams.desktop.animationIn);
}
