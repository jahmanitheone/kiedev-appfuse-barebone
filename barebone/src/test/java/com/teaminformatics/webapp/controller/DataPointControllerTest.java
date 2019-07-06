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
import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointEntryView;


@ContextConfiguration
public class DataPointControllerTest extends
	AbstractTransactionalJUnit4SpringContextTests {
	private Log log = LogFactory.getLog(getClass());

	@Autowired
	private DataPointController dataPointController = null;


	@Test
	public void getDataPointCategoryNoSubCats() {
		try {
			List<DataPointCategory> list = dataPointController.getDataPointCategoryNoSubCats(21L);
			Assert.assertTrue(list.size() > 0);
			log.info(".");
			log.info(". list.size(): " + list.size());
			for(DataPointCategory data: list)
			{
				log.info(data.getId());
			}
			
			log.info(".");
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	public void getDpEntries(){
		try {
			List<DataPointEntryView> dpList=dataPointController.getDPEntries(2228l,2l);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Assert.fail(e.getMessage());
		}
	}
	
}