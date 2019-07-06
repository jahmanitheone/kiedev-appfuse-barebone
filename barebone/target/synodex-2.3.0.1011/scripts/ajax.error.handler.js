/* 
File: ajax.error.handler.js
Responsible for ajax error message handling.

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp>
- Step 1 RHS - <step1.jsp>
- Step 2 LHS - <step2_popup.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 4 LHS - <step4_popup.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: displayErrorDialog(dateTime, userName, sessionId, caseId, jsFunction, errorThrown)
Display the error message dialog.

Parameters:
dateTime - The time of the action.
userName - The user's name.
sessionId - The session id.
caseId - The id of the current case.
jsFunction - The JavaScript function in which the error occurred.
errorThrown - The error message thrown by the application.

Note:
	The step (stage), ipaddress and wl session id (sessionId) are for display to dialog only,
	these values are not currently saved to database. 
*/
function displayErrorDialog(dateTime, userName, sessionId, caseId, jsFunction, errorThrown, nodialog) {
	ipAddress = $('#ip i').html();
	if(errorThrown==null || errorThrown.length<=0)
		errorThrown = "unknown";

	stage = "unknown";
	if (typeof objCase != 'undefined' && objCase!=null && objCase.stage!=null)
		stage = objCase.stage.name;
	
	// Save error to DB
	addErrorLogEntry(dateTime, userName, sessionId, caseId, stage, jsFunction, errorThrown);
	
	// Display popup to user.
	var errorParams = new Array();
	
	errorParams[0] = dateTime;
	errorParams[1] = userName;
	errorParams[2] = sessionId;
	errorParams[3] = caseId;
	errorParams[4] = stage;
	errorParams[5] = jsFunction;
	errorParams[6] = errorThrown;
	errorParams[7] = apexSessionId;
	errorParams[8] = ipAddress;

	if(nodialog==null || nodialog==true)
	{
		// Display the error dialog.  Use this method as it halts Javascript execution.
		errorwindow = window.showModalDialog("errorDialog",errorParams,"dialogHeight: 350px; dialogWidth: 450px; dialogTop: 300px; dialogLeft: 500px; edge: Raised; center: Yes; resizable: No; status: No; help: No; scroll: No; statusbar: No; toolbar: No; menubar: No; addressbar: No; titlebar: No; location: No;");
		errorwindow.focus();
	} else
	{
		var msg = jsFunction + " threw and error and was logged for the administrator!";
		popupFadeAwayMsg(msg,null,2500);
	}
}

/*
Function: addErrorLogEntry(dateTime, userName, sessionId, caseId, stage, jsFunction, errorThrown)
Logs the error to the database.

Parameters:
dateTime - The time of the action.
userName - The user's name.
sessionId - The session id.
caseId - The id of the current case.
step - The current step.
jsFunction - The JavaScript function in which the error occurred.
errorThrown - The error message thrown by the application.
*/
function addErrorLogEntry(dateTime, userName, sessionId, caseId, stage, jsFunction, errorThrown) {	
	var map = new Object();
	// Add the audit data to the map.
	map['_session'] = apexSessionId;
	
	// Truncate the javascript function name to 100 chars for DB column max settings.
	if(jsFunction!=null)
		jsFunction = jsFunction.substring(0,100);
	else
		jsFunction = "unknown";
	map['actionname'] = jsFunction;
	
	// Truncate the stage name to 30 chars for DB column max settings.
	stage = stage.substring(0,30);
	map['screenname'] = stage;
	
	map['message'] = errorThrown;
	map['content'] = caseId;

	if (typeof objCase != 'undefined' && objCase!=null && objCase.user!=null)
		map['created_userid'] = objCase.user.id;
	
	if(userName==null)
		userName = "unknown";
	map['username'] = userName;
		
	var url = "error/errorLogEntry";

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
			// Do Nothing
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// Do Nothing
		}
	});
}