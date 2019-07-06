package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateNumValue extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateNumValue.class);

	@Test
	public void ruleWithSingleNumValue() {
		try {
			String rulename = "BLAC.Status5";
			String[] synrule = { ""
					+ "IF BLAC = \"True\" AND (BLAC.Stage_Group = \"Stage II\" ) AND (BLAC.Number_of_Tumors > 1 OR BLAC.Complications = \"Multiple tumors\") THEN BLAC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BLAC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacStage_Group,\"Stage II\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) > 1 ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacComplications,\"Multiple tumors\")"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleWithMultipleNumValue() {
		try {
			String rulename = "BLAC.Status5";
			String[] synrule = { ""
					+ "IF BLAC = \"True\" AND (BLAC.Stage_Group = \"Stage II\" ) AND (BLAC.Number_of_Tumors > 211 OR BLAC.Complications = \"Multiple tumors\") THEN BLAC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BLAC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacStage_Group,\"Stage II\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) > 211 ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacComplications,\"Multiple tumors\")"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleWithFloatNumValue() {
		try {
			String rulename = "BLAC.Status5";
			String[] synrule = { ""
					+ "IF BLAC = \"True\" AND (BLAC.Stage_Group = \"Stage II\" ) AND (BLAC.Number_of_Tumors > 21.1 OR BLAC.Complications = \"Multiple tumors\") THEN BLAC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BLAC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacStage_Group,\"Stage II\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(blacNumber_of_Tumors) > 21.1 ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(blacComplications,\"Multiple tumors\")"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
