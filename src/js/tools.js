/** @namespace TOOLS */
var TOOLS = function () {
	var TOOLS = {};

	/**
	 * Replace Text
	 * @param {String} str
	 * @param {object} reg | Regex
	 * @param {String} to
	 * @returns String
	 */
	TOOLS.replaceText = function(str, reg, to){
		var _str = str;
		return _str.replace(reg, to);
	}

	/**
	 * XMLHttpRequest 
	 * @param {String} url
	 * @returns Object Promise
	 */
	TOOLS.HTTP = function(url){
		return promise = new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				}
				else {
					reject(JSON.parse(xhr.status));
				}
			};
			xhr.send();

		});
	}

	/**
	 * Remove element by id 
	 * @param {String} id
	 */
	TOOLS.removeDom = function(id) {
		var elem = document.getElementById(id);
		return elem.parentNode.removeChild(elem);
	}

	/**
	 * Array Chunk
	 * @param {array} array
	 * @param {Number} chunkSize
	 * @returns Array
	 */
	TOOLS.ArrayChunk = function(array, chunkSize){
        var _array=array;
        return [].concat.apply([],
            _array.map(function(elem,i) {
                return i%chunkSize ? [] : [_array.slice(i,i+chunkSize)];
            })
        );
	}

	/**
	 * Check has class elem
	 * @param {Object} el
	 * @param {String} className
	 * @returns Bolean
	 */
	TOOLS.hasClass = function(el, className){
		if ( el.classList.value == className) {
			return true;
		}else{
			return false
		}
	}

	return TOOLS;
}