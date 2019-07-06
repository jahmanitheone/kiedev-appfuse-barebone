package com.synodex.excel.bean;

/**
 * Data read from the WF3Rules.xlsx excel file
 * 
 * @author pchauvet
 * 
 */
public class WF3RulesBean {
	private int ruleId;
	private String ruleShortName;
	private String ruleType;
	private String rule;
	private String ruleApplication;
	private String ruleReportMessage;
	private boolean isValid;

	public int getRuleId() {
		return ruleId;
	}

	public void setRuleId(int ruleId) {
		this.ruleId = ruleId;
	}

	public String getRuleShortName() {
		return ruleShortName;
	}

	public void setRuleShortName(String ruleShortName) {
		this.ruleShortName = ruleShortName;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public String getRuleApplication() {
		return ruleApplication;
	}

	public void setRuleApplication(String ruleApplication) {
		this.ruleApplication = ruleApplication;
	}

	public String getRuleReportMessage() {
		return ruleReportMessage;
	}

	public void setRuleReportMessage(String ruleReportMessage) {
		this.ruleReportMessage = ruleReportMessage;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	@Override
	public String toString() {
		return "WF3RulesBean [ruleId=" + ruleId + ", ruleShortName="
				+ ruleShortName + ", ruleType=" + ruleType + ", rule=" + rule
				+ ", ruleApplication=" + ruleApplication
				+ ", ruleReportMessage=" + ruleReportMessage + ", isValid="
				+ isValid + "]";
	}

}
