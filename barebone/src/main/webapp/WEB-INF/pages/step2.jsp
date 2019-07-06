<%@page import="com.teaminformatics.webapp.util.ControllerUtil"%>
<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="step2.title"/></title>
    <meta name="heading" content="<fmt:message key='step2.heading'/>"/>
    <meta name="menu" content="Step2"/>
    
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
	var authenticatedUserName = "<%= ControllerUtil.getAuthenticatedUserName().toString() %>";
	
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

	<!-- Function to create data point table view -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>
	
	<!-- Sort table jQuery plugin -->
	<script type="text/javascript" src="<c:url value='/scripts/jquery.tablesorter.min.js'/>"></script>
	
	<!-- Functions for completing a step. -->
	<script type="text/javascript" src="<c:url value='/scripts/step.finish_helper.js'/>"></script>
	
	<!-- Function to set the Main Menu button URL. -->
	<script type="text/javascript" src="<c:url value='/scripts/main.menu_helper.js'/>"></script>
	
    <!-- Library for showing data point of current section-->
    <script type="text/javascript" src="<c:url value='/scripts/dp.table.display_helper.js'/>"></script>
    
    <!-- Library for showing time case has been in stage -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.countdown.min.js'/>"></script>
	
    <script>
    var step = 2;				// Current step.
    
    var objCase;				// Case Object.
	var objDocTypes;			// Object of Document Types and Subtypes.
	var objDPInfo; 				// Object of Data Point Categories and Subcategories.
	var objActivePage;			// Active Page Object.
	
	var activePageDomId;		//
	var activePageId;			//
	var activePageJsonId;		//
	var activePageSeqId;		//
	
	var prevDocumentNumber; 	// Stores the last used document number for document numbering.
	var prevPageNumber; 		// Stores the last used page number for page numbering.
	var pageDocumentCounter; 	// Used with the re-ordering methods.
	
	var activeDPEntry;			// Stores the object of a clicked DP Entry. This is used within the popup on dom ready to display a datapoint category.
	var activeDPEntrySection;	// Stores the Section Number of the clicked DP Entry. This is used within the popup on dom ready to display a datapoint category.
	
	var clientDateFormat;    	// stores the date format as either mm/dd/yy or dd/mm/yy depending on clientId 
	var buttonMainMenuUrl;		// Stores the URL of the Main Menu button.
	var buttonMainMenuApexUrl;		// Stores the URL of the Apex hit.
	var isDPListQuickViewOpen;
	
	var lhsHeight = window.screen.availHeight;	// The height of the monitor in pixels.
	var lhsWidth = window.screen.availWidth;	// The width of the monitor in pixels.
	var lastSelectedSort;    //IWS-302: At Step 2 OP and QA, the sorted toggle view gets unsorted if any data point is added/deleted/edited.
	var lastSelectedSortOnPageView;
	var pageordervalidateobj = null;		//IWS-269: Page number gets set to 0 in Step 2 Fix
	var prevSelectedPage = null;
	var prevSelectedDocumentNumber;
	var prevSelectedPageNumber;
	var issorting = false;
	var dplistEntriy;
	var lastDate=null;
	var focusedDPEntryList = new Array();
	var dpChangedData=null;
	var snMaxSectionsPerSelection = null;
	var leftWindowOpened = 0;
	var hierarchyPopupCodeSelected=false;
	var thumbnailSectionClick=false;
	var assignedCategoriesForParallelizedOPStage = null;
	
	<!-- On Document Ready. -->
	$(document).ready(function () {		
		// Initialize the Move Dialog window.
	  	$('#moveDialog').dialog({
			autoOpen: false,
			title: 'Reorder Page',
			width: 735,
			modal: true,
			draggable: false,
			resizable: false
		}); 
	  	setStep2Screen(null);
	  	// Load the plugin to allow sortable tables
		$("#dataTable").tablesorter(); 	  
		thumbnailSliderClickHandler();
		datapointSubsScreenClickHandler();
		glossaryClickHandler();
		setUnload();
	});
	
	<!-- Initialize the scrolling metadata panel. -->
	$(function() {
		$( "#sweep_r_metadata" ).jScroll();
	});
	
	<!-- Initialize the date picker. -->
	$(function() {
		if (clientDateFormat == 'mm/dd/yy' || clientDateFormat == 'mm/dd/yyyy') {
			$("#datepicker").datepicker({ dateFormat: 'mm/dd/yy' });
		} else {
			$("#datepicker").datepicker({ dateFormat: 'dd/mm/yy' });
		}
	});
	

			
	</script>
	
	<!-- Hotkey Bindings. -->
	<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.step2.op.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.12.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/iws2_scripts.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/views/objstep2view.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/views/objstep2qaview.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/scripts/helper/objstep2helpers.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/helper/objdatadatapoint.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/helper/objdataconfigswitch.js'/>"></script>	
	<script type="text/javascript" src="<c:url value='/scripts/helper/objfulldplistrowdata.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/helper/objglossaryhelper.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/helper/objstep2qchelper.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/scripts/objects/objgridselection.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/objects/objutils.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/objects/objpopmessage.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/objects/objdatasearch.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/objects/objdatahiearchy.js'/>"></script>	
	<script type="text/javascript" src="<c:url value='/scripts/objects/objectsforiws2.js'/>"></script>	
	<script type="text/javascript" src="<c:url value='/scripts/objects/objectsforiws2dpsections.js'/>"></script>	
	<script type="text/javascript" src="<c:url value='/scripts/objects/objhierarchyglossary.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/objects/objstep2qa.js'/>"></script>	
	
	<script type="text/javascript" src="<c:url value='/scripts/jcarousellite_1.0.1.js'/>"></script>
	
	<link rel="stylesheet" type="text/css" href="<c:url value='/styles/globals_iws2.css'/>" />
</head>

<div id="sweep_r_wrapper">
      <div id="thumbnail_metadata_iws2_main" style="border: solid 1px #333; height:auto; margin-bottom: 5px;"><div id="cntnr_dplist_header_main" style="padding: 10px; height:70px"></div></div>
	<div id="sweep_r_header" style="display"><%@ include file="thumbnail_header.jsp"%></div>
	<!--div id="sweep_r_metadata" style="display:none"><%--%@ include file="thumbnail_metadata.jsp"--%></div -->
	
	<div id="sweep_r_content">
		<div id="global_thumbnail_wrapper"></div><!-- Thumbnails -->
	</div>
	
	<!--  This is required for the floating metadata panel to work correctly. -->
	<div id="sweep_r_footer"></div>

	<!-- This div is used for the move dialog window. The HTML is set dynamically within movePage() -->
	<div id="moveDialog"></div>
</div>

<div id="sweep_r_wrapper_iws2_dpentry">
	<div id="thumbnail_metadata_iws2"><%@ include file="/WEB-INF/pages/includes/step2_thumbnail_metadata_iws2.jsp"%></div>
	<div id="datapoint_metadata_iws2" style="clear: both;margin: 44px 0 4px 0;border: solid 1px #333;"><%@ include file="/WEB-INF/pages/includes/step2_datapoint_metadata_iws2.jsp"%></div>	
	<div id="sweep_r_content_iws2">		
		<div id="icd10code_wrapper_iws2">
			<div id="icd10code_category_list_iws2"><%@ include file="/WEB-INF/pages/includes/step2_category_list_iws2.jsp"%></div>
			<div id="icd10code_subcategory_iws2"><%@ include file="/WEB-INF/pages/includes/step2_code_selection_iws2.jsp"%></div>
		</div>
	</div>	
	<div id="cntnr_datapoints_subscreen"><%@ include file="/WEB-INF/pages/includes/step2_datapoint_screen_dpentry_iws2.jsp"%></div>
	<div id="thumbnail_slider_iws2"><%@ include file="/WEB-INF/pages/includes/step2_thumbnail_slider_iws2.jsp"%></div>
	<div id="sweep_r_footer"></div>
</div>

<div id="data_point_QAReviewNote" style="display: none">
	<div id="data_point_entry_transcript">
		<table class="popUpTableTranscript" width="100%" style="border-spacing: 8px; background-color: #F8FAE4;">
			<tr>
				<td><div onclick="cancelQAReviewNoteForDataPoint();" style="float: right; padding-right: 5px; font-weight: bold; cursor: pointer;">[ X ]</div></td>
			</tr>
			<tr>
				<div id="suspendNoteDiv" style="text-align: left;">
					<td><label id="lblQAReviewNote"></label></td>
			</tr>
			<tr>
				<td><textarea id="step2QA_reviewNote" onkeypress="enableSaveCancelBtn();"/> </textarea> </td>
				<td><span id="eraser_suspendNote" onClick="eraseQAReviewNote();">
						<img id="eraserSuspenNoteImg" title="Erases the Reviewed Note"
						style="width: 10px; height: 15px; cursor: pointer;"
						src="images/eraser_icon.gif" />
				  </span>
				</td>
			</tr>
			<tr>
				<td id="popup_QAReview_error_message"
					style="color: red; display: none;"></td>
			</tr>
		</table>
	</div>

	<div id="data_point_actions">
		<span id="saveBtn_entry">
		  <button class="bodybutton_dpentry" id="step2QA_review_popup_save_btn" onclick="saveQAReviewNoteForDataPoint();" disabled="disabled"> <fmt:message key='datapoint.display.save' /></button>
		</span>&nbsp;
		<span id="cancelBtn_entry">
		  <button class="bodybutton_dpentry" id="step2QA_review_popup_cancel_btn" onclick="cancelQAReviewNoteForDataPoint();" disabled="disabled"> <fmt:message key='datapoint.display.cancel' /></button>
		</span>
	</div>
</div>

<div id="sweep_r_wrapper_iws2_dplist">
	<div id="thumbnail_metadata_iws2" style="border: solid 1px #333; height: auto; margin-bottom: 5px;"><div id="cntnr_dplist_header" style="padding: 10px; height:70px"></div></div>
	<div id="sweep_r_content_iws2_fulldplist">
	<% if(qsStageId.equalsIgnoreCase("7") || qsStageId.equalsIgnoreCase("48") || qsStageId.equalsIgnoreCase("50")) { %>
		<div id="cntnr_datapoints_qacreen"> <%@ include file="/WEB-INF/pages/includes/step2_qa_iws2.jsp"%> </div>
	<% }else{ %>
		<div id="cntnr_datapoints_fullscreen"> <%@ include file="/WEB-INF/pages/includes/step2_datapoint_screen_iws2.jsp"%> </div>
	<%  }%>
	</div>	
	 
	<% if(!qsStageId.equalsIgnoreCase("49") && !qsStageId.equalsIgnoreCase("48")) { %>
		<div id="thumbnail_slider_iws2"> <%@ include file="/WEB-INF/pages/includes/step2_thumbnail_slider_iws2.jsp"%> </div>
	<% } %>	
	
	<div id="sweep_r_footer"></div>
</div>

<%@ include file="/WEB-INF/pages/includes/step2_tr_iws2.jsp" %>

<input id="hiddenIwsSystem" type="hidden" value="<fmt:message key='iws.system'/>" />
<input id="hiddenIwsUrlDev" type="hidden" value="<fmt:message key='iws.url.dev'/>" />
<input id="hiddenIwsUrlQa" type="hidden" value="<fmt:message key='iws.url.qa'/>" />
<input id="hiddenIwsUrlProd" type="hidden" value="<fmt:message key='iws.url.prod'/>" />


