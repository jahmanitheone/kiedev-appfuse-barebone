function ObjStep2QaView() {
    clientDateFormat = objCase._client.defaultDateFormat;
    var rowIndex = 1;
    this.objBckList
    this.objDataPoints
    this.codeObj = null;
    this.init = function() {
        this.step2qaview();
    }
    
    
    this.step2qaview = function(bkgList, objDpPoints, filter) {

        this.objBckList = bkgList;
        this.objDataPoints = objDpPoints;
        $('#data_point_qa_table').show();

        // if no-data available
        if(this.objDataPoints == null || this.objDataPoints.length == 0) {
            $('#data_point_qa_table').append($('#iws2_qc2_messge').show());
            //IWO-24: when there is no item for QC2, the complete button needs to be enabled.
            $('#iws2_qc2_dpfilter_full_complete_button').removeAttr('disabled');
        } else {
            // display Categorized List
            var datapointTableHtml = '<div class=\"cur_sel_dp_table\"><div style="padding-left:12px" class="step4TextboxLabel"></div><table  border="0" colspan="0" rowspan="0" width="100%" class="tableclass" id="dataTableReport"><thead style=\"cursor: pointer;\">';
            datapointTableHtml += '</thead><tbody>';
            /*IWO-19 : Build Step2-QC Report-Style for the "Categorized Listing" Portion of the report
            * Remove BackGround Section from QC1 and QC2 Stage  */
            /*
             //BackGround data table
             backGroundTablehtml=this.displayBckGroundDataforStep2Qa(datapointTableHtml,filter,this.objBckList)
             //set BackGroundTableHtml view
             datapointTableHtml=backGroundTablehtml;

             //Need to Remove Critical Condition section from QC stages

             criticalTableHtml=this.displayCriticalConditionView(datapointTableHtml,filter,this.objDataPoints);
             //set CriticalTableHtml view
             datapointTableHtml=criticalTableHtml;
             
             */


            categorizedTableHtml = this.displayDataPointForStep2Qa(datapointTableHtml, filter, this.objDataPoints);
            //set CategorizedTableHtml view
            datapointTableHtml = categorizedTableHtml;

            datapointTableHtml += '</tbody></table>';
            datapointTableHtml += '</div></div>';

            $('#data_point_qa_table').html(datapointTableHtml);
            
            // enable/disable Complete button
            var flag = enabledCompletButton();
            if(!flag) {
                if(qsStageId == 7 || qsStageId == 50)
                    $('#iws2_dpfilter_full_complete_button').prop('disabled', true);
                if(qsStageId == 48)
                    $('#iws2_qc2_dpfilter_full_complete_button').prop('disabled', true);
            } else {
                if(qsStageId == 7 || qsStageId == 50)
                    $('#iws2_dpfilter_full_complete_button').removeAttr('disabled');
                if(qsStageId == 48)
                    $('#iws2_qc2_dpfilter_full_complete_button').removeAttr('disabled');
            }
        }

    }
    /**
     * THIS FUNCTION IS OBSOLETE!!!
     */
    this.displayBckGroundDataforStep2Qa = function(datapointTableHtml, filter, dpBckGrndList) {

        if(dpBckGrndList != null && dpBckGrndList.length > 0) {

            var srlNoforStep2QA1 = 0;
            var flagCount = 0;
            for(var i = 0; i < dpBckGrndList.length; i++) {
                var codename = dpBckGrndList[i].codeName;
                var entrydata = null;
                if(dpBckGrndList[i].dataField2Value != null && dpBckGrndList[i].dataField3Value != null)
                    entrydata = dpBckGrndList[i].dataField2Value + " " + dpBckGrndList[i].dataField3Value;
                else if(dpBckGrndList[i].dataField2Value != null)
                    entrydata = dpBckGrndList[i].dataField2Value;
                else
                    entrydata = dpBckGrndList[i].dataField3Value;
                var page = dpBckGrndList[i].finalPageNumber;
                var section = dpBckGrndList[i].sectionRange;
                var dpEntryId = dpBckGrndList[i].entryId;
                var isCompleted = dpBckGrndList[i].isCompleted;
                var isRejected = dpBckGrndList[i].isRejected;
                var dateString = dpBckGrndList[i].dataDate;
                var pageId = dpBckGrndList[i].pageId;
                var sectionNumber = dpBckGrndList[i].sectionRange;
                var pageSectionarr = ["NAME", "GENDER", "AGE", "DOB", "RX", "REPORT", "RANGE"]
                if(pageSectionarr.contains(codename)) {
                    page = "";
                    section = "";
                }

                if(dateString == null) {
                    dateString = "";
                } else {
                    dateString = millisToDateHandler(dateString);
                }
                var suspendNoteText = dpBckGrndList[i].suspendnote;
                if(suspendNoteText == null)
                    suspendNoteText = "";

                var suspendNote;
                if(codename == "HEIGHT" || codename == "WEIGHT" || codename == "TOB1") {
                    entrydata += " as of  " + dateString;
                }
                if(codename == "DOB")
                    codename = "Date of Birth";
                else if(codename == "TOB1")
                    codename = "Tabbco";
                else if(codename == "RX")
                    codename = "Rx Last 2 Years";
                else if(codename == "RANGE")
                    codename = "Date Range";
                else if(codename == "REPORT")
                    codename = "Report Ordered";
                else
                    codename = (codename.toLowerCase()).charAt(0).toUpperCase() + codename.slice(1).toLowerCase();
                /*IWO-19Build Step2-QA Report-Style for the "Categorized Listing" Portion of the report
                 * Remove Suspend note functionality
                 */
                
                var suspendNoteImage = "";
                // But for QA-Review Stage Review Notes are available        
                if(qsStageId == 50) {
                  if(suspendNoteText != "")
                    suspendNoteImage = '<span><img title=\"Click to edit suspend Note\" style=\'margin-top:3px\' id="suspend" src="images/SuspendNote-Entered.png\" /></span>';
                  else
                    suspendNoteImage = '<span><img title=\"Click to enter suspend Note\" style=\'margin-top:3px\' id="unSuspend" src="images/SuspendNote-Empty.png\" /></span>';
                }

                if(isCompleted == "Y")
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" checked value=\"' + isCompleted + '\" />';
                else
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" value=\"' + isCompleted + '\" />';
                var QCAIStatusImage = "";
                var QCAIStatus = dpBckGrndList[i].returnStatus;
                if(QCAIStatus != null && QCAIStatus == "Code Agreed" && dpBckGrndList[i].codeName == "RANGE")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/green_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "Code Suggested" && dpBckGrndList[i].codeName == "RANGE")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/yellow_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "No ICD Code found" && dpBckGrndList[i].codeName == "RANGE")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "Alert" && dpBckGrndList[i].codeName == "RANGE")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "No Code Found" && dpBckGrndList[i].codeName == "RANGE")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else {
                    if(dpBckGrndList[i].codeName == "RANGE")
                        QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                }

                var arr = ["Code Suggested", "No ICD Code found", "Alert", "No Code Found"];
                if(QCAIStatus != null && arr.contains(QCAIStatus) && dpBckGrndList[i].codeName == "RANGE") {
                    var QCAIReturnVal = dpBckGrndList[i].returnValue;

                    var qcaiSuggestedTable = '<table border=0px; style=\"cursor: pointer; margin:0!important;\">';
                    qcaiSuggestedTable += '<tr ><td style=\"cursor: pointer; font-style:italic; font-size:14px;\">' + entrydata + '</td></tr>';
                    if(QCAIReturnVal != null) {
                        this.getHierarchyObjectByCode(QCAIReturnVal, dpBckGrndList[i].hierarchyrevision,caseId);
                        qcaiSuggestedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:14px;\" >';
                        if(this.codeObj != null) {
                            for(var index = 0; index < this.codeObj.length; index++)
                                qcaiSuggestedTable += '<td>' + QCAIReturnVal + '-' + this.codeObj[index].description + '</td>';
                        } else
                            qcaiSuggestedTable += '<td>' + QCAIReturnVal + '</td>';
                        qcaiSuggestedTable += '</tr>';
                    }
                    qcaiSuggestedTable += '</table>';
                    entrydata = qcaiSuggestedTable;
                }

                if(filter == '' || filter == null || (filter == "InComplete Only" && isCompleted == "N") || (filter == "Completes Only" && isCompleted == "Y") || (filter == "QCAI Suggestions Only" && QCAIStatus == "Code Suggested") || (filter == " QCAI Alerts Only" && QCAIStatus == "Alert") || (filter == "QCAI Issues Only" && (QCAIStatus == "No ICD Code found" || QCAIStatus == "No Code Found"))) {
                    if(flagCount == 0)
                        datapointTableHtml += '<tr class="table-h1"  ><td colspan="4" id="category" onclick="" style=\"cursor: pointer; text-align: center;\">BackGround Data</td><td class="table-h2" style=\"cursor: pointer; text-align:left; \">Page</td> <td class="table-h2" style=\"cursor: pointer; text-align:left; \">Line</td> <td class="table-h2" style=\"cursor: pointer; text-align:left; \">Complete</td> </tr>';
                    flagCount++;
                    srlNoforStep2QA1 += 1;
                    datapointTableHtml += '<tr id="datapointqa1row' + rowIndex + '" class=\"odd\"';
                    datapointTableHtml += '>';
                    
                    datapointTableHtml += '<td id="datapointqa1col' + dpEntryId + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(dpBckGrndList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');" style=\"cursor: pointer;width: 100px; \">' + codename + '</td>';
                    //datapointTableHtml += '<td id="suspendNote" style=\"cursor: pointer;padding : 0 6px 0 0\">' + suspendNoteImage + '</td>';
                    
                    if(qsStageId == 50)
                      datapointTableHtml += '<td id="suspendNote" onclick= \"openQAReviewPopup('+ rowIndex + ','+ i + ',\'' + suspendNoteText + '\',' + dpBckGrndList[i].dpentryId + '); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\'); \"style=\"cursor: pointer;padding : 0 6px 0 0\">' + suspendNoteImage + '</td>';
                     
                    datapointTableHtml += '<td id="datapointqa1col' + dpEntryId + '\" onclick= \"qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(dpBckGrndList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\'); leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer;padding : 0 6px 0 0 \">' + QCAIStatusImage + '</td>';
                    datapointTableHtml += '<td id="entryData" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(dpBckGrndList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');  leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');" style=\"cursor: pointer; \">' + entrydata + '</td>';
                    if(pageSectionarr.contains(dpBckGrndList[i].codeName)) {
                        datapointTableHtml += '<td id="page"  style=\"cursor: pointer; width: 100px; text-align:left;  \"></td>';
                        datapointTableHtml += '<td id="section"  style=\"cursor: pointer; width: 100px; text-align:left;  \"></td>';
                    } else {
                        datapointTableHtml += '<td id="page" onclick= \"leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer; width: 100px; text-align:left;  \">' + page + '</td>';
                        datapointTableHtml += '<td id="section" onclick= \"leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer; width: 100px; text-align:left;  \">' + section + '</td>';
                    }
                    datapointTableHtml += '<td onclick="" style=\"cursor: pointer; text-align:right; width: 100px;  \">' + isCompletedImage + '</td>';
                    datapointTableHtml += '</tr>';
                    rowIndex += 1;
                    if(dpBckGrndList.length - 1 == i) {
                        datapointTableHtml += '<tr id="datapointqa1row' + rowIndex + '" class=\"odd\"';
                        datapointTableHtml += '>';
                        datapointTableHtml += '<td id="datapointqa1col' + dpEntryId + '\"  style=\"cursor: pointer;width: 100px; \">Number of Pages</td>';
                        datapointTableHtml += '<td id="suspendNote"  style=\"cursor: pointer;padding : 0 6px 0 0\"></td>';
                        datapointTableHtml += '<td id="datapointqa1col' + dpEntryId + '\"  style=\"cursor: pointer;padding : 0 6px 0 0 \"></td>';
                        datapointTableHtml += '<td id="entryData" style=\"cursor: pointer; \" class=\"td-text\";>' + dpBckGrndList[i].totalPages + '</td>';
                        datapointTableHtml += '<td id="page"  style=\"cursor: pointer; width: 100px; text-align:right;  \"></td>';
                        datapointTableHtml += '<td id="section" style=\"cursor: pointer; width: 100px; text-align:right;  \"></td>';
                        datapointTableHtml += '<td onclick="" style=\"cursor: pointer; text-align:right; width: 100px;  \"></td>';
                        datapointTableHtml += '</tr>';
                        rowIndex += 1;
                    }
                }
            }
        }
        return datapointTableHtml;
    }
    
    
    // To display categorized data in report style format
    this.displayDataPointForStep2Qa = function(datapointTableHtml, filter, objCategorizedList) {
        if(objCategorizedList != null && objCategorizedList.length > 0) {
            var j = 0;
            var k = 0;
            var l = 0;
            for(var i = 0; i < objCategorizedList.length; i++) {
                //get all data fields column to display in report style
                var dateString = objCategorizedList[i].dataDate;
                if(dateString == null) {
                    dateString = "";
                } else {
                    dateString = millisToDateHandler(dateString);
                }
                var entry = objCategorizedList[i].allDataFieldsValue;
                var page = objCategorizedList[i].finalPageNumber;
                var section = objCategorizedList[i].sectionRange;
                var dpEntryId = objCategorizedList[i].entryId;
                var isCompleted = objCategorizedList[i].isCompleted;
                var suspendNoteText = objCategorizedList[i].suspendnote;
                var QCAIStatus=objCategorizedList[i].qcaiCodesView;
                var pageId = objCategorizedList[i].pageId;
                var seqNo=objCategorizedList[i].sequence;
                var isCritical=objCategorizedList[i].isCritical;
                var codeScale=objCategorizedList[i].codeScale;
                var legends=objCategorizedList[i].legends;
                var qcaicodeStatus=null;
                
                if(QCAIStatus.length!=0 )
                {
                    qcaicodeStatus=QCAIStatus[0].returnStatus;
                }
                //To create QCAI Icons w.r.t QCAI Status
                if(QCAIStatus.length!=0  && QCAIStatus[0].returnStatus == "Code Agreed")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/green_QA.png\" /></span>';
                else if(QCAIStatus.length!=0  && QCAIStatus[0].returnStatus == "Code Suggested")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/yellow_QA.png\" /></span>';
                else if(QCAIStatus.length!=0  && QCAIStatus[0].returnStatus == "Alert")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else if(QCAIStatus.length!=0  && QCAIStatus[0].returnStatus == "No Code Found")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else
                    QCAIStatusImage = '';
                
                // To update CompletedDPListData
                if(isCompleted == "Y")
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" checked value=\"' + isCompleted + '\" />';
                else
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" value=\"' + isCompleted + '\" />';
                /*IWO-19Build Step2-QA Report-Style for the "Categorized Listing" Portion of the report
                 * Remove Suspend note functionality
                 */
                var suspendNoteImage = "";
                        
                if(qsStageId == 50) {
                    isCritical="N";//no need to show is critical functionality in Step 2QA-View
                    codeScale=0;//no need to show is critical functionality in Step 2QA-View
                  if(suspendNoteText == null)
                    suspendNoteText = "";
                  if(suspendNoteText != "")
                      suspendNoteImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/SuspendNote-Entered.png\" /></span>';
                  else
                    suspendNoteImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/SuspendNote-Empty.png\" /></span>';
                }

                // To create table data for all data fields like date,all data fields 1-8,page and section ,every DpEntry's
                var qcaiSuggestedTable=null;
                var qcModifiedTable=null;
                // if stage is QC1 then it will check QCAI suggestion for DpEntrys and create inner table to show QCAI suggestions code with icons 
                if(QCAIStatus.length!=0  && (qsStageId == 7 || qsStageId == 50)) {
                    var qcaiSuggestedTable = '<table border=0px; style=\"cursor: pointer; margin:0!important;\" >';
                    qcaiSuggestedTable += '<tr><td style=\"cursor: pointer; font-size:13px; \" >' + entry + '</td></tr>';
                    qcaiSuggestedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:13px;\" >';
                    if(QCAIStatus[0].returnStatus == "Code Agreed") {
                    	qcaiSuggestedTable+='<td>Verification not required</td>';
              		  if(QCAIStatus[0].returnValue!=null){
              		      var name="";
              		      for(var count=0;count<QCAIStatus.length;count++){
              		          if(count==0)
              		          name=QCAIStatus[count].returnValue;
              		          else 
              		          name+="_"+QCAIStatus[count].returnValue;
              		      }
		            		  this.getHierarchyObjectByCode(name,objCategorizedList[i].hierarchyrevision,caseId);
		            		  
              		  } 
                    } else if(QCAIStatus[0].returnStatus == "No Code Found") {
                    	if(QCAIStatus[0].returnValue!=null){
              		      var name="";
		            		 for(var count=0;count<QCAIStatus.length;count++){
		            		      if(count==0)
                                name=QCAIStatus[count].returnValue;
                                else 
                                name+="_"+QCAIStatus[count].returnValue;
                            }
                            this.getHierarchyObjectByCode(name,objCategorizedList[i].hierarchyrevision,caseId);
                            
		            		  if(this.codeObj!=null){
		            			  qcaiSuggestedTable+='<td>Verification required</td>';
		            		  } else
		            			  qcaiSuggestedTable+='<td>'+QCAIStatus[0].returnValue+'</td>';
              		  }else{
          			  qcaiSuggestedTable+='<td>Verification required</td>';
          			  this.codeObj=null;
              		  }
                    } else if(QCAIStatus[0].returnStatus == "Alert") {
                        qcaiSuggestedTable += '<td>' + QCAIStatus[0].returnValue + '</td>';
                        this.codeObj = null;
                    } else {
                    	 if(QCAIStatus.length!=0 && QCAIStatus[0].returnValue!=null){
               		      var name="";
		            		 for(var count=0;count<QCAIStatus.length;count++){
		            		      if(count==0)
                                 name=QCAIStatus[count].returnValue;
                                 else 
                                 name+="_"+QCAIStatus[count].returnValue;
                             }
                             this.getHierarchyObjectByCode(name,objCategorizedList[i].hierarchyrevision,caseId);
                             
		            		  if(this.codeObj!=null){
		            				  qcaiSuggestedTable+='<td>Verification suggested</td>';
		            		  } else
		            			  qcaiSuggestedTable+='<td>'+QCAIStatus[0].returnValue+'</td>';
               		  }
                    }
                    qcaiSuggestedTable += '</tr>';
                    qcaiSuggestedTable += '</table>';
                } else { 
                    // if stage QC2 then check for modified and original value for DpEntry's which were change in QC1 stage by QC operator 
                    if(objCategorizedList[i].auditLogView != null && objCategorizedList[i].auditLogView.length != 0 && qsStageId == 48) {
                        var qcModifiedTable = '<table border=0px; style=\"cursor: pointer; margin:0!important;\">';
                        qcModifiedTable += '<tr ><td style=\"cursor: pointer; font-size:13px;\">' + entry + '</td></tr>';
                        qcModifiedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:13px;\" >';
                        qcModifiedTable += '  <td style=\"font-size: 14px; font-weight: bold; border-bottom-style: solid; border-bottom-width: thin; \">DP Entry:</td>';
                        qcModifiedTable += '  <td style=\"cursor: pointer; padding:  0 0 0 10px; font-size: 14px; font-weight: bold; border-bottom-style: solid; border-bottom-width: thin; \">QC Modification</td> </tr> ';
                        for(var index = 0; index < objCategorizedList[i].auditLogView.length; index++) {
                            qcModifiedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:13px;\" >';
                            objectTypeArray = objCategorizedList[i].auditLogView[index].objectType.split('.');                              
                            if(objCategorizedList[i].auditLogView[index].originalValue != null){
                            	//for changing pageID to finalpagenumber
                            	if(objectTypeArray[1].toLowerCase() == 'pageid'){
                            		for(var pageIndex =0; pageIndex < objCase.pages.length ; pageIndex++){
                            			if(objCategorizedList[i].auditLogView[index].originalValue.trim() == objCase.pages[pageIndex].id){
                            				var finalPageNumber = objCase.pages[pageIndex].finalPageNumber;
                            				qcModifiedTable += '<td>' + finalPageNumber + '</td>';
                            				break;
                            			}
                            		}
                            	}                                 
                            	else if(objectTypeArray[1].toLowerCase() == 'datadate')
                                  qcModifiedTable += '<td>' + millisToDateHandler(objCategorizedList[i].auditLogView[index].originalValue.trim()) + '</td>';
                                else  
                                  qcModifiedTable += '<td>' + objCategorizedList[i].auditLogView[index].originalValue.trim() + '</td>';
                            }
                            else
                                qcModifiedTable += '<td>(blank)</td>';
                            if(objCategorizedList[i].auditLogView[index].modifiedValue != null){
                            	
                            	//for changing pageID to finalpagenumber
                            	if(objectTypeArray[1].toLowerCase() == 'pageid'){
                            		for(var pageIndex =0; pageIndex < objCase.pages.length ; pageIndex++){
                            			if(objCategorizedList[i].auditLogView[index].modifiedValue.trim() == objCase.pages[pageIndex].id){
                            				var finalPageNumber = objCase.pages[pageIndex].finalPageNumber;
                            				qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px;  \">' + finalPageNumber + '</td>';
                            				break;
                            			}
                            		}
                            	}                         	
                            	else if(objectTypeArray[1].toLowerCase() == 'datadate')
                                  qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px;  \">' + millisToDateHandler(objCategorizedList[i].auditLogView[index].modifiedValue.trim() ) + '</td>';
                                else  
                                  qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px;  \">' + objCategorizedList[i].auditLogView[index].modifiedValue.trim()  + '</td>';
                            }
                            else
                                qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px; \">(blank)</td>';
                            qcModifiedTable += '</tr>';
                        }
                        if(objCategorizedList[i].hidPrevious != 0) {
                            var codeObj = getMedicalCodeObject(objCategorizedList[i].hidPrevious);
                            qcModifiedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:13px;\" >';
                            qcModifiedTable += '<td>Code:' + codeObj.name + '</td>'; 
                            qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px;  \">Code:' + objCategorizedList[i].codeName + '</td>';
                            qcModifiedTable += '</tr>';
                        }
                        qcModifiedTable += '</table>';
                    } else //set null to  codeObj
                    	  this.codeObj=null;
                }
                //set all fields value for every DP entry 
                var tabledata='<td id="datapointqa1col' + dpEntryId + '\" width=30 style=\"cursor: pointer; text-align: left; \" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');" >' + seqNo + '</td>';
                tabledata += '<td id="datapointqa1col' + dpEntryId + '\" style=\"cursor: pointer; text-align: center;\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');" >' + dateString + '</td>';
                if(qsStageId == 50)
                	tabledata += '<td id="suspendNote" onclick= \"openQAReviewPopup('+ rowIndex + ',\'' + suspendNoteText + '\',' + objCategorizedList[i].entryId + '); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\'); \"style=\"cursor: pointer;padding : 0 6px 0 0\" >' + suspendNoteImage + '</td>';
                else
                	tabledata += '<td id="suspendNote" onclick= \"qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\'); \"style=\"cursor: pointer;padding : 0 6px 0 0\" >' + suspendNoteImage + '</td>';
                
                tabledata+='<td  id="datapointqa1col' + rowIndex + '\" onclick= \" qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\'); \" style=\"cursor: pointer; vertical-align: bottom!important;\" >'+ QCAIStatusImage+'</td>';
                if(qcaiSuggestedTable!=null && (qsStageId==7 || qsStageId==50)){
                	tabledata+='<td id="datapointqa1col' + rowIndex + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');">'+qcaiSuggestedTable+'</td>';
          	    }else if(qcModifiedTable!=null && qsStageId==48){
          	    	tabledata+='<td id="datapointqa1entrycol' + rowIndex + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\');">'+qcModifiedTable+'</td>';
          		}else {
          			tabledata+='<td  id="datapointqa1col' + rowIndex + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');"style=\"cursor: pointer;\">'+entry+'</td>';
          		}
                //To create page and section link in report style.
                tabledata += '<td onclick= \"qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer; text-align: center;\">' + page + '</td>';
                tabledata += '<td onclick= \"qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objCategorizedList[i])).replace(/'/g, "\\'") + '\',\''+rowIndex+'\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'") + '\'); leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer; text-align: center;\">' + section + '</td>';
                tabledata += '<td  style=\"cursor: pointer; text-align: center; color:red;\">' + legends + '</td>';
                tabledata += '<td style=\"cursor: pointer; text-align: center;\">' + isCompletedImage + '</td>';
                // To Show DPEntry's in Report Style     
                if(filter == '' || filter == null || (filter == "InComplete Only" && isCompleted == "N") || (filter == "Completes Only" && isCompleted == "Y") || (filter == "QCAI Suggestions Only" && qcaicodeStatus == "Code Suggested") || (filter == " QCAI Alerts Only" && qcaicodeStatus == "Alert") || (filter == "QCAI Issues Only" && qcaicodeStatus == "No Code Found")) {
                    //Check i and i+1 category is equal or not
                    if(i > objCategorizedList[i].length - 1 && objCategorizedList[i].category == objCategorizedList[i + 1].category) {
                        if(j == 0)
                            datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; text-align: center;\" ><td  style=\"cursor: pointer; text-align: center;\" class="table-h1" colspan="9">' + objCategorizedList[i].category + '</td></tr>';
                            //Check i and i+1 SubCategory is equal or not
                        if(objCategorizedList[i].subcategory == objCategorizedList[i + 1].subcategory) {
                            if(k == 0)
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer;width: 500px; \" class="table-h2" colspan="5" > ' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                                //Check i and i+1 CodeName is equal or not
                            if(objCategorizedList[i].codeName == objCategorizedList[i + 1].codeName) {
                                if(l == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                    //set table data <td> in table row.
                                datapointTableHtml += '<tr id="datapointqa1row' + rowIndex + '"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                                l++;
                            } else {
                                l = 0;
                                //Check i and i-1 CodeName is equal or not
                                if(i > 0 && objCategorizedList[i - 1].codeName != objCategorizedList[i].codeName) {
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                if(i == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            }
                            k++;
                        } else {
                            k = 0;
                            //Check i and i-1 SubCategory is equal or not
                            if(i > 0 && objCategorizedList[i - 1].subcategory != objCategorizedList[i].subcategory) {
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; width: 500px;\" class="table-h2" colspan="5">' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                            }
                            if(i == 0) {
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; width: 500px;\" class="table-h2" colspan="5">' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                            }
                            //Check i and i+1 CodeName is equal or not
                            if(objCategorizedList[i].codeName == objCategorizedList[i + 1].codeName) {
                                if(l == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                l++;
                                datapointTableHtml += '<tr id="datapointqa1row' + rowIndex + '"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            } else {
                                l = 0;
                                if(i > 0 && objCategorizedList[i - 1].codeName != objCategorizedList[i].codeName) {
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                if(i == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            }
                        }
                        j++;
                    } else {
                        j = 0;
                        //Check i and i-1 category is equal or not
                        if(i > 0 && objCategorizedList[i].category != objCategorizedList[i - 1].category) {
                            datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; text-align: center;\" class="table-h1" colspan="9">' + objCategorizedList[i].category + '</td></tr>';
                        }
                        if(i == 0) {
                            datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; text-align: center;\" class="table-h1" colspan="9">' + objCategorizedList[i].category + '</td></tr>';
                        }
                        //Check i and i+1 SubCategory is equal or not
                        if(i > objCategorizedList[i].length - 1 && objCategorizedList[i].subcategory == objCategorizedList[i + 1].subcategory) {
                            if(k == 0)
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; width: 500px;\" class="table-h2"  colspan="5">' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                            if(code == objCategorizedList[i + 1].codeName) {
                                if(l == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                l++;
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            } else {
                                l = 0;
                                if(i > 0 && objCategorizedList[i - 1].codeName != objCategorizedList[i].codeName) {
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                if(i == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            }
                            k++;
                        } else {
                            k = 0;
                            //Check i and i-1 SubCategory is equal or not
                            if(i > 0 && objCategorizedList[i - 1].subcategory != objCategorizedList[i].subcategory) {
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; width: 500px;\" class="table-h2"  colspan="5">' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                            }
                            if(i == 0) {
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" ><td style=\"cursor: pointer; width: 500px;\" class="table-h2"  colspan="5">' + objCategorizedList[i].subcategory + '</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2" style=\"width:15px;\"></td><td class="table-h2">Complete</td></tr>';
                            }
                            if(i > objCategorizedList[i].length - 1 && objCategorizedList[i].codeName == objCategorizedList[i + 1].codeName) {
                                if(l == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                l++;
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            } else {
                                l = 0;
                                if(i > 0 && objCategorizedList[i - 1].codeName != objCategorizedList[i].codeName) {
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                if(i == 0){
                                    datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="9">';
                                    if(codeScale==3)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="critical-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else if(codeScale==2)
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'" class="major-color">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    else 
                                    datapointTableHtml +='<span id="medicalCodeDesc'+dpEntryId+'">  ' + objCategorizedList[i].codeDesc.replace(/'/g, "\'")+'</span>';
                                    datapointTableHtml +='<span id="medicalCodeName'+dpEntryId+'" style=\"!important;\"> [' + objCategorizedList[i].codeName + ']</span></td></tr>';
                                }
                                datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                                rowIndex += 1;
                            }
                        }
                    }
                }
            }
        }
        return datapointTableHtml;
    }
    /**
     * THIS FUNCTION IS OBSOLETE!!!
     *filter ,ObjDpList
     * displayCriticalConditionView
     * return htmlTable;
     */
    this.displayCriticalConditionView = function(datapointTableHtml, filter, objDpList) {
        if(objDpList != null && objDpList.length > 0) {
            var j = 0;
            var flagCount = 0;
            for(var i = 0; i < objDpList.length; i++) {
                var dateString = objDpList[i].dataDate;
                if(dateString == null) {
                    dateString = "";
                } else {
                    dateString = millisToDateHandler(dateString);
                }
                var entry = objDpList[i].allDataFieldsValue;
                var page = objDpList[i].finalPageNumber;
                var section = objDpList[i].sectionRange;
                var dpEntryId = objDpList[i].entryId;
                var isCompleted = objDpList[i].isCompleted;
                var suspendNote = objDpList[i].suspendnote;
                var isCritical = objDpList[i].isCritical;
                var QCAIStatus = objDpList[i].returnStatus;
                var pageId = objDpList[i].pageId;
                var seqNo=objDpList[i].sequence;

                if(QCAIStatus != null && QCAIStatus == "Code Agreed")
                    QCAIStatusImage = '<span onClick="" style=\" \"><img  style=\'margin-top:3px\' id="" src="images/green_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "Code Suggested")
                    QCAIStatusImage = '<span onClick="" style=\" \"><img  style=\'margin-top:3px\' id="" src="images/yellow_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "No ICD Code found")
                    QCAIStatusImage = '<span onClick="" style=\"\"><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "Alert")
                    QCAIStatusImage = '<span onClick="" style=\" \" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else if(QCAIStatus != null && QCAIStatus == "No Code Found")
                    QCAIStatusImage = '<span onClick="" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';
                else
                    QCAIStatusImage = '<span onClick=""  style=\" \" ><img  style=\'margin-top:3px\' id="" src="images/red_QA.png\" /></span>';

                if(isCompleted == "Y")
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" checked value=\"' + isCompleted + '\" />';
                else
                    isCompletedImage = '<input id=\"complete_check_' + dpEntryId + '\" type=\"checkbox\" name=\"compcheckreportview\" onClick=\"updateIsCompletedDPListData(\'' + dpEntryId + '\');\" value=\"' + isCompleted + '\" />';
                /*IWO-19Build Step2-QA Report-Style for the "Categorized Listing" Portion of the report
                 * Remove Suspend note functionality
                 */
                var suspendNoteImage = "";
                if(qsStageId == 50) {
                 if(suspendNote!=null)
                 suspendNoteImage='<span onClick="" style=\"<span onclick="" style=\"\" ><img  style=\'margin-top:3px\' id="" src="images/SuspendNote-Entered.png\" /></span>';
                 else
                 suspendNoteImage='<span onClick="" style=\" \" ><img  style=\'margin-top:3px\' id="" src="images/SuspendNote-Empty.png\" /></span>';
                } 
                // To create table data for all data fields like date,all data fields 1-8,page and section ,every DpEntry's
                var tabledata='<td id="datapointqa1col' + dpEntryId + '\" style=\"cursor: pointer; text-align: center;\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');">' +seqNo+ '</td>'; 
                tabledata  += '<td id="datapointqa1col' + dpEntryId + '\" style=\"cursor: pointer; text-align: center;\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');">' + dateString + '</td>';
                tabledata += '<td>' + suspendNoteImage + '</td>';
                tabledata += '<td  id="datapointqa1col' + dpEntryId + '\" onclick= \" qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \" style=\"cursor: pointer; vertical-align: bottom!important;\">' + QCAIStatusImage + '</td>';
                var arr = ["Code Suggested", "No ICD Code found", "Alert", "No Code Found"];
                if(QCAIStatus != null && arr.contains(QCAIStatus) && qsStageId == 7 || qsStageId == 50) {
                    var QCAIReturnVal = objDpList[i].returnValue;
                    var qcaiSuggestedTable = '<table border=0px; style=\"cursor: pointer; margin:0!important;\">';
                    qcaiSuggestedTable += '<tr ><td style=\"cursor: pointer; font-style:italic; font-size:14px;\">' + entry + '</td></tr>';
                    if(QCAIReturnVal != null) {
                        this.getHierarchyObjectByCode(QCAIReturnVal, objDpList[i].hierarchyrevision,caseId);
                        qcaiSuggestedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:14px;\" >';
                        if(this.codeObj != null) {
                            for(var index = 0; index < this.codeObj.length; index++)
                                qcaiSuggestedTable += '<td>' + QCAIReturnVal + '-' + this.codeObj[index].description + '</td>';
                        } else
                            qcaiSuggestedTable += '<td>' + QCAIReturnVal + '</td>';
                        qcaiSuggestedTable += '</tr>';
                    }
                    qcaiSuggestedTable += '</table>';
                    tabledata += '<td id="datapointqa1col' + dpEntryId + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');">' + qcaiSuggestedTable + '</td>';
                } else {
                    if(objDpList[i].auditLogView != null && objDpList[i].auditLogView.length != 0 && qsStageId == 48) {
                        var qcModifiedTable = '<table border=0px; style=\"cursor: pointer; margin:0!important;\">';
                        qcModifiedTable += '<tr ><td style=\"cursor: pointer; font-style:italic; font-size:14px;\">' + entry + '</td></tr>';
                        for(var index = 0; index < objDpList[i].auditLogView.length; index++) {
                            qcModifiedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:14px;\" >';
                            if(objDpList[i].auditLogView[index].originalValue != null)
                                qcModifiedTable += '<td>Original Value:' + objDpList[i].auditLogView[index].originalValue + '</td>';
                            else
                                qcModifiedTable += '<td>Original Value:(blank)</td>';
                            if(objDpList[i].auditLogView[index].modifiedValue != null)
                                qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px; \">Modified Value:' + objDpList[i].auditLogView[index].modifiedValue + '</td>';
                            else
                                qcModifiedTable += '<td style=\"cursor: pointer; padding:  0 0 0 10px; \">Modified Value:(blank)</td>';
                            qcModifiedTable += '</tr>';
                        }
                        // if medical code get modified/changed
                        if(objDpList[i].hidPrevious != 0) {
                            var codeObj = getMedicalCodeObject(objDpList[i].hidPrevious);
                            qcModifiedTable += '<tr style=\"cursor: pointer; text-align: left; background-color: yellow; font-size:14px;\" >';
                            qcModifiedTable += '<td>Original Code:' + objCategorizedList[i].codeName + '</td>';
                            qcModifiedTable += '<td>Modified Code:' + codeObj.name + '</td>';
                            qcModifiedTable += '</tr>';
                        }
                        qcModifiedTable += '</table>';
                        tabledata += '<td id="datapointqa1col' + dpEntryId + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');">' + qcModifiedTable + '</td>';
                    } else
                        tabledata += '<td  id="datapointqa1col' + dpEntryId + '\" onclick="qa1DpSliderWindow(\'' + encodeURIComponent(JSON.stringify(objDpList[i])).replace(/'/g, "\\'\\'") + '\',\'' + rowIndex + '\',\'' + encodeURIComponent(JSON.stringify(this.codeObj)).replace(/'/g, "\\'\\'") + '\');leftThumnailClickHandler(\''+pageId+'\',\''+section+'\');"style=\"cursor: pointer; font-style:italic\">' + entry + '</td>';
                }

                tabledata += '<td onclick= \"leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \"style=\"cursor: pointer; text-align: left;\">' + page + '</td>';
                tabledata += '<td onclick= \"leftThumnailClickHandler(\'' + pageId + '\',\'' + section + '\'); \"style=\"cursor: pointer; text-align: left;\">' + section + '</td>';
                tabledata += '<td style=\"cursor: pointer; text-align: right;\">' + isCompletedImage + '</td>';
                // To show only Critical Conditions Dp Entry's  
                if(isCritical == 'Y') {
                    if(filter == '' || filter == null || (filter == "InComplete Only" && isCompleted == "N") || (filter == "Completes Only" && isCompleted == "Y") || (filter == "QCAI Suggestions Only" && QCAIStatus == "Code Suggested") || (filter == " QCAI Alerts Only" && QCAIStatus == "Alert") || (filter == "QCAI Issues Only" && (QCAIStatus == "No ICD Code found" || QCAIStatus == "No Code Found"))) {
                        if(flagCount == 0)
                            datapointTableHtml += '<tr  class="table-h1"><td colspan="4" id="category" onclick="" style=\"cursor: pointer; text-align: center;\">Critical condition</td><td class="table-h2">Page</td><td class="table-h2">Line</td><td class="table-h2">Complete</td></tr>';
                        flagCount++;
                        if(i > objDpList[i].length - 1 && objDpList[i].codeName != objDpList[i + 1].codeName) {
                            if(j == 0)
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="5" >' + objDpList[i].codeDesc.replace(/'/g, "\\'") + ' [' + objDpList[i].codeName + ']</td><td></td><td></td><td></td></tr>';
                            datapointTableHtml += '<tr id="datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                            rowIndex += 1;
                            j++;
                        } else {
                            j = 0;
                            if(i > 0 && objDpList[i - 1].codeName != objDpList[i].codeName) {
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;\"  colspan="5" >' + objDpList[i].codeDesc.replace(/'/g, "\\'") + ' [' + objDpList[i].codeName + ']</td><td></td><td></td><td></td></tr>';
                            }
                            if(i == 0)
                                datapointTableHtml += '<tr onclick="" style=\"cursor: pointer; \" class="table-h3"><td style=\"cursor: pointer; padding: 0px 0px 0px 28px;;\"  colspan="5" >' + objDpList[i].codeDesc.replace(/'/g, "\\'") + ' [' + objDpList[i].codeName + ']</td><td></td><td></td><td></td></tr>';
                            datapointTableHtml += '<tr id=\"datapointqa1row' + rowIndex + '\"  style=\"cursor: pointer; \" class= "td-text">' + tabledata + '</tr>';
                            rowIndex += 1;
                        }
                    }
                }
            }
        }
        return datapointTableHtml;
    }

   /* Array.prototype.contains = function(element) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] == element) {
                return true;
            }
        }
        return false;
    }*/
    
    this.getHierarchyObjectByCode = function(code, revision,caseId) {
        var selCodeObj = null;
        $.ajax({
            type : "POST",
            url : "medicalhiearchy/medicalCode/medicalCodeName/" + code + "/" + revision.replace(".", "*")+"/"+caseId,
            async : false,
            success : function(medicalCodaData) {
                selCodeObj = medicalCodaData;
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
                displayErrorDialog(dateTime, userName, sessionId, caseId, "getDataPointForm()", errorThrown, false);
            }
        });
        this.codeObj = selCodeObj;
    }
}

function qcaiSuggestReplaceCode(qcaiSuggestCode, orgCode, currDpRowCount, codeId, sectionRange, pageNo, pageId, currDpentryId, revision, currentDPDate, legendDataField, CurrentUpdatedObject) {
    var selectedCode;
    //to check for Testing purpose
    var updatedObj=getUpdatedDataFieldObj(CurrentUpdatedObject);
    //encode object using JSon
     updatedObj=encodeURIComponent(JSON.stringify(updatedObj)).replace(/'/g, "\\'\\'");
    //set hierarchyPopupCodeSelected true global variable defined in Step2.jsp
     hierarchyPopupCodeSelected=true;
     // To Check/see Previous code icd10obj
    $.ajax({
        type : "POST",
        url : "medicalhiearchy/medicalCode/medicalCodeName/" + qcaiSuggestCode + "/" + revision.replace(".", "*")+"/"+caseId,
        async : false,
        success : function(medicalCodaData) {
            selectedCode = medicalCodaData;
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "getDataPointForm()", errorThrown, false);
        }
    });
    var codeName = selectedCode[0].name;
    var codeDesc = selectedCode[0].description;
    var masterId = selectedCode[0].id;
    var isrejected = true;
    var qcaiReplaceFlagg = true;
    var changedLegendValue;
    if($('#iws2_dp_legend1Lovs_' + currDpentryId + ' :selected').text().trim() !=""){
    changedLegendValue = $('#iws2_dp_legend1Lovs_' + currDpentryId + ' :selected').text().trim();
       if(legendDataField !=null && changedLegendValue!=legendDataField){
    	   legendDataField = changedLegendValue;
       }
    }
    var currow = $('#datapointqa1row' + currDpRowCount);
    $('#dpform_detailsQA1_' + codeId).remove();
    $('#codeTableQA1_' + codeId).remove();
    $('#dpformQA1td_' + codeId).remove();
    //window.opener.$('#codeTableQA1_'+currOpenDpRowMasterId).css('display','none');
    currow.after("<td id=\"dpformQA1td_" + codeId + "\" colspan=\"6\"><table  class id=\"codeTableQA1_" + codeId + "\">" + "<tbody style=\"width : 500px; display : block;\">" + "<tr>" + "<td class=\"dpform_detailsQA1\" id=\"dpform_detailsQA1_" + codeId + "\">");
    $('.dpform_detailsQA1').html(getDataPointForm(null, codeName, codeDesc, masterId, masterId, masterId, pageNo, currDpentryId, '', '', pageId, sectionRange, isrejected, currDpRowCount, selectedCode[0], codeId, qcaiReplaceFlagg, currentDPDate, legendDataField, updatedObj));
    enabledSaveCancelDPButton(currDpentryId);
    $('#iws2_dp_datepicker_' + currDpentryId + '_' + codeName.replace(/\./g, '-')).click();
}

/*
 Function: qa1DpSliderWindow(dpList,counter)
 its working for opening the DP Slider Window

 Parameters:
 - dpList - datapointEntryList
 - counter - counting number
 Page Actions:
 - Step 2 QA - used for QCAI
 */
var dpqc1masterId;
var dpqc1DpEntryId;
function qa1DpSliderWindow(objDPList, i, objCodeList) {
    var dpListObj = JSON.parse(decodeURIComponent(objDPList));
    var codeListobj=null;
    if(objCodeList != null)
     codeListobj = JSON.parse(decodeURIComponent(objCodeList));
    var page = dpListObj.finalPageNumber;
    var section = dpListObj.sectionRange;
    var isCompleted = dpListObj.isCompleted;
    var suspendNote = dpListObj.suspendnote;
    var dpEntryId = dpListObj.entryId;
    var codeName = dpListObj.codeName;
    var codeDesc = dpListObj.codeDesc;
    var codeId = dpListObj.codeId;
    var codeType = dpListObj.codetype;
    var isrejected = dpListObj.isRejected;
    var rejectReason = dpListObj.rejectReason;
    clientDateFormat = objCase._client.defaultDateFormat;
    if(dpqc1DpEntryId != null) {
        if(dpqc1masterId != null || (dpqc1DpEntryId != dpEntryId)) {
            //$('#codeTableQA1_'+dpqc1masterId).html('');
            // $('#codeTableQA1_'+dpqc1masterId).closest("tr").remove();
            $('#dpform_detailsQA1_' + dpqc1masterId).remove();
            $('#codeTableQA1_' + dpqc1masterId).remove();
            $('#dpformQA1td_' + dpqc1masterId).remove();
            // $('#codeTableQA1_'+dpqc1masterId).css('display','none');

        }
    }
    var currow = $('#datapointqa1row' + i);
    if($('#codeTableQA1_' + codeId).text() == '') {
        currow.after("<td id=\"dpformQA1td_" + codeId + "\" colspan=\"7\" width=\"100%\"><table  class id=\"codeTableQA1_" + codeId + "\" >" + "<tbody style=\"width : 500px; display : block;\">" + "<tr>" + "<td class=\"dpform_detailsQA1\" id=\"dpform_detailsQA1_" + codeId + "\">");
        $('.dpform_detailsQA1').html(getDataPointForm(dpListObj, codeName, codeDesc, codeId, codeType, codeId, i, dpEntryId, suspendNote, "true", dpEntryId, section, isrejected, codeListobj));
    } else {
        $('#codeTableQA1_' + codeId).html('');
        $('#codeTableQA1_' + codeId).css('display', 'none');
    }
    dpqc1masterId = codeId;
    dpqc1DpEntryId = dpEntryId;
}

