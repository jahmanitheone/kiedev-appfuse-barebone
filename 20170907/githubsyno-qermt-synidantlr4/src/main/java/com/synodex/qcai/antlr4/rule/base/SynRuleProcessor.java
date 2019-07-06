package com.synodex.qcai.antlr4.rule.base;

public class SynRuleProcessor {
	private String ruleName;
	private String rule;
	private boolean hasValidSyntax;
	private boolean hasErrors;
	private String geneRatedDroolsRule;
	private String geneRatedError;
	private String logMessages;

	public SynRuleProcessor(String rulename, String rule) {
		this.ruleName = rulename;
		this.rule = rule;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public boolean hasValidSyntax() {
		if (geneRatedError != null)
			hasValidSyntax = false;

		return hasValidSyntax;
	}

	public void setHasValidSyntax(boolean hasValidSyntax) {
		this.hasValidSyntax = hasValidSyntax;
	}

	public String getGeneRatedDroolsRule() {
		return geneRatedDroolsRule;
	}

	public void setGeneRatedDroolsRule(String geneRatedDroolsRule) {
		this.geneRatedDroolsRule = geneRatedDroolsRule;
	}

	public String getGeneRatedError() {
		return geneRatedError;
	}

	public void setGeneRatedError(String geneRatedError) {
		this.geneRatedError = geneRatedError;
	}

	public boolean hasErrors() {
		if (geneRatedError != null)
			hasErrors = true;

		return hasErrors;
	}

	public void setHasErrors(boolean hasErrors) {
		this.hasErrors = hasErrors;
	}

	public String getLogMessages() {
		return logMessages;
	}

	public void setLogMessages(String logMessages) {
		this.logMessages = logMessages;
	}

	@Override
	public String toString() {
		return "SynRuleProcessor [ruleName=" + ruleName + ", rule=" + rule
				+ ", hasValidSyntax=" + hasValidSyntax + ", hasErrors="
				+ hasErrors + ", geneRatedDroolsRule=" + geneRatedDroolsRule
				+ ", geneRatedError=" + geneRatedError + ", logMessages="
				+ logMessages + "]";
	}

}