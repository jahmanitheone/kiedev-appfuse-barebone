package com.teaminformatics.webapp.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

@ContextConfiguration
public class ConfigSwitchControllerTest extends
		AbstractTransactionalJUnit4SpringContextTests {
	private static final String WORKFLOW_COMPLETION = "COMPLETION";
	@Autowired
	private ConfigSwitchController configswitchcontroller;
	private Log log = LogFactory.getLog(getClass());

	@Test
	public void getMaxSectionsPerSelection() {
		try {
			int val = configswitchcontroller.getMaxSectionsPerSelection(4);
			Assert.assertEquals(5, val);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

}