package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateSingleQuotes extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateSingleQuotes.class);

	@Test
	public void singleQuotesFix() {
		try {
			String rulename = "ANAC.ICD10Codify4";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Anus\" AND ANAC.Cancer_Type = \"Paget's Disease\" THEN ANAC.ICD10CMCode = \"C21.0\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"anacOther_Factors,\"Anus\")"));
			Assert.assertTrue(getCode()
					.contains(
					"isStringEqual(anacCancer_Type,\"Paget''s Disease\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C21.0\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void singleQuotesInCondition() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND LL.Condition_Status = \"Not' Achieved\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llCondition_Status,\"Not'' Achieved\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void singleQuotesInThenAssignment() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" THEN LL.ICD10CMCode = \"C91.50 ' AFTER SINGLE QUOTES\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"sc.setCodify(\"ICD10CMCODE\",\"C91.50 '' AFTER SINGLE QUOTES\");"));
		} catch (Exception e) {
		}
	}

	@Test
	public void multipleSingleQuotes() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND LL.Condition_Status = \"Not' Achieved ' Remission\" THEN LL.ICD10CMCode = \"C91.50 ' AFTER SINGLE QUOTES'\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llCondition_Status,\"Not'' Achieved '' Remission\")"));
			Assert.assertTrue(getCode()
					.contains(
							"sc.setCodify(\"ICD10CMCODE\",\"C91.50 '' AFTER SINGLE QUOTES''\");"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuoteAtRuleDelclareBeginnning() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = 'True\" AND A1C.Value >= 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuoteAtRuleDelclareEnd() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True' AND A1C.Value >= 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuoteAtDateDiffBeginning() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND DateDiff( 'd\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuoteAtDateDiffEnd() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND DateDiff( \"d\', A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuotesAtSynIdBegValue() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND LL.Condition_Status = 'Not Achieved Remission\" THEN A1L.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuotesAtSynIdEndValue() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND LL.Condition_Status = \"Not Achieved Remission\' THEN A1L.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuotesAtThenBegAssignValue() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND LL.Condition_Status = \"Not Achieved Remission\" THEN A1L.DataStatus = 'Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			validAntlrGeneratedError();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void inValidSingleQuotesAtThenEndAssignValue() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND LL.Condition_Status = \"Not Achieved Remission\" THEN A1L.DataStatus = \"Decline'" };

			setRule(rulename, synrule);
			generateRule();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void allValidNoQuotes() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value >= 11.0 AND LL.Condition_Status = \"Not Achieved Remission\" THEN A1L.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
