package com.teaminformatics.synodex.ucm;

import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LocalFileRetriever implements IContentMangerFileRetriever
{
    private static final Log log = LogFactory.getLog(LocalFileRetriever.class);

	private String localImagePath = null;
	
	public String getLocalImagePath() { return this.localImagePath; }
	public void setLocalImagePath(String path) { this.localImagePath = path; }
	
	/**
	 * Spring init() method that will be called upon this bean getting created, this is important
	 * as it will output this to the log if it were ever to be in the context within prod.
	 */
	public void init() 
	{
		log.warn("Using local file retriever for UCM system access.. using path [" + localImagePath + "]");
	}
	
	/**
	 * NOTE: your files need to be of the format:
	 * 		 <contentid>.jpg for web Rendition
	 * 		<contentid>~t.jpg for thumbnail Rendition
	 * @param contentId
	 * @param rendition
	 * 
	 * Rendition is either web or thumbnail for now... to be updated
	 * @throws Exception 
	 */
	public InputStream getFileById(String contentId, String rendition) throws Exception{
		String suffix = "";
		if (rendition.equals("thumbnail"))
			suffix="~t";
		
		return new FileInputStream(getLocalImagePath() + contentId + suffix + ".jpg");
	}
}
