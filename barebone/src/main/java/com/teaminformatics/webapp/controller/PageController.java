package com.teaminformatics.webapp.controller;
 
import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.Id;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.dao.ErrorDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.DataPointFormEntity;
import com.teaminformatics.synodex.model.DocumentType;
import com.teaminformatics.synodex.model.DocumentTypeGroup;
import com.teaminformatics.synodex.model.Error;
import com.teaminformatics.synodex.model.Page;
import com.teaminformatics.synodex.model.Session;
import com.teaminformatics.webapp.util.ControllerUtil;
import com.teaminformatics.webapp.util.ConversionUtil;

@Controller
//@RequestMapping("/pages")
public class PageController
{
	private static final Log log = LogFactory.getLog(PageController.class);
	
	private PageDao pageDao = null;
	
	private LoadableDao<DocumentType, Long> documentTypeDao = null;
	private LoadableDao<DocumentTypeGroup, Long> documentTypeGroupDao = null;
	
	private AuditDao auditLogDao = null;
	//private ErrorDao errorLogDao = null;

	@Autowired
	public void setPageDao(PageDao pageDao) 
	{
	    this.pageDao = pageDao; 
	}
	
	@Autowired
	public void setDocumentTypeDao(LoadableDao<DocumentType, Long> documentTypeDao) 
	{
	    this.documentTypeDao = documentTypeDao; 
	}
	@Autowired
	public void setDocumentTypeGroupDao(LoadableDao<DocumentTypeGroup, Long> documentTypeGroupDao) 
	{
	    this.documentTypeGroupDao = documentTypeGroupDao; 
	}
	
	@Autowired
	public void setAuditDao(AuditDao auditLogDao) 
	{
	    this.auditLogDao = auditLogDao; 
	}
	
	@RequestMapping("/pages/{pageId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#pageId, 'isPageAllowed')")
	public @ResponseBody Page getPage(@PathVariable Long pageId) 
	{
		return pageDao.getWithPropertiesLoaded(pageId, new String[]{ "dataPointEntries" });
	}
	
	@RequestMapping(value="/pages/{pageId}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated() and hasPermission(#pageId, 'isPageAllowed')")
	public @ResponseBody String update(@PathVariable Long pageId, @RequestBody MultiValueMap<String, String> map) throws Exception 
	{
		Pattern p = Pattern.compile("page\\[(.*?)\\]");
		
		Page page = pageDao.get(pageId);
		for(String key : map.keySet())
		{
			Matcher matcher = p.matcher(key);
			if(matcher.find())
			{
				//Sanity Check
				if(matcher.groupCount() > 0) {
					String property = matcher.group(1);
					
					if(log.isDebugEnabled())
			    	{
			    		log.debug("Finding converter for [" + property + "]");
			    	}
					Object val = null;
					PropertyDescriptor propDescrip = BeanUtils.getPropertyDescriptor(page.getClass(), property);
					if(propDescrip.getReadMethod().getReturnType() == DocumentType.class) { //null && propDescrip.getReadMethod().getReturnType().getAnnotation(Entity.class) != null) {
					    Pattern pa = Pattern.compile("page\\[.*?\\]\\[(.*?)\\]");
						Matcher pam = pa.matcher(key);
						if(pam.find() && pam.groupCount() == 1)
						{
						    String attrName = pam.group(1);
						    
						    if(propDescrip.getReadMethod().getReturnType().getDeclaredField(attrName).getAnnotation(Id.class) != null)
							    {

							    val = documentTypeDao.get(Long.parseLong(map.getFirst(key)));
							    }
						}
					}
					  else {
					      val = ConversionUtil.convert(propDescrip.getReadMethod().getReturnType(), map.getFirst(key));	
					  }
					
					if(val != null)
					{
					    propDescrip.getWriteMethod().invoke(page, val);
					}
				}
			}
			
			
		}
		page.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		pageDao.save(page);
		return "success";
	}
	
	/**
	 *	TODO Add a transaction around this entire method.
	 * This method will take a put in the following form:
	 * 
	 * pages : [
	 *			{ id : '1', finalPageNumber : 1 },
	 *			{ id : '2', finalPageNumber : 2 },
	 *			{ id : '3', finalPageNumber : 3 }]
	 * 
	 * and update any of the properties specified on the batch of pages specified.
	 * 
	 * @param map Auto-created map through spring MVC of PUT parameters
	 * @throws Exception An update error occurred within the mass update.
	 */
	@RequestMapping(value="/pages", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated() and hasPermission(#map, 'isPageAllowed')")
	public @ResponseBody String massUpdatePropertyForPages(@RequestBody MultiValueMap<String, String> map) throws Exception 
	{
		for(Map<String,String> uPage : ConversionUtil.getParameterCollection("pages", map.toSingleValueMap()))
		{
			if(uPage.containsKey("id"))
			{
				Page page = pageDao.get(Long.parseLong(uPage.get("id")));
				
				uPage.remove("id"); //Remove the ID from the list of properties.
				for(String property : uPage.keySet())
				{
					if(log.isDebugEnabled())
			    	{
			    		log.debug("Finding converter for [" + property + "]");
			    	}
					Object val = null;
					PropertyDescriptor propDescrip = BeanUtils.getPropertyDescriptor(page.getClass(), property);
					if(propDescrip.getReadMethod().getReturnType() == DocumentType.class){
						val = documentTypeDao.get(Long.parseLong(uPage.get(property)));
					}
					else
						val = ConversionUtil.convert(propDescrip.getReadMethod().getReturnType(), uPage.get(property));
					if(val!=null)
						propDescrip.getWriteMethod().invoke(page, val);
				}
				
				pageDao.save(page);
			}
			else
			{
				throw new IllegalArgumentException("An ID must be specified on all page objects within the mass update.");
			}
		}
		
		return String.valueOf(true);
	}
	
	@RequestMapping("/pages/rotate")
	@PreAuthorize("isAuthenticated() and hasPermission(#pageIds, 'isPageAllowed')")
	public @ResponseBody String getPage(@RequestParam(value = "pageIds") String pageIds, @RequestParam(value = "orientation") Integer orientation) 
	{
		log.info(String.format("Rotating Pages [%1$s] to orientation [%2$d]", pageIds, orientation));
		
		List<Long> ids = ConversionUtil.convertCommaDelimitedList(Long.class, pageIds);
		pageDao.rotate(ids, orientation);
		return "success";
	}
	
	@RequestMapping("/document_types")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody List<DocumentType> getDocumentTypes() 
	{
		return documentTypeDao.getAll();
	}
	
	@RequestMapping("/document_types/{groupId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody List<DocumentTypeGroup> getDocumentTypesByGroup(@PathVariable Long groupId) 
	{
		Map<String,Object> params = new HashMap<String,Object>();
    	params.put("groupid", groupId);
    	return documentTypeGroupDao.findByNamedQuery("DocumentTypeGroup.findByGroupId", params);
		
	}
	
	/**
	 * Inserts entry into Audit Log table Used in step 1 and 2
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/auditLogEntry")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	String insertAuditLogEntry(@RequestBody MultiValueMap<String, String> map)
			throws Exception {

		Audit entry = new Audit();
		
		// call generic local method used for inserts and updates
		return doAuditLogEntryUpdate(entry, map);
	}
	
	/**
	 * This function does the actual update / insert to the Audit Log table
	 * 
	 * @param entry
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private String doAuditLogEntryUpdate(Audit entry,
			MultiValueMap<String, String> map) throws Exception {

		LoadableDao dao = null;
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

		auditLogDao.save(entry);
		return "success";
	}
}
