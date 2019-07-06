package com.teaminformatics.webapp.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.dao.ConfigSwitchDao;
import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.synodex.dao.WorkFlowsDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.synodex.model.WorkFlows;
import com.teaminformatics.webapp.util.ControllerUtil;

import static org.appfuse.Constants.INCOMPLETE_PAGES;
import static org.appfuse.Constants.STEP_1;
import static org.appfuse.Constants.STEP_2;
import static org.appfuse.Constants.STAGE_OP;
import static org.appfuse.Constants.STEP_1_QA;
import static org.appfuse.Constants.STAGE_POP;

/**
 * Controller class for automating next staging step for a work flow. Currently
 * steps 1 - 4 are affected.
 * <p/>
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
@Controller
@RequestMapping("/workflow")
public class WorkFlowsController {
	public static final String WORKFLOW_REJECTION = "REJECTION";
	public static final String POP_PAGE_THRESHOLD = "POP_PAGE_THRESHOLD";
	private static final Log log = LogFactory.getLog(WorkFlowsController.class);
	private WorkFlowsDao workFlowsDao = null;
	private SessionFactory sessionFactory = null;
	private AuditDao auditLogDao = null;
	private PageDao pageDao = null;
	private ConfigSwitchDao configSwitchDao = null;
	
	@Autowired
	public void setConfigSwitchDao(ConfigSwitchDao configSwitchDao) {
		this.configSwitchDao = configSwitchDao;
	}

	@Autowired
	public void setWorkFlowsDao(WorkFlowsDao workflowsdao) {
		this.workFlowsDao = workflowsdao;
	}
	
	@Autowired
	public void setPageDao(PageDao pageDao) {
		this.pageDao = pageDao;
	}

	@Autowired
	public void setAuditDao(AuditDao auditLogDao) 
	{
	    this.auditLogDao = auditLogDao; 
	}

	@RequestMapping("/{clientId}/{stageId}/{caseId}/{step}/{condition}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	Long getNextStageId(@PathVariable Long clientId, @PathVariable Long stageId, @PathVariable Long caseId,@PathVariable Long step, @PathVariable String condition)
			throws Exception {
		log.debug("clientId=" + clientId + ", stageId=" + stageId + ",caseId=" + caseId + ", condition=" + condition );
		
		try {
			Long incompleteExcludedPages = workFlowsDao.getIncompleteAndExcludedPageInfo(caseId);
			//IWS-359:Page is not completing when last Excluded page is Not Excluded
			if ( (step == STEP_1) && incompleteExcludedPages > 1){
				return INCOMPLETE_PAGES;
			}
			else if (step == STEP_2 && stageId == STAGE_OP && incompleteExcludedPages > 0){
				return INCOMPLETE_PAGES;
			}
			else {
				
				WorkFlows workflows = null;
				if(!condition.isEmpty() && condition.toUpperCase().equals(WORKFLOW_REJECTION))
					workflows = workFlowsDao.getClientRejectionWorkFlow(clientId, stageId);
				else if(step == STEP_1 && stageId == STEP_1_QA){//check if step 1 and stage id 5
					Integer pageCount=pageDao.getPagesCountForCase(caseId);
					String switchVal=configSwitchDao.getPopPageThresholdValue(clientId, POP_PAGE_THRESHOLD);
					//IWN-497 Special handling of completion of Step-1-QA
					if(pageCount!=0 && pageCount<=Integer.parseInt(switchVal))
						return STAGE_OP;
					else if(pageCount!=0 && pageCount>Integer.parseInt(switchVal))
						return STAGE_POP;
					else 
						workflows = workFlowsDao.getClientCompletionWorkFlow(clientId, stageId);
				}else if(step == STEP_2 && stageId == STAGE_POP )
				{
					//return default value after checking above condition for step 2 POP. No need to return nextstageId 
					return 1l;
				}
				else
					workflows = workFlowsDao.getClientCompletionWorkFlow(clientId, stageId);
				
				
				log.debug("NextStageId = " + workflows.getNextStageId());				
				return workflows.getNextStageId();
			}
		} catch (Exception ex) {
			throw new Exception("getting nextstage id failed: "
					+ ex.getMessage());
		}
	}
	
	
	@RequestMapping("/exitIWSCase/{caseId}/{stageId}/{exitType}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody String exitIWSCase(@PathVariable Long caseId, @PathVariable Long stageId, @PathVariable String exitType) throws Exception {
		log.debug("exiting from IWS Case");
		String action = null;
		Long actionId = 99999L;
		if(exitType.equalsIgnoreCase("logoff")){
			action = "LOG OFF";
			actionId = 84L;
		}else{
			action = "EXIT CASE";
			actionId = 86L;
		}
		Audit audit = new Audit();
		audit.set_session(ControllerUtil.getGlobalSessionId());
		audit.set_user(ControllerUtil.getAuthenticatedUserId());
		audit.set_case(caseId);
		audit.set_stage(stageId);
		audit.setTime(ControllerUtil.getTimestamp());
		audit.setResults(action);
		audit.set_action(actionId);
		audit.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		auditLogDao.save(audit);
		return action + " SUCCESSFULLY";
	}
	
	/** getAssignedCategoriesForParallelizedStage(userId,caseId,stageId )
	 * 
	 * Will get all Assigned Categories for given parameters for Parallelized OP Stage(POP)
	 * 
	 * @param userId
	 * @param caseId
	 * @param stageId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getCategoriesToCollectDP/{caseId}/{stageId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody String getAssignedCategoriesForParallelizedStage(@PathVariable Long caseId, @PathVariable Long stageId) throws Exception {
		String assignedCategoriesForParallelizedStage = null;
		try{
			assignedCategoriesForParallelizedStage = workFlowsDao.getAssignedCategoriesForParallelizedStage(caseId, stageId);
		}	
		catch (Exception ex){ 
			throw new Exception("getting AssignedCategoriesForParallelizedStage failed: " + ex.getMessage());
		}
		return assignedCategoriesForParallelizedStage;
	}
}
