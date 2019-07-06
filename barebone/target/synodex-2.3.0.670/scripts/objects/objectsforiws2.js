<!--
/**********************************************************************
 * Javascript Object for IWS  
 **********************************************************************/

/*
 * Object for passing ICD10 SubCategory Screen data  
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  05/07/2102 - 05/08/2102
 */
function ObjICD10SubCategoryScreen()
{
  this.codeVersion = "";
  this.masterId = "";
  this.dpEntryId = "";
  this.selvalue = "";
  this.seldesc = "";
  this.selvalue = "";
  this.seldesc = "";
  this.type = ""; 
  this.rowCount = "";
  this.newRowCount = "";
  this.pageId = "";
  this.pageNumber = "";
  this.sectionNumber = "";
  this.dataDate = "";
  /*
  this.dataFieldLabel1 = "";
    this.dataFieldLabel2 = "";
    this.dataFieldLabel3 = "";
    this.dataFieldLabel4 = "";
    this.dataFieldLabel5 = "";
    this.dataFieldLabel6 = "";
    this.dataFieldLabel7 = "";
    this.dataFieldLabel8 = "";
    this.dataField1Value = "";
    this.dataField2Value = "";
    this.dataField3Value = "";
    this.dataField4Value = "";
    this.dataField5Value = "";
    this.dataField6Value = "";
    this.dataField7Value = "";
    this.dataField8Value = "";
    this.dataFieldLovs1 = "";
    this.dataFieldLovs2 = ""; 
    this.dataFieldLovs3 = "";
    this.dataFieldLovs4 = "";
    this.dataFieldLovs5 = "";
    this.dataFieldLovs6 = ""; 
    this.dataFieldLovs7 = "";
    this.dataFieldLovs8 = "";*/
  
  this.dataFieldLabel = new Array();
  this.dataFieldLabelType = new Array();
  this.dataFieldLovs = new Array();
  this.dataFieldValue = new Array();
  

  this.isText =""; 
  this.secBeg;
  this.secEnd;
  this.revision;
  this.isCritical;
  this.codeScale;
  this.toString = function() {
      var ret = "["
      ret += " codeVersion: " + this.codeVersion + " - ";
      ret += " masterId: " + this.masterId + " - ";
      ret += " dpEntryId: " + this.dpEntryId + " - ";
      ret += " selvalue: " + this.selvalue + " - ";
      ret += " seldesc: " + this.seldesc  + " - ";
      ret += " type: " + this.type  + " - ";
      ret += " rowCount: " + this.rowCount  + " - ";
      ret += " newRowCount: " + this.newRowCount  + " - "; 
      ret += " pageId: " + this.pageId + " - ";
      ret += " pageNumber: " + this.pageNumber  + " - ";
      ret += " sectionNumber: " + this.sectionNumber  + " - ";
      ret += " dataDate: " + this.dataDate  + " - "; 
  /*
      ret += " dataFieldLabel1: " + this.dataFieldLabel1  + " - ";
        ret += " dataFieldLabel2: " + this.dataFieldLabel2 + " - ";
        ret += " dataFieldLabel3: " + this.dataFieldLabel3 + " - ";
        ret += " dataFieldLabel4: " + this.dataFieldLabel4 + " - ";
        ret += " dataFieldLabel1: " + this.dataFieldLabel5  + " - ";
        ret += " dataFieldLabel2: " + this.dataFieldLabel6 + " - ";
        ret += " dataFieldLabel3: " + this.dataFieldLabel7 + " - ";
        ret += " dataFieldLabel4: " + this.dataFieldLabel8 + " - ";
        ret += " dataField1Value: " + this.dataField1Value  + " - ";
        ret += " dataField21Value: " + this.dataField2Value  + " - ";
        ret += " dataField3Value: " + this.dataField3Value  + " - ";
        ret += " dataField1Value: " + this.dataField4Value  + " - ";
        ret += " dataField1Value: " + this.dataField5Value  + " - ";
        ret += " dataField21Value: " + this.dataFiel6Value  + " - ";
        ret += " dataField3Value: " + this.dataField7Value  + " - ";
        ret += " dataField1Value: " + this.dataField8Value  + " - ";
        ret += " dataFieldLovs1: " + this.dataFieldLovs1  + " - ";
        ret += " dataFieldLovs2: " + this.dataFieldLovs2 + " - ";
        ret += " dataFieldLovs3: " + this.dataFieldLovs3 + " - ";
        ret += " dataFieldLovs4: " + this.dataFieldLovs4 + " - ";*/
  
      ret += " isText: " + this.isText + " - ";   
      ret += " secBeg: " + this.secBeg + " - ";
      ret += " secEnd: " + this.secEnd + " - ";
      ret += " isCritical: " + this.isCritical + " - "; 
       ret += " codeScale: " + this.codeScale + " - ";     	  
      return ret + "]"
	 };
}


/*
 * Object for Information/Helper flags  
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  05/23/2102 - 05/23/2102
 */
function ObjFlags()
{
	this.redFlag = null;
	this.yellowFlag = null;
	this.greenFlag = null;
	this.isRedFlag = function() {
		return this.isFlagAvailable(this.redFlag);
	};
	this.isYellowFlag = function() {
		return this.isFlagAvailable(this.yellowFlag);
	};
	this.isGreenFlag = function() {
		return this.isFlagAvailable(this.greenFlag);
	};
	this.toString = function() {
		return "red: " + this.redFlag + ", yellow: " + this.yellowFlag + ", green:"  + this.greenFlag +  
 			   ", red: " + this.isRedFlag() + ", yellow: " + this.isYellowFlag() + ", green: " +	this.isGreenFlag();  
	};
	this.isFlagAvailable = function(data) {
		if( data != null && data.length>0 )
			return true;		
		return false;		
	};
}

/*
 * Object for capturing current selected page and DP row
 *   
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  07/02/2102 - 07/02/2102
 */
function ObjSelectedPageRow(tpage,trow)
{
	this.page=tpage;
	this.row=trow;
	
	this.toString = function() {
		return "page: " + this.page+ ", row: " + this.row;  
	};
	
	
	this.isSamePageRow = function(tmppage, tmprow) {
		if(tmppage==null || tmppage=="null" || tmprow==null || tmprow=="null")
			return false;

		if(this.page==null || this.page=="null" || this.row==null || this.row=="null")
			return false;

		if(this.page!=tmppage || this.row!=tmprow)
			return false;					
		
		return true;
	};

	this.setPageRow = function(tpage, trow) {
		this.page = tpage;
		this.row = trow;
	}
}

/*
 * General timer to get beginning and end time
 */
function ObjTimer()
{
		//Dates return as milliseconds when not specified
	this.begTime = new Date();
	this.endTime;

	this.getStartTime = function() {
		return Date.parse(this.begTime);
	}
	
	this.getEndTime = function() {
		this.endTime = new Date();
		return Date.parse(this.endTime);
	}
	
	this.getElapseMilliSeconds = function() {
		return ( this.getEndTime() - this.getStartTime() ); 
	}
	
		//Date return as seconds
	this.getElapseSeconds = function() {
		return ( this.getEndTime() - this.getStartTime() ) / 1000; 
	}	
}

-->
