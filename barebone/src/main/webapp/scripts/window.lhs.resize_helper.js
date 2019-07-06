/* 
File: window.lhs.resize_helper.js
Responsible for resizing of the LHS window.

Loaded In Steps:
- Step 1 RHS - <step1_popup.jsp>
- Step 2 RHS - <step2_popup.jsp>
- Step 3 RHS - <step3_popup.jsp>
- Step 4 RHS - <step4_popup.jsp>
*/
var lhsAvailHeight = window.screen.availHeight;
var lhsAvailWidth = window.screen.availWidth;
var lhsHeight = lhsAvailHeight;
//var lhsWidth = lhsAvailWidth/2;
var lhsWidth = lhsAvailWidth;
	    
window.resizeTo(lhsWidth,lhsHeight);
	    
// Move the popup window to the top left corner.  This also ensures the bottom is aligned.
window.moveBy(-window.screen.availWidth,-window.screen.availHeight);