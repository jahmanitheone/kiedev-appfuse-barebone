<%@ page import="com.teaminformatics.synodex.model.Case" %>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file='session.jsp' %>
<head>
    <title><fmt:message key="dplist.quickview.title"/></title>
    <meta name="heading" content="<fmt:message key='step2.heading'/>"/>
    <meta name="menu" content="Step2"/>

<!-- Querystring Helper Function -->
  <script type="text/javascript" src="<c:url value='/scripts/window.querystring_helper.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/scripts/iws2_scripts.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/views/objstep2view.js'/>"></script>
  
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
  <script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.step2.op.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/scripts/views/objstep2qaview.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/scripts/objects/objforhierarchypopup.js'/>"></script>

<link rel="stylesheet" type="text/css" href="<c:url value='/styles/globals_iws2.css'/>" />
</head>

<script>
	var objCase = window.opener.objCase; // Case Object.
	var step = 2; // curent Step
	var objDPInfo = window.opener.objDPInfo; // Object of Data Point Categories and Subcategories.
	var objActivePage = window.opener.objActivePage; // Active Page Object.
	var hierarchyPopUpWindow = window.opener.hierarchyPopUpWindow;
	var focusedDPEntryList = new Array();
	var codeToBeSearch = window.opener.codeToBeSearch
	var caseId = window.opener.caseId;
	var lhsHeight = window.screen.availHeight; // The height of the monitor in pixels.
	var lhsWidth = window.screen.availWidth; // The width of the monitor in pixels.
	var qsStageId =window.opener.qsStageId ;
	var qa1DpRowCounter = window.opener.qa1rowcounter;
	var currOpenDpRowMasterId = window.opener.currentDpRowOpenId;
	var currDpRowSectionRange =window.opener.currentDpRowSectionRange;
	var currDpRowPageNumber = window.opener.currentDpRowPageNumber;
	var currDpRowPageId = window.opener.currentDpRowPageId;
	var currDpRowEntryId = window.opener.currentDpRowEntryId;
	var currDpRowDataDate =window.opener.currentDpRowDataDate;
	var currDpRowLegendValue =window.opener.currentDpRowLegendValue;
	var currDpRowTranscriptValue =window.opener.currentDpRowTranscriptValue;
	var snMaxSectionsPerSelection = window.opener.snMaxSectionsPerSelection;
	var clientDateFormat = window.opener.clientDateFormat;
	$(function() {
		var hierachyPopUp = new ObjForHierarchyPopUp(codeToBeSearch,currDpRowEntryId);
		hierachyPopUp.init();
	});
</script>

<div id="sweep_r_wrapper_iws2_hieracrchy_dpentry">
  <div id="sweep_r_content_iws2">   
    <div id="icd10code_wrapper_iws2">
      <div id="icd10code_category_list_iws2"><%@ include file="/WEB-INF/pages/includes/step2_category_list_iws2.jsp"%></div>
      <div id="icd10code_subcategory_iws2"><%@ include file="/WEB-INF/pages/includes/step2_code_selection_iws2.jsp"%></div>
    </div>
  </div>  
  <div id="sweep_r_footer"></div>
</div>
