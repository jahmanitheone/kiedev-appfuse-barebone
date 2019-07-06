package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.List;

import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeys;

public class DroolsCodeGenerationSynidOperation extends
		DroolsCodeGenerationBase implements DroolsCodeGeneration {
	List<String> metaData;
	private RuleTextValueMapKeys ruleTextValueMapKeys;

	public DroolsCodeGenerationSynidOperation(List<String> data,
			RuleTextValueMapKeys keys) throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (data == null)
			throw new DroolsCodeGenerationException(
					"Drools metadata can not be null");
		if (keys == null)
			throw new DroolsCodeGenerationException(
					"RuleTextValueMapKeys can not be null");

		this.metaData = data;
		this.ruleTextValueMapKeys = keys;
	}

	public void generateCode() {
		String opermsg = "SynId code generation operation..";
		String codeGenVarInitMsg = "";
		String codeGenExpressionMsg = "";
		String codeGenLoggingMsg = "";
		String tval = "";

		showStartOfProcessing(opermsg);

		String metaDataToString = metaData.toString();
		boolean isString = metaDataToString.contains("\"");

		String condition = metaData.get(0);
		setRuleMesages("condition: " + condition);

		String synvar = getSynIdAsVar(condition);
		String numberoperations = ",>,>=,<,<=,==,!=,=,";

		String operation = metaData.get(1);
		setRuleMesages("operation: " + operation);

		String conditionmsg = "";
		if (condition != null && !condition.equalsIgnoreCase("ISMOSTRECENT")) {
			if (!isString && numberoperations.contains("," + operation + ",")) {
				// We are doing a number operation
				codeGenVarInitMsg = getGenCodeAssignmentGetValue(condition,
						synvar);
				codeGenLoggingMsg = getGenCodeAssignmentLoginfo(condition,
						synvar);

				codeGenExpressionMsg = "NumValue(" + synvar + ") " + operation
						+ " " + metaData.get(2);
			} else {
				// We are doing a string operation
				codeGenVarInitMsg = getGenCodeAssignmentGetValue(condition,
						synvar);

				codeGenLoggingMsg = getGenCodeAssignmentLoginfo(condition, synvar);

				int propcnt = ruleTextValueMapKeys.getReadPropertyCnt() + 1;

				if (metaData.size() >= 4) {
					tval = ruleTextValueMapKeys.getIfConditionText(metaData
							.get(3));
					setRuleMesages("tval: " + tval);

					if (tval == null) {
						String key = ruleTextValueMapKeys
								.getRuleIfConditionKeys(propcnt);
						setRuleMesages("propcnt : " + propcnt);
						setRuleMesages("key: " + key);

						tval = ruleTextValueMapKeys.getIfConditionText(key);
						setRuleMesages("tval: " + tval);
					}
					setRuleMesages("\r\n metaData.get(2) tval:\r\n" + tval);
				} else
					setErrorMesages(metaDataToString + "has a missing token");

				operation = operation.equals("!=") ? "!" : "";

				codeGenExpressionMsg = operation + "isStringEqual(" + synvar
						+ ",\"" + tval + "\")";
			}

			conditionmsg += codeGenVarInitMsg;
			conditionmsg += codeGenLoggingMsg;
		} else {
			codeGenVarInitMsg = null;
			codeGenLoggingMsg = null;
			codeGenExpressionMsg = null;
		}

		setRuleMesages("\r\nconditionmsg:\r\n" + conditionmsg);
		setRuleMesages("\r\nruleexpression:\r\n" + codeGenExpressionMsg);

		setCodeDeclaration(codeGenVarInitMsg);
		setCodeLogMessage(codeGenLoggingMsg);
		setCodeExpression(codeGenExpressionMsg);

		showEndOfProcessing(opermsg);
	}

}
