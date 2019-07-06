/**
 *  Javascript Object: Handling Full DP Row Function
 *  @author: Debabrata Jena
 *  @dated:  07/27/2102
 */

function ObjFullDPListRowData(){
	this.pageid = null;
	this.pagenumber = null;
	this.pagesection = null;
}

function setFullDPListRowData(dpEntry){
	if(dpEntry!=null){
		fulldplistrowdata = new ObjFullDPListRowData();
		fulldplistrowdata.pageid = dpEntry._page.id;
		fulldplistrowdata.pagenumber = dpEntry._page.finalPageNumber;
		fulldplistrowdata.pagesection = dpEntry.sectionnumber;
	}
}