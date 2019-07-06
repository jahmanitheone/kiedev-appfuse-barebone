package com.synodex.qcai.antlr4.util;

import junit.framework.Assert;

import org.apache.log4j.Logger;
import org.junit.Test;

public class StripSingleQuotes {
	private final static Logger log = Logger.getLogger(StripSingleQuotes.class);

	@Test
	public void stripSingleQuote() throws Exception {
		try {
			/*
			 * Valid rule <br>
			 * "IF AL = \"True\" AND A1C.Value >= \"11.0\" AND DateDiff( \"d'', A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \"Decline\""
			 * Invalid Valid rule ---
			 * "IF AL = \"True\" AND A1C.Value >= \"11.0\" AND TEST.ID=\"a' defeefe\" AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \"Dec' line\""
			 */
			String synrule = synrule = "IF AL = \"True\" AND A1C.Value >= \"11.0\" AND DateDiff( \"d'', A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \"Dec' line'";
			log.info("1 synrule: " + synrule);
			flagSingleQuotesError(synrule);

			log.info("Done: synrule: " + synrule);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"No single quotes (') can be used to surround a value."));
		}
	}

	@Test
	public void stripSingleQuotes() throws Exception {
		try {
			// String synrule =
			// "IF AL = \"True\" AND A1C.Value >= \"11.0\" AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Dec' line\"";
			String synrule = "IF AL = 'True' AND A1C.Value >= \"11.0\" AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Dec' line\"";
			log.info("1 synrule: " + synrule);
			if (synrule.contains("'")) {
				String synruleuppercase = synrule.toUpperCase();
				int pos = synruleuppercase.indexOf("TH");
				String syrulecondition = synrule.substring(0, pos);

				log.info("2 syrulecondition: " + syrulecondition);

				flagSingleQuotesError(syrulecondition);
			}

			log.info("Done: synrule: " + synrule);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"No single quotes (') can be used to surround a value."));
		}
	}

	private void flagSingleQuotesError(String syrulecondition) throws Exception {
		String[] ifwords = syrulecondition.split("=");
		for (String ifawd : ifwords) {
			log.info(ifawd);

			String[] words = ifawd.split("AND");
			for (String awd : words) {
				awd = awd.trim();
				log.info("   -->  " + awd);
				if (awd.startsWith("'"))
					throw new Exception(
							"No single quotes (') can be used to surround a value. Use double quotes for: "
									+ awd);

				if (awd.endsWith("'"))
					throw new Exception(
							"No single quotes (') can be used to surround a value. Use double quotes: "
									+ awd);
			}

		}
	}
}
