package com.synodex.qcai.antlr4.util;

import org.apache.log4j.Logger;

/**
 * Some errors are though and right now cracy to get Antlr to catch them. This
 * utility tries to capture all the processing errors before Antlr get's it.
 * 
 * @author pchauvet
 * 
 */
public class RuleCrazyErrorHandling {
	private final static Logger log = Logger
			.getLogger(RuleCrazyErrorHandling.class);

	public static void flagSingleQuotesError(String syrulecondition)
			throws Exception {
		String[] ifwords = syrulecondition.split("=");
		for (String ifawd : ifwords) {
			log.debug(ifawd);

			String[] words = ifawd.split("AND");
			for (String awd : words) {
				awd = awd.trim();
				log.debug("   -->  " + awd);
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
