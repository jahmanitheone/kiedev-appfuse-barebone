/* 
File: step3.jsp
*src/main/webapp/WEB-INF/pages/step3.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 3 RHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Before step 3, the black box generates ICD codes and chooses which entries are notable. In Step 3, the user is responsible for 
confirming the codes and making any necessary adjustments.  

The right-hand side displays the data point entry table. Selecting a row displays the details of that data point entry.
The user must complete each entry to complete the step. A completed row is indicated by a green background color. 

Completion rules are as follows:
- If a data point entry has ICD-10 codes, the user must open the entry (LHS) 
  to accept/reject the codes or enter new ones and then save the entry to complete.
- Data point entries that belong to subcategories Diagnosis or Physical Symptoms and
  do not have ICD-10 codes are indicated by a light yellow background color. The user 
  is required to open the entry (LHS) and enter a code prior to completing.
- For all other data point entries without codes, a "Complete" check box is displayed
  within the row.  This allows the user to complete the entry.
- The step 3 complete button is not activated until all entry rows are completed.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 3 RHS Page Load:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

1.1 Include <default.jsp> Wrapper:

1.2 Define Meta Tags:

1.3 Include session.jsp:

1.4 Import JavaScript:
- <window.querystring_helper.js>

1.5 Set Global Application Variables:
- caseId
- apexSessionId
- appId
- appScreen

1.6 Import Javascript:
- <content.viewer.window_helper.js>
- <page.table.display_helper.js>
- <jquery.tablesorter.min.js>
- <step.finish_helper.js>
- <category.subcategory.update_helper.js>
- <page.image.popup_helper.js>
- <medical.codes_helper.js>

1.7 Document Ready:
- <datetime()> - Set the date/time in the footer.
- Get the case object.
- <updateScreenOnFooter(oCase)> - Set the screen in the footer.
- Set the client date format.
- Obtain the client specific Data Point Categories.
- <addTableDataPoints(step,caseId,null)> - Add the data points table to the page.

1.8 Import Javascript:
- <main.menu_helper.js>

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Notable Page Actions:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

2.1 Data Point Entry Row Click:
- <displayMedicalCodes(entryId)>
- - <createDataPointTablePopup(entryId)>

.... .... .... .... .... ....:

2.2 Data Point Entry Row Complete Checkbox:
- <completeEntryNoCode(id)>
- - <addTableDataPoints(step,caseId,filter)>

.... .... .... .... .... ....:

2.3 Filter:
- <addTableDataPoints(step,caseId,filter)>
- - <millisToDateHandler(date)>
- - <buildFilterList(categories)>

.... .... .... .... .... ....:

2.4 Update Category/Subcategory:
- <updateCategorySubmit()>
- - <addTableDataPoints(step,caseId,filter)>

.... .... .... .... .... ....:

2.5 Save Data Point:
- <sendCompletedCodeData()>
- - <addTableDataPoints(step,caseId,filter)>

.... .... .... .... .... ....:

2.6 Complete:
- <finishStepConfirm()>
- - <finishStep()>
*/