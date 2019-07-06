/* 
File: step2_popup.jsp
*src/main/webapp/WEB-INF/pages/step2_popup.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 2 LHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

In Step 2, the user is responsible for capturing medical data point information about the client. 

Within the left-hand side, the user is able to select a row from a grid overlay on the image, and
insert medical data point information about the client.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 2 LHS Page Load:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

1.1 Include <default.jsp> Wrapper:

1.2 Define Meta Tags:

1.3 Import JavaScript:
- <window.lhs.resize_helper.js>
- <jquery.ui.rotate.2.1.js>
- <jquery.mapz.step2.js>
- <griddy.js>
- <griddy_helper.js>
- <page.table.display_helper.js>
- <applicant.details_helper.js>
- <rotate.popup_helper.js>
- <file.metrics_helper.js>
- <content.viewer.image_helper.js>
- <content.viewer.navigation_helper.js>
- <data.point.dialog_helper.js>
- <jquery.countdown.min.js>

1.4  Document Ready:
- <setUnload()> - Set the unload event to close the popup window when the parent window closes.
- <datetime()> - Set the date/time in the footer.
- Initialize the Expanding Text Area.
- Detect the Date Picker formatting.
- Load the case object and global variables from the parent window.
- Set the global session variables.
- <updateScreenOnFooter(oCase)> - Set the screen in the footer.
- Load the client date format from the parent window.
- <updateDocumentCount()> - Update the page sequencing information.
- <updateApplicantDetails()> - Display the applicant details.
- <updateFileMetrics()> - Update the File Metrics.
- <updateContentViewer(imageId)> - If there is an active page, a thumbnail as been clicked and the content viewer is loaded.
- Set the Main Menu button URL.
- Display the data point entry dialog if one is active within the RHS.
- Set debug information.
- Get the activePageId from the parent window.
- Initialize the Date Picker.

1.5 Import JavaScript:
- <keystroke.bindings.2.popup.js>

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Notable Page Actions:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

2.1 Load the Image Viewer:
- <loadContentViewer(imageId,position,rotation)>
- - <clearContentViewer()>
- - <updateActiveDocumentNumber()>
- - <updateActiveDocumentPageNumber()>
- - <updateDocumentPageCount()>
- - <updateDocumentControls()>
- - <updatePageControls()>
- - <displayRotationControls()> || <hideRotationControls()>

.... .... .... .... .... ....:

2.2 Rotate the Image Left/Right:
- <rotateImageHandler()>
- - <rotateImage(direction)>

.... .... .... .... .... ....:

2.3 Display the file metrics:
- <updateFileMetrics()>

.... .... .... .... .... ....:

2.4 Display the Data Point Entry Dialog:
- <displayDataPointEntry(rowNumber, flag, entry)>
- - <resetDataPointEntryPopup()>
- - <displayDataPointCategories()>
- - <categoryClickHandler(currentCategoryId)> - Update Only
- - <subcategoryClickHandler(currentSubcategoryId)> - Update Only
- - <millisToDateHandler(millis)> - Update Only

.... .... .... .... .... ....:

2.5 Select a Category:
- <categoryClickHandler(currentCategoryId)>
- - <resetDataPointEntryPopup()>
- - <highlightCategory(activeCategoryId)>
- - <displayDataPointSubcategories(activeCategoryId)>

.... .... .... .... .... ....:

2.6 Select a Subcategory:
- <subcategoryClickHandler(currentSubcategoryId)>
- - <highlightSubcategory(activeSubcategoryId)>
- - <getDPForm()>

.... .... .... .... .... ....:

2.7 Save Data Point Entry:
- <saveDataPoints(action)>
- - <hideDataPointEntry(activeRowNumber)>
- - <displayDataPointEntry(rowNumber, flag, entry)> - Add Another Only
- - <addTableDataPointsHandler()>

.... .... .... .... .... ....:

2.8 Add Another Data Point Entry:
- <saveDataPoints(action)>
- - <hideDataPointEntry(activeRowNumber)>
- - <displayDataPointEntry(rowNumber, flag, entry)> - Add Another Only
- - <addTableDataPointsHandler()>

.... .... .... .... .... ....:

2.9 Use Data Date:
- <usePageDate()>
- - <millisToDateHandler(millis)>

*/