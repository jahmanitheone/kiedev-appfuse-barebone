/* 
File: page.metadata_helper.js
Responsible for step 1 and 2 page metadata actions.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>

*****

Function: updateMetadataPanel(imageId)
Update the metadata controls on the RHS and various UI elements (rotation, exclusion, etc).

Parameters:
imageId - The id of the page.

Page Actions:
- Step 1 RHS Add To Last
- Step 1 RHS New Document
- Step 1 RHS Document Date
- Step 1 RHS Bad Handwriting
- Step 1 RHS Suspend/Unsuspend
- Step 1 RHS Document Type
- Step 1 RHS Thumbnail Click
- Step 1 RHS Complete
- Step 2 RHS Add To Last
- Step 2 RHS New Document
- Step 2 RHS Document Date
- Step 2 RHS Bad Handwriting
- Step 2 RHS Suspend/Unsuspend
- Step 2 RHS Document Type
- Step 2 RHS Thumbnail Click
- Step 2 RHS Complete

Called Functions:
- <disableMetadataControls()>
- <millisToDateHandler(millis)>
- <dateToMillisHandler(date)>
- <showDocTypes()>
- <highlightDocType(id)>
- <updateFileMetrics()>
*/
function updateMetadataPanel(imageId) {
	// Gather page parameters from the case object.
	var pgBadHandwriting = false;
	var pgOriginalPageNumber = 0;
	var pgDocumentDate = 0;
	var pgSubDocumentOrder = 9999;
	var pgOrientation = 0;
	var pgDeleteReason = 0;
	var pgSuspendNote = null;
	var pgCompletedTimestamp = 0;
	var pgCompleted = false;
	var pgDeleted = false;
	var pgSubDocumentPageNumber = 0;
	var pgDocumentTypeId = true;
	if (typeof objCase.pages[activePageJsonId] != "undefined")	
	{
		pgBadHandwriting = objCase.pages[activePageJsonId].isBadHandwriting;
		pgOriginalPageNumber = objCase.pages[activePageJsonId].originalPageNumber;
		pgDocumentDate = objCase.pages[activePageJsonId].documentDate;
		pgSubDocumentOrder = objCase.pages[activePageJsonId].subDocumentOrder;
		pgOrientation = objCase.pages[activePageJsonId].orientation;
		pgDeleteReason = objCase.pages[activePageJsonId].deleteReason;
		pgSuspendNote = objCase.pages[activePageJsonId].suspendNote;
		pgCompletedTimestamp = objCase.pages[activePageJsonId].completedTimestamp;
		pgCompleted = objCase.pages[activePageJsonId].completed;
		pgDeleted = objCase.pages[activePageJsonId].deleted;
		pgSubDocumentPageNumber = objCase.pages[activePageJsonId].subDocumentPageNumber;
		pgDocumentTypeId = objCase.pages[activePageJsonId]._docType.id;
	}


	// This happens when you update the document type.
	if (!pgDocumentTypeId) {
		pgDocumentTypeId = objCase.pages[activePageJsonId]._docType;
	}
	
	// Get the doc type name based on the id.
	var docTypeName;
	if(objDocTypes!=null)
	{
		for (var i = 1; i < objDocTypes.length; i++){ 
			
			if (objDocTypes[i].documentType.id == pgDocumentTypeId) {
				docTypeName = objDocTypes[i].documentType.name;
			}
		}	
	}

	// Disbale all form controls, as we will enable necessary elements as we go.
	// This ensures we start from a level playing field every time.
	disableMetadataControls();
	$('#exclude' + imageId).attr("disabled","disabled");

	// Set default labels for the buttons that change.
	$('#suspend').html('Suspend');
	$('#complete').html('Complete');

	// Load metadata values and update corresponding controls.
	// Convert Date from Millis and display the document date.
	if(pgDocumentDate!=null){
	pgDocumentDate = millisToDateHandler(pgDocumentDate);
	$('#datepicker').attr('value', pgDocumentDate);
	}else{
		$('#datepicker').attr('value', '');
		$('#datepicker').focus();
	}
	//IWS-266 - At STEP 1, the date box provides the default date as the current date.
	// To select the date text 
	$('#datepicker').select();

	// Check if bad handwriting is true and update the checkbox value.
	if (pgBadHandwriting == true) {
		$('#bad_handwriting').attr('checked', 'checked');
	} else {
		$('#bad_handwriting').removeAttr("checked");
	}

	// First check for a Suspend Note
	if (pgSuspendNote != null && pgSuspendNote !="") {
		// #Suspended
		$('#suspend').html('Unsuspend');
		$('#suspend').removeAttr("disabled");
		$('#suspend_note').html(pgSuspendNote);
		$('#sweep_r_metadata_suspend_note').css('display','block');
		
		$('#sweep_r_metadata_doc_type_active').html('Document Type: ' + docTypeName);
		
		hideDocTypes();
	} else if (pgCompleted == true || pgCompleted == "true") { // Second check for Unsuspended and Completed
		// #Unsuspended but Completed
		$('#complete').html('Reopen');
		$('#complete').removeAttr("disabled");
		
		$('#sweep_r_metadata_doc_type_active').html('Document Type: ' + docTypeName);
		
		hideDocTypes();
	} else { // Unsuspended and uncomplete. Check the rest of the controls.
		// #Document Date
		$('#datepicker').removeAttr("disabled");

		// #Doc Numbering / Set Within Controls
		// If there is no document number, enable new doc and disable everything else.
		if (pgSubDocumentOrder == 9999 || pgSubDocumentOrder == "9999") {
			$('#new_doc').removeAttr("disabled");
			
			// If there is a previous document number enable add to last
			if (prevDocumentNumber > 0 && prevDocumentNumber != 9999 && prevDocumentNumber != '9999') {
				$('#add_to_last').removeAttr("disabled");
			}
		} else {
			// Here we know that the document has a page number.
			// Enable First and Prev controls if this is not the first page in the document.
			if (pgSubDocumentPageNumber != 1) {
				$('#set_within_doc_first').removeAttr("disabled");
				$('#set_within_doc_prev').removeAttr("disabled");
			}

			// Enable the Last and Next controls if this is not the last page in the document.
			// Loop through the pages and count the similar document pages
			pageDocumentCounter = 0; //Last page number in the document.
			// Get the page Json Id
			for (var i = 0; i < objCase.pages.length; i++) {
				if (objCase.pages[i].subDocumentOrder == pgSubDocumentOrder) {
					pageDocumentCounter = pageDocumentCounter + 1;
				} 
			}
			if (pgSubDocumentPageNumber != pageDocumentCounter) {
				$('#set_within_doc_last').removeAttr("disabled");
				$('#set_within_doc_next').removeAttr("disabled");
			}
		}

		// #Suspend
		$('#suspend').removeAttr("disabled");
		$('#sweep_r_metadata_suspend_note').css('display','none');

		// #Bad Handwriting
		$('#bad_handwriting').removeAttr("disabled");

		// #Complete
		// Only enable the complete button when all metadata has been assigned and the page is not suspended:
		// 1. Document/Page Number
		// 2. Document Date
		// 3. Document Type
		if (clientDateFormat == 'dd/mm/yyyy') {
			if(pgDocumentDate!=null){
				var pageDate = dateToMillisHandler(pgDocumentDate);
			}else{
			    var pageDate = millisToDateHandler(pgDocumentDate);
			    pageDate = dateToMillisHandler(pageDate);
			}
			var dateCompare = dateToMillisHandler('01/01/1900');
		} else {
			var pageDate = new Date(pgDocumentDate);
			var dateCompare = new Date('1900/01/01 01:00:00');
		}

		//alert(pageDate + " = " + dateCompare);
		
		if (pgSubDocumentPageNumber > 0 && pageDate > dateCompare && pgDocumentTypeId > 0) {
			$('#complete').removeAttr("disabled");
		} else {
			$('#complete').attr("disabled","disabled");
		}

		// #Doc Type
		//$('#sweep_r_metadata_doc_type').removeAttr('style');
		showDocTypes();
		
		// Highlight the doc type.
		highlightDocType(pgDocumentTypeId);

		// #Exclude
		$('#exclude' + imageId).removeAttr("disabled");
	}
	
	// If the popup window is open update the file metrics.
	if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
		// Update File Metrics
		leftWindow.updateFileMetrics();
	}
}

/*
Function: addDocumentTypes(docTypeGroup)
List the document types to the document type div.

Parameters:
docTypeGroup - The group of the doc types to be loaded.

Page Actions:
- Step 1 RHS Document Ready via Load Thumbnails
- Step 1 RHS Sort via Load Thumbnails
- Step 2 RHS Document Ready via Load Thumbnails
- Step 2 RHS Sort via Load Thumbnails
*/
function addDocumentTypes(docTypeGroup) {
	docTypeHtml = "<ul>";
	for (var i = 1; i < docTypeGroup.length; i++) {
		var docType = docTypeGroup[i].documentType;
		// Make sure there is no parent id.  If so, this is a sub document type and treat it as such.
		if (docType.parent < 0) {
			docTypeHtml += "<li id='dt-"+docType.id+"'><a style=\"cursor: pointer; font-weight: bold;\" onclick=\"updateDocType('" + docType.id + "','" + docType.name + "')\">"+docType.name+"</a></li>";

			// Loop for sub document types.
			for (var j = 1; j < docTypeGroup.length; j++) { 
				var docTypeChild = docTypeGroup[j].documentType;
				if (docTypeChild.parent == docType.id) {
					docTypeHtml += "<li id='dt-"+docTypeChild.id+"'>&nbsp;&nbsp;-- <a style=\"cursor: pointer; font-size: smaller;\" onclick=\"updateDocType('" + docTypeChild.id + "','" + docTypeChild.name + "')\">"+docTypeChild.name+"</a></li>";
				}
			}
		}
	}
	docTypeHtml += "</ul>";	
	$('#sweep_r_metadata_doc_type').append(docTypeHtml);	
	
	// Add Doc Types object to global variable for later use.
	objDocTypes = docTypeGroup;
}

/*
Function: highlightDocType(id)
Highlight a document type.

Parameters:
id - The id of the document type to be highlighted.

Page Actions:
- Step 1 RHS Document Type Select
- Step 2 RHS Document Type Select
*/
function highlightDocType(id) {
	$('li.dt-on').removeClass("dt-on");
	if (id != null){
		$('#dt-' + id).addClass("dt-on");
	}
}

/*
Function: updateDocType(docTypeID, docTypeName)
Update a pages document type based on the active selection.

Parameters:
docTypeID - The id of the the active document type.
docTypeName - The name of the active document type.

Page Actions:
- Step 1 RHS Document Type Select
- Step 2 RHS Document Type Select

Called Functions:
- <updatePage(page, boolSort, activeDocumentOrder)> - No Document Number Only
- <updatePages(pages, boolSort)> - Document Number Only
- <updateMetadataPanel(imageId)>
- <highlightDocType(id)>
*/
function updateDocType(docTypeID, docTypeName) {
	
	// Get the active document number.
	var activeSubDocumentOrder = objCase.pages[activePageJsonId].subDocumentOrder;

	// Only update the active page if the page does not have a document number.
	if (activeSubDocumentOrder == 9999 && activeSubDocumentOrder == '9999') {
		// Update the case object.
		objCase.pages[activePageJsonId]._docType.id = docTypeID;
		
		// Update the DB without sorting.
		updatePage(objCase.pages[activePageJsonId], false, 0);
	} else {
		// Create an update array used to do a mass update of the pages.
	    var aryUpdatedPages = new Array();
		var aryCounter = 0;
		
		// Loop through the pages and update all pages within the same document.
		for (i=0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].subDocumentOrder == activeSubDocumentOrder) {
				// Add the updated page to the update array.
				aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id,_docType:docTypeID };
				aryCounter++;
				
				// IWN-522 : Update the DocType in thumbnail footer 
				$('#thumbnail_doc_type_' + activeSubDocumentOrder + '_' + objCase.pages[i].subDocumentPageNumber).html(docTypeName);
				
				// Update the case object.
				objCase.pages[i]._docType.id = docTypeID;
			}
		}
		
	    // Update the DB and sort the pages.
		updatePages(aryUpdatedPages, false);
	}
	
	// Update the metadata panel. 
	updateMetadataPanel(activePageId); 
	
	// Highlight the selected.
	highlightDocType(docTypeID);
}

/*
Function: hideDocTypes()
Hide the Document Types div.

Page Actions:
- Step 1 RHS Complete
- Step 1 RHS Exclude
- Step 2 RHS Complete
- Step 2 RHS Exclude
*/
function hideDocTypes() {
	$('#sweep_r_metadata_doc_type').css('display','none');
	$('#sweep_r_metadata_doc_type_active').css('display','block');
}

/*
Function: showDocTypes()
Display the Document Types div.

Page Actions:
- Step 1 RHS Uncomplete
- Step 1 RHS Unexclude
- Step 2 RHS Uncomplete
- Step 2 RHS Unexclude
*/
function showDocTypes() {
	$('#sweep_r_metadata_doc_type').css('display','block');
	$('#sweep_r_metadata_doc_type_active').css('display','none');
}

/*
Function: updateExclude(id)
Exclude or include a page from the case.

Parameters:
id - The id of the page to be included or excluded.

Page Actions:
- Step 1 Exclude
- Step 1 Unexclude
- Step 2 Exclude
- Step 2 Unexclude

Called Functions:
- <finishStep()>
- <clearThumbnailHighlights()>
- <disableMetadataControls()>
- <clearContentViewer()>
- <processThumbnailBorder(id)>
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateActivePageNumber()>
- <updatePageCount()>
- <updateFileMetrics()>
*/
function updateExclude(id) {
	var r = true;
	
	// Get the jsp locale variables
	var messageNotExcluded = text.synodex.not_excluded_message;
	var messageInclude = '';
	//var messageInclude = text.synodex.include_message;
	//var messageExcludedCover = text.synodex.excluded_coverpage_message;
	//var messageExcludedBlank = text.synodex.excluded_blankpage_message;
	
	//var select = $('#exclude'+id+ ' option:selected');
	var value = "";
	$('#exclude'+id+ ' option:selected').each(function () 
			{value += $(this).text()});

	var pageJsonId;
	// Get the page json id
	for (var i = 0; i < objCase.pages.length; i++) { // Get and set the active page json id.
		if (objCase.pages[i].id == id) {
			pageJsonId = i;
		} 
	}

	// Get a copy of the page object.
	var updatedPage = objCase.pages[pageJsonId];

	if (value == messageNotExcluded || value == messageInclude) {
		// #Not Excluded
		updatedPage.deleted=false;
		updatedPage.deleteReason="";
		$('#thumb' + id).unblock();

		// Display the rotation controls
		$('.rotateleft' + id).css('display','block');
		$('.rotateright' + id).css('display','block');
	} else {
		// #Excluded
		
		// Check if this is the last processed page.  If yes, alert the user.
		processedPagesCount = 0;
		for (i=0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].completed == true || objCase.pages[i].completed == 'true' || objCase.pages[i].deleted == true || objCase.pages[i].deleted == 'true') {
				processedPagesCount++;
			}
		}
// IWS-345 : On completing an excluded page when incompletes exist, the case completes	
// Must press Complete button after all pages completed 
/*		if (processedPagesCount == objCase.pages.length - 1) {
			r = confirm("Once this page is marked complete the document will be released. Continue?");
			if (r == true) {
				// CODE AFTER ALL PAGES ARE PROCESSED
				finishStep();
			} else {
				excludeDropdownId = pageJsonId;
				excludeDropdownId++;
				
				// set the exclude dropdown back to 0
				$('#exclude' + excludeDropdownId).val("");
			}
		}
*/		
		if (r != false) {
			updatedPage.deleted=true;
			updatedPage.deleteReason=value;
			$('#thumb' + id).block({message: null});

			// Remove the rotation controls
			$('#rotateleft' + id).css('display','none');
			$('#rotateright' + id).css('display','none');
			
			// Clear active thumbnail if the excluded page is active
			if (id == activePageId) {
				// Clear the active thumbnail highlight
				clearThumbnailHighlights();
				
				// Set the active page global variables to 0.
				activePageDomId = 0;
				activePageId = 0;
				activePageJsonId = 0;
				activePageSeqId = 0;
				
				// Disable metadata controls.
				disableMetadataControls();
				
				if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
					// Clear the content viewer window.
					leftWindow.clearContentViewer();
				}
				// Hide all doc type controls
				$('#sweep_r_metadata_doc_type').css('display','none');
				$('#sweep_r_metadata_doc_type_active').css('display','none');
			}
		}
	}
	
	//alert("v: " + value + " mne:" + messageNotExcluded + " mi: " + messageInclude); 
	
	if (r != false) {
		// If the thumbnail is not active, update the border.
		if (id != activePageId) {
			processThumbnailBorder(id);
		}

		var activeDocumentOrder = updatedPage.subDocumentOrder;
		
		// Re-number the active document.
		//checkPageOrder(activeDocumentOrder);

		// Set the document order to 9999.
		updatedPage.subDocumentOrder = 9999;

		// Set the page number to 0.
		updatedPage.subDocumentPageNumber = 0;

		// Update the page and update the page numbers.
		updatePage(updatedPage, false, activeDocumentOrder);

		// Update the active page sequencing id. (GLOBAL)
		var pageSeqIdCounter = 0;
		for (var i = 0; i < objCase.pages.length; i++) { 
			// Do not count a page that is excluded.
			if (objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
				pageSeqIdCounter++;
				if (objCase.pages[i].id == activePageId) {
					activePageSeqId = pageSeqIdCounter; // Set the active page DOM id.
				} 
			}
		}
		
		// If the popup window is open update the file metrics and paging information.
		if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
			// Update the popup window page sequencing information.
			leftWindow.updateActivePageNumber();
			leftWindow.updatePageCount();
			
			// Update File Metrics
			leftWindow.updateFileMetrics();
		}
	}
}

/*
Function: disableMetadataControls()
Disable all the metadata controls.  This happens onDomReady, and after a complete or exclude.

Page Actions:
- Step 1 RHS Document Ready
- Step 1 RHS Complete
- Step 1 RHS Exclude
- Step 2 RHS Document Ready
- Step 2 RHS Complete
- Step 2 RHS Exclude
*/
function disableMetadataControls() {
	$('#datepicker').attr("disabled","disabled");
	$('#new_doc').attr("disabled","disabled");
	$('#add_to_last').attr("disabled","disabled");
	$('#set_within_doc_first').attr("disabled","disabled");
	$('#set_within_doc_last').attr("disabled","disabled");
	$('#set_within_doc_prev').attr("disabled","disabled");
	$('#set_within_doc_next').attr("disabled","disabled");
	$('#bad_handwriting').attr("disabled","disabled");
	$('#complete').attr("disabled","disabled");
	$('#suspend').attr("disabled","disabled");
}
