package com.synodex.qcai.antlr4.synrule.base;

import java.util.Map;

public interface DroolsCodeGeneration {
	void setCodeDeclaration(String msg);

	String getCodeDeclation();

	void setCodeLogMessage(String msg);

	String getCodeLogMessage();

	void setCodeExpression(String expr);

	String getCodeExpression();

	void generateCode();

	void setRuleInfo(String rulename, String rulesynid, String rule);

	Map<String, String> getDeclaredVars();

	void setDeclaredVars(String key, String value);

	void setDeclaredVars(Map<String, String> duplicateVar);
}
