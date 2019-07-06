var isDPEntryRowClicked = false;
var selectedPageNumber ;
var selectedSectionNumber ;
var searchObjDPInfo;
var categories;
var subCategories;
var medicalCodes; 
var dataPointEntries;
var dpEntriesFormCount;
var savedDpEntryId;
var lastDpEntryId = null;
var emptyDpEntryId = false;
var lastSelSubcategory = null;
var lastSelCategoryDivId = null;
var fulldplistrowdata = null;
var IWS2SCREENS_DPENTRY = "dpentry";
var IWS2SCREENS_DPFULLLIST = "dplist";
var IWS2SCREENS_FULLDPLIST_PAGEVIEW = "Page View";   //view for both Step2-OP and Step2-QC1
var IWS2SCREENS_FULLDPLIST_REPORTVIEW = "Report View";    //view for Step2-QC1
var IWS2SCREENS_FULLDPLIST_CATEGORYVIEW = "Category View";  //view for Step2-OP
var pageId;
var displaySearchCriteria =false;
var dpSearchCriteria =false;
var fullDPSearchCriteria=false;
var displaySearch =false;
var searchTerm =null;
var searchCriteria =null;
var searchRowNumber;
var searchRow;
var searchCode;
var searchCategory;
var searchSubcategory;
var rejectReason = null;
var lastSelMedicalCodeName = null;
var previousPageId = null;
var currentPageId = null;
//a map object to hold LOV values
var lovValues = {};
var gridselectorbegendobj = null;
var isloaddpform = true;
var objselectedpagerow = null;
var dpformaction = null;
var dpListView = false;
	

function getImageBorderRule(pageId)
{
	// Get the page Json Id
	for (var i = 0; i < objCase.pages.length; i++) {
		if (objCase.pages[i].id == pageId) {
			pageJsonId = i;
		} 
	}
	// Retrieve the active page object.
	var page = objCase.pages[pageJsonId];
	var tstyle = "";
	var docnum = page.subDocumentOrder;
	var pagenum = page.subDocumentPageNumber;

	var tstyle = "";
	if(docnum>=9999)
	{
		tstyle += 'opacity: .75; ';
		tstyle += 'filter: alpha(opacity=75);';
	} else 	if (page.suspendNote != null & page.suspendNote != '') {	
		tstyle += 'opacity: .75; ';
		tstyle += 'filter: alpha(opacity=75);';
	} 
	tstyle += ';';
	
	return tstyle;
}


/** Function setJqueryDate(prfx,id)
 * Dynamically set the jqeury date for the datapoints 
 * 
 * @param prfx - The prefix for the datapoint tag name
 * @param id - The datapoinit id
 */
/*
function setJqueryDate(prfx,id)
{
	dateselector = "#" + prfx + id; 
	if (clientDateFormat == 'mm/dd/yy' || clientDateFormat == 'mm/dd/yyyy') {
		$(dateselector).datepicker({showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'mm/dd/yy' });
	} else {
		$(dateselector).datepicker({showOn: "button",buttonImage: "images/calendar.gif",buttonImageOnly: true, dateFormat: 'dd/mm/yy' });
	}
}

*/

/** 
 * Validate if current selected DP Page or Section row has changed 
 * 
 * @param rowNumber - The section that was clicked 
 * @return - return true if changed, else false
 *
function hasPageRowChanged(rowNumber)
{
	var loadscreen = false;
	if(objselectedpagerow==null)
	{
		objselectedpagerow = new  ObjSelectedPageRow(objActivePage.id,rowNumber);
		loadscreen = true;
	} else
	{
		if(!objselectedpagerow.isSamePageRow(objActivePage.id,rowNumber))
		{
			objselectedpagerow.setPageRow(objActivePage.id,rowNumber);		
			loadscreen = true;
		} 			
	}		
	
	return loadscreen;
}
*/


