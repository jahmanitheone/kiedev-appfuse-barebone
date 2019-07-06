/* 
File: keystroke.bindings.1.popup.js
jQuery binding libraries are used to bind functions to hotkeys.  The 1 popup indicates these hotkeys are used within the Step 1 LHS window.

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
$(document).keydown(function(e) {
	var aKey = 65;
	var cKey = 67;
	var nKey = 78;
	
	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;
	var shiftKey = 16;
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
    }
    else if (e.keyCode == homeKey) { // Home Key 
      // Will reset the image to center of Map-ViewPort
      $('#map-1').css({marginLeft: "0px"});
      $('#map-1').css({marginTop: "0px"});
      return false;
    }else if (e.keyCode == leftKey) { // LEFT ARROW = BROWSE LEFT
	    	// Only go to the previous page if the first page is not active.
	    	if ($('#nav_prev_content').attr('disabled') != 'disabled') {
	    		changeContent('prev');
	    		return false;
	    	}
	    } else if (e.keyCode == rightKey) { // RIGHT ARROW = BROWSE RIGHT
	    	// Only go to the next page if the last page is not active.
	    	if ($('#nav_next_content').attr('disabled') != 'disabled') {
	    		changeContent('next');
	        	return false;
	    	}
	    } else if (e.shiftKey && e.keyCode == aKey) { // SHIFT+A = ADD TO LAST
	    	// Only allow an Add to Last if the Add to Last button is enabled.
	    	if (window.opener.$('#add_to_last').attr('disabled') != 'disabled') {
	    		window.opener.addToLastHandler();
	    	}
	    } else if (e.shiftKey && e.keyCode == nKey) { // SHIFT+N = NEW DOCUMENT
	    	if (window.opener.$('#new_doc').attr('disabled') != 'disabled') {
	    		window.opener.newDocHandler();
	    	}
	    } else if (e.shiftKey && e.keyCode == cKey) { // SHIFT+C = COMPLETE
	    	// Only allow a complete if the complete button is enabled.
	    	if (window.opener.$('#complete').attr('disabled') != 'disabled') {
	    		window.opener.completeHandler();
	    	}
	    }
	    //IWS 213 : Added the feature of Ctrl++ / Ctrl -- zoomin/out.
	    else if (e.ctrlKey) { // Ctrl ++ and Ctrl -- = ZOOM-IN/OUT
	    	// Will allow the user to use Ctrl + / Ctrl - keys as application zoom-in/out
	    	if (e.keyCode == numAddKey || e.keyCode == plusKey)
	    		$(".sliderplus").click(); 
	    	else if(e.keyCode == numSubtractKey || e.keyCode == minusKey)	
	    		$(".sliderminus").click();
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