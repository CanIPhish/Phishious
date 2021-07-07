import HSAbstractObserver from "./abstract";

export default class HSHeaderFloatingObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}

	init() {
		this.offset = this.element.offset().top;
		this.sections = this.element.find('.header-section');
		this.defaultState = true;

		return this;
	}

	destroy() {
		this.toDefaultState();

		return this;
	}
	
	check() {
		var $w = $(window),
			docScrolled = $w.scrollTop();
		
		if (docScrolled > this.offset && this.defaultState) {
			this.changeState();
		} else if (docScrolled <= this.offset && !this.defaultState) {
			this.toDefaultState();
		}
		
		return this;
	}

	changeState() {
		this.element
			.addClass('js-header-fix-moment')
			.addClass(this.dataSettings.fixMomentClasses)
			.removeClass(this.dataSettings.fixMomentExclude);

		if (this.sections.length) {
			this.sections.each(function (i, el) {
				let $section = $(el),
					dataSettings = $section.attr('data-hs-header-item-options') ? JSON.parse($section.attr('data-hs-header-item-options')) : {};

				$section.addClass(dataSettings.fixMomentClasses)
					.removeClass(dataSettings.fixMomentExclude);
			});
		}

		this.defaultState = !this.defaultState;

		return this;
	}

	toDefaultState() {
		this.element
			.removeClass('js-header-fix-moment')
			.removeClass(this.dataSettings.fixMomentClasses)
			.addClass(this.dataSettings.fixMomentExclude);

		if (this.sections.length) {
			this.sections.each(function (i, el) {
				let $section = $(el),
					dataSettings = $section.attr('data-hs-header-item-options') ? JSON.parse($section.attr('data-hs-header-item-options')) : {};

				$section.addClass(dataSettings.fixMomentClasses)
					.removeClass(dataSettings.fixMomentExclude);
			});
		}

		this.defaultState = !this.defaultState;

		return this;
	}
}
