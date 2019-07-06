package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleInvalidTHENTest extends BaseSynRule {

	@Test
	public void keyworkdTHENmissing() {
		String[] synrule = { "IF aa bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void keyworkdTHENmissingEN() {
		String[] synrule = { "IF aa th bbb" };
		getSynRuleFromString(synrule);
	}

}
