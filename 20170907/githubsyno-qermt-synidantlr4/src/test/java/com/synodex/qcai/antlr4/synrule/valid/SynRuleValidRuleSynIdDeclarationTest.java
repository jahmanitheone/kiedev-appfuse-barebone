package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleValidRuleSynIdDeclarationTest extends SynRuleHandler {

	@Test
	public void validAssignRuleSynidEqualTrue() {
		String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualFalse() {
		String[] synrule = { "if ASM = \"False\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidNotEqualTrue() {
		String[] synrule = { "if ASM != \"True\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidNotEqualFalse() {
		String[] synrule = { "if ASM != \"False\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualTrueUpperCase() {
		String[] synrule = { "if ASM   =   \"TRUE\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualTrueLowerCase() {
		String[] synrule = { "if ASM = \"true\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualFalseUpperCase() {
		String[] synrule = { "if ASM = \"FALSE\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualFalseLowerCase() {
		String[] synrule = { "if ASM = \"false\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validAssignRuleSynidEqualFalseMixedCase() {
		String[] synrule = { "if ASM = \"FalsE\" THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

}
