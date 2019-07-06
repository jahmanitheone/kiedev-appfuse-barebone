package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;

import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleValidNullRuleTest extends SynRuleHandler {

	@Test
	public void validNullRule() {
		String[] synrule = { "IF AD = \"True\" AND AD.Type1 is Null AND AD.Type2 is Null THEN AD.Code = \"ICD-10-CM-2013 G30.9\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validNotNullRule() {
		String[] synrule = { "IF AD = \"True\" AND AD.Type1 is Not Null AND AD.Type2 is Null THEN AD.Code = \"ICD-10-CM-2013 G30.9\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validNotNullRule2() {
		String[] synrule = { "IF ADL = \"True\" AND AGE.Actual_Age >= 65 AND ADL.Activities_Lost is not Null THEN ADL.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

	@Test
	public void validSimpleIsNull() {
		String[] synrule = { "IF ADL = \"True\" AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) 
			Assert.fail(errorMesages.toString());
	}

}
