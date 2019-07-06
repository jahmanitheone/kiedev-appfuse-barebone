package com.synodex.qcai.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

/**
 * WF3Rules
 * 
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@Entity
@Table(name = "WF3RULES")
public class WF3Rules {
	@Id
	@Column(name = "RULEID")
	private Long ruleId = null;
	@Column(name = "RULENAME")
	private String ruleName = null;
	@Column(name = "RULETYPE")
	private String ruleType = null;
	@Column(name = "RULE")
	private String rule = null;
	@Column(name = "RULEAPPLICATION")
	private String ruleApplication = null;
	@Column(name = "RULEDESCRIPTION")
	private String ruleDescription = null;

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
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

	public String getRuleDescription() {
		return ruleDescription;
	}

	public void setRuleDescription(String ruleDescription) {
		this.ruleDescription = ruleDescription;
	}

	@Override
	public String toString() {
		return "WF3Rules [ruleId=" + ruleId + ", ruleName=" + ruleName
		        + ", ruleType=" + ruleType + ", rule=" + rule
		        + ", ruleApplication=" + ruleApplication + ", ruleDescription="
		        + ruleDescription + "]";
	}
}
