<%@ include file="/common/taglibs.jsp"%>

<head>
	<title><fmt:message key="step4.title"/></title>
    <meta name="heading" content="<fmt:message key='step4.heading'/>"/>
    <meta name="menu" content="Step4"/>
    
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
	
	<!-- Page Thumbnail Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/page.thumbnail.display_helper.js'/>"></script>
		
	<!-- Content Viewer Popup Window Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/content.viewer.window_helper.js'/>"></script>

	<!-- JQuery Library to sort tables. -->
	<script type="text/javascript" src="<c:url value='/scripts/jquery.tablesorter.min.js'/>"></script>

	<!-- Function to create data point table view -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>
	
	<!-- Load the global helper -->
	<script type="text/javascript" src="<c:url value='/scripts/global_helper.js'/>"></script>
	
	<!-- Functions for completing a step. -->
	<script type="text/javascript" src="<c:url value='/scripts/step.finish_helper.js'/>"></script>

	<!-- Function to set the Main Menu button URL. -->
	<script type="text/javascript" src="<c:url value='/scripts/main.menu_helper.js'/>"></script>

    <script>
    var step = 4;			// Current step.

    var clientDateFormat;	//stores the date format as either mm/dd/yy or dd/mm/yy depending on clientId
    var buttonMainMenuUrl;
    
    var objCase;
    
    var lhsHeight = window.screen.availHeight;	// The height of the monitor in pixels.
	var lhsWidth = window.screen.availWidth;	// The width of the monitor in pixels.
    
	<!-- On Document Ready. -->
    $(document).ready(function () {
		// Get the case object.
		var sortString = "nosort";
		var filterString = "nofilter";
		$.ajax({
			url: "sortcases/" + caseId + "/" + sortString + "/" + filterString,
			async:   false,
			context: document.body,
			success: function(c){
				// Add case to global variable so we can always retrieve it.
				objCase = c;
				
				//set screen name on footer
				updateScreenOnFooter(objCase);
				
				// Set the date format to a global variable.
				clientDateFormat = objCase._client.defaultDateFormat;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert ('An error occured within domReady() : ' + errorThrown);
			}
		});

		// Open the LHS window.
		openLHS();
		
		// Add the data points table.
		addTableDataPoints(step, caseId, null);	
		
		// Add LHS window onClose event that displays a button on RHS to re-open window.
		leftWindow.onbeforeunload = function() {
		   // alert("LHS Closing.");
			$('#openLHS').css('display','inline');
		};
	});
    
    function openLHS() {
    	leftWindow = window.open("step4_popup","step1_left","width=" + lhsWidth + ",height=" + lhsWidth + ",scrollbars=1,top=0,left=0");
    	
    	$('#openLHS').css('display','none');
    }
	</script>
</head>

<div id="sweep_r_wrapper">
    <div id="sweep_r_header"><%@ include file="datapoint_header.jsp"%></div>
	<div id="data_point_table" ><input type="hidden" id="txtPageId" value=""/></div>
</div>

<input id="hiddenIwsSystem" type="hidden" value="<fmt:message key='iws.system'/>" />
<input id="hiddenIwsUrlDev" type="hidden" value="<fmt:message key='iws.url.dev'/>" />
<input id="hiddenIwsUrlQa" type="hidden" value="<fmt:message key='iws.url.qa'/>" />
<input id="hiddenIwsUrlProd" type="hidden" value="<fmt:message key='iws.url.prod'/>" />