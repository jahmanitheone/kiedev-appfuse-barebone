<%@ include file="/common/taglibs.jsp"%>
<page:applyDecorator name="default">
<head>
    <title><fmt:message key="404.title"/></title>
    <meta name="heading" content="<fmt:message key='404.title'/>"/>
    
    <!-- Check the session for a case id. -->
	<%@ include file='/WEB-INF/pages/session.jsp' %>
	<%@ include file='/WEB-INF/pages/includes/inc_synodexparams.jsp' %>
</head>

<p>
    <fmt:message key="404.message">
        
    </fmt:message>
</p>

<p style="text-align: center; margin-top: 20px">
    <a href="http://community.webshots.com/photo/87848122/87848260vtOXvy"
        title="Emerald Lake - Western Canada, click to Zoom In">
    <img  src="<c:url value="/images/404.jpg"/>" alt="Emerald Lake - Western Canada" /></a>
</p>
</page:applyDecorator>