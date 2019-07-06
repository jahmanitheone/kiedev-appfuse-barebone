/* 
File: step3_imageLink.jsp
*src/main/webapp/WEB-INF/pages/step3_imageLink.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 3 Image Link Page Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Before step 3, the black box generates ICD codes and chooses which entries are notable. In Step 3, the user is responsible for 
confirming the codes and making any necessary adjustments.  

The image link page allows the user to see the original page with the selected grid line.  This allows the user to confirm
ICD codes and make necessary adjustments based on the original data.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Step 3 Image Link Page Load:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

1.1 Include <default.jsp> Wrapper:

1.2 Define Meta Tags:

1.3 Import JavaScript:
- <window.lhs.resize_helper.js>
- <query.mapz.step2.js>
- <griddy.js>
- <griddy_helper.js>

1.4 Document Ready:
- Align the popup window to the screen.
- <setUnloadStep3Viewer()> - Set the unload event to close the popup window when the parent window closes.
- Load the case object from the parent window.
- <updateScreenOnFooter(oCase)> - Set the screen in the footer.
- Get the active page from the parent window.
- Get the active data point section number from the parent window.
- <loadContentViewer()> - Display the image.
- <handleGridRowClick(activeDataPointSection)> - Activate the correct grid row.

*/