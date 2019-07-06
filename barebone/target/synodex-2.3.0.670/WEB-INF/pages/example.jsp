<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="mainMenu.title"/></title>
    <meta name="heading" content="<fmt:message key='mainMenu.heading'/>"/>
    <meta name="menu" content="MainMenu"/>
</head>

<p><fmt:message key="mainMenu.message"/></p>

<div>Hello World!</div>

<a href="#" onclick="javascript: runExample(); return false;">Run AJAX Example...</a>

<script type="text/javascript">
function runExample() {
	// Get a case by ID (with pages includes)
	// jQuery.ajax({
	// 	url : '/cases/1',
	// 	success : function(c) {
	// 		alert(c.pages.length);
	// 	}
	// });
	/*jQuery.ajax({
		url : 'pages/1',
		success : function(page) {
			page.orientation = -1;
			updatePage(page);
		}
	});
	//rotatePages('1', 180);
	
	//List out all document types
	jQuery.ajax({
		url : 'document_types',
		success : function(types) {
			
		}
	});*/
	
	updatePages();
}

function rotatePages(pageIds, orientation) {
	jQuery.ajax({
		url : 'pages/rotate',
		data : { pageIds : pageIds, orientation: orientation },
		success : function(c) {
			alert(c);
		}
	});
}

//Not I am throwing exceptions currently if property names are invalid, so make sure to use property name 
// that was used when retrieved from the server.
function updatePage(page) {
	page.badHandwriting = true;
	jQuery.ajax({
		type : 'POST',
		url : 'pages/' + page.id,
		data : {
			'_method' : 'PUT',
			page : page
		},
		success : function(msg) {
			alert(msg);
		}
	});
}

function updatePages() {
	page.badHandwriting = true;
	jQuery.ajax({
		type : 'POST',
		url : 'pages',
		data : {
			'_method' : 'PUT',
			pages : [
				{ id : '1', finalPageNumber : 1 },
				{ id : '2', finalPageNumber : 2 },
				{ id : '3', finalPageNumber : 3 }]
		},
		success : function(msg) {
			alert(msg);
		}
	});
}
</script>
