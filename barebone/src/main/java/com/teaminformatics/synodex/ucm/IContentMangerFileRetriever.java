package com.teaminformatics.synodex.ucm;

import java.io.InputStream;

public interface IContentMangerFileRetriever
{
	/**
	 * 
	 * @param contentId 
	 * @param rendition Either 'web' or 'thumbnail'
	 * @return
	 * @throws Exception
	 */
	public InputStream getFileById(String contentId, String rendition) throws Exception;
}
