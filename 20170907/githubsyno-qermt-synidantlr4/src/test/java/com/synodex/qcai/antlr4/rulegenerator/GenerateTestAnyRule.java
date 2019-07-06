package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateTestAnyRule extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateTestAnyRule.class);

	@Test
	public void jiraDeclineWarning() {
		try {
			String rulename = "SUBC.Status12";
			String[] synrule = { "IF MAD = \"True\" AND MAD.Stage_Group is Null AND MAD.TNM_Stage is Null THEN MAD.DataStatus = \"Decline Warning\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}
	
}
