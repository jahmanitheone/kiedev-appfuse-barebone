package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleValidAssignAndCoditionWithBracketTest extends SynRuleHandler {
	private final static Logger log = Logger
			.getLogger(SynRuleValidAssignAndCoditionWithBracketTest.class);

	@Test
	public void validAssignRuleAndConditionSynidWithBrackets() {
		String[] synrule = { "IF (HD = \"True\") AND ( ETOH.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validAssignRuleAndTwoOrConditionSynidWithBrackets() {
		String[] synrule = { "IF (HD = \"True\") AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validAssignRuleAndMultipleOrConditionSynidWithBrackets() {
		String[] synrule = { "IF (HD = \"True\") AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validAssignRuleAndMultipleAndConditionSynidWithBrackets() {
		String[] synrule = { "IF (HD = \"True\") AND ( ETOH.Status = \"Current Treatment\" AND X2.Status = \"Current Treatment\" AND X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validAssignRuleAndMultipleAndOrConditionSynidWithBrackets() {
		String[] synrule = { "IF ( HD = \"True\") AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" and X3.Status = \"Current Treatment\" OR X4.Status = \"Current Treatment\"  AND X5.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

}