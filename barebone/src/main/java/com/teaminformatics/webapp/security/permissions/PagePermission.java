package com.teaminformatics.webapp.security.permissions;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.webapp.util.ConversionUtil;

public class PagePermission extends AbstractPermission
{
	private PageDao pageDao = null;
	
	@Autowired
	public void setPageDao(PageDao pageDao)
	{
		this.pageDao = pageDao;
	}
	
    @Override
    protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
    {
		List<Long> pageIds = null;
		
		if(targetDomainObject instanceof MultiValueMap)
		{
			pageIds = ConversionUtil.getParameterCollectionAttributeValues(Long.class, "pages", "id", ((MultiValueMap)targetDomainObject).toSingleValueMap());
		}
		else if(targetDomainObject instanceof Long)
		{
			pageIds = new ArrayList<Long>();
			pageIds.add((Long)targetDomainObject);
		}
		else if(targetDomainObject instanceof String)
		{
			pageIds = ConversionUtil.convertCommaDelimitedList(Long.class, (String)targetDomainObject);
		}
		
		if(log.isDebugEnabled())
		{
			log.debug("Looking up cases for page IDs [" + getCombinedList(pageIds) + "]");
		}
		
		///Now lets get the CaseID based on the pages being accessed.  If there is >1 CaseID we are not going to allow the update.
		List<Long> caseIds = null;
		if(pageIds != null && pageIds.size() > 0)
		{
			caseIds = pageDao.getCasesForPages(pageIds.toArray(new Long[1]));
		}
		return caseIds;
    }
}
