
<div class="sweep_r_header_column_rotate">
<%if(!qsStageId.equalsIgnoreCase("6") && !qsStageId.equalsIgnoreCase("66") && !qsStageId.equalsIgnoreCase("67") && !qsStageId.equalsIgnoreCase("68") && !qsStageId.equalsIgnoreCase("71")){ %>
	<div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton" id="rotate_all_left" onClick="javascript:rotateAllThumbnails('left');">&nbsp;</div>
	<div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton" id="rotate_all_right" onClick="javascript:rotateAllThumbnails('right');">&nbsp;</div>
<%}%>
</div>
<div class="sweep_r_header_buttons">
	<button id="sortbtn" onclick="sort()" class="bodybutton">Sort/Filter</button>
	&nbsp;
	<button class="bodybutton" id="deletebtn" style="display: none;" onclick="handleThumbnailCheckDelete();">Delete</button>
	&nbsp;
	<button class="bodybutton" id="toggle" onclick="setStep2Screen('dplist');">DP List</button>
	&nbsp;
	<button class="bodybutton" id="completeStep" onclick="finishStepConfirm();">Complete</button>
</div>

<div class="sweep_r_header_sort_by" id="rightSideSortHeader">
	<span id="sortBy">Sort By: 
		<select id="page_sort">
			<option value="nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc"><fmt:message key='sort.nosort' /></option>
			<option value="date_documentDate_asc"><fmt:message key='sort.dateasc' /></option>
			<option value="date_documentDate_desc"><fmt:message key='sort.datedesc' /></option>
			<option value="originalscansequence_originalPageNumber_asc"><fmt:message key='sort.originalscansequenceasc' /></option>
			<option value="originalscansequence_originalPageNumber_desc"><fmt:message key='sort.originalscansequencedesc' /></option>
			<!--  <option value="documentType_documentTypeId_asc">Document Type</option> -->
		</select> 
	</span>
</div>

<div class="sweep_r_header_filter" id="rightSideFilterHeader">
	<span id="filter">Filter: 
		<select id="page_filter">
			<%if(qsStageId.equalsIgnoreCase("71")){%>
			<option value="assigneddoctypes"><fmt:message key='filter.assigneddoctypes' /></option>
			<option value="assignedalldoctypes"><fmt:message key='filter.assignedalldoctypes' /></option>
			<%}else{%>
			<option value="nofilter"><fmt:message key='filter.nofilter' /></option>
			<%if(!qsStageId.equalsIgnoreCase("6")){ %>
			<option value="allnonexcluded"><fmt:message key='filter.allnonexcluded' /></option>
			<%} %>
			<option value="processed"><fmt:message key='filter.processed' /></option>
			<option value="unprocessed"><fmt:message key='filter.unprocessed' /></option>
			<%if(!qsStageId.equalsIgnoreCase("6")){ %>
			<option value="excluded"><fmt:message key='filter.excluded' /></option>
			<%} %>
			<option value="flagged"><fmt:message key='filter.flagged' /></option>
			<%}%>
			<!-- <option value="type"><fmt:message key='filter.type' /></option> -->
		</select> 
	</span>
</div>