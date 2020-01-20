# Grazle
Helper library with jQuery-like tools/function for javascript projects

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
