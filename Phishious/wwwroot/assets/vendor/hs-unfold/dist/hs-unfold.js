(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HSUnfold"] = factory();
	else
		root["HSUnfold"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/hs-unfold.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/hs-unfold.js":
/*!*****************************!*\
  !*** ./src/js/hs-unfold.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HSUnfold; });\n/* harmony import */ var _methods_smart_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/smart-position */ \"./src/js/methods/smart-position.js\");\n/* harmony import */ var _methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/close-element-with-specific-effect */ \"./src/js/methods/close-element-with-specific-effect.js\");\n/* harmony import */ var _modes_simple__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modes/simple */ \"./src/js/modes/simple.js\");\n/* harmony import */ var _methods_simple_show__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/simple-show */ \"./src/js/methods/simple-show.js\");\n/* harmony import */ var _modes_css_animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modes/css-animation */ \"./src/js/modes/css-animation.js\");\n/* harmony import */ var _methods_css_animation_show__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methods/css-animation-show */ \"./src/js/methods/css-animation-show.js\");\n/* harmony import */ var _modes_slide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modes/slide */ \"./src/js/modes/slide.js\");\n/* harmony import */ var _methods_slide_show__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methods/slide-show */ \"./src/js/methods/slide-show.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\n\n\n\n\nvar HSUnfold = /*#__PURE__*/function () {\n  function HSUnfold(elem, settings) {\n    _classCallCheck(this, HSUnfold);\n\n    this.elem = elem;\n    this.defaults = {\n      event: 'click',\n      type: 'simple',\n      duration: 300,\n      delay: 350,\n      easing: 'linear',\n      animationIn: 'slideInUp',\n      animationOut: 'fadeOut',\n      hideOnScroll: false,\n      hasOverlay: false,\n      smartPositionOff: false,\n      smartPositionOffEl: false,\n      isFullWindow: false,\n      wrapperSelector: '.hs-unfold',\n      contentSelector: '.hs-unfold-content',\n      invokerSelector: '.js-hs-unfold-invoker',\n      invokerActiveClass: '.hs-active',\n      overlayClass: '.hs-unfold-overlay',\n      overlayStyles: {},\n      initializedClass: '.hs-unfold-content-initialized',\n      hiddenClass: '.hs-unfold-hidden',\n      simpleEffectClass: '.hs-unfold-simple',\n      cssAnimationClass: '.hs-unfold-css-animation',\n      cssAnimatedClass: '.animated',\n      slideEffectClass: '.hs-unfold-jquery-slide',\n      reverseClass: '.hs-unfold-reverse-y',\n      unfoldTimeOut: null,\n      afterOpen: function afterOpen() {},\n      afterClose: function afterClose() {}\n    };\n    this.settings = settings;\n  }\n\n  _createClass(HSUnfold, [{\n    key: \"init\",\n    value: function init() {\n      var context = this; // Keycodes\n\n      var ESC_KEYCODE = 27,\n          TAB_KEYCODE = 9,\n          ENTER_KEYCODE = 13,\n          SPACE_KEYCODE = 32,\n          ARROW_UP_KEYCODE = 38,\n          ARROW_DOWN_KEYCODE = 40,\n          ARROW_RIGHT_KEYCODE = 39,\n          ARROW_LEFT_KEYCODE = 37; // Prevent scroll\n\n      function preventScroll(keycode) {\n        return function (e) {\n          if (e.which === keycode) {\n            e.preventDefault();\n          }\n        };\n      } // Get Item Settings\n\n\n      function getItemSettings(el) {\n        var $el = el,\n            dataSettings = $el.attr('data-hs-unfold-options') ? JSON.parse($el.attr('data-hs-unfold-options')) : {};\n        var options = Object.assign({}, context.defaults, context.settings, dataSettings);\n        return options;\n      } // Init Unfold\n\n\n      $(this.elem).each(function () {\n        context.UnfoldItem($(this));\n      }); // *****\n      // Start: ACCESSIBILITY\n      // *****\n\n      var myPreventScrollSpace = preventScroll(SPACE_KEYCODE),\n          myPreventScrollDown = preventScroll(ARROW_DOWN_KEYCODE),\n          myPreventScrollUp = preventScroll(ARROW_UP_KEYCODE);\n      var $items, index, itemSettings;\n      $(document).on('keyup', '[data-hs-unfold-invoker], [data-hs-unfold-content]', function (e) {\n        if (e.which !== ESC_KEYCODE && e.which !== TAB_KEYCODE && e.which !== ENTER_KEYCODE && e.which !== ARROW_UP_KEYCODE && e.which !== ARROW_DOWN_KEYCODE || _typeof($(e.target).attr('data-hs-unfold-invoker')) == ( true ? \"undefined\" : undefined)) {\n          return;\n        } //\n        // Start: PREVENT SCROLL\n        //\n\n\n        e.preventDefault();\n        e.stopPropagation();\n        window.addEventListener('keydown', myPreventScrollSpace, false);\n        window.addEventListener('keydown', myPreventScrollUp, false);\n        window.addEventListener('keydown', myPreventScrollDown, false); //\n        // End: PREVENT SCROLL\n        //\n\n        if (_typeof($(e.target).attr('data-hs-unfold-invoker')) !== ( true ? \"undefined\" : undefined) && $(e.target).attr('data-hs-unfold-invoker') !== false) {\n          itemSettings = getItemSettings($(e.target));\n          $items = [].slice.call($(itemSettings.target).find('a, button, input, select, textarea')).filter(function (item) {\n            return $(item).is(':visible');\n          });\n        }\n\n        index = $items.indexOf(e.target); //\n        // End: HAS ITEMS\n        //\n        // Up\n\n        if ($items.length > 0 && e.which === ARROW_UP_KEYCODE && index > 0) {\n          index--;\n        } // Down\n\n\n        if ($items.length > 0 && e.which === ARROW_DOWN_KEYCODE && index < $items.length - 1) {\n          index++;\n        } // Open Dropdown\n\n\n        if ($items.length <= 0 && (e.which === ARROW_DOWN_KEYCODE || e.which === ARROW_UP_KEYCODE || e.which === SPACE_KEYCODE || e.which === ENTER_KEYCODE)) {\n          if (!$(\"\".concat(itemSettings.target, \":visible\")).length) {\n            $(e.target).addClass(itemSettings.invokerActiveClass.slice(1));\n\n            if (itemSettings.type === 'css-animation') {\n              Object(_methods_css_animation_show__WEBPACK_IMPORTED_MODULE_5__[\"default\"])($(itemSettings.target), itemSettings);\n            } else if (itemSettings.type === 'jquery-slide') {\n              Object(_methods_slide_show__WEBPACK_IMPORTED_MODULE_7__[\"default\"])($(itemSettings.target), itemSettings, function () {});\n            } else {\n              Object(_methods_simple_show__WEBPACK_IMPORTED_MODULE_3__[\"default\"])($(itemSettings.target), itemSettings);\n            }\n          } else if ($(\"\".concat(itemSettings.target, \":visible\")).length) {\n            $($(itemSettings.target).find('a')[0]).focus();\n            return;\n          }\n        } // Close Self\n\n\n        if (e.which === ESC_KEYCODE) {\n          var _$target = $(\"\".concat(itemSettings.contentSelector, \":not(\").concat(itemSettings.hiddenClass, \")\")); // $(itemSettings.invokerActiveClass).focus();\n\n\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_$target, itemSettings, _$target.data('hs-unfold-content-animation-in'), _$target.data('hs-unfold-content-animation-out'));\n          return;\n        } // Close All\n\n\n        if (e.which === TAB_KEYCODE && $(e.target).closest('[data-hs-unfold-content]').length === 0) {\n          var $invoker = $('[data-hs-unfold-invoker].hs-active'),\n              $target = $('[data-hs-unfold-content]:visible'),\n              openedItemSettings = getItemSettings($invoker);\n          $invoker.removeClass('hs-active');\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));\n          return;\n        } //\n        // End: HAS ITEMS\n        //\n\n\n        $($items[index]).focus();\n      });\n      $(document).on('keyup', function (e) {\n        var $invoker, $target, openedItemSettings; // Close All\n\n        if (e.which === TAB_KEYCODE && $(e.target).closest('[data-hs-unfold-content]').length === 0) {\n          $invoker = $('[data-hs-unfold-invoker].hs-active');\n          $target = $('[data-hs-unfold-content]:visible');\n          openedItemSettings = getItemSettings($invoker);\n          $invoker.removeClass('hs-active');\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));\n        } // Close Self\n\n\n        if (e.which === ESC_KEYCODE) {\n          $invoker = $('[data-hs-unfold-invoker].hs-active');\n          $target = $('[data-hs-unfold-content]:visible');\n          openedItemSettings = getItemSettings($invoker);\n          $invoker.removeClass('hs-active');\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($target, openedItemSettings, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));\n        }\n      }); // *****\n      // End: ACCESSIBILITY\n      // *****\n    }\n  }, {\n    key: \"UnfoldItem\",\n    value: function UnfoldItem(el) {\n      var context = this,\n          $el = el,\n          itemDataSettings = el.attr('data-hs-unfold-options') ? JSON.parse(el.attr('data-hs-unfold-options')) : {};\n      var options = Object.assign({}, context.defaults, context.settings, itemDataSettings),\n          originalEvent = options.event;\n\n      context._prepareObjects($el, $(options.target), options);\n\n      function closeFunc() {\n        $(options.contentSelector).not($(options.target)).not($(options.target).parents(options.contentSelector)).each(function () {\n          $(options.invokerSelector).removeClass(options.invokerActiveClass.slice(1));\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(this), options, $(this).attr('data-hs-unfold-content-animation-in'), $(this).attr('data-hs-unfold-content-animation-out'));\n        });\n      }\n\n      if (window.navigator.userAgent.indexOf('Mobile') !== -1) {\n        options.event = 'click';\n      } else {\n        options.event = originalEvent;\n      }\n\n      $el.on(options.event === 'hover' ? 'mouseenter' : 'click', closeFunc);\n      $(window).on('resize', function () {\n        if (window.navigator.userAgent.indexOf('Mobile') !== -1) {\n          options.event = 'click';\n        } else {\n          options.event = originalEvent;\n        }\n\n        $el[0].addEventListener(options.event === 'hover' ? 'mouseenter' : 'click', closeFunc);\n      });\n\n      if (options.type === 'css-animation') {\n        Object(_modes_css_animation__WEBPACK_IMPORTED_MODULE_4__[\"default\"])($el, options, options.animationOut);\n      } else if (options.type === 'jquery-slide') {\n        Object(_modes_slide__WEBPACK_IMPORTED_MODULE_6__[\"default\"])($el, options);\n      } else {\n        Object(_modes_simple__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($el, options);\n      } // Document Events\n\n\n      $(window).on('click', function (e) {\n        var targetClass = \"\".concat(options.contentSelector, \":not(\").concat(options.hiddenClass, \")\"),\n            $target = $(targetClass);\n\n        if ($(e.target).closest(options.contentSelector).length === 0 && $(e.target).closest(options.invokerSelector).length === 0 && $target.length !== 0) {\n          $el.removeClass(options.invokerActiveClass.slice(1));\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($target, options, $target.data('hs-unfold-content-animation-in'), $target.data('hs-unfold-content-animation-out'));\n        } else if ($(e.target).closest(options.contentSelector).length !== 0 && $(e.target).closest(options.contentSelector).find(options.contentSelector).length !== 0 && $(e.target).closest(options.invokerSelector).length === 0 && !options.hasOverlay) {\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(e.target).closest(options.contentSelector).find(targetClass), options, $(e.target).closest(options.contentSelector).find(targetClass).data('hs-unfold-content-animation-in'), $(e.target).closest(options.contentSelector).find(targetClass).data('hs-unfold-content-animation-out'));\n        }\n      }); // Resize and Scroll Events\n\n      $(window).on('resize scroll', function () {\n        if (!options.smartPositionOff) {\n          Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(options.target), $el, options);\n        }\n      });\n\n      if (options.hideOnScroll) {\n        $(window).on('scroll', function () {\n          $el.removeClass(options.invokerActiveClass.slice(1));\n          Object(_methods_close_element_with_specific_effect__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(options.target), options, options.animationIn, options.animationOut);\n        });\n      }\n    }\n  }, {\n    key: \"_prepareObjects\",\n    value: function _prepareObjects(el, target, config) {\n      el.addClass(config.invokerSelector.slice(1));\n      el.attr('data-hs-unfold-target', config.target);\n      el.attr('data-hs-unfold-invoker', '');\n      target.attr('data-hs-target-height', target.outerHeight());\n      target.attr('data-hs-unfold-content', '');\n      target.addClass(\"\".concat(config.hiddenClass.slice(1), \" \").concat(config.initializedClass.slice(1)));\n\n      if (config.hasOverlay && $(config.overlayClass).length === 0) {\n        $('body').append($(\"<div class=\\\"\".concat(config.overlayClass.slice(1), \"\\\"></div>\")).css(config.overlayStyles));\n      }\n\n      if (config.type === 'css-animation') {\n        target.attr('data-hs-unfold-content-animation-in', config.animationIn);\n        target.attr('data-hs-unfold-content-animation-out', config.animationOut);\n      }\n    }\n  }]);\n\n  return HSUnfold;\n}();\n\n\n\n//# sourceURL=webpack://HSUnfold/./src/js/hs-unfold.js?");

/***/ }),

/***/ "./src/js/methods/close-element-with-specific-effect.js":
/*!**************************************************************!*\
  !*** ./src/js/methods/close-element-with-specific-effect.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return closeElementWithSpecificEffect; });\n/* harmony import */ var _methods_simple_hide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/simple-hide */ \"./src/js/methods/simple-hide.js\");\n/* harmony import */ var _css_animation_hide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-animation-hide */ \"./src/js/methods/css-animation-hide.js\");\n/* harmony import */ var _methods_slide_hide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methods/slide-hide */ \"./src/js/methods/slide-hide.js\");\n\n\n\nfunction closeElementWithSpecificEffect(el, config, cssAnimationShowEffect, cssAnimationHideEffect) {\n  if (el.hasClass(config.hiddenClass.slice(1))) return;\n\n  if (el.hasClass(config.cssAnimationClass.slice(1))) {\n    Object(_css_animation_hide__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el, config, cssAnimationHideEffect);\n    el.on('animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function (e) {\n      if (el.hasClass(cssAnimationHideEffect)) {\n        el.removeClass(cssAnimationHideEffect).addClass(config.hiddenClass.slice(1));\n        config.afterClose();\n      }\n\n      if (el.hasClass(cssAnimationShowEffect)) {\n        config.afterOpen();\n      }\n\n      e.preventDefault();\n      e.stopPropagation();\n    });\n  } else if (el.hasClass(config.slideEffectClass.slice(1))) {\n    Object(_methods_slide_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(el, config, function () {});\n  } else {\n    Object(_methods_simple_hide__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(el, config);\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/close-element-with-specific-effect.js?");

/***/ }),

/***/ "./src/js/methods/css-animation-hide.js":
/*!**********************************************!*\
  !*** ./src/js/methods/css-animation-hide.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cssAnimationHide; });\nfunction cssAnimationHide(target, config, effect) {\n  target.removeClass($(target).attr('data-hs-unfold-content-animation-in')).addClass(effect);\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/css-animation-hide.js?");

/***/ }),

/***/ "./src/js/methods/css-animation-show.js":
/*!**********************************************!*\
  !*** ./src/js/methods/css-animation-show.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cssAnimationShow; });\nfunction cssAnimationShow(target, config) {\n  if (config.cssAnimatedClass) {\n    target.removeClass(\"\".concat(config.hiddenClass.slice(1), \" \").concat(config.animationOut)).addClass(config.animationIn);\n  } else {\n    target.removeClass(\"\".concat(config.hiddenClass.slice(1), \" \").concat(config.animationOut));\n    setTimeout(function () {\n      target.addClass(config.animationIn);\n    });\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/css-animation-show.js?");

/***/ }),

/***/ "./src/js/methods/simple-hide.js":
/*!***************************************!*\
  !*** ./src/js/methods/simple-hide.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return simpleHide; });\nfunction simpleHide(target, config) {\n  target.addClass(config.hiddenClass.slice(1));\n\n  if (config.hasOverlay) {\n    $(config.overlayClass).hide();\n  }\n\n  config.afterClose();\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/simple-hide.js?");

/***/ }),

/***/ "./src/js/methods/simple-show.js":
/*!***************************************!*\
  !*** ./src/js/methods/simple-show.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return simpleShow; });\nfunction simpleShow(target, config) {\n  target.removeClass(config.hiddenClass.slice(1));\n\n  if (config.hasOverlay) {\n    $(config.overlayClass).show();\n  }\n\n  config.afterOpen();\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/simple-show.js?");

/***/ }),

/***/ "./src/js/methods/slide-hide.js":
/*!**************************************!*\
  !*** ./src/js/methods/slide-hide.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return slideHide; });\nfunction slideHide(target, config, callback) {\n  target.slideUp({\n    duration: config.duration,\n    easing: config.easing,\n    complete: function complete() {\n      callback();\n      config.afterClose();\n      target.addClass(config.hiddenClass.slice(1));\n    }\n  });\n\n  if (config.hasOverlay) {\n    $(config.overlayClass).fadeOut(200);\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/slide-hide.js?");

/***/ }),

/***/ "./src/js/methods/slide-show.js":
/*!**************************************!*\
  !*** ./src/js/methods/slide-show.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return slideShow; });\nfunction slideShow(target, config, callback) {\n  target.removeClass(config.hiddenClass.slice(1)).stop().slideDown({\n    duration: config.duration,\n    easing: config.easing,\n    complete: function complete() {\n      callback();\n      config.afterOpen();\n    }\n  });\n\n  if (config.hasOverlay) {\n    $(config.overlayClass).fadeIn(200);\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/slide-show.js?");

/***/ }),

/***/ "./src/js/methods/smart-position.js":
/*!******************************************!*\
  !*** ./src/js/methods/smart-position.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return smartPosition; });\nfunction smartPosition(el, invoker, config) {\n  var $w = $(window);\n  var targetOuterGeometry = el.offset(),\n      invokerOffsetTop = invoker.offset().top - $(window).scrollTop();\n\n  if (el.length > 0) {\n    var styles = getComputedStyle(el.get(0)),\n        direction = Math.abs(parseInt(styles.left, 10)) < 40 ? 'left' : 'right'; // Horizontal Axis\n\n    if (direction === 'right') {\n      if (targetOuterGeometry.left < 0) {\n        el.css({\n          left: 'auto',\n          right: (parseInt(el.css('right'), 10) - (targetOuterGeometry.left - 10)) * -1\n        });\n      }\n    } else {\n      if (targetOuterGeometry.left + el.outerWidth() > $w.width()) {\n        el.css({\n          right: 'auto',\n          left: parseInt(el.css('left'), 10) - (targetOuterGeometry.left + el.outerWidth() + 10 - $w.width())\n        });\n      }\n    }\n  } // Vertical Axis\n\n\n  if (!config.smartPositionOffEl) {\n    if (invokerOffsetTop > $w.height() / 2 && el.data('hs-target-height') - invoker.offset().top < 0 && !config.isFullWindow) {\n      el.addClass(config.reverseClass.slice(1));\n    } else {\n      el.removeClass(config.reverseClass.slice(1));\n    }\n  } else {\n    var table = $(config.smartPositionOffEl),\n        invokerTableOffset = invoker.offset().top - table.offset().top;\n\n    if (invokerTableOffset > table.height() / 2 && el.data('hs-target-height') - invoker.offset().top < 0 && !config.isFullWindow) {\n      el.addClass(config.reverseClass.slice(1));\n    } else {\n      el.removeClass(config.reverseClass.slice(1));\n    }\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/methods/smart-position.js?");

/***/ }),

/***/ "./src/js/modes/css-animation.js":
/*!***************************************!*\
  !*** ./src/js/modes/css-animation.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cssAnimation; });\n/* harmony import */ var _methods_smart_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/smart-position */ \"./src/js/methods/smart-position.js\");\n/* harmony import */ var _methods_css_animation_show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../methods/css-animation-show */ \"./src/js/methods/css-animation-show.js\");\n/* harmony import */ var _methods_css_animation_hide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methods/css-animation-hide */ \"./src/js/methods/css-animation-hide.js\");\n\n\n\nfunction cssAnimation(el, config, hideEffect) {\n  $(config.target).addClass(\"\".concat(config.cssAnimationClass.slice(1), \" \").concat(config.cssAnimatedClass ? config.cssAnimatedClass.slice(1) : '')).css('animation-duration', \"\".concat(config.duration, \"ms\"));\n  $(config.target).on('animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend', function (e) {\n    if ($(config.target).hasClass(config.animationOut)) {\n      $(config.target).removeClass(config.animationOut).addClass(config.hiddenClass.slice(1));\n      config.afterClose();\n    }\n\n    if ($(config.target).hasClass(config.animationIn)) {\n      config.afterOpen();\n    }\n\n    e.preventDefault();\n    e.stopPropagation();\n  });\n  $(config.target).on('animationstart webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart', function (e) {\n    if ($(config.target).hasClass(config.animationOut)) {\n      if (config.hasOverlay) {\n        $(config.overlayClass).fadeOut(200);\n      }\n    } else if ($(config.target).hasClass(config.animationIn)) {\n      if (config.hasOverlay) {\n        $(config.overlayClass).fadeIn(200);\n      }\n    }\n\n    e.preventDefault();\n    e.stopPropagation();\n  });\n\n  function mouseEnterFunc() {\n    if (config.unfoldTimeOut) {\n      clearTimeout(config.unfoldTimeOut);\n    }\n\n    el.addClass(config.invokerActiveClass.slice(1));\n    Object(_methods_css_animation_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config);\n\n    if (!config.smartPositionOff) {\n      Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n    }\n  }\n\n  function mouseLeaveFunc() {\n    config.unfoldTimeOut = setTimeout(function () {\n      el.removeClass(config.invokerActiveClass.slice(1));\n      Object(_methods_css_animation_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config, hideEffect);\n    }, config.delay);\n  }\n\n  function clickFunc() {\n    if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {\n      el.removeClass(config.invokerActiveClass.slice(1));\n      Object(_methods_css_animation_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config, hideEffect);\n    } else {\n      el.addClass(config.invokerActiveClass.slice(1));\n      Object(_methods_css_animation_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config);\n\n      if (!config.smartPositionOff) {\n        Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n      }\n\n      if (config.hasOverlay) {\n        $(config.overlayClass).fadeIn(200);\n      }\n    }\n  }\n\n  if (config.event === 'hover') {\n    // Hover\n    $(window).on('resize', function () {\n      if (window.navigator.userAgent.indexOf('Mobile') !== -1) {\n        el.parent(config.wrapperSelector)[0].removeEventListener('mouseenter', mouseEnterFunc, false);\n        el.parent(config.wrapperSelector)[0].removeEventListener('mouseleave', mouseLeaveFunc, false);\n        el[0].addEventListener('click', clickFunc, false);\n      } else {\n        el[0].removeEventListener('click', clickFunc, false);\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseenter', mouseEnterFunc, false);\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseleave', mouseLeaveFunc, false);\n      }\n    }).trigger('resize');\n  } else {\n    // Click\n    el[0].addEventListener('click', clickFunc, false);\n  }\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/modes/css-animation.js?");

/***/ }),

/***/ "./src/js/modes/simple.js":
/*!********************************!*\
  !*** ./src/js/modes/simple.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return simple; });\n/* harmony import */ var _methods_smart_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/smart-position */ \"./src/js/methods/smart-position.js\");\n/* harmony import */ var _methods_simple_show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../methods/simple-show */ \"./src/js/methods/simple-show.js\");\n/* harmony import */ var _methods_simple_hide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methods/simple-hide */ \"./src/js/methods/simple-hide.js\");\n\n\n\nfunction simple(el, config) {\n  $(config.target).addClass(config.simpleEffectClass.slice(1));\n\n  function clickFunc() {\n    if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {\n      el.removeClass(config.invokerActiveClass.slice(1));\n      Object(_methods_simple_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config);\n    } else {\n      el.addClass(config.invokerActiveClass.slice(1));\n      Object(_methods_simple_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config);\n\n      if (!config.smartPositionOff) {\n        Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n      }\n    }\n  }\n\n  function mouseEnterFunc() {\n    el.addClass(config.invokerActiveClass.slice(1));\n    Object(_methods_simple_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config);\n\n    if (!config.smartPositionOff) {\n      Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n    }\n  }\n\n  function mouseLeaveFunc() {\n    el.removeClass(config.invokerActiveClass.slice(1));\n    Object(_methods_simple_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config);\n  }\n\n  function initSimple() {\n    if (window.navigator.userAgent.indexOf('Mobile') !== -1) {\n      el[0].addEventListener('click', clickFunc);\n    } else {\n      if (config.event === 'hover') {\n        // Hover\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseenter', mouseEnterFunc);\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseleave', mouseLeaveFunc);\n      } else {\n        // Click\n        el[0].addEventListener('click', clickFunc);\n      }\n    }\n  }\n\n  $(window).on('resize', function () {\n    initSimple();\n  });\n  initSimple();\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/modes/simple.js?");

/***/ }),

/***/ "./src/js/modes/slide.js":
/*!*******************************!*\
  !*** ./src/js/modes/slide.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return slide; });\n/* harmony import */ var _methods_smart_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/smart-position */ \"./src/js/methods/smart-position.js\");\n/* harmony import */ var _methods_slide_show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../methods/slide-show */ \"./src/js/methods/slide-show.js\");\n/* harmony import */ var _methods_slide_hide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../methods/slide-hide */ \"./src/js/methods/slide-hide.js\");\n/* harmony import */ var _methods_simple_hide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/simple-hide */ \"./src/js/methods/simple-hide.js\");\n/* harmony import */ var _methods_simple_show__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../methods/simple-show */ \"./src/js/methods/simple-show.js\");\n\n\n\n\n\nfunction slide(el, config) {\n  $(config.target).addClass(config.slideEffectClass.slice(1)).css('display', 'none');\n\n  function clickFunc() {\n    if (!$(config.target).hasClass(config.hiddenClass.slice(1))) {\n      Object(_methods_slide_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config, function () {\n        el.removeClass(config.invokerActiveClass.slice(1));\n      });\n    } else {\n      Object(_methods_slide_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config, function () {\n        el.addClass(config.invokerActiveClass.slice(1));\n      });\n\n      if (!config.smartPositionOff) {\n        Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n      }\n    }\n  }\n\n  function mouseEnterFunc() {\n    Object(_methods_slide_show__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($(config.target), config, function () {\n      el.addClass(config.invokerActiveClass.slice(1));\n    });\n\n    if (!config.smartPositionOff) {\n      Object(_methods_smart_position__WEBPACK_IMPORTED_MODULE_0__[\"default\"])($(config.target), el, config);\n    }\n  }\n\n  function mouseLeaveFunc() {\n    Object(_methods_slide_hide__WEBPACK_IMPORTED_MODULE_2__[\"default\"])($(config.target), config, function () {\n      el.removeClass(config.invokerActiveClass.slice(1));\n    });\n  }\n\n  function initSlide() {\n    if (window.navigator.userAgent.indexOf('Mobile') !== -1) {\n      el[0].addEventListener('click', clickFunc);\n    } else {\n      if (config.event === 'hover') {\n        // Hover\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseenter', mouseEnterFunc);\n        el.parent(config.wrapperSelector)[0].addEventListener('mouseleave', mouseLeaveFunc);\n      } else {\n        // Click\n        el[0].addEventListener('click', clickFunc);\n      }\n    }\n  }\n\n  $(window).on('resize', function () {\n    initSlide();\n  });\n  initSlide();\n}\n\n//# sourceURL=webpack://HSUnfold/./src/js/modes/slide.js?");

/***/ })

/******/ })["default"];
});