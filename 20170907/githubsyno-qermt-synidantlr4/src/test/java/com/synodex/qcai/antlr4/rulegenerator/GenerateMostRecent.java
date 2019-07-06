package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateMostRecent extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateMostRecent.class);

	@Test
	public void mostRecentHTNStatus1PostPone() {
		try {
			String rulename = "HTN.Status1";
			String[] synrule = { "IF HTN = \"True\" AND BP = \"True\" AND mostRecent(BP.Systolic) >= 200 AND mostRecent(BP.Reading_Type) != \"Stress Test\" AND dateDiff(\"d\",mostRecent(BP.DataDate),IDATE.DataDate) <=91 AND isMostRecent() THEN HTN.DataStatus = \"Postpone\"" };

			setRule(rulename, synrule);
			generateRule();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

}
