package com.teaminformatics.webapp.controller;
 
import java.beans.PropertyDescriptor;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.dao.NotableDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.Notable;
import com.teaminformatics.synodex.model.Page;
import com.teaminformatics.webapp.util.ControllerUtil;
import com.teaminformatics.webapp.util.ConversionUtil;


@Controller
//@RequestMapping("/pages")
public class NotableController {

	private static final Log log = LogFactory.getLog(PageController.class);
	
	private NotableDao notableDao = null;
	private DataPointDao dataPointDao = null;
	private LoadableDao<Case, Long> caseDao = null;
	
	
	@Autowired
	public void setNotableDao(NotableDao notableDao) 
	{
	    this.notableDao = notableDao; 
	}
	@Autowired
	public void dataPointDao(DataPointDao dataPointDao) 
	{
	    this.dataPointDao = dataPointDao; 
	}
	@Autowired
	public void setCaseDao(LoadableDao<Case, Long> caseDao) 
	{
	    this.caseDao = caseDao; 
	}
	
	@RequestMapping(value="saveNotables", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated() and hasPermission(#map, 'isNotableAllowed')")
	public @ResponseBody String saveNewNotables(@RequestBody MultiValueMap<String, String> map) throws Exception 
	{
		for(Map<String,String> notable : ConversionUtil.getParameterCollection("notables", map.toSingleValueMap())){
		    
		    Notable n = null;
		    
		    if(notable.containsKey("id")){
		    	n= notableDao.get(Long.parseLong(notable.get("id")));
		    }
		    else{
		    	n = new Notable();
		    }
		    
		    for(String property : notable.keySet()){
					
			    Object val = null;
			    PropertyDescriptor propDescrip = BeanUtils.getPropertyDescriptor(n.getClass(), property);
					
			    if (propDescrip.getReadMethod().getReturnType() == DataPointCategory.class){
			    	val = dataPointDao.get(Long.parseLong(notable.get(property)));
			    }
			    else if(propDescrip.getReadMethod().getReturnType() == Case.class){
			    	val = caseDao.get(Long.parseLong(notable.get(property)));
			    }
			    else{
			    	val = ConversionUtil.convert(propDescrip.getReadMethod().getReturnType(), notable.get(property));
			    }
			    propDescrip.getWriteMethod().invoke(n, val);
		}
				
    		notableDao.save(n);
		
		}
		
		return "Notables successfully saved";
	}
    	
    


}
