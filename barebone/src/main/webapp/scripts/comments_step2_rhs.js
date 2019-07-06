/* 
File: step2.jsp
*src/main/webapp/WEB-INF/pages/step2.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 2 RHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

In Step 2, the user is responsible for capturing medical data point information about the client. 

Within the right-hand side, the user is able to perform all actions from step 1 RHS, as well as
viewing the current data point entries.  Once all entries have been captured, the user may complete
the step.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 2 RHS Page Load:

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
- <jquery.blockUI.js>
- <jquery.ui.rotate.2.1.js>
- <jquery.jscroll.min.js>
- <rotate_helper.js>
- <page.ordering_helper.js>
- <page.metadata_helper.js>
- <page.thumbnail.display_helper.js>
- <content.viewer.window_helper.js>
- <dom.ready_helper.js>
- <page.table.display_helper.js>
- <jquery.tablesorter.min.js>
- <step.finish_helper.js>

1.7 Document Ready:
- Initialize the Move Page Dialog
- Initialize Table Sorting
- Initialize the Scrolling Metadata Panel
- Initialize the Date Picker

1.8 Import JavaScript:
- <main.menu_helper.js>
- <keystroke.bindings.12.js>

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Notable Page Actions:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

2.1 Load Thumbnails:
- <displayThumbnails()>
- - <checkDocumentOrder()>
- - <updateScreenOnFooter(oCase)>
- - <addThumbnail(page, i)>
- - <setPageStopLoadTime()> - Debug Only
- - <setTotalImageSize(spContentID)> - Debug Only
- - <thumbnailClickHandler(pageId, pageDomId)>
- - <addDocumentTypes(docTypeGroup)>

.... .... .... .... .... ....:

2.2 Rotate Thumbnail:
- <rotateThumbnailHandler(thumbnailId, direction)>
- - <rotateThumbnail(thumbnailId, direction)>

.... .... .... .... .... ....:

2.3 Rotate All Thumbnails:
- <rotateAllThumbnails(direction)>
- - <updateContentViewer(imageId)>
- - <updatePages(pages, boolSort)>

.... .... .... .... .... ....:

2.4 Exclude Page:
- <updateExclude(id)>
- - <finishStep()> - If all pages are complete after exclusion.
- - <disableMetadataControls()>
- - <processThumbnailBorder(pageId)> - If thumbnail is not active.
- - <clearThumbnailHighlights()> - If thumbnail is active.
- - <disableMetadataControls()> - If thumbnail is active.
- - <clearContentViewer()> - If thumbnail is active.
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateActivePageNumber()>
- - <updatePageCount()>
- - <updateFileMetrics()>

.... .... .... .... .... ....:

2.5 Unexclude Page:
- <updateExclude(id)>
- - <processThumbnailBorder(pageId)> - If thumbnail is not active.
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateActivePageNumber()>
- - <updatePageCount()>
- - <updateFileMetrics()>

.... .... .... .... .... ....:

2.6 Thumbnail Click:
- <thumbnailClickHandler(pageId, pageDomId)>
- - <clearThumbnailHighlights()>
- - <highlightThumbnail(imageId, color)>
- - <updateMetadataPanel(imageId)>
- - <updateContentViewer(imageId)>

.... .... .... .... .... ....:

2.7 Data Date Select:
- <updatePages(pages, boolSort)>
- <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.8 New Doc:
- <newDocHandler()>
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateMetadataPanel(imageId)>
- - <thumbnailClickHandler(pageId, pageDomId)>

.... .... .... .... .... ....:

2.9 Add To Last:
- <addToLastHandler()>
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateMetadataPanel(imageId)>
- - <thumbnailClickHandler(pageId, pageDomId)>

.... .... .... .... .... ....:

2.10 Set Within Doc First:
- <reorderPage(aryDocumentPages, oldAryPosition, newAryPosition)>

.... .... .... .... .... ....:

2.11 Set Within Doc Last:
- <reorderPage(aryDocumentPages, oldAryPosition, newAryPosition)>

.... .... .... .... .... ....:

2.12 Set Within Doc Next:
- <updatePages(pages, boolSort)>

.... .... .... .... .... ....:

2.13 Set Within Doc Prev:
- <updatePages(pages, boolSort)>

.... .... .... .... .... ....:

2.14 Suspend Page:
- <hideRotationControls()>
- <hideDocTypes()>
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.15 Unsuspend Page:
- <displayRotationControls()>
- <showDocTypes()>
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.16 Bad Handwriting:
- <updatePage(page, boolSort, activeDocumentOrder)>
- <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.17 Document Type Select:
- <updateDocType(docTypeID, docTypeName)>
- - <updatePage(page, boolSort, activeDocumentOrder)> - No page number.
- - <updatePages(pages, boolSort)> - Page numbers.
- - <updateMetadataPanel(imageId)>
- - <highlightDocType(id)>

.... .... .... .... .... ....:

2.18 Complete:
- <completeHandler()>
- - <hideDocTypes()>
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.19 Uncomplete:
- <completeHandler()>
- - <showDocTypes()>
- - <updatePage(page, boolSort, activeDocumentOrder)>
- - <updateMetadataPanel(imageId)>

.... .... .... .... .... ....:

2.20 Move Page:
- <movePageSubmit(pageId)>
- - <updatePages(pages, boolSort)>

.... .... .... .... .... ....:

2.21 Sort:
- <sort()>
- - <clearThumbnails()>
- - <displayThumbnails()>

.... .... .... .... .... ....:

2.22 Toggle View:
- <addTableDataPointsHandler()>
- - <addTableDataPoints(step,caseId,filter)>

.... .... .... .... .... ....:

2.23 Complete:
- <finishStepConfirm()>
- - <finishStep()>

*/