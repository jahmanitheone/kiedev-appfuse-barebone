package com.synodex.qcai.antlr4.util;

import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.ExcelFileDAO;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.dao.ReadExcelFile;
import com.synodex.excel.dao.WF3RulesExcelFileDAO;

public class RuleTextValueMapKeysFromExcelFileTest {
	private final static Logger log = Logger
			.getLogger(RuleTextValueMapKeys.class);
	private static WF3RulesExcelFileDAO wf3rulesexcelfiledao = null;
	private static ExcelFileDAO readexcelfile;
	private static String file = null;

	@BeforeClass
	public static void setUp() {
		wf3rulesexcelfiledao = new WF3RulesExcelFileDAO();
		setReadExcelFile();
		setExcelFileRows();
	}

	@AfterClass
	public static void tearDown() {
		wf3rulesexcelfiledao = null;
	}

	private static void setReadExcelFile() {
		file = "C:/dev/workspacepoi/excel/files/WF3RulesXLSX.xlsx";
		file = "C:/Users/pchauvet/invtmp/WF3XXXXX.xlsx";
		file = "C:/Users/pchauvet/invtmp/WF3RulesXLSXConsolidate.xlsx";
		file = "C:/dev/workspaceqermttool/synodex-qermt-tool/ruledir/WF3XXX.xlsx";
		file = "C:/dev/workspaceqermttool/synodex-qermt-wf3excel/excelfiles/WF3XXXXX.xlsx";
		file = "C:/dev/workspaceqermttool/synodex-qermt-wf3excel/excelfiles/WF3RulesMunichFromRichard.xlsx";

		readexcelfile = new ReadExcelFile();
		readexcelfile.setFilePath(file);

		try {
			readexcelfile.readExcelFile();
		} catch (ExcelFileException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	private static void setExcelFileRows() {
		List<Row> rows = readexcelfile.getExcelFileRows();
		try {
			wf3rulesexcelfiledao.setExcelFileRows(rows);
		} catch (ExcelFileException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getWF3RulesBeans() {
		List<WF3RulesBean> wf3rulesbeanlist = wf3rulesexcelfiledao
				.getWF3RulesBeans();
		Assert.assertTrue(wf3rulesbeanlist.size() > 0);

		log.info(".......................");
		for (WF3RulesBean wf3entry : wf3rulesbeanlist) {
			log.info(wf3entry);
		}
	}

	@Test
	public void getRuleTextValueMapKeys() {
		StringBuilder textvalue = new StringBuilder();

		List<WF3RulesBean> wf3rulesbeanlist = wf3rulesexcelfiledao
				.getWF3RulesBeans();
		Assert.assertTrue(wf3rulesbeanlist.size() > 0);

		int j = 0;
		log.info(".......................");
		for (WF3RulesBean wf3entry : wf3rulesbeanlist) {
			try {
				textvalue.append((j++) + ": " + wf3entry.getRule() + "\n");

				RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(
						wf3entry.getRule());

				List<String> keys = tokenTextValue.getRuleIfConditionKeys();
				String tval = getTextValues(keys);
				String tmpval = "";
				for (String tkey : keys) {
					tkey = tkey.replaceAll(" ", "");
					tmpval += tkey + "-"
							+ tokenTextValue.getIfConditionText(tkey) + ",";
				}
				textvalue.append("    Lookup If: " + tmpval + "\n");

				List<String> dvalues = tokenTextValue.getRuleThenValueKeys();
				String dval = getTextValues(dvalues);

				textvalue.append("    If: " + tval + " | Then: " + dval + "\n");
			} catch (RuleTextValueMapKeysException e) {
				log.error(e.getMessage());
				Assert.assertNotNull("Rule is invalid");
			}
		}

		log.info("\n" + textvalue);
	}

	@Test
	public void getRuleAText() {
		StringBuilder textvalue = new StringBuilder();

		try {
			String text = "IF AML = \"TRUE\" AND AML.Condition_Status = \"Unknown\" AND AML.FAB_Stage =\"M7 - Megakaryoblastic\" THEN AML.ICD9CMCode = \"207.2\"";
			textvalue.append(": " + text + "\n");

			RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(text);

			List<String> tvalues = tokenTextValue.getRuleIfConditionKeys();
			String tval = getTextValues(tvalues);
			String tmpval = "";
			for (String tkey : tvalues) {
				tkey = tkey.replaceAll(" ", "");
				tmpval += tkey + "-" + tokenTextValue.getIfConditionText(tkey)
						+ ",";
			}
			textvalue.append("    Lookup If: " + tmpval + "\n");

			List<String> dvalues = tokenTextValue.getRuleThenValueKeys();

			String dval = getTextValues(dvalues);

			textvalue.append("    If: " + tval + " | Then: " + dval + "\n");
		} catch (RuleTextValueMapKeysException e) {
			log.error(e.getMessage());
			Assert.assertNotNull("Rule is invalid");
		}

		log.info("\n" + textvalue);
	}

	private String getTextValues(List<String> tvalues) {
		String texvalues = "";
		int valcnt = tvalues.size();
		int k = 0;
		for (String val : tvalues) {
			String tx = k++ < valcnt - 1 ? ", " : " ";
			texvalues += val + tx;
		}

		return texvalues;
	}

}
