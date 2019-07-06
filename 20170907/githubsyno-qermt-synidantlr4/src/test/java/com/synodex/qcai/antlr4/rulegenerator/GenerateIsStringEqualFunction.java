package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateIsStringEqualFunction extends
		BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateIsStringEqualFunction.class);

	@Test
	public void isStringEqualFunction() {
		try {
			String rulename = "AVM.Status2";
			String[] synrule = { ""
					+ "IF AVM = \"True\" AND AVM.Treatment_Status == \"Completed Successfully\" THEN AVM.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(avmTreatment_Status,\"Completed Successfully\")"));
			Assert.assertFalse(getCode().contains("!isStringEqual"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isStringEqualFunctionVer2() {
		try {
			String rulename = "AVM.Status2";
			String[] synrule = { ""
					+ "IF AVM = \"True\" AND AVM.Treatment_Status = \"Completed Successfully\" THEN AVM.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(avmTreatment_Status,\"Completed Successfully\")"));
			Assert.assertFalse(getCode().contains("!isStringEqual"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void notIsStringEqualFunction() {
		try {
			String rulename = "AVM.Status2";
			String[] synrule = { ""
					+ "IF AVM = \"True\" AND AVM.Treatment_Status != \"Completed Successfully\" THEN AVM.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"!isStringEqual(avmTreatment_Status,\"Completed Successfully\")"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
