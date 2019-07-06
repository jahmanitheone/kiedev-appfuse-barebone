var setTranscriptText = null;
var completeEntryMap=null;

/* 
File: page.table.display_helper.js
Responsible for the data point entry table actions.

Loaded In Steps:
- Step 2 LHS - <step2_popup.jsp>
- Step 2 RHS - <step2.jsp>

*****

Function: addTableDataPointsHandler(dplist)
Clear left window, remove selection in the right window and load data points.

Parameters:
dplist - this value is null when the user click on DP List Button, Quick View Button.

Page Actions:
- Step 2 DP List Button Click.
- Step 2 Category View and Page View Button Click.
- Step 2 DP List Quick View Button Click of the current DP List.
- Step 2 Filter Button click of the full DP List Section.

Called Functions:
- <addTableDataPoints(step, caseId, filter)>
*/
function addTableDataPointsHandler(dplist) {
	// Clear the active data point entry global values.
	activeDPEntry = '';
	activeDPEntrySection = '';
	// Add filter search functionality for DP List when click on the Filter button.  
	var filter = $('#iws2_dpfilter_full').val();          // Get the selected filter option
	if (dplist == null || filter == null || filter == undefined){
		filter = "";
		$('#iws2_dpfilter_full').val('');
	}
	// Add datapoints only if we are displaying the table.
	if ($('#data_point_table').css('display') == 'block') {
		addTableDataPoints(step, objCase.id, filter, dplist);
		//$('#iws2_dpfilter_full_pageview_button').html("Page View");
	}
}

/*
Function: addTableDataPoints(step, caseId, filter)
Load data from DPENTRY and MEDICALHIRARCHY table.

Parameters:
step - The current step.
caseId - The id of the current case.
filter - Any filtering that is applied by the user.

Page Actions:
- See addTableDataPointsHandler(dplist).

Called Functions:
- <millisToDateHandler(millis)>
- <buildFilterList(categories)>
*/

function addTableDataPoints(step, caseId, filter, dplist) {
	$('#cur_sel_dp_table').html('<div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div>');
	var completedEntries = 0;

	// Display the data point table header.  Fields vary among steps.
	var datapointTableHtml;

	// Other steps
	if(qsStageId != 7 && qsStageId != 50)
		datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
	else
		datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel"></div><table id="dataTable"><thead style=\"cursor: pointer;\">';
	//Second Last column is Delete column with no Label shown Last column is Delete column with "Delete" Label shown
	var head = ["SRL No", "Code", "Description", "Category", "Subcategory", "Case Page", "Section", "Date", "","Delete"]; 
	var headId = ["dataTableSr", "dataTableCode", "dataTableDescription", "dataTableCategory", "dataTableSubcategory", "dataTablePage", "dataTableSection", "dataTableDate", "dataTableDelete","dataTableCheckDelete"];
	
    
    
    if(qsStageId == 71 && !isDPListQuickViewOpen) {
        // if global variable assignedCategoriesForParallelizedOPStage is null
        if(assignedCategoriesForParallelizedOPStage == null) {
           //get assigned categories for parallelized stage
            assignedCategoriesForParallelizedOPStage = getAssignedCategoriesToCollectDP(caseId, qsStageId);
        }
         //get selected filterString
        var filterString = $('#iws2_dpfilter_full').val();
    
        if(filterString == "assignedcategories") {

            //Remove all the options
            $('#iws2_dpfilter_full >option').remove();
            // Add the "Assigned Categories Filter..." option.
            $('#iws2_dpfilter_full').append($('<option></option>').attr('value', 'assignedcategories').text('Assigned Categories'));

            // Add the "All Categories Filter..." option.
            $('#iws2_dpfilter_full').append($('<option></option>').attr('value', 'allcategories').text('All Categories'));
        }

        if(assignedCategoriesForParallelizedOPStage != null) {
            //if assignedCategoriesForParallelizedOPStage is not return value "ALL" and filterString is "assignedcategories"
            if(assignedCategoriesForParallelizedOPStage != "All" && filterString == "assignedcategories") {
                var categories = assignedCategoriesForParallelizedOPStage.split(",");
                //assign to filter
                filter=filterString;
                //Remove the last option
                $("#iws2_dpfilter_full option[value='allcategories']").remove();
                //Append  assigned categories
                var filterCategories = "";
                $.each(categories, function(key, value) {
                    filterCategories += replaceAll(value.trim(), " ", "*") + "_";
                    $('#iws2_dpfilter_full').append($('<option></option>').attr('value', value.trim()).text(value.trim()));
                });
                // Add the "All Categories Filter..." option in last .
                $('#iws2_dpfilter_full').append($('<option></option>').attr('value', 'allcategories').text('All Categories'));
            } else if(assignedCategoriesForParallelizedOPStage == "All") {
                $("#iws2_dpfilter_full option[value='assignedcategories']").remove();
                 filter=$('#iws2_dpfilter_full').val();
               // var url = "dataPoint/dataPointEntries/" + caseId + "/step/" + step + "/stageId/" + qsStageId + "/filter/" + "nofilter";
            }       

            //show selected option in filter list
            if(filterString != "") {
                $("#iws2_dpfilter_full option").each(function() {
                    if($(this).text() == filterString)
                        $(this).attr('selected', 'selected');
                });
            }
        } else {
            // if assignedCategoriesForParallelizedOPStage is null then it will return all the dplist 
            $("#iws2_dpfilter_full option[value='assignedcategories']").remove();
             filter=$('#iws2_dpfilter_full').val();
        }
    } 
   
    

    
    var url = "dataPoint/dataPointEntries/" + caseId + "/step/" + step;

	// Build the head for the tables... this will be used for sorting.
	for (var k in head) {
		datapointTableHtml += '<th id=' + headId[k] + '>' + head[k] + '</th>';
	}
	// Close the table head
	datapointTableHtml += '</thead><tbody>';

	// We are going to use this later to build a filter list.
	var categories=[];
	// Get the info from the database to be displayed.
	$.ajax({
		url: url,
		async:   false,
		context: document.body,
		success: function(entities) {
			dplistEntriy = entities;
			if(isDPListQuickViewOpen == true){   // for dp QuickView
				displayPageViewData(filter, dplist);
			}else if (qsStageId == 49){    // for step2 TR
                $('#cntnr_datapoint_fullllist_filter').css('display','none');
                $('#pageview_datapoint_fullllist').css('display','block');
                filter = "";    // there is no filter on Step2 TR
                displayPageViewDataForStep2TR(filter, dplist);
			}else if (qsStageId == 6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71){    // for step2 OP //IWN-382: 3-way split of Step-2-OP and step-2-pop
               if(dplist == IWS2SCREENS_FULLDPLIST_PAGEVIEW){
            	   displayPageViewData(filter, dplist);
               }else if(dplist == IWS2SCREENS_FULLDPLIST_CATEGORYVIEW){
            	   displayCategoryViewData(filter, dplist);
               }else if(dplist =="fulldplistfilter"){
            	   if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_PAGEVIEW){
            		   displayPageViewData(filter, dplist);
            	   }else{
            		   displayCategoryViewData(filter, dplist);
            	   }
               }else{
            	   displayCategoryViewData(filter, dplist);
               }
			}else if(qsStageId == 7 || qsStageId == 50){
				displayPageViewData(filter, dplist);
			}else{
				displayCategoryViewData(filter, dplist);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "addTableDataPoints(" + step + ", " + caseId + ", " + filter + ", " + dplist + ")", errorThrown);
		}
	});
	
	// Add cursor to the sortable headers.
	$('.header').css('cursor','pointer');
		//Remove the sort handles for Delete in Step 2
	if(step==2)
		$('#dataTableDelete').attr('class','none');
	//$('#iws2_dpfilter_full_pageview_button').html("Page View");
	if(pageviewdelete)
		{
		displayPageViewData(filter);
		}
}

function completeEntryNoCode(id) {
	var map = new Object(); 
	
	// Uncomplete by default.
	map['isCompleted'] = false;
	
	// Override if complete if necessary.
	if ($("#rowComplete" + id).attr("checked") == "checked") {
		map['isCompleted'] = true;
	}
	
	// All data has been set.  Update/insert data point entry.
	jQuery.ajax({  
		type: "POST",
		url: "dataPoint/dataPointEntryUpdate/" + id,
		async: false,
		data : {
			'_method' : 'PUT',
			entry : map
		},
		success : function(msg) {
			// Refresh the table.
			addTableDataPoints(step,objCase.id,$('#iws2_dpfilter_full').val(),null);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "completeEntryNoCode(" + id + ")", errorThrown);
		}
	});
	
}

/*
Function: buildFilterList(categories)
Builds a list of categories to filter by.

Parameters:
categories - Category to sort by.

Page Actions:
- See addTableDataPoints().

Called Functions:
- <getUnique(arr)>
*/
function buildFilterList(categories) {
	// Clear the dropdown list so we do not have duplicate entries.
	$('#iws2_dpfilter_full >option').remove();
	if(qsStageId==71 && (assignedCategoriesForParallelizedOPStage == "All" || assignedCategoriesForParallelizedOPStage == null)){
	    // Add the "All categories option ..." option.
	$('#iws2_dpfilter_full').append($('<option></option>').attr('value','allcategories').text('All Categoreis'));
	}else{
	    // Add the "No Filter..." option. for all stage 
	$('#iws2_dpfilter_full').append($('<option></option>').attr('value','').text('No Filter'));    
	}
	// Get the unique categories.
	var uniqueCats = getUnique(categories); //$.unique(categories.sort());
		
	// Loop through categories and create a filter option
	$.each(uniqueCats, function(key, value){   
		$('#iws2_dpfilter_full').append($('<option></option>').attr('value',value).text(value)); 
	});
}

/*
Function: displayMedicalCodes(entryId)
Displays the medical codes (from the black box) and other details for a given data point entry.

Parameters:
entryId - The id of the entry for the dataPointEntryCode.

Page Actions:
- Step 3 RHS Data Point Entry Table Row Click

Called Functions:
- <createDataPointTablePopup(entryId)>
*/
function displayMedicalCodes(entryId) {
	// Close the dp details if the active dp details row was clicked.
	if ($('#dp_details_' + entryId).attr('class')) {
		// Hide the non-sortable table header row and display the sortable header row.
		$('#dp_table_header_mock').css('display','none');
		$('#dp_table_header').css('display','');
		
		// Change all - to a +
		$('.img_expand').each(function () {
			$(this).attr('src','images/plus.gif');
		});
				
		// Remove the data point entry details row.
		$('.dp_details').parent().remove();
	} else {
		// Remove ability to sort when dp details are open.
		
		// Move the mock header to the top of the table, as it may have moved during sorting.
		var oRow = $('#dp_table_header_mock');
		$('#dp_table_header_mock').remove;
		$('#dataTableStep4').prepend(oRow);
		
		// Change all - to +
		$('.img_expand').each(function () {
			$(this).attr('src','images/plus.gif');
		});
		
		// Change active entryId image to -
		$('#img_expand_' + entryId).attr('src','images/minus.gif');

		// Hide the sortable table header row and display the non-sortable header row.
		$('#dp_table_header_mock').css('display','');
		$('#dp_table_header').css('display','none');
		
		// Display the dp details if the clicked dp row was not active.
		createDataPointTablePopup(entryId);
	}
}

/*
Function: getUnique(arr)
Used to get unique values so we do not display categories multiple times.

Parameters:
arr - The array.

Page Actions:
- See buildFilterList(categories).
*/
function getUnique(arr) {
	arr.sort();
    var r = new Array();
    o:for(var i = 0, n = arr.length; i < n; i++) {
        for(var x = 0, y = r.length; x < y; x++) {
                if(r[x]==arr[i]) {
                        continue o;
                }
        }
        r[r.length] = arr[i];
    }
    return r;
}


/*
Function: handleThumbnailDelete(entry)
Handle the thumbnail delete click

Parameters:
entry - JSON entry value being deleted

Page Actions:
- See softDeleteDataPoint(datapntidtodelete).
*/
var pageviewdelete=false;
function handleThumbnailDelete(entry, flag, rowNum) {
	var updateEntry =  JSON.parse(decodeURIComponent(entry));
	var datapntidtodelete = updateEntry.dpentryId;
	if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_CATEGORYVIEW){
		pageviewdelete=true;
		var dpinfo = "Deleting datapoint: " + updateEntry.finalpagenumber + ", " + updateEntry.sectionRange + ", " + updateEntry.category + ", " + updateEntry.subCategory+", "+updateEntry.codeName+", "+updateEntry.codeDesc;
        }
        else if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_PAGEVIEW){
        	pageviewdelete=false;
        	var dpinfo = "Deleting datapoint: " + updateEntry.codeName+ ", " + updateEntry.codeDesc + ", " + updateEntry.category + ", " + updateEntry.subCategory+", "+updateEntry.finalpagenumber+", "+updateEntry.sectionRange;
        }
	dpinfo += "\n\nAre you sure you want to delete this datapoint?\nPress [Ok] to delete, [Cancel] to abort."
	r = confirm(dpinfo);
	if (r == true) {
		softDeleteDataPoint(datapntidtodelete, flag, rowNum);
		if (qsStageId == 7)
			enableDisableCompleteButtonWhenCheckBoxChecked();   // enable the Complete button when all the datapoint are marked complte after deleting a single dp from the list.
			 showDPHeaderInfo('cntnr_dplist_header');
	} 
}

/*
Function: softDeleteDataPoint(id)
Do the Jquery ajax call for soft delete

Parameters:
id - the DataEntry ententy call to do sofl delete 

Page Actions:
- See addTableDataPointsHandler()
-     displayErrorDialog(dateTime, userName, sessionId, caseId, "softDeleteDataPoint(" + id + ")", errorThrown)
*/
function softDeleteDataPoint(id, flag, rowNum) {
	var url = "dataPoint/dataPointSoftDelete/" + id;
	
	jQuery.ajax({  
		type: "POST",
		url: url,
		async: false,
		success : function(msg) {
			//alert("Datapoint succesfully deleted");
			if(flag=="false"){
			    refreshCodeSelPanelAfterDelSectionDP(rowNum);
			    addTableSpecificDataPointsHandler("",null);
			}else{
    			addTableDataPointsHandler(null);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "softDeleteDataPoint(" + id + ")", errorThrown);
		}
	});
}

/*
Function: handleThumbnailCheckDelete()
Handle the thumbnail delete click

Page Actions:
- See multipleDeleteDataPoint(url_str,array_checkbox).
*/
function handleThumbnailCheckDelete(flag)
{
	var array_checkbox=new Array();
	var url_str="";
	var paramname="entryid";
	var dpcheckinfo="";
    var i=0;
    var deletename="deletecheck";
    if(flag=="false"){deletename+="sectionlist";}
    else{deletename+="dplist";}
     
		$("input[type='checkbox'][name='"+deletename+"']").each(function()
		{
			if(this.checked)
			{
				var updateEntry =  JSON.parse(decodeURIComponent(this.value));
				var datapntidtodelete = updateEntry.dpentryId;
				array_checkbox[i]=datapntidtodelete;
				//dpcheckinfo += "\nDelete datapoint: " + updateEntry._page.finalPageNumber + ", " + updateEntry.sectionnumber + ", " + updateEntry._dataPointFormEntity._dataPointCategory.dpcategoryname + ", " + updateEntry._dataPointFormEntity._subCategory.dpsubcatname;
				if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_CATEGORYVIEW){
					pageviewdelete=true;
					dpcheckinfo += "\nDeleting datapoint: " + updateEntry.finalpagenumber + ", " + updateEntry.sectionRange + ", " + updateEntry.category + ", " + updateEntry.subCategory+", "+updateEntry.codeName+", "+updateEntry.codeDesc;
			        }
			        else if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_PAGEVIEW){
			        pageviewdelete=false;
			        dpcheckinfo += "\nDeleting datapoint: " + updateEntry.codeName+ ", " + updateEntry.codeDesc + ", " + updateEntry.category + ", " + updateEntry.subCategory+", "+updateEntry.finalpagenumber+", "+updateEntry.sectionRange;
			        }
				i++;
			}
		});
		for(var i=0;i<array_checkbox.length;i++)
		{
			var keys=paramname+"="+array_checkbox[i]+"&";
			if(i==array_checkbox.length-1)
				{
				keys=paramname+"="+array_checkbox[i];
				url_str+=keys;
				break;
				}
		   	else{
		   		url_str+=keys;
			  }
		}
		
		if(array_checkbox.length>0)
			{
			//IWS-343:At Step 2, when multiple dps are deleted at a single attempt, then the dialogue box should mention the number of entries to be deleted.
			dpcheckinfo += "\n\nTotal number of  DataPoints ["+array_checkbox.length+"] will be deleted."; 
	        dpcheckinfo += "\n\nAre you sure you want to delete these datapoint?\nPress [Ok] to delete, [Cancel] to abort.";
	        	
			r = confirm(dpcheckinfo);
			if (r == true){
                multipleDeleteDataPoint(url_str,array_checkbox,flag);
                showDPHeaderInfo('cntnr_dplist_header');
                if (qsStageId == 7)
        			enableDisableCompleteButtonWhenCheckBoxChecked();   // enable the Complete button when all the datapoint are marked complte after deleting a single dp from the list.
		        }
             }
		else{
			alert("You have not selected any data point check box for delete.")
		    }
}
/*
Function: multipleDeleteDataPoint(id)
Do the Jquery ajax call for soft delete

Parameters:
entry_ids - the contain data entry point url
ids-contains array of entry ids for error show 

Page Actions:
- See addTableDataPointsHandler()
-     displayErrorDialog(dateTime, userName, sessionId, caseId, "softDeleteDataPoint(" + id + ")", errorThrown)
*/
function multipleDeleteDataPoint(entry_ids,ids,flag) {
	
	var url = "dataPoint/dataPointSoftMultipleDelete?" + entry_ids;
	jQuery.ajax({  
		type: "GET",
		url: url,
		async: false,
		success : function(msg) {
			//alert("Data points successfully deleted.")
			if(flag=="false")
			addTableSpecificDataPointsHandler("",null);
			else
			addTableDataPointsHandler(null);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "multipleDeleteDataPoint(" + ids + ")", errorThrown);
		}
	});
}

function dataPointListForPageView(){
	var filter = $('#iws2_dpfilter_full').val();          // Get the selected filter option
	if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_PAGEVIEW){
		$('#sweep_r_wrapper_iws2_dplist').show();
		$('#thumbnail_metadata_iws2').show();
		closeCodeDescriptionPopUp();
		displayPageViewData(filter, "fulldplistfilter");
		$('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_CATEGORYVIEW);
		$('#thumbnail_slider_iws2').show();
		pageviewdelete=false;
	} else if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_CATEGORYVIEW){
		$('#sweep_r_wrapper_iws2_dplist').show();
		$('#thumbnail_metadata_iws2').show();
		closeCodeDescriptionPopUp();
		displayCategoryViewData(filter, "fulldplistfilter");
		$('#thumbnail_slider_iws2').show();
		$('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_PAGEVIEW);
		pageviewdelete=false;
	}
}

function displayPageViewDataForStep2TR(filter, dplist){
    var fullDpListFlag="true";

    var datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel"></div><table id="dataTable"><thead style=\"cursor: pointer;\">';
    var head = ["Sequence No", "Page", "Section", "Category", "Subcategory", "Code", "Entry", "Date"]; 
    var headId = [ "dataTableSeqNo","dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableDescription", "dataTableEntry", "dataTableDate"];

    // Build the head for the tables... this will be used for sorting.
    for (var k in head) {
        datapointTableHtml += '<th id=' + headId[k] + '>' + head[k] + '</th>';
    }
    // Close the table head
    datapointTableHtml += '</thead><tbody>';
    var categories=[];
    var srlNoforStep2TR = 0;
    completeEntryMap=new Object();
    for (var i = 0; i < dplistEntriy.length; i++) { 
        // Lets get the properties up front to make it easier to read. First we get the common values we need for all steps.
        var code = dplistEntriy[i].codeName;
        var codeDescription = dplistEntriy[i].codeDesc.replace(/'/g, "\\'");
        var category = dplistEntriy[i].category;
        var subCategory = dplistEntriy[i].subCategory;
        var dateString = dplistEntriy[i].dataDate;
        var entryData=getDataFields(dplistEntriy[i]);
        // For Step2 QA and Step 2 OP2
        var isCompleted = dplistEntriy[i].isCompleted;
        var isRejected = dplistEntriy[i].isRejected;
        var dpentryId = dplistEntriy[i].dpentryId;
        var isCritical=dplistEntriy[i].isCritical;
        var codeScale=dplistEntriy[i].codeScale;
       
        categories[i] = dplistEntriy[i].category;
        
        //IWO-54: Check the logic of Step-2-TR and update if needed
        var fieldLabels = "" ;
        for(j = 0; j < dplistEntriy[i].dataFieldLabels.length; j++){
           fieldLabels += (dplistEntriy[i].dataFieldLabels[j] + dplistEntriy[i].dataFieldTypes[j]);
          
        }
/*
        
        var fieldLabels = dplistEntriy[i].datafield1+dplistEntriy[i].dataField1Type+dplistEntriy[i].datafield2+dplistEntriy[i].dataField2Type
        				 +dplistEntriy[i].datafield3+dplistEntriy[i].dataField3Type+dplistEntriy[i].datafield4+dplistEntriy[i].dataField4Type
		 				 +dplistEntriy[i].datafield5+dplistEntriy[i].dataField5Type+dplistEntriy[i].datafield6+dplistEntriy[i].dataField6Type
		 				 +dplistEntriy[i].datafield7+dplistEntriy[i].dataField7Type+dplistEntriy[i].datafield8+dplistEntriy[i].dataField8Type;
*/
        //IWO-27 var ishandwriting = dplistEntriy[i].ishandwriting;
        
        // Convert date based on client. For toggle view scenario no need date for if date is coming null 
        if(dateString == null ){ dateString = ""; }
        else{ dateString = millisToDateHandler(dateString); }
        
        var page = dplistEntriy[i].finalpagenumber;
        if(page == null || page == undefined){ page = 0; }
        
        //var sectionNumber = dplistEntriy[i].sectionNumber;
        var sectionNumber = dplistEntriy[i].sectionRange;
        var contentid = dplistEntriy[i].spContentid;
        var suspendNote = dplistEntriy[i].suspendnote;
        var pageId=dplistEntriy[i].pageId;
        var codeType = dplistEntriy[i].codeType;
        var seqNo= dplistEntriy[i].sequence;
        if (codeType == null) 
            codeType = "";
        var encodedJSONOrg = encodeURIComponent(JSON.stringify(dplistEntriy[i]));
        //var encodedJSON = encodedJSONOrg.replace("'","\\'");
        //var encodedJSON = encodedJSONOrg.replace(/'/g, "\\'");
        var encodedJSON2 = encodedJSONOrg.replace(/'/g, "\\'\\'");
        
        // Filter.
        if (filter == null || filter=='' || filter == categories[i]) {
        	
        	//TR step only shows DPs that have Transcript Text field (IWO-54: Check the logic of Step-2-TR and update if needed)
            if (fieldLabels.indexOf("TranscriptText") != -1) {
                completeEntryMap[dpentryId]="N";
                srlNoforStep2TR = srlNoforStep2TR + 1;
                
                var colorFlagForRow = false;
                for(j = 0; j < dplistEntriy[i].dataFieldLabels.length; j++){
                    if(dplistEntriy[i].dataFieldLabels[j] == "Transcript" && dplistEntriy[i].dataFieldValues[j] != null){
                      colorFlagForRow = true;
                      completeEntryMap[dpentryId]="Y";
                    }  
                   
/*
                if(dplistEntriy[i].datafield1=="Transcript" && dplistEntriy[i].dataField1Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield2=="Transcript" && dplistEntriy[i].dataField2Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield3=="Transcript" && dplistEntriy[i].dataField3Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield4=="Transcript" && dplistEntriy[i].dataField4Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield5=="Transcript" && dplistEntriy[i].dataField5Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield6=="Transcript" && dplistEntriy[i].dataField6Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield7=="Transcript" && dplistEntriy[i].dataField7Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
                else if(dplistEntriy[i].datafield8=="Transcript" && dplistEntriy[i].dataField8Value != null){
                	colorFlagForRow = true;
                	completeEntryMap[dpentryId]="Y";
                }
*/
                  else 
                      setTransctiptText = false;
                }
                    
                if (colorFlagForRow) 
                    datapointTableHtml += '<tr id="datapointrow' + srlNoforStep2TR + '" style=\"background-color: darkSeaGreen;\"';
                else{
                    if (srlNoforStep2TR % 2 == 0){
                         datapointTableHtml += '<tr id="datapointrow' + srlNoforStep2TR + '" class=\"even\"';
                    }else{
                         datapointTableHtml += '<tr id="datapointrow' + srlNoforStep2TR + '" class=\"odd\"';
                    }
                }
                datapointTableHtml += '>';
                
               // datapointTableHtml += '<td onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer; text-align: center;\">'+srlNoforStep2TR+'</td>';
                datapointTableHtml += '<td onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer; text-align: center;\">'+seqNo+'</td>';
                datapointTableHtml += '<td onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer; text-align: center;\">' + page + '</td>';
                datapointTableHtml += '<td onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer; text-align: center;\">' + sectionNumber + '</td>';
                datapointTableHtml += '<td id="category" onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer;\">' + category + '</td>';
                datapointTableHtml += '<td id="subcategory" onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer;\">' + subCategory + '</td>';
                datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNoforStep2TR + ',\''+codeScale+'\');" style=\"cursor: pointer;\">' + code + '</td>';
                datapointTableHtml += '<td id="codedescription" onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer;\">' + entryData + '</td>';
                datapointTableHtml += '<td onclick="openTRPopupandPageImage(' + srlNoforStep2TR + ','+i+'); leftThumnailClickHandler(\''+pageId+'\',\''+sectionNumber+'\');" style=\"cursor: pointer;\">' + dateString + '</td>';
                datapointTableHtml += '</tr>';
            }
        }
    }
    datapointTableHtml += '</tbody></table>';
    datapointTableHtml +=   '</div></div>'; 
    $('#data_point_table').html(datapointTableHtml);
    
    // Sorting of table data for Category View  
    var sd = [[1,0], [2,0]];
    if (lastSelectedSort!=null)
        sd = lastSelectedSort;  
    switch (qsStageId) {   
        case 49:
           if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                headers: {
                    8: { sorter: false },
                    7: { sorter: false },
                    6: { sorter: false },
                    5: { sorter: false },
                    4: { sorter: false },
                    3: { sorter: false },
                    2: { sorter: false },
                    1: { sorter: false },
                    0: { sorter: false }
                 },sortList: sd ,  widgets: ['zebra'] }); 
            }else{
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                    8: { sorter: false }, 
                    7: { sorter: false },
                    6: { sorter: false },
                    5: { sorter: false },
                    4: { sorter: false },
                    3: { sorter: false },  
                    2: { sorter: false },
                    1: { sorter: false },
                    0: { sorter: false }
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
            break;    
               
        default: {
          if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                //To make column Header Unsortable
                headers: {
                  9: { sorter: false },
                  8: { sorter: false },
                  0: { sorter: false },
                  2: { sorter: 'rangeNum'}
                 },sortList: sd ,  widgets: ['zebra'] }); 
          } else {
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                  9: { sorter: false },
                  8: { sorter: false },
                  2: { sorter: 'rangeNum'},
                  0: { sorter: false }
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
           }  
    }
}

/*
Function: displayPageViewData()
Load data from DPENTRY table for showing DP List table in Page view

Page Actions:
- See dataPointListForPageView().

Called Functions:
- <millisToDateHandler(millis)>
- <buildFilterList(categories)>
*/

function displayPageViewData(filter, dplist){
	var datapointTableHtml;
	var fullDpListFlag="true";
		
    if (isDPListQuickViewOpen == true){
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = ["Sequence No","Case Page", "Section", "Category", "Subcategory", "Code","Priority","Entry", "Date"]; 
        var headId = ["dataTableSeqNo", "dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableCodeScalePriority", "dataTableEntry", "dataTableDate"];
    }else if(qsStageId == 7){
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel"></div><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = ["Sequence No", "Case Page", "Section", "Category", "Subcategory", "Code", "Entry", "Date", "","Delete","Complete"]; 
        var headId = ["dataTableSeqNo","dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableEntry", "dataTableDate", "dataTableDelete","dataTableCheckDelete","dataTableCheckComplete"];
    }else if(qsStageId == 48){
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = ["Sequence No", "Case Page", "Section", "Category", "Subcategory", "Code", "Entry", "Date", "","Delete","Complete"]; 
        var headId = ["dataTableSeqNo", "dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableEntry", "dataTableDate", "dataTableDelete","dataTableCheckDelete","dataTableCheckComplete"];
    }else{
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = ["Sequence No", "Case Page", "Section", "Category", "Subcategory", "Code", "Entry", "Date", "","Delete"]; 
        var headId = ["dataTableSeqNo","dataTablePage", "dataTableSection", "dataTableCategory", "dataTableSubcategory", "dataTableCode", "dataTableEntry", "dataTableDate", "dataTableDelete","dataTableCheckDelete"];
    }

	// Build the head for the tables... this will be used for sorting.
	for (var k in head) {
		datapointTableHtml += '<th id=' + headId[k] + '>' + head[k] + '</th>';
	}
	// Close the table head
	datapointTableHtml += '</thead><tbody>';
	var categories=[];
	
	if( step == 2 && dplistEntriy.length==0){
		document.getElementById("deletebtn").disabled=true;
		}
	var suspendNoteCounter =0;
	for (var i = 0; i < dplistEntriy.length; i++) { 
	    //flag to write  data point row 
	    var writeRowFlag=false;
		// Lets get the properties up front to make it easier to read. First we get the common values we need for all steps.
		var code = dplistEntriy[i].codeName;
		var codeDescription = dplistEntriy[i].codeDesc.replace(/'/g, "\\'");
		var category = dplistEntriy[i].category;
		var subCategory = dplistEntriy[i].subCategory;
		var dateString = dplistEntriy[i].dataDate;
		var entryData=getDataFields(dplistEntriy[i]);
		// For Step2 QA and Step 2 OP2
        var isCompleted = dplistEntriy[i].isCompleted;
        var isRejected = dplistEntriy[i].isRejected;
        var dpentryId = dplistEntriy[i].dpentryId;
        var pageId = dplistEntriy[i].pageId;
		categories[i] = dplistEntriy[i].category;
		var isCritical=dplistEntriy[i].isCritical;
		var codeScale=dplistEntriy[i].codeScale;
        
		// Convert date based on client. For toggle view scenario no need date for if date is coming null 
		if(dateString == null ){ dateString = ""; }
		else{ dateString = millisToDateHandler(dateString); }
		
		var page = dplistEntriy[i].finalpagenumber;
		if(page == null || page == undefined){ page = 0; }
		
		//var sectionNumber = dplistEntriy[i].sectionNumber;
		var sectionNumber = dplistEntriy[i].sectionRange;
		var contentid = dplistEntriy[i].spContentid;
		var suspendNote = dplistEntriy[i].suspendnote;
		var codeType = dplistEntriy[i].codeType;
		var seqNo= dplistEntriy[i].sequence;
        if (codeType == null) 
            codeType = "";

		var encodedJSONOrg = encodeURIComponent(JSON.stringify(dplistEntriy[i]));
		//var encodedJSON = encodedJSONOrg.replace("'","\\'");
		//var encodedJSON = encodedJSONOrg.replace(/'/g, "\\'");
		var encodedJSON2 = encodedJSONOrg.replace(/'/g, "\\'\\'");
		
		
		
		// Filter.
		    if (filter == null || filter=='' || filter=='assignedcategories'||filter == 'allcategories'||filter == categories[i]) {
			var srlNo_count = i+1;	//For serial Number Counter. users want the serial numbers of the dps captured to appear in the toggle view.
            if(qsStageId == 71 && !isDPListQuickViewOpen && filter == 'assignedcategories' && assignedCategoriesForParallelizedOPStage != null && assignedCategoriesForParallelizedOPStage != "All") {
                //check only for stage POP
                var assignedCategories = assignedCategoriesForParallelizedOPStage.split(",");
                for(var j = 0; j < assignedCategories.length; j++) {
                    var value = assignedCategories[j];
                    if(categories[i].toLowerCase() == value.toLowerCase().trim()) {
                        writeRowFlag = true;
                        break;
                    }
                }

            } else {
                //for all stage id
                writeRowFlag = true;
            }
            //true write the row into table
            
            if(writeRowFlag) {
                // Start a new row.
                if(i % 2 == 0) {
                    datapointTableHtml += '<tr id="datapointrow' + srlNo_count + '" class=\"even\"';
                } else {
                    datapointTableHtml += '<tr id="datapointrow' + srlNo_count + '" class=\"odd\"';
                }
                datapointTableHtml += '>';

                if(qsStageId == 48) {// For  step2 QC2
                    //for suspendNote data point
                    /* //// Not required
                    if(suspendNote != null && suspendNote != ''){
                    datapointTableHtml += '<td id="rowcount" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: yellow;\">'+srlNo_count+'</td>';
                    datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: yellow;\">' + page + '</td><td id="section" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"text-align: center; background-color: yellow;\">' + sectionNumber + '</td>';
                    datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;\">' + category + '</td>';
                    datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;\">' + subCategory + '</td>';
                    datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\''+codeScale+'\');" style=\"cursor: pointer; background-color: yellow;\">' + code + '</td>';
                    datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;\">' + entryData + '</td>';
                    datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;\">' + dateString + '</td>';
                    }*/

                    //for rejected data point
                    /*       // Not required
                    else if(is != null && isRejected == 'Y'){
                    datapointTableHtml += '<td id="rowcount" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: red;\">'+srlNo_count+'</td>';
                    datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: red;\">' + page + '</td><td id="section" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"text-align: center; background-color: red;\">' + sectionNumber + '</td>';
                    datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: red;\">' + category + '</td>';
                    datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: red;\">' + subCategory + '</td>';
                    datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\''+codeScale+'\');" style=\"cursor: pointer; background-color: red;\">' + code + '</td>';
                    datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: red;\">' + entryData + '</td>';
                    datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: red;\">' + dateString + '</td>';
                    }*/
                    // Not required

                    //for completed data point
                    if(isCompleted != null && isCompleted == 'Y') {
                        // datapointTableHtml += '<td id="rowcount" style=\"text-align: center; background-color: lightgreen;\">' + srlNo_count + '</td>';
                        datapointTableHtml += '<td id="rowcount" style=\"text-align: center; background-color: lightgreen;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                        datapointTableHtml += '<td id="page" style=\"text-align: center; background-color: lightgreen;border-bottom: 1px solid gray;\">' + page + '</td><td id="section" style=\"text-align: center; background-color: lightgreen;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td id="category" style=\"background-color: lightgreen;border-bottom: 1px solid gray;\">' + category + '</td>';
                        datapointTableHtml += '<td id="subcategory" style=\"background-color: lightgreen;border-bottom: 1px solid gray;\">' + subCategory + '</td>';
                        datapointTableHtml += '<td id="code" style=\"background-color: lightgreen;border-bottom: 1px solid gray;\">' + code + '</td>';
                        datapointTableHtml += '<td id="codedescription" style=\"background-color: lightgreen;border-bottom: 1px solid gray;\">' + entryData + '</td>';
                        datapointTableHtml += '<td  style=\"background-color: lightgreen;border-bottom: 1px solid gray;\">' + dateString + '</td>';
                    } else {
                        //datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;\">' + srlNo_count + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + page + '</td><td id="section" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;border-bottom: 1px solid gray;\">' + category + '</td>';
                        datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;border-bottom: 1px solid gray;\">' + subCategory + '</td>';
                        datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\'' + codeScale + '\');" style=\"cursor: pointer;\">' + code + '</td>';
                        datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;border-bottom: 1px solid gray;\">' + entryData + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;border-bottom: 1px solid gray;\">' + dateString + '</td>';
                    }

                } else {// For step QA Review Note
                    if(qsStageId == 50 && suspendNote != null && suspendNote != '') {
                        //datapointTableHtml += '<td id="rowcount" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: yellow;\">' + srlNo_count + '</td>';
                        datapointTableHtml += '<td id="rowcount" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: yellow;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center; background-color: yellow;border-bottom: 1px solid gray;\">' + page + '</td><td id="section" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"text-align: center; background-color: yellow;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;border-bottom: 1px solid gray;\">' + category + '</td>';
                        datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;border-bottom: 1px solid gray;\">' + subCategory + '</td>';
                        datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\'' + codeScale + '\');" style=\"cursor: pointer; background-color: yellow;border-bottom: 1px solid gray;\">' + code + '</td>';
                        datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;border-bottom: 1px solid gray;\">' + entryData + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; background-color: yellow;border-bottom: 1px solid gray;\">' + dateString + '</td>';
                    } else {// For step2 OP
                        //datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;\">' + srlNo_count + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;\">' + seqNo + '</td>';
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer; text-align: center;\">' + page + '</td><td id="section" style=\"cursor: pointer; text-align: center;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;\">' + category + '</td>';
                        datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;\">' + subCategory + '</td>';
                        if(isDPListQuickViewOpen == true && codeScale == 3)
                            datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\'' + codeScale + '\');" style=\"cursor: pointer; color:red;\">' + code + '</td>';
                        else if(isDPListQuickViewOpen == true && codeScale == 2)
                            datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\'' + codeScale + '\');" style=\"cursor: pointer;color:#AF4203;\">' + code + '</td>';
                        else
                            datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + srlNo_count + ',\'' + codeScale + '\');" style=\"cursor: pointer;\">' + code + '</td>';

                        if(isDPListQuickViewOpen == true)
                            datapointTableHtml += '<td id="CodeScalePriority" style=\"cursor: pointer;\">' + codeScale + '</td>';

                        datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;\">' + entryData + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + srlNo_count + ',' + dpentryId + ',' + pageId + ')" style=\"cursor: pointer;\">' + dateString + '</td>';

                    }
                }

                if(!isDPListQuickViewOpen) {// Neednot to Show Delete button and checboxes for DP Quick View
                    //To delete single and multiple data point in Step 2
                    datapointTableHtml += '<td style=\"\"><span onClick=\"javascript:handleThumbnailDelete(\'' + encodedJSON2 + '\',\'' + fullDpListFlag + '\');\" ><img title=\"Click to delete this entry\" style=\'margin-top:3px\' id=\"img_delete' + sectionNumber + '_' + contentid + '_' + encodedJSONOrg + '" src="images/garbage-icon.gif\" /></span></td>';
                    //Add Input type Check box to select multiple data point for delete
                    datapointTableHtml += '<td style=\"text-align: center;\"><input type=\"checkbox\" name=\"deletecheckdplist\" value=\"' + encodedJSONOrg + '\"></></td>';
                }
                if(qsStageId == 48 || qsStageId == 7) {
                    if(isCompleted != null && isCompleted == 'Y') {
                        datapointTableHtml += '<td style=\"text-align: center;\"><input type=\"checkbox\" checked=\"checked\" onClick=\"updateDPListData(\'' + dpentryId + '\',\'N\');\" name=\"completecheckdplist\" value=\"' + encodedJSONOrg + '\"></></td>';
                    } else {
                        datapointTableHtml += '<td style=\"text-align: center; \"><input type=\"checkbox\" onClick=\"updateDPListData(\'' + dpentryId + '\',\'Y\');\" name=\"completecheckdplist\" value=\"' + encodedJSONOrg + '\"></></td>';
                    }
                }

                datapointTableHtml += '</tr>';
            }

		 }
					
		}
		datapointTableHtml += '</tbody></table>';
		datapointTableHtml += 	'</div></div>'; 
		$('#data_point_table').html(datapointTableHtml);
		//Show all group categories in the Filter by group options list.
		if(!isDPListQuickViewOpen && qsStageId != 71){ 
		if ($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW ||$('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_PAGEVIEW && (qsStageId == 7 || qsStageId == 50)){ 
  		$('#iws2_dpfilter_full')[0].length = 1;
			buildFilterList(categories);
            //populate Selected Value in fiter 			
                if(filter != "") {
                    $("#iws2_dpfilter_full option").each(function() {
                        if($(this).text() == filter)
                            $(this).attr('selected', 'selected');
                    });
                }
           }
       }
       //assigned captured category when assignedcategoris variable is "All" for case 
       if(qsStageId==71 && !isDPListQuickViewOpen && (assignedCategoriesForParallelizedOPStage == "All" || assignedCategoriesForParallelizedOPStage==null)){
            buildFilterList(categories);
            //populate Selected Value in fiter          
                if(filter != "") {
                    $("#iws2_dpfilter_full option").each(function() {
                        if($(this).text() == filter)
                            $(this).attr('selected', 'selected');
                    });
                }
            }

		// Don't show the delete button on step2 QA
		if(!isDPListQuickViewOpen) {
		if (qsStageId == 7 || qsStageId == 50){
			$('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_REPORTVIEW);
			enableDisableCompleteButtonWhenCheckBoxChecked();
		}else{
			$('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_CATEGORYVIEW);
		}
	}
		
    // Sorting of table data for Category View  
    var sd = [[1,0], [2,0]];
    if (!isDPListQuickViewOpen && lastSelectedSortOnPageView!=null && lastSelectedSortOnPageView.length>0 )
        sd = lastSelectedSortOnPageView;  
    switch (qsStageId) {
        case 7:
           if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                headers: {
                	11: { sorter: false },
                	10: { sorter: false },
                    9: { sorter: false },
                    8: { sorter: false }
                 },sortList: sd ,  widgets: ['zebra'] }); 
            }else {
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                	11: { sorter: false },
                	10: { sorter: false },
                    9: { sorter: false },
                    8: { sorter: false }
                },
                widgets: ['zebra'] });          
              }
              
              
            $('#dataTable').bind("sortEnd", function(sorter) {
                lastSelectedSortOnPageView = sorter.target.config.sortList;
               /*
                $(this).find('tbody tr td:first-child').each(function(i) {
                                   $(this).html((i + 1));
                               });*/
               
            });

              
            break;
            
         case 48:
           if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                headers: {
                    11: { sorter: false },      
                    10: { sorter: false },
                    9: { sorter: false },
                    8: { sorter: false }
                 },sortList: sd ,  widgets: ['zebra'] }); 
            }else{
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                  11: { sorter: false },   
                  10: { sorter: false },
                  9: { sorter: false },
                  8: { sorter: false }
                },
                widgets: ['zebra'] });          
              }
              $('#dataTable').bind("sortEnd", function(sorter) { 
                lastSelectedSortOnPageView = sorter.target.config.sortList; 
               /*
                $(this).find('tbody tr td:first-child').each(function(i) {
                               $(this).html((i + 1));
                               });*/
               
            }); 
            break;
            
        default: {
          if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                //To make column Header Unsortable
                headers: {
                  10: { sorter: false },
                  9: { sorter: false },
                  8: { sorter: false }
                 },sortList: sd ,  widgets: ['zebra'] }); 
          } else {
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                  10: { sorter: false },
                  9: { sorter: false },
                  8: { sorter: false }
                },
                widgets: ['zebra'] });          
              }
            
                $('#dataTable').bind("sortEnd", function(sorter) {
                    lastSelectedSortOnPageView = sorter.target.config.sortList;
                   /*
                    $(this).find('tbody tr td:first-child').each(function(i) {
                                           $(this).html((i + 1));
                                       });
                   */
                   
                });

            
           }  
    }
}

/*
Function: displayCategoryViewData()
Load data from DPENTRY and MEDICALHIRARCHY table for showing DP List table in Category view

Page Actions:
- See dataPointListForPageView().

Called Functions:
- <millisToDateHandler(millis)>
- <buildFilterList(categories)>
*/

function displayCategoryViewData(filter, dplist){
    var datapointTableHtml;
    var fullDpListFlag="true";
    
    if(qsStageId == 7 || qsStageId == 50){
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel"></div><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = [ "Code", "Category", "Subcategory", "Entry","Case Page", "Section", "Date","Complete"]; 
        var headId = [ "dataTableCode", "dataTableCategory", "dataTableSubcategoryCategoryView","dataTableEntry", "dataTablePage", "dataTableSection", "dataTableDate","dataTableCheckComplete"];
    }else if(qsStageId == 48){
        datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
        var head = [ "Code",  "Category", "Subcategory", "Entry" ,"Case Page", "Section", "Date", "","Delete","Complete"]; 
        var headId = ["dataTableSr", "dataTableCode",  "dataTableCategory", "dataTableSubcategoryCategoryView","dataTableEntry", "dataTablePage", "dataTableSection", "dataTableDate", "dataTableDelete","dataTableCheckDelete","dataTableCheckComplete"];
    }else{
       datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel">* Click DELETE header to reset sort order</div><table id="dataTable"><thead style=\"cursor: pointer;\">';
       //Second Last column is Delete column with no Label shown Last column is Delete column with "Delete" Label shown
       var head = [ "Code",  "Category", "Subcategory","Case Page", "Section", "Sequence No","Date", "","Delete"]; 
       var headId = [ "dataTableCode", "dataTableCategory", "dataTableSubcategoryCategoryView","dataTablePage", "dataTableSection","dataTableSeqNo", "dataTableDate", "dataTableDelete","dataTableCheckDelete"];
    }

	// Build the head for the tables... this will be used for sorting.
	for (var k in head) {
		datapointTableHtml += '<th id=' + headId[k] + '>' + head[k] + '</th>';
	}
	// Close the table head
	datapointTableHtml += '</thead><tbody>';
	var categories=[];
	
	if( step == 2 && dplistEntriy.length==0){
		document.getElementById("deletebtn").disabled=true;
		}
	var suspendNoteCounter =0;
	var rowCount = 0;
	var colorflag = false;
	for (var i = 0; i < dplistEntriy.length; i++) { 
	    
	    var writeRowFlag=false;
		// Lets get the properties up front to make it easier to read. First we get the common values we need for all steps.
		var code = dplistEntriy[i].codeName;
		var codeDescription = dplistEntriy[i].codeDesc.replace(/'/g, "\\'");
		var category = dplistEntriy[i].category;
		var subCategory = dplistEntriy[i].subCategory;
		var dateString = dplistEntriy[i].dataDate;
		// For Step2 QA and Step 2 OP2
        var isCompleted = dplistEntriy[i].isCompleted;
        var isRejected = dplistEntriy[i].isRejected;
        var entryData = "";
        //var entryData=getDataFields(dplistEntriy[i]);
		categories[i] = dplistEntriy[i].category;

		// Convert date based on client. For toggle view scenario no need date for if date is coming null 
		if(dateString == null ){ dateString = ""; }
		else{ dateString = millisToDateHandler(dateString); }
		
		var page = dplistEntriy[i].finalpagenumber;
		if(page == null || page == undefined){ page = 0; }
		
	//var sectionNumber = dplistEntriy[i].sectionNumber;
	  var sectionNumber = dplistEntriy[i].sectionRange;
		var contentid = dplistEntriy[i].spContentid;
		var suspendNote = dplistEntriy[i].suspendnote;
		var codeType = dplistEntriy[i].codeType;
		var seqNo=dplistEntriy[i].sequence;
		var isCritical=dplistEntriy[i].isCritical;
		var codeScale=dplistEntriy[i].codeScale;
        if (codeType == null) 
            codeType = "";

		var encodedJSONOrg = encodeURIComponent(JSON.stringify(dplistEntriy[i]));
		//var encodedJSON = encodedJSONOrg.replace("'","\\'");
		//var encodedJSON = encodedJSONOrg.replace("/'/g", "\\'");
		var encodedJSON2 = encodedJSONOrg.replace(/'/g, "\\'\\'");
		
		var checkbox = '<input type=\"checkbox\" name=\"deletecheckdplist\" value=\"' + encodedJSONOrg + '\">';
		var deleteImg = '<span onClick=\"javascript:handleThumbnailDelete(\'' + encodedJSON2 + '\',\''+fullDpListFlag+'\');\" ><img title=\"Click to delete this entry\" style=\'margin-top:3px;\' id=\"img_delete' + contentid + '_' + encodedJSONOrg + '" src="images/garbage-icon.gif\" /></span>';
		var completeCheckbox;
		if (qsStageId == 7 || qsStageId == 48 || qsStageId == 50){
                if(isCompleted != null && isCompleted == 'Y'){
                    completeCheckbox = '<input type=\"checkbox\" checked=\"checked\" onClick=\"updateDPListData(\''+dplistEntriy[i].dpentryId+'\',\'N\');\" name=\"completecheckdplist\" value=\"' + encodedJSONOrg + '\">';
                }else{
                completeCheckbox = '<input type=\"checkbox\" name=\"completecheckdplist\" onClick=\"updateDPListData(\''+dplistEntriy[i].dpentryId+'\',\'Y\');\" value=\"' + encodedJSONOrg + '\">';
            }
        }

		// Filter.
		if (filter == null || filter=='' ||filter=='assignedcategories'||filter == 'allcategories'|| filter == categories[i]) {
		    
		   
            if(qsStageId == 71 && !isDPListQuickViewOpen && filter == 'assignedcategories' && assignedCategoriesForParallelizedOPStage != null && assignedCategoriesForParallelizedOPStage != "All") {
                var assignedCategories = assignedCategoriesForParallelizedOPStage.split(",");
                for(var j = 0; j < assignedCategories.length; j++) {
                    var value = assignedCategories[j];
                    if(categories[i].toLowerCase() == value.toLowerCase().trim()) {
                        writeRowFlag = true;
                        break;
                    }
                }

            } else {
                writeRowFlag = true;
            }

		    
		    if(writeRowFlag){
                if(i + 1 != dplistEntriy.length) {
                    if(dplistEntriy[i].suspendnote != null && dplistEntriy[i].suspendnote != '') {
                        seqNo = '<span style="background:yellow; width: 72px; display: inline-block;">' + seqNo + '</span>';
                        page = '<span style="background:yellow; width: 70px; display: inline-block;">' + page + '</span>';
                        sectionNumber = '<span style="background:yellow; width: 70px; display: inline-block;">' + sectionNumber + '</span>';
                    } else if(dplistEntriy[i].isCompleted != null && dplistEntriy[i].isCompleted == 'Y') {
                        seqNo = '<span style="background:green; width: 72px; display: inline-block;">' + seqNo + '</span>';
                        page = '<span style="background:green; width: 70px; display: inline-block;">' + page + '</span>';
                        sectionNumber = '<span style="background:green; width: 70px; display: inline-block;">' + sectionNumber + '</span>';
                    } else if(dplistEntriy[i].isRejected != null && dplistEntriy[i].isRejected == 'Y') {
                        seqNo = '<span style="background:red; width: 72px; display: inline-block;">' + seqNo + '</span>';
                        page = '<span style="background:red; width: 70px; display: inline-block;">' + page + '</span>';
                        sectionNumber = '<span style="background:red; width: 70px; display: inline-block;">' + sectionNumber + '</span>';
                    }

                    while(dplistEntriy[i].codeName == dplistEntriy[i + 1].codeName) {
                        //entryData = entryData + '<br/>' + getDataFields(dplistEntriy[i+1]);
                        if(dplistEntriy[i + 1].suspendnote != null && dplistEntriy[i + 1].suspendnote != '') {
                            seqNo = seqNo + '<br/><span style="background:yellow; width: 72px; display: inline-block;">' + dplistEntriy[i + 1].sequence + '</span>';
                            page = page + '<br/><span style="background:yellow; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].finalpagenumber + '</span>';
                            sectionNumber = sectionNumber + '<br/><span style="background:yellow; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].sectionRange + '</span>';
                        } else if(dplistEntriy[i + 1].isCompleted != null && dplistEntriy[i + 1].isCompleted == 'Y') {
                            seqNo = seqNo + '<br/><span style="background:green; width: 72px; display: inline-block;">' + dplistEntriy[i + 1].sequence + '</span>';
                            page = page + '<br/><span style="background:green; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].finalpagenumber + '</span>';
                            sectionNumber = sectionNumber + '<br/><span style="background:green; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].sectionRange + '</span>';
                        } else if(dplistEntriy[i + 1].isRejected != null && dplistEntriy[i + 1].isRejected == 'Y') {
                            seqNo = seqNo + '<br/><span style="background:red; width: 72px; display: inline-block;">' + dplistEntriy[i + 1].sequence + '</span>';
                            page = page + '<br/><span style="background:red; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].finalpagenumber + '</span>';
                            sectionNumber = sectionNumber + '<br/><span style="background:red; width: 70px; display: inline-block;">' + dplistEntriy[i + 1].sectionRange + '</span>';
                        } else {
                            seqNo = seqNo + '<br/>' + dplistEntriy[i + 1].sequence;
                            page = page + '<br/>' + dplistEntriy[i + 1].finalpagenumber;
                            sectionNumber = sectionNumber + '<br/>' + dplistEntriy[i + 1].sectionRange;
                        }
                        var nextDateString = dplistEntriy[i + 1].dataDate;
                        if(nextDateString == null) {
                            nextDateString = "";
                        } else {
                            nextDateString = millisToDateHandler(nextDateString);
                        }
                        dateString = dateString + '<br/>' + nextDateString;
                        var checkbox = checkbox + '<br/>' + '<input type=\"checkbox\" name=\"deletecheckdplist\" value=\"' + encodeURIComponent(JSON.stringify(dplistEntriy[i + 1])) + '\">';
                        var nextdeleteImg = '<span onClick=\"javascript:handleThumbnailDelete(\'' + encodeURIComponent(JSON.stringify(dplistEntriy[i + 1])).replace(/'/g, "\\'\\'") + '\',\'' + fullDpListFlag + '\');\" ><img title=\"Click to delete this entry\" style=\'margin-top:5px;\' id=\"img_delete' + dplistEntriy[i + 1].spContentid + '_' + encodeURIComponent(JSON.stringify(dplistEntriy[i + 1])) + '" src="images/garbage-icon.gif\" /></span>';
                        deleteImg = deleteImg + '<br/>' + nextdeleteImg;
                        if(qsStageId == 7 || qsStageId == 48 || qsStageId == 50) {
                            var nextcompleteCheckbox;
                            if(dplistEntriy[i + 1].isCompleted != null && dplistEntriy[i + 1].isCompleted == 'Y') {
                                nextcompleteCheckbox = '<input type=\"checkbox\" checked=\"checked\" onClick=\"updateDPListData(\'' + dplistEntriy[i + 1].dpentryId + '\',\'N\');\" name=\"completecheckdplist\" value=\"' + encodeURIComponent(JSON.stringify(dplistEntriy[i + 1])) + '\">';
                            } else {
                                nextcompleteCheckbox = '<input type=\"checkbox\" name=\"completecheckdplist\" onClick=\"updateDPListData(\'' + dplistEntriy[i + 1].dpentryId + '\',\'Y\');\" value=\"' + encodeURIComponent(JSON.stringify(dplistEntriy[i + 1])) + '\">';
                            }
                            completeCheckbox = completeCheckbox + '<br/>' + nextcompleteCheckbox;
                        }
                        categories[i + 1] = dplistEntriy[i + 1].category;
                        i++;
                        if(i + 1 == dplistEntriy.length) {
                            break;
                        }
                        colorflag = true;
                    }
                }
                rowCount = rowCount + 1;
                //For serial Number Counter
                if(rowCount % 2 == 0) {
                    datapointTableHtml += '<tr id="datapointrow' + rowCount + '" class=\"even\"';
                } else {
                    datapointTableHtml += '<tr id="datapointrow' + rowCount + '" class=\"odd\"';
                }
                datapointTableHtml += '>';

                //datapointTableHtml += '<td id="rowcount" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"text-align: center;\">' + rowCount + '</td>';
                datapointTableHtml += '<td id="code" onclick="openCodeDescriptionPopUp(\'' + codeType + '\',\'' + code + '\',\'' + codeDescription + '\',' + rowCount + ',\'' + codeScale + '\');" style=\"cursor: pointer; border-bottom: 1px solid gray;\">' + code + '</td>';
                //datapointTableHtml += '<td id="codedescription" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer;\">' + codeDescription + '</td>';
                datapointTableHtml += '<td id="category" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"padding-left: 5px; cursor: pointer; border-bottom: 1px solid gray;\">' + category + '</td>';
                datapointTableHtml += '<td id="subcategory" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"padding-left: 5px; cursor: pointer; border-bottom: 1px solid gray;\">' + subCategory + '</td>';
                /*IWN-87:On DP Listing views, add a wide column labeled "Entry" containing all user entered free-form data
                 * Remove Entry Column
                 */
                /* datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: left; width: 70px;\">' + entryData + '</td>';*/
                if(colorflag == false) {
                    if(suspendNote != null && suspendNote != '') {
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:yellow; border-bottom: 1px solid gray;\">' + page + '</td>';
                        datapointTableHtml += '<td id="section" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:yellow; border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:yellow; border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                    } else if(isCompleted != null && isCompleted == 'Y') {
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:green;border-bottom: 1px solid gray;\">' + page + '</td>';
                        datapointTableHtml += '<td id="section" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:green;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:green;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                    } else if(isRejected != null && isRejected == 'Y') {
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:red;border-bottom: 1px solid gray;\">' + page + '</td>';
                        datapointTableHtml += '<td id="section" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:red;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center; width: 70px; background:red;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                    } else {
                        datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + page + '</td>';
                        datapointTableHtml += '<td id="section" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                        datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                    }
                } else {
                    datapointTableHtml += '<td id="page" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + page + '</td>';
                    datapointTableHtml += '<td id="section" onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + sectionNumber + '</td>';
                    datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"cursor: pointer; text-align: center;border-bottom: 1px solid gray;\">' + seqNo + '</td>';
                }
                colorflag = false;
                //dateString ="12/12/2005";
                datapointTableHtml += '<td onclick="datapointFullDPListClickHandler(' + rowCount + ')" style=\"padding-left: 10px;border-bottom: 1px solid gray;\">' + dateString + '</td>';

                //IWN-382: 3-way split of Step-2-OP
                if(qsStageId == 6 || qsStageId == 48 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71) {
                    //To delete single and multiple data point in Step 2
                    datapointTableHtml += '<td style=\"border-bottom: 1px solid gray;\">' + deleteImg + '</td>';
                    //Add Input type Check box to select multiple data point for delete. datapointTableHtml += '<td style=\"text-align: center;\"><input type=\"checkbox\" name=\"deletecheck\" value=\"' + encodedJSONOrg + '\"></></td>';
                    datapointTableHtml += '<td style=\"text-align: center;border-bottom: 1px solid gray;\">' + checkbox + '</></td>';
                }
                if(qsStageId == 7 || qsStageId == 48 || qsStageId == 50) {
                    datapointTableHtml += '<td style=\"text-align: center;border-bottom: 1px solid gray;\">' + completeCheckbox + '</></td>';
                }
                datapointTableHtml += '</tr>';
                }

		   }
		}
		datapointTableHtml += '</tbody></table>';
		datapointTableHtml += 	'</div></div>'; 
		$('#data_point_table').html(datapointTableHtml);
		if (qsStageId == 7 || qsStageId == 50){ $('#iws2_dpfilter_full_delete_button').css("display","none"); }
		// If Filter button is not clicked then run the buildSectionFilterList function when click on DP List or Page View or Category View button
		if (dplist != "fulldplistfilter" && qsStageId != 71){
			buildFilterList(categories);
		}
		if(qsStageId==71 && (assignedCategoriesForParallelizedOPStage == "All" || assignedCategoriesForParallelizedOPStage==null))
       {
            buildFilterList(categories);
            //populate Selected Value in fiter          
                if(filter != "") {
                    $("#iws2_dpfilter_full option").each(function() {
                        if($(this).text() == filter)
                            $(this).attr('selected', 'selected');
                    });
                }
            }
		$('#data_point_table').show();
		$('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_PAGEVIEW);
		// Don't show the delete button on step2 QA
		
    // Sorting of table data for Category View  
    var sd = [[1,0], [2,0]];
    if (lastSelectedSort!=null)
        sd = lastSelectedSort;
    switch (qsStageId) {
        case 7:
            if (clientDateFormat == 'dd/mm/yyyy') {
                $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                    //To make column Header Unsortable
                   headers: {
                    8: { sorter: false },
                    7: { sorter: false },
                    6: { sorter: false },
                    5: { sorter: false },
                    4: { sorter: false },
                    3: { sorter: false }
                    
                    },sortList: sd ,  widgets: ['zebra'] }); 
            }else{
                $('#dataTable').tablesorter({ sortList: sd ,
                    headers: {
                      8: { sorter: false },
                      7: { sorter: false },
                      6: { sorter: false },
                      5: { sorter: false },
                      4: { sorter: false },
                      3: { sorter: false }
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

          
            break;
            
         case 48:
            if (clientDateFormat == 'dd/mm/yyyy') {
                $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                    //To make column Header Unsortable
                   headers: {
                    10: { sorter: false },  
                    9: { sorter: false },
                    8: { sorter: false },
                    7: { sorter: false },
                    6: { sorter: false },
                    5: { sorter: false },
                    4: { sorter: false },
                    3: { sorter: false }
                    },sortList: sd ,  widgets: ['zebra'] }); 
            }else{
                $('#dataTable').tablesorter({ sortList: sd ,
                    headers: {
                      10: { sorter: false },   
                      9: { sorter: false },
                      8: { sorter: false },
                      7: { sorter: false },
                      6: { sorter: false },
                      5: { sorter: false },
                      4: { sorter: false },
                      3: { sorter: false }
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

            
            break;
               
        default: {
        if (clientDateFormat == 'dd/mm/yyyy') {
            $('#dataTable').tablesorter({ dateFormat: 'uk' ,
                //To make column Header Unsortable
                headers: {
              9: { sorter: false },
              8: { sorter: false },
              7: { sorter: false },
              6: { sorter: false },
              5: { sorter: false },
              4: { sorter: false },
              3: { sorter: false }
             
                 },sortList: sd ,  widgets: ['zebra'] }); 
        } else {
            $('#dataTable').tablesorter({ sortList: sd ,
                headers: {
                  9: { sorter: false },
                  8: { sorter: false },
                  7: { sorter: false },
                  6: { sorter: false },
                  5: { sorter: false },
                  4: { sorter: false },
                  3: { sorter: false }
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
        }      
   }
}
/**
 *return entry data  
 * @param {Object} Object
 */

function getDataFields(Object) {
  var data = "|";
  
    for(var i = 0; i < Object.dataFieldValues.length; i++) {
        if(Object.dataFieldValues[i] != null)
            data += " " + Object.dataFieldValues[i] + " |";
    }

  /*
  if(Object.dataField1Value != null)
      data += " " + Object.dataField1Value + " |";
    if(Object.dataField2Value != null)
      data += " " + Object.dataField2Value + " |";
    if(Object.dataField3Value != null)
      data += " " + Object.dataField3Value + " |";
    if(Object.dataField4Value != null)
      data += " " + Object.dataField4Value + " |";
    if(Object.datafield5 != null) {
      if(Object.dataField5Value != null)
        data += " " + Object.dataField5Value + " |";
  
      if(Object.dataField6Value != null)
        data += " " + Object.dataField6Value + " |";
  
      if(Object.dataField7Value != null)
        data += " " + Object.dataField7Value + " |";
  
      if(Object.dataField8Value != null)
        data += " " + Object.dataField8Value + " |";
  
    }*/
  
  if(data == "" || data == "|") {
    data = "&nbsp";
  }//needed for category view
  return data;
}

/**
 * Clicking each row in the DP list will open the page image in the page view window with the section highlighted in light blue, and open a popup text box to enter the 
 * transcript (or show existing transcript for editing), with Save and Cancel buttons. Hit Enter will save the data and hit ESC will cancel the input. The "Is Handwriting" check box is to be 
 * used when the transcript on the image is actually handwriting, not printed text. Check the "Is Handwriting" box will set ISHANDWRITING='Y'. 
 * 
 * @param {Object} rowNum
 */
var trRowNumber=null;
function openTRPopupandPageImage(rowNum,i){
	trRowNumber=i;
    if ($('#data_point_transcript').css('display') == 'block'){
       $('#popup_tr_error_message').html('You must "Save" or "Cancel" this Transcription before proceeding to the next entry.');
       $('#popup_tr_error_message').css('display','block');
       return;
    }
    
    if ($('#code_desc_popup').css('display') == 'block')
    closeCodeDescriptionPopUp();
    
    $('#step2tr_save_popup').val(i);
    $('#datapointrow' + rowNum).css('background-color','#F87431');  // Highlight the active DP entry id (sienna)
    $('#step2tr_cancel_popup').val(rowNum);      // Set the row number for cancel functionality 
    // $('#data_point_transcript').offset({left:17,top:20});

    // Dispaly the data point entry form
    // window.open('step2_tr_iws2.jsp','popuppage','width=1050px,height=500px,top=0,left=0,scrollbars=yes');
    var offsetTop;
    var rowCount = $('#dataTable tr').length;
    var lastRow=rowCount-1;
    if(rowNum < lastRow)
    	offsetTop = $('#datapointrow' +(rowNum+1)).offset().top;
    else
    	offsetTop = $('#datapointrow' +(rowNum)).offset().top+ 20;
    
    var offsetLeft = ($('#datapointrow' + rowNum + ' td#codedescription').offset().left) - 200;
    // Set the location of the code description popup
    $('#data_point_transcript').offset({left: offsetLeft, top:offsetTop});
    // Dispaly the code description popup window
    $('#lblTranscription').css('display','bold');
    $('#lblTranscription').html('Transcript:');
    //IWO-27  $('#ishandwritinglabel').html(' Is Handwriting');
    $('#popup_tr_error_message').css('display','none');
    $('#data_point_transcript').css('display','block');
    getTansctiptonOnPopupWindow(i);
    $('textarea').expandingTextArea();
    $('#step2tr_transcrition').focus();
    //$('#data_point_transcript').show();
    //alert("Open Transcript Popup"); 
}
/**
 *save DataPoint transcription and ishandWriting  for entryId  
 */
function saveDataPointTranscript()
{
   var map = new Object(); 
   var dpListObject=dplistEntriy[$('#step2tr_save_popup').val()];
   var transcriptText=$('#step2tr_transcrition').val().trim();
   if (transcriptText == null || transcriptText == ""){
       $('#popup_tr_error_message').html('A Transcript value must be entered to perform a "Save".');
       $('#popup_tr_error_message').css('display','block');
       $('#step2tr_transcrition').focus();
       return;
   }
   
   var dpListObject=dplistEntriy[trRowNumber];
   
   for(j = 0; j < dpListObject.dataFieldLabels.length; j++){
     var counterId= j+1;
     if(dpListObject.dataFieldLabels[j]=="Transcript")
       map['dataField'+ counterId + 'Value'] = transcriptText;
   }  
   
/*
   if(dpListObject.datafield1=="Transcript")
	   map['dataField1Value'] = transcriptText;
   else if(dpListObject.datafield2=="Transcript")
	   map['dataField2Value'] = transcriptText;
   else if(dpListObject.datafield3=="Transcript")
	   map['dataField3Value'] = transcriptText;
   else if(dpListObject.datafield4=="Transcript")
	   map['dataField4Value'] = transcriptText;
   else if(dpListObject.datafield5=="Transcript")
	   map['dataField5Value'] = transcriptText;
   else if(dpListObject.datafield6=="Transcript")
	   map['dataField6Value'] = transcriptText;
   else if(dpListObject.datafield7=="Transcript")
	   map['dataField7Value'] = transcriptText;
   else 
	   map['dataField8Value'] = transcriptText;
*/
   
   //IWO-27 var transcriptCheckbox=$('#handwritingcheck').is(':checked');
   //IWO-27 map['isHandwriting'] = transcriptCheckbox;
   
   var entryId=dpListObject.dpentryId;
   var fieldNumber;
   if(dpListObject.datafield1=="Transcript")fieldNumber="1";
   else if(dpListObject.datafield2=="Transcript")fieldNumber="2";
   else if(dpListObject.datafield3=="Transcript")fieldNumber="3";
   else fieldNumber="4";
   
   var url="dataPoint/dataPointTranscript/"+entryId+"/"+fieldNumber;
    jQuery.ajax({  
        type: "POST",
        url: url,
        async: false,
        data : {
			'_method' : 'PUT',
			entry : map
		},
        success : function(msg) {
            completeEntryMap[entryId]="Y";
            $('#popup_tr_error_message').val("");
            $('#data_point_transcript').css('display','none');
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "saveDataPointTranscript(" + ids + ")", errorThrown);
        }
    });
    addTableDataPointsHandler(null);
}

/**
 * On popup transcription window show the value of the transcript in text box and  check the handwriting if already checked. 
 * @param {Object} dpentryRowNumber
 */

function getTansctiptonOnPopupWindow(dpentryRowNumber){

   var dpListObject=dplistEntriy[dpentryRowNumber];
   var entryId = dpListObject.dpentryId;
   
   
   for(j = 0; j < dpListObject.dataFieldLabels.length; j++){
     if(dpListObject.dataFieldLabels[j]=="Transcript")
        setTranscriptText = dpListObject.dataFieldValues[j];
     
   }
     
     
/*
   if(dpListObject.datafield1=="Transcript")
        setTranscriptText = dpListObject.dataField1Value;
   else if(dpListObject.datafield2=="Transcript")
        setTranscriptText = dpListObject.dataField2Value;
   else if(dpListObject.datafield3=="Transcript")
        setTranscriptText = dpListObject.dataField3Value;
   else if(dpListObject.datafield4=="Transcript")
       setTranscriptText = dpListObject.dataField4Value;
   else if(dpListObject.datafield5=="Transcript")
       setTranscriptText = dpListObject.dataField5Value;
   else if(dpListObject.datafield6=="Transcript")
      setTranscriptText = dpListObject.dataField6Value;
   else if(dpListObject.datafield7=="Transcript")
      setTranscriptText = dpListObject.dataField7Value;
   else 
        setTranscriptText = dpListObject.dataField8Value;*/

        
   $('#step2tr_transcrition').val(setTranscriptText);
   
   /* IWO-27 
   if (dpListObject.ishandwriting == "Y"){
       $('#handwritingcheck').attr('checked',true);
   }else{
       $('#handwritingcheck').attr('checked',false);
   }
   */
}
/**
 *Open Left thumnail when click on row in Step2TR 
 */
function leftThumnailClickHandler(pageId,section){
    if ($('#popup_tr_error_message').css('display') == 'block'){
       return;
    }
    for (i=0; i < objCase.pages.length; i++) {
        if (objCase.pages[i].id == pageId) {
            thumbnailClickHandler(pageId, i);
        }
    }
    if(leftWindowOpened == 1)
    	setTimeout('highlightGrid(\''+section+'\')', 4000);
    if(leftWindowOpened == 2)
    	highlightGrid(section);
}
 function highlightGrid(section)
 {
        //flag indicates that this is an update not a new datapoint entry.
        var flag = 3;
        var entryData = null;
        //entry is an encoded json string of type DPENTRY
        if(selectedSectionNumber == "undefined" || selectedSectionNumber == undefined) {
            leftWindow.displayDataPointEntry(section,flag,entryData);
        }
        else{
            leftWindow.displayDataPointEntry(section,flag,entryData);
            if(qsStageId != 7 && qsStageId != 50 && qsStageId != 48)
              leftWindow.handleGridRowClick(section);
       }
 }
 /**
  *Complete Step2-TR stage 
  */
 function completeStep2Tr()
{
    var completeStepTr=true;
 for (var key in completeEntryMap) {
      if(completeEntryMap[key]!="Y"){
      completeStepTr=false;
            }
        }
      if(completeStepTr)
      finishStepConfirm();//call finishStepConfirm();
      else
      alert("Some Transcript are left to fill.");
 
    
}
 /*
 Function: updateDPListData()
 This function is used for check the complete checkbox for any datapoints

 Page Actions:
 - Step 2 QA in RHS for complete the data point.

 */
 function updateDPListData(dpEntryId,isCompleted){
		var map = new Object(); 
		var view;
		if (dpEntryId != null) {
			map['dpentryid'] = dpEntryId;
			if(isCompleted == 'Y')
			map['isCompleted'] = true;
			else
			map['isCompleted'] = false;	
		}
		jQuery.ajax({  
			type: "POST",
			url: "dataPoint/dataPointEntryUpdate/" + dpEntryId,
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success : function(msg) {
				// Refresh the table.
				if($('#iws2_dpfilter_full_pageview_button').html() == "Category View"){
					view = "Page View";
				}else{
					view = "Category View";
				}
				addTableDataPointsHandler(view);
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
				displayErrorDialog(dateTime, userName, sessionId, "updateDPListData", errorThrown);
			}
		});
	}
	 
function getQCDpListCompleteStatus(){
	 var completedList = $('#iws2_dpfilter_full_complete_button').val();
   var objDpList = null;
   if (completedList != "") 
     objDpList = JSON.parse(decodeURIComponent(completedList));
   
   var completeFlag=true;
   
   if(objDpList != null && objDpList.length>0){
     for ( var i = 0; i < objDpList.length; i++) {
       var isCompleted = objDpList[i].isCompleted;
       if(isCompleted != 'Y'){
         completeFlag=false; 
         break;
       }
     }
   }
   return completeFlag;
 }
 
 
 /*
 Function: finishStep2QA()
 This function verifies for all DPEnntry point for comes under completed or rejected.
 if all DPEntrypoint completed or rejected then step complete otherwise its giving erroe message.

 Page Actions:
 - Step 2 QA in RHS for Step confirmation.

 */
 function finishStep2QA(){
	 completeFlag = getQCDpListCompleteStatus();
	 /*if(bkgList.length>0){
		 for ( var i = 0; i < bkgList.length; i++) {
			 var isCompleted = bkgList[i].isCompleted;
			 if(isCompleted != 'Y'){
				 completeFlag=false; 
				 break;
			 }
		}
	 }*/
	 
	 if (qsStageId == 7 || qsStageId == 48 || qsStageId == 50){
	 if(completeFlag)
		 finishStepConfirm();
	 else
		 alert("Some Of data points not completed or rejected");
	 }else if(qsStageId == 6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71){ //IWN-382: 3-way split of Step-2-OP
		 finishStepConfirm();
	 }
 }

