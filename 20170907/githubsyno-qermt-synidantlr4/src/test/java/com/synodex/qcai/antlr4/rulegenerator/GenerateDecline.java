package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateDecline extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateDecline.class);

	@Test
	public void generateDeclineForSetValue() {
		try {
			String rulename = "AL.Status1";
			String[] synrule = { "IF AL = \"True\" THEN A1L.HiV_TyPeE = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains(" sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"A1L\",\"HIV_TYPEE\",\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void generateDeclineForDataStatus() {
		try {
			String rulename = "AL.Status1F";
			String[] synrule = { "IF AL = \"True\" AND A1C.Value > 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("sc.getValue(\"A1C.Value\")"));
			Assert.assertTrue(getCode().contains("sc.getValue(\"A1C.Date\")"));
			Assert.assertTrue(getCode().contains("sc.getValue(\"IDATE.Date\")"));
			Assert.assertTrue(getCode().contains("NumValue(a1cValue) > 11.0"));
			Assert.assertTrue(getCode()
					.contains(
							"long a1cDateDateDiff = dateDiffByString(a1cDate,idateDate)"));
			Assert.assertTrue(getCode().contains(
					"(a1cDateDateDiff>0 && a1cDateDateDiff <= 91)"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
