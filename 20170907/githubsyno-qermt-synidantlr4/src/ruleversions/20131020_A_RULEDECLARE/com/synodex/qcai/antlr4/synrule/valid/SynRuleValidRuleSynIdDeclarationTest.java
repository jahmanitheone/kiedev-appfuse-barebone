package com.synodex.qcai.antlr4.synrule.valid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidRuleSynIdDeclarationTest extends BaseSynRule {

	@Test
	public void validAssignRuleSynidEqualTrue() {
		String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalse() {
		String[] synrule = { "if ASM = \"False\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualTrue() {
		String[] synrule = { "if ASM != \"True\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualFalse() {
		String[] synrule = { "if ASM != \"False\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueUpperCase() {
		String[] synrule = { "if ASM   =   \"TRUE\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueLowerCase() {
		String[] synrule = { "if ASM = \"true\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseUpperCase() {
		String[] synrule = { "if ASM = \"FALSE\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseLowerCase() {
		String[] synrule = { "if ASM = \"false\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseMixedCase() {
		String[] synrule = { "if ASM = \"FalsE\" THEN bbb" };
		getSynRuleFromString(synrule);
	}

}
