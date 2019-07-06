<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ include file="/common/taglibs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
    <head>
        <%@ include file="/common/meta.jsp" %>
        <title><decorator:title/> | <fmt:message key="webapp.name"/></title>
        
        <script>
        var pageStartLoadTime = new Date();
        var pageStopLoadTime;
        var pagesLoaded = 0;
        </script>
        <style type="text/css">
         #idletimeout { background:#CC5100; border:3px solid #FF6500; color:#fff; font-family:arial, sans-serif; text-align:center; font-size:12px; padding:10px; position:relative; top:0px; left:0; right:0; z-index:100000; display:none; }
         #idletimeout a { color:#fff; font-weight:bold }
         #idletimeout span { font-weight:bold }
         #dialog { background:#CC5100; border:3px solid #FF6500; color:#fff; font-family:arial, sans-serif; text-align:center; font-size:12px; padding:10px; position:relative; top:0px; left:0; right:0; z-index:100000; display:none; }
         #dialog a { color:#fff; font-weight:bold }
         #dialog span { font-weight:bold }
         </style>
        <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/styles/${appConfig["csstheme"]}/theme.css'/>" />
        <link rel="stylesheet" type="text/css" media="print" href="<c:url value='/styles/${appConfig["csstheme"]}/print.css'/>" />
        <link rel="stylesheet" type="text/css" href="<c:url value='/styles/globals.css'/>" />
        <link rel="stylesheet" type="text/css" href="<c:url value='/styles/style.css'/>" />
        <link rel="stylesheet" type="text/css" href="<c:url value='/styles/jquery.ui.1.7.1.custom.css'/>" />

        <!-- JS Helper Methods -->
        <script type="text/javascript" src="<c:url value='/scripts/global_helper.js'/>"></script>
        
        <!-- JS Debug Helper Methods -->
        <script type="text/javascript" src="<c:url value='/scripts/step.debug_helper.js'/>"></script>

        <!-- JQuery Core Libraries -->
        <script type="text/javascript" src="<c:url value='/scripts/jquery.1.6.2.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/scripts/jquery.ui.1.8.13.min.js'/>"></script>
        
         <!-- JQuery Plugin for idletimer -->
        <script type="text/javascript" src="<c:url value='/scripts/jquery.idletimer.js'/>"></script>
        <!-- JQuery Plugin for idletimeout -->
        <script type="text/javascript" src="<c:url value='/scripts/jquery.idletimeout.js'/>"></script>
        
        
        <!-- JQuery Plugin for Expanding Textarea -->
        <script type="text/javascript" src="<c:url value='/scripts/jquery.exptextarea.js'/>"></script>

        <!-- JQuery Plugin for Offsets -->
        <script type="text/javascript" src="<c:url value='/scripts/jquery.offset.js'/>"></script>
        
        <!-- Ajax Error Handler Helper Functions -->
		<script type="text/javascript" src="<c:url value='/scripts/ajax.error.handler.js'/>"></script>
        
        <script>
      //Start This call for Exclude Cover Page 
        var excludePageRegionObject = null;
        var excludeData =''; 
        var port = "7788";
		$.ajax({
		    type: "GET",
		    url: "lovLabel/lovLabelExcludePage/"+port,
		    success: function(data) {
		    	excludePageRegionObject = data;
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
		            alert($.trim('Error: '+textStatus+' - '+errorThrown));
		    }
		}); 
		//End This call for Exclude Cover Page
		    var text = text || {}; // play well with other jsps on the page
		    text.synodex = {
		        not_excluded_message: "<fmt:message key="exclude.notexcluded"/>",
		        excluded_coverpage_message: "<fmt:message key="exclude.coverpage"/>",
		        excluded_blankpage_message: "<fmt:message key="exclude.blankpage"/>",
		        excluded_duplicatepage_message: "<fmt:message key="exclude.duplicate"/>",
		        include_message: "<fmt:message key="exclude.include"/>"
		    };
		</script>

        <decorator:head/>
    </head>
   
<!--IWS 285,310  Sizing and placement of the image panel on the page view window -->

<body id="step_window" <decorator:getProperty property="body.id" writeEntireProperty="true"/><decorator:getProperty property="body.class" writeEntireProperty="true"/>>
<div id="wrapper">
<div id="dialog" title="Your session is about to expire!">
<p>
<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>
You will be logged off in <span id="dialog-countdown" style="font-weight:bold"></span> seconds.
</p>

<p>Do you want to continue your session?</p>
</div>

    <div id="page">
        <div id="header" class="clearfix">
            <jsp:include page="/common/synodex-header.jsp"/>
        </div>
        
        <c:set var="currentMenu" scope="request"><decorator:getProperty property="meta.menu"/></c:set>
            <c:if test="${currentMenu == 'AdminMenu'}">
            <div id="sub">
                <menu:useMenuDisplayer name="Velocity" config="cssVerticalMenu.vm" permissions="rolesAdapter">
                    <menu:displayMenu name="AdminMenu"/>
                </menu:useMenuDisplayer>
            </div>
            </c:if>
			<div id="menucontainer">

 			</div>

        <div id="content" class="clearfix">
            <div id="main">
                <%@ include file="/common/messages.jsp" %>
                <hr />
                <!--  
                <h1><decorator:getProperty property="meta.heading"/></h1>
                -->
                <decorator:body/>
            </div>

            
        </div>

        <div id="footer" class="clearfix">
            <jsp:include page="/common/synodex-footer.jsp"/>
        </div>
    </div>
    
    <div id="div1" style="width:400px;height:200px;border:1px solid #ddd;display: none;"></div>
    
</div> 

       
       
        
<script type="text/javascript">
// setup the dialog
$("#dialog").dialog({
autoOpen: false,
modal: true,
width: 400,
height: 200,
closeOnEscape: false,
draggable: false,
resizable: false,
buttons: {
'Yes, Keep Working': function(){
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
$(this).dialog('close');
},
'No, Logoff': function(){
// fire whatever the configured onTimeout callback is.
// using .call(this) keeps the default behavior of "this" being the warning
// element (the dialog in this case) inside the callback.
$.idleTimeout.options.onTimeout.call(this);
}
}
});

// cache a reference to the countdown element so we don't have to query the DOM for it on each ping.
var $countdown = $("#dialog-countdown");

// start the idle timer plugin
$.idleTimeout('#dialog', 'div.ui-dialog-buttonpane button:first', {
idleAfter: ${(pageContext.session.maxInactiveInterval-300) },
//pollingInterval: 2,
//keepAliveURL: 'keepalive.php',
//serverResponseEquals: 'OK',
onTimeout: function(){
	var buttonLogoutUrl = "http://";
	if (ssl == true || ssl == 'true')
		buttonLogoutUrl = "https://";
	buttonLogoutUrl += domain + ":" + port + "/pls/apex/wwv_flow_custom_auth_std.logout?p_this_flow=" + appId + '&p_next_flow_page_sess=' + appId + ':1:' + apexSessionId;
	window.location = buttonLogoutUrl;
},
onIdle: function(){
$(this).dialog("open");
},
onCountdown: function(counter){
$countdown.html(counter); // update the counter
     if(counter == 300){ // here counter 300 i.e in IWS Application session expire warning started, so 300 mean, 300 second(5 minute) to left for IWS application going to Logout 
		if (ssl == true || ssl == 'true') {
			buttonMainMenuApexUrl = "https://";
		} else {
			buttonMainMenuApexUrl = "http://";
		}
		buttonMainMenuApexUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + "5555" + ':' + apexSessionId;
		var div = document.getElementById('div1');
		div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + buttonMainMenuApexUrl + '" />'; 
         }// so in this condition we are hitting the Apex URL
}
});

</script>   
</body>
</html>
