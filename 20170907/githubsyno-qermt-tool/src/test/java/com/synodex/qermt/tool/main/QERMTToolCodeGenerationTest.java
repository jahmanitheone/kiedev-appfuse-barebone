package com.synodex.qermt.tool.main;

import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHanderException;
import com.synodex.qermt.tool.exception.QERMTToolException;

public class QERMTToolCodeGenerationTest {
	private final static Logger log = Logger
			.getLogger(QERMTToolCodeGenerationTest.class);
	private static QERMTTool qermttool;
	private static String excelfile;
	private static WF3RuleSynRuleHandler wf3RuleSynRuleHandler;
	private StringBuilder gencode = new StringBuilder();

	@BeforeClass
	public static void setUp() {
		// excelfile = "WF3RulesXLSX.xlsx";
		excelfile = "WF3RulesXLSXConsolidate.xlsx";
		excelfile = "WF3RulesMunichFromRichard.xlsx";
	}

	@AfterClass
	public static void tearDown() {
		qermttool = null;
		excelfile = null;
	}

	@Test
	public void generateDroolsInsertStatement() {
		try {
			qermttool = new QERMTTool(excelfile);
			process();

			List<WF3RulesBean> wf3RulesBeanList = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3RulesBeanList.size() > 0);

			wf3RuleSynRuleHandler = qermttool.getWF3RuleSynRuleHandler();
			Assert.assertNotNull(wf3RuleSynRuleHandler);

			qermttool.generateDroolsInsertStatement();

			log.info("..");
			log.info("Rules " + wf3RulesBeanList.size());

		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
		}
	}

	@Test
	public void generateDroolsErrors() {
		try {
			qermttool = new QERMTTool(excelfile);
			process();

			List<WF3RulesBean> wf3RulesBeanList = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3RulesBeanList.size() > 0);

			wf3RuleSynRuleHandler = qermttool.getWF3RuleSynRuleHandler();
			Assert.assertNotNull(wf3RuleSynRuleHandler);

			qermttool.generateDroolsErrors();

			log.info("..");
			log.info("Rules " + wf3RulesBeanList.size());

		} catch (QERMTToolException e) {
			log.error(e.getMessage());
		}
	}

	@Test
	public void generateDroolsMetadata() {
		try {
			log.info("..");

			qermttool = new QERMTTool(excelfile);
			process();

			List<WF3RulesBean> wf3RulesBeanList = qermttool
					.getWf3RulesBeanList();
			Assert.assertTrue(wf3RulesBeanList.size() > 0);

			wf3RuleSynRuleHandler = qermttool.getWF3RuleSynRuleHandler();
			Assert.assertNotNull(wf3RuleSynRuleHandler);

			qermttool.generateDroolsMetadata();

			log.info("..");
			log.info("Rules " + wf3RulesBeanList.size());
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			Assert.assertEquals(e.getMessage(),
					"No excel file was not provided");
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
	}

}
