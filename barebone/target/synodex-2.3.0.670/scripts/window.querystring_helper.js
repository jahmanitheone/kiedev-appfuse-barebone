/* 
File: window.querystring_helper.js
Responsible for retrieving querystring values and storing them to global variables.

Loaded In Steps:
- Step 1 RHS - <step1.jsp>
- Step 2 RHS - <step2.jsp>
- Step 3 RHS - <step3.jsp>
- Step 4 RHS - <step4.jsp>
*/

// Application Variables
var caseId;
var apexSessionId;
var appId;
var appScreen;
var port;
var domain;
var ssl;

// Sort.Filter Variables
var sortString;
var filterString;

var debug;

/*
Function: getQuerystringValues()
Store global application variables retrieved from the querystring.  Variables include Case Id, Apex Session Id, App Id, App Screen, Port, Domain, SSL, Sort String and Filter String.

Page Actions:
- Step 1 RHS Document Ready
- Step 2 RHS Document Ready
- Step 3 RHS Document Ready
- Step 4 RHS Document Ready
*/
function getQuerystringValues() {
	// Get the querystring parameters.
	var urlParams = {};
	(function () {
		var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = window.location.search.substring(1);

		while (e = r.exec(q))
			urlParams[d(e[1])] = d(e[2]);
	})();

	// Store querystring values to global variables.
	caseId = urlParams["caseId"];
	apexSessionId = urlParams["apexSessionId"];
	appId = urlParams["appId"];
	appScreen = urlParams["appScreen"];
	
	port = urlParams["port"];
	domain = urlParams["domain"];
	ssl = urlParams["ssl"];
	
	sortString = urlParams["sort"];
	filterString = urlParams["filter"];
	
	debug = urlParams["debug"];
	if (debug == null || debug == "") {
		debug = "0";
	}
}

getQuerystringValues();