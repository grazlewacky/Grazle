/* 

   __________  ___ _____   __    ______
  / ____/ __ \/   /__  /  / /   / ____/
 / / __/ /_/ / /| | / /  / /   / __/   
/ /_/ / _, _/ ___ |/ /__/ /___/ /___   
\____/_/ |_/_/  |_/____/_____/_____/                                          
    __  __     __                   ___ __                         
   / / / /__  / /___  ___  _____   / (_) /_  _________ ________  __
  / /_/ / _ \/ / __ \/ _ \/ ___/  / / / __ \/ ___/ __ `/ ___/ / / /
 / __  /  __/ / /_/ /  __/ /     / / / /_/ / /  / /_/ / /  / /_/ / 
/_/ /_/\___/_/ .___/\___/_/     /_/_/_.___/_/   \__,_/_/   \__, /  
            /_/                                           /____/   


	Updated October 2019
	Doesn't support IE8
	

	TO IMPORT SINGLE FUNCTIONS:
	import {$first} from "./modules/grazle"; 
	
	TO USE IN SITU:
	const firstDiv = $first('div'); 


	OR...


	TO IMPORT ALL FUNCTIONS:
	import * as g from "./modules/grazle"; 

	TO USE IN SITU:
	const firstDiv = g.$first('div');
	...etc


	Add to it and change it to make it yours.





	LIST OF FUNCTIONS
	
	===========
	SELECTING
	===========
	$first
	$id
	$className
	$tagName
	
	$isElementPresent
	$containsChild

	===========
	TRAVERSING 
	===========
	$parentsUntil
	$getSiblings
	$getNextSiblings
	$getPreviousSiblings
	$containsText


	=============
	MANIPULATION
	=============
	$wrap


	=============
	ATTRIBUTES
	=============
	$hasClass
	$addClass
	$removeClass
	$toggleClass



	=============
	STYLES
	=============
	$style
	$css
	$offset
	$getOffset
	$scrollTop
	$getHeight
	$outerWidth
	$outerHeight
	$innerWidth
	$innerHeight
	$marginLeft	
	$marginRight
	$marginTop
	$marginBottom
	$paddingLeft	
	$paddingRight
	$paddingTop
	$paddingBottom
	$borderWidth
	$borderLeftWidth
	$borderRightWidth
	$borderTopWidth
	$borderBottomWidth
	$windowWidthtrim
	$windowHeight
	$documentHeight

	=======
	AJAX
	=======
	$getCORS
	$getAjax
	$postAjax
	$serializeArray
	$serialize

	=========
	EVENTS
	=========
	$getMousePosition
	$live
	$addEvent
	$removeEvent
	$triggerEvent

	======================
	ANIMATION AND EFFECTS
	======================
	$fadeOut
	$fadeIn
	$fadeTo
	$show
	$hide
	$toggle
	$scrollTo(location, duration)

	
	===========
	UTILITIES
	===========
	$isNumeric
	$isEmptyObject
	$isPlainObject
	$mergeExtend
	$type
	$merge
	$parseHTML


	*/
	





///////////////////////////////////
/// SELECTING
///////////////////////////////////


	// Select the first match only
	export function $first(selector) {
		return document.querySelector(selector);
	}


	// Select a list of matching elements, context is optional
	export function $(selector) {
		return document.querySelectorAll(selector);
	}

	//Get element by ID
	export function $id(selector) {
	    return document.getElementById(selector);
	}

	//Get element by class name
	export function $className(selector) {
	    return document.getElementsByClassName(selector);
	}

	//Get element by tag name
	export function $tagName(selector) {
	    return document.getElementsByTagName(selector);
	}


	//Test for element (.length in jquery)
	export function $isElementPresent(el){
		return typeof(el)!='undefined'&&el!=null;
	}
	//Alternative: document.body.contains(el)

	export function $containsChild (el, child){
		return el !== child && el.contains(child);
	}

	




///////////////////////////////////
/// TRAVERSING
///////////////////////////////////


	export function $parentsUntil(el, selector, filter) {
		const result = [];
		const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
		
		// match start from parent
		el = el.parentElement;

		while (el && !matchesSelector.call(el, selector)) {
			if (!filter) {
				result.push(el);
			} else {
				if (matchesSelector.call(el, filter)) {
					result.push(el);
				}
			}
			el = el.parentElement;
		}
		return result;
	}



	export function $getSiblings(el, filter) {
	    
	    let siblings = [];
	    
	    el = el.parentNode.firstChild;
	    
	    do { 
	    	if (!filter || filter(el)) siblings.push(el); 
	    } while (el = el.nextSibling);

	    return siblings;
	}


	export function $getNextSiblings(el, filter) {
	    let siblings = [];
	    while (el= el.nextSibling) { if (!filter || filter(el)) siblings.push(el); }
	    return siblings;
	}

	export function $getPreviousSiblings(el, filter) {
	    let siblings = [];
	    while (el = el.previousSibling) { if (!filter || filter(el)) siblings.push(el); }
	    return siblings;
	}


	// Contains Text
	export function $containsText(selector, text) {
		var elements = document.querySelectorAll(selector);
		return Array.from(elements).filter(function(element) {
			return RegExp(text).test(element.textContent);
		});
	}


///////////////////////////////////
/// MANIPLUATION
///////////////////////////////////
	
	export function $wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	}



///////////////////////////////////
/// ATTRIBUTES
///////////////////////////////////

	//ALTERNATIVE: classList.add(), classList.remove() and classList.contains()

	export function $hasClass(el, className) {
	    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
	}

	export function $addClass(el, className) {
	    if (el.classList) el.classList.add(className);
	    else if (!hasClass(el, className)) el.className += ' ' + className;
	}

	export function $removeClass(el, className) {
	    if (el.classList) el.classList.remove(className);
	    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
	}
	

	export function $toggleClass(el, className){
		
		let elHasClass = $hasClass(el, className);
		
		console.log('elHasClass',elHasClass);
		
		if (!elHasClass){
			$addClass(el, className);
		} else if(elHasClass){
			$removeClass(el, className);
		}

	}




///////////////////////////////////
/// ELEMENT STYLES
///////////////////////////////////

	
	export function $style(el){
		let current = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
		return current;
	}

	// Usage: e.g.: 
	//g.$css(anchor, { 'color': 'green', 'border-radius': '5px'});
	export function $css(el, styles) {
	    for (let property in styles)
	        el.style[property] = styles[property];
	}


	// e.g.
	// let anchorOffset = offset(anchor);
	// console.log(anchorOffset.left, anchorOffset.top);
	export function $offset(el) {
	    let rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}

	export function $getOffset(el) {//Another method
		const box = el.getBoundingClientRect();
		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		};
	}

	export function $scrollTop(){
		return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	}


	export function $getHeight(el) {
		const styles = window.getComputedStyle(el);
		const height = el.offsetHeight;
		const borderTopWidth = parseFloat(styles.borderTopWidth);
		const borderBottomWidth = parseFloat(styles.borderBottomWidth);
		const paddingTop = parseFloat(styles.paddingTop);
		const paddingBottom = parseFloat(styles.paddingBottom);
		return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
	}


	export function $outerWidth (el){
		return el.offsetWidth;
	}
	export function $outerHeight (el){
		return el.offsetHeight;
	}

	export function $innerWidth (el){
		return el.clientWidth;
	}
	export function $innerHeight (el){
		return el.clientHeight;
	}




	export function $marginLeft(el){
		return parseInt($style(el).marginLeft) || 0;	
	}
	export function $marginRight(el){
		return parseInt($style(el).marginRight) || 0;	
	}
	export function $marginTop(el){
		return parseInt($style(el).marginTop) || 0;	
	}
	export function $marginBottom(el){
		return parseInt($style(el).marginBottom) || 0;	
	}



	export function $paddingLeft(el){
		return parseInt($style(el).paddingLeft) || 0;	
	}
	export function $paddingRight(el){
		return parseInt($style(el).paddingRight) || 0;	
	}
	export function $paddingTop(el){
		return parseInt($style(el).paddingTop) || 0;	
	}
	export function $paddingBottom(el){
		return parseInt($style(el).paddingBottom) || 0;	
	}


	export function $borderWidth(el){
		return parseInt($style(el).border) || 0;	
	}
	export function $borderLeftWidth(el){
		return parseInt($style(el).borderLeftWidth) || 0;	
	}
	export function $borderRightWidth(el){
		return parseInt($style(el).borderRightWidth) || 0;	
	}
	export function $borderTopWidth(el){
		return parseInt($style(el).borderTopWidth) || 0;	
	}
	export function $borderBottomWidth(el){
		return parseInt($style(el).borderBottomWidth) || 0;	
	}



	export function $windowWidth(){
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}

	export function $windowHeight(){
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}


	export function $documentHeight(){
		const body = document.body;
		const html = document.documentElement;
		const height = Math.max(
			body.offsetHeight,
			body.scrollHeight,
			html.clientHeight,
			html.offsetHeight,
			html.scrollHeight
		);
		return height;
	}




///////////////////////////////////
/// AJAX
//////////////////////////////////

	export function $getCORS(url, success) {
	    let xhr = new XMLHttpRequest();
	    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
	    xhr.open('GET', url);
	    xhr.onload = success;
	    xhr.send();
	    return xhr;
	}


	export function $getAjax(url, success) {
	    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	    xhr.open('GET', url);
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send();
	    return xhr;
	}



	export 	function postAjax(url, data, success) {
	    let params = typeof data == 'string' ? data : Object.keys(data).map(
	    	function(k){ 
	    		return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
	    	}
	    	).join('&');

	    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	    xhr.open('POST', url);
	    xhr.onreadystatechange = function() {
	        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
	    };
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    xhr.send(params);
	    return xhr;
	}


	export function $serializeArray(form) {
	    let field, l, s = [];
	    if (typeof form == 'object' && form.nodeName == "FORM") {
	        let len = form.elements.length;
	        for (let i=0; i<len; i++) {
	            field = form.elements[i];
	            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
	                if (field.type == 'select-multiple') {
	                    l = form.elements[i].options.length; 
	                    for (j=0; j<l; j++) {
	                        if(field.options[j].selected)
	                            s[s.length] = { name: field.name, value: field.options[j].value };
	                    }
	                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
	                    s[s.length] = { name: field.name, value: field.value };
	                }
	            }
	        }
	    }
	    return s;
	}



	export function $serialize(form) {
	    let field, l, s = [];
	    if (typeof form == 'object' && form.nodeName == "FORM") {
	        let len = form.elements.length;
	        for (let i=0; i<len; i++) {
	            field = form.elements[i];
	            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
	                if (field.type == 'select-multiple') {
	                    l = form.elements[i].options.length; 
	                    for (let j=0; j<l; j++) {
	                        if(field.options[j].selected)
	                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
	                    }
	                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
	                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
	                }
	            }
	        }
	    }
	    return s.join('&').replace(/%20/g, '+');
	}



///////////////////////////////////
/// BINDING AND UNBINDING EVENTS
//////////////////////////////////


	export function $getMousePosition(e) {
	    e = e || window.event;

	    let pageX = e.pageX;
	    let pageY = e.pageY;

	    // IE 8
	    if (pageX === undefined) {
	        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	    }

	    console.log(pageX, pageY);
	}


	//add event
	function addEvent(el, type, handler) {
	    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
	}

	export function $live(selector, event, callback, context) {
	    addEvent(context || document, event, function(e) {
	        let qs = (context || document).querySelectorAll(selector);
	        if (qs) {
	            let el = e.target || e.srcElement, index = -1;
	            while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) el = el.parentElement;
	            if (index > -1) callback.call(el, e);
	        }
	    });
	}



	export function $addEvent(el, type, handler) {
	    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
	}

	export function $removeEvent(el, type, handler) {
	    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
	}


	export function $triggerEvent(el, type){
	   if ('createEvent' in document) {
	        // modern browsers, IE9+
	        let e = document.createEvent('HTMLEvents');
	        e.initEvent(type, false, true);
	        el.dispatchEvent(e);
	    } else {
	        // IE 8
	        let e = document.createEventObject();
	        e.eventType = type;
	        el.fireEvent('on'+e.eventType, e);
	    }
	}





///////////////////////////////////
/// ANIMATION AND EFFECTS
//////////////////////////////////
	
	// first add raf shim
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();


	//NEITHER OF THE FOLLOWING ARE RECOMMENDED APPROACHES.
	//REALLY IT'S BETTER TO USE CSS3 TRANSITIONS AND ADD / REMOVE TO ACTIVATE/DEACTIVATE	
	export function $fadeOut(el, duration) {
	    let s = el.style, step = 25/(duration || 300);
	    s.opacity = s.opacity || 1;
	    (function fade() { (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25); })();
	}

	export function $fadeIn(el, duration, display) {
	    let s = el.style, step = 25/(duration || 300);
	    s.opacity = s.opacity || 0;
	    s.display = display || "block";
	    (function fade() { 
	    	(s.opacity = parseFloat(s.opacity)+step) > 1 ? s.opacity = 1 : setTimeout(fade, 25); }
	    )();
	}

	
	export function $fadeTo(el, time, opacityVal){
		el.style.transition = 'opacity '+time+'s';
		el.style.opacity = opacityVal;
	}


	function _showHide(el, show) {
		if (typeof el === 'string') el = document.querySelectorAll(el);
		const els = (el instanceof NodeList) ? [].slice.call(el) : [el];
		let display;
		const values = [];
		if (els.length === 0) {
		  return;
		}
		els.forEach((e, index) => {
		  if (e.style) {
		    display = e.style.display;
		    if (show) {
		      if (display === 'none') {
		        values[index] = getAmDisplay(e) || '';
		      }
		    } else {
		      if (display !== 'none') {
		        values[index] = 'none';
		        setAmDisplay(e, display);
		      }
		    }
		  }
		});

		els.forEach((e, index) => {
		  if ( values[index] !== null ) {
		    els[index].style.display = values[index];
		  }
		});
	}


	export function $show(elements) {
		this._showHide(elements, true);
	}

	export function $hide(elements) {
		this._showHide(elements, false);
	}

	export function $toggle(element) {
		if (element.style.display === 'none') {
		  this.show(element);
		} else {
		  this.hide(element);
		}
	}



/////////////////
/// UTILITIES
/////////////////

	export function $isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}


	export function $isEmptyObject(obj) {
		return Object.keys(obj).length === 0;
	}


	export function $isPlainObject(obj) {
		if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
			return false;
		}
		if (obj.constructor &&
			!Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
			return false;
		}
			return true;
	}


	export function $mergeExtend(object1, object2){
		return Object.assign({}, object1, object2);
	}
	//result:
	// const obj1 = [1,2,3];
	// const obj2 = ['a','b','c'];
	// const mergedObj = $mergeExtend(obj1, obj2);
	//{0: "a", 1: "b", 2: "c"}


	export function $type(item) {
		const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
		return Object.prototype.toString.call(item)
		.replace(reTypeOf, '$1')
		.toLowerCase();
	}


	// // ES6-way, doesn't remove duplicate items
	//array1 = [...array1, ...array2]
	// Set version, does remove duplicate items
	export function $merge(...args) {//Removes duplicates
		return Array.from(new Set([].concat(...args)))
	}


	export function $parseHTML(html) {
		var t = document.createElement('template');
		t.innerHTML = html;
		return t.content.cloneNode(true);
	}

















