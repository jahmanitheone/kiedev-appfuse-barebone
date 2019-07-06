package com.synodex.qcai.antlr4.rulegenerator;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateRuleMajor extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger.getLogger(GenerateRuleMajor.class);

	@Test
	public void generateMajor() {
		try {
			String rulename = "LUMP.Status1";
			String[] synrule = { "IF LUMP = \"True\" AND (LUMP.Biopsy_Status = \"No Biopsy\" OR LUMP.Biopsy_Status = \"Pending Biopsy\") THEN LUMP.DataStatus = \"Major\"" };

			setRule(rulename, synrule);
			generateRule();
			

			Assert.assertTrue(getCode().contains(
					"String lumpBiopsy_Status = sc.getValue(\"LUMP.Biopsy_Status\")"));
			Assert.assertTrue(getCode().contains(
					"log.info(\"LUMP.Biopsy_Status = \" + lumpBiopsy_Status);"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"LUMP\") &&"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(lumpBiopsy_Status,\"No Biopsy\") ||"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(lumpBiopsy_Status,\"Pending Biopsy\")"));

			Assert.assertTrue(getCode().contains(
					"sc.setMajor(true)"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Major\")"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(lumpBiopsy_Status,\"Pending Biopsy\")"));
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	/**
	 * Repost all major rules in DEV to see if rules syntax are ok
	 */
	@Test
	public void testDEVMajorRules() {
		try {
			String[] majorrules = {
					"IF ANEM = \"True\" AND ANEM.ANEM_Severity is Null THEN ANEM.DataStatus = \"Major\"",
					"IF ANEM = \"True\" AND ANEM.ANEM_Severity != \"Mild\" THEN ANEM.DataStatus = \"Major\"",
					"IF BLUM = \"True\" AND (BLUM.Biopsy_Status = \"No Biopsy\" OR BLUM.Biopsy_Status = \"Pending Biopsy\") THEN BLUM.DataStatus = \"Major\"",
					"IF BLUM = \"True\" AND BLUM.Pathology_Result != \"Benign\" THEN BLUM.DataStatus = \"Major\"",
					"IF BLUM = \"True\" AND (BLUM.Biopsy_Status is Null or BLUM.Pathology_Result is Null) THEN BLUM.DataStatus = \"Major\"",
					"IF BNCT = \"True\" AND BNCT.Condition_Status != \"Fully Recovered\" THEN BNCT.DataStatus = \"Major\"",
					"IF CPOL = \"True\" AND (CPOL.Number_High_Grade is Not Null OR CPOL.Number_Low_Grade is Not Null) THEN CPOL.DataStatus = \"Major\"",
					"IF HRN = \"True\" AND HRN.Complications is Not Null THEN HRN.DataStatus = \"Major\"",
					"IF HYDR = \"True\" AND  (DateDiff(\"d\",HYDR.Last_Surgery_Date, IDATE.DataDate) > 365 OR DateDiff(\"d\",HYDR.Diagnosis_Date, IDATE.DataDate) > 365) THEN HYDR.DataStatus = \"Major\"",
					"IF HYDR = \"True\" AND HYDR.Last_Surgery_Date is Null AND HYDR.Diagnosis_Date is Null THEN HYDR.DataStatus = \"Major\"",
					"IF LUMP = \"True\" AND (LUMP.Biopsy_Status = \"No Biopsy\" OR LUMP.Biopsy_Status = \"Pending Biopsy\") THEN LUMP.DataStatus = \"Major\"",
					"IF LUMP = \"True\" AND LUMP.Pathology_Result != \"Benign\" THEN LUMP.DataStatus = \"Major\"",
					"IF LUMP = \"True\" AND (LUMP.Biopsy_Status is Null or LUMP.Pathology_Result is Null) THEN LUMP.DataStatus = \"Major\"",
					"IF MIGR = \"True\" AND (MIGR.Migraine_Frequency = \"Recent onset\" OR MIGR.Migraine_Frequency = \"Increasing in frequency\" OR MIGR.Complications = \"Cerebral infarction\") THEN MIGR.DataStatus = \"Major\"",
					"IF NEVI = \"True\" AND DateDiff(\"d\", NEVI.DataDate, IDATE.DataDate) < 730 AND NEVI.Nevus_Type = \"Dysplastic nevus\" THEN NEVI.DataStatus = \"Major\"",
					"IF PNEU = \"True\" AND DateDiff(\"d\", PNEU.DataDate, IDATE.DataDate) <= 180 THEN PNEU.DataStatus = \"Major\"",
					"IF SARC = \"True\" AND (SARC.Pulmonary_Stage = \"Stage 0\" OR  SARC.Pulmonary_Stage = \"Stage 1\" OR  SARC.Pulmonary_Stage = \"Stage 2\" OR SARC.ATS_Stage = \"Stage 0\" OR SARC.ATS_Stage = \"Stage I\" OR SARC.ATS_Stage = \"Stage II\" OR SARC.ATS_Stage = \"Stage III\") THEN SARC.DataStatus = \"Major\"",
					"IF SLAP = \"True\" AND SLAP.Sleep_Apnea_Type = \"Obstructive sleep apnea\" AND SLAP.OSA_Severity != \"Severe\" THEN SLAP.DataStatus = \"Major\"",
					"IF SLAP = \"True\" AND SLAP.Apnea_Index > 40 THEN SLAP.DataStatus = \"Major\"",
					"IF LIPO1 = \"True\" AND CHL = \"True\" AND CHL.Total_Cholesterol <= 550 AND CHL.Total_Cholesterol > 350 THEN LIPO1.DataStatus = \"Major\"",
					"IF LIPO2 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value > 500 AND TGLY.TGLY_Value <= 1500  AND IsMostRecent(TGLY) THEN LIPO2.DataStatus = \"Major\"",
					"IF LIPO3 = \"True\" AND CHL = \"True\" AND CHL.Total_Cholesterol <= 550 AND CHL.Total_Cholesterol > 350 THEN LIPO3.DataStatus = \"Major\"",
					"IF LIPO3 = \"True\" AND TGLY = \"True\" AND TGLY.TGLY_Value > 500 AND TGLY.TGLY_Value <= 1500  AND IsMostRecent(TGLY) THEN LIPO3.DataStatus = \"Major\"", };

			// log.info("Major rules" + majorrules.length);
			Assert.assertEquals(23, majorrules.length);

			int j = 0;
			for (String rule : majorrules) {
				String rulename = "MajorRule.Rule" + j++;
				String[] synrule = new String[1];
				synrule[0] = rule;

				setRule(rulename, synrule);
				generateRule();

				Assert.assertTrue(getCode().contains(
						"sc.setMajor(true)"));
				Assert.assertTrue(getCode().contains(
						"sc.setDataStatus(\"Major\")"));
			}
			log.info(".");
			log.info("Ran " + j + " rules");
			Assert.assertEquals(23, j);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
