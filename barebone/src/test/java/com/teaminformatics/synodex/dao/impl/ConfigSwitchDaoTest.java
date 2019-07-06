package com.teaminformatics.synodex.dao.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import com.teaminformatics.synodex.dao.ConfigSwitchDao;

@ContextConfiguration
public class ConfigSwitchDaoTest extends
		AbstractTransactionalJUnit4SpringContextTests {
	private static final String MAX_SECTIONS_PER_SELECTION = "MAX_SECTIONS_PER_SELECTION";
	private static final String POP_PAGE_THRESHOLD = "POP_PAGE_THRESHOLD";
	@Autowired
	protected ConfigSwitchDao configswitchdao;
	private Log log = LogFactory.getLog(getClass());

	@Test
	public void getMaxSectionsPerSelection() {
		try {
			String val = configswitchdao.getMaxSectionsPerSelection(4, MAX_SECTIONS_PER_SELECTION);
			Assert.assertEquals("5",val);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	public void getPopPageThresholdValue(){
		try{
			String switchVal=configswitchdao.getPopPageThresholdValue(new Long(8), POP_PAGE_THRESHOLD);
			Assert.assertEquals("20",switchVal);
		}catch(Exception exception)
		{
			Assert.fail(exception.getMessage());
		}
	}
	
}
