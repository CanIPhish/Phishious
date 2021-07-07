/**
 * Chart Pies wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires appear.js (v1.0.3), circles.js (v0.0.6)
 *
 */
;
(function ($) {
  'use strict';

  $.HSCore.components.HSChartPie = {

    /**
     *
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      bounds: -100,
      debounce: 10,
      rtl: false,
      wrpClass: 'u-circles-wrap',
      textClass: 'u-circles-text',
      valueStrokeClass: 'u-circles-valueStroke',
      maxValueStrokeClass: 'u-circles-maxValueStroke',
      styleWrapper: true,
      styleText: true
    },

    /**
     *
     *
     * @var jQuery pageCollection
     */
    pageCollection: $(),

    /**
     *
     *
     * @var
     */
    appearCollectionIds: [],

    /**
     * Initialization of ChartPie wrapper.
     *
     * @param String selector (optional)
     * @param Object config (optional)
     *
     * @return jQuery pageCollection - collection of initialized items.
     */
    init: function (selector, config) {

      this.collection = selector && $(selector).length ? $(selector) : $();
      if (!$(selector).length) return;

      this.config = config && $.isPlainObject(config) ?
        $.extend({}, this._baseConfig, config) : this._baseConfig;

      this.config.itemSelector = selector;

      this.initCircles();

      return this.pageCollection;

    },

    /**
     * Initialization of each Circle of the page.
     *
     * @return undefined
     */
    initCircles: function () {

      var lastItem = this.pageCollection.last(),
        lastId = 0,
        self = this;


      if (lastItem.length) {
        lastId = +lastItem.attr('id').substring(lastItem.attr('id').lastIndexOf('-') + 1);
      }

      this.collection.each(function (i, el) {

        var $this = $(el),
          id = 'hs-pie-' + (lastId + (i + 1)),
          value = 0;

        $this.attr('id', id);

        if (!$this.data('circles-scroll-animate')) {
          value = $this.data('circles-value') || 0;
        } else {
          $this.data('reminded-value', $this.data('circles-value') || 0);
          self.appearCollectionIds.push('#' + id);
        }

        var circle = Circles.create({
          id: id,
          radius: $this.data('circles-radius') || 80,
          value: value,
          maxValue: $this.data('circles-max-value') || 100,
          width: $this.data('circles-stroke-width') || 10,
          text: function (value) {
            if ($this.data('circles-type') == 'iconic') {
              return $this.data('circles-icon');
            } else {
              if ($this.data('circles-additional-text-type') === 'prefix') {
                if ($this.data('circles-secondary-text')) {
                  return ($this.data('circles-additional-text') || '') + ($this.data('circles-is-hide-value') ? '' : value) + '<div style="margin-top: ' + ($this.data('circles-divider-space') / 2 + 'px' || '0') + '; margin-bottom: ' + ($this.data('circles-divider-space') / 2 + 'px' || '0') + ';"></div>' + '<div style="font-weight: ' + $this.data('circles-secondary-font-weight') + '; font-size: ' + $this.data('circles-secondary-font-size') + 'px; color: ' + $this.data('circles-secondary-color') + ';">' + $this.data('circles-secondary-text') + '</div>';
                } else {
                  return ($this.data('circles-additional-text') || '') + ($this.data('circles-is-hide-value') ? '' : value);
                }
              } else {
                if ($this.data('circles-secondary-text')) {
                  return ($this.data('circles-is-hide-value') ? '' : value) + ($this.data('circles-additional-text') || '') + '<div style="margin-top: ' + ($this.data('circles-divider-space') / 2 + 'px' || '0') + '; margin-bottom: ' + ($this.data('circles-divider-space') / 2 + 'px' || '0') + ';"></div>' + '<div style="font-weight: ' + $this.data('circles-secondary-font-weight') + '; font-size: ' + $this.data('circles-secondary-font-size') + 'px; color: ' + $this.data('circles-secondary-color') + ';">' + $this.data('circles-secondary-text') + '</div>';
                } else {
                  return ($this.data('circles-is-hide-value') ? '' : value) + ($this.data('circles-additional-text') || '');
                }
              }
            }
          },
          colors: [$this.data('circles-bg-color') || '#377dff', $this.data('circles-fg-color') || '#e7eaf3'],
          duration: $this.data('circles-duration') || 1000,
          wrpClass: $this.data('circles-wrp-class') || self.config['wrpClass'],
          textClass: $this.data('circles-text-class') || self.config['textClass'],
          valueStrokeClass: self.config['valueStrokeClass'],
          maxValueStrokeClass: self.config['maxValueStrokeClass'],
          styleWrapper: self.config['styleWrapper'],
          styleText: self.config['styleText']
        });

        $this.data('circle', circle);

        $this.find('[class="' + ($this.data('circles-text-class') || self.config['textClass']) + '"]').css({
          'font-size': $this.data('circles-font-size'),
          'font-weight': $this.data('circles-font-weight'),
          'color': $this.data('circles-color'),
          'line-height': 'normal',
          'height': 'auto',
          'top': '',
          'left': ''
        });


        if (self.config['rtl']) {
          $this.find('svg').css('transform', 'matrix(-1, 0, 0, 1, 0, 0)');
        }

        if ($this.data('circles-fg-stroke-linecap')) {
          $this.find('[class="' + self.config['valueStrokeClass'] + '"]').attr('stroke-linecap', $this.data('circles-fg-stroke-linecap'));
        }

        if ($this.data('circles-fg-stroke-miterlimit')) {
          $this.find('[class="' + self.config['valueStrokeClass'] + '"]').attr('stroke-miterlimit', $this.data('circles-fg-stroke-miterlimit'));
        }

        self.pageCollection = self.pageCollection.add($this);

      });

      if (self.appearCollectionIds.length) self._initAppear();

    },

    /**
     * Updates value of the chart pie when an item has appeared in the visible region.
     *
     * @return undefined
     */
    _initAppear: function () {

      var self = this;

      appear({
        bounds: self.config['bounds'],
        debounce: self.config['debounce'],
        elements: function () {
          return document.querySelectorAll(self.appearCollectionIds.join(','));
        },
        appear: function (element) {

          element = $(element);

          element.data('circle').update(element.data('reminded-value'));

        }
      });

    },

    /**
     * Returns item by index or entire collection in case when index has not been passed.
     *
     * @param Number index
     *
     * @return jQuery
     */
    get: function (index) {
      if (index && $.isNumeric(index)) return this.pageCollection.eq(index);

      return this.pageCollection;
    },

    /**
     * Returns item by id.
     *
     * @param String id
     *
     * @return circle
     */
    getById: function (id) {
      if (id && this.pageCollection.filter('#' + id).length) return this.pageCollection.filter('#' + id);

      return null;
    },

    /**
     * Returns object of circle class (for the access to circle API) by index.
     *
     * @param Number index
     *
     * @return circle
     */
    getCircleAPI: function (index) {
      if (index && $.isNumeric(index) && this.pageCollection.eq(index).length) return this.pageCollection.eq(index).data('circle');

      return null;
    },

    /**
     * Returns object of circle class (for the access to circle API) by id.
     *
     * @param String id
     *
     * @return circle
     */
    getCircleAPIById: function (id) {
      if (id && this.pageCollection.filter('#' + id).length) return this.pageCollection.filter('#' + id).data('circle');

      return null;
    }

  }

})(jQuery);
