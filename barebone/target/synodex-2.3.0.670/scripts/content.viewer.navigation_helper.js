/* 
File: content.viewer.navigation_helper.js
Responsible for navigation of pages from the LHS.

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp> 
- Step 2 LHS - <step2_popup.jsp> 

*****

Function: document.ready()
Add event handler to elements.

Page Actions:
- Step 1 LHS Document Ready
- Step 2 LHS Document Ready

Handlers:
- Goto Dropdown

Called Functions:
- <dateToMillisHandler(date)>
- <thumbnailClickHandler(pageId, pageDomId)>

*/
$(document).ready(function () {
	// Set event handlers
	$('#goto').change(function(c) {	
		// Get the value from the Go To dropdown.
		var gotoValue = $('#goto').val();

		switch(gotoValue) {
			case 'last_complete':
				// Get the last completed page from the case object.
				var lastCompletedPageId;
				var lastCompletedDomId = 0;
				var lastCompletedDate = new Date( dateToMillisHandler("01/01/1900") );
				
				for (i=0; i < objCase.pages.length; i++) {
					if (objCase.pages[i].completed == 'true' || objCase.pages[i].completed == true) {
						currentCompletedDate = new Date(objCase.pages[i].completedTimestamp);
						if (currentCompletedDate > lastCompletedDate) {
							lastCompletedPageId = objCase.pages[i].id;
							lastCompletedDomId = i;
							lastCompletedDomId++;
							lastCompletedDate = objCase.pages[i].completedTimestamp;
						}
						
					}
				}
				
				//alert("PageId: " + firstUnprocessedJsonId + " DOM: " + firstUnprocessedDomId);
				
				// Make sure a page was found.  If not, display a message. 
				if (lastCompletedDomId != 0) {
					// Activate the page.
					window.opener.thumbnailClickHandler(lastCompletedPageId, lastCompletedDomId);
				} else {
					alert("There are no completed pages.");
				}
				
				// Set the Go To option list back to the default state.
				$('#goto').val('');
				
				break;
			case 'first_not_complete':
				// Get the first page from the case object that is not completed/deleted.
				var firstUnprocessedPageId;
				var firstUnprocessedDomId = 0;
				for (i=0; i < objCase.pages.length; i++) {
					if (objCase.pages[i].completed != 'true' && objCase.pages[i].completed != true && objCase.pages[i].deleted != 'true' && objCase.pages[i].deleted != true && firstUnprocessedDomId == 0) {
						firstUnprocessedPageId = objCase.pages[i].id;
						firstUnprocessedDomId = i;
						firstUnprocessedDomId++;
					}
				}
				
				//alert("PageId: " + firstUnprocessedJsonId + " DOM: " + firstUnprocessedDomId);
				
				// Make sure a page was found.  If not, display a message. 
				if (firstUnprocessedDomId != 0) {
					// Activate the page.
					window.opener.thumbnailClickHandler(firstUnprocessedPageId, firstUnprocessedDomId);
				} else {
					alert("There are no unprocessed pages.");
				}
				
				// Set the Go To option list back to the default state.
				$('#goto').val('');
				
				break;
			case 'first_suspend_note':
				// Get the first page from the case object that is not completed/deleted.
				var firstSuspendedPageId;
				var firstSuspendedDomId = 0;
				var suspendNote;
				for (i=0; i < objCase.pages.length; i++) {
					suspendNote = objCase.pages[i].suspendNote;
					if (suspendNote != '' && suspendNote != null && firstSuspendedDomId == 0) {
						firstSuspendedPageId = objCase.pages[i].id;
						firstSuspendedDomId = i;
						firstSuspendedDomId++;
					}
				}
				
				//alert("PageId: " + firstSuspendedPageId + " DOM: " + firstSuspendedDomId);
				
				// Make sure a page was found.  If not, display a message. 
				if (firstSuspendedDomId != 0) {
					// Activate the page.
					window.opener.thumbnailClickHandler(firstSuspendedPageId, firstSuspendedDomId);
				} else {
					alert("There are no suspended pages.");
				}
				
				// Set the Go To option list back to the default state.
				$('#goto').val('');
				
				break;
			case 'last_suspend_note':
				// Get the first page from the case object that is not completed/deleted.
				var lastSuspendedPageId = 0;
				var lastSuspendedDomId = 0;
				var suspendNote;
				for (i=0; i < objCase.pages.length; i++) {
					suspendNote = objCase.pages[i].suspendNote;
					if (suspendNote != '' && suspendNote != null && objCase.pages[i].id > lastSuspendedPageId) {
						lastSuspendedPageId = objCase.pages[i].id;
						lastSuspendedDomId = i;
						lastSuspendedDomId++;
					}
				}
				
				//alert("PageId: " + firstSuspendedPageId + " DOM: " + firstSuspendedDomId);
				
				// Make sure a page was found.  If not, display a message. 
				if (lastSuspendedDomId != 0) {
					// Activate the page.
					window.opener.thumbnailClickHandler(lastSuspendedPageId, lastSuspendedDomId);
				} else {
					alert("There are no suspended pages.");
				}
				
				// Set the Go To option list back to the default state.
				$('#goto').val('');
				
				break;
		}
	});
});

/*
Function: changeContent(direction)
Move to the previous or next thumbnail.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 1 LHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey
- Step 1 LHS Next/Prev Navigation Button Click
*/
function changeContent(direction) {
	window.opener.changeContent(direction);
}

/*
Function: changeDocument(direction)
Move to the first page of the previous or next document.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 2 LHS Prev Document/Next Document Button Click
*/
function changeDocument(direction) {
	window.opener.changeDocument(direction);
}

/*
Function: changePage(direction)
Move to the previous or next page of the current document.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 2 LHS Prev Page/Next Page Button Click
- Step 2 LHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey
*/
function changePage(direction) {
	window.opener.changePage(direction);
}

/*
Function: updatePageCount()
Update the total page count in step 1.

Page Actions:
- Step 1 LHS Document Ready
- Step 1 RHS Update Metadata
- Step 2 RHS Update Metadata
*/
function updatePageCount() {
	// Calculate and display the total pages that are not excluded.
	var thumbnailCounter = 0;
	// Loop through the pages.
	for (i=0; i < window.opener.objCase.pages.length; i++) {
		// Only increment the page counter if the page is not deleted.
		if (window.opener.objCase.pages[i].deleted != 'true' && window.opener.objCase.pages[i].deleted != true) {
			thumbnailCounter++;
		}
	}
	// Set the display
	$("#sweep_l_header_total_thumbnails").html( thumbnailCounter );
}

/*
Function: updateDocumentCount()
Update the total document count in step 2.

Page Actions:
- Step 2 LHS Document Ready
*/
function updateDocumentCount() {
	// Calculate and display the total documents.
	var documentCounter = 0;
	// Loop through the pages.
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].subDocumentOrder > documentCounter && objCase.pages[i].subDocumentOrder != 9999 && objCase.pages[i].subDocumentOrder != '9999') {
			documentCounter = objCase.pages[i].subDocumentOrder;
		}
	}
	$("#sweep_l_header_total_documents").html( documentCounter );
}

/*
Function: updateDocumentPageCount()
Update the total page count for the active document in step 2.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updateDocumentPageCount() {
	// Calculate and display the total pages that are not excluded.
	var pageCounter = 0;
	// Loop through the pages.
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].subDocumentOrder == objPage.subDocumentOrder && objCase.pages[i].subDocumentOrder != 9999 && objCase.pages[i].subDocumentOrder != '9999') {
			pageCounter++;
		}
	}
	$("#sweep_l_header_total_pages").html( pageCounter );
}

/*
Function: updateActivePageNumber()
Update the current page number in step 1 LHS.

Page Actions:
- Step 1 LHS Load Content Viewer
- Step 1 RHS Update Metadata
*/
function updateActivePageNumber() {
	$("#sweep_l_header_active_thumbnail").html( window.opener.activePageSeqId );
}

/*
Function: updateActiveDocumentNumber()
Update the current document number in step 2 LHS.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updateActiveDocumentNumber() {
	var activeSubDocumentOrder = 0;
	if (objPage.subDocumentOrder != 9999 && objPage.subDocumentOrder != '9999') {
		activeSubDocumentOrder = objPage.subDocumentOrder;
	}
	$("#sweep_l_header_active_document").html( activeSubDocumentOrder );
}

/*
Function: updateActiveDocumentPageNumber()
Update the current page number in step 2 LHS.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updateActiveDocumentPageNumber() {
	$("#sweep_l_header_active_page").html( objPage.subDocumentPageNumber );
}

/*
Function: updateActiveDocumentPageFinalNumber()
Update the current page final number in step 2 LHS.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updateActiveDocumentPageFinalNumber() {
  var finalPageNumber = objPage.finalPageNumber;
  if(finalPageNumber!= null  && finalPageNumber != 0 && finalPageNumber != ""){
    $('#finalPageNumberDiv').show();
    $('#finalPg').html(objPage.finalPageNumber);
  }  
  else
    $('#finalPageNumberDiv').hide();  
}

/*
Function: updateActiveDocumentPageDocDateAndType()
Update the current page Doc number  and Doc type for all steps on header of full pageview screen 
*/
function updateActiveDocumentPageDocDateAndType(){
  var docDate = objPage.documentDate;
  var docType = objPage._docType.name;
  if(docDate != null && docDate != "")
      docDate = millisToDateHandler(docDate);
  else
      docDate = "-"
  if(docType == null && docType != "")
      docType = "-"
  
  $('#docDate').html(docDate);
  $('#docType').html(docType);
  
}

/*
Function: updateDocumentControls()
Enables and disables the document controls in step 2.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updateDocumentControls() {
	// Loop through and count the documents.
	var documentCounter = 0;
	var initialDocumentNumber = 0;
	var finalDocumentNumber = 0;
	for (var i = 0; i < objCase.pages.length; i++) { 
		if(step == 2){
		initialDocumentNumber = objCase.pages[0].subDocumentOrder;
		finalDocumentNumber = objCase.pages[objCase.pages.length-1].subDocumentOrder;
		}
		if (objCase.pages[i].subDocumentOrder > documentCounter && objCase.pages[i].subDocumentOrder != 9999 && objCase.pages[i].subDocumentOrder != '9999') {
			documentCounter = objCase.pages[i].subDocumentOrder;
		}
	}
	if(step == 1){
	if (documentCounter == 1 || documentCounter == 0) {
		// #Only
		$("#nav_prev_document").attr('disabled','disabled');
		$("#nav_next_document").attr('disabled','disabled');
	} else if (objPage.subDocumentOrder == 1) {
		// #First
		$("#nav_prev_document").attr('disabled','disabled');
		$("#nav_next_document").removeAttr('disabled');
	} else if (objPage.subDocumentOrder == documentCounter) {
		// #Last
		$("#nav_prev_document").removeAttr('disabled');
		$("#nav_next_document").attr('disabled','disabled');
	} else {
		// #Middle
		$("#nav_prev_document").removeAttr('disabled');
		$("#nav_next_document").removeAttr('disabled');
	}
	}if(step == 2){
		if (initialDocumentNumber == objPage.subDocumentOrder) {
			// #Only
			$("#nav_prev_document").attr('disabled','disabled');
			$("#nav_next_document").removeAttr('disabled');
			//$("#nav_next_document").attr('disabled','disabled');
		} else if (finalDocumentNumber == objPage.subDocumentOrder) {
			// #First
			//$("#nav_prev_document").attr('disabled','disabled');
			//$("#nav_next_document").removeAttr('disabled');
			$("#nav_next_document").attr('disabled','disabled');
			$("#nav_prev_document").removeAttr('disabled');
		} else {
			// #Middle
			$("#nav_prev_document").removeAttr('disabled');
			$("#nav_next_document").removeAttr('disabled');
		}
	}
}

/*
Function: updatePageControls()
Enables and disables the page controls in step 2.

Page Actions:
- Step 2 LHS Load Content Viewer
*/
function updatePageControls() {
	// Loop through and count the active document pages.
	var pageCounter = 0;
	var lastPageIndex = 0;		//Get the last pages index position for a document
	for (var i = 0; i < objCase.pages.length; i++) { 
		if (objCase.pages[i].subDocumentOrder == objPage.subDocumentOrder && objPage.subDocumentOrder != 9999 && objPage.subDocumentOrder != '9999') {
			pageCounter++;
			lastPageIndex = i;
		} 
	}
	
	var lastPageNumber = objCase.pages[lastPageIndex].subDocumentPageNumber;
	
	if (pageCounter == 1 || pageCounter == 0) {
		// #Only
		$("#nav_prev_page").attr('disabled','disabled');
		$("#nav_next_page").attr('disabled','disabled');
	} else if (objPage.subDocumentPageNumber == 1) {
		// #First
		$("#nav_prev_page").attr('disabled','disabled');
		$("#nav_next_page").removeAttr('disabled');
	} else if (objPage.subDocumentPageNumber == lastPageNumber) {
		// #Last
		$("#nav_prev_page").removeAttr('disabled');
		$("#nav_next_page").attr('disabled','disabled');
	} else if (objPage.subDocumentOrder == 9999 || objPage.subDocumentOrder == '9999') {
		$("#nav_prev_document").attr('disabled','disabled');
		$("#nav_next_document").attr('disabled','disabled');			
	} else {
		// #Middle
		$("#nav_prev_page").removeAttr('disabled');
		$("#nav_next_page").removeAttr('disabled');
	}
}