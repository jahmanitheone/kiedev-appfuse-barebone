package com.teaminformatics.webapp.security.permissions;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appfuse.dao.GenericDao;
import org.appfuse.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.teaminformatics.synodex.dao.SecurityDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.webapp.security.Permission;

public abstract class AbstractPermission implements Permission
{
	protected final Log log = LogFactory.getLog(getClass());

	private GenericDao<Case,Long> caseDao = null;
	private SecurityDao securityDao = null;
	
	@Autowired
	public void setCaseDao(GenericDao<Case,Long> caseDao)
	{
		this.caseDao = caseDao;
	}
	
	@Autowired
	public void setSecurityDao(SecurityDao securityDao)
	{
		this.securityDao = securityDao;
	}
	
	public boolean isAllowed(Authentication authentication, Object targetDomainObject)
	{
		///Now lets get the CaseID based on the pages being accessed.  If there is >1 CaseID we are not going to allow the update.
		List<Long> caseIds = getCasesForTargetDomainObject(targetDomainObject);
		
		if(log.isDebugEnabled())
		{
			log.debug("Looking up case level permissions on case IDs [" + getCombinedList(caseIds) + "]");
		}
		
		if(caseIds != null && caseIds.size() <= 1)
		{
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		    HttpSession session = attr.getRequest().getSession(false); // true == allow create
		    
			Long userId = authentication.getPrincipal() instanceof User ? ((User)authentication.getPrincipal()).getId() : null;
			
			//Look up the stage ID here...
			Case c = caseDao.get(caseIds.get(0));
			
			
			Long stageId = session.getAttribute("stageId") != null ? Long.valueOf(session.getAttribute("stageId").toString()) : 1L;
			
			return securityDao.retrieveAuthorization(stageId, c.getId(), userId);
		}
		else
		{
			//If there is no case or we have >1 case, we are not going to authorize this action.
			return false;
		}
	}
	
	protected abstract List<Long> getCasesForTargetDomainObject(Object targetDomainObject);
	
	protected String getCombinedList(List l)
	{
		StringBuffer sb = new StringBuffer();
		for(int i = l.size() - 1 ; i >= 0 ; i--)
		{
			sb.append(l.get(i));
			if(i > 0)
			{
				sb.append(',');
			}
		}
		return sb.toString();
	}
}
