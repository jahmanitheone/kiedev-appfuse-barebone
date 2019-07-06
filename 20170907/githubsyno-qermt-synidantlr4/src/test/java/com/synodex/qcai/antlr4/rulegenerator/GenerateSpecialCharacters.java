package com.synodex.qcai.antlr4.rulegenerator;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateSpecialCharacters extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateSpecialCharacters.class);

	@Test
	public void dashValueInCondition() {
		try {
			String rulename = "AL.Status2";
			String[] synrule = { "IF LL = \"TRUE\" AND LL.Condition_Status = \"Not Achieved Remission\" AND LL.LL_Type = \"Adult T-cell HTLV-1 associated\" THEN LL.ICD10CMCode = \"C91.50\"" };

			setRule(rulename, synrule);
			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llCondition_Status,\"Not Achieved Remission\")"));
			Assert.assertTrue(getCode()
					.contains(
							"isStringEqual(llLL_Type,\"Adult T-cell HTLV-1 associated\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91.50\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void dashValueInAssign() {
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
							"isStringEqual(llLL_Type,\"Adult T-cell HTLV-1 associated\")"));
			Assert.assertTrue(getCode().contains(
					"sc.setCodify(\"ICD10CMCODE\",\"C91 - 50 associated\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
