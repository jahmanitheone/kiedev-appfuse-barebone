/* 
File: applicant.details_helper.js
Responsible for step 1 and 2 applicant details display and step 1 applicant details update.

Loaded In Steps:  
- Step 1 LHS - <step1_popup.jsp>
- Step 2 LHS - <step2_popup.jsp>

*****

Function: updateApplicantDetails()
Update the applicant details display on the LHS window.  Details include name, postal code and client id.

Page Actions:
- Step 1 LHS Dom Ready
- Step 1 Save Applicant Details Success
- Step 2 LHS Dom Ready
*/
function updateApplicantDetails() {
	// Clear the previous div html.
	$('#sweep_l_header_applicant_details').html ('');
	
	var applicantName = objCase.applicantName;
	var applicantPostalCode = objCase.applicantPostalCode;
	var applicantClientId = objCase._client.clientid;
	var applicantCaseId = objCase.id;
	
	$('#sweep_l_header_applicant_details').append('<span style=\"padding-bottom: 5px;\"><strong>Applicant Details</strong>');
			
	// Only display the edit button in step 1.
	if (step == 1) {
		$('#sweep_l_header_applicant_details').append('&nbsp;<a style=\"color: #1465B7; cursor: pointer;\" onclick=\"updateApplicantDetailsDialog();\">edit</a></span>');
	}
			
	$('#sweep_l_header_applicant_details').append('<br /><span>Name: ' + applicantName + '</span>');
	$('#sweep_l_header_applicant_details').append('<br /><span>Postal Code: ' + applicantPostalCode + '</span>');
	$('#sweep_l_header_applicant_details').append('<br /><span>Client ID: ' + applicantClientId + '</span>');
	$('#sweep_l_header_applicant_details').append('<br /><span>Case ID: ' + applicantCaseId + '</span>');
	$('#sweep_l_header_applicant_details').append('<br /><div id="docDateDiv" style=="padding: 10px 0px;">Doc Date: <span id="docDate" style ="color: red;"></span></div>');
	$('#sweep_l_header_applicant_details').append('<div id="docTypeDiv" style=="padding: 10px 0px;">Doc Type: <span id="docType" style ="color: red;"></span></div>');
}

/*
Function: saveApplicantDetails()
Save the user-entered applicant details to the database.

Page Actions:
- Step 1 LHS Save Applicant Details

Called Functions:
- <updateApplicantDetails()>
*/
function saveApplicantDetails() {
	var map = new Object();

	map['id'] = objCase.id;
	map['applicantName'] = $('#applicant_name').val();
	map['applicantPostalCode'] = $('#applicant_postal_code').val();
	
	jQuery.ajax({
		type: "POST",
		url: "cases/applicantDetailsUpdate",
		async: false,
		data: map,
		success: function(msg) {
			// Update the objCase object within both windows so we don't have to refresh the page.
			objCase.applicantName = $('#applicant_name').val();
			objCase.applicantPostalCode = $('#applicant_postal_code').val();
			window.opener.objCase.applicantName = $('#applicant_name').val();
			window.opener.objCase.applicantPostalCode = $('#applicant_postal_code').val();
			
			// Update the Applicant Details display.
			updateApplicantDetails();
			
			// Close the Update Applicant Details dialog window.
			$('#updateApplicantDetailsDialog').dialog('close');
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "saveApplicantDetails()", errorThrown);
		}
	});
}

/*
Function: updateApplicantDetailsDialog()
Build and display the Update Applicant Details dialog.

Page Actions:
- Step 1 LHS Applicant Details Edit Click
*/
function updateApplicantDetailsDialog() {
	htmlString = '';

	// Hide the X in the top right of the dialog popup
	$('.ui-dialog-titlebar-close').css('display','none');
	
	htmlString = htmlString + '<p style=\"text-align: left;\">Applicant Name: <input id=\"applicant_name\" value=\"' + objCase.applicantName + '\" /></p>';
	htmlString = htmlString + '<p style=\"text-align: left;\">Applicant Postal Code: <input id=\"applicant_postal_code\" value=\"' + objCase.applicantPostalCode + '\" /></p>';
	htmlString = htmlString + '<p style=\"text-align: left;\"><button onclick=\"saveApplicantDetails();\" id=\"update_applicant_details\">Save</button> <button onclick=\"$(\'#updateApplicantDetailsDialog\').dialog(\'close\');\">Cancel</button></p>';
	
	$('#updateApplicantDetailsDialog').html(htmlString);
	$('#updateApplicantDetailsDialog').dialog('open');
}