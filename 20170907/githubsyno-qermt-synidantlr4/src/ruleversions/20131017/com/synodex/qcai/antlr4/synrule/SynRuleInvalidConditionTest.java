package com.synodex.qcai.antlr4.synrule;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleInvalidConditionTest extends BaseSynRule {

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
