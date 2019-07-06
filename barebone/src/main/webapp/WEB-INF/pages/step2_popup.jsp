<%@ page import="com.teaminformatics.synodex.model.Case" %>
<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="step2.title"/></title>
    <meta name="heading" content="<fmt:message key='step2.heading'/>"/>
    <meta name="menu" content="Step2"/>
    
    <!-- Window Resizing -->
    <script type="text/javascript" src="<c:url value='/scripts/window.lhs.resize_helper.js'/>"></script>

    <!-- JQuery Library for Image Rotatation -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.ui.rotate.2.1.js'/>"></script>
        
    <!-- JQuery Library for Zoom -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.mapz.step2.js'/>"></script>
    
    <!-- JS Library for Grid -->
    <script type="text/javascript" src="<c:url value='/scripts/griddy.js'/>"></script>
    
    <!-- JS Library for Grid -->
    <script type="text/javascript" src="<c:url value='/scripts/griddy_helper.js'/>"></script>
    
    <!-- Library for Data Point Entry Dialog -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>

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
	
	<!-- Library for Data Point Entry Dialog -->
    <script type="text/javascript" src="<c:url value='/scripts/data.point.dialog_helper.js'/>"></script>
    
    <!-- Library for showing time case has been in stage -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.countdown.min.js'/>"></script>
    
    <!-- Library for showing data point of current section-->
    <script type="text/javascript" src="<c:url value='/scripts/dp.table.display_helper.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/scripts/objects/objectsforiws2dpsections.js'/>"></script>	
	
	<!-- Hotkey Bindings. -->
	<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.2.popup.js'/>"></script>

    <script>
	var step = 2;		// Current Step.
	var caseId;			// Current Case.
	
	var objCase; 		// Case Object.
	var objPage;		// Active Page Object.
	var objDPInfo; 		// Object of Data Point Categories and Subcategories.
	var objEntityForm; 	// Entity Form Object.

	var activeCategoryId="";
	var activeSubcategoryId="";
	var activeDataPointSection="";
	var zoomflag = 0;
	//IWS-299 move this variable here from jquery.mapz.step2.js
	var oldzoomvalue = 0;

	// Global Apex Variables.
	var appId;
    var appScreen;
    var apexSessionId;
    var domain;
    var port;
    var clientDateFormat;
    var buttonMainMenuUrl;
    var ssl;
    var debug; 
    var pageLoadDebug;
    var imageLoadDebug;
    var initialPageLoad = true; // Used with auditing.  Set this to false after initial page load so we can reset the page load start time.
	var gridselector = null;	
	var objmultipleselection = null;

    <!-- On Document Ready. -->
	$(document).ready(function () {
		// Close the popup window when the parent window closes.
		window.opener.setUnload();
		
		//IWS 285,310
		//Reset the size of body window to make it adjustable to 100% with varied resoultions
		$('#step_window').css('width','100%');
		
		// Set the date/time in the footer.
		datetime();
		
		// Initialize the expanding text area
		$('textarea').expandingTextArea();
		
		// Initialize datepicker format validation.
	  	$('#datepicker').change(function(c) {	
			// Display an error if the date is incorrectly formatted.
			var dateCheck = checkDateFormat($('#datepicker').val());
			if (dateCheck == false) {
				// Default the date to the current time so there are no calendar issues.
				var defaultDate = new Date();
				defaultDate = Date.parse(defaultDate);
				defaultDate = millisToDateHandler(defaultDate);
				$('#datepicker').val(defaultDate);
			}
		});
		
		// Load data from the parent window.
		objCase = window.opener.objCase;
		objDPInfo = window.opener.objDPInfo;
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
		var activeDPEntry = window.opener.activeDPEntry;
		
		//set screen name on footer
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
		
		// Update the document sequencing information.
		updateDocumentCount();
		
		// Display the applicant details
		updateApplicantDetails();
		
		// Update File Metrics
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
		
		// Load the data point entry if one is active within the parent window.
		if (activeDPEntry) {
			displayDataPointEntry(window.opener.activeDPEntrySection,1,activeDPEntry);
		}
		
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
		
		gridselector = new ObjGridSelection(window.opener.snMaxSectionsPerSelection);
		gridselector.initKeys();
		objmultipleselection = new ObjMultipleSelection();
	});
	
	<!-- Initialize the date picker. -->
	$(function() {
//		document.getElementById('finalPg').innerHTML = objPage.finalPageNumber ;
		
		if (clientDateFormat == 'mm/dd/yy' || clientDateFormat == 'mm/dd/yyyy') {
			$("#datepicker").datepicker({ dateFormat: 'mm/dd/yy' });
		} else {
			$("#datepicker").datepicker({ dateFormat: 'dd/mm/yy' });
		}
	});
	</script>
	
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
			<div style="width: 100%; padding-bottom: 5px;"><button id="nav_prev_document" onclick="changeDocument('prev');" disabled="disabled">&larr;</button> Document <span id="sweep_l_header_active_document">0</span> of <span id="sweep_l_header_total_documents">0</span> <button id="nav_next_document" onclick="changeDocument('next');" disabled="disabled">&rarr;</button></div>
			<div style="width: 100%; padding-bottom: 10px;"><button id="nav_prev_page" onclick="changePage('prev');" disabled="disabled">&larr;</button> Page <span id="sweep_l_header_active_page">0</span> / Pages <span id="sweep_l_header_total_pages">0</span> <button id="nav_next_page" onclick="changePage('next');" disabled="disabled">&rarr;</button></div>
			<div id="finalPageNumberDiv" style=="padding: 10px 0px;">
        Final Page: <span id="finalPg" style ="color: red;"></span>
      </div>
			<div style="padding-bottom: 5px;">
				<select id="goto">
					<option value="">Go To...</option>
					<option value="last_complete">Last Complete</option>
					<option value="first_not_complete">First Not Complete</option>
					<option value="first_suspend_note">First Page with Suspend Note</option>
					<option value="last_suspend_note">Last Page with Suspend Note</option>
				</select>
			</div>
			<div class="sliderHolderStep2Top">
	      <div class="ui-icon ui-icon-circle-minus gzoombutton sliderminus">&nbsp;</div>
	      <div class="gzoomSlider slider"></div>
	      <div class="ui-icon ui-icon-circle-plus gzoombutton sliderplus" style="background-color: blue">&nbsp;</div>
	      <div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton rotateleft" onClick="javascript:rotateImageHandler('left');">&nbsp;</div>
	      <div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton rotateright" onClick="javascript:rotateImageHandler('right');">&nbsp;</div>
	      <span class="zoomedvaluestep2"></span>
      </div>
			
		
		</div>
	</div><!-- End Header -->
	
	<div id="sweep_l_content"><!-- Begin Content -->
		<div class="map-viewport">
			<div id="map-1">
				<!-- height is set so that (height-44)/45 is integer -->
				<img id="content_preview_image1" src="images/imageLoadingPlaceHolder.jpg" width="999" height="1349" style="margin-left:450px;float:right" alt="" class="first-level current-level level" />			
				<img id="content_preview_image2" src="" width="1099" height="1484" alt="" class="level" style="display: none; margin-left:400px;" />
				<img id="content_preview_image3" src="" width="1199" height="1619" alt="" class="level" style="display: none; margin-left:350px;" />	
				<img id="content_preview_image4" src="" width="1433" height="1934" alt="" class="level" style="display: none; margin-left:233px;" />
				<img id="content_preview_image5" src="" width="1878" height="2069" alt="" class="level" style="display: none;" />
				<img id="content_preview_image6" src="" width="2041" height="2249" alt="" class="level" style="display: none;" />
				<img id="content_preview_image7" src="" width="2286" height="2519" alt="" class="level" style="display: none;" />
				<img id="content_preview_image8" src="" width="2450" height="2699" alt="" class="level" style="display: none;" />
				<img id="content_preview_image9" src="" width="2572" height="2834" alt="" class="level" style="display: none;" />
			</div>
		</div>
		<div class="sliderHolderStep2">
			<div class="ui-icon ui-icon-circle-minus gzoombutton sliderminus">&nbsp;</div>
      <div class="gzoomSlider slider"></div>
      <div class="ui-icon ui-icon-circle-plus gzoombutton sliderplus" style="background-color: blue">&nbsp;</div>
      <div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton rotateleft" onClick="javascript:rotateImageHandler('left');">&nbsp;</div>
      <div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton rotateright" onClick="javascript:rotateImageHandler('right');">&nbsp;</div>
      <span class="zoomedvaluestep2"></span>
		</div>
	</div><!-- End Content -->

</div><!-- End Page Wrapper -->

<!--  DataPoint Popup Window -->
<%@ include file='dataPoints.jsp' %>
