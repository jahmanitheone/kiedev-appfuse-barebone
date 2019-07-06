package com.synodex.excel.base;

import java.util.List;
import org.apache.poi.ss.usermodel.Row;
import com.synodex.excel.ExcelFileException;
import com.synodex.excel.bean.WF3RulesBean;

public interface WF3RuleDAO {
	/**
	 * Set the excel file read data rows
	 * 
	 * @param excelFileRows
	 * @throws ExcelFileException 
	 */
	void setExcelFileRows(List<Row> excelFileRows) throws ExcelFileException;

	/**
	 * Get the Excel file read rows as a list of WF3RulesBean
	 * 
	 * @return
	 */
	List<WF3RulesBean> getWF3RulesBeans();
}
