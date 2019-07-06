/* 
File: content.viewer.image_helper.js
Responsible for updating the step 1 and 2 LHS image viewer.

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp> 
- Step 2 LHS - <step2_popup.jsp> 

*****

Function: clearContentViewer()
Clear the LHS content viewer display.  This is called when a new image is loaded so the old image data does not stay in the DOM.

Page Actions:
- Step 1 RHS Update Exclude
- Step 1 Load Content Viewer
- Step 2 RHS Update Exclude
- Step 2 Load Content Viewer
*/
function clearContentViewer() {
	// Set the map-1 element back to the default size.  This ensures the contraint is updated properly.s
	$('#map-1').css('height','1350');
	$('#map-1').css('width','1000');
	//IWS-299: place image correctly
	$('#map-1').css('top','0');
	$('#map-1').css('left','0');
	
	$('.mapz-constraint').remove();
	$('#map-1-map-2').remove();
	$('#map-1-map-3').remove();
	$('#map-1-map-4').remove();
	$('#map-1-map-5').remove();
	$('#map-1-map-6').remove();
	$('#map-1-map-7').remove();
	$('#map-1-map-8').remove();
	$('#map-1-map-9').remove();
	
	$(".slider").slider('value', 0);
		
	$('#content_preview_image1').css('display','block');
	$('#content_preview_image2').css('display','none');
	$('#content_preview_image3').css('display','none');
	$('#content_preview_image4').css('display','none');
	$('#content_preview_image5').css('display','none');
	$('#content_preview_image6').css('display','none');
	$('#content_preview_image7').css('display','none');
	$('#content_preview_image8').css('display','none');
	$('#content_preview_image9').css('display','none');
		
	$('#content_preview_image1').attr('src', '');
	$('#content_preview_image2').attr('src', '');
	$('#content_preview_image3').attr('src', '');
	$('#content_preview_image4').attr('src', '');
	$('#content_preview_image5').attr('src', '');
	$('#content_preview_image6').attr('src', '');
	$('#content_preview_image7').attr('src', '');
	$('#content_preview_image8').attr('src', '');
	$('#content_preview_image9').attr('src', '');
	
	$("#nav_prev_content").attr('disabled','disabled');
	$("#nav_next_content").attr('disabled','disabled');
	
	// IWS-299 for step 1
	if (step == 1) {
		// reset page values (IWS-299)
		oldzoomvalue = 0;
	}
	
	if (step == 2) {
		// Clear griddy
		$('.griddy').remove();
		
		// Clear the textarea from the data point window
		$('#entry').html( '' );
		
		// Ensure the data point entry window is not visible.
		$('#data_point_wrapper').css('display','none');
		
		// reset page values (IWS-299)
		oldzoomvalue = 0;
		activeCategoryId="";
		activeSubcategoryId="";
		activeDataPointSection="";
		//zoomflag = 0;
	}
}

/*
Function: loadContentViewer(imageId,position,rotation)
Load the image into the LHS content viewer display area and update the active page object.

Parameters:
imageId - Id of the active page object.
position - first,middle,last - Used to update NEXT/PREV thumbnail navigation controls.
rotation - 0,90,180,270 - Used to set the image orientation.

Page Actions:
- Step 1 LHS Dom Ready via RHS updateContentViewer(imageId)
- Step 1 RHS Thumbnail Click via updateContentViewer(imageId)
- Step 2 LHS Dom Ready via RHS updateContentViewer(imageId)
- Step 2 RHS Thumbnail Click via updateContentViewer(imageId)

Called Functions:
- <clearContentViewer()>
- <updateActivePageNumber()> - Step 1 Only
- <updateActiveDocumentNumber()> - Step 2 Only
- <updateActiveDocumentPageNumber()> - Step 2 Only
- <updateDocumentPageCount()> - Step 2 Only
- <updateDocumentControls()> - Step 2 Only
- <updatePageControls()> - Step 2 Only
- <displayRotationControls()> or <hideRotationControls()>

Notes:
- A modified version of this is used in step3_imageLink.jsp.  The modified function is found directly within the jsp.
*/
function loadContentViewer(imageId,position,rotation) {
	// When a RHS thumbnail is clicked, this function is called.  
	// Because of that, and the fact we know if the page has already been loaded, we can reset the pageBeginLoadTime if needed.
	// Only Perform when debug = p.
	
	if (pageLoadDebug != -1 && initialPageLoad == false) {
		pageStartLoadTime = new Date();
	}
	initialPageLoad = false;
	
	// Load the active page object into a global variable.
	objPage = window.opener.objCase.pages[window.opener.activePageJsonId];
	
	// Clear the content viewer so we do not have non-used DOM elements on the page.
	clearContentViewer();
	
	// Get the image path from the spContentId field.
	contentId = objPage.spContentID;
	imagePath = 'ucm/getFile?contentId=' + contentId + '&rendition=web';

	// Load the preview image objects and set the preview image src attributes.  
	// These are used for the 8 zoom levels.
	$('#content_preview_image1').attr('src', imagePath);
	$('#content_preview_image2').attr('src', imagePath);
	$('#content_preview_image3').attr('src', imagePath);
	$('#content_preview_image4').attr('src', imagePath);
	$('#content_preview_image5').attr('src', imagePath);
	$('#content_preview_image6').attr('src', imagePath);
	$('#content_preview_image7').attr('src', imagePath);
	$('#content_preview_image8').attr('src', imagePath);
	$('#content_preview_image9').attr('src', imagePath);
	
	// Set the names to the thumbnail id so we can retrive when rotating the images.
	$('#content_preview_image1').attr('name', imageId);
	
	// Initialize the map/zooming functionality
	$("#map-1").mapz({
		zoom : true,
		createmaps : true,
		mousewheel : false
	});

	// Check which position the active document is within the thumbnail sequence and set the navigation controls appropriately.
	switch(position) {
		case 'first':
			$("#nav_prev_content").attr('disabled','disabled');
			$("#nav_next_content").removeAttr('disabled');
			break;
		case 'last':
			$("#nav_prev_content").removeAttr('disabled');
			$("#nav_next_content").attr('disabled','disabled');
			break;
		case 'only':
			$("#nav_prev_content").attr('disabled','disabled');
			$("#nav_next_content").attr('disabled','disabled');
			break;
		default:
			$("#nav_prev_content").removeAttr('disabled');
			$("#nav_next_content").removeAttr('disabled');
	}
	
	// If we are in step 2, display the grid lines
	if (step == 2) {
		$('#map-1').griddy({height:1350});
		$('.griddy').toggle(); 
	}
	
	// Update sequencing information based on the current step.
	if (step == 1) {
		// Update the active page and final page number.
		updateActivePageNumber();
		updateActiveDocumentPageFinalNumber();
		updateActiveDocumentPageDocDateAndType();
	} else if (step == 2) {
		// Update sequencing display data.
		updateActiveDocumentNumber();
		updateActiveDocumentPageNumber();
		updateActiveDocumentPageFinalNumber();
		updateActiveDocumentPageDocDateAndType();
		updateDocumentCount();
		updateDocumentPageCount();
		
		// Update sequencing controls.
		updateDocumentControls();
		updatePageControls();
	}
	
	/*IWS-357 : Not all the thumbnail image is showing, thumbnails are off center and far to the right*/
	
	/* Recommended Resolution - 1920 x 1080(Landscape) or 1080 x 1920(Portrait) 
	   To make the images to the center of screen 
	   if screen having resolution - 1080 x 1920(Portrait) */
	if($(screen)[0].width!='1920' || $(screen)[0].height!='1080'){
		$("#content_preview_image1").addClass('removeMargin');
		$("#content_preview_image2").addClass('removeMargin');
		$("#content_preview_image3").addClass('removeMargin');
		$("#content_preview_image4").addClass('removeMargin');
		$("#content_preview_image5").addClass('removeMargin');
		$("#content_preview_image6").addClass('removeMargin');
		$("#content_preview_image7").addClass('removeMargin');
		$("#content_preview_image8").addClass('removeMargin');
		$("#content_preview_image9").addClass('removeMargin');
	}else{
		$("#content_preview_image1").removeClass('removeMargin');
		$("#content_preview_image2").removeClass('removeMargin');
		$("#content_preview_image3").removeClass('removeMargin');
		$("#content_preview_image4").removeClass('removeMargin');
		$("#content_preview_image5").removeClass('removeMargin');
		$("#content_preview_image6").removeClass('removeMargin');
		$("#content_preview_image7").removeClass('removeMargin');
		$("#content_preview_image8").removeClass('removeMargin');
		$("#content_preview_image9").removeClass('removeMargin');
	}
	// To load the gridding to 100%
	var stageId = window.opener.qsStageId;
	if(stageId == 4 || stageId == 5){  // stageId = 4 & stageId = 5 is for step1-OP and Step1-QA respectively
		$("#map-1").css({ left : '0', width: '100%' });
	}else{
		$("#map-1").addClass('map-override');
	}
	
	// Update the rotation.
	$("#content_preview_image1").rotate({angle: rotation});
	$("#content_preview_image2").rotate({angle: rotation});
	$("#content_preview_image3").rotate({angle: rotation});
	$("#content_preview_image4").rotate({angle: rotation});
	$("#content_preview_image5").rotate({angle: rotation});
	$("#content_preview_image6").rotate({angle: rotation});
	$("#content_preview_image7").rotate({angle: rotation});
	$("#content_preview_image8").rotate({angle: rotation});
	$("#content_preview_image9").rotate({angle: rotation});
	
	// Postioining the image if rotation angle is 90/270 degrees
	if(rotation == '90' || rotation == '270'){
		$('#content_preview_image2').addClass('landscapeImg2Zoom');
		$('#content_preview_image3').addClass('landscapeImg3Zoom');
		$('#content_preview_image4').addClass('landscapeImg4Zoom');
		$('#content_preview_image5').addClass('landscapeImg5Zoom');
		$('#content_preview_image6').addClass('landscapeImg6Zoom');
		$('#content_preview_image7').addClass('landscapeImg7Zoom');
		$('#content_preview_image8').addClass('landscapeImg8Zoom');
		$('#content_preview_image9').addClass('landscapeImg9Zoom');
	}else{
		$('#content_preview_image2').removeClass('landscapeImg2Zoom');
		$('#content_preview_image3').removeClass('landscapeImg3Zoom');
		$('#content_preview_image4').removeClass('landscapeImg4Zoom');
		$('#content_preview_image5').removeClass('landscapeImg5Zoom');
		$('#content_preview_image6').removeClass('landscapeImg6Zoom');
		$('#content_preview_image7').removeClass('landscapeImg7Zoom');
		$('#content_preview_image8').removeClass('landscapeImg8Zoom');
		$('#content_preview_image9').removeClass('landscapeImg9Zoom');
	}
	// Only show the rotation controls if the page is not complete, suspended or excluded.
	pgCompleted = objPage.completed;
	pgDeleted = objPage.deleted;
	if (pgCompleted != true && pgCompleted != 'true' && pgDeleted != true && pgDeleted != 'true') {
		displayRotationControls();
	} else {
		hideRotationControls();
	}
}
		