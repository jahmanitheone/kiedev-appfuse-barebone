package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;
import com.synodex.qcai.antlr4.synrule.base.DoughsRules02;

public class SynRuleValidFromDoughTest extends SynRuleHandler {
	private final static Logger log = Logger
			.getLogger(SynRuleValidFromDoughTest.class);

	public SynRuleValidFromDoughTest() {
		//setShowRuleNames(false);
		// setShowTemplateContent(false);
	}

	@Test
	public void validAssignRuleSynidWithAndOperation() {
		setRuleName("XX.Status1");

		// String doughsrule =
		// "IF AD = \"True\" AND AD.Type1 = \"Early Onset\" AND AD.Type2 = \"Behavioral Disturbance\" THEN AD.Code = \"ICD-10-CM-2013 G30.0\""
		// };
		// String doughsrule = DoughsRules02.getRule(4);

		// String doughsrule =
		// "IF AD = \"True\" AND AD.Type1  is Null AND AD.Type2  is Null  THEN AD.Code = \"ICD-10-CM-2013 G30.9\"";
		String doughsrule = DoughsRules02.getRule(7);

		// IF AL = "True" THEN AL.DataStatus = 'Decline"
		// String doughsrule = DoughsRules02.getRule(22);

		String[] synrule = { doughsrule };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors())
			Assert.fail(errorMesages.toString());
	}

	//Todo - Why failed
	@Test
	@Ignore
	public void validDoughAssignRules() {
		int[] rulepos = { 4, 7, 22 };

		for (int ruleno : rulepos) {
			String[] doughrules = { DoughsRules02.getRule(ruleno) };
			log.info("\r\n" + ruleno + ": Doughs rule: " + doughrules[0]);
			// log.info("\r\n----");

			getSynRuleFromString(doughrules);
			if (errorHandler.hasErrors()) {
				Assert.fail(errorMesages.toString());
			}
		}
	}

}
