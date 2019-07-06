package com.teaminformatics.webapp.controller;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.query.JRHibernateQueryExecuterFactory;
import net.sf.jasperreports.engine.util.JRProperties;
import net.sf.jasperreports.engine.xml.JRXmlLoader;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appfuse.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.CaseHistory;
import com.teaminformatics.synodex.model.Stage;
import com.teaminformatics.synodex.ucm.IContentMangerFileRetriever;
import com.teaminformatics.webapp.util.ControllerUtil;

@Controller
@RequestMapping("/cases")
public class CaseController
{
    private static final Log log = LogFactory.getLog(CaseController.class);
    
	private LoadableDao<Case, Long> caseDao = null;
	private LoadableDao<Stage, Long> stageDao = null;
	private IContentMangerFileRetriever contentMangerFileRetriever = null;
	private LoadableDao<CaseHistory, Long> caseHistoryDao = null;
	private AuditDao auditLogDao = null;

	private SessionFactory sessionFactory = null;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) 
	{
	    this.sessionFactory = sessionFactory; 
	}
	
	@Autowired
	public void setContentMangerFileRetriever(IContentMangerFileRetriever contentMangerFileRetriever) 
	{
	    this.contentMangerFileRetriever = contentMangerFileRetriever; 
	}
	
	@Autowired
	public void setCaseDao(LoadableDao<Case, Long> caseDao) 
	{
	    this.caseDao = caseDao; 
	}
	@Autowired
	public void setCaseHistoryDao(LoadableDao<CaseHistory, Long> caseHistoryDao) 
	{
	    this.caseHistoryDao = caseHistoryDao; 
	}
	
	@Autowired
	public void setStageDao(LoadableDao<Stage, Long> stageDao) 
	{
	    this.stageDao = stageDao; 
	}
	
	@Autowired
	public void setAuditDao(AuditDao auditLogDao) 
	{
	    this.auditLogDao = auditLogDao; 
	}

	
	@RequestMapping("/{caseId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody Case getCase(@PathVariable Long caseId) 
	{
		return caseDao.getWithPropertiesLoaded(caseId, new String[]{"pages"});
	}
	/**
	 * closes a case for step 1 - 4
	 * sets the next stage id.
	 * @param caseId
	 * @param stageId
	 * @return success or error message as string 
	 */
	@RequestMapping("/{caseId}/stage/{stageId}/{nextStageId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody String closeCase(@PathVariable Long caseId, @PathVariable Long stageId , @PathVariable Long nextStageId) 
	{
		try {
			//get the current case object
			Case c = caseDao.get(caseId);
			
			//save into the case history table
			caseHistoryDao.save(ControllerUtil.setCaseHistory(c, false));
			
			//get the next stage object
			Stage s = stageDao.get(nextStageId);
			//set the next stage for the case
			c.setStage(s);
			//clear the stage start time.
			c.setStageStartTimestamp(null);
			c.setAssignmentTimestamp(null);
			c.setUser(null);
			//save the case
			caseDao.save(c);
			// finally save this entry for audit log
			setAuditLogsForStepCompletion(caseId,stageId,nextStageId);
			

			
			return "case closed successfully";
		}
		catch(Exception ex){
			return ("case close failed: " + ex.getMessage());
		}
		
		
	}
	/**
	 * set audit log entries for every step completion
	 * sets the next stage id.
	 * @param caseId
	 * @param stageId
	 * @param nextStageId
	 * @return success or error message as string 
	 */
	private Audit setAuditLogsForStepCompletion(Long caseId, Long stageId, Long nextStageId) throws Exception{
		Audit audit = new Audit();
		audit.set_case(caseId);
		audit.set_stage(stageId);
		audit.set_session(ControllerUtil.getGlobalSessionId());
		audit.set_user(ControllerUtil.getAuthenticatedUserId());
		audit.setTime(ControllerUtil.getTimestamp());
		audit.setResults("STEP COMPLETED");
		audit.set_action(87L);
		audit.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		audit.setCreatedStageId(nextStageId);
		audit.setOriginalValue(stageId.toString());
		audit.setModifiedValue(nextStageId.toString());
		return auditLogDao.save(audit);
	}
	
	
	/**
	 * Generate a PDF report (currently an example) using the jrxml file called 'case-report'.
	 * @param caseId The case ID to generate the report for
	 * @param outputStream Raw output stream -- loaded by spring.
	 * @throws Exception
	 */
	@RequestMapping("/{caseId}/report")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody void getCaseReport(@PathVariable Long caseId, OutputStream outputStream) throws Exception
	{
		Session session = null;
		try
		{
			session = sessionFactory.openSession();
			//This is important as the current Jasper <-> Hibernate query execution layer is broken.  I've overriden
			// these libraries within the com.teaminformatics.webapp.reporting package to fix the issues that I was 
			// receiving with the OOTB HQL Jasper Query implementation.
			JRProperties.setProperty("net.sf.jasperreports.query.executer.factory.hql", "com.teaminformatics.synodex.reporting.JRHibernateQueryExecuterFactory");
			
			Map<String,Object> parameters = new HashMap<String,Object>();
			//Set the Hibernate session into the report as a parameter to allow hql to be used.
			parameters.put(JRHibernateQueryExecuterFactory.PARAMETER_HIBERNATE_SESSION, session);
			//Parameter for report to make calls to retrieve input streams of content ID files
		    parameters.put("CONTENT_MANAGER_FILE_RETRIEVER", contentMangerFileRetriever);
		    //Any additional parameters here
		    parameters.put("CASE_ID", caseId);
			
		    //The report will be retrieved by name from the /src/main/resources/reports directory
			InputStream inputStream = getClass().getClassLoader().getResourceAsStream("reports/case-report.jrxml");
			JasperDesign jasperDesign = JRXmlLoader.load(inputStream);
			JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
		    JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters);
		    JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
		}
		finally
		{
			//Ensure that the session that was created gets closed.
			if(session != null)
			{
				session.close();
			}
		}

	}
	
	@RequestMapping("/applicantDetailsUpdate")
	@PreAuthorize("isAuthenticated() and hasPermission(#info, 'isCaseAllowed')")
	public @ResponseBody void updateApplicantDetails(@RequestBody MultiValueMap<String, String> info)
	{
		Case c = caseDao.get(new Long(info.getFirst("id")));
		c.setApplicantName(info.getFirst("applicantName"));
		c.setApplicantPostalCode(info.getFirst("applicantPostalCode"));
		caseDao.save(c);
	}
	
	@RequestMapping("/{caseId}/stage/{stageId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody String setCaseStatusForStagePOP(@PathVariable Long caseId,@PathVariable Long stageId) 
	{
		Long userId=ControllerUtil.getAuthenticatedUserId();
		caseDao.setCloseParallelizedStagePOP(caseId, stageId, userId);
		
		return "case closed successfully";
	}
}
