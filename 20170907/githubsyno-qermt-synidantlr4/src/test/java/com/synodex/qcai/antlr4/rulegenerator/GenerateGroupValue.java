package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateGroupValue extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateGroupValue.class);
	@Test
	public void groupingRule() {
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

			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"BMIGROUP\",\"GROUP\",\"Obese Class III - Very severely obese\")"));
						
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
