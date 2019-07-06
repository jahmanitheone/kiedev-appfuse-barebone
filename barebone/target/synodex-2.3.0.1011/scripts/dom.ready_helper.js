/* 
File: dom.ready_helper.js
Responsible for element action handlers.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>

*****

Function: completeHandler()
Handles the completion/uncompletion of a page.

Page Actions:
- Step 1 LHS Shift+C Hotkey
- Step 1 RHS Shift+C Hotkey
- Step 1 RHS Complete Button Click
- Step 1 RHS Uncomplete Button Click
- Step 2 LHS Shift+C Hotkey
- Step 2 RHS Shift+C Hotkey
- Step 2 RHS Complete Button Click
- Step 2 RHS Uncomplete Button Click

Called Functions:
- <finishStepConfirm()>
- <hideDocTypes()> - Complete True Only
- <showDocTypes()> - Complete False Only
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>
*/
function completeHandler() {
	
	var isAnySuspendedPage = false;
	processedPagesCount = 0;
	var userNotification = false;
	var isAnyDocumentDateNull = false;

	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].completed == true || objCase.pages[i].completed == 'true' || objCase.pages[i].deleted == true || objCase.pages[i].deleted == 'true') {
			processedPagesCount++;
		}
		if(objCase.pages[i].suspendNote != null && objCase.pages[i].suspendNote != ''){
		      isAnySuspendedPage = true;
		}
		//IWO-22: Unable to complete page or case if Excluded pages don't have document date
		if((objCase.pages[i].documentDate == null || objCase.pages[i].documentDate == 'null') && objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
			isAnyDocumentDateNull = true;
		}
	}
	// Check if this is the last processed page and there is no suspended page in a file.  If yes, alert the user.
	if (processedPagesCount == objCase.pages.length - 1 && $('#complete').html() == 'Complete' && step == 1 && isAnySuspendedPage != true && isAnyDocumentDateNull !=true) {
		if(step == 1 ){
			$('#completeStep').attr("disabled", false);
		}
       //IWN-230-Case/Step "Complete" button should appear as grayed-out/inactive
		/*
		else if(step == 1 && qsStageId == 4){
					var r = finishStepConfirm();
				}*/
		
	}
	// Check if this is the last processed page and if there is any suspended page in a file.  If yes, alert the user.
	if (processedPagesCount == objCase.pages.length - 1 && $('#complete').html() == 'Complete' && step == 1 && isAnySuspendedPage == true) {
		userNotification = true;
		alert("Some pages are incomplete/ suspended/ unprocessed");
	}
	// Check if this is the last processed page and if there is any documentDate is null or blank in a file.  If yes, alert the user.
	if (processedPagesCount == objCase.pages.length - 1 && $('#complete').html() == 'Complete' && step == 1 && isAnyDocumentDateNull == true) {
		userNotification = true;
		alert("Some pages do not have documentDate, So Before Completing the page, Document Date should be filled");
	}
	if(processedPagesCount == objCase.pages.length && $('#complete').html() == 'Reopen' && step == 1){
	//IWN-230-Case/Step "Complete" button should appear as grayed-out/inactive
		if(step == 1){
			$('#completeStep').attr("disabled", true);
		}
	}

	if ( userNotification != true) {
        // Get the active page object.
        updatedPage = objCase.pages[activePageJsonId];

        // Override the completed value and update the case object.
        if ($('#complete').html() == 'Complete') {
        	if(updatedPage.documentDate !=null && updatedPage.documentDate!='null'){
        	updatedPage.completed = true;
        	objCase.pages[activePageJsonId].completed = true;

        	// Set the completed date.  We do not need to handle US/UN conversion with the completed date as it will not be displayed.
        	var completedDate = new Date();
        	var completedMillis = Date.parse(completedDate);
        	objCase.pages[activePageJsonId].completedTimestamp = completedMillis;

        	validateCompletedPageOrder();
        	
        	$('.rotateleft' + activePageId).css('display','none');
        	$('.rotateright' + activePageId).css('display','none');
        	}
        	// Hide Doc Type selections.
        	if(updatedPage.documentDate !=null && updatedPage.documentDate!='null')
            hideDocTypes();
        } else {
        	updatedPage.completed = false;
        	objCase.pages[activePageJsonId].completed = false;

        	// Change the completed date back to default.
        	var completedDate = new Date('1900-01-01');
        	var completedMillis = Date.parse(completedDate);
        	objCase.pages[activePageJsonId].completedTimestamp = completedMillis;

        	$('.rotateleft' + activePageId).css('display','block');
        	$('.rotateright' + activePageId).css('display','block');

        	// Display Doc Type selections.
        	if(updatedPage.documentDate ==null || updatedPage.documentDate=='null')
        		$('#datepicker').attr("disabled",false);
            showDocTypes();
        }
        
        if(updatedPage.documentDate !=null && updatedPage.documentDate!='null'){
        // Update the page.
        updatePage(updatedPage, false, 0);
        // Update the metadata panel. 
     	updateMetadataPanel(activePageId);
        }else{
        alert("Document date can not be blank,So Before Completing the page Document Date should be filled.");}
	}
}

/*
Function: addToLastHandler()
Handles the Add to Last action. 

Page Actions:
- Step 1 LHS Shift+A Hotkey
- Step 1 RHS Shift+A Hotkey
- Step 1 RHS Add To Last Button Click
- Step 2 LHS Shift+A Hotkey
- Step 2 RHS Shift+A Hotkey
- Step 2 RHS Add To Last Button Click

Called Functions:
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>
- <thumbnailClickHandler(pageId, pageDomId)> - Step 2 Only
*/
function addToLastHandler() {
	// Retrieve the previous page and doucment number and increment.
	var documentNumber = prevDocumentNumber;
	var pageNumber = prevPageNumber + 1;

	// Update the global document and page number variables.
	prevDocumentNumber = documentNumber;
	prevPageNumber = pageNumber;

	// Retrieve the active page object.
	var updatedPage = objCase.pages[activePageJsonId];

	// Override the page and document numbering values.
	updatedPage.subDocumentOrder = documentNumber;
	updatedPage.subDocumentPageNumber = pageNumber;
	
	// Find the parent page in the document and copy the doc type id and doc date values to the new page.
	var prevDocTypeId;
	var prevDocDate;
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].subDocumentOrder == documentNumber && (objCase.pages[i].subDocumentPageNumber == 1 && objCase.pages[i].subDocumentPageNumber == '1')) {
			prevDocTypeId = objCase.pages[i]._docType.id;
			prevDocDate = objCase.pages[i].documentDate;
		}
	}
	updatedPage._docType.id = prevDocTypeId;
	updatedPage.documentDate = prevDocDate;
	
	// Update the page.
	updatePage(updatedPage, false, 0);
	
	// Update the UI.
	// - Update document numbers
	$('#thumbnail_document_number_' + activePageId).html(documentNumber);
	$('#thumbnail_page_number_' + activePageId).html(pageNumber);
	var docDate = $('#thumbnail_doc_date_'+ documentNumber + "_" + (pageNumber-1)).html();
	var docType = $('#thumbnail_doc_type_'+ documentNumber + "_" + (pageNumber-1)).html();
	$('#thumbnail_doc_date_' + activePageId).attr("id", "thumbnail_doc_date_" + documentNumber + "_" + pageNumber);
	$('#thumbnail_doc_type_' + activePageId).attr("id", "thumbnail_doc_type_" + documentNumber + "_" + pageNumber);
	$('#thumbnail_doc_date_'+ documentNumber + "_" + pageNumber).empty().html(docDate);
	$('#thumbnail_doc_type_'+ documentNumber + "_" + pageNumber).empty().html(docType);
	// - Disable document numbering buttons
	$('#new_doc').attr("disabled","disabled");
	$('#add_to_last').attr("disabled","disabled");
	// - Enable page ordering controls
	$('#set_within_doc_first').removeAttr("disabled");
	$('#set_within_doc_last').removeAttr("disabled");
	$('#set_within_doc_prev').removeAttr("disabled");
	$('#set_within_doc_next').removeAttr("disabled");
	// - Display the complete button when all metadata has been assigned:
	// 1. Document/Page Number
	// 2. Document Date
	// 3. Document Type
	var pageDate = new Date(updatedPage.documentDate);
	var dateCompare = new Date('1900/01/01 01:00:00');
	if (updatedPage.subDocumentOrder > 0 && pageDate > dateCompare && $('#' + activePageId).data('pgDocumentTypeId') > 0) {
		$('#complete').removeAttr("disabled");
	} else {
		$('#complete').attr("disabled","disabled");
	}
	
	// Update the case object.
	objCase.pages[activePageJsonId].subDocumentOrder = documentNumber;
	objCase.pages[activePageJsonId].subDocumentPageNumber = pageNumber;

	// Update the metadata panel. 
 	updateMetadataPanel(activePageId);	
 	
 	// If we are in step 2, re-click the thumbnail so the leftWindow doc/page navigation controls are updated.
 	if (step == 2) {
 		thumbnailClickHandler(activePageId, activePageDomId);
 	}
}

/*
Function: newDocHandler()
Handles the New Document action. 

Page Actions:
- Step 1 LHS Shift+N Hotkey
- Step 1 RHS Shift+N Hotkey
- Step 1 RHS New Document Button Click
- Step 2 LHS Shift+N Hotkey
- Step 2 RHS Shift+N Hotkey
- Step 2 RHS New Document Button Click

Called Functions:
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>
- <thumbnailClickHandler(pageId, pageDomId)> - Step 2 Only
*/
function newDocHandler() {
	// Retrieve the previous doucment number and increment.
	var documentNumber;
	
	// Make sure the doc number is not 9999.  If so, set the next document to 1.  Otherwise, increment the last doc number.
	if (prevDocumentNumber == 9999 && prevDocumentNumber == '9999') {
		documentNumber = 1;
	} else {
		documentNumber = prevDocumentNumber + 1;
	}
	
	var pageNumber = 1;

	// Update the global document and page number variables.
	prevDocumentNumber = documentNumber;
	prevPageNumber = pageNumber;
	
	// Retrieve the active page object.
	var updatedPage = objCase.pages[activePageJsonId];
	
	// Override the page and document numbering values.
	updatedPage.subDocumentOrder = documentNumber;
	updatedPage.subDocumentPageNumber = pageNumber;
	
	// Update the page.
	updatePage(updatedPage, false, 0);
	
	// Update the UI.
	// - Update document numbers
	$('#thumbnail_document_number_' + activePageId).html(documentNumber);
	$('#thumbnail_page_number_' + activePageId).html(pageNumber);
	$('#thumbnail_doc_type_15449').attr("id","new_id")
	$('#thumbnail_doc_date_' + activePageId).attr("id", "thumbnail_doc_date_" + documentNumber + "_" + pageNumber);
	$('#thumbnail_doc_type_' + activePageId).attr("id", "thumbnail_doc_type_" + documentNumber + "_" + pageNumber);
	// - Disable document numbering buttons
	$('#new_doc').attr("disabled","disabled");
	$('#add_to_last').attr("disabled","disabled");
	// - Enable page ordering controls
	$('#set_within_doc_first').removeAttr("disabled");
	$('#set_within_doc_last').removeAttr("disabled");
	$('#set_within_doc_prev').removeAttr("disabled");
	$('#set_within_doc_next').removeAttr("disabled");
	// - Display the complete button when all metadata has been assigned:
	// 1. Document/Page Number
	// 2. Document Date
	// 3. Document Type
	var pageDate = new Date(millisToDateHandler(objCase.pages[activePageJsonId].documentDate));
	var dateCompare = new Date('1900/01/01 01:00:00');
	if (updatedPage.subDocumentOrder > 0 && pageDate > dateCompare && objCase.pages[activePageJsonId].documentTypeId > 0) {
		$('#complete').removeAttr("disabled");
	} else {
		$('#complete').attr("disabled","disabled");
	}

	// Update the case object.
	objCase.pages[activePageJsonId].subDocumentOrder = documentNumber;
	objCase.pages[activePageJsonId].subDocumentPageNumber = pageNumber;

	// Update the metadata panel. 
 	updateMetadataPanel(activePageId);
 	
 	// If we are in step 2, re-click the thumbnail so the leftWindow doc/page navigation controls are updated.
 	if (step == 2) {
 		thumbnailClickHandler(activePageId, activePageDomId);
 	}
}

/*
Function: document.ready()
Set the datatime in footer, display the thumbnails and sets additional handlers for button elements.

Page Actions:
- Step 1 RHS Document Ready
- Step 2 RHS Document Ready

Handlers:
- Data Date
- Bad Handwriting
- Complete
- Suspend
- New Document
- Add to Last
- Set Within Doc First
- Set Within Doc Last
- Set Within Doc Next
- Set Within Doc Prev

Called Functions:
- <datetime()>
- <displayThumbnails()>
- <dateToMillisHandler(date)> - Data Date Handler
- <updatePage(page, boolSort, activeDocumentOrder)> - Data Date Handler No Document Number Only
- <updatePages(pages, boolSort)>  - Data Date Handler Document Number Only
- <millisToDateHandler(millis)> - Data Date Handler
- <updatePage(page, boolSort, activeDocumentOrder)> - Bad Handwriting Handler
- <updateMetadataPanel(imageId)> - Bad Handwriting Handler
- <completeHandler()> - Complete Handler
- <hideRotationControls()> - Suspend Handler Suspend Only
- <hideDocTypes()> - Suspend Handler Suspend Only
- <displayRotationControls()> - Suspend Handler Unsuspend Only
- <showDocTypes()> - Suspend Handler Unsuspend Only
- <updatePage(page, boolSort, activeDocumentOrder)> - Suspend Handler
- <updateMetadataPanel(imageId)> - Suspend Handler
- <newDocHandler()> - New Document Handler
- <addToLastHandler()> - Add To Last Handler
- <reorderPage(aryDocumentPages, oldAryPosition, newAryPosition)> - Set Within Doc First Handler
- <reorderPage(aryDocumentPages, oldAryPosition, newAryPosition)> - Set Within Doc Last Handler
- <updatePages(pages, boolSort)> - Set Within Doc Next Handler
- <updatePages(pages, boolSort)> - Set Within Doc Prev Handler
*/
$(document).ready(function () {
	// UPDATE: What does this do?
		datetime();
	
	checkCasePageNumbers();

	// Dispaly the page thumbnails.
	if(qsStageId!=49 && qsStageId!=7 && qsStageId!=48)//thumnails will not load when Stage id 49
	displayThumbnails();
	// Set metadata event handlers
	$('#datepicker').bind('keydown change', function(event) { // For IWS-260, Here it is handled both change and keydown event for datepicker
		// If its keydown event then it allow only ENTER key or TAB key OR If its change event then it allow only event type 'change'
		if (event.type == 'change' || event.keyCode == '13' || event.keyCode == '9') {
			// Ensure the date is properly formatted
		var dateCheck = checkDateFormat($('#datepicker').val());
		if (dateCheck == true) {
			// Convert the date to millis.
			newDocumentDate = dateToMillisHandler($('#datepicker').val());
			lastdate = millisToDateHandler(newDocumentDate);
			// Get the active document number.
			var activeSubDocumentOrder = objCase.pages[activePageJsonId].subDocumentOrder;

			// Only update the active page if the page does not have a document number.
			if (activeSubDocumentOrder == 9999 && activeSubDocumentOrder == '9999') {
				// Update the case object.
				objCase.pages[activePageJsonId].documentDate = newDocumentDate;

				// Update the DB without sorting.
				updatePage(objCase.pages[activePageJsonId], false, 0);
			} else {
				// Create an update array used to do a mass update of the pages.
				var aryUpdatedPages = new Array();
				var aryCounter = 0;
				
				if(filterString!="nofilter"){//if filterString doesn't contain 'nofilter' string then get all document for a case
				//for change all pages within the same document.-IWN-514
				var objCaseDocDate;
				sortStringDocDate = 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc';
				filterStringDocDate =  'nofilter';
				$.ajax({
					url: "sortcases/" + caseId + "/" + sortStringDocDate + "/" + filterStringDocDate +"/"+ qsStageId ,
					async: false,
					success: function(c){
						objCaseDocDate =c;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						// Display an error dialog.
						// Datetime
						// User Name
						// Session Id
						// Case Id
						// Stage
						// Javascript Function
						// Error Message
						dateTime = $('#datetime').html();
						userName = $('#userName').html();
						sessionId = $('#sessionId').html();
						displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
					}
				});		
				//change all pages within the same document.-IWN-514
				
				
				// Loop through the pages and change all pages within the same document.
                for (i=0; i < objCaseDocDate.pages.length; i++) {
                    if (objCaseDocDate.pages[i].subDocumentOrder == activeSubDocumentOrder) {
                        // Add the updated page to the update array.
                        aryUpdatedPages[aryCounter] = { id:objCaseDocDate.pages[i].id,documentDate:newDocumentDate };
                        aryCounter++;

                        // Update the case object.
                        objCaseDocDate.pages[i].documentDate = newDocumentDate;
                        //objCase.pages[activePageJsonId].documentDate = newDocumentDate;
                        
                        //Update the document date in thumbnail footer on step-1 
                        $('#thumbnail_doc_date_' + activeSubDocumentOrder + '_' + objCaseDocDate.pages[i].subDocumentPageNumber).html(lastdate);
                    }
                 }
				}else{
				// Loop through the pages and change all pages within the same document.
                for (i=0; i < objCase.pages.length; i++) {
                    if (objCase.pages[i].subDocumentOrder == activeSubDocumentOrder) {
                        // Add the updated page to the update array.
                        aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id,documentDate:newDocumentDate };
                        aryCounter++;

                        // Update the case object.
                        objCase.pages[i].documentDate = newDocumentDate;
                        //objCase.pages[activePageJsonId].documentDate = newDocumentDate;
                        
                        //Update the document date in thumbnail footer on step-1 
                        $('#thumbnail_doc_date_' + activeSubDocumentOrder + '_' + objCase.pages[i].subDocumentPageNumber).html(lastdate);
                    }
                }
            }
				

				// Update the DB and sort the pages.
				updatePages(aryUpdatedPages, false);
			}

			// Update the metadata panel. 
			updateMetadataPanel(activePageId);
		} else {
			// Default the date to the current time so there are no calendar issues.
			var defaultDate = new Date();
			defaultDate = Date.parse(defaultDate);
			defaultDate = millisToDateHandler(defaultDate);
			$('#datepicker').val('');
			$('#datepicker').focus();
		}
		}
	});
	$('#bad_handwriting').change(function(c) {
		// Get the active page object.
		updatedPage = objCase.pages[activePageJsonId];

		// Override the bad handwriting parameter and update the case object.
		if ($('#bad_handwriting').attr('checked') == 'checked') {
			updatedPage.isBadHandwriting = true;
			objCase.pages[activePageJsonId].isBadHandwriting = true;
		} else {
			updatedPage.isBadHandwriting = false;
			objCase.pages[activePageJsonId].isBadHandwriting = false;
		}

		// Update the page.
		updatePage(updatedPage, false, 0);

		// Update the metadata panel. 
		updateMetadataPanel(activePageId);	
	});
	$('#complete').click(function(c) {
		completeHandler();
	});
	$('#suspend').click(function(c){ 
		if ($('#suspend').html() == 'Suspend') {
			// Get the suspend note from the user.
			var note = prompt("Enter Suspend Note");
			// Make sure the suspend note is not empty.
			if (note!=null && note!="") {
				// Get the active page object.
				updatedPage = objCase.pages[activePageJsonId];

				// Set field equal to the note.
				updatedPage.suspendNote = note;
				updatedPage.completed = false;

				// Remove the right page rotation controls
				$('#rotateleft' + activePageId).css('display','none');
				$('#rotateright' + activePageId).css('display','none');

				// If the popup window is open remove the rotation controls.
				if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
					leftWindow.hideRotationControls();
				}

				// Add yellow transparency to image.
				$('#thumb' + activePageId).css('background-color','yellow');
				$('#' + activePageId).css('opacity','.75');
				$('#' + activePageId).css('filter','alpha(opacity=75)');

				// Hide Doc Type selections.
				hideDocTypes();

				// Update the page.
				updatePage(updatedPage, false, 0);

				// Update the case object.
				objCase.pages[activePageJsonId].suspendNote = note;
				objCase.pages[activePageJsonId].completed = true;
			}
		} else {
			// Get the active page object.
			updatedPage = objCase.pages[activePageJsonId];

			// Set field equal to the note.
			updatedPage.suspendNote = "";
			updatedPage.completed = false;

			// Display the rotation controls
			$('.rotateleft' + activePageId).css('display','block');
			$('.rotateright' + activePageId).css('display','block');

			// If the popup window is open display the rotation controls.
			if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
				leftWindow.displayRotationControls();
			}

			// Remove yellow transparency from image.
			$('#thumb' + activePageId).css('background-color','');
			$('#' + activePageId).css('opacity','1');
			$('#' + activePageId).css('filter','alpha(opacity=100)');

			// Display Doc Type selections.
			showDocTypes();

			// Update the page.
			updatePage(updatedPage, false, 0);

			// Update the case object.
			objCase.pages[activePageJsonId].suspendNote = "";
			objCase.pages[activePageJsonId].completed = false;
		}

		// Update the metadata panel. 
		updateMetadataPanel(activePageId);	
	});
	$('#new_doc').click(function(c){ 
		newDocHandler();
	});
	$('#add_to_last').click(function(c){ 
		addToLastHandler();
	});
	$('#set_within_doc_first').click(function(c){ 
		// Get the active page id and numbers
		var pgId = activePageId;
		var pgAryIndex = activePageJsonId;
		var pgSubDocumentPageNumber = objCase.pages[pgAryIndex].subDocumentPageNumber;

		// Loop through the case array. 
		var aryDocumentPages = new Array();
		var oldPosition;
		var pageDocumentCounter = 0;
		for (var i = 0; i < objCase.pages.length; i++) {
			// Store the similar document pages to an array.
			if (objCase.pages[i].subDocumentOrder == objCase.pages[pgAryIndex].subDocumentOrder) {
				aryDocumentPages[pageDocumentCounter] = objCase.pages[i];

				// If this is the active id set the page array number instead of the case array number.
				if (objCase.pages[i].id == pgId) {
					oldPosition = pageDocumentCounter;
				}

				pageDocumentCounter++;
			}
		}

		newPosition = 0;

		reorderPage(aryDocumentPages, oldPosition, newPosition); // document pages array, old array position, new array position
	});
	$('#set_within_doc_last').click(function(c){ 
		// Get the active page id and numbers
		var pgId = activePageId;
		var pgAryIndex = activePageJsonId;
		var pgSubDocumentPageNumber = objCase.pages[pgAryIndex].subDocumentPageNumber;

		// Loop through the case array. 
		var aryDocumentPages = new Array();
		var oldPosition;
		var pageDocumentCounter = 0;
		for (var i = 0; i < objCase.pages.length; i++) {
			// Store the similar document pages to an array.
			if (objCase.pages[i].subDocumentOrder == objCase.pages[pgAryIndex].subDocumentOrder) {
				aryDocumentPages[pageDocumentCounter] = objCase.pages[i];

				// If this is the active id set the page array number instead of the case array number.
				if (objCase.pages[i].id == pgId) {
					oldPosition = pageDocumentCounter;
				}

				pageDocumentCounter++;
			}
		}

		newPosition = aryDocumentPages.length - 1;

		reorderPage(aryDocumentPages, oldPosition, newPosition); // document pages array, old array position, new array position
	});
	$('#set_within_doc_prev').click(function(c) { 
		// Get the active page id and numbers
		var pgId = activePageId;
		var pgAryIndex = activePageJsonId;
		//alert(pgAryIndex);
		var pgSubDocumentPageNumber = objCase.pages[pgAryIndex].subDocumentPageNumber;

		// Get the swapping page id and numbers.
		var nextPageDomId = activePageDomId;
		nextPageDomId--;

		var pgIdSwap = ($('#global_thumbnail_wrapper').children("div:nth-child(" + nextPageDomId + ")").children().children().attr('id'));
		var pgAryIndexSwap;
		// Get the swap page object.
		for (var i = 0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].id == pgIdSwap) {
				pgAryIndexSwap = i;
			} 
		}
		//alert(pgIdSwap + " " + pgAryIndexSwap);
		var pgSubDocumentPageNumberSwap = objCase.pages[pgAryIndexSwap].subDocumentPageNumber;

		// Update the case object.
		objCase.pages[pgAryIndex].subDocumentPageNumber = pgSubDocumentPageNumberSwap;

		// Create an update array used to do a mass update of the paegs.
		var aryUpdatedPages = new Array();

		// Add the original page to the update array.
		aryUpdatedPages[0] = { id:objCase.pages[pgAryIndex].id,subDocumentPageNumber:pgSubDocumentPageNumberSwap };

		// Update the swap case object.
		objCase.pages[pgAryIndexSwap].subDocumentPageNumber = pgSubDocumentPageNumber;

		// Add the swap page to the update array.
		aryUpdatedPages[1] = { id:objCase.pages[pgAryIndexSwap].id,subDocumentPageNumber:pgSubDocumentPageNumber };

		// Update the activePageDomId global variable.
		activePageDomId = nextPageDomId;

		// Update the DB and sort the pages.
		updatePages(aryUpdatedPages, true);
	});
	$('#set_within_doc_next').click(function(c){ 
		// Get the active page id and numbers
		var pgId = activePageId;
		var pgAryIndex = activePageJsonId;
		var pgSubDocumentPageNumber = objCase.pages[pgAryIndex].subDocumentPageNumber;

		// Get the swapping page id and numbers.
		var nextPageDomId = activePageDomId;
		nextPageDomId++;

		var pgIdSwap = ($('#global_thumbnail_wrapper').children("div:nth-child(" + nextPageDomId + ")").children().children().attr('id'));
		var pgAryIndexSwap;
		// Get the swap page object.
		for (var i = 0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].id == pgIdSwap) {
				pgAryIndexSwap = i;
			} 
		}
		var pgSubDocumentPageNumberSwap = objCase.pages[pgAryIndexSwap].subDocumentPageNumber;

		// Update the case object.
		objCase.pages[pgAryIndex].subDocumentPageNumber = pgSubDocumentPageNumberSwap;

		// Create an update array used to do a mass update of the paegs.
		var aryUpdatedPages = new Array();

		// Add the original page to the update array.
		aryUpdatedPages[0] = { id:objCase.pages[pgAryIndex].id,subDocumentPageNumber:pgSubDocumentPageNumberSwap };

		// Update the swap case object.
		objCase.pages[pgAryIndexSwap].subDocumentPageNumber = pgSubDocumentPageNumber;

		// Add the swap page to the update array.
		aryUpdatedPages[1] = { id:objCase.pages[pgAryIndexSwap].id,subDocumentPageNumber:pgSubDocumentPageNumber };

		// Update the activePageDomId global variable.
		activePageDomId = nextPageDomId;

		// Update the DB and sort the pages.
		updatePages(aryUpdatedPages, true);
	});
});


/*
Function: validateCompletedPageOrder()
IWS-269: Page number gets set to 0 in Step 2 Fix

Page Actions:
- Step 1 Completion
- Step 2 Completion

Called Functions:
- <getPageOrderObject(pageid)>
*/
function validateCompletedPageOrder()
{
	if (pageordervalidateobj !=null)
	{
		for (var j=0; j<objCase.pages.length; j++)
		{
			tmppage = getCompletedPageOrderObject(objCase.pages[j].id)
			if (tmppage != null && tmppage.finalPageNumber != null && objCase.pages[j].finalPageNumber != null) {
				if (tmppage.finalPageNumber!=objCase.pages[j].finalPageNumber) {
					objCase.pages[j].finalPageNumber = tmppage.finalPageNumber;
				}
			}
		}	
	}

}

/*
Function: getCompletePageOrderObject()
IWS-269: Page number gets set to 0 in Step 2 Fix

Parameters:
pageid - the page id

Page Actions:
- Step 1 Completion
- Step 2 Completion

*/
function getCompletedPageOrderObject(pageid)
{
	for (var j=0; j< pageordervalidateobj.length; j++)
		if (pageid==pageordervalidateobj[j].id)
			return pageordervalidateobj[j];
	
	return null;
}

