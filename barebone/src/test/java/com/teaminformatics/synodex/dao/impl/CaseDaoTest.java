package com.teaminformatics.synodex.dao.impl;

import java.util.List;
import junit.framework.Assert;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.LOVValues;

@ContextConfiguration
public class CaseDaoTest extends
		AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	protected DataPointDao datapointdao;
	private Log log = LogFactory.getLog(getClass());
	private long caseId = 1927L;
	private long step2= 2L;
	private long step3= 3L;
	private long lovId = 560;

	@Test
	public void getDPEntriesForStep2() {
		try {
			List<DataPointEntry> dps = datapointdao.getDPEntries(caseId, step2);
			Assert.assertTrue(dps.size()>0);
		} catch (Exception e) {
			Assert.fail("Failed getting DatapointEntries for step 2: "+  e.getMessage());
		}
	}

	@Test
	public void getDPEntriesForStep3() {
		try {
			List<DataPointEntry> dps = datapointdao.getDPEntries(caseId, step3);
			Assert.assertTrue(dps.size()>0);
		} catch (Exception e) {
			Assert.fail("Failed getting DatapointEntries for step 2: "+  e.getMessage());
		}
	}

	@Test
	public void getDataPointEntriesByCase() {
		try {
			List<DataPointEntry> dps = datapointdao.getDataPointEntriesByCase(caseId);
			Assert.assertTrue(dps.size()>0);
		} catch (Exception e) {
			Assert.fail("Failed getting DatapointEntries for step 2: "+  e.getMessage());
		}
	}
	
	@Test
	public void getLovValuesByLovId() {
		try {
			List<LOVValues> lovValues = datapointdao.getLovValues(lovId);
			Assert.assertTrue(lovValues.size()>0);
		} catch (Exception e) {
			Assert.fail("Failed getting Lov Values  for step 2 DP Form: "+  e.getMessage());
		}
	}
	
	
	@Test
	public void getDataPointEntriesBegEndSection() {
		try {
			List<DataPointEntry> dps = datapointdao.getDataPointEntriesByCase(caseId);
			Assert.assertTrue(dps.size()>0);
			
			DataPointEntry ent = dps.get(0);			
			Assert.assertEquals(new Integer(2),ent.getStartSectionNumber());
			Assert.assertEquals(new Integer(2),ent.getEndSectionNumber());

			ent = dps.get(1);			
			Assert.assertEquals(new Integer(15),ent.getStartSectionNumber());
			Assert.assertEquals(new Integer(15),ent.getEndSectionNumber());
			
		} catch (Exception e) {
			Assert.fail("Failed getting DatapointEntries for step 2: "+  e.getMessage());
		}
	}	

}
