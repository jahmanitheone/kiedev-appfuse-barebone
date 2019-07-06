<!--
/**********************************************************************
 * Javascript Object for IWS2  
 **********************************************************************/

/*
 * Object for handling the datapoint grid selection and highlighting
 * when shift key is pressed.
 *  
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  06/14/2012 - 06/18/2012
 */
function ObjGridSelection(maxrows)
{
	this.rowselector = new ObjMultipleSelection()
	this.isshiftkey = false;
	this.isExceedRowlimit = false;
	this.exceedRowlimit = null;
	this.DEFMAXSELECTABLEROWS = 5;
	if(maxrows!=null)
		this.DEFMAXSELECTABLEROWS = maxrows;
	
	this.setSelectedRange = function(rownum) {
		this.isExceedRowlimit = false;
		if(this.isshiftkey)
		{
			if(!this.rowselector.isStarted())
			{
				this.rowselector.begpos = rownum;
			} else
			{
				this.rowselector.endpos = rownum;
					//Check if proper sequence
				var beg = this.rowselector.begpos;
				if(this.rowselector.endpos<beg)
				{
					this.rowselector.begpos = this.rowselector.endpos;			
					this.rowselector.endpos = beg;
				}
				
					//Validate if exceeded selected rows
				var rowselectedcnt = this.rowselector.endpos - this.rowselector.begpos;
				if(rowselectedcnt>=this.DEFMAXSELECTABLEROWS)
				{
					this.clearMultipleSelectionRowColor();
					
					this.exceedRowlimit = rowselectedcnt - this.DEFMAXSELECTABLEROWS;
					this.rowselector.endpos = this.rowselector.begpos + this.DEFMAXSELECTABLEROWS - 1;
					this.isExceedRowlimit = true;
				}
			}		
		} else {
			this.rowselector.begpos = rownum;
			this.rowselector.endpos = rownum;				
		}
			
	};
	
	this.getObjMultipleSelection = function() {
		return this.rowselector; 
	};

	this.isComplete = function() {
		var rtn = this.rowselector.isComplete();
		if(rtn)
			this.isshiftkey = false;
		
		return rtn; 
	};

	this.setMultipleSelectionRowColor = function() {
		var rprfx = "#grid_row_";
		for(var j=this.rowselector.begpos; j<=this.rowselector.endpos; j++)
		{
			var xtag = rprfx+j;
			$(xtag).attr("class","grid_row_over selected");				
		}		
	};
	
	this.initKeys = function() {
		var __self = this;		
		var shiftKey = 16;
		var escKey = 27;

		$(document).keydown(function(e) {
			if(window.opener !=null){
				if(window.opener.qsStageId!=7 && window.opener.qsStageId!=48){
					if(!window.opener.dpListView){
						if(__self.isshiftkey)
							return false;
						if (e.keyCode == shiftKey) {
							__self.isshiftkey = true;
								//Initialize range
							__self.rowselector.init();
							return false;
						}
					}
				}
			}
		});			

		$(document).keyup(function(e) {
			if (e.keyCode == shiftKey && !window.opener.dpListView && window.opener.qsStageId!=7 && window.opener.qsStageId!=48) {
				__self.isshiftkey = false;

				return false;
			} else if (e.keyCode == escKey) {
					//Clearing just beg and ending was annoying, so I cleared all rows. 
					//Punish me in 2 years if you are reading this code I created on 07/03/2012
				__self.clearAllRowColor();				
				__self.isshiftkey = false;
				__self.rowselector.init();

				window.opener.refreshPageSection();
				
				return false;
			}
		});			
	};
	
	this.isShiftKeyPressed = function () {
		return this.isshiftkey;
	};

	this.setBegEndSection = function(section) {
		var tmpsecbegend = this.getNewObjBegEndSection(section);
		this.rowselector.begpos = tmpsecbegend.secBeg;
		this.rowselector.endpos = tmpsecbegend.secEnd;
	};
	
	this.getNewObjBegEndSection = function(section) {
		return new ObjBegEndSection(section);
	};

	this.clearMultipleSelectionRowColor = function() {
		var rprfx = "#grid_row_";
		for(var j=this.rowselector.begpos; j<=this.rowselector.endpos; j++)
		{
			var xtag = rprfx+j;
			$(xtag).attr("class","grid_row_norm");				
		}		
	};

	this.clearAllRowColor = function() {
		var rprfx = "#grid_row_";
		for(var j=1; j<=45; j++)
		{
			var xtag = rprfx+j;
			$(xtag).attr("class","grid_row_norm");				
		}		
	};
}

/*
 * Object for handling the datapoint begin and ending sections
 *  
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  06/14/2012 - 06/14/2012
 */
function ObjMultipleSelection()
{
	this.begpos= null;
	this.endpos = null;
	this.toString = function() {
		return "begpos: " + this.begpos+ ", endpos: " + this.endpos + ", isStarted: " + this.isStarted() + ", isComplete: " + this.isComplete() + ", isBegEndEqual: " + this.isBegEndEqual();  
	};
	this.isStarted = function() {
		if(this.begpos!=null)
			return true;			
		return false;
	};
	this.isComplete = function() {
		if(this.begpos!=null && this.endpos!=null)
			return true;			
		return false;
	};
	this.isBegEndEqual = function() {
		var __self = this;
		if(__self.isComplete() && __self.begpos==__self.endpos)
			return true;
		return false;
	};
	this.init = function() {
		this.begpos= null;
		this.endpos = null;
	};
}


/*
 * Object for creating begin and ending section from passed value
 *  
 * @param section The begin or ending section passed as 'B-E' or single value 'B'
 * 
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  06/20/2012 - 06/20/2012
 */
function ObjBegEndSection(section)
{
	this.secBeg;
	this.secEnd;
	
	this.isSameSection = function() {
		var __self = this;
		if(__self.isValid() && __self.secBeg == __self.secEnd)
			return true;
		return false;
	};
	
	this.isValid = function() {
		var __self = this;
		if(__self.secBeg==null || __self.secEnd==null)
			return false;
		return true;
	};
	
		/* 
		 * If section is single value, beg/end are set to same value.
		 */
	this.setSection = function(section) {
		if(section==null || section=="null")
			return;
		
		section += "";
		var __self = this;
		__self.secBeg = null;
		__self.secEnd = null;	
		var dashpos = section.indexOf("-");
		if(dashpos>0){
			var sbeg = section.substring(0,dashpos);
			var send = section.substring(dashpos+1);
			if(sbeg!=null && sbeg!="null")
				__self.secBeg = parseInt(sbeg);
			if(send!=null && send!="null")
				__self.secEnd = parseInt(send);
		} else
		{
			if(section!=null)
				__self.secBeg = parseInt(section);
			__self.secEnd = __self.secBeg;
		};
	};

	this.toString = function() {
		return "begpos: " + this.secBeg + ", endpos: " + this.secEnd + ", isValid: " + this.isValid() + ", isSameSection: " + this.isSameSection();  
	};


	this.setSection(section);	
}
-->