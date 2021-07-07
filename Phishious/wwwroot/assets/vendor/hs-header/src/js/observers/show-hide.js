import HSAbstractObserver from "./abstract";

export default class HSHeaderShowHideObserver extends HSAbstractObserver {
	constructor(element) {
		super(element);
		this.dataSettings = this.element.attr('data-hs-header-options') ? JSON.parse(this.element.attr('data-hs-header-options')) : {};
	}
	
	init() {
		if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
		
		this.defaultState = true;
		this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;
		
		this.offset = isFinite(this.dataSettings.fixMoment) && this.dataSettings.fixMoment > this.element.outerHeight() ? this.dataSettings.fixMoment : this.element.outerHeight() + 100;
		this.effect = this.dataSettings.fixEffect ? this.dataSettings.fixEffect : 'show-hide';
		
		return this;
	}
	
	destroy() {
		if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
		
		this.element.removeClass('header-untransitioned');
		this._removeCap();
		
		return this;
	}
	
	check() {
		let $w = $(window);
		
		if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
			this._insertCap();
		} else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
			this._removeCap();
		}
		
		if ($w.scrollTop() > this.offset && this.defaultState) {
			this.changeState();
		} else if ($w.scrollTop() <= this.offset && !this.defaultState) {
			this.toDefaultState();
		}
	}
	
	changeState() {
		this.element.removeClass('header-untransitioned');
		
		if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);
		
		switch (this.effect) {
			case 'fade' :
				this.element.removeClass('header-faded');
				break;
			
			case 'slide' :
				this.element.removeClass('header-moved-up');
				break;
			
			default:
				this.element.removeClass('header-invisible');
		}
		
		this.defaultState = !this.defaultState;
	}
	
	toDefaultState() {
		let self = this;
		
		this.animationTimeoutId = setTimeout(function () {
			self.element.addClass('header-untransitioned');
		}, this.transitionDuration);
		
		switch (this.effect) {
			case 'fade' :
				this.element.addClass('header-faded');
				break;
			case 'slide' :
				this.element.addClass('header-moved-up');
				break;
			default:
				this.element.addClass('header-invisible');
		}
		
		this.defaultState = !this.defaultState;
	}
	
	_insertCap() {
		this.element.addClass('js-header-fix-moment header-untransitioned');
		
		if (this.element.hasClass('header-static')) {
			$('html').css('padding-top', this.element.outerHeight());
		}
		
		switch (this.effect) {
			case 'fade' :
				this.element.addClass('header-faded');
				break;
			
			case 'slide' :
				this.element.addClass('header-moved-up');
				break;
			
			default :
				this.element.addClass('header-invisible')
		}
		
		this.capInserted = true;
	}
	
	_removeCap() {
		let self = this;
		
		this.element.removeClass('js-header-fix-moment');
		
		if (this.element.hasClass('header-static')) {
			$('html').css('padding-top', 0);
		}
		
		if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);
		
		this.removeCapTimeOutId = setTimeout(function () {
			self.element.removeClass('header-moved-up header-faded header-invisible');
		}, 10);
		
		this.capInserted = false;
	}
}
