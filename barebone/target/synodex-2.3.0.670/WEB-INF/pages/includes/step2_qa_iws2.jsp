<!-- <script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.step2tr.js'/>"></script> -->
<div id="cntnr_datapoint_fullllist_filter">
<div id="dp_qc1_div">&nbsp;&nbsp;Filter by group:
	<select id="iws2_dpfilter_full">
		<option value="">No Filter</option>
	</select>&nbsp;&nbsp;	
	<button class="bodybutton" id="iws2_dpfilter_full_button" onclick="filterDpList();">Filter</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button class="bodybutton" id="iws2_dpfilter_full_delete_button" onclick="handleThumbnailCheckDelete('true');">Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button class="bodybutton" id="iws2_dpfilter_full_pageview_button" onclick="setStep2Screen('Report View');">Report View</button>
	<span id="iws2_dpfilter_full_complete_span"><button class="bodybutton" id="iws2_dpfilter_full_complete_button" disabled onclick="finishStep2QA();">Complete</button></span>
</div>
<% if(qsStageId.equalsIgnoreCase("48")) { %>
<div id="dp_qc2_div" style="text-align: center;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<span id="iws2_qc2_dpfilter_full_complete_span" ><button class="bodybutton" id="iws2_qc2_dpfilter_full_complete_button" disabled  onclick="finishStep2QA();">Complete</button></span>
	<div id="iws2_qc2_messge" style="text-align: center; margin-top: 40px; margin-bottom: 20px; font-size: 15px; color: red; display: none;">
	No Step2-QC2 Actionable Items Flagged
	</div>
</div>
<% } %>

</div>
<div id="data_point_qa_table" style="display:none;"></div>
<div id="data_point_table" style="display:none;"></div>