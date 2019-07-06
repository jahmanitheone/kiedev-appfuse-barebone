package com.synodex.excel.helper;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.exception.WF3RulesExcelException;
import com.synodex.qcai.antlr4.rule.base.SynRuleProcessor;
import com.synodex.qcai.antlr4.rule.bean.SynRule;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHanderException;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;
import com.synodex.qcai.utils.ShowUtil;


public class WF3RuleSynRuleHandler {
	private static Logger log = Logger.getLogger(WF3RuleSynRuleHandler.class);
	private List<WF3RulesBean> wf3RulesBeanList = new ArrayList<WF3RulesBean>();
	private List<SynRuleHandler> synRuleHandlerList = new ArrayList<SynRuleHandler>();
	private List<SynRuleHandler> validSynRuleHandlerList = new ArrayList<SynRuleHandler>();
	private List<SynRuleHandler> inValidSynRuleHandlerList = new ArrayList<SynRuleHandler>();
	private int rowsToProcess = 0;
	private boolean isShowRecord;
	private String templateFile;

	public WF3RuleSynRuleHandler(List<WF3RulesBean> list, String templatepath)
			throws WF3RulesExcelException {
		if (list == null)
			throw new WF3RulesExcelException("WF3Rules list can not be null");

		if (templatepath == null)
			throw new WF3RulesExcelException(
					"Drools rule template path can not be null");

		this.templateFile = templatepath;
		this.wf3RulesBeanList = list;

		ShowUtil.showSectionNoSpacer(log, "Reading rules template from: "
				+ templateFile);
	}

	public void process() throws SynRuleHanderException {

		int row = 0;
		for (WF3RulesBean wf3entry : wf3RulesBeanList) {
			processSynRule(wf3entry, row);

			row++;
		}

		ShowUtil.showSubSection(log,
				"Completed rules processing...: synRuleHandlerList.size() = "
						+ synRuleHandlerList.size());
	}

	private boolean processSynRule(WF3RulesBean wf3entry, int row)
			throws SynRuleHanderException {
		boolean isValidRule = false;

		try {
			SynRule synRule = new SynRule(wf3entry.getRuleShortName(),
					wf3entry.getRule());
			synRule.setRuleId(wf3entry.getRuleId());

			log.debug(row + "wwwww: synRule" + synRule);

			SynRuleHandler synrulehandler = new SynRuleHandler(synRule);
			try {
				synrulehandler.setTemplateFilePath(templateFile);
				synrulehandler.process();
			} catch (Exception e) {
				ShowUtil.showErrorSection(log, e.getMessage());
				throw new SynRuleHanderException(e.getMessage());
			}

			SynRuleProcessor synruleprocessor = synrulehandler
					.getSynRuleProcessor();

			log.debug(row + ": " + synruleprocessor);
			if (synruleprocessor.hasErrors()) {
				inValidSynRuleHandlerList.add(synrulehandler);
				log.debug(synruleprocessor.getGeneRatedError());
			} else {
				validSynRuleHandlerList.add(synrulehandler);
				synrulehandler.setValid(true);
				isValidRule = true;
				log.debug("\n" + synruleprocessor.getGeneRatedDroolsRule());
			}

			synRuleHandlerList.add(synrulehandler);
			log.debug("www synRuleHandlerList.size(): "
					+ synRuleHandlerList.size());
			if (isShowRecord) {
				log.info(row + " www wf3entry:-> " + wf3entry);
				log.info(row + "   synRule:->" + synRule);
			} else {
				log.debug(row + " www wf3entry:-> " + wf3entry);
				log.debug(row + "   synRule:->" + synRule);
			}
		} catch (SynRuleHanderException e) {
			log.error(e.getMessage());
			throw new SynRuleHanderException(e.getMessage());
		}

		return isValidRule;
	}

	public List<WF3RulesBean> getWf3RulesBeanList() {
		return wf3RulesBeanList;
	}

	public void setWf3RulesBeanList(List<WF3RulesBean> wf3RulesBeanList) {
		this.wf3RulesBeanList = wf3RulesBeanList;
	}

	/**
	 * For processed rule, get its processing messages and info
	 * 
	 * @param pos
	 * @return
	 */
	public SynRuleProcessor getSynRuleProcessor(int pos) {
		SynRuleProcessor synruleprocessor = null;

		SynRuleHandler synrulehandler = synRuleHandlerList.get(pos);
		if (synrulehandler != null)
			synruleprocessor = synrulehandler.getSynRuleProcessor();

		return synruleprocessor;
	}

	/**
	 * Get the number of rule rows to process setting
	 */
	public int getRowsToProcess() {
		return rowsToProcess;
	}

	/**
	 * Set the number of rule rows to process
	 * 
	 * @param rowsToProcess
	 */
	public void setRowsToProcess(int rowsToProcess) {
		this.rowsToProcess = rowsToProcess;
	}

	public boolean isShowRecord() {
		return isShowRecord;
	}

	public void setShowRecord(boolean isShowRecord) {
		this.isShowRecord = isShowRecord;
	}

	public List<SynRuleHandler> getSynRuleHandlerList() {
		return synRuleHandlerList;
	}

	public List<SynRuleHandler> getValidSynRuleHandlerList() {
		return validSynRuleHandlerList;
	}

	public List<SynRuleHandler> getInValidSynRuleHandlerList() {
		return inValidSynRuleHandlerList;
	}


}
