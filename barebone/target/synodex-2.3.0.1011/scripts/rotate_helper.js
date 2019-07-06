/* 
File: rotate_helper.js
Responsible for the rotation of pages on the RHS.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>

*****

Function: rotateThumbnailHandler(thumbnailId, direction)
Handles the RHS thumbnail rotations.

Parameters:
thumbnailId - The id of the page to be rotated.
direction - left,right - The direction to rotate the page image.

Page Actions:
- Step 1 RHS Rotate Left
- Step 1 RHS Rotate Right
- Step 2 RHS Rotate Left
- Step 2 RHS Rotate Right

Called Functions:
- <rotateThumbnail(thumbnailId, direction)>
*/
function rotateThumbnailHandler(thumbnailId, direction) {
	// Rotate the UI and save.
	rotateThumbnail(thumbnailId, direction);
}

/*
Function: rotateThumbnail(thumbnailId, direction)
Rotate a thumbnail a specified direction and save.

Parameters:
thumbnailId - The id of the page to be rotated.
direction - left,right - The direction to rotate the page image.

Page Actions:
- Step 1 RHS Rotate Left/Right via rotateThumbnailHandler
- Step 2 RHS Rotate Left/Right via rotateThumbnailHandler

Called Functions:
- <updateContentViewer(activePageId)>
*/
function rotateThumbnail(thumbnailId, direction) {
	// Get the current image angle.
	imageObject = document.getElementById(thumbnailId);
	if (imageObject.Wilq32) {
		currentAngle = imageObject.Wilq32.PhotoEffect._angle;
	} else {
		currentAngle = 0;
	}

	switch (direction) {
	case 'right':
		switch (currentAngle) {
			case 0:
				newAngle = 90;
				break;
			case 90:
				newAngle = 180;
				break;
			case 180:
				newAngle = 270;
				break;
			case 270:
				newAngle = 0;
				break;
		}
		break;
	case 'left':
	  	switch (currentAngle) {
			case 0:
				newAngle = 270;
				break;
			case 90:
				newAngle = 0;
				break;
			case 180:
				newAngle = 90;
				break;
			case 270:
				newAngle = 180;
				break;
		}
	  	break;
	}
		
	// Save the image rotation to the database.
	$.ajax({
		url: 'pages/rotate',
		data : { pageIds : thumbnailId, orientation: newAngle },
		success: function(c){
			// Rotate the UI.
			$("#" + thumbnailId).rotate({angle: newAngle});
			  
			// Update the case object. We have to loop to get the correct page from the case object.
			for (i=0; i < objCase.pages.length; i++) {
				if (objCase.pages[i].id == thumbnailId) {
					objCase.pages[i].orientation = newAngle;
				}
			}

			// If the popup window is open, rotate the image.
			if (typeof(leftWindow) != 'undefined' && leftWindow.closed != true) {
				// Only rotate if the rotated page is also the active page.
				if (thumbnailId == activePageId) {
					updateContentViewer(activePageId);
				}
			}
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "rotateThumbnail(" + thumbnailId + ", " + direction + ")", errorThrown);
		}
	});
}

/*
Function: rotateAllThumbnails(direction)
Rotate all thumbnails.  Sets the thumbnail orientation to 0 before rotating.

Parameters:
direction - left,right - The direction to rotate the page images.

Page Actions:
- Step 1 RHS Rotate All Left/Right
- Step 2 RHS Rotate All Left/Right

Called Functions:
- <updateContentViewer(activePageId)>
- <updatePages(page, boolSort)>
*/
var rotateAllAngle = 0; // Global variable to hold the global rotation.
function rotateAllThumbnails(direction) {
	// 
	switch (direction) {
	case 'right':
		switch (rotateAllAngle) {
			case 0:
				rotateAllAngle = 90;
				break;
			case 90:
				rotateAllAngle = 180;
				break;
			case 180:
				rotateAllAngle = 270;
				break;
			case 270:
				rotateAllAngle = 0;
				break;
		}
	  	break;
	case 'left':
	  	switch (rotateAllAngle) {
			case 0:
				rotateAllAngle = 270;
				break;
			case 90:
				rotateAllAngle = 0;
				break;
			case 180:
				rotateAllAngle = 90;
				break;
			case 270:
				rotateAllAngle = 180;
				break;
		}
	  	break;
	}
	
	// rotateAllAngle is the angle we will rotate the images to.
	// Loop through the #global_thumbnail_wrapper child elements.
	$('#global_thumbnail_wrapper').children().each(
		function() {
			// Rotate the thumbnail only if the page is not marked as complete.
			if ($(this).children("div:nth-child(3)").children().css('display') != 'none') {
				thumbnailId = $(this).children().children().attr('id');
				
				// Rotate the displayed thumbnail.
				$("#" + thumbnailId).rotate({angle: rotateAllAngle});
			}
		});
	
	var aryUpdatedPages = new Array();
	var aryCounter = 0;
	
	// Loop the pages and save the orientation.
	for (i=0; i < objCase.pages.length; i++) {
		// Rotate only pages that are not complete.
		if (objCase.pages[i].completed != true && objCase.pages[i].completed != 'true') {
			// Update the case object.
			objCase.pages[i].orientation = rotateAllAngle;
			
			// Update the updated page array.
			aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id,orientation:rotateAllAngle };
			aryCounter++;
		}
	}
	// If there is an active thumbnail, update the popup window.
	if (activePageJsonId) {
		updateContentViewer(activePageId);
	}
	
	// Update the DB.
	updatePages(aryUpdatedPages, false);
}