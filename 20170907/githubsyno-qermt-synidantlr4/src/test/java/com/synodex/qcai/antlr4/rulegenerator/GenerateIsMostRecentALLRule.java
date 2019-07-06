package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateIsMostRecentALLRule extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateIsMostRecentALLRule.class);

	@Test
	public void isMostRecentWithSetValue() {
		try {
			String rulename = "ALL.Status1";
			String[] synrule = { "IF ALL = \"True\" AND isMostRecent() THEN ALL.HiV_TyPeE = \"ABCD\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ALL\") &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains("sc.setDataStatus(\"Pass\");"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"ALL\",\"HIV_TYPEE\",\"ABCD\");"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isMostRecentWithDecline() {
		try {
			String rulename = "ALL.Status2";
			String[] synrule = { "IF ALL = \"True\" AND isMostRecent() THEN ALL.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ALL\") &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\");"));
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
			String rulename = "ALL.Status3";
			String[] synrule = { "IF ALL = \"True\" OR isMostRecent() THEN ALL.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ALL\") ||"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains("sc.setDataStatus(\"Pass\");"));
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
			String rulename = "ALL.Status4";
			String[] synrule = { "IF ALL = \"True\" AND ALL.Value > 11.0 AND isMostRecent() THEN ALL.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ALL\") &&"));
			Assert.assertTrue(getCode()
					.contains("NumValue(allValue) > 11.0 &&"));
			Assert.assertTrue(getCode().contains("isMostRecent()"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains("sc.setDataStatus(\"Pass\");"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void testDEVMostRecentRules() {
		try {
			String[] groupingrules = {
					"IF LIPO2 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value > 1500 AND IsMostRecent() THEN LIPO2.DataStatus = \"Decline Warning\"",
					"IF LIPO2 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value <= 500 AND IsMostRecent() THEN LIPO2.DataStatus = \"Minor\"",
					"IF LIPO2 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value > 500 AND TGLY.TGLY_Value <= 1500  AND IsMostRecent() THEN LIPO2.DataStatus = \"Major\"",
					"IF LIPO3 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value > 500 AND TGLY.TGLY_Value <= 1500  AND IsMostRecent() THEN LIPO3.DataStatus = \"Major\"" };

			log.info("Grouping rules" + groupingrules.length);
			Assert.assertEquals(4, groupingrules.length);

			int j = 0;
			for (String rule : groupingrules) {
				String rulename = "LIPO.rule" + j;
				String ruletype = "DataStatus";
				boolean isDataSetter = true;
				String[] synrule = new String[1];
				synrule[0] = rule;

				setRule(rulename, ruletype, synrule, isDataSetter);

				generateRule();

				Assert.assertTrue(getCode().contains(
						"boolean tglyIsFound = isFoundSynId(sc,\"TGLY\");"));
				Assert.assertTrue(getCode().contains(
						"String tglyTGLY_Value = sc.getValue(\"TGLY.TGLY_Value\");"));
				Assert.assertTrue(getCode().contains(
						"log.info(\"SynId (TGLY) isFound = \" + tglyIsFound);"));
				Assert.assertTrue(getCode().contains(
						"log.info(\"TGLY.TGLY_Value = \" + tglyTGLY_Value)"));
				
				Assert.assertTrue(getCode().contains(
						"isStringEqual(sc.getSynId(), \"LIPO\") &&"));
				Assert.assertTrue(getCode().contains(
						"tglyIsFound &&"));
				Assert.assertTrue(getCode().contains(
						"NumValue(tglyTGLY_Value)"));
				Assert.assertTrue(getCode().contains(
						"isMostRecent(sc)"));
				Assert.assertTrue(getCode().contains(
						"sc.setDataStatus"));
				
				if(j==1) break;
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}
	

	@Test
	public void isMostRecentIndividual() {
		try {
			String rulename = "ALL.Status7";
			String[] synrule = { "IF LIPO2 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value <= 500 AND IsMostRecent()  THEN LIPO2.DataStatus = \"Minor\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
