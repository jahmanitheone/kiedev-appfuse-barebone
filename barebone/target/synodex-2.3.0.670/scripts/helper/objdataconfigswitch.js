/**
 *  Javascript Data Access Object (DAO): ConfigSwitch Data
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

/** 
 * Get maximum number of sections that a user can select in Step2 OP or QA 
 * 
 * @param clientid - Client id 
 */
function setMaxSectionsPerSelection(clientid) {
	snMaxSectionsPerSelection = 5; //Set default value			
	
	$.ajax({
		url: "configswitch/maxsectionsperselection/" + clientid,
		context: document.body,
		async: true,
		success: function(tmax) {
			snMaxSectionsPerSelection = tmax;			
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "setMaxSectionsPerSelection()", errorThrown);
		}
	});
}
