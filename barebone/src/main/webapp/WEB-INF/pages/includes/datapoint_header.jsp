<div class="sweep_r_header_buttons">
	<button id="sortbtn" onclick="sort()" class="bodybutton">Filter</button>
	&nbsp;
	<button class="bodybutton" id="deletebtn" onclick="handleThumbnailCheckDelete();">Delete</button>
	&nbsp;
	<button class="bodybutton" id="dptoggle" onclick="setStep2Screen('dplist');">Thumbnails</button>
	&nbsp;
	<button class="bodybutton" id="completeStep" onclick="finishStepConfirm();">Complete</button>
</div>

<div class="sweep_r_header_filter" id="rightSideFilterHeader">
	<span id="filter">Filter by group  
		<select id="page_filter">
			<option value="nofilter">No filter</option>
			<option value="group">Background Data</option>
			<option value="group">Family History</option>
			<option value="group">Imaging</option>
		</select> 
	</span>
</div>