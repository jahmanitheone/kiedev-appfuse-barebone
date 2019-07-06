<% 	// Retrieve the parameters from the session and querystring.
	// #Case Id
	Object snCaseId = session.getAttribute("caseId");
	String qsCaseId = request.getParameter("caseId");
	// #Apex Session Id
	Object snApexSessionId = session.getAttribute("apexSessionId");
	String qsApexSessionId = request.getParameter("apexSessionId");
	// #App Id
	Object snAppId = session.getAttribute("appId");
	String qsAppId = request.getParameter("appId");
	// #App Screen
	Object snAppScreen = session.getAttribute("appScreen");
	String qsAppScreen = request.getParameter("appScreen");
	// #SSL
	Object snSSL = session.getAttribute("ssl");
	String qsSSL = request.getParameter("ssl");
	// #Domain
	Object snDomain = session.getAttribute("domain");
	String qsDomain = request.getParameter("domain");
	// #Port
	Object snPort = session.getAttribute("port");
	String qsPort = request.getParameter("port");
	// #stageId
	Object snStageId = session.getAttribute("stageId");
	String qsStageId = request.getParameter("stageId");

	// Check if a session id exists.
	if (snCaseId == null) {
		// #No Session Id Exists
		// If there is a case id in the querystring, set the session  variable.
		if (qsCaseId != null) {	session.setAttribute("caseId", qsCaseId); }
	} else {
		// #Session Id Exists
		// If the session and querystring values do not match, update the session case id to the querystring.
		if (snCaseId != qsCaseId && qsCaseId != null) { session.setAttribute("caseId", qsCaseId); }
	}
	// Check if a stage id exists.
	if (snCaseId == null) {
		// #No Session stageId Exists
		// If there is a stage id in the querystring, set the session  variable.
		if (qsStageId != null) {	session.setAttribute("stageId", qsStageId); }
	} else {
		// #Session stage Id Exists
		// If the session and querystring values do not match, update the session stage id to the querystring.
		if (snStageId != qsStageId && qsStageId != null) { session.setAttribute("stageId", qsStageId); }
	}

	// Check if an apex session id exists.
	if (snApexSessionId == null) {
		// #No Apex Session Id Exists
		// If there is a apex case id in the querystring, set the session variable.
		if (qsApexSessionId != null) { session.setAttribute("apexSessionId", qsApexSessionId); }
	} else {
		// #Apex Session Id Exists
		// If the session and querystring values do not match, update the session apex session id to the querystring.
		if (snApexSessionId != qsApexSessionId && qsApexSessionId != null) { session.setAttribute("apexSessionId", qsApexSessionId); }
	}

	// Check if a app id exists.
	if (snAppId == null) {
		// #No App Id Exists
		// If there is a case id in the querystring, set the session variable.
		if (qsAppId != null) { session.setAttribute("appId", qsAppId); }
	} else {
		// #App Id Exists
		// If the session and querystring values do not match, update the session app id to the querystring.
		if (snAppId != qsAppId && qsAppId != null) { session.setAttribute("appId", qsAppId); }
	}

	// Check if a app screen exists.
	if (snAppScreen == null) {
		// #No App Screen Exists
		// If there is a app screen in the querystring, set the session variable.
		if (qsAppScreen != null) { session.setAttribute("appScreen", qsAppScreen); }
	} else {
		// #App Screen Exists
		// If the session and querystring values do not match, update the session app screen to the querystring.
		if (snAppScreen != qsAppScreen && qsAppScreen != null) { session.setAttribute("appScreen", qsAppScreen); }
	}
	
	// Check if a SSL exists.
	if (snSSL == null) {
		// #No SSL Exists
		// If there is a SSL in the querystring, set the session variable.
		if (qsSSL != null) { session.setAttribute("ssl", qsSSL); }
	} else {
		// #SSL Exists
		// If the session and querystring values do not match, update the session SSL to the querystring.
		if (snSSL != qsSSL && qsSSL != null) { session.setAttribute("ssl", qsSSL); }
	}
	
	// Check if a Domain exists.
	if (snDomain == null) {
		// #No Domain Exists
		// If there is a domain in the querystring, set the session variable.
		if (qsDomain != null) {	session.setAttribute("domain", qsDomain); }
	} else {
		// #Domain Exists
		// If the session and querystring values do not match, update the session domain to the querystring.
		if (snDomain != qsDomain && qsDomain != null) { session.setAttribute("domain", qsDomain); }
	}
	
	// Check if a Port exists.
	if (snPort == null) {
		// #No Port Exists
		// If there is a port in the querystring, set the session variable.
		if (qsPort != null) { session.setAttribute("port", qsPort); }
	} else {
		// #Port Exists
		// If the session and querystring values do not match, update the session port to the querystring.
		if (snPort != qsPort && qsPort != null) { session.setAttribute("port", qsPort); }
	}
%>