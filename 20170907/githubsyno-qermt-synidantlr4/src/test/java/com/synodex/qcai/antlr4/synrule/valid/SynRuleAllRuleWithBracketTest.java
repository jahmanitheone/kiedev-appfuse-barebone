package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleAllRuleWithBracketTest extends SynRuleHandler {
	private final static Logger log = Logger
			.getLogger(SynRuleAllRuleWithBracketTest.class);

	@Test
	public void validAssignRuleAndConditionSynidWithBrackets() {
		String[] synrule = { "IF (HD = \"True\" AND ETOH.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

}
