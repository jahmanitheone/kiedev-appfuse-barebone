<div id="cntnr_thumbnails">
	<div id="cntnr_thumbnails_filter">
		<div id="cntnr_thumbnails_subfilter">
			Filter: 
			<select id="iws2_dpfilter">
					<option value="nofilter">No Filter</option>
					<option value="allnonexcluded">All Non-excluded</option>
					<option value="processed">Completed</option>
					<option value="unprocessed">Incomplete</option>
					<option value="excluded">Excluded</option>
					<option value="flagged">Flagged</option>
			</select>
			<!-- 
			&nbsp;&nbsp;&nbsp;&nbsp;	
			Sort By: 
			<select id="iws2_dpfilter">
					<option value="nofilter">No Sort</option>
					<option value="111">111</option>
					<option value="222">222</option>
			</select>
			 -->
			&nbsp;&nbsp;	
			<button class="bodybutton" id="iws2_dpfilter_button">Sort/Filter</button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<% if(qsStageId.equalsIgnoreCase("7") || qsStageId.equalsIgnoreCase("48") || qsStageId.equalsIgnoreCase("50")) { %>
		        
	        <% }else{ %>
		         <button class="bodybutton" title="Back to the thumbnail screen" onclick="setStep2Screen(null);" id="iws2_dpfilter_delete_button">Thumbnails</button>
	        <%  }%>
		</div>
	</div>
	<div id="cntnr_thumbnails_slider_hide">
		<a href="javascript:void()" title="Click to show or hide thumbnail slider section" class="hide_slider"></a>
	</div>
	<div id="cntnr_thumbnails_slider">
		<div class="thumbnail_wrapper_slider main">
			<a href="#" class="prev"></a>
			<div class="thumbnail_image_wrapper_iws2">
				<ul id="thumbnail_slider_ul"></ul>
			</div>
			<a href="#" class="next"></a>
		</div>
	</div>
</div>
