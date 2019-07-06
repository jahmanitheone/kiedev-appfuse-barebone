package com.teaminformatics.webapp.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.CaseHistory;
import com.teaminformatics.synodex.model.Stage;
import com.teaminformatics.webapp.util.ControllerUtil;

@Controller
public class StepController
{
	private LoadableDao<Case, Long> caseDao = null;
	private LoadableDao<Stage, Long> stageDao = null;
	private LoadableDao<CaseHistory, Long> caseHistoryDao = null;
	private AuditDao auditLogDao = null;
	private Long lastCaseLoaded = 99999L;
	private Long lastStageLoaded = 99999L;
	
	
	@Autowired
	public void setCaseDao(LoadableDao<Case, Long> caseDao) 
	{
	    this.caseDao = caseDao; 
	}
	@Autowired
	public void setStageDao(LoadableDao<Stage, Long> stageDao) 
	{
	    this.stageDao = stageDao; 
	}
	@Autowired
	public void setCaseHistoryDao(LoadableDao<CaseHistory, Long> caseHistoryDao) 
	{
	    this.caseHistoryDao = caseHistoryDao; 
	}
	
	@Autowired
	public void setAuditDao(AuditDao auditLogDao) 
	{
	    this.auditLogDao = auditLogDao; 
	}

	@RequestMapping(value="/step{stepName}", method=RequestMethod.GET)
	public String getStep(@PathVariable String stepName, @RequestParam(required=false) Long caseId, @RequestParam(required=false) Long stageId) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = principal instanceof UserDetails ? (UserDetails) principal : null;
		// set AuditLogs for action :'LOAD IWS CASE'
		if(caseId != null && stepName != null){
			if(!lastStageLoaded.equals(stageId))
				setAuditLogsForStepLoading(caseId,stageId);
			else if(!lastCaseLoaded.equals(caseId))
				setAuditLogsForStepLoading(caseId,stageId);
		}	
		Case c = auditCaseOpen(stepName, caseId, stageId);
		return "step" + stepName;
	}
	
	private Audit setAuditLogsForStepLoading(Long caseId, Long stageId) throws Exception{
		Audit audit = new Audit();
		audit.set_case(caseId);
		audit.set_stage(stageId);
		audit.set_session(ControllerUtil.getGlobalSessionId());
		audit.set_user(ControllerUtil.getAuthenticatedUserId());
		audit.setTime(ControllerUtil.getTimestamp());
		audit.setResults("CASE LOADS");
		audit.set_action(85L);
		audit.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		return auditLogDao.save(audit);
	}

	private Case auditCaseOpen(String stepName, Long caseId, Long stageId) throws Exception {
		Case c = null;

		if (stepName.equals("1") || stepName.equals("2")
				|| stepName.equals("3") || stepName.equals("4")) {
			try {
				c = caseDao.get(caseId);
				lastCaseLoaded = caseId;
				lastStageLoaded = stageId;
				// set the stage start time in the case table, we use this for
				// time tracking on the page
				if (c.getStageStartTimestamp() == null) {
					// first time the case has been opened set the start time
					c.setStageStartTimestamp(ControllerUtil.getTimestamp());
					caseDao.save(c);
					// Log this in the case history table as well
					caseHistoryDao.save(ControllerUtil.setCaseHistory(c, true));
				}
			} catch (Exception e) {
				// To redirect this exception message to error page
				throw new Exception("Failed while opening the Case: " + e.getMessage());
			}
		}
		return c;
	}
}


