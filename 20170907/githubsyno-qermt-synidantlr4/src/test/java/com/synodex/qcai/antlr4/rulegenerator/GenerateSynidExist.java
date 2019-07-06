package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateSynidExist extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateSynidExist.class);

	@Test
	public void synIdExistDecline() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));

			// Assert.assertTrue(getCode().contains("sc.setCodify"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void synIdExistCodify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"AL\")"));
			Assert.assertTrue(getCode().contains("sc.setPass(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
			Assert.assertTrue(getCode().contains("sc.setCodify"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
