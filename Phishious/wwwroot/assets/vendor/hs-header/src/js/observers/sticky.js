import HSAbstractObserver from "./abstract";

export default class HSHeaderStickObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
	}
	
	init() {
		this.defaultState = true;
		this.offset = this.element.offset().top;
		
		return this;
	}
	
	destroy() {
		this.toDefaultState();
		
		return this;
	}
	
	check() {
		let $w = $(window),
			docScrolled = $w.scrollTop();
		
		if (docScrolled > this.offset && this.defaultState) {
			this.changeState();
		} else if (docScrolled < this.offset && !this.defaultState) {
			this.toDefaultState();
		}
		
		return this;
	}
	
	changeState() {
		this.element.addClass('js-header-fix-moment');
		this.defaultState = !this.defaultState;
		
		return this;
	}
	
	toDefaultState() {
		this.element.removeClass('js-header-fix-moment');
		this.defaultState = !this.defaultState;
		
		return this;
	}
}
