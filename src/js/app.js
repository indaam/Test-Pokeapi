(function() {

	var getTOOLS = new TOOLS();
	var getElem = new ELEMENT();

	var APP = function() {

		var CONFIG = {
			url: 'http://localhost:7878/api/v2/', // Set url
			limit: 2, // Set limit of loadmore data
			next: '', // Set next url after load more data
			loadType: 'all', // Set next url after load more data
			loadTypeIndex: 0, // Set next url after load more data
		}
		var DOMELEM = {
			app : app, // default, id define as variable
			body : document.body,
			next : '<button id="loadmore">Load more  </button>',
			title : '<h1>Pokemon Index</h1>',
			detail : '<div class="pk-detail"></div>',
			loadingEmpty : '<div id="loadingempty">Please Wait...</div>',
			loadingMore : '<span id="loadingmore">Please Wait...</span>',
			menu : '<nav class="navbar navbar-default"><ul id="menu" class="menu nav navbar-nav"></ul></nav>',
		}
		var promise = {};
		promise.createDomList = function(res){

			// Remove test loading, when have response
			DOMELEM.loadmore.removeChild(DOMELEM.loadmore.childNodes[0]);

			// Then, add text
			DOMELEM.loadmore.innerHTML = 'Load more  ';

			// Append new list pokemon
			DOMELEM.tbody.insertAdjacentHTML('beforeend', res);

			// Set 0 to can load more data;
			CONFIG.isClick = 0;

		}

		function createMenu(){

			// Get list menu
			getTOOLS.HTTP(CONFIG.url+'type').then(function(res){

				// Then create html menu
				DOMELEM.app.insertAdjacentHTML('beforebegin', DOMELEM.menu);

				// select menu
				DOMELEM.menu = menu;

				// appen list menu
				DOMELEM.menu.insertAdjacentHTML('beforeend', getElem.createTypeMenu(res));

			}, function(e){

			})
		}

		function first(addtitle, appendmenu){

			if ( addtitle == true) {
				// Create Title
				DOMELEM.app.insertAdjacentHTML('beforebegin', DOMELEM.title);				
			};


			// Create text loading
			DOMELEM.app.insertAdjacentHTML('afterbegin', DOMELEM.loadingEmpty);

			// Get List of Pokemon
			getTOOLS.HTTP(CONFIG.url+'pokemon/?limit='+CONFIG.limit).then(function(d){
				CONFIG.next = d.next;

				// Get Detail of pokemon by list
				getElem.createList(d.results, CONFIG.limit, CONFIG.loadType).then(function(res){

					// Create detail list
					getElem.createDomList(res).then(function(res){

						if ( appendmenu ) {
							// Create Menu
							createMenu();							
						}

						// Remove loading text
						DOMELEM.app.removeChild(DOMELEM.app.childNodes[0]);

						// Append Heading table
						DOMELEM.app.appendChild(getElem.createDomWrap({
							name: 'Name',
							image: 'Image',
							weight: 'Weight',
							height: 'Height',
							types: 'Types',
							ability: 'Ability',
							stat: 'Stat',
						}));

						// Create Load More Button
						DOMELEM.app.insertAdjacentHTML('beforeend', DOMELEM.next);

						// Set after append table child
						DOMELEM.table = document.getElementsByTagName('table')[0];
						DOMELEM.tbody = document.getElementsByTagName('tbody')[0];
						DOMELEM.loadmore = loadmore;

						// Append list pokemon
						DOMELEM.tbody.insertAdjacentHTML('beforeend', res);

					}, function(e){

					});
				}, function(e){

				});

			}, function(e){
				console.log(e);
			})
		}

		function AppAvent(){

			CONFIG.isClick = 0;
			parent.addEventListener('click', function(e) {

				if ( e.target.getAttribute('id') == 'loadmore') {

					if( e.target.getAttribute('id').indexOf('loadmore') >= 0) {

						CONFIG.isClick++;

						if ( CONFIG.isClick === 1) {

							console.log("Get data");

							// Remove the string
							DOMELEM.loadmore.innerHTML = '';

							// Then, Apend text btn loading
							DOMELEM.loadmore.insertAdjacentHTML('beforeend', DOMELEM.loadingMore);


							if ( CONFIG.loadType == 'all') {

								getTOOLS.HTTP(CONFIG.next).then(function(d){
									// Set Next url data
									CONFIG.next = d.next;

									// Get Detail of pokemon by list
									getElem.createList(d.results, CONFIG.limit, CONFIG.loadType).then(function(res){

										// Create detail list
										getElem.createDomList(res).then(promise.createDomList, function(e){

										});
									}, function(e){

									});

								}, function(e){
									console.log(e);
								})

							}else{

								// Get Detail of pokemon by list
								getElem.createList(CONFIG.other[CONFIG.loadTypeIndex], CONFIG.limit, CONFIG.loadType).then(function(res){

									// Set count
									CONFIG.loadTypeIndex++;

									// Create detail list
									getElem.createDomList(res).then(promise.createDomList, function(e){

									});
								}, function(e){

								});

							}

						}else{
							return false;
						}
					}
				};



				if ( e.target.getAttribute('class') != null) {

					if ( e.target.getAttribute('class') == 'js_ability') {

						// request ability
						getTOOLS.HTTP(e.target.dataset.url).then(function(res){

							// then, create dom
							getElem.createModal(res).then(function(res){

								// append modal ability
								DOMELEM.body.insertAdjacentHTML('beforeend', res);

								// Set modal
								DOMELEM.modal = modal;

								// You kwow lah..
								DOMELEM.modal.style.display = "block";
								DOMELEM.modal.classList.add('in');

							}, function(e){

							})

						}, function(e){

						})
					}

					if( e.target.getAttribute('class').indexOf('js_close_modal') >= 0) {

						// Remove modal
						getTOOLS.removeDom('modal');

					};

					if( e.target.getAttribute('class').indexOf('js_menu') >= 0) {

						// return when class active
						if ( getTOOLS.hasClass(e.target.parentNode, 'active') ) {
							return
						};

						// Clean app
						getElem.emptyElem(DOMELEM.app);

						// Create text loading
						DOMELEM.app.insertAdjacentHTML('afterbegin', DOMELEM.loadingEmpty);

						// Select child menu, then remove class
						for (var i in DOMELEM.menu.childNodes) {
							DOMELEM.menu.childNodes[i].classList = '';
						};

						// Add class to elem
						e.target.parentNode.classList.add('active');

						// Get data
						getTOOLS.HTTP(e.target.dataset.url).then(function(res){
							CONFIG.loadTypeIndex = 0;
							CONFIG.loadType = 'ability';
							CONFIG.other = getTOOLS.ArrayChunk(res.pokemon, CONFIG.limit);

							// Get Detail of pokemon by list
							getElem.createList(CONFIG.other[CONFIG.loadTypeIndex], CONFIG.limit, CONFIG.loadType).then(function(res){

								if ( res.status == 'no-data') {
									DOMELEM.app.innerHTML = 'No data'
								};

								// Set count
								CONFIG.loadTypeIndex++;

								// Create detail list
								getElem.createDomList(res).then(function(res){

									// Remove loading text
									DOMELEM.app.removeChild(DOMELEM.app.childNodes[0]);

									// Append Heading table
									DOMELEM.app.appendChild(getElem.createDomWrap({
										name: 'Name',
										image: 'Image',
										weight: 'Weight',
										height: 'Height',
										types: 'Types',
										ability: 'Ability',
										stat: 'Stat',
									}));

									// Create Load More Button
									DOMELEM.app.insertAdjacentHTML('beforeend', DOMELEM.next);

									// Set after append table child
									DOMELEM.table = document.getElementsByTagName('table')[0];
									DOMELEM.tbody = document.getElementsByTagName('tbody')[0];
									DOMELEM.loadmore = loadmore;

									// Append list pokemon
									DOMELEM.tbody.insertAdjacentHTML('beforeend', res);

								}, function(e){

								});
							}, function(e){

							});

						}, function(e){

						})

					};

					if( e.target.getAttribute('class').indexOf('js_all') >= 0) {

						// return when class active
						if ( getTOOLS.hasClass(e.target.parentNode, 'active') ) {
							return
						};

						// Clean app
						getElem.emptyElem(DOMELEM.app);
						first(false, false);
						CONFIG.loadType = 'all';
					}
				};


			});
		}

		return {
			init: function(){
				first(true, true),
				AppAvent()
			}
		}

	}();

	APP.init();
})()