/* 
 * Javascript Object: Handling Display or Setup of Step 2 Screen 
 * @author: Debabrata Jena
 * @dated:  07/25/2012
 */

/**
 * function to clear the already loaded step-2 screen data.
 * @param rowNumber - selected Row number
 * @param grdobj - grid object
 */
var subCategoryMap = new Object();
var visible_thumbnail_images = 8;
var hierarchyPopUpWindow;
var codeToBeSearch = null;
var hirarchyPopUpView = null;
var qa1rowcounter =null;
var currentDpRowOpenId = null;
var currentDpRowSectionRange=null;
var currentDpRowPageNumber = null;
var currentDpRowPageId = null;
var currentDpRowEntryId = null;
var currentDpRowDateDate = null;
var currentDpRowLegendValue = null;
//To define variable for containing user entered updated object
var currentUpdatedObject = null;
var selectedPageSectionObj=null;
//var assignedCategoriesForParallelizedOPStage = null;
var PARALLEL_OP_STAGEID= 71;

function clearStep2Screen(rowNumber, grdobj) {
	gridselectorbegendobj = grdobj;
	//To store updated Section and page id in global variable to call many function in Object Class
    selectedPageSectionObj = new  ObjSelectedPageRow(objActivePage.id,rowNumber);
    
	if (hasPageRowChanged(rowNumber))
		setStep2Screen(IWS2SCREENS_DPENTRY);

	fillDPEntryInfo();
	showHeaderInfo();
	if (searchTerm != null && searchTerm != "")
		resetSearchCriteria(rowNumber);
	createAccordianMenu('#iws2_category_list_entries', '#collapse_all',
			'#expand_all');
	addTableSpecificDataPointsHandler(rowNumber.toString(), "dpSectionClicked");
}

/**
 * function to load DP form information for selected category/subcategory
 */

function fillDPEntryInfo() {
 //  hierarchyPopUpView = false;
	if (objActivePage != undefined) {
		selectedPageNumber = objActivePage.finalPageNumber;
		selectedSectionNumber = "__";
		if (isGridObjectBegEndValid()) {
			if (gridselectorbegendobj.isBegEndEqual()) {
				selectedSectionNumber = gridselectorbegendobj.begpos + "";
			} else
				selectedSectionNumber = gridselectorbegendobj.begpos + "-"+ gridselectorbegendobj.endpos;
		}

		$('#iws2_datapoint_page').text(selectedPageNumber);
		$('#iws2_datapoint_section').text(selectedSectionNumber);
		$('#iws2_datapoint_date').text(millisToDateHandler(objActivePage.documentDate));
	}
}

/**
 * Create and displays the categories-subcategories accordian list.
 */

function createAccordianMenu(pdiv, catdiv, subdiv,hierarchyPopUpFocudDpEntryId,hierarchyPopUpCode) {
  if (!(typeof(hierarchyPopUpWindow) == 'undefined' || hierarchyPopUpWindow.closed == true))
    hirarchyPopUpView = new ObjForHierarchyPopUp(hierarchyPopUpCode,hierarchyPopUpFocudDpEntryId);
  
	$('#medical_code_rev').html('rev ' + objCase.hierarchyrevision);
	$('#iws2_fulldp_search_status').html('');
	$('#iws2_category_search_status').html('');
	var subNewDiv = "#iws2_subc_entries";

	if (pdiv.indexOf('fulldp') >= 0) {
		subNewDiv = "#iws2_subc_entries_fulldp";
		lastSelSubcategory = null; // Show category and subcategory list
	}
	if (pdiv == "indforSectionDPSelection") {
		pdiv = '#iws2_category_list_entries';
	}
	var checkPageId = false;
	if (objActivePage != undefined)
		currentPageId = objActivePage.id;
	if (previousPageId == null) {
		checkPageId = true;
	}else if (previousPageId != currentPageId) {
		checkPageId = true;
	}
	// $('#iws2_category_list_entries').html('');
	if (lastSelSubcategory == null || checkPageId) {
		// If categories-subcategories loaded.
		if (objActivePage != undefined)
			previousPageId = objActivePage.id;
		$(pdiv).html('');
		if (objDPInfo != undefined) {
			if (displaySearchCriteria) {
				$('#iws2_category_list_entries').html('');
				dynamicAccordianMenu(searchObjDPInfo, pdiv, subNewDiv);
			} else {
				$('#iws2_category_list_entries').html('');
				dynamicAccordianMenu(objDPInfo, pdiv, subNewDiv);
			}
		}

		$('#accordion ul').hide();
		// will collapse all categories with subcategories
		$(catdiv).click(function() {
		if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
			$('#accordion ul').hide();
			for (i = 0; i < $("#accordion li div").length; i++) {
				var othersId = $("#accordion li div")[i];
				$(othersId).removeClass("minus");
			}
		})

		// will expand all categories with subcategories
		$(subdiv).click(function() {
		  if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    } 
			$('#accordion ul').show();
			for (i = 0; i < $("#accordion li div").length; i++) {
				var othersId = $("#accordion li div")[i];
				$(othersId).addClass("minus");
			}

		})

		// expand individual categories with subcategories
		$("#accordion li a").click(function() {
			if ($(this).find('div').length != 0) {
			   if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
				var selectedId = "#" + $(this).find('div')[0].id;// $(this)[0].id
				lastSelCategoryDivId = selectedId;
				var checkClass = false;
				var expandCollapse = $(this).next().is(':visible');
				if (isDPEntryRowClicked == true) {
					expandCollapse = false;
				}
				if (expandCollapse == false) {
					if (selectedId.indexOf("subcategory") == -1) {
						$('#accordion ul').slideUp(300);
						checkClass = true;
					}

					for (i = 0; i < $("#accordion li div").length; i++) {
						var othersId = $("#accordion li div")[i];
						if (othersId.className == "plus minus") {
							if (checkClass == true) {
								$(othersId).removeClass("minus");
							} else {
								$(othersId).addClass("minus");
							}

						} else {
							$(othersId).removeClass("minus");
						}
					}
					if ($(this).next()[0].innerText != "")
						$(selectedId).addClass("minus");
				}
				if (expandCollapse == true) {
					$(selectedId).removeClass("minus");
					$("#" + $(this)[0].id).trigger('focus');
				}

				$(this).next().slideToggle(300);
			}
			// focusing on first Element of subcategory
			if (expandCollapse == false)
				$('#' + $(this).next().find('a')[0].id).trigger('focus');
		});
	}
}


/**
 * getAssignedCategoriesForAccordionMenu(cat)
 * 
 * Will filter and return AssignedCategories medical hierarchy array for Accordion menu in the case of POP stage  
 */
function getAssignedCategoriesForAccordionMenu(cat){
  var assignedCategoriesPOPStageArray = null; // this stores array of the specialized assigned Categories for speicalized users to be work on in case of ParallelizedOPStage
  var assignedCategoryList = new Array(); // this stores the array/list of assigned categories medical hierachy list only for filtered accordion menu only

  if(assignedCategoriesForParallelizedOPStage != null)
     assignedCategoriesPOPStageArray = assignedCategoriesForParallelizedOPStage.split(',');

  var count = -1;
  if(assignedCategoriesPOPStageArray != null){
    // it will check from total categories
    for( k = 0; k < cat.length; k++) {
      // then will check and populate for primary assigned categories
      for( j = 0; j < assignedCategoriesPOPStageArray.length; j++) {
        if(cat[k].name == assignedCategoriesPOPStageArray[j].trim() && cat[k].level == 1) {
          count++;
          assignedCategoryList[count] = cat[k];
          break;
        }
      }
      // then will check and populate the assigend subcategories
      for(var l = 0; l < assignedCategoryList.length; l++) {
        if(cat[k].parentid == assignedCategoryList[l].id) {
          count++;
          assignedCategoryList[count] = cat[k];
          break;
        }
      }
    }
    return assignedCategoryList; 
  }
}

function dynamicAccordianMenu(cat,pdiv,subNewDiv){
	var currentLevel; //this stores the hierarchy level of the current position
	var nextNodeLevel; //this stores the hierarchy level of the upcoming node
	var parentLevelName;
	var datapointCategorytHtml = '';
	
	// if Stage = 71 and  assignedCategoriesForParallelizedOPStage contains some individual categrories
	if(PARALLEL_OP_STAGEID == qsStageId && assignedCategoriesForParallelizedOPStage != null && assignedCategoriesForParallelizedOPStage.toLowerCase() != "all")
	  cat = getAssignedCategoriesForAccordionMenu(cat); //will show assigned categories accordion menu only

	datapointCategorytHtml += '<ul id=\"accordion"\>';
	
	for (i = 0; i < cat.length; i++) {
		currentLevel = cat[i].level;
		if (i == cat.length-1 && currentLevel == 1 || i < cat.length-1 && currentLevel == 1 && cat[i+1].level == 1) {
			//this branch only has 2 levels, write level 1 as subcategory node
			datapointCategorytHtml += '<li>';
			datapointCategorytHtml += '<a id=\"anchorCategory_category_' + cat[i].id + '\" href=\"#\" onclick=\"return false;\">';
			datapointCategorytHtml += '  <div id=\"category_' + cat[i].id + '\" class=\"minus\">';
			datapointCategorytHtml += '    <a id=\"category_' + cat[i].id + '\" href=\"javascript:subCategoryClickHandler(\'' + cat[i].id + '\',\'' + cat[i].name + '\',\'' + cat[i].name + '\',\'' + subNewDiv + '\');return false;\">' + cat[i].name + '</a>';
			datapointCategorytHtml += '  </div></a>';
			datapointCategorytHtml += '<ul style=\"padding-left: 10px; display: block; \">';
			datapointCategorytHtml += '</ul>';
			datapointCategorytHtml += '</li>';
		} else if (i == cat.length-1) {
			//end of navigation tree, write leaf level and closing
			datapointCategorytHtml += '<li id=\"lisubcategory_' + cat[i].id + '\">';
			datapointCategorytHtml += '<a id=\"subcategory_' + cat[i].id + '\" href=\"javascript:subCategoryClickHandler(\'' + cat[i].id + '\',\'' + parentLevelName + '\',\'' + cat[i].name + '\',\'' + subNewDiv + '\');return false;\">' + cat[i].name + '</a>';
			datapointCategorytHtml += '</li>';
            for (k = 1; k < currentLevel; k++)
            	datapointCategorytHtml += '</ul></li>';
		} else {
			nextNodeLevel = cat[i+1].level;
			if (nextNodeLevel == currentLevel) {
				//at leaf level, more sibling coming
				datapointCategorytHtml += '<li id=\"lisubcategory_' + cat[i].id + '\">';
				datapointCategorytHtml += '<a id=\"subcategory_' + cat[i].id + '\" href=\"javascript:subCategoryClickHandler(\'' + cat[i].id + '\',\'' + parentLevelName + '\',\'' + cat[i].name + '\',\'' + subNewDiv + '\');return false;\">' + cat[i].name + '</a>';
				datapointCategorytHtml += '</li>';
			} else if (nextNodeLevel < currentLevel) {
				//last one at leaf level, write leaf level and closing
				datapointCategorytHtml += '<li id=\"lisubcategory_' + cat[i].id + '\">';
				datapointCategorytHtml += '<a id=\"subcategory_' + cat[i].id + '\" href=\"javascript:subCategoryClickHandler(\'' + cat[i].id + '\',\'' + parentLevelName + '\',\'' + cat[i].name + '\',\'' + subNewDiv + '\');return false;\">' + cat[i].name + '</a>';
				datapointCategorytHtml += '</li>';
	            for (k = 1; k <= currentLevel-nextNodeLevel; k++)
	            	datapointCategorytHtml += '</ul></li>';
			} else {
				//not at leaf level yet
				parentLevelName = cat[i].name;
				if (currentLevel == 1) {
					//write level 1 node
					var prodSpec = "";
					datapointCategorytHtml += '<li>';
					datapointCategorytHtml += '<a id=\"anchorCategory_category_' + cat[i].id + '\" href=\"#\" onclick=\"return false;\">';
					// IWN:316 - Production specification(yrs) 
					if(cat[i].spec != null && cat[i].spec.trim() != "")
					  prodSpec = ' (' + cat[i].spec + ')'; 
					datapointCategorytHtml += '  <div id=\"category_' + cat[i].id + '\" class=\"plus\">' + cat[i].name +  prodSpec ;
					datapointCategorytHtml += '  </div></a>';
					datapointCategorytHtml += '<ul style=\"padding-left: 10px; display: block; \">';
				} else {
					//write middle node
					datapointCategorytHtml += '<li id=\"lisubcategory_' + cat[i].id + '\">';
					datapointCategorytHtml += '<a id=\"anchorsubcategory_subcategory_' + cat[i].id + '\" href=\"#\" onclick=\"return false;\">';
					datapointCategorytHtml += '  <div id=\"subcategory_' + cat[i].id + '\" class=\"plus\">' + cat[i].name;
					datapointCategorytHtml += '  </div></a>';
					datapointCategorytHtml += '<ul style=\"padding-left: 10px; display: block; \">';
				}
			}
		}
	}
	//closing accordian menu list
	datapointCategorytHtml += '</ul>';
	$(pdiv).append(datapointCategorytHtml);	
	$('#anchorCategory_category_' + cat[0].id).trigger('focus');
}

function subCategoryClickHandler(subCatId, categoryName, subCategoryName, subdiv) {

	if (!(typeof(hierarchyPopUpWindow) == 'undefined' || hierarchyPopUpWindow.closed == true)){
    hirarchyPopUpView.hcySubcategoryClickHandler(subCatId , categoryName, subCategoryName, subdiv);
    return;
  }
	if (dpChangedData == true)
		alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
	else {
		if (focusedDPEntryList.length > 0) {
			focusedDPEntryList = [];
			focusedDPEntryList.length = 0;
		}
		// See if dp list row was selected
		if (!isDPFullListRowActive() || displaySearch == true) {
			// breadcrumb for selected category/subcategory
			$('#iws2_category_search_status2').css('margin-left', '10px');
			$('#iws2_category_search_status2').css('margin-top', '5px');
			if (categoryName != subCategoryName)
				$('#iws2_category_search_status2').html('<b>' + categoryName + ' - ' + subCategoryName + '</b>');
			else
				// this branch only has 2 levels
				$('#iws2_category_search_status2').html('<b>' + categoryName + '</b>');

			if (lastSelSubcategory == null)
				lastSelSubcategory = subCatId;
			if (lastSelSubcategory != subCatId) {
				$('#subcategory_' + lastSelSubcategory).css('color', 'black');
				lastSelSubcategory = subCatId;
			}
			$('#subcategory_' + subCatId).css('color', 'red');
			codeLookup(subCatId, subdiv);
			if (medicalCodes == null)
				$('#iws2_subc_entries').html("No Code Exist for this SubCategory...");
			else if (medicalCodes.length == 1)
				$('#medicalCodeRow_' + medicalCodes[0].id).trigger('focus');
			else if (medicalCodes[0].level = 1 && medicalCodes[1].level > medicalCodes[0].level)
				$('#anchorAccordionCode_' + medicalCodes[0].id).trigger('focus');
			else
				$('#medicalCodeRow_' + medicalCodes[0].id).trigger('focus');
		}
	}
}

/**
 * Go to the linked to code. These are pseudo codes who are placed in other
 * category to make life easier for the user. Related codes that are linked
 * together.
 * 
 * @param tid -
 *            target code to link to
 */
function goToLinkToId(lid)
{	
	$("#collapse_all").click();
	
  	var tmpcode  = getCodeParentPaths(lid);
  	if(tmpcode!= null)
	{
	  	cartegoryname = null;
  		for(var i = 0; i < tmpcode.length ; i++){
  	   	    if(i==0)
   	    	{
  	   	    		//Click category from navigation
  	  	   	    $("#category_"+tmpcode[i].id).click();
  	  	   	    categoryname = tmpcode[i].name;
   	    	} else if(i==1)
   	    	{
	   	    		//Click subcategory from navigation
	  	   	    subCategoryClickHandler(tmpcode[i].id,tmpcode[i].name,categoryname,'#iws2_subc_entries');
	    	} else if(i==2)
   	    	{
  	   	    		//Click main code
 	  	   	    $("#accordionCode_"+tmpcode[i].id).click();
  			} else if(i==3)
	    	{
	   	    		//Click the linked to code
  	  	   	    sendValueToDPSection('clicked', tmpcode[i].name , tmpcode[i].description , tmpcode[i].id , tmpcode[i].id , tmpcode[i].id, null,"","","");
  	  	   	    cartegoryname = null;
	    	}
  	    }	
	}

  	return false;
}

/**
 *  click on right side sub category will auto load all the codes and open the DP entries
 */

function rightSideSubCategoryNotExpandedCodesHandler(num,codetext) {
  if ( typeof(hierarchyPopUpWindow) == 'undefined'|| hierarchyPopUpWindow.closed == true){
  var openSubCategory = $("#accordionCode_" + medicalCodes[num].id).attr('class');
  if(openSubCategory == "searchTableDiv") {
    setLoadingOfDPFormOn();
    for(var j = num + 1; j < medicalCodes.length; j++) {
      if(medicalCodes.length > 2 && medicalCodes[j].level == medicalCodes[j + 1].level) {
        if(medicalCodes[j].name != codetext)
          sendValueToDPSection('notExpand', medicalCodes[j].name, medicalCodes[j].description, medicalCodes[j].id, medicalCodes[j].id, medicalCodes[j].id, "", "", "");
          
      } else {
        sendValueToDPSection('notExpand', medicalCodes[j].name, medicalCodes[j].description, medicalCodes[j].id, medicalCodes[j].id, medicalCodes[j].id, "", "", "");
        break;
      }
    }
  }
}
}
/**
 * click on the collapsed sub category will expand the node
 * @param num
 */
function rightSideSubCategoryClickHandler(num) {
   if (typeof(hierarchyPopUpWindow) == 'undefined'|| hierarchyPopUpWindow.closed == true){
	  if( dpChangedData == true)
	      return;
	  var openSubCategory = $("#accordionCode_" + medicalCodes[num].id).attr('class');
	  if(subCategoryMap['section']) {
	    subCategoryMap['section'] = false;
	  } else {
		subCategoryMap[num] = true;
	  }
	}
}

function displayThumbnails_iws2() {
	$('#global_thumbnail_wrapper_iws2').html('<div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div>');
}

function thumbnailSliderClickHandler(){
	//Hide or Show Thumbnail Slider Section
	$('#cntnr_thumbnails_slider_hide .hide_slider').click(function(){
		var selector_slider = "#thumbnail_slider_iws2 #cntnr_thumbnails";
		
		var cntnr_thumbnails_slider_hide_top = $(selector_slider + ' #cntnr_thumbnails_slider_hide .hide_slider').offset().top;
		var cntnr_thumbnails_slider_hide_left = $(selector_slider + ' #cntnr_thumbnails_slider_hide .hide_slider').offset().left;		
		var cntnr_thumbnails_height = 240;
		var cntnr_thumbnails_filter = $(selector_slider + ' #cntnr_thumbnails_filter').height();
		
		if ($(selector_slider + ' #cntnr_thumbnails_slider').is(':visible')){
				//Get current section height
			cntnr_thumbnails_height = $(selector_slider).height();
			
			$(selector_slider + ' #cntnr_thumbnails_subfilter').hide();
			$(selector_slider + ' #cntnr_thumbnails_slider').hide();	
			$(selector_slider).height(cntnr_thumbnails_filter);		
							
			//Scroll to the bottom of page
			//$('html, body').animate({scrollTop: $(document).height()},2500);			// IWN-46 - Page scrolling issue when section dp list or thumbnail strip is collapsed	
		}else{
			$(selector_slider + ' #cntnr_thumbnails_subfilter').show();
			$(selector_slider + ' #cntnr_thumbnails_slider').show();	
			$(selector_slider).height(cntnr_thumbnails_height);

			var thumnailpos = $(document).height() - cntnr_thumbnails_height;
			scrollToPageVerticalPosition(thumnailpos);			
		}
	});

	return false;
}


function datapointSubsScreenClickHandler(){
	//Hide or Show Datapoint Sub Screen Section
	$('#cntnr_datapoints_hide .hide_datapoints').click(function(){
		var cntnr_datapoints_subscreen_top = $('#cntnr_datapoints_hide .hide_datapoints').offset().top;
		var cntnr_datapoints_subscreen_left = $('#cntnr_datapoints_hide .hide_datapoints').offset().left;
		var cntnr_datapoints_subscreen_height = 250;
		var cntnr_datapoint_dpfilter = $('#cntnr_datapoint_dpfilter').height();

		if ($('#cur_sel_dp_table').is(':visible')){
				//Get current section height
			cntnr_datapoints_subscreen_height = $('#cntnr_datapoints_subscreen').height();
				//Hide datapoint area
			$('#cur_sel_dp_table').hide();
			$('#cntnr_datapoint_subdpfilter').hide();
				//Resize section
			$('#cntnr_datapoints_subscreen').height(cntnr_datapoint_dpfilter);
			
			//Scroll to the bottom of page
			//$('html, body').animate({scrollTop: $(document).height()},2500);		// IWN-46 - Page scrolling issue when section dp list or thumbnail strip is collapsed	
		}else{
			$('#cur_sel_dp_table').show();
			$('#cntnr_datapoint_subdpfilter').show();	
			$('#cntnr_datapoints_subscreen').height(cntnr_datapoints_subscreen_height);
		}
	});
	
	return false;
}

function showHeaderInfo() {
	$('#cntnr_thmbnail_header').html('');
	var clientName = objCase._client.clientname;
	var pagesTotal = objCase.pages.length;
	var caseId = objCase.id;
	var fileName = objCase.clientFileName;
	var code = objCase.codeType + ' ' +objCase.codeVersion;
	var stage = objCase.stage.name;
  var assignedUserId = null;
	var assignedUser = "";
	
	if(objCase.user != null){
		assignedUser = objCase.user.firstName + ' ' + objCase.user.lastName;
		assignedUserId = objCase.user.id;
	}
	
	var applicantName = objCase.applicantName;
	if (applicantName == null || applicantName == undefined){ applicantName = ""; }
	var currentPage = objActivePage.finalPageNumber;
	if(currentPage == null || currentPage == undefined){ currentPage = ""; }
	var startTime = objCase.stageStartTimestamp;
	// also called as ingestion dateTime //
	var caseWorkTime = objCase.receiptTimestamp;
	var clientSpec = objCase._client.productSpec;
	//get Case impaired or Standard 
  var caseImpairedOrStandard=getCaseImpariedOrStandared(caseId);
  var stageId = objCase.stage.id;
  var pagesProcessed = 0;
  var pagesUnprocessed = 0;
  //Will get all Assigned Categories for given parameters for Parallelized OP Stage(POP)
  if(qsStageId == PARALLEL_OP_STAGEID && assignedCategoriesForParallelizedOPStage == null){
      assignedCategoriesForParallelizedOPStage = getAssignedCategoriesToCollectDP(caseId, stageId);     
  }
  
	// Loop through pages and set variables.
	for (i=0; i < objCase.pages.length; i++) {
		// Check if the page is processed.  Add deleted to the processed count.
		if ((objCase.pages[i].completed == 'true' || objCase.pages[i].completed == true || objCase.pages[i].deleted == 'true' || objCase.pages[i].deleted == true) && (objCase.pages[i].suspendNote == '' || objCase.pages[i].suspendNote == null)) {
			pagesProcessed++;
		} else {
			pagesUnprocessed++;
		}
	}
	
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "showHeaderInfo()", errorThrown, false);
			}
		});
	}
	if(objCase.languageId == objCase._client.defaultLanguageId){
		clientDateFormat = objCase._client.defaultDateFormat;
		}
	 
	var clientDateIcon = "";
	// set Date Icon String based on format.
	if (clientDateFormat  == 'mm/dd/yyyy') 
	    clientDateIcon = ' <img src=\"images/US-flag.png\" height=\"20" width=\"20\"> '; 
	if (clientDateFormat  == 'dd/mm/yyyy') 
	    clientDateIcon = ' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '; 
	
	var header = '<div id=\"cntnr_thmbnail_header_section1\" style=\"float: left; width: 20%;\">Client: <u>' + clientName + '</u><br>Pages Remaining: <u>' + pagesUnprocessed + '</u><br>Stage: <u>' + stage + '</u><br>Ingestion Date: <u>' + millisToDateHandler(caseWorkTime) + '</u></div>'
					+ '<div id="cntnr_thmbnail_header_section2" style="float: left; width: 20%;">File: <u>' + fileName + '</u><br>Case ID: <u>' + caseId + '</u><br>Case Work Time: <u><span id="iws2_thumbnail_age" style="display: none;"></span></u><u><span id="iws2_thumbnail_age1"></span></u><br>1 year Date: <u>' + dateShortenByYear(caseWorkTime,1) + '</u></div>'
					+ '<div id="cntnr_thmbnail_header_section3" style="float: left; width: 20%;">Current Page: <u>' + currentPage + '</u><br><u>' + applicantName 
					+ '</u><br>Stage Work Time: <u><span id="thumbnail_stage" style="display: none;"></span></u><u><span id="thumbnail_stage1"></span></u><br>3 year Date: <u>' + dateShortenByYear(caseWorkTime,3) + '</u></div>'
					+ '<div id="cntnr_thmbnail_header_section4" style="float: left; width: 20%;">Total Pages: <u>' +pagesTotal+ '</u>';
    					if(qsStageId == PARALLEL_OP_STAGEID)
    					 header+='<br>Logged in: <u>' + authenticatedUserName;
    					else
    					 header+='<br>Assigned to: <u>' + assignedUser;
		header+= '</u><br><div id="dp_header_client_spec">Client Spec: <u><a href="#" onclick="getMainInfo();">' + clientSpec +'</a></u></div></b>5 year Date: <u>' + dateShortenByYear(caseWorkTime,5) + '</u></div>'
					+ '<div id="cntnr_thmbnail_header_section5" style="float: left; width: 20%;">Pages Completed: <u>' +pagesProcessed+ '</u><br/>'+'<br><span id="iws_case_impaired_standard" ></span>'+'<br/>Date Format: ' + clientDateIcon + ' <u>' + clientDateFormat + '</u><br></div>';
	
	
	if(qsStageId == PARALLEL_OP_STAGEID){
     header +='<br><div id=\"assignedCategories\" style="float; left;width: 100%;clear: both;">Categories to Collect DP: <u>' + assignedCategoriesForParallelizedOPStage + '</u></div>' 
  }
	//set the count up timer starting from when the case was opened for the stage
	//$('#iws2_thumbnail_age').countdown({since: new Date(startTime), compact: true, format: 'HMS', description: ''});
	
	$('#cntnr_thmbnail_header').append(header);
	$('#iws2_thumbnail_age').countdown({since: new Date(caseWorkTime), compact: true, format: 'dHM', description: ''});
	$('#thumbnail_stage').countdown({since: new Date(startTime), compact: true, format: 'dHM', description: ''});
	var newFomatForHeader;
	var newDateFormatForHeader;
	var newFormatForSatgeHeader;
	var newDateFormatForSatgeHeader;
	    newFomatForHeader = $('#iws2_thumbnail_age').text();
		newFomatForHeader = newFomatForHeader.split(":");
		newDateFormatForHeader = newFomatForHeader[0]+"h"+" "+newFomatForHeader[1]+"m";
		$('#iws2_thumbnail_age').html('');
		$('#iws2_thumbnail_age1').html(newDateFormatForHeader);
	newFormatForSatgeHeader = $('#thumbnail_stage').text();
	newFormatForSatgeHeader = newFormatForSatgeHeader.split(":");
	newDateFormatForSatgeHeader = newFormatForSatgeHeader[0]+"h"+" "+newFormatForSatgeHeader[1]+"m";
	$('#iws_case_impaired_standard').html(caseImpairedOrStandard);
	$('#iws_case_impaired_standard').css("font-weight", "bold");
    if(caseImpairedOrStandard.toLowerCase()=="impaired case")
    	$('#iws_case_impaired_standard').css("color", "red");
	$('#thumbnail_stage').html('');
	$('#thumbnail_stage1').html(newDateFormatForSatgeHeader);
}

function displayThumbnailScroller(){
	setUpThumbnailScroller();
}

function setUpThumbnailScroller(){
	showHideThumbnailSlider();

	//Add the thumbnail slider
	$(function() {	
		var thumbnail_cnt = 0;
		$(".thumbnail_image_wrapper_iws2 ul").text('');
		
		if(objCase!=null)
		{
			thumbnail_cnt = objCase.pages.length;
				//Display thumbnail images			
		    for(var j=0; j<thumbnail_cnt; j++)
		    {
		    	page = objCase.pages[j];
		    	
		    	var tstyle = getThumbnailStyle(page.id);
		    	var istyle = getImageBorderRule(page.id);		    		
		    	var gotothumbnail = "";
		    	var docnum = page.subDocumentOrder;
		    	var pagenum = page.subDocumentPageNumber;
		    	if(docnum>=9999)
		    	{
		    		docnum = '_';
		    		pagenum = '_';
		    	}		    	

				// Get the thumbnail from UCM.
				thumbnailHtml = '<div id=\'thumb' + page.id + '\' class=\"thumbnail_wrapper_iws2\">';
				if(docnum>0)
					gotothumbnail = 'onclick=\'javascript:clickThumbnailFromSliderHandler(\"' + page.id + '\",\"' + j + '\");\'';				
				thumbnailHtml += '<li style=\'' + tstyle + ' \'><img style=\'' + istyle + '\' class=\'imgnotblank\' id=\'' + page.id + '\' src=\'ucm/getFile?contentId=' + page.spContentID + '&rendition=thumbnail\' ' + gotothumbnail + '></li>'
				thumbnailHtml += 	'<div class=\'thumbnail_wrapper_iws2_info\'>Doc: ' + docnum + '&nbsp; Sub Page: ' + pagenum + '</div>';
				if(page.finalPageNumber>0)
					thumbnailHtml += 	'<div class=\'iws2_float_pagenumber\'>(' + page.finalPageNumber + ')</div>';
				thumbnailHtml += '</div>'; 
				
				$(".thumbnail_image_wrapper_iws2 ul").append(thumbnailHtml);				
		    }		
		}
	    
	    	//Add blank thumbnail images for empty images
	    if(thumbnail_cnt<visible_thumbnail_images)
	    {
		    for(var j=0; j<(visible_thumbnail_images-thumbnail_cnt); j++)
		    {
				thumbnailHtml = '<div id=\'thumb_blank' + page.id + '\' class=\"thumbnail_wrapper_iws2\">';				
				thumbnailHtml += '<li><img class=\'imgblank\' src=\'images/ThumbnailBlank.jpg\'></li>'
				thumbnailHtml += '</div>';
				
				$(".thumbnail_image_wrapper_iws2 ul").append(thumbnailHtml);				
		    }	    	
		}

	    if(activePageDomId==null)
	    	activePageDomId = 1;

	    setThumbnailStrip(activePageDomId);
	});	
}

/* Function: setThumbnailStrip(pos)
*
* Set thumbnail navigation strip
* 
* @param pos - start with thumnail position at (pos) 
*/
function setThumbnailStrip(pos){
	beg = getThumbnailStripBegPos(pos-1);
	initThumbnailStrip(beg);
}

/* Function: getThumbnailStripBegPos(pos)
*
* When going to a film strip position, provide a full display panel 
* with starting and ending thumbnails to be displayed.
* 
* @param pos - start with thumnail position at (pos) 
*/
function getThumbnailStripBegPos(pos)
{
	var pnlimgcnt = visible_thumbnail_images-1;
    var pnlcnt = Math.ceil(objCase.pages.length / pnlimgcnt);
    beg = 0;
    for(var j=0; j<=pnlcnt; j++)
	{
    	end = beg+pnlimgcnt;
    	if(pos>=beg && pos<=end)
    		break;
    	
    	beg +=(pnlimgcnt+1);   		
	}
    
    return beg;
}

/* Function: initThumbnailStrip(pos)
*
* Initialize the jCarouselLite to provide thumbnail strip
* 
* @param pos - start strip with thumbnail position at this value
*/
function initThumbnailStrip(pos)
{
    $(".main .thumbnail_image_wrapper_iws2").jCarouselLite(
    {
    	        btnNext: ".main .next",
    	        btnPrev: ".main .prev",
    	        speed: 10,
    	        circular: false,
    	        visible: visible_thumbnail_images,
    	        scroll: visible_thumbnail_images,
    	        start: pos
    });
    
    $(".thumbnail_image_wrapper_iws2 ul").css('margin-left','-8px');
    $(".thumbnail_image_wrapper_iws2 ul").css('padding-left','0px');
    $(".thumbnail_image_wrapper_iws2 ul").css('padding-top','0px');
    $(".thumbnail_image_wrapper_iws2 ul").css('margin-top','0px');
}

function getThumbnailStyle(pageId){
	// Get the page Json Id
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			pageJsonId = i;
		} 
	}
	// Retrieve the active page object.
	var page = objCase.pages[pageJsonId];

	// Check different cases ...
	var pageDate = new Date(page.documentDate)
	var dateCompare = new Date('1900/01/01 01:00:00');
	var docnum = page.subDocumentOrder;
	var pagenum = page.subDocumentPageNumber;

	var tstyle = "";
	if ( $("#" + pageId).parent().attr('class') == 'thumbnail_image_wrapper active' )
	{
		tstyle += 'border:  1px red solid;';
	}
	else if(docnum>=9999)
	{
		tstyle += 'border: 1px darkgrey solid;';
		tstyle += "disabled:disabled; background-color: darkgrey;";
	} else if (page.suspendNote != null & page.suspendNote != '') {	
		tstyle += 'border: 1px yellow solid;';
		tstyle += 'background-color: yellow; ';
	} else if (page.completed == true || page.completed == 'true') {
		tstyle += 'border: 1px green solid;';
	} else if (((page.subDocumentOrder != 9999 && page.subDocumentOrder != '9999') || page.isBadHandwriting == true || page.isBadHandwriting == 'true' || pageDate > dateCompare || page._docType.id > 0 || page.orientation != 0) && page.deleted != true && page.deleted != 'true') {
		tstyle += 'border: 1px green dashed;';
	} else {
		tstyle += 'border:  1px black solid;';
	}
	
	return tstyle;
}

function getImageBorderRule(pageId){
	// Get the page Json Id
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			pageJsonId = i;
		} 
	}
	// Retrieve the active page object.
	var page = objCase.pages[pageJsonId];
	var tstyle = "";
	var docnum = page.subDocumentOrder;
	var pagenum = page.subDocumentPageNumber;

	var tstyle = "";
	if(docnum>=9999)
	{
		tstyle += 'opacity: .75; ';
		tstyle += 'filter: alpha(opacity=75);';
	} else 	if (page.suspendNote != null & page.suspendNote != '') {	
		tstyle += 'opacity: .75; ';
		tstyle += 'filter: alpha(opacity=75);';
	} 
	tstyle += ';';
	
	return tstyle;
}

function setStep2Screen(iws2screen){
	dpChangedData = false;
	$('#sweep_r_wrapper').hide();
	$('#sweep_r_wrapper_iws2_dpentry').hide();
	$('#sweep_r_wrapper_iws2_dplist').hide();	
	$('#sweep_r_content_iws2_section').hide();
	helpTextClose();
			
	if (iws2screen==IWS2SCREENS_DPENTRY){
		$('#sweep_r_wrapper_iws2_dpentry').show();
		displayThumbnailScroller();
		if (lastSelSubcategory == null) //if a selection has been made in nav tree, stay there
			resetDpEntryScreen();
		thumbnailSectionClick =true;
	}else if (qsStageId ==7 || qsStageId == 50){
		if(iws2screen == IWS2SCREENS_FULLDPLIST_REPORTVIEW && $('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			var objstep2qa = new ObjStep2Qa(caseId);
            objstep2qa.init();
            objstep2qa.loadDpListObjects();
            displayThumbnailScroller();
            $('#iws2_dpfilter_full_pageview_button').html(IWS2SCREENS_FULLDPLIST_PAGEVIEW);
		}else{
			$('#sweep_r_wrapper_iws2_dplist').show();
			$('#data_point_table').hide();
			$('#icd10code_wrapper_dpreview_iws2').attr("display","none");
			getCaseObject();
			showDPHeaderInfo('cntnr_dplist_header');
			displayThumbnails();
			$('#data_point_qa_table').css("display","none");
			$('#data_point_table').show();
			addTableDataPointsHandler(null);
			displayThumbnailScroller();
		}
	}else if (iws2screen==IWS2SCREENS_DPFULLLIST){
		$('#sweep_r_wrapper_iws2_dplist').show();
		$('#data_point_table').hide();
		$('#icd10code_wrapper_dpreview_iws2').attr("display","none");
		showDPHeaderInfo('cntnr_dplist_header');
		$('#data_point_table').show();		
		addTableDataPointsHandler(null); 
		displayThumbnailScroller();
		thumbnailSectionClick=false;
	} else{
		$('#toggle').html('DP List');
		$('#data_point_table').hide();
		$('#sweep_r_wrapper').show();
		if(objCase !=undefined && objCase !='undefined')
		showDPHeaderInfo('cntnr_dplist_header_main');
		thumbnailSectionClick =false;
		if(qsStageId==49){
           getCaseObject();
           $('#sweep_r_wrapper').hide();
           $('#sweep_r_wrapper_iws2_dplist').show();
           $('#data_point_table').hide();
           $('#icd10code_wrapper_dpreview_iws2').attr("display","none");
           showDPHeaderInfo('cntnr_dplist_header');
           $('#data_point_table').show();      
           addTableDataPointsHandler(null);
           $('#thumbnail_slider_iws2').hide();
           }else if(qsStageId==48){
             var objstep2qa = new ObjStep2Qa(caseId);
             objstep2qa.init();
             objstep2qa.loadDpListObjects();
           }
	}
	
	$('#hiddenIwsScreen').val(iws2screen);	
}

/** By clicking on page/section label from DP form 
 * will make the thumbnail to open with selected page/section number and highlight them 
 * 
 * @param pageId
 * @param section
 */
function pageSectionClickHandler(pageId,section,flags){
	// Click the thumbnail so the objPage is available to the popup window.
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			thumbnailClickHandler(pageId, i);
		}
	}
	
	if($("#iws2_subc_input_pagesection_null").length >= 1){
	      dpformaction = "new"; 
	}else{
		dpformaction = "update"; 
	}
	
	if (leftWindow.document.readyState == 'complete') {
		//flag indicates that this is an update not a new datapoint entry.
		var flag = 3;
		var entryData = null;
		//entry is an encoded json string of type DPENTRY
		if(selectedSectionNumber == "undefined" || selectedSectionNumber==undefined) {
			leftWindow.displayDataPointEntry(section,flag,entryData);
		}
		else {
			//IWO-82:Change the Page/Section on new form after then click on another page/section link under other code, should show the error javascript message. Currently allowing me to change the Page/section
			if($("#iws2_subc_input_pagesection_null").length < 1){
				leftWindow.displayDataPointEntry(section,flag,entryData);
				if(qsStageId != 7 && qsStageId != 50)
				if(!selectedPageSectionObj.isSamePageRow(objActivePage.id,section))
					leftWindow.handleGridRowClick(section,flags);
					else 
					   $('#iws2_datapoint_section').text(section);
			}
			if($("#iws2_subc_input_pagesection_null").length >= 1 && flags==true){
				$("#iws2_subc_input_pagesection_null").focus();
				leftWindow.displayDataPointEntry(section,flag,entryData);
			}else if($("#iws2_subc_input_pagesection_null").length >= 1 && flags==false){
				alert("You must either Save or Cancel changes in the previous DataPoint or close the previous DataPointForm before proceeding further.");
				$("#iws2_subc_input_pagesection_null").focus();
				return false;
			}
		}
	}	
}


function getStep2ICD10DatfieldForDPForm(icd10obj) {
  var isTextField = null;
  var field = new Array;
  /*
  var field1 = null;
    var field2 = null;
    var field3 = null;
    var field4 = null;
    var field5 = null;
    var field6 = null;
    var field7 = null;
    var field8 = null;*/
  
  var form = "";


  for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {
    field[i] = icd10obj.dataFieldLabel[i];
    if(field[i] != null){
        var counterId = i+1;
        if(icd10obj.dataFieldLabelType[i].toLowerCase() == 'text' && icd10obj.dataFieldLabel[i] != 'Transcript') {//IWN-524 Transcript field should not show in DP entry form
          transcriptField = ': <textarea id=\"iws2_dp_cat' + counterId + '_input_' + icd10obj.dpEntryId + '\"" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"capitalizeOnBlur();\" >' + icd10obj.dataFieldValue[i] + '</textarea>&nbsp;<br/>';
          field[i] += transcriptField;
        }else if(icd10obj.dataFieldLabelType[i].toLowerCase() == 'lovs') {
            unitsTextField = "";
            if(icd10obj.dataFieldLabel[i].toLowerCase() == 'range') {
              legendField = ' <select id=\"iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
              for(var j = 0; j < icd10obj.dataFieldLovs[i].length; j++) {
                legendField += '<option value=' + icd10obj.dataFieldLovs[i][j] + '>' + icd10obj.dataFieldLovs[i][j] + '</option>';
              }
              legendField += '</select>&nbsp;';
              if(icd10obj.dataFieldValue[i] != "") {
                populatedValue = icd10obj.dataFieldValue[i].split("-");
                var index = icd10obj.dataFieldValue[i].indexOf("-");
                if(index < 0 && populatedValue.length == 1)
                  populatedValue[1] = "";
              } else {
                populatedValue = "-".split("-");
              }
              rangeField = ' <div id="iws2_range_input_op">' + field[i] + ': <input id=\"iws2_dp_range_low_input_'+ counterId +'_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_'+ counterId + '_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs[i] + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_'+ counterId + '_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_'+ counterId + '_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs[i] + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legendField + '<input id="iws2_range_unitlbl_'+ counterId + '_' + icd10obj.dpEntryId + '"  size="12" readonly="readonly" />&nbsp</div>';
              field[i] = rangeField;
            }else {
                //IWN-527: Range drop down box is showing up twice on DP entry form
               if(icd10obj.dataFieldLabel[i].toLowerCase() == 'units') {
                     legendField = ': <select id=\"iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeUnitLblDisplay(\'iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', \'' + counterId + '\'  ,false);\"> <option value = \"\">  </option>';
                     unitsTextField = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units' + counterId + '_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , \'' + counterId + '\' );\"  value=\"' + icd10obj.dataFieldValue[i] + '\" size="12">' + ' </div>';
                } else if(icd10obj.dataFieldLabel[i].toLowerCase() == 'status') {
                     legendField = ': <select id=\"iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeStatusDisplay(\'iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , false);\"> <option value = \"\">  </option>';
                } else
                     legendField = ': <select id=\"iws2_dp_legend' + counterId + 'Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> <option value = \"\">  </option>';

                for(var j = 0; j < icd10obj.dataFieldLovs[i].length; j++) {
                     legendField += '<option value=' + icd10obj.dataFieldLovs[i][j] + '>' + icd10obj.dataFieldLovs[i][j] + '</option>';
                  }
                    legendField += unitsTextField;
                    field[i] += legendField;
                    field[i] += '</select>&nbsp;';
                    
                     if(counterId % 2 == 0)
                       field[i] += '<br/>';
                }

           
          
        } else if(icd10obj.dataFieldLabelType[i].toLowerCase() == 'combo'){
            legendField = ' <select id=\"iws2_dp_legend'+ counterId + 'Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
             for(var j = 0; j < icd10obj.dataFieldLovs[i].length; j++) {
              legendField += '<option value=' + icd10obj.dataFieldLovs[i][j] + '>' + icd10obj.dataFieldLovs[i][j] + '</option>';
            }
            legendField += '</select>&nbsp;';
            combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">' + field[i] + ':</label><span>'+legendField+'</span></div>';
            field[i] = combodiv;
        }else if(icd10obj.dataFieldLabelType[i].toLowerCase() == 'date'){
          var dateField=':<input id="iws2_dp_datepicker_'+ counterId +'_'+icd10obj.dpEntryId  +'_'+ icd10obj.selvalue.replace(/\./g,'-') + '\" type="text" value="' +  icd10obj.dataFieldValue[i] +  '" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"dateValueChangedHandler(\''+icd10obj.dpEntryId + '\');\" onKeyDown="return dateContainsNumbers(event);" onChange = \" dateValueChangedHandler(\''+icd10obj.dpEntryId + '\') \" size="10"/>&nbsp;';
              dateField+='<span id=\"eraserDPDate_'+ counterId + '_' + icd10obj.dpEntryId  + '\" onClick=\"eraseDataPointDate(\'iws2_dp_datepicker_'+ counterId +'_'+icd10obj.dpEntryId  +'_'+ icd10obj.selvalue.replace(/\./g,'-')+ '\'); dateValueChangedHandler(\''+icd10obj.dpEntryId+'\');\"><img id=\"eraserDPDateImg\" title="Erases the DP date" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>';
            field[i] +=dateField;
        }else { // if number
            if(icd10obj.dataFieldLabel[i].toLowerCase() != 'transcript')
            field[i] += ': <input id=\"iws2_dp_cat' + counterId + '_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" size="8"  value=\"' + icd10obj.dataFieldValue[i] + '\">&nbsp;';
           if(counterId % 2 == 0)
               field[i] += '<br/>';
        }       

    /*if any transcript/isText datafield exists means either field1/field2 are transcript or legend vice versa
   first legend to be added
   then isText checkbox to be added
   then transcript to be added
   */
      if(i == 1){
        if(isTextField != null) {
          extraSpace = '  <div id="iws2_subc_ctnr_input_blank_op" class="icd10codetablecell">&nbsp;</div>';
          if(icd10obj.dataFieldLabel[1].toLowerCase() != 'transcript') {
            form += field[1];
            form += isTextField;
            form += field[2];
          } else {
            form += field[2];
            form += isTextField;
            form += field[1];
          }
        } else {// add the others field if transcript field dont exist
          if(field[1] != null && icd10obj.dataFieldLabel[i].toLowerCase() != 'transcript')//IWN-524 Transcript field should not show in DP entry form
            form += field[1];
          if(field[2] != null && icd10obj.dataFieldLabel[2].toLowerCase() != 'transcript')// IWO-27 - check since field2 may contain the value 'Transcript'
            form += field[2];
        }  
      } else { 
       if(field[i]!=null && icd10obj.dataFieldLabel[i].toLowerCase() != 'transcript')//IWN-524 Transcript field should not show in DP entry form
       form += field[i];
      } 
        
    
    
    


  //DATAFIELD-1 ------------------------------------------------------------------------------------//
  /*
  if(icd10obj.dataFieldLabel1 != null) {
      field1 = icd10obj.dataFieldLabel1;
  
      if(icd10obj.dataFieldLabel1Type.toLowerCase() == 'text') {
        transcript1Field = ': <textarea id=\"iws2_dp_cat1_input_' + icd10obj.dpEntryId + '\"" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" disabled="disabled" onChange=\"capitalizeOnBlur();\" >' + icd10obj.dataField1Value + '</textarea>&nbsp;<br/>';
        field1 += transcript1Field;
      } else if(icd10obj.dataFieldLabel1Type.toLowerCase() == 'lovs') {
        unitsTextField1 = "";
        if(icd10obj.dataFieldLabel1.toLowerCase() == 'range') {
          legend1Field = ' <select id=\"iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs1.length; i++) {
            legend1Field += '<option value=' + icd10obj.dataFieldLovs1[i] + '>' + icd10obj.dataFieldLovs1[i] + '</option>';
          }
          legend1Field += '</select>&nbsp;';
          if(icd10obj.dataField1Value != "") {
            populatedValue = icd10obj.dataField1Value.split("-");
            var index = icd10obj.dataField1Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField1 = ' <div id="iws2_range_input_op">' + field1 + ': <input id=\"iws2_dp_range_low_input_1_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_1_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs1 + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_1_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_1_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs1 + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend1Field + '<input id="iws2_range_unitlbl_1_' + icd10obj.dpEntryId + '"  size="12" readonly="readonly" />&nbsp</div>';
          field1 = rangeField1;
        } else {
          if(icd10obj.dataFieldLabel1.toLowerCase() == 'units') {
            legend1Field = ': <select id=\"iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeUnitLblDisplay(\'iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', 1,false);\"> <option value = \"\">  </option>';
            unitsTextField1 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units1_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 1);\"  value=\"' + icd10obj.dataField1Value + '\" size="12">' + ' </div>';
          } else
            legend1Field = ': <select id=\"iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs1.length; i++) {
            legend1Field += '<option value=' + icd10obj.dataFieldLovs1[i] + '>' + icd10obj.dataFieldLovs1[i] + '</option>';
          }
  
          legend1Field += unitsTextField1;
          field1 += legend1Field;
          field1 += '</select>&nbsp;';
        }
      }else if(icd10obj.dataFieldLabel1Type.toLowerCase() == 'combo'){
          legend1Field = ' <select id=\"iws1_dp_legend1Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs1.length; i++) {
            legend1Field += '<option value=' + icd10obj.dataFieldLovs1[i] + '>' + icd10obj.dataFieldLovs1[i] + '</option>';
          }
          legend1Field += '</select>&nbsp;';
          combodiv='<div id="iws1_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field1+':</label><span>'+legend1Field+'</span></div>';
          field1 = combodiv;
      } 
      else
        field1 += ': <input id=\"iws2_dp_cat1_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" size="8"  value=\"' + icd10obj.dataField1Value + '\">&nbsp;';
  
      //IWO-31: Legend drop down field should be on its own line
      if(icd10obj.dataFieldLabel1 == 'Legend')
        field1 += '<br/>';
  
    }
  
    //DATAFIELD-2 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel2 != null) {
      field2 = icd10obj.dataFieldLabel2;
  
      if(icd10obj.dataFieldLabel2Type.toLowerCase() == 'text' && icd10obj.dataFieldLabel2 != 'Transcript') {//IWO-27 Don't show Transcription in Step2-OP
        transcript2Field = ': <textarea id=\"iws2_dp_cat2_input_' + icd10obj.dpEntryId + '\"" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" disabled="disabled"  onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField2Value + '</textarea>&nbsp;<br/>';
        field2 += transcript2Field;
      } else if(icd10obj.dataFieldLabel2Type.toLowerCase() == 'lovs') {
        unitsTextField2 = "";
        if(icd10obj.dataFieldLabel2.toLowerCase() == 'range') {
          legend2Field = '<select id=\"iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\');onclickRangeValue(\'iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs2.length; i++) {
            legend2Field += '<option value=' + icd10obj.dataFieldLovs2[i] + '>' + icd10obj.dataFieldLovs2[i] + '</option>';
          }
          legend2Field += '</select>&nbsp;';
          if(icd10obj.dataField2Value != "") {
            populatedValue = icd10obj.dataField2Value.split("-");
            var index = icd10obj.dataField2Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField2 = ' <div id="iws2_range_input_op">' + field2 + ': <input id=\"iws2_dp_range_low_input_2_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_2_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs2 + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_2_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_2_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs2 + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend2Field + '<input id="iws2_range_unitlbl_2_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp</div>';
          field2 = rangeField2;
        } else {
          if(icd10obj.dataFieldLabel2.toLowerCase() == 'units') {
            legend2Field = ': <select id=\"iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler( \'' + icd10obj.dpEntryId + '\');  onChangeUnitLblDisplay(\'iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 2,false);\"> <option value = \"\">  </option>';
            unitsTextField2 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units2_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 2);\"  value=\"' + icd10obj.dataField2Value + '\" size="12">' + ' </div>';
          } else
            legend2Field = ': <select id=\"iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler( \'' + icd10obj.dpEntryId + '\')\"> <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs2.length; i++) {
            legend2Field += '<option value=' + icd10obj.dataFieldLovs2[i] + '>' + icd10obj.dataFieldLovs2[i] + '</option>';
          }
  
          legend2Field += unitsTextField2;
          field2 += legend2Field;
          field2 += '</select>&nbsp;<br/>';
        }
      }else if(icd10obj.dataFieldLabel2Type.toLowerCase() == 'combo'){
          legend2Field = ' <select id=\"iws2_dp_legend2Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs2.length; i++) {
            legend2Field += '<option value=' + icd10obj.dataFieldLovs2[i] + '>' + icd10obj.dataFieldLovs2[i] + '</option>';
          }
          legend2Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field2+':</label><span>'+legend2Field+'</span></div>';
          field2 = combodiv;
      }
       else if(icd10obj.dataFieldLabel2 != 'Transcript') {//IWO-27 - dont show Transcription
        field2 += ': <input id=\"iws2_dp_cat2_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\"  class="iws2_dp_cat_input" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" size="5"  value=\"' + icd10obj.dataField2Value + '\">&nbsp;<br/>';
      }
  
    }
  
    /*if any transcript/isText datafield exists means either field1/field2 are transcript or legend vice versa
     first legend to be added
     then isText checkbox to be added
     then transcript to be added
     */
   /* 
    if(isTextField != null) {
      extraSpace = '  <div id="iws2_subc_ctnr_input_blank_op" class="icd10codetablecell">&nbsp;</div>';
      if(icd10obj.dataFieldLabel1.toLowerCase() != 'transcript') {
        form += field1;
        form += isTextField;
        form += field2;
      } else {
        form += field2;
        form += isTextField;
        form += field1;
      }
    } else {// add the others field if transcript field dont exist
      if(field1 != null)
        form += field1;
      if(field2 != null && icd10obj.dataFieldLabel2.toLowerCase() != 'transcript')// IWO-27 - check since field2 may contain the value 'Transcript'
        form += field2;
    }
  
    //DATAFIELD-3 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel3 != null) {
      field3 = icd10obj.dataFieldLabel3;
  
      if(icd10obj.dataFieldLabel3Type.toLowerCase() == 'text') {
        transcript3Field = ': <textarea id=\"iws2_dp_cat3_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" disabled="disabled"  onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField3Value + '</textarea>&nbsp;<br/>';
        field3 += transcript3Field;
      } else if(icd10obj.dataFieldLabel3Type.toLowerCase() == 'lovs') {
        unitsTextField3 = "";
        if(icd10obj.dataFieldLabel3.toLowerCase() == 'range') {
          legend3Field = ' <select id=\"iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs3.length; i++) {
            legend3Field += '<option value=' + icd10obj.dataFieldLovs3[i] + '>' + icd10obj.dataFieldLovs3[i] + '</option>';
          }
          legend3Field += '</select>&nbsp;';
          if(icd10obj.dataField3Value != "") {
            populatedValue = icd10obj.dataField3Value.split("-");
            var index = icd10obj.dataField3Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField3 = ' <div id="iws2_range_input_op">' + field3 + ': <input id=\"iws2_dp_range_low_input_3_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_3_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs3 + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_3_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_3_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs3 + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend3Field + '<input id="iws2_range_unitlbl_3_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp</div>';
          field3 = rangeField3;
        } else {
          if(icd10obj.dataFieldLabel3.toLowerCase() == 'units') {
            legend3Field = ': <select id=\"iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\');  onChangeUnitLblDisplay(\'iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 3,false);\"> <option value = \"\">  </option>';
            unitsTextField3 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units3_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 3);\"  value=\"' + icd10obj.dataField3Value + '\" size="12">' + ' </div>';
          } else
            legend3Field = ': <select id=\"iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs3.length; i++) {
            legend3Field += '<option value=' + icd10obj.dataFieldLovs3[i] + '>' + icd10obj.dataFieldLovs3[i] + '</option>';
          }
          legend3Field += unitsTextField3;
          field3 += legend3Field;
          field3 += '</select>&nbsp;';
        }
      }else if(icd10obj.dataFieldLabel3Type.toLowerCase() == 'combo'){
          legend3Field = ' <select id=\"iws2_dp_legend3Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs3.length; i++) {
            legend3Field += '<option value=' + icd10obj.dataFieldLovs3[i] + '>' + icd10obj.dataFieldLovs3[i] + '</option>';
          }
          legend3Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field3+':</label><span>'+legend3Field+'</span></div>';
          field3 = combodiv;
      } 
      else
        field3 += ': <input id=\"iws2_dp_cat3_input_' + icd10obj.dpEntryId + '\"" size="5" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  value=\"' + icd10obj.dataField3Value + '\">&nbsp;';
  
      form += field3;
    }
  
    //DATAFIELD-4 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel4 != null) {
      field4 = icd10obj.dataFieldLabel4;
  
      if(icd10obj.dataFieldLabel4Type.toLowerCase() == 'text') {
        transcript4Field = ': <textarea id=\"iws2_dp_cat4_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" disabled="disabled"  onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField4Value + '</textarea>&nbsp;<br/>';
        field4 += transcript4Field;
      } else if(icd10obj.dataFieldLabel4Type.toLowerCase() == 'lovs') {
        unitsTextField4 = "";
        if(icd10obj.dataFieldLabel4.toLowerCase() == 'range') {
          legend4Field = ' <select id=\"iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\');\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs4.length; i++) {
            legend4Field += '<option value=' + icd10obj.dataFieldLovs4[i] + '>' + icd10obj.dataFieldLovs4[i] + '</option>';
          }
          legend4Field += '</select>&nbsp;';
          if(icd10obj.dataField4Value != "") {
            populatedValue = icd10obj.dataField4Value.split("-");
            var index = icd10obj.dataField4Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField4 = ' <div id="iws2_range_input_op">' + field4 + ': <input id=\"iws2_dp_range_low_input_4_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_4_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs4 + '\');\" value=\"' + populatedValue[0] + '\"  size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_4_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_4_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs4 + '\');\" value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend4Field + '<input id="iws2_range_unitlbl_4_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp</div>';
          field4 = rangeField4;
        } else {
          if(icd10obj.dataFieldLabel4.toLowerCase() == 'units') {
            legend4Field = ': <select id=\"iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\');  onChangeUnitLblDisplay(\'iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', 4,false);\" > <option value = \"\">  </option>';
            unitsTextField4 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units4_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 4);\"  value=\"' + icd10obj.dataField4Value + '\" size="12">' + ' </div>';
          } else
            legend4Field = ': <select id=\"iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" > <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs4.length; i++) {
            legend4Field += '<option value=' + icd10obj.dataFieldLovs4[i] + '>' + icd10obj.dataFieldLovs4[i] + '</option>';
          }
          legend4Field += unitsTextField4;
          field4 += legend4Field;
          field4 += '</select>&nbsp;<br/>';
        }
      }else if(icd10obj.dataFieldLabel4Type.toLowerCase() == 'combo'){
          legend4Field = ' <select id=\"iws2_dp_legend4Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs4.length; i++) {
            legend4Field += '<option value=' + icd10obj.dataFieldLovs4[i] + '>' + icd10obj.dataFieldLovs4[i] + '</option>';
          }
          legend4Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field4+':</label><span>'+legend4Field+'</span></div>';
          field4 = combodiv;
      }
       else
        field4 += ': <input id=\"iws2_dp_cat4_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  size="8"  value=\"' + icd10obj.dataField4Value + '\">&nbsp;<br/>';
  
      form += field4;
    }
  
    //DATAFIELD-5 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel5 != null) {
      field5 = icd10obj.dataFieldLabel5;
  
      if(icd10obj.dataFieldLabel5Type.toLowerCase() == 'text') {
        transcript5Field = ': <textarea id=\"iws2_dp_cat5_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField5Value + '</textarea>&nbsp;<br/>';
        field5 += transcript5Field;
      } else if(icd10obj.dataFieldLabel5Type.toLowerCase() == 'lovs') {
        unitsTextField5 = "";
        if(icd10obj.dataFieldLabel5.toLowerCase() == 'range') {
          legend5Field = '<select id=\"iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs5.length; i++) {
            legend5Field += '<option value=' + icd10obj.dataFieldLovs5[i] + '>' + icd10obj.dataFieldLovs5[i] + '</option>';
          }
          legend5Field += '</select>&nbsp;';
          if(icd10obj.dataField5Value != "") {
            populatedValue = icd10obj.dataField5Value.split("-");
            var index = icd10obj.dataField5Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField5 = ' <div id="iws2_range_input_op">' + field5 + ': <input id=\"iws2_dp_range_low_input_5_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_5_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs5 + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_5_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_5_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs4 + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend5Field + '<input id="iws2_range_unitlbl_5_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" /></div>';
          field5 = rangeField5;
        } else {
          if(icd10obj.dataFieldLabel5.toLowerCase() == 'units') {
            legend5Field = ': <select id=\"iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeUnitLblDisplay(\'iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', 5,false);\" > <option value = \"\">  </option>';
            unitsTextField5 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units5_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 5);\"  value=\"' + icd10obj.dataField5Value + '\" size="12">' + ' </div>';
          } else
            legend5Field = ': <select id=\"iws2_dp_legend5Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" > <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs5.length; i++) {
            legend5Field += '<option value=' + icd10obj.dataFieldLovs5[i] + '>' + icd10obj.dataFieldLovs5[i] + '</option>';
          }
  
          legend5Field += unitsTextField5;
          field5 += legend5Field;
          field5 += '</select>&nbsp;';
        }
      }else if(icd10obj.dataFieldLabel5Type.toLowerCase() == 'combo'){
          legend5Field = ' <select id=\"iws2_dp_legend5Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs5.length; i++) {
            legend5Field += '<option value=' + icd10obj.dataFieldLovs5[i] + '>' + icd10obj.dataFieldLovs5[i] + '</option>';
          }
          legend5Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field5+':</label><span>'+legend5Field+'</span></div>';
          field5 = combodiv;
      }  
      else
        field5 += ': <input id=\"iws2_dp_cat5_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  size="5"  value=\"' + icd10obj.dataField5Value + '\">&nbsp;';
  
      form += field5;
    }
  
    //DATAFIELD-6 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel6 != null) {
      field6 = icd10obj.dataFieldLabel6;
  
      if(icd10obj.dataFieldLabel6Type.toLowerCase() == 'text') {
        transcript6Field = ': <textarea id=\"iws2_dp_cat6_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField6Value + '</textarea>&nbsp;<br/>';
        field6 += transcript6Field;
      } else if(icd10obj.dataFieldLabel6Type.toLowerCase() == 'lovs') {
        unitsTextField6 = "";
        if(icd10obj.dataFieldLabel6.toLowerCase() == 'range') {
          legend6Field = '<select id=\"iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs6.length; i++) {
            legend6Field += '<option value=' + icd10obj.dataFieldLovs6[i] + '>' + icd10obj.dataFieldLovs6[i] + '</option>';
          }
          legend6Field += '</select>&nbsp;';
          if(icd10obj.dataField6Value != "") {
            populatedValue = icd10obj.dataField6Value.split("-");
            var index = icd10obj.dataField6Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField6 = '<div id="iws2_range_input_op">' + field6 + ': <input id=\"iws2_dp_range_low_input_6_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_6_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs6 + '\');\" value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_6_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_6_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs6 + '\');\"  value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend6Field + '<input id="iws2_range_unitlbl_6_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp</div>';
          field6 = rangeField6;
        } else {
          if(icd10obj.dataFieldLabel6.toLowerCase() == 'units') {
            legend6Field = ': <select id=\"iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeUnitLblDisplay(\'iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', 6,false);\" > <option value = \"\">  </option>';
            unitsTextField6 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units6_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 6);\"  value=\"' + icd10obj.dataField6Value + '\" size="12">' + ' </div>';
          } else
            legend6Field = ': <select id=\"iws2_dp_legend6Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" > <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs6.length; i++) {
            legend6Field += '<option value=' + icd10obj.dataFieldLovs6[i] + '>' + icd10obj.dataFieldLovs6[i] + '</option>';
          }
          field6 += legend6Field;
          field6 += '</select>&nbsp;<br/>';
        }
      }else if(icd10obj.dataFieldLabel6Type.toLowerCase() == 'combo'){
          legend6Field = ' <select id=\"iws2_dp_legend6Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs6.length; i++) {
            legend6Field += '<option value=' + icd10obj.dataFieldLovs6[i] + '>' + icd10obj.dataFieldLovs6[i] + '</option>';
          }
          legend6Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field6+':</label><span>'+legend6Field+'</span></div>';
          field6 = combodiv;
      } 
      else
        field6 += ': <input id=\"iws2_dp_cat6_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  size="8"  value=\"' + icd10obj.dataField6Value + '\">&nbsp;<br/>';
  
      form += field6;
    }
  
    //DATAFIELD-7 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel7 != null) {
      field7 = icd10obj.dataFieldLabel7;
      if(icd10obj.dataFieldLabel7Type.toLowerCase() == 'text') {
        transcript7Field = ': <textarea id=\"iws2_dp_cat7_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField7Value + '</textarea>&nbsp;<br/>';
        field7 += transcript7Field;
      } else if(icd10obj.dataFieldLabel7Type.toLowerCase() == 'lovs') {
        unitsTextField7 = "";
        if(icd10obj.dataFieldLabel7.toLowerCase() == 'range') {
          legend7Field = ' <select id=\"iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs7.length; i++) {
            legend7Field += '<option value=' + icd10obj.dataFieldLovs7[i] + '>' + icd10obj.dataFieldLovs7[i] + '</option>';
          }
          legend7Field += '</select>&nbsp;';
          if(icd10obj.dataField7Value != "") {
            populatedValue = icd10obj.dataField7Value.split("-");
            var index = icd10obj.dataField7Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField7 = ' <div id="iws2_range_input_op">' + field7 + ': <input id=\"iws2_dp_range_low_input_7_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_7_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs7 + '\');\"  value=\"' + populatedValue[0] + '\" size="5">&nbsp;--' + '<input id=\"iws2_dp_range_high_input_7_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_7_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs7 + '\');\"   value=\"' + populatedValue[1] + '\" size="5">&nbsp; ' + legend7Field + '<input id="iws2_range_unitlbl_7_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp'; +'</div>';
          field7 = rangeField7;
        } else {
          if(icd10obj.dataFieldLabel7.toLowerCase() == 'units') {
            legend7Field = ': <select id=\"iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onChangeUnitLblDisplay(\'iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\', 7,false);\" > <option value = \"\">  </option>';
            unitsTextField7 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units7_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 7);\"  value=\"' + icd10obj.dataField7Value + '\" size="12">' + ' </div>';
          } else
            legend7Field = ': <select id=\"iws2_dp_legend7Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" > <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs7.length; i++) {
            legend7Field += '<option value=' + icd10obj.dataFieldLovs7[i] + '>' + icd10obj.dataFieldLovs7[i] + '</option>';
          }
          legend7Field += unitsTextField7;
          field7 += legend7Field;
          field7 += '</select>&nbsp;';
        }
      }else if(icd10obj.dataFieldLabel7Type.toLowerCase() == 'combo'){
          legend7Field = ' <select id=\"iws2_dp_legend7Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\">';
           for(var i = 0; i < icd10obj.dataFieldLovs7.length; i++) {
            legend7Field += '<option value=' + icd10obj.dataFieldLovs7[i] + '>' + icd10obj.dataFieldLovs7[i] + '</option>';
          }
          legend7Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field7+':</label><span>'+legend7Field+'</span></div>';
          field7 = combodiv;
      }  
      else
        field7 += ': <input id=\"iws2_dp_cat7_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" class="iws2_dp_cat_input" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  size="8"  value=\"' + icd10obj.dataField7Value + '\">&nbsp;';
  
      form += field7;
    }
  
    //DATAFIELD-8 ------------------------------------------------------------------------------------//
    if(icd10obj.dataFieldLabel8 != null) {
      field8 = icd10obj.dataFieldLabel8;
      if(icd10obj.dataFieldLabel8Type.toLowerCase() == 'text') {
        transcript8Field = ': <textarea id=\"iws2_dp_cat8_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"capitalizeOnBlur();\">' + icd10obj.dataField8Value + '</textarea>&nbsp;<br/>';
        field8 += transcript8Field;
      } else if(icd10obj.dataFieldLabel8Type.toLowerCase() == 'lovs') {
        unitsTextField8 = "";
        if(icd10obj.dataFieldLabel8.toLowerCase() == 'range') {
          legend8Field = ' <select id=\"iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\'); onclickRangeValue(\'iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\');\"> <option value = \"\">  </option>';
          for(var i = 0; i < icd10obj.dataFieldLovs8.length; i++) {
            legend8Field += '<option value=' + icd10obj.dataFieldLovs8[i] + '>' + icd10obj.dataFieldLovs8[i] + '</option>';
          }
          legend8Field += '</select>&nbsp;';
          if(icd10obj.dataField8Value != "") {
            populatedValue = icd10obj.dataField8Value.split("-");
            var index = icd10obj.dataField8Value.indexOf("-");
            if(index < 0 && populatedValue.length == 1)
              populatedValue[1] = "";
          } else {
            populatedValue = "-".split("-");
          }
          rangeField8 = '<div id="iws2_range_low_input_op">' + field8 + ': <input id=\"iws2_dp_range_low_input_8_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoPopulateLovs(\'iws2_dp_range_low_input_8_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs8 + '\');\"  value=\"' + populatedValue[0] + '\" size="5"/>&nbsp;--' + '<input id=\"iws2_dp_range_high_input_8_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"autoPopulateLovs(\'iws2_dp_range_high_input_8_' + icd10obj.dpEntryId + '\',\'' + icd10obj.dataFieldLovs4 + '\');\"   value=\"' + populatedValue[1] + '\" size="5">&nbsp;' + legend8Field + '<input id="iws2_range_unitlbl_8_' + icd10obj.dpEntryId + '"  size="10" readonly="readonly" />&nbsp'; +'</div>';
          field8 = rangeField8;
        } else {
          if(icd10obj.dataFieldLabel8.toLowerCase() == 'units') {
            legend8Field = ': <select id=\"iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\');  onChangeUnitLblDisplay(\'iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 8,false);\" > <option value = \"\">  </option>';
            unitsTextField8 = ' <div id="iws2_Units_textInput_op">' + ':' + ' <input id=\"iws2_dp_Units8_text_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress=\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  onChange=\"autoSelectUnitsLovs(\'iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\',\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , 8);\"  value=\"' + icd10obj.dataField8Value + '\" size="12">' + ' </div>';
          } else
            legend8Field = ': <select id=\"iws2_dp_legend8Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onChange=\"legendValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" > <option value = \"\">  </option>';
  
          for(var i = 0; i < icd10obj.dataFieldLovs8.length; i++) {
            legend8Field += '<option value=' + icd10obj.dataFieldLovs8[i] + '>' + icd10obj.dataFieldLovs8[i] + '</option>';
          }
  
          legend8Field += unitsTextField8;
          field8 += legend8Field;
          field8 += '</select>&nbsp;<br/>';
        }
      }
      else if(icd10obj.dataFieldLabel8Type.toLowerCase() == 'combo'){
          legend8Field = ' <select id=\"iws2_dp_legend8Combo_' + icd10obj.dpEntryId + '\"  multiple  size="4"  onChange=\"multiValueComboChangedHandler(\'' + icd10obj.dpEntryId + '\')\"> ';
           for(var i = 0; i < icd10obj.dataFieldLovs8.length; i++) {
            legend8Field += '<option value=' + icd10obj.dataFieldLovs8[i] + '>' + icd10obj.dataFieldLovs8[i] + '</option>';
          }
          legend8Field += '</select>&nbsp;';
          combodiv='<div id="iws2_combo_input"><label style=\"cursor: pointer; vertical-align: top;\">'+field8+':</label><span>'+legend8Field+'</span></div>';
          field8 = combodiv;
      }
       else
        field8 += ': <input id=\"iws2_dp_cat8_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\'' + icd10obj.dpEntryId + '\')\" onkeypress =\"numberValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\"  size="5"  value=\"' + icd10obj.dataField8Value + '\">&nbsp;';
  
      form += field8;
  
    }*/
      }
   }
   return form;

}

function getStep2ICD10ScreenForOP(icd10obj)
{
	focusedDPEntryList.push(icd10obj);
	var form = 
		'<div id="iws2_step2_icd10codetable_'+ icd10obj.dpEntryId +'\" style="font-size:1.1em;" class="icd10codetable">' +
		'   <form name ="codeInput">' +
		'   <input type=\"hidden\" name =\"version\" value=\"'+ icd10obj.codeVersion +'\" />' +
		'   <input type=\"hidden\" name =\"type\" value=\"'+ icd10obj.type +'\" />' +
		'   <input type=\"hidden\" name =\"master\" value=\"'+ icd10obj.masterId +'\" />' + 
		'   <input type=\"hidden\" name =\"code\" value=\"'+ icd10obj.selvalue +'\" />' +
		'   <input type=\"hidden\" name =\"codeDescription\" value=\"'+ icd10obj.seldesc +'\" />' +		
		'   </form>'; 

	var clientDateIcon = "";
	if (clientDateFormat  == 'mm/dd/yyyy') 
	    clientDateIcon = ' <img src=\"images/US-flag.png\" height=\"20\" width=\"20\"> '; 
	if (clientDateFormat  == 'dd/mm/yyyy') 
	    clientDateIcon = ' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '; 
	
	var sectionbegend = null;
	if(icd10obj.secEnd== null || icd10obj.secEnd == 'null')
	icd10obj.secEnd = icd10obj.secBeg;
	if(icd10obj.secBeg == icd10obj.secEnd)
		sectionbegend = icd10obj.secBeg;
	else
		sectionbegend = icd10obj.secBeg + "-" + icd10obj.secEnd;			
	
	form +=		
		'	<div id="iws2_subc_ctnr_rejectaccept_op" class="icd10codetablerow">' + 
		'		<div id="iws2_subc_ctnr_pagesection_op" class="icd10codetablecell">' +                            
		'           <span id=\"codePagePopup_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"openPopupForCorrectCodeSectionPageData(\'' + icd10obj.selvalue+'\',\''+ icd10obj.pageNumber + '\',\''+ sectionbegend +'\',\''+ icd10obj.dpEntryId+'\',\''+ icd10obj.revision +'\',\''+ icd10obj.pageId +'\',\''+ icd10obj.pageId +'\',\''+ icd10obj.masterId +'\');\"><img id=\"dpPopupImg\" title="Modify the Page/Section" style="width:10px; height:15px; cursor: pointer;" src="images/pencil.jpg"/></span>';
	if(icd10obj.dpEntryId ==null)
		form +=	'<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',true);" value="Page ' +  icd10obj.pageNumber +  ' Sec ' +  sectionbegend + '"  readonly="readonly">&nbsp;';
	else
		form +=	'<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',false);" value="Page ' +  icd10obj.pageNumber +  ' Sec ' +  sectionbegend + '"  readonly="readonly">&nbsp;';	
		
	    form +='     ' + clientDateIcon + ' <input id="iws2_dp_datepicker_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue.replace(/\./g,'-') + '\" type="text" value="' + icd10obj.dataDate+  '" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"dateValueChangedHandler(\''+icd10obj.dpEntryId + '\');\" onKeyDown="return dateContainsNumbers(event);" onChange = \" dateValueChangedHandler(\''+icd10obj.dpEntryId + '\') \" size="10"/>&nbsp;' +
		'           <span id=\"eraserDPDate_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseDPDate(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\');\"><img id=\"eraserDPDateImg\" title="Erases the DP date" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>' +
		'			<button class="bodybutton_dpentry" id="pageDate" onClick="usePageDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Page Date</button>&nbsp;' + 
		'			<button class="bodybutton_dpentry" id="prevDPDate" onClick="previousDPDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Prev DP Date</button>&nbsp;' + 
		'		</div>' +
		'		<div id="iws2_subc_ctnr_accept_reject_op" class="icd10codetablecell">' + 
		'           <span id=\"codeAddCell_' + icd10obj.dpEntryId + '\" onClick=\"getDataPointForm(null,\''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+icd10obj.masterId+'\',\''+icd10obj.type+'\',\''+icd10obj.codeVersion+'\', null, \''+ icd10obj.dpEntryId+'\',\'\' ,\'\',\'\');\"><img id=\"addImg\" title="Add another code row entry" style="width:20px; height:24px; margin-bottom:-5px; cursor: pointer;" src="images/plus_grey.png"/></span>' +
		'           <span id=\"codeDeleteCell_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"deleteDPSectionWithConfirm(\'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"deleteImg\" title="Delete this code row entry" style="width:12px; height:17px; cursor: pointer;" src="images/garbage-icon.gif"/></span>' +	
		'		</div>' ;
		
	// for creating isText datafield
	/* IWO-26 Remove "To Be Transcribed" Checkbox from Step2-OP DP entry box 	/*
	if(icd10obj.dataFieldLabel1!=null && icd10obj.dataFieldLabel2!=null){
	  if(icd10obj.dataFieldLabel1.toLowerCase() == 'transcript' || icd10obj.dataFieldLabel2.toLowerCase() == 'transcript'){
	    isTextField = 
	 	  '   <span id="iws2_subc_ctnr_isTranscript_op"><span id="iws2_subc_ctnr_isTranscript_op_' + icd10obj.dpEntryId + '" class="searchTableSpan" style="margin-left: 48px;margin-top: 2px;"><input type="checkbox" id="isText_checkbox_input_'+icd10obj.dpEntryId +'\" onChange=\"isTextValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"   >&nbsp;<b> To Be Transcribed </b></span></span>' +
		  '  </div>';
      }
  	}	
	*/
  	
    dataFieldsArea = 	
	  	'	<div id="iws2_subc_ctnr_input_op" class="icd10codetablerow">' + 
	  	'		<div id="iws2_subc_ctnr_field_input_op" class="icd10codetablecell">';		
		
    form += dataFieldsArea;
    form += getStep2ICD10DatfieldForDPForm(icd10obj);
    	
    	form += '<br/>System Issues for this DP: <input type="text" size = "50" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" id=\"iws2_dp_system_issue_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\""/>';
    
		form+= 
		'		</div>' + 
		'	</div>' + 
		'	<div id="iws2_subc_ctnr_buttons_op" class="icd10codetablerow">' + 
		'		<div class="icd10codetablebuttonspacer">' + 
		'     		<button class="bodybutton_dpentry" id=\"saveDp_' + icd10obj.dpEntryId + '\" disabled="disabled" onclick=\"javascript:saveDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , \''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\'' + icd10obj.dpEntryId + '\',\''+	icd10obj.pageId+'\',\'' + sectionbegend+'\',\''+ icd10obj.masterId+'\'); \" >Save</button>&nbsp;&nbsp; ' + 
		'			<button class="bodybutton_dpentry" id=\"cancelDp_' + icd10obj.dpEntryId  + '\" disabled="disabled" onclick=\"javascript:cancelDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'")+ '\', \'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\'); \">Cancel</button>&nbsp;' +
		//IWO-30 Remove all "Suspend" button functions
		//'			<button class="bodybutton_dpentry" id=\"suspendDp_' + icd10obj.dpEntryId + '\"" value="' + icd10obj.suspendnote+  '" onclick=\"javascript:suspendNotes(\''+icd10obj.dpEntryId+'\');\">Suspend Note</button>&nbsp;' + 
		//'			<button class="bodybutton_dpentry" id=\"unSuspendDp_' + icd10obj.dpEntryId + '\"" disabled="disabled" onclick=\"javascript:unSuspend(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' ,\''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\'' + icd10obj.dpEntryId + '\',\''+	icd10obj.pageId+'\',\'' + sectionbegend+'\',\''+ icd10obj.masterId+'\');\">Unsuspend</button>' +
		'		</div>' + 
		'       <span id=\"midicalCodeDottedBorder' + icd10obj.dpEntryId + '\" style="height: 0px;background: #2F73DA;display: block;width: 630px;margin: 0 0 0 -50px;border: 1.5px dashed #CCC;" ></span>'+
		'	</div>' + 
		'</div>';
		
		return form;
}	

/** By clicking on 'isText' checkbox from DP form 
 *  will make the transcript textarea to be diabled and by making it unceheked it will enable the transcript textarea again 
 * 
 * @param dpEntryId: selecte DpEntry id
 */

function toggleTranscript(dpEntryId){
  if($('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox:checked').length == 1){
      // $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', true);
     /*
     var totalDataFields = 
          for (var i=0; i < Things.length; i++) {
            Things[i]
          }; */
     
      
     if($('#iws2_dp_cat1_input_'+ dpEntryId).html()!=null)
        $('#iws2_dp_cat1_input_'+ dpEntryId).attr("disabled", "disabled");
     else if($('#iws2_dp_cat2_input_'+ dpEntryId).html()!=null)
        $('#iws2_dp_cat2_input_'+ dpEntryId).attr("disabled", "disabled");
     else if($('#iws2_dp_cat3_input_'+ dpEntryId).html()!=null)
        $('#iws2_dp_cat3_input_'+ dpEntryId).attr("disabled", "disabled");
     else if($('#iws2_dp_cat4_input_'+ dpEntryId).html()!=null)
        $('#iws2_dp_cat4_input_'+ dpEntryId).attr("disabled", "disabled");
  }else{
    $('#iws2_dp_cat1_input_'+ dpEntryId).removeAttr('disabled');
    $('#iws2_dp_cat2_input_'+ dpEntryId).removeAttr('disabled');
    $('#iws2_dp_cat3_input_'+ dpEntryId).removeAttr('disabled');
    $('#iws2_dp_cat4_input_'+ dpEntryId).removeAttr('disabled');
  }
}

/*
 * This function is OBSOLETE
 */
function getStep2ICD10ScreenForOP2(icd10obj)
{
	var isTextField = null;
	var field1 = null;
	var field2 = null;
	var field3 = null;
	var field4 = null;
	
	var form = 
		'<div id="iws2_step2_icd10codetable_op2_'+ icd10obj.dpEntryId +'\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" style="font-size:1.1em;" class="icd10codetable">' +
		'   <form name ="codeInput">' +
		'   <input type=\"hidden\" name =\"version\" value=\"'+ icd10obj.codeVersion +'\" />' +
		'   <input type=\"hidden\" name =\"type\" value=\"'+ icd10obj.type +'\" />' +
		'   <input type=\"hidden\" name =\"master\" value=\"'+ icd10obj.masterId +'\" />' + 
		'   <input type=\"hidden\" name =\"code\" value=\"'+ icd10obj.selvalue +'\" />' +
		'   <input type=\"hidden\" name =\"codeDescription\" value=\"'+ icd10obj.seldesc +'\" />' +		
		'   </form>'; 

	var clientDateIcon = "";
	if (clientDateFormat  == 'mm/dd/yyyy') 
	    clientDateIcon = ' <img src=\"images/US-flag.png\" height=\"20\" width=\"20\"> '; 
	if (clientDateFormat  == 'dd/mm/yyyy') 
	    clientDateIcon = ' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '; 
	
	var sectionbegend = null;
	if(icd10obj.secEnd== null || icd10obj.secEnd == 'null')
	icd10obj.secEnd = icd10obj.secBeg;
	if(icd10obj.secBeg == icd10obj.secEnd)
		sectionbegend = icd10obj.secBeg;
	else
		sectionbegend = icd10obj.secBeg + "-" + icd10obj.secEnd;			
	
	form +=		
		'	<div id="iws2_subc_ctnr_rejectaccept_op2" class="icd10codetablerow">' + 
		'		<div id="iws2_subc_ctnr_accept_reject_op2" class="icd10codetablecell">';
	
		var acceptRejectText='<input id="iws2_subc_accept_' + icd10obj.dpEntryId + '\" name="icd10_' + icd10obj.dpEntryId + '\" type="radio" value="V1" onclick=\"javascript:handleOP2AcceptReject(\'' + icd10obj.dpEntryId + '\'); \"/>Accept <br>' +
		   '<input id="iws2_subc_reject_' + icd10obj.dpEntryId + '\" name="icd10_' + icd10obj.dpEntryId + '\" type="radio" value="V2" checked onclick=\"javascript:handleOP2AcceptReject(\'' + icd10obj.dpEntryId + '\'); \"/>Reject';
		
		if(icd10obj.isRejected != undefined){
			if(!icd10obj.isRejected){
				form +='<input id="iws2_subc_accept_' + icd10obj.dpEntryId + '\" name="icd10_' + icd10obj.dpEntryId + '\" type="radio" value="V1" checked />Accept';
			}else{
				form +=acceptRejectText;
			}
		}else{
			form +=acceptRejectText;
		}
		
		form +=	'</div>' + 
		'		<div id="iws2_subc_ctnr_pagesection_op2" class="icd10codetablecell">' +    
		'           <span id=\"codeAddCell_' + icd10obj.dpEntryId + '\" onClick=\"getDataPointForm(null,\''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+icd10obj.masterId+'\',\''+icd10obj.type+'\',\''+icd10obj.codeVersion+'\', null, \''+ icd10obj.dpEntryId+'\',\'\' ,\'\',\'\');\"><img id=\"addImg\" title="Add another code row entry" style="width:20px; height:24px; margin-bottom:-5px; cursor: pointer;" src="images/plus_grey.png"/></span>' +
		'           <span id=\"codeDeleteCell_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"deleteDPSection(\'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"deleteImg\" title="Delete this code row entry" style="width:12px; height:17px; cursor: pointer;" src="images/garbage-icon.gif"/></span>' +	
		'           <span id=\"codePagePopup_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"openPopupForCorrectCodeSectionPageData(\'' + icd10obj.selvalue+'\',\''+ icd10obj.pageNumber + '\',\''+ sectionbegend +'\',\''+ icd10obj.dpEntryId+'\',\''+ icd10obj.revision +'\',\''+ icd10obj.masterId +'\');\"><img id=\"dpPopupImg\" title="Modify the Page/Section" style="width:10px; height:15px; cursor: pointer;" src="images/pencil.jpg"/></span>';
		if(icd10obj.dpEntryId ==null)
			form +='<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',true);" value="Page ' +  icd10obj.pageNumber +  ' Section ' +  sectionbegend + '"  readonly="readonly">&nbsp;';
		else
			form +='<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',false);" value="Page ' +  icd10obj.pageNumber +  ' Section ' +  sectionbegend + '"  readonly="readonly">&nbsp;';
		
		form +='     ' + clientDateIcon + ' <input id="iws2_dp_datepicker_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue.replace(/[&\/\\#,+()$~%'":*?<>{}\.]/g,'') + '\" type="text" value="' + icd10obj.dataDate+  '" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onKeyDown="return dateContainsNumbers(event);" onChange = \" dateValueChangedHandler(\''+icd10obj.dpEntryId + '\') \" size="10"/>&nbsp;' +
		'           <span id=\"eraserDPDate_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseDPDate(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\');\"><img id=\"eraserDPDateImg\" title="Erases the DP date" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>' +
		'			<button class="bodybutton_dpentry" id="pageDate" onClick="usePageDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Page Date</button>&nbsp;' + 
		'			<button class="bodybutton_dpentry" id="prevDPDate" onClick="previousDPDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Prev DP Date</button>&nbsp;' + 
		'		</div>';
		
	  // for creating isText datafield
	  if(icd10obj.dataFieldLabel1!=null){
	    if(icd10obj.dataFieldLabel1.toLowerCase() == 'transcript' || icd10obj.dataFieldLabel2.toLowerCase() == 'transcript'){
	    isTextField = 
	 	  '   <span id="iws2_subc_ctnr_isTranscript_op"><span id="iws2_subc_ctnr_isTranscript_op_' + icd10obj.dpEntryId + '" class="searchTableSpan" style="margin-left: 48px;margin-top: 2px;"><input type="checkbox" id="isText_checkbox_input_'+icd10obj.dpEntryId +'\" onChange=\"isTextValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"   >&nbsp;<b> IsText </b></span></span>' +
		   '  </div>';
      }
  	}	
    dataFieldsArea = 	
	  	'	<div id="iws2_subc_ctnr_input_op2" class="icd10codetablerow">' + 
	  	'		<div id="iws2_subc_ctnr_field_input_op" class="icd10codetablecell">';		
		
    form += dataFieldsArea;
		
		if(icd10obj.dataFieldLabel1!=null){
			field1 = icd10obj.dataFieldLabel1;
			if(icd10obj.dataFieldLabel1Type.toLowerCase() == 'text'){
				transcript1Field = ': <textarea id=\"iws2_dp_cat1_input_' + icd10obj.dpEntryId + '\"" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"capitalizeOnBlur();\" >'+ icd10obj.dataField1Value +'</textarea>&nbsp;';
				field1 += transcript1Field;
			}	
			else if (icd10obj.dataFieldLabel1Type.toLowerCase() == 'lovs'){
				legend1Field = ': <select id=\"iws2_dp_legend1Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"legendValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"> <option value = \"\">  </option>' ;
				for(var i=0; i < icd10obj.dataFieldLovs1.length ; i++){ 
					legend1Field += '<option value='+ icd10obj.dataFieldLovs1[i] +'>' +  icd10obj.dataFieldLovs1[i] + '</option>';
				}
				field1 += legend1Field; 
				field1 += '</select>';
			}else
				field1 += ': <input id=\"iws2_dp_cat1_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" size="5"  value=\"' + icd10obj.dataField1Value + '\">&nbsp;';
			
			//IWO-31: Legend drop down field should be on its own line
			if (icd10obj.dataFieldLabel1 == 'Legend')
				field1 += '<br/>';
		}
		
		if(icd10obj.dataFieldLabel2!=null){
			field2 = icd10obj.dataFieldLabel2;
			if(icd10obj.dataFieldLabel2Type.toLowerCase() == 'text'){
			  transcript2Field = ': <textarea id=\"iws2_dp_cat2_input_' + icd10obj.dpEntryId + '\"" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"  onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"capitalizeOnBlur();\">'+ icd10obj.dataField2Value +'</textarea>&nbsp;'; 
				field2 += transcript2Field;
			}	
			else if (icd10obj.dataFieldLabel2Type.toLowerCase() == 'lovs'){
				legend2Field = ': <select id=\"iws2_dp_legend2Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"legendValueChangedHandler( \''+icd10obj.dpEntryId+'\')\"> <option value = \"\">  </option>' ;
				for(var i=0; i < icd10obj.dataFieldLovs2.length ; i++){ 
					legend2Field += '<option value='+ icd10obj.dataFieldLovs2[i] +'>' +  icd10obj.dataFieldLovs2[i] + '</option>';
				}
				field2 += legend2Field; 
				field2 += '</select>';
			}else
				field2 += ': <input id=\"iws2_dp_cat2_input_' + icd10obj.dpEntryId + '\""  onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\"  onkeypress=\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" size="5"  value=\"' + icd10obj.dataField2Value + '\">&nbsp;';
				
		}
		 
		 /*if any transcript/isText datafield exists means either field1/field2 are transcript or legend vice versa 
					first legend to be added
					then isText checkbox to be added
					then transcript to be added
		 */
		if(isTextField != null){
		  extraSpace = '  <div id="iws2_subc_ctnr_input_blank_op" class="icd10codetablecell">&nbsp;</div>';
		  if(icd10obj.dataFieldLabel1.toLowerCase() != 'transcript'){
		    form += field1 ;
		    form += isTextField;
		    form += field2;
		  }else{
		    form += field2 ;
        form += isTextField; 
        form += field1;
		  }  
		}else{ // add the others field if transcript field dont exist		
		  if(field1 != null)
		    form += field1;
		  if(field2 != null)
		    form += field2;
		}    
		  
		if(icd10obj.dataFieldLabel3!=null){
			field3 = icd10obj.dataFieldLabel3;
			if(icd10obj.dataFieldLabel3Type.toLowerCase() == 'text'){
				transcript3Field = ': <textarea id=\"iws2_dp_cat3_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"capitalizeOnBlur();\">'+ icd10obj.dataField3Value +'</textarea>&nbsp;';
				field3 += transcript3Field;
			}	
			else if (icd10obj.dataFieldLabel3Type.toLowerCase() == 'lovs'){
				legend3Field = ': <select id=\"iws2_dp_legend3Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"legendValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"> <option value = \"\">  </option>' ;
				for(var i=0; i < icd10obj.dataFieldLovs3.length ; i++){ 
					legend3Field += '<option value='+ icd10obj.dataFieldLovs3[i] +'>' +  icd10obj.dataFieldLovs3[i] + '</option>';
				}
				field3 += legend3Field; 
				field3 += '</select>';
			}else
				field3 += ': <input id=\"iws2_dp_cat3_input_' + icd10obj.dpEntryId + '\"" size="5" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress =\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"  value=\"' + icd10obj.dataField3Value + '\">&nbsp;';
			
			form+= field3;
		}
		
		if(icd10obj.dataFieldLabel4!=null){
			field4 = icd10obj.dataFieldLabel4;
			if(icd10obj.dataFieldLabel4Type.toLowerCase() == 'text'){
				transcript4Field = ': <textarea id=\"iws2_dp_cat4_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"capitalize(event);transcriptValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"capitalizeOnBlur();\">'+ icd10obj.dataField4Value +'</textarea>&nbsp;';
				field4 += transcript4Field;
			}	
			else if (icd10obj.dataFieldLabel4Type.toLowerCase() == 'lovs'){
				legend4Field = ': <select id=\"iws2_dp_legend4Lovs_' + icd10obj.dpEntryId + '\" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onChange=\"legendValueChangedHandler(\''+icd10obj.dpEntryId+'\')\" > <option value = \"\">  </option>' ;
				for(var i=0; i < icd10obj.dataFieldLovs4.length ; i++){ 
					legend4Field += '<option value='+ icd10obj.dataFieldLovs4[i] +'>' +  icd10obj.dataFieldLovs4[i] + '</option>';
				}
				field4 += legend4Field; 
				field4 += '</select>';
			}else
				field4 += ': <input id=\"iws2_dp_cat4_input_' + icd10obj.dpEntryId + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress =\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"  size="5"  value=\"' + icd10obj.dataField4Value + '\">&nbsp;';
			
			form+= field4;
		}
		
		form += '<br/>System Issues for this DP: <input type="text" size = "50" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\"  onkeypress=\"transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" id=\"iws2_dp_system_issue_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\""/>';

		form+= 
		'		</div>' + 
		'	</div>' + 
		'	<div id="iws2_subc_ctnr_buttons_op2" class="icd10codetablerow">' + 
		'		<div class="icd10codetablebuttonspacer">' + 
		'     		<button class="bodybutton_dpentry" id=\"saveDp_' + icd10obj.dpEntryId + '\" disabled="disabled" onclick=\"javascript:saveDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , \''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\'' + icd10obj.dpEntryId + '\',\''+	icd10obj.pageId+'\',\'' + sectionbegend+'\',\''+ icd10obj.masterId+'\'); \" >Save</button>&nbsp;&nbsp; ' + 
		'			<button class="bodybutton_dpentry" id=\"cancelDp_' + icd10obj.dpEntryId  + '\" disabled="disabled" onclick=\"javascript:cancelDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'")+ '\', \'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\'); \">Cancel</button>&nbsp;'; 
		
		if(icd10obj.isRejected || icd10obj.isRejected == undefined){
			form+= '<button class="bodybutton_dpentry" id="rejectReason_'+ icd10obj.dpEntryId+'\" onclick=\"javascript:handleRejectReason(\''+ icd10obj.rejectReason+'\',\'' + icd10obj.dpEntryId + '\');\">Reject Reason</button>&nbsp;'; 
		}
		
		form+='	</div>' + 
		'	</div>' + 
		'</div>';
		
		return form;
}

function getStep2ICD10ScreenForQA(icd10obj)
{
	focusedDPEntryList.push(icd10obj);
	var form = 
		'<div id="iws2_step2_icd10codetable_'+ icd10obj.dpEntryId +'\" style="font-size:1.1em;position : relative" class="icd10codetable">' +
		'   <form name ="codeInput">' +
		'   <input type=\"hidden\" name =\"version\" value=\"'+ icd10obj.codeVersion +'\" />' +
		'   <input type=\"hidden\" name =\"type\" value=\"'+ icd10obj.type +'\" />' +
		'   <input type=\"hidden\" name =\"master\" value=\"'+ icd10obj.masterId +'\" />' + 
		'   <input type=\"hidden\" name =\"code\" value=\"'+ icd10obj.selvalue +'\" />' +
		'   <input type=\"hidden\" name =\"codeDescription\" value=\"'+ icd10obj.seldesc +'\" />' +		
		'   </form>'; 

	var clientDateIcon = "";
	if (clientDateFormat  == 'mm/dd/yyyy') 
	    clientDateIcon = ' <img src=\"images/US-flag.png\" height=\"20\" width=\"20\"> '; 
	if (clientDateFormat  == 'dd/mm/yyyy') 
	    clientDateIcon = ' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '; 
	
	var prevousHidCodeData;
	if(icd10obj.hidPrevCode != null && icd10obj.hidPrevCode !=0){
	$.ajax({
		type: "POST",
	  	url: "medicalhiearchy/medicalCode/" + icd10obj.hidPrevCode,
	  	async: false,
	  	success: function(medicalCodaData) {
	  		prevousHidCodeData = medicalCodaData;
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
	}
	var legendValue =null;
	var sectionbegend = null;
	//To Contains  Updated Object
	var currentObj=null;
	if(icd10obj.secEnd== null || icd10obj.secEnd == 'null')
	icd10obj.secEnd = icd10obj.secBeg;
	if(icd10obj.secBeg == icd10obj.secEnd)
		sectionbegend = icd10obj.secBeg;
	else
		sectionbegend = icd10obj.secBeg + "-" + icd10obj.secEnd;
		
	for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {
	  if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase() == 'legend')
	     legendValue = icd10obj.dataFieldValue[i];
	}
		
	/*
	if(icd10obj.dataFieldLabel1!=null && icd10obj.dataFieldLabel1.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField1Value;
		}else if(icd10obj.dataFieldLabel2!=null && icd10obj.dataFieldLabel2.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField2Value;
		}else if(icd10obj.dataFieldLabel3!=null && icd10obj.dataFieldLabel3.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField3Value;
		}else if(icd10obj.dataFieldLabel4!=null && icd10obj.dataFieldLabel4.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField4Value;
		}else if(icd10obj.dataFieldLabel5!=null && icd10obj.dataFieldLabel5.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField5Value;
		}else if(icd10obj.dataFieldLabel6!=null && icd10obj.dataFieldLabel6.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField6Value;
		}else if(icd10obj.dataFieldLabel7!=null && icd10obj.dataFieldLabel7.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField7Value;
		}else if(icd10obj.dataFieldLabel8!=null && icd10obj.dataFieldLabel8.toLowerCase() == 'legend'){
			legendValue = icd10obj.dataField8Value;
		}*/
	
	/*
	if(icd10obj.dataFieldLabel2 == 'Transcript' && icd10obj.dataFieldLabel2Type.toLowerCase() == 'text'){
			transcriptValue = icd10obj.dataField2Value;
		}*/
	
	//add Icd10Obj 
	currentObj=encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'");
    //show ranking in Step 2 QC1 
	var  ranking="";
    if(qsStageId == 7) {
       ranking = getCodeConfidence(icd10obj.selvalue, icd10obj.qcaiCodeReview);
       if(ranking!="")
       ranking="{"+ranking+"}";
    }
	if(icd10obj.hidPrevCode != null && icd10obj.hidPrevCode !=0){
		form += /*'<span>' + icd10obj.qcaiCodeReview[0].confidence + '</span>' + */
		        '  <div id="iws2_subc_ctnr_QA1_code" style="text-align: left;margin: 0 0 0 20px;width: 500px;font-size: 13px;overflow: auto;" >'  +
		        '  '+ranking+'<a href="#" id=\"QA1Code_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 3px;" onclick = \" loadHierarchyPopUpWindow(\''+ icd10obj.selvalue  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.dataDate+'\',\''+legendValue+'\',\''+currentObj+'\');  \" >'+ icd10obj.selvalue +' (Current) - </a>' ;
		if(icd10obj.codeScale==3 && qsStageId!=50)//To make description red and bold
        form += '  <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;" class="critcal-color">'+ icd10obj.seldesc +'</span>&nbsp;&nbsp;&nbsp;&nbsp;';
        else if(icd10obj.codeScale==2 && qsStageId!=50)//To make description red and bold
        form += '  <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;" class="major-color">'+ icd10obj.seldesc +'</span>&nbsp;&nbsp;&nbsp;&nbsp;';
		else 
        form += '  <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;">'+ icd10obj.seldesc +'</span>&nbsp;&nbsp;&nbsp;&nbsp;';
        form +=	'  <span id="iws2_subc_ctnr_prev_code_'+ icd10obj.dpEntryId + '" style="padding: 0 30px 0 1px;display: block;float: right;position: absolute;right: 0;top: 5px;width: 394px;background: #ccc;right: 14px;">Was '+ prevousHidCodeData.name+' (Previous) - '+prevousHidCodeData.description +'</span>&nbsp;&nbsp;&nbsp;&nbsp;'+
		        '  </div>';
	}else{
		form += '	       <div id="iws2_subc_ctnr_QA1_code" style="text-align: left;margin: 0 0 0 20px;width: 500px;font-size: 13px;overflow: auto;" >' + 
		        '   '+ranking+' <a href="#" id=\"QA1Code_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 3px;" onclick = \" loadHierarchyPopUpWindow(\''+ icd10obj.selvalue  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.dataDate+'\',\''+legendValue+'\',\''+currentObj+'\');  \" >'+ icd10obj.selvalue +' (Current) - </a>' ;
		if(icd10obj.codeScale==3 && qsStageId!=50)
		form += '           <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;" class="critical-color">'+ icd10obj.seldesc +'</span>';
		else if(icd10obj.codeScale==2 && qsStageId!=50)
        form += '           <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;" class="major-color">'+ icd10obj.seldesc +'</span>';
		else 
		form += '           <span id=\"QA1CodeEdsc_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 1px;">'+ icd10obj.seldesc +'</span>';
		form += '		</div>';
	}
	//give the span an ID in order to get its height for proper display of the slider window
	form += ' <span id="iws2_subc_ctnr_qcai_codes_'+ icd10obj.dpEntryId + '" style="padding: 0 30px 0 1px;display: block;float: right;position: absolute;right: 0;width: 394px;top: 45px;font-size: 13px;">';
	if(icd10obj.qcaiCodeViewdesc!=null){
	if(icd10obj.qcaiCodeViewdesc.length>0 && icd10obj.qcaiCodeViewdesc[0].name!=null){
		for(i=0;i<icd10obj.qcaiCodeViewdesc.length;i++){
		    //show ranking in Step 2 QC1
		    var  ranking="";
		    if(qsStageId==7){
		      ranking=getCodeConfidence(icd10obj.qcaiCodeViewdesc[i].name,icd10obj.qcaiCodeReview);
		      if(ranking!="")
		      ranking="{"+ranking+"}";
		    }
		    //use in future to remove Ajax call for replace Code in qcaiSuggestReplaceCode method
		   var replaceObj=encodeURIComponent(JSON.stringify(icd10obj.qcaiCodeViewdesc[i])).replace(/'/g, "\\'\\'");
			form += 
			'<div id="iws2_subc_ctnr_QA1_multiple_viewcode">'+ranking+'&nbsp<a href="#" id=\"QA1Code_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="padding: 0 0 0 3px;" onclick = \" loadHierarchyPopUpWindow(\''+ icd10obj.qcaiCodeViewdesc[i].name  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.dataDate+'\',\''+legendValue+'\',\''+currentObj+'\');  \" >'+ icd10obj.qcaiCodeViewdesc[i].name+' (Proposed) - </a>'+
			'           <button class="bodybutton_dpentry" id="replaceCode" onclick = \" qcaiSuggestReplaceCode(\''+ icd10obj.qcaiCodeViewdesc[i].name  +'\',\''+ icd10obj.selvalue  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.revision +'\',\''+ icd10obj.dataDate+'\',\''+legendValue+'\',\''+currentObj+'\');  \" >Replace Code</button>&nbsp';
			if(icd10obj.qcaiCodeViewdesc[i].codeScale==3 && qsStageId!=50)
			form +='<span class ="critical-color"> '+ icd10obj.qcaiCodeViewdesc[i].description+'</span>' ;
			else if(icd10obj.qcaiCodeViewdesc[i].codeScale==2 && qsStageId!=50)
            form +='<span class ="major-color"> '+ icd10obj.qcaiCodeViewdesc[i].description+'</span>' ;
			else
			form +='<span>' + icd10obj.qcaiCodeViewdesc[i].description+'</span> ';
			
			form +='</div>';
			
			
		}
	}
	}
	form += '</span>';
	
	var QCAIStatusImage="";
	if(icd10obj.qcaiReturnStatus!=null && (icd10obj.qcaiReturnStatus=="Code Agreed" || icd10obj.qcaiReturnStatus=="Code Suggested")){
		if(icd10obj.qcaiReturnStatus=="Code Agreed")
			QCAIStatusImage='<img id="" style="margin:3px;float:left;" src="images/green_QA.png"/>';
	    else if(icd10obj.qcaiReturnStatus=="Code Suggested")
	    	QCAIStatusImage='<img id="" style="margin:3px;float:left;" src="images/yellow_QA.png"/>';
	    else
	   	  	QCAIStatusImage='';
		
		/*form += '	<div id="iws2_subc_ctnr_qcai_code" style="background: yellow;text-align: left;margin: 0 0 0 46px;width: 500px;font-size: 13px;overflow: auto;" >' + 
		'           <span id=\"thumbsDown_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" >' + QCAIStatusImage + '</span>' +
		'           <a href="#" id=\"qcaiCode_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="background-color: yellow;padding: 0 0 0 3px;" onclick = \" loadHierarchyPopUpWindow(\''+ icd10obj.qcaiReturnValue  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.dataDate+'\',\''+datafieldValue+'\',\''+transcriptValue+'\');  \" >'+icd10obj.qcaiReturnValue+' (Proposed) </a>' +
		'           <button class="bodybutton_dpentry" id="replaceCode" onclick = \" qcaiSuggestReplaceCode(\''+ icd10obj.qcaiReturnValue  +'\',\''+ icd10obj.selvalue  +'\',\''+icd10obj.currRowCount+'\',\''+icd10obj.masterId+'\',\''+ sectionbegend +'\',\''+icd10obj.pageNumber+'\',\''+icd10obj.pageId+'\',\''+icd10obj.dpEntryId+'\',\''+ icd10obj.revision +'\',\''+ icd10obj.dataDate+'\',\''+datafieldValue+'\',\''+transcriptValue+'\');  \" >Replace Code</button>&nbsp;' + 
		'           <span id=\"qcaiCodeData_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" style="background-color: yellow;padding: 0 0 0 1px;">'+icd10obj.qcaiCodedesc+'</span>' +
		'		</div>';*/
	}
	
	form +=		
		'	<div id="iws2_subc_ctnr_rejectaccept_op" class="icd10codetablerow">' + 
		'		<div id="iws2_subc_ctnr_pagesection_op" class="icd10codetablecell" style="margin:0 0 0 20px;">' +                            
		'           <span id=\"codePagePopup_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"openPopupForCorrectCodeSectionPageData(\'' + icd10obj.selvalue+'\',\''+ icd10obj.pageNumber + '\',\''+ sectionbegend +'\',\''+ icd10obj.dpEntryId+'\',\''+ icd10obj.revision +'\',\''+ icd10obj.pageId +'\',\''+ icd10obj.pageId +'\',\''+ icd10obj.masterId +'\');\"><img id=\"dpPopupImg\" title="Modify the Page/Section" style="width:10px; height:15px; cursor: pointer;" src="images/pencil.jpg"/></span>';
		if(icd10obj.dpEntryId ==null)
			form +='<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',true);" value="Page ' +  icd10obj.pageNumber +  ' Sec ' +  sectionbegend + '"  readonly="readonly">&nbsp;';
		else
			form +='<input id="iws2_subc_input_pagesection_' + icd10obj.dpEntryId + '" type="text" size="15"  onClick="pageSectionClickHandler(\''+ icd10obj.pageId + '\',\''+ sectionbegend +'\',false);" value="Page ' +  icd10obj.pageNumber +  ' Sec ' +  sectionbegend + '"  readonly="readonly">&nbsp;';
	
	    form +='     ' + clientDateIcon + ' <input id="iws2_dp_datepicker_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue.replace(/\./g,'-') + '\" type="text" value="' + icd10obj.dataDate+  '" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"dateValueChangedHandler(\''+icd10obj.dpEntryId + '\');\" onKeyDown="return dateContainsNumbers(event);" onChange = \" dateValueChangedHandler(\''+icd10obj.dpEntryId + '\') \" size="10"/>&nbsp;' +
        '        <span id=\"eraserDPDate_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseDPDate(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\'); dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\');\"><img id=\"eraserDPDateImg\" title="Erases the DP date" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>' +
		'			<button class="bodybutton_dpentry" id="pageDate" onClick="usePageDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Page Date</button>&nbsp;' + 
		'			<button class="bodybutton_dpentry" id="prevDPDate" onClick="previousDPDate(\''+ icd10obj.dpEntryId +'\' , \'' + icd10obj.selvalue + '\');dateValueChangedHandler(\''+ icd10obj.dpEntryId +'\')">Prev DP Date</button>&nbsp;' + 
		'		</div>'+
		'		<div id="iws2_subc_ctnr_accept_reject_op" class="icd10codetablecell" style="float: left;position: relative;">' + 
		'           <span id=\"codeAddCell_' + icd10obj.dpEntryId + '\" onClick=\"getDataPointForm(null,\''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+icd10obj.masterId+'\',\''+icd10obj.type+'\',\''+icd10obj.codeVersion+'\', \''+icd10obj.pageNumber+'\', \''+ icd10obj.dpEntryId+'\',\'\' ,\'\',\'\', \''+ icd10obj.sectionNumber+'\');\"><img id=\"addImg\" title="Add another code row entry" style="width:20px; height:24px; margin-bottom:-5px; cursor: pointer;" src="images/plus_grey.png"/></span>' +
		'           <span id=\"codeDeleteCell_'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"deleteDPSectionWithConfirm(\'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"deleteImg\" title="Delete this code row entry" style="width:12px; height:17px; cursor: pointer;" src="images/garbage-icon.gif"/></span>' +	
		'		</div>' ;
		
	  // for creating isText datafield
	 // if(icd10obj.dataFieldLabel1!=null){
	    //if(icd10obj.dataFieldLabel1.toLowerCase() == 'transcript' || icd10obj.dataFieldLabel2.toLowerCase() == 'transcript'){
	   // isTextField = 
	 	//  '   <span id="iws2_subc_ctnr_isTranscript_op"><span id="iws2_subc_ctnr_isTranscript_op_' + icd10obj.dpEntryId + '" class="searchTableSpan" style="margin-left: 48px;margin-top: 2px;"><input type="checkbox" id="isText_checkbox_input_'+icd10obj.dpEntryId +'\" onChange=\"isTextValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"   >&nbsp;<b> To Be Transcribed </b></span></span>' +
		//   '  </div>';
      //}
  	//}	
    dataFieldsArea = 	
	  	'	<div id="iws2_subc_ctnr_input_op" class="icd10codetablerow" style="padding-left:20px;">' + 
	  	'		<div id="iws2_subc_ctnr_field_input_op" class="icd10codetablecell">';		
		
    form += dataFieldsArea;
    form += getStep2ICD10DatfieldForDPForm(icd10obj);
		
		
    //if(icd10obj.suspendnote == null || icd10obj.suspendnote==""){
    //form += '<br>Suspend Note: <textarea id=\"iws2_dp_suspendNote_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\"></textarea>&nbsp;'+
     //       '<span id=\"eraserSuspendDp'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseSuspendDP(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"eraserDPDateImg\" title="Erases the SuspendNote" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>';
    //}else{
    //	form += '<br>Suspend Note: <textarea id=\"iws2_dp_suspendNote_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\">'+ icd10obj.suspendnote +'</textarea>&nbsp;'+
     //   '<span id=\"eraserSuspendDp'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseSuspendDP(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"eraserDPDateImg\" title="Erases the SuspendNote" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>';
   // }
   // form += '<br>Reject Reason: <textarea id=\"iws2_dp_rejectReason_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\"" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"numberValueChangedHandler(\''+icd10obj.dpEntryId+'\')\">'+ icd10obj.rejectReason +'</textarea>&nbsp;'+
   // '<span id=\"eraserRejectDp'+ icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\" onClick=\"eraseRejectDP(\'' + icd10obj.selvalue+'\',\''+ icd10obj.dpEntryId+'\');\"><img id=\"eraserDPDateImg\" title="Erases the RejectReason" style="width:10px; height:15px; cursor: pointer;" src="images/eraser_icon.gif"/></span>';

    	form += '<br/>System Issues for this DP: <input type="text" size = "50" onclick=\"onClickFocusedHandler(\''+icd10obj.dpEntryId+'\')\" onkeypress=\"transcriptValueChangedHandler(\'' + icd10obj.dpEntryId + '\')\" id=\"iws2_dp_system_issue_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue + '\""/>';
		
    	form+= 
		'		</div>' + 
		'	</div>' + 
		'	<div id="iws2_subc_ctnr_buttons_op" class="icd10codetablerow">' + 
		'		<div class="icd10codetablebuttonspacer">' + 
		'     		<button class="bodybutton_dpentry" id=\"saveDp_' + icd10obj.dpEntryId + '\" disabled="disabled" onclick=\"javascript:saveDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") + '\' , \''+icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\'' + icd10obj.dpEntryId + '\',\''+	icd10obj.pageId+'\',\'' + sectionbegend+'\',\''+ icd10obj.masterId+'\'); \" >Save</button>&nbsp;&nbsp; ' + 
		'			<button class="bodybutton_dpentry" id=\"cancelDp_' + icd10obj.dpEntryId  + '\" disabled="disabled" onclick=\"javascript:cancelDpDetails(\'' + encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'")+ '\', \'' + icd10obj.selvalue+'\',\''+icd10obj.seldesc.replace(/'/g, "\\'")+'\',\''+ icd10obj.masterId + '\',\''+icd10obj.newRowCount+'\',\''+ icd10obj.dpEntryId+'\'); \">Cancel</button>&nbsp;' + 
		'			<button class="bodybutton_dpentry" id=\"closeDp_' + icd10obj.dpEntryId + '\"" onClick=\"closeDPListQA1Form(\''+icd10obj.masterId+'\');\" >Close</button>&nbsp;' + 
		'		</div>' + 
		'	</div>' + 
		'</div>';
		
		return form;
	
}

function displayMedicalCodesIWS2(rowid,currow) 
{
	var search_datapoint_area = 
		'<div id="sweep_r_wrapper_iws2_dpentry">' +
		'	<div id="sweep_r_content_iws2">' +
		'		<div id="icd10code_wrapper_iws2">' +
		'			<div id="icd10code_category_list_iws2">' +
		'				<div id="iws2_category_list_search">';
	if(displaySearch == true && searchTerm !=null){
		search_datapoint_area += '<input name="icd11_list_input_search" id="icd11_list_input" value="'+searchTerm+'">&nbsp;&nbsp;	';
	}else{
		search_datapoint_area  +='<input name="icd11_list_input_search" id="icd11_list_input">&nbsp;&nbsp;	';
	}
	search_datapoint_area +='<button class="searchbutton" id="icd11_list_input_search" onclick="handleDPSearchCriteria(caseId);">Search</button>' +
		'					<button class="searchbutton" id="icd11_list_input_reset" onclick="resetDPSearchCriteria();">Reset</button><br>'+
		'                   <input type="radio" name="searchCriteria2" id="searchByExactCode" value="ExactCode" checked="checked"/>Exact Code'+ 
		'                   <input type="radio" name="searchCriteria2"  value="Code" />Code and Desc'+
		'                   <input type="radio" name="searchCriteria2"  value="CategoryAndCode" />All'+
		'                   <span class=\"icd10_glossary\"><a href=\"javascript:loadGlossaryWindow();\" title=\"Load Code Glossary\">Glossary</a></span>'+
		'				</div>' +
		'				<!-- This section display the Category-Subcategory accordian menu list  -->' +
		'				<div id="iws2_category_list_collapse">' +
		'					<span class="expand_collapse"><a href="javascript:void()" id="expand_all_fulldp">++' +
		'							expand all</a></span> <span class="expand_collapse"><a href="javascript:void()"' +
		'						id="collapse_all_fulldp">-- collapse all</a></span>' +
		'                   <span style="float:right; padding-right:20px; color: darkBlue; font-weight: bold;">rev ' + objCase.hierarchyrevision + '</span>' +
		'				</div>' +
		'               <div id="iws2_fulldp_search_status"></div>'+
		'				<div id="iws2_fulldp_category_list_entries"></div>' +
		'				' +
		'			</div>' +
		'			<div id="icd10code_subcategory_iws2">' +
		'             <div onclick = "closeDPListForm();" style="padding-top: 5px; float: right; cursor: pointer;"><img src="images/close.jpg"></div>' +
		'				<div id="cntnr_subcategory_selection">' +
		'					<div id="cntnr_subc_selc">' +
		'					</div>' +
		'					<div id="iws2_subc_entries_fulldp">'+
		'                   </div>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'	</div>	' +
		'</div>' +
		'<span style="display:none" id="dpfulllistactiverow"></span>';
	
	var datapoint_area = 
		'<div id="sweep_r_wrapper_iws2_dpentry">' +
		'	<div id="sweep_r_content_iws2">' +
		'		<div id="icd10code_wrapper_iws2">' +
		'			<div id="icd10code_category_list_iws2">' +
		'				<div id="iws2_category_list_search">' +
		'					<input name="icd10_list_input_search" id="icd10_list_input" onkeypress="searchHandle(event);">&nbsp;&nbsp;	' +
		'					<button class="searchbutton" id="icd10_list_input_search" onclick="handleSearchCriteria(caseId);">Search</button>' +
		'					<button class="searchbutton" id="icd10_list_input_reset" onclick="resetSearchCriteria();">Reset</button><br>' +
		'                   <input type="radio" name="searchCriteria" id="searchByExactCode" value="ExactCode" checked="checked"/>Exact Code'+
		'                   <input type="radio" name="searchCriteria" id="searchByCode" value="Code" />Code and Desc'+
		'                   <input type="radio" name="searchCriteria" id="searchByCategoryAndCode" value="CategoryAndCode"/>All'+
		'                   <span class=\"icd10_glossary\"><a href=\"javascript:loadGlossaryWindow();\" title=\"Load Code Glossary\">Glossary</a></span>'+
		'				</div>' +
		'				<!-- This section display the Category-Subcategory accordian menu list  -->' +
		'				<div id="iws2_category_list_collapse">' +
		'					<span class="expand_collapse"><a href="javascript:void()" id="expand_all_fulldp">++' +
		'							expand all</a></span> <span class="expand_collapse"><a href="javascript:void()"' +
		'						id="collapse_all_fulldp">-- collapse all</a></span>' +
		'				</div>' +
		'               <div id="iws2_fulldp_search_status"></div>'+
		'				<div id="iws2_fulldp_category_list_entries"></div>' +
		'				' +
		'			</div>' +
		'			<div id="icd10code_subcategory_iws2">' +
		'             <div onclick = "closeDPListForm();" style="padding-top: 5px; float: right; cursor: pointer;"><img src="images/close.jpg"></div>' +
		'				<div id="cntnr_subcategory_selection">' +
		'					<div id="cntnr_subc_selc">' +
		'					</div>' +
		'					<div id="iws2_subc_entries_fulldp">'+
		'                   </div>' +
		'				</div>' +
		'			</div>' +
		'		</div>' +
		'	</div>	' +
		'</div>' +
		'<span style="display:none" id="dpfulllistactiverow"></span>';
		
	var dpfulllistactiverow=null;
	if(!displaySearch)
	{
		dpfulllistactiverow = $('#dpfulllistactiverow').html();
	}
	var isotherrow = dpfulllistactiverow != null ? rowid != dpfulllistactiverow ? true : false : true; 
	if( $('#datapointrowfulldp_insert').is(':visible') && !isotherrow )
	{
		$('#datapointrowfulldp_insert').remove();	
	}
	else
	{
			//handle already open row of different datapoint - remove it first
		if( isotherrow )
			$('#datapointrowfulldp_insert').remove();
		
		if(displaySearch)
		{
			currow.after('<tr id="datapointrowfulldp_insert"><td colspan="100%">' + search_datapoint_area + '</td></tr>');	
		}
		else
		{
			currow.after('<tr id="datapointrowfulldp_insert"><td colspan="100%">' + datapoint_area + '</td></tr>');	
		}
		createAccordianMenu('#iws2_fulldp_category_list_entries','#collapse_all_fulldp','#expand_all_fulldp');
		if(displaySearch == true && searchCriteria !=null){	
			$("[name=searchCriteria2]").filter("[value="+searchCriteria+"]").prop("checked",true);
			$('#iws2_fulldp_search_status').html('<div id="iws2_fulldp_search_status_box" style="display:block;">List is Filtered</div>');
			fullDPSearchCriteria =true;
		}
	}	
}

function getThumbnailBorderStyle(pageId)
{
	// Get the page Json Id
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			pageJsonId = i;
		} 
	}
	// Retrieve the active page object.
	var page = objCase.pages[pageJsonId];

	// Check different cases ...
	var pageDate = new Date(page.documentDate)
	var dateCompare = new Date('1900/01/01 01:00:00');
	var docnum = page.subDocumentOrder;
	var pagenum = page.subDocumentPageNumber;

	var tstyle = "";
	if(docnum>=9999)
	{
		tstyle += '1px darkgrey solid';
	} else if (page.suspendNote != null & page.suspendNote != '') {	
		tstyle += '1px yellow solid';
	} else if (page.completed == true || page.completed == 'true') {
		tstyle += '1px green solid';
	} else if (((page.subDocumentOrder != 9999 && page.subDocumentOrder != '9999') || page.isBadHandwriting == true || page.isBadHandwriting == 'true' || pageDate > dateCompare || page._docType.id > 0 || page.orientation != 0) && page.deleted != true && page.deleted != 'true') {
		tstyle += '1px green dashed';
	} else {
		tstyle += '1px black solid';
	}
	
	return tstyle;
}

function setLoadingOfDPFormOn(){
	isloaddpform = true;
}

function setLoadingOfDPFormOff(){
	isloaddpform = false;
}

/*

// temprary- need to shift this //
$('#icd10_hierarchy').click(function(){
    loadHierarchyPopUpWindow();
});
*/



// Need to shift - Loading hierarchy pop-up Window
/**  loadHierarchyWindow()
 *   
 *   Will load the Hierarchy Pop Up window
 */
function loadHierarchyPopUpWindow(codeName,qa1DpRowcounter,masterCodeId,sectionRange,pageNumber,pageId,dpEntryId,dpDate,dpLegendValue,CurrentUpdatedObject){
    //get current user Updated object 
  var updatedObj=getUpdatedDataFieldObj(CurrentUpdatedObject);
  codeToBeSearch = codeName;
  qa1rowcounter = qa1DpRowcounter;
  currentDpRowOpenId = masterCodeId;
  currentDpRowSectionRange = sectionRange;
  currentDpRowPageNumber = pageNumber;
  currentDpRowPageId = pageId;
  currentDpRowEntryId = dpEntryId;
  currentDpRowDataDate = dpDate;
  currentDpRowLegendValue = dpLegendValue;
  //encode User Updated object  
  currentUpdatedObject = encodeURIComponent(JSON.stringify(updatedObj)).replace(/'/g, "\\'");
  // Obtain the client specific Data Point Categories
  if(objDPInfo == undefined || objDPInfo.length == 0)
  getDataPointCategoriesInfo();
    
  if (typeof(hierarchyPopUpWindow) != 'undefined'){
	  hierarchyPopUpWindow.close();
	  }
  var cwidth = lhsWidth - (lhsWidth/4);
  if (cwidth < 1050)
	  cwidth = 1050;
  var cheight = lhsHeight - (lhsHeight/4);
  hierarchyPopUpWindow = window.open("hierarchy_popup","hierarchy_popup","width=" + cwidth + ",height=" + cheight + ",scrollbars=1,top=0,left=0");
  
}  

function getCodeToBeSearch(){
  return codeToBeSearch;
}

function getUpdatedDataFieldObj(preObj)
{
    var preObj=JSON.parse(decodeURIComponent(preObj));
    var icd10obj = new ObjICD10SubCategoryScreen();
    
    icd10obj.dataFieldLabel = preObj.dataFieldLabel;
    
/*
    icd10obj.dataFieldLabel1 = preObj.dataFieldLabel1;
    icd10obj.dataFieldLabel2 = preObj.dataFieldLabel2;
    icd10obj.dataFieldLabel3 = preObj.dataFieldLabel3;
    icd10obj.dataFieldLabel4 = preObj.dataFieldLabel4;
    icd10obj.dataFieldLabel5 = preObj.dataFieldLabel5;
    icd10obj.dataFieldLabel6 = preObj.dataFieldLabel6;
    icd10obj.dataFieldLabel7 = preObj.dataFieldLabel7;
    icd10obj.dataFieldLabel8 = preObj.dataFieldLabel8;
*/


    icd10obj.dataFieldLabelType = preObj.dataFieldLabelType;
    icd10obj.selvalue=preObj.selvalue;
/*
    
    
    icd10obj.dataFieldLabel1Type = preObj.dataFieldLabel1Type;
    icd10obj.dataFieldLabel2Type = preObj.dataFieldLabel2Type;
    icd10obj.dataFieldLabel3Type = preObj.dataFieldLabel3Type;
    icd10obj.dataFieldLabel4Type = preObj.dataFieldLabel4Type;
    icd10obj.dataFieldLabel5Type = preObj.dataFieldLabel5Type;
    icd10obj.dataFieldLabel6Type = preObj.dataFieldLabel6Type;
    icd10obj.dataFieldLabel7Type = preObj.dataFieldLabel7Type;
    icd10obj.dataFieldLabel8Type = preObj.dataFieldLabel8Type;
*/
    
    var dataFieldValue = new Array();
    
    
   /*
    var dataField1Value, dataField2Value, dataField3Value, dataField4Value, dataField5Value, dataField6Value, dataField7Value, dataField8Value;
       dataField1Value= dataField2Value= dataField3Value= dataField4Value= dataField5Value= dataField6Value= dataField7Value= dataField8Value= null;*/
   
    
    var dpEntryId=preObj.dpEntryId;
    
    for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {
    	var counterId = i+1;
        if($('#iws2_dp_cat' + counterId + '_input_'+ dpEntryId).html()!=null)
            dataFieldValue[i]= $('#iws2_dp_cat' + counterId + '_input_'+ dpEntryId).val();
        if($('#iws2_dp_datepicker_'+ counterId +'_'+dpEntryId  +'_'+ icd10obj.selvalue.replace(/\./g,'-')).html()!=null)
            dataFieldValue[i]= $('#iws2_dp_datepicker_'+ counterId +'_'+dpEntryId  +'_'+ preObj.selvalue.replace(/\./g,'-')).val();
    }
    
   /*
    if($('#iws2_dp_cat1_input_'+ dpEntryId).html()!=null)
              dataField1Value= $('#iws2_dp_cat1_input_' + dpEntryId).val();
           if($('#iws2_dp_cat2_input_'+ dpEntryId).html()!=null)
              dataField2Value= $('#iws2_dp_cat2_input_'+ dpEntryId).val();
           if($('#iws2_dp_cat3_input_'+ dpEntryId).html()!=null)
              dataField3Value= $('#iws2_dp_cat3_input_'+ dpEntryId).val();
           if($('#iws2_dp_cat4_input_'+ dpEntryId).html()!=null)
              dataField4Value= $('#iws2_dp_cat4_input_'+ dpEntryId).val();
   
            // if DATAFIELD5 Exists then check for 6,7,8 datafields
            if (icd10obj.dataFieldLabel5 != null) {
              if($('#iws2_dp_cat5_input_' + dpEntryId).html() != null)
                dataField5Value = $('#iws2_dp_cat5_input_' + dpEntryId).val();
              if($('#iws2_dp_cat6_input_' + dpEntryId).html() != null)
                dataField6Value = $('#iws2_dp_cat6_input_' + dpEntryId).val();
              if($('#iws2_dp_cat7_input_' + dpEntryId).html() != null)
                dataField7Value = $('#iws2_dp_cat7_input_' + dpEntryId).val();
              if($('#iws2_dp_cat8_input_' + dpEntryId).html() != null)
                dataField8Value= $('#iws2_dp_cat8_input_' + dpEntryId).val();
            }*/
   
 
        //    map['_medicalHierarchy'] = codeId;
        // Capture DataField Legend Text Values if any..
        
        
    for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {    
        var counterId = i+1;
        if($('#iws2_dp_legend' + counterId + 'Lovs_' + dpEntryId).html() != null)
            if(preObj.dataFieldLabel[i].toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_' + counterId + '_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_'+ counterId + '_' + dpEntryId).val() != null)) {
                if($('#iws2_dp_range_high_input_' + counterId + '_' + dpEntryId).val() == "")
                  dataFieldValue[i] = $('#iws2_dp_range_low_input_' + counterId + '_' + dpEntryId).val().trim();
                else
                  dataFieldValue[i] = $('#iws2_dp_range_low_input_'+ counterId + '_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_' + counterId + '_' + dpEntryId).val().trim();
            } else if(preObj.dataFieldLabel[i].toLowerCase() == 'units') 
                dataFieldValue[i] = $('#iws2_dp_Units' + counterId + '_text_input_' + dpEntryId).val().trim();
        else
          dataFieldValue[i] = $('#iws2_dp_legend' + counterId + 'Lovs_' + dpEntryId + ' :selected').text().trim();
    } 
        
  /*
    if($('#iws2_dp_legend1Lovs_' + dpEntryId).html() != null)
        if(preObj.dataFieldLabel1.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_1_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_1_' + dpEntryId).val() != null)) {
          if($('#iws2_dp_range_high_input_1_' + dpEntryId).val() == "")
           dataField1Value = $('#iws2_dp_range_low_input_1_' + dpEntryId).val().trim();
          else
            dataField1Value = $('#iws2_dp_range_low_input_1_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_1_' + dpEntryId).val().trim();
        } else if(preObj.dataFieldLabel1.toLowerCase() == 'units') 
            dataField1Value = $('#iws2_dp_Units1_text_input_' + dpEntryId).val().trim();
          else
            dataField1Value = $('#iws2_dp_legend1Lovs_' + dpEntryId + ' :selected').text().trim();
  
              
          
      if($('#iws2_dp_legend2Lovs_' + dpEntryId).html() != null)
        if(preObj.dataFieldLabel2.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_2_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_2_' + dpEntryId).val() != null)) {
          if($('#iws2_dp_range_high_input_2_' + dpEntryId).val() == "")
           dataField2Value = $('#iws2_dp_range_low_input_2_' + dpEntryId).val().trim();
          else
            dataField2Value = $('#iws2_dp_range_low_input_2_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_2_' + dpEntryId).val().trim();
        } else if(preObj.dataFieldLabel2.toLowerCase() == 'units')
           dataField2Value = $('#iws2_dp_Units2_text_input_' + dpEntryId).val().trim();
          else
            dataField2Value = $('#iws2_dp_legend2Lovs_' + dpEntryId + ' :selected').text().trim();
  
              
      
      if($('#iws2_dp_legend3Lovs_' + dpEntryId).html() != null)
        if(preObj.dataFieldLabel3.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_3_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_3_' + dpEntryId).val() != null)) {
          if($('#iws2_dp_range_high_input_3_' + dpEntryId).val() == "")
           dataField3Value = $('#iws2_dp_range_low_input_3_' + dpEntryId).val().trim();
          else
           dataField3Value = $('#iws2_dp_range_low_input_3_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_3_' + dpEntryId).val().trim();
        } else if(preObj.dataFieldLabel3.toLowerCase() == 'units')
            dataField3Value  = $('#iws2_dp_Units3_text_input_' + dpEntryId).val().trim();
          else
           dataField3Value  = $('#iws2_dp_legend3Lovs_' + dpEntryId + ' :selected').text().trim();
  
              
          
      if($('#iws2_dp_legend4Lovs_' + dpEntryId).html() != null)
        if(preObj.dataFieldLabel4.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_4_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_4_' + dpEntryId).val() != null)) {
          if($('#iws2_dp_range_high_input_4_' + dpEntryId).val() == "")
            dataField4Value = $('#iws2_dp_range_low_input_4_' + dpEntryId).val().trim();
          else
            dataField4Value = $('#iws2_dp_range_low_input_4_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_4_' + dpEntryId).val().trim();
        } else if(preObj.dataFieldLabel4.toLowerCase() == 'units')
            dataField4Value = $('#iws2_dp_Units4_text_input_' + dpEntryId).val().trim(); 
          else
            dataField4Value = $('#iws2_dp_legend4Lovs_' + dpEntryId + ' :selected').text().trim();
  
  
   // if DATAFIELD5 Exists then check for 6,7,8 datafields
      if (icd10obj.dataFieldLabel5 != null) {
        if($('#iws2_dp_legend5Lovs_' + dpEntryId).html() != null)
            if(preObj.dataFieldLabel5.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_5_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_5_' + dpEntryId).val() != null)) {
              if($('#iws2_dp_range_high_input_5_' + dpEntryId).val() == "")
                dataField5Value = $('#iws2_dp_range_low_input_5_' + dpEntryId).val().trim();
              else
               dataField5Value = $('#iws2_dp_range_low_input_5_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_5_' + dpEntryId).val().trim();
            } else if(preObj.dataFieldLabel5.toLowerCase() == 'units')
               dataField5Value = $('#iws2_dp_Units5_text_input_' + dpEntryId).val().trim();  
            else
               dataField5Value = $('#iws2_dp_legend5Lovs_' + dpEntryId + ' :selected').text().trim();
            
            // DATAFIELD 6, 7, 8
            if($('#iws2_dp_legend6Lovs_' + dpEntryId).html() != null)
              if(preObj.dataFieldLabel6.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_6_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_6_' + dpEntryId).val() != null)) {
                if($('#iws2_dp_range_high_input_6_' + dpEntryId).val() == "")
                  dataField6Value = $('#iws2_dp_range_low_input_6_' + dpEntryId).val().trim();
                else
                   dataField6Value = $('#iws2_dp_range_low_input_6_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_6_' + dpEntryId).val().trim();
              } else if(preObj.dataFieldLabel6.toLowerCase() == 'units')
                 dataField6Value = $('#iws2_dp_Units6_text_input_' + dpEntryId).val().trim();
              else
                 dataField6Value = $('#iws2_dp_legend6Lovs_' + dpEntryId + ' :selected').text().trim();
      
            if($('#iws2_dp_legend7Lovs_' + dpEntryId).html() != null)
              if(preObj.dataFieldLabel7.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_7_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_7_' + dpEntryId).val() != null)) {
                if($('#iws2_dp_range_high_input_7_' + dpEntryId).val() == "")
                  dataField7Value = $('#iws2_dp_range_low_input_7_' + dpEntryId).val().trim();
                else
                  dataField7Value = $('#iws2_dp_range_low_input_7_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_7_' + dpEntryId).val().trim();
              } else if(preObj.dataFieldLabel7.toLowerCase() == 'units')
                dataField7Value = $('#iws2_dp_Units7_text_input_' + dpEntryId).val().trim();
              else
                dataField7Value = $('#iws2_dp_legend7Lovs_' + dpEntryId + ' :selected').text().trim();
      
            if($('#iws2_dp_legend8Lovs_' + dpEntryId).html() != null)
              if(preObj.dataFieldLabel8.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_8_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_8_' + dpEntryId).val() != null)) {
                if($('#iws2_dp_range_high_input_8_' + dpEntryId).val() == "")
                  dataField8Value = $('#iws2_dp_range_low_input_8_' + dpEntryId).val().trim();
                else
                  dataField8Value = $('#iws2_dp_range_low_input_8_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_8_' + dpEntryId).val().trim();
              } else if(preObj.dataFieldLabel8.toLowerCase() == 'units')
                dataField8Value = $('#iws2_dp_Units8_text_input_' + dpEntryId).val().trim();
              else
                dataField8Value = $('#iws2_dp_legend8Lovs_' + dpEntryId + ' :selected').text().trim();
                
     }*/
  
   //set multiValueCombo values into map
         for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {    
              var counterId = i+1;
              if($('#iws2_dp_legend'+ counterId + 'Combo_' + dpEntryId).html() != null){
                 var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend' + counterId +'Combo_' + dpEntryId);
                 if(multiSelectValue!=null)
                   dataFieldValue[i]=multiSelectValue;
              }

         }




         /*
           if($('#iws2_dp_legend1Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend1Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField1Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend2Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend2Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField2Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend3Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend3Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField3Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend4Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend4Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField4Value=multiSelectValue;
                       }
                 // if DATAFIELD5 Exists then check for 6,7,8 datafields
                 if (icd10obj.dataFieldLabel5 != null) {
                    if($('#iws2_dp_legend5Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend5Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField5Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend6Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend6Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField6Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend7Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend7Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField7Value=multiSelectValue;
                       }
                    if($('#iws2_dp_legend8Combo_' + dpEntryId).html() != null)
                       {
                          var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend8Combo_' + dpEntryId);
                          if(multiSelectValue!=null)
                            dataField8Value=multiSelectValue;
                       }
                 }*/
         
     
    icd10obj.dataFieldValue = dataFieldValue;
/*
        
    icd10obj.dataField1Value = dataField1Value;
    icd10obj.dataField2Value = dataField2Value;
    icd10obj.dataField3Value = dataField3Value;
    icd10obj.dataField4Value = dataField4Value;
    icd10obj.dataField5Value = dataField5Value;
    icd10obj.dataField6Value = dataField6Value;
    icd10obj.dataField7Value = dataField7Value;
    icd10obj.dataField8Value = dataField8Value;
*/
    
    // Allows for users to provide feedback, issues or suggestions to business and system team.
        var userFeedback=null;
        var systemError = $('#iws2_dp_system_issue_' + dpEntryId + '_' + preObj.selvalue).val();   
        if (systemError != null || systemError != "" || systemError != undefined) 
            userFeedback = systemError;
    icd10obj.userFeedback=userFeedback;
     var suspendnote=null;
     suspendnote = $('#iws2_dp_suspendNote_' + dpEntryId + '_' + preObj.selvalue.replace(/\./g,'-')).val();
    
    
    icd10obj.suspendnote = suspendnote;
    
    var dataDate=null;
    if($('#iws2_dp_datepicker_' + dpEntryId + '_' + preObj.selvalue.replace(/\./g,'-')).val() != undefined)
      dataDate =$('#iws2_dp_datepicker_' + dpEntryId + '_' + preObj.selvalue.replace(/\./g,'-')).val();
      
    icd10obj.dataDate=dataDate;
    
    var sectionNumber=$('#iws2_subc_input_pagesection_' +dpEntryId).val();
     
    icd10obj.sectionNumber = sectionNumber;
   
    //icd10obj.revision = revision;
    
    icd10obj.isCritical=preObj.isCritical;
    icd10obj.codeScale=preObj.codeScale;
    icd10obj.hidPrevious=preObj.masterId;
    icd10obj.qcaiCodeViewdesc = preObj.qcaiCodeViewdesc;
    icd10obj.hidPrevCode = preObj.hidPrevCode;
    
    return icd10obj;
}

