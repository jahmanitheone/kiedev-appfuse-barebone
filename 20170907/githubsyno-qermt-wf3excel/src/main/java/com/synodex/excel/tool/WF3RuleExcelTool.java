package com.synodex.excel.tool;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;

import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.ExcelFileDAO;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.dao.ReadExcelFile;
import com.synodex.excel.dao.WF3RulesExcelFileDAO;

public class WF3RuleExcelTool {
	private static Logger log = Logger.getLogger(WF3RuleExcelTool.class);
	private WF3RulesExcelFileDAO wf3rulesexcelfiledao = null;
	private ExcelFileDAO readexcelfile;
	private String filePath = null;
	private List<WF3RulesBean> wf3rulesbeanlist = new ArrayList<WF3RulesBean>();

	public WF3RuleExcelTool(String path) throws ExcelFileException {
		this.filePath = path;

		if (path == null)
			throw new ExcelFileException("Excel file can not be empty.");

		setReadExcelFile();
		setExcelFileRows();
	}

	private void setReadExcelFile() throws ExcelFileException {
		try {
			readexcelfile = new ReadExcelFile();
			readexcelfile.setFilePath(getFilePath());

			readexcelfile.readExcelFile();
		} catch (ExcelFileException e) {
			log.debug("setReadExcelFile():-> " + e.getMessage());
			throw new ExcelFileException(e.getMessage());
		}
	}

	private void setExcelFileRows() throws ExcelFileException {
		wf3rulesexcelfiledao = new WF3RulesExcelFileDAO();

		List<Row> rows = readexcelfile.getExcelFileRows();
		try {
			wf3rulesexcelfiledao.setExcelFileRows(rows);
			wf3rulesbeanlist = wf3rulesexcelfiledao.getWF3RulesBeans();
		} catch (ExcelFileException e) {
			log.debug("setExcelFileRows():-> " + e.getMessage());
			throw new ExcelFileException(e.getMessage());
		}
	}

	public String getFilePath() {
		return this.filePath;
	}

	public List<WF3RulesBean> getWF3RulesBeans() {
		return this.wf3rulesbeanlist;
	}

}
