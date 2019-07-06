package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateCodifyRGACODE extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateCodifyRGACODE.class);

	@Test
	public void simpleRGACODE() {
		try {
			String rulename = "ANAC.rgacodify1";
			String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Anus\" AND ANAC.Cancer_Type = \"Paget's Disease\" THEN ANAC.RGACODE = \"ANA.0\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
