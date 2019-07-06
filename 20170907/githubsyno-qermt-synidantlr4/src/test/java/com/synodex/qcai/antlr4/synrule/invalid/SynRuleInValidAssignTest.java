package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleInValidAssignTest extends SynRuleHandler {

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
