package com.synodex.qcai.antlr4.synrule.invalid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleInValidRuleSynIdDeclarationTest extends BaseSynRule {

	@Test
	public void inValidAssignRuleSynidTrueFalseQuotesMissing() {
		String[] synrule = { "if ASM = THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidTrueFalseMissing() {
		String[] synrule = { "if ASM = \"\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidFirstQuoteMissing() {
		String[] synrule = { "if ASM != True\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidSecondQuoteMissing() {
		String[] synrule = { "if ASM != \"False THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidTrueMispelled() {
		String[] synrule = { "if ASM   =   \"TRUEx\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidFalseMispelled() {
		String[] synrule = { "if ASM   =   \"xFalse\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void inValidAssignRuleSynidTrueFalseMispelled() {
		String[] synrule = { "if ASM = \"bad\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
