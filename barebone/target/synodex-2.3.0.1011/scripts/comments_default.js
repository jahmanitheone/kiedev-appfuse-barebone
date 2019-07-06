/* 
File: default.jsp
*src/main/webapp/decorators/default.jsp*

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Default.jsp Summary:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

The default.jsp file is the wrapper tags and libraries that are included within all pages.  If a JavaScript or CSS file
is to be included within every page, it should be placed here.

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

Default Page Load:

.... .... .... .... .... .... .... .... .... .... .... .... .... ....:

1.1 Define Global Variables for Debug:

> var pageStartLoadTime = new Date();
> var pageStopLoadTime;
> var pagesLoaded = 0;

1.2 Import Stylesheets:
- theme.css
- print.css
- globals.css
- style.css
- jquery.ui.1.7.1.custom.css

1.3 Import Javascript:
- <global_helper.js>
- <step.debug_helper.js>
- <jquery.1.6.2.min.js>
- <jquery.ui.1.8.13.min.js>
- <jquery.exptextarea.js>
- <jquery.offset.js>

1.4 Include synodex-header.jsp:

1.5 Include Body JSP File:
- <step1.jsp>
- <step1_popup.jsp>
- <step2.jsp>
- <step2_popup.jsp>
- <step3.jsp>
- <step3_popup.jsp>
- <step3_codeSearchBox.jsp>
- <step3_imageLink.jsp>
- <step4.jsp>
- <step4_popup.jsp>

1.6 Include synodex-footer.jsp: