export default class HSGoTo {
	constructor(elem, settings) {
		this.elem = elem;
		this.defaults = {
			pageContainerSelector: 'html, body',
			targetSelector: null,
			compensationSelector: null,

			animationInit: 'animated',
			animationIn: 'fadeInUp',
			animationOut: 'fadeOutDown',
			duration: 800,

			offsetTop: 0,
			position: {
				init: null,
				hide: null,
				show: null
			},

			isReferencedToOtherPage: null,
			preventEventClass: 'hs-go-to-prevent-event'
		};
		this.settings = settings;
	}

	init() {
		const context = this,
			$el = context.elem,
			dataSettings = $el.attr('data-hs-go-to-options') ? JSON.parse($el.attr('data-hs-go-to-options')) : {},
			options = Object.assign({}, context.defaults, dataSettings, context.settings);

		options.targetOffsetTop = function() {
			if ($(options.compensationSelector).length) {
				return $(options.targetSelector) ? $(options.targetSelector).offset().top - $(options.compensationSelector).outerHeight() : 0;
			} else {
				return $(options.targetSelector).length ? $(options.targetSelector).offset().top : 0;
			}
		};

		context._prepareObject($el, options);

		// Set Position
		if (options.position) {
			context._setPosition($el, options.position.init);
		}

		// Click Events
		$el.on('click', function (e) {
			context._clickEvents($el, options, e);
		});

		// Scroll Events
		if (options.animationIn && options.animationOut) {
			$(window).on('scroll', function () {
				context._scrollEvents($el, options);
			});
		}
	}

	_prepareObject(el, params) {
		const options = params;

		if (params.animationIn && params.animationOut) {
			if (navigator.userAgent.match('MSIE 10.0;')) {
				$('html').addClass('ie10');
			}

			el.addClass(`${options.animationInit} ${options.animationOut} ${options.preventEventClass}`);
		}
	}

	_setPosition(el, params) {
		const options = params;

		el.css(options);
	}

	_clickEvents(el, params, event) {
		const options = params;

		if (!options.isReferencedToOtherPage) {
			if (event) {
				event.preventDefault();
			}

			$(options.pageContainerSelector).stop().animate({
				scrollTop: options.targetOffsetTop()
			}, options.duration);
		}
	}

	_scrollEvents(el, params) {
		const options = params;

		el.css('visibility', '');

		if ($(window).scrollTop() >= options.offsetTop) {
			if (options.position.show) {
				el.css(options.position.show);
			}

			el.removeClass(options.animationOut).addClass(options.animationIn);
		} else {
			if (options.position.hide) {
				el.css(options.position.hide);
			}

			el.removeClass(options.animationIn).addClass(options.animationOut);
		}
	}
}
