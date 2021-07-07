import HSAbstractObserver from "./abstract";

export default class HSHeaderChangeLogoObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.config = {
			fixPointSelf: false
		};
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}

	init() {
		if (this.element.hasClass('js-header-fix-moment')) {
			this.hasFixedClass = true;
			this.element.removeClass('js-header-fix-moment');
		}

		if (this.config.fixPointSelf) {
			this.offset = this.element.offset().top;
		} else {
			this.offset = isFinite(this.dataSettings.fixMoment) ? this.dataSettings.fixMoment : 0;
		}

		if (this.hasFixedClass) {
			this.hasFixedClass = false;
			this.element.addClass('js-header-fix-moment');
		}

		this.imgs = this.element.find('.header-logo-img');
		this.defaultState = true;

		this.mainLogo = this.imgs.filter('.header-logo-img-main');
		this.additionalLogo = this.imgs.not('.header-logo-img-main');

		if (!this.imgs.length) return this;

		return this;
	}

	destroy() {
		this.toDefaultState();

		return this;
	}

	check() {
		let $w = $(window);

		if (!this.imgs.length) return this;

		if ($w.scrollTop() > this.offset && this.defaultState) {
			this.changeState();
		} else if ($w.scrollTop() <= this.offset && !this.defaultState) {
			this.toDefaultState();
		}

		return this;
	}

	changeState() {
		if (this.mainLogo.length) {
			this.mainLogo.removeClass('header-logo-img-main');
		}

		if (this.additionalLogo.length) {
			this.additionalLogo.addClass('header-logo-img-main');
		}

		this.defaultState = !this.defaultState;

		return this;
	}

	toDefaultState() {
		if (this.mainLogo.length) {
			this.mainLogo.addClass('header-logo-img-main');
		}

		if (this.additionalLogo.length) {
			this.additionalLogo.removeClass('header-logo-img-main');
		}

		this.defaultState = !this.defaultState;

		return this;
	}
}
