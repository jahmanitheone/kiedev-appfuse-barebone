/**
 *  Reusable Popup Fading Message
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

/* Function: popupFadeAwayMsg(msg,bgcolor,targettag,delay)
 *
 * Popup a message that fades away. Popup to be used for instance
 * where a message is shown for a few seconds and vanishes thereafter.
 * Ex: Show status message after insert or updates from database
 * 
 * @param msg - Message to display
 * @param bgcolor - Background colore for msg
 * @param delay - How long to delay showing of message before removal
 */
function popupFadeAwayMsg(msg,bgcolor,delay)
{
	var tag = "popupFadeAwayMsg";
	if (msg==null||msg.lenght<0)
		return;

	if(delay==null)
		delay = 1000;
	
	if(bgcolor==null)
		bgcolor = '#ff9f5f';

		//Only show once - disallow consecutive clicks
	removeFadeAwayMsg();
	
	var tstifexist = $("#"+tag).html();
	if(tstifexist==null||tstifexist=="null")
	{
		$('<div style="margin:0,5px;font-weight:bold;font-size: 1.0em;text-align:center;"></div>')
	    .attr('id', tag)
		.html(msg)
   		.dialog({minHeight: '70'})
		.animate({backgroundColor:bgcolor}, delay)
	    .animate({height: 'hide'}, delay-500, 'easeOutCirc');

		tag = "#" + tag;

		setTimeout('$(tag).remove()', delay+10);
	}
}

function removeFadeAwayMsg(){
	tag = "#popupFadeAwayMsg";
	var tstifexist = $(tag).html();
	if (tstifexist!=null)
		$(tag).remove();
}