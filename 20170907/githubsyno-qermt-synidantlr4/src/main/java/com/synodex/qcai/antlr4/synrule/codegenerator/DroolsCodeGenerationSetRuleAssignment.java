package com.synodex.qcai.antlr4.synrule.codegenerator;

import java.util.List;
import org.antlr.v4.runtime.ParserRuleContext;
import org.apache.log4j.Logger;
import com.synodex.qcai.Constants;
import com.synodex.qcai.antlr4.rules.SynRuleParser.RuleAssignmentContext;
import com.synodex.qcai.antlr4.synrule.base.DroolsCodeGeneration;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeys;

public class DroolsCodeGenerationSetRuleAssignment extends
		DroolsCodeGenerationBase implements DroolsCodeGeneration {
	private static final String CODIFY = "CODIFY";
	private static final String GROUPING = "GROUPING";
	private static final String ERROR = "ERROR";
	private static final String GROUP = ".GROUP";
	private static final String VALUE = ".VALUE";
	private static final String CODE = "CODE";
	private static final String ERRORSTATUS = "ERRORSTATUS";
	private static final String NOTIFICATION = "NOTIFICATION";
	private static final String DECLINE = "DECLINE";
	private static final String DECLINEWARNING = "DECLINEWARNING";
	private static final String DATASTATUS = "DATASTATUS";
	private static final String MAJOR = "MAJOR";
	private static final String MINOR = "MINOR";
	private static final String CLASSIFY = "CLASSIFY";
	private static final String POSTPONE = "POSTPONE";
	private final static Logger log = Logger
			.getLogger(DroolsCodeGenerationSetRuleAssignment.class);
	private RuleAssignmentContext ctx;
	private String generatedAssignment;
	private RuleTextValueMapKeys ruleTextValueMapKeys;
	private boolean isRuleDataSetter;

	public DroolsCodeGenerationSetRuleAssignment(ParserRuleContext context,
			RuleTextValueMapKeys keys) throws DroolsCodeGenerationException {
		log.info("Processing: " + getClass().getName());

		if (context == null)
			throw new DroolsCodeGenerationException(
					"ParserContext can not be null");

		this.ctx = (RuleAssignmentContext) context;
		this.ruleTextValueMapKeys = keys;
	}

	public void generateCode() {
		String opermsg = "Generating rule assignments..";

		showStartOfProcessing(opermsg);

		setRuleMesages("\r\n");
		setRuleMesages("RuleAssignment: " + ctx.getText() + "\r\n");

		// Show the context elements
		for (int j = 0; j <= ctx.getChildCount() - 1; j++) {
			setRuleMesages(j + ":-> " + ctx.getChild(j).getText() + "\r\n");
		}

		generatedAssignment = ctx.getText().toUpperCase();
		setRuleMesages("generatedAssignment: " + generatedAssignment + "\r\n");
		setRuleMesages("\r\n");

		log.info("** ruleType: " + ruleType);
		boolean isruletypeprocessed = false;
		if (ruleType != null) {
			String ruletype = ruleType.toUpperCase();
			if (ruletype.equalsIgnoreCase(DATASTATUS)) {
				setRuleMesages("isDataStatus" + "\r\n");
				if (generatedAssignment.contains(DECLINEWARNING)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusWarning();
				} else if (generatedAssignment.contains(DECLINE)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusDecline();
				} else if (generatedAssignment.contains(NOTIFICATION)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusNofication();
				} else if (generatedAssignment.contains(MAJOR)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusMajor();
				} else if (generatedAssignment.contains(MINOR)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusMinor();
				} else if (ruletype.equalsIgnoreCase(ERROR)) {
					isruletypeprocessed = true;
					setAssignmentErrorStatus();
				} else if (generatedAssignment.contains(POSTPONE)) {
					isruletypeprocessed = true;
					setAssignmentDataStatusPostPone();
				} else {
					isruletypeprocessed = true;
					setAssignmentDataStatusPass();
				}
			} else if (ruletype.equalsIgnoreCase(CODIFY)
					|| ruletype.equalsIgnoreCase(CODE)) {
				isruletypeprocessed = true;
				setAssigmentCodify();
			} else if (ruletype.equalsIgnoreCase(CLASSIFY)) {
				// By default classify set DP values - just in case its not set
				isruletypeprocessed = true;
				setRuleDataSetter(true);
				setAssignmentClassify();
			} else if (ruletype.equalsIgnoreCase(GROUPING)) {
				// This is the Critical codes
				isruletypeprocessed = true;
				setAssignmentGroup();
			} else {
				isruletypeprocessed = true;
				setAssignmentValue();
			}
		}

		/**
		 * TODO - At some point we should process by the define ruletype only.
		 * Not by this old method below
		 * <p>
		 * 
		 * If we did not process using ruletype - do our old method
		 */
		log.info("isruletypeprocessed: " + isruletypeprocessed);
		log.info("generatedAssignment: " + generatedAssignment);

		if (!isruletypeprocessed) {
			if (generatedAssignment.contains(DATASTATUS)) {
				setRuleMesages("isDataStatus" + "\r\n");
				if (generatedAssignment.contains(DECLINEWARNING)) {
					setAssignmentDataStatusWarning();
				} else if (generatedAssignment.contains(DECLINE)) {
					setAssignmentDataStatusDecline();
				} else if (generatedAssignment.contains(NOTIFICATION)) {
					setAssignmentDataStatusNofication();
				} else if (generatedAssignment.contains(MAJOR)) {
					setAssignmentDataStatusMajor();
				} else if (generatedAssignment.contains(MINOR)) {
					setAssignmentDataStatusMinor();
				} else if (generatedAssignment.contains(POSTPONE)) {
					setAssignmentDataStatusPostPone();
				} else {
					setAssignmentDataStatusPass();
				}
			} else if (generatedAssignment.contains(ERRORSTATUS)) {
				setAssignmentErrorStatus();
			} else if (generatedAssignment.contains(CODIFY)) {
				isruletypeprocessed = true;
				setAssigmentCodify();
			} else if (generatedAssignment.contains(CODE)) {
				setAssigmentCodify();
			} else if (generatedAssignment.contains(VALUE)) {
				setRuleMesages("isValue" + "\r\n");
				setAssignmentValue();
			} else if (generatedAssignment.contains(CLASSIFY)) {
				// By default classify set DP values - just in case its not set
				setRuleDataSetter(true);
				setAssignmentClassify();
			} else if (generatedAssignment.contains(GROUPING)) {
				setAssignmentGroup();
			} else {
				setAssignmentValue();
			}
		}

		showEndOfProcessing(opermsg);
	}

	private void setAssignmentValue() {
		setRuleMesages("isSetValue" + "\r\n");
		String codetype = getCodeType(generatedAssignment);
		setRuleMesages("codetype: " + codetype);

		String key = ruleTextValueMapKeys.getRuleThenValueKey(0);
		setRuleMesages("key: " + key);
		String value = ruleTextValueMapKeys.getRuleValueText(key);
		setRuleMesages("value: " + value);
		if (value == null) {
			value = getCode(generatedAssignment);
			setRuleMesages("null fix code: " + value + "\r\n");
		}
		String synid = getCodeSynId(generatedAssignment);

		// If datastatus is Code - Pass
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Pass\");\r\n";
		// assignment += Constants.SPACE_EIGHT + "sc.setCodify(true);\r\n";

		generatedAssignment += Constants.SPACE_EIGHT + "sc.setValue(\"" + synid
				+ "\",\"" + codetype + "\",\"" + value + "\");";
	}

	private void setDefault() {
		setRuleMesages("isSetDefault" + "\r\n");
		String codetype = getCodeType(generatedAssignment);
		setRuleMesages("codetype: " + codetype);

		String key = ruleTextValueMapKeys.getRuleThenValueKey(0);
		setRuleMesages("key: " + key);
		String value = ruleTextValueMapKeys.getRuleValueText(key);
		setRuleMesages("value: " + value);
		if (value == null) {
			value = getCode(generatedAssignment);
			setRuleMesages("null fix code: " + value + "\r\n");
		}

		// If datastatus is Code - Pass
		generatedAssignment = "sc.setPass(true);\r\n";
		// assignment += Constants.SPACE_EIGHT + "sc.setCodify(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setValue(\""
				+ codetype + "\",\"" + value + "\");";
	}

	private void setAssigmentCodify() {
		setRuleMesages("isCodify" + "\r\n");
		String codetype = getCodeType(generatedAssignment);
		setRuleMesages("codetype: " + codetype);

		String key = ruleTextValueMapKeys.getRuleThenValueKey(0);
		setRuleMesages("key: " + key);
		String value = ruleTextValueMapKeys.getRuleValueText(key);
		setRuleMesages("value: " + value);
		if (value == null) {
			value = getCode(generatedAssignment);
			setRuleMesages("null fix code: " + value + "\r\n");
		}

		// If datastatus is Code - Pass
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Pass\");\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setCodify(\""
				+ codetype + "\",\"" + value + "\");";
	}

	private void setAssignmentErrorStatus() {
		setRuleMesages("isErrorStatus" + "\r\n");
		// If error status
		generatedAssignment = "sc.setError(true);\r\n";
		generatedAssignment = "sc.setDataStatus(\"Error\");";
	}

	private void setAssignmentDataStatusPass() {
		setRuleMesages("isPass" + "\r\n");
		// remainder is Pass
		generatedAssignment = "sc.setDataStatus(\"Pass\");";
	}

	private void setAssignmentDataStatusWarning() {
		setRuleMesages("isWarning" + "\r\n");
		// If datastatus is Warning
		generatedAssignment = "sc.setDeclineWarning(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Decline Warning\");";
	}

	private void setAssignmentDataStatusNofication() {
		setRuleMesages("isWarning" + "\r\n");
		// If datastatus is Warning
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Notification\");";
	}

	private void setAssignmentDataStatusDecline() {
		setRuleMesages("isDecline" + "\r\n");
		// If datastatus is Decline
		generatedAssignment = "sc.setDecline(true);\r\n";
		generatedAssignment += Constants.SPACE_FOUR + Constants.SPACE_FOUR
				+ "sc.setDataStatus(\"Decline\");";
	}

	private String getCode(String assignment) {
		String fixcode = null;

		try {
			fixcode = assignment;
			int pos = fixcode.indexOf("\"");
			log.info("pos: " + pos);
			if (pos > 0) {
				// Get ICD10 code
				fixcode = fixcode.substring(pos + 1);
				log.info("fixcode: " + fixcode);

				fixcode = fixcode.substring(0, fixcode.length() - 1);
				log.info("fixcode: " + fixcode);

				// Fix the code if no space - antlr removes space - add extra
				// space
				if (!fixcode.contains(" ")) {
					fixcode = fixcode.trim();
					// fixcode = fixcode.substring(0, 15) + " "
					// + fixcode.substring(15);
				}
				log.info("fixcode: " + fixcode);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}

		return fixcode;
	}

	private String getCodeType(String assignment) {
		String fixcodetype = null;

		log.info("getCodeType()");

		try {
			fixcodetype = assignment;
			int pos = fixcodetype.indexOf(".");
			log.info("pos: " + pos);
			if (pos > 0) {
				// Get code: ICD10, ICD9, MIB... or RGACODE
				fixcodetype = fixcodetype.substring(pos + 1);
				log.info("fixcode: " + fixcodetype);

				pos = fixcodetype.indexOf("=");
				log.info("pos: " + pos);
				if (pos > 0) {
					fixcodetype = fixcodetype.substring(0, pos);
					log.info("fixcode: " + fixcodetype);
				}

				log.info("fixcodetype: " + fixcodetype);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}

		return fixcodetype;
	}

	/**
	 * Get the SynId we using to assign value
	 * 
	 * @param assignment
	 * @return
	 */
	private String getCodeSynId(String assignment) {
		String codeSynid = null;

		log.info("getCodeSynId()");
		try {
			codeSynid = assignment;
			int pos = codeSynid.indexOf(".");
			log.info("pos: " + pos);
			if (pos > 0) {
				codeSynid = codeSynid.substring(0, pos);
				log.info("fixcode: " + codeSynid);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}

		return codeSynid;
	}

	public String getGeneratedAssignment() {
		return generatedAssignment;
	}

	private void setAssignmentDataStatusMajor() {
		setRuleMesages("isDataStatusMajor" + "\r\n");
		// If datastatus is Warning
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setMajor(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Major\");";
	}

	private void setAssignmentDataStatusMinor() {
		setRuleMesages("isDataStatusMajor" + "\r\n");
		// If datastatus is Warning
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setMinor(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Minor\");";
	}

	private void setAssignmentDataStatusPostPone() {
		setRuleMesages("isDataStatusPostPone" + "\r\n");
		// If datastatus is Warning
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setPostPone(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Postpone\");";
	}

	public boolean isRuleDataSetter() {
		return isRuleDataSetter;
	}

	public void setRuleDataSetter(boolean isRuleDataSetter) {
		this.isRuleDataSetter = isRuleDataSetter;
	}

	private void setAssignmentClassify() {
		setRuleMesages("isSetValue" + "\r\n");
		log.info("generatedAssignment = " + generatedAssignment);

		String codetype = getCodeType(generatedAssignment);
		log.info("codetype = " + codetype);

		setRuleMesages("codetype: " + codetype);

		String key = ruleTextValueMapKeys.getRuleThenValueKey(0);
		log.info("key = " + key);

		setRuleMesages("key: " + key);
		String value = ruleTextValueMapKeys.getRuleValueText(key);
		log.info("value = " + value);

		setRuleMesages("value: " + value);
		if (value == null) {
			value = getCode(generatedAssignment);
			setRuleMesages("null fix code: " + value + "\r\n");
		}
		String synid = getCodeSynId(generatedAssignment);
		log.info("generatedAssignment = " + generatedAssignment);
		log.info("synid= " + synid);
		String syndprop = synid + "." + codetype;

		// If datastatus is Code - Pass
		generatedAssignment = "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setClassify(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Classify\");\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataPointSetter(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setSynIdDatafieldProperty(\"" + syndprop + "\");\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setValue(\"" + synid
				+ "\",\"" + codetype + "\",\"" + value + "\");";
	}

	private void setAssignmentGroup() {
		setRuleMesages("setAssignmentGroup()" + "\r\n");
		log.debug("generatedAssignment = " + generatedAssignment);

		String codetype = getCodeType(generatedAssignment);
		log.debug("codetype = " + codetype);

		List<String> keys = ruleTextValueMapKeys.getRuleThenValueKeys();
		for (String key : keys) {
			log.debug("  key: " + key);
			log.debug("value: " + ruleTextValueMapKeys.getRuleValueText(key));
		}

		String synid = getCodeSynId(generatedAssignment);
		String value = null;
		String groupname = null;

		StringBuilder grpbld = new StringBuilder();
		log.debug("SynId= " + synid);
		String groupnamekey = ruleTextValueMapKeys.getRuleThenValueKey(0);
		if (groupnamekey != null) {
			groupname = ruleTextValueMapKeys.getRuleValueText(groupnamekey);
			log.debug("GroupName= " + groupname);

			String issupportingkey = ruleTextValueMapKeys
					.getRuleThenValueKey(1);
			boolean issupporting = false;
			if (issupportingkey != null) {
				String supportval = ruleTextValueMapKeys
						.getRuleValueText(issupportingkey);
				log.debug("Supporting= " + supportval);
				issupporting = supportval == null ? false : supportval
						.equalsIgnoreCase("yes") ? true : false;
				log.debug("issupporting = " + issupporting);
			} else
				log.error("isSupporting key was not null!");

			value = groupname;

			grpbld.append("SynIdGroup synidgroup = new SynIdGroup();\n");
			grpbld.append(Constants.SPACE_EIGHT
					+ "synidgroup.setCaseId(sc.getCaseId());\n");
			grpbld.append(Constants.SPACE_EIGHT + "synidgroup.setSynId(\""
					+ synid + "\");\n");
			grpbld.append(Constants.SPACE_EIGHT + "synidgroup.setGroupName(\""
					+ groupname + "\");\n");
			grpbld.append(Constants.SPACE_EIGHT + "synidgroup.setSupporting("
					+ issupporting + ");\n");

			log.debug(".");
			log.debug("\n" + grpbld.toString());
			log.debug(".");
		} else
			log.error("GroupName key was not null!");
		log.debug("\n\n\n\n");

		generatedAssignment = grpbld.toString() + "\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setPass(true);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setSynIdGroup(synidgroup);\r\n";
		generatedAssignment += Constants.SPACE_EIGHT
				+ "sc.setDataStatus(\"Grouping\");\r\n";
		generatedAssignment += Constants.SPACE_EIGHT + "sc.setValue(\"" + synid
				+ "\",\"" + codetype + "\",\"" + value + "\");";
	}

}
