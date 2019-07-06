package com.teaminformatics.webapp.controller;
 
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.ucm.IContentMangerFileRetriever;

@Controller
@RequestMapping("/ucm")
public class ContentManagerController
{
	private IContentMangerFileRetriever contentMangerFileRetriever = null;
	
	@Autowired
	public void setContentMangerFileRetriever(IContentMangerFileRetriever contentMangerFileRetriever) 
	{
	    this.contentMangerFileRetriever = contentMangerFileRetriever; 
	}

	@RequestMapping("/getFile")
	@PreAuthorize("isAuthenticated() and hasPermission(#contentId, 'isContentAllowed')")
	public @ResponseBody void getContent(@RequestParam String contentId, @RequestParam String rendition, OutputStream outputStream) throws Exception
	{
    	InputStream is = contentMangerFileRetriever.getFileById(contentId, rendition);
		writeToOutput(is,outputStream);
	}
	
	private void writeToOutput(InputStream is, OutputStream out) throws IOException 
	{
		byte buf[]=new byte[1024];
		int len;
		while((len=is.read(buf))>0)
		  out.write(buf,0,len);
		out.close();
		is.close();
		System.out.println("\nFile is created...................................");
	}
}
