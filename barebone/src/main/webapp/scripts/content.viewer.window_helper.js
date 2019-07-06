/* 
File: content.viewer.window_helper.js
Responsible for navigation of pages from the RHS and updating the LHS content viewer from the RHS.

Loaded In Steps:
- Step 1 RHS - <step1.jsp> 
- Step 2 RHS - <step2.jsp> 
- Step 3 RHS - <step3.jsp> ?
- Step 3 Code Search Box - <step3_codeSearchBox.jsp> ?
- Step 4 LHS - <step4_popup.jsp> ?
- Step 4 RHS - <step4.jsp> ?

*****

Function: updateContentViewer(imageId)
Update the left window content viewer. Called by the thumbnail click handler.

Parameters:
imageId - The image id attribute value.

Page Actions:
- Step 1 RHS Thumbnail Click
- Step 2 RHS Thumbnail Click

Called Functions:
- <loadContentViewer(imageId,position,rotation)>
- <getNextNavigatablePage>
- <getPrevNavigatablePage>
*/
function updateContentViewer(imageId) {
	var currentSelectedPage =  null;

	if(issorting)
	{
		currentSelectedPage =  objCase.pages[activePageJsonId];
		if(currentSelectedPage !=null && prevSelectedDocumentNumber !=null && prevSelectedPageNumber != null)
		{
			if (objActivePage.subDocumentOrder!=currentSelectedPage.subDocumentOrder || objActivePage.subDocumentPageNumber!=currentSelectedPage.subDocumentPageNumber)
			{
				changeToFirstPage();					
			}
		}		
	}
	
	// Ensure that the left window is open.  If not, open it.
	if (typeof(leftWindow) == 'undefined' || leftWindow.closed == true) {
		if (step == 1) {
			leftWindow = window.open("step1_popup","step1_left","width=" + lhsWidth + ",height=" + lhsHeight + ",scrollbars=1,top=0,left=0");
		} else {
			leftWindowOpened = 1;
			leftWindow = window.open("step2_popup","step2_left","width=" + lhsWidth + ",height=" + lhsHeight + ",height=783,scrollbars=1,top=0,left=0");
		}
	} else {
		if(issorting && currentSelectedPage==null)
		{
			if(prevSelectedPage!=null)
			{
				changeToFirstPage();
			}
		}  else 
		{	
			if(issorting)
			{
				prevSelectedPage = currentSelectedPage;
				prevSelectedDocumentNumber = currentSelectedPage.subDocumentOrder;
				prevSelectedPageNumber = currentSelectedPage.subDocumentPageNumber;
			} else
			{
				prevSelectedPage = objActivePage;
				prevSelectedDocumentNumber = objActivePage.subDocumentOrder;
				prevSelectedPageNumber = objActivePage.subDocumentPageNumber;	
				leftWindowOpened = 2;
			}
			
			// Get the number of non-excluded pages.
			var includedPageCounter = 0;
			for (var i = 0; i < objCase.pages.length; i++) { 
				// Do not count a page that is excluded.
				if (objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
					includedPageCounter++;
				}
			}
	
			// Loop through the pages and set the first and last sequence page id
			var firstChildPageId;
			var lastChildPageId;
			var pageSequenceCounter = 0;
			for (var i = 0; i < objCase.pages.length; i++) { 
				// Do not count a page that is excluded.
				if (objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
					pageSequenceCounter++;
					
					// Set the first seq page id if the seq counter is 1.
					if (pageSequenceCounter == 1) {
						firstChildPageId = objCase.pages[i].id;
					}
					
					// Set the last seq page id if the seq counter is equal to the page array length.
					if (pageSequenceCounter == includedPageCounter) {
						lastChildPageId = objCase.pages[i].id;
					}
				} 
			}
			
			// Set the default thumbnail ordering position to middle.  
			var position = 'middle';
			if (imageId == firstChildPageId && imageId == lastChildPageId) {
				position = 'only';
			} else if (imageId == firstChildPageId) {
				position = 'first';
			} else if (imageId == lastChildPageId) {
				position = 'last';
			}
			
			// Get the image rotation.
			for (i=0; i < objCase.pages.length; i++) {
				if (objCase.pages[i].id == imageId) {
					rotation = objCase.pages[i].orientation;
				}
			}
	
			// Update the content viewer display.
			leftWindow.loadContentViewer(imageId,position,rotation);
		}
	}
	
	issorting = false;
}

/*
Function: changeContent(direction)
Move to the previous or next thumbnail.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 1 LHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey
- Step 1 LHS Left Arrow/Right Arrow Button Navigation Click
- Step 1 RHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey
- Step 2 RHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey

Called Functions:
- <thumbnailClickHandler(pageId, pageDomId)>
*/
function changeContent(direction) {
	// Compute the previous and next non-excluded thumbnail page id.
	var prevPageId;
	var prevPageDomId = 0;
	var nextPageId;
	var nextPageDomId = 0;
	
	var currentDomId;
	
	for (i=0; i < objCase.pages.length; i++) {
		currentDomId = i;
		currentDomId++;
		
		if (objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
			if (currentDomId < activePageDomId) {
				prevPageDomId = currentDomId;
				prevPageId = objCase.pages[i].id;
			}
			
			if (currentDomId > activePageDomId && nextPageDomId == 0) {
				nextPageDomId = currentDomId;
				nextPageId = objCase.pages[i].id;
			}
		}
	}
	
	// Act as if the thumbnail was clicked to load metadata and highlight.
	if (direction == 'next') {
		thumbnailClickHandler(nextPageId, nextPageDomId);
	} else {
		thumbnailClickHandler(prevPageId, prevPageDomId);
	}
}

/*
Function: changeDocument(direction)
Move to the first page of the previous or next document.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 2 LHS Prev Document/Next Document Button Navigation Click

Called Functions:
- <thumbnailClickHandler(pageId, pageDomId)>
- <getPrevNavigatableDocument()>
- <getNextNavigatableDocument()>
*/
function changeDocument(direction) {
	var nextDocument = objActivePage.subDocumentOrder;
	if(step == 1){
	if (direction == 'next') {
		nextDocument++;
	} else {
		nextDocument--;
	}
	}
	
	// Loop through the pages and get the dom id and page id.
	var nextPageId;
	var nextPageDomId;
	for (i=0; i < objCase.pages.length; i++) {
		if(step == 1) {
			if (objCase.pages[i].subDocumentOrder == nextDocument && objCase.pages[i].subDocumentPageNumber == 1){
				nextPageId = objCase.pages[i].id;
				nextPageDomId = i+1;
			}
		}
		
		if(step == 2) {
		if (direction == 'next') {
		if (objCase.pages[i].subDocumentOrder == nextDocument ) {
			if( i < objCase.pages.length && objCase.pages[i+1].subDocumentOrder != nextDocument){
				
				nextPageId = objCase.pages[i+1].id;
				nextPageDomId = i+1;
				break;
				}
		}
		}else{
			if(objCase.pages[i].subDocumentOrder == nextDocument ) {
			if( i < objCase.pages.length && objCase.pages[i-1].subDocumentOrder != nextDocument){
				
				//nextPageId = objCase.pages[i-1].id;
				//nextPageDomId = i-1;
				nextDocument = objCase.pages[i-1].subDocumentOrder;
				for(j=0;j<objCase.pages.length;j++)
				{
					if(objCase.pages[j].subDocumentOrder == nextDocument && objCase.pages[j].subDocumentPageNumber == 1){
						nextPageId = objCase.pages[j].id;
					    nextPageDomId = j;
					}
				}
			
				break;
				}
		}
		}
	}
		
	}

	
	if(nextPageId==null)
	{
		if(direction == 'next')
			nextPageId = getNextNavigatableDocument();
		else
			nextPageId = getPrevNavigatableDocument();
	}

	thumbnailClickHandler(nextPageId, nextPageDomId);
}

/*
Function: changePage(direction)
Move to the previous or next page of the current document.

Parameters:
direction - next,prev - The direction to navigate.

Page Actions:
- Step 2 LHS Prev Page/Next Page Button Navigation Click
- Step 2 LHS Shift+Right Arrow/Shift+Left Arrow Navigation Hotkey

Called Functions:
- <thumbnailClickHandler(pageId, pageDomId)>
- <getNextNavigatablePage>
- <getPrevNavigatablePage>
*/
function changePage(direction) {
	var currentDocument = objActivePage.subDocumentOrder;
	var nextPage = objActivePage.subDocumentPageNumber;
	
	if (direction == 'next') {
		nextPage++;
	} else {
		nextPage--;
	}
	
	// Loop through the pages and get the dom id and page id.
	var nextPageId;
	var nextPageDomId;
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].subDocumentOrder == currentDocument && objCase.pages[i].subDocumentPageNumber == nextPage) {
			nextPageId = objCase.pages[i].id;
			nextPageDomId = i+1;
		}
	}

	if(nextPageId==null)
	{
		if(direction == 'next')
		{
			tmpPage = getNextNavigatablePage(currentDocument,nextPage);
			if (tmpPage!=null)
			{
				nextPageId = tmpPage.id;
			} else nextPageId = objActivePage.id;
		} else
		{			
			tmpPage = getPrevNavigatablePage(currentDocument,nextPage);
			if (tmpPage!=null)
			{
				nextPageId = tmpPage.id;
			} else nextPageId = objActivePage.id;
		}
	}
	
	thumbnailClickHandler(nextPageId, nextPageDomId);
}

/*
Function: getNextNavigatablePage(currentDocument,currentPage)
Navigate to the 1st next page of the result set. 

Parameters:
currentDocument - current document being browsed
currentPage - current page being browsed

Page Actions:
- Step 1 / 2 page navigation
*/
function getNextNavigatablePage(currentDocument,currentPage)
{
	if(currentPage==null || currentDocument==null)
		return null;

	var tmpPage = null;
	for (i=0; i < objCase.pages.length; i++) {
			//Do not navigate to excluded pages
		if (objCase.pages[i].deleted == true && objCase.pages[i].deleted == 'true')
			continue;
		
		if (objCase.pages[i].subDocumentOrder == currentDocument && objCase.pages[i].subDocumentPageNumber > currentPage) {
			tmpPage = objCase.pages[i];
			break;
		}
	}
	
	return tmpPage;
}


/*
Function: getPrevNavigatablePage(currentDocument,currentPage)
Navigate to the 1st previous page of the result set. 

Parameters:
currentDocument - current document being browsed
currentPage - current page being browsed

Page Actions:
- Step 1 / 2 page navigation
*/
function getPrevNavigatablePage(currentDocument,currentPage)
{
	if(currentPage==null || currentDocument==null)
		return null;

	var tmpPage = null;	
	for (i=objCase.pages.length-1; i >= 0; i--) {
			//Do not navigate to excluded pages
		if (objCase.pages[i].deleted == true && objCase.pages[i].deleted == 'true')
			continue;
		
		if (objCase.pages[i].subDocumentOrder == currentDocument && objCase.pages[i].subDocumentPageNumber < currentPage) {
			tmpPage = objCase.pages[i];
			break;
		}
	}	
	
	return tmpPage;
}


/*
Function: changeToFirstPage()
Navigate to the 1st page of the result set

Page Actions:
- Step 1 / 2 page navigation

Called Functions:
- <thumbnailClickHandler(pageId, pageDomId)>
*/
function changeToFirstPage() {
	tmpPage = objCase.pages[0];
		//Do not select excluded page
	if (tmpPage != null && tmpPage.deleted != true && tmpPage.deleted != 'true') {
		nextPageId = tmpPage.id;
		nextPageDomId = 0;
		
		thumbnailClickHandler(nextPageId, nextPageDomId);		
	}
}

/*
Function: getNextNavigatableDocument()
Navigate to the next document in the result set

Page Actions:
- Step 1 / 2 page navigation
*/
function getNextNavigatableDocument()
{
	nextPageId = null;
	curdocpos = null;
		//Get the position of the current document
	for (i=0; i < objCase.pages.length; i++) {
		//Do not navigate to excluded pages
		if (objCase.pages[i].deleted == true && objCase.pages[i].deleted == 'true')
			continue;

		if (objCase.pages[i].subDocumentOrder == objActivePage.subDocumentOrder) {
			curdocpos = i;
			break;
		}
	}
	if(curdocpos!=null)
	{
		curdocpos++;
		if(curdocpos<=objCase.pages.length)
			nextPageId = objCase.pages[curdocpos].id;
	}		

	return nextPageId;
}

/*
Function: getPrevNavigatableDocument()
Navigate to the prev document in the result set

Page Actions:
- Step 1 / 2 page navigation
*/
function getPrevNavigatableDocument()
{
	nextPageId = null;
	curdocpos = null;
		//Get the position of the current document
	for (i=objCase.pages.length-1; i >= 0; i--) {		
		//Do not navigate to excluded pages
		if (objCase.pages[i].deleted == true && objCase.pages[i].deleted == 'true')
			continue;

		if (objCase.pages[i].subDocumentOrder == objActivePage.subDocumentOrder) {
			curdocpos = i;
			break;
		}
	}
	if(curdocpos!=null)
	{
		curdocpos--;
		if(curdocpos<=0)
			nextPageId = objCase.pages[curdocpos].id;
	}		

	return nextPageId;
}