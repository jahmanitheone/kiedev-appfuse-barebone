package com.synodex.qcai.antlr4.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;

/**
 * Capture the values for all the SynId and Then assignment. This will allow to
 * get values from the trimed values that Antlr accomplishes on processing.
 * 
 * @author pchauvet
 * 
 */
public class RuleTextValueMapKeys {
	private final static Logger log = Logger
			.getLogger(RuleTextValueMapKeys.class);
	private Map<String, String> tokenIfConditionTextMap = new HashMap<String, String>();
	private Map<String, String> tokenRuleValueTextMap = new HashMap<String, String>();
	private String ruleText;
	private int readPropertyCnt;
	private List<String> ruleIfConditionKeys = new ArrayList<String>();
	private List<String> ruleThenValueKeys = new ArrayList<String>();

	public RuleTextValueMapKeys(String rule)
			throws RuleTextValueMapKeysException {
		this.ruleText = rule;
		if (rule == null)
			throw new RuleTextValueMapKeysException("Rule can not be null");

		setRuleIfConditionValues(rule);
		setRuleValues(rule);
	}

	private void setRuleIfConditionValues(String rule)
			throws RuleTextValueMapKeysException {
		String value = null;
		String key = "\"";

		// // Preprocess rule for errors
		// try {
		// RuleCrazyErrorHandling.flagSingleQuotesError(rule);
		// } catch (Exception e1) {
		// throw new RuleTextValueMapKeysException(e1.getMessage());
		// }

		String ifstatement = null;
		String ifstatementupper = rule.toUpperCase();

		int posthen = ifstatementupper.lastIndexOf("THEN");
		ifstatement = rule.substring(0, posthen);
		// log.debug("0a ifstatement: " + ifstatement);

		try {
			int pos = ifstatement.indexOf(key);
			while (pos > 0) {
				// Find 1st ""
				value = ifstatement.substring(pos + 1).trim();
				if (value != null && !value.trim().isEmpty()) {
					// log.debug("1da. value: " + value);
					int pos2 = value.indexOf(key);
					// log.debug("1db. pos2: " + pos2);
					if (pos2 >= 0) {
						// log.debug("1e. pos2: " + pos2);

						// Find 2nd "
						value = value.substring(0, pos2);
						// log.debug("1fa. value: " + value);

						String droolskey = value;
						droolskey = droolskey.replaceAll(" ", "");
						// log.debug("1fb. droolskey: " + droolskey);

						ruleIfConditionKeys.add(droolskey);
						setIfConditionTextMap(droolskey, value);

						pos2 = value.length() + pos + 2;
						// log.debug("1e. pos2: " + pos2 + " -- "
						// + ifstatement.length());
						if (pos2 <= ifstatement.length()) {
							ifstatement = ifstatement.substring(pos2);
							// log.debug("1g. ifstatement: " + ifstatement);

							pos = ifstatement.indexOf(key);
							// log.debug("1h. pos: " + pos);
						} else
							break;
					} else
						break;
				} else
					break;
			}
		} catch (Exception e) {
			throw new RuleTextValueMapKeysException(e.getMessage());
		}
	}

	private void setRuleValues(String rule)
			throws RuleTextValueMapKeysException {
		String value = null;
		String key = "\"";

		// log.debug("0b  rule: " + rule);

		String rulevaluesuppercase = rule.toUpperCase();
		int posthen = rulevaluesuppercase.lastIndexOf("THEN");
		String rulevaluestatement = rule.substring(posthen);

		// log.debug("0b rulevaluestatement: " + rulevaluestatement);

		try {
			int pos = rulevaluestatement.indexOf(key);
			while (pos > 0) {
				// Find 1st ""
				value = rulevaluestatement.substring(pos + 1).trim();
				// log.debug("value: " + value);
				if (value != null && !value.trim().isEmpty()) {
					// log.debug("1bc. pos: " + pos);
					// log.debug("1bd. value: " + value);
					int pos2 = value.indexOf(key);
					// log.debug("1bd. pos2: " + pos2);
					if (pos2 >= 0) {
						// log.debug("1be. pos2: " + pos2);

						// Find 2nd "
						value = value.substring(0, pos2);
						// log.debug("1bfa. value: " + value);

						String droolskey = value;
						droolskey = droolskey.replaceAll(" ", "");
						// log.debug("1bfb. droolskey: " + droolskey);

						ruleThenValueKeys.add(droolskey);
						setTokenRuleValueText(droolskey, value);

						// log.debug("1bfa rulevaluestatement: "
						// + rulevaluestatement);
						// log.debug("1bfc. value.length(): " + value.length());
						// log.debug("1bfd. rulevaluestatement.length(): "
						// + rulevaluestatement.length());

						pos2 = value.length() + pos + 2;
						// log.debug("1bbe. pos2: " + pos2 + " -- "
						// + rulevaluestatement.length());
						if (pos2 <= rulevaluestatement.length()) {
							rulevaluestatement = rulevaluestatement
									.substring(pos2);
							// log.debug("1bg. ifstatement: " +
							// rulevaluestatement);

							pos = rulevaluestatement.indexOf(key);
							// log.debug("1bh. pos: " + pos);
						} else
							break;
					} else
						break;
				} else
					break;
			}
		} catch (Exception e) {
			throw new RuleTextValueMapKeysException(e.getMessage());
		}
	}

	public String getRuleText() {
		return ruleText;
	}

	public Map<String, String> getIfConditionTextMap() {
		return tokenIfConditionTextMap;
	}

	public String getIfConditionText(String key) {
		return tokenIfConditionTextMap.get(key);
	}

	private void setIfConditionTextMap(String key, String val) {
		tokenIfConditionTextMap.put(key, val);
	}

	public Map<String, String> getTokenRuleValueTextMap() {
		return tokenRuleValueTextMap;
	}

	private void setTokenRuleValueText(String key, String val) {
		tokenRuleValueTextMap.put(key, val);
	}

	public String getRuleValueText(String key) {
		return tokenRuleValueTextMap.get(key);
	}

	/**
	 * Automatically read the property count from the rule evaluation
	 * 
	 * @return
	 */
	public int getReadPropertyCnt() {
		return readPropertyCnt++;
	}

	public List<String> getRuleIfConditionKeys() {
		return ruleIfConditionKeys;
	}

	public String getRuleIfConditionKeys(int pos) {
		if (pos >= ruleIfConditionKeys.size())
			return null;

		return ruleIfConditionKeys.get(pos);
	}

	public List<String> getRuleThenValueKeys() {
		return ruleThenValueKeys;
	}

	public String getRuleThenValueKey(int pos) {
		if (pos >= ruleThenValueKeys.size())
			return null;

		return ruleThenValueKeys.get(pos);
	}

}
