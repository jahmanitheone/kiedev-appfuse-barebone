package com.synodex.qcai.antlr4.synrule.valid;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;

public class SynRuleValidRuleSynIdDeclarationWithConditionWithBracketTest extends BaseSynRule {

	@Test
	public void validAssignRuleSynidWithAndOperation() {
		String[] synrule = { "IF (HD = \"True\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		//String[] synrule = { "IF (HD = \"True\") AND THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidWithOrOperation() {
		String[] synrule = { "IF (HD = \"True\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualTrueWithOrOperation() {
		String[] synrule = { "if (ASM != \"True\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualFalseWithOrOperation() {
		String[] synrule = { "if (ASM != \"FalsE\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualTrueWithAndLowercaseOperation() {
		String[] synrule = { "if (ASM != \"True\") and (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidNotEqualTrueWithAndUppercaseOperation() {
		String[] synrule = { "if (ASM != \"True\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueUpperCaseAndOperation() {
		String[] synrule = { "if (ASM   =   \"TRUE\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueUpperCaseOrOperation() {
		String[] synrule = { "if (ASM   =   \"TRUE\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueLowerCaseAndOperation() {
		String[] synrule = { "if (ASM = \"true\")   AND   (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualTrueLowerCaseOrOperation() {
		String[] synrule = { "if (ASM = \"true\")   OR   (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseUpperCaseAndOperation() {
		String[] synrule = { "if (ASM = \"FALSE\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseUpperCaseOROperation() {
		String[] synrule = { "if (ASM = \"FalsE\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseLowerCaseAndOperation() {
		String[] synrule = { "if (ASM = \"false\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };;
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseLowerCaseOrOperation() {
		String[] synrule = { "if (ASM = \"FalsE\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };;
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseMixedCaseAndOperation() {
		String[] synrule = { "if (ASM = \"FalsE\") AND (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };;
		getSynRuleFromString(synrule);
	}

	@Test
	public void validAssignRuleSynidEqualFalseMixedCaseOROperation() {
		String[] synrule = { "if (ASM = \"FalsE\") OR (ETOH.Status = \"Current Treatment\") THEN HD.DataStatus = \"Decline\"" };;
		getSynRuleFromString(synrule);
	}

}
