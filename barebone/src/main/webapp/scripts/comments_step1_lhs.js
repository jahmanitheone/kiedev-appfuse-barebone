/* 
File: step1_popup.jsp
*src/main/webapp/WEB-INF/pages/step1_popup.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 1 LHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

In Step 1, the user is responsible for excluding, rotating, ordering and updating metadata for all pages within a case.  

Within the left-hand side, the user is able to view a large version of the page, allowing the user the make appropriate
decisions regarding the page data.  The user is also allowed to modify the client details.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 1 LHS Page Load Details:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

1.1 Include <default.jsp> Wrapper:

1.2 Define Meta Tags:

1.3 Import JavaScript:
- <window.lhs.resize_helper.js>
- <jquery.ui.rotate.2.1.js>
- <jquery.mapz.step1.js>
- <applicant.details_helper.js>
- <rotate.popup_helper.js>
- <file.metrics_helper.js>
- <content.viewer.image_helper.js>
- <content.viewer.navigation_helper.js>
- <jquery.countdown.min.js>

1.4 Document Ready:
- <setUnload()> - Set the unload event to close the popup window when the parent window closes.
- <datetime()> - Set the date/time in the footer.
- Load the case object from the parent window.
- <updateScreenOnFooter(oCase)> - Set the screen in the footer.
- Load the client date format from the parent window.
- <updatePageCount()> - Update the page sequencing information.
- <updateApplicantDetails()> - Display the applicant details.
- Set the global session variables.
- Add a dialog control to the applicant update popup div.
- <updateFileMetrics()> - Update the File Metrics.
- Get the activePageId from the parent window.
- <updateContentViewer(imageId)> - If there is an active page, a thumbnail as been clicked and the content viewer is loaded.
- Set the Main Menu button URL.

1.5 Import JavaScript:
- <keystroke.bindings.1.popup.js>

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Notable Page Actions:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

2.1 Load the Image Viewer:
- <loadContentViewer(imageId,position,rotation)>
- - <clearContentViewer()>
- - <updateActivePageNumber()>
- - <displayRotationControls()> || <hideRotationControls()>

.... .... .... .... .... ....:

2.2 Save Applicant Details:
- <saveApplicantDetails()>

.... .... .... .... .... ....:

2.3 GoTo Dropdown:
-...

.... .... .... .... .... ....:

2.4 Zoom In/Out:
-...

.... .... .... .... .... ....:

2.5 Rotate the Image Left/Right:
- <rotateImageHandler(direction)>
- - <rotateImage(direction)>

.... .... .... .... .... ....:

2.6 Display the file metrics:
- <updateFileMetrics()>

*/