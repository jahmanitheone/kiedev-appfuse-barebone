package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateMissingQuotes extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateMissingQuotes.class);

	@Test
	public void missingQuotesOk() {
		try {
			String rulename = "BARE.someattr1";
			String[] synrule = { "IF BARE = \"TRUE\" AND BARE.BARE_Location = \"Rich (Test)\" THEN BARE.ICD9CMCode = \"530.85\"" };

			setRule(rulename, synrule);
			generateRule();
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void missingBegQuotes() {
		try {
			String rulename = "BARE.someattr1";
			String[] synrule = { "IF BARE = \"TRUE\" AND BARE.BARE_Location = Rich (Test)\" THEN BARE.ICD9CMCode = \"530.85\"" };

			setRule(rulename, synrule);
			generateRule();			

			validAntlrGeneratedError();			
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void missingendQuotes() {
		try {
			String rulename = "BARE.someattr1";
			String[] synrule = { "IF BARE = \"TRUE\" AND BARE.BARE_Location = \"Rich (Test) THEN BARE.ICD9CMCode = \"530.85\"" };

			setRule(rulename, synrule);
			generateRule();			

			validAntlrGeneratedError();			
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
