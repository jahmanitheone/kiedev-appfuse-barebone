/**
 *  Handles Data For Datapoint 
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

//function to load medical codes for selected subcategory
/** To load medical codes with their description for selected subcategories
 *  which will load DP entries if exists for that particular code
 *
 * @param subCatId - Subcategory Id
 * @param subdiv - div id to expand or populate 
*/
function codeLookup(subCatId,subdiv) {
	var commonName='';
	codeDPEntryMap = new Object();
	$('#searchResultsTable').html('');
	$(subdiv).html('');
	$(subdiv).html('<div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div>');
	code=subCatId;
	//icdcodetype = 'ICD-10-CM';
	//icdcodever='2012';
	var checkDescription = /^[A-Za-z0-9]{0,20}$/;
	if (checkDescription.test(code)){
	if (code != '') {
		var searchResultsHtml='';
		if(searchCriteria != 'Category' && fullDPSearchCriteria == true)
		{
			searchResultsHtml = '<div id="iws2_fulldp_search_status_box2" style="display:block;">List is Filtered</div>';
		}
		searchResultsHtml += '<ul id = \"searchResultsTable\">';
		var url='';
		if((displaySearchCriteria == true) && (searchTerm !=null && searchCriteria != null))
    	{
    		if(searchTerm == ""){
    		searchTerm = $('#icd11_list_input').val().trim();
            searchTerm = searchTerm.replace(/[&\/\\#,+()$~%'":*?<>{}\.]/g,'');
           }
			url="dataPointEntryCode/loadMedicalCodeIWS2/" +caseId+ "/"+ subCatId + "/"+searchCriteria+"/"+searchTerm;
    	}
		else
		{
			url="dataPointEntryCode/loadMedicalCodeIWS2/"+ code+ "/"+ caseId;
		}
		// Asynchronous call to load medical codes 
		$.ajax({
			async: false,
			url: url,
			//url: "dataPointEntryCode/loadMedicalCodeIWS2/" + objCase.id + "/"+ code + "/Both/neoplasm",
			context: document.body,
			success: function(codes) { 
				medicalCodes = codes;
				$(subdiv).html('');
				if (codes.length > 0) {
					for (var i = 0; i < codes.length; i++) {
						var currentLevel = codes[i].level; //this stores the hierarchy level of the current position
						var nextNodeLevel; //this stores the hierarchy level of the upcoming node
						
						codeName =  codes[i].name;
						codeDPEntryMap[codeName] = false;
						description = codes[i].description;
						//if description contains apostraphy, escape them
						if (description != null && description != 'null' && description != undefined && description != 'undefined')
							description_enc = description.replace(/'/g, "\\'");
						else
							description_enc = description;
						commonName = codes[i].commonName;
						
						if (i < codes.length - 1 && codes[i+1].level > currentLevel) {
							//current level is a subcategory
							if(commonName != null){
								searchResultsHtml +='<li class=\"searchTableLIP\"><a onclick="rightSideSubCategoryClickHandler(' + i + '); return false;" class=\"searchTableLl\" href=\"#\"  id="anchorAccordionCode_'+codes[i].id +'" ><div id=\"accordionCode_' + codes[i].id + '\" class=\"searchTableDiv\" >' + codeName +'<span id=\"commonName\"> ('+commonName+')</span></div></a>';
							}else{
								searchResultsHtml +='<li class=\"searchTableLIP\"><a onclick="javascript:rightSideSubCategoryClickHandler(' + i + '); return false;" class=\"searchTableLl\" href=\"#\" id="anchorAccordionCode_'+codes[i].id +'" ><div id=\"accordionCode_' + codes[i].id + '\" class=\"searchTableDiv\" >' + codeName +'</div></a>';
							}
							searchResultsHtml += '<ul class=\"searchTableUl\">';
						} else {
							//current level is code
							var flagobject = new ObjFlags();
							flagobject.redFlag = codes[i].redFlag;
							flagobject.yellowFlag = codes[i].yellowFlag;
							flagobject.greenFlag = codes[i].greenFlag;
							
							var codeislinked = "";
							var prodSpec = "";
							if(codes[i].linkToId!=null)
							{
							  if (codes[i].isExcluded == 'Y')
								  searchResultsHtml +='<li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
							  else 
								  searchResultsHtml +='<a href="#" class=\"searchTableLl\" id="medicalCodeRow_'+codes[i].id +'" ><li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
								  
							searchResultsHtml +='<span class=\"searchTableSpan\" style=\"cursor: pointer; width:19px; display:block;\"><img title=\"Quick link to ' + codeName +'\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId +'\');\" style=\'margin-left:7px;margin-top:7px\' src=\'images/reddot.gif\'></span>';
							searchResultsHtml +='<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\ color:#ff2202\" title=\"Quick link to ' + codeName +'\" class=\"searchTableSpan\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId +'\');\" class=\"searchTableMedicalCode\">' + codeName +'</span>';
			                 // IWN:316 - Production specification(yrs)    
			                if(codes[i].spec != null && codes[i].spec.trim() != "")
			                  prodSpec = ' (' + codes[i].spec + ')'; 
			
			                if(codes[i].codeScale == 3)
			                  searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;color:red;font-weight:bold;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
			                 else if(codes[i].codeScale == 2)
                              searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;color:#AF4203;font-weight:bold;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
			                  else if(codes[i].isExcluded == 'Y')
			                   searchResultsHtml += '<span style=\"width : 450px;color:grey;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
			                   else
			                   searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
					
							} else 	{
							  if (codes[i].isExcluded == 'Y')
							    searchResultsHtml +='<li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
							  else  
								  searchResultsHtml +='<a href="#" class=\"searchTableLl\" id="medicalCodeRow_'+codes[i].id +'" onClick="sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc+'\' , \'' + codes[i].id  +'\' , \'' + codes[i].id +'\' , \'' + codes[i].id +  '\', \'' + i +'\',\'\',\'\',\'\');" ><li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
								searchResultsHtml +='<span id=\"midicalCodeBorder' + codes[i].id + '" style=\"height: 2px;background: #2F73DA;display: none;width: 685px;margin: 0 0 0 -23px;\" ></span>';
								if(codes[i].isExcluded=='Y')
								  searchResultsHtml +='<span class=\"searchTableSpan\"><input type=\"checkbox\" disabled onClick="" ></></span>';
								else {
									//if there are data points, check the check box
									if (codes[i].dpEntryCount > 0) {
										searchResultsHtml +='<span class=\"searchTableSpan\"><input type=\"checkbox\" checked onClick="" ></></span>';
									} else {
										searchResultsHtml +='<span class=\"searchTableSpan\"><input type=\"checkbox\" onClick="" ></></span>';
									}
								}
								  
								// IWN:316 - Production specification(yrs)    
								if(codes[i].spec != null && codes[i].spec.trim() != "")
									prodSpec = ' (' + codes[i].spec + ')'; 

  						  if(codes[i].codeScale==3){
  							  searchResultsHtml +='<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; color:red; font-weight:bold; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName +'</span>';
  							  searchResultsHtml +='<span id=\"midicalCodeBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : none;color:red; font-weight:bold; background: #FFEAC3;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec + '</span>';
  							  searchResultsHtml +='<span id=\"midicalCodeNoBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : block; color:red; font-weight:bold; \" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
  							}
  							else if(codes[i].codeScale==2){
                              searchResultsHtml +='<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; color:#AF4203; font-weight:bold; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName +'</span>';
                              searchResultsHtml +='<span id=\"midicalCodeBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : none;color:#AF4203; font-weight:bold; background: #FFEAC3;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec + '</span>';
                              searchResultsHtml +='<span id=\"midicalCodeNoBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : block; color:#AF4203; font-weight:bold; \" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
                            }
  							 else if (codes[i].isExcluded == 'Y'){
  								searchResultsHtml +='<span id=\"codename' + codes[i].id + '" style=\"color:grey; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName +'</span>';
  								 searchResultsHtml +='<span id=\"midicalCodeBgColor' + codes[i].id + '" style=\"width : 485px; display : none; color:grey; background: #FFEAC3;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec + '</span>';
  								 searchResultsHtml +='<span id=\"midicalCodeNoBgColor' + codes[i].id + '" style=\"width : 485px; display : block; color:grey; \" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
  							}	else{
  							  searchResultsHtml +='<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName +'</span>';
  							  searchResultsHtml +='<span id=\"midicalCodeBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : none; background: #FFEAC3;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec  + '</span>';
  							  searchResultsHtml +='<span id=\"midicalCodeNoBgColor' + codes[i].id + '" style=\"cursor: pointer; width : 485px; display : block;  \" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
  							}
								
							}
							if(commonName != null)
							{
							    if(codes[i].codeScale==3)
								searchResultsHtml +='<span id=\"commonName\" style=\" color:red;\"> ('+commonName+')</span>';
								else if(codes[i].codeScale==2)
								searchResultsHtml +='<span id=\"commonName\" style=\" color:#AF4203;\"> ('+commonName+')</span>';
								else
								searchResultsHtml +='<span id=\"commonName\" > ('+commonName+')</span>';
							}
							searchResultsHtml +='<span id="iws2_subc_cntr_flags_'+codes[i].id+'">';
							if(flagobject != null && codes[i].isExcluded != 'Y')
							{
								var flagtitle = "Datapoint Code Info/Help";
								if( flagobject.isRedFlag() )
									searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#redflaghelp\',\'' + flagtitle + '\',\'' + flagobject.redFlag + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc+'\' , \'' + codes[i].id  +'\' , \'' + codes[i].id +'\' , \'' + codes[i].id +  '\', \'' + i +'\',\'\',\'\',\'\');" id="redflaghelp" title="Click to get help or info" src="images/flagred.gif">';
								if( flagobject.isYellowFlag() )
									searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#yellowflaghelp\',\'' + flagtitle + '\',\'' + flagobject.yellowFlag + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc+'\' , \'' + codes[i].id  +'\' , \'' + codes[i].id +'\' , \'' + codes[i].id +  '\', \'' + i +'\',\'\',\'\',\'\');" id="yellowflaghelp" title="Click to get help or info" src="images/flagyellow.gif">';
								if( flagobject.isGreenFlag() )
									searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#greenflaghelp\',\'' + flagtitle + '\',\'' + flagobject.greenFlag + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc+'\' , \'' + codes[i].id  +'\' , \'' + codes[i].id +'\' , \'' + codes[i].id +  '\', \'' + i +'\',\'\',\'\',\'\');" id="greenflaghelp" title="Click to get help or info" src="images/flaggreen.gif">';
							}
							if(qsStageId == 7 || qsStageId == 50){
							searchResultsHtml +='</span></span></li></a>';
							}else{
								searchResultsHtml +='</span></span></li></a>';
							}
							
							if (i == codes.length-1) {
								//end of code selection panel, closing
					            for (k = 1; k < currentLevel; k++)
					            	searchResultsHtml += '</ul></li>';
							} else {
								nextNodeLevel = codes[i+1].level;
								if (nextNodeLevel < currentLevel) {
									//last one at leaf level, closing
									for (k = 1; k <= currentLevel-nextNodeLevel; k++)
										searchResultsHtml += '</ul></li>';
								} 
							}
						}
						
					}
					searchResultsHtml += '</ul>';
					$(subdiv).append(searchResultsHtml);
					document.getElementById('iws2_icdcode_list_collapse').style.display = 'block';
				} else {
					$(subdiv).append('<div style="padding: 15px; font-size: larger ; color: red">No Medical Codes Found...</div>');	
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert ('There was an error. call: codeLookup()');
				}
		});
		
		if(searchCriteria != 'Category' && dpSearchCriteria == true)
		{
			$('#iws2_category_search_status2').html('<div id="iws2_category_search_status_box2" style="display:block;">List is Filtered</div>');
		}
	}//end  code != ''
	 else {
		alert('please enter a description.');
	}
	}//end regex 
	else 
		alert('Special characters cannot be included in a search.');
	//Loading rightside ICD code as collapse Mode
      $('#searchResultsTable ul').hide();
	
	// will collapse all ICD Code
	$("#icdCodeCollapse_all").click(function(){
    if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    } 
		$('#searchResultsTable ul').hide();
		for (i = 0; i < $("#searchResultsTable li div").length; i++) {
			var othersIcdId = $("#searchResultsTable li div")[i];
					$(othersIcdId).removeClass("searchTableDivM");
					}
		// This code or functionality is commenting for performance increasing.
		
		/*if($("#searchResultsTable li div").length!=0){
		    $('#searchResultsTable ul').hide();
		for (i = 0; i < medicalCodes.length; i++) {
			var othersIcdId = $("#searchResultsTable li div")[i];
			$(othersIcdId).removeClass("searchTableDivM");
			//collapse for level 4 items 
			$('#dpform_details_' + medicalCodes[i].id).remove();
			$('#codeTable_'+ medicalCodes[i].id).remove(); 
			$('#dpformtd_' + medicalCodes[i].id).remove();
			//check for check box true or not.
            if(codeDPEntryMap['' + medicalCodes[i].name + ''] == false)
            ($('li[name=' + medicalCodes[i].id + ']').closest( "li" )).find('input:checkbox:checked').attr('checked', false);
             else
              ($('li[name=' + medicalCodes[i].id + ']').closest( "li" )).find('input:checkbox').attr('checked', true);
			//$(othersIcdId).addClass("searchTableDiv");
		}	
		}else{
		    //collapse for level 3 items
		for (i = 0; i < medicalCodes.length; i++) {
            $('#dpform_details_' + medicalCodes[i].id).remove();
            $('#codeTable_'+ medicalCodes[i].id).remove(); 
            $('#dpformtd_' + medicalCodes[i].id).remove();
              if(codeDPEntryMap['' + medicalCodes[i].name + ''] == false)
            ($('li[name=' + medicalCodes[i].id + ']').closest( "li" )).find('input:checkbox:checked').attr('checked', false);
             else
              ($('li[name=' + medicalCodes[i].id + ']').closest( "li" )).find('input:checkbox').attr('checked', true); 
                        }
                }*/
	});

	// will expand all ICD Code
	$("#icdCodeExpand_all").click(function(){
	  if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
		$('#searchResultsTable ul').show();
		//alert("lastSelMedicalCodeName::"+lastSelMedicalCodeName);
		for (i = 0; i < $("#searchResultsTable li div").length; i++) {
			var othersIcdId = $("#searchResultsTable li div")[i].id;
			//$(othersIcdId).removeClass("searchTableDiv");
			if(othersIcdId.indexOf("accordionCode") != -1 ){
			$('#'+othersIcdId).addClass("searchTableDivM");
			}
			//$(othersDivIcdId).removeClass("searchTableDivM");
		}

	});
	
	// expand individual ICD Code

    $("#searchResultsTable li a").click(function() {
          if($(this).find('div').length != 0) {
          if(dpChangedData == true){
            alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
            return; 
          } 
          var focusflag = false;
          var selectedIcdId = "#" + $(this).find('div')[0].id;
          lastSelMedicalCodeName = selectedIcdId;
          if(false == $(this).next().is(':visible')) {
            $(selectedIcdId).addClass("searchTableDivM");
            focusflag = true;
          }
          if(true == $(this).next().is(':visible')) {
            $(selectedIcdId).removeClass("searchTableDivM");
            $('#' + $(this)[0].id).trigger('focus');
            //$(selectedIcdId).addClass("searchTableDiv");
          }

          $(this).next().slideToggle(300);
        }
        if(focusflag)
          $('#' + $(this).next().find('a')[0].id).trigger('focus');
    }); 

}

/**Load Dp entries with data(if exists)  based on selected code
 * 
 * @param code - code name
 * @param desc - code description
 * @param masterCodeId - codeId
 * @param codeType - code type 
 * @param version - the verson of code
 * @param flagidx - If updating via flags helpers, pass the code position --- TODO Remove not used, but all over the place
 */

function sendValueToDPSection(openMode, code, desc, masterCodeId, codeType, version, flagidx, fromDataPointfullListIndicator, dpentryId, section) {
  var selvalue = code;
  var seldesc = desc;
  var dataPointListIndiactor = fromDataPointfullListIndicator;
  var caseId = objCase.id;
  var type = codeType;
  var codeVersion = version;
  // var currow = $('medicalCodeRow_'+masterCodeId);
  var currow = $('li[name=' + masterCodeId + ']').closest("li");
  
  if( dpChangedData == true){
    alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
    if(codeDPEntryMap['' + code + ''] == false)
        currow.find('input:checkbox:checked').attr('checked', false);
      else
        currow.find('input:checkbox').attr('checked', true);
    return;    
  }      
  else {  // collapse already selected medical code row if clicked again
    if(openMode != 'auto' && $('#dpform_details_' + masterCodeId).attr('class')) {
      $('#dpform_details_' + masterCodeId).remove();
      $('#codeTable_' + masterCodeId).remove();
      $('#dpformtd_' + masterCodeId).remove();
      // if no DP entry exist for this code
      $("#midicalCodeBorder"+masterCodeId).css("display","none");
      $("#midicalCodeBgColor"+masterCodeId).css("display","none");
      $("#midicalCodeNoBgColor"+masterCodeId).css("display","block");
      if(codeDPEntryMap['' + code + ''] == false)
        currow.find('input:checkbox:checked').attr('checked', false);
      else
        currow.find('input:checkbox').attr('checked', true);
    } else {
      
      if(dpentryId == "")
            setLoadingOfDPFormOn();
      //only load DP entries if isloaddpform flag is true
      if(isloaddpform) {
        // syncronous call to load DP entries based on code and case
        $.ajax({
          url : "dataPointEntryCode/loadDPEntries/" + masterCodeId + "/" + caseId,
          context : document.body,
          async : false,
          success : function(dpList) {
            $('#codeTable_' + masterCodeId).remove();
            $('#dpformtd_' + masterCodeId).remove();
            currow = $('li[name=' + masterCodeId + ']').closest("li");
            if(dpList.length != 0){
              dataPointEntries = dpList;
              // As this code has exist DP entries.
              codeDPEntryMap[selvalue] = true;
              currow.find('input:checkbox').attr('checked', true);  
            }
                          
            if(openMode != 'notExpand'){
            currow.find('input:checkbox').attr('checked', true);
            //create Dp entry form
            var currAnchor = $('a[id=medicalCodeRow_' + masterCodeId + ']').closest("a");
            //var currAnchor=$('span[id=iws2_subc_cntr_flags_' + masterCodeId +']').closest("span");
            currAnchor.after("<td colspan=\"3\"><table  class id=\"codeTable_" + masterCodeId + "\">" + "<tbody style=\"width : 500px; display : block;\">" + "<tr>" + "<td class=\"dpform_details\" id=\"dpform_details_" + masterCodeId + "\">");
            lastDpEntryId = null;
            // populate dp entries onto dp forms
            if(dpList != null && dpList.length > 0) {
            	 $("#midicalCodeBorder"+masterCodeId).css("display","block");
                 $("#midicalCodeBgColor"+masterCodeId).css("display","block");
                 $("#midicalCodeNoBgColor"+masterCodeId).css("display","none");
              for(var i = 0; i < dpList.length; i++) {
                emptyDpEntryId = -1;
                
                $('.dpform_details').html(getDataPointForm(dpList[i], selvalue, seldesc, masterCodeId, type, codeVersion, null, dpList[i].dpentryid, dpList[i].suspendnote, dataPointListIndiactor, dpentryId, section, dpList[i].isRejected, dpList[i].rejectReason));
                // As this code has exist DP entries.
                codeDPEntryMap[selvalue] = true;
                if(i != 0)
                  $('#codeAddCell_' + dpList[i].dpentryid).hide();
                if(dpList.length -(i+1) == 0)
                	$("#midicalCodeDottedBorder"+dpList[i].dpentryid).css("display","none");	
              }
              // Create empty data point form entry
            } else if(openMode != 'auto') {
              lastDpEntryId = -1;
              emptyDpEntryId = null;
              savedDpEntryId = -1;
              if(qsStageId == 6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71) //IWN-382: 3-way split of Step-2-OP
                isRejected = false;
              else
                isRejected = true;
              
              if($("#iws2_subc_input_pagesection_null").length < 1){
        	   
              $('.dpform_details').html(getDataPointForm(null, selvalue, seldesc, masterCodeId, type, codeVersion, null, null, dataPointListIndiactor, dpentryId, section, isRejected));
              $("#midicalCodeDottedBordernull").css("display","none");
              // initially data is not saved , so need to show delete button
              $('#codeDeleteCell_null_' + selvalue).hide();
              $('#codePagePopup_null_' + selvalue).hide();
            }else{
            	 $('#codeTable_' + masterCodeId).remove();
            	 currow.find('input:checkbox:checked').attr('checked', false);
            	 alert("You must either Save or Cancel changes in the previous DataPoint or close the previous DataPointForm before proceeding further.");
            	 $("#iws2_subc_input_pagesection_null").focus();
            	}
            } else {
              $('#dpform_details_' + masterCodeId).remove();
              $('#codeTable_' + masterCodeId).remove();
              $('#dpformtd_' + masterCodeId).remove();
              currow.find('input:checkbox:checked').attr('checked', false);
            }
            getSavedDataPointStatus();
            }
          },
          error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert('There was an error. call: codeLookup()');
          }
        });
      }
    }
  }
}

function enabledCheckedBox(currow,codeDPEntryMap,code){
	if(codeDPEntryMap['' + code + ''] == false)
	     currow.find('input:checkbox:checked').attr('checked', false);
	else
	     currow.find('input:checkbox').attr('checked', true);
}
/** Load Dp entry Lov Values based on datafieldRef Lov id if exists
 * 
 * @param lovId - Lov id
 */

function loadDPLovValues(lovId){
	var dataPointEntryLovValues = lovValues[lovId];
	//only to query database if the LOV hasn't been loaded into the map
	if (dataPointEntryLovValues == null || dataPointEntryLovValues.length <= 0) {
		//syncronous call to load DP entries based on code and case
		$.ajax({
			url: "dataPoint/dataPointLovValues/" + lovId,
			context: document.body,
			async: false,
			success: function(lovList) {
			        if(lovList != null || lovList.length > 0){
	        			dataPointEntryLovValues = new Array(lovList.length);
		        		for(var i = 0; i < lovList.length ; i++){
			        	    dataPointEntryLovValues[i] = lovList[i].lovValue;     
				        }
				 }       
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert ('There was an error. call: codeLookup()');
			}
		});	
		lovValues[lovId] = dataPointEntryLovValues;
	}
	
	return dataPointEntryLovValues;
}

/** Save DP entry details for a particular code after form validations  
*
* @param code - selected codeName
* @param desc- selected code Description
* @param dpEntryId - dpentryId specific to Dp form 
* @param pageId - page id to save
* @param sectionNumber - section number to save
* @param codeId - code Id
*/
function saveDpDetails(icd10Object,code,desc,dpEntryId,pageId,sectionNumber,codeId){
	var icd10Object =  JSON.parse(decodeURIComponent(icd10Object));
	dpChangedData=false;
	
	if(step==2 && !isGridObjectBegEndValid() ) {
			//Why oh, why is gridselectorbegendobj getting empty at this point, I don't know. Work around solution
			//TODO - Get get implementation to get gridselectorbegendobj not null at this point
		gridselectorbegendobj = getObjGridSelectionBegEndFrom(selectedSectionNumber);
		if(!isGridObjectBegEndValid())
		{			
			alert("Please selected a valid datapoint Page Section!");
			return;
		}
	}
	
	var url = "dataPoint/dataPointEntryIWS2Update";
	// Validate the user entered form values.
	var valid = validate(icd10Object);
	// Only perform an insert if the user entered data is valid.
	if (valid == true) {
		// Create a map that will hold name,value pairs for the data point data.
		var map = new Object(); 
		var entryId = dpEntryId;
		// Add RejectReason DP data and status to the map.
		var tempRejectReason = icd10Object.rejectReason;
		var acceptReject = $('input:radio[name=icd10_'+dpEntryId+']:checked').val();
		if(acceptReject == 'V2')
		{
			if((rejectReason == null) && (tempRejectReason == null || tempRejectReason == "null"))
			{
				alert('Please Enter Reject Reason.');
				return false;
			}
			else
			{
				if(tempRejectReason != null && rejectReason == null)
				{
					map['rejectReason'] = tempRejectReason;
				}
				else
				{
					map['rejectReason'] = rejectReason;
					rejectReason = '';
				}
				map['isRejected'] = true;
			}
		}
		else
		{
			map['rejectReason'] = '';
			map['isRejected'] = false;
		}
		// Add the data point data to the map.
		var suspendnote = icd10Object.suspendnote;
		if(suspendnote == null || suspendnote == "null")
		{
			map['suspendnote'] = note;
		}
		else
		{
		    map['suspendnote'] = suspendnote;
		}
		if(qsStageId==7 || qsStageId== 50)		//Step 2 QA
		{
			map['suspendnote'] = $('#iws2_dp_suspendNote_' + dpEntryId + '_' + code.replace(/\./g,'-')).val();
			map['rejectReason'] = $('#iws2_dp_rejectReason_' + dpEntryId + '_' + code.replace(/\./g,'-')).val();
		}
		// Set the pageId when the saving dp form in new one
		if (dpEntryId == null || dpEntryId == "null"){
			for(var i=0; i < objCase.pages.length; i++){
		        if(selectedPageNumber == objCase.pages[i].finalPageNumber)
		        {
		        	map['_page'] = objCase.pages[i].id;
		            break;
		        }
		    }
		}else{
			map['_page'] = pageId;
		}
		if(icd10Object.prevHid!=null)
		map['hid_previous'] = icd10Object.prevHid;
       if(isGridObjectBegEndValid() && (dpEntryId == null || dpEntryId == "null"))
		{
			map['sectionnumber'] = gridselectorbegendobj.begpos;
			map['startSectionNumber'] = gridselectorbegendobj.begpos;
			map['endSectionNumber'] = gridselectorbegendobj.endpos;
		} else
		{
		   var sectionbegend=sectionNumber.split("-");
           if(sectionbegend.length == 2)
           {
               map['sectionnumber'] = sectionbegend[0];
               map['startSectionNumber'] = sectionbegend[0];
               map['endSectionNumber'] = sectionbegend[1];
           }
           else 
           {
               map['sectionnumber'] = sectionNumber;
               map['startSectionNumber'] = sectionNumber;
               map['endSectionNumber'] = sectionNumber;  
           }
					
		}
       	
       	var sectionFlag=validateSectionNumber(map);
       if(!sectionFlag){
           alert(" Error: Start Section Number can't be greater than End Section Number"+"\n Start Section Number:"+map.startSectionNumber+"\n End Section Number:"+map.endSectionNumber+"\n\n Please contact Application development team.");
           return;
       }
       if(sectionNumber ==null || sectionNumber =='null'){
    	   alert('Invalid SectionNumber.\nSo please modify it by clicking on Pencil icon before saving.');
    	   $('#iws2_subc_input_pagesection_'+ dpEntryId).focus();
    	   return false;
       }
       var datadate=null;
		if($('#iws2_dp_datepicker_qa_' + icd10Object.dpEntryId + '_' + icd10Object.selvalue.replace(/\./g,'-')).val() != undefined){
		    datadate=dateToMillisHandler($('#iws2_dp_datepicker_qa_' + dpEntryId + '_' + code.replace(/\./g,'-')).val());
		     //RPT-23 Data point dated as 11/01/1998 showed up in APS report as 10/31/1998
			map['dataDate'] = datadate+3600000;
			//map['dataDate'] = dateToMillisHandler($('#iws2_dp_datepicker_qa_' + dpEntryId + '_' + code.replace(/\./g,'-')).val());
			}
		else{
		     datadate= dateToMillisHandler($('#iws2_dp_datepicker_' + dpEntryId + '_' + code.replace(/\./g,'-')).val());
		     //RPT-23 Data point dated as 11/01/1998 showed up in APS report as 10/31/1998
			map['dataDate'] = datadate+3600000;
			//map['dataDate'] = dateToMillisHandler($('#iws2_dp_datepicker_' + dpEntryId + '_' + code.replace(/\./g,'-')).val());
			}
		
		if($('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).html() != null){
 		map['isText'] =  $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox')[0].checked;
		}
		//for Previous DP Date
		lastDate = $('#iws2_dp_datepicker_' + dpEntryId + '_' + code.replace(/\./g,'-')).val();
		// Capture DataField Text/Number Values if any...
		for(var i=0;i<icd10Object.dataFieldLabel.length;i++){
		    var counterId=i+1;
		    // need to replace into second for loop and close this
		 if($('#iws2_dp_cat'+counterId+'_input_'+ dpEntryId).html()!=null)
            map['dataField'+counterId+'Value']= $('#iws2_dp_cat'+counterId+'_input_' + dpEntryId).val();   
		}
		/*
		if($('#iws2_dp_cat1_input_'+ dpEntryId).html()!=null)
					map['dataField1Value']= $('#iws2_dp_cat1_input_' + dpEntryId).val();
				if($('#iws2_dp_cat2_input_'+ dpEntryId).html()!=null)
					map['dataField2Value']= $('#iws2_dp_cat2_input_'+ dpEntryId).val();
				if($('#iws2_dp_cat3_input_'+ dpEntryId).html()!=null)
					map['dataField3Value']= $('#iws2_dp_cat3_input_'+ dpEntryId).val();
				if($('#iws2_dp_cat4_input_'+ dpEntryId).html()!=null)
					map['dataField4Value']= $('#iws2_dp_cat4_input_'+ dpEntryId).val();
		
				//if field 5 exists, continue with value capturing
				if (icd10Object.dataFieldLabel5 != null) {
				 if($('#iws2_dp_cat5_input_' + dpEntryId).html() != null) 
				   map['dataField5Value'] = $('#iws2_dp_cat5_input_' + dpEntryId).val();
				 if($('#iws2_dp_cat6_input_' + dpEntryId).html() != null)
				   map['dataField6Value'] = $('#iws2_dp_cat6_input_' + dpEntryId).val();
				 if($('#iws2_dp_cat7_input_' + dpEntryId).html() != null)
				   map['dataField7Value'] = $('#iws2_dp_cat7_input_' + dpEntryId).val();
				 if($('#iws2_dp_cat8_input_' + dpEntryId).html() != null)
				   map['dataField8Value'] = $('#iws2_dp_cat8_input_' + dpEntryId).val();
				}*/
		
 
		map['_medicalHierarchy'] = codeId;
		
		// Capture DataField Legend Text Values if any..
		for(var i=0;i<icd10Object.dataFieldLabel.length;i++){
		     
            var counterId = i + 1;
            if($('#iws2_dp_legend' + counterId + 'Lovs_' + dpEntryId).html() != null)
                if(icd10Object.dataFieldLabel[i].toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_' + counterId + '_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_' + counterId + '_' + dpEntryId).val() != null)) {
                    if($('#iws2_dp_range_high_input_' + counterId + '_' + dpEntryId).val() == "")
                        map['dataField' + counterId + 'Value'] = $('#iws2_dp_range_low_input_' + counterId + '_' + dpEntryId).val().trim();
                    else
                        map['dataField' + counterId + 'Value'] = $('#iws2_dp_range_low_input_' + counterId + '_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_' + counterId + '_' + dpEntryId).val().trim();
                } else if(icd10Object.dataFieldLabel[i].toLowerCase() == 'units')
                    map['dataField' + counterId + 'Value'] = $('#iws2_dp_Units' + counterId + '_text_input_' + dpEntryId).val().trim();
                else
                    map['dataField' + counterId + 'Value'] = $('#iws2_dp_legend' + counterId + 'Lovs_' + dpEntryId + ' :selected').text().trim();
             
            if($('#iws2_dp_legend'+counterId+'Combo_' + dpEntryId).html() != null) {
                var multiSelectValue = getMultipleSelectedValue('iws2_dp_legend'+counterId+'Combo_' + dpEntryId);
                if(multiSelectValue != null)
                    map['dataField'+counterId+'Value'] = multiSelectValue;
                else
                    map['dataField'+counterId+'Value'] = "";
            }
            if($('#iws2_dp_datepicker_'+counterId+'_' + dpEntryId+'_'+icd10Object.selvalue.replace(/\./g,'-')).html() != null) {
                var dateVal = $('#iws2_dp_datepicker_' + counterId + '_' + dpEntryId + '_' + icd10Object.selvalue.replace(/\./g, '-')).val();
                if(dateVal != "") {
                    var dateCheck = checkDateFormat(dateVal);
                    if(dateCheck)
                        map['dataField' + counterId + 'Value'] = millisToDateHandler(dateToMillisHandler(dateVal));
                    else
                        return false;
                } else {
                    map['dataField' + counterId + 'Value'] = dateVal;
                }
            }

		}
		
    /*
    if($('#iws2_dp_legend1Lovs_' + dpEntryId).html() != null)
          if(icd10Object.dataFieldLabel1.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_1_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_1_' + dpEntryId).val() != null)) {
            if($('#iws2_dp_range_high_input_1_' + dpEntryId).val() == "")
              map['dataField1Value'] = $('#iws2_dp_range_low_input_1_' + dpEntryId).val().trim();
            else
              map['dataField1Value'] = $('#iws2_dp_range_low_input_1_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_1_' + dpEntryId).val().trim();
          } else if(icd10Object.dataFieldLabel1.toLowerCase() == 'units') 
              map['dataField1Value'] = $('#iws2_dp_Units1_text_input_' + dpEntryId).val().trim();
            else
              map['dataField1Value'] = $('#iws2_dp_legend1Lovs_' + dpEntryId + ' :selected').text().trim();
                                                                if($('#iws2_dp_legend2Lovs_' + dpEntryId).html() != null)
          if(icd10Object.dataFieldLabel2.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_2_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_2_' + dpEntryId).val() != null)) {
            if($('#iws2_dp_range_high_input_2_' + dpEntryId).val() == "")
              map['dataField2Value'] = $('#iws2_dp_range_low_input_2_' + dpEntryId).val().trim();
            else
              map['dataField2Value'] = $('#iws2_dp_range_low_input_2_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_2_' + dpEntryId).val().trim();
          } else if(icd10Object.dataFieldLabel2.toLowerCase() == 'units')
              map['dataField2Value'] = $('#iws2_dp_Units2_text_input_' + dpEntryId).val().trim();
            else
              map['dataField2Value'] = $('#iws2_dp_legend2Lovs_' + dpEntryId + ' :selected').text().trim();
                                                            if($('#iws2_dp_legend3Lovs_' + dpEntryId).html() != null)
          if(icd10Object.dataFieldLabel3.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_3_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_3_' + dpEntryId).val() != null)) {
            if($('#iws2_dp_range_high_input_3_' + dpEntryId).val() == "")
              map['dataField3Value'] = $('#iws2_dp_range_low_input_3_' + dpEntryId).val().trim();
            else
              map['dataField3Value'] = $('#iws2_dp_range_low_input_3_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_3_' + dpEntryId).val().trim();
          } else if(icd10Object.dataFieldLabel3.toLowerCase() == 'units')
              map['dataField3Value'] = $('#iws2_dp_Units3_text_input_' + dpEntryId).val().trim();
            else
              map['dataField3Value'] = $('#iws2_dp_legend3Lovs_' + dpEntryId + ' :selected').text().trim();
                                                                if($('#iws2_dp_legend4Lovs_' + dpEntryId).html() != null)
          if(icd10Object.dataFieldLabel4.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_4_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_4_' + dpEntryId).val() != null)) {
            if($('#iws2_dp_range_high_input_4_' + dpEntryId).val() == "")
              map['dataField4Value'] = $('#iws2_dp_range_low_input_4_' + dpEntryId).val().trim();
            else
              map['dataField4Value'] = $('#iws2_dp_range_low_input_4_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_4_' + dpEntryId).val().trim();
          } else if(icd10Object.dataFieldLabel4.toLowerCase() == 'units')
              map['dataField4Value'] = $('#iws2_dp_Units4_text_input_' + dpEntryId).val().trim(); 
            else
              map['dataField4Value'] = $('#iws2_dp_legend4Lovs_' + dpEntryId + ' :selected').text().trim();
    
    
        // if DATAFIELD5 Exists then check for 6,7,8 datafields 
        if (icd10Object.dataFieldLabel5 != null) {
              if($('#iws2_dp_legend5Lovs_' + dpEntryId).html() != null) 
                 if(icd10Object.dataFieldLabel5.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_5_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_5_' + dpEntryId).val() != null)) {
                  if($('#iws2_dp_range_high_input_5_' + dpEntryId).val() == "")
                    map['dataField5Value'] = $('#iws2_dp_range_low_input_5_' + dpEntryId).val().trim();
                  else
                    map['dataField5Value'] = $('#iws2_dp_range_low_input_5_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_5_' + dpEntryId).val().trim();
               } else if(icd10Object.dataFieldLabel5.toLowerCase() == 'units')
                  map['dataField5Value'] = $('#iws2_dp_Units5_text_input_' + dpEntryId).val().trim();  
               else
                  map['dataField5Value'] = $('#iws2_dp_legend5Lovs_' + dpEntryId + ' :selected').text().trim();
              
              // DATAFIELD 6, 7, 8
              if($('#iws2_dp_legend6Lovs_' + dpEntryId).html() != null)
                if(icd10Object.dataFieldLabel6.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_6_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_6_' + dpEntryId).val() != null)) {
                  if($('#iws2_dp_range_high_input_6_' + dpEntryId).val() == "")
                    map['dataField6Value'] = $('#iws2_dp_range_low_input_6_' + dpEntryId).val().trim();
                  else
                    map['dataField6Value'] = $('#iws2_dp_range_low_input_6_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_6_' + dpEntryId).val().trim();
                } else if(icd10Object.dataFieldLabel6.toLowerCase() == 'units')
                  map['dataField6Value'] = $('#iws2_dp_Units6_text_input_' + dpEntryId).val().trim();
                else
                  map['dataField6Value'] = $('#iws2_dp_legend6Lovs_' + dpEntryId + ' :selected').text().trim();
        
              if($('#iws2_dp_legend7Lovs_' + dpEntryId).html() != null)
                if(icd10Object.dataFieldLabel7.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_7_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_7_' + dpEntryId).val() != null)) {
                  if($('#iws2_dp_range_high_input_7_' + dpEntryId).val() == "")
                    map['dataField7Value'] = $('#iws2_dp_range_low_input_7_' + dpEntryId).val().trim();
                  else
                    map['dataField7Value'] = $('#iws2_dp_range_low_input_7_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_7_' + dpEntryId).val().trim();
                } else if(icd10Object.dataFieldLabel7.toLowerCase() == 'units')
                  map['dataField7Value'] = $('#iws2_dp_Units7_text_input_' + dpEntryId).val().trim();
                else
                  map['dataField7Value'] = $('#iws2_dp_legend7Lovs_' + dpEntryId + ' :selected').text().trim();
        
              if($('#iws2_dp_legend8Lovs_' + dpEntryId).html() != null)
                if(icd10Object.dataFieldLabel8.toLowerCase() == 'range' && ($('#iws2_dp_range_low_input_8_' + dpEntryId).val() != null || $('#iws2_dp_range_high_input_8_' + dpEntryId).val() != null)) {
                  if($('#iws2_dp_range_high_input_8_' + dpEntryId).val() == "")
                    map['dataField8Value'] = $('#iws2_dp_range_low_input_8_' + dpEntryId).val().trim();
                  else
                    map['dataField8Value'] = $('#iws2_dp_range_low_input_8_' + dpEntryId).val().trim() + " - " + $('#iws2_dp_range_high_input_8_' + dpEntryId).val().trim();
                } else if(icd10Object.dataFieldLabel8.toLowerCase() == 'units')
                  map['dataField8Value'] = $('#iws2_dp_Units8_text_input_' + dpEntryId).val().trim();
                else
                  map['dataField8Value'] = $('#iws2_dp_legend8Lovs_' + dpEntryId + ' :selected').text().trim();
                  
       }
         //set multiValueCombo values into map
               if($('#iws2_dp_legend1Combo_' + dpEntryId).html() != null)
                  {
                     var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend1Combo_' + dpEntryId);
                     if(multiSelectValue!=null)
                     map['dataField1Value']=multiSelectValue;
                     else
                     map['dataField1Value']="";
                  }
               if($('#iws2_dp_legend2Combo_' + dpEntryId).html() != null)
                  {
                     var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend2Combo_' + dpEntryId);
                     if(multiSelectValue!=null)
                     map['dataField2Value']=multiSelectValue;
                     else
                     map['dataField2Value']="";
                  }
               if($('#iws2_dp_legend3Combo_' + dpEntryId).html() != null)
                  {
                     var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend3Combo_' + dpEntryId);
                     if(multiSelectValue!=null)
                     map['dataField3Value']=multiSelectValue;
                     else 
                     map['dataField3Value']="";
                  }
               if($('#iws2_dp_legend4Combo_' + dpEntryId).html() != null)
                  {
                     var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend4Combo_' + dpEntryId);
                     if(multiSelectValue!=null)
                     map['dataField4Value']=multiSelectValue;
                     else 
                     map['dataField4Value']="";
                  }
            // if DATAFIELD5 Exists then check for 6,7,8 datafields
               if (icd10Object.dataFieldLabel5 != null) {
                   if($('#iws2_dp_legend5Combo_' + dpEntryId).html() != null)
                      {
                         var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend5Combo_' + dpEntryId);
                         if(multiSelectValue!=null)
                         map['dataField5Value']=multiSelectValue;
                         else 
                         map['dataField5Value']="";
                      }
                   if($('#iws2_dp_legend6Combo_' + dpEntryId).html() != null)
                      {
                         var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend6Combo_' + dpEntryId);
                         if(multiSelectValue!=null)
                         map['dataField6Value']=multiSelectValue;
                         else 
                         map['dataField6Value']="";
                      }
                   if($('#iws2_dp_legend7Combo_' + dpEntryId).html() != null)
                      {
                         var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend7Combo_' + dpEntryId);
                         if(multiSelectValue!=null)
                         map['dataField7Value']=multiSelectValue;
                         else
                         map['dataField7Value']="";
                                                       }
                   if($('#iws2_dp_legend8Combo_' + dpEntryId).html() != null)
                      {
                         var multiSelectValue=getMultipleSelectedValue('iws2_dp_legend8Combo_' + dpEntryId);
                         if(multiSelectValue!=null)
                         map['dataField8Value']=multiSelectValue;
                         else
                         map['dataField8Value']="";
                      }
               }*/
    
   		// Allows for users to provide feedback, issues or suggestions to business and system team.
   		var systemError = $('#iws2_dp_system_issue_' + dpEntryId + '_' + code).val();   
		if (systemError != null || systemError != "" || systemError != undefined) 
			map['userFeedback'] = systemError;
   		
   		// Need to remove this entry later as we have to remove the referecne of dataPointFormEntity table in coming future.
		// NEED TO REMOVE
		map['_dataPointFormEntity'] = 326;
		// NEED TO REMOVE

		if (entryId != 'null') {
			map['dpentryid'] = entryId;
			url=url+"/"+entryId;
		}
		var ajaxFlagError;
		// All data has been set.  Update/insert data point entry.
		jQuery.ajax({  
			type: "POST",
			url: url,
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success : function(newDpEntryId) {
			  // Now the selected code has exist DP entry now.
				if(codeDPEntryMap !=null)
			  codeDPEntryMap[code]= true;
				savedDpEntryId = newDpEntryId;
				lastDpEntryId = newDpEntryId;
				if(savedDpEntryId!=null){
					// show the delete image btn for specfic DP entry
					$('#codeDeleteCell_'+ dpEntryId + '_' + code ).show();
					// show the pencil image for specific DP entry
					$('#codePagePopup_' + dpEntryId + '_' + code ).show();
					
					setDatapointSaveStatus(newDpEntryId,dpEntryId,code);
					
							
					if( isFullDpListScreen() )
					{
						addTableDataPointsHandler(null);
					} else
					{
						// reload the entries again to populate the latest btn id's
						$('#codeTable_'+ codeId ).remove();
						$('#dpformtd_' + codeId).remove();
						sendValueToDPSection('clicked', code,desc,codeId,codeId,codeId,"","","");
						//call page header for get update IMPAIRED OR STANDARD case
						showHeaderInfo()
						// for suspend Note
							if( note !=null && note !="" && dpEntryId!=null){
							  $('#unSuspendDp_'+newDpEntryId).attr("disabled", false);
						      //$('#suspendDp_'+newDpEntryId).attr("disabled", true);
						    }
						    note='';
						//	If action is from data point update - clear orignal value
						if (DataPoinUpdatedObj!=null || typeof DataPoinUpdatedObj !="undefined")
							DataPoinUpdatedObj = null;
						}
					}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("There is an error occured while in saving . please try again");
				ajaxFlagError = true;
			}
		});
		if(ajaxFlagError){
			return false;
		}
		if( note !=null && note !="" && dpEntryId!=null){
			$('#unSuspendDp_'+dpEntryId).attr("disabled", false);
		    //$('#suspendDp_'+dpEntryId).attr("disabled", true);
		    }
		note='';
		
        if(((qsStageId == 7 || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW) || qsStageId == 48) {
            var ObjStep2QA1 = new ObjStep2Qa(caseId);
            ObjStep2QA1.loadDpListObjects();
            $('#codeTableQA1_' + codeId).html('');
            $('#codeTableQA1_' + codeId).css('display', 'none');
            $('#datapointqa1col' + savedDpEntryId).click();
            $('#iws2_dp_datepicker_' + savedDpEntryId + '_' + icd10Object.selvalue.replace(/\./g, '-')).click();
            showDPHeaderInfo('cntnr_dplist_header');
        } else if($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW && (qsStageId == 7 || qsStageId == 50 )) {
            addTableDataPointsHandler(IWS2SCREENS_FULLDPLIST_PAGEVIEW);
            // re-open last selected Dp row from DP list
            datapointFullDPListClickHandler(searchRowNumber);
            showDPHeaderInfo('cntnr_dplist_header');
        }
        else if($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW){
        	closeDPListForm();
        }else{
          if(objActivePage != undefined ){
        	  var section = map['startSectionNumber'];
  			  if (map['endSectionNumber'] == undefined){
  				  section = section + '-' + map['startSectionNumber'];
  			  }else{
  				  section = section + '-' + map['endSectionNumber'];  
  			  }
        	  addTableSpecificDataPointsHandler(section.toString(), null); 
          }
          if( isDPFullListRowActive() ){
             if($('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_CATEGORYVIEW){
                    view = IWS2SCREENS_FULLDPLIST_PAGEVIEW;
                }else{
                    view = IWS2SCREENS_FULLDPLIST_CATEGORYVIEW;
                }
                addTableDataPointsHandler(view);
                showDPHeaderInfo('cntnr_dplist_header');
                var flag=true;
                // re-open last selected Dp row from DP list
                $('#dataTable').bind("sortEnd", function(sorter) { 
                  if(flag==true){
                    /*
                   $(this).find('tbody tr td:first-child').each(function(i) {
                   $(this).html((i + 1));
                  });*/
                  flag=false;
                  datapointFullDPListClickHandler(searchRowNumber);
                }
              });
         }
     }
     callApexUrl();
	}
	
	
}
/** Delete particaular Dp entry form data at UI and DB level with confirmation alert
 * 
 * @param selvalue - selected code Name
 * @param seldesc - selected code description
 * @param masterCodeId - selected code Id
 * @param newRowCount - rowCount details of selectd DP form
 * @param dpEntryId - dpEntryId of selected Dp form
 */
function deleteDPSectionWithConfirm(selvalue,seldesc, masterCodeId, newRowCount, dpEntryId){
	
	var dpFormInfo = "Deleting datapoint: " + selvalue+ ", " + seldesc ;
	dpFormInfo += "\n\nAre you sure you want to delete this datapoint?\nPress [Ok] to delete, [Cancel] to abort."

	if(dpChangedData == true && dpEntryId != prevFocusedDPEntryId && dpEntryId != null  ) {
    alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
    return false;
  }
    
	r = confirm(dpFormInfo);
	if (r == true) {
		deleteDPSection(selvalue,seldesc, masterCodeId, newRowCount, dpEntryId);
	}
	
}

/** Delete particaular Dp entry form data at UI and DB level
 * 
 * @param selvalue - selected code Name
 * @param seldesc - selected code description
 * @param masterCodeId - selected code Id
 * @param newRowCount - rowCount details of selectd DP form
 * @param dpEntryId - dpEntryId of selected Dp form
 */
function deleteDPSection(selvalue,seldesc, masterCodeId, newRowCount, dpEntryId) {
	var prevNextQcaiDpId = null;
	if((qsStageId == 7 || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW){
		 // remove this if exists
		if($('#dpform_detailsQA1_'+masterCodeId).closest("tr")!=undefined )
	        $('#dpform_detailsQA1_'+masterCodeId).closest("tr").remove();
		 $('#dpform_detailsQA1_' + masterCodeId).remove();
		    $('#codeTableQA1_' + masterCodeId).remove();
		    $('#dpformQA1td_' + masterCodeId).remove();    
		// Add Empty Form if last entry to be deleted
		/*if($('#codeTableQA1_'+ masterCodeId)[0].rows.length== 1){
		    // As no DP entry left for this specific code 
			if(codeDPEntryMap!=null)
		    codeDPEntryMap[selvalue] = false;
	    	//getDataPointForm(null,selvalue,seldesc,masterCodeId,masterCodeId,masterCodeId,null,null,"","","");
		}else{
        // check if any next row exists and no previous row exists , then ikt means delted row will be first row so show  add image for next row while delete 
        if($('#' + newRowCount).next().length != 0 && $('#' + newRowCount).prev().length == 0){
          newAddElement = $('#' + newRowCount).next().find("span")[0].id;
          $("#" + newAddElement).show();
        }
    } */
		
	}else{

    // remove this if exists
		if($('#dpform_details_'+masterCodeId).closest("tr")!=undefined )
	        $('#dpform_details_'+masterCodeId).closest("tr").remove();
	        
		// Add Empty Form if last entry to be deleted
		if($('#codeTable_'+ masterCodeId)[0].rows.length== 1){
		    // As no DP entry left for this specific code 
		    codeDPEntryMap[selvalue] = false;
		    if($("#iws2_subc_input_pagesection_null").length < 1){
	    	getDataPointForm(null,selvalue,seldesc,masterCodeId,masterCodeId,masterCodeId,null,null,"","","");
		    }else{
		    	var currow = $('li[name=' + masterCodeId + ']').closest("li");
		    	currow.find('input:checkbox:checked').attr('checked', false);
		    	$('#codeTable_'+ masterCodeId).remove();	
		    	$("#midicalCodeBorder"+masterCodeId).css("display","none");
		    	$("#iws2_subc_input_pagesection_null").focus();
		    }
		    	
		}else{
        // check if any next row exists and no previous row exists , then ikt means delted row will be first row so show  add image for next row while delete(Add + sign) 
        if($('#' + newRowCount).next().length != 0 && $('#' + newRowCount).prev().length == 0){
          newAddElement = $('#' + newRowCount).next().find("span")[2].id;
          $("#" + newAddElement).show();
        }
     } 
  }
		
		// Here it removes the DP form
		$("#" + newRowCount).remove();
		if((qsStageId==7 || qsStageId==48  || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			// for maintaining prev and next dprow to open after deleting dpentryId
			if($('#datapointqa1col'+dpEntryId).closest("tr").prev()[0].id!="")
				prevNextQcaiDpId = $('#datapointqa1col'+dpEntryId).closest("tr").prev()[0].id;
			else if($('#datapointqa1col'+dpEntryId).closest("tr").next()[0].id!="")
				prevNextQcaiDpId = $('#datapointqa1col'+dpEntryId).closest("tr").next()[0].id;
		}
		// Soft delete DP form data from DB
		if(dpEntryId != null && dpEntryId != 'null'){
		  var url = "dataPoint/dataPointSoftDelete/" + dpEntryId;
  		
		 jQuery.ajax({  
  			 type: "POST",
			   url: url,
			   async: false,
			   success : function(msg) {										
				  if( isFullDpListScreen() )
				  {
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
				  displayErrorDialog(dateTime, userName, sessionId, caseId, "softDeleteDataPoint(" + dpEntryId + ")", errorThrown);
			 }
		 });
		// will Update the section specific DP list also
		 if((qsStageId==7 || qsStageId==48  || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			// for maintaining prev and next dprow to open after deleting dpentryId
			 var ObjStep2QA1 = new ObjStep2Qa(caseId);
				ObjStep2QA1.loadDpListObjects();
				if(prevNextQcaiDpId!=null){
					prevNextQcaiDpId = 	$('#'+ prevNextQcaiDpId).children()[0].id;
				$('#'+ prevNextQcaiDpId).click();
				  //to get update  Impaired case or standard case
				showDPHeaderInfo('cntnr_dplist_header');
				}
		 }else{
	  addTableSpecificDataPointsHandler(selectedSectionNumber, null); 
	  //to get update  Impaired case or standard case
	  showHeaderInfo();
		 }
		} 
}

/**
 *Validate Section Number 
 * @param {Object} ObjectMap
 */
function validateSectionNumber(ObjectMap)
{
    if(parseInt(ObjectMap.startSectionNumber)!=parseInt(ObjectMap.endSectionNumber) && parseInt(ObjectMap.startSectionNumber)>parseInt(ObjectMap.endSectionNumber))
         return false;
        else if(parseInt(ObjectMap.startSectionNumber)==parseInt(ObjectMap.endSectionNumber))
          return true;
          else
            return true;
}
