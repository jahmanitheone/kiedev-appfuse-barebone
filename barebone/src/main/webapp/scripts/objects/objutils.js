/**
 * Replace all old value to a new value present in a string. 
 */
function replaceAll(txt, replace, newValue) {
  return txt.replace(new RegExp(replace, 'g'),newValue);
}

/** Dynamically set the jqeury date for the datapoints 
 * 
 * @param prfx - The prefix for the datapoint tag name
 * @param id - The datapoinit id
 */
function setJqueryDate(prfx,id,code,qcaiFlag)
{
	dateselector = "#" + prfx + id + '_' + code.replace(/\./g,'-') ; 
	if(qcaiFlag==''){
		if (clientDateFormat == 'mm/dd/yy' || clientDateFormat == 'mm/dd/yyyy') {
			window.opener.$(dateselector).datepicker({
				showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'mm/dd/yy',constrainInput: false }).blur(function() {
						    var txt = $(this).val();
						    $(this).val(txt.replace(/-\.| /g, '/'));
				});
		} else {
			window.opener.$(dateselector).datepicker({
				showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'dd/mm/yy' ,constrainInput: false  }).blur(function() {
					    var txt = $(this).val();
					    $(this).val(txt.replace(/-\.| /g, '/'));
				});
		}
	}else{
	if (clientDateFormat == 'mm/dd/yy' || clientDateFormat == 'mm/dd/yyyy') {
		$(dateselector).datepicker({
			showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'mm/dd/yy',constrainInput: false }).blur(function() {
					    var txt = $(this).val();
					    $(this).val(txt.replace(/-\.| /g, '/'));
			});
	} else {
		$(dateselector).datepicker({
			showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'dd/mm/yy' ,constrainInput: false  }).blur(function() {
				    var txt = $(this).val();
				    $(this).val(txt.replace(/-\.| /g, '/'));
			});
	}
}
}


function dspLoadingMsg(el,msg) {
	if(msg==null)
		msg = "Loading Data...";
	
	$(el).html('<div style="padding: 15px; margin-right: 15px; text-align:center; font-size: 1.2em; font-weight: bold;">' + msg + '<img title="Loading Data..." width="30px" height="30px" src="images/synodex-loader.gif"></div>');
}

/** By clicking on 'eraser image' from DP form 
 *  will remove  the content of DP date textbox
 * 
 * 
 * @param selValue: selected code
 * @param dpEntryId: selected DpEntry id
 */

function eraseDPDate(selValue,dpEntryId){
  codeValue = selValue.replace(/\./g,'-');
  $('#iws2_dp_datepicker_' + dpEntryId + '_' + codeValue).val('');  
}	
/** By clicking on 'eraser image' from DP form 
 *  will remove  the content of DP date textbox
 * 
 * 
 * @param id:id of date
 */
function eraseDataPointDate(id){
  $('#'+id).val('');  
  
}   
/** By clicking on 'eraser image' from DP form 
 *  will remove  the content of DP SuspendNote textbox
 * 
 * 
 * @param selValue: selected code
 * @param dpEntryId: selected DpEntry id
 */

function eraseSuspendDP(selValue,dpEntryId){
  codeValue = selValue.replace(/\./g,'-');
  $('#iws2_dp_suspendNote_' + dpEntryId + '_' + codeValue).val('');  
}	
/** By clicking on 'eraser image' from DP form 
 *  will remove  the content of DP RejectReason textbox
 * 
 * 
 * @param selValue: selected code
 * @param dpEntryId: selected DpEntry id
 */

function eraseRejectDP(selValue,dpEntryId){
  codeValue = selValue.replace(/\./g,'-');
  $('#iws2_dp_rejectReason_' + dpEntryId + '_' + codeValue).val('');  
}	
/* Function: scrollToPageVerticalPosition(pos)
*
* Scroll to a page vertical position
* 
* @param pos - position to go through
*/
function scrollToPageVerticalPosition(pos) {
	if(pos==null)
		pos = 0;
   	window.scroll(0,pos);
   	
   	return false;
}



function anyDPEntryChanges(){
  if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
  }
}
