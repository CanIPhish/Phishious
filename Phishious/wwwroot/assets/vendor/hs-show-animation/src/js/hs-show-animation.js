/*
* HSShowAnimation Plugin
* @version: 2.0.0 (Mon, 25 Nov 2019)
* @requires: jQuery v3.0 or later
* @author: HtmlStream
* @event-namespace: .HSShowAnimation
* @license: Htmlstream Libraries (https://htmlstream.com/)
* Copyright 2019 Htmlstream
*/

export default class HSShowAnimation {
	constructor(elem, settings) {
		this.elem = elem;
		this.defaults = {
			groupName: null,
			targetSelector: null,
			siblingSelector: null,
			eventType: 'click',
			
			classMap: {
				active: 'active'
			},
			
			animationType: 'simple',
			animationInit: 'animated',
			animationIn: null,
			duration: null,
			
			afterShow: () => {
			}
		};
		this.settings = settings;
	}
	
	init() {
		const context = this,
			$el = context.elem,
			dataSettings = $el.attr('data-hs-show-animation-options') ? JSON.parse($el.attr('data-hs-show-animation-options')) : {},
			options = $.extend(true, context.defaults, dataSettings, context.settings);
		
		context._prepareObject($el, options);
		
		$el.on(options.eventType, function (e) {
			e.preventDefault();
			
			if ($el.hasClass(options.classMap.active)) {
				return;
			}
			
			context._activeClassChange($el, options);
			
			if (options.animationType === 'css-animation') {
				context._cssAnimation($el, options);
			} else {
				context._simpleAnimation($el, options);
			}
		});
	}
	
	_prepareObject(el, params) {
		const options = params;
		
		el.attr('data-hs-show-animation-link-group', options.groupName);
		
		if (options.duration) {
			$(options.targetSelector).css({
				animationDuration: `${options.duration}ms`
			});
		}
		
		$(options.targetSelector).attr('data-hs-show-animation-target-group', options.groupName);
		
		if (options.siblingSelector) {
			$(options.siblingSelector).attr('data-hs-show-animation-target-group', options.groupName);
		}
	}
	
	_activeClassChange(el, params) {
		const options = params;
		
		$(`[data-hs-show-animation-link-group="${options.groupName}"]`).removeClass(options.classMap.active);
		
		el.addClass(options.classMap.active);
	}
	
	_simpleAnimation(el, params) {
		const options = params;
		
		$(`[data-hs-show-animation-target-group="${options.groupName}"]`).hide().css({
			opacity: 0
		});
		
		$(options.targetSelector).show().css({
			opacity: 1
		});
		
		options.afterShow();
	}
	
	_cssAnimation(el, params) {
		const options = params;
		
		$(`[data-hs-show-animation-target-group="${options.groupName}"]`).hide().css({
			opacity: 0
		}).removeClass(`${options.animationInit} ${options.animationIn}`);
		
		$(options.targetSelector).show();
		
		options.afterShow();
		
		setTimeout(function () {
			$(options.targetSelector).css({
				opacity: 1
			}).addClass(`${options.animationInit} ${options.animationIn}`);
		}, 50);
	}
}
