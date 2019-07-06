package com.synodex.qermt.tool.main.helper;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;

public class ExcelFileHelperFromProvidedDirTest {
	private final static Logger log = Logger
			.getLogger(ExcelFileHelperFromProvidedDirTest.class);
	private static ExcelFileHelper excelfilehelper;
	private static String excelfile;
	private static String basedir;

	@BeforeClass
	public static void setUp() {
		basedir = "C:\\dev\\workspaceqermttool\\synodex-qermt-tool\\ruledir";
		excelfile = "WF3RulesXLSX.xlsx";
	}

	@AfterClass
	public static void tearDown() {
		excelfilehelper = null;
		excelfile = null;
		basedir = null;
	}

	@Test
	public void getExcelFileHelperWithNoBasedir() {
		try {
			excelfilehelper = new ExcelFileHelper(null, null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No base directory was provided to retrieve excel file");
		}
	}

	@Test
	public void getExcelFileHelperNoExcelFile() {
		try {
			excelfilehelper = new ExcelFileHelper(basedir, null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getExcelFileHelperWithExcelFile() {
		try {
			excelfilehelper = new ExcelFileHelper(basedir, excelfile);
			Assert.assertNotNull(excelfilehelper.getBasePath());
			Assert.assertNotNull(excelfilehelper.getExcelFile());
			Assert.assertNotNull(excelfilehelper.getExcelFilePath());

			excelfilehelper.showExcelPathInfo();
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

}
