package com.teaminformatics.synodex.dao;

import java.io.Serializable;
import java.util.List;

import org.appfuse.dao.GenericDao;
import org.springframework.util.MultiValueMap;

import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointCategoryGroup;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.DataPointEntryCode;
import com.teaminformatics.synodex.model.DataPointFormEntity;
import com.teaminformatics.synodex.model.LOV;
import com.teaminformatics.synodex.model.LOVValues;
import com.teaminformatics.synodex.model.Languages;
import com.teaminformatics.synodex.model.MasterCodes;
import com.teaminformatics.synodex.model.Notable;


public interface DataPointDao<T, PK extends Serializable> extends LoadableDao<T, PK>
{
   
    
    /**
     * gets datapoint entries and the black box / user defined medical codes.
     * used for step 4 table display
     * @param caseId
     * @return list of DataPointEntryCodes
     */
    public List <DataPointEntry> getDataPointEntriesByCase(final Long caseId) throws Exception;
    

    
    public List <DataPointCategory> getDataPointCategories(final Long groupId, final boolean loadSubCats) throws Exception;
    
   
    
   /**
    * 
    * @param caseId
    * @return list of DataPointEntries
    */
    public List<DataPointEntry> getDPEntries(final Long caseId, final Long stepNo) throws Exception;
    
    
    /**
     * gets a datapoint form entry based on cat and sub cat id's
     * @param catId
     * @param subCatId
     * @return
     */
    public DataPointFormEntity getDataPointForm(final Long catId, final Long subCatId) throws Exception;
    
    /**
     * Load Master Codes based on input of description
     * @param code
     * @param type
     * @param version
     * @return List of MasterCodes Objects
     * @throws Exception
     */
    public List <MasterCodes> getMedicalCodeInfo( final String code, final String type, final String version) throws Exception;

    /**
     * Load Master Code description based on input of medical code
     * @param searchText
     * @param type
     * @param version
     * @return List of MasterCodes Objects
     * @throws Exception
     */
    public Object getMedicalCodeDescription( final String searchText, final String type, final String version) throws Exception;
    
    /**
     * 
     * @param caseId
     * @return
     */
    public List<Notable> getDPNotables(final Long caseId) throws Exception;
    
    /**
     * Check if a code is required for a data point entry.
     * @param clientid
     * @param category
     * @param subcategory
     * @param status
     * @return [T] or [F]
     * @throws Exception
     */
    public List<Object> getIsCodeRequired( final int clientid, final String category, final String subcategory, final String status ) throws Exception;
    /**
     * 
     * @param caseId
     * @param stepNo
     * @param pageId
     * @param rowNumber
     * @return list of DataPointEntries for a particular section.
     */
	public List<DataPointEntry> getDPEntriesForCurrentSection(final Long caseId, final Long stepNo, final Long pageId, final int rowNumber)  throws Exception;
    /**
     * Load Master Code description based on input of subcategoryId
     * @param subCategoryID
     * @param type
     * @param version
     * @return
     * @throws Exception
     */
    
    public List<MasterCodes> getMedicalCodeInfoIWS2( final Long subCategoryID,  final String type, final String version) throws Exception;
    
	 /**
	  * 
	  * @param codeId
	  * @param caseId
	  * @return
	  * @throws Exception
	  */
    public List <DataPointEntry> getDataPointEntriesByCodeAndCase(final Long codeId, final Long caseId ) throws Exception;
    
    /** Load LOV Values based on Lov id
     * 
     * @param lovId
     * @return List of LOV VALUES
     * @throws Exception
     */
    public List<LOVValues> getLovValues(final Long lovId) throws Exception;
    
    /** Load DateFormat Values based on language id
     * 
     * @param languageId
     * @return List of dateFormat VALUES
     * @throws Exception
     */
    public List<Languages> getdateFormatValues(final Long languageId) throws Exception;
    
}
