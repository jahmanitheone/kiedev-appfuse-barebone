package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

import com.synodex.qcai.Constants;

class DroolsCodeGenerationBase {
	protected final static Logger log = Logger
			.getLogger(DroolsCodeGenerationBase.class);
	private StringBuilder ruleMesages = new StringBuilder();
	private StringBuilder errorMesages = new StringBuilder();
	private String ruleName;
	private String ruleSynid;
	private String rule;
	private String codeExpression;
	private String codeLogMessage;
	private String codeDeclaration;
	private Map<String, String> declaredVars = new HashMap<String, String>();
	protected String ruleType;

	public void setRuleInfo(String rulename, String rulesynid, String rule) {
		this.ruleName = rulename;
		this.setRuleSynid(rulesynid);
		this.rule = rule;
	}

	public void setRuleInfo(String rulename, String ruletype, String rulesynid,
			String rule) {
		this.ruleName = rulename;
		this.ruleType = ruletype;
		this.setRuleSynid(rulesynid);
		this.rule = rule;
	}

	String getRuleMesages() {
		return ruleMesages.toString();
	}

	void setRuleMesages(String msg) {
		ruleMesages.append(msg + "\r\n");
	}

	String getErrorMesages() {
		return errorMesages.toString();
	}

	void setErrorMesages(String msg) {
		errorMesages.append(msg + "\r\n");
	}

	String getRuleName() {
		return ruleName;
	}

	void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	void showEndOfProcessing(String opermsg) {
		setRuleMesages("\r\n-----------------------");
		setRuleMesages("End " + opermsg);
		setRuleMesages("-----------------------");
	}

	void showStartOfProcessing(String opermsg) {
		String msg = "";
		setRuleMesages("\r\n----------------------");
		setRuleMesages("Start " + opermsg);
		setRuleMesages("-----------------------");

		setRuleMesages(msg);
	}

	String getSynIdAsVar(String synid) {
		setRuleMesages("beg synid: " + synid);
		if (synid != null) {
			int dotpos = synid.indexOf(".");

			setRuleMesages("synid: " + synid + " - " + synid.length() + "");
			setRuleMesages("dotpos: " + dotpos + "");

			if (synid.toUpperCase().contains("MOSTRECENT")) {
				// Get the synid already converted in the mostRecent function
				synid = synid.substring(synid.indexOf("(") + 1,
						synid.indexOf(")"));

				dotpos = synid.indexOf(".");
			}

			if (dotpos > 0)
				synid = synid.substring(0, dotpos).toLowerCase()
						+ synid.substring(dotpos + 1);
			else
				synid = synid.toLowerCase();

		}

		setRuleMesages("aft synid: " + synid);

		return synid;
	}

	protected String getGenCodeAssignmentGetValue(String synid, String synvar) {
		String getval = "";

		if (synid.toUpperCase().contains("MOSTRECENT")) {
			// If mostRecent method is not quoted - quote it
			if (synid.indexOf("\"") < 0) {
				// Get SynId in mostRecent()
				synid = synid.substring(synid.indexOf("(") + 1,
						synid.indexOf(")"));
				// Put quotes in
				synid = "mostRecentValue(sc,\"" + synid + "\")";
			}

			getval = Constants.SPACE_FOUR + "String " + synvar + " =  " + synid
					+ ";";
		} else
			getval = Constants.SPACE_FOUR + "String " + synvar
					+ " = sc.getValue(\"" + synid + "\");";

		return getval;
	}

	protected String getGenCodeAssignmentLoginfo(String synid, String synvar) {
		return Constants.SPACE_FOUR + "log.info(\"" + synid + " = \" + "
				+ synvar + ");";
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public String getRuleSynid() {
		return ruleSynid;
	}

	public void setRuleSynid(String ruleSynid) {
		this.ruleSynid = ruleSynid;
	}

	public void setCodeDeclaration(String msg) {
		this.codeDeclaration = msg;
	}

	public String getCodeDeclation() {
		return this.codeDeclaration;
	}

	public void setCodeLogMessage(String msg) {
		this.codeLogMessage = msg;
	}

	public String getCodeLogMessage() {
		return this.codeLogMessage;
	}

	public void setCodeExpression(String expr) {
		this.codeExpression = expr;
	}

	public String getCodeExpression() {
		return this.codeExpression;
	}

	public Map<String, String> getDeclaredVars() {
		return declaredVars;
	}

	public void setDeclaredVars(Map<String, String> dupvar) {
		declaredVars = dupvar;
	}

	public void setDeclaredVars(String key, String value) {
		if (key != null)
			declaredVars.put(key, value);
	}

}
