package com.synodex.qcai.antlr4.rulegenerator;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateDataStatus extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateDataStatus.class);

	@Test
	public void generateDecline() {
		try {
			String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };
			setRule("HD.Test1", synrule);
			generateRule();
			
			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"HD\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Decline\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());			
		}
	}

	
}
