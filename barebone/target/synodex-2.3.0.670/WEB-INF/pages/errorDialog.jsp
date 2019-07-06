<script>
	var errorParams = window.dialogArguments;
	
	$(document).ready(function () {
		var errorMessage = "An error occurred. Try again or contact an administrator."
		
		// Override the body width from styles.css
		$('body').css('width','100%');
		
		// Update the textarea with the error details.
		var htmlString = '<p>' + errorMessage + '</p>';
		htmlString += '<p><textarea style=\"width: 80%;height: 215px;\">';
		htmlString += 'Datetime: ' + errorParams[0] + '\n';
		htmlString += 'Session Id: ' + errorParams[2] + '\n';
		htmlString += 'Apex Session Id: ' + errorParams[7] + '\n';
		htmlString += 'IP Address: ' + errorParams[8] + '\n';
		htmlString += 'User Name: ' + errorParams[1] + '\n';
		htmlString += 'Case Id: ' + errorParams[3] + '\n';
		htmlString += 'Stage: ' + errorParams[4] + '\n';
		htmlString += 'Function: ' + errorParams[5] + '\n';
		htmlString += 'Error: ' + errorParams[6] + '\n';
		htmlString += '</textarea></p>';
		htmlString += '<p><button onclick="window.close()">Continue</button></p>';
		htmlString += '<div id="datetime"></div>';
		$('body').html(htmlString);
	});
</script>


<p><textarea id="txtErrorHandlerMessage"></textarea></p>