package com.teaminformatics.webapp.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

@ContextConfiguration
public class WorkFlowsControllerTest extends
		AbstractTransactionalJUnit4SpringContextTests {
	private static final String WORKFLOW_COMPLETION = "COMPLETION";
	@Autowired
	private WorkFlowsController controller;
	private Log log = LogFactory.getLog(getClass());

	@Test
	public void getWorkFlowsFor_ClientLG() {
		try {
			// Client Scenario
			Long clientid = new Long(4);
			Long stageid = new Long(0);
			Long nextstageid = new Long(4);
			Long caseId = new Long(4);			
			Long step=new Long(4);//IWS-359:Page is not completing when last Excluded page is Not Excluded
			
			// Client Scenario
			stageid = new Long(4);
			nextstageid = new Long(5);
			Long nextId = controller.getNextStageId(clientid, stageid, caseId,step, WORKFLOW_COMPLETION);

			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(4);
			nextstageid = new Long(5);
			nextId = controller.getNextStageId(clientid, stageid, caseId,step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(5);
			nextstageid = new Long(6);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(6);
			nextstageid = new Long(7);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(7);
			nextstageid = new Long(12);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario -- Rejection
			stageid = new Long(7);
			nextstageid = new Long(48);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WorkFlowsController.WORKFLOW_REJECTION);
			Assert.assertEquals(nextstageid, new Long(nextId));
			
			// Client Scenario
			stageid = new Long(8);
			nextstageid = new Long(9);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(9);
			nextstageid = new Long(12);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(10);
			nextstageid = new Long(11);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(11);
			nextstageid = new Long(12);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(12);
			nextstageid = new Long(47);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));

			// Client Scenario
			stageid = new Long(13);
			nextstageid = new Long(14);
			nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);
			Assert.assertEquals(nextstageid, new Long(nextId));
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	
	@Test
	public void getWorkFlowsFor_IWS2Completion() {
		try {
			// Client Scenario
			Long clientid = new Long(6);
			Long stageid = new Long(7);
			Long nextstageid = new Long(12);
			Long caseId = new Long(1929);			
			Long step=new Long(7);
			
			Long nextId = controller.getNextStageId(clientid, stageid, caseId, step, WORKFLOW_COMPLETION);

			Assert.assertEquals(nextstageid, new Long(nextId));
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	

	@Test
	public void getWorkFlowsFor_IWS2Rejection() {
		try {
			// Client Scenario
			Long clientid = new Long(6);
			Long stageid = new Long(7);
			Long nextstageid = new Long(48);
			Long caseId = new Long(1929);			
			Long step=new Long(7);
			
			Long nextId = controller.getNextStageId(clientid, stageid, caseId, step, WorkFlowsController.WORKFLOW_REJECTION);			
			Assert.assertEquals(nextstageid, new Long(nextId));
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

}