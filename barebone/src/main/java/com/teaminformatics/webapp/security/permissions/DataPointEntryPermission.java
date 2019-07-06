package com.teaminformatics.webapp.security.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.synodex.dao.DataPointEntryDao;
import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.webapp.util.ConversionUtil;

public class DataPointEntryPermission extends AbstractPermission
{
	private PageDao pageDao = null;
	private DataPointEntryDao dataPointEntryDao = null;
	
	@Autowired
	public void setPageDao(PageDao pageDao)
	{
		this.pageDao = pageDao;
	}
	
	@Autowired
	public void setDataPointEntryDao(DataPointEntryDao dataPointEntryDao)
	{
		this.dataPointEntryDao = dataPointEntryDao;
	}
	
	@Override
	protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
	{
		if(targetDomainObject instanceof MultiValueMap)
		{
			MultiValueMap<String,String> map = (MultiValueMap<String,String>)targetDomainObject;
			if(map.containsKey("entry[_page]"))
			{
				return pageDao.getCasesForPages(new Long(map.getFirst("entry[_page]")));
			}
			else 
			{
				List<Long> dpEntryCodeIds = ConversionUtil.getParameterCollectionAttributeValues(Long.class, "codes", "_dpentry", ((MultiValueMap)targetDomainObject).toSingleValueMap());
				return dataPointEntryDao.getCasesForDataPointEntries(dpEntryCodeIds.toArray(new Long[0]));
			}
		}
		else if(targetDomainObject instanceof Long)
		{
			return dataPointEntryDao.getCasesForDataPointEntries((Long)targetDomainObject);
		}
		
		return null;
	}

}
