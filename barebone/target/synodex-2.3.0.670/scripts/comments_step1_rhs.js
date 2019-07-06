/* 
File: step1.jsp
*src/main/webapp/WEB-INF/pages/step1.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 1 RHS Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

In Step 1, the user is responsible for excluding, rotating, ordering and updating metadata for all pages within a case.  

Within the right-hand side, page thumbnails are displayed and the user is able to select the pages.  Once selected, the
user can modify the page metadata, assign page numbers and rotate the image as needed.  Once all pages are marked as
complete, the step finished.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 1 RHS Page Load:

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
- <window.querystring_helper.js>
- <jquery.blockUI.js>
- <jquery.ui.rotate.2.1.js>
- <jquery.jscroll.min.js>
- <rotate_helper.js>
- <page.ordering_helper.js>
- <page.metadata_helper.js>
- <page.thumbnail.display_helper.js>
- <content.viewer.window_helper.js>
- <dom.ready_helper.js>
- <step.finish_helper.js>

1.7 Document Ready:
- Initialize the Move Page Dialog
- Remove the Step 2 Toggle Button
- Remove the Step 2 Complete Button
- Initialize the Date Picker
- Initialize the Scrolling Metadata Panel

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

2.20 Complete All Pages:
- <finishStepConfirm()>
- - <finishStep()>

.... .... .... .... .... ....:

2.21 Move Page:
- <movePageSubmit(pageId)>
- - <updatePages(pages, boolSort)>

.... .... .... .... .... ....:

2.22 Sort:
- <sort()>
- - <clearThumbnails()>
- - <displayThumbnails()>

*/