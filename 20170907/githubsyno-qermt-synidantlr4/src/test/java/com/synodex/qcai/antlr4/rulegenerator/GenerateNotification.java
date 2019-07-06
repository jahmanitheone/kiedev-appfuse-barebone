package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateNotification extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateNotification.class);

	@Test
	public void generateNofication() {
		try {
			String rulename = "CLL.Status3";
			String[] synrule = { "IF CLL = \"True\" AND CLL.Age_at_Onset >= 61 THEN CLL.DataStatus = \"Notification\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains("sc.setPass"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
