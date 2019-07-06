package com.teaminformatics.webapp.controller;
 
import java.beans.PropertyDescriptor;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.teaminformatics.synodex.dao.ErrorDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.model.Error;
import com.teaminformatics.webapp.util.ConversionUtil;

@Controller
@RequestMapping("/error")
public class ErrorController {

	private static final Log log = LogFactory.getLog(DataPointController.class);
	private ErrorDao errorLogDao = null;

	@Autowired
	public void setErrorDao(ErrorDao errorLogDao) 
	{
	    this.errorLogDao = errorLogDao; 
	}
	
	/**
	 * Inserts entry into errorlog table.
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/errorLogEntry")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	String insertErrorLogEntry(@RequestBody MultiValueMap<String, String> map)
			throws Exception {

		Error entry = new Error();
		
		// call generic local method used for inserts and updates
		return doErrorLogInsert(entry, map);
	}
	
	/**
	 * This function does the actual insert to the errorlog table.
	 * 
	 * @param entry
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private String doErrorLogInsert(Error entry,
		MultiValueMap<String, String> map) throws Exception {

		Pattern p = Pattern.compile("entry\\[(.*?)\\]");
		for (String key : map.keySet()) {
			Matcher matcher = p.matcher(key);
			if (matcher.find()) {
				// Sanity Check
				if (matcher.groupCount() > 0) {
					Object val = null;
					String property = matcher.group(1);
					PropertyDescriptor propDescrip = BeanUtils
							.getPropertyDescriptor(entry.getClass(), property);
					
					val = ConversionUtil.convert(propDescrip
						.getReadMethod().getReturnType(), map
						.getFirst(key));
					
					propDescrip.getWriteMethod().invoke(entry, val);
					
				}
			}
		}

		errorLogDao.saveErrorLog(entry);
		return "success";
	}

}
