<%@ include file="/common/taglibs.jsp"%>
<div id= "logos">
	<div style="width: 33%; float: left;"><img src="<c:url value="/images/innodata-isogen-logo.gif"/>" /></div>
	<div style="width: 34%; float: left; text-align: center; padding-top: 3px;"><button class="bodybutton" id="buttonMainMenu">Main Menu</button> <button class="bodybutton" id="buttonLogout">Logout</button></div>	
	<div style="width: 33%; float: left;"><img src="<c:url value="/images/synodex-logo.png"/>" style="float: right; padding-right: 10px;"/></div>
</div>
<%-- Put constants into request scope --%>
<appfuse:constants scope="request"/>