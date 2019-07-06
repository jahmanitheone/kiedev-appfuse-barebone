package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.List;

import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;

public class DroolsCodeGenerationIsNull extends DroolsCodeGenerationBase
		implements DroolsCodeGeneration {
	List<String> metaData;
	boolean isNull;

	public DroolsCodeGenerationIsNull(List<String> data, boolean isnull)
			throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (data == null)
			throw new DroolsCodeGenerationException(
					"Drools metadata can not be null");

		this.metaData = data;
		this.isNull = isnull;
	}

	public void generateCode() {
		String opermsg = null;
		if (isNull)
			opermsg = "SynId Is Null operation..";
		else
			opermsg = "SynId Is Not (!) Null operation..";
		showStartOfProcessing(opermsg);

		String condition = metaData.get(0);
		String synvar = getSynIdAsVar(condition);

		String codeGenVarInitMsg = getGenCodeAssignmentGetValue(condition,
				synvar);

		String codeGenLoggingMsg = Constants.SPACE_FOUR + "log.info(\""
				+ condition + " = \" + " + synvar + ");";
		String codeGenExpressionMsg = null;
		if (isNull)
			codeGenExpressionMsg = "isEmpty(" + synvar + ")";
		else
			codeGenExpressionMsg = "!isEmpty(" + synvar + ")";

		String conditionmsg = "";
		conditionmsg += codeGenVarInitMsg;
		conditionmsg += codeGenLoggingMsg;

		setRuleMesages("\r\nconditionmsg:\r\n" + conditionmsg);
		setRuleMesages("\r\nruleexpression:\r\n    " + codeGenExpressionMsg);

		setCodeDeclaration(codeGenVarInitMsg);
		setCodeLogMessage(codeGenLoggingMsg);
		setCodeExpression(codeGenExpressionMsg);

		showEndOfProcessing(opermsg);
	}

}
