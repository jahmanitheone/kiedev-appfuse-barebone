package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateSpaceValue extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateSpaceValue.class);

	@Test
	public void spaceRuleCondition() {
		try {
			// Rule condition has space 'HTLV Type 1'
			String rulename = "AL.Status1";
			String[] synrule = { "IF HIV = \"TRUE\" AND HIV.HIV_Type = \"HTLV Type 1\" THEN HIV.ICD10CMCode = \"B97.33\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(hivHIV_Type,\"HTLV Type 1\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"B97.33\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSpacedRuleCondition() {
		try {
			// Rule condition has space 'HTLV Type 1'
			String rulename = "AL.Status1";
			String[] synrule = { "IF HIV = \"TRUE\" AND AML.Condition_Status = \"Not Known\" AND HIV.HIV_Type = \"HTLV Type 1\" THEN HIV.ICD10CMCode = \"B97.33\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(amlCondition_Status,\"Not Known\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(hivHIV_Type,\"HTLV Type 1\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"B97.33\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	// Rule value did not have spacing - may not be needed
	@Test
	public void spaceRuleValue() {
		try {
			// Rule condition has space 'B97 33'
			String rulename = "AL.Status1";
			String[] synrule = { "IF HIV = \"TRUE\" AND HIV.HIV_Type = \"HTLV Type 1\" THEN HIV.Value = \"B97  33\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(hivHIV_Type,\"HTLV Type 1\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"HIV\",\"VALUE\",\"B97  33\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
