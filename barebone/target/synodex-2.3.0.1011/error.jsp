<%@ page language="java" isErrorPage="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="http://www.springmodules.org/tags/commons-validator" prefix="v" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://displaytag.sf.net" prefix="display" %>
<%@ taglib uri="http://struts-menu.sf.net/tag-el" prefix="menu" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib uri="http://www.appfuse.org/tags/spring" prefix="appfuse" %>
<%@ page import="java.io.StringWriter" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="com.teaminformatics.webapp.util.RequestUtil" %>

<page:applyDecorator name="default">
<head>
    <title><fmt:message key="errorPage.title"/></title>
    <meta name="heading" content="<fmt:message key='errorPage.title'/>"/>
    
    <!-- Check the session for a case id. -->
	<%@ include file='/WEB-INF/pages/session.jsp' %>
	<%@ include file='/WEB-INF/pages/includes/inc_synodexparams.jsp' %>
	<!-- Ajax Error Handler Helper Functions -->
	<script type="text/javascript" src="/scripts/jquery.1.6.2.min.js"></script>
	<script type="text/javascript" src="<c:url value='/scripts/ajax.error.handler.js'/>"></script>
	<%@ include file='/WEB-INF/pages/includes/inc_synodexparams.jsp' %>
</head>

<body>
<p>
  <fmt:message key="ERROR.message">
    </fmt:message>
</p>

<%@ include file="/common/messages.jsp" %>
<%
StringWriter sw = new StringWriter();
if (exception != null) { 
	exception.printStackTrace(new PrintWriter(sw));
} else if ((Exception)request.getAttribute("javax.servlet.error.exception") != null) { 
	Exception e = ((Exception) request.getAttribute("javax.servlet.error.exception"));
	e.printStackTrace(new PrintWriter(sw));
} 
String errormsg = sw.toString().substring(0,110);

String caseId = snCaseId != null ?snCaseId.toString() : "null";
if (caseId==null)
	caseId = qsCaseId;
String sessionId = session.getId();
if (sessionId==null)
	sessionId = qsApexSessionId;
String appId = snAppId != null ?snAppId.toString() : "null";
if (appId==null)
	appId = qsAppId;
String appScreen = snAppScreen != null ?snAppScreen.toString() : "null";
if (appScreen==null)
	appScreen = qsAppScreen;
String domain = snDomain != null ?snDomain.toString() : "null";
if (domain==null)
	domain = qsDomain;
String stageId = snStageId != null ?snStageId.toString() : "null";
if (stageId==null)
	stageId = qsStageId;
String apexSessionId = snApexSessionId != null ?snApexSessionId.toString() : "null";
if (apexSessionId==null)
	apexSessionId = qsApexSessionId;
String port = snPort != null ?snPort.toString() : "null";
if (port==null)
	port = qsPort;
String ipAddress = RequestUtil.getIP();
String htmlString = "Datetime:  " + new java.util.Date() + "\n";
htmlString += "Session Id: " + sessionId + "\n";
htmlString += "Apex Session Id: " + apexSessionId + "\n";
htmlString += "IP Address: " + ipAddress + "\n";
htmlString += "User Name: useridx\n";
htmlString += "Case Id: " + caseId + "\n";
htmlString += "Stage: " + stageId + "\n";
htmlString += "Function: " + "error.jsp" + "\n";
htmlString += "Url: " + domain + ":" + port + "\n";
htmlString += "AppId: " + appId + "\n";
htmlString += "Screen: " + appScreen + "\n";
htmlString += "Error:" + sw.toString().substring(0,430) + "...... ";
htmlString += "\n";

%>

<p style="text-align: center; margin-top: 20px">
<textarea id="errorbox" class="error" 
    		style="width:80%;height:375px;overflow-y: scroll;"><%=htmlString %></textarea>
    		<br>
</p>		
</page:applyDecorator>        
		
<script>
$(document).ready( function () { 	
	<%
		//SecurityContextHolder.getContext().getAuthentication().getName() is not working here
		//This is a work around, I post the java string, than change the user name
	%>
	var changeduserid = $("#errorbox").html().replace("useridx", $('#userName').html());
	$("#errorbox").html(changeduserid);

		//Post the error log
	var pos = $("#errorbox").html().indexOf("Error:")+6;
	var errorThrown = $("#errorbox").html().substring(pos);
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
	addErrorLogEntry(dateTime, userName, sessionId, caseId, stageId, "error.jsp", errorThrown);	
});
</script>
</body>