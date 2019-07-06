package com.synodex.qcai.antlr4.common.handler;

import org.apache.log4j.Logger;

public class RuleHandler {
	private final static Logger log = Logger.getLogger(RuleHandler.class);
	protected ErrorHandler errorHandler;
	protected StringBuilder ruleMesages = new StringBuilder();
	protected StringBuilder errorMesages = new StringBuilder();
	protected StringBuilder templateContent = new StringBuilder();

	public String getRuleMesages() {
		return ruleMesages.toString();
	}

	public void setRuleMesages(String msg) {
		ruleMesages.append(msg);
	}

	public String getErrorMesages() {
		return errorMesages.toString();
	}

	public void setErrorMesages(String msg) {
		errorMesages.append(msg);
	}

	public ErrorHandler getErrorHandler() {
		return errorHandler;
	}

	public void setErrorHandler(ErrorHandler errorHandler) {
		this.errorHandler = errorHandler;
	}

	public void showRuleErrors() {
		log.error(errorHandler.getErrorMessages());
	}

	public String getTemplateContent() {
		return templateContent.toString();
	}

	public void setTemplateContent(String content) {
		templateContent.append(content);
	}

}
