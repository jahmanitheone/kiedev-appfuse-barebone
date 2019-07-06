<head>
    <title>Glossary for Code Look Up</title>
    <script>
		var appId = window.opener.appId;
		var appScreen = window.opener.appScreen;
		var apexSessionId = window.opener.apexSessionId;
		var buttonMainMenuUrl = window.opener.buttonMainMenuUrl;
		var domain = window.opener.domain;
		var port = window.opener.port;
		var ssl = window.opener.ssl;
	
		$(document).ready(function () {
			// Close the popup window when the parent window closes.
			window.opener.setUnload();
			
			// Set the Main Menu URL and Logout button.
			// Re-direct user to Main Menu.
			if (ssl == true || ssl == 'true') {
				buttonMainMenuUrl = "https://";
			} else {
				buttonMainMenuUrl = "http://";
			}
			buttonMainMenuUrl += domain + ":" + port + "/pls/apex/f?p=" + appId + ':' + appScreen + ':' + apexSessionId;
			$('#buttonMainMenu').attr('onClick','window.opener.location.href = \"' + buttonMainMenuUrl + '\"');
			$('#buttonLogout').attr('onclick','window.opener.userLogout()');
		});
    </script>
</head>

<div id="sweep_l_wrapper">
<jsp:include page="glossary/glossary.html" />
</div>

