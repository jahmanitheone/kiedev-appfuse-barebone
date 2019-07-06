<%@ include file="/common/taglibs.jsp"%>

<head>
	<title><fmt:message key="step1.title" /></title>
	<meta name="heading" content="<fmt:message key='step1.heading'/>" />
	<meta name="menu" content="Step1" />

	<!-- Check the session for a case id. -->
	<%@ include file='session.jsp' %>

	<!-- Querystring Helper Function -->
	<script type="text/javascript" src="<c:url value='/scripts/window.querystring_helper.js'/>"></script>

	<!-- Set the application parameters. Cannot move this into an include or it will fail. -->
	<script>
	// Get application parameters from the jsp variables set in session.jsp.
	var snCaseId = <%= snCaseId %>;
	var qsCaseId = <%= qsCaseId %>;
	var snApexSessionId = <%= snApexSessionId %>;
	var qsApexSessionId = <%= qsApexSessionId %>;
	var snAppId = <%= snAppId %>;
	var qsAppId = <%= qsAppId %>;
	var snAppScreen = <%= snAppScreen %>;
	var qsAppScreen = <%= qsAppScreen %>;
	var qsStageId = <%= qsStageId %>;
	
	// Set global application variables for later retrieval.
	var caseId = qsCaseId;
	var apexSessionId = qsApexSessionId;
	var appId = qsAppId;
	var appScreen = qsAppScreen;
	
	// If no case id exists in the querystring or session, display a message.
	if (snCaseId == null && qsCaseId == null) {
		alert("Invalid case id.");
	} else if (qsCaseId == null && snCaseId != null) {
		caseId = snCaseId;
	}
	
	if (snApexSessionId == null && qsApexSessionId == null) {
		alert("Invalid apex session id.");
	} else if (qsApexSessionId == null && snApexSessionId != null) {
		apexSessionId = snApexSessionId;
	}
	
	if (snAppId == null && qsAppId == null) {
		alert("Invalid app id.");
	} else if (qsAppId == null && snAppId != null) {
		appId = snAppId;
	}
	
	if (snAppScreen == null && qsAppScreen == null) {
		alert("Invalid app screen.");
	} else if (qsAppScreen == null && snAppScreen != null) {
		appScreen = snAppScreen;
	}
	</script>

	<!-- JQuery Library for Exclude UI Blocking -->
	<script type="text/javascript" src="<c:url value='/scripts/jquery.blockUI.js'/>"></script>
	
	<!-- JQuery Library for Image Rotatation -->
	<script type="text/javascript" src="<c:url value='/scripts/jquery.ui.rotate.2.1.js'/>"></script>
	
	<!-- JQuery Library for Dynamic Div Hovering -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.jscroll.min.js'/>"></script>
	
	<!-- Rotation Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/rotate_helper.js'/>"></script>
	
	<!-- Page Ordering Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/page.ordering_helper.js'/>"></script>
	
	<!-- Metadata Display/Edit/Save Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/page.metadata_helper.js'/>"></script>
	
	<!-- Page Thumbnail Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/page.thumbnail.display_helper.js'/>"></script>
	
	<!-- Content Viewer Popup Window Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/content.viewer.window_helper.js'/>"></script>
	
	<!-- Document Ready Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/dom.ready_helper.js'/>"></script>
	
	<!-- Functions for completing a step. -->
	<script type="text/javascript" src="<c:url value='/scripts/step.finish_helper.js'/>"></script>
	
	<script>
	var buttonMainMenuUrl;		// Stores the URL of the Main Menu button.
	var buttonMainMenuApexUrl;		// Stores the URL of the Apex hit.
	</script>
	
	<!-- Function to set the Main Menu button URL. -->
	<script type="text/javascript" src="<c:url value='/scripts/main.menu_helper.js'/>"></script>
	
	<script>
	var step = 1;				// Current step.
	
	var objCase;				// Case Object.
	var objDocTypes;			// Object of Document Types and Subtypes.
	var objActivePage;			// Active Page Object.
	
	var activePageDomId;		//
	var activePageId;			//
	var activePageJsonId;		//
	var activePageSeqId;		//
	var lastdate;
	
	var prevDocumentNumber; 	// Stores the last used document number for document numbering.
	var prevPageNumber; 		// Stores the last used page number for page numbering.
	var pageDocumentCounter; 	// Used with the re-ordering methods.
	
	var clientDateFormat;		// stores the date format as either mm/dd/yy or dd/mm/yy depending on clientId 
	
	var lhsHeight = window.screen.availHeight;	// The height of the monitor in pixels.
	var lhsWidth = window.screen.availWidth;	// The width of the monitor in pixels.
	var pageordervalidateobj = null;		//IWS-269: Page number gets set to 0 in Step 2 Fix
	var prevSelectedPage = null;
	var prevSelectedDocumentNumber;
	var prevSelectedPageNumber;
	var issorting = false;
	
	
    <!-- On Document Ready. -->
	$(document).ready(function () {
	  	$('#moveDialog').dialog({
			autoOpen: false,
			title: 'Reorder Page',
			width: 735,
			modal: true,
			draggable: false,
			resizable: false
		});

	  	// Remove the toggle button from step 1
	  	$('#toggle').remove();
	  	//$('#completeStep').remove();
	  	$('.sweep_r_header_buttons').css('padding','0px');
	});

	
	function onlyNumbers(event)
	{
		var theEvent = event || window.event;
		var key = theEvent.keyCode || theEvent.which;
	    //if (specialKey(key)) return true;
	    if ((key >= 48 && key <= 57 && event.shiftKey==false) || (key >= 96 && key <= 105) || key == 189 || key == 190 || key == 191 || key == 109 || key == 110 || key == 111 || key == 8 || key == 9 || key == 46){ 
	      return true
	    }
	    else{
	    	return false;
	    }
	}
	
	<!-- Initialize the scrolling metadata panel. -->
	$(function() {
		$( "#sweep_r_metadata" ).jScroll();
	});
	</script>
	
	<!-- Hotkey Bindings. -->
	<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.12.js'/>"></script>
</head>

<div id="sweep_r_wrapper">
	<div id="sweep_r_header"><%@ include file="thumbnail_header.jsp"%></div>
	<div id="sweep_r_metadata"><%@ include file="thumbnail_metadata.jsp"%></div>

	<div id="sweep_r_content">
		<div id="global_thumbnail_wrapper"></div><!-- Thumbnails -->
		<input type="hidden" id="txtPageId" value=""/>
	</div>
	
	<!--  This is required for the floating metadata panel to work correctly. -->
	<div id="sweep_r_footer"></div>
	
	<!-- This div is used for the move dialog window. The HTML is set dynamically within movePage() -->
	<div id="moveDialog"></div>
</div>