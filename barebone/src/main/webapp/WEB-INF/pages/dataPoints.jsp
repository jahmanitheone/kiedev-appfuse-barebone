<div id="data_point_wrapper">
	<div id="data_point_list"></div>
	<div id="data_point_sublist"></div>
	
	<div id="data_point_entry">
		<div id="data_point_subentry">
			<input type="hidden" id="dp_entry_id" value="0" /> <!-- Hidden element to store the dp entry id. -->
			<table class ="popUpTable" width="100%"> 
				<tr>
					<td>
						<div id="transcriptionDiv" style="text-align: left;"><label id="lblTranscription"></label> <textarea id="transcription" value=""/></textarea></div>
					</td>
					<td>
						<div id="dataDateDiv" style="text-align: left;">Data Date: <input type="text" id="datepicker" class="hasDatepicker"/> <button id="useDocumentDate" class="bodybutton" onClick="usePageDate();"><fmt:message key='datapoint.display.pageDateButton' /></button></div>			
					</td>
					<td>
						<div id = "info" style = "float:right">
							<ul id="navlist">
								<li id="active">
									<a href="#current" title="<fmt:message key='help.info' />" id="current"><img src='<c:url value="/images/iconInformation.gif"/>' /></a>
								<!-- 								
									<a href="#current" id="current"><fmt:message key='datapoint.display.info' /></a>
									<ul id="subnavlist">
										<li id="subactive"><a href="#subcurrent" id="subcurrent" ><label id="lblHelpText"><fmt:message key='datapoint.display.helpText' /></label></a></li>
									</ul>
								 -->
								</li>
							</ul>
						</div>
					</td>
				</tr> 
			</table>
		</div>
	
		<div id="data_point_lov_list">
			<div id=""><a href="#"></a></div>
		</div>
		
		<div id="data_point_actions"><span id="addAnotherButton"><button class="bodybutton" id="add_another" onClick="saveDataPoints('add');"><fmt:message key='datapoint.display.addAnother' /></button></span> <span id="saveButton"><button class="bodybutton" id="saveDPs" onclick="saveDataPoints('save')"><fmt:message key='datapoint.display.save' /></button></span> <span id="cancelButton"><button class="bodybutton" id="cancel" onclick="cancelDataPoints();" name="cancel" ><fmt:message key='datapoint.display.cancel' /></button></span> <span id="suspendButton"><button class="bodybutton" id="suspend" name="suspend" onClick="suspendNotes('suspend');" ><fmt:message key='datapoint.display.suspend' /></button></span> <span id="unSuspendButton"><button class="bodybutton" id="unSuspend" name="unSuspend" onClick="unSuspend('unSuspend');" disabled="disabled" ><fmt:message key='datapoint.display.unSuspend' /></button></span></div>
		<div id="data_point_navigation"><button class="bodybutton" id="data_point_entry_up" onclick="dataPointEntryUp();">&uarr;</button> <button class="bodybutton" id="data_point_entry_down" onclick="dataPointEntryDown();">&darr;</button></div>
	 	<!-- 
	 	<div id="data_point_actionsForStep3"><span id="saveButton"><button class="bodybutton" id="saveDPs" onclick="saveDataPointsForStep3( document.getElementById('entryId').value)" ><fmt:message key='datapoint.display.save' /></button></span><span id="cancelButton"><button class="bodybutton" id="cancel" name="cancel" onClick="hideDataPointEntryInStep3();"><fmt:message key='datapoint.display.cancel' /></button></span></div>
		-->
	</div>
</div>