/* 
File: griddy_helper.js
Responsible for grid row actions.

Loaded In Steps:
- Step 2 LHS - <step2_popup.jsp> 
- Step 3 Image Link Window - <step3_imageLink.jsp>

*****

Function: handleGridRowMouseOver(rowNumber)
Handles the highlighting of a grid row during a mouseover event.

Parameters:
rowNumber - The number of the selected row.

Page Actions:
- Step 2 LHS Grid Row Mouseover
*/
function handleGridRowMouseOver(rowNumber) {
	rowId = "grid_row_" + rowNumber;
	rowObject = document.getElementById(rowId);
	// Ensure the grid row is not currently selected.
	if (rowObject.getAttribute("class") != "grid_row_over selected") {
		rowObject.setAttribute("class", "grid_row_over");
	}
}

/*
Function: handleGridRowMouseOut(rowNumber)
Handles the unhighlighting of a grid row during a mouseout event.

Parameters:
rowNumber - The number of the active row.

Page Actions:
- Step 2 LHS Grid Row Mouseout
*/
function handleGridRowMouseOut(rowNumber) {
	rowId = "grid_row_" + rowNumber;
	rowObject = document.getElementById(rowId);
	// Ensure the grid row is not currently selected.
	if (rowObject.getAttribute("class") != "grid_row_over selected") {
		rowObject.setAttribute("class", "grid_row_norm");
	}
}

/*
Function: handleGridRowClick(rowNumber)
Handles the highlighting of a selected grid row and loads the data point entry dialog with last selected data point section.

Parameters:
rowNumber - The number of the clicked row.

Page Actions:
- Step 2 LHS Grid Row Click
- Step 3 Image Popup Window Document Ready

Called Functions:
- <displayDataPointEntry(rowNumber, flag, entity)>
*/
function handleGridRowClick(rowNumber,pageSectionFlag) {
	dpChangedData = false;
		// Remove highlighting from all rows
	for ( var i = 1; i < 46; i++ ) {
		rowId = "grid_row_" + i;
		document.getElementById(rowId).setAttribute("class", "grid_row_norm");
	}

	var tmpsecbegend = gridselector.getNewObjBegEndSection(rowNumber);		
	if(tmpsecbegend.isValid())
	{
		setGridRowSelections(tmpsecbegend);
	} else
	{
		alert("The datapoint beginning or end section is invalid!");
	}	
	//$('#grid_row_' + rowNumber).attr('class','grid_row_over selected');
	
	setGridSelectedRows(rowNumber,pageSectionFlag);
}

function setGridRowSelections(tmpsecbegend)
{		
	if(tmpsecbegend.isValid())
	{
		
		var tb = tmpsecbegend.secBeg;
		var te = tmpsecbegend.secEnd;
		for(var j=tb; j<=te;j++) {
			$('#grid_row_' + j).attr('class','grid_row_over selected');
		}			
	} else
	{
		alert("The datapoint beginning or end section is invalid!");
	}
}


function setGridSelectedRows(rowNumber,pageSectionFlag) {
	if(gridselector.isShiftKeyPressed()){
		gridselector.setSelectedRange(rowNumber);
		if(gridselector.isComplete())
		{	
			gridselector.setMultipleSelectionRowColor();
			if(gridselector.isExceedRowlimit)
			{
				var rowsnotselected = null;
				if(gridselector.exceedRowlimit>0)
				{
					rowsnotselected = (gridselector.rowselector.endpos + 1) + "-" + (gridselector.rowselector.endpos + 1 + gridselector.exceedRowlimit);
					rowsnotselected= "Rows " + rowsnotselected + " was not selected!"
				}
				else
				{
					rowsnotselected = (gridselector.rowselector.endpos + 1);
					rowsnotselected= "Row " + rowsnotselected + " was not selected!"				
				}
				
				alert("The maximum selectable row limit is (" +  window.opener.snMaxSectionsPerSelection + "). " + rowsnotselected);
				gridselector.isExceedRowlimit = false;
			}
		}
	}else{
		gridselector.setBegEndSection(rowNumber);
		gridselector.setMultipleSelectionRowColor();
	}
	// For Apex URL Hitting
	callApexUrl();
	if(pageSectionFlag == false){
		window.opener.updatePageSection(gridselector.getObjMultipleSelection());
	}else{
	updateParentWindow(rowNumber,gridselector);
	}
}		


function updateParentWindow(rowNumber,gridselector)
{
	if(window.opener.dpformaction != "new" )
		window.opener.clearStep2Screen(rowNumber,gridselector.getObjMultipleSelection());
	else
		window.opener.updatePageSection(gridselector.getObjMultipleSelection());
}