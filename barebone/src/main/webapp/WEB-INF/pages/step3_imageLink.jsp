<%@ page import="com.teaminformatics.synodex.model.Case" %>
<%@ include file="/common/taglibs.jsp"%>

<head>
    <title><fmt:message key="step3.title"/></title>
    <meta name="heading" content="<fmt:message key='step3.heading'/>"/>
    <meta name="menu" content="Step3"/>
    
    <!-- Window Resizing -->
    <script type="text/javascript" src="<c:url value='/scripts/window.lhs.resize_helper.js'/>"></script>
    
    <!-- JQuery Library for Zoom -->
    <script type="text/javascript" src="<c:url value='/scripts/jquery.mapz.step2.js'/>"></script>
    
    <!-- JS Library for Grid -->
    <script type="text/javascript" src="<c:url value='/scripts/griddy.js'/>"></script>
    
    <!-- JS Library for Grid -->
    <script type="text/javascript" src="<c:url value='/scripts/griddy_helper.js'/>"></script>
    
    <script>
	var step = 3;
	
	var objCase;
	var activePageId;
	
	var activeDataPointSection;
	
	<!-- On Document Ready. -->
	$(document).ready(function () {
		// Move the popup window to the top left corner.  This also ensures the bottom is aligned.
		window.moveBy(-window.screen.availWidth,-window.screen.availHeight);
		
		// Close the popup window when the parent window closes.
		window.opener.setUnloadStep3Viewer();
		
		// Get the case object from the popup window.
		objCase = window.opener.objCase;
		
		//set screen name on footer
		updateScreenOnFooter(objCase);
		
		// Get the case object from the popup window.
		activePageId = window.opener.activePageId;
		
		// Get the active section number from the popup window.
		activeDataPointSection = window.opener.activeDataPointSection;
		
		loadContentViewer();
		
		handleGridRowClick(activeDataPointSection);
	});
	
	function loadContentViewer() {
		// Get the active page object.
		var objPage;
		
		for (i=0; i < objCase.pages.length; i++) {
			if (objCase.pages[i].id == activePageId) {
				objPage = objCase.pages[i];
			}
		}

		// Get the image path from the spContentId field.
		contentId = objPage.spContentID;
		imagePath = 'ucm/getFile?contentId=' + contentId + '&rendition=web';
		
		// Load the preview image objects and set the preview image src attributes.  
		// These are used for the 4 the zoom levels.
		$('#content_preview_image1').attr('src', imagePath);
		$('#content_preview_image2').attr('src', imagePath);
		$('#content_preview_image3').attr('src', imagePath);
		$('#content_preview_image4').attr('src', imagePath);
		$('#content_preview_image5').attr('src', imagePath);
		$('#content_preview_image6').attr('src', imagePath);
		$('#content_preview_image7').attr('src', imagePath);
		$('#content_preview_image8').attr('src', imagePath);
		$('#content_preview_image9').attr('src', imagePath);
		
		// Set the names to the thumbnail id so we can retrive when rotating the images.
		$('#content_preview_image1').attr('name', objPage.id);

		// Initialize the map/zooming functionality
		$("#map-1").mapz({
			zoom : true,
			createmaps : true,
			mousewheel : false
		});
		
		// Add grid lines
		$('#map-1').griddy({height:1350});
		$('.griddy').toggle(); 
		
		$('#buttonMainMenu').css('display','none');
		$('.bodybutton').css('display','none');
	}
	</script>
</head>

<div id="sweep_l_wrapper"><!-- Begin Page Wrapper -->
	<div id="sweep_l_content"><!-- Begin Content -->
	
		<div class="map-viewport">
			<div id="map-1">
				<img id="content_preview_image1" src="" width="950" height="1350" alt="" class="current-level level" />
				<img id="content_preview_image2" src="" width="1264" height="1500" alt="" class="level" style="display: none;" />
				<img id="content_preview_image3" src="" width="1577" height="1650" alt="" class="level" style="display: none;" />
				<img id="content_preview_image4" src="" width="1900" height="1950" alt="" class="level" style="display: none;" />
				<img id="content_preview_image5" src="" width="2213" height="2100" alt="" class="level" style="display: none;" />
				<img id="content_preview_image6" src="" width="2526" height="2250" alt="" class="level" style="display: none;" />
				<img id="content_preview_image7" src="" width="2829" height="2550" alt="" class="level" style="display: none;" />
				<img id="content_preview_image8" src="" width="3142" height="2700" alt="" class="level" style="display: none;" />
				<img id="content_preview_image9" src="" width="3455" height="2850" alt="" class="level" style="display: none;" />
			</div>
		</div>

		<div class="ui-icon ui-icon-circle-minus gzoombutton" id="sliderminus" style="display: none;">&nbsp;</div>
		<div class="gzoomSlider" id="slider" style="display: none;"></div>
		<div class="ui-icon ui-icon-circle-plus gzoombutton" id="sliderplus" style="display: none;">&nbsp;</div>
		<div class="ui-icon ui-icon-arrowreturnthick-1-w gzoombutton" id="rotateleft" style="display: none;">&nbsp;</div>
		<div class="ui-icon ui-icon-arrowreturnthick-1-e gzoombutton" id="rotateright" style="display: none;">&nbsp;</div>
		<span id="zoomedvaluestep2" style="display: none;"></span>
		
	</div><!-- End Content -->
</div><!-- End Page Wrapper -->
	