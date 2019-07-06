package com.teaminformatics.synodex.dao.impl;

import java.sql.Timestamp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import com.teaminformatics.synodex.dao.WorkFlowsDao;
import com.teaminformatics.synodex.model.WorkFlows;
import com.teaminformatics.webapp.util.ControllerUtil;

@ContextConfiguration
public class WorkFlowsDaoTest extends
		AbstractTransactionalJUnit4SpringContextTests {
	@Autowired
	protected WorkFlowsDao workflowdao;
	private Log log = LogFactory.getLog(getClass());

	@Test
	public void getWorkFlowsFor_ClientLG() {
		try {
			Long clientid = new Long(4);

			// Client Scenario - STEP-1-OP
			Long stageid = new Long(4);
			Long nextstageid = new Long(5);
			WorkFlows workflows = workflowdao.getClientCompletionWorkFlow(
					clientid, stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-1-QA
			stageid = new Long(5);
			nextstageid = new Long(6);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-2-OP
			stageid = new Long(6);
			nextstageid = new Long(7);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-2-QA
			stageid = new Long(7);
			nextstageid = new Long(12);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-3-OP
			stageid = new Long(8);
			nextstageid = new Long(9);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-3-QA
			stageid = new Long(9);
			nextstageid = new Long(12);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-4-OP
			stageid = new Long(10);
			nextstageid = new Long(11);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-4-QA
			stageid = new Long(11);
			nextstageid = new Long(12);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - Ready To Generate
			stageid = new Long(12);
			nextstageid = new Long(47);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getWorkFlowsFor_ClientExamWorks() {
		try {
			Long clientid = new Long(2);

			// Client Scenario - STEP-1-OP
			Long stageid = new Long(4);
			Long nextstageid = new Long(5);
			WorkFlows workflows = workflowdao.getClientCompletionWorkFlow(
					clientid, stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - STEP-1-QA
			stageid = new Long(5);
			nextstageid = new Long(12);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			// Client Scenario - Ready To Generate
			stageid = new Long(12);
			nextstageid = new Long(47);
			workflows = workflowdao.getClientCompletionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getWorkFlowsFor_IWS2() {
		try {
			Long clientid = new Long(6);
			Long stageid = new Long(7);
			Long nextstageid = new Long(12);

			WorkFlows workflows = workflowdao.getClientCompletionWorkFlow(
					clientid, stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

			stageid = new Long(7);
			nextstageid = new Long(48);
			workflows = workflowdao.getClientRejectionWorkFlow(clientid,
					stageid);
			Assert.assertNotNull(workflows);
			Assert.assertEquals(workflows.getNextStageId(), nextstageid);

		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
/*	@Test
	public void getAssignedCategoriesForParallelizedStage() throws Exception{
		String assignedCategoriesForParallelizedStage = workflowdao.getAssignedCategoriesForParallelizedStage(2466L, 71L);
		System.out.println(assignedCategoriesForParallelizedStage);
		
	}
*/	
	@Test
	public void getTime() throws Exception{
		java.util.Date date= new java.util.Date();
    	System.out.println(new Timestamp(date.getTime()));
    	System.out.println(ControllerUtil.getTimestamp());
	}
	
	
	
}
