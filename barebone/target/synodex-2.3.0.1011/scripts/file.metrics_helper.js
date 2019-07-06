/* 
File: file.metrics_helper.js
Responsible for updating the file metrics within the step 1 and 2 LHS header.

*****

Function: updateFileMetrics()
Update the file metrics within the LHS header.  File metrics include total pages, excluded pages, processed pages, unprocessed pages, flagged pages and file work time.

Available In Steps:
- Step 1 LHS - <step1_popup.jsp>
- Step 2 LHS - <step2_popup.jsp>

Page Actions:
- Step 1 RHS Update Metadata Panel
- Step 1 LHS Dom Ready
- Step 2 RHS Update Metadata Panel
- Step 2 LHS Dom Ready
*/
function updateFileMetrics() {
	// Get the updated case object.
	objCase = window.opener.objCase;
	
	var pagesTotal = objCase.pages.length;
	var pagesExcluded = 0;
	var pagesProcessed = 0;
	var pagesUnprocessed = 0;
	var pagesFlagged = 0;

	// Loop through pages and set variables.
	for (i=0; i < objCase.pages.length; i++) {
		// Check if the page is excluded.
		if (objCase.pages[i].deleted == 'true' || objCase.pages[i].deleted == true) {
			pagesExcluded++;
		}

		// Check if the page is processed.  Add deleted to the processed count.
		if ((objCase.pages[i].completed == 'true' || objCase.pages[i].completed == true || objCase.pages[i].deleted == 'true' || objCase.pages[i].deleted == true) && (objCase.pages[i].suspendNote == '' || objCase.pages[i].suspendNote == null)) {
			pagesProcessed++;
		} else {
			pagesUnprocessed++;
		}

		// Check if the page is suspended.
		if (objCase.pages[i].suspendNote != '' && objCase.pages[i].suspendNote != null) {
			pagesFlagged++;
		}
	}
	var startTime = objCase.stageStartTimestamp;
	//set the count up timer starting from when the case was opened for the stage
	$('#pages_worktime').countdown({since: new Date(startTime), compact: true, format: 'MS', description: ''});

	// Update the display.
	$('#pages_total').html ( pagesTotal );
	$('#pages_excluded').html ( pagesExcluded );
	$('#pages_processed').html ( pagesProcessed );
	$('#pages_unprocessed').html ( pagesUnprocessed );
	$('#pages_flagged').html ( pagesFlagged );
}