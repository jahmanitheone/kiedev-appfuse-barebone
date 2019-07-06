<html>
<%@ include file="/common/taglibs.jsp"%>
<head>
	<!-- Window Resizing -->
    <script type="text/javascript" src="<c:url value='/scripts/window.lhs.resize_helper.js'/>"></script>
	
	<!-- Content Viewer Popup Window Helper Functions -->
	<script type="text/javascript" src="<c:url value='/scripts/content.viewer.window_helper.js'/>"></script>

	<!-- Used to check form isEmpty function -->
	<script type="text/javascript" src="<c:url value='/scripts/global.js'/>"></script>


	<script>
	/*
	* Create the ICD10 Code version going back (YRLIMIT) years
	* To allows clients to search for next year released codes, add 1 year to current version
	*/
	function createId10CodeVersion()
	{
		var currentYear = window.opener.objCase.codeVersion;
		if(isEmpty(currentYear))
		{
			alert("No ICD10 version was retrieved.");
			currentYear = "INVALID"
		}
		var icd10versions = new Array();
		icd10versions[0] = currentYear;

        var selector = '<select id="icdcodeverselector">';
        for(var i=0;i<icd10versions.length;i++)
        {        	
            var selected = "selected";

			selector += '<option value="'+icd10versions[i]+'" ' +selected+'>'+icd10versions[i]+'</option>';
        }
        selector += '</select>';
        $('#icdcodeversions').html(selector);
	}
	
	/*
	* Create the ICD10 Code types
	*/
	function createId10CodeTypes()
	{
		var caseCodeType = window.opener.objCase.codeType;
		if(isEmpty(caseCodeType))
		{
			alert("No ICD10 codetype was retrieved.");
			caseCodeType = "INVALID"
		}
		var icd10codetypes = new Array();
		icd10codetypes[0] = caseCodeType;
		
		var selector = '<select id="icdcodetypeselector">';
        for(var i=0;i<icd10codetypes.length;i++)
        {
            var selected = "selected";
        	selector += '<option value="'+icd10codetypes[i]+'" '+selected+'>'+icd10codetypes[i]+'</option>';
        }
        selector += '</select>';
        $('#icdcodetypes').html(selector);
	}
	
	$(document).ready(function () {
		// Move the popup window to the top left corner.  This also ensures the bottom is aligned.
		window.moveBy(-window.screen.availWidth,-window.screen.availHeight);
		
		$('#header').css('display','none');
		$('#nav').css('display','none');
		$('#branding').css('display','none');
		$('#footer').css('display','none');
		
		createId10CodeVersion();
		createId10CodeTypes();
	});
	
	//send code and description to parent window
	function sendValueToParentWindow(code,desc,masterCodeId,codeType,version){
	 	var selvalue = code;
		var seldesc = desc;
		var masterId = masterCodeId;
		var type = codeType;
		var codeVersion = version;	
	    var tbl = window.opener.document.getElementById('codeTable');
	    
	    var enteredcodes = window.opener.enteredcodes;
		var isAcceptedCodePresent = window.opener.validateICD10Input(code);
	    if (isAcceptedCodePresent)
	    {
	    	alert(code + " already exist for this datapoint!");
	    } else
    	{
	    	window.opener.enteredcodes += code + ",";
	    	
		    var newRowCount = tbl.rows.length;
			var newRow = tbl.insertRow(newRowCount - 1);
			var randomnumber = Math.floor(Math.random()*100);
			var newRowCount = selvalue.replace("." , "") + "_" + codeVersion + "_" + newRowCount + randomnumber;
			newRow.id = newRowCount;
			//var newRow = tbl.insertRow(1);
			var newCell1 = newRow.insertCell(0);
			var newCell2 = newRow.insertCell(1);
			var newCell3 = newRow.insertCell(2);
			newCell1.innerHTML = '<form name ="codeInput"><input type=\"hidden\" name =\"version\" value=\"'+ codeVersion +'\" /><input type=\"hidden\" name =\"type\" value=\"'+ type +'\" /><input type=\"hidden\" name =\"master\" value=\"'+ masterId +'\" /><input type=\"hidden\" name =\"code\" value=\"'+ selvalue +'\" /><input type=\"hidden\" name =\"codeDescription\" value=\"'+ seldesc +'\" />entered by user';
			newCell2 .innerHTML ='<span class=\"codeCell\">' + selvalue + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<span id=\"codeDeleteCell\" onClick=\"deleteCodePrompt(\''+newRowCount+'\',\''+selvalue+'\');\"><img title="Delete this code row entry" style=\'margin-top:4px\' src="images/garbage-icon.gif"/> (delete)</span>';
			newCell3.innerHTML = '<span>'+ seldesc + '</span></form>';     	
    	}	    
	
		window.close();
	}
	
	//function to query db for results matching user input
	function codeLookup() {
		code = document.getElementById('userIn').value;
		icdcodetype = document.getElementById('icdcodetypeselector').value;
		icdcodever = document.getElementById('icdcodeverselector').value;
		
		var checkDescription = /^[A-Za-z0-9]{0,20}$/;
		if (checkDescription.test(code)){
		if (code != '') {
			var searchResultsHtml = '<table id = \"searchResultsTable\">';
			var searchHead = ["ICD code", "Description"];
			var searchHeadId = ["searchTableIcdcode", "searchTableDescriptionHeaderColumn"];
			for(var k in searchHead) {
				searchResultsHtml +='<th id=\"'+ searchHeadId[k] + '\">' + searchHead[k] +'</th>';
			}
			searchResultsHtml += '</tr><tr>';
			$.ajax({
				url: "dataPointEntryCode/loadMedicalCode/"+ code +"/" + icdcodetype + "/" + icdcodever,
				async:   false,
				context: document.body,
				success: function(c) { 
					if (c.length > 0) {
						for (var i = 0; i < c.length; i++) {
							//if the description has a single quote we must replace it with the special character html to prevent JavaScript errors
							description = c[i].description .split("'").join("&rsquo;");
							//add code type to be sent on click and in the blank <td>
							searchResultsHtml +='<td class=\"searchTableMedicalCode\" onClick="sendValueToParentWindow(\'' + c[i].code + '\' , \'' + description+'\' , \'' + c[i].codeid  +'\' , \'' + c[i].codeType +'\' , \'' + c[i].version +'\');">' + c[i].code +'</td>';
							/* searchResultsHtml +='<td class=\"searchTableCustomerCritical\">' + c[i].customerCritical +'</td>';
							searchResultsHtml +='<td class=\"searchTablecommonCode\">' + '</td>'; */
							searchResultsHtml +='<td class=\"searchTableDescription\">' + description +'</td></tr>';
						}
						searchResultsHtml += '</table>';
					} else {
						alert('no results found.');
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert ('There was an error. call: codeLookup()');
					}
			});
			document.getElementById('searchResults').innerHTML = searchResultsHtml;	
		}//end  code != ''
		 else {
			alert('please enter a description.');
		}
		}//end regex 
		else 
			alert('Special characters cannot be included in a search.');
	}
	
	function clearTable(){
		alert('functioncalled');
		document.getElementById('searchResults').innerHTML = '';
	}

	</script>
</head>
<body>

	<div id="searchPageHead" ><h3><fmt:message key='messages.searchBoxHeader'/></h3></div>
	
	<div id ="searchOptions">
		<h5>
			<fmt:message key='messages.searchByDescription'/>: <input type="text" id="userIn" name="descriptionInput"/>
			&nbsp;
			Type <span id="icdcodetypes"></span>
			&nbsp;
			Version <span id="icdcodeversions"></span>
		</h5>
		<%-- <div id ="filterWrapper">
			<h5><fmt:message key='filter.header'/></h5>
			<p id="step3SearchFilterParagraph"><input type="checkbox" name="ClientCriticalICDListing" disabled="disabled"/> <fmt:message key='filter.clientCritical'/><br/>
			<input type="checkbox" name="MostCommonICDListing" checked/><fmt:message key='filter.mostCommon'/><br/>
			<input type="checkbox" name="EntireICDREpository" disabled="disabled"/><fmt:message key='filter.entire'/></p>
		</div> --%>
		<button class="bodybutton" onClick="codeLookup()"><fmt:message key='button.search'/></button>
		<button class="bodybutton" onClick="document.getElementById('searchResults').innerHTML = '';"><fmt:message key='button.clear'/></button>
		<button class="bodybutton" onClick="window.close();"><fmt:message key='button.close'/></button>
	</div>
	
	<div id="searchResultsWrapper">
		<h3 id="step3SearchResults"><fmt:message key='messages.filterResults'/></h3>
		<div id="searchResults"></div>
	</div>
	
	<div id="bottomButtons" style="text-align:center;">
		<button id="search" class="bodybutton" onClick="codeLookup()"><fmt:message key='button.search'/></button>
		<button id="clear" class="bodybutton" onClick="document.getElementById('searchResults').innerHTML = '';"><fmt:message key='button.clear'/></button>
		<button id="close" class="bodybutton" onClick="window.close();"><fmt:message key='button.close'/></button>
	</div>

</body>
</html>


