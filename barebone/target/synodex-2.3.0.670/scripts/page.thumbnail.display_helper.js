/* 
File: page.thumbnail.display_helper.js
Responsible for all thumbnail actions.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>
- Step 4 LHS - <step4_popup.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: displayThumbnails()
Retrieve, store and display the page thumbnails and associated page data.  Also updates case information.

Page Actions:
- Step 1 RHS Document Ready
- Step 1 RHS Sort
- Step 1 RHS Update Page and Sort True
- Step 1 RHS Updates Page and Sort True
- Step 2 RHS Document Ready
- Step 2 RHS Sort
- Step 2 RHS Update Page and Sort True
- Step 2 RHS Updates Page and Sort True

Called Functions:
- checkDocumentOrder()
- <updateScreenOnFooter(oCase)> - No Reorder Only
- <addThumbnail(page, i)>
- <thumbnailClickHandler(pageId, pageDomId)> - Active Page Only
- <getMainInfo(objCase)> - show RHS help/info
- <addDocumentTypes(docTypeGroup)>
*/
function displayThumbnails() {
	
	$('#global_thumbnail_wrapper').html('<div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div>');
	
	// If a sort and filter is not defined in the querysting, default them.
	if (!sortString) {
		sortString = 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc';
	}
	if (!filterString) {
		filterString =  'nofilter';
	}
	if(step == 2){
		sortString = 'date_documentDate_desc';
		$('#page_sort').val(sortString);
		$('#page_sort').attr("disabled", true);
		
        if( qsStageId == 71 && filterString == 'nofilter') {
            var assignedDocTypes = getDocTypesForPOP();
            if( assignedDocTypes == "All") {
                $("#page_filter option[value='assigneddoctypes']").remove();
            }else{
               filterString= "assigneddoctypes";
            }
        }

	}
	
	if(step == 1 && qsStageId == 4){
	//IWN-230-Case/Step "Complete" button should appear as grayed-out/inactive
		//$('#completeStep').remove();
	}
	
	$.ajax({
		url: "sortcases/" + caseId + "/" + sortString + "/" + filterString +"/"+ qsStageId ,
		context: document.body,
		success: function(c){
			$('#global_thumbnail_wrapper').html('');
			
			var sort;
			var str = ""+window.location+"";
			if (str.indexOf("=")>0)	{
				sort = str.substring(str.indexOf("=")+1);
			}
			var searchString = window.location.search.substring(sort);

			// Add case to global variable so we can always retrieve it.
			objCase = c;
			if(step == 1){
				
				var isAnySuspendedPage = false;
				var processedPagesCount = 0;
				for (i=0; i < objCase.pages.length; i++) {
					if (objCase.pages[i].completed == true || objCase.pages[i].completed == 'true' || objCase.pages[i].deleted == true || objCase.pages[i].deleted == 'true') {
						processedPagesCount++;
					}
					if(objCase.pages[i].suspendNote != null && objCase.pages[i].suspendNote != ''){
					      isAnySuspendedPage = true;
					}
				}
				if (processedPagesCount == objCase.pages.length && step == 1 && isAnySuspendedPage != true) {
					$('#completeStep').attr("disabled", false);
				}else{
					$('#completeStep').attr("disabled", true);
				}
				
			}
			
			if(c.languageId != c._client.defaultLanguageId){
				$.ajax({
					type: "POST",
				  	url: "dataPoint/dataPointLanguage/" + c.languageId,
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
						displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
					}
				});
			}
			
			if (step == 2) {
				// Call the below method after the objCase has been initialized.
				showDPHeaderInfo('cntnr_dplist_header_main');
				setMaxSectionsPerSelection(objCase._client.clientid);
			}
			
			// Check the document order for inconsistancies.
			var reorder = checkDocumentOrder();
			
			//var reorder = false; // DEBUG ONLY!!!  USE THIS TO STOP A LOOP IN CASE OF PAGE ORDERING ISSUE.  RUN checkPageOrder(documentId) TO FIX.
			
			if (reorder != true) {
				//set screen name on footer
				updateScreenOnFooter(objCase);
				
				// Set the date format to a global variable.
				if(c.languageId == c._client.defaultLanguageId){
				clientDateFormat = c._client.defaultDateFormat;
				}
				//alert (clientDateFormat);
							
				if (step != 4 && step != 3) {
					//IWS-220:The last document being processed in a case gets reset to Document #1 when it is refiltered/sorted.

					// Check added to not to allow the system to reset the prev Doc/Page number = 0 in case of re-filtering/Sorting.
					if(filterString == 'nofilter' && sortString == 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc'){
						// Set the document/page counter global variables to 0 so we can increment as needed. 
						prevDocumentNumber = 0;
						prevPageNumber = 0;

					}		
										
					var pageLoadDebug = debug.indexOf("p");
					var imageLoadDebug = debug.indexOf("i");
					
					// Loop through the pages and display the thumbnails.
					for (var i = 0; i < c.pages.length; i++) {
						// Display the page thumbnail.
						addThumbnail(c.pages[i], i);

						// Check for debug parameters to save page load time.
						// Page load time assumes the page images will be the last elements loaded on the page.
						if (pageLoadDebug != -1) {
							// Putting a load handler on the thumbnail image DOM element allows us to set the global date when each of the pages are finished loading.
							// Doing this guarantees the last variable override is the last image loading.
							$('#' + c.pages[i].id).load(function() {
								setPageStopLoadTime();
							});
						}

						// Calculate the next document/page numbers and store them to their global variables.
						if (c.pages[i].subDocumentOrder > prevDocumentNumber && c.pages[i].subDocumentOrder != 9999 && c.pages[i].subDocumentOrder != '9999') {
							prevDocumentNumber = c.pages[i].subDocumentOrder;
							prevPageNumber = c.pages[i].subDocumentPageNumber;
						} else if (c.pages[i].subDocumentOrder == prevDocumentNumber) {
							if (c.pages[i].subDocumentPageNumber > prevPageNumber) {
								prevPageNumber = c.pages[i].subDocumentPageNumber;
							}
						}
					} 
					
					// Check for debug parameters to save image load time. We pass the first image and the function takes care of the rest.
					if (imageLoadDebug != -1 && pageLoadDebug == -1) {
						setTotalImageSize(objCase.pages[0].spContentID);
					}

					// We do not need the datapoint category info for step 1 or 4.
					if (step != 1 && step != 4) {
						var timer = new ObjTimer();
						var pagecnt = c.pages.length;

						if(pagecnt>25)
							popupFadeAwayMsg("Loading medical hierarchy data for case " + objCase.id,null,100000);

						// Obtain the client specific Data Point Categories
						$.ajax({
							url: "dataPoint/dataPointInfo/" + objCase.id,
							//url: "dataPoint/dataPointInfo/" + objCase.id + "/Both/neoplasm", 
							async:   true,
							context: document.body,
							success: function(d) {
								objDPInfo = d;

								//IWN:237-When the case loads, the load window indicated more DP's being loaded than actually are present in the Case
								//var msg = objDPInfo.length + " datapoints were loaded in " + timeelapsed + " seconds....";
								var msg = "Medical hierarchy was loaded in " + timer.getElapseSeconds() + " seconds";

								if(pagecnt>25)
									popupFadeAwayMsg(msg,"#00EE00",4000);
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
								displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
							}
						});
					}
					
					// If there is an active page id, click the thumbnail.
					if (activePageId) {
						thumbnailClickHandler(activePageId, activePageDomId);
					}
					if (step == 1)
						getMainInfo();
				}
			}
						
			//Show Client and Case ID on RHS			
			$('#client_id').html(objCase._client.clientid);
			$('#case_id').html(objCase.id);
			$('#textualDate').html(clientDateFormat);
			if (clientDateFormat  == 'mm/dd/yyyy') 
				$('#flagid').html(' <img src=\"images/US-flag.png\" height=\"20" width=\"20\"> '); 
			if (clientDateFormat  == 'dd/mm/yyyy') 
				$('#flagid').html(' <img src=\"images/UK-flag.png\" height=\"20\" width=\"20\"> '); 
			//START Initialize the date picker. for step1
			 if (clientDateFormat == 'mm/dd/yyyy')
				 $( "#datepicker"  ).datepicker({ 
						dateFormat: 'mm/dd/yy',
						showOn: "button",
						buttonImage: "images/calendar.gif",
						buttonImageOnly: true,
						constrainInput: false
					 }).blur(function() {
						    var txt = $(this).val();
						    $(this).val(txt.replace(/-\.| /g, '/'));

					}); 
			else
				 $( "#datepicker"  ).datepicker({ 
					dateFormat: 'dd/mm/yy',
					showOn: "button",
					buttonImage: "images/calendar.gif",
					buttonImageOnly: true,
					constrainInput: false
				 }).blur(function() {
					    var txt = $(this).val();
					    $(this).val(txt.replace(/-\.| /g, '/'));

				}); 
			//END Initialize the date picker. for step1

			// Load the document types and subtypes.
			if (objDocTypes == null){
				$.ajax({
				  	url: "document_types/"+ objCase._client.groupid,
				  	context: document.body,
				  	success: function(d) {
				  		addDocumentTypes(d);
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
						displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
					}
				});
			}
			//setStep2Screen(null);
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "displayThumbnails()", errorThrown, false);
		}
	});		
}


/*
Function: getClientDateFormat(c) 
Returns the client's default date format.

Parameters:
c - The case object.
*/
function getClientDateFormat(c) {
	return c._client.defaultDateFormat;
}

/*
Function: addThumbnail(page, i)
Adds a thumbnail to the UI.

Parameters:
page - The page object.
i - The array id.

Page Actions:
- See displayThumbnails().

Called Functions:
- <processThumbnailBorder(pageId)>
*/
function addThumbnail(page, i) {
	// Get the jsp locale variables
	var messageNotExcluded = text.synodex.not_excluded_message;
	i++;

	// Get the thumbnail from UCM.
	thumbnailHtml = '<div class=\"thumbnail_wrapper\">';
	thumbnailHtml += 	'<div id=\"thumb' + page.id + '\" class=\"thumbnail_image_wrapper\">';
	thumbnailHtml += 		'<img id=\"' + page.id + '\" src=\"ucm/getFile?contentId=' + page.spContentID + '&rendition=thumbnail\" style=\"width: 212px; height:300px;\" onclick=\"javascript:thumbnailClickHandler(\'' + page.id + '\',\'' + i + '\');\" />';
	thumbnailHtml += 	'</div>';
	   //IWO-15 In Step2-OP remove vestigial "Exclude" and "Not Excluded" selectors and from filters
	if(step === 1){
	    thumbnailHtml +=   '<div  class=\"thumbnail_exclude\"><select ';
	
	

	// Disable the excluded control if the thumbnail is completed or suspended.
	if (page.suspendNote != null || page.completed == 'true' || page.completed == true) {
		thumbnailHtml += 'disabled=\"disabled\"';
	}

	thumbnailHtml += 			' id=\"exclude' + page.id + '\" onchange=\"updateExclude(' + page.id + ')\">';
	
	if(qsStageId!=6 && qsStageId!=66 && qsStageId!=67 && qsStageId!=68 && qsStageId != 71) //IWN-382: 3-way split of Step-2-OP
		thumbnailHtml += 		'<option>' + messageNotExcluded + '</option>';
	
	thumbnailHtml += 		'<option ';
	// Select the correct excluded option list value.
	 if(excludePageRegionObject !=null){
			
			for(i=0;i<excludePageRegionObject.length;i++){
				
				if (page.deleteReason == excludePageRegionObject[i].lovValue) 
				{
					thumbnailHtml += 		'selected=\"selected\"';
				}
				//IWO-15 In Step2-OP remove vestigial "Exclude" and "Not Excluded" selectors and from filters
				if(qsStageId==6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71) { //IWN-382: 3-way split of Step-2-OP
                    if(excludePageRegionObject[i].lovValue.indexOf("Exclude")==-1)
                       thumbnailHtml +=            ' value=\"' + excludePageRegionObject[i].lovValue + '\">' + excludePageRegionObject[i].lovValue + '</option>';
                   }
				else
				    thumbnailHtml +=            ' value=\"' + excludePageRegionObject[i].lovValue + '\">' + excludePageRegionObject[i].lovValue + '</option>';
				
				if(i != excludePageRegionObject.length-1){
					
				 thumbnailHtml += 		'<option ';
				}
				
			}
			
		}
	
	 thumbnailHtml += 	'</select></div>';
      }

		// Only show the rotation buttons if the page is not complete, suspended or excluded.
		thumbnailHtml +=	'<div style=\"width:32px; float:right; padding: 5px 6px 0px 0px;\">';
		if (page.completed != true && page.completed != 'true' && page.deleted != true && page.deleted != 'true') {
			thumbnailHtml += 	'<div style=\"float:left;\" class=\"ui-icon ui-icon-arrowreturnthick-1-w gzoombutton rotateleft' + page.id + '\" onClick=\"javascript:rotateThumbnailHandler(\'' + page.id + '\',\'left\');">&nbsp;</div>';
			thumbnailHtml += 	'<div style=\"float:right;\" class=\"ui-icon ui-icon-arrowreturnthick-1-e gzoombutton rotateright' + page.id + '\" onClick=\"javascript:rotateThumbnailHandler(\'' + page.id + '\',\'right\');">&nbsp;</div>';
		} else {
			thumbnailHtml += 	'<div style=\"display:none;\" class=\"ui-icon ui-icon-arrowreturnthick-1-w gzoombutton\" rotateleft' + page.id + '\" onClick=\"javascript:rotateThumbnailHandler(\'' + page.id + '\',\'left\');">&nbsp;</div>';
			thumbnailHtml += 	'<div style=\"display:none;\" class=\"ui-icon ui-icon-arrowreturnthick-1-e gzoombutton\" rotateright' + page.id + '\" onClick=\"javascript:rotateThumbnailHandler(\'' + page.id + '\',\'right\');">&nbsp;</div>';
		}
		thumbnailHtml +=	'</div>';

		thumbnailHtml += 	'<br style=\"clear: left;\" />';
		if(step == 1)//IWO-15 In Step2-OP remove vestigial "Exclude" and "Not Excluded" selectors and from filters ::set top pix based on bottom filter hide and show
		thumbnailHtml +=  '<div id=\"thumbnail_numbering_wrapper' + page.id + '\" class=\"thumbnail_numbering_wrapper\">';
		else
		thumbnailHtml +=  '<div id=\"thumbnail_numbering_wrapper' + page.id + '\" class=\"thumbnail_numbering_wrapper\" style=\" top:-105px;\">';
		
		thumbnailHtml +=  '<a onclick=\"movePage(' + page.id + ');\" style=\"color: black; font-weight: bold; cursor: pointer;\">';
		thumbnailHtml += 		'Doc: <span id=\"thumbnail_document_number_' + page.id + '\">';
		
		// Check if the document number is 9999 and display a _ instead
		if (page.subDocumentOrder == 9999 || page.subDocumentOrder == '9999') {
			thumbnailHtml += "_";
		} else {
			thumbnailHtml += page.subDocumentOrder;
		}

		thumbnailHtml += 	'</span> Sub Pg: <span id=\"thumbnail_page_number_' + page.id + '\">';
		
		// Check if the page number is 0 and display a _ instead
		if (page.subDocumentPageNumber == 0 || page.subDocumentPageNumber == '0') {
			thumbnailHtml += "_";
		} else {
			thumbnailHtml += page.subDocumentPageNumber;
		}
		thumbnailHtml += '</span>';
		if(page.finalPageNumber != null && page.finalPageNumber != "" && page.finalPageNumber != 0){
		  thumbnailHtml +=  '</span> Final Pg: <span id=\"thumbnail_final_page_number_' + page.finalPageNumber + '\">';
    
	      // Check if the page number is 0 and display a _ instead
	      if (page.finalPageNumber == 0 || page.finalPageNumber == '0') {
	        thumbnailHtml += "_";
	      } else {
	        thumbnailHtml += page.finalPageNumber;
	      }
	      /*
		  thumbnailHtml +=  '</span> Doc Type: <span id=\"thumbnail_doc_type_' + page.subDocumentOrder + '_' + page.subDocumentPageNumber + '\">';
		  if(page._docType.name != null){
			  thumbnailHtml += page._docType.name;
		  }else{
			  thumbnailHtml += "_";
		  }*/
		}
		
		if (page.subDocumentOrder == 9999 || page.subDocumentOrder == '9999') {
			thumbnailHtml +=  '<br/></span> Doc Date: <span id=\"thumbnail_doc_date_' + page.id + '\">';
		}else{
			thumbnailHtml +=  '</span><br/> Doc Date: <span id=\"thumbnail_doc_date_' + page.subDocumentOrder + '_' + page.subDocumentPageNumber + '\">';
		}
		// Check if the Document date is not null and display a _ instead
		if(page.documentDate != null){
			  thumbnailHtml += millisToDateHandler(page.documentDate);
		}else{
			  thumbnailHtml += "_";
		}
		
		if (page.subDocumentOrder == 9999 || page.subDocumentOrder == '9999') {
			thumbnailHtml +=  '</span><br/> Doc Type: <span id=\"thumbnail_doc_type_' + page.id + '\">';
		}else{
			thumbnailHtml +=  '</span><br/> Doc Type: <span id=\"thumbnail_doc_type_' + page.subDocumentOrder + '_' + page.subDocumentPageNumber + '\">';
		}
		// Check if the Document Type is not null and display a _ instead
		if(page._docType.name != "Unspecified"){
			  thumbnailHtml += page._docType.name;
		}else{
			  thumbnailHtml += "Unspecified";
		}
		  
		thumbnailHtml += 	'</span></a></div>';
		
		thumbnailHtml += '</div>';

	// Add the thumbnail within the thumbnail wrapper.
	//IWO-15 In Step2-OP remove vestigial "Exclude" and "Not Excluded" selectors and from filters
	if((step == 2 && page.deleted == false) || step == 1){//Add only in step 2 if page deleted = false  
       $('#global_thumbnail_wrapper').append(thumbnailHtml);
	   }
	  // Rotate the thumbnail if necessary.
	if (page.orientation != null)
		$("#" + page.id).rotate({angle: page.orientation});

	if (page.deleted == true)
		$('#thumb' + page.id).block({message:null});

	// Process the thumbnail border.
	processThumbnailBorder(page.id);
}

/*
Function: thumbnailClickHandler(pageId, pageDomId)
Called when a thumbnail is clicked.

Parameters:
pageId - The id of the page.
pageDomId -The DOM id of the page, for highlighting purposes.

Page Actions:
- Step 1 LHS Left Arrow/Right Arrow Thumbnail Navigation Button Click
- Step 1 LHS Shift+Right Arrow/Shift+Left Arrow Thumbnail Navigation
- Step 1 RHS Shift+Right Arrow/Shift+Left Arrow Thumbnail Navigation
- Step 1 RHS Thumbnail Click
- Step 2 LHS Left Arrow/Right Arrow Thumbnail Navigation Button Click
- Step 2 LHS Shift+Right Arrow/Shift+Left Arrow Thumbnail Navigation
- Step 2 RHS Shift+Right Arrow/Shift+Left Arrow Thumbnail Navigation
- Step 2 RHS Thumbnail Click

Called Functions:
- <clearThumbnailHighlights()>
- <highlightThumbnail(pageId,color)>
- <updateMetadataPanel(pageId)>
- <updateContentViewer(pageId)>
*/
function thumbnailClickHandler(pageId, pageDomId) {
	//document.getElementById('txtPageId').value = pageId; 
	// Set the active page id. (GLOBAL)
	activePageId = pageId; 
	
	// Get and set the active page dom id. (GLOBAL)
	activePageDomId = pageDomId;
	
	// Get and set the active page sequencing id. (GLOBAL)
	var pageSeqIdCounter = 0;
	for (var i = 0; i < objCase.pages.length; i++) { 
		// Do not count a page that is excluded.
		if (objCase.pages[i].deleted != true && objCase.pages[i].deleted != 'true') {
			pageSeqIdCounter++;
			if (objCase.pages[i].id == pageId) {
				activePageSeqId = pageSeqIdCounter; // Set the active page DOM id.
			} 
		}
	}

	// Get and set the active page json id and the active page object. (GLOBAL)
	for (var i = 0; i < objCase.pages.length; i++) { 
		if (objCase.pages[i].id == pageId) {
			activePageJsonId = i;
			objActivePage = objCase.pages[i];
			if(step != 1){
				// Update IWS2 Page/Section ,header Info and re initalize categories/subcategories tree  
				if($('#iws2_datapoint_page')!=null || $('#iws2_datapoint_page')!= undefined){
					$('#iws2_datapoint_page').text(objActivePage.finalPageNumber);
					$('#iws2_datapoint_section').text("");
					// close selected code with DP details
					/*$('#codeTable').remove();
				    $('#searchResultsTable').find('input:checkbox:checked').attr('checked',false);
					selectedSectionNumber = null;*/
					showHeaderInfo();
					//createAccordianMenu('#iws2_category_list_entries','#collapse_all','#expand_all');
				}
			}
		} 
	}
	
	clearThumbnailHighlights(); // Clear highlights from all thumbnails.
	highlightThumbnail(pageId,'red'); // Highlight the active thumbnail.
	updateMetadataPanel(pageId); // Update the metadata panel.
	updateContentViewer(pageId); // Update the left window.
	// For Apex URL Hitting
	if (ssl == true || ssl == 'true') {
		buttonMainMenuApexUrl = "https://";
	} else {
		buttonMainMenuApexUrl = "http://";
	}
	buttonMainMenuApexUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + "5555" + ':' + apexSessionId;
	var div = document.getElementById('div1');
	div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + buttonMainMenuApexUrl + '" />';
	// For Apex URL Hitting
	
	//Reset selected object page and row info
	objselectedpagerow = null;
}

/*
Function: clearThumbnailHighlights()
Clears the previous active thumbnail border.

Page Actions:
- Step 1 RHS Exclude when Active
- Step 1 RHS Thumbnail Click
- Step 2 RHS Exclude when Active
- Step 2 RHS Thumbnail Click

Called Functions:
- <processThumbnailBorder(pageId)>
*/
function clearThumbnailHighlights() {
	$('#global_thumbnail_wrapper').children().each(
			function(){
				// Must perform an inner loop on the div elements so it does not change the class of the rotate controls.
				$(this).children().each(
					function(){
						if ($(this).attr('class') == 'thumbnail_image_wrapper active') {
							$(this).attr('class','thumbnail_image_wrapper');
							$(this).css('border-color','black');
							processThumbnailBorder($(this).children().attr('id'));
						}
				});
			});
}

/*
Function: processThumbnailBorder(pageId)
Process the border details of a thumbnail.

Parameters:
pageId - The id of the page to be processed.

Page Actions:
- Step 1 RHS Unexclude to Complete Confirm
- Step 1 RHS Display Thumbnail
- Step 1 RHS Clear Thumbnail Highlights
- Step 2 RHS Display Thumbnail
- Step 2 RHS Clear Thumbnail Highlights
*/
function processThumbnailBorder(pageId) {
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
	
	// Remove the background-color and transparency.  Enable it if needed.
	$('#thumb' + page.id).css('background-color','');
	$('#' + page.id).css('opacity','1');
	$('#' + page.id).css('filter','alpha(opacity=100)');
	
	if (page.suspendNote != null & page.suspendNote != '') {	
		$('#thumb' + page.id).css('border-color','yellow');
		$('#thumb' + page.id).css('border-style','solid');
		$('#thumb' + page.id).css('background-color','yellow');
		$('#' + page.id).css('opacity','.75');
		$('#' + page.id).css('filter','alpha(opacity=75)');
	} else if (page.completed == true || page.completed == 'true') {
		$('#thumb' + page.id).css('border-color','green');
		$('#thumb' + page.id).css('border-style','solid');
	} else if (((page.subDocumentOrder != 9999 && page.subDocumentOrder != '9999') || page.isBadHandwriting == true || page.isBadHandwriting == 'true' || pageDate > dateCompare || page._docType.id > 0 || page.orientation != 0) && page.deleted != true && page.deleted != 'true') {
		$('#thumb' + page.id).css('border-color','red');
		$('#thumb' + page.id).css('border-style','dashed');
	} else {
		$('#thumb' + page.id).css('border-color','black');
		$('#thumb' + page.id).css('border-style','solid');
	}
}

/*
Function: highlightThumbnail(imageId, color)
Highlight a specified thumbnail with a specified color.

Parameters:
imageId - The id of the page to be highlighted.
color - The highlight color.

Page Actions:
- Step 1 RHS Thumbnail Click
- Step 2 RHS Thumbnail Click
*/
function highlightThumbnail(imageId, color) {
	$("#" + imageId).parent().attr('class', 'thumbnail_image_wrapper active');
	$("#" + imageId).parent().css('border-color', color);
	$('#' + imageId).parent().css('border-style','solid');
}

/*
Function: handleThumbnailClickForToggle(section, entry, spContentID)
Open the data point entry update form in step 2.

Parameters:
section - The section of the data point entry.
entry - The entry object.
spContentID - The spContentId of the page.

Page Actions:
- Step 2 RHS Data Point Entry Table Entry Selection

Called Functions:
- <thumbnailClickHandler(pageId, pageDomId)>
- <displayDataPointEntry(section,flag,entry)>
*/
function handleThumbnailClickForToggle(section, entry, spContentID) {
	activeDPEntrySection = section;
	activeDPEntry = entry;
	
	// Decode the JSON string.
	var updateEntry =  JSON.parse(decodeURIComponent(entry));
	
	// Click the thumbnail so the objPage is available to the popup window.
	for (i=0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == updateEntry._page.id) {
			thumbnailClickHandler(updateEntry._page.id, i);
		}
	}
	
	if (leftWindow.document.readyState == 'complete') {
		//flag indicates that this is an update not a new datapoint entry.
		var flag = 1;
		
		//entry is an encoded json string of type DPENTRY
		leftWindow.displayDataPointEntry(section,flag,entry);
	}	
}

/*
Function: clearThumbnails()
Remove the thumbnails and all page data from the DOM.

Page Actions:
- Step 1 RHS Sort
- Step 2 RHS Sort
*/
function clearThumbnails() {
	$('.thumbnail_wrapper').remove();
}


/*
Function: getMainInfo(objCase)
Get the main RHS info/help 

Parameters:
- objCase - The case object with help information 

Page Actions:
- Step 1 RHS Document Ready
- Step 1 RHS Complete
- Step 1 RHS Exclude
- Step 2 RHS Document Ready
- Step 2 RHS Complete
- Step 2 RHS Exclude
- more..
*/
function getMainInfo() {
	if(step == 1){
		commonHelpInfo(objCase, '#sweep_r_header_case_help',  "Case Info...", true);
	}else{
		/*if (qsStageId == 49 || qsStageId == 48){
			commonHelpInfo(objCase, "#cntnr_dplist_header",  "Case Info...", true);
		}else{*/
			$('#client_spec_helptext_popup').html('<b style="color:mediumblue">Client Information</b><div onclick="helpTextClose();" style="float: right; padding-right: 0px; font-weight: bold; cursor:pointer; ">[ X ]</div><hr style="width:300px"/><ul>' +objCase._client.specs + "</ul>");
			$('#client_spec_helptext_popup').offset({left:700,top:100});
			$('#client_spec_helptext_popup').css('display','block');
			/*}else{
			if($('#sweep_r_wrapper_iws2_dplist').css('display') == 'block')
				commonHelpInfo(objCase, "#sweep_r_wrapper_iws2_dplist",  "Case Info...", true);
			else if ($('#sweep_r_wrapper_iws2_dpentry').css('display') == 'block')
				commonHelpInfo(objCase, "#sweep_r_wrapper_iws2_dpentry",  "Case Info...", true);
			else
				commonHelpInfo(objCase, "#dp_header_client_spec",  "Case Info...", true);
		}*/
	}
}

/*
Function: usePageResetDate()
Reset the current page data date to the data point entry dialog in step 1.

Page Actions:
- Step 1 RHS Data Point Entry Dialog Use Reset Page Date Button Click

Called Functions:
- <millisToDateHandler(millis)>
*/
function usePageResetDate() {
	//var pageDateMillis = objPage.documentDate;
	//var pageDate = millisToDateHandler(pageDateMillis);
	$('#datepicker').attr('value',"");
	$('#datepicker').focus();
}
/*
Function: previousDPDate()
Add the previous DP data date to the data point entry dialog in step 2.

Page Actions:
- Step 2 RHS Data Point Entry Dialog Previous DP Date Button Click

*/
function prevDate()
{
	if(lastdate!=null){
		$('#datepicker').attr('value',lastdate);
		var dateCheck = checkDateFormat($('#datepicker').val());
		if (dateCheck == true) {
			// Convert the date to millis.
			newDocumentDate = dateToMillisHandler($('#datepicker').val());
			// Get the active document number.
			var activeSubDocumentOrder = objCase.pages[activePageJsonId].subDocumentOrder;

			// Only update the active page if the page does not have a document number.
			if (activeSubDocumentOrder == 9999 && activeSubDocumentOrder == '9999') {
				// Update the case object.
				objCase.pages[activePageJsonId].documentDate = newDocumentDate;

				// Update the DB without sorting.
				updatePage(objCase.pages[activePageJsonId], false, 0);
			} else {
				// Create an update array used to do a mass update of the pages.
				var aryUpdatedPages = new Array();
				var aryCounter = 0;

				// Loop through the pages and change all pages within the same document.
				for (i=0; i < objCase.pages.length; i++) {
					if (objCase.pages[i].subDocumentOrder == activeSubDocumentOrder) {
						// Add the updated page to the update array.
						aryUpdatedPages[aryCounter] = { id:objCase.pages[i].id,documentDate:newDocumentDate };
						aryCounter++;

						// Update the case object.
						objCase.pages[i].documentDate = newDocumentDate;
					}
				}

				// Update the DB and sort the pages.
				updatePages(aryUpdatedPages, false);
			}

			// Update the metadata panel. 
			updateMetadataPanel(activePageId); 
		}
	}
}
