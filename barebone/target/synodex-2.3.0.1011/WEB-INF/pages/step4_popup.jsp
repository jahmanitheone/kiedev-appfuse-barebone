<%@ include file="/common/taglibs.jsp"%>

<head>
	<title><fmt:message key="step4.title"/></title>
    <meta name="heading" content="<fmt:message key='step4.heading'/>"/>
    <meta name="menu" content="Step4"/>
    
	<!-- Window Resizing -->
    <script type="text/javascript" src="<c:url value='/scripts/window.lhs.resize_helper.js'/>"></script>
    
	<!-- Page Thumbnail Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/page.thumbnail.display_helper.js'/>"></script>
		
	<!-- Content Viewer Popup Window Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/content.viewer.window_helper.js'/>"></script>
	
	<!-- Function to create data point table view -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>
	
	<!-- Library of Notable Actions. -->
	<script type="text/javascript" src="<c:url value='/scripts/notables_helper.js'/>"></script>

	<script type="text/javascript">
	var step = 4;
	
    var caseId; 
    var appId;
    var appScreen;
    var apexSessionId;
    var buttonMainMenuUrl;
    
    var counter = 2; // FUTURE: WHAT IS THIS?
    var labelMessage = "Manually enter a notable"; //message to be displayed in front text boxes 
    
    var objDp;
    
	<!-- On Document Ready. -->	
	$(document).ready(function () {
		// Move the popup window to the top left corner.  This also ensures the bottom is aligned.
		window.moveBy(-window.screen.availWidth,-window.screen.availHeight);
		
		// Close the popup window when the parent window closes.
		window.opener.setUnload();
		
		// Get the caseId.
		caseId = window.opener.caseId;
		appId = window.opener.appId;
		appScreen = window.opener.appScreen;
		apexSessionId = window.opener.apexSessionId;
		buttonMainMenuUrl = window.opener.buttonMainMenuUrl;
		
		// Display the noteables.
		createNotableBodyContent(caseId);
		
		// Set the date time in the footer.
		datetime();
		
		// Set the Main Menu URL and Logout button.
		$('#buttonMainMenu').attr('onClick','window.opener.location.href = \"' + buttonMainMenuUrl + '\"');
		$('#buttonLogout').attr('onclick','window.opener.userLogout()');
		
		// Update the Add Category dropdown.
		updateCategoryDropdown();
	}); 
	
	window.onbeforeunload = function() {
	    //alert("LHS Closing.");
		window.opener.$('#openLHS').css('display','inline');
	};
	
	</script>
</head>
<body>
	<div id ="step4_popup_header">
		<div id="notablesHeader">
			<select id="category_list">
				<option value="">Add another category...</option>
			</select>
			<button class="bodybutton" onClick="addCategory();"><fmt:message key='button.addCategory'/></button>
			<button id="complete" class="bodybutton" onClick="completed()"><fmt:message key='button.save'/></button>
		</div>
	</div>
	<div id="step4_popup_content">
		<div id="manual_categories"></div>
		<div id="step4_popup_content_body"><div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div></div>
		<div id='TextBoxesGroup'>
			<div id="TextBoxDiv1"></div>
		</div>
	</div>
</body>