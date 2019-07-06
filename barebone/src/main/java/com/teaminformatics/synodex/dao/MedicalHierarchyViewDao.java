package com.teaminformatics.synodex.dao;

import java.util.List;

import org.hibernate.HibernateException;

import com.teaminformatics.synodex.model.DataPointEntryView;
import com.teaminformatics.synodex.model.MedicalHierarchy;
import com.teaminformatics.synodex.model.MedicalHierarchyView;

/**
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 * @dated 2012/04/25
 */
public interface MedicalHierarchyViewDao extends LoadableDao<MedicalHierarchyView, Long> {
	public List<MedicalHierarchyView> getAllMedicalHierarchyViews() throws Exception;
	
	//this is used to get level 1 on the left side hierarchy when not searching the hierarchy
	public List<MedicalHierarchyView> getMainLevelMedicalHierarchyViews(Long id) throws Exception;
	//this is used to get level 1 on the left side hierarchy when searching the hierarchy
	public List<MedicalHierarchyView> getMainLevelMedicalHierarchyViews(Long id, String searchType, String searchTerm) throws Exception;
	
	//this is used to get child levels on the left side hierarchy when not searching the hierarchy
	public List<MedicalHierarchyView> getNextDecendantView(int startid, Long id) throws Exception;
	//this is used to get child levels when searching the hierarchy
	public List<MedicalHierarchyView> getNextDecendantView(int startid, Long depth, Long id, String searchType, String searchTerm) throws Exception;
	
	public List<MedicalHierarchyView> getAllDecendantView(int level, int startid) throws Exception;
	
	//this is used to get the right side hierarchy when not searching the hierarchy
	public List<MedicalHierarchyView> getNextDecendantRangeView(int levelbeg, int levelend, int startid, String caseId) throws Exception;
	//this is used to get the right side hierarchy when searching the hierarchy
	//public List<MedicalHierarchyView> getSearchResultsForCodeSelectionPanel(Long id, int startid, String searchType, String searchTerm) throws Exception;
	
	//this is used to get all the data for the full dp List 
	public List<DataPointEntryView> getDataForFullDPList(final Long caseId) throws Exception;
	
	public MedicalHierarchy getMedicalHierarchyData(final long id) throws Exception;
	
	public List<MedicalHierarchyView> getMedicalHierarchyData(final String codeName, final String revision,final Long caseId) throws Exception;
	
	//this is used to get the section specific data for the DP of current section
	public List<DataPointEntryView> getDataForSectionSpecificDPList(final Long caseId, final Long stepNo, final Long pageId, String rowNumber) throws Exception;
	
	/*
	 * Navigate from ICD10 code back to parent selections
	 */
	public List<MedicalHierarchyView> getCodeParentPaths(final long id) throws Exception;
	
	//returns the depth of the tree from this node, including itself
	public Long getTreeDepth(final int startid) throws HibernateException;

	public List<MedicalHierarchy> checkForMedicalCodeExistance(final String icd10Code, final String revision) throws Exception;
	
	public List<MedicalHierarchyView> getTopTwoLevelNavigationTree(final Long id) throws Exception;

	/*
	 * Navigate from ICD10 code back to parent selections
	 */
	public String getCodeParentPaths(final String name, final String revision) throws Exception;	
}
