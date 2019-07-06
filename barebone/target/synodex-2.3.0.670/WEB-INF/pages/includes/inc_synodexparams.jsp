	<!-- Querystring Helper Function -->
	<script type="text/javascript" src="<c:url value='/scripts/window.querystring_helper.js'/>"></script>
	
	<!-- IWS application variables-->
	<script>
	// Get application parameters from the jsp variables set in session.jsp.
	var snCaseId = "<%= snCaseId %>";
	var qsCaseId = "<%= qsCaseId %>";
	var snApexSessionId = "<%= snApexSessionId %>";
	var qsApexSessionId = "<%= qsApexSessionId %>";
	var snAppId = "<%= snAppId %>";
	var qsAppId = "<%= qsAppId %>";
	var snAppScreen = "<%= snAppScreen %>";
	var qsAppScreen = "<%= qsAppScreen %>";
	var qsStageId = "<%= qsStageId %>";
	var snStageId = "<%= snStageId %>";
	var snDomain =  "<%= snDomain %>";
	var qsDomain =  "<%= qsDomain %>";
	var snPort =  "<%= snPort %>";
	var qsPort =  "<%= qsPort %>";
	var snSSL =  "<%= snSSL %>";
	var qsSSL =  "<%= qsSSL %>";
	
	// Set global application variables for later retrieval.
	var caseId = qsCaseId;
	var apexSessionId = qsApexSessionId;
	var appId = qsAppId;
	var appScreen = qsAppScreen;

	// If no case id exists in the querystring or session, display a message.
	if (snCaseId!=null && snCaseId!="null")
		caseId = snCaseId;
	else if (qsCaseId!=null && qsCaseId!="null")
		caseId = qsCaseId;
	else
		alert("Invalid case id.");
		
	if (snApexSessionId!=null && snApexSessionId!="null")
		apexSessionId = snApexSessionId;
	else if (qsApexSessionId!=null && qsApexSessionId!="null")
		apexSessionId = qsApexSessionId;
	else
		alert("Invalid apex session id.");

	if (snAppId!=null && snAppId!="null")
		appId = snAppId;
	else if (qsAppId!=null && qsAppId!="null")
		appId = qsAppId;
	else
		alert("Invalid app id.");

	if (snAppScreen!=null && snAppScreen!="null")
		appScreen = snAppScreen;
	else if (qsAppScreen!=null && qsAppScreen!="null")
		appScreen = qsAppScreen;
	else
		alert("Invalid app screen.");
	
	if (snDomain!=null && snDomain!="null")
		domain = snDomain;
	else if (qsDomain!=null && qsDomain!="null")
		domain = qsDomain;
	else
		domain = null;
		
	if (snPort!=null && snPort!="null")
		port = snPort;
	else if (qsPort!=null && qsPort!="null")
		port = qsPort;
	else
		port = null;
	
	if (snSSL!=null && snSSL!="null")
		ssl = snSSL;
	else if (qsSSL!=null && qsSSL!="null")
		ssl = qsSSL;
	else
		ssl = null;

	stageId = snStageId != null ?snStageId.toString() : "null";
	if (stageId==null || stageId=="null")
		stageId = qsStageId;

	var buttonMainMenuUrl;		// Stores the URL of the Main Menu button.
	</script>
	
	<!-- Function to set the Main Menu button URL. -->
	<script type="text/javascript" src="<c:url value='/scripts/main.menu_helper.js'/>"></script>
