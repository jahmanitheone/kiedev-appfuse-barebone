package com.teaminformatics.webapp.controller;

import static org.junit.Assert.*;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.transaction.TransactionConfiguration;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointEntry;


@ContextConfiguration
public class DataPointEntryCodeControllerTest extends
	AbstractTransactionalJUnit4SpringContextTests {
	private Log log = LogFactory.getLog(getClass());

	@Autowired
	private DataPointEntryCodeController dataPointEntryCodeController = null;


	@Test
	public void getDataPointEntriesByCase() {
		try {
			List<DataPointEntry> list = dataPointEntryCodeController.getDataPointEntriesByCase(1929L);
			Assert.assertTrue(list.size() > 0);
			for(DataPointEntry data: list)
			{
				Assert.assertNotNull(data.getId());
			}
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDataPointEntriesStartEndSection() {
		try {
			List<DataPointEntry> list = dataPointEntryCodeController.getDataPointEntriesByCase(1929L);
			Assert.assertTrue(list.size() > 0);
			for(DataPointEntry data: list)
			{
				Assert.assertNotNull(data.getStartSectionNumber());
				Assert.assertNotNull(data.getEndSectionNumber());
			}
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

}