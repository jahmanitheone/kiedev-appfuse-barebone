<%@ include file="/common/taglibs.jsp" %>
<%@ page import="com.teaminformatics.webapp.util.RequestUtil" %>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder"%>
<span id="userID" class="foot"><b>UserID:</b><i><span id="userName"><%=SecurityContextHolder.getContext().getAuthentication().getName()%></span></i></span>
<span id="ip" class="foot"><b>IP:</b><i><%=RequestUtil.getIP() %></i></span>
<span id="dateTime" class="foot"><b>DateTime:</b><i><label id="datetime"></label></i></span>
<span id="screen" class="foot"></span>
<span id="session" class="foot"><b>Session:</b><i><span id="sessionId"><%= session.getId() %></span></i></span>
<span id="buildnum" class="foot"><b>Build Number:</b><fmt:message key="build.number"/></span>
<span id="debugFooter" class="foot"></span>
<!-- <span id="trainID"class="foot"><b>TranID:</b><i>684345</i></span>  -->