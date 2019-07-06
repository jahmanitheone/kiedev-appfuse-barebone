package com.synodex.excel.helper;

import java.util.ArrayList;
import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.tool.WF3RuleExcelTool;
import com.synodex.qcai.antlr4.rule.base.SynRuleProcessor;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHanderException;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class WF3RuleSynRuleHandlerTest {
	private static Logger log = Logger
			.getLogger(WF3RuleSynRuleHandlerTest.class);
	private static WF3RuleSynRuleHandler wf3rulesynrulehandler;
	private static WF3RuleExcelTool wf3ruleexceltool;
	private static List<WF3RulesBean> wf3RulesBeanList = new ArrayList<WF3RulesBean>();

	@BeforeClass
	public static void setUp() {
		try {
			String path  ="C:\\A-ELG-MISC\\project\\workspacedrools5\\synodex-qermt-wf3excel\\excelfiles\\";
			String file = "C:7/dev/workspaceqermttool/synodex-qcaiengine-wf3excel/excelfiles/WF3RulesXLSX.xlsx";
			file = "C:/dev/workspaceqermttool/synodex-qermt-tool/ruledir/WF3XXX.xlsx";
			file = path + "WF3RulesMunichFromRichard.xlsx";

			wf3ruleexceltool = new WF3RuleExcelTool(file);

			wf3RulesBeanList = wf3ruleexceltool.getWF3RulesBeans();
			Assert.assertTrue(wf3RulesBeanList.size() > 0);

			String templatefile = "C:/dev/workspaceantlrnew/synodex-qcaiengine-synidantlr4/droolstemplate/droolsrule.drl";
			wf3rulesynrulehandler = new WF3RuleSynRuleHandler(wf3RulesBeanList,
					templatefile);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void wf3RuleSynRuleHandler() {
		Assert.assertNotNull(wf3rulesynrulehandler);
	}

	@Test
	public void wf3RulesBeanList() {
		Assert.assertTrue(wf3rulesynrulehandler.getWf3RulesBeanList().size() > 0);
	}

	@Test
	public void processList() {
		try {
			wf3rulesynrulehandler.process();
		} catch (SynRuleHanderException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void showFailedRule() {
		try {
			wf3rulesynrulehandler.process();
			int pos = 1; // Read rules failed on record 1
			wf3rulesynrulehandler.setRowsToProcess(pos);
			try {
				SynRuleProcessor synruleprocessor = wf3rulesynrulehandler
						.getSynRuleProcessor(pos - 1);
				if (synruleprocessor != null) {
					if (synruleprocessor.hasErrors()) {
						log.error(synruleprocessor.getGeneRatedError());
					} else {
						log.info("\n"
								+ synruleprocessor.getGeneRatedDroolsRule());
					}
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		} catch (SynRuleHanderException e1) {
			log.error(e1.getMessage());
			Assert.fail(e1.getMessage());
		}
	}

	@Test
	public void showProcessedPassedRule() {
		try {
			wf3rulesynrulehandler.process();

			int pos = 21; // Read rules succeeded at 11
			// wf3rulesynrulehandler.setRowsToProcess(pos);
			try {
				SynRuleProcessor synruleprocessor = wf3rulesynrulehandler
						.getSynRuleProcessor(pos);
				if (synruleprocessor != null) {
					if (synruleprocessor.hasErrors()) {
						// log.error(synruleprocessor.getGeneRatedError());
					} else {
						log.info("\n"
								+ synruleprocessor.getGeneRatedDroolsRule());
					}
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		} catch (SynRuleHanderException e1) {
			log.error(e1.getMessage());
			Assert.fail(e1.getMessage());
		}
	}

	@Test
	public void showPassedRule() {
		try {
			wf3rulesynrulehandler.process();

			List<SynRuleHandler> validSynRuleHandlerList = wf3rulesynrulehandler
					.getValidSynRuleHandlerList();
			for (SynRuleHandler synrule : validSynRuleHandlerList) {
				SynRuleProcessor synruleprocessor = synrule
						.getSynRuleProcessor();
				log.info("\n" + synruleprocessor.getGeneRatedDroolsRule());
			}
		} catch (SynRuleHanderException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void showFailedPassedRule() {
		try {
			wf3rulesynrulehandler.process();

			List<SynRuleHandler> inValidSynRuleHandlerList = wf3rulesynrulehandler
					.getInValidSynRuleHandlerList();
			for (SynRuleHandler synrule : inValidSynRuleHandlerList) {
				SynRuleProcessor synruleprocessor = synrule
						.getSynRuleProcessor();
				log.info("\n" + synruleprocessor.getGeneRatedError());
			}
		} catch (SynRuleHanderException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void showFromAllRules() {
		try {
			wf3rulesynrulehandler.process();

			List<SynRuleHandler> synRuleHandlerList = wf3rulesynrulehandler
					.getSynRuleHandlerList();

			int row = 0;
			for (SynRuleHandler handler : synRuleHandlerList) {
				if (handler.isValid()) {
					log.info(row++ + " Valid - " + handler.getRuleName() + " "
							+ handler.getSynRule());

					// SynRuleProcessor synruleprocessor = handler
					// .getSynRuleProcessor();
					// // log.info("\n" +
					// synruleprocessor.getGeneRatedDroolsRule());
				} else {
					log.info(row++ + " *InValid - " + handler.getRuleName()
							+ " " + handler.getSynRule());

					SynRuleProcessor synruleprocessor = handler
							.getSynRuleProcessor();
					log.info("\n" + synruleprocessor.getGeneRatedError());
				}
			}

			log.info("..");
			log.info("Rules " + wf3RulesBeanList.size());
			log.info("Rules handler " + synRuleHandlerList.size());
		} catch (SynRuleHanderException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
