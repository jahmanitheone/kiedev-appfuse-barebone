package com.synodex.qcai.antlr4.rulegenerator;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateDateDiff extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateDateDiff.class);

	@Test
	public void generateDateDiff() {
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
							"long a1cDateDateDiff = dateDiffByString(a1cDate,idateDate);"));
			Assert.assertTrue(getCode().contains(
					"(a1cDateDateDiff>0 && a1cDateDateDiff <= 91)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\");"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
