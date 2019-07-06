package com.teaminformatics.synodex.dao.impl;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.DataPointEntryView;
import com.teaminformatics.synodex.model.MedicalHierarchy;
import com.teaminformatics.synodex.model.MedicalHierarchyView;

/**
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 * @dated 2012/04/25
 */
@ContextConfiguration
public class MedicalHierarchyViewDaoTest extends
		AbstractTransactionalJUnit4SpringContextTests {
	@Autowired
	protected MedicalHierarchyViewDao medicalhierarcydao;
	private Log log = LogFactory.getLog(getClass());

	@Test
	public void getAllMedicalHierarchyView() {
		try {
			List<MedicalHierarchyView> list = medicalhierarcydao
					.getAllMedicalHierarchyViews();
			Assert.assertTrue(list.size() > 0);
			Assert.assertTrue(list.size() >= 26);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getMainLevelMedicalHierarchyViews() {
		try {
			List<MedicalHierarchyView> list = medicalhierarcydao
					.getMainLevelMedicalHierarchyViews(new Long(1603));
			Assert.assertTrue(list.size() > 0);
			Assert.assertTrue(list.size() >= 1);

			/*
			MedicalHierarchyView mhvrecord = list.get(0);
			Assert.assertEquals("Main Category 1", mhvrecord.getName(),
					"General Health");
			mhvrecord = list.get(1);
			Assert.assertEquals("Main Category 2", mhvrecord.getName(),
					"Family History");
					*/
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getNextLevelGeneralHealth() {
		try {
			// Main Category "General Health" has record id 1
			List<MedicalHierarchyView> list = medicalhierarcydao
					.getNextDecendantView(1, new Long(1931));

			Assert.assertTrue(list.size() > 0);
			Assert.assertTrue(list.size() == 2);

			MedicalHierarchyView mhvrecord = list.get(0);
			Assert.assertEquals("General Health Next Level 1",
					mhvrecord.getName(), "Alcohol");
			mhvrecord = list.get(1);
			Assert.assertEquals("General Health Next Level 2",
					mhvrecord.getName(), "Drug");
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getNextLeve1AndLevel2RangeForGeneralHealth() {
		try {
			// Main Category "General Health" has record id 1
			List<MedicalHierarchyView> list = medicalhierarcydao
					.getNextDecendantRangeView(2, 4, 1, "1931");

			Assert.assertTrue(list.size() > 0);
			Assert.assertTrue(list.size() == 16);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	public void getLinkToIdForMedicalHierarchy504() {
		try {
			MedicalHierarchy data= (MedicalHierarchy) medicalhierarcydao.getMedicalHierarchyData(504);
			Assert.assertNotNull(data);
			Assert.assertEquals("Linked to ID for record 504",new Long(304), data.getLinkToId());
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	public void getCodeParentPaths() {
		try {
			List<MedicalHierarchyView> list = medicalhierarcydao
					.getCodeParentPaths(304L);
				
				//Drill Down by navigation from category to code for SYNGH5			
			MedicalHierarchyView record = (MedicalHierarchyView) list.get(0);
				//Category
			Assert.assertEquals(new Long(56), record.getId());
			Assert.assertEquals("General Health", record.getName());
				//SubCategory
			record = (MedicalHierarchyView) list.get(1);
			Assert.assertEquals(new Long(63), record.getId());
			Assert.assertEquals("Alcohol", record.getName());
				//Parent Code
			record = (MedicalHierarchyView) list.get(2);
			Assert.assertEquals(new Long(74), record.getId());
			Assert.assertEquals("Warning", record.getName());
				//Code SYNGH5
			record = (MedicalHierarchyView) list.get(3);
			Assert.assertEquals(new Long(304), record.getId());
			Assert.assertEquals("SYNGH5", record.getName());

		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	@Test
	public void checkExistanceForMedicalCodeTest() {
		try {
			List<MedicalHierarchy> correcrecord = medicalhierarcydao.checkForMedicalCodeExistance("K703", "1.3");

			Assert.assertEquals("K703", correcrecord.get(0).getName());
			List<MedicalHierarchy> inCorrecrecord = medicalhierarcydao.checkForMedicalCodeExistance("ABCDEFGH", "1");
			Assert.assertEquals(0, inCorrecrecord.size());
			
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	public void getCodeParentPathsByNameRevision() {
		String codename = "Q278";
		String revision = "1.6";

		try {
			String path = medicalhierarcydao.getCodeParentPaths(codename, revision);
				
				//Drill Down by navigation from category to code for SYNGH5			
			Assert.assertNotNull(path);
		} catch (Exception e) {
			Assert.fail(e.getMessage());
		}
	}
	
	@Test
	
	public void getDataForFullDPList() {
		{
			try {
				List<DataPointEntryView> list = medicalhierarcydao. getDataForFullDPList(1884l);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
				
			
		}
	}
@Test
	
	public void getMedicalData() {
		{
			try {
				List<MedicalHierarchyView> list = medicalhierarcydao.getMedicalHierarchyData("D16","1.6",2274l);
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
				
			
		}
	}
	
}
