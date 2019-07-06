/* 
File: keystroke.bindings.12.js
jQuery binding libraries are used to bind functions to hotkeys.  The 12  indicates these hotkeys are used within the Step 1 and 2 RHS window.

Project URL: 
- http://api.jquery.com/bind/

Key Bindings:
- Left Arrow - Browse Left
- Right Arrow - Browse Right
- Shift + A - Add To Last
- Shift + N - New Document
- Shift + C - Complete

Called Functions:
- <changeContent(direction)> - Browse Left/Right Only
- <addToLastHandler()> - Add To Last Only
- <newDocHandler()> - New Document Only
- <completeHandler()> - Complete Only
*/
$(document).keydown(function(e){
	var aKey = 65;
	var cKey = 67;
	var nKey = 78;
	var ekey = 69;
	var lkey = 76;
	var okey = 79;
	var hkey = 72;
	var ukey = 85;
	
	var leftKey = 37;
	var rightKey = 39;
	var shiftKey = 16;
	var numSubtractKey = 109;
	var numAddKey = 107;
	var plusKey = 187;
	var minusKey = 189;

	// Only handle if there is a selected thumbnail.
	if (activePageDomId && qsStageId != 49) {
		//alert(e.keyCode);
	    if (e.keyCode == leftKey) { // LEFT ARROW = BROWSE LEFT
	    	// Only go to the previous page if this is not the first non-deleted page.
	    	var focusId = document.activeElement.id ;
	    	var firstNonDeletedPageDomId = 0;
    		for (i=0; i < objCase.pages.length; i++) {
    			if (firstNonDeletedPageDomId == 0 && objCase.pages[i].deleted != true) {
    				firstNonDeletedPageDomId = i+1;
    			}
    		}
    		if(step == 1 && focusId != 'datepicker'){
	    	if (activePageDomId != firstNonDeletedPageDomId) {
		    	changeContent('prev');
		    	return false;
	    	}}
    		if(step == 2 && selectedSectionNumber==undefined){
    	    	if (activePageDomId != firstNonDeletedPageDomId) {
    		    	changeContent('prev');
    		    	return false;
    	    	}}
    		if (focusId == 'datepicker' && (qsStageId == 4 || qsStageId == 5) && (e.keyCode == leftKey || e.keyCode ==rightKey )){
    			moveKey(e.keyCode);
    			return false;
    	    }
	    	//Default behaviour for left key in DataPoint popup form active elements (i.e. transcription/dataDate/status).
			if(selectedSectionNumber!="" && selectedSectionNumber!=null){
				moveKey(leftKey);
				return false;
			}
			
	    } else if (e.keyCode == rightKey) { // RIGHT ARROW = BROWSE RIGHT
	    	// Only go to the next page if this is not the last non-deleted page.
	    	var focusId = document.activeElement.id ;
	    	var lastNonDeletedPageDomId = 0;
    		for (i=0; i < objCase.pages.length; i++) {
    			if (objCase.pages[i].deleted != true) {
    				lastNonDeletedPageDomId = i;
    			}
    		}
    		
    		// Convert from the Json Id to the Dom Id
    		lastNonDeletedPageDomId++; 
    		if(step == 1 && focusId != 'datepicker'){
	    	if (activePageDomId != lastNonDeletedPageDomId) {
	    		changeContent('next');
	        	return false;
	    	}}
    		if(step == 2 && selectedSectionNumber==undefined){
    	    	if (activePageDomId != lastNonDeletedPageDomId) {
    	    		changeContent('next');
    	        	return false;
    	    	}}
    		if (focusId == 'datepicker' && (qsStageId == 4 || qsStageId == 5) && (e.keyCode == leftKey || e.keyCode ==rightKey )){
    			moveKey(e.keyCode);
    			return false;
    	    }
	    	//Default behaviour for Right key in DataPoint popup form active elements (i.e. transcription/dataDate/status).
			if(selectedSectionNumber!="" && selectedSectionNumber!=null){
				moveKey(e.keyCode);
				return false;
			}
	    } else if (e.shiftKey && e.keyCode == aKey && step==1) { // SHIFT+A = ADD TO LAST
	    	// Only allow an Add to Last if the Add to Last button is enabled.
	    	if ($('#add_to_last').attr('disabled') != 'disabled') {
	    		addToLastHandler();
	    	}
	    } else if (e.shiftKey && e.keyCode == nKey && step==1) { // SHIFT+N = NEW DOCUMENT
	    	if ($('#new_doc').attr('disabled') != 'disabled') {
	    		newDocHandler();
	    	}
	    } else if (e.ctrlKey){ // CTRL + or CTRL -  = Browser Zooming
			// Will not allow the User to work  for Ctrl + or Ctrl - as Browser Zoom
			if (e.keyCode == numAddKey || e.keyCode == plusKey)	{
				return false;
			}else if(e.keyCode == numSubtractKey || e.keyCode == minusKey){	
				return false;
			}
		}
	// if Thumbnail (RHS) popup window not open yet    
	    else if (e.ctrlKey){ // CTRL + or CTRL -  = Browser Zooming
		// will not allow the user to work Ctrl+ / Ctrl- as Browser Zoom
		if (e.keyCode == numAddKey || e.keyCode == plusKey)	{
			return false;
		}else if(e.keyCode == numSubtractKey || e.keyCode == minusKey){	
			return false;
		}
	   }else if (e.altKey) { 
			//if(e.keyCode == ekey ){
			if(e.keyCode == ekey ){
				usePageResetDate();
				return false;
			}if (e.keyCode == lkey){
				$('#datepicker').attr('value',lastdate);
					return false;
		    }if(e.keyCode==okey){// For ALT + O // Reopen
	    		completeHandler();
	    		return false;
	    	}if(e.keyCode==hkey){// For ALT + H // suspend
	    		if($('#suspend').html() == 'Suspend')
	    		$('#suspend').click();
	    		return false;
	    	}if(e.keyCode==ukey){// For ALT + u // unsuspend
	    		if($('#suspend').html() == 'Unsuspend')
		    		$('#suspend').click();
		    		return false;
		    }if(e.keyCode==cKey){ // For ALT + C // Complete
	   	   // Only allow a complete if the complete button is enabled.
	    	if ($('#complete').attr('disabled') != 'disabled') {
	    		completeHandler();
	    		return false;
	    	}
   	        }
			
	    }
	}
	if ((activePageDomId && qsStageId == 49) && (e.keyCode == leftKey || e.keyCode ==rightKey )){
		if($('#data_point_transcript').css('display') == 'block'){
			moveKey(e.keyCode);
			return false;
		}
	}
	if ((qsStageId == 7 || qsStageId == 50 || qsStageId == 48) && (e.keyCode == leftKey || e.keyCode ==rightKey )){
			moveKey(e.keyCode);
			return false;
	}
});

/*
Function: checkSpecialCharacters(event)

Usage: This function is used to prevent the special characters  entered by Users for transcrition field of Step 2 TR

Key Bindings:
- Shift Key 
- Special Characters Keys

Parameters:
event - key pressed by user

Page Actions:
- Step 2 TR


function checkSpecialCharacters(e) {
	var keynum;
    var keychar;
    
    keynum=e.keyCode;
    keychar = String.fromCharCode(keynum);
    
    //List of special characters you want to restrict
    if (keychar == "'" || keychar == "`" || keychar =="!" || keychar =="@" || keychar =="#" || keychar =="$" || keychar =="%" || keychar =="^" || keychar =="&" || keychar =="*" || keychar =="(" || keychar ==")" || keychar =="-" || keychar =="_" || keychar =="+" || keychar =="=" || keychar =="/" || keychar =="~" || keychar =="<" || keychar ==">" || keychar =="," || keychar ==";" || keychar ==":" || keychar =="|" || keychar =="?" || keychar =="{" || keychar =="}" || keychar =="[" || keychar =="]" || keychar =="¬" || keychar =="£" || keychar =='"' || keychar =="\\") {
        return false;
    } else {
        return true;
    }
}
*/
$(document).keydown(function(e) {
	if (e.keyCode == 18) { altDown = false; }
});

/*
Function: moveKey(keyPressed)

Key Bindings:
- Left Arrow - Browse Left
- Right Arrow - Browse Right

Parameters:
keyPressed - key pressed by user(leftKey/RightKey)

Page Actions:
- Step 2 Completion/Step 2 TR

*/
function moveKey(keyPressed){
	var leftKey = 37;
	var rightKey = 39;

	var dpFormElementObj  = $(document.activeElement);
	objName = dpFormElementObj[0].id;
		iCaretPos = dpFormElementObj[0].selectionStart;
		dpFormElementObj[0].focus();
		if(keyPressed == leftKey){
			dpFormElementObj[0].setSelectionRange(--iCaretPos,iCaretPos);
		}else if(keyPressed == rightKey){
			dpFormElementObj[0].setSelectionRange(++iCaretPos,iCaretPos);
		}	
}	