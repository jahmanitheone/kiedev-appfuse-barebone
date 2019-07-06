package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateMultipelSynidAssignment extends
		BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateMultipelSynidAssignment.class);

	@Test
	public void multipleSynidTrueAnded() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND BB = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSynidTrueOred() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" OR BB = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("||"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSynidTrueAndedAndOred() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" OR BB = \"TRUE\" AND CC = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains("||"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSynidTrueAllAnded() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND BB = \"TRUE\" AND CC = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(!getCode().contains("||"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSynidTrueAllOed() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND BB = \"TRUE\" AND CC = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(!getCode().contains("||"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleSynidSetFalse() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"FALSE\" AND BB = \"FALSE\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					" boolean bbIsFound = !isFoundSynId(sc,\"BB\""));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void multipleTrue() {
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
	public void jiraIWT50MultipleOr() {
		try {
			String rulename = "GBC.Status2";
			String[] synrule = { "IF GBC = \"True\" AND (GBC.TNM_Stage = \"T4\" OR GBC.TNM_Stage = \"N1\" OR GBC.TNM_Stage = \"N2\" OR GBC.TNM_Stage = \"M1\") THEN CARC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"String gbcTNM_Stage = sc.getValue(\"GBC.TNM_Stage\")"));

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
	public void jiraIWT50MultipleAnd() {
		try {
			String rulename = "GBC.Status2";
			String[] synrule = { "IF GBC = \"True\" AND (GBC.TNM_Stage = \"T4\" AND GBC.TNM_Stage = \"N1\" AND GBC.TNM_Stage = \"N2\" AND GBC.TNM_Stage = \"M1\") THEN CARC.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"String gbcTNM_Stage = sc.getValue(\"GBC.TNM_Stage\")"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"GBC\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"T4\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"N1\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(gbcTNM_Stage,\"N2\") &&"));
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

}
