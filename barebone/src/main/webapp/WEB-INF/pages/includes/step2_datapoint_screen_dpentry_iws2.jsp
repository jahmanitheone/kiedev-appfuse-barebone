<div id="cntnr_datapoint_dpfilter">
	<div id="cntnr_datapoint_subdpfilter">
	Filter by group:
	<!--select id="iws2_dpfilter">
			<option value="nofilter">No Filter</option>
			<option value="allnonexcluded">All Non-excluded</option>
			<option value="processed">Completed</option>
			<option value="unprocessed">Incomplete</option>
			<option value="excluded">Excluded</option>
			<option value="flagged">Flagged</option>
	</select-->
	<select id="section_dpfilter"><option value="">No Filter</option></select> 
	&nbsp;&nbsp;
	<button class="bodybutton" id="iws2_dpfilter_button" onclick="addTableSpecificDataPointsHandler('', 'sectiondplistfilter');">Filter</button>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button class="bodybutton" id="iws2_dpfilter_delete_button" onclick="handleThumbnailCheckDelete('false');">Delete</button>
	&nbsp;&nbsp;<button class="bodybutton" title="Go to the datapoint full list" onclick="setStep2Screen('dplist');" id="iws2_dpfilter_delete_button">Full DP List</button>
	&nbsp;&nbsp;<button class="bodybutton" title="Go to the datapoint full list quick view" id="iws2_dpfilter_delete_button"  onClick="window.open('dplistquickview','popuppage','width=1050px,height=500px,top=0,left=0,scrollbars=yes');">DP Quick View</button>
	</div>
</div>
<div id="cntnr_datapoints_hide">
<a href="javascript:void();return false;" title="Click to show or hide datapoint section" class="hide_datapoints"></a>
</div>
<div id="cur_sel_dp_table" style="display:block;"></div>
