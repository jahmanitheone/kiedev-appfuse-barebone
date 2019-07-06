package com.synodex.qcai.antlr4.synrule;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidTest extends BaseSynRule {

	@Test
	public void testValid_IF_THEN_Rule() {
		String[] synrule = { "IF aa THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_UpperCase() {
		String[] synrule = { "IF AA THEN BBB" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_LowerCase() {
		String[] synrule = { "if aa then bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_MixedCase1() {
		String[] synrule = { "If aa Then bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_MixedCase2() {
		String[] synrule = { "IF aa Then BBB" };
		getSynRuleFromString(synrule);
	}

}
