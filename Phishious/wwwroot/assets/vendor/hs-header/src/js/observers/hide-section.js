import HSAbstractObserver from "./abstract";

export default class HSHeaderHideSectionObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}

	init() {
		this.offset = isFinite(this.dataSettings.fixMoment) ? this.dataSettings.fixMoment : 5;
		this.section = this.element.find('.header-section-hidden');
		this.defaultState = true;

		this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;

		return this;
	}

	destroy() {
		if (this.section.length) {
			this.element.css({
				'margin-top': 0
			});
		}

		return this;
	}

	check() {
		if (!this.section.length) return this;

		let $w = $(window),
			docScrolled = $w.scrollTop();

		if (docScrolled > this.offset && this.defaultState) {
			this.changeState();
		} else if (docScrolled <= this.offset && !this.defaultState) {
			this.toDefaultState();
		}

		return this;
	}

	changeState() {
		let self = this;

		this.element.stop().animate({
			'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
		});

		this.defaultState = !this.defaultState;

		return this;
	}

	toDefaultState() {
		this.element.stop().animate({
			'margin-top': 0
		});

		this.defaultState = !this.defaultState;

		return this;
	}
}
