package com.synodex.qcai.antlr4.rule.bean;

import java.io.Serializable;

public class SynRule implements Serializable {
	private static final long serialVersionUID = -5296295286939667685L;
	private int ruleId;
	public String ruleName;
	public String rule;
	private String version;
	private String ruleType;
	private String ruleApplication;
	private String ruleReportMessage;
	private boolean isRuleDataSetter;

	public SynRule(String rulename, String rule) {
		this.ruleName = rulename;
		this.rule = rule;
	}

	/**
	 * New method of setting rule by defining if ruletype and is rule used to
	 * set datapoint data.
	 * 
	 * @param rulename
	 * @param ruletype
	 * @param rule
	 * @param issetdata
	 */
	public SynRule(String rulename, String ruletype, String rule,
			boolean issetdata) {
		this.ruleName = rulename;
		this.ruleType = ruletype;
		this.rule = rule;
		this.isRuleDataSetter = issetdata;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public int getRuleId() {
		return ruleId;
	}

	public void setRuleId(int ruleId) {
		this.ruleId = ruleId;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
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

	public boolean isRuleDataSetter() {
		return isRuleDataSetter;
	}

	/**
	 * Flag that rule is setting data to a data point. Set issetdata to true to
	 * set data, else false.
	 * <p>
	 * 
	 * The data to be set is define via the SynId after the THEN clause<br>
	 * Ex:<br>
	 * ...THEN BMIGroup.Group = "Obese", the datafield defined for Group would
	 * be set.
	 * 
	 * @param issetdata
	 */
	public void setRuleDataSetter(boolean issetdata) {
		this.isRuleDataSetter = issetdata;
	}

	@Override
	public String toString() {
		return "SynRule [ruleId=" + ruleId + ", ruleName=" + ruleName
				+ ", version=" + version + ", ruleType=" + ruleType
				+ ", ruleApplication=" + ruleApplication + ", rule=" + rule
				+ ", ruleReportMessage=" + ruleReportMessage
				+ ", isRuleDataSetter=" + isRuleDataSetter + "]";
	}

}
