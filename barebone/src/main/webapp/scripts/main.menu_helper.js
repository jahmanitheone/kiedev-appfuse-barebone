/* 
File: main.menu_helper.js
Responsible for setting the Main Menu button URL.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: document.ready()
Sets the Main Menu button URL based on global variables, including the domain, port, app id, app screen and apex session id.

Page Actions:
- Step 1 RHS Document Ready
- Step 2 RHS Document Ready
- Step 3 RHS Document Ready
- Step 4 RHS Document Ready
*/
$(document).ready(function () {
	// Set the action on the main menu button.
	if (ssl == true || ssl == 'true') {
		buttonMainMenuUrl = "https://";
	} else {
		buttonMainMenuUrl = "http://";
	}
	buttonMainMenuUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + appScreen + ':' + apexSessionId;
	
//	$('#buttonMainMenu').attr('onClick','window.location.href = \'' + buttonMainMenuUrl + '\'');
	
	$('#buttonMainMenu').click(function(c) {
  	  window.location.href = buttonMainMenuUrl;
  	  // setting the audit log entries
  	  exitIWSCase('exit');
	});
	
	$('#buttonLogout').click(function(c) {
		userLogout();
	});
});

/*
Function: userLogout()
Logs the user out of IWS.

Page Actions:
- Step 1 LHS Logout Button Click
- Step 1 RHS Logout Button Click
- Step 2 LHS Logout Button Click
- Step 2 RHS Logout Button Click
- Step 3 RHS Logout Button Click
- Step 4 LHS Logout Button Click
- Step 4 RHS Logout Button Click
*/
function userLogout() {
  // setting the audit log entries
  exitIWSCase('logoff');
  
	// Redirect the user to the apex login screen.
	var buttonLogoutUrl = "http://";
	if (ssl == true || ssl == 'true')
		buttonLogoutUrl = "https://";
	buttonLogoutUrl += domain + ":" + port + "/pls/apex/wwv_flow_custom_auth_std.logout?p_this_flow=" + appId + '&p_next_flow_page_sess=' + appId + ':1:' + apexSessionId;
	
	window.location.href = buttonLogoutUrl;
}

/*
 * Function exitIWSCase(exitType)
 * 
 * Logs the action for exit/logoff in audit log table
 */
function exitIWSCase(exitType){
  
    var exitMessage = null;
    $.ajax({
      url: 'workflow/exitIWSCase/'+ caseId +'/' + qsStageId +'/' + exitType,
      async: false,
      context: document.body,   
      success: function(msg){
        exitMessage = msg;
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
      displayErrorDialog(dateTime, userName, sessionId, caseId, "getNextStep(" + clientid + ", " + curstatingid + ", " + caseid +")", errorThrown);
      }
    });
    
    return exitMessage;
}
