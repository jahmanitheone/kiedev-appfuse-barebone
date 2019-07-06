package com.synodex.qcai.antlr4.synrule.valid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidTest extends BaseSynRule {

	@Test
	public void testValid_IF_THEN_Rule() {
		String[] synrule = { "IF ASM THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_UpperCase() {
		String[] synrule = { "IF AA THEN BBB" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_LowerCase() {
		String[] synrule = { "if AC then bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_MixedCase1() {
		String[] synrule = { "If AD Then bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void testValid_IF_THEN_Rule_MixedCase2() {
		String[] synrule = { "IF AD Then BBB" };
		getSynRuleFromString(synrule);
	}

}
