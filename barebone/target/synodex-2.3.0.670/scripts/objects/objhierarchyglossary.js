<!--
/*
 * Object for handling code hiearchy of glossary feature  
 * @author: Philip Jahmani Chauvet (pchauvet@synodex.com)
 * @dated:  0713/2102 - 0713/2102
 */
function ObjHierarchyForGlossary(hchy,codepath,codeNameTobeSearch,flagFormDPListSearch)
{
	this.hierarchy = hchy;
	this.codepath = codepath; 
	this.hierarchypaths;
	this.hierarchypathlen; 
	this.hierarchycode;	
	this.medicalcodes;
	this.codeNameTobeSearch = codeNameTobeSearch;
	this.flagFormDPListSearch = flagFormDPListSearch;
	
		//Set the code, navigation path and hiearchy from the codepath
	this.init = function() {
		if(this.codepath!= null && this.codepath.length>0)
		{
			this.hierarchypaths = this.codepath.split("/");
				//Path starts with '/', ignore it
			this.hierarchycode = this.hierarchypaths[1];
			
				//Reorder path from level1 to children, it comes as children to level1
			var tmppath = new Array();
			for(var z=this.hierarchypaths.length-1; z>1; z--)
				tmppath.push(this.hierarchypaths[z]);
			
			this.hierarchypaths = tmppath;
			this.hierarchypathlen = this.hierarchypaths.length; 
		}		
		//this.debugHiearchyCode();
	};
		
	this.getAllLevel1 = function() {
		var level1 = new Array();
		if(!this.isHierarchyValid())
			return level1;

		//this.debugHiearchy(this.hierarchy);
		for (i = 0; i < this.hierarchy.length; i++) {
			if(this.hierarchy[i].level==1)
				level1.push(this.hierarchy[i]);			
		}
			
		return level1;
	};

		//Get all the sublevel for a 1st level code
	this.getAllChildHierarchy = function(parentlevel,codename) {
		var level = new Array();
		if(!this.isHierarchyValid())
			return level;
			
		//this.debugHiearchy(this.hierarchy);
			//Find position of parent level code for this name
		var stpos = 9999;
		for (var i = 0; i < this.hierarchy.length; i++) {
			if (this.hierarchy[i].level==parentlevel && this.hierarchy[i].name==codename)
			{
				stpos = i;
				break;
			}
		}

			//Children hiearchy start at next position
		for (var i = stpos+1; i < this.hierarchy.length; i++) {
			if(this.hierarchy[i].level==parentlevel)
				break;
			
			level.push(this.hierarchy[i]);
		}		
		
		return level;
	};

	this.getLevel1ByCodeName = function(codename) {
		var level1 = this.getAllLevel1();
		
		//this.debugHiearchy(level1);
		for(var j=0; j<level1.length; j++)
		{
			var lvl = level1[j]; 
			if(codename==lvl.name)
			{
				//alert( "Level 1 found for " + codename  + ": " +  lvl.id + ", " + lvl.name + ", " + lvl.level);
				return lvl;
				break;
			}
		}
			
		return null;
	};

	this.getAChildHierarchy = function(parentlevel,parentcode,codename) {
		if(parentlevel==null || parentcode==null || codename == null)
			return null;
		
		var level = this.getAllChildHierarchy(parentlevel,parentcode);
		
		//this.debugHiearchy(level);		
		for(var j=0; j<level.length; j++)
		{
			var lvl = level[j]; 
			if(codename==lvl.name)
			{
				return lvl;
				break;
			}
		}
			
		return null;
	};

	this.isHierarchyValid = function() {
		if(this.hierarchy == null)
			return false

		return true;	
	};
	
		//Base on an index, get the level path name
	this.getLevelNameFromHiearchyPath = function(idx) {
		if(this.hierarchypaths!= null)
			return this.hierarchypaths[idx];
		
		return null;
	};
	
   this.setMedicalCodes = function(codes) {
		if(codes==null)
			codes = new Array();
		this.medicalcodes = codes;
		//IWO-56
		//if(this.medicalcodes[0].level==true || this.medicalcodes[i].level==false)
		this.medicalcodes[0].level = 1; 
	}
	
	this.isMedicalCodesValid = function() {
		if(this.medicalcodes!=null)
			return true;
		return false;
	}

	this.getAllMedicalCodeLevel = function(codelevel) {			
		var clevel1 = new Array();
		if(!this.isMedicalCodesValid() || codelevel==null)
			return clevel1;

		//this.debugMedicalCode(null,this.medicalcodes);
		for (i = 0; i < this.medicalcodes.length; i++) {
			if(this.medicalcodes[i].level==codelevel)
				clevel1.push(this.medicalcodes[i]);			
		}
			
		return clevel1;
	};

	this.getAMedicalCodeForALevel = function(codelevel,codename) {
		var level = null;
		var levels = this.getAllMedicalCodeLevel(codelevel);
		if(levels!=null)
		{
			for (var j=0; j<levels.length; j++) {
				if(levels[j].name==codename)
				{
					level = levels[j]; 			
					break;
				}
			}
		}

		return level;
	};

	this.getAMedicalCodePos = function(codelevel,codename) {
		var pos = 0;
		var levels = this.getAllMedicalCodeLevel(codelevel);
		if(levels!=null)
		{
			for (var j=0; j<levels.length; j++) {
				if(levels[j].name==codename)
				{
					pos = j; 			
					break;
				}
			}
		}

		return pos;
	};

	this.getTargetedCode = function ()
	{
		//this.debugHiearchy(this.hierarchy);		
		//this.debugMedicalCode(null,this.medicalcodes);
		return this.getAMedicalCodeForALevel(this.hierarchypathlen-1,this.hierarchycode);
	};
	
	this.gotoHierarchyPath = function()
	{
		var isonly2level = true;
		
		for(var h=0; h<this.hierarchypathlen; h++)
		{
			var levelname = this.getLevelNameFromHiearchyPath(h);
			var level1name;
			
			if(this.hierarchypathlen==1)
			{
				if(h==0)
				{
					var level = this.getLevel1ByCodeName(levelname);
					if(level!=null)
					{
						level1name = level.name;
						
						//var msg = this.debugLegel("+h=" + h + ",  Click: " + levelname,level,true);
						if (this.flagFormDPListSearch){
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries_fulldp');
						}else{
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries');
						}
					} else alert(level1name + " - " + levelname + " is null");
				}  
			} else if(this.hierarchypathlen==2)
			{
				if(h==0)
				{
					var level = this.getLevel1ByCodeName(levelname);
					if(level!=null)
					{
						level1name = level.name;
						
						//var msg = this.debugLegel("+h=" + h + ",  Click: " + levelname,level,true);
						$("#anchorCategory_category_" + level.id).click();
					} else alert(level1name + " - " + levelname + " is null");
				} else if(h==1)
				{
					var level = this.getAChildHierarchy(1,level1name,levelname);
					if(level!=null)
					{
						//var msg = this.debugLegel("+h=" + h + " "  + level1name +  " "  + levelname +",  Click: ",level,true);
						if (this.flagFormDPListSearch){
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries_fulldp');
						}else{
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries');
						}
						
					} else alert(level1name + " - " + levelname + " is null");
				} 
			} else
			{
				isonly2level = false;
	
				if(h==0)
				{
					var level = this.getLevel1ByCodeName(levelname);
					if(level!=null)
					{
						level1name = level.name;
						
						//var msg = this.debugLegel("*h=" + h + ",  Click: " + levelname,level,true);
						$("#anchorCategory_category_" + level.id).click();
					} else alert(level1name + " - " + levelname + " is null");
				} else if(h==1)  
				{
					var level = this.getAChildHierarchy(1,level1name,levelname);
					if(level!=null)
					{
						//var msg = this.debugLegel("*h=" + h + ",  Click: " + levelname,level,true);
						if (this.flagFormDPListSearch){
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries_fulldp');
						}else{
							this.subCatClickHandler(level.id,level1name,level.name,'#iws2_subc_entries');
						}
					} else alert(level1name + " - " + levelname + " is null");
				} else if (h>=2)  
				{
					this.setMedicalCode();
					this.clickHiearcyAnchor(h,levelname);
				}
			}
		}
	
			//Click the targeted code
		if (isonly2level)  
		{
			$("#icdCodeCollapse_all").click();
			
			if(!this.isMedicalCodesValid())
				this.setMedicalCodes(medicalCodes);
	
			var level = this.getTargetedCode()
			if(level!=null)
			{
				//var msg = this.debugLegel("Click: code: " + level.name + " " + level.description,level,true);
				var mcode = "#medicalCodeRow_" + level.id;
		        if (typeof(hierarchyPopUpWindow) == 'undefined'|| hierarchyPopUpWindow.closed == true)
		          $(mcode).click();
		        //IWO-67: scroll to the code
		        $(mcode).trigger('focus');
		        setTimeout( function(){ $(mcode)[0].scrollIntoView(true); }, 200);
			} else alert("Code " + this.hierarchycode + " was not found!");	
		} else
		{
			if(this.hierarchypathlen!=1)
			{
				var level = this.getTargetedCode()
				if(level!=null)
				{
					//var msg = this.debugLegel("Click: code: " + level.name,level,true);			
					var mcode = "#medicalCodeRow_" + level.id;
					if (typeof(hierarchyPopUpWindow) == 'undefined'|| hierarchyPopUpWindow.closed == true)
						$(mcode).click();
					//IWO-67: scroll to the code
				    $(mcode).trigger('focus');
				    setTimeout(function(){ $(mcode)[0].scrollIntoView(true); }, 200);
				} else alert("Code " + this.hierarchycode + " was not found!");			
			}
		}
	};
	
	/**subCatClickHandler(subCatId, categoryName, subCategoryName, subdiv)
	 *  
	 *  @param - subCatId : selected subcategoryId
	 *  @param - categoryName : selected categoryName
	 *  @param - subCategoryName : selected subCategoryName
	 *  @param - subdiv : selected subdiv
	 */
  this.subCatClickHandler = function(subCatId, categoryName, subCategoryName, subdiv) {
    
    if (typeof(hierarchyPopUpWindow) == 'undefined'|| hierarchyPopUpWindow.closed == true)
      subCategoryClickHandler(subCatId, categoryName, subCategoryName, subdiv);
    else{
      hirarchyPopUpView.hcySubcategoryClickHandler(subCatId, categoryName, subCategoryName, subdiv);
    }  
  }

	
	this.setMedicalCode = function()
	{
		if(!this.isMedicalCodesValid())
			this.setMedicalCodes(medicalCodes);
	};

	this.clickHiearcyAnchor = function(h,levelname)
	{
		//this.debugMedicalCode(null,medicalCodes);
		var level = this.getAMedicalCodeForALevel(h-1,levelname);
		//var msg = this.debugLegel("*h: " + h + ", Click-> " + levelname + ":  ", level,true);
		
		if(level.level==1)
		{
			var hcode = "#anchorAccordionCode_"+level.id;
			$(hcode).click();
		} else
		{
			var hcode = "#anchorAccordionCode_"+level.id;
			$(hcode).click();
		}						
	}

	this.debugLegel = function(prfxmsg,level,show) {
		var msg = "";				
		if(prfxmsg==null)
			prfxmsg = "";
		msg += prfxmsg;
		
		if (level.level == 1)
			msg += "*-> ";
		msg += "id: " + level.id + ", name: " + level.name + ", level: " + level.level + "\n";

		if(show)
			alert(msg);
		
		return msg;
	};
	
	this.debugMedicalCode = function(prfx,level) {
		if(prfx==null)
			prfx = "";
		
		var msg = "" + prfx;
		for (i = 0; i < level.length; i++) 
			msg += level[i].level + "  " + level[i].id + " " + level[i].name + "\n";
			
		alert(msg);	
	};

	this.debugHiearchy = function(level) {
			//display all hiearcy
		var msg = "";
		for (i = 0; i < level.length; i++) 
			msg += level[i].level + "  " + level[i].id + " " + level[i].name + "\n";
			
		alert(msg);	
	};
	
	this.debugHiearchyCode = function(level) {
		var msg = "";
		msg += "codepath: " + this.codepath + "\n";
		msg += "hierarchycode: " + this.hierarchycode + "\n";
		msg += "hierarchypathlen: " + this.hierarchypathlen + "\n";
		msg += "hierarchypaths: " + this.hierarchypaths + "\n";
			
		alert(msg);	
	};

}
-->
