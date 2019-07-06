package com.synodex.excel.dao;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.WF3RuleDAO;
import com.synodex.excel.bean.WF3RulesBean;

public class WF3RulesExcelFileDAO implements WF3RuleDAO {
	private static Logger log = Logger.getLogger(WF3RulesExcelFileDAO.class);
	private List<WF3RulesBean> wf3rulesbeanlist = new ArrayList<WF3RulesBean>();

	public void setExcelFileRows(List<Row> excelFileRows)
			throws ExcelFileException {
		if (excelFileRows == null)
			throw new ExcelFileException("No excel file rows was provided");

		for (Row row : excelFileRows) {
			// Skip the header fow
			if (row.getRowNum() == 0)
				continue;

			WF3RulesBean wf3ruleexceldata = getWF3RulesExcelDataRecord(row);
			if (wf3ruleexceldata != null)
				wf3rulesbeanlist.add(wf3ruleexceldata);
		}
	}

	private boolean isRowEmpty(Row row) {
		boolean isEmpty = false;
		String emptycell = "";
		
		for (int j = 0; j < 5; j++) {
			if (row.getCell(j) == null || row.getCell(j).toString().isEmpty()) {
				emptycell += "" + j++ + " ";
				isEmpty = true;
			}
		}
		
		if (isEmpty)
			log.error("Row " + row.getRowNum() + " has empty cells at ("
					+ emptycell + ")");

		return isEmpty;
	}

	private WF3RulesBean getWF3RulesExcelDataRecord(Row row) {
		WF3RulesBean wf3rulesexceldata = null;
		StringBuilder msg = new StringBuilder();

		msg.append("Read row " + row.getRowNum() + ":--> ");
		if (!isRowEmpty(row)) {
			wf3rulesexceldata = new WF3RulesBean();

			try {
				msg.append("RuleId:=" + row.getCell(0) + ", ");

				int ruleid = (int) Double
						.parseDouble(row.getCell(0).toString());
				wf3rulesexceldata.setRuleId(ruleid);
			} catch (Exception e) {
				log.warn(e.getMessage());
			}

			// Capture the rule cess information
			msg.append("RuleShortName=" + row.getCell(1) + ", ");
			msg.append("RuleType=" + row.getCell(2) + ", ");
			msg.append("Rule=" + row.getCell(3) + ", ");
			msg.append("RuleApplication=" + row.getCell(4) + ", ");
			msg.append("RuleReportMessage=" + row.getCell(5) + "");

			// Create the rule record
			wf3rulesexceldata.setRuleShortName(row.getCell(1).toString());
			wf3rulesexceldata.setRuleType(row.getCell(2).toString());
			wf3rulesexceldata.setRule(row.getCell(3).toString());
			wf3rulesexceldata.setRuleApplication(row.getCell(4).toString());
			wf3rulesexceldata.setRuleReportMessage(row.getCell(5).toString());

			log.debug("msg:-> " + msg.toString());
			log.info("wf3rulesexceldata: " + wf3rulesexceldata);
		}

		return wf3rulesexceldata;
	}

	public List<WF3RulesBean> getWF3RulesBeans() {
		return wf3rulesbeanlist;
	}

}
