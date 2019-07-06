package com.teaminformatics.webapp.security.permissions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.synodex.dao.DataPointEntryCodeDao;
import com.teaminformatics.synodex.dao.DataPointEntryDao;
import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.webapp.util.ConversionUtil;

public class DataPointEntryCodePermission extends AbstractPermission
{
	private PageDao pageDao = null;
	private DataPointEntryCodeDao dataPointEntryCodeDao = null;
	
	@Autowired
	public void setPageDao(PageDao pageDao)
	{
		this.pageDao = pageDao;
	}
	
	@Autowired
	public void setDataPointEntryCodeDao(DataPointEntryCodeDao dataPointEntryCodeDao)
	{
		this.dataPointEntryCodeDao = dataPointEntryCodeDao;
	}
	
	@Override
	protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
	{
		if(targetDomainObject instanceof MultiValueMap)
		{
			MultiValueMap<String,String> map = (MultiValueMap<String,String>)targetDomainObject;
			List<Long> dpEntryCodeIds = ConversionUtil.getParameterCollectionAttributeValues(Long.class, "codes", "dpecid", ((MultiValueMap)targetDomainObject).toSingleValueMap());
			return dataPointEntryCodeDao.getCasesForDataPointEntryCodes(dpEntryCodeIds.toArray(new Long[0]));
			
		}
		else if(targetDomainObject instanceof Long)
		{
			return dataPointEntryCodeDao.getCasesForDataPointEntryCodes((Long)targetDomainObject);
		}
		
		return null;
	}

}
