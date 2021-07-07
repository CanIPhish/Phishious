(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HSGoTo"] = factory();
	else
		root["HSGoTo"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/hs-go-to.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/hs-go-to.js":
/*!****************************!*\
  !*** ./src/js/hs-go-to.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HSGoTo; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar HSGoTo = /*#__PURE__*/function () {\n  function HSGoTo(elem, settings) {\n    _classCallCheck(this, HSGoTo);\n\n    this.elem = elem;\n    this.defaults = {\n      pageContainerSelector: 'html, body',\n      targetSelector: null,\n      compensationSelector: null,\n      animationInit: 'animated',\n      animationIn: 'fadeInUp',\n      animationOut: 'fadeOutDown',\n      duration: 800,\n      offsetTop: 0,\n      position: {\n        init: null,\n        hide: null,\n        show: null\n      },\n      isReferencedToOtherPage: null,\n      preventEventClass: 'hs-go-to-prevent-event'\n    };\n    this.settings = settings;\n  }\n\n  _createClass(HSGoTo, [{\n    key: \"init\",\n    value: function init() {\n      var context = this,\n          $el = context.elem,\n          dataSettings = $el.attr('data-hs-go-to-options') ? JSON.parse($el.attr('data-hs-go-to-options')) : {},\n          options = Object.assign({}, context.defaults, dataSettings, context.settings);\n\n      options.targetOffsetTop = function () {\n        if ($(options.compensationSelector).length) {\n          return $(options.targetSelector) ? $(options.targetSelector).offset().top - $(options.compensationSelector).outerHeight() : 0;\n        } else {\n          return $(options.targetSelector).length ? $(options.targetSelector).offset().top : 0;\n        }\n      };\n\n      context._prepareObject($el, options); // Set Position\n\n\n      if (options.position) {\n        context._setPosition($el, options.position.init);\n      } // Click Events\n\n\n      $el.on('click', function (e) {\n        context._clickEvents($el, options, e);\n      }); // Scroll Events\n\n      if (options.animationIn && options.animationOut) {\n        $(window).on('scroll', function () {\n          context._scrollEvents($el, options);\n        });\n      }\n    }\n  }, {\n    key: \"_prepareObject\",\n    value: function _prepareObject(el, params) {\n      var options = params;\n\n      if (params.animationIn && params.animationOut) {\n        if (navigator.userAgent.match('MSIE 10.0;')) {\n          $('html').addClass('ie10');\n        }\n\n        el.addClass(\"\".concat(options.animationInit, \" \").concat(options.animationOut, \" \").concat(options.preventEventClass));\n      }\n    }\n  }, {\n    key: \"_setPosition\",\n    value: function _setPosition(el, params) {\n      var options = params;\n      el.css(options);\n    }\n  }, {\n    key: \"_clickEvents\",\n    value: function _clickEvents(el, params, event) {\n      var options = params;\n\n      if (!options.isReferencedToOtherPage) {\n        if (event) {\n          event.preventDefault();\n        }\n\n        $(options.pageContainerSelector).stop().animate({\n          scrollTop: options.targetOffsetTop()\n        }, options.duration);\n      }\n    }\n  }, {\n    key: \"_scrollEvents\",\n    value: function _scrollEvents(el, params) {\n      var options = params;\n      el.css('visibility', '');\n\n      if ($(window).scrollTop() >= options.offsetTop) {\n        if (options.position.show) {\n          el.css(options.position.show);\n        }\n\n        el.removeClass(options.animationOut).addClass(options.animationIn);\n      } else {\n        if (options.position.hide) {\n          el.css(options.position.hide);\n        }\n\n        el.removeClass(options.animationIn).addClass(options.animationOut);\n      }\n    }\n  }]);\n\n  return HSGoTo;\n}();\n\n\n\n//# sourceURL=webpack://HSGoTo/./src/js/hs-go-to.js?");

/***/ })

/******/ })["default"];
});