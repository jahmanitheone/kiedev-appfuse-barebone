/* 
File: notables_helper.js
Responsible for all Notables actions.

Loaded In Step:
- Step 4 LHS - <step4_popup.jsp>

*****

Function: updateCategoryDropdown()
Updates the category dropdown for inserting new categories.

Page Actions:
- Step 4 LHS Document Ready
*/
function updateCategoryDropdown() {
	var groupId = window.opener.objCase._client.groupid;
	$.ajax({
		url: "dataPoint/dataPointInfo/" + groupId + "/nosubcats",
		context: document.body,
		success: function(dp) { 
			objDp = dp;

			// Loop the data points and append option list values to the category dropdown
			var displayCategory;
			for (i=0; i < dp.length; i++) {
				displayCategory = true;
				value = dp[i].dpcategoryid;
				param = dp[i].dpcategoryname;

				// Ensure the category is not already on the page.
				$(".notableCategorySpan").each(function(e) {
					if ($(this).html() == param.replace('&','&amp;')) {
						displayCategory = false;
					}
				});

				if (displayCategory == true) {
					$('#category_list').append('<option value='+value+'>'+param+'</option>');

				}
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updateCategoryDropdown()", errorThrown);
		}
	});
}

/*
Function: addCategory()
Adds a category to the page.

Page Actions:
- Step 4 LHS New Category Dropdown Select
*/
function addCategory() {
	// Make sure a value is selected.
	if ($('#category_list').val() != "") { 
		var categoryId = $('#category_list').val();
		var categoryName = $("#category_list option[value='" + categoryId + "']").text();
		var htmlString = '';

		htmlString += '<div style=\"margin: 15px;\">';
		htmlString += '<h4><span class=\"notableCategorySpan\" style=\"padding-left: 110px;\">' + categoryName + '</span></h4>';
		htmlString += '<form name="userNotables" id="UserNotables' + categoryId + '">';
		htmlString += '<input type="hidden" value="' + categoryId + '" name="catId"/>';
		htmlString += '<label class=\"step4TextboxLabel\">' + labelMessage + '</label><input type="text" class="step4_textbox"><br/><img src="images/plus_grey.png"onClick="addTextBox(\'UserNotables'+ categoryId +'\');"  class="addButton"><form></div>';
		htmlString += '</div>';

		$('#manual_categories').append(htmlString);

		// Remove the choice from the dropdown and reset seletion to default.
		$("#category_list option[value='" + categoryId + "']").remove();
		$('#category_list').val('');
	}
}

/*
Function: createNotableBodyContent(caseId)
Displays the notable form on step 4 LHS.

Parameters:
caseId - The id of the case.

Page Actions:
- Step 4 LHS Document Ready
- Step 4 LHS Notable Save
*/
<!-- Function to create the html content. -->
function createNotableBodyContent(caseId) {
	var htmlString = '';
	$.ajax({
		url: "dataPoint/dataPointNotables/"+ caseId,
		async:   false,
		context: document.body,
		success: function(c) { 
			var originalCategory = c[0].dataPointCategory.dpcategoryname;
			var categoryCount = 1;

			//if it's the first div include the header for accept and reject
			htmlString += '<div class ="notableCategory" id="notableCategory'+categoryCount+'"><span style="float: left; color: grey;">Reject | Accept</span><h4><span class=\"notableCategorySpan\" id=\"notableCategorySpan\" >'+originalCategory +'</span></h4>';
			htmlString += '<form name="DBNotables" id="notableFormId'+ categoryCount +'">';

			var notableCount = 1;

			for (var i = 0; i < c.length; i++) {
				var newCategory = c[i].dataPointCategory.dpcategoryname;

				// Check if we are in the original or a new category.

				if (newCategory == originalCategory) {
					//test to see if the status has been accepted, rejected or previously entered by a user and build the HTML string accordingly
					switch (c[i].status)
					{
					case "user":
						htmlString +='<input type="radio" class="reject_notable" id="'+c[i].id+'-reject-'+c[i].status+'" name="notableCount'+notableCount+'" value="reject"> <input type="radio" class="accept_notable" id="'+c[i].id+'-user-'+ c[i].status +'" name="notableCount'+notableCount+'" value="user" checked></span>';
						break;
					case "accept":
						htmlString +='<input type="radio" class="reject_notable" id="'+c[i].id+'-reject-'+c[i].status+'" name="notableCount'+notableCount+'" value="reject"> <input type="radio" class="accept_notable" id="'+c[i].id+'-accept-'+ c[i].status +'" name="notableCount'+notableCount+'" value="accept" checked></span>';
						break;
					default:
						htmlString +='<input type="radio" class="reject_notable" id="'+c[i].id+'-reject-'+c[i].status+'" name="notableCount'+notableCount+'" value="reject" checked> <input type="radio" class="accept_notable" id="'+c[i].id+'-accept-'+ c[i].status +'" name="notableCount'+notableCount+'" value="accept">';
					}

					notableCount++;
					htmlString += '<span class="notableText">' + c[i].text +'</span><br/>';
				} else { 
					notableCount = 1;
					htmlString += '</form><form name="userNotables" id="UserNotables' + categoryCount + '">';
					// we need to set the category to be the previous id (hence c[i-1]) as we are done with the category we need at this stage
					htmlString += '<input type="hidden" value="'+c[i-1].dataPointCategory.dpcategoryid +'" name="catId"/>';
					htmlString += '<label class=\"step4TextboxLabel\">'+ labelMessage +'</label><input type="text" class="step4_textbox"><br/><img src="images/plus_grey.png" onClick="addTextBox(\'UserNotables'+ categoryCount +'\');" class="addButton"></form></div>';
					categoryCount++;

					htmlString += '<div class ="notableCategory" id="notableCategory'+ categoryCount +'">';
					htmlString += '<span style="float: left; color: grey;">Reject | Accept</span><h4><span class=\"notableCategorySpan\">'+  newCategory +'</span></h4>';
					htmlString += '<form name="DBNotables" id="notableFormId'+ categoryCount +'">';
					//test to see if the first radio button of the new category has been accepted, rejected or previously entered by a user and build the HTML string accordingly
					switch (c[i].status) {
					case "user":
						htmlString +='<input type=\"radio\" class=\"reject_notable\" id=\"'+c[i].id+'-reject-'+c[i].status+'\" name=\"notableCount'+notableCount+'\" value=\"reject\"> <input type=\"radio\" class=\"accept_notable\" id=\"'+c[i].id+'-user-'+ c[i].status +'\" name=\"notableCount'+notableCount+'\" value=\"user\" checked></span>';
						//htmlString +='<span class=\"accept\"><INPUT TYPE=\"radio\" NAME=\"q'+ i +'\" VALUE=\"user\" checked>Accept</span>';
						break;
					case "accept":
						htmlString +='<input type=\"radio\" class=\"reject_notable\" id=\"'+c[i].id+'-reject-'+c[i].status+'\" name=\"notableCount'+notableCount+'\" value=\"reject\"> <input type=\"radio\" class=\"accept_notable\" id=\"'+c[i].id+'-accept-'+ c[i].status +'\" name=\"notableCount'+notableCount+'\" value=\"accept\" checked></span>';
						break;
					default:
						htmlString +='<input type=\"radio\" class=\"reject_notable\" id=\"'+c[i].id+'-reject-'+c[i].status+'\" name=\"notableCount'+notableCount+'\" value=\"reject\" checked> <input type=\"radio\" class=\"accept_notable\" id="'+c[i].id+'-accept-'+ c[i].status +'\" name=\"notableCount'+notableCount+'\" value=\"accept\">';
					}

					htmlString += '<span class=\"notableText\">' + c[i].text+ '</span><br/>';
					originalCategory = newCategory; 
					notableCount++;
				}

			}

			categoryCount++;
			htmlString += '</form><form name="userNotables" id="UserNotables' + categoryCount + '">';
			htmlString += '<input type="hidden" value="'+c[categoryCount].dataPointCategory.dpcategoryid +'" name="catId"/>';
			htmlString += '<label class=\"step4TextboxLabel\">'+ labelMessage +'</label><input type="text" class="step4_textbox"><br/><img src="images/plus_grey.png"onClick="addTextBox(\'UserNotables'+ categoryCount +'\');"  class="addButton"><form></div>';
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "createNotableBodyContent(" + caseId + ")", errorThrown);
		}
	});
	$('#step4_popup_content_body').html(htmlString);	
}

/*
Function: addTextBox(currentDiv)
Insert an additional textbox allowing the manual entry of more notables.

Parameters:
currentDiv - The id of the current div.

Page Actions:
- Step 4 LHS Add New Notable Click
*/
function addTextBox(currentDiv) {
	var newdiv = document.createElement('span');
	newdiv.innerHTML = "<br><label class=\"step4TextboxLabel\" style=\"visibility:hidden;\">"+ labelMessage +"</label><input class=\"step4_textbox\" type='text' name='myInputs[]'>";
	document.getElementById(currentDiv).appendChild(newdiv);
	counter++;
}

/*
Function: completed()
When save button is clicked this function calls two others to handle data inserts/updates. 

Page Actions:
- Step 4 LHS Save Button Click

Called Functions:
- <saveNotables(notables)>
*/
function completed() {
	$('#complete').attr('disabled','disabled');
	var notables = [];
	notables = completedUserNotables (notables);
	notables = completedDBNotables (notables);
	saveNotables(notables);
}

/*
Function: completedUserNotables(notables)
Get textbox notables from the page in preparation for DB insertion.

Parameters:
notables - An array of notables.

Page Actions:
- Step 4 LHS Complete
*/
function completedUserNotables(notables) {
	var index=notables.length;
	$("form[name*='userNotables']").each(function() {
		var catId  = $(this).find("input:hidden").attr("value");
		$(this).find("input:text").each(function() {
			if ( $(this).val()!= '') {
				var userDP = {text: $(this).val(), dataPointCategory: catId, status: 'user', caseid: caseId }
				notables[index] = userDP;

				index++;
			}
		});
	});
	return notables;
}

/*
Function: completedDBNotables(notables)
Get accepted/rejected notables from the page in preparation for DB insertion.

Parameters:
notables - An array of notables.

Page Actions:
- Step 4 LHS Complete
*/
function completedDBNotables(notables) {
	var index=notables.length;
	$("form[name*='DBNotables']").each(function() {
		$(this).find("input:checked").each(function() {
			var info = $(this).attr("id");
			a = info.split("-");
			//compare the [1] and [2] elements to one another and if they are the different make the insertion. This is to ensure that only new data is saved
			if  (a[1] != a[2]){
				var dp = {id:a[0], status:a[1]}
				notables[index] = dp;
				index++;
			}
		});
	});
	return notables;
}

/*
Function: saveNotables(notables)
Save notables to the DB.

Parameters
notables - An array of notables.

Page Actions:
- Step 4 LHS Save Button Click

Called Functions:
- <createNotableBodyContent(caseId)>
*/
function saveNotables(notables) {
	//test to see if notables have been changed
	if (notables.length < 1 ){
		alert ('No changes detected');
		$('#complete').removeAttr('disabled');
	}
	else{
		jQuery.ajax({
			type : 'POST',
			url : 'saveNotables' ,
			data : {
				'_method' : 'PUT',
				notables : notables
			},
			success : function(msg) {
				// Alert user of success.
				alert('Notables successfully saved.');

				// Display a reloading message.
				$('#step4_popup_content_body').html('<div style=\"padding: 15px; font-size: large; font-weight: bold;\">Re-loading Data...</div>');

				// Clear the manual entries as they will be reloaded during the reload.
				$('#manual_categories').html('');

				// Reload the notables.
				createNotableBodyContent(caseId);

				// Enable the complete button.
				$('#complete').removeAttr('disabled');
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "saveNotables(notables)", errorThrown);

				// Enable the complete button.
				$('#complete').removeAttr('disabled');
			}
		});
	}
}