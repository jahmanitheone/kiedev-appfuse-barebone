/* 
File: jquery.mapz.step2.js
Mapz is a jQuery plugin that lets you create draggable image maps.  This plugin is used for the Step 1 and 2 LHS image viewer and the Step 3 RHS image popup window.

Notes:
- This is a modified version of the original mapz library.  This version adds zoom controls to the image when a thumbnail is clicked and also handles the zooming of the grid lines in step 2.

Project URL: 
- http://dannyvankooten.com/jquery-plugins/mapz/
*/

/**
*	jQuery Mapz v1.0
*
*	by Danny van Kooten - http://dannyvankooten.com
*	Last Modification: 20/06/2011
*
*	For more information, visit:
*	http://dannyvankooten.com/jquery-plugins/mapz/
*
*	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
*		- Free for use in both personal and commercial projects
*		- Attribution requires leaving author name, author link, and the license info intact.	
*/

(function( $ ){

  $.fn.mapz = function(options) {
  
		var settings = {
			'zoom'		:	false,
			'createmaps' 	:	false,
			'mousewheel' 	: 	false
		};
		
		 if ( options ) { 
			$.extend( settings, options );
		}
  
		var viewport = this.parent('.map-viewport');
		var map = this;
		var rotation;
		var constraint = $(document.createElement('div')).addClass('mapz-constraint').css('position','absolute').appendTo(viewport);

		// IWS-299: Loop trough zoom levels and clear current-level class if it's not at the first level
		// this happens when previous image was zoomed in and a new image is clicked
		map.children('.level').each(function() {
			// If current map level, clear
			if($(this).hasClass('current-level') && !$(this).hasClass('first-level')) $(this).removeClass('current-level');
		});

		// Add current-level class to first map level
		map.children(".level:first").addClass('current-level');
		
		// Create constraint for current level.
		createConstraint();
		
		// Is zooming enabled?
		if(settings.zoom) {

			$(document).keydown(function(e){
				// Pressed UP or DOWN key? -> zoom in or out accordingly
				//if (e.keyCode == 38) { zoom('in'); return false; } else if(e.keyCode == 40) { zoom('out'); return false; }
			});
			
			if(settings.mousewheel) {
				map.bind('mousewheel', function(event, delta) {
					var dir = delta > 0 ? 'in' : 'out';
					zoom(dir);
					return false;
				});
			}

			//IWS-299 move this declaration to step2_popup.jsp so it can be reset in content.viewer.image_helper.js clearContentViewer
			//var oldzoomvalue = 0;
			var percarray = ['100', '125', '150', '200', '225', '250', '275', '300', '325'];
			$(".zoomedvaluestep2").html(percarray[0] +"%");
			
			$(".slider").slider({
				   stop: function(event, ui) 
				   { 					   
						var xvalue = $(this).slider('value');
            var maxvalue = $(this).slider('option','max');  					
						if(xvalue>oldzoomvalue || xvalue>=maxvalue) 
							zoomIn("slider",xvalue);
						else 
							zoomOut("slider",xvalue);
				   }			
			});
			
			// Check if the zoom controls have previously been added to the map
			if ($(".slider").data('initialized') != true && $(".slider").data('initialized') != 'true') {
				// Add slider controls to the map.
				$(".sliderplus").click(function() {
					zoomIn();
				});
				$(".sliderminus").click(function() {
					zoomOut();
				});
				$(".slider").slider({value:0, min: 0, max: 8, step: 1});
				$(".slider").slider("enable");
				$(".slider").data('initialized', true);
			}

			// Create HTML maps for zoomed levels?
			if(settings.createmaps) createMaps();
		}
			
		map.draggable({
			 containment : constraint
		});
		
		function zoomOut(slided,xvalue)
		{
			if(xvalue == undefined)
         var xvalue = $(".slider").slider('value');
			var maxvalue = $(".slider").slider('option','max');
			var minvalue = $(".slider").slider('option','min');
				
			if (slided != null && oldzoomvalue == xvalue )
				return;

			var zoomby = oldzoomvalue-xvalue;
			if(zoomby==0 && oldzoomvalue>0)
				zoomby = 1;

			if(slided==null && xvalue<=0)
				xvalue = -1;
			else if (slided!=null)
				xvalue++;			
			
			if (xvalue > 0) {
				if ($('#data_point_wrapper').css('display') == 'block') {
					if (activeCategoryId == "" || activeCategoryId == null){$('#data_point_wrapper').css('display','none');}
				}
				
				for(var z=0; z<zoomby; z++)
					zoom('out');
				
				if(xvalue<=0)
					xvalue=1;
				valore = parseInt(xvalue) - 1;
				zoompercent = valore / maxvalue * 100; 
				
		  		zoomflag = valore;
		  		$(".slider").slider('value', valore);
		  		
		  		// to Stop/Initialize Panning feature
		  		if(rotation == 'undefined' || rotation == null){
		  		  for (i=0; i < objCase.pages.length; i++) {
			     		if (objCase.pages[i].id == objPage.id) {
			  		   	rotation = objCase.pages[i].orientation;
			  			}
		  			}
		  		}
		  		if($(screen)[0].width=='1920' || $(screen)[0].height=='1080'){
		  			if(rotation == '90' || rotation == '270'){
		  			  // adding centralize styling
		  				if(zoomflag <= 3){ map.css({left : '0px', width : '100%' }); map.addClass('map-override'); }
		  				// removing centralize styling
		  				if(zoomflag == 4){ map.css({left : '0px', width : '1900px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 5){ map.css({left : '0px', width : '2200px' }); map.addClass('map-override'); }
		  				if(zoomflag == 6){ map.css({left : '0px', width : '2500px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 7){ map.css({left : '0px', width : '2800px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 8){ map.css({left : '0px', width : '3100px' }); map.removeClass('map-override'); }
		  			}else{
		  			if(zoomflag <= 3)
		  				map.addClass('map-override');
		  			else
		  				map.removeClass('map-override');
		  			}
		  		}else{
		  			if(zoomflag <= 0)
		  				map.addClass('map-override');
		  			else
		  				map.removeClass('map-override');
		  		}		
			} else valore = minvalue; 

	  		var pi = valore > 8 ? 8 : valore < 0 ? 0 : valore;
	  		$(".zoomedvaluestep2").html(percarray[pi] + "%");  		
			
			oldzoomvalue = valore;
		}
		
		
		function zoomIn(slided,xvalue)
		{
			if(xvalue == undefined)
         var xvalue = $(".slider").slider('value');
			var maxvalue = $(".slider").slider('option','max');

			if (slided!=null)
				xvalue--;
			
			if (xvalue < 8) {
				
				if ($('#data_point_wrapper').css('display') == 'block') {
					if (activeCategoryId == "" || activeCategoryId == null){$('#data_point_wrapper').css('display','none');}
				}

		  		valore = parseInt(xvalue) + 1;				
				zoomby = valore-oldzoomvalue;
				zoompercent = valore / maxvalue * 100; 

				for(var z=0; z<zoomby; z++)
					zoom('in');
		  		
		  		zoomflag = valore;
		  		$(".slider").slider('value', valore);
		  		// To Stop/Initialize Panning feature
		  		if(rotation == 'undefined' || rotation == null){
		  		for (i=0; i < objCase.pages.length; i++) {
			  		if (objCase.pages[i].id == objPage.id) {
			  			rotation = objCase.pages[i].orientation;
			  			}
		  			}
		  		}
		  		// if screen is Horizontally aligned with given resolution
		  		if($(screen)[0].width=='1920' || $(screen)[0].height=='1080'){
		  			if(rotation == '90' || rotation == '270'){ // setting the positions of zoomed image(level - 4,5,6,7,8) for given rotation angles 
		  				if(zoomflag == 4){ map.css({left : '0px', width : '1900px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 5){ map.css({left : '0px', width : '2200px' }); map.addClass('map-override'); }
		  				if(zoomflag == 6){ map.css({left : '0px', width : '2500px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 7){ map.css({left : '0px', width : '2800px' }); map.removeClass('map-override'); }
		  				if(zoomflag == 8){ map.css({left : '0px', width : '3100px' }); map.removeClass('map-override'); }
		  			}else{ // setting the positions of zoomed image(level - 1,2,3) for given rotation angles
			  			if(zoomflag <= 3)
			  				map.addClass('map-override');
			  			else
			  				map.removeClass('map-override');
			  			}
		  		}else{ // If screen is Vertically aligned with given resolution
		  			if(zoomflag <= 0)
		  				map.addClass('map-override');
		  			else
		  				map.removeClass('map-override');
		  		}	
			} else valore = maxvalue;

	  		var pi = valore > 8 ? 8 : valore < 0 ? 0 : valore;
	  		$(".zoomedvaluestep2").html(percarray[pi] + "%");  		
			
	  		oldzoomvalue = valore;		  		
		}

		function createMaps(){
			
			var htmlmap = viewport.children('map');
			var scale = 1;
			var i = 0;
			
			// Loop trough zoom levels
			map.children('.level').each(function() {
				i++;
				
				// If current map level, return. This one should have a map already.
				if($(this).hasClass('current-level')) return;
				
				// Get scales for map to create
				scale = $(this).width() / map.width();
				
				// Create new map element
				var newmap = $(document.createElement('map')).attr('name',map.attr('id') + '-map-' + i);
				newmap.attr('id',map.attr('id') + '-map-' + i);
				
				// Calculate new coords for each area element
				htmlmap.children('area').each(function() {
					var newArea = $(this).clone();
					
					var coords = $(this).attr('coords').split(',');
					
					for(c in coords) {
						coords[c] = Math.ceil(coords[c] * scale);
					}
					
					newArea.attr('coords',coords).appendTo(newmap);
				});
				
				// Append new map to viewport and hook to zoom level
				newmap.appendTo(viewport);
				$(this).attr('usemap','#' + map.attr('id') + '-map-' + i);
				
				
			});
		}
		
		// Create a constraint div so map can't be dragged out of view.
		function createConstraint() {
			var mapWidth = $('#map-1').width();
			var mapHeight = $('#map-1').height();
			
			$('.mapz-constraint').css({
				left : -mapWidth + viewport.width(),
				top : -mapHeight + viewport.height(),
				width : 2 * mapWidth - viewport.width(),
				height : 2 * mapHeight - viewport.height()
			});
			/**
			constraint.css({
				left : -(map.width()) + viewport.width(),
				top : -(map.height()) + viewport.height(),
				width : 2 * map.width() - viewport.width(),
				height : 2 * map.height() - viewport.height()
			});
			
			// Check if map is currently out of bounds, revert to closest position if so
			if(map.position().left < constraint.position().left) map.css('left',constraint.position().left);
			if(map.position().top < constraint.position().top) map.css('top',constraint.position().top);
			**/
		}
		
		function zoom(direction) {
			var currentlvl = map.children(".current-level");
			
			// Set direction and check if there is a deeper level to zoom to.
			switch(direction) {
				
				case 'in':
					if(map.children(".current-level").next().length == 0) return;
					var targetlvl = currentlvl.next();
				break;
				
				case 'out':
					if(map.children(".current-level").prev().length == 0) return;
					var targetlvl = currentlvl.prev();
				break;
				
			}

			// Calculate scales
			var scale = { 
				'x' : (targetlvl.height() - viewport.height()) / (currentlvl.height() - viewport.height()),
				'y' : (targetlvl.width() - viewport.width()) / (currentlvl.width() - viewport.width())
			}
			
			
			// Switch levels and rezoom to viewed position
			currentlvl.removeClass('current-level');
			targetlvl.addClass('current-level');
			
			currentlvl.css('display','none');
			targetlvl.css('display','block');
			
			// Bug fix IWS-262 & IWS-167 
			// 3. the code will zoom the image, center-align the image horizontally (note: not aligning to the left edge of the image), place section 20 at the vertical middle of the image panel, and place the dp form right below section 20;
			// 4. If there is no dp form open when user zooms in or out, the code will zoom the image from the center of current image panel 
			if (activeDataPointSection == "" || activeDataPointSection == null){
				topPosition = -(targetlvl.height() / 2 - viewport.height() / 2);
				leftPosition = -(targetlvl.width() / 2 - viewport.width() / 2);
			}else{
				topPosition = -((targetlvl.height() * (activeDataPointSection) / 30 - viewport.height() * (activeDataPointSection) / 30));
				leftPosition = -(targetlvl.width() / 2 - viewport.width() / 2);
			}
			map.css({
				left : leftPosition, 
				top : topPosition,
				width : targetlvl.width(),
				height : targetlvl.height()
			});
			
			// Since we zoomed to another level we need to recreate constraint div
			createConstraint();
	
			$('.griddy').remove();
			$('#map-1').griddy({height : targetlvl.height()});
			$('.griddy').toggle();
			
			// IWS-262 - After zooming in in step 2, entering data point, zoomed. datapoint dialog is not at current datapoint row
			// Re-add highlighting of datapoint section
			if(activeDataPointSection != "" && activeDataPointSection != null){
				handleGridRowClick(activeDataPointSection);
		    }	
		}
  };
})( jQuery );