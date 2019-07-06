package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateComparisonOperation extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateComparisonOperation.class);

	@Test
	public void isEqualOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age = 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode()
					.contains("NumValue(ageActual_Age) = 65"));
			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isNotEqualOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age != 65 THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) != 65"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isGreaterThanOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age > 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode()
					.contains("NumValue(ageActual_Age) > 65"));
			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isGreaterThanAndEqualOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age >= 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) >= 65"));
			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isLessThanOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age < 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode()
					.contains("NumValue(ageActual_Age) < 65"));
			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isLessThanAndEqualOperation() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age <= 65 AND ADL.Activities_Lost is Null THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) <= 65"));
			Assert.assertTrue(getCode().contains("isEmpty(adlActivities_Lost)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isComparisonWithStringValue() {
		try {
			String rulename = "ADL.Status1";
			String[] synrule = new String[1];

			synrule[0] = "IF ADL = \"True\" AND AGE.Actual_Age <= 65 AND ADL.Activities_Lost = \"some text value\" THEN ADL.DataStatus = \"Decline\"";

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"ADL\")"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) <= 65"));
			Assert.assertTrue(getCode().contains(
					" isStringEqual(adlActivities_Lost,\"some text value\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
