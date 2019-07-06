package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateNullNotNull extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateNullNotNull.class);

	@Test
	public void isNull() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age >= 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";
			//synrule[0] = "IF ADL = \"True\" AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertFalse(getCode().contains("!isEmpty(adlActivities_Lost)"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isNotNull() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age >= 65 AND ADL.Activities_Lost is not Null THEN ADL.DataStatus = \"Decline\"";
			//synrule[0] = "IF ADL = \"True\" AND ADL.Activities_Lost is Not Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains("!isEmpty(adlActivities_Lost)"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
