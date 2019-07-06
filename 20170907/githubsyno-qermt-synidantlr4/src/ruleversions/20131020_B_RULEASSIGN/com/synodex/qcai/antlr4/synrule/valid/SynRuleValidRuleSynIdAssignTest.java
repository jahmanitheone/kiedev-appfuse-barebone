package com.synodex.qcai.antlr4.synrule.valid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidRuleSynIdAssignTest extends BaseSynRule {

	@Test
	public void validAssignDecline() {
		String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignNumber() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Value = \"200\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignFloat() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Value = \"200.2\"" };
		getSynRuleFromString(synrule);
	}
	
	@Test
	public void validAssignCode() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignPercent() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Value = \"100%\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignFaction() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Value = \".9921\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignFaction2() {
		String[] synrule = { "IF AD = \"True\" THEN AD.Value = \"20.21\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignError() {
		String[] synrule = { "IF HD = \"True\" THEN WL.ErrorStatus = \"Error1\"" };
		getSynRuleFromString(synrule);
	}

}
