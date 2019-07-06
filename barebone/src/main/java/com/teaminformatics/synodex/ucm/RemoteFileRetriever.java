package com.teaminformatics.synodex.ucm;

import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import oracle.stellent.ridc.IdcClientManager;
import oracle.stellent.ridc.IdcContext;
import oracle.stellent.ridc.model.DataBinder;
import oracle.stellent.ridc.protocol.ServiceResponse;
import oracle.stellent.ridc.protocol.intradoc.IntradocClient;
import oracle.stellent.ridc.protocol.intradoc.IntradocClientConfig;

public class RemoteFileRetriever implements IContentMangerFileRetriever
{
    private static final Log log = LogFactory.getLog(RemoteFileRetriever.class);

	private IntradocClient client = null;
	private String username = null;
	private String password = null;
	private IntradocClientConfig clientConfig = null;
	
	public void setUsername(String username) { this.username = username; }
	public void setPassword(String password) { this.password = password; }
	public IntradocClientConfig getClientConfig() { return this.clientConfig; }
	public void setClientConfig(IntradocClientConfig config) { clientConfig = config; }
	
	/**
	 * Spring init() method that will be called upon this bean getting created
	 */
	public void init() 
	{
		log.info("Creating IntradocClient for UCM access .. access with be through user [" + username + "]");
		
		IdcClientManager manager = new IdcClientManager ();
		client = new IntradocClient(manager, getClientConfig());
	}
	
	public InputStream getFileById(String contentId, String rendition) throws Exception
	{
		IntradocClient idc = client;
		DataBinder binder = idc.createBinder();
	    binder.putLocal("IdcService", "GET_FILE");
	    binder.putLocal("RevisionSelectionMethod", "LatestReleased");
	    binder.putLocal("Rendition", rendition);
	    binder.putLocal("allowInterrupt", "1");
	    binder.putLocal("dDocName", contentId);
        IdcContext context = new IdcContext(username, password);
        ServiceResponse  response = idc.sendRequest(context, binder);
        return response.getResponseStream();
	}

}
