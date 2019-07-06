package com.synodex.excel.dao;

import java.util.List;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.ExcelFileDAO;
import com.synodex.excel.dao.ReadExcelFile;

public class ReadExcelFileTest {
	private static Logger log = Logger.getLogger(ReadExcelFileTest.class);
	private static ExcelFileDAO readexcelfile;
	private static String file = null;

	private static void setReadExcelFile() {
		file = "C:/dev/workspacepoi/excel/files/WF3RulesXLSX.xlsx";
		file = "C:/dev/workspaceqermttool/synodex-qermt-poiexcel/excelfiles/WF3XXXXX.xlsx";
		readexcelfile = new ReadExcelFile();
		readexcelfile.setFilePath(file);

		try {
			readexcelfile.readExcelFile();
		} catch (ExcelFileException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}


	@BeforeClass
	public static void setUp() {
		setReadExcelFile();
	}

	@AfterClass
	public static void tearDown() {
		readexcelfile = null;
	}

	@Test
	public void getFilePath() {
		Assert.assertNotNull(readexcelfile.getFilePath());
		log.debug(readexcelfile.getFilePath());
	}

	@Test
	public void getExcelFileRows() {
		List<Row> rows = readexcelfile.getExcelFileRows();
		Assert.assertTrue(rows.size() > 0);

		for (Row row : rows) {
			log.debug("Read row: " + row.getRowNum());
		}
	}

	@Test
	public void getExcelSheet() {
		Sheet sheet = readexcelfile.getExcelFileSheet();
		Assert.assertNotNull(sheet);

		for (Row row : sheet) {
			log.debug("Read row: " + row.getRowNum());
		}
	}
	
}
