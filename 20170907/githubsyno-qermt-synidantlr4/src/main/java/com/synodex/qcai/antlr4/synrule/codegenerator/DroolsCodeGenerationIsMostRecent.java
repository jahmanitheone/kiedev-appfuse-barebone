package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.List;

import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;

public class DroolsCodeGenerationIsMostRecent extends DroolsCodeGenerationBase
		implements DroolsCodeGeneration {
	List<String> metaData;

	public DroolsCodeGenerationIsMostRecent(List<String> data)
			throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (data == null)
			throw new DroolsCodeGenerationException(
					"Drools metadata can not be null");

		this.metaData = data;
	}

	public void generateCode() {
		String opermsg = null;
		showStartOfProcessing(opermsg);

		String codeGenVarInitMsg = Constants.SPACE_FOUR
				+ "boolean ismostRecent = isMostRecent(sc);";
		String codeGenExpressionMsg = "ismostRecent";
		String codeGenLoggingMsg = Constants.SPACE_FOUR
				+ "log.info(\"ismostRecent = \" + ismostRecent);";

		setRuleMesages("\r\nconditionmsg:\r\n" + codeGenLoggingMsg);
		setRuleMesages("\r\nruleexpression:\r\n    " + codeGenExpressionMsg);

		setCodeDeclaration(codeGenVarInitMsg);
		setCodeLogMessage(codeGenLoggingMsg);
		setCodeExpression(codeGenExpressionMsg);

		showEndOfProcessing(opermsg);
	}

}
