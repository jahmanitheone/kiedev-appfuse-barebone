package com.teaminformatics.webapp.controller;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.MedicalHierarchyView;

/**
 * Controller class for accessing medical hiearchy information
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
@Controller
@RequestMapping("/medicalhiearchy")
public class MedicalHierarchyController {
	private static final Log log = LogFactory
			.getLog(MedicalHierarchyController.class);
	private MedicalHierarchyViewDao medicalHierarchyViewDao = null;
	private SessionFactory sessionFactory = null;

	@Autowired
	public void setMedicalHierarchyViewDao(
			MedicalHierarchyViewDao medicalHierarchyViewDao) {
		this.medicalHierarchyViewDao = medicalHierarchyViewDao;
	}

	/**
	 * Get the parent codes for a provided ICD10 code. This allows for
	 * navigation from ICD10 code back to parent selections
	 * 
	 * @param id
	 *            The code to retrieve parent ids
	 * @return returns a list of categories. List is ordered from top level
	 *         category to selected code.
	 */
	@RequestMapping("/parentcodes/{codeId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	List<MedicalHierarchyView> getCodeParentPaths(@PathVariable Long codeId)
			throws Exception {
		List<MedicalHierarchyView> list = medicalHierarchyViewDao
				.getCodeParentPaths(codeId);

		return list;
	}
	
	/**
	 * Get the parent codes for a provided ICD10 code. This allows for
	 * navigation from ICD10 code back to parent selections
	 * 
	 * @param id
	 *            The code to retrieve parent ids
	 * @return returns a list of categories. List is ordered from top level
	 *         category to selected code.
	 */
	@RequestMapping("/medicalCode/{codeId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	Object getMedicalCodeData(@PathVariable Long codeId)
			throws Exception {
		Object medicalCode = null;
		medicalCode = medicalHierarchyViewDao
				.getMedicalHierarchyData(codeId);

		return medicalCode;
	}
	/**
	 * Get the parent codes for a provided ICD10 code. This allows for
	 * navigation from ICD10 code back to parent selections
	 * 
	 * @param id
	 *            The code to retrieve parent ids
	 * @return returns a list of categories. List is ordered from top level
	 *         category to selected code.
	 */
	@RequestMapping("/medicalCode/medicalCodeName/{codeName}/{revision}/{caseId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	List<MedicalHierarchyView> getMedicalCodeNameData(@PathVariable String codeName, @PathVariable String revision, @PathVariable Long caseId)
			throws Exception {
		List<MedicalHierarchyView> medicalCodeName = medicalHierarchyViewDao
				.getMedicalHierarchyData(codeName,revision.replace("*", "."),caseId);

		return medicalCodeName;
	}
	
	/**
	 * Get the parent codes for a provided ICD10 code by name
	 * @param name The Code name
	 * @param revision The revision for the code
	 *
	 * @return returns path from code to its parent separated by '/'
	 */
	@RequestMapping("/parentcodes/{name}/{revision}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	String getCodeParentPaths(@PathVariable String name, @PathVariable String revision)
			throws Exception {		
		String path = null;		
		path = medicalHierarchyViewDao.getCodeParentPaths(name, revision);
		
		return path;
	}

}
