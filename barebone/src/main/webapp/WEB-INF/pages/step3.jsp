<%@ include file="/common/taglibs.jsp"%>

<head>
	<title><fmt:message key="step3.title"/></title>
    <meta name="heading" content="<fmt:message key='step3.heading'/>"/>
    <meta name="menu" content="Step3"/>
    
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

	<!-- Content Viewer Popup Window Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/content.viewer.window_helper.js'/>"></script>
	
	<!-- Function to create data point table view -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>
	
	 <!-- JQuery Library for Table Sorting. -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.tablesorter.min.js'/>"></script>
    
    <!-- Functions for completing a step. -->
	<script type="text/javascript" src="<c:url value='/scripts/step.finish_helper.js'/>"></script>
	
	<!-- Library for the Update Category/Subcategory dialog. -->
    <script type="text/javascript" src="<c:url value='/scripts/category.subcategory.update_helper.js'/>"></script>
    
    <!-- Library for the Image Link popup window. -->
    <script type="text/javascript" src="<c:url value='/scripts/page.image.popup_helper.js'/>"></script>
    
    <!-- Library of Medical Code functions. -->
    <script type="text/javascript" src="<c:url value='/scripts/medical.codes_helper.js'/>"></script>
    
    <!-- Function to set the Main Menu button URL. -->
	<script type="text/javascript" src="<c:url value='/scripts/main.menu_helper.js'/>"></script>
	
    <script>
	var step = 3;				// Current step.

	var objCase;				// Case Object.
	var objDPInfo;				// Object of Data Point Categories and Subcategories.
	var objEntityForm;
	
	var currentCategoryId;		// The current category id of the data point.
	var currentSubcategoryId; 	// The current subcategory id of the data point.

	var activeCategoryId;		// The id of the selected category from the Update Category/Subcategory dialog.
	var activeSubcategoryId;	// The id of the selected subcategory from the Update Category/Subcategory dialog.
	var activePageId;
	
	var activeDataPointSection;
	
	var activeEntryId;
	var dpentryId;
	
	var clientDateFormat;   	// stores the date format as either mm/dd/yy or dd/mm/yy depending on clientId
	var buttonMainMenuUrl;
	
	var lhsHeight = window.screen.availHeight;	// The height of the monitor in pixels.
	var lhsWidth = window.screen.availWidth;	// The width of the monitor in pixels.
	
	var entryRequireCodeDB; // DP Entry Require Code - From Database
	var entryRequireCodeFunction; // DP Entry Require Code - From Function
	
	var gC;

	<!-- On Document Ready. -->
	$(document).ready(function () {
		// Set the date/time in the footer.
		datetime();
		
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

		// Obtain the client specific Data Point Categories
	  	$.ajax({
			url: "dataPoint/dataPointInfo/" + objCase._client.groupid,
			async:   false,
			context: document.body,
			success: function(c) {
				objDPInfo = c;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert ('An error occured within domReady() : ' + errorThrown);
			}
		});
		
	 	// Add the data points table to the page.
		addTableDataPoints(step,caseId,null);
	 	
		$('#updateCategory').dialog({
			autoOpen: false,
			title: 'Update Category/Subcategory',
			width: 700,
			modal: true,
			draggable: false,
			resizable: false
		});
	});
	</script>
</head>

<div id="sweep_r_wrapper">
    <div id="sweep_r_header"><%@ include file="datapoint_header.jsp"%></div>
	<div id="data_point_table" ><input type="hidden" id="txtPageId" value=""/></div>
</div>

<!-- This div is used for the update category/subcategory dialog window. The HTML is set dynamically within displayUpdateCategoryDialog() -->
<div id="updateCategory">
	<div id="category_list"></div>
	<div id="subcategory_list"></div>
	<div id="update_category_actions"></div>
</div>

<input id="hiddenIwsSystem" type="hidden" value="<fmt:message key='iws.system'/>" />
<input id="hiddenIwsUrlDev" type="hidden" value="<fmt:message key='iws.url.dev'/>" />
<input id="hiddenIwsUrlQa" type="hidden" value="<fmt:message key='iws.url.qa'/>" />
<input id="hiddenIwsUrlProd" type="hidden" value="<fmt:message key='iws.url.prod'/>" />

<input type="hidden" id="subCatIdName" value=""/>
<input type="hidden" id="catName" value=""/>