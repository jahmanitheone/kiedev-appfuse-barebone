package com.teaminformatics.webapp.security.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.teaminformatics.synodex.dao.PageDao;

public class ContentPermission extends AbstractPermission
{
	private PageDao pageDao;
	
	@Autowired
	public void setPageDao(PageDao pageDao)
	{
		this.pageDao = pageDao;
	}
	
	@Override
    protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
    {
		if(targetDomainObject instanceof String)
		{
			if(log.isDebugEnabled())
			{
				log.debug("Looking up cases for content ID [" + targetDomainObject + "]");
			}
			
			return pageDao.getCasesForContentItems((String)targetDomainObject);
		}

	    return null;
    }
}
