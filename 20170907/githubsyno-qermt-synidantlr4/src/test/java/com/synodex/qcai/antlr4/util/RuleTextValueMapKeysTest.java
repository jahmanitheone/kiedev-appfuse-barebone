package com.synodex.qcai.antlr4.util;

import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.BeforeClass;
import org.junit.Test;

public class RuleTextValueMapKeysTest {
	private final static Logger log = Logger
			.getLogger(RuleTextValueMapKeys.class);
	private static String rulename;
	private static String[] rule;

	@BeforeClass
	public static void setUp() {
		setTestRule();
	}

	private static String[] setTestRule() {
		// String[] synrule = {
		// "IF AL = \"True\" THEN A1L.DataStatus = 'Decline\"" };
		// setRuleName("AL.Status1");

		// String[] synrule = {
		// "IF AL = \"True\" AND A1C.Value > 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = 'Decline\""
		// };
		// setRuleName("AL.Status1");

		// String[] synrule = {
		// "IF AD = \"True\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };
		// setRuleName("AD.Status2");

		// String[] synrule = {
		// "IF AD = \"True\" AND AD.Value > 11.0 THEN AD.Code = \"ICD-10-CM-2013 G30.1\""
		// };
		// setRuleName("AD.Status2");

		// String[] synrule = {
		// "IF AD = \"True\" AND AD.Value= \"Headeache\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\""
		// };
		// String rulename = "AD.Status2";

		// String[] synrule = {
		// "IF AL = \"True xx\" THEN A1L.HiV_TyPeE = \"Decline Now\"" };
		// String[] synrule = {
		// "IF AL = \"True\" THEN A1L.HiV_TyPeE = \"Decline\"" };
		// setRuleName("AL.Status1");

		// String[] synrule = {
		// "IF (HIV = \"TRUE\") AND HIV.HIV_Type = \"HTLV Type 1\"  THEN HIV.ICD10CMCode = \"B97.33\""
		// };
		// String[] synrule = {
		// "IF HIV = \"TRUE\" AND HIV.HIV_Type = \"HTLV Type 1\"  THEN HIV.ICD10CMCode = \"B97.33\""
		// };

		//String[] synrule = { "IF ANAC = \"TRUE\" AND ANAC.Other_Factors = \"Both Anus and Anal Canal\" AND ANAC.Cancer_Type = \"Carcinoma in situ\" THEN ANAC.ICD9CMCode = \"230.9\"" };
		
		String[] synrule = { "IF AL = 'True\' AND A1C.Value >= 11.0 AND DateDiff( \"d\", A1C.Date, IDATE.Date) <= 91 THEN A1L.DataStatus = \'Decline\"" };		

		setRuleName("AL.Status1", synrule);

		return synrule;
	}

	private static void setRuleName(String name, String[] synrule) {
		rulename = name;
		rule = synrule;
	}

	@Test
	public void getIfConditionText() {
		String tmprule = rule[0].trim();

		try {
			RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(
					tmprule);

			for(int j=0; j<tokenTextValue.getRuleIfConditionKeys().size(); j++) {
				String key = tokenTextValue.getRuleIfConditionKeys(j);
				log.info(j + ": " + key);
				log.info("   " + tokenTextValue.getIfConditionText(key));
			}
			
			//log.info("..");
			//log.info(tokenTextValue.getIfConditionText("Truexx"));
		} catch (RuleTextValueMapKeysException e) {
			log.error(e.getMessage());
			Assert.assertNotNull("Rule is invalid");
		}
	}

	@Test
	public void getRuleValueText() {
		String tmprule = rule[0].trim();

		try {
			RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(
					tmprule);

			for(int j=0; j<tokenTextValue.getRuleThenValueKeys().size(); j++) {
				String key = tokenTextValue.getRuleThenValueKey(j);
				log.info(j + ": " + key);
				log.info("   " + tokenTextValue.getRuleValueText(key));
			}

			//log.info("..");
			//log.info(tokenTextValue.getRuleValueText("Decline"));
		} catch (RuleTextValueMapKeysException e) {
			log.error(e.getMessage());
			Assert.assertNotNull("Rule is invalid");
		}
	}

	@Test
	public void getRuleTextValues() {
		String tmprule = rule[0].trim();
		String texvalues = "";

		try {
			RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(
					tmprule);

			log.info(".......................");
			List<String> tvalues = tokenTextValue.getRuleThenValueKeys();
			for (String val : tvalues)
				texvalues += val + ", ";

			log.info("Texvalues: " + texvalues);

		} catch (RuleTextValueMapKeysException e) {
			log.error(e.getMessage());
			Assert.assertNotNull("Rule is invalid");
		}
	}

	@Test
	public void getRuleIfConditionKeys() {
		String tmprule = rule[0].trim();
		String texvalues = "";

		try {
			RuleTextValueMapKeys tokenTextValue = new RuleTextValueMapKeys(
					tmprule);

			log.info(".......................");
			List<String> tvalues = tokenTextValue.getRuleIfConditionKeys();
			for (String val : tvalues)
				texvalues += val + ", ";

			log.info("Condition Values: " + texvalues);

		} catch (RuleTextValueMapKeysException e) {
			log.error(e.getMessage());
			Assert.assertNotNull("Rule is invalid");
		}
	}

}
