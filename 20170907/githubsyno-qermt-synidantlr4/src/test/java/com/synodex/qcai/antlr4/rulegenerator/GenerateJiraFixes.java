package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;

import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateJiraFixes extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateJiraFixes.class);

	@Test
	public void jiraIWT31SingleQuotesFix() {
		try {
			String rulename = "ANAC.ICD10Codify4";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Anus\" AND ANAC.Cancer_Type = \"Paget's Disease\" THEN ANAC.ICD10CMCode = \"C21.0\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacOther_Factors,\"Anus\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(anacCancer_Type,\"Paget''s Disease\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C21.0\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jiraIWT37ConditionIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF AVM = \"True\" AND (AVM.Treatment_Type is Null OR AVM.Treatment_Type = \"Unknown\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains("isEmpty(avmTreatment_Type)"));
			Assert.assertTrue(getCode().contains("||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(avmTreatment_Type,\"Unknown\")"));
			Assert.assertTrue(getCode().contains(" sc.setDeclineWarning(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline Warning\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jiraIWT38MissingQuotesOk() {
		try {
			String rulename = "BARE.someattr1";
			String[] synrule = { "IF BARE = \"TRUE\" AND BARE.BARE_Location = \"Rich (Test)\" THEN BARE.ICD9CMCode = \"530.85\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BARE\") &&"));
			Assert.assertTrue(getCode().contains(
					"&& \r\n" + Constants.SPACE_EIGHT + " ("));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(bareBARE_Location,\"Rich (Test)\")"));
			Assert.assertTrue(getCode().contains(
					"\r\n" + Constants.SPACE_EIGHT + " )"));

			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"530.85\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jiraIWT42MultipleTrue() {
		try {
			String rulename = "BPD.Status2";
			String[] synrule = { "IF BPD = \"True\" AND SA = \"True\" THEN BPD.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BPD\") &&"));
			Assert.assertTrue(getCode().contains(
					" boolean saIsFound = isFoundSynId(sc,\"SA\""));
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains("saIsFound\r\n"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jiraIWT43GroupingRule() {
		try {
			String rulename = "BMI.Group1";
			String[] synrule = { "IF BMI = \"TRUE\" AND BMI.BMI_Value > 40 AND AGE.Actual_Age >= 21 THEN BMIGroup.Group = \"Obese Class III - Very severely obese\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BMI\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(bmiBMI_Value) > 40 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) >= 21"));

			Assert.assertTrue(getCode()
					.contains(
							"sc.setValue(\"BMIGROUP\",\"GROUP\",\"Obese Class III - Very severely obese\")"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jiraIWT50MultipleOr() {
		try {
			String rulename = "GBC.Status2";
			String[] synrule = { "IF GBC = \"True\" AND (GBC.TNM_Stage = \"T4\" OR GBC.TNM_Stage = \"N1\" OR GBC.TNM_Stage = \"N2\" OR GBC.TNM_Stage = \"M1\") THEN CARC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"String gbcTNM_Stage = sc.getValue(\"GBC.TNM_Stage\""));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"GBC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"T4\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"N1\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"N2\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"M1\")"));

			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	// Jira 45 MetaData with Values that contain the root "then" cause Qermit to
	// hang
	public void jira45ThenInRuleConditionForCodiy10() {
		try {
			String rulename = "PAD.icd10";
			String[] synrule = { ""
					+ "IF PAD = \"TRUE\" AND PAD.Type = \"Hypothenar hammer syndrome\" THEN PAD.ICD10CMCode = \"I73.89\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"PAD\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(padType,\"Hypothenar hammer syndrome\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"I73.89\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira45ThenInRuleConditionForCodiy9() {
		try {
			String rulename = "PAD.icd9";
			String[] synrule = { ""
					+ "IF PAD = \"TRUE\" AND PAD.Type = \"Hypothenar hammer syndrome\" THEN PAD.ICD9CMCode = \"443.89\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"PAD\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(padType,\"Hypothenar hammer syndrome\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"443.89\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira44NumberValueInCondition() {
		try {
			String rulename = "PAD.icd9";
			String[] synrule = { ""
					+ "IF PAD = \"TRUE\" AND PAD.Type = \"Hypothenar hammer syndrome\" THEN PAD.ICD9CMCode = \"443.89\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"PAD\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(padType,\"Hypothenar hammer syndrome\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"443.89\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira44RuleWithSingleNumericCondition() {
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
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira49HyphensShouldBeFlagedInvalid() {
		try {
			String rulename = "BMT.Status1";
			String[] synrule = { ""
					+ "IF BMT = \"True\" AND BMT.Anti-rejection_Therapy = \"Ongoing anti-rejection therapy\" THEN BMT.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BMT\") &&"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(bmtAnti-rejection_Therapy,\"Ongoing anti-rejection therapy\")"));
			Assert.assertTrue(getCode().contains(" sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira52AddParensAroundRule() {
		try {
			String rulename = "BMT.Status1";
			String[] synrule = { ""
					+ "IF BPD = \"True\" AND (ALCA = \"True\" OR SUB = \"True\") THEN BPD.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"boolean alcaIsFound = isFoundSynId(sc,\"ALCA\")"));
			Assert.assertTrue(getCode().contains(
					"boolean subIsFound = isFoundSynId(sc,\"SUB\")"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BMT\") &&"));
			Assert.assertTrue(getCode().contains(
					"&& \r\n" + Constants.SPACE_EIGHT + " ("));

			Assert.assertTrue(getCode().contains("alcaIsFound ||"));
			Assert.assertTrue(getCode().contains("subIsFound"));

			Assert.assertTrue(getCode().contains(
					"\r\n" + Constants.SPACE_EIGHT + " )"));

			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira58IsNullVarIsDuplicated() {
		try {
			String rulename = "ANAC.Status2";
			String[] synrule = { ""
					+ "IF ANAC = \"True\" AND ANAC.Stage_Group is Null AND ANAC.TNM_Group is Null THEN ANAC.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"String anacStage_Group = sc.getValue(\"ANAC.Stage_Group\")"));
			Assert.assertTrue(getCode().contains(
					"String anacTNM_Group = sc.getValue(\"ANAC.TNM_Group\");"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ANAC\") &&"));
			Assert.assertTrue(getCode().contains("isEmpty(anacStage_Group) &&"));
			Assert.assertTrue(getCode().contains("isEmpty(anacTNM_Group"));

			Assert.assertTrue(getCode().contains("sc.setDeclineWarning(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline Warning\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void jira63DateDiffMissingLastParen() {
		try {
			String rulename = "PSC.Status3";
			String[] synrule = { ""
					+ "IF PSC = \"True\" AND DateDiff(\"d\", PSC.DataDate, IDATE.DataDate) <= 366 THEN PSC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"PSC\")"));
			Assert.assertTrue(getCode().contains(
					"sc.getValue(\"PSC.DataDate\")"));
			Assert.assertTrue(getCode().contains(
					"sc.getValue(\"IDATE.DataDate\")"));
			Assert.assertTrue(getCode()
					.contains(
							"long pscDataDateDateDiff = dateDiffByString(pscDataDate,idateDataDate)"));
			Assert.assertTrue(getCode().contains(
					"(pscDataDateDateDiff>0 && pscDataDateDateDiff <= 366)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\");"));

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}


}
