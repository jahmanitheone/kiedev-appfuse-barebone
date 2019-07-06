package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateNumValueRange extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateNumValueRange.class);

	@Test
	public void ruleWithRangeGreateLessThan() {
		try {
			String rulename = "BLAC.Status5";
			String[] synrule = { ""
					+ "IF BLAC = \"True\" AND (BLAC.Stage_Group = \"Stage II\" ) AND (BLAC.Number_of_Tumors > 10 AND BLAC.Number_of_Tumors < 100) THEN BLAC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BLAC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacStage_Group,\"Stage II\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) > 10 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) < 100"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleWithRangeGreateLessThanEqual() {
		try {
			String rulename = "BLAC.Status5";
			String[] synrule = { ""
					+ "IF BLAC = \"True\" AND (BLAC.Stage_Group = \"Stage II\" ) AND (BLAC.Number_of_Tumors >= 10 AND BLAC.Number_of_Tumors <= 100) THEN BLAC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BLAC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacStage_Group,\"Stage II\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) >= 10 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) <= 100"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
