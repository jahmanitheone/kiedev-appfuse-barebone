package com.synodex.qcai.antlr4.synrule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.antlr.v4.runtime.ParserRuleContext;
import org.apache.log4j.Logger;
import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.rule.util.AntlrRuleUtil;
import com.synodex.qcai.antlr4.rules.SynRuleBaseListener;
import com.synodex.qcai.antlr4.rules.SynRuleParser;
import com.synodex.qcai.antlr4.rules.SynRuleParser.AssignRuleSynIdContext;
import com.synodex.qcai.antlr4.rules.SynRuleParser.AssignRuleAssignmentPropertyValueContext;
import com.synodex.qcai.antlr4.rules.SynRuleParser.AssignStringSynIdPropertyValueContext;
import com.synodex.qcai.antlr4.rules.SynRuleParser.RuleAssignmentContext;
import com.synodex.qcai.antlr4.rules.SynRuleParser.RuleConditionsContext;
import com.synodex.qcai.antlr4.rules.SynRuleParser.RuleDeclarationContext;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationDateDiff;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationException;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationIsNull;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationIsMostRecent;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationSetRuleAssignment;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationSynidExist;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationSynidOperation;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeys;
import com.synodex.qcai.utils.MapUtil;
import com.synodex.qcai.utils.StringUtil;

public class DroolsCodeGeneratorListener extends SynRuleBaseListener {
	private final static Logger log = Logger
			.getLogger(DroolsCodeGeneratorListener.class);
	private SynRuleParser parser;
	private AntlrRuleUtil antlrRuleUtil;
	private StringBuilder ruleMesages = new StringBuilder();
	private StringBuilder errorMesages = new StringBuilder();
	private List<String> logicalops = new ArrayList<String>();
	private String ruleSynId;
	private String ruleName;
	private String originalRule = "";
	private List<String> codegenOperationAndOrs = new ArrayList<String>();
	private List<String> codegenOperationExpressions = new ArrayList<String>();
	private List<String> templateDeclarations = new ArrayList<String>();
	private List<String> templateLoggerMessage = new ArrayList<String>();
	private List<String> templateExpressions = new ArrayList<String>();
	private List<String> ruleSetValue = new ArrayList<String>();
	private List<String> ruleSetAssignment = new ArrayList<String>();
	private RuleTextValueMapKeys ruleTextValueMapKeys;
	private boolean isRuleForExistingSynId;
	private boolean isRuleDateDiffOperation;
	private boolean isRuleNullOperation;
	private boolean isComparisionOperationon;
	private boolean isComparisonOperation;
	private boolean isRuleHasMostRecentOperation;
	private int enterAssigneRuleSynIdCnt = 1;
	private Map<String, String> uniqueVar = new HashMap<String, String>();
	private Map<String, String> duplicateVar = new HashMap<String, String>();
	private String[] duplicateVarKeys = {};
	private String ruleType;

	public DroolsCodeGeneratorListener(SynRuleParser parser)
			throws DroolsCodeGeneratorException {
		this.parser = parser;
		log.info("Processing: " + getClass().getName());

		try {
			antlrRuleUtil = new AntlrRuleUtil(parser);
		} catch (Exception e) {
			setErrorMesages(e.getMessage());
			throw new DroolsCodeGeneratorException(e.getMessage());
		}
	}

	@Override
	public void enterSynrule(
			com.synodex.qcai.antlr4.rules.SynRuleParser.SynruleContext ctx) {
		super.enterSynrule(ctx);

		setRuleMesages("1:\r\n" + antlrRuleUtil.showBaseInfo());
	};

	@Override
	public void enterRuleDeclaration(RuleDeclarationContext ctx) {
		super.enterRuleDeclaration(ctx);
		showContextDetails("enterRuleDeclaration", ctx);
	}

	@Override
	public void exitRuleDeclaration(RuleDeclarationContext ctx) {
		super.exitRuleDeclaration(ctx);
		showContextDetails("exitRuleDeclaration", ctx);
		// setRuleMesages("exitRuleDeclaration: " + ctx.getText());
	}

	@Override
	public void enterAssignRuleAssignmentPropertyValue(
			AssignRuleAssignmentPropertyValueContext ctx) {
		super.enterAssignRuleAssignmentPropertyValue(ctx);

		showContextDetails("enterAssignRuleAssignmentPropertyValue", ctx);
	}

	@Override
	public void exitAssignStringSynIdPropertyValue(
			AssignStringSynIdPropertyValueContext ctx) {
		super.exitAssignStringSynIdPropertyValue(ctx);
		showContextDetails("exitAssignStringSynIdPropertyValue", ctx);
	}

	@Override
	public void enterRuleConditions(RuleConditionsContext ctx) {
		super.enterRuleConditions(ctx);
		showContextDetails("enterRuleConditions", ctx);

		saveRuleConditions(ctx);
	}

	private void saveRuleConditions(RuleConditionsContext ctx) {
		// Capture the operations expression defined in the rule
		// The Logicala AND/OR and its following expression
		for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
			String ruledecl = ctx.getChild(j).getText();

			setRuleMesages("ruledecl: = " + ruledecl);

			if (ruledecl.equalsIgnoreCase("AND")
					|| ruledecl.equalsIgnoreCase("OR")) {
				codegenOperationAndOrs.add(ruledecl);
			} else {
				// Capture operation expression
				codegenOperationExpressions.add(ruledecl);
			}
		}
	}

	@Override
	public void enterAssignStringSynIdPropertyValue(
			AssignStringSynIdPropertyValueContext ctx) {
		super.enterAssignStringSynIdPropertyValue(ctx);
		showContextDetails("enterAssignStringSynIdPropertyValue", ctx);

		// Capture each expression elemements
		List<String> expressionelements = new ArrayList<String>();
		for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
			expressionelements.add(ctx.getChild(j).getText());
		}

		setGenerateCodes(expressionelements, ctx);
	}

	private void setGenerateCodes(List<String> expressionelements,
			ParserRuleContext ctx) {
		setRuleMesages("setGenerateCodes()");

		String expressionoperation = expressionelements.get(0) != null ? expressionelements
				.get(0).toUpperCase() : "";

		if (expressionelements.size() > 1) {
			String expressionvalue = expressionelements.get(1) != null ? expressionelements
					.get(1).toUpperCase() : "";

			setRuleMesages("expressionvalue: " + expressionvalue);

			if (expressionvalue.contains("IS NULL")) {
				isRuleNullOperation = true;
				getSynIdIsNullCode(expressionelements, true);
			} else if (expressionvalue.contains("IS NOT NULL")) {
				isRuleNullOperation = true;
				getSynIdIsNullCode(expressionelements, false);
			} else if (expressionoperation.contains("DATEDIFF")) {
				isRuleDateDiffOperation = true;
				getDateDiffGeneratedCode(expressionelements);
			} else {
				String expressionstring = expressionelements.toString()
						.toUpperCase();
				if (!expressionstring.contains(".DATASTATUS")
						&& !expressionstring.contains("CODE")) {
					isComparisonOperation = true;
					setRuleMesages("isComparisionOperation="
							+ isComparisonOperation);
					getSynIdOperationGeneratedCode(expressionelements);
				}
			}
		}

		// After all rule types see if we are processing the most recent
		if (expressionoperation.contains("ISMOSTRECENT")) {
			isRuleHasMostRecentOperation = true;
			getIsMostRecent(expressionelements);
		}

		setRuleMesages("expressionoperation: " + expressionoperation);
	}

	private void setRuleOperationExpressions(ParserRuleContext ctx) {
		// Get the operator which go us here - AND or OR
		for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
			String ruledecl = ctx.getChild(j).getText();
			if (isRuleForExistingSynId)
				ruledecl = "AND";

			setRuleMesages("ruledecl: = " + ruledecl);

			if (ruledecl.equalsIgnoreCase("AND")
					|| ruledecl.equalsIgnoreCase("OR")) {
				codegenOperationAndOrs.add(ruledecl);
			} else {
				// Capture operation expression
				codegenOperationExpressions.add(ruledecl);
			}
		}
	}

	private void showContextDetails(String module, ParserRuleContext ctx) {
		setRuleMesages("showContextDetails()");

		setRuleMesages("\r\n*-------------------------");
		setRuleMesages("*" + module);
		setRuleMesages("*" + Constants.SPACE_FOUR + ctx.getText());
		setRuleMesages("*-------------");

		setRuleMesages("Child count: " + ctx.getChildCount());
		for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
			logicalops.add(ctx.getChild(j).getText());
			setRuleMesages(j + ":-> " + ctx.getChild(j).getText());
		}
		setRuleMesages("*-------------------------");
		setRuleMesages("*");
	}

	private void getSynIdExistGeneratedCode(List<String> conditions) {
		setRuleMesages("getSynIdExistGeneratedCode()");

		try {
			DroolsCodeGeneration codegen = new DroolsCodeGenerationSynidExist(
					conditions);
			codegen.setRuleInfo(ruleName, ruleSynId, originalRule);
			codegen.generateCode();

			setTemplateGeneratedValues(codegen.getCodeDeclation(),
					codegen.getCodeLogMessage(), codegen.getCodeExpression());
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	private void getSynIdIsNullCode(List<String> conditions, boolean isnull) {
		setRuleMesages("getSynIdIsNullCode()");

		try {
			DroolsCodeGeneration codegen = new DroolsCodeGenerationIsNull(
					conditions, isnull);
			codegen.setRuleInfo(ruleName, ruleSynId, originalRule);
			codegen.generateCode();

			setTemplateGeneratedValues(codegen.getCodeDeclation(),
					codegen.getCodeLogMessage(), codegen.getCodeExpression());
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	private void getIsMostRecent(List<String> conditions) {
		setRuleMesages("getSynIdIsNullCode()");

		try {
			DroolsCodeGenerationIsMostRecent codegen = new DroolsCodeGenerationIsMostRecent(
					conditions);
			codegen.setRuleInfo(ruleName, ruleSynId, originalRule);
			codegen.generateCode();

			setTemplateGeneratedValues(codegen.getCodeDeclation(),
					codegen.getCodeLogMessage(), codegen.getCodeExpression());
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	private void getSynIdOperationGeneratedCode(List<String> conditions) {
		setRuleMesages("getSynIdOperationGeneratedCode()");
		try {
			DroolsCodeGeneration codegen = new DroolsCodeGenerationSynidOperation(
					conditions, ruleTextValueMapKeys);
			codegen.setRuleInfo(ruleName, ruleSynId, originalRule);
			codegen.generateCode();

			setTemplateGeneratedValues(codegen.getCodeDeclation(),
					codegen.getCodeLogMessage(), codegen.getCodeExpression());
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	private void getDateDiffGeneratedCode(List<String> conditions) {
		try {
			DroolsCodeGeneration codegen = new DroolsCodeGenerationDateDiff(
					conditions);
			codegen.setDeclaredVars(duplicateVar);
			codegen.setRuleInfo(ruleName, ruleSynId, originalRule);
			codegen.generateCode();

			duplicateVar = codegen.getDeclaredVars();
			duplicateVarKeys = MapUtil.getMapKeysToArray(duplicateVar);

			log.info("duplicateVarKeys.length: " + duplicateVarKeys.length);
			for (String dupevar : duplicateVarKeys)
				log.info("dupevar: " + dupevar);

			setTemplateGeneratedValues(codegen.getCodeDeclation(),
					codegen.getCodeLogMessage(), codegen.getCodeExpression());
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	private void setTemplateGeneratedValues(String codeGenVarInitMsg,
			String codeGenLoggingMsg, String codeGenExpressionMsg) {

		// Jira IWT-50 Rules with multiple OR's all referencing the same label
		// generate invalid Drool code
		// Fix -- Dont' allow duplicate variable and log message
		String varExist = uniqueVar.get(codeGenVarInitMsg);
		if (varExist == null) {
			if (codeGenVarInitMsg != null)
				uniqueVar.put(codeGenVarInitMsg, codeGenVarInitMsg);

			if (codeGenVarInitMsg != null)
				templateDeclarations.add(codeGenVarInitMsg);

			if (codeGenLoggingMsg != null)
				templateLoggerMessage.add(codeGenLoggingMsg);
		}

		if (codeGenExpressionMsg != null)
			templateExpressions.add(codeGenExpressionMsg);
	}

	public String getGeneratedCodeFromTemplate(String templateContent) {
		setRuleMesages("getGeneratedCodeFromTemplate()");
		String rulesynid = getRuleName();
		String rulesynidtrim = rulesynid.replace(".", "");
		String synid = rulesynid.substring(0, rulesynid.indexOf("."));

		// Replace the rulesynid
		templateContent = templateContent.replace("<rulesynid>", rulesynid);
		// Replace the synid
		templateContent = templateContent.replace("<synid>", synid);
		// Replace the rulesynidtrim with no period
		templateContent = templateContent.replace("<rulesynidtrim>",
				rulesynidtrim);

		String originalrulename = getOriginalRule().replace("THEN",
				"\r\n" + "//THEN");
		// Set the original rule name
		templateContent = templateContent.replace("<declarerule>",
				originalrulename);

		// Create the template different code template information
		String ruleinit = "\r\n";
		String rulelog = "\r\n";
		String ruleexpression = "";

		for (int j = 0; j < templateDeclarations.size(); j++) {
			ruleinit += templateDeclarations.get(j) + "\r\n";
		}

		for (int j = 0; j < templateLoggerMessage.size(); j++) {
			rulelog += templateLoggerMessage.get(j) + "\r\n";
		}

		// If the var is empty - clear it
		if (StringUtil.isEmpty(ruleinit.trim()))
			ruleinit = "";

		if (StringUtil.isEmpty(rulelog.trim()))
			rulelog = "";

		for (int j = 0; j < templateExpressions.size(); j++) {
			// Ignore the 1st logical expression - it's always AND
			String oper;
			try {
				oper = codegenOperationAndOrs.get(j);
				if (oper != null) {
					if (oper.equalsIgnoreCase("AND"))
						oper = " && ";
					else
						oper = " || ";

					if (j == 0) {
						ruleexpression += oper + "\r\n" + Constants.SPACE_EIGHT
								+ " (\r\n";
						ruleexpression += Constants.SPACE_TWELVE
								+ templateExpressions.get(j);
					} else {
						ruleexpression += oper + "\r\n";
						ruleexpression += Constants.SPACE_TWELVE
								+ templateExpressions.get(j);
					}
				}
			} catch (Exception e) {
				log.warn("oper var was not set for expresssion (" + j + ")");
			}
		}

		if (templateExpressions.size() > 0)
			ruleexpression += "\r\n" + Constants.SPACE_EIGHT + " )";

		for (String setvalue : ruleSetValue) {
			templateContent = templateContent.replace("<rulesetvalue>",
					setvalue);
		}

		for (String assignment : ruleSetAssignment) {
			templateContent = templateContent.replace("<assignment>",
					assignment);
		}

		// Replace the ruleinit
		templateContent = templateContent.replace("<ruleinit>", ruleinit);
		// Replace the rulelog message
		templateContent = templateContent.replace("<rulelog>", rulelog);
		// Replace the ruleexpression message
		templateContent = templateContent.replace("<ruleexpression>",
				ruleexpression);

		return templateContent;
	}

	@Override
	public void enterAssignRuleSynId(AssignRuleSynIdContext ctx) {
		super.enterAssignRuleSynId(ctx);
		showContextDetails("enterAssignRuleSynId", ctx);

		List<String> expressionelements = new ArrayList<String>();
		if (enterAssigneRuleSynIdCnt > 1) {
			// Get the SynId for a second defined Synid
			setRuleMesages("enterAssignRuleSynId: " + ctx.getText() + "");
			setRuleMesages("isRuleForExistingSynId: " + isRuleForExistingSynId);
			// Set the rule main SynId
			for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
				if (j == 0) {
					if (!isRuleForExistingSynId) {
						codegenOperationAndOrs.add("AND");
					}
				}

				expressionelements.add(ctx.getChild(j).getText());

				setRuleMesages(j + ":-> " + ctx.getChild(j).getText() + "");

				setRuleMesages("isRuleForExistingSynId="
						+ isRuleForExistingSynId);
				// All we want is the SynId
				// break;
			}

			getSynIdExistGeneratedCode(expressionelements);
		} else {
			// First time in - its the ruleid
			ruleSynId = ctx.getChild(0).getText();
			isRuleForExistingSynId = true;
		}

		setRuleMesages("enterAssigneRuleSynIdCnt: "
				+ enterAssigneRuleSynIdCnt++);
	}

	@Override
	public void enterRuleAssignment(RuleAssignmentContext ctx) {
		super.enterRuleAssignment(ctx);
		showContextDetails("enterRuleAssignment", ctx);

		try {
			DroolsCodeGenerationSetRuleAssignment codegen = new DroolsCodeGenerationSetRuleAssignment(
					ctx, ruleTextValueMapKeys);

			if (ruleType != null)
				codegen.setRuleInfo(ruleName, ruleType, ruleSynId, originalRule);
			else
				codegen.setRuleInfo(ruleName, ruleSynId, originalRule);

			codegen.generateCode();

			if (ctx.getChildCount() > 0) {
				ruleSetValue.add(codegen.getGeneratedAssignment());
				ruleSetAssignment.add(ctx.getText());

				setRuleMesages(antlrRuleUtil.showRuleInfo(ctx) + "\r\n");
			}
		} catch (DroolsCodeGenerationException e) {
			log.error(e.getMessage());
		}
	}

	public String getRuleMesages() {
		return ruleMesages.toString();
	}

	public void setRuleMesages(String msg) {
		ruleMesages.append(msg + "\r\n");
	}

	public String getErrorMesages() {
		return errorMesages.toString();
	}

	public void setErrorMesages(String msg) {
		errorMesages.append(msg + "\r\n");
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public void setOriginalRule(String rule) {
		this.originalRule = rule;
	}

	public String getOriginalRule() {
		return originalRule;
	}

	public List<String> getRuleSetValue() {
		return ruleSetValue;
	}

	public void setRuleSetValue(List<String> ruleSetValue) {
		this.ruleSetValue = ruleSetValue;
	}

	public void setTuleTextValueMapKeys(
			RuleTextValueMapKeys ruleTextValueMapKeys) {
		this.ruleTextValueMapKeys = ruleTextValueMapKeys;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public String getRuleSynId() {
		return ruleSynId;
	}

}
