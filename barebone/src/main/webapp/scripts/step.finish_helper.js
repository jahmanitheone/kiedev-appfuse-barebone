/* 
File: step.finish_helper.js
Responsible for the finishing of steps.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: finishStepConfirm()
Confirm the completion of a step with the user.

Page Actions:
- Step 1 RHS Complete All Pages
- Step 2 RHS Complete
- Step 3 RHS Complete
- Step 4 RHS Complete

Called Functions:
- <finishStep()>
*/
function finishStepConfirm() {
	finishStep();
}

/*
Function: finishStep()
Handle the completion of the step. Happens after the user confirms the completion.
Could not complete when there is any incomplete page still left to complete

Page Actions:
- Step 1 RHS Complete All Pages
- Step 2 RHS Complete
- Step 3 RHS Complete
- Step 4 RHS Complete

Called Functions:
- <getNextStep()>
- <fupdateFinalPageNumbers()>
- <updateStageId(nextStageId)>
*/
function finishStep() {

	var nextStageId = getNextStep(objCase._client.clientid, qsStageId,objCase.id,step);

	// when nextStageId is -1, i.e there is still some page left to complete.
	if (nextStageId == -1) {
		alert("Some of the page or pages are incomplete. Please finish all pages before proceed.");
		return true;
	}
	var r = confirm("Do you want to continue the document with marked complete and release. Continue?");
	if (r == true) {
		if (nextStageId != null) {
			//var nextStageId = 1;
			// step is set in the global variables for a page
			switch (step) {
			case 1:
				//var nextStageId = 1;
				// Update the final page numbers after step 1 and 2.
				updateFinalPageNumbers();
				// nextStageId = 5;//stageid 5 = Step-1-QA
				break;
			case 2:
				updateFinalPageNumbers();
				// nextStageId = 7;//stageid 7 = Step-2-QA
				break;
			case 3:
				// nextStageId = 9;//stageid 9 = Step-3-QA
				break;
			case 4:
				// nextStageId = 11;//stageid 11 = Step-4-QA
				break;
			}
            if(qsStageId==71){
            // update flag for stage 2 POP 
             updatePOPStage(qsStageId);
            }else{
			// Set Stage Id.
			updateStageId(qsStageId, nextStageId);
			}
		}

		// Re-direct user to Main Menu.
		if (ssl == true || ssl == 'true') {
			buttonMainMenuUrl = "https://";
		} else {
			buttonMainMenuUrl = "http://";
		}
		buttonMainMenuUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + appScreen + ':' + apexSessionId;
		window.location = buttonMainMenuUrl;
	}
	return r;
}

/*
Function: updateStageId(nextStageId)
Update the stage id to the next stage.

Parameters:
nextStageId - The id of the next stage.

Page Actions:
- Step 1 RHS Complete All Pages
- Step 2 RHS Complete
- Step 3 RHS Complete
- Step 4 RHS Complete
*/
function updateStageId(qsStageId,nextStageId) {
	$.ajax({
		url: 'cases/' + caseId + '/stage/' + qsStageId + '/' + nextStageId,
		async: false,
		type : 'POST',
		success: function(msg) {
			alert(msg);
		},
    	error: function (xhr, ajaxOptions, thrownError){
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updateStageId(" + nextStageId + ")", errorThrown);
    	}  
	});
}

/*
Function: getNextStep(clientid,curstatingid,caseid)
Automating next staging step for a work flow if the work in all the pages are completed 

Parameters:
clientid - The current client ID
curstatingid - the current staging ID
caseid - The current case ID

Returns:
nextstagingid - The next staging ID

Page Actions:
none
*/
function getNextStep(clientid, curstatingid, caseid,step)
{
    var nextstagingid = null;
    //IWS-359:Page is not completing when last Excluded page is Not Excluded
    $.ajax({
	    url: "workflow/" + clientid + "/" + curstatingid + "/" + caseid + "/"+ step + "/completion/",
	    async: false,
	    context: document.body,   
	    success: function(nxtstp){
		    nextstagingid = nxtstp;
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
    
    return nextstagingid;
}
/**
 *update parallelized stage  for 71
 * @param {Object} qsStageId
 */
function updatePOPStage(qsStageId) {
    $.ajax({
        url: 'cases/' + caseId + '/stage/' + qsStageId ,
        async: false,
        type : 'POST',
        success: function(msg) {
            alert(msg);
        },
        error: function (xhr, ajaxOptions, thrownError){
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "updateStageId(" + nextStageId + ")", errorThrown);
        }  
    });
}