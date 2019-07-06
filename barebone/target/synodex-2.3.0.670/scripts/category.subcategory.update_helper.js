/* 
File: category.subcategory.update_helper.js
Responsible for displaying and updating the category and subcategories in step 3 RHS. 

Loaded In Steps:
- Step 3 RHS - <step3.jsp>

*****

Function: displayUpdateCategoryDialog()
Display the Update Category/Subcategory dialog.

Page Actions:
- Step 3 RHS Update Category/Subcategories Link Click

Called Functions:
- <displayDataPointCategories()>
- <categoryClickHandler(currentCategoryId)>
*/
function displayUpdateCategoryDialog() {
	// We need to reset the category and subcategory divs so we rebuild the list every time.  
	// This will ensure previously selected items are not highlighted.
	$('#category_list').html('');
	$('#subcategory_list').html('');

	var htmlString = '';

	// Display the Data Point Categories.
	displayDataPointCategories();

	// Mock a click of the active category.
	categoryClickHandler(currentCategoryId);

	// Update the actions div.
	htmlString += '<div><button onclick=\"updateCategorySubmit();\">Update</button> <button onclick=\"$(\'#updateCategory\').dialog(\'close\');\">Cancel</button></div>';
	$('#update_category_actions').html(htmlString);

	// Show the dialog.
	$('#updateCategory').dialog('open');
}

/*
Function: displayDataPointCategories()
Display the Data Point Categories within the Step 3 Update Category/Subcategory dialog.

Page Actions:
- Step 3 RHS Update Category/Subcategory Display
*/
function displayDataPointCategories() {
	var htmlString = '';

	// Loop through the Data Points and display the Categories.
	htmlString += '<ul class=\"dp_category\">';
	for (i=0; i < objDPInfo.length; i++) {
		htmlString += '<li><span id=\"category_' + objDPInfo[i].dpcategoryid + '\" onclick=\"categoryClickHandler(' + objDPInfo[i].dpcategoryid + ')\">' + objDPInfo[i].dpcategoryname + '</span></li>';	
	}
	htmlString += '</ul>';

	// Add the datapoint categories to the display.
	$('#category_list').html(htmlString);
}

/*
Function: displayDataPointSubcategories(activeCategoryId)
Display the Data Point Subcategories within the Step 3 Update Category/Subcategory dialog popup.

Parameters:
activeCategoryId - The id of the category that was selected.

Page Actions:
- Step 3 RHS Update Category/Subcategory Category Click


Called Functions:
- <subCategoryClickHandler(currentSubcategoryId)>
*/
function displayDataPointSubcategories(activeCategoryId) {
	var htmlString = '';

	// Clear the current list of categories.
	$('#subcategory_list').html('');

	var foundSubcategories = false;

	// Loop through the categories, find the active category and display it's subcategories.
	for (i=0; i < objDPInfo.length; i++) {
		// Find the active category and make sure it has subcategories.
		if (objDPInfo[i].dpcategoryid == activeCategoryId && objDPInfo[i].subCategories.length > 0) {
			// Loop through and display the subcategories.
			htmlString += '<ul class=\"dp_category\">';
			for (j=0; j < objDPInfo[i].subCategories.length; j++) {
				htmlString += '<li><span id=\"subcategory_' + objDPInfo[i].subCategories[j].dpsubcatid + '\" onclick=\"subcategoryClickHandler(' + objDPInfo[i].subCategories[j].dpsubcatid + ')\">' + objDPInfo[i].subCategories[j].dpsubcatname + '</span></li>';
			}
			htmlString += '</ul>';

			foundSubcategories = true;
		}
	}

	// Check if there are subcategories.
	if (foundSubcategories == false) {
		$('#subcategory_list').css('display','none');
	} else {
		$('#subcategory_list').css('display','block');
		$('#subcategory_list').append(htmlString);

		// Mock a subcategory click.
		subcategoryClickHandler(currentSubcategoryId);
	}
}

/*
Function: categoryClickHandler(currentCategoryId)
Called when a Data Point Category is clicked.  Sets the active category global variable, highlights the category, and displays the corresponding subcategories (if any).

Parameters:
currentCategoryId - Id of the category that was clicked.

Page Actions:
- Step 3 RHS Update Category/Subcategory Category Click

Called Functions:
- <highlightCategory(activeCategoryId)>
- <displayDataPointSubcategories(activeCategoryId)>
*/
function categoryClickHandler(currentCategoryId) {
	// Set the active category id global variables.
	activeCategoryId = currentCategoryId;
	activeSubcategoryId = '';

	// Unset the active subcategory
	prevActiveSubcategoryId = '';

	// Highlight the active category.
	highlightCategory(activeCategoryId);

	// Display the subcategories.
	displayDataPointSubcategories(activeCategoryId);
}

/*
Function: subcategoryClickHandler(currentSubcategoryId)
Called when a Data Point Subategory is clicked.  Sets the active subcategory global variable and highlights the subcategory.

Parameters:
currentSubcategoryId - Id of the subcategory that was clicked.

Page Actions:
- Step 3 RHS Update Category/Subcategory Subcategory Click

Called Functions:
- <highlightSubcategory(activeSubcategoryId)>
*/
function subcategoryClickHandler(currentSubcategoryId) {
	// Set the active subcategory id.
	activeSubcategoryId = currentSubcategoryId;

	// Highlight the active subcategory.
	highlightSubcategory(activeSubcategoryId);
}

/*
Function: highlightCategory(activeCategoryId)
Handle the highlighting of the categories.

Parameters:
currentSubcategoryId - Id of the subcategory that was clicked.

Page Actions:
- Step 3 RHS Update Category/Subcategory Category Click
*/
var prevActiveCategoryId = ''; // Set a global variable to record whether a category has been previously clicked.  
function highlightCategory(activeCategoryId) { 
	// If a category has been previously selected, reset the display of that link.
	if(prevActiveCategoryId) { 
		$('#category_' + prevActiveCategoryId).css('color','black');
		$('#category_' + prevActiveCategoryId).css('font-weight','normal');
	} 

	// Highlight and bold the active category.
	$('#category_' + activeCategoryId).css('color','blue');
	$('#category_' + activeCategoryId).css('font-weight','bold');

	// Set the previous category id for the next time a category is clicked.
	prevActiveCategoryId = activeCategoryId;
}

/*
Function: highlightCategory(activeCategoryId)
Handle the highlighting of the subcategories.

Parameters:
activeSubcategoryId - The id of the selected subcategory.

Page Actions:
- Step 3 RHS Update Category/Subcategory Subcategory Click
*/
var prevActiveSubcategoryId = ''; // Set a global variable to record whether a subcategory has been previously clicked.  
function highlightSubcategory(activeSubcategoryId) {
	// If a category has been previously selected, reset the display of that link.
	if (prevActiveSubcategoryId) { 
		$('#subcategory_' + prevActiveSubcategoryId).css('color','black');
		$('#subcategory_' + prevActiveSubcategoryId).css('font-weight','normal');
	} 

	// Highlight and bold the active subcategory.
	$('#subcategory_' + activeSubcategoryId).css('color','blue');
	$('#subcategory_' + activeSubcategoryId).css('font-weight','bold');

	// Set the previous subcategory id for the next time a category is clicked.
	prevActiveSubcategoryId = activeSubcategoryId; 
}

/*
Function: updateCategorySubmit() 
Save the updated category/subcategory to the database in step 3.

Available In Steps:
- Step 3 RHS

Page Actions:
- Step 3 RHS Update Category/Subcategory Save

Called Functions:
- <addTableDataPoints(step, caseId, filter)>
*/
function updateCategorySubmit() {
	// If subcategories are available, make sure one is selected.
	if ($('#subcategory_list').html() != '' && activeSubcategoryId == '') {
		alert("Please Select a Subcategory.");
	} else {
		// Perform the update.
		// Get the active category and subcategory
		var category = activeCategoryId;
		var subcategory = activeSubcategoryId;

		// Check if a subcategory has been selected so we know which AJAX call to make.
		if (subcategory > 0) {
			$.ajax({
				url: "dataPoint/entityForm/" + category + "/" + subcategory,
				async:   false,
				context: document.body,
				success: function(c) {
					objEntityForm = c;
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
					displayErrorDialog(dateTime, userName, sessionId, caseId, "updateCategorySubmit()", errorThrown);
				}
			});
		} else {
			$.ajax({
				url: "dataPoint/entityForm/" + category,
				async:   false,
				context: document.body,
				success: function(c) {
					objEntityForm = c;
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
					displayErrorDialog(dateTime, userName, sessionId, caseId, "updateCategorySubmit()", errorThrown);
				}
			});
		}

		// Create a map that will hold name,value pairs for the data point data.
		var map = new Object(); 

		// Add the data point data to the map.
		map['_dataPointFormEntity'] = objEntityForm.dpformentityid;

		// All data has been set.  Update/insert data point entry.
		jQuery.ajax({  
			type: "POST",
			url: "dataPoint/dataPointEntryUpdate/" + activeEntryId,
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success : function(msg) {
				// Close the dialog.
				$('#updateCategory').dialog('close');

				// Update right page datapoint table.
				addTableDataPoints(step, objCase.id);

				// Update the global variables.
				currentCategoryId = objEntityForm._dataPointCategory.dpcategoryid;
				currentSubcategoryId = objEntityForm._subCategory.dpsubcatid;
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "updateCategorySubmit()", errorThrown);
			}
		});
	}
}