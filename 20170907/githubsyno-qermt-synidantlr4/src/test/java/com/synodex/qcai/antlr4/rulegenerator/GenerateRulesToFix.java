package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateRulesToFix extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateRulesToFix.class);

	@Test
	@Ignore
	public void jira63DateDiffMissingLastParenAgainCCStatus2() {
		try {
			String rulename = "CC.Status2";
			String[] synrule = { "IF CC = \"True\" AND DateDiff(\"d\", CC.TNM_Stage_Date,IDATE.DataDate ) <= 3652 AND (CC.TNM_Stage = \"N1\" OR CC.TNM_Stage = \"N2\" OR CC.TNM_Stage = \"N3\" OR CC.TNM_Stage = \"M1a\" OR CC.TNM_Stage = \"M1b\" OR CC.TNM_Stage = \"M1c\") THEN CC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();
			Assert.assertTrue(getCode().contains(
					"sc.getValue(\"CC.TNM_Stage_Date\")"));
			Assert.assertTrue(getCode().contains("ccTNM_Stage"));
			Assert.assertTrue(getCode().contains(
					"sc.getValue(\"IDATE.DataDate\")"));

			Assert.assertTrue(getCode()
					.contains(
							"long ccTNM_Stage_DateDateDiff = dateDiffByString(ccTNM_Stage_Date,idateDataDate)"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"CC\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"(ccTNM_Stage_DateDateDiff>0 && ccTNM_Stage_DateDateDiff <= 3652) &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"N1\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"N2\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"N3\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"M1a\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"M1b\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(ccTNM_Stage,\"M1c\")"));

			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	@Ignore
	public void ruleCCStatus5onDev() {
		try {
			String rulename = "CC.Status5";
			String[] synrule = { "IF CC = \"True\" AND CC.TNM_Stage = \"T4a\" AND (CC.TNM_Stage = \"N1\" OR CC.TNM_Stage = \"N1c\" OR CC.TNM_Stage = \"N2\" OR CC.TNM_Stage = \"N2a\" OR CC.TNM_Stage = \"N2b\")  THEN CC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}


	@Test
	public void ruleToFixIsMostRecentALBStatus1PostPone() {
		try {
			String rulename = "ALB.Status1";
			String[] synrule = { "IF ALB = \"True\" AND ALB.ALB_Value < 3.1 AND ALB.ALB_Value_Units = \"g/dL\" AND (DateDiff(\"d\", ALB.DataDate, IDATE.DataDate) <= 365 AND isMostRecent() THEN ALB.DataStatus = \"Postpone\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleToFixIsMostRecentALBStatus2PostPone() {
		try {
			String rulename = "ALB.Status1";
			String[] synrule = { "IF ALB = \"True\" AND ALB.ALB_Value < 3.1 AND ALB.ALB_Value_Units is Null AND (DateDiff(\"d\", ALB.DataDate, IDATE.DataDate) <= 365 AND isMostRecent() THEN ALB.DataStatus = \"Postpone\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleToFixMostRecentHTNStatus1PostPone() {
		try {
			String rulename = "HTN.Status1";
			String[] synrule = { "IF HTN = “True” AND BP = “True” AND mostRecent(BP.Systolic) >= 200 AND mostRecent(BP.Reading_Type) != “Stress Test” AND DateDiff(“d”,mostRecent(BP.DataDate),IDATE.DataDate) <=91 AND isMostRecent() THEN HTN.DataStatus = “Postpone”" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}


	@Test
	public void ruleToFixCCStatus4() {
		try {
			String rulename = "CC.Status4";
			String[] synrule = { "IF CC = \"True\" AND CC.TNM_Stage = \"T4a\" AND (CC.TNM_Stage = \"N1\" OR CC.TNM_Stage = \"N1c\" OR CC.TNM_Stage = \"N2\" OR CC.TNM_Stage = \"N2a\" OR CC.TNM_Stage = \"N2b\")  THEN CC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleToFixjira63DateDiffMissingLastParenAgainCCStatus2() {
		try {
			String rulename = "CC.Status4";
			String[] synrule = { "IF CC = \"True\" AND DateDiff(\"d\", CC.TNM_Stage_Date,IDATE.DataDate ) <= 3652 AND (CC.TNM_Stage = \"N1\" OR CC.TNM_Stage = \"N2\" OR CC.TNM_Stage = \"N3\" OR CC.TNM_Stage = \"M1a\" OR CC.TNM_Stage = \"M1b\" OR CC.TNM_Stage = \"M1c\") THEN CC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}


	@Test
	public void ruleToFixCCStatus5() {
		try {
			String rulename = "CC.Status5";
			String[] synrule = { "IF CC = \"True\" AND CC.TNM_Stage = \"T3\" AND (CC.TNM_Stage = \"N1\" OR CC.TNM_Stage = \"N1c\" OR CC.TNM_Stage = \"N2\" OR CC.TNM_Stage = \"N2a\" OR CC.TNM_Stage = \"N2b\")  THEN CC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

}
