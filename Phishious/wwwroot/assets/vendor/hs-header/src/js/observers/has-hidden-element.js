import HSAbstractObserver from "./abstract";

export default class HSHeaderHasHiddenElement extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.config = {
			animated: true
		};
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}
	
	init() {
		this.offset = isFinite(this.dataSettings.fixMoment) ? this.dataSettings.fixMoment : 5;
		this.elements = this.element.find('.header-hidden-element');
		this.defaultState = true;
		
		return this;
	}
	
	destroy() {
		this.toDefaultState();
		
		return this;
	}
	
	check() {
		if (!this.elements.length) return this;
		
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
		if (this.config.animated) {
			this.elements.stop().slideUp();
		} else {
			this.elements.hide();
		}
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
	
	toDefaultState() {
		if (this.config.animated) {
			this.elements.stop().slideDown();
		} else {
			this.elements.show();
		}
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
}
