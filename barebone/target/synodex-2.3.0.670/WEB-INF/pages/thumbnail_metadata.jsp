<div id="sweep_r_header_case_help">
	Client ID: <span id="client_id" class="client_id"></span>
	<span id="case_help" class="case_help">
		<a href="#current" title="<fmt:message key='help.info' />" id="current"><img src='<c:url value="/images/iconInformation.gif"/>' /></a>
	</span>
	<br>
	Case ID: <span id="case_id"></span>
</div>
<div id="sweep_r_metadata_data_date">Data Date:<span id="flagid"></span><input type="text" id="datepicker" disabled="disabled" style="width: 80px;" onkeydown="return onlyNumbers(event);"/> <a href="#" onclick="usePageResetDate();return false;" title="<fmt:message key='button.display.pageResetDateButton' />" id="current"><img src='<c:url value="/images/eraser_icon.gif"/>' /></a><span id="textualDate" style="position: relative;top: -8px;"></span><button class="bodybutton" title="<fmt:message key='button.display.previousDate' />" id="prev_date" style="position: relative;top: -28px;left: 139px;width: 65px;" onclick="prevDate();">Prev Date</button></div>
<div id="sweep_r_metadata_doc_numbering">
	Document Numbering:
	<br /><button class="bodybutton" id="new_doc" disabled="disabled">New</button> <button class="bodybutton" id="add_to_last" disabled="disabled">Add to Last</button>
</div>
<div id="sweep_r_metadata_set_within">
	Set Within Document: 
	<br /><button class="bodybutton" id="set_within_doc_first" disabled="disabled">First</button> <button class="bodybutton" id="set_within_doc_last" disabled="disabled">Last</button>
	<br /><button class="bodybutton" id="set_within_doc_prev" disabled="disabled">Previous</button> <button class="bodybutton" id="set_within_doc_next" disabled="disabled">Next</button>
</div>
<div id="sweep_r_metadata_bad_handwriting">
	<input type="checkbox" id="bad_handwriting" class="bodybutton" name="bad_handwriting" disabled="disabled" /> Bad Handwriting
</div>
<div id="sweep_r_metadata_status">
	<button class="bodybutton" id="suspend" disabled="disabled">Suspend</button> <button class="bodybutton" id="complete" disabled="disabled">Complete</button>
</div>
<div id="sweep_r_metadata_suspend_note">
	<span style="background-color: #FFFF00;">Suspend Note: <span id="suspend_note"></span></span>
	<!-- 
	<div id = "info" style = "float:right">	
		<ul id="navlist">
			<li id="active">
				<a href="#current" title="<fmt:message key='help.info' />" id="current"><img src='<c:url value="/images/iconInformation.gif"/>' /></a>
				<ul id="subnavlist">
					<li id="subactive"><a href="#subcurrent" id="subcurrent" ></label></a></li>
				</ul>
			</li>
		</ul>	
	</div>
	 -->
</div>
<div id="sweep_r_metadata_doc_type" style="border: 2px solid #49494A;"></div>
<div id="sweep_r_metadata_doc_type_active"></div>
