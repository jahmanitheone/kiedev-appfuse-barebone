package com.synodex.qermt.tool.main.codegenerator.base;

import java.util.List;

import org.apache.log4j.Logger;

import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;
import com.synodex.qcai.utils.ShowUtil;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;

public abstract class GenerateCodeBase implements GenerateCode {
	private final static Logger log = Logger.getLogger(GenerateCodeBase.class);
	private StringBuilder gencode = new StringBuilder();
	protected WF3RuleSynRuleHandler wfeRuleSynRuleHandler;
	protected List<SynRuleHandler> synRuleHandlerList;
	protected List<WF3RulesBean> wf3RulesBeanList;
	protected ExcelFileHelper excelFileHelper;
	private String fileName;
	private String filePath;

	public GenerateCodeBase(WF3RuleSynRuleHandler handler, ExcelFileHelper excelhelper)
			throws QERMTToolException {
		
		if (handler == null)
			throw new QERMTToolException(
					"WF3RuleSynRuleHandler can not be null");
		if (handler == null)
			throw new QERMTToolException(
					"ExcelFileHelper can not be null");

		this.synRuleHandlerList = handler.getSynRuleHandlerList();
		this.wf3RulesBeanList = handler.getWf3RulesBeanList();
		this.excelFileHelper = excelhelper;
	}
	
	public void before() {
		ShowUtil.showSectionNoSpacer(log, "Start generating code");
		
		if(wf3RulesBeanList!= null) {
			log.debug("wf3RulesBeanList: " + wf3RulesBeanList.size());
			log.info("Generating code from " + wf3RulesBeanList.size()
					+ " rules");
		}
		if (synRuleHandlerList != null)
			log.debug("synRuleHandlerList: " + synRuleHandlerList.size());
	}

	protected void addCR(String msg) {
		if (msg != null)
			gencode.append(msg + "\n");
	}

	public String getGeneratedCode() {
		return gencode.toString();
	}
	
	public void after() {
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

}
