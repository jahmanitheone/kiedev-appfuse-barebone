package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleInvalidConditionTest extends SynRuleHandler {

	@Test
	public void conditionMissing1() {
		String[] synrule = { "IF THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void conditionMissing2() {
		String[] synrule = { "IFTHEN bbb" };
		getSynRuleFromString(synrule);
	}

}
