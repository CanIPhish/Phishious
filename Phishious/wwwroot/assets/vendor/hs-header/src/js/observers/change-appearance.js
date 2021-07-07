import HSAbstractObserver from "./abstract";

export default class HSHeaderChangeAppearanceObserver extends HSAbstractObserver {
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
			this.offset = isFinite(this.dataSettings.fixMoment) ? this.dataSettings.fixMoment : 5;
		}
		
		if (this.hasFixedClass) {
			this.hasFixedClass = false;
			this.element.addClass('js-header-fix-moment');
		}
		
		this.sections = this.element.find('[data-hs-header-item-options]');
		this.defaultState = true;
		
		return this;
	}
	
	destroy() {
		this.toDefaultState();
		
		return this;
	}
	
	check() {
		if (!this.sections.length) return this;
		
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
		this.sections.each(function (i, el) {
			let $this = $(el),
				dataSettings = $this.attr('data-hs-header-item-options') ? JSON.parse($this.attr('data-hs-header-item-options')) : {},
				classes = dataSettings.fixMomentClasses,
				exclude = dataSettings.fixMomentExclude;
			
			if (!classes && !exclude) return;
			
			$this.addClass(classes + ' js-header-change-moment');
			$this.removeClass(exclude);
		});
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
	
	toDefaultState() {
		this.sections.each(function (i, el) {
			let $this = $(el),
				dataSettings = $this.attr('data-hs-header-item-options') ? JSON.parse($this.attr('data-hs-header-item-options')) : {},
				classes = dataSettings.fixMomentClasses,
				exclude = dataSettings.fixMomentExclude;
			
			if (!classes && !exclude) return;
			
			$this.removeClass(classes + ' js-header-change-moment');
			$this.addClass(exclude);
		});
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
}
