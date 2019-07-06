/**
 *  Handle Hiearchy Data
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

/** Get the parent navigation codes for a selected code. 
 *  What category/subcategory,parent ICD105 codes was used to get the current code. 
 * 
 * @param codeid - The code id
 */
function getCodeParentPaths(codeid) {
	var navList = null;
	$.ajax({
		url: "/medicalhiearchy/parentcodes/" + codeid,
		context: document.body,
		async: false,
		success: function(parentcodes) {
		        if(parentcodes != null && parentcodes.length > 0){
        			navList = new Array(parentcodes.length);
	        		for(var i = 0; i < parentcodes.length ; i++){
		        	    navList[i] = parentcodes[i];     
			        }
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "getCodeParentPaths(" + codeid+ ")", errorThrown);
		}
	});
	
	return navList;
}

/** 
 * Get an ICD10 Code Path by Name 
 * 
 * @param codename - the desired code to navigate to from the hiearchy 
 */
function getCodeParentPathsByName(codename, flagFormDPListSearch) {
	var revision = objCase.hierarchyrevision;
	var codedata  = { codename:null,codepath:null,revision:null,flagFormDPListSearch:false};
	
		//Remove and . in the code
	codename = codename.replace(/\./g,'');
		//Remove and - in the code
	//codename = codename.replace(/\-/g,'');
	
	$.ajax({
		url: "medicalhiearchy/parentcodes/" + codename + "/" + revision + "/",
		context: document.body,
		async: true,
		success: function(codepath) {
			codedata.codename = codename;
			codedata.codepath = codepath;
			codedata.revision = revision;
			codedata.flagFormDPListSearch = flagFormDPListSearch;

			gotoCodeInHierarchy(codedata);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}

 /** getHcyPopUpMedicalCodes(subCatId, subdiv)
 * 
 * get Medical codes for code slection screen  for selected subcategory Id for Hierarchy pop up window
 * 
 * @param {Object} subCatId
 * @param {Object} subdiv
 */

function getHcyPopUpMedicalCodes(subCatId, subdiv) {
  $('#searchResultsTable').html('');
  $(subdiv).html('');
  $(subdiv).html('<div style="padding: 15px; font-size: large; font-weight: bold;">Loading Data...</div>');

  var checkDescription = /^[A-Za-z0-9]{0,20}$/;
  if(checkDescription.test(subCatId))
     var searchResultsHtml = getMedicalCodesTable(subCatId,subdiv);
  else
    alert('Special characters cannot be included in a search.');
    
  //Loading rightside ICD code as collapse Mode as default
  $('#searchResultsTable ul').hide();
  // will collapse all ICD Code
  handleCodesCollapseAllEvent(medicalCodes);
  // will expand all ICD Code
  handleCodesExpandAllEvent()
  // expand individual ICD Code
  handleCodeExpandEvent();

  return medicalCodes;
}

// Obtain the client specific Data Point Categories
function getDataPointCategoriesInfo() {
  $.ajax({
    url : "dataPoint/dataPointInfo/" + objCase.id,
    //url: "dataPoint/dataPointInfo/" + objCase.id + "/Both/neoplasm",
    async : false,
    // context: document.body,
    success : function(d) {
      objDPInfo = d;
      //IWN:237-When the case loads, the load window indicated more DP's being loaded than actually are present in the Case
      //var msg = objDPInfo.length + " datapoints were loaded in " + timeelapsed + " seconds....";
      var msg = "Medical hierarchy was loaded in " + timer.getElapseSeconds() + " seconds";

      if(pagecnt > 25)
        popupFadeAwayMsg(msg, "#00EE00", 4000);
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
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
      displayErrorDialog(dateTime, userName, sessionId, caseId, "getDataPointCategoriesInfo()", errorThrown, false);
    }
  });
}


function getMedicalCodesTable(subCatId,subdiv) {
  var searchResultsHtml = '';
  if(subCatId != '') {
    if(searchCriteria != 'Category' && fullDPSearchCriteria == true) {
      searchResultsHtml = '<div id="iws2_fulldp_search_status_box2" style="display:block;">List is Filtered</div>';
    }
    searchResultsHtml += '<ul id = \"searchResultsTable\">';
    var url = '';

    if((displaySearchCriteria == true) && (searchTerm != null && searchCriteria != null)) {
      if(searchTerm == "") {
        searchTerm = $('#icd11_list_input').val().trim();
        searchTerm = searchTerm.replace(/[&\/\\#,+()$~%'":*?<>{}\.]/g, '');
      }
      url = "dataPointEntryCode/loadMedicalCodeIWS2/" + caseId + "/" + subCatId + "/" + searchCriteria + "/" + searchTerm;
    } else
      url = "dataPointEntryCode/loadMedicalCodeIWS2/" + subCatId+ "/"+ caseId;
    // load medical codes  
    loadMedicalCodes(url,searchResultsHtml,subdiv);
      
    if(searchCriteria != 'Category' && dpSearchCriteria == true) {
      $('#iws2_category_search_status2').html('<div id="iws2_category_search_status_box2" style="display:block;">List is Filtered</div>');
    }
  }//end  code != ''
  else {
    alert('please enter a description.');
  }
  
  return searchResultsHtml;
}

// call to load medical codes
function loadMedicalCodes(url,searchResultsHtml,subdiv){
  $.ajax({
    async : false,
    url : url,
    context : document.body,
    success : function(codes) {
      medicalCodes = codes;
      createMedicalICDCodeRow(searchResultsHtml, subdiv, codes);
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      alert('There was an error. call: codeLookup()');
    }
  });
}

/** handleCodesCollapseAllEvent(medicalCodes)
 * 
 *  Will collapse all ICD Medical Codes 
 * @param {Object} medicalCodes
 */
function handleCodesCollapseAllEvent(medicalCodes) {
  $("#icdCodeCollapse_all").click(function() {
    if($("#searchResultsTable li div").length != 0) {
      $('#searchResultsTable ul').hide();
      for( i = 0; i < medicalCodes.length; i++) {
        var othersIcdId = $("#searchResultsTable li div")[i];
        $(othersIcdId).removeClass("searchTableDivM");
        //collapse for level 4 items
        $('#dpform_details_' + medicalCodes[i].id).remove();
        $('#codeTable_' + medicalCodes[i].id).remove();
        $('#dpformtd_' + medicalCodes[i].id).remove();

      }
    } else {
      //collapse for level 3 items
      for( i = 0; i < medicalCodes.length; i++) {
        $('#dpform_details_' + medicalCodes[i].id).remove();
        $('#codeTable_' + medicalCodes[i].id).remove();
        $('#dpformtd_' + medicalCodes[i].id).remove();

      }
    }

  });
}


function handleCodesExpandAllEvent() {
  $("#icdCodeExpand_all").click(function() {
    $('#searchResultsTable ul').show();
    //alert("lastSelMedicalCodeName::"+lastSelMedicalCodeName);
    for( i = 0; i < $("#searchResultsTable li div").length; i++) {
      var othersIcdId = $("#searchResultsTable li div")[i].id;
      //$(othersIcdId).removeClass("searchTableDiv");
      if(othersIcdId.indexOf("accordionCode") != -1) {
        $('#' + othersIcdId).addClass("searchTableDivM");
      }
    }

  });

}

/** handleCodeCollapseEvent(medicalCodes)
 * 
 *  Will expand ICD Medical Code 
 * @param {Object} medicalCodes
 */
function handleCodeExpandEvent() {
 $("#searchResultsTable li a").click(function() {
    if($(this).find('div').length != 0) {

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
      }

      $(this).next().slideToggle(300);
    }
    if(focusflag)
      $('#' + $(this).next().find('a')[0].id).trigger('focus');
  });
} 


/** createMedicalICDCodeRow(searchResultsHtml, subdiv, codes)
 * 
 * @param {Object} searchResultsHtml
 * @param {Object} subdiv
 * @param {Object} codes
 */
function createMedicalICDCodeRow(searchResultsHtml, subdiv, codes) {
  $(subdiv).html('');
  if(codes.length > 0) {
    for(var i = 0; i < codes.length; i++) {
      var currentLevel = codes[i].level;
      //this stores the hierarchy level of the current position
      var nextNodeLevel;
      //this stores the hierarchy level of the upcoming node

      codeName = codes[i].name;
      description = codes[i].description;
      //if description contains apostraphy, escape them
      if(description != null && description != 'null' && description != undefined)
        description_enc = description.replace(/'/g, "\\'");
      else
        description_enc = description;
      commonName = codes[i].commonName;

      if(i < codes.length - 1 && codes[i + 1].level > currentLevel) {
        //current level is a subcategory
        if(commonName != null) {
          searchResultsHtml += '<li class=\"searchTableLIP\"><a onclick="rightSideSubCategoryClickHandler(' + i + '); " class=\"searchTableLl\" href=\"#\"  id="anchorAccordionCode_' + codes[i].id + '" ><div id=\"accordionCode_' + codes[i].id + '\" class=\"searchTableDiv\" >' + codeName + '<span id=\"commonName\"> (' + commonName + ')</span></div></a>';
        } else {
          searchResultsHtml += '<li class=\"searchTableLIP\"><a onclick="javascript:rightSideSubCategoryClickHandler(' + i + '); " class=\"searchTableLl\" href=\"#\" id="anchorAccordionCode_' + codes[i].id + '" ><div id=\"accordionCode_' + codes[i].id + '\" class=\"searchTableDiv\" >' + codeName + '</div></a>';
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
        if(codes[i].linkToId != null) {
            if (codes[i].isExcluded == 'Y')
              searchResultsHtml +='<li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
            else  
              searchResultsHtml += '<a href="#" class=\"searchTableLl\" id="medicalCodeRow_' + codes[i].id + '" ><li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
            searchResultsHtml += '<span class=\"searchTableSpan\" style=\"cursor: pointer; width:19px; display:block;\"><img title=\"Quick link to ' + codeName + '\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" style=\'margin-left:7px;margin-top:7px\' src=\'images/reddot.gif\'></span>';
            // IWN:316 - Production specification(yrs)    
            if(codes[i].spec != null && codes[i].spec.trim() != "")
              prodSpec = ' (' + codes[i].spec + ')';
               
            if(codes[i].isExcluded == 'Y'){
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"color:grey ; width:90px; display:block;\ color:#ff2202\" title=\"Quick link to ' + codeName + '\" class=\"searchTableSpan\"  class=\"searchTableMedicalCode\">' + codeName + '</span>';
              searchResultsHtml += '<span style=\"width : 450px;\" color:grey; class=\"searchTableDescription\">' + description + prodSpec;
            }else if(codes[i].codeScale==3){
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\ color:#ff2202\" title=\"Quick link to ' + codeName + '\" class=\"searchTableSpan\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableMedicalCode\">' + codeName + '</span>';
              searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;color:red; font-weight:bold;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
            }else if(codes[i].codeScale==2){
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\ color:#ff2202\" title=\"Quick link to ' + codeName + '\" class=\"searchTableSpan\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableMedicalCode\">' + codeName + '</span>';
              searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;color:#AF4203; font-weight:bold;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
            }
            else{
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\ color:#ff2202\" title=\"Quick link to ' + codeName + '\" class=\"searchTableSpan\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableMedicalCode\">' + codeName + '</span>';
              searchResultsHtml += '<span style=\"cursor: pointer; width : 450px;\" onclick=\"javascript:goToLinkToId(\'' + codes[i].linkToId + '\');\" class=\"searchTableDescription\">' + description + prodSpec;
            } 
        } else {
            if(codes[i].isExcluded == 'Y')
              searchResultsHtml += '<li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
            else
              searchResultsHtml += '<a href="#" class=\"searchTableLl\" id="medicalCodeRow_' + codes[i].id + '" onClick="getSelectedMedicalCodeData(\'' + encodeURIComponent(JSON.stringify(codes[i])).replace(/'/g, "\\'") + '\');" ><li class=\"searchTableLl\" id="medicalCodeRow" name=\'' + codes[i].id + '\'>'
            // IWN:316 - Production specification(yrs)    
            if(codes[i].spec != null && codes[i].spec.trim() != "")
              prodSpec = ' (' + codes[i].spec + ')'; 
              
            if(codes[i].isExcluded == 'Y'){
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"color:grey; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName + '</span>';
              searchResultsHtml += '<span style=\"color:grey; width : 450px; display : block;color:grey;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;            
            }else if(codes[i].codeScale==3){
               searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName + '</span>';
               searchResultsHtml += '<span style=\"cursor: pointer; width : 450px; display : block;color:red; font-weight:bold;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
            }else if(codes[i].codeScale==2){
               searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName + '</span>';
               searchResultsHtml += '<span style=\"cursor: pointer; width : 450px; display : block;color:#AF4203; font-weight:bold;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
            }
            else{
              searchResultsHtml += '<span id=\"codename' + codes[i].id + '" style=\"cursor: pointer; width:90px; display:block;\" class=\"searchTableSpan\" onclick="" class=\"searchTableMedicalCode\">' + codeName + '</span>';            
              searchResultsHtml += '<span style=\"cursor: pointer; width : 450px; display : block;\" class=\"searchTableSpan\"  class=\"searchTableDescription\">' + description + prodSpec;
            }
        }
        
        if(commonName != null) {
            if(codes[i].codeScale==3)
           searchResultsHtml += '<span id=\"commonName\" style=\" color:#AF4203; font-weight:bold;\"> (' + commonName + ')</span>';
           else if(codes[i].codeScale==2)
            searchResultsHtml += '<span id=\"commonName\" style=\" color:#AF4203; font-weight:bold;\"> (' + commonName + ')</span>';
            else
            searchResultsHtml += '<span id=\"commonName\"> (' + commonName + ')</span>';
        }
        searchResultsHtml += '<span id="iws2_subc_cntr_flags_' + codes[i].id + '">';
        if(flagobject != null) {
          var flagtitle = "Datapoint Code Info/Help";
          if(flagobject.isRedFlag()) {
            var flaghelpinfo = flagobject.redFlag;
            searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#redflaghelp\',\'' + flagtitle + '\',\'' + flaghelpinfo + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\', \'' + i + '\',\'\',\'\',\'\');" id="redflaghelp" title="Click to get help or info" src="images/flagred.gif">';
          }
          if(flagobject.isYellowFlag()) {
            var flaghelpinfo = flagobject.yellowFlag;
            searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#yellowflaghelp\',\'' + flagtitle + '\',\'' + flaghelpinfo + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\', \'' + i + '\',\'\',\'\',\'\');" id="yellowflaghelp" title="Click to get help or info" src="images/flagyellow.gif">';
          }
          if(flagobject.isGreenFlag()) {
            var flaghelpinfo = flagobject.greenFlag;
            searchResultsHtml += '<img class="iws2_subc_cntr_flags_img" onclick="javascript:showClickJQueryDialog(\'#greenflaghelp\',\'' + flagtitle + '\',\'' + flaghelpinfo + '\');sendValueToDPSection(\'clicked\', \'' + codeName + '\' , \'' + description_enc + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\' , \'' + codes[i].id + '\', \'' + i + '\',\'\',\'\',\'\');" id="greenflaghelp" title="Click to get help or info" src="images/flaggreen.gif">';
          }
        }
        searchResultsHtml += '</span></span></li></a>';

        if(i == codes.length - 1) {
          //end of code selection panel, closing
          for( k = 1; k < currentLevel; k++)
            searchResultsHtml += '</ul></li>';
        } else {
          nextNodeLevel = codes[i + 1].level;
          if(nextNodeLevel < currentLevel) {
            //last one at leaf level, closing
            for( k = 1; k <= currentLevel - nextNodeLevel; k++)
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

}
