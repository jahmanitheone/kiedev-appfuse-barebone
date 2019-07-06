/* 
File: griddy.js
Responsible for grid overlay in Step 2 LHS and Step 3 Image Popup.

Notes:
- The following library has been heavily modified.  Do not update this file without making appropriate changes to the new library.

Changes:
- Modified CSS
- Modified Row Heights
- Modified Gutters
- Action Handlers on Grid Rows
*/

$.fn.griddy = function(options) {
    this.css('position','relative');
    var defaults = { rows: 45, rowheight: 0, rowgutter: 0, columns: 0, columnwidth: 0, columngutter: 20, color: '#fff', opacity: 20 };
    var opts = $.extend(defaults, options); var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
    var width = this.width();
                var height
                if (opts.height == null)
                	height = $(document).height();
                else
                	height = opts.height;

    		if(o.rowheight == 0)
    			o.rowheight = Math.floor((height - (o.rows-1))/o.rows);

    		this.prepend("<div class='griddy' style='z-index:100;display:none;overflow:hidden;position:absolute;left:0;top:0;width:100%;height:"+(height)+"px;'><div class='griddy-r' style='position:relative;width:100%;height:100%;display:block;overflow:hidden;'><div class='griddy-columns' style='position:absolute;top:0;left:0;width:100%;height:100%;'></div></div></div>");

    		// Build rows
    		if(o.rows != 0){
        		for ( var i = 0; i < o.rows; i++ ) { // rows
		 		var rowCount=i+1;
            			if(i!=0) $('.griddy-columns').append("<div style='cursor:default;height:"+o.rowgutter+"px;display:block;float:left;width:100%; border-top: 1px dashed blue;'></div>");
            			$('.griddy-columns',this).append("<div style='height:"+o.rowheight+"px;width:100%;float:left;display:block;line-height:"+o.rowheight+"px;position:relative; cursor: pointer;'><span style='color: blue; text-decoration: underline; font-size: .8em;'>"+rowCount+"</span><div id='grid_row_" + rowCount + "' style='width:100%;height:100%;position:absolute;top:0;left:0;display:block;' class='grid_row_norm' onclick='javascript:handleGridRowClick(" + rowCount + ")' onmouseover='javascript:handleGridRowMouseOver(" + rowCount + ")' onmouseout='javascript:handleGridRowMouseOut(" + rowCount + ")'></div></div></div>");
        		}
    		}
    		
    		// If we are in step 3, remove the action handlers from the grid rows
    		if (step == 3 || window.opener.qsStageId == 49 ||  window.opener.qsStageId == 7 ||  window.opener.qsStageId == 48 || window.opener.qsStageId == 50) {
    			$('.grid_row_norm').attr('onmouseover','');
    			$('.grid_row_norm').attr('onclick','');
    			$('.grid_row_norm').css('cursor','default');
    			
    			$('.grid_row_over').attr('onmouseover','');
    			$('.grid_row_over').attr('onclick','');
    			$('.grid_row_over').css('cursor','default');
    		}
};


