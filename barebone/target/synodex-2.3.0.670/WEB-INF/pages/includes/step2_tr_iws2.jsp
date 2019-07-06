<script type="text/javascript" src="<c:url value='/scripts/keystroke.bindings.step2tr.js'/>"></script>
<div id="data_point_transcript" style="display:none">
		<div id="data_point_entry_transcript">
			<table class ="popUpTableTranscript" width="100%" style="border-spacing: 8px; background-color: #F8FAE4;"> 
				<tr>
					<div id="transcriptionDiv" style="text-align: left;">
						<td><label id="lblTranscription"></label></td>
						<td><textarea id="step2tr_transcrition" onkeypress="capitalize (event);"/></textarea></td>
					</div>
				</tr>
				<tr><td></td><td id="popup_tr_error_message" style="color:red; display:none;"></td></tr>
				<!-- IWO-27
				<tr>
					<td style="padding-left: 40px; padding-top: 7px;"><input id="handwritingcheck" type="checkbox" name="myTextEditBox" value="checked" style="margin-left:auto; margin-right:auto;"></td 
					<td style="padding-top: 7px;">&nbsp;<label id="ishandwritinglabel" ></label></td>
				</tr> 
				-->
			</table>
		</div>
				
		<div id="data_point_actions"><span id="saveButton"><button class="bodybutton_dpentry" id="step2tr_save_popup" onclick="saveDataPointTranscript();"><fmt:message key='datapoint.display.save' /></button></span>&nbsp;<span id="cancelButton"><button class="bodybutton_dpentry" id="step2tr_cancel_popup" onclick="cancelDataPointsTranscript();" name="cancel" ><fmt:message key='datapoint.display.cancel' /></button></span> </div> 
	</div>
	
<div id="code_desc_popup" style="display:none">
	<div>
		<label style="font-weight: bold; padding-left: 5px;">Code Type: </label></label> <label id="lblcodetype" style = "padding-left: 5px;"></label>
		<div onclick="closeCodeDescriptionPopUp();" style="float: right; padding-right: 5px; font-weight: bold; cursor:pointer; ">Close [ X ]</div>
		<br/><label style="font-weight: bold; padding-left: 5px; display: initial;">Code Value: </label> <label id="lblcodevalue" style="padding-left: 5px;"></label>
		<br/><label style="font-weight: bold; padding-left: 5px; display: initial;">Description: </label> <label id="lblcodedescription" style = "padding-left: 5px;"></label>
	</div>
</div>	


<div id="dp_code_section_page_change" style="display:none;">
	<div>
		<h4 class="lbl_popup_text">Current Values</h4>
		<!--  <label id="lblCurrentCode" style="padding-left:100px;"></label><br/>   -->
		<label id="lblCurrentPage" style="padding-left:75px;"></label>
		<label id="lblCurrentSection" style="padding-left:15px;"></label>
	</div>
	<div id="dp_entry_validation" style="display:none; padding-left:10px; color: red;"></div>
	<div id="dpentry_popup_form">
		<br><h5 class="lbl_popup_text">New Values</h5>
		<table width="100%" style="border-spacing: 8px;">
			<tr>
				<td style="padding-left: 40px; padding-top: 1px;">New Page:</td>
				<td style="padding-left: 1px;"><input id="popupNewPage" type="text" size="3" value=""/></td>
			</tr> 
			<tr>
				<td style="padding-left: 40px; padding-top: 5px;">New Section:</td>
				<td style="padding-left: 1px;"><input id="popupNewSection" type="text" size="5" value=""/></td>
			</tr>
			<td style="padding-left: 10px;"><input id="popupNewCode" type="hidden" value=""  disabled/></td> 
		</table>
	</div>
	<input id="IWS_Code_Revision" type="hidden"/>
	<input id="IWS_Popup_dpEntryId" type="hidden"/>
	<input id="IWS_Popup_pageId" type="hidden"/>
	<input id="IWS_Popup_codeId" type="hidden"/>
	<input id="IWS_Old_Code" type="hidden"/>			
	<div id="dpentry_popup_save_close" style="text-align: center; padding-bottom: 5px;">
		<span id="savedpentryFormButton"><button class="popupbutton" id="step2dpform_save_popup" onclick="saveDPEntryPopupData();"><fmt:message key='datapoint.display.save' /></button></span>&nbsp;
		<span id="closedpentryFormButton"><button class="popupbutton" id="step2dpform_close_popup" onclick="closeDPEntryPopup();" name="close" ><fmt:message key='datapoint.display.close' /></button></span> 
	</div> 
</div>

<div id="update_message_popup" style="display:none">
<span class="popup_update_message">New Page and/or New Section updated successfully...</span>
</div>

<div id="client_spec_helptext_popup" style="display:none">
<div id="client_spec_helptext_message"></div>
</div>