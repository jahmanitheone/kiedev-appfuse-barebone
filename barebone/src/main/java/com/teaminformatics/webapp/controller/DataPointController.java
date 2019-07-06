package com.teaminformatics.webapp.controller;
 
import static org.appfuse.Constants.STAGE_POP;

import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.dao.DataPointEntryDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.CategorizedView;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.DataPointEntryView;
import com.teaminformatics.synodex.model.DataPointFormEntity;
import com.teaminformatics.synodex.model.LOVValues;
import com.teaminformatics.synodex.model.Languages;
import com.teaminformatics.synodex.model.MedicalHierarchy;
import com.teaminformatics.synodex.model.MedicalHierarchyView;
import com.teaminformatics.synodex.model.Notable;
import com.teaminformatics.synodex.model.Page;
import com.teaminformatics.webapp.util.ControllerUtil;
import com.teaminformatics.webapp.util.ConversionUtil;

@Controller
@RequestMapping("/dataPoint")
public class DataPointController {

	private static final Log log = LogFactory.getLog(DataPointController.class);
	private DataPointDao<DataPointCategory, Long> dataPointDao = null;
	private DataPointEntryDao dataPointEntryDao = null;
	private LoadableDao<Page, Long> pageDao = null;
	private LoadableDao<DataPointFormEntity, Long> dataPointFormEntityDao = null;
	private MedicalHierarchyViewDao medicalHierarchyViewDao = null;
	

	@Autowired
	public void setMedicalHierarchyViewDao(
			MedicalHierarchyViewDao medicalHierarchyViewDao) {
		this.medicalHierarchyViewDao = medicalHierarchyViewDao;
	}


	@Autowired
	public void setDataPointDao(
			DataPointDao<DataPointCategory, Long> dataPointDao) {
		this.dataPointDao = dataPointDao;
	}

	@Autowired
	public void setDataPointEntryDao(DataPointEntryDao dataPointEntryDao) {
		this.dataPointEntryDao = dataPointEntryDao;
	}

	@Autowired
	public void setPageDao(LoadableDao<Page, Long> pageDao) {
		this.pageDao = pageDao;
	}

	@Autowired
	public void setDataPointFormEntityDao(
			LoadableDao<DataPointFormEntity, Long> dataPointFormEntityDao) {
		this.dataPointFormEntityDao = dataPointFormEntityDao;
	}
/*
	*//**
	 * 
	 * @param groupId
	 * @return returns a list of categories and sub categories
	 *//*
	@RequestMapping("/dataPointInfo/{groupId}")
	public @ResponseBody
	List<DataPointCategory> getDataPointCategory(@PathVariable Long groupId) throws Exception{

		return dataPointDao.getDataPointCategories(groupId, true);
	}*/

	/**
	 * called by displayThumbnails() in page.thumbnail.display_helper.js to populate objDPInfo object for left side navigation
	 * @param id Case ID
	 * @return returns a list of categories
	 */
	@SuppressWarnings("null")
	@RequestMapping("/dataPointInfo/{id}")
	public @ResponseBody
	List<MedicalHierarchyView> getDataPointCategory(@PathVariable Long id) throws Exception{
		List<MedicalHierarchyView> navigator = medicalHierarchyViewDao.getTopTwoLevelNavigationTree(id);
		return navigator;
	}
		
	/**
	 * Search by Category ,Code and Both based on radio button checked criteria, and return the navigation tree
	 * populate searchObjDPInfo object for left side navigation
	 * 
	 * @param id Case ID
	 * @param searchType Type of search like category, Code and Both
	 * @param containsClause contains clause for text search
	 * @return returns a list of categories
	 */
	@RequestMapping("/searchCriteria/{caseid}/{searchType}/{searchTerm}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseid, 'isCaseAllowed')")
	public @ResponseBody List<MedicalHierarchyView> searchDataPoint(@PathVariable Long caseid, @PathVariable String searchType, @PathVariable String searchTerm) throws Exception
	{
		List<MedicalHierarchyView> navigator = new LinkedList<MedicalHierarchyView>();
		//retrieve the top level nodes
		List<MedicalHierarchyView> parentNodes = medicalHierarchyViewDao.getMainLevelMedicalHierarchyViews(caseid,searchType,searchTerm);
		for (MedicalHierarchyView parentNode : parentNodes) {
			//this is level 1
			parentNode.setLevel(new Long(1));
			navigator.add(parentNode);
			
			int hid = parentNode.getId().intValue();
			//get branch depth for each parent node
			Long depth;
			try {
				depth = medicalHierarchyViewDao.getTreeDepth(hid);
			} catch (Exception e) { //if it gets to leaf node for some reason, return 1
				depth = new Long(1);
			}
			//if there is only 2 levels, not to add level 2
			if (depth > 2) {
				List<MedicalHierarchyView> childNodes = new LinkedList<MedicalHierarchyView>();
				try {
					//get level 2 child nodes
					//childNodes = medicalHierarchyViewDao.getNextDecendantView(hid);
					childNodes = medicalHierarchyViewDao.getNextDecendantView(hid, depth, caseid, searchType,searchTerm);
				} catch (Exception e) {
					throw e;
				}
				for (MedicalHierarchyView childNode : childNodes) {
					//this is level 2
					childNode.setLevel(new Long(2));
					navigator.add(childNode);
				}
			}		
		}

		return navigator;
	}
	
	/**
	 * 
	 * @param groupId
	 * @return returns a list of categories without the subcategories
	 */
	@RequestMapping("/dataPointInfo/{groupId}/nosubcats")
	public @ResponseBody
	List<DataPointCategory> getDataPointCategoryNoSubCats(
			@PathVariable Long groupId) throws Exception {
		return dataPointDao.getDataPointCategories(groupId, false);
	}

	/**
	 * gets a data point form when there is no sub categories! it is important
	 * to only call this if no sub category is present
	 * 
	 * @param catId
	 * @return
	 */
	@RequestMapping("/entityForm/{catId}")
	public @ResponseBody
	DataPointFormEntity getDataPointFormCategoryOnly(@PathVariable Long catId)throws Exception {
		// calls overriding local method
		return getDataPointForm(catId, null);
	}

	/**
	 * gets a data point form searching on category and sub category
	 * 
	 * @param catId
	 * @param subCatId
	 * @return
	 */
	@RequestMapping("/entityForm/{catId}/{subCatId}")
	public @ResponseBody
	DataPointFormEntity getDataPointForm(@PathVariable Long catId,
			@PathVariable Long subCatId) throws Exception{

		return dataPointDao.getDataPointForm(catId, subCatId);
	}

/**
 * gets all data point entries based on caseid
 * @param caseId
 * @return list of DPENTRIES
 */
	/*@RequestMapping("/dataPointEntries/{caseId}/step/{stepNo}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody List<DataPointEntry> getDPEntries(@PathVariable Long caseId, @PathVariable Long stepNo) throws Exception{
		return dataPointDao.getDPEntries(caseId, stepNo);
	}*/
	
	/**
	 * gets data point entries based on current selected section.
	 * @param caseId
	 * @param stepNo
	 * @param pageId
	 * @param rowNumber
	 * @return list of DPENTRIES
	 */
	@RequestMapping("/dataPointEntries/{caseId}/step/{stepNo}/pageId/{pageId}/rowNumber/{rowNumber}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody List<DataPointEntryView> getDPEntries(@PathVariable Long caseId, @PathVariable Long stepNo,@PathVariable Long pageId, @PathVariable String rowNumber) throws Exception{
		return medicalHierarchyViewDao.getDataForSectionSpecificDPList(caseId, stepNo, pageId, rowNumber);
	}
	
	/**
	 * gets all data point entries based on caseid
	 * @param caseId
	 * @return list of DPENTRIES
	 */
	@RequestMapping("/dataPointEntries/{caseId}/step/{stepNo}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody List<DataPointEntryView> getDPEntries(@PathVariable Long caseId,@PathVariable Long stepNo) throws Exception{
		return  medicalHierarchyViewDao.getDataForFullDPList(caseId);
	}

	/**
	 * gets all dpnotables based on case id
	 * @param caseId
	 * @return list of DPNOTABLES
	 */
	@RequestMapping("/dataPointNotables/{caseId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody List<Notable> getDPNotables(@PathVariable Long caseId) throws Exception{

		return dataPointDao.getDPNotables(caseId);
	}

	
	/**
	 * gets all Lov Values based on lov id
	 * @param caseId
	 * @return list of DPNOTABLES
	 */
	@RequestMapping("/dataPointLovValues/{lovId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody List<LOVValues> getLOVValues(@PathVariable Long lovId) throws Exception{

		return dataPointDao.getLovValues(lovId);
	}
	/**
	 * Inserts data point entry into DataPointEntry table Used in step 2
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/dataPointEntryUpdate")
	@PreAuthorize("isAuthenticated() and hasPermission(#map, 'isDataPointEntryAllowed')")
	public @ResponseBody
	String insertDataPoints(@RequestBody MultiValueMap<String, String> map)
			throws Exception {

		DataPointEntry entry = new DataPointEntry();
		
		// call generic local method used for inserts and updates
		return doDataPointEntryUpdate(entry, map);
	}

	/**
	 * Updates data point entry into DataPointEntry table Used in step 2
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/dataPointEntryUpdate/{entryId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#entryId, 'isDataPointEntryAllowed')")
	public @ResponseBody
	String updateDataPoints(@PathVariable Long entryId,
			@RequestBody MultiValueMap<String, String> map) throws Exception {

		// get current row to be updates
		DataPointEntry entry = dataPointEntryDao.get(entryId);

		// call generic local method used for inserts and updates
		return doDataPointEntryUpdate(entry, map);
	}
	
	/**
	 * insert data point entry into DataPointEntry table Used in step 2
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/dataPointEntryIWS2Update")
	@PreAuthorize("isAuthenticated() and hasPermission(#map, 'isDataPointEntryAllowed')")
	public @ResponseBody
	Long updateDataPointsIWS2(@RequestBody MultiValueMap<String, String> map) throws Exception {

		// get current row to be updates
		DataPointEntry entry = new DataPointEntry();

		// call generic local method used for inserts and updates
		return doDataPointEntryIWS2Update(entry, map);
	}

	/**
	 * Updates data point entry into DataPointEntry table Used in step 2
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/dataPointEntryIWS2Update/{entryId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#entryId, 'isDataPointEntryAllowed')")
	public @ResponseBody
	Long updateDataPointsIWS2(@PathVariable Long entryId,
			@RequestBody MultiValueMap<String, String> map) throws Exception {

		// get current row to be updates
		DataPointEntry entry = dataPointEntryDao.get(entryId);

		// call generic local method used for inserts and updates
		return doDataPointEntryIWS2Update(entry, map);
	}
	
	/**
	 * This function does the actual update / insert to the DataPointEntry table
	 * 
	 * @param entry
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private String doDataPointEntryUpdate(DataPointEntry entry,
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

					if (propDescrip.getReadMethod().getReturnType() == Page.class) {

						val = pageDao.get(Long.parseLong(map.getFirst(key)));
					} else if (propDescrip.getReadMethod().getReturnType() == DataPointFormEntity.class) {
						val = dataPointFormEntityDao.get(Long.parseLong(map
								.getFirst(key)));
					} else {
						val = ConversionUtil.convert(propDescrip
								.getReadMethod().getReturnType(), map
								.getFirst(key));
					}

					if (val != null) {
						propDescrip.getWriteMethod().invoke(entry, val);
					}
				}
			}

		}
		
		dataPointEntryDao.save(entry);
		return "success";
	}
	
	/**
	 * This function does the actual update / insert to the DataPointEntry table
	 * 
	 * @param entry
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Long doDataPointEntryIWS2Update(DataPointEntry entry,
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

					if (propDescrip.getReadMethod().getReturnType() == Page.class) {

						val = pageDao.get(Long.parseLong(map.getFirst(key)));
					} else if (propDescrip.getReadMethod().getReturnType() == MedicalHierarchy.class) {
						val = medicalHierarchyViewDao.getMedicalHierarchyData(Long.parseLong(map
								.getFirst(key)));
					} else if (propDescrip.getReadMethod().getReturnType() == DataPointFormEntity.class) {
						val = dataPointFormEntityDao.get(Long.parseLong(map
								.getFirst(key)));
					}else {
						val = ConversionUtil.convert(propDescrip
								.getReadMethod().getReturnType(), map
								.getFirst(key));
					}

					if (val != null) {
						propDescrip.getWriteMethod().invoke(entry, val);
					}
				}
			}

		}
		if(entry.getDpentryid()==null){
		entry.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		entry.setCreatedStageId(entry.getStage().getId());
		}
		DataPointEntry savedDpEntry = dataPointEntryDao.save(entry);
		return savedDpEntry.getDpentryid();
	}

	/**
	 * Soft delete a datapoint by setting the isDeleted='Y' and not doing a physical delete
	 * 
	 * @param entryId - The datapoint id to delete
	 * @return "success" if delete took place successfully
	 * @throws Exception
	 */
	@RequestMapping("/dataPointSoftDelete/{entryId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#entryId, 'isDataPointEntryAllowed')")
	public @ResponseBody
	String softDeleteDataPoint(@PathVariable Long entryId) throws Exception {
		try {
			dataPointEntryDao.softDeleteDataPoint(entryId);
		} catch (Throwable e) {
			throw new Exception("Could not delete datapoint " + entryId);
		}

		return "success";
	}
	/**
	 * save DataPointentry Transcription for entryId if isText=='Y'
	 * @param entryId
	 * @param MultiValueMap
	 * @param fieldNumber
	 * @return
	 * @throws Exception  ///@RequestMapping("/dataPointEntryIWS2Update/{entryId}")
	 */
	@RequestMapping("/dataPointTranscript/{entryId}/{fieldNumber}")
	@PreAuthorize("isAuthenticated() and hasPermission(#entryId, 'isDataPointEntryAllowed')")
	public @ResponseBody
	String saveDataPointTranscript(@PathVariable Long entryId,@PathVariable Integer fieldNumber,@RequestBody MultiValueMap<String, String> map) throws Exception {
		// get current row to be updates
		DataPointEntry entry = dataPointEntryDao.get(entryId);
		Pattern p = Pattern.compile("entry\\[(.*?)\\]");
		for (String key : map.keySet()) {
			Matcher matcher = p.matcher(key);
			if (matcher.find()) {
				// Sanity Check
				if (matcher.groupCount() > 0) {
					Object val = null;
					String property = matcher.group(1);
					PropertyDescriptor propDescrip = BeanUtils.getPropertyDescriptor(entry.getClass(), property);

						val = ConversionUtil.convert(propDescrip.getReadMethod().getReturnType(), map.getFirst(key));

						if (val != null) {
							propDescrip.getWriteMethod().invoke(entry, val);
						}
				}
			}

		}
		dataPointEntryDao.saveDataPointTranscript(entryId,entry,fieldNumber);

		return "success";
	}
	
	/**
	 * Multiple delete  datapoints by setting the isDeleted='Y' and not doing a physical delete
	 * 
	 * @param entryId - The datapoint id to delete
	 * @return "success" if delete took place successfully
	 * @throws Exception
	 */
	//IWS:264 Jira Issue to delete multiple data points
	@RequestMapping(value="/dataPointSoftMultipleDelete", params="entryid")
	//@PreAuthorize("isAuthenticated() and hasPermission(#entryId, 'isDataPointEntryAllowed')")
	public @ResponseBody String mutipleDeleteDataPoint(@RequestParam("entryid") String[] entryIds) throws Exception
	{
		for (int i = 0; i < entryIds.length; i++) 
		{
			try 
			{
				dataPointEntryDao.softDeleteDataPoint(Long.parseLong(entryIds[i]));
			} 
			catch (Throwable e) 
			{
				throw new Exception("Could not delete datapoint " + entryIds[i]);
			}
		}
		return "success";
	}
	
	/**
	 * 
	 * 
	 * @param map
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/medicalCode/{newCode}/{revision}")
	public @ResponseBody List<MedicalHierarchy> CheckForMedicalCodeExistance(@PathVariable String newCode, @PathVariable String revision) throws Exception {
		//need to replace "." with "*" to avoid spring issue with truncation due to thinking the . is for a file extension
		// Converting lower case ICD Code to upper case ICD Code
		return medicalHierarchyViewDao.checkForMedicalCodeExistance(newCode.replace("*", ".").toUpperCase(), revision.replace("*", "."));
	}
	
	/**
	 * @param newcode
	 * @param revision
	 * @return success or exception
	 * @throws Exception
	 */
	@RequestMapping("/medicalCode/{dpEntryId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#dpEntryId, 'isDataPointEntryAllowed')")
	public @ResponseBody Long updateDataPointEntryforNewCodePageSection(@PathVariable Long dpEntryId,
			@RequestBody MultiValueMap<String, String> map) throws Exception {
		// get current row to be updates
		DataPointEntry entry = dataPointEntryDao.get(dpEntryId);

		// call generic local method used for inserts and updates
		return doDataPointEntryIWS2Update(entry, map);
	}
	
	/**
	 * gets all Lov Values based on lov id
	 * @param caseId
	 * @return list of DPNOTABLES
	 */
	@RequestMapping("/dataPointLanguage/{languageId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody List<Languages> getdateFormat(@PathVariable Long languageId) throws Exception{

		return dataPointDao.getdateFormatValues(languageId);
	}
	
	@RequestMapping("/loadBackGroundDPEntries/{caseId}")
    @PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
    public @ResponseBody List<CategorizedView> getBackGroundDataPointEntries(@PathVariable Long caseId) throws Exception{
       	List <CategorizedView> entry = dataPointEntryDao.getBackGroundDataEntries(caseId);
    	return  entry;
    }
	
	@RequestMapping("/loadDPEntries/{caseId}/{modifiedOnly}")
    @PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
    public @ResponseBody List <CategorizedView> getDataPointEntries(@PathVariable Long caseId,@PathVariable Boolean modifiedOnly) throws Exception{
       	List <CategorizedView> entry = dataPointEntryDao.getDataPointEntries(caseId,modifiedOnly);
    	//return  getCategoryWiseGroupData(entry);
       	return  entry;
    }
	

	@RequestMapping("/checkImpairedOrStandard/{caseId}")
    @PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
    public @ResponseBody String getImpairedCaseOrStandard(@PathVariable Long caseId) throws Exception{
       	Integer count= dataPointEntryDao.getCaseImpairedOrStandard(caseId);
       	if(count>0)
       		return "Impaired Case";
       	else 
    	return  "Standard Case";
    }
}
