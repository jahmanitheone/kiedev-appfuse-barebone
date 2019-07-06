<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="step1.title"/></title>
    <meta name="heading" content="<fmt:message key='step1.heading'/>"/>
    <meta name="menu" content="Step1"/>
    
    <!-- Window Resizing -->
    <script type="text/javascript" src="<c:url value='/scripts/window.lhs.resize_helper.js'/>"></script>

    <!-- JQuery Library for Image Rotatation -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.ui.rotate.2.1.js'/>"></script>

    <!-- JQuery Library for Zoom -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.mapz.step1.js'/>"></script>

	<!-- Library for Displaying/Updating Applicant Details -->
    <script type="text/javascript" src="<c:url value='/scripts/applicant.details_helper.js'/>"></script>
	
	<!-- Library for Popup Window Rotation Controls -->
    <script type="text/javascript" src="<c:url value='/scripts/rotate.popup_helper.js'/>"></script>
    
    <!-- Library for File Metrics -->
    <script type="text/javascript" src="<c:url value='/scripts/file.metrics_helper.js'/>"></script>
	
	<!-- Library for Content Viewer Image -->
    <script type="text/javascript" src="<c:url value='/scripts/content.viewer.image_helper.js'/>"></script>
    
    <!-- Library for Navigation Controls -->
    <script type="text/javascript" src="<c:url value='/scripts/content.viewer.navigation_helper.js'/>"></script>
    
     <!-- Library for showing time case has been in stage -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.countdown.min.js'/>"></script>
    
    <script>
    var step = 1;		// Current Step.
    var caseId;			// Current Case.
    
    var objCase; 		// Case Object.
	var objPage;		// Active Page Object.
    
	// Global Apex Variables.
    var appId;
    var appScreen;
    var apexSessionId;
    var domain;
    var port;
    var ssl;
    var clientDateFormat;
    var buttonMainMenuUrl;
    
    var debug;
    var pageLoadDebug;
    var imageLoadDebug;
    var initialPageLoad = true; // Used with auditing.  Set this to false after initial page load so we can reset the page load start time.
    
	//IWS-299 set variable here for jquery.mapz.step1.js
    var zoomflag = 0;
	var oldzoomvalue = 0;
	
	<!-- On Document Ready. -->
	$(document).ready(function () {
		// Move the popup window to the top left corner.  This also ensures the bottom is aligned.
		window.moveBy(-window.screen.availWidth,-window.screen.availHeight);
		
		// Close the popup window when the parent window closes.
		window.opener.setUnload();
		
		//IWS 285,310
		//Reset the size of body window to make it adjustable to 100% with varied resoultions
		//$('#step_window').css('width','100%');
		
		// Set the date/time in the footer.
		datetime();
		
		// Load data from the parent window.
		objCase = window.opener.objCase;
		caseId = window.opener.caseId;
		appId = window.opener.appId;
		appScreen = window.opener.appScreen;
		apexSessionId = window.opener.apexSessionId;
		buttonMainMenuUrl = window.opener.buttonMainMenuUrl;
		domain = window.opener.domain;
		port = window.opener.port;
		ssl = window.opener.ssl;
		debug = window.opener.debug;
		var activePageId = window.opener.activePageId;
		
		// Set the screen in the footer.
		updateScreenOnFooter(objCase);
		
		// Load the clientDateFormat from the case object.
		if(objCase.languageId == objCase._client.defaultLanguageId){
		clientDateFormat = objCase._client.defaultDateFormat;
		}else{
			$.ajax({
				type: "POST",
			  	url: "dataPoint/dataPointLanguage/" + objCase.languageId,
			  	async: false,
			  	success: function(format) {
			  		clientDateFormat = format[0].dateFormat;
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
		}
		
		// Update the page sequencing information.
		updatePageCount();
		
		// Display the applicant details.
		updateApplicantDetails();
		
		// Add a dialog control to the applicant update popup div.
		$('#updateApplicantDetailsDialog').dialog({
			autoOpen: false,
			title: 'Update Applicant Details',
			width: 500,
			modal: true,
			draggable: false,
			resizable: false
		});
		
		// Update the File Metrics
		updateFileMetrics();

		// If there is an active page, this means a thumbnail as been clicked and we need to load the content viewer.
		if (activePageId) {
			window.opener.updateContentViewer(activePageId);
		}
		
		// Set the Main Menu URL and Logout button.
		// Re-direct user to Main Menu.
		if (ssl == true || ssl == 'true') {
			buttonMainMenuUrl = "https://";
		} else {
			buttonMainMenuUrl = "http://";
		}
		buttonMainMenuUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + appScreen + ':' + apexSessionId;
		$('#buttonMainMenu').attr('onClick','window.opener.location.href = \"' + buttonMainMenuUrl + '\"');
		$('#buttonLogout').attr('onclick','window.opener.userLogout()');
		
		// Set a load handler on the content viewer if debug=p.  Used to calculate page load time, as this is the element last done.
		pageLoadDebug = debug.indexOf("p");
		if (pageLoadDebug != -1) {
			$('#content_preview_image1').load(function() {
				setContentViewerStopLoadTime();
			});
		}

		imageLoadDebug = debug.indexOf("i");
		if (imageLoadDebug != -1 && pageLoadDebug == -1) {
			$('#content_preview_image1').load(function() {
				setContentViewerTotalImageSize();
			});
		}
		
//		document.getElementById('finalPg').innerHTML = objPage.finalPageNumber ;
	});
	</script>

	<!-- Hotkey Bindings. -->
	<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.1.popup.js'/>"></script>
</head>

<div id="sweep_l_wrapper"><!-- Begin Page Wrapper -->
	<div id="sweep_l_header"><!-- Begin Header -->
		<div id="sweep_l_header_applicant_details" style="float: left; width: 300px;"></div>
		<div id="sweep_l_header_file_metrics" style="padding-bottom: 10px; float: right; width: 300px; text-align: right;">
			<div style="padding-bottom: 5px;"><strong>File Metrics</strong></div>
			<span id="pages_total"></span> Total Pages, <span id="pages_excluded"></span> Excluded Pages
			<br /><span id="pages_processed"></span> Pages Processed
			<br /><span id="pages_unprocessed"></span> Pages Awaiting Processing
			<br /><span id="pages_flagged"></span> Flagged Pages
			<br />File Work Time: [<span id="pages_worktime"></span>] Minutes
		</div>
		<div id="sweep_l_header_thumbnail_navigation" style="float: right; width: 373px; text-align: center;">
			<div style="padding-bottom: 5px;"><strong>Page Navigation</strong></div>
			<div style="width: 100%;"><button class="bodybutton" id="nav_prev_content" onclick="changeContent('prev');" disabled="disabled">&larr;</button>&nbsp;&nbsp;Image <span id="sweep_l_header_active_thumbnail">0</span> of <span id="sweep_l_header_total_thumbnails">0</span>&nbsp;&nbsp;<button class="bodybutton" id="nav_next_content" onclick="changeContent('next');" disabled="disabled">&rarr;</button></div>
			<div id="finalPageNumberDiv" style=="padding: 10px 0px;">
			Final Page: <span id="finalPg" style ="color: red;"></span>
			</div>
			<div style="padding: 10px 0px;">
				<select id="goto">
					<option value="">Go To...</option>
					<option value="last_complete">Last Complete</option>
					<option value="first_not_complete">First Not Complete</option>
					<option value="first_suspend_note">First Page with Suspend Note</option>
					<option value="last_suspend_note">Last Page with Suspend Note</option>
				</select>
			</div>
			<div class="sliderHolderStep1Top">
				<div class="ui-icon ui-icon-circle-minus gzoombutton sliderminus">&nbsp;</div>
				<div class="gzoomSlider slider"></div>
				<div class="ui-icon ui-icon-circle-plus gzoombutton sliderplus" style="background-color: blue">&nbsp;</div>
				<div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton rotateleft" onClick="javascript:rotateImageHandler('left');">&nbsp;</div>
				<div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton rotateright" onClick="javascript:rotateImageHandler('right');">&nbsp;</div>
				<span class="zoomedvaluestep1"></span>
			</div>
		</div>
	</div><!-- End Header -->
	
	<div id="sweep_l_content"><!-- Begin Content -->
		<div class="map-viewport">
			<div id="map-1">
				<img id="content_preview_image1" src="images/imageLoadingPlaceHolder.jpg" width="1000" height="1344" alt="" class="first-level current-level level" />
				<img id="content_preview_image2" src="" width="1150" height="1788" alt="" class="level" style="display: none;"/>
				<img id="content_preview_image3" src="" width="1250" height="2231" alt="" class="level" style="display: none;" />
				<img id="content_preview_image4" src="" width="1600" height="2688" alt="" class="level" style="display: none;" />
				<img id="content_preview_image5" src="" width="1900" height="3145" alt="" class="level" style="display: none;" />
				<img id="content_preview_image6" src="" width="2200" height="3602" alt="" class="level" style="display: none;" />
				<img id="content_preview_image7" src="" width="2500" height="4059" alt="" class="level" style="display: none;" />
				<img id="content_preview_image8" src="" width="2800" height="4516" alt="" class="level" style="display: none;" />
				<img id="content_preview_image9" src="" width="3100" height="4973" alt="" class="level" style="display: none;" />
				
			</div>
		</div>
		<div class ="sliderHolderStep1">
			<div class="ui-icon ui-icon-circle-minus gzoombutton sliderminus">&nbsp;</div>
			<div class="gzoomSlider slider"></div>
			<div class="ui-icon ui-icon-circle-plus gzoombutton sliderplus" style="background-color: blue">&nbsp;</div>
			<div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton rotateleft" onClick="javascript:rotateImageHandler('left');">&nbsp;</div>
			<div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton rotateright" onClick="javascript:rotateImageHandler('right');">&nbsp;</div>
			<span class="zoomedvaluestep1"></span>
		</div>			
	</div><!-- End Content -->
	
	<!-- This div is used for the update applicant details dialog window. The HTML is set dynamically within updateApplicantDetails() -->
	<div id="updateApplicantDetailsDialog"></div>
	
</div><!-- End Page Wrapper -->