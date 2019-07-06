package com.teaminformatics.webapp.security.permissions;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.webapp.util.ConversionUtil;

public class CasePermission extends AbstractPermission
{
	@Override
    protected List<Long> getCasesForTargetDomainObject(Object targetDomainObject)
    {
		List<Long> caseIds = null;
		
		if(targetDomainObject instanceof MultiValueMap && ((MultiValueMap)targetDomainObject).containsKey("id"))
		{
			String strId = ((MultiValueMap<String,String>)targetDomainObject).getFirst("id");
			targetDomainObject = new Long(strId);
		}
		
		if(targetDomainObject instanceof Long)
		{
			caseIds = new Vector<Long>();
			caseIds.add((Long)targetDomainObject);
		}
		
	    return caseIds;
    }


}
