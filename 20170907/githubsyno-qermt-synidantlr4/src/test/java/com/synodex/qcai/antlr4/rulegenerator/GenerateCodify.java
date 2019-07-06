package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateCodify extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateCodify.class);

	@Test
	public void simpleCodify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void greaterThanCodify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" AND AD.Value > 11.0 THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("NumValue(adValue) > 11.0"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains("sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void stringValueCodify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" AND AD.Value = \"Headeache\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(adValue,\"Headeache\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void iCD9CMCodeCodify() {
		try {
			String rulename = "HIV.ICD9Codify1";
			String[] synrule = { "IF HIV = \"TRUE\" AND HIV.HIV_Type = \"HTLV Type 1\" THEN HIV.ICD9CMCode = \"079.51\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"HIV\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(hivHIV_Type,\"HTLV Type 1\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"079.51\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void iCD10CMCodeCodify() {
		try {
			String rulename = "HIV.ICD10Codify1";
			String[] synrule = { "IF HIV = \"TRUE\" AND HIV.HIV_Type = \"HTLV Type 1\" THEN HIV.ICD10CMCode = \"B97.33\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"HIV\")"));
			Assert.assertTrue(getCode()
					.contains(
					"isStringEqual(hivHIV_Type,\"HTLV Type 1\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"B97.33\""));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void thenInRuleConditionForCodiy10() {
		try {
			String rulename = "PAD.icd10";
			String[] synrule = { ""
					+ "IF PAD = \"TRUE\" AND PAD.Type = \"Hypothenar hammer syndrome\" THEN PAD.ICD10CMCode = \"I73.89\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"PAD\")"));
			Assert.assertTrue(getCode()
					.contains(
					"isStringEqual(padType,\"Hypothenar hammer syndrome\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"I73.89\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
