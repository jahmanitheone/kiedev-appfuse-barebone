/**
 *  Handles Data For Search
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

/*
Function: handleSearchCriteria()
Search by Category , Code and Both by checking radio button and clicking on search button

Page Actions:
- Step 2 OP getStep2ICD10Screen  Data Point Entry Search Click
*/ 
function handleSearchCriteria(caseId){
if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
	searchCriteria = $('input:radio[name=searchCriteria]:checked').val();
	searchTerm = $('#icd10_list_input').val().trim();
	searchTerm = searchTerm.replace(/[&\/\\#,+()$~%'":*?<>{}\.]/g,'');
	
    //bug fix for code RX using Exact Code search type
	if((searchTerm.length > 2 && searchCriteria != "ExactCode") || (searchTerm.length > 1 && searchCriteria == "ExactCode")){
		$('#iws2_category_list_entries').html('');
		$('#iws2_category_search_status').html('');
		$('#iws2_subc_entries').html('');
		$('#iws2_category_search_status').html('<div id="iws2_category_search_status_box" style="display:none;"></div>');
		$('#iws2_category_search_status2').html('<div id="iws2_category_search_status_box2" style="display:none;"></div>');
		$('#iws2_category_search_status2').html('<div id="iws2_category_search_status_error" style="display:none;"></div>');
		
		var url = "dataPoint/searchCriteria/" + caseId+"/"+searchCriteria+"/"+searchTerm;
		jQuery.ajax({  
			url: url,
			async: false,
			context: document.body,
			success: function(dp) { 
				// assign the Category and SubCategory data into global variable "searchObjDPInfo".
				searchObjDPInfo = dp;
				//Controller returns always two empty list object, if data not found
				if(searchObjDPInfo.length != 0){
  					if(searchObjDPInfo[0].length != 0 && searchObjDPInfo[1].length !=0){
  						displaySearchCriteria = true;
	  					dpSearchCriteria = true;
	  					fullDPSearchCriteria =false;
	  					lastSelSubcategory = null;
  						createAccordianMenu('#iws2_category_list_entries','#collapse_all','#expand_all');
  						if (searchCriteria == "ExactCode"){
  							var flagFormDPListSearch = false;
  							getCodeParentPathsByName(searchTerm.toUpperCase(), flagFormDPListSearch);
  						}
  					}
  				}	
				else{
					$('#iws2_category_list_entries').html('<div style="padding: 15px; font-size: small; font-weight: bold;">No data found. <br/> Please search valid category/code.</div>');
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "handleSearchCriteria()", errorThrown);
			}
		});
		$('#iws2_category_search_status').html('<div id="iws2_category_search_status_box" style="display:block;">List is Filtered</div>');
	}
	else{
		if (searchTerm == "")
		  $('#iws2_category_search_status').html('<div id="iws2_category_search_status_error" style="display:block;">Search term is blank. Please enter search term longer than 2 characters for Code & Desc and All search types, and longer than 1 character for Exact Code search type.</div>');
		else
		  $('#iws2_category_search_status').html('<div id="iws2_category_search_status_error" style="display:block;">Search term too short. Please enter search term longer than 2 characters for Code & Desc and All search types, and longer than 1 character for Exact Code search type.</div>'); 
		$('#iws2_category_list_entries').css('height','636');
		return false;
	}
}

/*
Function: handleDPSearchCriteria()
Search by Category , Code and Both by checking radio button and clicking on search button

Page Actions:
- Step 2 OP getStep2ICD10Screen  Data Point Window Search Click
*/ 
function handleDPSearchCriteria(caseId){
if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
	searchTerm = $('#icd11_list_input').val().trim();
	searchCriteria = $('input:radio[name=searchCriteria2]:checked').val();
    searchTerm = searchTerm.replace(/[&\/\\#,+()$~%'":*?<>{}\.]/g,'');

    if((searchTerm.length > 2 && searchCriteria != "ExactCode") || (searchTerm.length > 1 && searchCriteria == "ExactCode")){
		$('#iws2_fulldp_category_list_entries').html('');
		$('#iws2_fulldp_search_status').html('');
		$('#iws2_subc_entries_fulldp').html('');
		$('#iws2_fulldp_search_status').html('<div id="iws2_fulldp_search_status_box" style="display:none;"></div>');
		$('#iws2_subc_entries_fulldp').html('<div id="iws2_fulldp_search_status_box2" style="display:none;"></div>');
		
		var url = "dataPoint/searchCriteria/" + caseId+"/"+searchCriteria+"/"+searchTerm;
		jQuery.ajax({  
			url: url,
			async: false,
			context: document.body,
			success: function(dp) { 
				// assign the Category and SubCategory data into global variable "searchObjDPInfo".
				searchObjDPInfo = dp;
				//Controller returns always two empty list object, if data not found
				if(searchObjDPInfo[0].length != 0 && searchObjDPInfo[1].length !=0){
					displaySearchCriteria = true;
					fullDPSearchCriteria =true;
					dpSearchCriteria = false;
					//searchTerm = null;
					//searchCriteria = null;
					lastSelSubcategory = null;
					createAccordianMenu('#iws2_fulldp_category_list_entries','#collapse_all_fulldp','#expand_all_fulldp');
					if (searchCriteria == "ExactCode"){
						var flagFormDPListSearch = true;
						getCodeParentPathsByName(searchTerm.toUpperCase(), flagFormDPListSearch);
					}
				}
				else{
					$('#iws2_fulldp_category_list_entries').html('<div style="padding: 15px; font-size: small; font-weight: bold;">No data found. <br/> Please search valid category/code.</div>');
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "handleSearchCriteria()", errorThrown);
			}
		});
		$('#iws2_fulldp_search_status').html('<div id="iws2_fulldp_search_status_box" style="display:block;">List is Filtered</div>');
	}
	else{
        if (searchTerm == "")
          $('#iws2_fulldp_search_status').html('<div id="iws2_category_search_status_error" style="display:block;">Search term is blank. Please enter search term longer than 2 characters for Code & Desc and All search types, and longer than 1 character for Exact Code search type.</div>');
        else
          $('#iws2_fulldp_search_status').html('<div id="iws2_category_search_status_error" style="display:block;">Search term too short. Please enter search term longer than 2 characters for Code & Desc and All search types, and longer than 1 character for Exact Code search type.</div>'); 
        $('#iws2_fulldp_category_list_entries').css('height','636');  
        return false;
	}
}