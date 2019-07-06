package com.synodex.qcai.antlr4.synrule;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleInValidAssignTest extends BaseSynRule {

	@Test
	public void assignStatementmissing1() {
		String[] synrule = { "IF aa THEN " };
		getSynRuleFromString(synrule);
	}

	@Test
	public void assignStatementmissing2() {
		String[] synrule = { "IF aa THEN" };
		getSynRuleFromString(synrule);
	}

}
