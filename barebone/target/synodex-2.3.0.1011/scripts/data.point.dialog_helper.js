/* 
File: data.point.dialog_helper.js
Responsible for the data point entry dialog in step 2 LHS. 

Loaded In Steps:
- Step 2 LHS - <step2_popup.jsp> 

*****

Function: dataPointEntryUp()
Move the data point entry div up.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Up Button Click
*/

var DataPoinUpdatedObj = null;


function dataPointEntryUp() {
	$("#data_point_wrapper").animate({"top": "-=135px"}, "slow");
}

/*
Function: dataPointEntryDown()
Move the data point entry div down.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Down Button Click
*/
function dataPointEntryDown() {
	$("#data_point_wrapper").animate({"top": "+=135px"}, "slow");
}

/*
Function: displayDataPointEntry(rowNumber, flag, entry)
Display the Data Point Entry popup.

Parameters:
rowNumber - Used to calculate the placement of the popup window.
flag - 0 insert,1 update - Used to differentiate Insert and Update operations.
entry - Entry object JSON string. Used during an update to get the previous parameters.

Page Actions:
- Step 2 LHS Grid Line Click

Called Functions:
- <resetDataPointEntryPopup()>
- <displayDataPointCategories()>
- <categoryClickHandler(currentCategoryId)> - Update Only
- <subcategoryClickHandler(currentSubcategoryId)> - Update Only
- <millisToDateHandler(millis)> - Update Only
*/
var suspendNoteForQA =null;
function displayDataPointEntry(rowNumber, flag, entry) {
	// select the row in case IWS2
	if(flag == 3 && entry == null){		
		// Re-highlight the active row.
		//$('#grid_row_' + rowNumber).attr('class','grid_row_over selected');		
		var tmpsecbegend = gridselector.getNewObjBegEndSection(rowNumber);		
		if(tmpsecbegend.isValid())
		{
			setGridRowSelections(tmpsecbegend);
		} else
		{
			alert("The datapoint beginning or end section is invalid!");
		}
		
		return;
	}
	
	// Set the active category and subcategory ids to nothing.
	activeCategoryId = '';
	activeSubcategoryId = '';

	// Set the active row number to a global variable.
	activeDataPointSection = rowNumber;

	// Clear the current data point entry table display.
	resetDataPointEntryPopup();

	// Store the offsets of the active grid row.  Do this so we know where to display the popup.
	var offsetLeft = $('.map-viewport').offset().left + 1;
	
	// offsetTop can't be fixed to 44 pixel because of zooming. Set it to the top of the next row
	if (rowNumber == 30) {
		var offsetTop = $('#grid_row_' + rowNumber).offset().top;
		offsetTop = offsetTop + 44;
	} else {
		var nextRowNum = rowNumber + 1;
		var offsetTop = $('#grid_row_' + nextRowNum).offset().top;
	}
	
	//var clientId = objCase._client.clientid;

	// Add the row height to the offset
	//offsetTop = offsetTop + 44;
	offsetLeft = offsetLeft - 1;

	// Update the Cancel button action.		
	$('#cancel').click(function() { hideDataPointEntry(rowNumber); resetDataPointEntryPopup();});

	// Set the location of the data point entry form
	$('#data_point_wrapper').offset({left:offsetLeft,top:offsetTop});

	// Dispaly the data point entry form
	$('#data_point_wrapper').css('display','block');

	// Add Data Point Categories to Popup window
	displayDataPointCategories();

	// Check if this is an update or a clean insert.
	if (flag == 0) {
		// #Insert
		 
		DataPoinUpdatedObj = null;

		$('#dataDateDiv').css('display','none');
		$('#transcriptionDiv').css('display','none');
		$('#info').css('display','none');
	} else if (flag == 1) {
		// #Update
		
		// Re-highlight the active row.
		$('#grid_row_' + rowNumber).attr('class','grid_row_over selected');

		var formEntryHashMap = new Object();

		// Decode the entry object JSON string.
		var updateEntry =  JSON.parse(decodeURIComponent(entry));

		// Load the variables straight up for easier readablity
		formEntryHashMap['pageId'] = updateEntry._page.id;
		formEntryHashMap['sectionnumber'] = updateEntry.sectionnumber;
		formEntryHashMap['dpcategoryname'] = updateEntry._dataPointFormEntity._dataPointCategory.dpcategoryname;
		formEntryHashMap['entrytranscription'] = updateEntry.entrytranscription;
		formEntryHashMap['dpcategoryid'] = updateEntry._dataPointFormEntity._dataPointCategory.dpcategoryid;
		formEntryHashMap['dpentryid'] = updateEntry.dpentryid;
		formEntryHashMap['dpformentityid'] = updateEntry._dataPointFormEntity.dpformentityid;
		formEntryHashMap['spContentID'] = updateEntry._page.spContentID;
		formEntryHashMap['suspendnote'] = updateEntry.suspendnote;
		suspendNoteForQA = updateEntry.suspendnote;
		// Check for null as not every entry will have a status.
		if (updateEntry.status == null || updateEntry.status == '') {
			formEntryHashMap['status'] = '';
		} else {
			formEntryHashMap['status'] = updateEntry.status;
		}
		// Check for null as not every entry will have a data date	
		if (updateEntry.dataDate == null || updateEntry.dataDate == '') {
			formEntryHashMap['dataDate'] = ''; 
		} else {
			formEntryHashMap['dataDate'] = updateEntry.dataDate;
		}
		//Check for null as not every entry will have a sub category	
		if (updateEntry._dataPointFormEntity._subCategory == null || updateEntry._dataPointFormEntity._subCategory == '') {
			formEntryHashMap['dpsubcatid'] = 0; 
		} else {
			formEntryHashMap['dpsubcatid'] = updateEntry._dataPointFormEntity._subCategory.dpsubcatid;
		}

		if(formEntryHashMap['dataDate'] == '') {
			$('#dataDateDiv').css('display','none');
		} else {
			$('#dataDateDiv').css('display','block');
		}

		// Mock a click of the category
		categoryClickHandler(formEntryHashMap['dpcategoryid']);

		// Add DataPoint Categories to popup window
		if(formEntryHashMap['dpsubcatid'] != 0) {
			subcategoryClickHandler(formEntryHashMap['dpsubcatid']);
		}
		
		// Save the entry id to the hidden element.
		// Set this after the category/subcategory clicks, as we reset this on click of each.
		$('#dp_entry_id').val(formEntryHashMap['dpentryid']);

		// Add values to popup window.
		$('#transcription').val(formEntryHashMap['entrytranscription']);
		$('#datepicker').val(millisToDateHandler(formEntryHashMap['dataDate']));
		$('#statusAlert').val(formEntryHashMap['status']);

		setDataPoinUpdatedObj(rowNumber,formEntryHashMap,updateEntry);
	}
}

/*
Function: displayDataPointCategories()
Add the Data Point Categories to the entry table.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Load
*/
function displayDataPointCategories() {
	var datapointHtml = '';

	// Clear the current list of categories.
	$('#data_point_list').html('');

	// Loop through the Data Points and display the Categories.
	datapointHtml += '<ul class=\"dp_category\">';
	for (i=0; i < objDPInfo.length; i++) {
		datapointHtml += '<li><span id=\"category_' + objDPInfo[i].dpcategoryid + '\" onclick=\"categoryClickHandler(' + objDPInfo[i].dpcategoryid + ')\">' + objDPInfo[i].dpcategoryname + '</span></li>';	
	}
	datapointHtml += '</ul>';

	// Add the datapoint categories to the display.
	$('#data_point_list').append(datapointHtml); 		
}

/*
Function: displayDataPointSubcategories(activeCategoryId) 
Add the data point subcategories to the entry table.

Parameters:
activeCategoryId - The id of the selected category.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Category Click
*/
function displayDataPointSubcategories(activeCategoryId) {
	var datapointHtml = '';

	// Clear the current list of categories.
	$('#data_point_sublist').html('');

	var foundSubcategories = false;

	// Loop through the categories, find the active category and display it's subcategories.
	for (i=0; i < objDPInfo.length; i++) {
		// Find the active category and make sure it has subcategories.
		if (objDPInfo[i].dpcategoryid == activeCategoryId && objDPInfo[i].subCategories.length > 0) {
			// Loop through and display the subcategories.
			datapointHtml += '<ul class=\"dp_category\">';
			for (j=0; j < objDPInfo[i].subCategories.length; j++) {
				datapointHtml += '<li><span id=\"subcategory_' + objDPInfo[i].subCategories[j].dpsubcatid + '\" onclick=\"subcategoryClickHandler(' + objDPInfo[i].subCategories[j].dpsubcatid + ')\">' + objDPInfo[i].subCategories[j].dpsubcatname + '</span></li>';
			}
			datapointHtml += '</ul>';

			foundSubcategories = true;
		}
	}

	// If not subcategories were found...
	if (foundSubcategories == false) {
		$('#data_point_sublist').css('display','none');

		// Display the DP Form.
		getDPForm();
	} else {
		$('#data_point_sublist').css('display','block');
		$('#data_point_sublist').append(datapointHtml);
	}
}

/*
Function: categoryClickHandler(currentCategoryId)
Called when a Data Point Category is clicked. Sets the active category global variable, highlights the category and displays the subcategories.

Parameters:
currentCategoryId - The id of the selected category.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Category Click

Called Functions:
- <resetDataPointEntryPopup()>
- <highlightCategory(activeCategoryId)>
- <displayDataPointSubcategories(activeCategoryId)>
*/
function categoryClickHandler(currentCategoryId) {
	// Reset the hidden dp_entry_id
	$('#dp_entry_id').val('');
	
	// Set the active category id global variables.
	activeCategoryId = currentCategoryId;
	activeSubcategoryId = '';

	// Reset the data point entry popup.
	resetDataPointEntryPopup();

	// Unset the active subcategory
	prevActiveSubcategoryId = '';

	// Highlight the active category.
	highlightCategory(activeCategoryId);

	// Display the subcategories.
	displayDataPointSubcategories(activeCategoryId);
}

/*
Function: subcategoryClickHandler(currentSubcategoryId)
Called when a Data Point Subategory is clicked. Sets the active subcategory global variable, highlights the subcategory and loads the DP entry form.

Parameters:
currentSubcategoryId - The id of the selected subcategory.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Subcategory Click

Called Functions:
- <highlightSubcategory(activeSubcategoryId)>
- <getDPForm()>
*/
function subcategoryClickHandler(currentSubcategoryId) {
	// Reset the hidden dp_entry_id
	$('#dp_entry_id').val('');
	
	// Set the active subcategory id.
	activeSubcategoryId = currentSubcategoryId;

	// Highlight the active subcategory.
	highlightSubcategory(activeSubcategoryId);

	// Clear the contents of the transcription, date and status.
	$('#statusAlert').val('');
	$('#transcription').val('');
	$('#datepicker').val('');

	// Display the DP Form.
	getDPForm();
}

/*
Function: hideDataPointEntry(activeRowNumber) 
Hide the Data Point Entry dialog window.  Hides the div and removes highlighting from the active grid row.

Parameters:
activeRowNumber - The row number of the active grid row.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Save
- Step 2 LHS Data Point Entry Dialog Cancel
*/
function hideDataPointEntry(activeRowNumber) {
	// Remove highlighting from active row
	$('#grid_row_' + activeRowNumber).attr('class','grid_row_norm')

	// Hide the div
	$('#data_point_wrapper').css('display', 'none');
}

/*
Function: highlightCategory(activeCategoryId)
Handle the highlighting of the categories.

Parameters:
activeCategoryId - The DOM id of the selected category.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Category Select
*/
var prevActiveCategoryId = ''; // Set a global variable to record whether a category has been previously clicked.  
function highlightCategory(activeCategoryId) { 
	// If a category has been previously selected, reset the display of that link.
	if (prevActiveCategoryId) { 
		$('#category_' + prevActiveCategoryId).css('color','black');
		$('#category_' + prevActiveCategoryId).css('font-weight','normal');
	} 

	// Highlight and bold the active category.
	$('#category_' + activeCategoryId).css('color','blue');
	$('#category_' + activeCategoryId).css('font-weight','bold');

	// Set the previous category id for the next time a category is clicked.
	prevActiveCategoryId = activeCategoryId;
}

/*
Function: highlightSubcategory(activeSubcategoryId)
Handle the highlighting of the subcategories.

Parameters:
activeSubcategoryId - The DOM id of the selected subcategory.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Subcategory Select
*/
var prevActiveSubcategoryId = ''; // Set a global variable to record whether a subcategory has been previously clicked.  
function highlightSubcategory(activeSubcategoryId) {
	// If a category has been previously selected, reset the display of that link.
	if (prevActiveSubcategoryId) { 
		$('#subcategory_' + prevActiveSubcategoryId).css('color','black');
		$('#subcategory_' + prevActiveSubcategoryId).css('font-weight','normal');
	} 

	// Highlight and bold the active subcategory.
	$('#subcategory_' + activeSubcategoryId).css('color','blue');
	$('#subcategory_' + activeSubcategoryId).css('font-weight','bold');

	// Set the previous subcategory id for the next time a category is clicked.
	prevActiveSubcategoryId = activeSubcategoryId; 
}

/*
Function: getDPForm()
Get the Data Point entities based on the category and subcategory.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Subcategory Select
*/
function getDPForm() {
	// Get the active category and subcategory
	//var category = prevActiveCategoryId;
	//var subcategory = prevActiveSubcategoryId;

	var category = activeCategoryId;
	var subcategory = activeSubcategoryId;
	//IWS 319:Jira Issue to free text field for smoking history.
	//IWS 329:At step 2 OP/QA, in 'Background Data' section, free text box needs to be removed from the following categories:'Aplicant's gender', 'BMI weight group', 'Last smoking history' and 'last smoking status'
	var subcategory_ids=[28,20,19,26,36];//subcategory ids array

	// Check if a subcategory has been selected so we know which AJAX call to make.
	if (subcategory > 0) {
		$.ajax({
			url: "dataPoint/entityForm/" + category + "/" + subcategory,
			async:   false,
			context: document.body,
			success: function(c) {
				objEntityForm = c;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// Display an error dialog.
				// Datetime
				// User Name
				// Session Id
				// Case Id
				// Stage
				// Javascript Function
				// Error Message
				dateTime = $('#datetime').html();
				userName = $('#userName').html();
				sessionId = $('#sessionId').html();
				displayErrorDialog(dateTime, userName, sessionId, caseId, "getDPForm()", errorThrown);
			}
		});
	} else {
		$.ajax({
			url: "dataPoint/entityForm/" + category,
			async:   false,
			context: document.body,
			success: function(c) {
				objEntityForm = c;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// Display an error dialog.
				// Datetime
				// User Name
				// Session Id
				// Case Id
				// Stage
				// Javascript Function
				// Error Message
				dateTime = $('#datetime').html();
				userName = $('#userName').html();
				sessionId = $('#sessionId').html();
				displayErrorDialog(dateTime, userName, sessionId, caseId, "getDPForm()", errorThrown);
			}
		});
	}

	// If status is required, display the LOV, otherwise, hide it.
	if(objEntityForm.isStatusRequired == 'Y') {
		//IWS 319: and IWS 329:
		var transcription_flag='N';
		// This conditon is used to check category is "Background Data" or not and the id "37" is "Background Data" id.
		if(category==37)
			{
			// This for loop is used for to check for which subcategory transcription_ flag is Y or N. 
			for( var i=0;i<subcategory_ids.length;i++)
				{
				if(subcategory==subcategory_ids[i])
					{
					transcription_flag='Y';
					break;
					}
				}
			}
		document.getElementById('data_point_lov_list').innerHTML = "";
		datapointLOVHtml = '<div id=\"datapointlovlist\">';
		datapointLOVHtml += '<table class ="popUpTable"><tr>';

		datapointLOVHtml += '<td><span id="lblStatus">Status/Alert</span> <input type="text" id="statusAlert" disabled="disabled"/></td>'

			for (i=0; i < objEntityForm._lov.values.length; i++) {
				datapointLOVHtml +=  '<td><span class="category" id=\"lov_' + objEntityForm._lov.values[i].lvid + '\" onClick=\"assignLov(\'' + objEntityForm._lov.values[i].lovValue + '\',\'' +transcription_flag+ '\');\">' + objEntityForm._lov.values[i].lovValue + '</span></td>';
			}

		datapointLOVHtml += '</tr></table>';
		datapointLOVHtml += '</div>';
		$('#data_point_lov_list').append(datapointLOVHtml);
	} else {
		$('#data_point_lov_list').html('');
	}
	
	// Update the transcription label and display the element.
	if (objEntityForm.displaylabel != null) {
		$('#lblTranscription').html(objEntityForm.displaylabel);
	} else {
		$('#lblTranscription').html('Transcription');
	}
	$('#transcriptionDiv').css('display','block');
	
	// Update the status label.
	if (typeof objEntityForm._lov === "undefined" || objEntityForm._lov === null) {
		$('#lblStatus').html('Status/Alert');
	} else {
		$('#lblStatus').html(objEntityForm._lov.lovlabel);
	}

	// Display Help Text if it is defined.
	if (objEntityForm.helpText && objEntityForm.helpText != '') {
		showJQueryDialog("#info", "Datapoint Info...",objEntityForm.helpText);
		
		//$('#lblHelpText').html(objEntityForm.helpText);
		$('#info').css('display','block');
	} else {
		$('#info').css('display','none');
	}

	// Display the date field if it is required.
	if(objEntityForm.isDateRequired == 'Y') {
		$('#dataDateDiv').css('display','block');
	} else {
		$('#dataDateDiv').css('display','none');
	}
	
	setUpdatedRowDataPointRow();
}

/*
Function: resetDataPointEntryPopup()
Reset the Data Point Entry popup.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Display
- Step 2 LHS Data Point Entry Dialog Category Select
- Step 2 LHS Data Point Entry Dialog Cancel Button Click
*/
function resetDataPointEntryPopup() {
	$('#data_point_sublist').html('');
	$('#data_point_lov_list').html('');
	$('#lblTranscription').html('');
	$('#helpText').html('');
	$('#transcriptionDiv').css('display','none');
	$('#dataDateDiv').css('display','none');

	$('#statusAlert').val('');
	$('#transcription').val('');
	$('#datepicker').val('');
} 

/*
Function: assignLov(id)
Assign LOV value to LOV textbox.

Parameters:
id - The id of the selected LOV.

Page Actions:
- Step 2 LHS Data Point Entry Dialog LOV Select
*/
function assignLov(id,flag) {
	$('#statusAlert').val(id);
	if(flag=='Y')
	{
    $('#transcription').val(id);
	}
	
}

/*
Function: validate()
Validate the data point entry form values.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Add Another Click
- Step 2 LHS Data Point Entry Dialog Save Click
*/
function validate() {
	valid = true;
	if (activeCategoryId == '')	{
		alert ('Please select a Category.');
		valid = false;
	} else if (activeSubcategoryId == '' && $('#data_point_sublist').css('display') == 'block') {
		alert ('Please select a Subcategory.');
		valid = false;
	} else if (objEntityForm.isDateRequired == 'Y' && $('#datepicker').val() == '') {
		alert ('Please select a Date.');
		valid = false;
	} else if ($('#transcription').val() =='') {
		alert ('Please insert a Transcription.');
		valid = false;
	} else if (objEntityForm.isStatusRequired == 'Y' && $('#statusAlert').val() == '') {
		alert ('Please select a Status from the list.');
		valid = false;
	}
	else if (objEntityForm.isDateRequired == 'Y') 
	{
		// For IWS-250 date validation In step 2, Data Date field on the data point entry form
		var datePicker = $('#datepicker').val();
		if(isNaN(datePicker))
		{
			if(checkDateFormat(datePicker))
			{
				valid = true;
			}
		}
	}
	return valid;
}

/*
Function: saveDataPoints(action)
Empty the dp data variables in the code whenever Cancel has been clicked

Page Actions:
- Step 2 LHS Data Point Entry Dialog Cancel Click
*/
function cancelDataPoints(){
	activeCategoryId = "";
	activeDataPointSection= "";
	note ="";
}
/*
Function: suspendNotes(action)
suspendNote Data point fill and show whenever suspendNotes has been clicked

Page Actions:
- Step 2 OP LHS  SuspendNote Data Point will fill when Suspend Click
- Step 2 QA LHS  SuspendNote Data Point will show when Suspend Click
*/
var note = null;
function suspendNotes(action){
	if(objCase.stage.name == 'Step-2-OP'){
		if( note !=null && note !=""){
		note = prompt(note);
		}
		else{
			if(suspendNoteForQA!=null && suspendNoteForQA!=''){
				alert(suspendNoteForQA);
				document.getElementById('unSuspend').disabled = false;
				}
			else{
			note = prompt("Enter Suspend Note");
			}
		}
		document.getElementById('unSuspend').disabled = false;
	}
	if(objCase.stage.name == 'Step-2-QA'){
		if(suspendNoteForQA!=null && suspendNoteForQA!=''){
			alert(suspendNoteForQA);
			document.getElementById('unSuspend').disabled = false;
			}else{
				alert("There is no suspend Note for this data point.");
			}
	}
		
}

/*
Function: unSuspend(action)
Empty the dp suspendNote data variables in the code whenever Suspend has been clicked

Page Actions:
- Step 2 QA LHS  Data Point Entry Dialog Suspend Click
*/
function unSuspend(action){
		note ="";
		suspendNoteForQA="";
		document.getElementById('unSuspend').disabled = true;
}
/*
Function: saveDataPoints(action)
Store data point categories and subcategories into database.

Parameters:
action - save,add - Indicates if the Save or Add Another button was pressed.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Add Another Click
- Step 2 LHS Data Point Entry Dialog Save Click

Called Functions:
- <hideDataPointEntry(activeRowNumber)>
- <displayDataPointEntry(rowNumber, flag, entry)> - Add Another Only
- <addTableDataPointsHandler()>
*/
function saveDataPoints(action) {
	
	// Validate the user entered form values.
	var url = "dataPoint/dataPointEntryUpdate";
	var valid = validate();

	// Only perform an insert if the user entered data is valid.
	if (valid == true) {
		// Create a map that will hold name,value pairs for the data point data.
		var map = new Object(); 

		var entryId = $('#dp_entry_id').val();
		// Add the data point data to the map.
		map['suspendnote'] = note;
		map['entrytranscription'] = $('#transcription').val();
		map['_page'] = objPage.id;
		map['sectionnumber'] = activeDataPointSection;
		if (objEntityForm.isStatusRequired == 'Y') { map['status'] = $('#statusAlert').val(); }
		else if (objEntityForm.isStatusRequired == 'N') { map['status'] = '' }
		if (objEntityForm.isDateRequired == 'Y') { map['dataDate'] = dateToMillisHandler($('#datepicker').val()); }
		map['_dataPointFormEntity'] = objEntityForm.dpformentityid;

		if (action == 'add')
			entryId = 0;

		if (entryId != 0) {
			map['dpentryid'] = entryId;
			url=url+"/"+entryId;
		}

		// All data has been set.  Update/insert data point entry.
		jQuery.ajax({  
			type: "POST",
			url: url,
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success : function(msg) {	
				//alert("Data Saved Sucessfully.");
					//If action is from data point update - clear orignal value
				if (DataPoinUpdatedObj!=null || typeof DataPoinUpdatedObj !="undefined")
					DataPoinUpdatedObj = null;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				// Display an error dialog.
				// Datetime
				// User Name
				// Session Id
				// Case Id
				// Stage
				// Javascript Function
				// Error Message
				dateTime = $('#datetime').html();
				userName = $('#userName').html();
				sessionId = $('#sessionId').html();
				displayErrorDialog(dateTime, userName, sessionId, caseId, "saveDataPoints(" + action + ")", errorThrown);
			}
		});

		// Hide the popup by default.  We will re-open this within the addNew function if needed.
		hideDataPointEntry(activeDataPointSection);

		// Check if we are Saving or Adding another data point.
		if (action == 'add') {
			// Re-display the data point entry table.
			displayDataPointEntry(activeDataPointSection,0,0);

			// Re-highlight the active row.
			$('#grid_row_' + activeDataPointSection).attr('class','grid_row_over selected');
		}

		// Update the right hand side window.
		window.opener.addTableDataPointsHandler(null);
		activeCategoryId = "";
		note = "";
		if (action != 'add')
			activeDataPointSection = "";
	}
}

/*
Function: usePageDate()
Add the current page data date to the data point entry dialog in step 2.

Page Actions:
- Step 2 LHS Data Point Entry Dialog Use Page Date Button Click

Called Functions:
- <millisToDateHandler(millis)>
*/
function usePageDate() {
	var pageDateMillis = objPage.documentDate;
	var pageDate = millisToDateHandler(pageDateMillis);
	$('#datepicker').attr('value',pageDate);
}


/*
Function: setDataPoinUpdatedObj()
Set the DataPointUpdatedOjbect to capture prior values from RHS
the datapoint category/subcategory changes.
*/
function setDataPoinUpdatedObj(rowNumber,formEntryHashMap,updateEntry) {
		//Capture the data point being updated information
	DataPoinUpdatedObj = new Object();
	DataPoinUpdatedObj['entrytranscription'] = formEntryHashMap['entrytranscription'];
	DataPoinUpdatedObj['rowNumber'] = rowNumber;
	DataPoinUpdatedObj['dp_entry_id'] = formEntryHashMap['dpentryid'];
	DataPoinUpdatedObj['status'] = formEntryHashMap['status'];
	if (updateEntry.dataDate == null || updateEntry.dataDate == '') 
		DataPoinUpdatedObj['dataDate'] = '';
	else
	{
		var dateval = millisToDateHandler(formEntryHashMap['dataDate']);
		if (dateval.indexOf('Na'))
			DataPoinUpdatedObj['dataDate'] = dateval;	
	}
}


/*
Function: setUpdatedDataPointRow()
Validate and set the updated value for the selected row.
Set the transcription text, date, dp_entry_id to capture row and status
*/
function setUpdatedRowDataPointRow() {
	if(DataPoinUpdatedObj!=null) {
		if(activeDataPointSection==DataPoinUpdatedObj['rowNumber'])
		{
				//Capture Updated Original value if on the same row
			$('#transcription').val(DataPoinUpdatedObj['entrytranscription']);
			$('#datepicker').val(DataPoinUpdatedObj['dataDate']);				
			$('#dp_entry_id').val(DataPoinUpdatedObj['dp_entry_id']);
			
			oldstatus = DataPoinUpdatedObj['status'];
			if(typeof oldstatus=="undefined")
				$('#statusAlert').val('');
			
			var statuslist = $('#data_point_lov_list').val();
			//IWS-380:At step 2 OP/QA, the infomation in data text box of DP form is different from that is being shown in toggle view of the same data point
			if (typeof statuslist!="undefined" && statuslist != '')
			{
				for (i=0; i < objEntityForm._lov.values.length; i++) {
					if(oldstatus==objEntityForm._lov.values[i].lovValue )
						$('#statusAlert').val(oldstatus);
				}
			}
		}
	}
}