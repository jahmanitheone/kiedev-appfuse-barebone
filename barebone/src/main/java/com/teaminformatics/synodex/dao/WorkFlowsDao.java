package com.teaminformatics.synodex.dao;

import java.util.List;
import com.teaminformatics.synodex.model.WorkFlows;

/**
 * DAO for automating next staging step for a work flow. Currently steps 1 - 4
 * are affected.
 * <p/>
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
public interface WorkFlowsDao extends LoadableDao<WorkFlows, Long> {
	public WorkFlows getClientCompletionWorkFlow(final Long clientid,
			final Long stageid) throws Exception;
	
	/**
	 * DAO for checking whether any incomplete page still left to complete.
	 */	
	public Long getIncompleteAndExcludedPageInfo(final Long caseId)
			throws Exception;

	/**
	 *  Get the Rejection Workflow
	 */	
	public WorkFlows getClientRejectionWorkFlow(Long clientId, Long stageId) throws Exception;
	
	/**
	 * Will get all Assigned Categories for given parameters for Parallelized OP Stage(POP)
	 * 
	 */
	public String getAssignedCategoriesForParallelizedStage(final Long caseId, final Long stageId) throws Exception;
}
