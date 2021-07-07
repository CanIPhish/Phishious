/*
* HSHeader Plugin
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later
* @author: HtmlStream
* @event-namespace: .HSHeader
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2019 Htmlstream
*/

// Sticky
import HSHeaderStickObserver from "./observers/sticky";

// Moment Show / Hide
import HSHeaderMomentShowHideObserver from "./observers/moment-show-hide";

// Show / Hide
import HSHeaderShowHideObserver from "./observers/show-hide";

// Change Logo
import HSHeaderChangeLogoObserver from "./observers/change-logo";

// Hide Section
import HSHeaderHideSectionObserver from "./observers/hide-section";

// Change Appearance
import HSHeaderChangeAppearanceObserver from "./observers/change-appearance";

// Has Hidden Element
import HSHeaderHasHiddenElement from "./observers/has-hidden-element";

// Floating
import HSHeaderFloatingObserver from "./observers/floating";

// Without Behavior
import HSHeaderWithoutBehaviorObserver from "./observers/without-behavior";

export default class HSHeader {
	constructor(element, config, observers) {
		this.element = element;
		this.config = config;
		this.observers = observers && $.isPlainObject(observers) ? observers : {};
		this.viewport = 'xs';
		this.defaults = {
			fixMoment: 0,
			fixMomentClasses: null,
			fixMomentExclude: null,
			fixEffect: 'slide',
			breakpoint: 'lg',
			breakpointsMap: {
				'md': 768,
				'sm': 576,
				'lg': 992,
				'xl': 1200
			},
			effectCompensation: false,
			effectCompensationStartClass: false,
			effectCompensationEndClass: false
		};
	}
	
	init() {
		const self = this,
			element = this.element;
		let dataSettings = element.attr('data-hs-header-options') ? JSON.parse(element.attr('data-hs-header-options')) : {};
		
		if (!element || element.length !== 1 || element.data('HSHeader')) return;
		
		this.config = $.extend(true, {}, this.defaults, dataSettings);
		
		this._detectObservers();
		this.fixMediaDifference(this.element);
		this.checkViewport();
		
		$(window).on('scroll.uHeader', function (e) {
			window.HSHeader = null;
			
			if ($(window).scrollTop() < (self.config.fixMoment - 100) && self.config.effectCompensation === true) {
				$(element).css({
					top: -($(window).scrollTop())
				}).addClass(self.config.effectCompensationStartClass).removeClass(self.config.effectCompensationEndClass);
			} else if (self.config.effectCompensation === true) {
				$(element).css({
					top: 0
				}).addClass(self.config.effectCompensationEndClass).removeClass(self.config.effectCompensationStartClass);
			}
			
			if ($(window).scrollTop() > 5 && !$(element).hasClass('scrolled')) {
				$(element).addClass('scrolled');
			}
			
			if ($(window).scrollTop() < 5) {
				$(element).removeClass('scrolled');
			}
			
			if (element.data('HSHeader')) {
				self.notify();
			}
			
			element.data('HSHeader', this);
		}).on('resize.uHeader', function (e) {
			if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);
			
			self.resizeTimeOutId = setTimeout(function () {
				// self.checkViewport();
				self.update();
			}, 100);
		}).trigger('scroll.uHeader');
		
		return this.element;
	}
	
	header(element, config, observers) {
		if (!element || !element.length) return;
		
		this.element = element;
		this.config = config;
		
		this.observers = observers && $.isPlainObject(observers) ? observers : {};
		
		this.viewport = 'xs';
		
		this.checkViewport();
	}
	
	_detectObservers() {
		if (!this.element || !this.element.length) return;
		
		let observers = this.observers = {
			'xs': [],
			'sm': [],
			'md': [],
			'lg': [],
			'xl': []
		};
		
		/* ------------------------ xs -------------------------*/
		
		// Has Hidden Element
		if (this.element.hasClass('header-has-hidden-element')) {
			observers['xs'].push(
				new HSHeaderHasHiddenElement(this.element).init()
			);
		}
		
		// Sticky top
		if (this.element.hasClass('header-sticky-top')) {
			if (this.element.hasClass('header-show-hide')) {
				observers['xs'].push(
					new HSHeaderMomentShowHideObserver(this.element).init()
				);
			} else if (this.element.hasClass('header-toggle-section')) {
				observers['xs'].push(
					new HSHeaderHideSectionObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo')) {
				observers['xs'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance')) {
				observers['xs'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Floating
		if (this.element.hasClass('header-floating')) {
			observers['xs'].push(
				new HSHeaderFloatingObserver(this.element).init()
			);
		}
		
		if (this.element.hasClass('header-invulnerable')) {
			observers['xs'].push(
				new HSHeaderWithoutBehaviorObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-sticky-bottom')) {
			if (this.element.hasClass('header-change-appearance')) {
				observers['xs'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo')) {
				observers['xs'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
		}
		
		// Abs top & Static
		if (this.element.hasClass('header-abs-top') || this.element.hasClass('header-static')) {
			if (this.element.hasClass('header-show-hide')) {
				observers['xs'].push(
					new HSHeaderShowHideObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo')) {
				observers['xs'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance')) {
				observers['xs'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Abs bottom & Abs top 2nd screen
		if (this.element.hasClass('header-abs-bottom') || this.element.hasClass('header-abs-top-2nd-screen')) {
			observers['xs'].push(
				new HSHeaderStickObserver(this.element).init()
			);
			
			if (this.element.hasClass('header-change-appearance')) {
				observers['xs'].push(
					new HSHeaderChangeAppearanceObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo')) {
				observers['xs'].push(
					new HSHeaderChangeLogoObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
		}
		
		/* ------------------------ sm -------------------------*/
		
		// Sticky top
		
		// Has Hidden Element
		if (this.element.hasClass('header-has-hidden-element-sm')) {
			observers['sm'].push(
				new HSHeaderHasHiddenElement(this.element).init()
			);
		}
		
		if (this.element.hasClass('header-sticky-top-sm')) {
			if (this.element.hasClass('header-show-hide-sm')) {
				observers['sm'].push(
					new HSHeaderMomentShowHideObserver(this.element).init()
				);
			} else if (this.element.hasClass('header-toggle-section-sm')) {
				observers['sm'].push(
					new HSHeaderHideSectionObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-sm')) {
				observers['sm'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-sm')) {
				observers['sm'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Floating
		if (this.element.hasClass('header-floating-sm')) {
			observers['sm'].push(
				new HSHeaderFloatingObserver(this.element).init()
			);
		}
		
		if (this.element.hasClass('header-invulnerable-sm')) {
			observers['sm'].push(
				new HSHeaderWithoutBehaviorObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-sticky-bottom-sm')) {
			if (this.element.hasClass('header-change-appearance-sm')) {
				observers['sm'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-sm')) {
				observers['sm'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
		}
		
		// Abs top & Static
		if (this.element.hasClass('header-abs-top-sm') || this.element.hasClass('header-static-sm')) {
			if (this.element.hasClass('header-show-hide-sm')) {
				observers['sm'].push(
					new HSHeaderShowHideObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-sm')) {
				observers['sm'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-sm')) {
				observers['sm'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Abs bottom & Abs top 2nd screen
		if (this.element.hasClass('header-abs-bottom-sm') || this.element.hasClass('header-abs-top-2nd-screen-sm')) {
			observers['sm'].push(
				new HSHeaderStickObserver(this.element).init()
			);
			
			if (this.element.hasClass('header-change-appearance-sm')) {
				observers['sm'].push(
					new HSHeaderChangeAppearanceObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-sm')) {
				observers['sm'].push(
					new HSHeaderChangeLogoObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
		}
		
		/* ------------------------ md -------------------------*/
		
		// Has Hidden Element
		if (this.element.hasClass('header-has-hidden-element-md')) {
			observers['md'].push(
				new HSHeaderHasHiddenElement(this.element).init()
			);
		}
		
		// Sticky top
		if (this.element.hasClass('header-sticky-top-md')) {
			if (this.element.hasClass('header-show-hide-md')) {
				observers['md'].push(
					new HSHeaderMomentShowHideObserver(this.element).init()
				);
			} else if (this.element.hasClass('header-toggle-section-md')) {
				observers['md'].push(
					new HSHeaderHideSectionObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-md')) {
				observers['md'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-md')) {
				observers['md'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
		}
		
		// Floating
		if (this.element.hasClass('header-floating-md')) {
			observers['md'].push(
				new HSHeaderFloatingObserver(this.element).init()
			);
		}
		
		if (this.element.hasClass('header-invulnerable-md')) {
			observers['md'].push(
				new HSHeaderWithoutBehaviorObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-sticky-bottom-md')) {
			if (this.element.hasClass('header-change-appearance-md')) {
				observers['md'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-md')) {
				observers['md'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
		}
		
		// Abs top & Static
		if (this.element.hasClass('header-abs-top-md') || this.element.hasClass('header-static-md')) {
			if (this.element.hasClass('header-show-hide-md')) {
				observers['md'].push(
					new HSHeaderShowHideObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-md')) {
				observers['md'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-md')) {
				observers['md'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Abs bottom & Abs top 2nd screen
		if (this.element.hasClass('header-abs-bottom-md') || this.element.hasClass('header-abs-top-2nd-screen-md')) {
			observers['md'].push(
				new HSHeaderStickObserver(this.element).init()
			);
			
			if (this.element.hasClass('header-change-appearance-md')) {
				observers['md'].push(
					new HSHeaderChangeAppearanceObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-md')) {
				observers['md'].push(
					new HSHeaderChangeLogoObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
		}
		
		/* ------------------------ lg -------------------------*/
		
		// Has Hidden Element
		if (this.element.hasClass('header-has-hidden-element-lg')) {
			observers['lg'].push(
				new HSHeaderHasHiddenElement(this.element).init()
			);
		}
		
		// Sticky top
		if (this.element.hasClass('header-sticky-top-lg')) {
			if (this.element.hasClass('header-show-hide-lg')) {
				observers['lg'].push(
					new HSHeaderMomentShowHideObserver(this.element).init()
				);
			} else if (this.element.hasClass('header-toggle-section-lg')) {
				observers['lg'].push(
					new HSHeaderHideSectionObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-lg')) {
				observers['lg'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-lg')) {
				observers['lg'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Floating
		if (this.element.hasClass('header-floating-lg')) {
			observers['lg'].push(
				new HSHeaderFloatingObserver(this.element).init()
			);
		}
		
		if (this.element.hasClass('header-invulnerable-lg')) {
			observers['lg'].push(
				new HSHeaderWithoutBehaviorObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-sticky-bottom-lg')) {
			if (this.element.hasClass('header-change-appearance-lg')) {
				observers['lg'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-lg')) {
				observers['lg'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
		}
		
		// Abs top & Static
		if (this.element.hasClass('header-abs-top-lg') || this.element.hasClass('header-static-lg')) {
			if (this.element.hasClass('header-show-hide-lg')) {
				observers['lg'].push(
					new HSHeaderShowHideObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-lg')) {
				observers['lg'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-lg')) {
				observers['lg'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Abs bottom & Abs top 2nd screen
		if (this.element.hasClass('header-abs-bottom-lg') || this.element.hasClass('header-abs-top-2nd-screen-lg')) {
			observers['lg'].push(
				new HSHeaderStickObserver(this.element).init()
			);
			
			if (this.element.hasClass('header-change-appearance-lg')) {
				observers['lg'].push(
					new HSHeaderChangeAppearanceObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-lg')) {
				observers['lg'].push(
					new HSHeaderChangeLogoObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
		}
		
		/* ------------------------ xl -------------------------*/
		
		// Has Hidden Element
		if (this.element.hasClass('header-has-hidden-element-xl')) {
			observers['xl'].push(
				new HSHeaderHasHiddenElement(this.element).init()
			);
		}
		
		// Sticky top
		if (this.element.hasClass('header-sticky-top-xl')) {
			if (this.element.hasClass('header-show-hide-xl')) {
				observers['xl'].push(
					new HSHeaderMomentShowHideObserver(this.element).init()
				);
			} else if (this.element.hasClass('header-toggle-section-xl')) {
				observers['xl'].push(
					new HSHeaderHideSectionObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-xl')) {
				observers['xl'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-xl')) {
				observers['xl'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Floating
		if (this.element.hasClass('header-floating-xl')) {
			observers['xl'].push(
				new HSHeaderFloatingObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-invulnerable-xl')) {
			observers['xl'].push(
				new HSHeaderWithoutBehaviorObserver(this.element).init()
			);
		}
		
		// Sticky bottom
		if (this.element.hasClass('header-sticky-bottom-xl')) {
			if (this.element.hasClass('header-change-appearance-xl')) {
				observers['xl'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-xl')) {
				observers['xl'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
		}
		
		// Abs top & Static
		if (this.element.hasClass('header-abs-top-xl') || this.element.hasClass('header-static-xl')) {
			if (this.element.hasClass('header-show-hide-xl')) {
				observers['xl'].push(
					new HSHeaderShowHideObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-xl')) {
				observers['xl'].push(
					new HSHeaderChangeLogoObserver(this.element).init()
				);
			}
			
			if (this.element.hasClass('header-change-appearance-xl')) {
				observers['xl'].push(
					new HSHeaderChangeAppearanceObserver(this.element).init()
				);
			}
		}
		
		// Abs bottom & Abs top 2nd screen
		if (this.element.hasClass('header-abs-bottom-xl') || this.element.hasClass('header-abs-top-2nd-screen-xl')) {
			observers['xl'].push(
				new HSHeaderStickObserver(this.element).init()
			);
			
			if (this.element.hasClass('header-change-appearance-xl')) {
				observers['xl'].push(
					new HSHeaderChangeAppearanceObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
			
			if (this.element.hasClass('header-change-logo-xl')) {
				observers['xl'].push(
					new HSHeaderChangeLogoObserver(this.element, {
						fixPointSelf: true
					}).init()
				);
			}
		}
		
		return observers;
	}
	
	fixMediaDifference(element) {
		if (!element || !element.length || !element.filter('[class*="header-side"]').length) return;
		
		let toggleable;
		
		if (element.hasClass('header-side-left-xl') || element.hasClass('header-side-right-xl')) {
			toggleable = element.find('.navbar-expand-xl');
			
			if (toggleable.length) {
				toggleable.removeClass('navbar-expand-xl').addClass('navbar-expand-lg');
			}
		} else if (element.hasClass('header-side-left-lg') || element.hasClass('header-side-right-lg')) {
			toggleable = element.find('.navbar-expand-lg');
			
			if (toggleable.length) {
				toggleable.removeClass('navbar-expand-lg').addClass('navbar-expand-md');
			}
		} else if (element.hasClass('header-side-left-md') || element.hasClass('header-side-right-md')) {
			toggleable = element.find('.navbar-expand-md');
			
			if (toggleable.length) {
				toggleable.removeClass('navbar-expand-md').addClass('navbar-expand-sm');
			}
		} else if (element.hasClass('header-side-left-sm') || element.hasClass('header-side-right-sm')) {
			toggleable = element.find('.navbar-expand-sm');
			
			if (toggleable.length) {
				toggleable.removeClass('navbar-expand-sm').addClass('navbar-expand');
			}
		}
	}
	
	checkViewport() {
		let $w = $(window);
		
		if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
			this.prevViewport = this.viewport;
			this.viewport = 'sm';
			
			if (this.config.fixMoment && $w.scrollTop() > this.config.fixMoment) {
				if (typeof this.config.breakpointsMap['sm'] === 'undefined') {
					this.element.removeClass('js-header-fix-moment');
				} else {
					this.element.addClass('js-header-fix-moment');
				}
			}
			
			return this;
		}
		
		if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
			this.prevViewport = this.viewport;
			this.viewport = 'md';
			
			if (this.config.fixMoment && $w.scrollTop() > this.config.fixMoment) {
				if (typeof this.config.breakpointsMap['md'] === 'undefined') {
					this.element.removeClass('js-header-fix-moment');
				} else {
					this.element.addClass('js-header-fix-moment');
				}
			}
			
			return this;
		}
		
		if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
			this.prevViewport = this.viewport;
			this.viewport = 'lg';
			
			if (this.config.fixMoment && $w.scrollTop() > this.config.fixMoment) {
				if (typeof this.config.breakpointsMap['lg'] === 'undefined') {
					this.element.removeClass('js-header-fix-moment');
				} else {
					this.element.addClass('js-header-fix-moment');
				}
			}
			
			return this;
		}
		
		if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
			this.prevViewport = this.viewport;
			this.viewport = 'xl';
			
			if (this.config.fixMoment && $w.scrollTop() > this.config.fixMoment) {
				if (typeof this.config.breakpointsMap['xl'] === 'undefined') {
					this.element.removeClass('js-header-fix-moment');
				} else {
					this.element.addClass('js-header-fix-moment');
				}
			}
			
			return this;
		}
		
		if (this.prevViewport) this.prevViewport = this.viewport;
		
		if (this.config.fixMoment && $w.scrollTop() > this.config.fixMoment) {
			if (typeof this.config.breakpointsMap['xs'] === 'undefined') {
				this.element.removeClass('js-header-fix-moment');
			} else {
				this.element.addClass('js-header-fix-moment');
			}
		}
		
		this.viewport = 'xs';
		
		return this;
	};
	
	notify() {
		if (this.prevViewport) {
			this.observers[this.prevViewport].forEach(function (observer) {
				observer.destroy();
			});
			
			this.prevViewport = null;
		}
		
		this.observers[this.viewport].forEach(function (observer) {
			observer.check();
		});
		
		return this;
	};
	
	update() {
		for (let viewport in this.observers) {
			this.observers[viewport].forEach(function (observer) {
				observer.destroy();
			});
		}
		
		this.prevViewport = null;
		
		this.observers[this.viewport].forEach(function (observer) {
			observer.reinit();
		});
		
		return this;
	};
}
