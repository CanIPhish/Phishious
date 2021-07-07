import HSAbstractObserver from "./abstract";

export default class HSHeaderMomentShowHideObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}
	
	init() {
		this.direction = 'down';
		this.delta = 0;
		this.defaultState = true;
		
		this.offset = isFinite(this.dataSettings.fixMoment) && this.dataSettings.fixMoment !== 0 ? this.dataSettings.fixMoment : 5;
		this.effect = this.dataSettings.fixEffect ? this.dataSettings.fixEffect : 'show-hide';
		
		return this;
	}
	
	destroy() {
		this.toDefaultState();
		
		return this;
	}
	
	checkDirection() {
		if ($(window).scrollTop() > this.delta) {
			this.direction = 'down';
		} else {
			this.direction = 'up';
		}
		
		this.delta = $(window).scrollTop();
		
		return this;
	}
	
	toDefaultState() {
		switch (this.effect) {
			case 'slide' :
				this.element.removeClass('header-moved-up');
				break;
			
			case 'fade' :
				this.element.removeClass('header-faded');
				break;
			
			default:
				this.element.removeClass('header-invisible');
		}
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
	
	changeState() {
		switch (this.effect) {
			case 'slide' :
				this.element.addClass('header-moved-up');
				break;
			
			case 'fade' :
				this.element.addClass('header-faded');
				break;
			
			default:
				this.element.addClass('header-invisible');
		}
		
		this.defaultState = !this.defaultState;
		
		return this;
	}
	
	check() {
		let docScrolled = $(window).scrollTop();
		
		this.checkDirection();
		
		if (docScrolled >= this.offset && this.defaultState && this.direction === 'down') {
			this.changeState();
		} else if (!this.defaultState && this.direction === 'up') {
			this.toDefaultState();
		}
		
		return this;
	}
}
