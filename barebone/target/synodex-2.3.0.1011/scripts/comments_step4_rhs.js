/* 
File: step4.jsp
*src/main/webapp/WEB-INF/pages/step4.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 4 RHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

In Step 4, the user is responsible for confirming the notables generated by the black box.

The RHS displays the data point entries to the user.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 4 RHS Page Load:

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

1.6 Import JavaScript:
- <page.thumbnail.display_helper.js>
- <content.viewer.window_helper.js>
- <jquery.tablesorter.min.js>
- <page.table.display_helper.js>
- <global_helper.js>
- <step.finish_helper.js>

1.7 Document Ready:
- Get the case object.
- Open the LHS window.
- <addTableDataPoints(step, caseId, null)> - Add the data points table.

1.8 Import JavaScript:
- <main.menu_helper.js>

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Notable Page Actions:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

2.1 Filter:
- <addTableDataPoints(step,caseId,filter)>
- - <millisToDateHandler(date)>
- - <buildFilterList(categories)>

.... .... .... .... .... ....:

2.2 Complete:
- <finishStepConfirm()>
- - <finishStep()>

*/