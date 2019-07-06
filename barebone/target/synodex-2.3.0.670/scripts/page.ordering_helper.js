/* 
File: page.ordering_helper.js
Responsible for the ordering and numbering of pages and documents.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>

*****

Function: reorderPage(aryDocumentPages, oldAryPosition, newAryPosition)
Re-order a single document.

Parameters:
aryDocumentPages - Array of document pages. 
oldAryPosition - Old position within the array.
newAryPosition - New position within the array.

Page Actions:
- Step 1 RHS Set Within Doc First
- Step 1 RHS Set Within Doc Last
- Step 2 RHS Set Within Doc First
- Step 2 RHS Set Within Doc Last

Called Functions:
- <updatePages(pages, boolSort)>
*/
function reorderPage(aryDocumentPages, oldAryPosition, newAryPosition) {
	// Check to see if the First or Last button was pressed.
	if (newAryPosition == 0) { // #First
		// Create an empty array to store the new order sequence.
		var aryDocumentPages2 = new Array();

		// Move the active page to the first position of the new array.
		aryDocumentPages2[0] = aryDocumentPages[oldAryPosition];

		// Loop through the original pages array and place them accordingly into the copy array
		for (var i = 0; i < aryDocumentPages.length; i++) {
			// Check if the active page id matches the looping id and add non-matching id's to the new array.
			if (aryDocumentPages[i].id != aryDocumentPages[oldAryPosition].id) {
				aryDocumentPages2[aryDocumentPages2.length] = aryDocumentPages[i];
			}
		}
	} else { // #Last
		// Create an empty array to store the new order sequence.
		var aryDocumentPages2 = new Array();
		// Create a counter so we do not add array values after the last is set.
		var aryCounter = 0;

		// Loop through the original pages array and place them accordingly into the copy array
		for (var i = 0; i < aryDocumentPages.length; i++) {
			// Check if the active page id matches the looping id and add non-matching id's to the new array.
			if (aryDocumentPages[i].id != aryDocumentPages[oldAryPosition].id) {
				aryDocumentPages2[aryCounter] = aryDocumentPages[i];
				aryCounter++;
			} else {
				// Set the active page to the last in the original array
				var lastArrayId = aryDocumentPages.length;
				lastArrayId--;
				aryDocumentPages2[lastArrayId] = aryDocumentPages[i];
			}
		}
	}

	// Alert the original order
	var oldOrder = "";
	for (var i = 0; i < aryDocumentPages.length; i++) {
		oldOrder = oldOrder + " " + aryDocumentPages[i].id;
	}
	//alert(oldOrder);

	// Alert the new order
	var newOrder = "";
	for (var i = 0; i < aryDocumentPages2.length; i++) {
		newOrder = newOrder + " " + aryDocumentPages2[i].id;
	}
	//alert(newOrder);

	// The aryDocumentPages2 array holds the updated order of pages.
	// Loop through the ordered page array and update each page.	
	var documentOrder = aryDocumentPages2[0].subDocumentOrder;
	var pageNumber = 1;
	var aryCounter = 0;
	
	var aryUpdatedPages = new Array();
	
	// Loop the pages, override the new page number, and add the pages to the array.
	for (var i = 0; i < aryDocumentPages2.length; i++) {
		// Override the page number values.
		//aryDocumentPages2[i].subDocumentPageNumber = pageNumber;

		aryUpdatedPages[aryCounter] = { id:aryDocumentPages2[i].id,subDocumentPageNumber:pageNumber };
		
		// Increment page number counters.
		pageNumber++;
		aryCounter++;
	}
	
	updatePages(aryUpdatedPages, true);
}

/*
Function: movePage(pageId)
Builds and displays the Move dialog. This allows the page to be moved to any document.

Parameters:
pageId - The id of the page to be moved.

Page Actions:
- Step 1 Move Page Select
- Step 2 Move Page Select
*/
function movePage(pageId) {
	htmlString = '';

	// Hide the X in the top right of the dialog popup
	$('.ui-dialog-titlebar-close').css('display','none');

	var activePageSubDocumentOrder;
	var activePageSubDocumentPageNumber;
	var activePageDataDate;
	var activePageDocumentTypeId;
	var activePageOriginalPageNumber;

	// Get the active page details from the case object.
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			activePageSubDocumentOrder = objCase.pages[i].subDocumentOrder;
			activePageSubDocumentPageNumber =  objCase.pages[i].subDocumentPageNumber;
			activePageDataDate =  millisToDateHandler(objCase.pages[i].documentDate);
			// FUTURE: GET THE DOC TYPE INSTEAD OF THE ID
			activePageDocumentTypeLabel =  objCase.pages[i]._docType.name;
			activePageOriginalPageNumber =  objCase.pages[i].originalPageNumber;
		}
	}

	// Source Page		
	htmlString = htmlString + '<div id=\"move_page_source_wrapper\" style=\"min-height: 100px; width: 200px; float: left; text-align:left;\">';
	htmlString = htmlString + 	'<p style=\"text-align: center;\">Source - Move page:</p>';
	htmlString = htmlString + 	'<p>Document: ' + activePageSubDocumentOrder;
	htmlString = htmlString + 	'<br />Page: ' + activePageSubDocumentPageNumber;
	htmlString = htmlString + 	'<br />Data Date: ' + activePageDataDate;
	htmlString = htmlString + 	'<br />Document Type: ' + activePageDocumentTypeLabel
	htmlString = htmlString + 	'<br />Original Scan Sequence: ' + activePageOriginalPageNumber + '</p>';
	htmlString = htmlString + '</div>';

	// Target Document
	htmlString = htmlString + '<div id=\"move_page_target_wrapper\" style=\"width: 500px; float: right; text-align: left; border-left: 1px solid #666666; padding-left: 10px; \">';
	htmlString = htmlString + 	'<p style=\"text-align: center;\">Target - Insert page within document:</p>';
	htmlString = htmlString + 	'<div style=\"float: left; width: 290px; min-height: 100px;\">';
	htmlString = htmlString + 		'<select id=\"move_page_document_dropdown\" onchange=\"movePageDropdownChangeHandler();\" style=\"width: 275px;\">';
	htmlString = htmlString + 			'<option value=\"\">Select a Document...</option>';

	// Loop through Documents and display the number and the date and type from the first page.
	var lastDocumentId = 0;
	var tmpObjCase = getCurrentCasePages();
	for (i=0; i < tmpObjCase.pages.length; i++) {
		// Ensure the document number is greater than the last and does not equal 9999
		if (tmpObjCase.pages[i].subDocumentOrder > lastDocumentId && tmpObjCase.pages[i].subDocumentOrder != 9999 && tmpObjCase.pages[i].subDocumentOrder != '9999') {
			htmlString = htmlString + 	'<option value=\"' + tmpObjCase.pages[i].subDocumentOrder + '\">Document ' + tmpObjCase.pages[i].subDocumentOrder + ' - ' + millisToDateHandler(tmpObjCase.pages[i].documentDate) + '</option>';
			lastDocumentId++;
		}
	}
	
	// Increment the document counter to get the next document number.
	lastDocumentId++;
	
	// Add the Move Into New Document option to the dropdown.
	if (lastDocumentId<tmpObjCase.pages.length)
		htmlString = htmlString + 	'<option value=\"' + lastDocumentId + '\">New Document (' + lastDocumentId + ')</option>';
	
	// Finish adding the submit and cancel buttons.
	htmlString = htmlString + 		'</select>';
	htmlString = htmlString + 	'</div>';
	htmlString = htmlString + 	'<div style=\"float: left; width: 70px; min-height: 100px;\">';
	htmlString = htmlString + 		'<p><input type=\"radio\" onclick=\"movePagePositionControlHandler(\'before\',\'' + activePageSubDocumentOrder + '\',\'' + activePageSubDocumentPageNumber + '\')\" id=\"move_page_number_before\" name=\"move_page_position\" value=\"before\" disabled=\"disabled\" /> Before';
	htmlString = htmlString + 		'<br /><input type=\"radio\" onclick=\"movePagePositionControlHandler(\'after\',\'' + activePageSubDocumentOrder + '\',\'' + activePageSubDocumentPageNumber + '\')\" id=\"move_page_number_after\" name=\"move_page_position\" value=\"after\" disabled=\"disabled\" /> After</p>';
	htmlString = htmlString + 	'</div>';
	htmlString = htmlString + 	'<div id=\"move_page_page_list\" style=\"float: right; width: 130px; min-height: 100px;\">&nbsp;</div>';
	htmlString = htmlString + 	'<div><button disabled=\"disabled\" id=\"btn_move_apply\" onclick=\"movePageSubmit(' + pageId + ');\">Move</button> <button onclick=\"$(\'#moveDialog\').dialog(\'close\');\">Cancel</button></div>';
	htmlString = htmlString + '</div>';

	// There were no documents defined.  Display error to user.  Otherwise open the dialog.
	if (lastDocumentId == 0) {
		alert('No documents defined.');
	} else if (activePageSubDocumentOrder == '9999' || activePageSubDocumentOrder == 9999) { // CHECK THIS
		alert('The page must be assigned a page number prior to moving.');
	} else {
		// Set the dialog HTML and display the dialog popup.
		$('#moveDialog').html(htmlString);
		$('#moveDialog').dialog('open');
	}
}

/*
Function: movePagePositionControlHandler(position, activePageSubDocumentOrder, activePageSubDocumentPageNumber)
Updates the Move Page dialog Page Number controls based on the current page position.  Required so a page is not moved into it's same position.

Parameters:
position - before,after - Indicates if the page should be moved before or after another page based on the user's selection.
activePageSubDocumentOrder - The current document number.
activePageSubDocumentPageNumber - The current page number.

Page Actions:
- Step 1 RHS Move Page Dialog Before Select
- Step 1 RHS Move Page Dialog After Select
- Step 2 RHS Move Page Dialog Before Select
- Step 2 RHS Move Page Dialog After Select
*/
function movePagePositionControlHandler(position, activePageSubDocumentOrder, activePageSubDocumentPageNumber) {
	// We only want to disable controls if we are moving the page within the same document.
	if ($('#move_page_document_dropdown').val() == activePageSubDocumentOrder) {
		
		$('#btn_move_apply').attr('disabled','disabled');
		
		if (position == 'before') {
			// #Before
			var disabledPageNumber = 0;
			
			// Clear any disabled pages by rebuilding the radio list.
			htmlString = '';
			var tmpObjCase = getCurrentCasePages();
			for (i=0; i < tmpObjCase.pages.length; i++) {
				// If the 
				if (tmpObjCase.pages[i].subDocumentOrder == $('#move_page_document_dropdown').val()) {
					htmlString += '<input class=\"move_page_numbers\" type=\"radio\" id=\"move_page_number' + tmpObjCase.pages[i].subDocumentPageNumber + '\" name=\"move_page_number\" value=\"' + tmpObjCase.pages[i].subDocumentPageNumber + '\" /> Page ' + tmpObjCase.pages[i].subDocumentPageNumber + '<br />';
				}
			}
			$('#move_page_page_list').html(htmlString);
			
			disabledPageNumber = activePageSubDocumentPageNumber;
			
			// Disable the first page radio element.
			$('#move_page_number' + disabledPageNumber).attr('disabled','disabled');
			
			var numberOfPages = $('input[name=move_page_number]').length
			
			// Do not disable a second page if the active page is the last page in the document.
			if (activePageSubDocumentPageNumber != numberOfPages) {
				disabledPageNumber++;
				
				// Disable the second page radio element.
				$('#move_page_number' + disabledPageNumber).attr('disabled','disabled');
			}
		} else {
			// #After
			var disabledPageNumber = 0;
			
			// Clear any disabled pages by rebuilding the radio list.
			htmlString = '';
			var tmpObjCase = getCurrentCasePages();
			for (i=0; i < tmpObjCase.pages.length; i++) {
				// If the 
				if (tmpObjCase.pages[i].subDocumentOrder == $('#move_page_document_dropdown').val()) {
					htmlString += '<input class=\"move_page_numbers\" type=\"radio\" id=\"move_page_number' + tmpObjCase.pages[i].subDocumentPageNumber + '\" name=\"move_page_number\" value=\"' + tmpObjCase.pages[i].subDocumentPageNumber + '\" /> Page ' + tmpObjCase.pages[i].subDocumentPageNumber + '<br />';
				}
			}

			$('#move_page_page_list').html(htmlString);
			
			disabledPageNumber = activePageSubDocumentPageNumber;

			// Disable the first page radio element.
			$('#move_page_number' + disabledPageNumber).attr('disabled','disabled');
			
			// Do not disable a second page if the active page is 1.
			if (activePageSubDocumentPageNumber != 1) {
				disabledPageNumber--;
				
				// Disable the second page radio element.
				$('#move_page_number' + disabledPageNumber).attr('disabled','disabled');
			}
		}
		
		$('.move_page_numbers').click(function(c) {
			if ($('#move_page_number_before').attr('checked') || $('#move_page_number_after').attr('checked')) {
				$('#btn_move_apply').removeAttr('disabled');
			}
		});
	}
	
}

/*
Function: movePageDropdownChangeHandler()
Display the current pages within a document once a document is selected from the Move Page dialog dropdown list.

Page Actions:
- Step 1 RHS Move Page Dialog Document Select
- Step 2 RHS Move Page Dialog Document Select
*/
function movePageDropdownChangeHandler() {
	$('#btn_move_apply').attr('disabled','disabled');
	
	$('#move_page_number_before').removeAttr('checked');
	$('#move_page_number_after').removeAttr('checked');
	
	// Check if the dropdown value is null. Disable the before/after radio buttons.
	if ($('#move_page_document_dropdown').val() == '' || $('#move_page_document_dropdown').val() == null) {
		$('#move_page_number_before').attr('disabled','disabled');
		$('#move_page_number_after').attr('disabled','disabled');
		$('#move_page_page_list').children().remove();
		$('#move_page_page_list').html('&nbsp;');
	} else if ($('#move_page_document_dropdown').val() == $('#move_page_document_dropdown option:last-child').val()) { // Create new document. Disable before/after, enable Move button, hide page numbers.
		$('#btn_move_apply').removeAttr('disabled');
		$('#move_page_number_before').attr('disabled','disabled');
		$('#move_page_number_after').attr('disabled','disabled');
		$('#move_page_page_list').children().remove();
		$('#move_page_page_list').html('&nbsp;');
	} else {
		// If no, load the page number and enable controls.
		$('#move_page_number_before').removeAttr('disabled');
		$('#move_page_number_after').removeAttr('disabled');

		// Loop through and display the pages
		htmlString = '';
		var tmpObjCase = getCurrentCasePages();
		for (i=0; i < tmpObjCase.pages.length; i++) {
			// If the 
			if (tmpObjCase.pages[i].subDocumentOrder == $('#move_page_document_dropdown').val()) {
				htmlString += '<input class=\"move_page_numbers\" type=\"radio\" id=\"move_page_number' + tmpObjCase.pages[i].subDocumentPageNumber + '\" name=\"move_page_number\" value=\"' + tmpObjCase.pages[i].subDocumentPageNumber + '\" /> Page ' + tmpObjCase.pages[i].subDocumentPageNumber + '<br />';
			}
		}
		
		$('#move_page_page_list').html(htmlString);
		
		$('.move_page_numbers').click(function(c) {
			if ($('#move_page_number_before').attr('checked') || $('#move_page_number_after').attr('checked')) {
				$('#btn_move_apply').removeAttr('disabled');
			}
		});
	}
}

/*
Function: movePageSubmit(pageId)
Called when the Apply button is pressed within the Move dialog.

Parameters:
pageId - The id of the page to be moved.

Page Actions:
- Step 1 RHS Move Page Dialog Save
- Step 2 RHS Move Page Dialog Save

Called Functions:
- <updatePages(pages, boolSort)>
*/
function movePageSubmit(pageId) {
	var currentJsonId;
	var oldSubDocumentOrder;
	var oldSubDocumentPageNumber;

	// Set variables based on the active page.	
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			currentJsonId = i;
			oldSubDocumentOrder = objCase.pages[i].subDocumentOrder;
			oldSubDocumentPageNumber = objCase.pages[i].subDocumentPageNumber;
		}
	}
	
	// Check if we are creating a new document.
	if ($('#move_page_number_before').attr('checked') != 'checked' && $('#move_page_number_after').attr('checked') != 'checked' && $('#move_page_document_dropdown').val() != '') {
		// #MOVE TO NEW DOCUMENT
		var aryUpdatedPages = new Array();
		
		// Reorder the old document and add to array.
		var pageCounter = 0;
		// Loop through the pages.
		for (j=0; j < objCase.pages.length; j++) {
			// Check if the looping pages match the old document and re-order.
			// Do not add the old page to the document.
			if (objCase.pages[j].subDocumentOrder == oldSubDocumentOrder && objCase.pages[j].id != pageId) {
				pageCounter++;
				
				aryUpdatedPages[aryUpdatedPages.length] = { id:objCase.pages[j].id,subDocumentOrder:objCase.pages[j].subDocumentOrder,subDocumentPageNumber:pageCounter };
			} 
		}

		// Add the active page to the update array.
		var newDocumentNumber = $('#move_page_document_dropdown').val();
		if(newDocumentNumber<=objCase.pages.length)
		{
			var newPageNumber = 1;

			aryUpdatedPages[aryUpdatedPages.length] = { id:pageId,subDocumentOrder:newDocumentNumber,subDocumentPageNumber:newPageNumber };

			// Update the DB but do not sort the pages.
			updatePages(aryUpdatedPages, true);		
		}
	} else {
		var tmpObjCase = getCurrentCasePages();
		
		var position =  $('input:radio[name=move_page_position]:checked').val(); // before/after
		var newSubDocumentOrder = $('#move_page_document_dropdown').val();
		var newSubDocumentPageNumber = $('input:radio[name=move_page_number]:checked').val();
	
		// This array will hold the page id's that require an update at the end of the function.
		var updatedJsonIds = new Array();
	
		var newPageDocumentTypeId = ''; // Holds the new documents doc type id so we can update the page moving into the document.
		
		// Check if the page is being moved within the same document.
		if (oldSubDocumentOrder == newSubDocumentOrder) {
			// #MOVE WITHIN SAME DOCUMENT
			// Setup positioning for pages within the same document.
			if (position == 'after'  && oldSubDocumentPageNumber > newSubDocumentPageNumber) {
				newSubDocumentPageNumber++;
			} else if (position == 'before' && newSubDocumentPageNumber != 1 && newSubDocumentPageNumber != '1' && oldSubDocumentPageNumber < newSubDocumentPageNumber) {
				newSubDocumentPageNumber--;
			}
	
			var pageCounter = 1;
			// Loop through the pages.
			for (i=0; i < tmpObjCase.pages.length; i++) {
				// Only adjust page numbers that are within the same document.
				if (tmpObjCase.pages[i].subDocumentOrder == newSubDocumentOrder) {
					// Set the document type id.
					if (newPageDocumentTypeId == '') {
						newPageDocumentTypeId = tmpObjCase.pages[i]._docType.id;
					}
					
					// Check if this is the active document.  If yes, set the appropriate page number.
					if (tmpObjCase.pages[i].subDocumentPageNumber == oldSubDocumentPageNumber) {
						tmpObjCase.pages[i].subDocumentPageNumber = newSubDocumentPageNumber;
					} else {
						// Check if this is where the active document should be.
						// If so, skip overriding this spot and set it's value later out of loop.
						if (newSubDocumentPageNumber == pageCounter) {
							pageCounter++;
						}
	
						// Override the page number.
						tmpObjCase.pages[i].subDocumentPageNumber = pageCounter;
	
						// Add the json id to the array.
						updatedJsonIds[updatedJsonIds.length] = i;
	
						pageCounter++;
					}
				} 
			}
			
			// Update the active page.
			tmpObjCase.pages[currentJsonId].subDocumentPageNumber = newSubDocumentPageNumber;	
		} else {	
			var newDocumentDate = getDocumentDate(newSubDocumentOrder);
			
			// #MOVE TO DIFFERENT EXISTING DOCUMENT
			// Reorder the old document
			var pageCounter = 0;
			// Loop through the pages.
			for (i=0; i < tmpObjCase.pages.length; i++) {
				// Check if the looping pages match the old document and re-order.
				// Do not add the old page to the document.
				if (tmpObjCase.pages[i].subDocumentOrder == oldSubDocumentOrder && tmpObjCase.pages[i].id != pageId) {
					pageCounter++;
					// Override the page number.
					tmpObjCase.pages[i].subDocumentPageNumber = pageCounter;
	
					// Add the json id to the array.  
					updatedJsonIds[updatedJsonIds.length] = i;
				} 
			}

			// Setup positioning for the new document pages.
			if (position == 'after') {
				newSubDocumentPageNumber++;
			}

			// Reorder the new document and add the page.
			pageCounter = 0;
			// Loop through the pages.
			for (i=0; i < tmpObjCase.pages.length; i++) {
				// Check if the looping pages match the old document and re-order. Also include the new page to the document.
				if (tmpObjCase.pages[i].subDocumentOrder == newSubDocumentOrder || tmpObjCase.pages[i].id == pageId) {
	
					// Check if this is the active page and set it's document/page number values.
					if (tmpObjCase.pages[i].id == pageId) {
						// Override the document and page number.
						tmpObjCase.pages[i].subDocumentOrder = newSubDocumentOrder;
						tmpObjCase.pages[i].subDocumentPageNumber = newSubDocumentPageNumber;
						tmpObjCase.pages[i].documentDate = newDocumentDate;
						
						// Add the active json id to the update array.
						updatedJsonIds[updatedJsonIds.length] = i;
					} else {
						pageCounter++;
	
						// Check if this is the page number of the new page.  If so, increment the counter to skip this page.
						if (newSubDocumentPageNumber == pageCounter) {
							pageCounter++;
						} 
						
						// Update the local document type id for the new document.
						if (newPageDocumentTypeId == '') {
							newPageDocumentTypeId = tmpObjCase.pages[i]._docType.id;
						}
	
						// Override the page number.
						tmpObjCase.pages[i].subDocumentPageNumber = pageCounter;
	
						// Add the json id to the update array.
						updatedJsonIds[updatedJsonIds.length] = i;
					}
				}
			}
			
			// Update the document type.
			tmpObjCase.pages[pageJsonId]._docType.id = newPageDocumentTypeId;
		}
		
		// We already overrode the tmpObjCase page numbers.  
		// Now we must loop through the JsonID string and add the pages to an update array.
		var aryUpdatedPages = new Array();
		var aryCounter = 0;
		for (i=0; i < updatedJsonIds.length; i++) {
			//updatePage(tmpObjCase.pages[updatedJsonIds[i]], false, 0);
			
			aryUpdatedPages[i] = { id:tmpObjCase.pages[updatedJsonIds[i]].id,subDocumentOrder:tmpObjCase.pages[updatedJsonIds[i]].subDocumentOrder,subDocumentPageNumber:tmpObjCase.pages[updatedJsonIds[i]].subDocumentPageNumber, documentDate:tmpObjCase.pages[updatedJsonIds[i]].documentDate };
			aryCounter++;
		}
		
		// Add the original page to the array.
		aryUpdatedPages[aryCounter] = { id:tmpObjCase.pages[currentJsonId].id,subDocumentOrder:tmpObjCase.pages[currentJsonId].subDocumentOrder,subDocumentPageNumber:tmpObjCase.pages[currentJsonId].subDocumentPageNumber, _docType:newPageDocumentTypeId };
		
		// Update the DB and sort the pages.
		updatePages(aryUpdatedPages, true);		
	}
	
	checkCasePageNumbers();
	
	// Close the Move popup Dialog.
	$('#moveDialog').dialog('close');
}

/*
Function: checkDocumentOrder()
Ensure the document order is correct.  If a page is moved that was the only page in the document, the document number could have a gap.  This only happens if no filtering or sorting has taken place.

Page Actions:
- Step 1 RHS Document Ready via Display Thumbnails
- Step 1 RHS Move Page via Display Thumbnails
- Step 1 RHS Sort via Display Thumbnails
- Step 2 RHS Document Ready via Display Thumbnails
- Step 2 RHS Move Page via Display Thumbnails
- Step 2 RHS Sort via Display Thumbnails

Called Functions:
- <updatePages(pages, boolSort)>
*/
function checkDocumentOrder() {
	var reorder = false;
	
	// Both of these values have to be true in order for the check to take place.
	var boolFilterString = false;
	if (filterString == 'nofilter') {
		boolFilterString = true;
	}
	var boolSortString = false;
	if (sortString == 'nosort' || sortString == 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc') {
		boolSortString = true;
	}
	
	// Only re-order when not page filtering
	if (boolFilterString == true && boolSortString == true) {
		var lastDocumentOrder = 0;		// 0 1 1 1 2 2 2 3
		var currentDocumentOrder = 0;	// 1 1 1 3 3 3 4 9999
		var nextDocumentOrder;			// 1 1 1 2 2 2 3 4
		var currentDocumentPageNumber;  // 1 2 3 1 2 3 1 0
		
		// Create an update array used to do a mass update of the paegs.
	    var aryUpdatedPages = new Array();
	    var aryCounter = 0;
		
		// loop through the pages.
		for (i=0; i < objCase.pages.length; i++) {
			// Set the current and next document orders.
			currentDocumentOrder = objCase.pages[i].subDocumentOrder;
			currentDocumentPageNumber = objCase.pages[i].subDocumentPageNumber;
			
			// Do not incremenet if the page is within the last document.
			if (currentDocumentOrder > lastDocumentOrder && currentDocumentPageNumber == 1) {
				nextDocumentOrder = lastDocumentOrder;
				nextDocumentOrder++;
			}
			
			// If the current and next documents do not match, we must change the document order.
			if (currentDocumentOrder != nextDocumentOrder && currentDocumentOrder != 9999 && currentDocumentOrder != '9999') {
				//alert("Change Document " + currentDocumentOrder + " to Document " + nextDocumentOrder + ".");
				
				// Indicate a re-order has happened so we can re-sort.
				reorder = true;
				
				// Update the case object.
				objCase.pages[i].subDocumentOrder = nextDocumentOrder;
				
				// Add the page to the update array.
			    aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id, subDocumentOrder:nextDocumentOrder };
				
				// Update the array counter.
				aryCounter++;
				
				// Set the last document order.
				lastDocumentOrder = nextDocumentOrder;
			} else {
				lastDocumentOrder = objCase.pages[i].subDocumentOrder;
			}
		}
		
		// Only update the DB if pages need re-ordered.
		if (reorder == true) {
			// Update the DB and sort the pages.
			updatePages(aryUpdatedPages, true);
		}
	}
	return reorder;
}

/*
Function: checkPageOrder(subDocumentOrder)
Ensure the page numbering of a specific document is correct.

Parameters:
subDocumentOrder - The number of the document needs checked.

Page Actions:
- Step 1 RHS via Update Page
- Step 2 RHS via Update Page

Called Functions:
- <updatePages(pages, boolSort)>
*/
function checkPageOrder(subDocumentOrder) {
	var aryUpdatedPages = new Array();
	var aryCounter = 0;
	var pageNumber = 1;
			
	// Loop through the pages.
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].subDocumentOrder == subDocumentOrder) {
			aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id, subDocumentPageNumber:pageNumber };
					
			aryCounter++;
			pageNumber++;
		}
	}
		
	// Check if a document exists. If not, the only page in the document was excluded and we must run checkDocumentOrder()
	if (aryCounter == 0) {
		checkDocumentOrder();
	} else {
		// Pages were added to the array.  Update the pages.
		updatePages(aryUpdatedPages, true);
	}
}

/*
Function: updateFinalPageNumbers() 
Updates the Final Page Number of all pages.

Page Actions:
- Step 1 RHS Complete
- Step 2 RHS Complete

Called Functions:
- <updatePages(pages, boolSort)>
*/
function updateFinalPageNumbers() {
	// Get a clean version of the case object to ensure we have all pages.
	// Sort by Document, Page Number, Original Page Number Ascending
	sortString = 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc';
	// Do not filter any pages.
	filterString =  'nofilter';
	
	$.ajax({
		url: "sortcases/" + caseId + "/" + sortString + "/" + filterString +"/"+ qsStageId ,
		async: false,
		context: document.body,
		success: function(c) {
			// case = c;
			var finalPageNumber = 1;
			
			var aryUpdatedPages = new Array();
			
			// Loop through the pages.
			for (var i = 0; i < c.pages.length; i++) {
				// Make sure the page has a valid page number and set the final page number.
				if (c.pages[i].subDocumentPageNumber != 0) {
					c.pages[i].finalPageNumber = finalPageNumber;
					finalPageNumber++;
				} else {
					// If a page number has not been set, set the final page number to 0.
					c.pages[i].finalPageNumber = 0;
				}
				
				// Add the page id and final page number to the array.
				aryUpdatedPages[i] = { id:c.pages[i].id,finalPageNumber:c.pages[i].finalPageNumber };

			}  
			
			updatePages(aryUpdatedPages, true);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updateFinalPageNumbers()", errorThrown);
		}
	});
}

/*
Function: objPage_finalPageNumber(id,finalPageNumber)
Sets the id and final page number for a page.

Parameters
id - The id of the page.
finalPageNumber - The final page number of the page.
*/
function objPage_finalPageNumber(id,finalPageNumber) {
	this.id = id;
	this.finalPageNumber = finalPageNumber;
}


/*
Function: getDocumentDate(tmpDocumentOrder)
Get the document date

Parameters
tmpDocumentOrder - The document id

Return
docDate - The document date if found, else null
*/
function getDocumentDate(tmpDocumentOrder)
{
	var docDate = null;
	if(tmpDocumentOrder!= null)
	{
		for (i=0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].subDocumentOrder == tmpDocumentOrder)
			{
				docDate = objCase.pages[i].documentDate;
				break;
			}
		}				
	}
	
	return docDate;
}


/*
Function: getCurrentCasePages()
Get the current case pages using default sort order by: 
subDocumentOrder, subDocumentPageNumber originalPageNumber

Return
tmpObjCase - The current case pages
*/
function getCurrentCasePages() {
	var tmpObjCase = null;
	// Get a clean version of the case object to ensure we have all pages.
	sortString = 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc';
	// Do not filter any pages.
	filterString =  'nofilter';
	
	$.ajax({
		url: "sortcases/" + caseId + "/" + sortString + "/" + filterString +"/"+ qsStageId ,
		async: false,
		context: document.body,
		success: function(c) {
			tmpObjCase = c;			
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updateFinalPageNumbers()", errorThrown);
		}
	});
	
	return tmpObjCase;
}

/*
Function: getDocumentPages(documentOrder,tmpObjCase)
Get all the pages for a document
 
Parameters
documentOrder - Document order id
tmpObjCase - The case object containing pages

Return
arrayOfPages - Array of pages
*/
function getDocumentPages(documentOrder,tmpObjCase) {
	
	var counter = 0;
	var arrayOfPages = new Array();

	for (j=0; j < tmpObjCase.pages.length; j++) {
		if(tmpObjCase.pages[j].subDocumentOrder==documentOrder){
			arrayOfPages[counter++] = tmpObjCase.pages[j];
		}
	}
	
	return arrayOfPages;
}


/*
Function: checkCasePageNumbers
Check and syynchronize case page orders if they are out of order

Return
pagesoutoforder - True if page are out of order, false otherwise
*/
function checkCasePageNumbers()
{
	var pagesoutoforder = false;	
	var tmpObjCase = getCurrentCasePages();	
	
	if (tmpObjCase!=null)
	{
		var tmpDocuments = getUniqueDocumentsIdForPages(tmpObjCase);		
		for (var j=0; j < tmpDocuments.length; j++) {
				//Ignore excluded pages
			if(tmpDocuments[j] == 9999 || tmpDocuments[j] == '9999') 
				continue;			
			
			if(tmpDocuments[j]!=null)
			{
				var tmppages = getDocumentPages(tmpDocuments[j],tmpObjCase);
				var pageNumber = 1;
				var msg = "";
				var isnotordered = false;		
				for (var i = 0; i < tmppages.length; i++) {
					if(tmppages[i].subDocumentOrder == tmpDocuments[j] && tmppages[i].subDocumentPageNumber!=pageNumber)
					{
						msg += "Document " + tmppages[i].subDocumentOrder + " Page " + tmppages[i].subDocumentPageNumber + ", it should be ";
						msg += "Document " + tmppages[i].subDocumentOrder + " Page  " +  pageNumber + "\n";
						isnotordered = true;
					}
					pageNumber++;						
				}
				
				if(isnotordered)
				{
					var pageNumber = 1;
					var aryUpdatedPages = new Array();
					
					var arrayCounter = 0;
					for (var i = 0; i < tmppages.length; i++) {
						if(tmppages[i].subDocumentOrder == tmpDocuments[j] && tmppages[i].subDocumentPageNumber!=pageNumber)
							aryUpdatedPages[arrayCounter++] = { id:tmppages[i].id, subDocumentPageNumber:pageNumber };							
						pageNumber++;
					}
					
					updatePages(aryUpdatedPages, true);
				}
			}			
		}
	}
	
	return pagesoutoforder;
}


/*
Function: getUniqueDocumentsIdForPages(tmpObjCase,currentDocumentOrder)
Get unique document id for case pages

Parameters
tmpObjCase - The case object containing pages
currentDocumentOrder - Document order id

Return
tmpDocuments - Array of document ids
*/
function getUniqueDocumentsIdForPages(tmpObjCase,currentDocumentOrder)
{
	var tmpDocuments = new Array();
	var arrayCounter = 0;
	var currentDocumentOrder = null;

	//Get all available unique documents ids
	for (var i=0; i < tmpObjCase.pages.length; i++) {
		if (currentDocumentOrder != tmpObjCase.pages[i].subDocumentOrder)
		{
			currentDocumentOrder = tmpObjCase.pages[i].subDocumentOrder;
			tmpDocuments[arrayCounter++] = currentDocumentOrder;
		}
	}
	
	return tmpDocuments;	
}
