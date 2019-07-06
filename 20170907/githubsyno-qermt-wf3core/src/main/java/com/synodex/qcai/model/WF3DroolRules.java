package com.synodex.qcai.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import org.apache.log4j.Logger;

/**
 * 
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@Entity
@Table(name = "WF3DROOLRULES")
public class WF3DroolRules {
	private final static Logger log = Logger.getLogger(WF3DroolRules.class);
	@Id
	@Column(name = "ID")
	private Long id = null;
	@Column(name = "RULEID")
	private Long ruleId = null;
	@Column(name = "DROOLRULE")
	private String droolRule = null;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}

	public String getDroolRule() {
		return droolRule;
	}

	public void setDroolRule(String droolRule) {
		this.droolRule = droolRule;
	}

	@Override
	public String toString() {
		return "WF3DroolRules [id=" + id + ", ruleId=" + ruleId
		        + ", droolRule=" + droolRule + "]";
	}

	/**
	 * Show the bean without droolRule long content
	 * 
	 * @return
	 */
	public String toStringTruncateDroolRule() {
		String msg = trunateDroolRule(droolRule);
		return "WF3DroolRules [id=" + id + ", ruleId=" + ruleId
		        + "droolRule=" + msg + "]";
	}

	public static String trunateDroolRule(String rule) {
		String msg = "";
		int msgsize = 40;

		try {
			if (rule != null && !rule.isEmpty()) {
				log.info("Rule length:---> " + rule.length());
				if (rule != null && rule.length() >= msgsize)
					msg = rule.substring(0, msgsize - 1) + "  ...........";
				else {
					msgsize = rule.length();
					msg = rule.substring(0, msgsize - 1) + "  ...........";
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return msg;
	}
}
