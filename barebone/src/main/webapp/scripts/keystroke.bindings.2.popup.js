/* 
File: keystroke.bindings.2.popup.js
jQuery binding libraries are used to bind functions to hotkeys.  The 2 popup indicates these hotkeys are used within the Step 2 LHS window.

Project URL: 
- http://api.jquery.com/bind/

Key Bindings:
- Left Arrow - Browse Left
- Right Arrow - Browse Right
- Shift + A - Add To Last
- Shift + N - New Document
- Shift + C - Complete

- <changePage(direction)> - Browse Left/Right Only
- <addToLastHandler()> - Add To Last Only
- <newDocHandler()> - New Document Only
- <completeHandler()> - Complete Only
*/

$(document).keydown(function(e) {
	var aKey = 65;
	var cKey = 67;
	var nKey = 78;
	
	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;
	var shiftKey = 16;
	var savekey =83;
	var numSubtractKey = 109;
	var numAddKey = 107;
	var plusKey = 187;
	var minusKey = 189;
	var rKey = 82;
	var lKey = 76;
	var homeKey = 36;

	// Only handle if there is a selected thumbnail.
	if (objPage) {
	  //IWS-427 : Image Micro/Macro Panning Shortcuts
	  if(e.shiftKey){ 
	    // Macro Panning    
	    if(e.altKey){
        if (e.keyCode == leftKey) { // Shift + ALt + LeftArrow
          $('#map-1').animate({marginLeft: "-=120px"}, {queue:false});
          return false;
        }else if (e.keyCode == rightKey) { // Shift + ALt + RightArrow
          $('#map-1').animate({marginLeft: "+=120px"}, {queue:false});
          return false;
        }else if (e.keyCode == upKey) { // Shift + ALt + UpArrow
          $('#map-1').animate({marginTop: "-=120px"}, {queue:false});
          return false;
        }else if (e.keyCode == downKey) { // // Shift + ALt + downArrow
          $('#map-1').animate({marginTop: "+=120px"}, {queue:false});
          return false;
        }
      }else{
        // Micro Panning
        if (e.keyCode == leftKey) { // SHIFT + leftArrow
          $('#map-1').animate({marginLeft: "-=40px"}, {queue:false});
          return false;
        }else if (e.keyCode == rightKey) { // SHIFT + RightArrow
          $('#map-1').animate({marginLeft: "+=40px"}, {queue:false});
          return false;
        }else if (e.keyCode == upKey) { // SHIFT + UpArrow
          $('#map-1').animate({marginTop: "-=40px"}, {queue:false});
          return false;
        }else if (e.keyCode == downKey) { // SHIFT + downArrow
          $('#map-1').animate({marginTop: "+=40px"}, {queue:false});
          return false;
        }
      }
    }else if (e.keyCode == homeKey) { // Home Key 
      // Will reset the image to center of Map-ViewPort
      $('#map-1').css({marginLeft: "0px"});
      $('#map-1').css({marginTop: "0px"});
      return false;
    }else if (e.keyCode == leftKey) { // LEFT ARROW = BROWSE LEFT
			//Default behaviour for left key in DataPoint popup form active elements (i.e. transcription/dataDate/status).
			if(activeDataPointSection!="" && activeDataPointSection!=null){
				moveKey(leftKey);
				return false;
			}
			// Only go to the previous page if the first page is not active.
			if ($('#nav_prev_page').attr('disabled') != 'disabled') {
				changePage('prev');
				return false;
			}
		}else if (e.keyCode == rightKey) { // RIGHT ARROW = BROWSE RIGHT
			//Default behaviour for Right key in DataPoint popup form active elements (i.e. transcription/dataDate/status).
			if(activeDataPointSection!="" && activeDataPointSection!=null){
				moveKey(rightKey);
				return false;
			}

			// Only go to the next page if the last page is not active.
			if ($('#nav_next_page').attr('disabled') != 'disabled') {
				changePage('next');
				return false;
			}
		} 
		else if (e.shiftKey && e.keyCode == aKey) { // SHIFT+A = ADD TO LAST
					// Only allow an Add to Last if the Add to Last button is enabled.
					if (window.opener.$('#add_to_last').attr('disabled') != 'disabled') {
						window.opener.addToLastHandler();
					}
				} else if (e.shiftKey && e.keyCode == nKey) { // SHIFT+N = NEW DOCUMENT
					if (window.opener.$('#new_doc').attr('disabled') != 'disabled') {
						window.opener.newDocHandler();
					}
				} 
		else if (e.ctrlKey){
			// Ctrl ++ and Ctrl -- = ZOOM-IN/OUT
			// Will allow the user to use Ctrl + / Ctrl - keys as application zoom-in/out
			if (e.keyCode == numAddKey || e.keyCode == plusKey)	{
				$(".sliderplus").click(); 
			}else if(e.keyCode == numSubtractKey || e.keyCode == minusKey){	
				$(".sliderminus").click();
			}else if (e.keyCode == savekey){
				  /*  IWS-278:This code is added for ctr+s functionality that calls saveDataPoints() after pressing ctr+s button of keyboard. */
	    		saveDataPoints("save");
	    	}
			return false;
		}
	   else if (e.altKey){  
		   if (e.keyCode == rKey){     // Alt + R Rotate Clockwise (Right) 90 degree
			   rotateImageHandler('right');
			   return false;
		   }
		   if (e.keyCode == lKey){   // Alt + L Rotate CounterClockwise (Left) 90 degree
			   rotateImageHandler('left');
			   return false;
		   }
	   }
	 }
});


    // Create a constraint div so map can't be dragged out of view.
    function createConstraint() {
      var mapWidth = $('#map-1').width();
      var mapHeight = $('#map-1').height();
      var viewport = $('#map-1').parent('.map-viewport');
      
      $('.mapz-constraint').css({
        left : -mapWidth + viewport.width(),
        top : -mapHeight + viewport.height(),
        width : 2 * mapWidth - viewport.width(),
        height : 2 * mapHeight - viewport.height()
      });
      /**
      constraint.css({
        left : -(map.width()) + viewport.width(),
        top : -(map.height()) + viewport.height(),
        width : 2 * map.width() - viewport.width(),
        height : 2 * map.height() - viewport.height()
      });
      
      // Check if map is currently out of bounds, revert to closest position if so
      if(map.position().left < constraint.position().left) map.css('left',constraint.position().left);
      if(map.position().top < constraint.position().top) map.css('top',constraint.position().top);
      **/
    }
/*
Function: moveKey(keyPressed)
IWS-274: Page number gets set to 0 in Step 2 Fix

Key Bindings:
- Left Arrow - Browse Left
- Right Arrow - Browse Right

Parameters:
keyPressed - key pressed by user(leftKey/RightKey)

Page Actions:
- Step 2 Completion

*/
function moveKey(keyPressed){
	var leftKey = 37;
	var rightKey = 39;

	var dpFormElementObj  = $(document.activeElement);
	objName = dpFormElementObj[0].id;
	if(objName=="transcription" || objName=="datepicker"){
		iCaretPos = dpFormElementObj[0].selectionStart;
		dpFormElementObj[0].focus();
		if(keyPressed == leftKey){
			dpFormElementObj[0].setSelectionRange(--iCaretPos,iCaretPos);
		}else if(keyPressed == rightKey){
			dpFormElementObj[0].setSelectionRange(++iCaretPos,iCaretPos);
		}	
	}
	

}	

