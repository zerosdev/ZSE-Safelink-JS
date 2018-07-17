/**
*
* 	========## Zeros Safelink Engine (ZSE) v1.1.0 ##========
*
* 	Easy way to convert your outgoing links into your safelink
*	
*	Base64 Encoder & Decoder by WebToolkit (webtoolkit.info)
*
*	Zeros Safelink Engine (ZSE) by Zeros Dev (zeros.co.id)
*
*   Copyright 2018 Zeros Technology Center
*   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
*   WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = Base64._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	    }

	    return output;
	},

	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {

	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output = output + String.fromCharCode(chr1);

	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }
	        
	    }

	    output = Base64._utf8_decode(output);

	    return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while ( i < utftext.length ) {

	        c = utftext.charCodeAt(i);

	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }

	    }

	    return string;
	}
};

var ZSE = {

	// get web hostname
	_webhostname : window.location.hostname,

	// set array of url that must be excluded from conversion
	_except : [],

	// set array of url that must be converted
	_only : [],

	// set safelink baseurl
	_safelink : '',

	// set delay in minute
	_delay : 5,

	// set default repeat, 0 = unlimited
	_repeat : 0,

	// set default interval for repeat in minute
	_interval : 60,

	// current repetition
	_currentRepetition : 0,

	//
	_running : false,

	// errors bag
	_error : [],

	safelink : function (url) {
		if( url != "" && typeof url !== 'undefined' ) {
			ZSE._safelink = url;
		}

		return this;
	},

	except : function (except) {
		if( Array.isArray(except) ) {
			ZSE._except = except;
		}

		return this;
	},

	only : function (only) {
		if( Array.isArray(only) ) {
			ZSE._only = only;
		}

		return this;
	},

	delay : function (minute) {
		var minute = parseInt(minute);
		if( isNaN(minute) )
		{
			ZSE._error.push("Invalid delay value");
		}

		ZSE._delay = minute;

		return this;
	},

	repeat : function (count, interval) {
		var count = parseInt(count);
		var interval =  parseInt(interval);
		if( isNaN(count) )
		{
			ZSE._error.push("Invalid repeat value");
		}
		else if( isNaN(interval) ) {
			ZSE._error.push("Invalid interval value");
		}

		ZSE._repeat = count;
		ZSE._interval = interval;

		return this;
	},

	setCookie : function (cname, cvalue, exminute) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exminute*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

	    return true;
	},

	getCookie : function (cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }

	    return "";
	},

	updateCookie : function (cname, cvalue) {
		document.cookie = cname + "=" + cvalue + ";";

		if( ZSE.getCookie(cname) == cvalue ) {
			return true;
		}

		return false;
	},

	isCrawler : function () {
		var list = [
			'googlebot', 'mediapartners-google', 'adsbot-google', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'sogou', 'exabot', 'facebookexternalhit', 'facebot', 'ia_archiver'
			];
		var ua = navigator.userAgent;
		var isCrawler = RegExp(list.join('|'), 'i').exec(ua);
		return isCrawler;
	},

	boot : function () {
		if( ZSE._webhostname == '' ) {
			ZSE._error.push("Undefined web hostname");
		}

		if( !Array.isArray(ZSE._except) ) {
			ZSE._error.push("'except' must be an array of domains that shouldn NOT be converted");
		}

		if( !Array.isArray(ZSE._only) ) {
			ZSE._error.push("'only' must be an array of domains that should be converted");
		}

		if( ZSE._safelink == '' ) {
			ZSE._error.push("Undefined safelink URL");
		}

		if( ZSE._delay === '' || isNaN(ZSE._delay) ) {
			ZSE._error.push("Undefined or invalid delay value");
		}

		if( ZSE._repeat === '' || isNaN(ZSE._repeat) ) {
			ZSE._error.push("Undefined or invalid repeat value");
		}

		if( ZSE._interval === '' || isNaN(ZSE._interval) ) {
			ZSE._error.push("Undefined or invalid interval value");
		}

		if( ZSE._except.indexOf(ZSE._webhostname) == -1 ) {
			ZSE._except.push(ZSE._webhostname);
		}

		if( ZSE.getCookie("__ZSE_Safelink_r") == "" ) {
			ZSE.setCookie("__ZSE_Safelink_r", ZSE._currentRepetition, ZSE._interval);
		}
		else {
			var currentRepetition = parseInt(ZSE.getCookie("__ZSE_Safelink_r"));
			if( isNaN(currentRepetition) ) {
				ZSE._error.push("Internal error. Can not defining current repertition");
			}
			else {
				ZSE._currentRepetition = currentRepetition;
			}
		}
	},

	run : function () {

		if( !ZSE.isCrawler() ) {

			ZSE.boot();

			if( ZSE._error.length > 0 ) {
				ZSE._error.forEach(function (item, key) {
					console.log(ZSE._error[key]);
				});

				return false;
			}

			ZSE._running = true;

			if( ZSE._delay > 0 && ZSE._repeat > 0 ) {
				if( ZSE.getCookie("__ZSE_Safelink") == "" ) {
					if( ZSE._currentRepetition <= ZSE._repeat ) {
						
						ZSE.start();

						ZSE.updateCookie("__ZSE_Safelink_r", (ZSE._currentRepetition + 1));
					}

					ZSE.setCookie("__ZSE_Safelink", 1, ZSE._delay);
				}
			}
			else if( ZSE._delay > 0 && ZSE._repeat <= 0 ) {
				if( ZSE.getCookie("__ZSE_Safelink") == "" ) {
					
					ZSE.start();

					ZSE.setCookie("__ZSE_Safelink", 1, ZSE._delay);
				}
			}
			else if( ZSE._delay <= 0 && ZSE._repeat > 0 ) {
				if( ZSE._currentRepetition <= ZSE._repeat ) {
					ZSE.start();

					ZSE.updateCookie("__ZSE_Safelink_r", (ZSE._currentRepetition + 1));
				}
			}
			else {
				ZSE.start();
			}

			return true;
		}

		return false;
	},

	start : function () {
		var links = document.getElementsByTagName("a");
		var i = 0;
		Object.keys(links).forEach(function (index) {
			var data = links[index];
			var destination = data.getAttribute("href");
			var hostname = data.hostname;
			var pathname = data.pathname;
			var matchesExcept = (ZSE._except.length > 0 ? RegExp(ZSE._except.join('|'), 'i').exec(hostname) : false);
			var matchesOnly = (ZSE._only.length > 0 ? RegExp(ZSE._only.join('|'), 'i').exec(hostname) : true);
			if( !matchesExcept && matchesOnly ) {
				var encoded = Base64.encode(destination);
				var newURL = ZSE._safelink + encoded;
				links[i].setAttribute("href", newURL);
			}
			
			i++;
		});
	},

	linkCount : function () {
		var links = document.getElementsByTagName("a");
		return links.length;
	}
};