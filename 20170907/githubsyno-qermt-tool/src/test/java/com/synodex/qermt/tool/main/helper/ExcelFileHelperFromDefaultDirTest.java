package com.synodex.qermt.tool.main.helper;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;

public class ExcelFileHelperFromDefaultDirTest {
	private final static Logger log = Logger
			.getLogger(ExcelFileHelperFromDefaultDirTest.class);
	private static ExcelFileHelper excelfilehelper;
	private static String excelfile;

	@BeforeClass
	public static void setUp() {
	}

	@AfterClass
	public static void tearDown() {
		excelfilehelper = null;
		excelfile = null;
	}

	@Test
	public void getExcelFileHelperNoExcelFile() {
		// excelfile = "WF3RulesXLSX.xlsx";
		try {
			excelfilehelper = new ExcelFileHelper(null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getExcelFileHelperWithExcelFile() {
		excelfile = "WF3RulesXLSX.xlsx";
		try {
			excelfilehelper = new ExcelFileHelper(excelfile);
			Assert.assertNotNull(excelfilehelper.getBasePath());
			Assert.assertNotNull(excelfilehelper.getExcelFile());
			Assert.assertNotNull(excelfilehelper.getExcelFilePath());
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

}
