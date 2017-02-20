/** @namespace ELEMENT */
var ELEMENT = function () {
	var ELEMENT = {};
	var getTOOLS = new TOOLS();

	/**
	 * Create object of data
	 * @param {Object} data
	 * @param {Number} limit
	 * @param {String} type all|ability
	 * @returns Array Promise
	 */
	ELEMENT.createList = function(data, limit, type){
		console.log(data);
		return promise = new Promise(function(resolve, reject) {
			if ( typeof data == 'undefined') {
				resolve({status : 'no-data'});
			};
			var list = [];
			function getDetails(url, index){
				getTOOLS.HTTP(url).then(function(d){
					list.push(d);
					if ( list.length == (limit)) {
						resolve(list);
					};
				}, function(e){

				});
			}

			if ( type == 'all') {
				for (var i in data) {
					// (type == 'all' ? getDetails(data[i].url, i) : getDetails(data[i].pokemon.url, i))
					getDetails(data[i].url, i);
				};				
			}else{
				for (var i in data) {
					getDetails(data[i].pokemon.url, i);
				};
			}
		});

	}

	/**
	 * Remove Child of element
	 * @param {Object} elem
	 * @returns void
	 */
	ELEMENT.emptyElem = function(elem){
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}

	/**
	 * Base Table
	 * @param {Object} title
	 * @returns object HTML 
	 */
	ELEMENT.createDomWrap = function(title){
		var TABLE = document.createElement('table');
			TABLE.classList.add('table')
			TABLE.classList.add('table-striped');
			TABLE.classList.add('table-bordered');
			var TableHeading = '<tbody><tr><th>'+title.name+'</th><th>'+title.image+'</th><th>'+title.weight+'</th><th>height</th><th>Types</th><th>Ability</th><th>Stat</th></tr></tbody>';
			TABLE.innerHTML = TableHeading;
		return TABLE;
	}

	/**
	 * List Item
	 * @param {Object} data
	 * @returns String HTML 
	 */
	ELEMENT.createDomList = function(data){

		function createStats(data){
			var table = '<table class="table table-bordered"><tr>';
			for (var i in data) {
				table += '<td class="stat-'+data[i].stat.name+'" data-url="'+data[i].stat.url+'">'+getTOOLS.replaceText(data[i].stat.name, /-/g, ' ')+'</td>';
			};
			table += '</tr><tr>';
			for (var i in data) {
				table += '<td class="stat-value'+data[i].base_stat+'">'+data[i].base_stat+'</td>';
			};
			table += '</tr></table>';
			return table;
		}

		function createTypes(data){
			var table = '<table class="table table-bordered">';
			for (var i in data) {
				table += '<td data-url="'+data[i].type.url+'"><span>'+data[i].type.name+'</span></td>';
			};
			table += '</table>';
			return table;
		}
		function createAbility(data){
			var table = '<table class="no-padding table table-bordered">';
			for (var i in data) {
				if ( !data[i].is_hidden ) {
					table += '<td><button data-url="'+data[i].ability.url+'" class="js_ability">'+data[i].ability.name+'</button></td>';
				}
			};
			table += '</table>';
			return table;
		}

		return promise = new Promise(function(resolve, reject) {
			var TableList = '';
			for (var i in data) {
				TableList += '<tr><td class="pk-name">'+data[i].name+'</td><td><div class="pk-img"><img class="img-front" src="'+data[i].sprites.front_default+'" alt="'+data[i].name+'"/><img class="img-back" src="'+data[i].sprites.back_default+'" alt="'+data[i].name+'"/></div></td><td>'+data[i].weight+'</td><td>'+data[i].height+'</td><td>'+createTypes(data[i].types)+'</td><td>'+createAbility(data[i].abilities)+'</td><td>'+createStats(data[i].stats)+'</td></tr>';
			};
			resolve(TableList);
		});

	}

	/**
	 * Modal Abilty
	 * @param {Object} data
	 * @returns String HTML 
	 */
	ELEMENT.createModal = function(data){

		return promise = new Promise(function(resolve, reject) {

			var modal = '<div class="modal fade" id="modal" role="dialog">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<button type="button" class="close js_close_modal" data-dismiss="modal">×</button>'+
							'<h4 class="modal-title">'+data.name+'</h4>'+
						'</div>'+
						'<div class="modal-body">'+
							'<p>'+data.effect_entries[0].effect+'</p>'+
						'</div>'+
						'<div class="modal-footer">'+
							'<button type="button" class="btn btn-default js_close_modal" data-dismiss="modal">Close</button>'+
						'</div>'+
					'</div>'+
					'</div>'+
				'</div>';

			resolve(modal);

		});

	}
	/**
	 * List of menu Ability
	 * @param {Object} data
	 * @returns String HTML 
	 */
	ELEMENT.createTypeMenu = function(data){
		var list = '<li class="active"><a class="js_all" href="#">All</a></li>';
		for (var i in data.results) {
			list += '<li><a class="js_menu" data-url="'+data.results[i].url+'" href="#">'+data.results[i].name+'</a></li>';
		};
		return list;
	}

	return ELEMENT;
}