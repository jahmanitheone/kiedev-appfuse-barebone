package com.synodex.qcai.antlr4.synrule.base;

import org.antlr.v4.runtime.ANTLRInputStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTree;
import org.antlr.v4.runtime.tree.ParseTreeWalker;
import org.apache.log4j.Logger;
import com.synodex.qcai.antlr4.common.handler.ErrorHandler;
import com.synodex.qcai.antlr4.common.handler.RuleHandler;
import com.synodex.qcai.antlr4.rule.base.SynRuleProcessor;
import com.synodex.qcai.antlr4.rule.base.Template;
import com.synodex.qcai.antlr4.rule.bean.SynRule;
import com.synodex.qcai.antlr4.rule.templates.DroolsRuleTemplate;
import com.synodex.qcai.antlr4.rule.templates.TemplateException;
import com.synodex.qcai.antlr4.rules.SynRuleLexer;
import com.synodex.qcai.antlr4.rules.SynRuleParser;
import com.synodex.qcai.antlr4.synrule.DroolsCodeGeneratorException;
import com.synodex.qcai.antlr4.synrule.DroolsCodeGeneratorListener;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeys;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeysException;

public class SynRuleHandler extends RuleHandler {
	private final static Logger log = Logger.getLogger(SynRuleHandler.class);
	private boolean showRuleMessages;
	private boolean showRuleErrorMessages;
	private boolean showTemplateContent;
	private String ruleName;
	private String originalRule;
	private SynRuleProcessor synRuleProcessor;
	private SynRule synRule;
	private String templateFilePath;
	private Template templateutil;
	private boolean isValid;
	private RuleTextValueMapKeys ruleTextValueMapKeys;
	private String ruleType;
	private String ruleSynId;

	public SynRuleHandler() {
	}

	public SynRuleHandler(SynRule synRule) throws SynRuleHanderException {
		this.synRule = synRule;
		validateRule(synRule);
		this.ruleName = synRule.getRuleName();
		this.ruleType = synRule.getRuleType();
		this.originalRule = synRule.getRule();

		synRuleProcessor = new SynRuleProcessor(synRule.getRuleName(),
				synRule.getRule());
	}

	private void validateRule(SynRule synRule) throws SynRuleHanderException {
		if (synRule == null)
			throw new SynRuleHanderException("SynRule can not be blank!");
		if (synRule.getRule() == null)
			throw new SynRuleHanderException("No rule was provided!");
		if (synRule.getRuleName() == null)
			throw new SynRuleHanderException("No rule name was provided!");
	}

	protected void getSynRuleFromString(String[] rules) {
		CommonTokenStream tokens = null;
		for (String rule : rules) {
			log.info(rule);

			try {
				tokens = getTokens(rule);

				// Save the original rule format
				this.originalRule = rule;

				// getParserTree(tokens);
				getDroolsCodeGeneratorParserTree(tokens);
			} catch (Exception e) {
				setErrorMesages(e.getMessage());
			}
			if (errorHandler.hasErrors()) {
				if (isRuleErrorMessages())
					showRuleErrors();
			} else {
				if (isShowRuleMessages()) {
					showSectionInfo("Messages:\r\n" + getRuleMesages());
				}

				if (isShowTemplateContent())
					log.info("Generated code:\r\n" + getTemplateContent());
			}
		}
	}

	public void process() throws SynRuleHanderException {
		CommonTokenStream tokens = null;
		String rule = synRule.getRule();

		try {
			ruleTextValueMapKeys = new RuleTextValueMapKeys(rule);
		} catch (RuleTextValueMapKeysException e1) {
			throw new SynRuleHanderException(e1.getMessage());
		}

		try {
			if (templateFilePath == null)
				throw new SynRuleHanderException(
						"The Drools rule template file path was not set!");
			setDroolsRuleTemplate();
		} catch (TemplateException e) {
			throw new SynRuleHanderException(e.getMessage());
		}

		// Save the original rule format
		this.originalRule = rule;
		log.debug("Antlr process rule: " + rule);
		tokens = getTokens(rule);

		// getParserTree(tokens);
		getDroolsCodeGeneratorParserTree(tokens);

		if (errorHandler != null && errorHandler.hasErrors()) {
			if (isRuleErrorMessages())
				showRuleErrors();
		} else {
			if (isShowRuleMessages())
				showSectionInfo("Messages:\r\n" + getRuleMesages());

			if (isShowTemplateContent())
				log.info("Generated code:\r\n" + getTemplateContent());

			showSectionInfo("Completed processing rule: " + rule);
		}

		setProcessedRuleProcessor();
	}

	private void setProcessedRuleProcessor() {
		if (errorHandler.hasErrors())
			synRuleProcessor.setGeneRatedError(errorHandler.getErrorMessages());

		if (!errorMesages.toString().isEmpty())
			synRuleProcessor.setGeneRatedError(errorMesages.toString());

		synRuleProcessor.setLogMessages(getRuleMesages());

		// IWT-46 When the "comment" line gets generated for rules with single
		// quotes, they must be escaped for oracle Insert to work
		String tcontent = getTemplateContent() != null ? getTemplateContent()
				.replaceAll("'", "''") : getTemplateContent();

		synRuleProcessor.setGeneRatedDroolsRule(tcontent);
	}

	private void showSectionInfo(String msg) {
		log.info("---------------------------------------");
		log.info(msg);
		log.info("---------------------------------------");
	}

	private void showSectionError(String msg) {
		log.error("---------------------------------------");
		log.error(msg);
		log.error("---------------------------------------");
	}

	protected CommonTokenStream getTokens(String value) {
		ANTLRInputStream input = new ANTLRInputStream(value);
		// create a lexer that feeds off of input CharStream
		SynRuleLexer lexer = new SynRuleLexer(input);
		// create a buffer of tokens pulled from the lexer
		CommonTokenStream tokens = new CommonTokenStream(lexer);
		// create a parser that feeds off the tokens buffer

		return tokens;
	}

	protected ParseTree getParserTree(CommonTokenStream tokens) {
		SynRuleParser parser = new SynRuleParser(tokens);

		ParseTree tree = parser.synrule(); // Call the root rule
		log.debug(tree.toStringTree(parser)); // print LISP-style tree
		try {
			resetErrorHandler(parser);

			setDroolsCodeGeneratorListener(parser, tree);
		} catch (Exception e) {
			log.error(e.getMessage());
			setErrorMesages(e.getMessage());
		}

		return tree;
	}

	protected ParseTree getDroolsCodeGeneratorParserTree(
			CommonTokenStream tokens) {
		SynRuleParser parser = new SynRuleParser(tokens);

		resetErrorHandler(parser);

		ParseTree tree = null;
		try {
			tree = parser.synrule(); // Call the root rule
			log.debug(tree.toStringTree(parser)); // print LISP-style tree

			setDroolsCodeGeneratorListener(parser, tree);
		} catch (Exception e) {
			log.error(e.getMessage());
			setErrorMesages(e.getMessage());
		}

		return tree;
	}

	private void setDroolsCodeGeneratorListener(SynRuleParser parser,
			ParseTree tree) throws DroolsCodeGeneratorException {
		DroolsCodeGeneratorListener codegenerator = new DroolsCodeGeneratorListener(
				parser);

		codegenerator.setTuleTextValueMapKeys(ruleTextValueMapKeys);

		codegenerator.setOriginalRule(getOriginalRule());

		if (getRuleName() == null)
			setRuleName("XX.Unknown");
		else
			codegenerator.setRuleName(getRuleName());

		if (getRuleType() != null)
			codegenerator.setRuleType(getRuleType());

		try {
			ParseTreeWalker walker = new ParseTreeWalker(); // create standard
			walker.walk(codegenerator, tree); // initiate walk of tree with
												// listener

			// Get the SynId from the rule definition
			ruleSynId = codegenerator.getRuleSynId();
		} catch (Exception e) {
			setErrorMesages("Error walking tree: " + e.getMessage());
			log.error("Error walking tree: " + e.getMessage(), e);
		}

		log.debug("codegenerator.getRuleMesages(): "
				+ codegenerator.getRuleMesages());
		log.debug("codegenerator.getErrorMesages(): "
				+ codegenerator.getErrorMesages());

		setErrorMesages(codegenerator.getErrorMesages());
		setRuleMesages(codegenerator.getRuleMesages());

		String generatedcode = codegenerator
				.getGeneratedCodeFromTemplate(templateutil.getContent());

		setTemplateContent(generatedcode);
	}

	private void setDroolsRuleTemplate() throws TemplateException {
		try {
			templateutil = new DroolsRuleTemplate(templateFilePath);
			// templateContent = templateutil.getContent();
		} catch (TemplateException e) {
			setErrorMesages(e.getMessage() + "\r\n");
			throw new TemplateException(e.getMessage());
		}
	}

	private void resetErrorHandler(SynRuleParser parser) {
		parser.removeErrorListeners();

		errorHandler = new ErrorHandler();

		parser.addErrorListener(errorHandler);
	}

	public boolean isShowRuleMessages() {
		return showRuleMessages;
	}

	public void setShowRuleMessages(boolean showRuleNames) {
		this.showRuleMessages = showRuleNames;
	}

	public boolean isRuleErrorMessages() {
		return showRuleErrorMessages;
	}

	public void setRuleErrorMessages(boolean showRuleErrors) {
		this.showRuleErrorMessages = showRuleErrors;
	}

	public boolean isShowTemplateContent() {
		return showTemplateContent;
	}

	public void setShowTemplateContent(boolean showTemplateContent) {
		this.showTemplateContent = showTemplateContent;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getOriginalRule() {
		return this.originalRule;
	}

	public SynRuleProcessor getSynRuleProcessor() {
		return synRuleProcessor;
	}

	public SynRule getSynRule() {
		return synRule;
	}

	public void setSynRule(SynRule synRule) {
		this.synRule = synRule;
	}

	public String getTemplateFilePath() {
		return templateFilePath;
	}

	public void setTemplateFilePath(String templateFilePath) {
		this.templateFilePath = templateFilePath;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	/**
	 * Rule synId from rule definition
	 * 
	 * @return
	 */
	public String getRuleSynId() {
		return ruleSynId;
	}

}
