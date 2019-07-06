package com.synodex.qcai.antlr4.util;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class RuleCrazyErrorHandlingTest {
	private final static Logger log = Logger
			.getLogger(RuleCrazyErrorHandlingTest.class);

	@Test
	public void errorInBeginningQuotes() throws Exception {
		try {
			String synrule = "IF AL = \'True\"";
			log.info("synrule: " + synrule);
			
			RuleCrazyErrorHandling.flagSingleQuotesError(synrule);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().toString().contains("No single quotes (')"));
		}
	}

	@Test
	public void errorInEndingQuotes() throws Exception {
		try {
			String synrule = "IF AL = \"True'";
			log.info("synrule: " + synrule);
			
			RuleCrazyErrorHandling.flagSingleQuotesError(synrule);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().toString().contains("No single quotes (')"));
		}
	}

	@Test
	public void noErrorInMiddleQuotes() throws Exception {
		try {
			String synrule = "IF AL = \"Infor with single quote ' in middle\"";
			log.info("synrule: " + synrule);
			
			RuleCrazyErrorHandling.flagSingleQuotesError(synrule);
		} catch (Exception e) {
			log.error(e.getMessage());
			//Assert.assertTrue(e.getMessage().toString().contains("No single quotes (')"));
		}
	}

}
