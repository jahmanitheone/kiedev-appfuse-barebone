package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateSynIdWithSpecialTextValue extends
		BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateSynIdWithSpecialTextValue.class);

	@Test
	public void spacedTextWithAndValue() {
		try {
			String rulename = "ANAC.Status1";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Both Anus and Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" THEN ANAC.ICD9CMCode = \"230.9\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ANAC\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacOther_Factors,\"Both Anus and Anal Canal\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Carcinoma in situ\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	/**
	 * Jira IWT-34 Values with 4 space delimited terms are failed with message
	 * "Error walking tree: Index: 3, Size: 3"
	 */
	@Test
	public void spaceTextWithAndValue() {
		try {
			String rulename = "ANAC.ICD9Codify15";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Both Anus And Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" THEN ANAC.ICD9CMCode = \"230.9\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ANAC\")"));

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacOther_Factors,\"Both Anus And Anal Canal\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Carcinoma in situ\")"));
			Assert.assertTrue(getCode().contains(
					" sc.setCodify(\"ICD9CMCODE\",\"230.9\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	/**
	 * Jira IWT-34 Values with 4 space delimited terms are failed with message
	 * "Error walking tree: Index: 3, Size: 3"
	 */
	@Test
	public void spaceTextWithOrValue() {
		try {
			String rulename = "ANAC.ICD9Codify15";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Both Anus Or Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" THEN ANAC.ICD9CMCode = \"230.9\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacOther_Factors,\"Both Anus Or Anal Canal\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Carcinoma in situ\")"));
			Assert.assertTrue(getCode().contains(
					" sc.setCodify(\"ICD9CMCODE\",\"230.9\")"));
		} catch (Exception e) {
		}
	}

	/**
	 * Jira IWT-34 Values with 4 space delimited terms are failed with message
	 * "Error walking tree: Index: 3, Size: 3"
	 */
	@Test
	public void spaceTextWithMultipleAndValue() {
		try {
			String rulename = "ANAC.ICD9Codify15";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Both Anus And Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" AND ANAC.ManyAnd = \"Both Anus And Anal Canal And More Anal Canal And Mor Anus\"  THEN ANAC.ICD9CMCode = \"230.9\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacOther_Factors,\"Both Anus And Anal Canal\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Carcinoma in situ\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacManyAnd,\"Both Anus And Anal Canal And More Anal Canal And Mor Anus\")"));
			Assert.assertTrue(getCode().contains(
					" sc.setCodify(\"ICD9CMCODE\",\"230.9\")"));
		} catch (Exception e) {
		}
	}

	/**
	 * Jira IWT-34 Values with 4 space delimited terms are failed with message
	 * "Error walking tree: Index: 3, Size: 3"
	 */
	@Test
	public void spaceTextWithMultipleAndOrValue() {
		try {
			String rulename = "ANAC.ICD9Codify15";
			String[] synrule = { "IF ANAC = \"TRUE\" OR ANAC.Other_Factors = \"Both Anus or Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" OR ANAC.ManyAnd = \"Both Anus or Anal Canal And More Anal Canal or More Anus\"  THEN ANAC.ICD9CMCode = \"230.9\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacOther_Factors,\"Both Anus or Anal Canal\") && "));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Carcinoma in situ\") ||"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(anacManyAnd,\"Both Anus or Anal Canal And More Anal Canal or More Anus\")"));
		} catch (Exception e) {
		}
	}

}
