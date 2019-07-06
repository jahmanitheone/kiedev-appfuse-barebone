package com.synodex.qcai.antlr4.synrule.valid;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.SynRuleHandler;

public class SynRuleValidCoditionWithBracketTest extends SynRuleHandler {
	private final static Logger log = Logger
			.getLogger(SynRuleValidCoditionWithBracketTest.class);

	@Test
	public void validConditionSynidWithBrackets() {
		String[] synrule = { "IF HD = \"True\" AND ( ETOH.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validTwoOrConditionSynidWithBrackets() {
		String[] synrule = { "IF HD = \"True\" AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validMultipleOrConditionSynidWithBrackets() {
		String[] synrule = { "IF HD = \"True\" AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validMultipleAndConditionSynidWithBrackets() {
		String[] synrule = { "IF HD = \"True\" AND ( ETOH.Status = \"Current Treatment\" AND X2.Status = \"Current Treatment\" AND X2.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

	@Test
	public void validMultipleAndOrConditionSynidWithBrackets() {
		String[] synrule = { "IF HD = \"True\" AND ( ETOH.Status = \"Current Treatment\" OR X2.Status = \"Current Treatment\" and X3.Status = \"Current Treatment\" OR X4.Status = \"Current Treatment\"  AND X5.Status = \"Current Treatment\" ) THEN HD.DataStatus = \"Decline\"" };
		getSynRuleFromString(synrule);
		if (errorHandler.hasErrors()) {
			log.error(errorHandler.getErrorMessages());
			log.error(errorMesages.toString());
			Assert.fail(errorMesages.toString());
		}
	}

}
