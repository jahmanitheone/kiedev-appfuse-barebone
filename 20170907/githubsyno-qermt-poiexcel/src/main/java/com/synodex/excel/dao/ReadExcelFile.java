package com.synodex.excel.dao;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.ExcelFileDAO;

/**
 * @see com.synodex.excel.base.ExcelFileDAO
 * 
 * @author pchauvet
 * 
 */
public class ReadExcelFile implements ExcelFileDAO {
	private String filePath;
	private List<Row> excelFileRows = new ArrayList<Row>();
	private Sheet exelFileSheet;

	public void setFilePath(String fileName) {
		this.filePath = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	/**
	 * (non-Javadoc)
	 * 
	 * @see com.synodex.excel.base.ExcelFileDAO#readExcelFile()
	 */
	public void readExcelFile() throws ExcelFileException {
		if (getFilePath() == null)
			throw new ExcelFileException(
					"The full excel file path was not provided");

		try {
			InputStream inp = new FileInputStream(getFilePath());
			Workbook wb = WorkbookFactory.create(inp);

			exelFileSheet = wb.getSheetAt(0);
			for (Row row : exelFileSheet)
				excelFileRows.add(row);
		} catch (Exception e) {
			throw new ExcelFileException(e.getMessage());
		}
	}

	/**
	 * (non-Javadoc)
	 * 
	 * @see com.synodex.excel.base.ExcelFileDAO#getExcelFileRows()
	 */
	public List<Row> getExcelFileRows() {
		return this.excelFileRows;
	}

	/**
	 * (non-Javadoc)
	 * 
	 * @see com.synodex.excel.base.ExcelFileDAO#getExcelFileSheet()
	 */
	public Sheet getExcelFileSheet() {
		return this.exelFileSheet;
	}

}
