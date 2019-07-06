package com.synodex.qcai.antlr4.synrule.valid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidSynIdTest extends BaseSynRule {

	@Test
	public void validSynId() {
		String[] synrule = { "IF ASM THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
