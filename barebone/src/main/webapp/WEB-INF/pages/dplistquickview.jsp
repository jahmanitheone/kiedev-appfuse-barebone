<%@ page import="com.teaminformatics.synodex.model.Case" %>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file='session.jsp' %>
<head>
    <title><fmt:message key="dplist.quickview.title"/></title>
    <meta name="heading" content="<fmt:message key='step2.heading'/>"/>
    <meta name="menu" content="Step2"/>
    
    <!-- Library for Data Point Entry Dialog -->
	<script type="text/javascript" src="<c:url value='/scripts/page.table.display_helper.js'/>"></script>
    
    <!-- Library for showing time case has been in stage -->
    <script type="text/javascript" src="<c:url value='/scripts/global_helper.js'/>"></script>
    
    <!-- Library for short cut key -->
    <script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.step2.op.js'/>"></script>

	<link rel="stylesheet" type="text/css" href="<c:url value='/styles/globals_iws2.css'/>" />
	<!--Library for sorting table by column header-->
	<script type="text/javascript" src="<c:url value='/scripts/jquery.tablesorter.min.js'/>"></script>
	
</head>

<script>
var objCase = window.opener.objCase;     // Case Object.
var step = 2;							// Current Step.
//Load the clientDateFormat from the case object. 
if(objCase.languageId == objCase._client.defaultLanguageId){
 var clientDateFormat = objCase._client.defaultDateFormat;
}else{
	$.ajax({
		type: "POST",
	  	url: "dataPoint/dataPointLanguage/" + objCase.languageId,
	  	async: false,
	  	success: function(format) {
	  		var clientDateFormat = format[0].dateFormat;
	  	},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
		}
	});
}
isDPListQuickViewOpen = true;
var qsStageId = window.opener.qsStageId;


$(function() {
	$('#header').css('display','none');
	addTableDataPointsHandler(null);
});
</script>

<div id="data_point_table"  style="display:block;">
	<div id="cur_sel_dp_table"></div>
</div>

<div id="code_desc_popup" style="display:none">
	<div>
		<label style="font-weight: bold; padding-left: 5px;">Code Type: </label></label> <label id="lblcodetype" style = "padding-left: 5px;"></label>
		<div onclick="closeCodeDescriptionPopUp();" style="float: right; padding-right: 5px; font-weight: bold; cursor:pointer; ">Close [ X ]</div>
		<br/><label style="font-weight: bold; padding-left: 5px; display: initial;">Code Value: </label> <label id="lblcodevalue" style="padding-left: 5px;"></label>
		<br/><label style="font-weight: bold; padding-left: 5px; display: initial;">Description: </label> <label id="lblcodedescription" style = "padding-left: 5px;"></label>
	</div>
</div>
