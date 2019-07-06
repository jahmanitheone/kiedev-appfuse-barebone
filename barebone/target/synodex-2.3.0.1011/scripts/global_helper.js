/* 
File: global_helper.js
A collection of general functions that are needed within most step pages.

Loaded In Steps:
- Step 1 LHS - <step1_popup.jsp>
- Step 1 RHS - <step1.jsp>
- Step 2 LHS - <step2_popup.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 4 LHS - <step4_popup.jsp>
- Step 4 RHS - <step4.jsp>

*****

Function: updatePage(page, boolSort, activeDocumentOrder)
Ajax call to update a single page.

Parameters:
- page - The updated page object.
- boolSort - true,false - Indicates if a sort is required.
- activeDocumentOrder - The document number of the current page. Check to see if the document numbers need adjusted.

Page Actions:
- Step 1 LHS Shift+C Complete
- Step 1 LHS Shift+A Add to Last
- Step 1 LHS Shift+N New Document
- Step 1 RHS Complete/Uncomplete
- Step 1 RHS Add to Last
- Step 1 RHS New Document
- Step 1 RHS Data Date with No Document Number
- Step 1 RHS Bad Handwriting
- Step 1 RHS Suspend/Unsuspend
- Step 1 RHS Doc Type with No Document Number
- Step 1 RHS Exclude/Include
- Step 2 LHS Shift+C Complete
- Step 2 LHS Shift+A Add to Last
- Step 2 LHS Shift+N New Document
- Step 2 RHS Complete/Uncomplete
- Step 2 RHS Add to Last
- Step 2 RHS New Document
- Step 2 RHS Data Date with No Document Number
- Step 2 RHS Bad Handwriting
- Step 2 RHS Suspend/Unsuspend
- Step 2 RHS Doc Type with No Document Number
- Step 2 RHS Exclude/Include

Called Functions:
- <checkPageOrder(activeDocumentOrder)>
- <sort()>
*/


var STEP2_TR =49;
var STEP2_OP=6;

function updatePage(page, boolSort, activeDocumentOrder) {
	jQuery.ajax({
		type : 'POST',
		url : 'pages/' + page.id,
		data : {
			'_method' : 'PUT',
			page : page
		},
		success : function(msg) {
			// If the active document number is defined and is not the default 9999, check the page order.
			if (activeDocumentOrder > 0 && activeDocumentOrder != 9999) {
				checkPageOrder(activeDocumentOrder)
			} else if (boolSort == true) {
				sort();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if(step!=1)
			{
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
				displayErrorDialog(dateTime, userName, sessionId, caseId, "updatePage(page, " + boolSort + ", " + activeDocumentOrder + ")", errorThrown);
			}
			
			// Reload the case object and the thumbnails.
			sort();
		}
	});
}

/*
Function: updatePages(pages, boolSort)
Ajax call to update a collection of pages.

Parameters:
- pages - A Json string of page objects.
- boolSort - true,false - Indicates if a sort is required.

Page Actions:
- Step 1 RHS Data Date Select with Document Number
- Step 1 RHS Set Within Doc Previous Click
- Step 1 RHS Set Within Doc Next Click
- Step 1 RHS Set Within Doc First Click via reorderPage
- Step 1 RHS Set Within Doc Last Click via reorderPage
- Step 1 RHS Document Type Select with Document Number
- Step 1 RHS Move Page Submit
- Step 1 RHS Check Document Order True
- Step 1 RHS Check Page Order True
- Step 1 RHS Update Final Page Numbers
- Step 1 RHS Rotate All Left/Right
- Step 2 RHS Data Date Select with Document Number
- Step 2 RHS Set Within Doc Previous Click
- Step 2 RHS Set Within Doc Next Click
- Step 2 RHS Set Within Doc First Click via reorderPage
- Step 2 RHS Set Within Doc Last Click via reorderPage
- Step 2 RHS Document Type Select with Document Number
- Step 2 RHS Move Page Submit
- Step 2 RHS Check Document Order True
- Step 2 RHS Check Page Order True
- Step 2 RHS Update Final Page Numbers
- Step 2 RHS Rotate All Left/Right

Called Functions:
- <sort()>
*/
function updatePages(pages, boolSort) {
	jQuery.ajax({
		type : 'POST',
		async: false,
		url : 'pages',
		data : {
			'_method' : 'PUT',
			pages : pages
		},
		success : function(msg) {
			// Sort the pages if sort = true. Doing this here ensures the save is done prior to updating the UI.
			if (boolSort == true) {
				sort();
			}
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
			displayErrorDialog(dateTime, userName, sessionId, caseId, "updatePages(pages, " + boolSort + ")", errorThrown);
			
			// Reload the case object and the thumbnails.
			sort();
		}
	});
	
		//IWS-269: Page number gets set to 0 in Step 2 - Set completed pages for comparison
	pageordervalidateobj = pages;
}

function cmp(x, y){ // generic comparison function
    return x > y ? 1 : x < y ? -1 : 0; 
}

/*
Function: setUnload()
Close the popup window when the parent is closed.

Page Actions:
- Step 1 LHS Document Ready
- Step 2 LHS Document Ready
- Step 4 LHS Document Ready
*/
function setUnload() {
	$(window).bind('beforeunload', function(){glossaryWindow.close();leftWindow.close();});
	$(window).unload( function () { leftWindow.close(); glossaryWindow.close(); } );
}

/*
Function: setUnloadStep3Viewer()
Close the popup window when the parent is closed.

Page Actions:
- Step 3 Image Popup Window Document Ready
*/
function setUnloadStep3Viewer() {
	$(window).unload( function () { imagePopup.close(); } );
}

/*
Function: dateToMillisHandler(date)
Handles date to millisecond conversions for US and Universal formatted dates.

Parameters:
- date - A date in date or string format.

Page Actions:
- Step 1 RHS Document Ready for Last Completed Date
- Step 1 RHS Data Date Select
- Step 1 RHS Metadata Panel Load for Complete Button Enable
- Step 2 RHS Document Ready for Last Completed Date
- Step 2 RHS Data Date Select
- Step 2 RHS Metadata Panel Load for Complete Button Enable

Called Functions:
- <dateToMillisUN(date)> - Client Default Date Format UN Only
- <dateToMillisUS(date)> - Client Default Date Format US Only
*/
function dateToMillisHandler(date) {
	var millis;
	if (clientDateFormat == 'dd/mm/yyyy') {
		millis = dateToMillisUN(date);
	} else {
		millis = dateToMillisUS(date);
	}
	return millis;
}

/*
Function: millisToDateHandler(millis)
Handles millisecond to date conversions for US and Universal formatted dates.

Parameters:
- millis - A string of milliseconds.

Page Actions:
- Step 1 LHS Shift+N New Document for Complete Button Enable
- Step 1 RHS New Document for Complete Button Enable
- Step 1 RHS Update Metadata Panel for Data Date Display
- Step 1 RHS Move Page Dialog for Page Date Display
- Step 2 LHS Shift+N New Document for Complete Button Enable
- Step 2 LHS Data Point Dialog Use Page Date Button Click
- Step 2 LHS Data Point Dialog Date Picker Default Date via Document Ready
- Step 2 RHS New Document for Complete Button Enable
- Step 2 RHS Update Metadata Panel for Data Date Display
- Step 2 RHS Move Page Dialog for Page Date Display
- Step 2 RHS Data Point Entry Table Date Display
- Step 3 RHS Medical Code Table Date Display
- Step 3 RHS Data Point Entry Table Date Display
- Step 4 RHS Data Point Entry Table Date Display

Called Functions:
- <millisToDateUN(millis)> - Client Default Date Format UN Only
- <millisToDateUS(millis)> - Client Default Date Format US Only
*/
function millisToDateHandler(millis) {
	var dateString;
	if (clientDateFormat == 'dd/mm/yyyy') {
		dateString = millisToDateUN(millis) 
	} else {
		dateString = millisToDateUS(millis);
	}
	return dateString;
}

/**
 * Function: dateShortenByYear(millis,yearExtendedBy)
Handles the US/UK date shortened by given year.

Parameters:
- millis - timestamp milliseconds

*/
function dateShortenByYear(millis,yearExtendedBy){
  var dateTime = new Date(millis);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var dateString;  
  year = year - yearExtendedBy;
  
  if(clientDateFormat == 'dd/mm/yyyy') {
     dateString = (day + "/" + month + "/" + year);
  } else {
     dateString =  (month + "/" + day + "/" + year);
  }
  
  return dateString;
}  

/*
Function: dateToMillisUS(date)
Handles the US conversion of date to milliseconds.

Parameters:
- date - A date in date or string format.

Page Actions:
- See dateToMillisHandler().  Called when the client's default date format is set to mm/dd/yyyy.
*/
function dateToMillisUS(date) {
	var dateString = date;
	var date = new Date(date);
	var themillis = Date.parse(date);
	if(isNaN(themillis) || dateString.length == 6){
			if(dateString.length == 8){
				var monthDeli = dateString.substr(0,2);
				var dayDeli = dateString.substr(2,2);
				var yearDeli = dateString.substr(4,8);
				dateString = monthDeli+"/"+dayDeli+"/"+yearDeli;
			}
			else if(dateString.length == 6){
				var monthDeli = dateString.substr(0,2);
				var dayDeli = dateString.substr(2,2);
				var yearDeli = dateString.substr(4,6);
				dateString = monthDeli+"/"+dayDeli+"/"+yearDeli;
			}
		
	var splitDate = dateString.split("/");
	var themonth=splitDate[0];
	var theday=splitDate[1];
	var theyear=splitDate[2];
	//IWS-255: When the user enters "08" in date box for the 'year, it automatically gets selected as "1908" instead of "2008".
	// 1. If user enters 00 to 49 as year, it sets to 2000 to 2049.
	// 2. If user enters 50 to 99 as year, it sets to 1950 to 1999.
	if (theyear.length == 2){ 
		var newyear = "20" + theyear;
		if (newyear < "2050"){ theyear = newyear; }
		else { theyear = "19" + theyear}
	}

	dateString = (themonth+"/"+theday+"/"+theyear);
	
	var useDate = new Date(dateString);
	var themillis = Date.parse(useDate);
	return themillis;
	}else{
		return themillis;
	}
}

/*
Function: millisToDateUS(millis)
Handles the US conversion of milliseconds to date.

Parameters:
- millis - A string of milliseconds.

Page Actions:
- See millisToDateHandler().  Called when the client's default date format is set to mm/dd/yyyy.
*/
function millisToDateUS(millis) {
	var datetime = new Date(millis);

	var theyear=datetime.getFullYear();
	var themonth=datetime.getMonth()+1;
	var theday=datetime.getDate();

	dateString = (themonth+"/"+theday+"/"+theyear);

	return dateString;
}

/*
Function: dateToMillisUN(date)
Handles the universal conversion of date to milliseconds.

Parameters:
- date - A date in date or string format.

Page Actions:
- See dateToMillisHandler().  Called when the client's default date format is set to dd/mm/yyyy.
*/
function dateToMillisUN(date) {
	// Ensure the date is in a format we can work with.
	if(date!=null)
		//date = date.split('-').join('/');
		if(date.indexOf("\.") != -1 ){
			date = date.replace(/\./g,'/')
		}
		if(date.indexOf("-")!=-1){
			date = date.replace(/\-/g,'/');
		}
		if(date.indexOf("/")==-1){
			if(date.length == 8){
				var dayDeli = date.substr(0,2);
				var monthDeli = date.substr(2,2);
				var yearDeli = date.substr(4,8);
				date = dayDeli+"/"+monthDeli+"/"+yearDeli;
			}
			else if(date.length == 6){
				var dayDeli = date.substr(0,2);
				var monthDeli = date.substr(2,2);
				var yearDeli = date.substr(4,6);
				date = dayDeli+"/"+monthDeli+"/"+yearDeli;
			}
		
		}
	var splitDate = date.split("/");
	
	var theday=splitDate[0];
	var themonth=splitDate[1];
	var theyear=splitDate[2];
	
	//IWS-255: When the user enters "08" in date box for the 'year, it automatically gets selected as "1908" instead of "2008".
	// 1. If user enters 00 to 49 as year, it sets to 2000 to 2049.
	// 2. If user enters 50 to 99 as year, it sets to 1950 to 1999.
	if (theyear.length == 2){ 
		var newyear = "20" + theyear;
		if (newyear < "2050"){ theyear = newyear; }
		else { theyear = "19" + theyear}
	}

	dateString = (themonth+"/"+theday+"/"+theyear);
	
	var useDate = new Date(dateString);
	var themillis = Date.parse(useDate);
	
	return themillis;
}

/*
Function: millisToDateUN(millis)
Handles the universal conversion of milliseconds to date.

Parameters:
- millis - A string of milliseconds.

Page Actions:
- See millisToDateHandler().  Called when the client's default date format is set to dd/mm/yyyy.
*/
function millisToDateUN(millis) {
	var datetime = new Date(millis);

	var theyear=datetime.getFullYear();
	var themonth=datetime.getMonth()+1;
	var theday=datetime.getDate();
	dateString = (theday+"/"+themonth+"/"+theyear);

	return dateString;
}

/*
Function: filter()
Filter the page thumbnails.

Page Actions:
- Step 1 RHS Filter Dropdown Selection and Filter Button Click
- Step 2 RHS Filter Dropdown Selection and Filter Button Click
*/
function filter() {
	var selectedOption = document.getElementById("page_filter").value;
	window.location.search ='?filter='+selectedOption; 
}

/*
Function: sort()
Sort the page thumbnails.

Page Actions:
- Step 1 RHS Sort Dropdown Selection and Sort Button Click
- Step 1 RHS Update Page and Sort True
- Step 1 RHS Updates Page and Sort True
- Step 2 RHS Sort Dropdown Selection and Sort Button Click
- Step 2 RHS Update Page and Sort True
- Step 2 RHS Updates Page and Sort True

Called Functions:
- <clearThumbnails()>
- <displayThumbnails()>
*/
function sort() {
	// Set the and filter strings
	sortString = $('#page_sort').val();
	filterString = $('#page_filter').val();

	// Remove current thumbnails from DOM
	clearThumbnails();
	
	// Display updated thumbnails
	displayThumbnails();
	
	issorting = true;
}

/*
Function: datetime()
Display the date and time in the footer.

Page Actions:
- Step 1 LHS Document Ready
- Step 1 RHS Document Ready
- Step 2 LHS Document Ready
- Step 2 RHS Document Ready
- Step 3 RHS Document Ready
- Step 3 Image Popup Window Document Ready
- Step 4 LHS Document Ready
- Step 4 RHS Document Ready

Called Functions:
- <datetime()>
*/
function datetime() {
	now=new Date();
	hour=now.getHours();
	min=now.getMinutes();
	sec=now.getSeconds();
	if (min<=9) { min="0"+min; }
	if (sec<=9) { sec="0"+sec; }
	if (hour<10) { hour="0"+hour; }
	document.getElementById("datetime").innerHTML=$.datepicker.formatDate('dd-mm-yy', now)+'  '+hour+':'+min+':'+sec;
	setTimeout("datetime()", 1000);
}

/*
Function: showhide(id)
Displays or hides a DOM element.

Parameters:
- id - The id of the DOM element to display/hide.

Page Actions:
- Step 2 RHS Show/Hide Button Click
*/
function showhide(id) { 
	if (document.getElementById){ 
		obj = document.getElementById(id); 
		if (obj.style.display == "none"){ 
			obj.style.display = ""; 	
		} else { 
			obj.style.display = "none";
		} 
	} 
} 

/*
doDateCheckNow(source)
Compare european formatted dates.

Parameters:
- source - ...

Page Actions:
- ...

function doDateCheckNow(source) {
	var oDate = source; //dd/mm/yyyy
	var arrDate = oDate.value.split("/");
	var useDate = new Date(arrDate[2], arrDate[1]-1, arrDate[0]);
	//yyyy/mm/dd
	var today = new Date();
	
	if (useDate.valueOf() < today.valueOf()) {
		alert(useDate+" was before "+today);
	} else {
		alert(useDate+" will be after "+today);
	}
}
*/

/*
Function: checkDateFormat(date)
Helps ensure a date is properly formatted based on the client's default date format.

Parameters:
- date - A date as a string or date.

Page Actions:
- Step 1 RHS Data Date Change
- Step 2 LHS Data Point Entry Dialog Date Change
- Step 2 RHS Data Date Change
*/
function checkDateFormat(date) {
	if(date.indexOf("\.") != -1 ){
		date = date.replace(/\./g,'/')
	}
	if(date.indexOf("-")!=-1){
		date = date.replace(/\-/g,'/');
	}
	if(date.indexOf("/")==-1){
		if(date.length == 8){
			var dayDeli = date.substr(0,2);
			var monthDeli = date.substr(2,2);
			var yearDeli = date.substr(4,8);
			date = dayDeli+"/"+monthDeli+"/"+yearDeli;
		}else if(date.length == 6){
			var dayDeli = date.substr(0,2);
			var monthDeli = date.substr(2,2);
			var yearDeli = date.substr(4,6);
			date = dayDeli+"/"+monthDeli+"/"+yearDeli;
		}
		else{
			alert("You entered an incorrectly formatted date.  Please use the format: " + clientDateFormat);
			return false;
		}
	}
	var splitDate = date.split("/");
	if (clientDateFormat == 'mm/dd/yyyy') {
		var regDateFormat = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;// For IWS-250 date validation In step 1, Data Date field for every page
		var themonth=splitDate[0];
		var theday=splitDate[1];
		var theyear=splitDate[2];
		if(theyear.length == 2 && theyear >= 00 && theyear <=49){ // for 00 scenario
			theyear = "20"+theyear;
		}
		if(theyear.length == 2 && theyear >= 50 && theyear <=99){
			theyear = "19"+theyear;
		}
		date = themonth+"/"+theday+"/"+theyear;
	} else if (clientDateFormat == 'dd/mm/yyyy') {
		var regDateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;// For IWS-250 date validation In step 1, Data Date field for every page
		var theday=splitDate[0];
		var themonth=splitDate[1];
		var theyear=splitDate[2];
		if(theyear.length == 2 && theyear >= 00 && theyear <=49){ // for 00 scenario
			theyear = "20"+theyear;
		}
		if(theyear.length == 2 && theyear >= 50 && theyear <=99){
			theyear = "19"+theyear;
		}
		date = theday+"/"+themonth+"/"+theyear;
	} 
	/*if (themonth > 12 || theday > 31 || theyear.length == 3 || theyear.length == 1) {  // For IWS-250 date validation In step 1, Data Date field for every page
		alert("You entered an incorrectly formatted date.  Please use the format: " + clientDateFormat);
		return false;
	} else {
		return true;
	}*/
	if(!regDateFormat.test(date) || theyear <= 1000 || theyear >= 3000){
		alert("You entered an incorrectly formatted date.  Please use the format: " + clientDateFormat);
		return false;
	}
	else{
		return true;
	}
}

/*
Function: dateContainsNumbers
Helps ensure a date is properly formatted based on the client's default date format.

Parameters:
- date - A date as a string or date.

Page Actions:
- Step 1 RHS Data Date Change
- Step 2 LHS Data Point Entry Dialog Date Change
- Step 2 RHS Data Date Change
*/

function dateContainsNumbers(event)
{
	var theEvent = event || window.event;
	var key = theEvent.keyCode || theEvent.which;
    //if (specialKey(key)) return true;
    if ((key >= 48 && key <= 57 && event.shiftKey==false) || (key >= 96 && key <= 105) || key == 189 || key == 190 || key == 191 || key == 109 || key == 110 || key == 111 || key == 8 || key == 9 || key == 46){ 
      return true
    }
    else{
    	return false;
    }
}

/*
Function: updateScreenOnFooter(oCase)
Display the Screen in the footer.

Parameters:
- oCase - The case object.

Page Actions:
- Step 1 LHS Document Ready
- Step 1 RHS Display Thumbnails
- Step 1 RHS Document Ready via Display Thumbnails
- Step 1 RHS Sort via Display Thumbnails
- Step 2 LHS Document Ready
- Step 2 RHS Display Thumbnails
- Step 2 RHS Document Ready via Display Thumbnails
- Step 2 RHS Sort via Display Thumbnails
- Step 3 RHS Document Ready
- Step 3 Image Popup Window Document Ready
- Step 4 RHS Document Ready
*/
function updateScreenOnFooter(oCase) {
	$("#screen").html("<b>Screen:</b><i>"+oCase.stage.name+"</i>");
}


/*
Function: showJQueryDialog(delement,dtitle,dcontent)
Jquery CSS Dialog Box.  A single instance of this dialog is
desired per page that is why var appDialog isdeclared outside 
the funtion.

Parameters:
- delement - The id or css name for the element to be used in dialog
- dtitle - The title for the dialog box
- dcontent - The content to display in the dialog body

Page Actions:
- Any
*/
var appDialog = null;
function showJQueryDialog(delement,dtitle,dcontent)
{
	var appDialogIsOpen = false;

	$(delement).click(function() {
		var position = $(delement).dialog( "option", "position" );
		
		if (appDialog == null)
			appDialog = createDialog(dtitle);

		if (!appDialogIsOpen) {
			appDialog.dialog('open');
			appDialog.dialog("option", "position", 'center');
			appDialog.html(dcontent);
			appDialogIsOpen = true;
		} else
		{
			appDialogIsOpen = false;
			appDialog.dialog('close');
				//Because of hidden double click on open dialog, pause and make sure window closes 
			killDialog();
			setTimeout('', 500);
		}		

		
		return false;
	});

	function createDialog(dtitle)
	{
		var snxJqueryDialog = $('<div></div>').dialog({
				autoOpen : false,
				title : dtitle
		});
		
		return snxJqueryDialog;
	}
	
	function killDialog()
	{
		if (appDialog != null)
		{
			appDialog.dialog('remove');
			appDialog = null;			
		}
	}		
}


/*
Function: commonHelpInfo()
Common help or info dialog box

Parameters:
- objCase - The case object with help information 
- delement - The id or css name for the element to be used in dialog
- dialogtitle - The title for the dialog box

Page Actions:
Any
*/
function commonHelpInfo(objCase, delement, dialogtitle,showalways) {
	if (objCase!=null) {
		var clientHelpText = objCase._client.specs;
		if (showalways!=null && showalways)
		{
		    // Display Client Help Text if it is defined.
	    	showJQueryDialog(delement,dialogtitle ,clientHelpText);    	
	        $(delement).css('display','block');		
		} else
		{
		    if (clientHelpText && clientHelpText != '') {
		    	showJQueryDialog(delement,dialogtitle,clientHelpText);    	
		        $(delement).css('display','block');
		    } else {
		        $(delement).css('display','none');
		    }					
		}
	}
}


/*
Function: showClickJQueryDialog()
Common help or info dialog box to be used via javascript onclick action.
Some times I don't want to setup the Jquery click event via IWS method. 
I only want to use javascript onclick event, hence this method.

Parameters:
- objCase - The case object with help information 
- delement - The id or css name for the element to be used in dialog
- dialogtitle - The title for the dialog box

Page Actions:
Any
*/
function showClickJQueryDialog(delement,dtitle,dcontent)
{
	if (appDialog == null)
	{
		appDialog = createDialog(dtitle);
		appDialog.dialog('open');
		appDialog.dialog("option", "position", 'center');
		appDialog.html(dcontent);
	} else
	{
		if(appDialog!= null)
		{
			appDialog.dialog('close');
		}
		appDialog = null;
		setTimeout('', 500);
	}		


	function createDialog(dtitle)
	{
		var snxJqueryDialog = $('<div></div>').dialog({
				autoOpen : false,
				title : dtitle
		});
		
		return snxJqueryDialog;
	}
}

/**
 *Function: capitalize()
 * Common help  capitalize to be used via javascript onKeyPress action .
 * For auto capitalize first character in String
 */
function capitalize (event) {
    if(qsStageId==STEP2_TR)
    {
        var text=$('#step2tr_transcrition').val();
         var textlength=$('#step2tr_transcrition').length;
         if(event.keyCode==32)
        {
         if(textlength>0)
        $('#step2tr_transcrition').val(text.charAt(0).toUpperCase() + text.slice(1));
        }
    }
    else if(qsStageId==STEP2_OP){
    var id= event.currentTarget.id;
 if((id.split("_"))[4]=="null"){    
    var text=$('#'+id+'').val();
    var textlength=$('#'+id+'').length;
    if(event.keyCode==32)
        {
    if(textlength>0)
        $('#'+id+'').val(text.charAt(0).toUpperCase() + text.slice(1));
        }
    }
    }
}
/**
 *Function: capitalizeOnBlur()
 * Common help  capitalize to be used via javascript onblur action .
 * For auto capitalize first character in String
 */
function capitalizeOnBlur () {
     var id= event.currentTarget.id;
     if((id.split("_"))[4]=="null"){    
    var text=$('#'+id+'').val();
    var textlength=$('#'+id+'').length;
        if(event.keyCode==32)
            {
            if(textlength>0)
             $('#'+id+'').val(text.charAt(0).toUpperCase() + text.slice(1));
            }
        }
}
/**
 *return objectCase  
 */
function getCaseObject()
{
   var  sortString = 'nosort_subDocumentOrder_subDocumentPageNumber_originalPageNumber_asc';
   var  filterString =  'nofilter'
        $.ajax({
        url: "sortcases/" + caseId + "/" + sortString + "/" + filterString +"/"+ qsStageId ,
        async:false,
        success: function(c){
            objCase = c;
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "getCaseObject()", errorThrown);
        }
    });
}

/**
 * On cancel the escapse the popup and move highlight from the DP entry line.
 * 
 */
function cancelDataPointsTranscript(){
     $('#data_point_transcript').css('display','none');  
     $('#popup_tr_error_message').css('display','none');
     
     var rowNum = $('#step2tr_cancel_popup').val();     
     if (setTranscriptText != null){
    	 $('#datapointrow' + rowNum).css('background-color','darkSeaGreen');
     }else{
	     if (parseInt(rowNum) % 2 == 0){
	    	 $('#datapointrow' + rowNum).css('background-color','#E2E2E2');
	     }else{
	    	 $('#datapointrow' + rowNum).css('background-color','white');
	     }
	}
}

/**
 * open a popup code description window when click on any code 
 */
function openCodeDescriptionPopUp(codeType, code, codeDescription, rowNum,codeScale){
    if ($('#code_desc_popup').css('display') == 'block')
    closeCodeDescriptionPopUp();
    
    //if (qsStageId == 49 && $('#data_point_transcript').css('display') == 'block')
    //cancelDataPointsTranscript();
    
    var offsetTop = $('#datapointrow' + rowNum).offset().top + 20;
    var offsetLeft = ($('#datapointrow' + rowNum + ' td#code').offset().left) - 200;
    // Set the location of the code description popup
    $('#code_desc_popup').offset({left: offsetLeft, top:offsetTop});
    // Dispaly the code description popup window
    $('#code_desc_popup').css('display','block');
    $('#lblcodetype').html(codeType);
    $('#lblcodevalue').html(code);
    $('#lblcodedescription').html(codeDescription);
    if(codeScale==3)
    	$('#lblcodedescription').css({color : 'red' ,'font-weight' : 'bold'});
    else if(codeScale==2)
    	$('#lblcodedescription').css({color : '#AF4203' ,'font-weight' : 'bold'});
    else
    	$('#lblcodedescription').css({color : 'black' ,'font-weight' : 'normal'});
}

/**
 * Close the popup code description window when click on the cross image 
 */
function closeCodeDescriptionPopUp(){
     $('#code_desc_popup').css('display','none'); 
}

/**
 * Users need ability to modify the ICD code, Section or Page for a Datapoint that has been Transcribed and entered
 */
function openPopupForCorrectCodeSectionPageData(code, page, section, dpEntryId, codeRevision, pageId, codeId){
	// add overlay div to disable the parent page
	$("body").append('<div class="modalOverlay">');
	
	var offsetTop = $('#codePagePopup_' + dpEntryId + '_' + code).offset().top + 70;
	var offsetLeft = $('#codePagePopup_' + dpEntryId + '_' + code).offset().left;
	$('#dp_code_section_page_change').offset({left: offsetLeft, top:offsetTop});
	$('#dp_code_section_page_change').css('display','block');
    $('#lblCurrentCode').html('Code: <u>' + code + '</u>');
    $('#lblCurrentPage').html('Page: <u>' + page + '</u>');
    $('#lblCurrentSection').html('Section: <u>' + section + '</u>');
    $('#dp_entry_validation').html('');
	$('#popupNewCode').val("");
	$('#popupNewPage').val("");
	$('#popupNewSection').val("");
    $('#IWS_Code_Revision').val(codeRevision);
    $('#IWS_Popup_dpEntryId').val(dpEntryId);
    $('#IWS_Popup_pageId').val(pageId);
    $('#IWS_Popup_codeId').val(codeId);
    $('#IWS_Old_Code').val(code);
    $('#popupNewCode').val(code);
    
}
/**
 * Close popup window without making any changes
 */
function closeDPEntryPopup(){
	// remove overlay div to enable the parent page
	$("div").removeClass("modalOverlay");
	
	if ($('#dp_entry_validation').css('display') == 'block')
		$('#dp_entry_validation').css('display','none');
		
	$('#dp_code_section_page_change').css('display','none');
}

/**
 * Close Client Spec helptext popup.
 */
function helpTextClose(){
	if ($('#client_spec_helptext_popup').css('display') == 'block')
		$('#client_spec_helptext_popup').css('display','none');
}

function saveDPEntryPopupData(){
	var newCode = $('#popupNewCode').val().trim();
	var newPage = $('#popupNewPage').val().trim();
	var section = $('#popupNewSection').val().trim();
	var revision = $('#IWS_Code_Revision').val().trim();
	var pageId = "";
	var enterPage = parseInt(newPage);	
	var errorMessage = "";
	var codeId = $('#IWS_Popup_codeId').val();
	var updatedCode; 
	var updatedCodeDescription;
	var prevCode = $('#IWS_Old_Code').val();
	var url = "";
	
	//If there is no field entered
	if (newPage == "" && section == ""){
		alert("Please enter at least one field from the above two field (New Page, New Section) before you press save...");
		$('#popupNewPage').focus();
		return;
	}
	
	if (newCode == ""){ newCode = prevCode; }
	
	//need to replace all "." with "*" to avoid spring issue with truncation due to thinking the . is for a file extension
	url= "dataPoint/medicalCode/" + newCode.replace(/\./g , "*") + "/" + revision.replace(/\./g , "*");
    
    // Verify whether the code exist in the database or not?
	$.ajax({
		url: url,
		context: document.body,
		async: false,
		success: function(existCodeEntry) {
			if(existCodeEntry.length == 0){
				errorMessage = "Invalid Code. ";
			}else{
				// remove overlay div to enable the parent page
				$("div").removeClass("modalOverlay");
				codeId = existCodeEntry[0].id;
				updatedCode = existCodeEntry[0].name;
				updatedCodeDescription = existCodeEntry[0].description;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert ('There was an error while checking correct code.');
		}
	});	
	
	var totalPages = objCase.pages.length;
	// Validation for Page (final page)
	if(newPage != ""){
		if (enterPage == NaN){
			errorMessage = errorMessage + "New Page is Invalid. ";
		}else{
			var flag = false;
			for(var j=0; j < totalPages; j++){
				if(objCase.pages[j].finalPageNumber == enterPage){
					errorMessage = errorMessage + "";
					flag = true;
					break;
				}
			}
			if(!flag)
			errorMessage = errorMessage + "New Page is Invalid. ";
		} 
	}
	
	// Validation for Section and Section Range.
	var validSecRange;
	if (section != ""){
		validSecRange = section.split("-");
		if(validSecRange.length < 3){
			if (validSecRange.length == 1){
				if(parseInt(validSecRange[0]) > 0 && parseInt(validSecRange[0]) < 46)
					errorMessage = errorMessage + "";
				else
					errorMessage = errorMessage + "Invalid Section. ";
			}else{
				if (parseInt(validSecRange[0]) > 0 && parseInt(validSecRange[0]) < 46 && parseInt(validSecRange[1]) > 0 && parseInt(validSecRange[1]) < 46 && parseInt(validSecRange[0]) <= parseInt(validSecRange[1]))
					errorMessage = errorMessage + "";
				else
					errorMessage = errorMessage + "Invalid Section range. ";
			}
		}else{
			errorMessage = errorMessage + "Invalid Section entry. ";
		}
	}

	if (errorMessage != ""){
		// add overlay div to disable the parent page
		$("body").append('<div class="modalOverlay">');
		$('#dp_entry_validation').html(errorMessage);
		$('#dp_entry_validation').css('display','block');
	}else{
		var dpEntryId = $('#IWS_Popup_dpEntryId').val().trim();
		
		if (newPage == "" || enterPage == NaN)
			pageId = $('#IWS_Popup_pageId').val().trim();
		else{
		    for(var i=0;i<objCase.pages.length;i++){
		        if(enterPage==objCase.pages[i].finalPageNumber)
		        {
		            pageId = objCase.pages[i].id;
		            break;
		        }
		    }
		    
			//pageId = objCase.pages[enterPage-1].id;
			}
		
		var map = new Object();
		map['_page'] = pageId;
		map['_medicalHierarchy'] = codeId;
		
		if (section != ""){
			if(validSecRange.length < 3){
				if (validSecRange.length == 1){
					map['startSectionNumber'] = parseInt(validSecRange[0]);
					map['endSectionNumber'] = parseInt(validSecRange[0]);
				}else{
					map['startSectionNumber'] = parseInt(validSecRange[0]);
					map['endSectionNumber'] = parseInt(validSecRange[1]);				
				}
			}
		}
		// Need to remove this entry later as we have to remove the referecne of dataPointFormEntity table in coming future. NEED TO REMOVE
		map['_dataPointFormEntity'] = 326;
		
		$.ajax({
			type: 'POST', 
			url: "dataPoint/medicalCode/" + dpEntryId,
			context: document.body,
			async: false,
			data : {
				'_method' : 'PUT',
				entry : map
			},
			success: function(updatedNewCode) {
				$('#dp_code_section_page_change').css('display','none');
				if (prevCode != updatedCode){
			      if(medicalCodes != null){
		            for ( var j = 0; j < medicalCodes.length; j++) {
		                //Click selected code
		               if(medicalCodes[j].name == prevCode){
		                	sendValueToDPSection('auto', medicalCodes[j].name , medicalCodes[j].description , medicalCodes[j].id , medicalCodes[j].id , medicalCodes[j].id,null,"","","");
		                	break;
		               }
		            }       
			      }
				}
			sendValueToDPSection('auto', updatedCode , updatedCodeDescription , codeId , codeId , codeId, null, "", "", "");
			setTimeout(updateSuccessMsg(dpEntryId, prevCode),3000);
			$('#update_message_popup').fadeOut(3000);
			//$('#update_message_popup').css('display','none');
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert ('There was an error while updating the Code/Page/Section.');
			}
		});	
	}
}
/*
 * Show the updated message.... 
 */
function updateSuccessMsg(dpEntryId, prevCode){
	var offsetTop = $('#codePagePopup_' + dpEntryId + '_' + prevCode).offset().top + 50;
	var offsetLeft = $('#codePagePopup_' + dpEntryId + '_' + prevCode).offset().left;
	$('#update_message_popup').offset({top: offsetTop, left: offsetLeft});
	$('#update_message_popup').css("height","25px");
	$('#update_message_popup').css('display','block');
}

function callApexUrl()
{
    var buttonMainMenuApexUrl=null;
    // For Apex URL Hitting
    if (ssl == true || ssl == 'true') {
    	buttonMainMenuApexUrl = "https://";
    } else {
    	buttonMainMenuApexUrl = "http://";
    }
    buttonMainMenuApexUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + "5555" + ':' + apexSessionId;
    var div = document.getElementById('div1');
    div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + buttonMainMenuApexUrl + '" />';
            // For Apex URL Hitting
}

function getDocTypesForPOP()
{
   var  docTypes=null;
        $.ajax({
        url: "sortcases/" + caseId + "/"+ qsStageId ,
        async:false,
        success: function(doc){
            docTypes = doc;
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
            displayErrorDialog(dateTime, userName, sessionId, caseId, "getDocTypesForPOP()", errorThrown);
        }
    });
    return docTypes;
}

