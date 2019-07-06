package com.teaminformatics.webapp.controller;
 
import java.beans.PropertyDescriptor;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonManagedReference;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.DataPointEntryCode;
import com.teaminformatics.synodex.model.DataPointFormEntity;
import com.teaminformatics.synodex.model.LOV;
import com.teaminformatics.synodex.model.MasterCodes;
import com.teaminformatics.synodex.model.MedicalHierarchyView;
import com.teaminformatics.synodex.model.Notable;
import com.teaminformatics.webapp.util.ControllerUtil;
import com.teaminformatics.webapp.util.ConversionUtil;

@Controller
@RequestMapping("/dataPointEntryCode")
public class DataPointEntryCodeController {

    private DataPointDao<DataPointCategory, Long> dataPointDao = null;
    private LoadableDao<DataPointEntryCode, Long> dataPointEntryCodeDao = null;
    private LoadableDao<DataPointEntry, Long> dataPointEntryDao = null;
    private MedicalHierarchyViewDao medicalHierarchyViewDao = null;

	@Autowired
	public void setMedicalHierarchyViewDao(
			MedicalHierarchyViewDao medicalHierarchyViewDao) {
		this.medicalHierarchyViewDao = medicalHierarchyViewDao;
	}


    @Autowired
    public void setDataPointDao(DataPointDao<DataPointCategory, Long> dataPointDao) {
	this.dataPointDao = dataPointDao;
    }
    @Autowired
    public void setDataPointEntryCodeDao(LoadableDao<DataPointEntryCode, Long> dataPointEntryCodeDao) {
	this.dataPointEntryCodeDao = dataPointEntryCodeDao;
    }
    @Autowired
    public void setDataPointEntryDao(LoadableDao<DataPointEntry, Long> dataPointEntryDao) {
	this.dataPointEntryDao = dataPointEntryDao;
    }

/**
 * 
 * @param dpentryid
 * @return
 */
    @RequestMapping("/{dpentryid}")
	@PreAuthorize("isAuthenticated() and hasPermission(#dpentryid, 'isDataPointEntryAllowed')")
    public @ResponseBody DataPointEntry getDataPointEntryCodes(@PathVariable Long dpentryid) {
		return dataPointEntryDao.getWithPropertiesLoaded(dpentryid, new String[]{"codes"});
    }

/**
 * GET /case/<ID>/entries
 * @param caseId
 * @return
 */
    @RequestMapping("/case/{caseId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
    public @ResponseBody List<DataPointEntry> getDataPointEntriesByCase(@PathVariable Long caseId) throws Exception{
    	List <DataPointEntry> entry = dataPointDao.getDataPointEntriesByCase(caseId);
    	return  entry;
    } 
    /**
     * 
     * @param map
     * @return
     */
    @RequestMapping("/update")
	@PreAuthorize("isAuthenticated() and hasPermission(#map, 'isDataPointEntryAllowed')")
    public @ResponseBody String  updateMedicalCodes(@RequestBody  MultiValueMap<String, String>  map)throws Exception {

		DataPointEntryCode dpc = null;
		Long entryId = null;
		for(Map<String,String> code : ConversionUtil.getParameterCollection("codes", map.toSingleValueMap())){
	 	    if(code.containsKey("dpecid")){
	 	    	dpc = dataPointEntryCodeDao.get(Long.parseLong(code.get("dpecid")));
	 	    }
	 	    else{
	 	    	dpc = new DataPointEntryCode();
	 	 
	 	    }
	 	    
	 	    for(String property : code.keySet()){
	 				
	 		    Object val = null;
	 		    PropertyDescriptor propDescrip = BeanUtils.getPropertyDescriptor(dpc.getClass(), property);
	 				
	 		    if (propDescrip.getPropertyType() == DataPointEntry.class){
	 		    	//set this for later to save isComplete flag
	 		    	entryId = Long.parseLong(code.get(property));
	 		    	val = dataPointEntryDao.get(entryId);
	 		    } 		    
	 		    else{
	 		    	val = ConversionUtil.convert(propDescrip.getReadMethod().getReturnType(), code.get(property));
	 		    }
	 		    if (val!=null)
	 		    	propDescrip.getWriteMethod().invoke(dpc, val);	
	 	    }
	 	/* These  two lines are added for converting 
	 	 * lower case code  to upper case code
	 	 * by Ankit Mathur
	 	 */
	 	    String codeStr=dpc.getCode().toUpperCase();
	 	    dpc.setCode(codeStr);
	 	  
	 	   dataPointEntryCodeDao.save(dpc);
	 	}
    	
		if (entryId!=null){
			//set the datapoint entry to complete after the user has done a save
			DataPointEntry entry = dataPointEntryDao.get(entryId);
			entry.setIsCompleted(true);
			dataPointEntryDao.save(entry);
			
		}
			
		return "data point codes successfully saved";

     }

    @RequestMapping("/loadMedicalCode//{code}/{type}/{version}")
	@PreAuthorize("isAuthenticated()")
    public @ResponseBody List<MasterCodes> getMedicalCodeInfo(@PathVariable String code, @PathVariable String type, @PathVariable String version ) throws Exception{
    	return dataPointDao.getMedicalCodeInfo(code, type, version);
    }
    
    @RequestMapping("/loadMedicalCodeDescription/{code}/{type}/{version}")
	@PreAuthorize("isAuthenticated()")
    public @ResponseBody Object getMedicalCodeDescription(@PathVariable String code, @PathVariable String type, @PathVariable String version ) throws Exception{
     //need to replace "." with "*" to avoid spring issue with truncation due to thinking the . is for a file extension
    // there is a gloabl way to change, but i am not sure yet what it would break.
     	//String upper_str=code.toUpperCase();// this is for converting lower case ICD Code to upper case ICD Code
     	//System.out.println("Upper Case ICD Code:-"+upper_str);
    	return dataPointDao.getMedicalCodeDescription(code.replace("*", "."), type, version);
    }  
    
    /**
     * GET /isCodeRequired/clientid/category/subcategory/status
     * @param clientid
     * @param category
     * @param subcategory
     * @param status
     * @return [T] or [F]
     */
    @RequestMapping("/isCodeRequired/{clientid}/{category}/{subcategory}/{status}")
	@PreAuthorize("isAuthenticated()")
    public @ResponseBody List<Object> getIsCodeRequired(@PathVariable int clientid, @PathVariable String category, @PathVariable String subcategory, @PathVariable String status) throws Exception{
    	return dataPointDao.getIsCodeRequired(clientid,category,subcategory,status);
    }
    

    /**load all medical codes for selected subcategory
     * 
     * @param caseId
     * @param subCategoryID
     * @return
     * @throws Exception
     */
    @RequestMapping("/loadMedicalCodeIWS2/{subCategoryID}/{caseId}")
   	@PreAuthorize("isAuthenticated()")
    public @ResponseBody List<MedicalHierarchyView> getMedicalCodeInfoIWS2(@PathVariable Long subCategoryID, @PathVariable String caseId) throws Exception{
    	//get branch depth for the parent node
		Long depth;
		try {
			depth = medicalHierarchyViewDao.getTreeDepth(subCategoryID.intValue());
		} catch (Exception e) { //if it gets to leaf node for some reason, throw error
			throw e;
		}
		//get all the levels for code selection panel
    	return medicalHierarchyViewDao.getNextDecendantRangeView(2, depth.intValue(), subCategoryID.intValue(), caseId);
    }

    /**load all medical codes for code selection panel selected subcategory and search term
     * 
     * @param id Case ID
     * @param subCategoryID
     * @param searchType
     * @param searchTerm
     * @return
     * @throws Exception
     */
    @RequestMapping("/loadMedicalCodeIWS2/{id}/{subCategoryID}/{searchType}/{searchTerm}")
   	@PreAuthorize("isAuthenticated()")
    public @ResponseBody List<MedicalHierarchyView> getMedicalCodeInfoIWS2(@PathVariable Long id, @PathVariable Long subCategoryID, @PathVariable String searchType, @PathVariable String searchTerm) throws Exception{
		List<MedicalHierarchyView> codePanel = new LinkedList<MedicalHierarchyView>();
		//retrieve the first level nodes
		List<MedicalHierarchyView> parentNodes = medicalHierarchyViewDao.getNextDecendantView(subCategoryID.intValue(), null, id, searchType,searchTerm);
		for (MedicalHierarchyView parentNode : parentNodes) {
			//this is level 1
			Long level = new Long(1);
			//recursively add this node and its child nodes
			addCurrentNodeAndChildren(codePanel, parentNode, level, id, searchType, searchTerm);
		}

		return codePanel;
	}
    
	/**
	 * Helper class for getMedicalCodeInfoIWS2 for search, recursively add parent and child nodes
	 */
	private void addCurrentNodeAndChildren(List<MedicalHierarchyView> navigator, MedicalHierarchyView parentNode, Long level,
			Long caseid, String searchType, String searchTerm) throws Exception {
		//add this node first at the current level
		parentNode.setLevel(level);
		navigator.add(parentNode);
		
		int hid = parentNode.getId().intValue();
		//get branch depth for each parent node
		Long depth;
		try {
			depth = medicalHierarchyViewDao.getTreeDepth(hid);
		} catch (Exception e) { //if it gets to leaf node, return 1
			depth = new Long(1);
		}
		if (depth >= 2) {
			//get child nodes
			List<MedicalHierarchyView> childNodes = new LinkedList<MedicalHierarchyView>();
			try {
				if (searchType == null)
					//for future use
					childNodes = medicalHierarchyViewDao.getNextDecendantView(hid, caseid);
				else
					childNodes = medicalHierarchyViewDao.getNextDecendantView(hid,depth, caseid, searchType,searchTerm);
			} catch (Exception e) {
				throw e;
			}
			//if there is no child node, this tree branch is done; otherwise, go one level deeper		
			if (childNodes.size() > 0) {
				level++;
				for (MedicalHierarchyView childNode : childNodes) {
					addCurrentNodeAndChildren(navigator, childNode, level, caseid, searchType, searchTerm);
				}
			}
		
		}
	}
	
	/**
     * GET /code/<ID>/entries
     * @param codeId
     * @return
     */
    @RequestMapping("/loadDPEntries/{codeId}/{caseId}")
    @PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
    public @ResponseBody List<DataPointEntry> getDataPointEntriesByCodeAndCase(@PathVariable Long codeId,@PathVariable Long caseId) throws Exception{
       	List <DataPointEntry> entry = dataPointDao.getDataPointEntriesByCodeAndCase(codeId,caseId);
    	return  entry;
    }     
}
