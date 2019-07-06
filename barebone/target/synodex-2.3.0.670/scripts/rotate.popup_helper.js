/* 
File: rotate.popup_helper.js
Responsible for the rotation of pages on the LHS.

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp>
- Step 2 LHS - <step2_popup.jsp>

*****

Function: hideRotationControls()
Hides the LHS rotation controls.

Page Actions:
- Step 1 RHS Complete via LHS loadContentViewer
- Step 1 RHS Delete via LHS loadContentViewer
- Step 2 RHS Complete via LHS loadContentViewer
- Step 2 RHS Delete via LHS loadContentViewer
*/
function hideRotationControls() {
	$('.rotateleft').css('display','none');
	$('.rotateright').css('display','none');
}
	
/*
Function: displayRotationControls()
Displays the LHS rotation controls.

Page Actions:
- Step 1 LHS Content Viewer Image Load
- Step 1 RHS Uncomplete via LHS loadContentViewer
- Step 1 RHS Undelete via LHS loadContentViewer
- Step 2 LHS Content Viewer Image Load
- Step 2 RHS Uncomplete via LHS loadContentViewer
- Step 2 RHS Undelete via LHS loadContentViewer
*/
function displayRotationControls() {
	$('.rotateleft').css('display','block');
	$('.rotateright').css('display','block');
}
	
/*
Function: rotateImageHandler(direction)
Handles the RHS thumbnail rotate.

Parameters:
direction - left,right - Indicates if the image should be rotated 90 degrees left or right.

Page Actions:
- Step 1 LHS Rotate Left/Right
- Step 2 LHS Rotate Left/Right

Called Functions:
- <rotateThumbnailHandler(thumbnailId, direction)>
*/
function rotateImageHandler(direction) {
	// Get the id of the corresponding thumbnail on the right page.  We stored this in the content viewer image name attribute.
	var thumbnailId = $('#content_preview_image1').attr('name');
	
	// Now that we know the id, rotate the right page thumbnail.
	window.opener.parent.rotateThumbnailHandler(thumbnailId, direction);
}


/*
Function: rotateImage(direction)
Handles the LHS Content Viewer image rotation.

Parameters:
direction - left,right - Indicates if the image should be rotated 90 degrees left or right.

Page Actions:
- Step 1 LHS Rotate Left/Right
- Step 2 LHS Rotate Left/Right
*/
function rotateImage(direction) {
	// Get the current image angle.
	imageObject = document.getElementById('content_preview_image1');
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

	$("#content_preview_image1").rotate({angle: newAngle});
	$("#content_preview_image2").rotate({angle: newAngle});
	$("#content_preview_image3").rotate({angle: newAngle});
	$("#content_preview_image4").rotate({angle: newAngle});
	$("#content_preview_image5").rotate({angle: newAngle});
	$("#content_preview_image6").rotate({angle: newAngle});
	$("#content_preview_image7").rotate({angle: newAngle});
	$("#content_preview_image8").rotate({angle: newAngle});
	$("#content_preview_image9").rotate({angle: newAngle});
	
}