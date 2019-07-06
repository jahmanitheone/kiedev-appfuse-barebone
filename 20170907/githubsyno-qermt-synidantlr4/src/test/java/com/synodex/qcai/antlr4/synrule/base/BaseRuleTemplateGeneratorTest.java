package com.synodex.qcai.antlr4.synrule.base;

import org.apache.log4j.Logger;
import org.junit.Assert;
import com.synodex.qcai.antlr4.rule.base.SynRuleProcessor;
import com.synodex.qcai.antlr4.rule.bean.SynRule;
import com.synodex.qcai.utils.FileUtil;

public class BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(BaseRuleTemplateGeneratorTest.class);
	private String ruleName;
	private String templatefile;
	private String[] currentSynRule = {};
	private String error;
	private String code;
	private String ruleType;
	private boolean isRuleDataSetter;
	private String ruleSynId;

	protected BaseRuleTemplateGeneratorTest() {
		String path = FileUtil.getClassBasePathStriped(
				BaseRuleTemplateGeneratorTest.class, "com/");
		templatefile = path + "/droolstemplate/droolsrule.drl";
	}

	protected void setRule(String rulename, String[] synrule) {
		this.ruleName = rulename;
		this.currentSynRule = synrule;
	}

	protected void setRule(String rulename, String ruletype, String[] synrule,
			boolean issetdata) {
		this.ruleName = rulename;
		this.ruleType = ruletype;
		this.currentSynRule = synrule;
		this.isRuleDataSetter = issetdata;
	}

	protected void generateRule() throws Exception {
		log.info("--------------------------------");
		log.info("- Reading rules template from: " + templatefile);
		log.info("--------------------------------");

		if (currentSynRule.length <= 0)
			throw new Exception("No synrule[] value was defined");

		if (ruleName == null)
			throw new Exception("No rulename was defined");

		if (ruleType == null)
			log.warn("Rule type was not defined");

		SynRule synRule = null;
		if (ruleType == null)
			synRule = new SynRule(ruleName, currentSynRule[0]);
		else
			synRule = new SynRule(ruleName, ruleType, currentSynRule[0],
					isRuleDataSetter);

		// synRule.setRuleId(99);
		try {
			SynRuleHandler synrulehandler = new SynRuleHandler(synRule);
			synrulehandler.setTemplateFilePath(templatefile);

			// synrulehandler.setShowTemplateContent(true);
			synrulehandler.process();

			SynRuleProcessor synruleprocessor = synrulehandler
					.getSynRuleProcessor();

			ruleSynId = synrulehandler.getRuleSynId();
			log.info("\r\n\r\n Rule SynId(" + ruleSynId + ")\r\n\r\n");
			code = synruleprocessor.getGeneRatedDroolsRule();
			log.info("\r\n\r\n" + code + "\r\n\r\n");

			// log.info(synruleprocessor);
			if (synruleprocessor.hasErrors()) {
				error = synruleprocessor.getGeneRatedError();
				log.error("\r\n\r\n" + synruleprocessor.getGeneRatedError()
						+ "\r\n\r\n");
			}
		} catch (SynRuleHanderException e) {
			error += e.getMessage();

			log.error("Error: " + e.getMessage());
			// Assert.fail(e.getMessage());
			throw new Exception(e.getMessage());
		}

		if (ruleType != null)
			log.info("End of processing rulename: \r\n" + ruleName
					+ " - ruleType: " + ruleType + " - " + currentSynRule[0]);
		else
			log.info("End of processing rulename: \r\n" + ruleName + " - "
					+ currentSynRule[0]);
	}

	protected void validAntlrGeneratedError() {
		Assert.assertTrue(getError().contains("missing")
				|| getError().contains("expecting")
				|| getError().contains("Error"));
	}

	public String getError() {
		return error;
	}

	public String getCode() {
		return code;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public boolean isDataSetter() {
		return isRuleDataSetter;
	}

	public void setDataSetter(boolean issetdata) {
		this.isRuleDataSetter = issetdata;
	}

	public String getRuleSynId() {
		return ruleSynId;
	}

}
