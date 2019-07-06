/* 
File: medical.codes_helper.js
Responsible for all medical code actions.

Loaded In Steps:
- Step 3 RHS - <step3.jsp>

*****

Function: sendCompletedCodeData()
Save the details of a completed code to the database.

Page Actions:
- Step 3 RHS Save Button Click

Called Functions:
- <addTableDataPoints(step, caseId, filter)>
*/
var enteredcodes = null;

function sendCompletedCodeData() {
	var codes = [];
	var code  = {};
	var index = 0;
	var code;
	var isAcceptedCodePresent = false;
	
	// loop through the accepted and rejected codes for id and value then add those to the object collection if thier status has been changed since the page loaded
	$("form[name='codeForm']").each(function() {
		originalStatus = $(this).find("input[name='originalStatus']").val();
		currentStatus = $(this).find("input:checked").val();
		// Checking if a code is accepted. 
		if (currentStatus == 'accepted') {
			isAcceptedCodePresent = true;
		}

		if (currentStatus != originalStatus){
			code = {};
			code.status = currentStatus;
			code.dpecid = $(this).find("input[name='id']").val();
			code._dpentry = dpentryId;
			codes[index] = code;
			index++;
		}
	});
	//loop through the user entered code(s) for dpentryId, medical code and medical code description. confidence and status are static
	$("form[name*='codeInput']").each(function() {
		code = {};
		code.code = $(this).find("input[name='code']").val();
		code.codeDesc =  $(this).find("input[name='codeDescription']").val();
		code.masterCode =  $(this).find("input[name='master']").val();
		code.codeType =  $(this).find("input[name='type']").val();
		code.version =  $(this).find("input[name='version']").val();
		//alert(code.version + 'is the code version');
		code._dpentry = dpentryId;
		code.status = 'user'; 
		code.confidence = 100.00;
		codes [index] = code;
		index++;
		isAcceptedCodePresent = true;
	}); 

	var codeentrycnt = $("form[name='codeForm']").length;

	// If DPENTRIES.REQUIRECODE=Y and no ICD code exists or of status accepted or user, prompt user to enter or accept a code to save and complete.
	if ((codeentrycnt <= 0) && ((entryRequireCodeDB == null || entryRequireCodeDB == true) && isAcceptedCodePresent == false)) {
		alert("Enter or accept a code to save and complete.");
	} else {
		jQuery.ajax({  
			type : 'POST',
			url : 'dataPointEntryCode/update',
			async:   false,
			data : {
				'_method' : 'PUT',
				codes : codes
			},
			success : function(msg) {
				alert("Data point codes were successfully saved.");
				
				// If on step 3 update the parent window.
				if (step == 3) {
					//Set datapoint entry to complete
					var map = new Object();
					map['isCompleted'] = true;
					updateDataPointEntry(map,dpentryId);	
					
					addTableDataPoints(step,objCase.id,null);

					//IWS-226 :In coding, once the "Save" button is pressed, the screen section automatically collapses
					//After saving medical records section, data will display again.
					displayMedicalCodes(dpentryId);
				}
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "sendCompletedCodeData()", errorThrown);
			}
		}); 
	}
} 

/*
Function: sendValueToCurrentWindow(code, desc, masterCodeId, codeType, version)
Prepend manually entered codes to the medical codes table.

Parameters:
code - The code.
desc - The code description.
masterCodeId - The id of the master code.
codeType - The code type.
version - The version of the code.

Page Actions:
- Step 3 RHS User Entered Code
*/
function sendValueToCurrentWindow(code,desc,masterCodeId,codeType,version) {
	var codeVersion = version;
	var selvalue = code;
	var seldesc = desc;
	var masterId = masterCodeId;
	var type = codeType;
	var tbl = document.getElementById('codeTable');
	
	/* IWS-230 ICD codes are not appearing in entry order. They are appearing in Reverse order */
	// maintains the count for new row to be inserted for medical codes 
    var newRowCount = tbl.rows.length;
    
    //  to insert new row in a sequential way as entered by user/
	var newRow = tbl.insertRow(newRowCount - 1);
	var randomnumber = Math.floor(Math.random()*100);
	var newRowCount = selvalue.replace("." , "") + "_" + codeVersion + "_" + newRowCount + randomnumber;
	newRow.id = newRowCount;
	var newCell1 = newRow.insertCell(0);
	var newCell2 = newRow.insertCell(1);
	var newCell3 = newRow.insertCell(2);

	enteredcodes += code + ",";

	newCell1.innerHTML = '<form name ="codeInput"><input type=\"hidden\" name =\"version\" value=\"'+ version +'\" /><input type=\"hidden\" name =\"type\" value=\"'+ type +'\" /><input type=\"hidden\" name =\"master\" value=\"'+ masterId +'\" /><input type=\"hidden\" name =\"code\" value=\"'+ selvalue +'\" /><input type=\"hidden\" name =\"codeDescription\" value=\"'+ seldesc +'\" />entered by current user';
	newCell2 .innerHTML ='<span class=\"codeCell\">' + selvalue + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<span id=\"codeDeleteCell\" onClick=\"deleteCodePrompt(\''+newRowCount+'\',\''+selvalue+'\');\"><img title="Delete this code row entry" style=\'margin-top:4px\' src="images/garbage-icon.gif"/> (delete)</span>';
	newCell3.innerHTML = '<span>'+ seldesc + '</span></form>'; 
}

/*
Function: deleteCodePrompt(newRowCount)
Delete the ICD10 code row from step 3.

Parameters:
newRowCount - Is the key combination of code + type + version + random number.

Page Actions:
- Step 3 RHS of user Entered Code
*/
function deleteCodePrompt(newRowCount, selvalue) {
	$("#" + newRowCount).remove();
	// IWS-369 : In step 3, Upon Entering a ICD Code which was just entered and deleted, an exception popup window is coming up that 'code already exists'
	codesAfterDeleteRow = enteredcodes.split(',');
	var i = 0;
	var tmpEnteredCodes = "";
	while (i < codesAfterDeleteRow.length - 1) {
		if (codesAfterDeleteRow[i] != selvalue) {
			tmpEnteredCodes += codesAfterDeleteRow[i] + ",";
		}
		i++;
	}
	enteredcodes = tmpEnteredCodes;
}

/*
Function: createDataPointTablePopup(entryId)
Displays the code table on the LHS of step 3.

Parameters:
entryId - The id of the entry.

Page Actions:
- Step 3 RHS Document Ready
- Step 3 RHS Data Point Entry Table Row Click

Called Functions:
- <millisToDateHandler(millis)>
*/
var code1;
function createDataPointTablePopup(entryId) {
	enteredcodes = "";
	
	// Remove any current dp_details rows from table
	$('.dp_details').parent().remove();
	
	// Create the new row
	$("#dp_row_" + entryId).closest( "tr" ).after("<tr><td class=\"dp_details\" id=\"dp_details_" + entryId + "\" colspan=\"8\" style=\"border: 1px solid " + $('#dp_row_' + entryId).css('background-color') + ";\"><div style=\"padding: 15px; font-size: large; font-weight: bold; color:black;\">Loading Data...</div></td></tr>");
	
	// Display a loading message to user.
	//$(".dp_details").html('<div style="padding: 15px; font-size: large; font-weight: bold; color:black;">Loading Data...</div>');
	
	// Hide the Save button.
	$('#step3PopupSubmit').css('display','none');
	
	// Set the entry id to a global variable.
	activeEntryId = entryId;

	var datapointTableHtml;
	datapointTableHtml = '<table class = \"leftTable\"><tr>'; 
	/* document.getElementById('entryId').value = entryId; */
	//create an array to store the table head text and a parralel array to generate their ids
	var head = ["No", "date", "Doc Type / Category" , "Transcription" , "Image Link"];
	var headId = ["id", "date", "Category" , "Transcription" , "Image"];
	var medicalCodeTableHeadings = ["Confidence", "Medical <br/> Code", "Description"];
	var medicalCodeTableHeadingsId = ["confidence", "medical", "placeHolderHeading"];
	var serialNo = 0;
	var subCatIdName = "";
	var formEntryHashMap = new Object();

	for(var k in head) {
		datapointTableHtml +='<th id=\"'+headId[k] +'\">' + head[k] +'</th>';	
	}
	
	datapointTableHtml += '</tr>';
	$.ajax({
		url: "dataPointEntryCode/" + entryId,
		async:   false,
		context: document.body,
		success: function(entry) {
			//get the codes to build the code display html later
			var codes = entry.codes;
			formEntryHashMap['dataDate'] = entry.dataDate;
			formEntryHashMap['name'] = entry._page._docType.name;
			formEntryHashMap['entrytranscription'] = entry.entrytranscription;
			formEntryHashMap['sectionnumber'] = entry.sectionnumber; 
			formEntryHashMap['dpformentityid'] = entry._dataPointFormEntity.dpformentityid;
			formEntryHashMap['dpcategoryid'] = entry._dataPointFormEntity._dataPointCategory.dpcategoryid;
			formEntryHashMap['dpcategoryname'] = entry._dataPointFormEntity._dataPointCategory.dpcategoryname;
			formEntryHashMap['pageId'] = entry._page.id;
			formEntryHashMap['dpentryid'] = entry.dpentryid;
			dpentryId =  formEntryHashMap['dpentryid'];
			formEntryHashMap['spContentID'] = entry._page.spContentID;
			
			// Set this to a global variable
			entryRequireCodeDB = entry.requireCode; // From Database

			// Check if there is a sub category.
			if (entry._dataPointFormEntity._subCategory == null) {
				formEntryHashMap['dpsubcatid'] = '';	
				formEntryHashMap['dpsubcatname'] = '';
			} else {
				formEntryHashMap['dpsubcatid'] = entry._dataPointFormEntity._subCategory.dpsubcatid;
				formEntryHashMap['dpsubcatname'] = entry._dataPointFormEntity._subCategory.dpsubcatname;
			}
			
			// Check if there is a status.
			if (entry.status == null) {	
				formEntryHashMap['dpstatus'] = '';
			} else {
				formEntryHashMap['dpstatus'] = entry.status;
			}
			
			// If there is no subcategory or status, we must send null so the call does not fail.
			dpsubcat = formEntryHashMap['dpsubcatname'];
			if (dpsubcat == '' || dpsubcat == null) {
				dpsubcat = "null";
			}
			
			dpstatus = formEntryHashMap['dpstatus'];
			
			if (dpstatus == '' || dpstatus == null) {
				dpstatus = "null";
			}

			$.ajax({
				url: "dataPointEntryCode/isCodeRequired/" + objCase._client.clientid + "/" + formEntryHashMap['dpcategoryname'] + "/" + dpsubcat + "/" + dpstatus,
				async:   false,
				context: document.body,
				success: function(c) { 
					entryRequireCodeFunction = c[0]; // From isCodeRequired Call
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
					displayErrorDialog(dateTime, userName, sessionId, caseId, "createDataPointTablePopup(entryId)", errorThrown);
				}
			}); 

			//populate a hidden field for category
			document.getElementById('catName').value = formEntryHashMap['dpcategoryname']; 

			//create the top section of the table -
			//displays code count, data date, doc type, data point transcription, category and sub category
			//and link to change cat/subcat
			date =  formEntryHashMap['dataDate'];

			dateString = millisToDateHandler(date);

			// Get the final page number of the current document.
			var finalPageNumber = 0;
			
			for (l=0; l < objCase.pages.length; l++) {
				if (objCase.pages[l].id == formEntryHashMap['pageId']) {
					finalPageNumber = objCase.pages[l].finalPageNumber;
				}
			}
			
			// Set the active section number to global variable.
			activeDataPointSection = formEntryHashMap['sectionnumber'];
			
			datapointTableHtml += '<tr>'			 
			datapointTableHtml +=   '<td>'+ ++serialNo + '</td>';
			datapointTableHtml +=   '<td>'+  dateString + '</td>';
			datapointTableHtml +=   '<td>'+ formEntryHashMap['name'] + '</td>';
			datapointTableHtml +=   '<td><span id=\"transcription\">'+ formEntryHashMap['entrytranscription'] + '</td>';
			datapointTableHtml +=   '<td><span class="\category\"  onClick =\"javascript:displayImagePopup();\"> Page ' + finalPageNumber + ', Section ' + activeDataPointSection + '</span></td>';
		
			//display sub categories
			if (formEntryHashMap['dpsubcatid'] != '')
				subCatIdName = "\\"+formEntryHashMap['dpsubcatname'];
			else
				//or not
				document.getElementById('subCatIdName').value='';
			
			datapointTableHtml += '</tr><tr>';
			
			//empty cells for paddding
			datapointTableHtml +=   '<td></td>';
			datapointTableHtml +=   '<td></td>';
			
			//display link to open image
			datapointTableHtml +=   '<td><label id=\"lblCat\">'+formEntryHashMap['dpcategoryname']+'</label><label id=\"lblSubCat\">'+subCatIdName+'</label></td>';
			datapointTableHtml +=   '<td></td>';
			datapointTableHtml += '</tr></table>';
			datapointTableHtml += '<table class = \"leftTable\" id=\"codeTable\">'; 

			//headings  for medical code table
			for(var j in medicalCodeTableHeadings) {
				datapointTableHtml += '<th id=\"'+medicalCodeTableHeadingsId[j] +'\">' + medicalCodeTableHeadings[j] +'</th>';
			}
			datapointTableHtml += '</tr>';
			
			// Sort the codes by Confidence Desc and Code Asc
			codes.sort(function(a, b){
		        //note the minus before -cmp, for descending order
		        return [-cmp(a.confidence, b.confidence), cmp(a.code, b.code)] 
		             < [-cmp(b.confidence, a.confidence), cmp(b.code, a.code)] ? -1:1;
		    });
			
			for (var i = 0; i < codes.length; i++) {
				var code = codes[i];
				code1 = codes[0];
				//load the object info into a varable so it is easier to read.
				formEntryHashMap['codeDesc'] = code.codeDesc;
				formEntryHashMap['confidence'] = code.confidence; 
				formEntryHashMap['code'] = code.code;
				formEntryHashMap['dpecid'] = code.dpecid;
				formEntryHashMap['isCritical']= code.isCritical; 
				formEntryHashMap['status'] = code.status;
				// checking for isCritical
				var critHTML= "<span class=\"critical\" id=\"critical_'+ i +'\"style=\"visibility:hidden;\">Critical </span>";
				if(formEntryHashMap['isCritical'] == 'y' || formEntryHashMap['isCritical'] == 'Y' )
					critHTML="<span class=\"critical\" id=\"critical_'+ i +'\" >Critical </span>";
				//if the entry is a previous user entry display user entered as the confidence, otherwise display the black box generated confidence
				
				datapointTableHtml += '<td>(' + serialNo++ + ')&nbsp;'+  formEntryHashMap['confidence']+ "%";
				if (formEntryHashMap['status'] == "user") {
					datapointTableHtml += ' [U]';
				}
				datapointTableHtml += '</td><td><form name="codeForm"><input type="hidden" name=\"originalStatus\" value=\"'+ formEntryHashMap['status'] +'\"/><input type="hidden" name=\"dpentryid\" value=\"'+ formEntryHashMap['dpentryid'] +'\"/><input type="hidden" name=\"id\" value=\"'+ formEntryHashMap['dpecid'] +'\"><span class=\"codeCell\" >' + formEntryHashMap['code']  +'</span>';
				// if the status has previously been accepted or if the code has been previously entered by a user set the radio buttons and their values to indicate as such
				// default is rejected
				switch (formEntryHashMap['status']) {
					case "user":
						datapointTableHtml += '<span class=\"accept\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"user\" checked=\"checked\">Accept</span><span class=\"reject\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"rejected\">Reject</span>';
						break;
					case "accepted":
						datapointTableHtml += '<span class=\"accept\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"accepted\" checked=\"checked\">Accept</span><span class=\"reject\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"rejected\">Reject</span>';
						break;
					default:
						datapointTableHtml += '<span class=\"accept\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"accepted\">Accept</span><span class=\"reject\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"rejected\" checked=\"checked\">Reject</span>'
				}
				
				datapointTableHtml +=critHTML+'<td><span class=\"generatedCodeDescription\">'+formEntryHashMap['codeDesc']+'</span></td></form></td></tr>';

				enteredcodes += code.code + ",";
			}
			
			 

			// Set the page id, category id and subcategory id to the global variable.
			// Do this outside of the loop as they will always be the same.
			currentCategoryId = entry._dataPointFormEntity._dataPointCategory.dpcategoryid;
			currentSubcategoryId = entry._dataPointFormEntity._subCategory.dpsubcatid;

			activePageId = (formEntryHashMap['pageId']);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "createDataPointTablePopup(" + entryId + ")", errorThrown);
		
			// Change all - to a +
			$('.img_expand').each(function () {
				$(this).attr('src','images/plus.gif');
			});
			
			// Remove the data point entry details row.
			$('.dp_details').parent().remove();
		}
	});  
	//add the manual insertion spans
	//first by code then by search
	datapointTableHtml += '<tr><td>(+) --.--&nbsp;</td>';
	datapointTableHtml += '<td><span id=\"codeInputCell\" onClick=\"showCodePrompt();\">(enter&nbsp;code)</span>';
	datapointTableHtml +=   '<span id=\"codeSearchCell\" onClick=\"window.open(\'step3_codeSearchBox\',\'popuppage\',\'width=' + lhsWidth + ',height=' + lhsHeight + ',top=0,left=0,scrollbars=yes\')\";><img src=\"images/search-icon.png\" style=\"vertical-align:middle\" /></span>';
	datapointTableHtml +=   '<span class=\"medicalCodeDescription\" id=\"codeDescriptionInput\"></span>';
	datapointTableHtml += '</td><td>'
	
	// If isCodeRequired is yes, display the "No Code Needed" checkbox.
	if (entryRequireCodeFunction == 'Y') {
		datapointTableHtml += 'No Code Needed: <input type=\"checkbox\" name=\"no_code_needed\" id=\"no_code_needed\" ';
		// If DPENTRIES.REQUIRECODE flag = N, check the box.
		if (entryRequireCodeDB == 'false' || entryRequireCodeDB == false) {
			datapointTableHtml += 'checked';
		}
		datapointTableHtml += ' />';
	}

	datapointTableHtml += '</td></tr>';
	datapointTableHtml += '</table>';
	
	datapointTableHtml += '<div style="text-align: right; padding: 0px 5px 5px 0px"><button class="bodybutton" onclick="sendCompletedCodeData();">Save</button></div>';
	
	// Add the built html to the page.
	$('.dp_details').html(datapointTableHtml); 

	/*
	 IWS-300: At Step 3OP, the 'accept' and 'reject' options are disabled while entering the codes in all the categories except D&I. - Fix
	 Disabled this code
	// If entryRequireCodeDB = false, disable all the code radio buttons.
	if (entryRequireCodeDB == false) {
		$("form[name='codeForm']").each(function() {
			$(this).find("input").attr('disabled','disabled');
		});
	}
	*/
	
	// Add change trigger to 'No Code Needed' checkbox.
	$('#no_code_needed').change(function(c) {	
		// Create a map that will hold name,value pairs for the data point data.
		var map = new Object();
		
		if ($('#no_code_needed').attr('checked') == 'checked') {
			// Update DPENTRIES.REQUIRECODE flag to N 
			map['requireCode'] = false;
			map['isCompleted'] = true;
			entryRequireCodeDB = false;
			
			// Update all ICD codes to Reject
			var codes = []; // Array of codes
			var code  = {}; // Individual code
			var index = 0;  // Index for the codes array
			// Loop through the codes for the current data point entry.
			$("form[name='codeForm']").each(function() {
				code = {};
				code.status = "rejected";
				code.dpecid = $(this).find("input[name='id']").val();
				code._dpentry = $(this).find("input[name='dpentryid']").val();
				codes[index] = code;
				index++;
			});
			
			//If no codes were selected, set icd10 code as complete
			if(index<=0)
				map['isCompleted'] = true;
			
			jQuery.ajax({  
				type : 'POST',
				url : 'dataPointEntryCode/update' ,
				async:   false,
				data : {
					'_method' : 'PUT',
					codes : codes
				},
				success : function(msg) {
					// Do nothing.  Continue below.
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
					displayErrorDialog(dateTime, userName, sessionId, caseId, "createDataPointTablePopup(" + entryId + ")", errorThrown);
				}
			}); 

		} else {
			// Update DPENTRIES.REQUIRECODE flag to Y
			map['requireCode'] = true;
			
			if($("form[name='codeForm']").length<=0)
				map['isCompleted'] = false;
		}

		jQuery.ajax({  
			type: "POST",
			url: "dataPoint/dataPointEntryUpdate/" + formEntryHashMap['dpentryid'],
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success : function(msg) {
				// If we are in step 3 and there are codes that were rejected, refresh the table.
				if (step == 3 || codes.length > 0) {
					addTableDataPoints(step,objCase.id,null);
				}
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "updateCategorySubmit()", errorThrown);
			}
		});

		updateDataPointEntry(map,formEntryHashMap['dpentryid']);		
	});

	// Display the Save button.
	$('#step3PopupSubmit').css('display','block');
}

/*
Function: showCodePrompt()
Prompt user to manually enter medical code to be prepended to the table.

Page Actions:
- Step 3 RHS Manual Code Prompt

Called Functions:
- <sendValueToCurrentWindow(code, desc, masterCodeId, codeType, version)>
*/
function showCodePrompt() {
	var checkCode = /^[A-Za-z0-9\. ]{3,20}$/;
	var caseCodeType = objCase.codeType;
	var currentVersion = objCase.codeVersion;
	var inCode=prompt("Enter code:")
	
	var isCodeAlreadyExist = validateICD10Input(inCode);
	
	if (checkCode.test(inCode)){
	if (!isCodeAlreadyExist && inCode != null && inCode != "") {
		//need to replace "." with "*" to avoid spring issue with truncation due to thinking the . is for a file extension
		$.ajax({
			url: "dataPointEntryCode/loadMedicalCodeDescription/" + inCode.replace("." , "*") + "/" + caseCodeType + "/" + currentVersion,
			async:   false,
			context: document.body,
			success: function(c) { 

				if (c.length == 0) {
					alert(inCode + " not found in database.");
				} else {
					var version = c[0].version;
					var description = c[0].description;
					var masterCodeId = c[0].codeid;
					var codeType = c[0].codeType;
					sendValueToCurrentWindow(inCode,description,masterCodeId,codeType,version);
				}
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "showCodePrompt()", errorThrown);
			}
		});
	}
	else if (isCodeAlreadyExist) 
		alert(inCode + " already exist for this datapoint!");	
	}
	else 
		alert("cannot search for " + inCode);
}

/*
Function: updateDataPointEntry()
Update the data point entry

Page Actions:
- Step 3 RHS Manual Code Prompt

Parameters:
map - data entry point data in a collection
dpentryid - the data entry point id to update

Called Functions:
- <addTableDataPoints(step,objCase.id,null)>
- <displayErrorDialog(dateTime, userName, sessionId, caseId, "updateDataPointEntry()", errorThrown)>
*/
function updateDataPointEntry(map,dpentryid)
{
	jQuery.ajax({  
		type: "POST",
		url: "dataPoint/dataPointEntryUpdate/" + dpentryid,
		async: false,
		data : {
			'_method' : 'PUT',
			entry : map
		},
		success : function(msg) {
			// If we are in step 3 and there are codes that were rejected, refresh the table.
			if (step == 3 || codes.length > 0) {
				addTableDataPoints(step,objCase.id,null);
			}
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updateDataPointEntry()", errorThrown);
		}
	});
}


function validateICD10Input(inCode)
{
	var isCodeAlreadyExist = false;
	if(enteredcodes==null)
		enteredcodes="";
	
	if (inCode!=null && enteredcodes.toLowerCase().indexOf(inCode.toLowerCase())>=0)
		isCodeAlreadyExist = true;
	
	return isCodeAlreadyExist;
}