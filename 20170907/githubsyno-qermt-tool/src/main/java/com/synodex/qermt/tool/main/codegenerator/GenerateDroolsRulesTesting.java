package com.synodex.qermt.tool.main.codegenerator;

import java.util.Date;
import org.apache.log4j.Logger;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qcai.antlr4.rule.base.SynRuleProcessor;
import com.synodex.qcai.antlr4.rule.bean.SynRule;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;
import com.synodex.qcai.utils.FileUtil;
import com.synodex.qcai.utils.ShowUtil;
import com.synodex.qermt.tool.Constants;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.codegenerator.base.GenerateCodeBase;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;

public class GenerateDroolsRulesTesting extends GenerateCodeBase {
	private final static Logger log = Logger
			.getLogger(GenerateDroolsRulesTesting.class);
	private String codegentype = "Rules Drools Bare Statement For Testing";

	public GenerateDroolsRulesTesting(WF3RuleSynRuleHandler handler,
			ExcelFileHelper excelhelper) throws QERMTToolException {
		super(handler, excelhelper);
	}

	public void beginMessage() {
		ShowUtil.showDotMarker(log);
		ShowUtil.showMainSectionNoSpacer(log, "Begin Generating " + codegentype);
		// ShowUtil.showMainSection(log, "Begin Generating " + codegentype);

		int j = 0;
		for (SynRuleHandler synhander : synRuleHandlerList) {
			if (synhander != null)
				log.info(((j++) + 1) + ": SynRule: " + synhander.getSynRule());
			else
				log.error(((j++) + 1)
						+ ": SynRule was not read and no code generation is possible");
		}
	}

	public void endMessage() {
		ShowUtil.showMainSectionNoSpacer(log, "Completed Generating "
				+ codegentype);
		// ShowUtil.showMainSection(log, "Completed Generating " + codegentype);

		ShowUtil.showDotMarker(log);
	}

	public void process() throws QERMTToolException {
		beginMessage();
		before();
		generateCode();
		after();
		saveFile();
		endMessage();
	}

	public void before() {
		addCR("//QERMT Tool Code Generated Rules on " + new Date());
		addCR("");
	}

	public void generateCode() {
		int row = 0;
		for (SynRuleHandler handler : synRuleHandlerList) {
			if (handler.isValid()) {
				SynRuleProcessor synruleprocessor = handler
						.getSynRuleProcessor();

				// Fix the generated code
				String code = synruleprocessor.getGeneRatedDroolsRule().trim();
				if (!code.isEmpty()) {
					code.replaceAll("'", "\"");

					// log.info("\n" +
					// synruleprocessor.getGeneRatedDroolsRule());
					SynRule rule = handler.getSynRule();
					addCR("//" + (rule.getRuleId()) + ") Generated rule: "
							+ ", " + rule.ruleName + ", " + rule.getRule());
					addCR(code);
					addCR("");
				} else
					log.warn("-- (" + (row + 1) + "): "
							+ synruleprocessor.getRuleName() + " is blank.");

				row++;
				// if (row > 1)
				// break;
			}
		}
	}

	public void after() {
		addCR("");
	}

	public void saveFile() throws QERMTToolException {
		String statementfile = excelFileHelper.getExcelRuleDirPath()
				+ Constants.QERMT_GENERATEFILE_DROOLSRULETESTING;

		setFilePath(statementfile);
		setFileName(Constants.QERMT_GENERATEFILE_DROOLSRULETESTING);
		
		String msg = "delete drools rules for testing file: " + statementfile;
		try {
			FileUtil.delete(statementfile);
			msg = "Successful " + msg;
		} catch (Exception e) {
			msg = "Could not " + msg;
			log.warn(msg + ": " + e.getMessage());
		}

		try {
			FileUtil.write(statementfile, getGeneratedCode());
			msg = "Wrote drools " + msg;
			ShowUtil.showInfo(log, msg);
		} catch (Exception e) {
			msg = "Could not write " + msg;
			throw new QERMTToolException(msg);
		}
	}


}