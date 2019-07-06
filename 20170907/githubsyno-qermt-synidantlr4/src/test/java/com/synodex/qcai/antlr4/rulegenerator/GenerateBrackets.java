package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateBrackets extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateBrackets.class);

	@Test
	public void roundBracketsInValue() {
		try {
			String rulename = "AVM.ICD9Codify2";
			String[] synrule = { "IF AVM = \"TRUE\" AND AVM.AVM_Type = \"Cavernous angioma or hemangioma (cavernoma)\" THEN AVM.ICD9CMCode = \"228.00\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(avmAVM_Type,\"Cavernous angioma or hemangioma (cavernoma)\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"228.00\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void squareBracketsInValue() {
		try {
			String rulename = "AVM.ICD9Codify2";
			String[] synrule = { "IF AVM = \"TRUE\" AND AVM.AVM_Type = \"Cavernous angioma or hemangioma [cavernoma]\" THEN AVM.ICD9CMCode = \"228.00\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(avmAVM_Type,\"Cavernous angioma or hemangioma [cavernoma]\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"228.00\")"));
			Assert.assertTrue(getCode().contains("sc.setCodify"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void curlyBracketsInValue() {
		try {
			String rulename = "AVM.ICD9Codify2";
			String[] synrule = { "IF AVM = \"TRUE\" AND AVM.AVM_Type = \"Cavernous angioma or hemangioma {cavernoma}\" THEN AVM.ICD9CMCode = \"228.00\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(avmAVM_Type,\"Cavernous angioma or hemangioma {cavernoma}\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD9CMCODE\",\"228.00\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ConditionIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF AVM = \"True\" AND (AVM.Treatment_Type is Null OR AVM.Treatment_Type = \"Unknown\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\") &&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) ||"));
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
	public void allAssignRuleAndConditionIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF (AVM = \"True\" AND AVM.Treatment_Type is Null OR AVM.Treatment_Type = \"Unknown\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) ||"));
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
	public void allAssignRuleAndConditionWithAndSynIdIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF (AVM = \"True\" AND AVM.Treatment_Type is Null AND AVM.Treatment_Type = \"Unknown\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(avmTreatment_Type,\"Unknown\")"));
			Assert.assertTrue(getCode().contains("sc.setDeclineWarning(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline Warning\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void allAssignRuleAndConditionWithMultipleAndSynIdIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF (AVM = \"True\" AND AVM.Treatment_Type is Null AND AVM.Treatment_Type = \"Unknown\" AND XX2.Treatment_Type = \"Unknown2\" AND XX3.Treatment_Type = \"Unknown3\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) &&"));
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
	public void allAssignRuleAndConditionWithMultipleOrSynIdIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF (AVM = \"True\" AND AVM.Treatment_Type is Null OR AVM.Treatment_Type = \"Unknown\" OR XX2.Treatment_Type = \"Unknown2\" OR XX3.Treatment_Type = \"Unknown3\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) ||"));
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
	public void allAssignRuleAndConditionWithMultipleMixedAndOrSynIdIsBracketed() {
		try {
			String rulename = "AVM.Status3";
			String[] synrule = { "IF (AVM = \"True\" AND AVM.Treatment_Type is Null OR AVM.Treatment_Type = \"Unknown\" OR XX2.Treatment_Type = \"Unknown2\" AND XX3.Treatment_Type = \"Unknown3\") THEN AVM.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AVM\")"));
			Assert.assertTrue(getCode().contains("&&"));
			Assert.assertTrue(getCode().contains(
					"isEmpty(avmTreatment_Type) ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(avmTreatment_Type,\"Unknown\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(xx2Treatment_Type,\"Unknown2\") &&"));
			Assert.assertTrue(getCode().contains(" sc.setDeclineWarning(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline Warning\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
