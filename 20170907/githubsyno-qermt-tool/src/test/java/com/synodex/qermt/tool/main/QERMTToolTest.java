package com.synodex.qermt.tool.main;

import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qermt.tool.exception.QERMTToolException;

public class QERMTToolTest {
	private final static Logger log = Logger.getLogger(QERMTToolTest.class);
	private static QERMTTool qermttool;
	private static String excelfile;
	private static String basedir;
	private static WF3RuleSynRuleHandler wf3RuleSynRuleHandler;

	@BeforeClass
	public static void setUp() {
		basedir = "C:\\dev\\workspaceqermttool\\synodex-qermt-tool\\";
		excelfile = "WF3RulesXLSX.xlsx";
		excelfile = "WF3RulesMunichFromRichard.xlsx";
	}

	@AfterClass
	public static void tearDown() {
		qermttool = null;
		excelfile = null;
		basedir = null;
	}

	@Test
	public void getExcelFileHelperWithNoBasedir() {
		try {
			qermttool = new QERMTTool(null, null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No base directory was provided to retrieve excel file");
		}
	}

	@Test
	public void getExcelFileHelperFromBasedirWithNoBasedir() {
		try {
			qermttool = new QERMTTool(null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getExcelFileHelperWithNoExcel() {
		try {
			qermttool = new QERMTTool(basedir, null);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getExcelFileHelperWithExcelFile() {
		try {
			qermttool = new QERMTTool(basedir, excelfile);
			process();
			Assert.assertNotNull(qermttool.getExcelFileHelper().getBasePath());
			Assert.assertNotNull(qermttool.getExcelFileHelper().getExcelFile());
			Assert.assertNotNull(qermttool.getExcelFileHelper()
					.getExcelFilePath());
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

	@Test
	public void getExcelFileHelperFromBaseDirWithExcel() {
		try {
			qermttool = new QERMTTool(excelfile);
			process();
			Assert.assertNotNull(qermttool.getExcelFileHelper().getBasePath());
			Assert.assertNotNull(qermttool.getExcelFileHelper().getExcelFile());
			Assert.assertNotNull(qermttool.getExcelFileHelper()
					.getExcelFilePath());
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getWf3RulesBeanList() {
		try {
			qermttool = new QERMTTool(excelfile);
			process();

			List<WF3RulesBean> wf3rulesbeanlist = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3rulesbeanlist.size() > 0);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getWf3RulesBeanListShowList() {
		try {
			qermttool = new QERMTTool(excelfile);
			qermttool.setShowWF3RulesBeanList(true);
			process();

			List<WF3RulesBean> wf3rulesbeanlist = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3rulesbeanlist.size() > 0);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getWF3RuleSynRuleHandler() {
		try {
			qermttool = new QERMTTool(excelfile);
			// qermttool.setShowWF3RulesBeanList(true);
			process();
			wf3RuleSynRuleHandler = qermttool.getWF3RuleSynRuleHandler();

			Assert.assertNotNull(wf3RuleSynRuleHandler);
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void getQERMTTool() {
		try {
			qermttool = new QERMTTool(excelfile);
			process();
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

	@Test
	public void generateDroolsRulesTesting() {
		try {
			qermttool = new QERMTTool(excelfile);
			qermttool.processDroolRules();

			List<WF3RulesBean> wf3RulesBeanList = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3RulesBeanList.size() > 0);

			wf3RuleSynRuleHandler = qermttool.getWF3RuleSynRuleHandler();
			Assert.assertNotNull(wf3RuleSynRuleHandler);

			qermttool.generateDroolsRulesTesting();

			log.info("..");
			log.info("Rules " + wf3RulesBeanList.size());

		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

	private static void process() throws QERMTToolException {
		qermttool.processDroolRules();
		qermttool.createFiles();
		qermttool.showProcessingMessage();
		qermttool.showFilesGenerated();		
	}

}
