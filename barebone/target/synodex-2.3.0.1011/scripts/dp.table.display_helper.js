/* 
File: dp.table.display_helper.js
Responsible for specific the data point entry table actions.

Loaded In Steps:
- Step 2 LHS - <step2_popup.jsp>

*****

Function: addTableSpecificDataPointsHandler()
Load the datapoint of the current section when a section is clicked.

Called Functions:
- <addTableSpecificDataPoints(step, caseId, filter)>
*/
function addTableSpecificDataPointsHandler(rowNumber, dplist) {
	activeDPEntry = '';
	activeDPEntrySection = '';
	
	// Add filter search functionality for current selected section when click on the Filter button.  
	var filter = $('#section_dpfilter').val();     // Get the selected option
	if (dplist == null ||  dplist == "dpSectionClicked" || filter == undefined || filter == null){
		filter = "";
		$('#section_dpfilter').val('')
	}
	if(rowNumber == ""){
		rowNumber = selectedSectionNumber;
	}
	if ($('#cur_sel_dp_table').css('display') == 'block') {
		addTableSpecificDataPoints(rowNumber, step, objCase.id, filter, objActivePage.id, dplist);
	}
}

/*
Function: addTableSpecificDataPoints(rowNumber, step, caseId, filter, pageId, dplist)
Load data from Currently Selected data entry from DPENTRY and MEDICALHIRARCHY table.

Parameters:
step - The current step.
caseId - The id of the current case.
filter - Any filtering that is applied by the user.
rowNumber - clicked section. 
pageId - The id of the selected page.
dplist - indicator for section selected 

Page Actions:
- See addTableDataPointsHandler().

Called Functions:
- <millisToDateHandler(millis)>
- <buildFilterList(categories)>
*/
function addTableSpecificDataPoints(rowNumber, step, caseId, filter, pageId, dplist){
	// Display a Data Loading message.
	dspLoadingMsg('#cur_sel_dp_table',"Loading datapoint list....");
	var url = "dataPoint/dataPointEntries/" + caseId + "/step/" + step + "/pageId/" + pageId + "/rowNumber/" + rowNumber;

	$.ajax({
		url: url,
		async: true,
		context: document.body,
		success: function(entities) {
			setDPEntryList(step, filter, entities, dplist);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "addTableDataPoints(" + step + ", " + caseId + ", " + filter + ", " + pageId + ", " + rowNumber + ")", errorThrown);
		}
	});
}

function showDPHeaderInfo(id){
	$('#'+id+'').html('');
	var clientName = objCase._client.clientname;
	var pagesTotal = objCase.pages.length;
	var caseId = objCase.id;
	var assignedUserId = null;
	if(objCase.languageId != objCase._client.defaultLanguageId){
		$.ajax({
			type: "POST",
		  	url: "dataPoint/dataPointLanguage/" + objCase.languageId,
		  	async: false,
		  	success: function(format) {
		  		clientDateFormat = format[0].dateFormat;
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "showDPHeaderInfo()", errorThrown, false);
			}
		});
	}
	//get Case impaired or Standard 
  var caseImpairedOrStandard=getCaseImpariedOrStandared(caseId);
	if(objCase.languageId == objCase._client.defaultLanguageId){
		clientDateFormat = objCase._client.defaultDateFormat;
		}
	var clientDateIcon = "";
	// set Date Icon String based on format.
	if (clientDateFormat  == 'mm/dd/yyyy') 
	    clientDateIcon = ' <img src=\"images/US-flag.png\" height=\"20\" width=\"20\"> '; 
	if (clientDateFormat  == 'dd/mm/yyyy') 
	    clientDateIcon = ' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '; 
	
	var fileName = objCase.clientFileName;
	var code = objCase.codeType + ' ' +objCase.codeVersion;
	var stage = objCase.stage.name;
	var assignedUser = "";
	if(objCase.user != null){
		assignedUser = objCase.user.firstName + ' ' + objCase.user.lastName;
		assignedUserId = objCase.user.id;
	}	
  // IWN:492:For parallelized stages, display in page header which categories to collect data points
  if(qsStageId == PARALLEL_OP_STAGEID && assignedCategoriesForParallelizedOPStage == null){
      assignedCategoriesForParallelizedOPStage = getAssignedCategoriesToCollectDP(caseId, qsStageId);     
  } 
    
	var applicantName = objCase.applicantName;
	if (applicantName == null || applicantName == undefined){ applicantName = ""; }
	var currentPage = "Not Applicable";
	var startTime = objCase.stageStartTimestamp;
	var caseWorkTime = objCase.receiptTimestamp;
	var pagesProcessed = 0;
	var pagesUnprocessed = 0;
	var clientSpec = objCase._client.productSpec;
	/*var specId;
	if (qsStageId == 7 || qsStageId == 50){
		if($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			specId = "dp_header_client_spec_pageview";
		}else{
			specId = "dp_header_client_spec_reportview";
		}
	}else if(qsStageId == 49 || qsStageId == 48){
		specId = "dp_header_client_spec";
	}else{
		specId = "dp_header_client_spec";
	}*/
	

	
	
	// Loop through pages and set variables.
	for (i=0; i < objCase.pages.length; i++) {
		// Check if the page is processed.  Add deleted to the processed count.
		if ((objCase.pages[i].completed == 'true' || objCase.pages[i].completed == true || objCase.pages[i].deleted == 'true' || objCase.pages[i].deleted == true) && (objCase.pages[i].suspendNote == '' || objCase.pages[i].suspendNote == null)) {
			pagesProcessed++;
		} else {
			pagesUnprocessed++;
		}
	}
	
  var header = '<div id=\"cntnr_thmbnail_header_section1\" style=\"float: left; width: 20%;\">Client: <u>' + clientName + '</u><br>Pages Remaining: <u>' + pagesUnprocessed + '</u><br>Stage: <u>' + stage + '</u><br>Ingestion Date: <u>' + millisToDateHandler(caseWorkTime) + '</u></div>';
          if(id=='cntnr_dplist_header_main')
            {
            header +='<div id="cntnr_thmbnail_header_section2" style="float: left; width: 20%;">File: <u>' + fileName + '</u><br>Case ID: <u>' + caseId + '</u><br>Case Work Time: <u><span id="dplist_age_main" style="display: none;"></span></u><u><span id="dplist_age_main1"></span></u><br>1 year Date: <u>' + dateShortenByYear(caseWorkTime,1) + '</u></div>';
            header += '<div id="cntnr_thmbnail_header_section3" style="float: left; width: 20%;">Current Page: ' + currentPage + '<br><u>' + applicantName
                 + '</u><br>Stage Work Time: <span id="dplist_stage_main_work" style="display: none;"></span><u><span id="dplist_stage1_main_work"></span></u><br>3 year Date: <u>' + dateShortenByYear(caseWorkTime,3) + '</u></div>';
            }
          else
            {
            header +='<div id="cntnr_thmbnail_header_section2" style="float: left; width: 20%;">File: <u>' + fileName + '</u><br>Case ID: <u>' + caseId + '</u><br>Case Work Time: <u><span id="dplist_age" style="display: none;"></span></u><u><span id="dplist_age1"></span></u><br>1 year Date: <u>' + dateShortenByYear(caseWorkTime,1) + '</u></div>';
            header += '<div id="cntnr_thmbnail_header_section3" style="float: left; width: 20%;">Current Page: ' + currentPage + '<br><u>' + applicantName
                 + '</u><br>Stage Work Time: <span id="dplist_stage_work" style="display: none;"></span><u><span id="dplist_stage1_work"></span></u><br>3 year Date: <u>' + dateShortenByYear(caseWorkTime,3) + '</u></div>';
            }
  
  //header += '<div id="cntnr_thmbnail_header_section4" style="float: left; width: 20%;">Total Pages: <u>' +pagesTotal+ '</u><br>Assigned to: <u>' + assignedUser + '</u></div>';
  header += '<div id="cntnr_thmbnail_header_section4" style="float: left; width: 20%;">Total Pages: <u>' +pagesTotal+ '</u>';
             if(qsStageId == PARALLEL_OP_STAGEID)
                header += '<br>Logged in: <u>' + authenticatedUserName;
             else
                header += '<br>Assigned to: <u>' + assignedUser; 
  header += '</u><br><div id="dp_header_client_spec">Client Spec: <u><a href="#" onclick="getMainInfo();">' + clientSpec +'</a></u></div></b>5 year Date: <u>' + dateShortenByYear(caseWorkTime,5) + '</u></div>';
  if(id=='cntnr_dplist_header_main')
  	header += '<div id="cntnr_thmbnail_header_section5" style="float: left; width: 20%;">Pages Completed: <u>' +pagesProcessed+ '</u>'+'<br><span id="iwsmain_case_impaired_standard" ></span>'+'<br/>Date Format: ' + clientDateIcon + ' <u>' + clientDateFormat + '</u><br></div>';
  	else
  	header += '<div id="cntnr_thmbnail_header_section5" style="float: left; width: 20%;">Pages Completed: <u>' +pagesProcessed+ '</u>'+'<br><span id="iwsdplist_case_impaired_standard" ></span>'+'<br/>Date Format: ' + clientDateIcon + ' <u>' + clientDateFormat + '</u><br></div>';             
  
  if(qsStageId == PARALLEL_OP_STAGEID){
	 var cat_length = assignedCategoriesForParallelizedOPStage.split(',').length;
	 
	 if (cat_length < 8){ 
		 $('#cntnr_dplist_header_main').css('height', '90px');
		 $('#cntnr_dplist_header').css('height', '90px');
	 } else{ 
		 $('#cntnr_dplist_header_main').css('height', '110px');
		 $('#cntnr_dplist_header').css('height', '110px');
	 }
	 
     header +='<br><div id=\"assignedCategories\" style="float; left;width: 100%;clear: both;">Categories to Collect DP: ' + assignedCategoriesForParallelizedOPStage + '</div>' 
  }       

	//set the count up timer starting from when the case was opened for the stage
	//$('#iws2_thumbnail_age').countdown({since: new Date(startTime), compact: true, format: 'HMS', description: ''});
	
	$('#'+id+'').append(header);
	var newFomatForHeader;
	var newDateFormatForHeader;
	var newFormatForSatgeHeader;
	var newDateFormatForSatgeHeader;
	if(id=='cntnr_dplist_header_main')
		{
		$('#dplist_age_main').countdown({since: new Date(caseWorkTime), compact: true, format: 'dHM', description: ''});
		newFomatForHeader = $('#dplist_age_main').text();
		newFomatForHeader = newFomatForHeader.split(":");
		newDateFormatForHeader = newFomatForHeader[0]+"h"+" "+newFomatForHeader[1]+"m";
		$('#dplist_age_main').html('');
		$('#dplist_age_main1').html(newDateFormatForHeader);
			$('#dplist_stage_main_work').countdown({since: new Date(startTime), compact: true, format: 'dHM', description: ''});
			newFormatForSatgeHeader = $('#dplist_stage_main_work').text();
			newFormatForSatgeHeader = newFormatForSatgeHeader.split(":");
			newDateFormatForSatgeHeader = newFormatForSatgeHeader[0]+"h"+" "+newFormatForSatgeHeader[1]+"m";
			$('#dplist_stage_main_work').html('');
			$('#dplist_stage1_main_work').html(newDateFormatForSatgeHeader);
			//set Impaired case or standard 
           $('#iwsmain_case_impaired_standard').html(caseImpairedOrStandard);
           $('#iwsmain_case_impaired_standard').css("font-weight", "bold");
           if(caseImpairedOrStandard.toLowerCase()=="impaired case")
        	   $('#iwsmain_case_impaired_standard').css("color", "red");
		}
	else
		{
		$('#dplist_age').countdown({since: new Date(caseWorkTime), compact: true, format: 'dHM', description: ''});
		newFomatForHeader = $('#dplist_age').text();
		newFomatForHeader = newFomatForHeader.split(":");
		newDateFormatForHeader = newFomatForHeader[0]+"h"+" "+newFomatForHeader[1]+"m";
		$('#dplist_age').html('');
		$('#dplist_age1').html(newDateFormatForHeader);
		   $('#dplist_stage_work').countdown({since: new Date(startTime), compact: true, format: 'dHM', description: ''});
			newFormatForSatgeHeader = $('#dplist_stage_work').text();
			newFormatForSatgeHeader = newFormatForSatgeHeader.split(":");
			newDateFormatForSatgeHeader = newFormatForSatgeHeader[0]+"h"+" "+newFormatForSatgeHeader[1]+"m";
			$('#dplist_stage_work').html('');
			$('#dplist_stage1_work').html(newDateFormatForSatgeHeader);
			 //set Impaired case or standard 
           $('#iwsdplist_case_impaired_standard').html(caseImpairedOrStandard);
           $('#iwsdplist_case_impaired_standard').css("font-weight", "bold");
           if(caseImpairedOrStandard.toLowerCase()=="impaired case")
        	   $('#iwsdplist_case_impaired_standard').css("color", "red");
		}
}

/*
Function: buildFilterList(categories)
Builds a list of categories to filter by.

Parameters:
categories - Category to sort by.

Page Actions:
- See addTableSpecificDataPoints(rowNumber, step, caseId, filter, pageId, dplist).

Called Functions:
- <getUnique(arr)>
*/
function buildSectionFilterList(categories) {
	// Clear the dropdown list so we do not have duplicate entries.
	$('#section_dpfilter >option').remove();
	
	// Add the "No Filter..." option.
	$('#section_dpfilter').append($('<option></option>').attr('value','').text('No Filter')); 
	
	// Get the unique categories.
	var uniqueCats = getUnique(categories); //$.unique(categories.sort());
		
	// Loop through categories and create a filter option
	$.each(uniqueCats, function(key, value){   
		$('#section_dpfilter').append($('<option></option>').attr('value',value).text(value)); 
	});
}


function currentSectionDPListClickHandler(rowid){
	displaySearchCriteria = false;
	lastSelSubcategory = null;
	createAccordianMenu('indforSectionDPSelection', '#collapse_all', '#expand_all');
	var currow = $('#datapointrow' + rowid);
	var rowcount = currow.children("#rowcount").text();
	var code = currow.children("#code").text();
	var category = currow.children("#category").text();
	var subcategory = currow.children("#subcategory").text();
	clickSelectedFullandSectionDPDatapoint(category, subcategory, code, "sectiondpclicked");
}

/**
 * Refresh the DPs in code selection panel when deleting DPs from section DP list 
 * @param {Object} rowid
 */
function refreshCodeSelPanelAfterDelSectionDP(rowid){
    var currow = $('#datapointrow' + rowid);
    var code = currow.children("#code").text();
    
      if(medicalCodes != null)
        {
            for ( var j = 0; j < medicalCodes.length; j++) {
                //Click selected code
                if(medicalCodes[j].name == code){
                    var clickedRow = $('li[name=' + medicalCodes[j].id + ']').closest( "li" );
                    var isCodeChecked = clickedRow.find('input:checkbox').is(':checked');
                    if (isCodeChecked){
                        sendValueToDPSection('auto', medicalCodes[j].name , medicalCodes[j].description , medicalCodes[j].id , medicalCodes[j].id , medicalCodes[j].id,null,"","","");
                    }   
                    break;
                }
            }       
        }
}



function setDPEntryList(step, filter, entities, dplist) {
	var completedEntries = 0;
	var fullDpListFlag="false";
	
	// Display the data point table header.  Fields vary among steps.
	var datapointTableHtml;

	// Other steps
	datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
		
	//Second Last column is Delete column with no Label shown Last column is Delete column with "Delete" Label shown
	var head = ["Sequence No","Case Page", "Section", "Category", "Subcategory", "Code", "Entry", "Date", "","Delete"]; 
	var headId = ["dataTableSr","dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableEntry", "dataTableDate", "dataTableDelete","dataTableCheckDelete"];

	// Build the head for the tables... this will be used for sorting.
	for (var k in head) {
		datapointTableHtml += '<th id=' + headId[k] + '>' + head[k] + '</th>';
	}
	// Close the table head
	datapointTableHtml += '</thead><tbody>';
	
	// We are going to use this later to build a filter list.
	var categories=[];	
	// Get the info from the database to be displayed.
	var rowCount = 0;

	//This if condition is used to check whether entities length is zero then delete button is disable. 
	if( step == 2 && entities.length==0){
		document.getElementById("deletebtn").disabled=true;
		}
	var suspendNoteCounter =0;
	for (var i = 0; i < entities.length; i++) { 
		// Lets get the properties up front to make it easier to read. First we get the common values we need for all steps.
		var code = entities[i].codeName;
		var codeDescription = entities[i].codeDesc.replace(/'/g, "\\'");
		var category = entities[i].category;
		var subCategory = entities[i].subCategory;
		var dateString = entities[i].dataDate;
		var entrydata=getDataFields(entities[i]);
		categories[i] = entities[i].category;
        var isCritical=entities[i].isCritical;
        var codeScale=entities[i].codeScale;
        var seqNo=entities[i].sequence;
		// Convert date based on client. For toggle view scenario no need date for if date is coming null 
		if(dateString == null ){ dateString = ""; }
		else{ dateString = millisToDateHandler(dateString); }
		
		var page = entities[i].finalpagenumber;
		if(page == null || page == undefined){ page = 0; }
		
		var sectionNumber = entities[i].sectionRange;
		var contentid = entities[i].spContentid;
		var suspendNote = entities[i].suspendnote;
		var codeType = entities[i].codeType;
		if (codeType == null) 
		    codeType = "";
		    
		var encodedJSONOrg = encodeURIComponent(JSON.stringify(entities[i]));
		//var encodedJSON = encodedJSONOrg.replace("'","\\'");
		var encodedJSON2 = encodedJSONOrg.replace(/'/g, "\\'\\'");

		// Filter.
		if (filter == null || filter=='' || filter == categories[i]) {
			
			rowCount = i+1;	//For serial Number Counter. users want the serial numbers of the dps captured to appear in the toggle view.
			// Start a new row.
			if(i%2 == 0){
				datapointTableHtml += '<tr id="datapointrow' + rowCount + '" class=\"even\"';
			}else{
				datapointTableHtml += '<tr id="datapointrow' + rowCount + '" class=\"odd\"';
			}
			datapointTableHtml += '>';

			//for suspendNote data point
			if(suspendNote != null && suspendNote != ''){
				datapointTableHtml += '<td id="rowCount" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow; text-align: center;\">'+seqNo+'</td>';
				datapointTableHtml += '<td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow; text-align: center;\">' + page + '</td><td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow; text-align: center;\">' + sectionNumber + '</td>';
				datapointTableHtml += '<td id="category" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow;\">' + category + '</td><td id="subcategory" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow;\">' + subCategory + '</td>';
				datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + rowCount + ',\''+codeScale+'\');" style=\"cursor: pointer; background-color: yellow;\">' + code + '</td>';
				datapointTableHtml += '<td id="codedescription" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow;\">' + entrydata + '</td>';
				datapointTableHtml += '<td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; background-color: yellow;\">' + dateString + '</td>';
			}else{
				datapointTableHtml += '<td id="rowCount" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;\">'+seqNo+'</td>';
				datapointTableHtml += '<td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;\">' + page + '</td><td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;\">' + sectionNumber + '</td>';
				datapointTableHtml += '<td id="category" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer;\">' + category + '</td><td id="subcategory" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer;\">' + subCategory + '</td>';
				datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + rowCount + ',\''+codeScale+'\');" style=\"cursor: pointer;\">' + code + '</td>';
				datapointTableHtml += '<td id="codedescription" onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer;\">' + entrydata + '</td>';
				datapointTableHtml += '<td onclick="currentSectionDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer;\">' + dateString + '</td>';
			}
			
			//To delete single and multiple data point in Step 2
			datapointTableHtml += '<td><span onClick=\"javascript:handleThumbnailDelete(\'' + encodedJSON2 + '\',\''+fullDpListFlag+'\',' + rowCount + ');\" ><img title=\"Click to delete this entry\" style=\'margin-top:3px\' id=\"img_delete' + sectionNumber + '_' + contentid + '_' + encodedJSONOrg + '" src="images/garbage-icon.gif\" /></span></td>';
			//Add Input type Check box to select multiple data point for delete 
			datapointTableHtml += '<td style=\"text-align: center;\"><input type=\"checkbox\" name=\"deletechecksectionlist\" value=\"' + encodedJSONOrg + '\"></></td>';
			datapointTableHtml += '</tr>';
			}
	}

	// if suspendNote datapoint is available the QA person can not complete the stage
	if(objCase.stage.name == 'Step-2-QA' && suspendNoteCounter >0){
		document.getElementById("completeStep").disabled=true;
	}
	else{
		document.getElementById("completeStep").disabled=false;
	}
	// Close table tags.
	datapointTableHtml += '</tbody></table>';
	datapointTableHtml += 	'</div></div>'; 

	// The HTML has been built... append table to the container.
	$('#cur_sel_dp_table').html(datapointTableHtml); 
	
	// If Section Filter button is not clicked then run the buildSectionFilterList function
	if (dplist != "sectiondplistfilter"){
		buildSectionFilterList(categories);
	}
	
	//IWN-45 : Task No 2, Auto-navigate to the first entry in the section DP list.
	if (rowCount > 0 && dplist == "dpSectionClicked"){
		setLoadingOfDPFormOff();
		currentSectionDPListClickHandler(1);
		setLoadingOfDPFormOn();
	}
	var sd = [[1,0], [2,0]];
	if (lastSelectedSort!=null)
		sd = lastSelectedSort;

	if (clientDateFormat == 'dd/mm/yyyy') {
		$('#dataTable').tablesorter({ dateFormat: 'uk' ,
			//To make column Header Unsortable
			headers: {
		  9: { sorter: false },
	      8: { sorter: false },
	      2: { sorter: false },
	      1: { sorter: false }
	     // 0: { sorter: false }
	         },sortList: sd ,  widgets: ['zebra'] }); 
	} else {
		$('#dataTable').tablesorter({ sortList: sd ,
			headers: {
			  9: { sorter: false },
		      8: { sorter: false },
		      2: { sorter: false },
		      1: { sorter: false }
		      //0: { sorter: false }
		    },
		       widgets: ['zebra'] });			
	}
	
	$('#dataTable').bind("sortEnd", function(sorter) { 
	    lastSelectedSort = sorter.target.config.sortList; 
		/*
		 $(this).find('tbody tr td:first-child').each(function(i) {
						$(this).html((i + 1));
				});*/
		
	});	

	// Add cursor to the sortable headers.
	$('.header').css('cursor','pointer');
	
	//Remove the sort handles for Delete in Step 2
	$('#dataTableDelete').attr('class','none');
}
/**
 * 
 * @param {Object} caseId
 */
function getCaseImpariedOrStandared(caseId){
    var caseImpairedOrStandard=null;
    $.ajax({
        type: "POST",
        url: "dataPoint/checkImpairedOrStandard/" + caseId,
        async: false,
        success: function(caseStatus) {
            caseImpairedOrStandard = caseStatus;
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "getDataPointForm()", errorThrown, false);
        }
    });
    return caseImpairedOrStandard;
}

/**getAssignedCategoriesToCollectDP(caseId, stageId)
 *
 *  Will get all Assigned Categories for given parameters for Parallelized OP Stage(POP)
 *
 * 
 * @param {Long} caseId
 * @param {Long} stageId
 */
function getAssignedCategoriesToCollectDP(caseId, stageId){
  var assignedCategoriesToCollect = null;
  $.ajax({
        type: "POST",
        url: 'workflow/getCategoriesToCollectDP/' + caseId + '/' + stageId,
        async: false,
        success: function(assignedCategories) {
            assignedCategoriesToCollect = assignedCategories;
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "getDataPointForm()", errorThrown, false);
        }
    });
    return assignedCategoriesToCollect;
}
