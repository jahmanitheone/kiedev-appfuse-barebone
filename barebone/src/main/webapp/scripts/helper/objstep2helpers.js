/**
 * Helper Function for Step 2 Screen Manipulation After Display
 * @author: Debabrata Jena
 * @dated:  07/27/2102
 */

/** Load Dp entry forms with populated data if exists
 * 
 * @param dpEntry - Dp entry object contains DP entry form data
 * @param code - selected code Name
 * @param desc - selected code Description
 * @param masterCodeId - coice Id
 * @param codeType - code Type
 * @param version - code version
 */
function getDataPointForm(newDpEntry, code,desc,masterCodeId,codeType,version, flagobject, currentDPEntryId,suspendnote,fromDataPointfullListIndicator,dpentryId,section,isRejected,rejectReason,selectedMedicalCode,currOpenDpRowMasterId,qcaiReplaceflag,dpDate,legendDataValue,previousObj){
  var dpEntry = newDpEntry;
	var selvalue = code;
	var seldesc = desc;
	var masterId = masterCodeId;
	var type = codeType;
	var codeVersion = version;
	var selectedCode;
	var currRowCount;
	var dpEntryId = null;
	var pageNo;
	var pageNumber;
	var sectionNumber;
	var currPageId;
	var qcaiReturnStatus;
	var qcaiReturnValue;
	var qcaiCode = rejectReason;
	var qcaiCodeReview=null;
	var previousCode;
	var isCritical=null;
	var userFeedBack=null;
	var prevHid = currOpenDpRowMasterId;
	var isPageView = $('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW;
	var codeScale=null;
	
	if($("#iws2_subc_input_pagesection_null").length >= 1 && newDpEntry==null){
		alert("You must either Save or Cancel changes in the previous DataPoint or close the previous DataPointForm before proceeding further.");
		$("#iws2_subc_input_pagesection_null").focus();
		return;
	}
	
	if((qsStageId ==7 && isPageView) || qsStageId==6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71){ //IWN-382: 3-way split of Step-2-OP
	   var tbl =  $('#codeTable_' + masterId );
	}else{
		if(qsStageId ==7 && $('#iws2_dpfilter_full_pageview_button').html() == IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			var tbl =  $('#codeTable_' + masterId );
			for ( var j = 0; j < medicalCodes.length; j++) {
				if(medicalCodes[j].id == masterCodeId){
					selectedCode = medicalCodes[j];
					break;
				}
			}
			//pageNo = flagobject;
			//dpEntryId = currentDPEntryId;
			//currPageId = dpentryId;
		}else{
			selectedCode = selectedMedicalCode;
			if(currOpenDpRowMasterId==null){
			currRowCount = flagobject;
			pageNo = flagobject;
			var tbl =  $('#codeTableQA1_' + masterId );
			}else{
				if(qcaiReplaceflag == true){
					var tbl =  $('#codeTableQA1_' + currOpenDpRowMasterId );	
				}else{
					var tbl =  window.opener.$('#codeTableQA1_' + currOpenDpRowMasterId);	
				}
			dpEntryId = currentDPEntryId;
			currPageId = dpentryId;
			currRowCount = rejectReason;
			}
		}
	}
	pageNo = flagobject;
	var rowCount;
	var dataPointFullListIndicator = fromDataPointfullListIndicator;
	var dpSecBeg="_", dpSecEnd="_";
	var revision;
	var sesctionRange;
	
	// if need to create new DP entrry form , row count should be at top
  dpformaction = "update"; 
  if($("#iws2_subc_input_pagesection_null").length >= 1)
  {
      dpformaction = "new"; 
  }
  if(dpEntry == null)
  {
      rowCount = 1;
      dpformaction = "new"; 
  }
  else
      rowCount = tbl[0].rows.length + 1;
	var newRow = tbl[0].insertRow(rowCount - 1);
	var randomnumber = Math.floor(Math.random()*100);
	var randome2 = Math.floor(Math.random()*100)
	

  if(emptyDpEntryId == null && (currentDPEntryId == null || currentDPEntryId == 'null')) {
    // hide delete button if empty dp form
    $('#codeDeleteCell_' + emptyDpEntryId + '_' + code).hide();
    $('#codePagePopup_' + emptyDpEntryId + '_' + code).hide();     // hide pencil image if empty dp form 
    // if empty DP form data not saved yet
    if(savedDpEntryId == null && dpEntry == null) {
      alert("Please save the current DP entry !");
      return;
    }
  }
	
	// fetch selected code detail
  if(qsStageId!=7 && qsStageId!=48 && qsStageId!=50){
	for ( var j = 0; j < medicalCodes.length; j++) {
		if(medicalCodes[j].id == masterCodeId){
			selectedCode = medicalCodes[j];
			break;
		}
	}
  }else{
	if(selectedCode==null)
	$.ajax({
		type: "POST",
	  	url: "medicalhiearchy/medicalCode/" + masterCodeId,
	  	async: false,
	  	success: function(medicalCodaData) {
	  		selectedCode = medicalCodaData;
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
	
	// initialize all data field lable values;
	// totalDatafieldsAllowed = 8;

  /*
  var dataFieldLabel1, dataFieldLabel2, dataFieldLabel3, dataFieldLabel4, dataFieldLabel5, dataFieldLabel6, dataFieldLabel7, dataFieldLabel8; 
    var dataFieldLabel1Type, dataFieldLabel2Type, dataFieldLabel3Type, dataFieldLabel4Type, dataFieldLabel5Type, dataFieldLabel6Type, dataFieldLabel7Type, dataFieldLabel8Type;     
    var dataField1Value, dataField2Value, dataField3Value, dataField4Value, dataField5Value, dataField6Value, dataField7Value, dataField8Value;
    var dataFieldLovs1, dataFieldLovs2 , dataFieldLovs3, dataFieldLovs4, dataFieldLovs5, dataFieldLovs6, dataFieldLovs7, dataFieldLovs8;  
            dataFieldLabel1= dataFieldLabel2= dataFieldLabel3= dataFieldLabel4= dataFieldLabel5= dataFieldLabel6= dataFieldLabel7= dataFieldLabel8 = null;
    dataFieldLabel1Type= dataFieldLabel2Type= dataFieldLabel3Type= dataFieldLabel4Type= dataFieldLabel5Type= dataFieldLabel6Type= dataFieldLabel7Type= dataFieldLabel8Type= null;
    dataField1Value= dataField2Value= dataField3Value= dataField4Value= dataField5Value= dataField6Value= dataField7Value= dataField8Value= null;
    dataFieldLovs1= dataFieldLovs2 = dataFieldLovs3= dataFieldLovs4= dataFieldLovs5= dataFieldLovs6= dataFieldLovs7= dataFieldLovs8 = null;*/
  
	
	isText = null;
	
	
	var dataFieldLabel = new Array();
	var dataFieldLabelType = new Array();
	var dataFieldLovs = new Array();
	var dataFieldValue = new Array();
	
	// fetching  all datafields structure
	if(selectedCode != null){
	  for (var i=0; i < selectedCode.dataFieldLabels.length; i++) {
	    
	    dataFieldLabel[i] = selectedCode.dataFieldLabels[i];
	    if(dataFieldLabel[i] != null){
			   dataFieldLabelType[i] = selectedCode.dataFieldTypes[i];
			   if(dataFieldLabelType[i].toLowerCase() == 'lovs'|| dataFieldLabelType[i].toLowerCase()=='combo')
            dataFieldLovs[i] = loadDPLovValues(selectedCode.dataFieldRefs[i]);
      }      
		}
		revision = selectedCode.revision;
	}
	
	
	// fetch all dynmacic datafields label and their types
	/*
	if(selectedCode!=null){
			if(selectedCode.dataField1!=null){
				dataFieldLabel1 = selectedCode.dataField1;
				dataFieldLabel1Type = selectedCode.dataField1Type;
				if(dataFieldLabel1Type.toLowerCase() == 'lovs'|| dataFieldLabel1Type.toLowerCase()=='combo')
					dataFieldLovs1 = loadDPLovValues(selectedCode.dataField1Ref);
			}	
			if(selectedCode.dataField2!=null){
				dataFieldLabel2 = selectedCode.dataField2;
				dataFieldLabel2Type = selectedCode.dataField2Type;
				if(dataFieldLabel2Type.toLowerCase() == 'lovs' || dataFieldLabel2Type.toLowerCase()=='combo')
					dataFieldLovs2 = loadDPLovValues(selectedCode.dataField2Ref);
			}	
			if(selectedCode.dataField3!=null){
				dataFieldLabel3 = selectedCode.dataField3;
				dataFieldLabel3Type = selectedCode.dataField3Type;
				if(dataFieldLabel3Type.toLowerCase() == 'lovs' || dataFieldLabel3Type.toLowerCase()=='combo')
					dataFieldLovs3 = loadDPLovValues(selectedCode.dataField3Ref);
			}	
			if(selectedCode.dataField4!=null){
				dataFieldLabel4 = selectedCode.dataField4;
				dataFieldLabel4Type = selectedCode.dataField4Type;
				if(dataFieldLabel4Type.toLowerCase() == 'lovs' || dataFieldLabel4Type.toLowerCase()=='combo')
					dataFieldLovs4 = loadDPLovValues(selectedCode.dataField4Ref);
			}
			// For performance reason check for datafield5 if exists the nonly load others		
			if(selectedCode.dataField5 != null) {
				dataFieldLabel5 = selectedCode.dataField5;
				dataFieldLabel5Type = selectedCode.dataField5Type;
				if(dataFieldLabel5Type.toLowerCase() == 'lovs' || dataFieldLabel5Type.toLowerCase()=='combo')
					dataFieldLovs5 = loadDPLovValues(selectedCode.dataField5Ref);
						if(selectedCode.dataField6 != null) {
					dataFieldLabel6 = selectedCode.dataField6;
					dataFieldLabel6Type = selectedCode.dataField6Type;
					if(dataFieldLabel6Type.toLowerCase() == 'lovs' || dataFieldLabel6Type.toLowerCase()=='combo')
						dataFieldLovs6 = loadDPLovValues(selectedCode.dataField6Ref);
				}
				if(selectedCode.dataField7 != null) {
					dataFieldLabel7 = selectedCode.dataField7;
					dataFieldLabel7Type = selectedCode.dataField7Type;
					if(dataFieldLabel7Type.toLowerCase() == 'lovs' || dataFieldLabel7Type.toLowerCase()=='combo')
						dataFieldLovs7 = loadDPLovValues(selectedCode.dataField7Ref);
				}
				if(selectedCode.dataField8 != null) {
					dataFieldLabel8 = selectedCode.dataField8;
					dataFieldLabel8Type = selectedCode.dataField8Type;
					if(dataFieldLabel8Type.toLowerCase() == 'lovs' || dataFieldLabel8Type.toLowerCase()=='combo')
						dataFieldLovs8 = loadDPLovValues(selectedCode.dataField8Ref);
				}
			}
	
			revision = selectedCode.revision;
		}
		*/
	
	
	// fetch all dynmaic datafields data
	if(dpEntry != null){
		if(((qsStageId == 7 || qsStageId == 50 ) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW) || qsStageId == 48){   //The dpEntry object is using the CategorizedView Bean object.
			dpEntryId = dpEntry.entryId;
			lastDpEntryId = dpEntryId;
			pageId = dpEntry.pageId;
			qcaiReturnStatus = dpEntry.returnStatus;
			qcaiReturnValue = dpEntry.returnValue;
			previousCode = dpEntry.hidPrevious;
			qcaiCodeReview = dpEntry.qcaiCodesView;
	    	pageNumber = dpEntry.finalPageNumber;
	    	isCritical=dpEntry.isCritical;
	    	codeScale=dpEntry.codeScale;
	    	if(dpEntry.sectionRange.indexOf("-") != -1){
	    		sesctionRange = dpEntry.sectionRange.split("-");
	    		dpSecBeg = sesctionRange[0];
	    		dpSecEnd = sesctionRange[1];
	    	}else{
				dpSecBeg = dpEntry.sectionRange;
				dpSecEnd = dpEntry.sectionRange;
	    	}
	     }else{     //The dpEntry object is using the DataPointEntry Bean object.
			dpEntryId = dpEntry.dpentryid;
			lastDpEntryId = dpEntryId;
			pageId = dpEntry._page.id;
			pageNumber = dpEntry._page.finalPageNumber;
			dpSecBeg = dpEntry.startSectionNumber;
			dpSecEnd = dpEntry.endSectionNumber;
         }
     
     // fetching  all datafields Values
     for (var i=0; i < dataFieldLabel.length; i++) {
       if(dataFieldLabel[i] != null){
         if(dataFieldLabel[i].toLowerCase() == 'transcript')
            isText = dpEntry.isText;
            dataFieldValue[i] = dpEntry.dataFieldValues[i];
            if(dataFieldValue[i] == null || dataFieldValue[i] == 'null')
                dataFieldValue[i] = "";
         }
     }
     
     
     
     
     
/*
		 if(dataFieldLabel1 != null) {
                if(dataFieldLabel1.toLowerCase() == 'transcript')
                    isText = dpEntry.isText;
                dataField1Value = dpEntry.dataField1Value;
                if(dataField1Value == null || dataField1Value == 'null')
                    dataField1Value = "";
            }
            if((dataFieldLabel2 != null)) {
                if(dataFieldLabel2.toLowerCase() == 'transcript')
                    isText = dpEntry.isText;
                dataField2Value = dpEntry.dataField2Value;
                if(dataField2Value == null || dataField2Value == 'null')
                    dataField2Value = "";
            }
            if(dataFieldLabel3 != null) {
                if(dataFieldLabel3.toLowerCase() == 'transcript')
                    isText = dpEntry.isText;
                dataField3Value = dpEntry.dataField3Value;
                if(dataField3Value == null || dataField3Value == 'null')
                    dataField3Value = "";
            }
            if((dataFieldLabel4 != null)) {
                if(dataFieldLabel4.toLowerCase() == 'transcript')
                    isText = dpEntry.isText;
                dataField4Value = dpEntry.dataField4Value;
                if(dataField4Value == null || dataField4Value == 'null')
                    dataField4Value = "";
            }

    //For performance reason check for datafield5 if exists the nonly load others    
        
            if((dataFieldLabel5 != null)) {
                if(dataFieldLabel5.toLowerCase() == 'transcript')
                    isText = dpEntry.isText;
                dataField5Value = dpEntry.dataField5Value;
                if(dataField5Value == null || dataField5Value == 'null')
                    dataField5Value = "";

                if((dataFieldLabel6 != null)) {
                    if(dataFieldLabel6.toLowerCase() == 'transcript')
                        isText = dpEntry.isText;
                    dataField6Value = dpEntry.dataField6Value;
                    if(dataField6Value == null || dataField6Value == 'null')
                        dataField6Value = "";
                }
                if((dataFieldLabel7 != null)) {
                    if(dataFieldLabel7.toLowerCase() == 'transcript')
                        isText = dpEntry.isText;
                    dataField7Value = dpEntry.dataField7Value;
                    if(dataField7Value == null || dataField7Value == 'null')
                        dataField7Value = "";
                }
                if((dataFieldLabel8 != null)) {
                    if(dataFieldLabel8.toLowerCase() == 'transcript')
                        isText = dpEntry.isText;
                    dataField8Value = dpEntry.dataField8Value;
                    if(dataField8Value == null || dataField8Value == 'null')
                        dataField8Value = "";
                }
            }
         
		*/

		
	sectionNumber = dpEntry.sectionnumber;
	dataDate = millisToDateHandler(dpEntry.dataDate);
	userFeedBack=dpEntry.userFeedback;
		
	//Doing Full DP List processing
	if( isFullDpListScreen() ){
		setFullDPListRowData(dpEntry);		//Save this object for later use instead of load dpEntry again
	}
	}else{
	  // hide plus image from last dp entry from whcih plus image btn clicked 
	  if(currentDPEntryId != null && currentDPEntryId != 'null')
        $('#codeAddCell_'+ currentDPEntryId).hide();
        
		$('#codeDeleteCell_' + dpEntryId + '_' + code).hide();
		$('#codePagePopup_'  + dpEntryId + '_' + code).hide();
		if(qsStageId==7  && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW || qsStageId == 50 ){
			gridselectorbegendobj = null;
		}
		if(selectedPageNumber != null)  
		  pageNumber = selectedPageNumber;
		if(selectedPageNumber == 'undefined' || selectedPageNumber == null){
			if(objActivePage!=null)
				pageNumber = objActivePage.finalPageNumber;
		}
		if(selectedSectionNumber != null)  
		  sectionNumber = selectedSectionNumber.substring(0,1);
		if(selectedSectionNumber==undefined || selectedSectionNumber=='undefined')
		   selectedSectionNumber = dpSecBeg+"-"+dpSecEnd
		if(isGridObjectBegEndValid())
		{
			sectionNumber = gridselectorbegendobj.begpos;
			dpSecBeg = gridselectorbegendobj.begpos;
			dpSecEnd = gridselectorbegendobj.endpos;
		} else
		{  
			if(selectedSectionNumber=="_-_")
			gridselectorbegendobj = getObjGridSelectionBegEndFrom(section);
			else
			gridselectorbegendobj = getObjGridSelectionBegEndFrom(selectedSectionNumber);	
			if(isGridObjectBegEndValid())
			{
				dpSecBeg = gridselectorbegendobj.begpos;
				dpSecEnd = gridselectorbegendobj.endpos;
			}
		}
		if(objActivePage!=null)
			pageId = objActivePage.id;
		savedDpEntryId  = null;
		emptyDpEntryId = null;
		dataDate = "";
		
		
		// setting all datafields values as blank
		for (var i=0; i < dataFieldLabel.length; i++) {
			dataFieldValue[i] = ""
		}
		
		/*
		//set all data field from (1-8) null 
				 dataField1Value = "";
				 dataField2Value = "";
				 dataField3Value = "";
				 dataField4Value = "";
				 dataField5Value = "";
				 dataField6Value = "";
				 dataField7Value = "";
				 dataField8Value = "";   */
				
				
		
		  //set all dynamic fields when we choosed an code from hierarchy/ replace by code for Step QC1,QC2,QC Review   
		  if(window.opener!=null && qsStageId!=6 && qsStageId != 66 && qsStageId != 67 && qsStageId != 68 && qsStageId != 71) //IWN-382: 3-way split of Step-2-OP
		  {
		      hierarchyPopupCodeSelected=window.opener.hierarchyPopupCodeSelected;
		  }    		
	      if((hierarchyPopupCodeSelected)&& qsStageId!=6 && qsStageId != 66 && qsStageId != 67 && qsStageId != 68 && qsStageId != 71){ //IWN-382: 3-way split of Step-2-OP
            var preObj = JSON.parse(decodeURIComponent(previousObj));
            
            //set all data field with updated Object
            for (var i=0; i < selectedCode.dataFieldLabels.length; i++) {
                if(selectedCode.dataFieldLabels != null && preObj.dataFieldLabel[i] != null && (selectedCode.dataFieldLabels[i].toLowerCase() == preObj.dataFieldLabel[i].toLowerCase())) {
                  if(selectedCode.dataFieldTypes[i].toLowerCase() == preObj.dataFieldLabelType[i].toLowerCase())
                      dataFieldValue[i] = preObj.dataFieldValue[i];
                  else
                      dataFieldValue[i] = "";
                } else
                    dataFieldValue[i] = "";
            }
            
            
            
            
         /*
            if(selectedCode.dataField1 != null && preObj.dataFieldLabel1 != null && (selectedCode.dataField1.toLowerCase() == preObj.dataFieldLabel1.toLowerCase())) {
                         if(selectedCode.dataField1Type.toLowerCase() == preObj.dataFieldLabel1Type.toLowerCase())
                             dataField1Value = preObj.dataField1Value;
                         else
                             dataField1Value = "";
                     } else
                         dataField1Value = "";
                     if(selectedCode.dataField2 != null && preObj.dataFieldLabel2 != null && (selectedCode.dataField2.toLowerCase() == preObj.dataFieldLabel2.toLowerCase())) {
                         if(selectedCode.dataField2Type.toLowerCase() == preObj.dataFieldLabel2Type.toLowerCase())
                             dataField2Value = preObj.dataField2Value;
                         else
                             dataField2Value = "";
                     } else
                         dataField2Value = "";
                     if(selectedCode.dataField3 != null && preObj.dataFieldLabel3 != null && (selectedCode.dataField3.toLowerCase() == preObj.dataFieldLabel3.toLowerCase())) {
                         if(selectedCode.dataField3Type.toLowerCase() == preObj.dataFieldLabel3Type.toLowerCase())
                             dataField3Value = preObj.dataField3Value;
                         else
                             dataField3Value = "";
                     } else
                         dataField3Value = "";
                     if(selectedCode.dataField4 != null && preObj.dataFieldLabel4 != null && (selectedCode.dataField4.toLowerCase() == preObj.dataFieldLabel4.toLowerCase())) {
                         if(selectedCode.dataField4Type.toLowerCase() == preObj.dataFieldLabel4Type.toLowerCase())
                             dataField4Value = preObj.dataField4Value;
                         else
                             dataField4Value = "";
                     } else
                         dataField4Value = "";
                     if(selectedCode.dataField5 != null && preObj.dataFieldLabel5 != null && (selectedCode.dataField5.toLowerCase() == preObj.dataFieldLabel5.toLowerCase())) {
                         if(selectedCode.dataField5Type.toLowerCase() == preObj.dataFieldLabel5Type.toLowerCase())
                             dataField5Value = preObj.dataField5Value;
                         else
                             dataField5Value = "";
                     } else
                         dataField5Value = "";
                     if(selectedCode.dataField6 != null && preObj.dataFieldLabel6 != null && (selectedCode.dataField6.toLowerCase() == preObj.dataFieldLabel6.toLowerCase())) {
                         if(selectedCode.dataField6Type.toLowerCase() == preObj.dataFieldLabel6Type.toLowerCase())
                             dataField6Value = preObj.dataField6Value;
                         else
                             dataField6Value = "";
                     } else
                         dataField6Value = "";
                     if(selectedCode.dataField7 != null && preObj.dataFieldLabel7 != null && (selectedCode.dataField7.toLowerCase() == preObj.dataFieldLabel7.toLowerCase())) {
                         if(selectedCode.dataField7Type.toLowerCase() == preObj.dataFieldLabel7Type.toLowerCase())
                             dataField7Value = preObj.dataField7Value;
                         else
                             dataField7Value = "";
                     } else
                         dataField7Value = "";
                     if(selectedCode.dataField8 != null && preObj.dataFieldLabel8 != null && (selectedCode.dataField8.toLowerCase() == preObj.dataFieldLabel8.toLowerCase())) {
                         if(selectedCode.dataField8Type.toLowerCase() == preObj.dataFieldLabel8Type.toLowerCase())
                             dataField8Value = preObj.dataField8Value;
                         else
                             dataField8Value = "";
                     } else
                         dataField8Value = "";*/
         
         
         
                //set Updated data Date 
                dataDate=preObj.dataDate;
                userFeedBack=preObj.userFeedback;
                    //set every end of this method to false
                  
            if(window.opener != null)
                window.opener.hierarchyPopupCodeSelected = false;
            else
                hierarchyPopupCodeSelected = false;

            //set Previous code Id to Show Previous code
            prevHid=preObj.hidPrevious;
            
          }
        //set Critical
        if(selectedCode.isCritical!=null)
        isCritical=selectedCode.isCritical;
        if(selectedCode.codeScale!=null)
        codeScale=selectedCode.codeScale;
        
	  if(lastDpEntryId!=null){
      // hide all if last dp entry has data exists
     // $('#codeAddCell_'+ lastDpEntryId).hide();
    }

	}
	var newRowCount = selvalue.replace("." , "") + "_" + randome2 + "_" + randomnumber;

	setFullDPListProcessingData(dpEntry);
       if(selectedSectionNumber==undefined || selectedSectionNumber=='undefined')
		   selectedSectionNumber = dpSecBeg+"-"+dpSecEnd
		   if(qsStageId==7  && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW || qsStageId == 50){
				gridselectorbegendobj = null;
			}
     
	if(gridselectorbegendobj==null)
	{
		if(selectedSectionNumber=="_-_")
			gridselectorbegendobj = getObjGridSelectionBegEndFrom(section);
			else
			gridselectorbegendobj = getObjGridSelectionBegEndFrom(selectedSectionNumber);
		if(isGridObjectBegEndValid())
		{
			dpSecBeg = gridselectorbegendobj.begpos;
			dpSecEnd = gridselectorbegendobj.endpos;			
		}
	}
       if(qsStageId == 7  && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW|| qsStageId == 50) {
       selectedSectionNumber=undefined;
       //gridselectorbegendobj = null;
       }
	//Set up the ICD10 Screen data
	var icd10obj = new ObjICD10SubCategoryScreen();
	icd10obj.codeVersion = codeVersion;
	icd10obj.type = type; 
	icd10obj.masterId = masterId;
	icd10obj.dpEntryId = dpEntryId;
	icd10obj.selvalue = selvalue;
	icd10obj.seldesc = seldesc;
	icd10obj.rowCount = rowCount;
	icd10obj.newRowCount = newRowCount;
	if(pageNumber!=null){
	icd10obj.pageNumber = pageNumber;
	}else{
	icd10obj.pageNumber = pageNo
	}
	if(pageId!=null){
		icd10obj.pageId = pageId;
	}else{
	icd10obj.pageId = currPageId;
	}
	icd10obj.sectionNumber = sectionNumber;
	if(dataDate!=""){
	icd10obj.dataDate = dataDate;
	}else{
		if(dpDate!=null)
		icd10obj.dataDate = dpDate;
		else
		icd10obj.dataDate = "";
	}
	icd10obj.dataFieldLabel = dataFieldLabel;
  icd10obj.dataFieldLabelType = dataFieldLabelType;
  icd10obj.dataFieldLovs = dataFieldLovs;
  icd10obj.dataFieldValue = dataFieldValue;
	
	/*
	icd10obj.dataFieldLabel1 = dataFieldLabel1;
	icd10obj.dataFieldLabel2 = dataFieldLabel2;
	icd10obj.dataFieldLabel3 = dataFieldLabel3;
	icd10obj.dataFieldLabel4 = dataFieldLabel4;
	icd10obj.dataFieldLabel5 = dataFieldLabel5;
    icd10obj.dataFieldLabel6 = dataFieldLabel6;
    icd10obj.dataFieldLabel7 = dataFieldLabel7;
    icd10obj.dataFieldLabel8 = dataFieldLabel8;
    
	icd10obj.dataFieldLabel1Type = dataFieldLabel1Type;
	icd10obj.dataFieldLabel2Type = dataFieldLabel2Type;
	icd10obj.dataFieldLabel3Type = dataFieldLabel3Type;
	icd10obj.dataFieldLabel4Type = dataFieldLabel4Type;
	icd10obj.dataFieldLabel5Type = dataFieldLabel5Type;
    icd10obj.dataFieldLabel6Type = dataFieldLabel6Type;
    icd10obj.dataFieldLabel7Type = dataFieldLabel7Type;
    icd10obj.dataFieldLabel8Type = dataFieldLabel8Type;
        
    icd10obj.dataField1Value = dataField1Value;
    icd10obj.dataField2Value = dataField2Value;
    icd10obj.dataField3Value = dataField3Value;
	icd10obj.dataField4Value = dataField4Value;
	icd10obj.dataField5Value = dataField5Value;
    icd10obj.dataField6Value = dataField6Value;
    icd10obj.dataField7Value = dataField7Value;
    icd10obj.dataField8Value = dataField8Value;
  
	icd10obj.dataFieldLovs1 = dataFieldLovs1;
	icd10obj.dataFieldLovs2 = dataFieldLovs2;
	icd10obj.dataFieldLovs3 = dataFieldLovs3;
	icd10obj.dataFieldLovs4 = dataFieldLovs4;
	icd10obj.dataFieldLovs5 = dataFieldLovs5;
    icd10obj.dataFieldLovs6 = dataFieldLovs6;
    icd10obj.dataFieldLovs7 = dataFieldLovs7;
    icd10obj.dataFieldLovs8 = dataFieldLovs8;*/
  
	icd10obj.suspendnote = suspendnote;
	icd10obj.isRejected = isRejected;
	icd10obj.rejectReason = rejectReason;
	icd10obj.secBeg = dpSecBeg;
	icd10obj.secEnd = dpSecEnd;
	icd10obj.revision = revision;
	icd10obj.isText = isText;
	icd10obj.currRowCount = currRowCount;
	icd10obj.qcaiReturnStatus = qcaiReturnStatus;
	icd10obj.qcaiReturnValue = qcaiReturnValue;
	icd10obj.hidPrevCode = previousCode;
	if(qcaiCode!=null){
	icd10obj.qcaiCodedesc = qcaiCode[0].description;
	icd10obj.qcaiCodeViewdesc = qcaiCode;
	}
	icd10obj.prevHid = prevHid;
	icd10obj.qcaiCodeReview = qcaiCodeReview;
	icd10obj.isCritical=isCritical;
	icd10obj.codeScale=codeScale;
	icd10obj.userFeedBack=userFeedBack;
	if(qsStageId!=6 && qsStageId != 66 && qsStageId != 67 && qsStageId != 68 && qsStageId != 71 && previousObj!=null){  //IWN-382: 3-way split of Step-2-OP
        var preObj = JSON.parse(decodeURIComponent(previousObj));
        icd10obj.qcaiCodeViewdesc = preObj.qcaiCodeViewdesc;
        icd10obj.hidPrevCode = preObj.hidPrevCode;
	 }
	newRow.id = newRowCount;
	var newCell = newRow.insertCell(0);	
	var form=null;
	var newCellCount = selvalue.replace("." , "") + "_" + codeVersion + "_" + randomnumber;
	newCell.id = newCellCount
	icd10obj.newCellCount = newCellCount;
	
	if(qsStageId==48 || ((qsStageId==7  || qsStageId == 50 ) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW))		//Step 2 QC1 and QCReview 
	{
		form = getStep2ICD10ScreenForQA(icd10obj);
	}
	else if(qsStageId==6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71)		//Step 2 OP //IWN-382: 3-way split of Step-2-OP
	{
		form = getStep2ICD10ScreenForOP(icd10obj);
	}
	else		//Default to Step 2 OP -- ??TO BE DEFINED: Should we default??	 
	{
		form = getStep2ICD10ScreenForOP(icd10obj);
	}
	newCell.innerHTML = form;
	
	// Initialize the expanding text area
	$('textarea').css('width','324px');
	$('textarea').expandingTextArea();
	
	
	// Select the DP entries Text LOVs from options list if exists.
	if(legendDataValue != null && qcaiReplaceflag == ''){
	    dfValueInLovNotExist = false;
	    for (var i=0; i < icd10obj.dataFieldValue.length; i++) {
	      var counterId = i+1;
				if(icd10obj.dataFieldValue[i] != "" && window.opener.$('#iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId).html()!=null){
				   window.opener.$("#iws2_dp_legend" + counterId + "Lovs_"+icd10obj.dpEntryId+" option").each(function() {
              if($(this).text() == icd10obj.dataFieldValue[i]){
                $(this).attr('selected', 'selected');
                 // if datafield name is 'status' in case of 'Drugs & Medication' hierarchy
                if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase()=="status"){
                    onChangeStatusDisplay('iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") , false);
                }             
              }    
              else 
                dfValueInLovNotExist = true;                    
           });
           
           // if datafield name is 'units'
           if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase()=="units"){
              onChangeUnitLblDisplay('iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),  counterId , true);
              if(dfValueInLovNotExist)
                  setUnitsText(icd10obj, counterId, icd10obj.dataFieldValue[i],true);
           }
           
        }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	 /*   
		if(icd10obj.dataField1Value != "" && window.opener.$('#iws2_dp_legend1Lovs_' + icd10obj.dpEntryId).html()!=null){
			window.opener.$("#iws2_dp_legend1Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField1Value)
		            $(this).attr('selected', 'selected');            
		           else 
		                unitsNotExist = true;                    
		        });
			          if(icd10obj.dataFieldLabel1!=null && icd10obj.dataFieldLabel1.toLowerCase()=="units"){
			          onChangeUnitLblDisplay('iws2_dp_legend1Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),1,true);
			           if(unitsNotExist)
                         setUnitsText(icd10obj, 1, icd10obj.dataField1Value,true);
			          }
			      }
			       unitsNotExist = false;
			if(icd10obj.dataField2Value != "" && window.opener.$('#iws2_dp_legend2Lovs_' + icd10obj.dpEntryId).html()!=null){
				window.opener.$("#iws2_dp_legend2Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField2Value){
		            $(this).attr('selected', 'selected');            
		           }  else 
                        unitsNotExist = true;                        
		        });
			   if( icd10obj.dataFieldLabel2!=null && icd10obj.dataFieldLabel2.toLowerCase()=="units"){
			    onChangeUnitLblDisplay('iws2_dp_legend2Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),2,true );
			    if(unitsNotExist)
                         setUnitsText(icd10obj, 2, icd10obj.dataField2Value,true);
                      }
			   }
			   unitsNotExist = false;
			if(icd10obj.dataField3Value != "" && window.opener.$('#iws2_dp_legend3Lovs_' + icd10obj.dpEntryId).html()!=null){
				window.opener.$("#iws2_dp_legend3Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField3Value){
		            $(this).attr('selected', 'selected');            
		           }else 
                        unitsNotExist = true;                         
		        });
		       if( icd10obj.dataFieldLabel3!=null && icd10obj.dataFieldLabel3.toLowerCase()=="units"){
		        onChangeUnitLblDisplay('iws2_dp_legend3Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),3,true);
		        if(unitsNotExist)
                         setUnitsText(icd10obj, 3, icd10obj.dataField3Value,true);
		        }
		       }
		       unitsNotExist = false;
		  if(icd10obj.dataField4Value != "" && window.opener.$('#iws2_dp_legend4Lovs_' + icd10obj.dpEntryId).html()!=null){
			  window.opener.$("#iws2_dp_legend4Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField4Value){
		            $(this).attr('selected', 'selected');            
		           }else 
                        unitsNotExist = true;                         
		        });
			   if( icd10obj.dataFieldLabel4!=null && icd10obj.dataFieldLabel4.toLowerCase()=="units"){
			    onChangeUnitLblDisplay('iws2_dp_legend4Lovs_' + icd10obj.dpEntryId,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),4,true);
			    if(unitsNotExist)
                         setUnitsText(icd10obj, 4, icd10obj.dataField4Value,true);
			    }
			   }
			    unitsNotExist = false;
		  if(icd10obj.dataField5Value != "" && window.opener.$('#iws2_dp_legend5Lovs_' + icd10obj.dpEntryId).html()!=null){
			  window.opener.$("#iws2_dp_legend5Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField5Value){
		            $(this).attr('selected', 'selected');            
		           }else 
                        unitsNotExist = true;                         
		        }); 
		     if(icd10obj.dataFieldLabel5!=null && icd10obj.dataFieldLabel5.toLowerCase()=="units"){
		      onChangeUnitLblDisplay('iws2_dp_legend5Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),5,true);
		      if(unitsNotExist)
                setUnitsText(icd10obj, 5, icd10obj.dataField5Value,true);
		      }
		     }
		      unitsNotExist = false;
		  if(icd10obj.dataField6Value != "" && window.opener.$('#iws2_dp_legend6Lovs_' + icd10obj.dpEntryId).html()!=null){
			  window.opener.$("#iws2_dp_legend6Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField6Value){
		            $(this).attr('selected', 'selected');            
		           }else 
                        unitsNotExist = true;                         
		        });
		     if(icd10obj.dataFieldLabel6!=null && icd10obj.dataFieldLabel6.toLowerCase()=="units"){
		      onChangeUnitLblDisplay('iws2_dp_legend6Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),6,true);
		      if(unitsNotExist)
                setUnitsText(icd10obj, 6, icd10obj.dataField6Value,true);
		      }
		     }
		      unitsNotExist = false;
		  if(icd10obj.dataField7Value != "" && window.opener.$('#iws2_dp_legend7Lovs_' + icd10obj.dpEntryId).html()!=null){
			  window.opener.$("#iws2_dp_legend7Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField7Value){
		            $(this).attr('selected', 'selected');            
		           } else 
                        unitsNotExist = true;                       
		        });
		     if(icd10obj.dataFieldLabel7!=null && icd10obj.dataFieldLabel7.toLowerCase()=="units"){
		       onChangeUnitLblDisplay('iws2_dp_legend7Lovs_' + icd10obj.dpEntryId,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),7,true);
		       if(unitsNotExist)
                setUnitsText(icd10obj, 7, icd10obj.dataField7Value,true);
		      }
		     }
		      unitsNotExist = false;
		  if(icd10obj.dataField8Value != "" && window.opener.$('#iws2_dp_legend8Lovs_' + icd10obj.dpEntryId).html()!=null){
			  window.opener.$("#iws2_dp_legend8Lovs_"+icd10obj.dpEntryId+" option").each(function() {
		            if($(this).text() == icd10obj.dataField8Value){
		            $(this).attr('selected', 'selected');            
		           } 
		            else 
                        unitsNotExist = true;                         
		        });
		     if(icd10obj.dataFieldLabel8!=null && icd10obj.dataFieldLabel8.toLowerCase()=="units"){
		      onChangeUnitLblDisplay('iws2_dp_legend8Lovs_' + icd10obj.dpEntryId,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),8,true);
		      if(unitsNotExist)
                setUnitsText(icd10obj, 8, icd10obj.dataField8Value,true);
		      }
		     }
		  */   
		  
    		  if(icd10obj.dataFieldValue[i] != "" && window.opener.$('#iws2_dp_legend' + counterId + 'Combo_' + icd10obj.dpEntryId).html() != null){
              var selectedValues=icd10obj.dataFieldValue[i].split(",");
              populateMultipleSelectedValue('iws2_dp_legend' + counterId + 'Combo_' + icd10obj.dpEntryId,selectedValues,true);
          } 
		  
		  }
		  
		  
		  
		  
		  
		  
		  /*
		    if(icd10obj.dataField1Value != "" && window.opener.$('#iws2_dp_legend1Combo_' + icd10obj.dpEntryId).html() != null)
            {
                 var selectedValues=icd10obj.dataField1Value.split(",");
                populateMultipleSelectedValue('iws2_dp_legend1Combo_' + icd10obj.dpEntryId,selectedValues,true);
            } 
            if(icd10obj.dataField2Value != "" && window.opener.$('#iws2_dp_legend2Combo_' + icd10obj.dpEntryId).html() != null)
            {
                var selectedValues=icd10obj.dataField2Value.split(",");
                populateMultipleSelectedValue('iws2_dp_legend2Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
            if(icd10obj.dataField3Value != "" && window.opener.$('#iws2_dp_legend3Combo_' + icd10obj.dpEntryId).html() != null)
            {
                var selectedValues=icd10obj.dataField3Value.split(",");
                 populateMultipleSelectedValue('iws2_dp_legend3Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
            if(icd10obj.dataField4Value != "" && window.opener.$('#iws2_dp_legend4Combo_' + icd10obj.dpEntryId).html() != null)
            {
                var selectedValues=icd10obj.dataField4Value.split(",");
                populateMultipleSelectedValue('iws2_dp_legend4Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
            if(icd10obj.dataField5Value != "" && window.opener.$('#iws2_dp_legend5Combo_' + icd10obj.dpEntryId).html() != null)
            {
                var selectedValues=icd10obj.dataField5Value.split(",");
                 populateMultipleSelectedValue('iws2_dp_legend5Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
            if(icd10obj.dataField6Value != "" && window.opener.$('#iws2_dp_legend6Combo_' + icd10obj.dpEntryId).html() != null)
            {
                var selectedValues=icd10obj.dataField6Value.split(",");
                 populateMultipleSelectedValue('iws2_dp_legend6Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
             if(icd10obj.dataField7Value != "" && window.opener.$('#iws2_dp_legend7Combo_' + icd10obj.dpEntryId).html() != null)
            {
                 var selectedValues=icd10obj.dataField7Value.split(",");
                 populateMultipleSelectedValue('iws2_dp_legend7Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
            if(icd10obj.dataField8Value != "" && window.opener.$('#iws2_dp_legend8Combo_' + icd10obj.dpEntryId).html() != null)
            {
                 var selectedValues=icd10obj.dataField8Value.split(",");
                 populateMultipleSelectedValue('iws2_dp_legend8Combo_' + icd10obj.dpEntryId,selectedValues,true);
            }
        */    
        // Show the already saved user feedback/suggestions.
        if (userFeedBack != null && window.opener.$('#iws2_dp_system_issue_' + icd10obj.dpEntryId + '_' + icd10obj.selvalue).html() != null)
         window.opener.$('#iws2_dp_system_issue_' + dpEntryId + '_' + code).val(userFeedBack);

  }else {
      dfValueInLovNotExist = false;
      for (var i=0; i < icd10obj.dataFieldValue.length; i++) {
        var counterId = i+1;
        if(icd10obj.dataFieldValue[i] != "" && $('#iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId).html()!=null){
           $("#iws2_dp_legend" + counterId + "Lovs_"+icd10obj.dpEntryId+" option").each(function() {
              if($(this).text() == icd10obj.dataFieldValue[i]){
                $(this).attr('selected', 'selected');
                // if datafield name is 'status' in case of 'Drugs & Medication' hierarchy
                if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase()=="status"){
                    onChangeStatusDisplay('iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'") , false);
                }            
              }    
              else 
                dfValueInLovNotExist = true;                    
           });
           
           
           if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase()=="units"){
              onChangeUnitLblDisplay('iws2_dp_legend'+ counterId + 'Lovs_' + icd10obj.dpEntryId ,encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),  counterId  , false);
              if(dfValueInLovNotExist)
                  setUnitsText(icd10obj, counterId , icd10obj.dataFieldValue[i],false);
           }
           
        }
        
        if(icd10obj.dataFieldValue[i] != "" && $('#iws2_dp_legend' + counterId + 'Combo_' + icd10obj.dpEntryId).html() != null){
              var selectedValues=icd10obj.dataFieldValue[i].split(",");
              populateMultipleSelectedValue('iws2_dp_legend' + counterId + 'Combo_' + icd10obj.dpEntryId,selectedValues,false);
        } 
        
    }
    
    /*
    unitsNotExist = false;
    
    if(icd10obj.dataField1Value != null && $('#iws2_dp_legend1Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend1Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField1Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });

      if(icd10obj.dataFieldLabel1 != null && icd10obj.dataFieldLabel1.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend1Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),1,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 1, icd10obj.dataField1Value);
      }
    }
    //populate multiSelect Combo Value for datafield 1
    if(icd10obj.dataField1Value != null && $('#iws2_dp_legend1Combo_' + icd10obj.dpEntryId).html() != null)
    {
         var selectedValues=icd10obj.dataField1Value.split(",");
        populateMultipleSelectedValue('iws2_dp_legend1Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField2Value != null && $('#iws2_dp_legend2Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend2Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField2Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });
      if(icd10obj.dataFieldLabel2 != null && icd10obj.dataFieldLabel2.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend2Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),2,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 2, icd10obj.dataField2Value);
      }
    }
    //populate multiSelect Combo Value
    if(icd10obj.dataField2Value != null && $('#iws2_dp_legend2Combo_' + icd10obj.dpEntryId).html() != null)
    {
        var selectedValues=icd10obj.dataField2Value.split(",");
        populateMultipleSelectedValue('iws2_dp_legend2Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField3Value != null && $('#iws2_dp_legend3Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend3Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField3Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });
      if(icd10obj.dataFieldLabel3 != null && icd10obj.dataFieldLabel3.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend3Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),3,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 3, icd10obj.dataField3Value);
      }
    }
    //populate multiSelect Combo Value for data field 3
    if(icd10obj.dataField3Value != null && $('#iws2_dp_legend3Combo_' + icd10obj.dpEntryId).html() != null)
    {
        var selectedValues=icd10obj.dataField3Value.split(",");
         populateMultipleSelectedValue('iws2_dp_legend3Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField4Value != null && $('#iws2_dp_legend4Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend4Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField4Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true

      });
      if(icd10obj.dataFieldLabel4 != null && icd10obj.dataFieldLabel4.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend4Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),4,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 4, icd10obj.dataField4Value);
      }
    }
    //populate multiSelect Combo Value for data field 4
    if(icd10obj.dataField4Value != null && $('#iws2_dp_legend4Combo_' + icd10obj.dpEntryId).html() != null)
    {
        var selectedValues=icd10obj.dataField4Value.split(",");
        populateMultipleSelectedValue('iws2_dp_legend4Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField5Value != null && $('#iws2_dp_legend5Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend5Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField5Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });
      if(icd10obj.dataFieldLabel5 != null && icd10obj.dataFieldLabel5.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend5Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),5,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 5, icd10obj.dataField5Value);
      }
    }
    //populate multiSelect Combo Value for data field 4
    if(icd10obj.dataField5Value != null && $('#iws2_dp_legend5Combo_' + icd10obj.dpEntryId).html() != null)
    {
        var selectedValues=icd10obj.dataField5Value.split(",");
         populateMultipleSelectedValue('iws2_dp_legend5Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField6Value != null && $('#iws2_dp_legend6Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend6Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField6Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });
      if(icd10obj.dataFieldLabel6 != null && icd10obj.dataFieldLabel6.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend6Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),6,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 6, icd10obj.dataField6Value);
      }
    }
    //populate multiSelect Combo Value for data field 6
    if(icd10obj.dataField6Value != null && $('#iws2_dp_legend6Combo_' + icd10obj.dpEntryId).html() != null)
    {
        var selectedValues=icd10obj.dataField6Value.split(",");
         populateMultipleSelectedValue('iws2_dp_legend6Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }


    unitsNotExist = false;
    if(icd10obj.dataField7Value != null && $('#iws2_dp_legend7Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend7Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField7Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true;
      });
      if(icd10obj.dataFieldLabel7 != null && icd10obj.dataFieldLabel7.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend7Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),7,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 7, icd10obj.dataField7Value);
      }
    }
    //populate multiSelect Combo Value for data field 6
    if(icd10obj.dataField7Value != null && $('#iws2_dp_legend7Combo_' + icd10obj.dpEntryId).html() != null)
    {
         var selectedValues=icd10obj.dataField7Value.split(",");
         populateMultipleSelectedValue('iws2_dp_legend7Combo_' + icd10obj.dpEntryId,selectedValues,false);
    }

    unitsNotExist = false;
    if(icd10obj.dataField8Value != null && $('#iws2_dp_legend8Lovs_' + icd10obj.dpEntryId).html() != null) {
      $("#iws2_dp_legend8Lovs_" + icd10obj.dpEntryId + " option").each(function() {
        if($(this).text() == icd10obj.dataField8Value)
          $(this).attr('selected', 'selected');
        else
          unitsNotExist = true
      });
      if(icd10obj.dataFieldLabel8 != null && icd10obj.dataFieldLabel8.toLowerCase() == "units") {
        onChangeUnitLblDisplay('iws2_dp_legend8Lovs_' + icd10obj.dpEntryId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"),8,false);
        if(unitsNotExist)
          setUnitsText(icd10obj, 8, icd10obj.dataField8Value);
      }
    }
    if(icd10obj.dataField8Value != null && $('#iws2_dp_legend8Combo_' + icd10obj.dpEntryId).html() != null)
        {
             var selectedValues=icd10obj.dataField8Value.split(",");
             populateMultipleSelectedValue('iws2_dp_legend8Combo_' + icd10obj.dpEntryId,selectedValues,false);
        }
   */     
        // Show the already saved user feedback/suggestions.
    if (userFeedBack != null && $('#iws2_dp_system_issue_' + dpEntryId + '_' + code).html()!=null)
        $('#iws2_dp_system_issue_' + dpEntryId + '_' + code).val(userFeedBack);

	}
	 
   // populate existed transcript values whcih being entered at STEP 2-TR
  if($('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).length > 0){  
      if(dpEntry != null && isText){
        $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', true);
        
        for (var i=0; i < dataFieldLabel.length; i++) {
          var counterId = i+1;
           if(icd10obj.dataFieldLabel[i]!=null)
              if(icd10obj.dataFieldLabelType[i].toLowerCase() == 'text')
                  $('#iws2_dp_cat' + counterId + '_input_' + dpEntryId).val(dpEntry.dataFieldValues[i]);
    
        }
        
       /*
        if(icd10obj.dataFieldLabel1!=null)
             if(icd10obj.dataFieldLabel1Type.toLowerCase() == 'text')
               $('#iws2_dp_cat1_input_' + dpEntryId).val(dpEntry.dataField1Value);
           else if(icd10obj.dataFieldLabe2!=null)
             if(icd10obj.dataFieldLabel2Type.toLowerCase() == 'text')
               $('#iws2_dp_cat2_input_' + dpEntryId).val(dpEntry.dataField2Value);
           else if(icd10obj.dataFieldLabel3!=null)
             if(icd10obj.dataFieldLabel3Type.toLowerCase() == 'text')
               $('#iws2_dp_cat3_input_' + dpEntryId).val(dpEntry.dataField3Value);
           else if(icd10obj.dataFieldLabel4!=null)
             if(icd10obj.dataFieldLabel4Type.toLowerCase() == 'text')
               $('#iws2_dp_cat4_input_' + dpEntryId).val(dpEntry.dataField4Value);*/
       
      }else{
        $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', false);
        for (var i=0; i < dataFieldLabel.length; i++) {
          var counterId = i+1;
          $('#iws2_dp_cat' + counterId + '_input_' + dpEntryId).removeAttr('disabled');
        }  
      }
  }
	
	setJqueryDate('iws2_dp_datepicker_',icd10obj.dpEntryId,icd10obj.selvalue,qcaiReplaceflag);
	for(var i=0;i<dataFieldLabel.length;i++){
	   var counterId=i+1;
	   if($('#iws2_dp_datepicker_'+counterId+'_'+icd10obj.dpEntryId+'_'+icd10obj.selvalue.replace(/\./g,'-')).html()!=null)
	    setJqueryDate('iws2_dp_datepicker_'+counterId+'_',icd10obj.dpEntryId,icd10obj.selvalue,qcaiReplaceflag);
	}
	
	/*// if empty data form, hide delete button
	if(dpEntry == null){
	    $('#codeDeleteCell_' + dpEntryId).hide();
	}*/
	emptyDPEntryId = null;
	
	// remove all delete image buttons for empty forms if exists
	if(medicalCodes !=null)
	for ( var j = 0; j < medicalCodes.length; j++) {
		$('#codeDeleteCell_' + emptyDPEntryId + '_' + code ).hide();
		$('#codePagePopup_' + emptyDPEntryId + '_' + code ).hide();
	}
	// for if the DPentry has suspendNote then unsuspend button will enable
	if(icd10obj.suspendnote!=null && icd10obj.suspendnote!='' && icd10obj.suspendnote!="null" && icd10obj.suspendnote!="undefined"){
			$('#unSuspendDp_'+icd10obj.dpEntryId).attr("disabled", false);
	}
	
	
	
	
	if(((qsStageId == 7 || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW) || qsStageId == 48){
		if(dpentryId == icd10obj.dpEntryId && dataPointFullListIndicator == "true"){
			//the QCAI codes span should be beneath the previous code span, if exists.
			var qcai_codes_span_top = $("#iws2_subc_ctnr_QA1_code").height() + 10;
			var tmp = $("#iws2_subc_ctnr_prev_code_"+icd10obj.dpEntryId).height();
			if ($("#iws2_subc_ctnr_prev_code_"+icd10obj.dpEntryId).height() > 30)
				qcai_codes_span_top = $("#iws2_subc_ctnr_prev_code_"+icd10obj.dpEntryId).height() + 10;
			$("#iws2_subc_ctnr_qcai_codes_"+icd10obj.dpEntryId).css("top", qcai_codes_span_top);
			
			//the height of the slider window needs to be greater than 130
			var height_slider = 130;
			if ($("#iws2_subc_ctnr_prev_code_"+icd10obj.dpEntryId).height() > $("#iws2_subc_ctnr_QA1_code").height())
				height_slider = $("#iws2_subc_ctnr_prev_code_"+icd10obj.dpEntryId).height() + $("#iws2_subc_ctnr_qcai_codes_"+icd10obj.dpEntryId).height() + 10;
			else
				height_slider = $("#iws2_subc_ctnr_QA1_code").height() + $("#iws2_subc_ctnr_qcai_codes_"+icd10obj.dpEntryId).height() + 10;
			if (height_slider < 130)
				height_slider = 130;
			
			$("#"+newCellCount).css("borderStyle","solid");
			$("#"+newCellCount).css("borderWidth","1px");
			$("#"+newCellCount).css("borderColor","red");
			$("#"+newCellCount).css("min-height",height_slider);
			$("#iws2_step2_icd10codetable_" + icd10obj.dpEntryId).css("min-height",height_slider);
			$("#"+newCellCount).css("width","992px");
			$("#"+newCellCount).css("display","block");
			$("#iws2_subc_input_pagesection_"+icd10obj.dpEntryId).focus();
		}
		if(currentDPEntryId == icd10obj.dpEntryId && dataPointFullListIndicator == ""){
			if(qcaiReplaceflag==''){
				window.opener.$("#"+newCellCount).css("borderStyle","solid");
				window.opener.$("#"+newCellCount).css("borderWidth","1px");
				window.opener.$("#"+newCellCount).css("borderColor","red");
				window.opener.$("#"+newCellCount).css("min-height","215px");
				window.opener.$("#"+newCellCount).css("width","992px");
				window.opener.$("#"+newCellCount).css("display","block");
				window.opener.$("#iws2_subc_input_pagesection_"+icd10obj.dpEntryId).focus();
			}else{
				$("#"+newCellCount).css("borderStyle","solid");
				$("#"+newCellCount).css("borderWidth","1px");
				$("#"+newCellCount).css("borderColor","red");
				$("#"+newCellCount).css("min-height","215px");
				$("#"+newCellCount).css("width","992px");
				$("#"+newCellCount).css("display","block");
				$("#iws2_subc_input_pagesection_"+icd10obj.dpEntryId).focus();
			}
		}	
	}else{
		if(dpentryId == icd10obj.dpEntryId && dataPointFullListIndicator == "true"){
			$("#"+newCellCount).css("borderStyle","solid");
			$("#"+newCellCount).css("borderWidth","1px");
			$("#"+newCellCount).css("borderColor","red");
			$("#iws2_subc_input_pagesection_"+icd10obj.dpEntryId).focus();
		}
	}
	
	$('#iws2_dp_cat1_input_' + newDpEntry).focus();
	
	//IWN-110 does not have this requirement. So I commented this out.
	// if new DP entry form opens, set prev date as default date as per IWN - 110 
	//if(newDpEntry =='null' || newDpEntry == null){
    //previousDPDate(newDpEntry,code);
	//}  

}

/*
Function: usePageDate()
Add the current page data date to the data point entry dialog in step 2.

Page Actions:
- Step 2 RHS Data Point Entry Dialog Use Page Date Button Click

Called Functions:
- <millisToDateHandler(millis)>
*/
function usePageDate(dpEntryId,code) {
	// Get the page Json Id
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			pageJsonId = i;
		} 
	}
	// Retrieve the active page object.
	var page = objCase.pages[pageJsonId];
	var pageDateMillis = page.documentDate;
	var pageDate = millisToDateHandler(pageDateMillis);
	$('#iws2_dp_datepicker_' + dpEntryId + '_' + code.replace(/\./g,'-')).attr('value',pageDate);
}

/*
Function: previousDPDate()
Add the previous DP data date to the data point entry dialog in step 2.

Page Actions:
- Step 2 RHS Data Point Entry Dialog Previous DP Date Button Click

*/
function previousDPDate(dpEntryId,code)
{
	if(lastDate!=null){
		$('#iws2_dp_datepicker_' + dpEntryId + '_' + code.replace(/\./g,'-')).val(lastDate);
	}
	else{
		usePageDate(dpEntryId,code);
	}
}

/**Cancel DP entry detail form
 * 
 * As to the Cancel button, if it's on an existing entry, clicking it will reset the data; if it's a new entry form, it will close the form for the code.
 * 
 * * 
 * @param selvalue - selected code Name
 * @param seldesc - selected code description
 * @param codeMasterId - rowCount details of selectd DP form
 * @param rowCount - currebnt row count
 * @param dpEntryId - selected dp entry id
 */
function cancelDpDetails(icd10Object, selValue,selDesc,codeMasterId, rowCount, dpEntryId){
	var icd10Object =  JSON.parse(decodeURIComponent(icd10Object));
	// If DP entry exists
	/*
	var data1Value="";
		var data2Value="";
		var data3Value="";
		var data4Value="";
		var data5Value="";
		var data6Value="";
		var data7Value="";
		var data8Value="";*/
	
	
	var selectedDpEntryId = dpEntryId;
	if(dpEntryId =='null' ||  dpEntryId ==null){
		var response = confirm("It will reset DP entry data to original Data!");
		if(response){
			dpChangedData = false;
		}
	}
	
	if(dpEntryId!='null' &&  dpEntryId!=null){
		var response = confirm("It will reset DP entry data to original Data!");
		if(response){
			if(icd10Object.prevHid !=null){
				//var ObjStep2QA1 = new ObjStep2Qa(caseId);
				//ObjStep2QA1.loadDpListObjects();
				 $('#dpform_detailsQA1_' + icd10Object.prevHid).remove();
		         $('#codeTableQA1_' + icd10Object.prevHid).remove();
		         $('#dpformQA1td_' + icd10Object.prevHid).remove();
				 $('#datapointqa1col'+dpEntryId).click();
				 return;
			}
    	dpChangedData = false;
			// set all Data fields 1 to 8.
            /*
                 data1Value = icd10Object.dataField1Value;
                             data2Value = icd10Object.dataField2Value;
                             data3Value = icd10Object.dataField3Value;
                             data4Value = icd10Object.dataField4Value;
                             data5Value = icd10Object.dataField5Value;
                             data6Value = icd10Object.dataField6Value;
                             data7Value = icd10Object.dataField7Value;
                             data8Value = icd10Object.dataField8Value;*/
            
        // set page Number ,section number and data date.       		 
			        pageNumber = icd10Object.pageNumber;
                    sectionNumber = icd10Object.sectionNumber;
                    dataDate = icd10Object.dataDate;
                    suspendNote = icd10Object.suspendnote
                    rejectReason = icd10Object.rejectReason
                    userFeedBack = icd10Object.userFeedBack;
			// set To be transcript check box 
			if($('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).html() != null){
                    
            if(icd10Object.isText) {
              $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', true);
              //Replacement of lines below Commented code
              for(var i=0;i<icd10Object.dataFieldLabel.length;i++)
              {
                  if(icd10Object.dataFieldLabel[i]!=null)
                    if(icd10Object.dataFieldLabelType[i].toLowerCase() == 'text'){
                      $('#iws2_dp_cat'+i+1+'_input_' + dpEntryId).val(icd10Object.dataFieldValue[i]);
                      $('#iws2_dp_cat'+i+1+'_input_' + dpEntryId).attr("disabled", "disabled");
                      break;
                    }
              }
                /*
                if(icd10Object.dataFieldLabel1!=null)
                                    if(icd10Object.dataFieldLabel1Type.toLowerCase() == 'text'){
                                      $('#iws2_dp_cat1_input_' + dpEntryId).val(data1Value);
                                      $('#iws2_dp_cat1_input_' + dpEntryId).attr("disabled", "disabled");
                                    }   
                                else if(icd10Object.dataFieldLabel2!=null)
                                    if(icd10Object.dataFieldLabel2Type.toLowerCase() == 'text'){
                                      $('#iws2_dp_cat2_input_' + dpEntryId).val(data2Value);
                                      $('#iws2_dp_cat2_input_' + dpEntryId).attr("disabled", "disabled");
                                    }  
                                else if(icd10Object.dataFieldLabel3!=null)
                                    if(icd10Object.dataFieldLabel3Type.toLowerCase() == 'text'){
                                      $('#iws2_dp_cat3_input_' + dpEntryId).val(data3Value);
                                      $('#iws2_dp_cat3_input_' + dpEntryId).attr("disabled", "disabled");
                                    }   
                                else if(icd10Object.dataFieldLabel4!=null)
                                    if(icd10Object.dataFieldLabel4Type.toLowerCase() == 'text'){
                                      $('#iws2_dp_cat4_input_' + dpEntryId).val(data4Value);
                                      $('#iws2_dp_cat4_input_' + dpEntryId).attr("disabled", "disabled");
                                    }*/
                  
                }    
                    else{ // reset the istext field
                $('#iws2_subc_ctnr_isTranscript_op_' + dpEntryId).find('input:checkbox').attr('checked', false);
                for( var i=0;i<icd10Object.dataFieldLabel.length;i++){
                var counterId=i+1;
                $('#iws2_dp_cat'+counterId+'_input_'+ dpEntryId).removeAttr('disabled');
                }
                /*
                $('#iws2_dp_cat1_input_'+ dpEntryId).removeAttr('disabled');
                                $('#iws2_dp_cat2_input_'+ dpEntryId).removeAttr('disabled');
                                $('#iws2_dp_cat3_input_'+ dpEntryId).removeAttr('disabled');
                                $('#iws2_dp_cat4_input_'+ dpEntryId).removeAttr('disabled');*/
                
                }     
              }
              
		// Reset all input types in DP form to original Values
		if(((qsStageId == 7 || qsStageId == 50) && icd10Object.isRejected != undefined) && !icd10Object.isRejected){
				$("[name=icd10_"+dpEntryId+"]").filter("[value=V1]").prop("checked",true);
				 $('#rejectReason_' + dpEntryId).attr("disabled", true);
		}
		else if(((qsStageId == 7 || qsStageId == 50) && icd10Object.isRejected != undefined)){
			$("[name=icd10_"+dpEntryId+"]").filter("[value=V2]").prop("checked",true);
		}
		if(qsStageId == 7 || qsStageId == 50 && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			$('#iws2_dp_suspendNote_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val(suspendNote);
			$('#iws2_dp_rejectReason_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val(rejectReason);
			$('#closeDp_' + dpEntryId).attr("disabled", false); 
		}	
		$('#saveDp_' + dpEntryId).attr("disabled", true); 
		$('#cancelDp_' + dpEntryId).attr("disabled", true);
		$('#iws2_subc_input_pagesection_ '+ dpEntryId).val('Page ' + pageNumber + 'Section ' + sectionNumber);
		
		if($('#iws2_dp_datepicker_qa_' + icd10Object.dpEntryId + '_' + icd10Object.selvalue.replace(/\./g,'-')).val() != undefined)
			$('#iws2_dp_datepicker_qa_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val(dataDate);
		else
			$('#iws2_dp_datepicker_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val(dataDate);
		if(userFeedBack!=null){
			$('#iws2_dp_system_issue_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val(userFeedBack);
		}else{
			$('#iws2_dp_system_issue_' + dpEntryId + '_' + selValue.replace(/\./g,'-')).val("");
		}

        //Replacement of lines below commented code
        for(var i=0;i<icd10Object.dataFieldLabel.length;i++){
            var counterId=i+1;
            if($('#iws2_dp_cat'+counterId+'_input_'+ dpEntryId).html()!=null)
            $('#iws2_dp_cat'+counterId+'_input_' + dpEntryId).val(icd10Object.dataFieldValue[i]);
        }		
		/*
		// If Datafield Text/Number Value Exists
				if($('#iws2_dp_cat1_input_'+ dpEntryId).html()!=null)
					$('#iws2_dp_cat1_input_' + dpEntryId).val(data1Value);
				if($('#iws2_dp_cat2_input_'+ dpEntryId).html()!=null)
					$('#iws2_dp_cat2_input_'+ dpEntryId).val(data2Value);
				if($('#iws2_dp_cat3_input_'+ dpEntryId).html()!=null)
					$('#iws2_dp_cat3_input_' + dpEntryId).val(data3Value);
				if($('#iws2_dp_cat4_input_'+ dpEntryId).html()!=null)
					$('#iws2_dp_cat4_input_' + dpEntryId).val(data4Value);
				
				// if DATAFIELD5 Exists then check for 6,7,8 datafields
				if (icd10Object.dataFieldLabel5 != null) {
					if($('#iws2_dp_cat5_input_' + dpEntryId).html() != null) 
					  $('#iws2_dp_cat5_input_' + dpEntryId).val(data5Value);
					if($('#iws2_dp_cat6_input_' + dpEntryId).html() != null)
					  $('#iws2_dp_cat6_input_' + dpEntryId).val(data6Value);
					if($('#iws2_dp_cat7_input_' + dpEntryId).html() != null)
					  $('#iws2_dp_cat7_input_' + dpEntryId).val(data7Value);
					if($('#iws2_dp_cat8_input_' + dpEntryId).html() != null)
					  $('#iws2_dp_cat8_input_' + dpEntryId).val(data8Value);
			  }*/
		

            //Replacement of lines below commented code
            for(var i = 0; i < icd10Object.dataFieldLabel.length; i++) {
              //set for all legends fields
              var count=i + 1;
                if($('#iws2_dp_legend' + count+ 'Lovs_' + dpEntryId).html() != null) {
                    if(icd10Object.dataFieldValue[i] != "") {
                        var lovFound = false;
                        $("#iws2_dp_legend" +count+ "Lovs_" + dpEntryId + " option").each(function() {
                            if($(this).text() == icd10Object.dataFieldValue[i]) {
                                lovFound = true;
                                $(this).attr('selected', 'selected');
                            }
                        });
                        if(!lovFound)
                            $('#iws2_dp_legend' +count+ 'Lovs_' + dpEntryId + ' option:first-child').attr('selected', 'selected');
                    } else
                        $('#iws2_dp_legend' +count+ 'Lovs_' + dpEntryId + ' option:first-child').attr('selected', 'selected');

                    if(icd10Object.dataFieldLabel[i].toLowerCase() == "units") {
                        onChangeUnitLblDisplay('iws2_dp_legend' +count+ 'Lovs_' + dpEntryId, encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'"), count, false);
                        if(!lovFound) {
                            setUnitsText(icd10Object, count, icd10Object.dataFieldValue[i]);
                        }
                    }

                }
            //set all combo fields 
                if($('#iws2_dp_legend'+count+'Combo_' + dpEntryId).html() != null) {
                    if(icd10Object.dataFieldValue[i] != null) {
                        var selectedValues = icd10Object.dataFieldValue[i].split(",");
                        var lovFound = populateMultipleSelectedValue('iws2_dp_legend'+count+'Combo_' + icd10Object.dpEntryId, selectedValues, false);
                        //if(!lovFound)
                        //  $('#iws2_dp_legend1Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
                    } else {
                        $('#iws2_dp_legend'+count+'Combo_' + dpEntryId + " option").each(function() {
                            $(this).attr('selected', false);
                        });
                    }
                }
            //set all range Fields              
                if($('#iws2_dp_range_high_input_'+count+'_' + dpEntryId).html() != null && $('#iws2_dp_range_low_input_'+count+'_' + dpEntryId).html() != null && icd10Object.dataFieldLabel[i].toLowerCase() == "range") {
                    populatedValue = icd10Object.dataFieldValue[i].split("-");
                    var index = icd10Object.dataFieldValue[i].indexOf("-");
                    if(index < 0 && populatedValue.length == 1)
                        populatedValue[1] = "";
                    $('#iws2_dp_range_low_input_'+count+'_' + dpEntryId).val(populatedValue[0]);
                    $('#iws2_dp_range_high_input_'+count+'_' + dpEntryId).val(populatedValue[1]);
                }
                //set Date field
                if($('#iws2_dp_datepicker_'+count+'_' + dpEntryId+'_'+icd10Object.selvalue.replace(/\./g,'-')).html() != null && icd10Object.dataFieldLabelType[i].toLowerCase() == "date") {
                   $('#iws2_dp_datepicker_'+count+'_' + dpEntryId+'_'+icd10Object.selvalue.replace(/\./g,'-')).val(icd10Object.dataFieldValue[i]);  
                }
  

            } 
  
	/*
		// If datafield Legend Values already Exists
						 if($('#iws2_dp_legend1Lovs_' +dpEntryId).html()!=null){
			if(data1Value != ""){
				var lovFound=false;
		  $("#iws2_dp_legend1Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data1Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			 });
			 if(!lovFound)
			  $('#iws2_dp_legend1Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
				$('#iws2_dp_legend1Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
							  if(icd10Object.dataFieldLabel1.toLowerCase() == "units") {
				  onChangeUnitLblDisplay('iws2_dp_legend1Lovs_' + dpEntryId, encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'"), 1,false);
				  if(!lovFound) {
					setUnitsText(icd10Object, 1, data1Value);
				  }
				}
					}
		if( $('#iws2_dp_legend2Lovs_' + dpEntryId).html()!=null){
			if(data2Value != ""){
				 var lovFound=false;
			$("#iws2_dp_legend2Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data2Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend2Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			   $('#iws2_dp_legend2Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');  
						 if(icd10Object.dataFieldLabel2.toLowerCase()=="units"){
			onChangeUnitLblDisplay('iws2_dp_legend2Lovs_' +dpEntryId ,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 2,false);
			 if(!lovFound) {
					setUnitsText(icd10Object, 2, data2Value);
				  }
			 }
		   }
		if($('#iws2_dp_legend3Lovs_' + dpEntryId).html()!=null){
			 if(data3Value != ""){
				  var lovFound=false;
			$("#iws2_dp_legend3Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data3Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend3Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			   $('#iws2_dp_legend3Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');    
						 if(icd10Object.dataFieldLabel3.toLowerCase()=="units"){
			onChangeUnitLblDisplay('iws2_dp_legend3Lovs_' +dpEntryId ,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 3,false);
			 if(!lovFound) {
					setUnitsText(icd10Object, 3 , data3Value);
				  }
			}
		   }
	  if($('#iws2_dp_legend4Lovs_' + dpEntryId).html()!=null){
		  if(data4Value != ""){
			   var lovFound=false;
		  $("#iws2_dp_legend4Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data4Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend4Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			 $('#iws2_dp_legend4Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');   
						  if(icd10Object.dataFieldLabel4.toLowerCase()=="units"){
			onChangeUnitLblDisplay('iws2_dp_legend4Lovs_' + dpEntryId,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 4,false);
			 if(!lovFound) {
					setUnitsText(icd10Object, 4, data4Value);
				  }
			}
		   }
	  if( $('#iws2_dp_legend5Lovs_' + dpEntryId).html()!=null){
		  if(data5Value!=""){
			   var lovFound=false;
		  $("#iws2_dp_legend5Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data5Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend5Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			$('#iws2_dp_legend5Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected'); 
					   if( icd10Object.dataFieldLabel5.toLowerCase()=="units"){
		  onChangeUnitLblDisplay('iws2_dp_legend5Lovs_' + dpEntryId ,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 5,false);
		   if(!lovFound) {
					setUnitsText(icd10Object, 5 , data5Value);
				  }
		  }
		 }
	  if( $('#iws2_dp_legend6Lovs_' +dpEntryId).html()!=null){
		  if(data6Value!=""){
			  var lovFound=false;
		  $("#iws2_dp_legend6Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data6Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend6Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			$('#iws2_dp_legend6Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected'); 
					   if(icd10Object.dataFieldLabel6.toLowerCase()=="units"){
		  onChangeUnitLblDisplay('iws2_dp_legend6Lovs_' + dpEntryId ,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 6,false);
		   if(!lovFound) {
					setUnitsText(icd10Object, 6 , data6Value);
				  }
		  }
		 }
	  if( $('#iws2_dp_legend7Lovs_' + dpEntryId).html()!=null){
		  if(data7Value!=""){
			  var lovFound=false;
		  $("#iws2_dp_legend7Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() == data7Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend7Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   }else
			$('#iws2_dp_legend7Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected'); 
					   if(icd10Object.dataFieldLabel7.toLowerCase()=="units"){
		   onChangeUnitLblDisplay('iws2_dp_legend7Lovs_' +dpEntryId,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 7,false);
			if(!lovFound) {
					setUnitsText(icd10Object, 7 , data7Value);
				  }
		  }
		 }
	  if($('#iws2_dp_legend8Lovs_' + dpEntryId).html()!=null){
		   if(data8Value!=""){
			   var lovFound=false;
		  $("#iws2_dp_legend8Lovs_"+dpEntryId+" option").each(function() {
				if($(this).text() ==data8Value){
					lovFound=true;
				$(this).attr('selected', 'selected');            
			   }                        
			});
			if(!lovFound)
			  $('#iws2_dp_legend8Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected');
			}else
			 $('#iws2_dp_legend8Lovs_'+ dpEntryId + ' option:first-child').attr('selected','selected'); 
						if(icd10Object.dataFieldLabel8.toLowerCase()=="units"){
		  onChangeUnitLblDisplay('iws2_dp_legend8Lovs_' + dpEntryId,encodeURIComponent(JSON.stringify(icd10Object)).replace(/'/g, "\\'\\'") , 8,false);
		   if(!lovFound) {
					setUnitsText(icd10Object, 8, data8Value);
				  }
		  }
		 }
		 //set multiValue datafields
		 if( $('#iws2_dp_legend1Combo_' + dpEntryId).html()!=null){
		  if(data1Value!=null){
			var selectedValues=icd10Object.dataField1Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend1Combo_' + icd10Object.dpEntryId,selectedValues,false);
			//if(!lovFound)
			//  $('#iws2_dp_legend1Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   }else{
		   $('#iws2_dp_legend1Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   }
		 }
		 if( $('#iws2_dp_legend2Combo_' + dpEntryId).html()!=null){
		  if(data2Value!=null){
			var selectedValues=icd10Object.dataField2Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend2Combo_' + icd10Object.dpEntryId,selectedValues,false);
		   // if(!lovFound)
			//  $('#iws2_dp_legend2Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   }
		   else{
		   $('#iws2_dp_legend2Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   } 
		 }
		 if( $('#iws2_dp_legend3Combo_' + dpEntryId).html()!=null){
		  if(data3Value!=null){
			var selectedValues=icd10Object.dataField3Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend3Combo_' + icd10Object.dpEntryId,selectedValues,false);
			//if(!lovFound)
			//  $('#iws2_dp_legend3Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   } 
		   else{
		   $('#iws2_dp_legend3Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   }
		 }
		 if( $('#iws2_dp_legend4Combo_' + dpEntryId).html()!=null){
		  if(data4Value!=null){
			var selectedValues=icd10Object.dataField4Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend4Combo_' + icd10Object.dpEntryId,selectedValues,false);
		   // if(!lovFound)
			//  $('#iws2_dp_legend4Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   } else{
		   $('#iws2_dp_legend4Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   }
		 }
		 if( $('#iws2_dp_legend5Combo_' + dpEntryId).html()!=null){
		  if(data5Value!=null){
			var selectedValues=icd10Object.dataField5Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend5Combo_' + icd10Object.dpEntryId,selectedValues,false);
			//if(!lovFound)
			//  $('#iws2_dp_legend5Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   }else{
		   $('#iws2_dp_legend5Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   }
					   }
		 if( $('#iws2_dp_legend6Combo_' + dpEntryId).html()!=null){
		  if(data6Value!=null){
			var selectedValues=icd10Object.dataField6Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend6Combo_' + icd10Object.dpEntryId,selectedValues,false);
		   // if(!lovFound)
			//  $('#iws2_dp_legend6Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   } else{
		   $('#iws2_dp_legend6Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   }
		 }
		 if( $('#iws2_dp_legend7Combo_' + dpEntryId).html()!=null){
		  if(data7Value!=null){
			var selectedValues=icd10Object.dataField7Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend7Combo_' + icd10Object.dpEntryId,selectedValues,false);
			//if(!lovFound)
			 // $('#iws2_dp_legend7Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   } else{
			$('#iws2_dp_legend7Combo_' + dpEntryId+ " option").each(function() {
			$(this).attr('selected', false);
			 });
		   }
		 }
		 if( $('#iws2_dp_legend8Combo_' + dpEntryId).html()!=null){
		  if(data8Value!=null){
			var selectedValues=icd10Object.dataField8Value.split(",");
			var lovFound=populateMultipleSelectedValue('iws2_dp_legend8Combo_' + icd10Object.dpEntryId,selectedValues,false);
		   // if(!lovFound)
			//  $('#iws2_dp_legend8Combo_'+ dpEntryId + ' option:first-child').attr('selected','selected');
		   }else{
		   $('#iws2_dp_legend8Combo_' + dpEntryId+ " option").each(function() {
			 $(this).attr('selected', false);
			 });
		   } 
		 }
							   // set Range data field value
		  if($('#iws2_dp_range_high_input_1_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_1_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel1.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField1Value.split("-");
					var index=icd10Object.dataField1Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_1_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_1_'+dpEntryId).val(populatedValue[1]);
				}
		   if($('#iws2_dp_range_high_input_2_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_2_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel2.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField2Value.split("-");
					var index=icd10Object.dataField2Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_2_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_2_'+dpEntryId).val(populatedValue[1]);
				}
		   if($('#iws2_dp_range_high_input_3_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_3_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel3.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField3Value.split("-");
					var index=icd10Object.dataField3Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_3_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_3_'+dpEntryId).val(populatedValue[1]);
				}     
		   if($('#iws2_dp_range_high_input_4_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_4_'+dpEntryId).html()!=null &&icd10Object.dataFieldLabel4.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField4Value.split("-");
					var index=icd10Object.dataField4Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_4_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_4_'+dpEntryId).val(populatedValue[1]);
				}
			if($('#iws2_dp_range_high_input_5_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_5_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel5.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField5Value.split("-");
					var index=icd10Object.dataField5Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_5_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_5_'+dpEntryId).val(populatedValue[1]);
				}
			 if($('#iws2_dp_range_high_input_6_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_6_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel6.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField6Value.split("-");
					var index=icd10Object.dataField6Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_6_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_6_'+dpEntryId).val(populatedValue[1]);
				}
			 if($('#iws2_dp_range_high_input_7_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_7_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel7.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField7Value.split("-");
					var index=icd10Object.dataField7Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_7_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_7_'+dpEntryId).val(populatedValue[1]);
				}
			  if($('#iws2_dp_range_high_input_8_'+dpEntryId).html()!=null && $('#iws2_dp_range_low_input_8_'+dpEntryId).html()!=null && icd10Object.dataFieldLabel8.toLowerCase()=="range" ){   
					populatedValue=icd10Object.dataField8Value.split("-");
					var index=icd10Object.dataField8Value.indexOf("-");
					if(index<0 && populatedValue.length==1)
					populatedValue[1]="";
					$('#iws2_dp_range_low_input_8_'+dpEntryId).val(populatedValue[0]);
					$('#iws2_dp_range_high_input_8_'+dpEntryId).val(populatedValue[1]);
				}  */
	
   
  
	 }
	}else{
		// 	Remove Empty DP Form
		// remove extra dummy row
		if((qsStageId==7  || qsStageId == 50) && $('#iws2_dpfilter_full_pageview_button').html() != IWS2SCREENS_FULLDPLIST_REPORTVIEW){
			dpChangedData = false;
			if($('#ddpform_detailsQA1_'+codeMasterId).closest("tr")!=undefined )
		        $('#dpform_detailsQA1_'+codeMasterId).closest("tr").remove();
			 // if last DP form ,then don't remobe that form
			if($('#codeTableQA1_' + codeMasterId)[0].rows.length!= 1){
				savedDpEntryId = -1;
	      if($('#' + rowCount).next().length != 0){
	        prevAddElement = $('#' + rowCount).next().find("span")[2].id;
	        $("#" + prevAddElement).show();
	      }
				deleteDPSection(selValue,selDesc,codeMasterId, rowCount, dpEntryId);
			//if only entry left then remove the table and set it to false	
			}else{
				 $('#codeTableQA1_' + codeMasterId).remove();
				 
			}	
			
		}else{
		dpChangedData = false;
		if($('#dpform_details_'+codeMasterId).closest("tr")!=undefined )
	        $('#dpform_details_'+codeMasterId).closest("tr").remove();
		 // if last DP form ,then don't remobe that form
		if($('#codeTable_' + codeMasterId)[0].rows.length!= 1){
			savedDpEntryId = -1;
      if($('#' + rowCount).next().length != 0){
        prevAddElement = $('#' + rowCount).next().find("span")[2].id;
        $("#" + prevAddElement).show();
      }
			deleteDPSection(selValue,selDesc,codeMasterId, rowCount, dpEntryId);
		//if only entry left then remove the table and set it to false	
		}else{
			 $('#codeTable_' + codeMasterId).remove();
			 $('#dpformtd_' + codeMasterId).remove();
			 
       $('li[name=' + codeMasterId + ']').closest( "li" ).find('input:checkbox:checked').attr('checked', false);
		
		}	
	}
}
	
}

// It will set the Units text value to Unitstextxtboz  and ranges text boxex if exist
function setUnitsText(icd10obj, unitDFNo , dataValue,childWindow) {
     var unitRangeLblId=$('#iws2_range_unitlbl').selector;
    // To get id for child window 
       if(childWindow)
       unitRangeLblId= window.opener.$('#iws2_range_unitlbl').selector;
  if(childWindow)
  window.opener.$('#iws2_dp_Units'+ unitDFNo +'_text_input_' + icd10obj.dpEntryId).val(dataValue);
  else 
  $('#iws2_dp_Units'+ unitDFNo +'_text_input_' + icd10obj.dpEntryId).val(dataValue);
  
  //Replacement of lines below commented code
   for( var i=0;i<icd10obj.dataFieldLabel.length;i++){
    
        var counterId = i + 1;
        if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase() == 'range') {
            if(childWindow)
                window.opener.$(unitRangeLblId + '_' + counterId + '_' + icd10obj.dpEntryId).val(dataValue);
            else
                $(unitRangeLblId + '_' + counterId + '_' + icd10obj.dpEntryId).val(dataValue);
        } 

  }
  
 /*
  if(icd10obj.dataFieldLabel1!= null && icd10obj.dataFieldLabel1.toLowerCase() == 'range'){
       if(childWindow)
      window.opener.$(unitRangeLblId+'_1_' + icd10obj.dpEntryId).val(dataValue); 
      else 
      $(unitRangeLblId+'_1_' + icd10obj.dpEntryId).val(dataValue);
   }
      
   if(icd10obj.dataFieldLabel2!= null && icd10obj.dataFieldLabel2.toLowerCase() == 'range'){
      if(childWindow)
      window.opener.$(unitRangeLblId+'_2_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_2_' + icd10obj.dpEntryId).val(dataValue);
   }
      
   if(icd10obj.dataFieldLabel3!= null && icd10obj.dataFieldLabel3.toLowerCase() == 'range'){
       if(childWindow)
      window.opener.$(unitRangeLblId+'_3_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_3_' + icd10obj.dpEntryId).val(dataValue);
   }
   if(icd10obj.dataFieldLabel4!= null && icd10obj.dataFieldLabel4.toLowerCase() == 'range')
   {
       if(childWindow)
      window.opener.$(unitRangeLblId+'_4_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_4_' + icd10obj.dpEntryId).val(dataValue);
   }
   if(icd10obj.dataFieldLabel5!= null && icd10obj.dataFieldLabel5.toLowerCase() == 'range')
   {
       if(childWindow)
      window.opener.$(unitRangeLblId+'_5_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_5_' + icd10obj.dpEntryId).val(dataValue);
   }
   if(icd10obj.dataFieldLabel6!= null && icd10obj.dataFieldLabel6.toLowerCase() == 'range'){
       if(childWindow)
      window.opener.$(unitRangeLblId+'_6_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_6_' + icd10obj.dpEntryId).val(dataValue);
   }
   if(icd10obj.dataFieldLabel7!= null && icd10obj.dataFieldLabel7.toLowerCase() == 'range')
   {
       if(childWindow)
      window.opener.$(unitRangeLblId+'_7_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_7_' + icd10obj.dpEntryId).val(dataValue);
   }
   if(icd10obj.dataFieldLabel8!= null && icd10obj.dataFieldLabel8.toLowerCase() == 'range')
   {
       if(childWindow)
      window.opener.$(unitRangeLblId+'_8_' + icd10obj.dpEntryId).val(dataValue);
      else
       $(unitRangeLblId+'_8_' + icd10obj.dpEntryId).val(dataValue);
   }*/
 
}

/**
 * Function: validate(dpEntryId)
 * Validate the data point entry form values  while saving Dp form details
 * 
 * @param dpentryId - dpentry Id of selected Dp form
 *  
 *
*/
function validate(icd10Object) {
	valid = true;
	
	var datePicker ='';
	if($('#iws2_dp_datepicker_qa_' + icd10Object.dpEntryId + '_' + icd10Object.selvalue.replace(/\./g,'-')).val() != undefined)
		datePicker = $('#iws2_dp_datepicker_qa_' + icd10Object.dpEntryId + '_' + icd10Object.selvalue.replace(/\./g,'-')).val();
	else
		datePicker = $('#iws2_dp_datepicker_' + icd10Object.dpEntryId + '_' + icd10Object.selvalue.replace(/\./g,'-')).val();
	
	if ($('#iws2_dp_page_input').val() == '') {
		alert ('Page/Section cannot be blank.');
		valid = false;
		return valid;
	} 
	for(var i=0;i<icd10Object.dataFieldLabel.length;i++){
	 
        var counterId = i + 1;
        if(icd10Object.dataFieldLabel[i] != null && icd10Object.dataFieldLabelType[i] != null) {
            if($('#iws2_dp_cat'+counterId+'_input_' + icd10Object.dpEntryId).val() != '') {
                if(icd10Object.dataFieldLabelType[i].toLowerCase() == 'number') {
                    if(isNaN($('#iws2_dp_cat'+counterId+'_input_' + icd10Object.dpEntryId).val())) {
                        alert('' + icd10Object.dataFieldLabel[i] + ': Value should be Number');
                        valid = false;
                        return valid;
                    }
                }
            }
            if($('#iws2_dp_datepicker_'+ counterId +'_'+icd10Object.dpEntryId +'_'+ icd10Object.selvalue.replace(/\./g,'-')).val()==''){
              if(icd10Object.dataFieldLabelType[i].toLowerCase() == 'date' && (icd10Object.selvalue.replace(/\./g,'-').toLowerCase()=="dob" || icd10Object.selvalue.replace(/\./g,'-').toLowerCase()=="range")){
                 alert('' + icd10Object.dataFieldLabel[i] + ': Date can not be blank');  
                  valid = false;
                  return valid;
              }  
           }
        }
   
	}
	
	/*
	if(icd10Object.dataFieldLabel1!=null && icd10Object.dataFieldLabel1Type!=null){ 
			if($('#iws2_dp_cat1_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel1Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat1_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel1 +  ': Value should be Number');
						valid = false;
						return valid;
					}	
				}	
			}
		}
	   if(icd10Object.dataFieldLabel2!=null && icd10Object.dataFieldLabel2Type!=null){ 
			if($('#iws2_dp_cat2_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel2Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat2_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel2 +  ': Value should be Number');
						valid = false;
						return valid;
					}	
				}	
			}
		}
	   if(icd10Object.dataFieldLabel3!=null && icd10Object.dataFieldLabel3Type!=null){ 
			if($('#iws2_dp_cat3_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel3Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat3_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel3 +  ': Value should be Number');
						valid = false;
						return valid;
					}	
				}	
			}
		} 
		if(icd10Object.dataFieldLabel4!=null && icd10Object.dataFieldLabel4Type!=null){ 
			if($('#iws2_dp_cat4_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel4Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat4_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel4 +  ': Value should be Number');
						valid = false;
						return valid;
					}	
				}	
			}
		}
		if(icd10Object.dataFieldLabel5!=null && icd10Object.dataFieldLabel5Type!=null){ 
			if($('#iws2_dp_cat5_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel5Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat5_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel5 +  ': Value should be Number');
						valid = false;
						return valid;
					}   
				}   
			}
		} 
		if(icd10Object.dataFieldLabel6!=null && icd10Object.dataFieldLabel6Type!=null){ 
			if($('#iws2_dp_cat6_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel6Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat6_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel6 +  ': Value should be Number');
						valid = false;
						return valid;
					}   
				}   
			}
		}
		if(icd10Object.dataFieldLabel7!=null && icd10Object.dataFieldLabel7Type!=null){ 
			if($('#iws2_dp_cat7_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel7Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat7_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel7 +  ': Value should be Number');
						valid = false;
						return valid;
					}   
				}   
			}
		}
		if(icd10Object.dataFieldLabel8!=null && icd10Object.dataFieldLabel8Type!=null){ 
			if($('#iws2_dp_cat8_input_' + icd10Object.dpEntryId).val() != '') {
				if(icd10Object.dataFieldLabel8Type.toLowerCase() == 'number'){
					if(isNaN($('#iws2_dp_cat8_input_' + icd10Object.dpEntryId).val()) ){
						alert ('' + icd10Object.dataFieldLabel8 +  ': Value should be Number');
						valid = false;
						return valid;
					}   
				}   
			}
		}*/
	
	if(datePicker==''){
		alert("Date cannot be blank");
		valid = false;
		return valid;
	}else{
		if(checkDateFormat(datePicker))
			valid = true;
		else{
			alert("Date format is not in dd/mm/yy")
			valid = false;
			return valid;
		}
	}	
	return valid;
}

/*
Function: handleAcceptReject()
AcceptReject radio Button handling of Data point enrty for Step2-QA

Page Actions:
- Step 2 QA getStep2ICD10Screen  AcceptReject radio Button handling of Data Point and disable RejectReason button when Accept or Reject Click
*/

function handleAcceptReject(dpEntryId) {
  var acceptReject = $('input:radio[name=icd10_' + dpEntryId + ']:checked').val();
  if(dpChangedData == true && dpEntryId != prevFocusedDPEntryId && dpEntryId != null  ){
    if(acceptReject == 'V2')
      $('[name=icd10_' + dpEntryId + '][value="V1"]').attr('checked',true);
    else  
      $('[name=icd10_' + dpEntryId + '][value="V2"]').attr('checked', true);
    return;
  }
  if(acceptReject == 'V2') {
    $('#rejectReason_' + dpEntryId).attr("disabled", false);
  } else {
    $('#rejectReason_' + dpEntryId).attr("disabled", true);
  }
}

/*
Function: handleOP2AcceptReject()
AcceptReject radio Button handling of Data point enrty for Step2-OP2

Page Actions:
- Step 2 OP2 getStep2ICD10Screen  AcceptReject radio Button handling of Data Point and disable or enable RejectReason button, when Accept or Reject Clicked
*/
function handleOP2AcceptReject(dpEntryId){
	$('#saveDp_' + dpEntryId).removeAttr('disabled');
    $('#cancelDp_' + dpEntryId).removeAttr('disabled');
	var acceptReject = $('input:radio[name=icd10_'+dpEntryId+']:checked').val();
	if(acceptReject == 'V1')
	{
		$('#rejectReason_'+dpEntryId).attr("disabled", true);
	}
	else
	{
		$('#rejectReason_'+dpEntryId).attr("disabled", false);
	}
}

/*
Function: handleRejectReason()
RejectReason Data point enrty for Step2-QA

Page Actions:
- Step 2 QA getStep2ICD10Screen  RejectReason Data Point will show when RejectReason Click
*/

function handleRejectReason(reason,dpEntryId){
	$('#saveDp_' + dpEntryId).removeAttr('disabled');
    $('#cancelDp_' + dpEntryId).removeAttr('disabled');
    if((reason != undefined && reason != "undefined") && reason != "null")
	{
    	if(reason !=null || reason != "")
    	{
    		rejectReason = prompt("Enter reason for save/update Rejection:",reason);
    	}
    	else
    	{
    		rejectReason = prompt("Enter reason for save/update Rejection:");
    	}
	}
	else
	{
		rejectReason = prompt("Enter reason for save/update Rejection:");
	}
}

/*
Function: suspendNotes()
suspendNote Data point fill and show whenever suspendNotes has been clicked

Page Actions:
- Step 2 OP getStep2ICD10Screen  SuspendNote Data Point will fill when Suspend Click
- Step 2 QA getStep2ICD10Screen  SuspendNote Data Point will show when Suspend Click
*/
var note = null;

function suspendNotes(dpEntryId) {
   dateValueChangedHandler(dpEntryId);
   if(dpChangedData == true && dpEntryId != prevFocusedDPEntryId && dpEntryId != null  ){
      return;
    }  
    var suspendNoteForReview = $('#suspendDp_' + dpEntryId).val();
    if(note != null && note != "") {
      note = prompt(note);
    } else {
      if(suspendNoteForReview != null && suspendNoteForReview != '' && suspendNoteForReview != "null" && suspendNoteForReview != "undefined") {
        note = prompt(suspendNoteForReview);
        $('#unSuspendDp_' + dpEntryId).attr("disabled", false);
      } else {
        note = prompt("Enter Suspend Note");
      }
    }
}

/*
Function: unSuspend()
Empty the dp suspendNote data variables in the code whenever unSuspend has been clicked

Page Actions:
- Step 2 QA getStep2ICD10Screen  Data Point Entry Dialog unSuspend Click
*/

function unSuspend(icd10Object, code, desc, dpEntryId, pageId, sectionNumber, codeId) {
    dateValueChangedHandler(dpEntryId);
    if(dpChangedData == true && dpEntryId != prevFocusedDPEntryId && dpEntryId != null  ){
      return;
    }  
    var icd10Object = JSON.parse(decodeURIComponent(icd10Object));
    icd10Object.suspendnote = null;
    icd10Object = encodeURIComponent(JSON.stringify(icd10Object));
    note = "";
    saveDpDetails(icd10Object, code, desc, dpEntryId, pageId, sectionNumber, codeId, null)
    $('#unSuspendDp_' + dpEntryId).attr("disabled", true);
    $('#suspendDp_' + dpEntryId).attr("disabled", false);
    $("#iws2_step2_icd10codetable_"+dpEntryId).addClass("iws2_focusedDPSection");
    $("#iws2_step2_icd10codetable_"+dpEntryId).focus();
 
}

/* close the dp row when close icon is clicked */
function closeDPListForm(){
     $('#datapointrowfulldp_insert').remove();
    //$('#datapointrowfulldp_insert').css('display','none');
    var currentView = $('#iws2_dpfilter_full_pageview_button').html();
    //IWN-33 Closing DP slider window causes DP list to switch between page view and category view
    if(qsStageId == 6 || qsStageId == 66 || qsStageId == 67 || qsStageId == 68 || qsStageId == 71){ //IWN-382: 3-way split of Step-2-OP
    if(currentView == IWS2SCREENS_FULLDPLIST_PAGEVIEW)
        currentView = IWS2SCREENS_FULLDPLIST_CATEGORYVIEW;
    else 
        currentView = IWS2SCREENS_FULLDPLIST_PAGEVIEW;
      }
    
    addTableDataPointsHandler(currentView);
}
/* close the dp row in QA when close icon is clicked */
function closeDPListQA1Form(code){
    //$('#codeTableQA1_'+code).css('display','none');
    //$('#codeTableQA1_'+code).html('');
	$('#dpform_detailsQA1_' + code).remove();
    $('#codeTableQA1_' + code).remove();
    $('#dpformQA1td_' + code).remove();
}

function datapointFullDPListClickHandler(rowid,dpentryId,pageId)
{
	  dpListView=true;
    if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
    searchRowNumber = rowid;
    displaySearch = true;
    //dpSearchCriteria =false;
    var currow = $('#datapointrow' + rowid);
    searchRow = currow;
    var rowcount = currow.children("#rowcount").text();
    var page = currow.children("#page").text();
    var section = currow.children("#section").text();
    var pagecat = currow.children("#page").html();
    var sectioncat = currow.children("#section").html();
    code = currow.children("#code").text();
    searchCode = code;
    category = currow.children("#category").text();
    searchCategory = category;
    subcategory = currow.children("#subcategory").text();
    searchSubcategory = subcategory;
    //this dpentryid is set for only categoryviewscreen pageno and sec no-- this is row id
    if(dpentryId==null || dpentryId==undefined){
    	if(pagecat.indexOf("<br>") != -1){
    		pagecat = pagecat.split("<br>");
    		pagecat = pagecat[0];
    	}else{
    		pagecat = currow.children("#page").text();
    	}
    	if(sectioncat.indexOf("<br>") != -1){
    		sectioncat = sectioncat.split("<br>");
    		sectioncat = sectioncat[0];
    	}else{
    		sectioncat = currow.children("#section").text();
    	}
    	dpentryId = pagecat+"*"+sectioncat;
    	selectedPageNumber = pagecat;
    	section = sectioncat;
    }
    //IWO-86:In DP Slider Window showing "No medical codes found ".
    resetSearchCriteria();
    displayMedicalCodesIWS2(rowid, currow);
    clickSelectedFullandSectionDPDatapoint(category, subcategory, code, "fulldprowclicked", "true", dpentryId, section);
    $('#dpfulllistactiverow').html(rowid);
    /*
    for ( var i = 0; i < dplistEntriy.length; i++ ) {
    var rowId =  i+1;
    if(rowId%2 == 0){
    $('#datapointrow'+rowId+' td[id=page]').css('background-color','#E2E2E2');
    $('#datapointrow'+rowId+' td[id=section]').css('background-color','#E2E2E2');
    }else{
    $('#datapointrow'+rowId+' td[id=page]').css('background-color','white');
    $('#datapointrow'+rowId+' td[id=section]').css('background-color','white');
    }
    //document.getElementById(rowId).setAttribute("class", "grid_row_norm");
    }
    $('#datapointrow'+rowid+' td[id=page]').css('background-color','#B7EAFA');
    $('#datapointrow'+rowid+' td[id=section]').css('background-color','#B7EAFA');*/

    //pageSectionClickHandler(pageId,section);
    for( i = 0; i < objCase.pages.length; i++) {
      if(objCase.pages[i].id == pageId) {
        thumbnailClickHandler(pageId, i);
      }
    }

    setTimeout('gridSelected(\'' + section + '\')', 4000);
  var gridselector = null;
  gridselector = new ObjGridSelection(snMaxSectionsPerSelection);
  var tmpsecbegend = gridselector.getNewObjBegEndSection(section);
  gridselector.setSelectedRange(section);
  gridselector.setBegEndSection(section);
  gridselectorbegendobj = gridselector.getObjMultipleSelection();
  if (objActivePage != undefined) {
		selectedPageNumber = objActivePage.finalPageNumber;
  }
 		selectedSectionNumber = "__";
		if (isGridObjectBegEndValid()) {
			if (gridselectorbegendobj.isBegEndEqual()) {
				selectedSectionNumber = gridselectorbegendobj.begpos + "";
			} else
				selectedSectionNumber = gridselectorbegendobj.begpos + "-"
						+ gridselectorbegendobj.endpos;
		}

}

/*
Function: gridSelected()
gridSelected method was called for highlight the grid section as lightblue from datapointFullDPListClickHandler

Page Actions:
- Step 2 OP gridSelected  grid section was highlight as lightblue
- Step 2 QA gridSelected  grid section was highlight as lightblue
*/
function gridSelected(currentSction){
		//flag indicates that this is an update not a new datapoint entry.
		var flag = 3;
		var entryData = null;
		
		//entry is an encoded json string of type DPENTRY
		leftWindow.displayDataPointEntry(currentSction,flag,entryData);
		//leftWindow.handleGridRowClick(currentSction);
		currentSction="";
}

function setFullDPListProcessingData(dpEntry) {
	//Doing Full DP List processing
	if( isFullDpListScreen() )
	{
		if(fulldplistrowdata == null && dpEntry!=null)
		{
				//Save this object for later use instead of load dpEntry again
			setFullDPListRowData(dpEntry);		

				//Provide the necessary info for saving new DP
			pageNumber = fulldplistrowdata.pagenumber;
			sectionNumber = fulldplistrowdata.pagesection;
			pageId = fulldplistrowdata.pageid;
		} else
		{
			if(fulldplistrowdata!=null)
			{
					//Provide the necessary info for saving new DP
				pageNumber = fulldplistrowdata.pagenumber;
				sectionNumber = fulldplistrowdata.pagesection;
				pageId = fulldplistrowdata.pageid;
			}		
		}
	}
}

/** Function setDatapointSaveStatus(dpEntryId)
*
*  On save saving/updatin a datapoint, save a message status to be displayed.
*  
* @param dpEntryId - Datapoint id
*/
function setDatapointSaveStatus(newDpEntryId,dpEntryId,code)
{
	dpentrymsg  = "Created new datapoint [" + code + "]!";
	if((newDpEntryId!='null' && newDpEntryId!=null) && (dpEntryId!='null' && dpEntryId!=null))
		 dpentrymsg  = "Updated datapoint [" + code + "]!";

		//Have to save message to a temporary area, since whole datapoint div is remove and rewritten
	$("#iws2_tmp_msg").html(dpentrymsg);
}

function clickSelectedFullandSectionDPDatapoint(categorytext,subcategorytext,codetext,clickedIndicator,fromDataPointfullListIndicator,dpentryId,section)
{
	//Load selected category
	iscategoryclick = false;
	var categoryParrentId;     // store the parrent id of category
	for (i = 0; i < objDPInfo.length; i++) {
		if(objDPInfo[i].level == 1 && categorytext==objDPInfo[i].name)
		{		
			isDPEntryRowClicked = true;
			categoryParrentId = objDPInfo[i].id;
			$("#category_"+objDPInfo[i].id).click();
			iscategoryclick = true;
			break;
		} 
	}
	
//Load selected subcategory

  if(iscategoryclick) {
    for( j = 0; j < objDPInfo.length; j++) {
      if(objDPInfo[j].level > 1 && subcategorytext == objDPInfo[j].name && categoryParrentId == objDPInfo[j].parentid) {
        if(clickedIndicator == "sectiondpclicked") {
          subCategoryClickHandler(objDPInfo[j].id, categorytext, subcategorytext, '#iws2_subc_entries');
        } else {
          subCategoryClickHandler(objDPInfo[j].id, categorytext, subcategorytext, '#iws2_subc_entries_fulldp');
        }
        isDPEntryRowClicked = false;
        if(medicalCodes != null) {
          for(var j = 0; j < medicalCodes.length; j++) {
            //Click selected code
            if(medicalCodes[j].name == codetext) {
              setLoadingOfDPFormOn();
              sendValueToDPSection('clicked', medicalCodes[j].name, medicalCodes[j].description, medicalCodes[j].id, medicalCodes[j].id, medicalCodes[j].id, null, fromDataPointfullListIndicator, dpentryId, section);
        
              subCategoryMap['section'] = true;
              //For corresponding parentId of active dpEntryId is on Expand Mode
              $("#accordionCode_" + medicalCodes[j].parentid).click();
              var parentIdExist = $("#accordionCode_" + medicalCodes[j].parentid).parents('li');
              if(parentIdExist.length >= 2) {
                for(var k = 0; k < parentIdExist.length; k++) {
                  if(k % 2 != 0) {
                    $('#' + parentIdExist[k].firstChild.id).click();
                  }
                }
              }
            //  setLoadingOfDPFormOff();
          }
        }

        break;
      }
    }
  }
}
}

/*
 * Click a thumbnail from the thumnail slider
 */
function clickThumbnailFromSliderHandler(pageId, pageDomId) {
	resetSliderThumbnailStyle(pageId, pageDomId) ;
	thumbnailClickHandler(pageId, pageDomId);
}

/*
 * Reset and change the border for a click slider thumbnail
 */
function resetSliderThumbnailStyle(pageId, pageDomId) {
	for (var i = 0; i < objCase.pages.length; i++) { 
		var tli = $("#thumb" + objCase.pages[i].id + " li");
		
		if (objCase.pages[i].id == pageId) {
			tli.css({'border': '1px solid red'});
		} else {
			var tstyle = getThumbnailBorderStyle(objCase.pages[i].id);
			tli.css('border', tstyle);
		}
	}
}

/** Function getSavedDataPointStatus()
*
*  Dispay saved datapoint status in a fading popup
*   
*/
function getSavedDataPointStatus()
{
	var xdpmsg = $('#iws2_tmp_msg').html();
	if(xdpmsg!=null && xdpmsg.length>0)
	{
		popupFadeAwayMsg(xdpmsg,'#ff9f5f',1500);
		$("#iws2_tmp_msg").html('');
	}		    		
}

/* Function: showHideThumbnailSlider()
*
* Test if the thumnail slider is hidding, if show display slider
*/
function showHideThumbnailSlider()
{
	var selector_slider = "#thumbnail_slider_iws2 #cntnr_thumbnails";
	if (!$(selector_slider + ' #cntnr_thumbnails_slider').is(':visible'))
	{	
		$(selector_slider + ' #cntnr_thumbnails_subfilter').show();
		$(selector_slider + ' #cntnr_thumbnails_slider').show();	
		$(selector_slider).height(240);
	}
}

/**
 *on key press when focus on search text filef 
 */
function searchHandle(e){
	if(e.keyCode==13)
		$('#icd10_list_input_search').click();
}

function isDpEntryScreen()
{
	tmpscreen = $('#hiddenIwsScreen').val();
	if(tmpscreen!=null && tmpscreen == IWS2SCREENS_DPENTRY)
		return true;
	
	return false;
}


function isFullDpListScreen()
{
	tmpscreen = $('#hiddenIwsScreen').val();
	if(tmpscreen!=null && tmpscreen == IWS2SCREENS_DPFULLLIST)
		return true;
	
	return false;
}

function isThumbnailScreen()
{
	tmpscreen = $('#hiddenIwsScreen').val();
	if( tmpscreen==null || (tmpscreen!=null && tmpscreen.length<=0) )
		return true;
	
	return false;
}

function isDPFullListProcessing()
{
	var dprow = $('#dpfulllistactiverow');
	if(dprow!=null)
		return true;
	
	return false;
}

function isDPFullListRowActive()
{
	if( isDPFullListProcessing() )
	{
		var dprow = $('#dpfulllistactiverow').text();
		if(dprow.length>0)
			return true;	
	}
	
	return false;
}

/*
Function: resetSearchCriteria()
clearing search term value from text box and setting default page state

Page Actions:
- Step 2 OA getStep2ICD10Screen  Data Point Entry Reset Click
*/ 
function resetSearchCriteria(rowNumber)
{
  if(dpChangedData == true){
      alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
      return; 
  }
	searchTerm = $('#icd10_list_input').val();
	if(searchTerm != "")
	{
		$('#icd10_list_input').val('');
	}
	var presetValue = "Category";
	searchCriteria = $('input:radio[name=searchCriteria]:checked').val();
	
	if(searchCriteria != presetValue)
	{
		$("[name=searchCriteria]").filter("[value="+presetValue+"]").prop("checked",true);
	}
	
	$('#iws2_category_list_entries').html('');
	$('#iws2_category_search_status').html('');
	$('#iws2_category_search_status2').html('');
	$('#iws2_subc_entries').html('');
	
	displaySearchCriteria =false;
	dpSearchCriteria =false;
	lastSelSubcategory =null;
	searchTerm =null;
	searchCriteria =null;
	if(gridselectorbegendobj == null || rowNumber == null )
		createAccordianMenu('#iws2_category_list_entries','#collapse_all','#expand_all');
	//currentSectionDPListClickHandler(1);
}

/**
 * Handle pressing of Esc key to refresh page section
 */
function refreshPageSection()
{
	gridselectorbegendobj = null;
	fillDPEntryInfo();
	if(dpformaction == "new")
	{
			//Replace the page DP Form Section
		var tmpsec = $('#iws2_subc_input_pagesection_null').val();
		tmpsec = tmpsec.substring(0,tmpsec.indexOf("Sec") + 3) + " _";		
		$('#iws2_subc_input_pagesection_null').val(tmpsec);
	}
	//alert("The page section was cleared, please reselect a section or section range");
}

function resetDpEntryScreen()
{	
	if(lastSelSubcategory != null)
        $('#subcategory_' + lastSelSubcategory).css('color', 'black');	
	lastSelSubcategory = null;
	
	var collapseit = $('#collapse_all');
	if(collapseit!=null)
		collapseit.click();

	$('#dpfulllistactiverow').remove();
}

/*
Function: resetDPSearchCriteria()
clearing search term value from text box and setting default page state

Page Actions:
- Step 2 OA getStep2ICD10Screen  Data Point Window Reset Click
*/ 
function resetDPSearchCriteria()
{
  if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
  }
	searchTerm = $('#icd11_list_input').val();
	if(searchTerm != "")
	{
		$('#icd11_list_input').val('');
	}
	var presetValue = "Category";
	searchCriteria = $('input:radio[name=searchCriteria2]:checked').val();
	
	if(searchCriteria != presetValue)
	{
		$("[name=searchCriteria2]").filter("[value="+presetValue+"]").prop("checked",true);
	}
	
	$('#iws2_fulldp_category_list_entries').html('');
	$('#iws2_fulldp_search_status').html('');
	$('#iws2_fulldp_search_status2').html('');
	$('#iws2_subc_entries_fulldp').html('');
	
	displaySearchCriteria = false;
	fullDPSearchCriteria = false;
	searchTerm = null;
	searchCriteria = null;
	lastSelSubcategory = null;
	
	displayMedicalCodesIWS2(searchRowNumber,searchRow);	
	clickSelectedFullandSectionDPDatapoint(searchCategory, searchSubcategory, searchCode, "fulldprowclicked","","","");
	$('#dpfulllistactiverow').html(searchRowNumber);
}

/**
 *OnClick on Range Lovs to populate Range field 
 * @param {Object} id
 */
function onclickRangeValue(id)
{
    var ids= id.split("_");
    var lagendNumber= ids[2].charAt(6);
    var value= $('#'+id + " :selected").text().trim();
    var ids=id.split("_");
    if(value!="")
     value=value.replace(/ /g,"").split("-");
     //set legend value after splitting lov value 
    $('#iws2_dp_range_low_input_'+lagendNumber+'_'+ids[3]).val(value[0]);
    $('#iws2_dp_range_high_input_'+lagendNumber+'_'+ids[3]).val(value[1]);
}


function onChangeStatusDisplay(lovId, icd10obj, isHierarchyChildWindowOpen){
    var icd10obj=JSON.parse(decodeURIComponent(icd10obj));
    if(isHierarchyChildWindowOpen)      
      dataValue=window.opener.$('#' + lovId + " :selected").text().trim();  
    else 
      dataValue=$('#' + lovId + " :selected").text().trim();
      
    for (var i=0; i < icd10obj.dataFieldLabel.length; i++) {
      var counterId = i+1;
      if(icd10obj.dataFieldLabel[i].toLowerCase() == 'end date'){
        if(dataValue != null && dataValue != '' && dataValue.toLowerCase() == 'current prescription'){  
           $('#iws2_dp_datepicker_' + counterId + '_' + icd10obj.dpEntryId +'_'+ icd10obj.selvalue.replace(/\./g,'-')).val('');
           $('#iws2_dp_datepicker_' + counterId + '_' + icd10obj.dpEntryId +'_'+ icd10obj.selvalue.replace(/\./g,'-')).attr("disabled", "disabled");
           break;
        } else {
           $('#iws2_dp_datepicker_' + counterId + '_' + icd10obj.dpEntryId +'_'+ icd10obj.selvalue.replace(/\./g,'-')).removeAttr('disabled');
           break;
        }   
      }      
    }
}


/**
 *on Change on UnitLovs to populate Range fields Label 
 * @param {Object} dpentryId
 * @param {Object} dpicd10obj
 */
function onChangeUnitLblDisplay(lovId, dpicd10obj, dataFieldNumber,hierarchyChildWindowOpen){
  var icd10obj=JSON.parse(decodeURIComponent(dpicd10obj));
  var unitRangeLblId=$('#iws2_range_unitlbl').selector;
  // To get id for child window 
       //if(childWindow)
       //unitRangeLblId= window.opener.$('#iws2_range_unitlbl').selector;
       
       
  var dataValue="";
  if(hierarchyChildWindowOpen)      
   dataValue=window.opener.$('#' + lovId + " :selected").text().trim();  
  else 
   dataValue=$('#' + lovId + " :selected").text().trim();  
     
  // change Units Textbox value 
  if(hierarchyChildWindowOpen)   
  window.opener.$('#iws2_dp_Units' + dataFieldNumber + '_text_input_' + icd10obj.dpEntryId).val(dataValue);
  else 
  $('#iws2_dp_Units' + dataFieldNumber + '_text_input_' + icd10obj.dpEntryId).val(dataValue);
  // change ranges Unit Textbox values  
  
  //Replacement of lines below commented code
  for( var i=0;i<icd10obj.dataFieldLabel.length;i++){
    
        var counterId = i + 1;
        if(icd10obj.dataFieldLabel[i] != null && icd10obj.dataFieldLabel[i].toLowerCase() == 'range') {
            if(hierarchyChildWindowOpen)
                window.opener.$(unitRangeLblId + '_' + counterId + '_' + icd10obj.dpEntryId).val(dataValue);
            else
                $(unitRangeLblId + '_' + counterId + '_' + icd10obj.dpEntryId).val(dataValue);
        } 

  }
   /*
   //This is duplicate code in setUnitsText Method 
     if(icd10obj.dataFieldLabel1!= null && icd10obj.dataFieldLabel1.toLowerCase() == 'range'){
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_1_' + icd10obj.dpEntryId).val(dataValue); 
        else 
        $(unitRangeLblId+'_1_' + icd10obj.dpEntryId).val(dataValue);
     }
        
     if(icd10obj.dataFieldLabel2!= null && icd10obj.dataFieldLabel2.toLowerCase() == 'range'){
        if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_2_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_2_' + icd10obj.dpEntryId).val(dataValue);
     }
        
     if(icd10obj.dataFieldLabel3!= null && icd10obj.dataFieldLabel3.toLowerCase() == 'range'){
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_3_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_3_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel4!= null && icd10obj.dataFieldLabel4.toLowerCase() == 'range')
     {
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_4_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_4_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel5!= null && icd10obj.dataFieldLabel5.toLowerCase() == 'range')
     {
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_5_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_5_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel6!= null && icd10obj.dataFieldLabel6.toLowerCase() == 'range'){
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_6_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_6_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel7!= null && icd10obj.dataFieldLabel7.toLowerCase() == 'range')
     {
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_7_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_7_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel8!= null && icd10obj.dataFieldLabel8.toLowerCase() == 'range')
     {
         if(hierarchyChildWindowOpen)
        window.opener.$(unitRangeLblId+'_8_' + icd10obj.dpEntryId).val(dataValue);
        else
         $(unitRangeLblId+'_8_' + icd10obj.dpEntryId).val(dataValue);
     }
     if(icd10obj.dataFieldLabel1 != null && icd10obj.dataFieldLabel1.toLowerCase() == 'range')
        $(unitRangeLblId+'_1_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel2 != null && icd10obj.dataFieldLabel2.toLowerCase() == 'range')
        $(unitRangeLblId+'_2_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel3 != null && icd10obj.dataFieldLabel3.toLowerCase() == 'range')
        $(unitRangeLblId+'_3_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel4 != null && icd10obj.dataFieldLabel4.toLowerCase() == 'range')
        $(unitRangeLblId+'_4_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel5 != null && icd10obj.dataFieldLabel5.toLowerCase() == 'range')
        $(unitRangeLblId+'_5_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel6 != null && icd10obj.dataFieldLabel6.toLowerCase() == 'range')
        $(unitRangeLblId+'_6_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel7 != null && icd10obj.dataFieldLabel7.toLowerCase() == 'range')
        $(unitRangeLblId+'_7_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());
       if(icd10obj.dataFieldLabel8 != null && icd10obj.dataFieldLabel8.toLowerCase() == 'range')
        $(unitRangeLblId+'_8_' + icd10obj.dpEntryId).val($('#' + lovId + " :selected").text().trim());*/
   
  

}

/**
 *auto populate when range fields entry exist in Range lovs  
 * @param {Object} id
 * @param {Object} lovs
 */
function autoPopulateLovs(id,lovs){
    var ids=id.split("_");
    var lovs=lovs.split(",");
    var legendNumber=ids[5];
    var dpEntryId=ids[6];
    var populateLovsFlag=true;
    if($('#iws2_dp_range_low_input_'+ids[5]+"_"+ids[6]).val()!="" && $('#iws2_dp_range_high_input_'+ids[5]+"_"+ids[6]).val()!="")
        var range=($('#iws2_dp_range_low_input_'+ids[5]+"_"+ids[6]).val()).trim()+" - " + ($('#iws2_dp_range_high_input_'+ids[5]+"_"+ids[6]).val()).trim();
    else if($('#iws2_dp_range_low_input_'+ids[5]+"_"+ids[6]).val()!="" && $('#iws2_dp_range_high_input_'+ids[5]+"_"+ids[6]).val()=="")
        var range=($('#iws2_dp_range_low_input_'+ids[5]+"_"+ids[6]).val().toLowerCase()).trim();       
    for(var i=0;i<lovs.length;i++){
       if(range==lovs[i].toLowerCase()){
          if($('#iws2_dp_legend'+legendNumber+'Lovs_'+ dpEntryId).html()!=null)
            $('#iws2_dp_legend'+legendNumber+'Lovs_' + dpEntryId + ' option:contains(\"'+ lovs[i] + '\")').attr('selected','selected');
          onclickRangeValue('iws2_dp_legend'+legendNumber+'Lovs_' + dpEntryId);
          populateLovsFlag=false;
       }
    }
    if(populateLovsFlag && $('#iws2_dp_legend'+legendNumber+'Lovs_'+ dpEntryId).html()!=null)
      $('#iws2_dp_legend'+legendNumber+'Lovs_' + dpEntryId + ' option:first-child').attr('selected','selected');
    
}


  /**
   *auto select Unit lovs Combo when units textbox fields entry exist in Units lovs combo
   * @param {Object} id
   * @param {Object} lovs
   */
 
function autoSelectUnitsLovs(lovId, dpicd10obj, dataFieldNumber) {
  var icd10obj = JSON.parse(decodeURIComponent(dpicd10obj));
  var unitsLovs = icd10obj.dataFieldLovs1;
  var unitsText = null;
  var unitsLovsTextSelected = false;

  // gets the UnitsText box value
  if($('#iws2_dp_Units' + dataFieldNumber + '_text_input_' + icd10obj.dpEntryId).val() != "")
    unitsText = $('#iws2_dp_Units' + dataFieldNumber + '_text_input_' + icd10obj.dpEntryId).val().toLowerCase().trim();

 // Check for each option and select if found
  $("#" + lovId + " option").each(function() {
    if($(this).text().toLowerCase().trim() == unitsText) {
      $(this).attr('selected', 'selected');
      onChangeUnitLblDisplay(lovId, encodeURIComponent(JSON.stringify(icd10obj)).replace(/'/g, "\\'\\'"), dataFieldNumber,false);
      unitsLovsTextSelected = true;
    }
    
  });
     if(!unitsLovsTextSelected)    // set Units textbox value to unitstextbox and range units value
     setUnitsText(icd10obj, dataFieldNumber, unitsText);
  if(!unitsLovsTextSelected && $('#' + lovId).html() != null)
    $('#' + lovId + ' option:first-child').attr('selected', 'selected');

}




/** 
 * Open the hiearchy for the desired code and click it 
 */
function gotoCodeInHierarchy(codedata)
{
	if (codedata.flagFormDPListSearch){
		$("#collapse_all_fulldp").click();
	}else{
		$("#collapse_all").click();
	}	
	$("#icdCodeCollapse_all").click();
	
	if(codedata.codepath==null || codedata.codepath.length <= 1 || objCase.hierarchyrevision == null)
	{
		alert("Code [" + codedata.codename + "] for case " + objCase.id + " was not found using case revision " + codedata.revision + "!" );
		return;
	}
	
		//Create a hierarchy object
	var hierarchy = new ObjHierarchyForGlossary(objDPInfo,codedata.codepath,codedata.codename,codedata.flagFormDPListSearch);
	hierarchy.init();
	hierarchy.gotoHierarchyPath();
}
/**
 *return Multiple selected Value with comma seperated.  
 * @param {Object} multiSelectComboId
 */
function getMultipleSelectedValue(multiSelectComboId)
{
     var selValue=null;
     if($('#'+multiSelectComboId).html() != null)
              {
                 var selObj =new Array();
                 var count=0;           
                 $('#'+multiSelectComboId+' option:selected').each( function() {
                  selObj[count]=$(this).text().trim();
                  count++;
                 });
                
                 for(var  i=0;i<selObj.length;i++) {
                     if(i==0)
                     selValue=selObj[i];
                     else
                      selValue+=","+selObj[i]
                 }
              }
      return selValue;
}
/**
 *populate Selected MultiSelect value in Combo 
 * @param {Object} multiSelectId
 * @param {Object} selectedValues
 */
function populateMultipleSelectedValue(multiSelectId,selectedValues,flag)
{
    
    var foundflag = false;
    var multiComboId=null
    if(!flag)
    multiComboId=$("#" + multiSelectId + " option");
    else
    multiComboId=window.opener.$("#" + multiSelectId + " option");
     
      multiComboId.each(function() {
        var matchFlag = false;
        for(var i = 0; i < selectedValues.length; i++) {
            if($(this).text() == selectedValues[i]) {
                foundflag = true;
                matchFlag = true;
                $(this).attr('selected', 'selected');
            }
        }
        if(!matchFlag)
            $(this).attr('selected', false);
    });

    return foundflag;

}
