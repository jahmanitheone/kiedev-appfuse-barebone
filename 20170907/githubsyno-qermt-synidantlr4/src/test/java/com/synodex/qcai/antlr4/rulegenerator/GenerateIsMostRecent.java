package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateIsMostRecent extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateIsMostRecent.class);

	@Test
	public void isMostRecentWithSetValue() {
		try {
			String rulename = "AL.Status1";
			String[] synrule = { "IF AL = \"True\" AND isMostRecent() THEN A1L.HiV_TyPeE = \"ABCD\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\") &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"A1L\",\"HIV_TYPEE\",\"ABCD\");"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isMostRecentWithDecline() {
		try {
			String rulename = "AL.Status1";
			String[] synrule = { "IF AL = \"True\" AND isMostRecent() THEN AL.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\") &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\");"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isMostRecentORedWithCodity() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" OR isMostRecent() THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\") ||"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isMostRecentWithGreaterThanCodify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" AND AD.Value > 11.0 AND isMostRecent() THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\") &&"));
			Assert.assertTrue(getCode().contains("NumValue(adValue) > 11.0 &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
