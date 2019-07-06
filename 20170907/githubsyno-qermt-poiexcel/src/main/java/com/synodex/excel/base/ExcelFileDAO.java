package com.synodex.excel.base;

import java.util.List;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import com.synodex.excel.ExcelFileException;

/**
 * Data Access Object (DAO) for accesing an Microsoft Excel file
 * 
 * @author pchauvet
 * 
 */
public interface ExcelFileDAO {
	void setFilePath(String filepath);

	String getFilePath();

	/**
	 * Read the Excel file and capture the read rows into the List<Row>
	 * 
	 * @throws ExcelFileException
	 */
	void readExcelFile() throws ExcelFileException;

	/**
	 * Get the read rows form the Excel
	 * 
	 * @return Number of row entries read
	 */
	List<Row> getExcelFileRows();

	/**
	 * Get the complete read Excel file sheet
	 * 
	 * @return
	 */
	Sheet getExcelFileSheet();
}
