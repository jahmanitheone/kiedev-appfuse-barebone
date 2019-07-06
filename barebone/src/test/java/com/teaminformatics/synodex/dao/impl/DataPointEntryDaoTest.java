package com.teaminformatics.synodex.dao.impl;

import java.util.List;

import junit.framework.Assert;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.teaminformatics.synodex.dao.DataPointEntryDao;
import com.teaminformatics.synodex.model.AuditLogView;
import com.teaminformatics.synodex.model.CategorizedView;

@ContextConfiguration
public class DataPointEntryDaoTest extends
		AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	protected DataPointEntryDao datapointentrydao;
	private Log log = LogFactory.getLog(getClass());
	private long dpentryid = 20697L;
	private long dpentryid2 = 20554L;

	@Test
	public void getCasesForDataPointEntriesOneCase() {
		Long id = new Long(dpentryid);
		List<Long> ids = datapointentrydao.getCasesForDataPointEntries(id);
		Assert.assertNotNull(ids);

		id = ids.get(0);
		Assert.assertEquals(1834, id.longValue());
	}

	@Test
	public void getCasesForDataPointEntriesMultipleCase() {
		Long[] dpentryids = { dpentryid2, dpentryid };

		List<Long> ids = datapointentrydao
				.getCasesForDataPointEntries(dpentryids);
		Assert.assertNotNull(ids);
		Assert.assertTrue(ids.size() > 0);

		Long id1 = ids.get(0);
		Long id2 = ids.get(1);
		Assert.assertEquals(1833, id1.longValue());
		Assert.assertEquals(1834, id2.longValue());
	}

	@Test
	public void softDeleteDataPointValidateReturnValue() {
		Long id = new Long(dpentryid);
		Integer result = datapointentrydao.softDeleteDataPoint(id);

		Assert.assertNotNull(result);
		Assert.assertEquals(1, result.intValue());
	}

	@Test
	public void softDeleteDataPointValidateRecordDeleted() {
		Long id = new Long(dpentryid);
		Integer result = datapointentrydao.softDeleteDataPoint(id);
		Assert.assertNotNull(result);
		Assert.assertEquals(1, result.intValue());

		List<Long> ids = datapointentrydao.getCasesForDataPointEntries(id);
		Assert.assertNotNull(ids);
		Assert.assertTrue(ids.size() <= 0);
	}
	
	@Test
	public void getBckgrnddata(){
		List<CategorizedView> backGroundDataEntries = datapointentrydao.getBackGroundDataEntries(2274L);
		System.out.print( backGroundDataEntries.size());
		
	}
	@Test
	public void getDataPointEntries(){
		List<CategorizedView> backGroundDataEntries = datapointentrydao.getDataPointEntries(2274L,true);
		System.out.print( backGroundDataEntries.size());
		
	}
	
	@Test
	public void getDataPointAuditLogs(){
		List<AuditLogView> dataPointAuditLogs = datapointentrydao.getDataPointAuditLogs(2274L, 25139L);
		System.out.print( dataPointAuditLogs.size());
		
	}

	@Test
	public void getCaseImpairedOrStandard(){
		@SuppressWarnings("unused")
		Integer count = datapointentrydao.getCaseImpairedOrStandard(2425L);
		//System.out.print( dataPointAuditLogs.size());
		
	}

}
