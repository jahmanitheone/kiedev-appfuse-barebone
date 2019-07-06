/** function: getSelectedMedicalCodeData(selectedCode)
 *  will retrun the meidcal hierarachy code data 
 */
function getSelectedMedicalCodeData(selectedCode){
  var selCodeToBeReplace =  JSON.parse(decodeURIComponent(selectedCode));
  //set hierarchyPopupCodeSelected true global variable defined in Step2.jsp
  window.opener.hierarchyPopupCodeSelected=true;
  var codeName=selCodeToBeReplace.name;
  var codeDesc=selCodeToBeReplace.description;
  var codeId=selCodeToBeReplace.id;
  var isrejected=true;
  var changedLegendValue;
  if(window.opener.$('#iws2_dp_legend1Lovs_' + currDpRowEntryId + ' :selected').text().trim() !=""){
    changedLegendValue = window.opener.$('#iws2_dp_legend1Lovs_' + currDpRowEntryId + ' :selected').text().trim();
     if(currDpRowLegendValue !=null && changedLegendValue!=currDpRowLegendValue){
    	 currDpRowLegendValue = changedLegendValue;
     }
  }
 // var ObjStep2QA1 = new ObjStep2Qa(caseId);
    //ObjStep2QA1.init();
    //get Current updated Object on child Window.
  var updatedobj=window.opener.currentUpdatedObject;
  var currentobj=JSON.parse(decodeURIComponent(updatedobj));
  var currow = window.opener.$('#datapointqa1row' + qa1DpRowCounter);
  window.opener.$('#dpform_detailsQA1_'+currOpenDpRowMasterId).remove();
  window.opener.$('#codeTableQA1_'+currOpenDpRowMasterId).remove();
  window.opener.$('#dpformQA1td_'+currOpenDpRowMasterId).remove();
  
  // assigned to qc slider window master id to be replaced  
  window.opener.dpqc1masterId = codeId;
  
  hierarchyPopUpWindow.close();
  //window.opener.$('#codeTableQA1_'+currOpenDpRowMasterId).css('display','none');
  currow.after("<td id=\"dpformQA1td_" + codeId + "\" colspan=\"7\" width=\"100%\"><table  class id=\"codeTableQA1_" + codeId + "\">" + "<tbody style=\"width : 500px; display : block;\">" + "<tr>" + "<td class=\"dpform_detailsQA1\" id=\"dpform_detailsQA1_" + codeId + "\">");
  $('.dpform_detailsQA1').html(getDataPointForm(null, codeName, codeDesc, codeId, codeId, codeId, currDpRowPageNumber, currDpRowEntryId, '', '', currDpRowPageId, currDpRowSectionRange, isrejected,qa1DpRowCounter,selCodeToBeReplace,codeId,'',currDpRowDataDate,currDpRowLegendValue,updatedobj));
  window.opener.$('#iws2_dp_datepicker_'+currDpRowEntryId+ '_' + codeName.replace(/\./g,'-')).focus();
  enabledSaveCancelDPButtonForhierarchy(currDpRowEntryId);
  window.opener.$('#iws2_dp_datepicker_'+currDpRowEntryId+ '_' + codeName.replace(/\./g,'-')).click();
}
/*
Function: enabledCompletButton()
This function is used for enabling the complete button for Step 2 QC

Page Actions:
- Step 2 QC in RHS for complete the data point.

*/

function enabledCompletButton() {
  var completeFlag = false;
 /*
  if((qsStageId == 48) || $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW) {
     checkboxName = "compcheckreportview";
   } else {
     checkboxName = "completecheckdplist";
   }*/
 
 /*
 $('input[name=' + checkboxName + ']').each(function() {
     if(!$(this).is(':checked')) {
       flag = true;
       return flag;
     }
   });*/
  completeFlag = getQCDpListCompleteStatus();
  return completeFlag;
}

/*
Function: refreshDPEntrieseData()
This function is used for refreshing all DPEntriese & BackGroundEntries data Step 2 QC1-QC2

Page Actions:
- Step 2 QC in RHS for complete the data point.

*/
function refreshDPEntrieseData()
{
    var objStep2Qa=new ObjStep2Qa(caseId);
    //objStep2Qa.getBackGroundEntries();
    objStep2Qa.loadDpEntries();
}
/** function: filterDpList()
 *  Filter dorpdown functionality   
 */
function filterDpList()
{
    if($('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW)
    {
     var objstep2qa = new ObjStep2Qa(caseId);
     objstep2qa.loadDpListObjects();
    }
    else
    {
        addTableDataPointsHandler(IWS2SCREENS_FULLDPLIST_REPORTVIEW);
    }
}
/** function: openQAReviewPopup()
 *  It will open QA review Note popup
 */
function openQAReviewPopup(dpListSerialNo, suspendNote , dpentryId) {
  
  disableSaveCancelBtn();
  
  if($('#data_point_QAReviewNote').css('display') == 'block') {
    $('#popup_QAReview_error_message').html('You must "Save" or "Cancel" this QA-Review Note before proceeding to the next entry.');
    $('#popup_QAReview_error_message').css('display', 'block');
    return;
  }

  $('#step2QA_review_popup_save_btn').val(i);
  $('#step2QA_review_popup_cancel_btn').val(dpListSerialNo);
  
  $('#saveBtn_entry').val(dpentryId);
  
  // Highlight the active DP entry id (sienna)
  $('#datapointqa1row' + (dpListSerialNo)).css('background-color', '#F87431');
  // Set the row number for cancel functionality

  var offsetTop;
  if($('#datapointqa1row' + dpListSerialNo).next().length != 0)
    offsetTop = $('#datapointqa1row' + (dpListSerialNo)).next().offset().top;
  else
    offsetTop = $('#datapointqa1row' + (dpListSerialNo)).offset().top + 30;

  var offsetLeft = ($('#datapointqa1row' + dpListSerialNo + ' td#datapointqa1col' + dpentryId).offset().left);
  // Set the location of the code description popup
  $('#data_point_QAReviewNote').offset({
    left : offsetLeft,
    top : offsetTop
  });
  // Dispaly the code description popup window
  $('#lblQAReviewNote').css('display', 'bold');
  $('#lblQAReviewNote').html('QA-Review Note:');
  $('#popup_QAReview_error_message').css('display', 'none');
  $('#data_point_QAReviewNote').css('display', 'block');
  $('#step2QA_reviewNote').val(suspendNote);
  $('textarea').expandingTextArea();
  $('#step2QA_reviewNote').focus();
}
/** function: cancelQAReviewNoteForDataPoint()
 * On cancel or escapse the popup and move highlight from the DP entry line.
 */

function cancelQAReviewNoteForDataPoint() {
  $('#data_point_QAReviewNote').css('display', 'none');
  $('#popup_QAReview_error_message').css('display', 'none');

  var rowNum = $('#step2QA_review_popup_cancel_btn').val();
  suspendNote = $('#step2QA_reviewNote').val();
  if(parseInt(rowNum) % 2 == 0)
    $('#datapointqa1row' + rowNum).css('background-color', '#E2E2E2');
  else
    $('#datapointqa1row' + rowNum).css('background-color', 'white');
}
/* function: eraseQAReviewNote()
 *  It will erase suspend Note fro, textarea.
 */

function eraseQAReviewNote(){
    $('#step2QA_reviewNote').val('');
    enableSaveCancelBtn();
}

/* function: enableSaveCancelBtn()
 *  It will enable save/cancel button on review popup
 */
function enableSaveCancelBtn(){
    $('#step2QA_review_popup_save_btn').removeAttr('disabled');
    $('#step2QA_review_popup_cancel_btn').removeAttr('disabled');
}

/* function: disableSaveCancelBtn()
 *  It will diable save/cancel button on review popup
 */
function disableSaveCancelBtn(){
  $("#step2QA_review_popup_save_btn").attr("disabled", "disabled");
  $("#step2QA_review_popup_cancel_btn").attr("disabled", "disabled");
}

/** function: closeHierarchyPopUp()
 *  It will close down Hierarchy PopUp window  
 */
function closeHierarchyPopUp(){
  hierarchyPopUpWindow.close();
}
/**function getCodeConfidence()
 * Return Code Confidence for QCAI Ggenerated code
 */
function getCodeConfidence(codeName,objQCAICodes)
{
 var confidence="";
 if(codeName!=null && objQCAICodes!=null ){
     for(var i=0;i<objQCAICodes.length;i++) 
   {
       
     if(objQCAICodes[i].returnValue!=null && objQCAICodes[i].ranking!=null &&(objQCAICodes[i].returnValue.toLowerCase() == codeName.toLowerCase())) {
            confidence = objQCAICodes[i].ranking;
            break;
        }
   }
 }
 return confidence;
}