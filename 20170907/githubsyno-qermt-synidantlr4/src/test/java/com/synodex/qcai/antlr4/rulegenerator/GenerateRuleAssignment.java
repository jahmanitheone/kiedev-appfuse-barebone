package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateRuleAssignment extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateRuleAssignment.class);

	@Test
	public void codifyRuleAssigment() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF AD = \"True\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"CODE\",\"ICD-10-CM-2013 G30.1\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void icd10Codify() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND LL.Condition_Status = \"Not Achieved Remission\" AND LL.LL_Type = \"Adult T-cell HTLV-1 associated\" THEN LL.ICD10CMCode = \"C91 - 50 associated\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llCondition_Status,\"Not Achieved Remission\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llCondition_Status,\"Not Achieved Remission\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91 - 50 associated\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void declineDataStatusRuleAssignment() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF HD = \"True\" THEN HD.DataStatus = \"Decline\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode().contains("sc.setDecline(true)"));
			Assert.assertTrue(getCode().contains("sc.setDataStatus"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
