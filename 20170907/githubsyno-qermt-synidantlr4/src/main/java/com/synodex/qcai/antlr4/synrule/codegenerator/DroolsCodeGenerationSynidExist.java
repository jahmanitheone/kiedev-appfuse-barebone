package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.List;

import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;

public class DroolsCodeGenerationSynidExist extends DroolsCodeGenerationBase
		implements DroolsCodeGeneration {
	List<String> metaData;

	public DroolsCodeGenerationSynidExist(List<String> data)
			throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (data == null)
			throw new DroolsCodeGenerationException(
					"Drools metadata can not be null");

		this.metaData = data;
	}

	public void generateCode() {
		String opermsg = "SynId code generation operation..";

		showStartOfProcessing(opermsg);
		String metaDataToString = metaData.toString();

		String condition = metaData.get(0);
		setRuleMesages("condition: " + condition);

		String synvar = getSynIdAsVar(condition) + "IsFound";

		String notFound = metaDataToString.contains("FALSE") ? "!" : "";
		String codeGenVarInitMsg = Constants.SPACE_FOUR + "boolean " + synvar
				+ " = " + notFound + "isFoundSynId(sc,\"" + condition + "\");";

		String codeGenLoggingMsg = Constants.SPACE_FOUR + "log.info(\"SynId ("
				+ condition + ") isFound = \" + " + synvar + ");";
		
		String codeGenExpressionMsg = synvar;

		String conditionmsg = "";
		conditionmsg += codeGenVarInitMsg;
		conditionmsg += codeGenLoggingMsg;

		setRuleMesages("\r\nconditionmsg:\r\n" + conditionmsg);
		setRuleMesages("\r\nruleexpression:\r\n" + codeGenExpressionMsg);

		setCodeDeclaration(codeGenVarInitMsg);
		setCodeLogMessage(codeGenLoggingMsg);
		setCodeExpression(codeGenExpressionMsg);

		showEndOfProcessing(opermsg);
	}

}
