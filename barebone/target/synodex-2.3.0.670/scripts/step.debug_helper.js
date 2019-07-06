/* 
File: step.debug_helper.js
Responsible for all debug actions.

Debug Options:
Step 1:
- p = Page Load Time Metrics
- i = Image Load Time Metrics
Step 2:
- p = Page Load Time Metrics
- i = Image Load Time Metrics

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp>
- Step 1 RHS - <step1.jsp>
- Step 2 LHS - <step2_popup.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 3 Image Popup - <step3_imageLink.jsp>
- Step 4 LHS - <step4_popup.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: addAuditLogEntry() 
Saves the page or image load times to the AuditLog table in the database.

Parameters:
results - A string that contains the load time data.
action - The action for the log entry.
*/
function addAuditLogEntry(results,action) {
	var now = new Date();
	var nowMillis = dateToMillisUS(now);
	
	var map = new Object();	
	if (objCase!=null)
	{
		// Add the audit data to the map.
		map['_session'] = apexSessionId;
		if(objCase.user!=null)
			map['_user'] = objCase.user.id;
		else
			map['_user'] = 9999;
		map['_stage'] = objCase.stage.id;	
	}
	map['time'] = nowMillis;
	map['results'] = results;
	map['_action'] = action; // 18 = page load time RHS, 19 = image file size/image load time RHS, 22 = page load time LHS, 23 = image load time LHS
	map['_case'] = caseId;
	
	
	if (action == 18) { 
		// Get the filter value.
		map['modifiedValue'] = $('#page_filter').val();
	} else if (action == 22) {
		// Get the spContentID
		if(objPage!=null)
			map['originalValue'] = objPage.spContentID
	}

	var url = "auditLogEntry";

	// All data has been set.  Update/insert data point entry.
	jQuery.ajax({  
		type: "POST",
		url: url,
		async: false,
		data : {
			'_method' : 'PUT',
			entry : map
		},
		success : function(msg) {
			// Do Nothing
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "addAuditLogEntry()", errorThrown);
		}
	});
}

/*
Function: setPageStopLoadTime() 
Sets the page stop load time global variable to calculate the page load time on the RHS.

Called Functions:
- addAuditLogEntry(results,action)
*/
var totalPageLoadTimeInSeconds;
function setPageStopLoadTime() {
	// Set the stop load time global variable.
	pageStopLoadTime = new Date();
	
	// Increment the pages loaded global variable.
	pagesLoaded++;

	// Using the pages loaded global variable, check if this is the last page needing to be loaded.
	// Because this would only be true when we load the page the first time, we don't have to worry about another insert during a sort() call.
	if (pagesLoaded == objCase.pages.length) {
		// Last Page
		totalPageLoadTimeInSeconds = ((pageStopLoadTime - pageStartLoadTime) / 1000);
		
		// Update the audit log with the total page time data.
		addAuditLogEntry(totalPageLoadTimeInSeconds, 18);
		
		// Alert the user in the browser status footer.
		$('#debugFooter').html('<b>Loadtime:</b><i>' + totalPageLoadTimeInSeconds + 's</i>');
	}
}

/*
Function: setTotalImageSize(spContentID)
Sets the total image load time global variable to calculate the total image load time on the RHS.

Parameters:
spContentId - The spcontentid of the current page.  Used to retrieve the image.
*/
var totalImageSizeInBytes = 0;
var aryOfSizes = new Array();

var startImageTime;
var stopImageTime;
var currentImageLoadTime;
var totalImageLoadTime = 0;
function setTotalImageSize(spContentID) {
	// Get the next sp content id.
	var nextSpContentId;
	var nextArrayIndex;
	for (i=0; i < objCase.pages.length; i++) {
		// If this is the current page, set the next page variables.
		if (!nextSpContentId) {
			if (objCase.pages[i].spContentID == spContentID) {
				nextArrayIndex = i;
				nextArrayIndex++;
			}
			if (nextArrayIndex == i) {
				nextSpContentId = objCase.pages[i].spContentID;
			}
		}
		
	}
	
	// The image is about to be loaded.  Set the time.
	startImageTime = new Date();
	
	// Image Size Calculation.
	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', 'ucm/getFile?contentId=' + spContentID + '&rendition=thumbnail', true);
	xhr.onreadystatechange = function(){
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				// The image is loaded.  Set the time.
				stopImageTime = new Date();

				currentImageLoadTime = stopImageTime - startImageTime;
				totalImageLoadTime = totalImageLoadTime + currentImageLoadTime;

				// Add the size to the array.
				aryOfSizes[aryOfSizes.length] = xhr.getResponseHeader('Content-Length');

				if (nextSpContentId) {
					setTotalImageSize(nextSpContentId);
				} else {
					// Loop through the array and add the values.
					for (j=0; j < aryOfSizes.length; j++) {
						totalImageSizeInBytes = parseInt(totalImageSizeInBytes) + parseInt(aryOfSizes[j]);
					}
					
					// Calculate the total image size in KB.
					var totalImageSizeInKb = totalImageSizeInBytes / 1024;
					
					// Calculate the total image load time in sec.
					totalImageLoadTime = (totalImageLoadTime / 1000);
					
					// Set to two decimal places.
					totalImageSizeInKb = totalImageSizeInKb.toFixed(2);

					// Update the audit log with the total page size data.
					addAuditLogEntry(totalImageSizeInKb, 19);
					
					// Update the audit log with the total page time data.
					addAuditLogEntry(totalImageLoadTime, 24);
					
					// Alert the user in the browser status footer.
					$('#debugFooter').html('<b>File Size:</b><i>' + totalImageSizeInKb + 'kb</i> <b>Loadtime:</b><i>' + totalImageLoadTime + 'sec</i>');
				}
			}
		}
	};
	xhr.send(null);
}

/*
Function: setContentViewerStopLoadTime() 
Calculates the page load time in step 1 and 2 LHS.

Called Functions:
- addAuditLogEntry(results,action)
*/
function setContentViewerStopLoadTime() {
	// Assume the page is done loading here.
	pageStopLoadTime = new Date();
	
	// Calculate the time in seconds.
	totalPageLoadTimeInSeconds = ((pageStopLoadTime - pageStartLoadTime) / 1000);
	
	// Update the audit log with the total page time data.
	addAuditLogEntry(totalPageLoadTimeInSeconds, 22);
	
	// Alert the user in the footer.
	$('#debugFooter').html('<b>Loadtime:</b><i>' + totalPageLoadTimeInSeconds + 's</i>');
}

/*
Function: setContentViewerTotalImageSize() 
Calculates the page load time in step 1 and 2 LHS.

Called Functions:
- addAuditLogEntry(results,action)
*/
//var totalImageSizeInBytes = 0;
var aryOfSizes = new Array();
function setContentViewerTotalImageSize() {
	// The image is about to be loaded.  Set the time.
	startImageTime = new Date();
	
	// Image Size Calculation.
	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', 'ucm/getFile?contentId=' + objPage.spContentID + '&rendition=web', true);
	xhr.onreadystatechange = function() {
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				// The image is loaded.  Set the time.
				stopImageTime = new Date();
				totalImageLoadTime = stopImageTime - startImageTime;
				
				// Calculate the total image load time in sec.
				totalImageLoadTime = (totalImageLoadTime / 1000);
				
				// Add the size to the array.
				totalImageSizeInBytes = parseInt(xhr.getResponseHeader('Content-Length'));

				// Calculate the total image size in KB.
				var totalImageSizeInKb = totalImageSizeInBytes / 1024;

				// Set to two decimal places.
				totalImageSizeInKb = totalImageSizeInKb.toFixed(2);
				
				// Update the audit log with the total page size data.
				addAuditLogEntry(totalImageSizeInKb, 23);
				
				// Update the audit log with the total page time data.
				addAuditLogEntry(totalImageLoadTime, 25);
				
				// Alert the user in the browser status footer.
				$('#debugFooter').html('<b>File Size:</b><i>' + totalImageSizeInKb + 'kb</i>  <b>Loadtime:</b><i>' + totalImageLoadTime + 'sec</i>');
			}
		}
	};
	xhr.send(null);
}
