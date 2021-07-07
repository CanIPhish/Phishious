
String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};
String.prototype.fromCamel = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

var xepOnline = window.xepOnline || {};

var current_mimetype = "application/pdf";
var current_stylesheet = "";
var current_height = 0;

function base64ToBuffer(base64) {
  var binstr = atob(base64);
  var buf = binaryStringToBuffer(binstr);
  return buf;
}

window.Unibabel = {
  utf8ToBinaryString: utf8ToBinaryString
, utf8ToBuffer: utf8ToBuffer
, utf8ToBase64: utf8ToBase64
, binaryStringToUtf8: binaryStringToUtf8
, bufferToUtf8: bufferToUtf8
, base64ToUtf8: base64ToUtf8
, bufferToBinaryString: bufferToBinaryString
, bufferToBase64: bufferToBase64
, binaryStringToBuffer: binaryStringToBuffer
, base64ToBuffer: base64ToBuffer

// compat
, strToUtf8Arr: utf8ToBuffer
, utf8ArrToStr: bufferToUtf8
, arrToBase64: bufferToBase64
, base64ToArr: base64ToBuffer
};

function bufferToHex(arr) {
  var i;
  var len;
  var hex = '';
  var c;

  for (i = 0, len = arr.length; i < len; i += 1) {
    c = arr[i].toString(16);
    if (c.length < 2) {
      c = '0' + c;
    }
    hex += c;
  }

  return hex;
}

function hexToBuffer(hex) {
  // TODO use Uint8Array or ArrayBuffer or DataView
  var i;
  var byteLen = hex.length / 2;
  var arr;
  var j = 0;

  if (byteLen !== parseInt(byteLen, 10)) {
    throw new Error("Invalid hex length '" + hex.length + "'");
  }

  arr = new Uint8Array(byteLen);

  for (i = 0; i < byteLen; i += 1) {
    arr[i] = parseInt(hex[j] + hex[j + 1], 16);
    j += 2;
  }

  return arr;
}

// Hex Convenience Functions
window.Unibabel.hexToBuffer = hexToBuffer;
window.Unibabel.bufferToHex = bufferToHex;

function utf8ToBinaryString(str) {
  var escstr = encodeURIComponent(str);
  // replaces any uri escape sequence, such as %0A,
  // with binary escape, such as 0x0A
  var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  });

  return binstr;
}

function utf8ToBuffer(str) {
  var binstr = utf8ToBinaryString(str);
  var buf = binaryStringToBuffer(binstr);
  return buf;
}

function utf8ToBase64(str) {
  var binstr = utf8ToBinaryString(str);
  return btoa(binstr);
}

function binaryStringToUtf8(binstr) {
  var escstr = binstr.replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(p).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  });

  return decodeURIComponent(escstr);
}

function bufferToUtf8(buf) {
  var binstr = bufferToBinaryString(buf);

  return binaryStringToUtf8(binstr);
}

function base64ToUtf8(b64) {
  var binstr = atob(b64);

  return binaryStringToUtf8(binstr);
}

function bufferToBinaryString(buf) {
  var binstr = Array.prototype.map.call(buf, function (ch) {
    return String.fromCharCode(ch);
  }).join('');

  return binstr;
}

function bufferToBase64(arr) {
  var binstr = bufferToBinaryString(arr);
  return btoa(binstr);
}

function binaryStringToBuffer(binstr) {
  var buf;

  if ('undefined' === typeof Uint8Array) {
    buf = new Uint8Array(binstr.length);
  } else {
    buf = [];
  }

  Array.prototype.forEach.call(binstr, function (ch, i) {
    buf[i] = ch.charCodeAt(0);
  });

  return buf;
}

function base64ToBuffer(base64) {
  var binstr = atob(base64);
  var buf = binaryStringToBuffer(binstr);
  return buf;
}

window.Unibabel = {
  utf8ToBinaryString: utf8ToBinaryString
, utf8ToBuffer: utf8ToBuffer
, utf8ToBase64: utf8ToBase64
, binaryStringToUtf8: binaryStringToUtf8
, bufferToUtf8: bufferToUtf8
, base64ToUtf8: base64ToUtf8
, bufferToBinaryString: bufferToBinaryString
, bufferToBase64: bufferToBase64
, binaryStringToBuffer: binaryStringToBuffer
, base64ToBuffer: base64ToBuffer

// compat
, strToUtf8Arr: utf8ToBuffer
, utf8ArrToStr: bufferToUtf8
, arrToBase64: bufferToBase64
, base64ToArr: base64ToBuffer
};

xepOnline.IE = function() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/');

	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) >= 11;
	}
	
	if (edge > 0) {
		// IE 12 => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

// TODO: better mobile check
xepOnline.detectmob1=function(){if( navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){return true;}else {return false;}}
xepOnline.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return xepOnline.detectmob1() || check;
}

xepOnline.DEFAULTS = {
	pageWidth:"8.5in",
	pageHeight:"11in",
	pageMargin:".50in"
};

// TODO: better media ignore method, maybe poke the css stylesheet to verify this is "the" bootstrap.css media to ignore
xepOnline.MEDIA_IGNORE = [
	"bootstrap.css",
	"bootstrap.min.css"
]

xepOnline.Formatter = {
	clean_tags: ['img', 'hr', 'br', 'input', 'col ', 'embed', 'param', 'source', 'link'],
	fo_attributes_root: [
			'color', 
			'height',
			'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontFamily', 
			'textAlign',
			'width'
	],
	fo_attributes: [
			'lineHeight', 
			'alignmentBaseline', 
			'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'backgroundColor',
			'baselineShift', 
			'borderTopWidth','borderTopStyle','borderTopColor', 
			'borderBottomWidth','borderBottomStyle','borderBottomColor',
			'borderLeftWidth','borderLeftStyle','borderLeftColor',
			'borderRightWidth','borderRightStyle','borderRightColor',
			'borderCollapse',             
			'clear', 'color', 
			'display', 'direction', 'dominantBaseline', 
			'fill', 'float', 
			'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontFamily', 
			'height',
			'listStyleType', 'listStyleImage', 
			'marginTop', 'marginBottom', 'marginLeft', 'marginRight','orphans', 
			'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
			'pageBreakAfter', 'pageBreakBefore', 
			'stroke', 'strokeWidth',
			'strokeOpacity', 'fillOpacity',
			'tableLayout', 
			'textAlign', 'textAnchor','textDecoration', 'textIndent', 'textTransform', 'textShadow',
			'verticalAlign',
			'widows', 'width',
			'position','top','left','bottom','right'],            
	getRealStyle: function(elm, attributes, pseudo) {
		var returnObj = {};
		var computed = getComputedStyle(elm, pseudo);
		for(var i=0; i<attributes.length; i++) {
			returnObj[attributes[i]] = computed[attributes[i]];
		}
		return returnObj;
	},
	copyComputedStyle: function(elm, dest, parentStyle, attributes, pseudo) {
		parentStyle = parentStyle || {}; 
		var s = xepOnline.Formatter.getRealStyle(elm, attributes, pseudo);

		for ( var i in s ) {
			var currentCss = s[i];

			// ignore duplicate "inheritable" properties
			if(parentStyle !== undefined && (parentStyle[i] && parentStyle[i] === currentCss)) { } else { 
				// The try is for setter only properties
				try {
					dest.style[i] = s[i];
					// `fontSize` comes before `font` If `font` is empty, `fontSize` gets
					// overwritten.  So make sure to reset this property. (hackyhackhack)
					// Other properties may need similar treatment
					if ( i == "font" ) {
						dest.style.fontSize = s.fontSize;
					}
				} catch (e) {}
			}
		}
	},
	setSVGHeightWidth: function(dest) {
	    jQuery(dest).find('svg').each(function(index) {
			var svg = jQuery(this);
			svg.attr('height',svg.outerHeight());
            svg.attr('width',svg.outerWidth());
		});
	},
	replaceCanvas: function(dest) {
	    jQuery(dest).find('canvas').each(function(index) {
			var canvas = this;
			var src_canvas = jQuery(jQuery(xepOnline.Formatter.__elm)[0]).find('canvas')[index];
			jQuery('<img src="' + src_canvas.toDataURL() +'"/>').insertAfter(canvas);
		});
	},
    handlePseudoElem: function(dest) {
	    jQuery(dest).find('*').each(function(index) {
			var elem = this;
			var before = getComputedStyle(elem, ':before');  
			if(before.getPropertyValue('content').length > 0 && before.getPropertyValue('content') != "none"){
			     var before_text = before.getPropertyValue('content').split('"');
			     var in_image = false;
			     var processed = false;
			     var span_before = jQuery('<span>');
			     var parentStyle = xepOnline.Formatter.getRealStyle(jQuery(elem).parent()[0], xepOnline.Formatter.fo_attributes, null);
			     xepOnline.Formatter.copyComputedStyle(elem, span_before[0], parentStyle, xepOnline.Formatter.fo_attributes, ":before");	
                 before_text.forEach(function (part){
                     if (part == "")
                        processed = true;       
                     if (part.indexOf("url(") >= 0){
                        in_image = true;
                        processed = true;
                     }
                     if (part.indexOf("ttp://") >= 0 && in_image == true) {
                         var img = jQuery('<img src="url(&quot;'+ part + '&quot;)">');
			             jQuery(span_before).append(img);
			             processed = true;
                     }
                     if (part.indexOf(")") >= 0 && in_image == true) {
                        in_image= false;
                        processed = true;
                     }
                     if (processed == false) {
                        var textspan = jQuery('<span>');
                        jQuery(textspan).text(part);
                        jQuery(span_before).append(textspan);
                     }
                     processed = false;
                 }); 
                 jQuery(elem).prepend(span_before);
            }
            var after = getComputedStyle(elem, ':after');   
			if(after.getPropertyValue('content').length > 0 && after.getPropertyValue('content') != "none"){
			     var after_text = after.getPropertyValue('content').split('"');
			     var in_image = false;
			     var processed = false;
			     var span_after = jQuery('<span>');
			     var parentStyle = xepOnline.Formatter.getRealStyle(jQuery(elem).parent()[0], xepOnline.Formatter.fo_attributes, null);
			     xepOnline.Formatter.copyComputedStyle(elem, span_after[0], parentStyle, xepOnline.Formatter.fo_attributes, ":after");	
                 after_text.forEach(function (part){
                     if (part == "")
                        processed = true;       
                     if (part.indexOf("url(") >= 0){
                        in_image = true;
                        processed = true;
                     }
                     if (part.indexOf("ttp://") >= 0 && in_image == true) {
                         var img = jQuery('<img src="url(&quot;'+ part + '&quot;)">');
			             jQuery(span_after).append(img);
			             processed = true;
                     }
                     if (part.indexOf(")") >= 0 && in_image == true) {
                        in_image= false;
                        processed = true;
                     }
                     if (processed == false) {
                        var textspan = jQuery('<span>');
                        jQuery(textspan).text(part);
                        jQuery(span_after).append(textspan);
                     }
                     processed = false;
                 }); 
                 jQuery(elem).append(span_after);
            }
		});
	},
	embedLocalImages: function(dest) {
	    jQuery(dest).find('img').each(function(index) {
			var img = this;
			var imageUrl = img.src;
			if (imageUrl.indexOf(xepOnline.Formatter.getBase()) != -1){
			     var canvas = document.createElement('canvas');
	             var ctx = canvas.getContext('2d');
		         canvas.height = img.height;
		         canvas.width = img.width;
	  	         ctx.drawImage(img,0,0, img.width, img.height);
	  	         var dataURL = canvas.toDataURL();
	  	         jQuery(img).attr('src', dataURL);
                canvas = null;
            }
		});
	},
	computeTableCols: function(dest) {
		jQuery(dest).find('table').each(function() {
			var table = this;
			jQuery(table).find('col,colgroup').each(function() {
				jQuery(this).attr('xeponline-drop-me',true);
			});

				var cols = 0;
				jQuery(jQuery.find('dest td,th',jQuery('tr',table)[0])).each(function(td) { cols += Number((Number(jQuery(td).attr('colspan'))) ? (jQuery(td).attr('colspan')): 1); })
				var tbody = jQuery('<tbody>');
				var tr = jQuery('<tr>');
				jQuery(tbody).append(tr);

				for(var i = 0; i<cols; i++) {
					jQuery(tr).append('<td style="padding:0; margin:0">&#x200b;</td>');
				}

				// append tbody after everything else
				jQuery(table).append(tbody);
				var widths = [];
				jQuery(jQuery(jQuery('tr',tbody)[0])).find('td,th').each(function() { 
					widths.push(jQuery(this).css('width').replace('px',''));
				});

				// remove any original col groups and widths
				jQuery(table).find('[xeponline-drop-me=true]').remove();
				jQuery(table).find('td,th').css('width','');

				var colgroup = jQuery('<colgroup>');
				jQuery(table).prepend(colgroup);
				for(var i = 0; i<widths.length;i++) {
					var col = jQuery('<col>');
					jQuery(col).attr('width', widths[i]);
					jQuery(colgroup).append(col);
				}
				jQuery(tbody).remove();
		});
	},
	cleanTags: function(PrintCopy) {
		var result = PrintCopy;
		for(var i=0; i<xepOnline.Formatter.clean_tags.length;i++) {
			var regx = new RegExp('(<' + xepOnline.Formatter.clean_tags[i] + '("[^"]*"|[^\/">])*)>', 'g');
			result = result.replace(regx, '$1/>');
		}
		return result;
	},
	flattenStyle: function(elm, options) {
		// parent
		xepOnline.Formatter.copyComputedStyle(elm, elm, undefined, xepOnline.Formatter.fo_attributes_root, null);
		// children
		jQuery(elm).find('*').each(function(index, elm2) {
			switch(elm2.tagName) {
				case 'IFRAME':
					try {
						// HACK! selector in iframe goes after [contenteditable] 
						// this to become an optional sub-selector for content iframe somehow in future
						var content = jQuery(jQuery(xepOnline.Formatter.__elm).find('iframe[src="' + jQuery(elm2).attr('src') + '"]')[0].contentDocument).find('[contenteditable]');
						var iflat = jQuery('<div data-xeponline-formatting=\'i-flat\'></div>');
						iflat.html(content.html());				
						content.after(iflat);
						xepOnline.Formatter.flattenStyle(iflat[0]);
						jQuery(elm2).after(iflat);
						
					} catch(e) {}
				case 'SCRIPT':
				// ignore these tags
				break;
				default:
					var parentStyle = xepOnline.Formatter.getRealStyle(jQuery(elm2).parent()[0], xepOnline.Formatter.fo_attributes, null);
					xepOnline.Formatter.copyComputedStyle(elm2, elm2, parentStyle, xepOnline.Formatter.fo_attributes, null);				
				break;

			}
		});
		// Fix table columns
		xepOnline.Formatter.computeTableCols(elm);
		// Check SVG width/height
		xepOnline.Formatter.setSVGHeightWidth(elm);
		// Embed canvas
		xepOnline.Formatter.replaceCanvas(elm);
		// Pseudo Elements (currently only handles :before and :after and can be turned off if needed)
		if (options.processPseudoElem == 'true')
		    xepOnline.Formatter.handlePseudoElem(elm);
		// Embed local image if set in options
		if (options.embedLocalImages == 'true') {
		    xepOnline.Formatter.embedLocalImages(elm);
		}
	},
	getFormTextData: function(PrintCopy) {
		var data = xepOnline.Formatter.entity_declaration + current_stylesheet + PrintCopy;
		var encoded = encodeURIComponent(data);
		if(window.btoa) return btoa(encoded);
		return encoded;
	},
	getFormData: function(PrintCopy, Name, MimeType, FileName, Resolution) {
		var data = xepOnline.Formatter.entity_declaration + current_stylesheet + PrintCopy;
		var blob;
		try
		{
			blob = new Blob([data],{ type: xepOnline.Formatter.src_type.xml });
		}
		catch(e) 
		{
			if(e.name === 'TypeError') {
				throw new Error('Blob undefined')
			}
		}

		if(blob === undefined) throw new Error('Blob undefined');

		var obj = new FormData();

		obj.append(Name,blob,FileName);
		obj.append('mimetype', MimeType);
		obj.append('resolution', Resolution);
		return obj;
	},
	togglePrintMediaStyle: function() {
		if(jQuery('head style[data-xeponline-formatting]').length > 0) {
			jQuery('head style[data-xeponline-formatting]').remove();
			return;
		}
		var printrules = [];
		for(var x=0;x<document.styleSheets.length;x++) { 
			// ignore media print
			var skipMedia = false;
			for(var i = 0; i < xepOnline.MEDIA_IGNORE.length; i++) {
				if(document.styleSheets[x].href && document.styleSheets[x].href.indexOf(xepOnline.MEDIA_IGNORE[i]) > 0) {
					skipMedia = true;
					break;
				}
			}


			// try catch - some browsers don't allow to read css stylesheets
			var rules;			
			try
			{
				if(!document.styleSheets[x].cssRules === null || (document.styleSheets[x].href !== null && document.styleSheets[x].href.indexOf(location.host) === 0)) {
					skipMedia = true;
				}
				if(skipMedia) continue;
				var rules=document.styleSheets[x].cssRules;
			} catch(e) {}	

			if(rules) {
				var rule=[];
				for(var x2=0;x2<rules.length;x2++) {
					
					if(rules[x2].media && rules[x2].media && (rules[x2].media[0] === 'print' || 
						rules[x2].media && rules[x2].media.mediaText === 'print')) {
						for(var x3=0;x3<rules[x2].cssRules.length; x3++) {
							rule.push(rules[x2].cssRules[x3]);
						}
					}  else if (rules[x2].parentStyleSheet.media[0] && 
							rules[x2].parentStyleSheet.media[0] === 'print' ||
							(rules[x2].parentStyleSheet.media && 
								rules[x2].parentStyleSheet.media.mediaText === 'print')) {
						rule.push(rules[x2]);
					}
				}
				for(var x2=0;x2<rule.length;x2++) {
					printrules.push(rule[x2].cssText);	
				}
			}
		}

		// write print media styles to head
		var html = '\n<style type="text/css" data-xeponline-formatting="true">\n';
		for(var x=0; x<printrules.length; x++) {
			html+='.xeponline-container ' + printrules[x] + '\n';
		}
		html += '</style>\n';
		jQuery('head').append(html);
	},
	getFOContainer: function(elm, options) {
		options 			= options || {};
		options.pageWidth 	= options.pageWidth || xepOnline.DEFAULTS.pageWidth;
		options.pageHeight 	= options.pageHeight || xepOnline.DEFAULTS.pageHeight;
		options.pageMargin 	= options.pageMargin || xepOnline.DEFAULTS.pageMargin;

		var container = jQuery('<div class=\'xeponline-container\'></div>');
		var margincontainer = jQuery('<div class=\'margin-container\'></div>');
		if (options.srctype == 'svg'){
		    var svgcontainer = jQuery('<div class=\'svg-container\' width=' + jQuery(elm).width() + ' height=' + jQuery(elm).height() + '></div>');
		    margincontainer.append(svgcontainer);
		}

		container.append(margincontainer);
		var stylebuilder = '';
		var stylebuildermargin = '';
		var fostylebuilder = '';
		
		stylebuilder += 'width: ' 			+ options.pageWidth + '; ';
		stylebuilder += 'height: ' 			+ options.pageHeight + '; ';
		stylebuildermargin += 'margin: ' 	+ options.pageMargin + '; ';

		if(options && options.pageMarginTop) {
			stylebuildermargin += 'margin-top: ' + options.pageMarginTop + '; ';
		}
		if(options && options.pageMarginRight) {
			stylebuildermargin += 'margin-right: ' + options.pageMarginRight + '; ';
		}
		if(options && options.pageMarginBottom) {
			stylebuildermargin += 'margin-bottom: ' + options.pageMarginBottom + '; ';
		}
		if(options && options.pageMarginLeft) {
			stylebuildermargin += 'margin-left: ' + options.pageMarginLeft + '; ';
		}
		if(options && options.cssStyle) {
		    jQuery.each(options.cssStyle, function(key, value) {
		      jQuery.each(value, function(objkey, objvalue) {
                stylebuilder += objkey.fromCamel()+ ': ' + objvalue + '; ';
              });
            });
		}
		if(options && options.foStyle) {
		    jQuery.each(options.foStyle, function(key, value) {
		      jQuery.each(value, function(objkey, objvalue) {
                fostylebuilder += objkey.fromCamel()+ ': ' + objvalue + '; ';
              });
            });
		}
		container.attr('style', stylebuilder);
		margincontainer.attr('style', stylebuildermargin);
		container.attr('fostyle', fostylebuilder);
		return container;
	},
	getBase: function() {
		var pathname = jQuery(location).attr('pathname').substring(0, jQuery(location).attr('pathname').lastIndexOf('/') + 1);
		var base = jQuery(location).attr('protocol') + '//' + jQuery(location).attr('hostname') + pathname;
		return base;
	},
	// IE Hack!
	cleanSVGDeclarations: function(data) {
		var builder = '';

		var regx = /<svg ("[^"]*"|[^\/">])*>/ig;
		var match = regx.exec(data);
		var startIdx = 0;
		var svgdec_text = 'xmlns="http://www.w3.org/2000/svg"';

		while(match != null) {

			builder = builder || '';
			builder += data.substring(startIdx, match.index);

			// hack for IE
			// build replacement opening svg tag, killing duplicate xmlns svg namespace decleration
			builder += '<svg';
			// add back name values
			var svgdec_flag = false;
			var namevalues = match[0].match(/([^< =,]*)=("[^"]*"|[^,"]*)/ig);
			for(var s = 0; s<namevalues.length; s++) {
				if(namevalues[s] === svgdec_text && svgdec_flag) { } else {
					builder += ' ' + namevalues[s];
				}
				svgdec_flag = namevalues[s] === svgdec_text || svgdec_flag;
			}
			builder += '>';

			data = data.substring(match.index + match[0].length);
			regx = /<svg ("[^"]*"|[^\/">])*>/ig;
			match = regx.exec(data);
		}

		return builder += (data || '');
	},
	xep_chandra_service: 'http://xep.cloudformatter.com/Chandra.svc/genpackage',
	xep_chandra_service_AS_PDF: 'http://xep.cloudformatter.com/Chandra.svc/genfile',
	xep_chandra_service_page_images: 'http://xep.cloudformatter.com/Chandra.svc/genpageimages',
	entity_declaration:'<!DOCTYPE div [  <!ENTITY % winansi SYSTEM "http://xep.cloudformatter.com/doc/XSL/winansi.xml">  %winansi;]>',
	xsl_stylesheet_declaration: '<?xml-stylesheet type="text/xsl" href="http://xep.cloudformatter.com/doc/XSL/xeponline-fo-translate-2.xsl"?>',
	svg_xsl_stylesheet_declaration: '<?xml-stylesheet type="text/xsl" href="http://xep.cloudformatter.com/doc/XSL/xeponline-svg-translate.xsl"?>',
	src_type: { xml: 'text/xml'},
	mime_type: { 
	   pdf: 'application/pdf', 
	   svg: 'image/svg+xml', 
	   xps:'application/vnd.ms-xpsdocument',
	   ps: 'application/postscript',
	   afp: 'application/afp',
	   xep: 'application/xep',
	   png: 'image/png'
	},
	/* options	
		{
			pageWidth: "8.5in", 				// reserved for the FO region-body (next 7)
			pageHeight: "11in", 
			pageMargin: ".25in", 
			pageMarginTop: "1in",
			pageMarginRight: "1in",
			pageMarginBottom: "1in",
			pageMarginLeft: "1in",
			pageMediaResource: "name_of_css_stylesheet",
			mimeType: ("application/pdf<default>"|"image/svg+xml"),
			render: ("none"|"newwin<default>"|embed"|"download<default IE>"),
			cssStyle: {							// puts css style attributes on the root, ex. fontSize:14px
						cssStyleName: 'value', ...
					},
			foStyle: {							// puts fo style attributes on the root, ex. fontSize:14px
						foStyleName: 'value', ...
					}			
		}
	*/
	__format: function(ElementIDs, options) {
		options = options || {};
		options.render = (options.render === undefined) ? 'newwin' : options.render;
		options.mimeType = (options.mimeType === undefined) ? xepOnline.Formatter.mime_type.pdf : options.mimeType;
		options.filename = (options.filename === undefined) ? 'document' : options.filename;
		options.resolution = (options.resolution === undefined) ? '120' : options.resolution;
		options.processPseudoElem = (options.processPseudoElem === undefined) ? 'true' : options.processPseudoElem;
		
		//Record the height of the target
		current_height = jQuery('#' + ElementIDs[0]).height();
		
		//Set the stylesheet to use
		current_stylesheet = options.srctype=='svg' ? xepOnline.Formatter.svg_xsl_stylesheet_declaration : xepOnline.Formatter.xsl_stylesheet_declaration;
		
		if(xepOnline.IE() || xepOnline.mobilecheck()) {
			options.render = (options.mimeType.substring(0,5) == 'image') ? options.render : 'download';
		}

		 var printcopy = '';
		jQuery(ElementIDs).each(function(index, ElementID){
		   xepOnline.Formatter.__elm = jQuery('#' + ElementID)[0];
		   if(!xepOnline.Formatter.__elm) {
		   	throw new Error('Missing or invalid selector');
		   }

		   xepOnline.Formatter.__clone = jQuery(xepOnline.Formatter.__elm)[0].outerHTML;
		   xepOnline.Formatter.__container = xepOnline.Formatter.getFOContainer(xepOnline.Formatter.__elm, options);

			jQuery('#' + ElementID).after(jQuery(xepOnline.Formatter.__container));
			jQuery(xepOnline.Formatter.__clone).appendTo(jQuery(xepOnline.Formatter.__container).children(1));		

		   xepOnline.Formatter.togglePrintMediaStyle();
		   xepOnline.Formatter.flattenStyle(jQuery(xepOnline.Formatter.__container)[0], options);
		   printcopy = printcopy + xepOnline.Formatter.cleanTags(jQuery(xepOnline.Formatter.__container)[0].outerHTML);
		   xepOnline.Formatter.Clear();
		});

		if(options.render === 'none') {
			return false;
		}
		if(options.render === 'embed') {
			xepOnline.Formatter.__container.attr('data-xeponline-embed-pending', 'true');
		}
		if(options.render === 'base64') {
			return utf8ToBase64(xepOnline.Formatter.entity_declaration + current_stylesheet + printcopy);
		}	
		// fix IE double xmlns declerations in SVG
		if(xepOnline.IE()) {
			printcopy = xepOnline.Formatter.cleanSVGDeclarations(printcopy);
		}
		//Kevin hack for now, stuff the whole thing in a document div
		var nss = "";
		jQuery.each(options.namespaces || [], function(objkey, objvalue) {
                nss += objvalue + ' ';
        });
		printcopy = '<div base="' + xepOnline.Formatter.getBase() + '" class="xeponline-document" ' + nss + '>' + printcopy + '</div>';

		var blob;
		if(options.render !== 'download') {
			try 
			{
				blob = xepOnline.Formatter.getFormData(printcopy, 'xml', options.mimeType, 'document.xml', options.resolution);
			} catch(e) 
			{
				// switch render to download if blob undefined
				if(e.message === 'Blob undefined') {
					options.render = 'download';					
				} else {
					throw e;
				}
			}
		}
        // set temp mimetype for display
        current_mimetype = options.mimeType;
		if(options.render === 'download') {
			jQuery('body').append('<form style="width:0px; height:0px; overflow:hidden" enctype=\'multipart/form-data\' id=\'temp_post\' method=\'POST\' action=\'' + xepOnline.Formatter.xep_chandra_service_AS_PDF + '\'></form>');		
			jQuery('#temp_post').append('<input type=\'hidden\' name=\'mimetype\' value=\'' + options.mimeType + '\'/>');
			jQuery('#temp_post').append('<input type=\'hidden\' name=\'filename\' value=\'' + options.filename + '\'/>');
			jQuery('#temp_post').append('<input type=\'hidden\' name=\'xml\' value=\'' + xepOnline.Formatter.getFormTextData(printcopy) + '\'/>');
			jQuery('#temp_post').submit();
			jQuery('#temp_post').remove();
			jQuery(document).trigger( "xepOnlineStatus", ["Finished"]);
// DO NOT USE. We are implementing SOAP-based server support also. It is functional but this server is an Azure server not active at this time.
		} else if (options.render === 'soap') {	
		    var productServiceUrl = 'http://52.8.13.8:6577/fairy'; 
            var soapMessage =
'<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" \
    xmlns:fairy="http://52.8.13.8:6577/fairy"> \
    <SOAP-ENV:Header/> \
    <SOAP-ENV:Body> \
        <fairy:format SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> \
            <in0>'+ xepOnline.Formatter.getBase() + '</in0> \
            <in1>' + utf8ToBase64(xepOnline.Formatter.entity_declaration + current_stylesheet + printcopy) + '</in1> \
        </fairy:format> \
    </SOAP-ENV:Body> \
</SOAP-ENV:Envelope>';
            jQuery.ajax({
            url: productServiceUrl,
            type: "POST",
            dataType: "xml",
            data: soapMessage,
            complete: xepOnline.Formatter.__soapBackSuccess,
            contentType: "text/xml; charset=\"UTF-8\""
            });
		} else {
			jQuery.ajax({
				type: "POST",
				url: current_mimetype == "image/png" || current_mimetype == "image/jpg" || current_mimetype == "image/gif" ? xepOnline.Formatter.xep_chandra_service_page_images : xepOnline.Formatter.xep_chandra_service,
				processData: false,
				contentType: false,
				data: blob,
				success: current_mimetype == "image/png" || current_mimetype == "image/jpg" || current_mimetype == "image/gif" ? xepOnline.Formatter.__processImages : xepOnline.Formatter.__postBackSuccess,
				error: xepOnline.Formatter.__postBackFailure
			});
		}
		return false; 
	},	
	
	Format: function(ElementID, options) {
	    jQuery(document).trigger( "xepOnlineStatus", ["Started"]);
		var items;
		if(jQuery.isArray(ElementID)) {
			items = ElementID;
		} else {
			items = [ ElementID ];
		}
		return xepOnline.Formatter.__format(items, options);
	},
	// deprecated - use Format 
	FormatGroup: function(ElementID, options) {
		return xepOnline.Formatter.Format(ElementID, options);
	},
	Clear: function() {
		if(jQuery(xepOnline.Formatter.__container).length===0 || 
			jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true')
			return;			

		jQuery(xepOnline.Formatter.__container).remove();
		xepOnline.Formatter.togglePrintMediaStyle();
	},
	__soapBackSuccess: function(xmlHttpRequest, status) {
		var base64PDF = jQuery(xmlHttpRequest.responseXML).find('formatReturn').text();
		var objbuilder = '';
		objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
		objbuilder += (base64PDF);
		objbuilder += ('" type="application/pdf" class="internal">');
		objbuilder += ('<embed src="data:application/pdf;base64,');
		objbuilder += (base64PDF);
		objbuilder += ('" type="application/pdf" />');
		objbuilder += ('</object>');

		if(jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true') {			
			jQuery(xepOnline.Formatter.__elm).html(objbuilder);
			jQuery(xepOnline.Formatter.__elm).css({'height': xepOnline.DEFAULTS.pageHeight });
			jQuery(xepOnline.Formatter.__container).remove();
		} else {
			// TODO: try catch window open "pop-up blocker"
			var win = window.open("","_blank","titlebar=yes");
			win.document.title = "XEPOnline PDF Result";
			win.document.write('<html><body>');
			win.document.write(objbuilder);
			win.document.write('</body></html>');
			layer = jQuery(win.document);
		}
	},
	__postBackSuccess: function(Response) {
	    jQuery(document).trigger( "xepOnlineStatus", ["Finished"]);
		var base64 = jQuery(Response).find("Result").text();
		
		if (current_mimetype == 'image/svg+xml'){
		  if(jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true'){
		        var parser = new DOMParser();
                var dom = parser.parseFromString(bufferToBinaryString(base64ToBuffer(base64)).replace('ï»¿',''), "text/xml");
                jQuery(xepOnline.Formatter.__elm).html('');
                document.getElementById(jQuery(xepOnline.Formatter.__elm).attr('id')).appendChild(dom.documentElement);
		  }
		  else{
		      var win = window.open("","_blank","titlebar=yes");
			  win.document.title = "XEPOnline Result";
			  win.document.write('<html><head>');
			  jQuery.each(jQuery("link[href*='googleapis']"),function(index,value){
			      win.document.write(value.outerHTML);
			  });
			  win.document.write('</head><body height="100%"><div id="target" style="height:100%;overflow-y:auto">');
			  win.document.write('</div></body></html>');
			  var parser = new DOMParser();
              var dom = parser.parseFromString(bufferToBinaryString(base64ToBuffer(base64)).replace('ï»¿',''), "text/xml");
              win.document.getElementById('target').appendChild(dom.documentElement);
              layer = jQuery(win.document);
		  }
		}
		else{
    		var objbuilder = '';
    		objbuilder += ('<object width="100%"');
    	    objbuilder += (' height="');
    	    if(jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true'){
    	       objbuilder += (current_height);
    	    }
    	    else{
    	       objbuilder += ('100%'); 
    	    }
      		objbuilder += ('" data="data:');
      		objbuilder += (current_mimetype);
      		objbuilder += (';base64,');
      		objbuilder += (base64);
      		objbuilder += ('" type="');
      		objbuilder += (current_mimetype)
      		objbuilder += ('" class="internal">');
      		objbuilder += ('<embed src="data:');
      		objbuilder += (current_mimetype);
      		objbuilder += (';base64,');
      		objbuilder += (base64);
      		objbuilder += ('" type="');
      		objbuilder += (current_mimetype);
      		objbuilder += ('" />');
      		objbuilder += ('</object>');
		    if(jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true'){
		          jQuery(xepOnline.Formatter.__elm).html(objbuilder);
		    }
		    else {
		         var win = window.open("","_blank","titlebar=yes");
			     win.document.title = "XEPOnline Result";
			     win.document.write('<html><head>');
			     win.document.write('</head><body height="100%"><div id="target" style="height:100%;overflow-y:auto">');
			     win.document.write(objbuilder);
			     win.document.write('</div></body></html>');
			     layer = jQuery(win.document);
		    }
		}
	},
	__processImages: function(Response) {
	    jQuery(document).trigger( "xepOnlineStatus", ["Finished"]);
	    var Pages = jQuery(Response).find("Pages").children();
	    
	     if(jQuery(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true'){
	         jQuery(xepOnline.Formatter.__elm).html('');
             jQuery.each(Pages,function(index,value){
			     jQuery(xepOnline.Formatter.__elm).append('<img style="border:1px solid black" height="100%" src="data:image/png;base64,' + jQuery(value).text() + '"/>');
			 });
	     }
	     else {
                 var win = window.open("","_blank","titlebar=yes");
			     win.document.title = "XEPOnline Result";
			     win.document.write('<html><head>');
			     win.document.write('</head><body height="100%"><div id="target" style="height:100%;overflow-y:auto">');
			     jQuery.each(Pages,function(index,value){
			         win.document.write('<img style="border:1px solid black" src="data:' + current_mimetype + ';base64,' + jQuery(value).text() + '"/>');
			     });
			     win.document.write('</div></body></html>');	         
	     }
	},
	__postBackFailure: function (request, status, error){
	    jQuery(document).trigger( "xepOnlineStatus", ["Finished"]);
	    var req = jQuery(request.responseText);
	    var win = window.open("","_blank","titlebar=yes, width=800, height=500");
		win.document.title = "XEPOnline Error";
		win.document.write(request.responseText);
	}

}
