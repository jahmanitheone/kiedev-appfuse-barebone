package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleInvalidIFTest extends SynRuleHandler {

	@Test
	public void keyworkdIFmissing() {
		String[] synrule = { "aa THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void keyworkdIFmissingF() {
		String[] synrule = { "I aa THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
