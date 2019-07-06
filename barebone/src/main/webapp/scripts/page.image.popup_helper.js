/* 
File: page.image.popup_helper.js
Responsible for opening the Display Image popup window for step 3 RHS.

Loaded In Steps:
- Step 3 RHS - <step3.jsp>

****

Function: displayImagePopup()
Display the step 3 RHS page image popup window.

Page Actions:
- Step 3 RHS Image Popup Link Click
*/
function displayImagePopup() {
	imagePopup = window.open("step3_imageLink","step3_imageLink","width=" + lhsWidth + ",height=" + lhsHeight + ",scrollbars=1,top=0,left=0");
}