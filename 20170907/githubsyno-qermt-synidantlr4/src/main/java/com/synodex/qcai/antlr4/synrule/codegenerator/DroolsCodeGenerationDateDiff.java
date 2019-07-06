package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.Arrays;
import java.util.List;
import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;

public class DroolsCodeGenerationDateDiff extends DroolsCodeGenerationBase
		implements DroolsCodeGeneration {
	List<String> metaData;
	private int datetmp2cnt = 1;

	public DroolsCodeGenerationDateDiff(List<String> data)
			throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (data == null)
			throw new DroolsCodeGenerationException(
					"Drools metadata can not be null");

		this.metaData = data;
	}

	public void generateCode() {
		String opermsg = "DateDiff code generation..";
		String codeGenVarInitMsg = "";
		String codeGenExpressionMsg = "";
		String codeGenLoggingMsg = "";

		showStartOfProcessing(opermsg);

		String condition = metaData.get(0);
		setRuleMesages("condition: " + condition);

		String[] datedifffunc = getDateDiffGeneratedCode_ExtactDateSynIds(condition);
		String datetmp1 = getSynIdAsVar(datedifffunc[0]);
		String datetmp2 = getSynIdAsVar(datedifffunc[1]);

		String datediffvar = datetmp1 + "DateDiff";
		codeGenVarInitMsg += getDateDiffGeneratedCode_DateVars(datedifffunc,
				datetmp1, datetmp2);
		codeGenVarInitMsg += Constants.SPACE_FOUR
				+ getDateDiffGeneratedCode_DateDiffMethod(datetmp1, datetmp2,
						datediffvar);

		codeGenLoggingMsg = getDateDiffGeneratedCode_LoggerMessage(
				datedifffunc, datetmp1, datetmp2, datediffvar);

		codeGenExpressionMsg = getDateDiffGeneratedCode_DatediffExpression(
				metaData, datediffvar);

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

	private String getDateDiffGeneratedCode_DateVars(String[] datedifffunc,
			String datetmp1, String datetmp2) {
		String gencode = "dateDifffGeneratedError";

		if (datedifffunc.length > 1) {
			gencode = getGenCodeAssignmentGetValue(datedifffunc[0], datetmp1)
					+ "\r\n";

			String datetmp2var = datetmp2 + "var";
			// Check for duplicate IDATE variable
			String dupdatetmp2 = getDeclaredVars().get(datetmp2var);
			if (dupdatetmp2 == null) {
				setDeclaredVars(datetmp2var, datetmp2);

				gencode += getGenCodeAssignmentGetValue(datedifffunc[1],
						datetmp2) + "\r\n";
			}
		}

		return gencode;
	}

	private String[] getDateDiffGeneratedCode_ExtactDateSynIds(String condition) {
		String msg = "";
		String[] dates = {};
		setRuleMesages("Get the SynIDs from the DateDiff() in the rule" + "");

		int pos = condition.indexOf(",");

		if (pos > 0) {
			setRuleMesages("pos: " + pos + "");
			// Remove DateDiff method name
			condition = condition.substring(pos + 1);
			setRuleMesages("b: condition: " + condition + "");

			pos = condition.lastIndexOf(")");
			// Remove brackets last )
			condition = condition.substring(0, pos);
			setRuleMesages("c: condition: " + condition + "");

			dates = condition.split(",");
		}

		setRuleMesages(msg);

		return dates;
	}

	private String getDateDiffGeneratedCode_LoggerMessage(
			String[] datedifffunc, String datetmp1, String datetmp2,
			String datediffvar) {
		String gencode = "";

		gencode += getGenCodeAssignmentLoginfo(datedifffunc[0], datetmp1)
				+ "\r\n";

		String datetmp2log = datetmp2 + "log";
		// Check for duplicate IDATE logging
		String dupdatetmp2 = getDeclaredVars().get(datetmp2log);
		if (dupdatetmp2 == null) {
			setDeclaredVars(datetmp2log, datetmp2);

			gencode += getGenCodeAssignmentLoginfo(datedifffunc[1], datetmp2)
					+ "\r\n";
		}

		gencode += getGenCodeAssignmentLoginfo(datediffvar, datediffvar);

		return gencode;
	}

	private String getDateDiffGeneratedCode_DateDiffMethod(String datetmp1,
			String datetmp2, String datediffvar) {
		String datedifffunction = "long " + datediffvar
				+ " = dateDiffByString(" + datetmp1 + "," + datetmp2 + ");";

		return datedifffunction;
	}

	private String getDateDiffGeneratedCode_DatediffExpression(
			List<String> conditions, String datediffvar) {
		String msg = "";
		String gencode = "";

		gencode += "(";
		gencode += datediffvar;
		gencode += ">0 && ";
		gencode += datediffvar;
		gencode += " " + conditions.get(1);
		gencode += " " + conditions.get(2);
		gencode += ")";

		setRuleMesages("gencode = " + gencode + "");

		setRuleMesages(msg);

		return gencode;
	}

}
