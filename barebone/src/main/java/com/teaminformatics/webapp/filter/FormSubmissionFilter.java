package com.teaminformatics.webapp.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

/**
 * This filter was created to fix a bug with AJAX submissions in Firefox.  Spring MVC assumes the form
 * MUST have the Content-Type specified as 'application/x-www-form-urlencoded'; however, Firefox uses
 * the content type: application/x-www-form-urlencoded; charset=UTF-8 because of jQuery.  
 * 
 * This filter will check whether the contents of the Content-Type field within the request has the 
 * form Content-Type (application/x-www-form-urlencoded) WITHIN it, and if so, return the value
 * 'application/x-www-form-urlencoded' whenever getContentType() is called on the request object.
 * 
 * @author ejlevin1
 * @see org.springframework.http.server.ServletServerHttpRequest.isFormSubmittal(request)
 */
public class FormSubmissionFilter extends OncePerRequestFilter
{
	private static final String FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
	{
		if (request.getContentType() != null && request.getContentType().indexOf(FORM_CONTENT_TYPE) >= 0) 
		{
			request = new ContentTypeRequestWrapper(request);
		}
		filterChain.doFilter(request, response);
	}
	
	private static class ContentTypeRequestWrapper extends HttpServletRequestWrapper 
	{
		public ContentTypeRequestWrapper(HttpServletRequest request) 
		{
			super(request);
		}

		@Override
		public String getContentType() 
		{
			return FORM_CONTENT_TYPE;
		}
	}

}
