package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleInvalidSynIdTest extends BaseSynRule {

	@Test
	public void synIdLowercase() {
		String[] synrule = { "IF aa THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void synIdMissing() {
		String[] synrule = { "IF THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
