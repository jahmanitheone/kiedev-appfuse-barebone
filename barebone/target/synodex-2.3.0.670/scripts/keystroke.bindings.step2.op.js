/* 
File: keystroke.bindings.step2.op.js
jQuery binding libraries are used to bind functions to hotkeys.  The step2.op indicates these hotkeys are used within the Step 2 OP window.

Key Bindings:
- Alt+R     - Create New DP
- Alt+Del   - Delete Current DP
- Alt+I     - Move To Image's Page Section
- Alt+X     - Check/Uncheck "is Text" transcript check box
- Alt+E     - Erase DP Date
- Alt+P     - Invoke Page Date
- Alt+L     - Invoke Prev DP Date
- Alt+H     - Invoke Suspend Note
- Alt+U     - Invoke UnSuspend Note
- Alt+S     - Invoke Save
- Alt+C     - Invoke Cancel

*/
var prevFocusedDPEntryId=null;
var prevFocusedDPEntry = null;
var currentFocusedDPEntryId=null;
var currentFocusedDPEntry=null;
var parentId;
var subcategoryParentId;
var dpChangedData = false;
var previousElementId = null;
var isTextToggle = false;
var DPDateChanged = false;
var multiValueComboChanged=false;
/*
Function: onClickFocusedHandler(dpEntryId)
onClickFocusedHandler method was called will call highlightDPSection(dpEntryId) for any element get the focus in DP form

Page Actions:
- Step 2 OP will highlight the DP entry form 
*/
function onClickFocusedHandler(dpEntryId){ 
  isTextToggle = false;
  DPDateChanged = false;
	highlightDPSection(dpEntryId);
}

/*
Function: highlightDPSection(dpEntryId)
highlightDPSection(dpEntryId) method was called to verify that previous changed DP form is yet saved / cancelled 
and higlights the unchanged DP entry form

Page Actions:
- Step 2 OP will highlight the DP entry form and halt the user to save/cancel previous chnaged DP form entry 
*/

function highlightDPSection(dpEntryId) {
  currentFocusedDPEntryId = dpEntryId;
  if(dpEntryId != null) {
    var prevFocusedDPEntry = null;
    if(prevFocusedDPEntryId != null && prevFocusedDPEntryId != 'null' && dpEntryId != 'null') {
      prevFocusedDPEntry = searchCurrentFocusedDPEntryData(prevFocusedDPEntryId);
    } else if(dpEntryId != 'null') {// if prev focussed Dp entry form was an empty form
      prevFocusedDPEntry = 'null';
      prevFocusedDPEntryId = 'null';
    }

    currentFocusedDPEntry = searchCurrentFocusedDPEntryData(dpEntryId);
  }
  // will halt the user the save/cancel previos changes
  if(dpChangedData == true && dpEntryId != prevFocusedDPEntryId && dpEntryId != null  ) {
    alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
    if(multiValueComboChanged){
     $('#saveDp_' + dpEntryId).removeAttr('disabled');
     $('#cancelDp_' + dpEntryId).removeAttr('disabled');
    }
    if(isTextToggle == true) {
      if($('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox:checked').length == 1)
        $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox:checked').attr('checked', false);
      else
        $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', true);
    }

    $('#' + previousElementId).focus();
    return false;
  }

  // if DP date changed successfully
  if(DPDateChanged == true){
	  enabledSaveCancelDPButton(dpEntryId);
	  dpChangedData = true;
  }
  // if isText toggling changed successfully
  if(isTextToggle == true){
    dpChangedData = true;
	  enabledSaveCancelDPButton(dpEntryId);
    toggleTranscript(dpEntryId);
  }
  
  // Now actually Hightlight the DP entry section  
  setDPSectionhighlighted(dpEntryId);
}


/* Will highlight the DP entry form if any element of that get focused 
 * 
 */
function setDPSectionhighlighted(dpEntryId) {
	if(qsStageId!=7 && qsStageId!=48){
	$("#iws2_step2_icd10codetable_"+prevFocusedDPEntryId).removeClass("iws2_focusedDPSection");
	prevFocusedDPEntryId = dpEntryId;
    $("#iws2_step2_icd10codetable_"+prevFocusedDPEntryId).removeClass("icd10codetable");
    $("#iws2_step2_icd10codetable_"+dpEntryId).addClass("iws2_focusedDPSection");
    $("#iws2_step2_icd10codetable_"+dpEntryId).focus();
	}else{
		$("#iws2_step2_icd10codetable_"+prevFocusedDPEntryId).removeClass("iws2_focusedDPSection");
		prevFocusedDPEntryId = dpEntryId;
	    $("#iws2_step2_icd10codetable_"+prevFocusedDPEntryId).removeClass("icd10codetable");
	    $("#iws2_step2_icd10codetable_"+dpEntryId).addClass("iws2_focusedDPSection");
	    $("#iws2_step2_icd10codetable_"+dpEntryId).focus();
	}
}


  
  // if DP date get chanegd
  function dateValueChangedHandler(dpEntryId) {
//    enabledSaveCancelDPButton(dpEntryId);
//    if(prevFocusedDPEntryId != null)
//      dpChangedData = true;
    DPDateChanged = true;
    isTextToggle = false;
    highlightDPSection(dpEntryId);
    //this method called is not required.
    previousElementId = document.activeElement.id;
  }


  // if any legend value get changed
  function legendValueChangedHandler(dpEntryId) {
	enabledSaveCancelDPButton(dpEntryId);
    dpChangedData = true;
    DPDateChanged = false;
    isTextToggle = false;
    highlightDPSection(dpEntryId);
    previousElementId= document.activeElement.id;
  }
  // if any legend value get changed
  function multiValueComboChangedHandler(dpEntryId) {
    enabledSaveCancelDPButton(dpEntryId);
    DPDateChanged = false;
    isTextToggle = false;
    highlightDPSection(dpEntryId);
    dpChangedData = true;
    previousElementId= document.activeElement.id;
  }

  // if any transcript value get updated
  function transcriptValueChangedHandler(dpEntryId) {
	enabledSaveCancelDPButton(dpEntryId);
    dpChangedData = true;
    DPDateChanged = false;
    isTextToggle = false;
    //highlightDPSection(dpEntryId);//this method called is not required.
    previousElementId= document.activeElement.id;
    
  }

  
  // if isText checkbox get updated
  function isTextValueChangedHandler(dpEntryId) {
//    if(prevFocusedDPEntryId != null)
//      dpChangedData = true;
   // enabledSaveCancelDPButton(dpEntryId);
   // DPDateChanged = false;
    isTextToggle = true;
    highlightDPSection(dpEntryId);
    previousElementId = document.activeElement.id;
  }


  // if number value get updated
  function numberValueChangedHandler(dpEntryId) {
	enabledSaveCancelDPButton(dpEntryId);
    dpChangedData = true;
    DPDateChanged = false;
    isTextToggle = false;
    //highlightDPSection(dpEntryId);//this method called is not required.
    previousElementId= document.activeElement.id;
  }
  
   // if accept/reject radio button value get updated
  function radioButtonValueChangedHandler(dpEntryId) {
    if(dpChangedData == false){
      enabledSaveCancelDPButton(dpEntryId);
    }  
    highlightDPSection(dpEntryId);//this method called is not required. 
    dpChangedData = true;
    DPDateChanged = false;
    isTextToggle = false;
    previousElementId= document.activeElement.id;
  }

function enabledSaveCancelDPButton(dpEntryId) {
	 $('#saveDp_' + dpEntryId).removeAttr('disabled');
	 $('#cancelDp_' + dpEntryId).removeAttr('disabled');
	 if(qsStageId==7  || qsStageId == 50){		//Step 2 QA
		 $('#closeDp_' + dpEntryId).attr("disabled", true);}
		
}
function enabledSaveCancelDPButtonForhierarchy(dpEntryId){
	window.opener.$('#saveDp_' + dpEntryId).removeAttr('disabled');
	window.opener.$('#cancelDp_' + dpEntryId).removeAttr('disabled');
	 if(qsStageId == 7  || qsStageId == 50){		//Step 2 QA
		 window.opener.$('#closeDp_' + dpEntryId).attr("disabled", true);}
}
// fetch currrent focussed DP entry fiorm data
function searchCurrentFocusedDPEntryData(focusedDPEntryId) {
	if(focusedDPEntryId == 'null')
		focusedDPEntryId = null;
  if(focusedDPEntryList != null) {
    for(var i = 0; i < focusedDPEntryList.length; i++) {
      dpEntId = focusedDPEntryList[i].dpEntryId;
      if(dpEntId == focusedDPEntryId) {
        var focusedDPEntry = new ObjICD10SubCategoryScreen()
        focusedDPEntry.selvalue = focusedDPEntryList[i].selvalue;
        focusedDPEntry.seldesc = focusedDPEntryList[i].seldesc;
        focusedDPEntry.dpEntryId = focusedDPEntryList[i].dpEntryId;
        focusedDPEntry.pageId = focusedDPEntryList[i].pageId;
        focusedDPEntry.sectionNumber = focusedDPEntryList[i].sectionNumber;
        focusedDPEntry.masterId = focusedDPEntryList[i].masterId;
        focusedDPEntry.newRowCount = focusedDPEntryList[i].newRowCount;
        focusedDPEntry.type = focusedDPEntryList[i].type;
        focusedDPEntry.codeVersion = focusedDPEntryList[i].codeVersion;
        focusedDPEntry.dataDate = focusedDPEntryList[i].dataDate;
        focusedDPEntry.dataFieldLovs2 = focusedDPEntryList[i].dataFieldLovs2;
        focusedDPEntry.dataField1Value = focusedDPEntryList[i].dataField1Value;
        return focusedDPEntry;
      }
    }
  }
}


  // DP entry Form shortcuts Handlers
$(document).keydown(function(e) {
	
  var cKey = 67;
  var nKey = 78;
  var rKey = 82;
  var mKey = 77;
  var delKey1 = 46;
  var delKey2 = 110;
  var iKey = 73;
  var xKey = 88;
  var eKey = 69;
  var pKey = 80;
  var lKey = 76;
  var hKey = 72;
  var uKey = 85;
  var skey = 83;
  var f1Key = 112;
  var f2Key = 113;
  var f3Key = 114;
  var f4Key = 115;
  var f5Key = 116;
  var f6Key = 117;
  var f7Key = 118;
  var f8Key = 119;
  var f9Key = 120;
  var f10Key = 121;
  var f11Key = 122;
  var f12Key = 123;
  var leftKey = 37;
  var rightKey = 39;
  var upKey = 38;
  var downKey = 40;
  var altKey = 18;
  var escKey = 27;

	
	if (e.altKey == true && currentFocusedDPEntryId != null){ // if alt key pressed and DP entry is focussed
    
    if(e.keyCode == mKey) { // Alt-m invokes Modify code popup .
      $('#codePagePopup_' + currentFocusedDPEntryId + '_' + currentFocusedDPEntry.selvalue).click();
      dpChangedData = false;
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
    } else if(e.keyCode == skey) { // Alt-S invokes Save. And moves focus to Search input field. Button will be light-gray and unclickable if there are no unsaved DP changes
      $('#saveDp_' + currentFocusedDPEntryId).click();
      dpChangedData = false;
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#icd10_list_input").focus();
    } else if(e.keyCode == cKey) { // Alt-C invokes Cancel. And moves focus to Search input field. Button will be light-gray and unclickable if there are no unsaved DP changes
      $('#cancelDp_' + currentFocusedDPEntryId).click();
      dpChangedData = false;
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#icd10_list_input").focus();
    } else if(e.keyCode == hKey) { // Alt-H.invokes Suspend Note. And moves focus to Search input field
      $('#suspendDp_' + currentFocusedDPEntryId).click();
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#icd10_list_input").focus();
    } else if(e.keyCode == uKey) { // Alt-U. Invokes UnSuspend And moves focus to Search input field
      $('#unSuspendDp_' + currentFocusedDPEntryId).click();
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#icd10_list_input").focus();
    } else if(e.keyCode == rKey) {  // Alt-R. Create new DP, populate Date with “Prev DP Date” and moves focus to Transcript field
      $('#codeAddCell_' + currentFocusedDPEntryId).click();
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#iws2_dp_cat1_input_" + currentFocusedDPEntryId).focus();
    } else if(e.keyCode == delKey1 || e.keyCode == delKey2) { // Alt-Del invokes Delete And moves focus to Search input field
      $('#codeDeleteCell_' + currentFocusedDPEntryId + '_' + currentFocusedDPEntry.selvalue).click();
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#icd10_list_input").focus();
    } else if(e.keyCode == iKey) { //Alt-I – moves image Pane to this Page 7 Section. Remove frame or gray-up box indicate this is a noneditable link item
      $('#iws2_subc_input_pagesection_' + currentFocusedDPEntryId).click();
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
    } else if(e.keyCode == xKey) { // Alt-x - toggles isText check/uncheck box 
      if($('#iws2_subc_ctnr_isTranscript_op_' + currentFocusedDPEntryId).find('input:checkbox:checked').length == 1)
        $('#iws2_subc_ctnr_isTranscript_op_' + currentFocusedDPEntryId).find('input:checkbox:checked').attr('checked', false);
      else
        $('#iws2_subc_ctnr_isTranscript_op_' + currentFocusedDPEntryId).find('input:checkbox').attr('checked', true);
      toggleTranscript(currentFocusedDPEntry.dpEntryId);
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
    } else if(e.keyCode == eKey) { //Alt-E – Erases DP Date, moves focus to DP Date field.
      $('#eraserDPDate_'  + currentFocusedDPEntryId + '_' + currentFocusedDPEntry.selvalue).click();
      $('#iws2_dp_datepicker_' + currentFocusedDPEntryId + '_' + currentFocusedDPEntry.selvalue).focus();
    } else if(e.keyCode == pKey) {  // Alt-P invokes Page Date. And moves focus to Transcript field.
      usePageDate(currentFocusedDPEntry.dpEntryId, currentFocusedDPEntry.selvalue);
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#iws2_dp_cat1_input_" + currentFocusedDPEntryId).focus();
    } else if(e.keyCode == lKey) { // Alt-L invokes “prev DP Date”. And moves focus to Transcript field
      previousDPDate(currentFocusedDPEntry.dpEntryId, currentFocusedDPEntry.selvalue);
      $("#iws2_step2_icd10codetable_op_" + currentFocusedDPEntryId).addClass("iws2_focusedDPSection");
      $("#iws2_dp_cat1_input_" + currentFocusedDPEntryId).focus();
    }
    return false;
    }

		
	// Nth Hierarchy Shortcuts
	if (objCase) {
		
	if (e.keyCode == escKey && $('#code_desc_popup').css('display') == 'block' ) {
      closeCodeDescriptionPopUp();
	  return false;    	  
    }
	
    if(e.altKey) {
                 if(e.keyCode==f6Key){
                   $('#accordion ul').hide();
                        for (i = 0; i <  $("#accordion li div").length; i++) {
                        var othersId = $("#accordion li div")[i];
                        $(othersId).removeClass("minus");
                             }
                             return false;   
                       }
                 else if(e.keyCode==f5Key){
                      $('#accordion ul').show();
                        for (i = 0; i <  $("#accordion li div").length; i++) {
                         var othersId = $("#accordion li div")[i];
                         $(othersId).addClass("minus");
                          }
                          return false;
                       }
                else if(e.keyCode==f1Key){ //focus on Search Textarea
                		   $('#icd11_list_input').focus();
                           $('#icd10_list_input').focus();
                        return false;
                       }
                else if(e.keyCode==f9Key){ //focus on category check true
                		 $("[name=searchCriteria2]").filter("[value=Category]").prop("checked",true);
                       $("[name=searchCriteria]").filter("[value=Category]").prop("checked",true);
                       return false;
                        }
                else if(e.keyCode==f10Key){ //focus on code check true
                		$("[name=searchCriteria2]").filter("[value=Code]").prop("checked",true);
                        $("[name=searchCriteria]").filter("[value=Code]").prop("checked",true);
                        return false;
                        }
                else if(e.keyCode==f11Key){ // focus on categoryandcode check true
                		$("[name=searchCriteria2]").filter("[value=CategoryAndCode]").prop("checked",true);
                        $("[name=searchCriteria]").filter("[value=CategoryAndCode]").prop("checked",true);
                        return false;
                        }
                else if(e.keyCode==f2Key){  // focus on search button
                		$('#icd11_list_input_search').click();
                        $('#icd10_list_input_search').click();
                       return false;
                        }
                else if(e.keyCode==f3Key){ //call reset button method
                       resetSearchCriteria();
                       return false;
                        }
               else if(e.keyCode==f7Key){ //call ICDCodes Expand button method
                       $("#icdCodeExpand_all").click();
                       return false;
                        }
              else if(e.keyCode==f8Key){ //call ICDCodes collapse button method
                      $("#icdCodeCollapse_all").click();
                       return false;
                        }                   
            }
             else  if(e.keyCode==upKey){ //moving up with orange frame
                         var focusId = document.activeElement.id ;
                          if(focusId != 'step_window'){
                              if(focusId.split("_")[0]=="medicalCodeRow")
                              if(($('#'+focusId)[0].previousSibling.id).split("_")[0]=="medicalCodeRow")
                                $("#"+$('#'+focusId)[0].previousSibling.id).trigger('focus');
                                else
                                $("#"+$('#'+focusId)[0].previousSibling.previousSibling.id).trigger('focus');
                              else 
                                $("#"+$("#"+focusId).parents()[0].previousSibling.firstChild.id).trigger('focus');;  
                         } 
                     return false;
                    }
            else  if(e.keyCode==downKey){  //moving down orange frame
                     var focusId = document.activeElement.id ;
                        if(focusId != 'step_window'){
                            if(focusId.split("_")[0]=="medicalCodeRow")
                              if(($('#'+focusId)[0].nextElementSibling.id).split("_")[0]=="medicalCodeRow")
                                $("#"+$('#'+focusId)[0].nextElementSibling.id).trigger('focus');
                                else
                               $("#"+$('#'+focusId)[0].nextElementSibling.nextElementSibling.id).trigger('focus');
                            else 
                               $("#"+$("#"+focusId).parents()[0].nextSibling.firstChild.id).trigger('focus');;  
                       }
                     return false;
                   }
           else  if(e.keyCode==rightKey){   // moving right to open orange frame
                         var focusId = document.activeElement.id;
                         if(focusId != 'step_window'){
                         var length=$('#'+focusId).next().length;
                         if(length!=0){
                        	 if($('#'+focusId).next().find('a').length!=0)
                           var nextId=$('#'+focusId).next().find('a')[0].id;
                           $("#"+focusId).click();
                           $('#'+nextId).trigger('focus');
                           }
                         }
                        return false;
                    }
             else if(e.keyCode==leftKey){  // moving left to close orange frame
                        var focusId = document.activeElement.id;
                        if(focusId != 'step_window'){
                            if(focusId.split("_")[0]=="medicalCodeRow"){
                                 if($('#'+focusId)[0].parentNode.previousSibling==null)
                                    $('#subcategory_'+lastSelSubcategory).trigger('focus');    
                                 else{
                                 $("#"+$('#'+focusId)[0].parentNode.previousSibling.id).click();
                                 $("#"+$('#'+focusId)[0].parentNode.previousSibling.id).trigger('focus');
                                 }                                
                            }
                            else if(focusId.split("_")[0]=="anchorAccordionCode"){
                                if(($("#"+focusId).parents()[2].firstChild.id).split("_")[0]!="anchorAccordionCode")
                                $('#subcategory_'+lastSelSubcategory).trigger('focus');
                                else{
                                $("#"+focusId).parents()[2].firstChild.click();
                                $("#"+$("#"+focusId).parents()[2].firstChild.id).trigger('focus');
                                }
                            }
                            else {
                            	if($("#"+focusId).parents()[2].firstChild.nodeName!='#text'){
                                $("#"+focusId).parents()[2].firstChild.click();
                                $("#"+$("#"+focusId).parents()[2].firstChild.id).trigger('focus');
                            	}
                                }
                         }
                          return false;
                    }
             else if(e.shiftKey && e.keyCode==f4Key){  // focus on fisrt 1st element of hierarchy navigation tree 
                            $('#anchorCategory_category_' + objDPInfo[0].id).trigger('focus'); 
                        return false;
                    }
          }
});