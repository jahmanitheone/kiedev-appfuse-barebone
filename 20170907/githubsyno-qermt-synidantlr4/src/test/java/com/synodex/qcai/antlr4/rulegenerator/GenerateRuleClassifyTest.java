package com.synodex.qcai.antlr4.rulegenerator;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateRuleClassifyTest extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateRuleClassifyTest.class);

	@Test
	public void generateClassify() {
		try {
			String rulename = "BMI.Group1";
			String ruletype = "Classify";
			boolean isDataSetter = true;
			String[] synrule = { "IF BMI = \"True\" AND BMI.BMI_Value  > 40 AND AGE.Actual_Age >= 21 THEN BMIGroup.Group = \"Obese Class III - Very severely obese\"" };

			setRule(rulename, ruletype, synrule, isDataSetter);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"String bmiBMI_Value = sc.getValue(\"BMI.BMI_Value\");"));
			Assert.assertTrue(getCode().contains(
					"String ageActual_Age = sc.getValue(\"AGE.Actual_Age\");"));

			Assert.assertTrue(getCode().contains(
					"log.info(\"BMI.BMI_Value = \" + bmiBMI_Value);"));
			Assert.assertTrue(getCode().contains(
					"log.info(\"AGE.Actual_Age = \" + ageActual_Age);"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BMI\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(bmiBMI_Value) > 40 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) >= 21"));

			Assert.assertTrue(getCode().contains(
					"sc.setPassedRule(droolrulename);"));
			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains("sc.setClassify(true);"));
			Assert.assertTrue(getCode()
					.contains("sc.setDataPointSetter(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setSynIdDatafieldProperty(\"BMIGROUP.GROUP\");"));
			Assert.assertTrue(getCode()
					.contains(
							"sc.setValue(\"BMIGROUP\",\"GROUP\",\"Obese Class III - Very severely obese\");"));
			Assert.assertTrue(getCode().contains("if(sc.isDataPointSetter())"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	//

	@Test
	public void generateClassifyUsingDotBMI() {
		try {
			String rulename = "BMI.Group1";
			String ruletype = "Classify";
			boolean isDataSetter = true;
			String[] synrule = { "IF BMI = \"True\" AND BMI.BMI_Value  >= 35 AND BMI.BMI_Value  <= 40 and AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Obese Class II - Severely obese\"" };

			// setRule(rulename, synrule);
			setRule(rulename, ruletype, synrule, isDataSetter);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"String bmiBMI_Value = sc.getValue(\"BMI.BMI_Value\");"));
			Assert.assertTrue(getCode().contains(
					"String ageActual_Age = sc.getValue(\"AGE.Actual_Age\");"));

			Assert.assertTrue(getCode().contains(
					"log.info(\"BMI.BMI_Value = \" + bmiBMI_Value);"));
			Assert.assertTrue(getCode().contains(
					"log.info(\"AGE.Actual_Age = \" + ageActual_Age);"));

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"BMI\") &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(bmiBMI_Value) >= 35 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(bmiBMI_Value) <= 40 &&"));
			Assert.assertTrue(getCode().contains(
					"NumValue(ageActual_Age) >= 21"));

			Assert.assertTrue(getCode().contains(
					"sc.setPassedRule(droolrulename);"));
			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains("sc.setClassify(true);"));
			Assert.assertTrue(getCode()
					.contains("sc.setDataPointSetter(true);"));
			Assert.assertTrue(getCode()
					.contains(
							"sc.setValue(\"BMI\",\"BMI_GROUP\",\"Obese Class II - Severely obese\");"));
			Assert.assertTrue(getCode().contains("if(sc.isDataPointSetter())"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void testDEVClassifyRules() {
		int j = 0;

		try {
			String[] classifyfules = {
					"IF BMI = \"True\" AND BMI.BMI_Value  > 40 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Obese Class III - Very severely obese\"",
					"IF BMI = \"True\" AND BMI.BMI_Value  >= 35 AND BMI.BMI_Value  <= 40 and AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Obese Class II - Severely obese\"",
					"IF BMI = \"True\" AND BMI.BMI_Value  >= 30 AND BMI.BMI_Value  < 35 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Obese Class I - Moderately obese\"",
					"IF BMI = \"True\" AND BMI.BMI_Value  >= 25 AND BMI.BMI_Value  <= 30 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Obese Class I - Overweight\"",
					"IF  BMI = \"True\" AND BMI.BMI_Value  >= 18.5 AND BMI.BMI_Value  < 25 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Normal\"",
					"IF BMI = \"True\"  AND BMI.BMI_Value  >= 16 AND BMI.BMI_Value  < 18.5 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \"Underweight\"",
					"IF BMI = \"True\" AND BMI.BMI_Value  >= 15 AND BMI.BMI_Value  < 16 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \" Severely Underweight\"",
					"IF BMI = \"True\" AND BMI.BMI_Value < 15 AND AGE.Actual_Age >= 21 THEN BMI.BMI_Group = \" Very Severely Underweight\"" };
			// log.info("Classify rules = " + majorrules.length);
			Assert.assertEquals(8, classifyfules.length);

			for (String rule : classifyfules) {
				String rulename = "BMI.testrule" + j++;
				String ruletype = "Classify";
				boolean isDataSetter = true;
				String[] synrule = new String[1];
				synrule[0] = rule;

				setRule(rulename, ruletype, synrule, isDataSetter);

				generateRule();

				Assert.assertTrue(getCode()
						.contains(
								"String bmiBMI_Value = sc.getValue(\"BMI.BMI_Value\");"));
				Assert.assertTrue(getCode()
						.contains(
								"String ageActual_Age = sc.getValue(\"AGE.Actual_Age\");"));
				Assert.assertTrue(getCode().contains(
						"isStringEqual(sc.getSynId(), \"BMI\") &&"));

				Assert.assertTrue(getCode().contains(
						"sc.setPassedRule(droolrulename);"));
				Assert.assertTrue(getCode().contains("sc.setPass(true);"));
				Assert.assertTrue(getCode().contains("sc.setClassify(true);"));
				Assert.assertTrue(getCode().contains(
						"sc.setDataPointSetter(true);"));
				Assert.assertTrue(getCode().contains(
						"sc.setValue(\"BMI\",\"BMI_GROUP\""));
				Assert.assertTrue(getCode().contains(
						"if(sc.isDataPointSetter())"));
			}
			log.info(".");
			log.info("Ran " + j + " rules");
			Assert.assertEquals(8, j);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail("Failed at rule " + j + ": " + e.getMessage());
		}
	}

}