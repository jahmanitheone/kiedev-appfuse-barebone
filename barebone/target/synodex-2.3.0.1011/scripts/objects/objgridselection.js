/**
 *  Reusable General utilities for screen manipulation
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */
var codeDPEntryMap; // map to hold the status of each code(whether it contains any DP entries / not)

/**
 * Create a new grid selection object
 * @param maxsel
 * @returns {ObjGridSelection}
 */

function getNewObjGridSelection(maxsel)
{
	var objgridselection = new ObjGridSelection(maxsel);
	objgridselection.initKeys();
	
	return objgridselection;
}

/** 
 * Validate if current selected DP Page or Section row has changed 
 * 
 * @param rowNumber - The section that was clicked 
 * @return - return true if changed, else false
 */
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

/*
 * Create a new grid begin and ending selection from the avalaible selection number
 * 
 * @param selnum - A beg/end seperated by -
 */
function getObjGridSelectionBegEndFrom(selnum)
{
	var gridselectorbegendobj = null;
	if(selnum!=null && selnum != "__")
	{
		if(selnum.indexOf("-")!=-1){
			var secNum = selnum.split("-");
			 if(secNum[1]==null || secNum[1]=='null')
			 selnum = secNum[0];
		}
		var objgridselection = getNewObjGridSelection(snMaxSectionsPerSelection);
		objgridselection.setBegEndSection(selnum);
		gridselectorbegendobj = objgridselection.getObjMultipleSelection();			
	}
	
	return gridselectorbegendobj;
}

function isGridObjectBegEndValid()
{
	if(gridselectorbegendobj!=null && gridselectorbegendobj.isComplete())
		return true;	
	
	return false;
}

/**
 * Handle updating page section on DP Form section changes.
 */
function updatePageSection(gsel)
{
	gridselectorbegendobj = gsel;
	//alert("updatePageSection: " + gridselectorbegendobj);
	fillDPEntryInfo();
	
	if(dpformaction == "new")
	{
	    //Replace the page DP Form Section
	    var newDPEntryId = "null";  	
		var tmpsec = $('#iws2_subc_input_pagesection_'+ newDPEntryId).val();
		//tmpsec = tmpsec.substring(0,tmpsec.indexOf("Sec") + 3) + " " + selectedSectionNumber;
		//IWO-78 : Page number is not changing
		tmpsec = "Page " + selectedPageNumber + " Sec " + selectedSectionNumber;                
		$('#iws2_subc_input_pagesection_'+ newDPEntryId).val(tmpsec);
		//IWO-80:Save and cancel button is not enabled even after changing the page and/or section number
		onClickFocusedHandler(newDPEntryId);
		legendValueChangedHandler(newDPEntryId);
	}
}