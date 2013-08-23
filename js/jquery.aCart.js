/*
 *  Project: Alltel JavaScript Shoppingcart
 *  Description: Using JavaScript as shopping front end
 *  @Author: Max Wang
 *  @require store.js
 *  @version 1.0.0
 *  @date 2013-07-25
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( window, document, undefined ) {
	
	
	generateACart = function(options) {
		var settings = {
			"linkClass": "aLink",
			"trollerId": "aTrolley",
			"sourceAddress": "www.alltel.com.au"
		},
		
		shoppingItems = {},
				
		STORENAME = "alltel_storage",
		
		//72 HOURS
		STORGEDURATION = 72,
		
		SHOPPINGCARTID = "__alltel_cart",
		
		FORMDATAID = "__alltel_hidden_data",
		
		SUBMITID = "__alltel_cart_submit",
		
		FORMACTION ="http://10.100.0.3:8098",
		
		FORMNAME = "__alltel_shopping_form",
		
		
		linkClass = settings.aLink,
		
		trollerId = settings.trollerId,
		
		fromAddress = settings.sourceAddress,
		
		chargeType = [
				{ "id": 1, "type": "Plan"},
				{ "id": 2, "type": "Number"},
				{ "id": 3, "type": "Hardware"},
				{ "id": 4, "type": "Routing"}
			],
				
		 products = [
			{
				"id": 101,
				"name": "1300 Number",
				"display": "1300 Number",
				"requires": [1,2]
			},
			{
				"id": 102,
				"name": "1800 Number",
				"display": "1800 Number",
				"requires": [1,2]
			},
			{
				"id": 103,
				"name": "13 Number",
				"display": "13 Number",
				"requires": [1]
			},
			{
				"id": 104,
				"name": "Smart Number",
				"display": "Smart Number",
				"requires": [1]
			},
			{
				"id": 105,
				"name": "Transfer Number",
				"display": "Transfer Number",
				"requires": [1]
			},
			{
				"id": 201,
				"name": "Live Answering",
				"display": "Live Answering",
				"requires": [1]
			}
		],	
		
		charges = [
			{
				"id": 101,
				"name": "Small",
				"code": "",
				"type": 1,
				"onceOff": 19.00,
				"monthly": 14.00
			},
			{
				"id": 102,
				"name": "Medium",
				"code": "",
				"type": 1,
				"onceOff": 19.00,
				"monthly": 19.00
			},
			{
				"id": 103,
				"name": "Large",
				"code": "",
				"type": 1,
				"onceOff": 19.00,
				"monthly": 29.00
			},
			{
				"id": 104,
				"name": "Mobile",
				"type": 1,
				"onceOff": 19.00,
				"monthly": 39.00
			},
			{
				"id": 201,
				"name": "Free",
				"type": 2,
				"onceOff": 0.00,
				"monthly": 0.00
			},
			{
				"id": 202,
				"name": "Gold",
				"type": 2,
				"onceOff": 49.00,
				"monthly": 0.00
			},
			{
				"id": 203,
				"name": "Platinum",
				"type": 2,
				"onceOff": 99.00,
				"monthly": 0.00
			},
			{
				"id": 204,
				"name": "Pairs",
				"type": 2,
				"onceOff": 49.00,
				"monthly": 0.00
			},
			{
				"id": 401,
				"name": "Australia-wide routing",
				"type": 4,
				"onceOff": 0.00,
				"monthly": 0.00
			},
			{
				"id": 402,
				"name": "State-based routing",
				"type": 4,
				"onceOff": 0.00,
				"monthly": 0.00
			},
			{
				"id": 403,
				"name": "Region-based routing",
				"type": 4,
				"onceOff": 29.00,
				"monthly": 0.00
			},
			{
				"id": 404,
				"name": "Area-based routing",
				"type": 4,
				"onceOff": 49.00,
				"monthly": 0.00
			},
			{
				"id": 405,
				"name": "Exchange-based routing",
				"type": 4,
				"onceOff": 75.00,
				"monthly": 0.00
			},
			{
				"id": 406,
				"name": "Postcode prompting routing",
				"type": 4,
				"onceOff": 300.00,
				"monthly": 0.00
			},
			{
				"id": 407,
				"name": "Time-based routing",
				"type": 4,
				"onceOff": 0.00,
				"monthly": 0.00
			},
			{
				"id": 501,
				"name": "LA29",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 29.00
			},
			{
				"id": 502,
				"name": "LA39",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 39.00
			},
			{
				"id": 503,
				"name": "LA49",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 49.00
			},
			{
				"id": 504,
				"name": "LA79",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 29.00
			},
			{
				"id": 505,
				"name": "LA99",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 99.00
			},
			{
				"id": 601,
				"name": "TM20",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 39.00
			},
			{
				"id": 602,
				"name": "TM30",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 55.00
			},
			{
				"id": 603,
				"name": "TM55",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 89.00
			},
			{
				"id": 604,
				"name": "TM75",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 129.00
			},
			{
				"id": 605,
				"name": "TM100",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 169.00
			},
			{
				"id": 701,
				"name": "RC20",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 49.00
			},
			{
				"id": 702,
				"name": "RC30",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 69.00
			},
			{
				"id": 703,
				"name": "RC50",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 109.00
			},
			{
				"id": 704,
				"name": "RC70",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 139.00
			},
			{
				"id": 705,
				"name": "RC90",
				"type": 1,
				"onceOff": 25.00,
				"monthly": 169.00
			}
		],
		
		hardwares = [
			{
				"id": 101,
				"name": "Yealink T22",
				"price": 129.00
			},
			{
				"id": 102,
				"name": "Yealink T26",
				"price": 169.00
			},
			{
				"id": 103,
				"name": "Yealink T28",
				"price": 189.00
			},
			{
				"id": 201,
				"name": "Yealink YJ32",
				"price": 49.00
			},
			{
				"id": 301,
				"name": "Alloy POEFE8T",
				"price": 129.00
			},
			{
				"id": 401,
				"name": "Billion BiPAC 7401VGP R3",
				"price": 154.00
			}
		],
		
				
		getShoppingItemCount = function() {
			return shoppingItems.products.length + shoppingItems.hardwares.length;
		},
		
		addItemToShoppingCart = function(item) {
			
			 if(item.hasOwnProperty("hardware")) {
			 	addHardwareToShoppingCart(item);
			 } else {
			 	addAlltelServiceToShoppingCart(item);
			 }
		},
		
		addHardwareToShoppingCart = function(item) {
			if(typeof item !== "object") return;
			if(!item.hasOwnProperty("hardware")) return;
			
			var hardware = findInArray(shoppingItems.hardwares, "id", item.hardware);
			
			if(hardware) {
				hardware.amount++;
			} else{
				hardware = findInArray(hardwares, "id", item.hardware);
				if(hardware){
					shoppingItems.hardwares.push($.extend({}, hardware,{ amount: 1}));
				}
			}
		},
		
		addAlltelServiceToShoppingCart = function(item) {
			
			if(typeof item !== "object") return;
			
			if(!item.hasOwnProperty("charge")) return;
			if(!item.hasOwnProperty("product")) return;
			 
			//console.log(shoppingItems);
			 
			var product = findProductById(item.product);
						
			var charge = findChargeById(item.charge);
			
			 
			if(product == null) return;
			
			if(charge == null) return;
			
			var shoppingItem = findAvailableProductInShoppingCart(product.id, charge.type);
			
			
			delete item.charge;
			delete item.product;
			
			if(shoppingItem){
				if(shoppingItem.charges == undefined) shoppingItem.charges = [];
				shoppingItem.charges.push($.extend({}, charge, item));
			} else {
				
				shoppingItems.products.push($.extend({}, product, {
					charges : [$.extend({}, charge, item)],
					sId: shoppingItems.products.length + 1
				}));
			}
			
			//console.log(shoppingItems);
		},
		
		findProductById = function(id) {
			return findInArray(products, "id", id);
		},
		
		findChargeById = function(id) {
			return findInArray(charges, "id", id);
		},
		
		findHardwareById = function(id) {
			return findInArray(hardwares, "id", id);
		},
		
		/*
		 * if product not exist, need add a new product
		 * if product exist, but same charge type applied, means cutomer want to add a total new product
		 * if product exist, no charge type applied, means customer want to add more charges for this product 
		 */
		
		findAvailableProductInShoppingCart = function(productId, chargeTypeId){
			var products = shoppingItems.products;
			for(var i = 0, count = products.length; i < count; i++){
				if(products[i].id === productId) {
					if(findInArray(products[i].charges, "type", chargeTypeId)) {
						continue;
					}
					
					return products[i];
				} 
			}
			
			return null;
		},
		
				
		findInArray = function(array, propertyName, propertyValue){
			for(var i = 0, count = array.length; i < count; i++){
				if(array[i][propertyName] === propertyValue) return array[i];
			}
			
			return null;
		},
		
		removeInArray = function(array, propertyName, propertyValue) {
			for(var i = 0, count = array.length; i < count; i++){
				if(array[i][propertyName] === propertyValue) {
					array.splice(i,1);
					break;
				}
			}
		},
		
		getChargeDisplay = function(charge) {
			if(charge.hasOwnProperty("serviceNumber")) {
				return charge.serviceNumber.join(",");
			}
			
			return charge.name;
		},
		
		recalculateProductTotal = function(tbody, onceOffColumn, monthlyColumn){
			var onceOff = 0,
			  	monthly = 0,
			  	tds, trTotal;
			
			$(tbody).find("tr.a-cart-charge").each(function( index ) {
				
				tds = $(this).children();
				//console.log($(tds).eq(onceOffColumn).text());
				//console.log($(tds).eq(monthlyColumn).text());
				onceOff += parseFloat( $(tds).eq(onceOffColumn).text());
				monthly += parseFloat( $(tds).eq(monthlyColumn).text());
			});
			
			trTotal = $(tbody).find("tr.a-cart-total").children(); 
			$(trTotal).eq(onceOffColumn).text(onceOff.toFixed(2));
			$(trTotal).eq(monthlyColumn).text(monthly.toFixed(2));  	
		},
		
		recalculateHardwareTotal = function(tbody, subtotalColumn) {
			var total = 0;
			$(tbody).find("tr:gt(0):lt(-1)").each(function( index ) {
				//console.log($(this).children().eq(subtotalColumn).text());
				total += parseFloat( $(this).children().eq(subtotalColumn).text());
			});
			
			$(tbody).find("tr.a-cart-total").children().eq(subtotalColumn).text(total.toFixed(2));
		},
		
		udpateHardwareAmount = function(id, amount) {
		  	
		  	var item = findInArray(shoppingItems.hardwares, "id", id);
		  	if(item) {
		  		item.amount = amount;
		  	}
		},
		
		validateProduct = function(product) {
			
			var result = "",
				require, count, charge;
			
			if(!product) return "";
			
			if(!product.hasOwnProperty("charges") || !product.hasOwnProperty("requires")) return product.display + " setting error, please contact alltel support!";
			
			for(var i = 0, count = product.requires.length; i < count; i ++ ) {
				require = product.requires[i];
				if(!findInArray(product.charges, "type", require)) {
					charge = findInArray(chargeType, "id", require)
					result += charge ? product.display + " needs " + charge.type : "charge type " + require + " is wrong! Please contact allte support";  
				}
			}
			
			return result;
		},
		
		removeProductCharge = function(charge) {
			var item = findInArray(shoppingItems.products, "sId", charge.shoppingId);
			
			if(item) {
				removeInArray(item.charges, "id", charge.chargeId);
			}
		},
		
		removeProduct = function(id) {
			removeInArray(shoppingItems.products, "sId", id);
		},
		  
		removeHardware = function(id) {
			//console.log(shoppingItems.hardwares);
			removeInArray(shoppingItems.hardwares, "id", id);
			//console.log(shoppingItems.hardwares); 	
		},
		  
		/* keep simple, do not extend product
		extend = function(target, opts) {
			var next;
			
			for(next in opts) {
				
				if(next == "product" || next == "charge") continue;
				
				if(Object.prototype.hasOwnProperty.call(opts, next)) {
					target[next] = opts[next];
				}
			}
			
			return target;
		},*/
		
		aCart = function(options) {
						
			/*
			if(typeof options === 'object') {
				return aCart.extend(settings,options);
			}*/
			
			
			$.extend(settings, options);
			
			//console.log(settings);
			
			linkClass = settings.linkClass;
		
			trollerId = settings.trollerId;
			
			fromAddress = settings.sourceAddress;
			
			aCart.init();
		};
		
		
		$.extend(aCart, {
			
			/*
			each: function(array, callback){
				
			},
			
			find: function(id) {
				
			},
			
			
			items: function() {
				
			},
			
			has: function(item) {
				
			},
			*/
			empty: function(){
				shoppingItems = { products: [], hardwares: []};
				aCart.update();
				aCart.save();
			},
			
			update: function() {
				var count = getShoppingItemCount();
				$("#" + trollerId).find('span.a-cart-trolley-amount').text("(" + count + ")");
				var shoppingCart = document.getElementById(SHOPPINGCARTID);
				if(shoppingCart) {
					if(count > 0) {
					 aCart.show();
					} else { 
					  
					  $("#" + trollerId).removeClass("a-cart-clicked");
					  $("#" + SHOPPINGCARTID).remove();
					  
					}
				}
			},
			
			init: function() {
				
				aCart.load();
				aCart.update();
				aCart.ready();
				
			},
			
			save: function() {
				//console.log(shoppingItems.hardwares.length);
				shoppingItems.lastUpdate = (new Date).getTime();
				store && store.set && store.set(STORENAME, shoppingItems);
			},
			
			show: function() {
				var products = shoppingItems.products,
				    hardwares = shoppingItems.hardwares,
				
					//var body = $("<div id=\"testid\">this is a test</div>").appendTo('body');
					body = $("<div>")
							.attr("id",SHOPPINGCARTID)
							.addClass("a-cart-details"),
					onceOff = 0,
					monthly = 0,
					width = $("#" + trollerId).outerWidth(),
			 		height = $("#" + trollerId).outerHeight(),
			 		position = $("#" + trollerId).position(),
			 		right = $(window).width() - (position.left + width),
			 		top = position.top + height,
			 		amountDropdown = $("<select />").addClass("a-cart-amount-dropdown"),
			 		hasItem = false,
					tbody, product, charge, hardware, productCharges, shoppingCart, remoteForm;
				
				for(var i = 1; i <= 50; i++) {
					$('<option />', { value: i, text: i}).appendTo(amountDropdown);	
				}
				
				
				
				if(products.length > 0) {
					
					var tbody = $("<tbody>")
							.append(
								$("<tr>")
									.append($("<th>").text("Product"))
									.append($("<th>").text("Once Off"))
									.append($("<th>").text("Monthly"))
									.append($("<th>").text(" ")));
					
					//console.log(products.length);
					for(var i = 0, count = products.length; i < count; i++){
						$(tbody).append(
								$("<tr>").addClass("a-cart-product")
									.append($("<td>").text(products[i].display))
									.append($("<td>").text(" "))
									.append($("<td>").text(" "))
									.append($("<td>").append($("<a>", {
														"href" : "#",
														"text": "Delete",
														"class": "a-cart-delete-product"
														})
														.data("shoppingId", products[i].sId))));
						
						productCharges =  products[i].charges;	
						for(var j = 0, chargeCount = productCharges.length; j < chargeCount; j++){
							$(tbody).append(
								$("<tr>").addClass("a-cart-charge")
									.append($("<td>").text(getChargeDisplay(productCharges[j])))
									.append($("<td>").text(productCharges[j].onceOff.toFixed(2)))
									.append($("<td>").text(productCharges[j].monthly.toFixed(2)))
									.append($("<td>").append($("<a>",{
														"href": "#",
														"text": "Delete",
														"class": "a-cart-delete-charge"
														})
														.data("id", {"shoppingId": products[i].sId, "chargeId": productCharges[j].id}))));
							onceOff += productCharges[j].onceOff;
							monthly += productCharges[j].monthly;
						}	
							
					}
					
					$(tbody).append(
								$("<tr>").addClass("a-cart-total")
									.append($("<td>").append($("<span>").text("Total")))
									.append($("<td>").text(onceOff.toFixed(2)))
									.append($("<td>").text(monthly.toFixed(2)))
									.append($("<td>").text(" "))
							);
					$(body).append($("<table>")
										.addClass("a-cart-product")
										.attr("id", SHOPPINGCARTID)
										.append(tbody));	
					hasItem = true;
				}
				
				if(hardwares.length > 0) {
					
					tbody = $("<tbody>")
							.append(
								$("<tr>")
									.append($("<th>").text("Hardware"))
									.append($("<th>").text("Price"))
									.append($("<th>").text("Qty"))
									.append($("<th>").text("Subtotal"))
									.append($("<th>").text(" "))
							),
					onceOff = 0,
					product;
					
					
					for(var i = 0, count = hardwares.length; i < count ; i++){
						$(tbody).append(
								$("<tr>")
									.append($("<td>").text(hardwares[i].name))
									.append($("<td>").text(hardwares[i].price.toFixed(2)))
									.append($("<td>").append($(amountDropdown).clone().val(hardwares[i].amount)))
									.append($("<td>").text((hardwares[i].amount * hardwares[i].price).toFixed(2)))
									.append($("<td>")
											.append($("<a>", {
														 "href": "#",
														 "text": "Delete",
														"class": "a-cart-delete-hardware"
													  })
													  .data("hardwareId",  hardwares[i].id)
													))
							);
							
							onceOff += hardwares[i].amount * hardwares[i].price;		
					}
					
					$(tbody).append(
								$("<tr>").addClass("a-cart-total")
									.append($("<td>").append($("<span>").text("Total")))
									.append($("<td>").text(" "))
									.append($("<td>").text(" "))
									.append($("<td>").text(onceOff.toFixed(2)))
									.append($("<td>").text(" ")))
					
					$(body).append($("<table>").addClass("a-cart-hardware").append(tbody))
					
					hasItem = true;	
				}
				
				shoppingCart = document.getElementById(SHOPPINGCARTID);
				if(shoppingCart) {
					shoppingCart.parentNode.removeChild(shoppingCart);
				}
				
				if(hasItem) {
					
					remoteForm = $("<form />", {
							"name": FORMNAME,
							"method": "POST",
							"action": FORMACTION,
							"target": "_blank"
						})
						.append(
							$("<input />",{
								"id": FORMDATAID,
								"type": "hidden"
							})
						)
						.append(
							$("<input/>",{
							"id": SUBMITID,
							"type": "button",
							"value": "Submit",
							"class": "a-cart-submit"
						}));
					
					$(body).append(remoteForm);
					
					$(body).appendTo('body')
			 		   .css({
			 			  top: top,
			 			  right: right
			 			})
			 		.fadeIn(350);	
				}
				
				
			},
			
			//Load shopping item from Local Storage
			load: function() {
				shoppingItems = (store && store.get && store.get(STORENAME)) || { products: [], hardwares: [], lastUpdate: (new Date).getTime()};
				
				//console.log(shoppingItems.products.length);
				
				if(shoppingItems.products.length > 0 || shoppingItems.hardwares.length > 0){
					//console.log(shoppingItems.lastUpdate);
					var diff = (new Date).getTime() -  shoppingItems.lastUpdate;
					//console.log(diff);
					
					if(diff/3600000 > STORGEDURATION) {
						shoppingItems = { products: [], hardwares: [], lastUpdate: (new Date).getTime()};
					}
				}
			},
			
			validate: function() {
				
				var result = "",
					count, product;
				
				if(shoppingItems.products && shoppingItems.products.length > 0){
					for(var i = 0, count = shoppingItems.products.length; i < count; i++){
						result += validateProduct(shoppingItems.products[i]);
					}
						
				}
				
				return result;
			},
						
			checkout: function() {
				var validate = aCart.validate(); 
				if(validate.length > 0) {
					alert(validate);
				} else {
					$('#' + FORMDATAID).val({"From" : fromAddress, "data" : shoppingItems });	
					$('#' + SUBMITID).parent().submit();
					aCart.empty();
				}
				
				//submit to remote server
			},
			
			ready: function() {
					
					//submit button
					$(document).on("click", "#" + SUBMITID, function(){
						aCart.checkout();
					});
					
					//add link action
					//console.log("ready:" + linkClass);
					//console.log(settings.linkClass);
					$("." + linkClass).on("click", function() {
						addItemToShoppingCart($.parseJSON($(this).attr("data")));
						aCart.update();
						aCart.save();
						return false;
					});
					
					//show hide shopping cart
					$("#" + trollerId).click(function(e) {
						$("#" + trollerId).toggleClass("a-cart-clicked");	
						var shoppingCart = document.getElementById(SHOPPINGCARTID);
						if(shoppingCart == undefined) {
							aCart.show();
						} else {
							shoppingCart.parentNode.removeChild(shoppingCart);
						}
							
					});
					
					//delete product
					$(document).on("click", "a.a-cart-delete-product", function() {
						var that = this,
						  data = $(that).data(),
						  tr = $(that).parent().parent(),
						  nextTrs = $(tr).nextUntil(".a-cart-product, .a-cart-total"),
						  tbody = $(tr).parent(),
						  trs;
						  
						 removeProduct(data.shoppingId);
						 
						 $(tr).remove();
						 $(nextTrs).remove();
						 
						 trs = $(tbody).children();
						 
						 if(trs.length > 2) {
							recalculateProductTotal(tbody, 1, 2);
						 } else {
							$(tbody).parent().remove();	
						 }
						 
						 aCart.update();
						 
						 aCart.save();
						 
						 return false;
					});
					
					//delete charge
					$(document).on("click", "a.a-cart-delete-charge", function() {
						var that = this,
						  data = $(that).data(),
						  tr = $(that).parent().parent(),
						  prevTr = $(tr).prev(),
						  nextTr = $(tr).next(),
						  product = $(tr).prev('.a-cart-product'),
						  tbody = $(tr).parent(),
						  trs;
						 
						 removeProductCharge(data.id);
						  
						 $(tr).remove();
						 				 
						 
						 //console.log($(prevTr).hasClass("a-cart-charge"));
						 //console.log($(nextTr).hasClass("a-cart-charge"));
						  
						 if($(prevTr).hasClass("a-cart-charge") || $(nextTr).hasClass("a-cart-charge")) {
						 	recalculateProductTotal(tbody, 1, 2);
						 } else {
						 	
						 	$(product).remove();
						 	removeProduct(data.id.shoppingId);
						 	trs = $(tbody).children()
						 	
						 	if(trs.length > 2) {
								recalculateProductTotal(tbody, 1, 2);
							} else {
								$(tbody).parent().remove();	
							}
							
							aCart.update();
						 }
						 
						 aCart.save();
						 
						 return false;
					});
					
					//udpate hardware
					$(document).on("change", "select.a-cart-amount-dropdown", function() {
						var that = this,
						 amount = $(that).val(),
						 td = $(that).parent(),
						 data = $(td).next().next().find("a").data(),
						 price = $(td).prev().text();
						
						udpateHardwareAmount(data.hardwareId, amount);
						
						$(td).next().text((amount * parseFloat(price)).toFixed(2));
						
						recalculateHardwareTotal($(td).parent().parent(), 3);
						
						aCart.save();
						
						return false;
					});
					
					//delete hardware
					$(document).on("click", "a.a-cart-delete-hardware", function() {
						var that = this,
						 data = $(that).data(),
						 tr = $(that).parent().parent(),
						 tbody = $(tr).parent(),
						 trs = $(tbody).children();
						
						$(tr).remove();
						
						removeHardware(data.hardwareId);
						
						if(trs.length > 2) {
							recalculateHardwareTotal(tbody, 3);
						} else {
							$(tbody).parent().remove();	
						}
						
						aCart.update();
						
						aCart.save();
						
						return false;
					});
			}
			
		});
		
		
				
		
		/* using jQuery extend instead
		aCart.extend = function(target, opts) {
			var next;
			
			if(typeof opts == typeof undefined) {
				opts = target;
				target = aCart;
			}
			
			
			for(next in opts) {
				if(Object.prototype.hasOwnProperty.call(opts, next)) {
					target[next] = opts[next];
				}
			}
			
			return target;
		}
		*/
		
		return aCart;
	}
	
	window.aCart = generateACart();
	
	//window.aCart.init();

})(window, document );