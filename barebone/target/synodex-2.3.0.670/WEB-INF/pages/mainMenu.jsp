<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="mainMenu.title"/></title>
    <meta name="heading" content="<fmt:message key='mainMenu.heading'/>"/>
    <meta name="menu" content="MainMenu"/>
    
	<%@ include file='/WEB-INF/pages/session.jsp' %>
	<%@ include file='/WEB-INF/pages/includes/inc_synodexparams.jsp' %>    
</head>

<%-- Removed the standard appfuse main menu configuration - synodex does not need it for now
<p><fmt:message key="mainMenu.message"/></p>

<div class="separator"></div>

<ul class="glassList">
    <li>
        <a href="<c:url value='/userform'/>"><fmt:message key="menu.user"/></a>
    </li>
    <li>
        <a href="<c:url value='/fileupload'/>"><fmt:message key="menu.selectFile"/></a>
    </li>
</ul>
 --%>
 <p>
    <fmt:message key="403.message">
        <fmt:param><c:url value="/"/></fmt:param>
    </fmt:message>
</p>

<p style="text-align: center; margin-top: 20px">
    <a href="http://community.webshots.com/photo/56793801/56801692jkyHaR"
        title="Hawaii, click to Zoom In">
    <img src="<c:url value="/images/403.jpg"/>" alt="Hawaii" /></a>
</p>
