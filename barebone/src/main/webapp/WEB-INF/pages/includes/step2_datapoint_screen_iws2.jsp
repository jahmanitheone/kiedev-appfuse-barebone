<div id="cntnr_datapoint_fullllist_filter">
	Filter by group:
	<select id="iws2_dpfilter_full">
	<%if(qsStageId.equalsIgnoreCase("71")){ %>
	<option value="assignedcategories" selected="selected">Assigned Categories</option>
	<option value="allcategories">All Categories</option>
	<%}else{ %>
	<option value="">No Filter</option>
	<%} %>
	</select> 
	&nbsp;&nbsp;	
	<button class="bodybutton" id="iws2_dpfilter_full_button" onclick="addTableDataPointsHandler('fulldplistfilter');">Filter</button>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="bodybutton" id="iws2_dpfilter_full_delete_button" onclick="handleThumbnailCheckDelete('true');">Delete</button>
	&nbsp;<button class="bodybutton" id="iws2_dpfilter_full_pageview_button" onclick="dataPointListForPageView();">Page View</button>
	&nbsp;<span id="iws2_dpfilter_full_complete_span"><button class="bodybutton" id="iws2_dpfilter_full_complete_button" onclick="finishStepConfirm();">Complete</button></span>
	&nbsp;<button class="bodybutton" id="iws2_dpfilter_full_thumbnails_button" onclick="setStep2Screen(null);">Thumbnails</button>
</div>

<div id="pageview_datapoint_fullllist" style="display:none;">
	<button class="bodybutton" id="iws2_step2tr_complete_button" onclick="completeStep2Tr();" style="float: right;">Complete</button>
</div>
<div id="data_point_table" style="display:none;"></div>

