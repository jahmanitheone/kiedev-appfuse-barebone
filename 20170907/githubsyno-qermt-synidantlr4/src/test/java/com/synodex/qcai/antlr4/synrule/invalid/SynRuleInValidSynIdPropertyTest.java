package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleInValidSynIdPropertyTest extends SynRuleHandler {

	@Test
	public void inValidSynIdPropertyMissingSynID() {
		String[] synrule = { "IF .Type THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidSynIdPropertyMissingProperty() {
		String[] synrule = { "IF ASM. THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidSynIdPropertyMissingPeriod() {
		String[] synrule = { "IF ASMtype THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidSynIdPropertyMissing() {
		String[] synrule = { "IF THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
