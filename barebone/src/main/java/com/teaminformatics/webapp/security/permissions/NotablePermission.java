package com.teaminformatics.webapp.security.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.synodex.dao.NotableDao;
import com.teaminformatics.webapp.util.ConversionUtil;

public class NotablePermission extends AbstractPermission
{
	private NotableDao notableDao = null;
	
	@Autowired
	public void setNotableDao(NotableDao notableDao)
	{
		this.notableDao = notableDao;
	}
	
	@Override
    protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
    {
		if(targetDomainObject instanceof MultiValueMap)
		{
			List<Long> notableIds = ConversionUtil.getParameterCollectionAttributeValues(Long.class, "notables", "id", ((MultiValueMap)targetDomainObject).toSingleValueMap());
			if(notableIds == null || notableIds.size() == 0)
			{
				return ConversionUtil.getParameterCollectionAttributeValues(Long.class, "notables", "caseid", ((MultiValueMap)targetDomainObject).toSingleValueMap());
			}
			else
			{
				return notableDao.getCasesForNotables(notableIds.toArray(new Long[0]));
			}
		}
		
		return null;
    }
}
