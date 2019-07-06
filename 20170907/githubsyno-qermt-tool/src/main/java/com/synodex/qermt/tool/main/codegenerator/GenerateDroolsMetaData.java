package com.synodex.qermt.tool.main.codegenerator;

import org.apache.log4j.Logger;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;
import com.synodex.qcai.utils.FileUtil;
import com.synodex.qcai.utils.ShowUtil;
import com.synodex.qermt.tool.Constants;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.codegenerator.base.GenerateCodeBase;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;

public class GenerateDroolsMetaData extends GenerateCodeBase {
	private final static Logger log = Logger
			.getLogger(GenerateDroolsMetaData.class);
	private String codegentype = "Rules Metadata";

	public GenerateDroolsMetaData(WF3RuleSynRuleHandler handler,
			ExcelFileHelper excelhelper) throws QERMTToolException {
		super(handler, excelhelper);
	}
	public void beginMessage() {
		ShowUtil.showDotMarker(log);
		ShowUtil.showMainSectionNoSpacer(log, "Begin Generating " + codegentype);

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
		ShowUtil.showDotMarker(log);
	}

	public synchronized void process() throws QERMTToolException {
		beginMessage();
		before();
		generateCode();
		after();
		saveFile();
		endMessage();
	}

	public void before() {
		super.before();
	}

	public void generateCode() {
		int row = 0;
		// CVS file header
		addCR("RuleID,RuleShortName,RuleType,Rule,Rule Application,Report Message,Validity");

		for (WF3RulesBean bean : wf3RulesBeanList) {
			try {
				SynRuleHandler handler = synRuleHandlerList.get(row);
				if (handler != null) {
					String isvalid = handler.isValid() ? "Valid" : "Invalid";
					setCSVrow(bean, isvalid);
				}
			} catch (Exception e) {
				setCSVrow(bean, "Invalid");

				log.warn(row + ":-> Could not get WF3RulesBean from row " + row
						+ ": " + e.getMessage());
			}

			row++;
		}
	}

	private void setCSVrow(WF3RulesBean bean, String isvalid) {
		addCR(bean.getRuleId() + "," + bean.getRuleShortName() + ","
				+ bean.getRuleType() + "," + bean.getRule() + ","
				+ bean.getRuleApplication() + "," + bean.getRuleReportMessage()
				+ "," + isvalid);
	}

	public void after() {
		super.after();
	}

	public void saveFile() throws QERMTToolException {
		try {
			ShowUtil.showSectionNoSpacer(log, "Save file "
					+ Constants.QERMT_GENERATEFILE_METADATA);

			String cvsfile = excelFileHelper.getExcelRuleDirPath()
					+ Constants.QERMT_GENERATEFILE_METADATA;

			setFilePath(cvsfile);
			setFileName(Constants.QERMT_GENERATEFILE_METADATA);

			String msg = "delete drools CVS metada file: " + cvsfile;
			try {
				FileUtil.delete(cvsfile);
				msg = "Successful " + msg;
			} catch (Exception e) {
				msg = "Could not " + msg;
				log.warn(msg);
			}

			msg = "drools CVS metadata to file: " + cvsfile;
			try {
				FileUtil.write(cvsfile, getGeneratedCode());
				msg = "Wrote " + msg;
				ShowUtil.showInfo(log, msg);
			} catch (Exception e) {
				msg = "Could not write " + msg;
				throw new QERMTToolException(msg);
			}
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			throw new QERMTToolException(e.getMessage());
		}
	}

}
