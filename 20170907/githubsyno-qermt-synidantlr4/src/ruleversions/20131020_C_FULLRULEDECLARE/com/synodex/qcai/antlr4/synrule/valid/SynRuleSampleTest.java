package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseSynRule;
import com.synodex.qcai.antlr4.synrule.base.DoughsRules02;

public class SynRuleSampleTest extends BaseSynRule {
	private final static Logger log = Logger.getLogger(SynRuleSampleTest.class);

	public SynRuleSampleTest() {
		setShowRuleNames(false);
	}

	@Test
	public void test() {
		// String[] synrule = { "DateDiff( \"d\", A1C.Date, IDATE.Date)" };
		// String[] synrule = { "AAC" };
		// String[] synrule = {
		// "IF AL = \"True\" THEN A1L.DataStatus = 'Decline\"" };
		String[] synrule = { "IF AL = \"True\" AND A1C.Value > 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = 'Decline\"" };
		//String[] synrule = { "IF AL = \"True\" THEN A1L.DataStatus = 'Decline\"" };
		//String[] synrule = { "IF AL = \"True\" AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = 'Decline\"" };
		//String[] synrule = { "IF AL = \"True\" AND A1C.Value > 11.0 THEN A1L.DataStatus = 'Decline\"" };
		log.info("\r\nrule: " + synrule[0]);

		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors())
			Assert.fail(errorMesages.toString());
	}

}
