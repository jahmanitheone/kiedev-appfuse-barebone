/**
 *  Javascript Object: Glossary Helper Function
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

function glossaryClickHandler(){
	$('.icd10_glossary').click(function(){
	if(dpChangedData == true){
       alert("You must either Save or Cancel changes in this DataPoint before proceeding further.");
       return; 
    }
		loadGlossaryWindow();
	});

	return false;
}

function loadGlossaryWindow(){
	if (typeof(glossaryWindow) == 'undefined' || glossaryWindow.closed == true) {
		var cwidth = lhsWidth - (lhsWidth/4);
		var cheight = lhsHeight - (lhsHeight/4);
		glossaryWindow = window.open("glossary","glossary","width=" + cwidth + ",height=" + cheight + ",scrollbars=1,top=0,left=0"); 	 
	} else glossaryWindow.focus();
}