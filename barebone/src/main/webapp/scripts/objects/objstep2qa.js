function ObjStep2Qa(caseID)
{
   var filter=null;
   this.caseId=caseID;
   this.bkgList;
   this.objDpList;
   this.init = function() {
           getCaseObject()
           $('#sweep_r_wrapper').hide();
           $('#sweep_r_wrapper_iws2_dplist').show();
           $('#data_point_table').hide();  
           $('#icd10code_wrapper_dpreview_iws2').attr("display","none");
           showDPHeaderInfo('cntnr_dplist_header');
           $('#thumbnail_slider_iws2').hide();
           $('#dp_qc1_div').hide();
           $('#dp_qc2_div').hide();
           if(qsStageId==7 || qsStageId==50){
            $('#dp_qc1_div').show();
            var filterList=["InComplete Only","Completes Only","QCAI Suggestions Only","QCAI Alerts Only","QCAI Issues Only"];
            // clear the filter list
            $('#iws2_dpfilter_full')[0].length = 1;
                  
            $.each(filterList, function(key, value) {
              $('#iws2_dpfilter_full').append($('<option></option>').attr('value', value).text(value));
            }); 
           }
           if(qsStageId==48)
            $('#dp_qc2_div').show();
        
        
    };
    this.loadDpListObjects=function(){
         /*IWO-19
        *Build Step2-QC Report-Style for the "Categorized Listing" Portion of the report
        * Remove BackGround Section from QC1 and QC2 Stage..
        */
        // this.getBackGroundEntries();  
         this.loadDpEntries();
         if(qsStageId==48){
         filter="";
         }else{
         filter=$('#iws2_dpfilter_full').val();    
         }
         var objstep2qaview = new ObjStep2QaView();
         objstep2qaview.step2qaview(this.bkgList,this.objDpList,filter);
    };
    this.getBackGroundEntries=function()
    {
        var bckGroundList=null;
        var url = "dataPoint/loadBackGroundDPEntries/" +this.caseId;
        jQuery.ajax({  
            url: url,
            async: false,
            context: document.body,
            success: function(dp) {
                 bckGroundList=dp;
                
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
                displayErrorDialog(dateTime, userName, sessionId, caseId, "getBackGroundEntries()", errorThrown);
            }
         }); 
        this.bkgList=bckGroundList;
        if(this.bkgList !=null && this.bkgList.length>0)
    		$('#iws2_dpfilter_full_complete_span').val(encodeURIComponent(JSON.stringify(this.bkgList)));
    }
    this.loadDpEntries=function()
    {
        var dpList=null;
        var url="";
        if(qsStageId==48)
        url = "dataPoint/loadDPEntries/"+this.caseId+"/true";
        else 
        url = "dataPoint/loadDPEntries/"+this.caseId+"/false"; 
        jQuery.ajax({  
            url: url,
            async: false,
            context: document.body,
            success: function(dp) {
                 dpList=dp;
                
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
                displayErrorDialog(dateTime, userName, sessionId, caseId, "loadDpEntries()", errorThrown);
            }
        }); 
        this.objDpList=dpList;
        if(this.objDpList !=null && this.objDpList.length>0)
        	$('#iws2_dpfilter_full_complete_button').val(encodeURIComponent(JSON.stringify(this.objDpList)));
        
    }
}
/*
Function: updateIsCompletedDPListData()
This function is used for check the complete checkbox for Step 2 QC

Page Actions:
- Step 2 QC in RHS for complete the data point.

*/
function updateIsCompletedDPListData(dpEntryId){
    var map = new Object(); 
    
    if (dpEntryId != null) {
        map['dpentryid'] = dpEntryId;
        var checked=$('#complete_check_'+dpEntryId).val();
        if(checked == 'N'){
            $('#complete_check_'+dpEntryId).prop('checked');
            $('#complete_check_'+dpEntryId).val('Y');
            map['isCompleted'] = true;
        }
        else{
            $('#complete_check_'+dpEntryId).attr('checked', false);
            $('#complete_check_'+dpEntryId).val('N');
            map['isCompleted'] = false;
        }
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
            displayErrorDialog(dateTime, userName, sessionId, "updateIsCompletedDPListData", errorThrown);
        }
    });
    refreshDPEntrieseData();
    enableDisableCompleteButtonWhenCheckBoxChecked();
}

/**  function: enableDisableCompleteButtonWhenCheckBoxChecked()
 *   Checking all checkbox are checked or not and enable or disable the complete button accordingly.
 */
function enableDisableCompleteButtonWhenCheckBoxChecked(){   
    var flag=enabledCompletButton();
    if(!flag){
        if(qsStageId == 7 || qsStageId == 50)
            $('#iws2_dpfilter_full_complete_button').prop('disabled',true);
        if(qsStageId == 48)
            $('#iws2_qc2_dpfilter_full_complete_button').prop('disabled', true);
    }else{
        if(qsStageId == 7 || qsStageId == 50)
            $('#iws2_dpfilter_full_complete_button').removeAttr('disabled');
        if(qsStageId ==48)
             $('#iws2_qc2_dpfilter_full_complete_button').removeAttr('disabled');
    }
}

/**  function: saveQAReviewNoteForDataPoint()
 *   It wil save QA Review Note for selected Dat entry row
 */
function saveQAReviewNoteForDataPoint() {
  var map = new Object();
  map['suspendnote'] = $('#step2QA_reviewNote').val();
  var entryId = $('#saveBtn_entry').val();

  var url = "dataPoint/dataPointEntryIWS2Update/" + entryId;
  jQuery.ajax({
    type : "POST",
    url : url,
    async : false,
    data : {
      '_method' : 'PUT',
      entry : map
    },
    success : function(updateddpEntryId) {
      //       completeEntryMap[entryId]="Y";
      $('#popup_QAReview_error_message').val("");
      $('#data_point_QAReviewNote').css('display', 'none');
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
      displayErrorDialog(dateTime, userName, sessionId, caseId, "saveQAReviewNoteForDataPoint(" + ids + ")", errorThrown);
    }
  });
  var objstep2qa = new ObjStep2Qa(caseId);
   objstep2qa.loadDpListObjects();
}

/**
 *function:getMedicalCodeObject(arg)  
 * @param {Object} codeId
 * return medicalHierarchyObject
 */
function getMedicalCodeObject (codeId) {
    var codeObject=null;
  $.ajax({
        type: "POST",
        url: "medicalhiearchy/medicalCode/" + codeId,
        async: false,
        success: function(medicalCodaData) {
            codeObject = medicalCodaData;
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
    return codeObject;
}
