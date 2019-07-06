package com.teaminformatics.webapp.filter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appfuse.dao.GenericDao;
import org.appfuse.model.User;
import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedCredentialsNotFoundException;

import com.teaminformatics.synodex.dao.SecurityDao;
import com.teaminformatics.synodex.model.Session;

public class SingleSignOnFilter extends AbstractPreAuthenticatedProcessingFilter
{
    private String singleSignOnParameter = "apexSessionId";
    private String sessionNamedQuery ="Session.findBySingleSignOnID";
    private boolean exceptionIfHeaderMissing = false;
	
	private static final Log log = LogFactory.getLog(SingleSignOnFilter.class);
	
	private SecurityDao securityDao = null;
	private GenericDao<User,Long> userDao = null;
	private GenericDao<Session, Long> sessionDao = null;
	
	@Autowired
	public void setSecurityDao(SecurityDao securityDao) 
	{
	    this.securityDao = securityDao; 
	}
	
	@Autowired
	public void setUserDao(GenericDao<User,Long> userDao) 
	{
	    this.userDao = userDao; 
	}
	@Autowired
	public void setSessionDao(GenericDao<Session,Long> sessionDao) 
	{
	    this.sessionDao = sessionDao; 
	}
	
	@Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request)
    {
		log.info("getPreAuthenticatedPrincipal");
		 
    	String ssoId = request.getParameter(singleSignOnParameter);
    	if(ssoId != null && !ssoId.equals(""))
    	{
    		Long userId = null;
    		try
    		{
    			userId = securityDao.retrieveAuthenticationForSession(ssoId);
    			if(userId != null)
        		{
        			User user = userDao.get(userId);
        			//set wls session id into session table;
        			Map<String,Object> params = new HashMap<String,Object>();
        	    	params.put("ssoid", ssoId);
        	    	List<Session> sessions = sessionDao.findByNamedQuery("Session.findBySingleSignOnID", params);
        	    	if(sessions != null && sessions.size() > 0)
        	    	{
        	    		Session session = sessions.get(0);
        	    		session.setWlsSessionId(request.getSession().getId());
        	    		//set the global sessionid in the session for use when auditing
        	    		request.getSession().setAttribute("globalSessionId", session.getId());
        	    		sessionDao.save(session);
        	    	}
        			
        			return user.getUsername();
        		}
    		}
    		catch(Exception ex)
    		{
    			log.error("An error occurred while authenticating user [" + ex.getMessage() + "]", ex);
    		}
    	}
    	
    	if (exceptionIfHeaderMissing) {
            throw new PreAuthenticatedCredentialsNotFoundException("Valid "+singleSignOnParameter+" not found in request.");
        }
    	
    	return null;
    }

	@Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request)
    {
	    return "N/A";
    }
	
	/**
     * Defines whether an exception should be raised if the principal header is missing. Defaults to {@code true}.
     *
     * @param exceptionIfHeaderMissing set to {@code false} to override the default behaviour and allow
     *          the request to proceed if no header is found.
     */
    public void setExceptionIfHeaderMissing(boolean exceptionIfHeaderMissing) {
        this.exceptionIfHeaderMissing = exceptionIfHeaderMissing;
    }
}
