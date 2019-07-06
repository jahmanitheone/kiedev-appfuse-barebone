/* 
File: keystroke.bindings.step2tr.js
jQuery binding libraries are used to bind functions to hotkeys.  The 12  indicates these hotkeys are used within the Step 1 and 2 RHS window.

Project URL: 
- http://api.jquery.com/bind/

Key Bindings:
- ESC - Cancal the transcript popup
- Enter - Save Transcript

Called Functions:
- <cancelDataPointsTranscript()> - Cancel the popup
- <saveDataPointTranscript()> - Save the entered transcript in step2 TR 
- <closeDPEntryPopup()> - Close the popup dpentry form on step2-op and step2-op2 
- <closeCodeDescriptionPopUp()> - Close the Code description popUp in Page View, Category Viw and Section DP List and Step2 TR.
*/
$(document).keydown(function(e){
	var escKey = 27;		// Key code for ESC
	var enterKey = 13;     // Key code for Enter
	var sKey = 83;         // key code for S
	var cKey = 67;        // key code for C   
	

	if (dplistEntriy) {
	    if (e.keyCode == escKey) { 
	    	if(qsStageId == 49){
	    		cancelDataPointsTranscript();
	    		closeCodeDescriptionPopUp();
	    	}
	      	return false;
	    }else if (e.altKey){
	    	 if(e.keyCode == sKey){
    		 saveDataPointTranscript();
    		 return false;
    		 }
	    	 if(e.keyCode == cKey && qsStageId == 49){
	    		 cancelDataPointsTranscript();
	    		 return false;
	    		 }
    	 
	   }
    }
	if (medicalCodes && $('#dp_code_section_page_change').css('display') == 'block'){
		if(qsStageId == 6 || qsStageId == 48 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71) {    //IWN-382: 3-way split of Step-2-OP
			if (e.keyCode == escKey) {
				closeDPEntryPopup();
				return false;
			}
			if (e.keyCode == enterKey){
				saveDPEntryPopupData();
				return false;
			}
	    }
	}
});

/*$(document).keydown(function(e) {
	if (e.keyCode == 18) { altDown = false; }
});*/