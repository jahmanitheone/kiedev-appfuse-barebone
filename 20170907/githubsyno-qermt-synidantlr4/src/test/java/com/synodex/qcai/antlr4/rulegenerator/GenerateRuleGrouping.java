package com.synodex.qcai.antlr4.rulegenerator;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;
import com.synodex.qcai.antlr4.synrule.base.BaseRuleTemplateGeneratorTest;

public class GenerateRuleGrouping extends BaseRuleTemplateGeneratorTest {
	private final static Logger log = Logger
			.getLogger(GenerateRuleGrouping.class);

	@Test
	public void ruleHYDRGroupSupportYes() {
		try {
			String rulename = "HYDR.Group1";
			String[] synrule = { "IF HYDR = \"True\" THEN HYDR.Disease_Group = \"Brain & CNS\" AND HYDR.Is_Supporting_Data = \"yES\"" };

			String ruletype = "Grouping";
			boolean isDataSetter = true;
			setRule(rulename, ruletype, synrule, isDataSetter);

			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"HYDR\")"));
			Assert.assertTrue(getCode().contains(
					"SynIdGroup synidgroup = new SynIdGroup();"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setCaseId(sc.getCaseId());"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSynId(\"HYDR\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setGroupName(\"Brain & CNS\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSupporting(true);"));

			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setSynIdGroup(synidgroup);"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Grouping\");"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"HYDR\",\"DISEASE_GROUP\",\"Brain & CNS\");"));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleHYDRGroupSupportNo() {
		try {
			String rulename = "HYDR.Group1";
			String[] synrule = { "IF HYDR = \"True\" THEN HYDR.Disease_Group = \"Brain & CNS\" AND HYDR.Is_Supporting_Data = \"no\"" };

			String ruletype = "Grouping";
			boolean isDataSetter = true;
			setRule(rulename, ruletype, synrule, isDataSetter);

			generateRule();

			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"HYDR\")"));
			Assert.assertTrue(getCode().contains(
					"SynIdGroup synidgroup = new SynIdGroup();"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setCaseId(sc.getCaseId());"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSynId(\"HYDR\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setGroupName(\"Brain & CNS\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSupporting(false);"));

			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setSynIdGroup(synidgroup);"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Grouping\");"));
			Assert.assertTrue(getCode().contains(
					"sc.setValue(\"HYDR\",\"DISEASE_GROUP\",\"Brain & CNS\");"));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleXRAY4GroupSupportYes() {
		try {
			String rulename = "XRAY4.Group";
			String[] synrule = { "IF XRAY4 = \"True\" AND XRAY4.Imaging_Reason = \"Suspected Neoplasm\" THEN XRAY4.Disease_Group = \"Maligant Neoplasms\" AND XRAY4.Is_Supporting_Data = \"Yes\"" };

			String ruletype = "Grouping";
			boolean isDataSetter = true;
			setRule(rulename, ruletype, synrule, isDataSetter);

			generateRule();

			Assert.assertTrue(getCode()
					.contains(
							"String xray4Imaging_Reason = sc.getValue(\"XRAY4.Imaging_Reason\");"));
			Assert.assertTrue(getCode()
					.contains(
							"log.info(\"XRAY4.Imaging_Reason = \" + xray4Imaging_Reason);"));
			Assert.assertTrue(getCode().contains(
					"isStringEqual(sc.getSynId(), \"XRAY4\")"));
			Assert.assertTrue(getCode().contains(
					"SynIdGroup synidgroup = new SynIdGroup();"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setCaseId(sc.getCaseId());"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSynId(\"XRAY4\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setGroupName(\"Maligant Neoplasms\");"));
			Assert.assertTrue(getCode().contains(
					"synidgroup.setSupporting(true);"));

			Assert.assertTrue(getCode().contains("sc.setPass(true);"));
			Assert.assertTrue(getCode().contains(
					"sc.setSynIdGroup(synidgroup);"));
			Assert.assertTrue(getCode().contains(
					"sc.setDataStatus(\"Grouping\");"));
			Assert.assertTrue(getCode()
					.contains(
							"sc.setValue(\"XRAY4\",\"DISEASE_GROUP\",\"Maligant Neoplasms\");"));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void testDEVGroupingRules() {
		try {
			String[] groupingrules = {
					"IF ACE = \"True\" AND SARC = \"True\" THEN ACE.Disease_Group = \"Sarcoidosis\" AND ACE.Is_Supporting_Data = \"Yes\"",
					"IF ALT = \"True\" AND SARC = \"True\" THEN ALT.Disease_Group = \"Sarcoidosis\" AND ALT.Is_Supporting_Data = \"Yes\"",
					"IF ANEM = \"True\" THEN ANEM.Disease_Group = \"Anemia\" AND ANEM.Is_Supporting_Data = \"No\"",
					"IF AST = \"True\" AND SARC = \"True\" THEN AST.Disease_Group = \"Sarcoidosis\" AND AST.Is_Supporting_Data = \"Yes\"",
					"IF BLUM = \"True\" THEN BLUM.Disease_Group = \"Breast Disorders\" AND BLUM.Is_Supporting_Data = \"No\"",
					"IF BMI = \"True\" THEN BMI.Disease_Group = \"Lipoprotein Metabolism\" AND BMI.Is_Supporting_Data = \"Yes\"",
					"IF BNCT = \"True\" THEN BNCT.DIsease_Group = \"Benign Neoplasms\" AND BNCT.Is_Supporting_Data = \"No\"",
					"IF CHDL = \"True\" THEN CHDL.Disease_Group = \"Lipoprotein Metabolism\" AND CHDL.Is_Supporting_Data = \"Yes\"",
					"IF CHL = \"True\" THEN CHL.Disease_Group = \"Lipoprotein Metabolism\" AND CHL.Is_Supporting_Data = \"Yes\"",
					"IF CPOL = \"True\" THEN CPOL.Disease_Group = \"Colorectal Disease\" AND CPOL.Is_Supporting_Date = \"No\"",
					"IF CT1 = \"True\" AND HYDR = \"True\" THEN CT1.Disease_Group = \"Brain & CNS\" AND CT1.Is_Supporting_Data = \"Yes\"",
					"IF CTA1 = \"True\" AND HYDR = \"True\" THEN CTA1.DIsease_Group = \"Brain & CNS\" AND CTA1.Is_Supporting_Data = \"Yes\"",
					"IF EGFR = \"True\" AND SARC = \"True\" THEN EGFR.Disease_Group = \"Sarcoidosis\" AND EGFR.Is_Supporting_Data = \"Yes\"",
					"IF FH_MELA = \"True\" THEN FH_MELA.Disease_Group = \"Malignant Neoplams\" AND FH_MELA.Is_Supporting_Data = \"Yes\"",
					"IF FH_SARC = \"True\" THEN FH_SARC.Disease_Group = \"Sarcoidosis\" AND FH_SARC.Is_Supporting_Data = \"Yes\"",
					"IF HCT = \"True\" AND ANEM = \"True\" THEN HCT.Disease_Group = \"Anemia\" AND HCT.Is_Supporting_Data = \"Yes\"",
					"IF HDAC = \"True\" THEN HDAC.Disease_Group = \"Head & Neck\" AND HDAC.Is_Supporting_Data = \"Yes\"",
					"IF HDAC = \"True\" THEN HDAC.Disease_Group = \"Brain & CNS\" AND HDAC.Is_Supporting_Data = \"Yes\"",
					"IF HDL = \"True\" THEN HDL.Disease_Group = \"Lipoprotein Metabolism\" AND HDL.Is_Supporting_Data = \"Yes\"",
					"IF HGB = \"True\" AND ANEM = \"True\" THEN HGB.Disease_Group = \"Anemia\" AND HGB.Is_Supporting_Data = \"Yes\"",
					"IF HRN = \"True\" THEN HRN.Disease_Group = \"Digestive System\" AND HRN.Is_Supporting_Data = \"No\"",
					"IF HYDR = \"True\" THEN HYDR.Disease_Group = \"Brain & CNS\" AND HYDR.Is_Supporting_Data = \"No\"",
					"IF LDL = \"True\" THEN LDL.Disease_Group = \"Lipoprotein Metabolism\" AND LDL.Is_Supporting_Data = \"Yes\"",
					"IF LUMP = \"True\" THEN LUMP.Disease_Group = \"Skin Disorders\" AND LUMP.Is_Supporting_Data = \"No\"",
					"IF MIGR = \"True\" THEN MIGR.Disease_Group = \"Brain & CNS\" AND MIGR.Is_Supporting_Data = \"No\"",
					"IF MRI1 = \"True\" AND HYDR = \"True\" THEN MRI1.Disease_Group = \"Brain & CNS\" AND MRI1.Is_Supporting_Data = \"Yes\"",
					"IF MRP = \"True\" AND MRP.Physician_Type = \"Neurosurgeon\" THEN MRP.Disease_Group = \"Brain & CNS\" AND MRP.Is_Supporting_Data = \"Yes\"",
					"IF NCT = \"True\" AND NCT.Noncompliance_Type = \"CPAP or Breathing Device\" THEN NCT.Disease_Group = \"Sleep Disorders\" AND NC.Is_Supporting_Data = \"Yes\"",
					"IF NCT = \"True\" AND NCT.Noncompliance_Type = \"CPAP or Breathing Device\" THEN NCT.Disease_Group = \"Respiratory Disorders\"  AND NCT.Is_Supporting_Data = \"Yes\"",
					"IF NEVI = \"True\" THEN NEVI.Disease_Group = \"Skin Disorders\" AND NEVI.Is_Supporting_Data = \"No\"",
					"IF PATH = \"True\" AND (PATH.Examination_Result = \"Normal\" OR PATH.Examination_Result = \"Abnormal Benign\"  OR PATH.Examination_Result = \"Benign\") THEN PATH.Disease_Group = \"Benign Neoplasms\" AND PATH.Is_Supporting_Data = \"Yes\"",
					"IF PATH = \"True\" AND PATH.Examination_Result != \"Normal\" AND PATH.Examination_Result != \"Abnormal Benign\"  AND PATH.Examination_Result != \"Benign\" THEN PATH.Disease_Group = \"Malignant Neoplasms\" AND PATH.Is_Supporting_Data = \"Yes\"",
					"IF PNEU = \"True\" THEN PNEU.Disease_Group = \"Respiratory Disorders\" AND PNEU.Is_Supporting_Data = \"No\"",
					"IF SARC = \"True\" THEN SARC.Disease_Group = \"Sarcoidosis\" AND SARC.Is_Supporting_Data = \"No\"",
					"IF SLAP = \"True\" THEN SLAP.Disease_Group = \"Sleep Disorders\" AND SLAP.Is_Supporting_Data = \"No\"",
					"IF SYNP263 = \"True\" AND LIPO1 = \"True\" THEN SYNP263.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP263.Is_Supporting_Data = \"Yes\"",
					"IF SYNP263 = \"True\" AND LIPO2 = \"True\" THEN SYNP263.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP263.Is_Supporting_Data = \"Yes\"",
					"IF SYNP263 = \"True\" AND LIPO3 = \"True\" THEN SYNP263.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP263.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3078 = \"True\" AND SARC = \"True\" THEN SYNP3078.Disease_Group = \"Sarcoidosis\" AND SYNP3078.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3273 = \"True\" AND LIPO1 = \"True\" THEN SYNP3273.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3273.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3273 = \"True\" AND LIPO2 = \"True\" THEN SYNP3273.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3273.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3273 = \"True\" AND LIPO3 = \"True\" THEN SYNP3273.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3273.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3325 = \"True\" AND LIPO1 = \"True\" THEN SYNP3325.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3325.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3325 = \"True\" AND LIPO2 = \"True\" THEN SYNP3325.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3325.Is_Supporting_Data = \"Yes\"",
					"IF SYNP3325 = \"True\" AND LIPO3 = \"True\" THEN SYNP3325.Disease_Group = \"Lipoprotein Metabolism\" AND SYNP3325.Is_Supporting_Data = \"Yes\"",
					"IF SYNP4809 = \"True\" AND MIGR = \"True\" THEN SYNP4809.Disease_Group = \"Brain & CNS\" AND SYN4809.Is_Supporting_Data = \"Yes\"",
					"IF TGLY = \"True\" AND LIPO3 = \"True\" THEN TGLY.Disease_Group = \"Lipoprotein Metabolism\" AND TGLY.Is_Supporting_Data = \"Yes\"",
					"IF TGLY = \"True\" AND LIPO2 = \"True\" THEN TGLY.Disease_Group = \"Lipoprotein Metabolism\" AND TGLY.Is_Supporting_Data = \"Yes\"",
					"IF TGLY = \"True\" AND LIPO1 = \"True\" THEN TGLY.Disease_Group = \"Lipoprotein Metabolism\" AND TGLY.Is_Supporting_Data = \"Yes\"",
					"IF VERT = \"True\" THEN VERT.Disease_Group = \"Brain & CNS\" AND VERT.Is_Supporting_Data = \"Yes\"",
					"IF VITD = \"True\" AND SARC = \"True\" THEN VITD.Disease_Group = \"Sarcoidosis\" AND VITD.Is_Supporting_Data = \"Yes\"",
					"IF VLDL = \"True\" THEN VLDL.Disease_Group = \"Lipoprotein Metabolism\" AND VLDL.Is_Supporting_Data = \"Yes\"",
					"IF WEIGHT = \"True\" THEN WEIGHT.Disease_Group = \"Lipoprotein Metabolism\" AND WEIGHT.Is_Supporting_Data = \"Yes\"",
					"IF XRAY1 = \"True\" THEN XRAY1.Disease_Group = \"Respiratory Disorders\" AND XRAY1.Is_Supporting_Data = \"Yes\"",
					"IF XRAY1 = \"True\" THEN XRAY1.Disease_Group = \"Cardiovascular Disease\" AND XRAY1.Is_Supporting_Data = \"Yes\"",
					"IF XRAY1 = \"True\" AND SARC = \"True\" THEN XRAY1.Disease_Group = \"Sarcoidosis\" AND XRAY1.Is_Supporting_Data = \"Yes\"",
					"IF XRAY3 = \"True\" THEN XRAY3.Disease_Group = \"Bones\" AND XRAY3.Is_Supporting_Data = \"Yes\"",
					"IF XRAY4 = \"True\" THEN XRAY4.Disease_Group = \"Bones\" AND XRAY4.Is_Supporting_Data = \"Yes\"",
					"IF ALT = \"True\" THEN ALT.Disease_Group = \"Liver Disease\" AND ALT.Is_Supporting_Data = \"Yes\"",
					"IF AST = \"True\"THEN AST.Disease_Group = \"Liver Disease\" AND AST.Is_Supporting_Data = \"Yes\"",
					"IF BDH = \"True\" THEN BDH.Disease_Group = \"Breast Disorders\" AND BDH.Is_Supporting_Data = \"No\"",
					"IF BDH = \"True\" THEN BDH.Disease_Group = \"Benign Neoplasms\" AND BDH.Is_Supporting_Data = \"No\"",
					"IF A1C = \"True\" THEN A1C.Disease_Group = \"Diabetes\" AND A1C.Is_Supporting_Data = \"Yes\"",
					"IF AD = \"True\" THEN AD.Disease_Group = \"Dementia\" AND AD.Is_Supporting_Data = \"No\"",
					"IF AH = \"True\" THEN AH.Disease_Group = \"Liver Disease\" AND AH.Is_Supporting_Data = \"No\"",
					"IF AH = \"True\" THEN AH.Disease_Group = \"Alcohol & Substance Use\" AND AH.Is_Supporting_Data = \"No\"",
					"IF ALB = \"True\" THEN ALB.Disease_Group = \"Liver Disease\" AND ALB.Is_Supporting_Data = \"Yes\"",
					"IF ALB = \"True\" THEN ALB.Disease_Group = \"Alcohol & Substance Use\" AND ALB.Is_Supporting_Data = \"Yes\"",
					"IF ALC2 = \"True\" THEN ALC2.Disease_Group = \"Alcohol & Substance Use\" AND ALC2.Is_Supporting_Data = \"No\"",
					"IF ALCA = \"True\" THEN ALCA.Disease_Group = \"Alcohol & Substance Use\" AND ALCA.Is_Supporting_Data = \"No\"",
					"IF ALCC = \"True\" THEN ALCC.Disease_Group = \"Alcohol & Substance Use\" AND ALCC.Is_Supporting_Data = \"No\"",
					"IF ALCD = \"True\" THEN ALCD.Disease_Group = \"Alcohol & Substance Use\" AND ALCD.Is_Supporting_Data = \"No\"",
					"IF ALCP = \"True\" THEN ALCP.Disease_Group = \"Alcohol & Substance Use\" AND ALCP.Is_Supporting_Data = \"No\"",
					"IF ALCR = \"True\" THEN ALCR.Disease_Group = \"Alcohol & Substance Use\" AND ALCR.Is_Supporting_Data = \"No\"",
					"IF ALCX = \"True\" THEN ALCX.Disease_Group = \"Alcohol & Substance Use\" AND ALCX.Is_Supporting_Data = \"No\"",
					"IF ALCY = \"True\" THEN ALCY.Disease_Group = \"Alcohol & Substance Use\" AND ALCY.Is_Supporting_Data = \"No\"",
					"IF ALP = \"True\" THEN ALP.Disease_Group = \"Liver Disease\" AND ALP.Is_Supporting_Data = \"Yes\"",
					"IF BPN = \"True\" THEN BPN.Disease_Group = \"Breast Disorders\" AND BPN.Is_Supporting_Data = \"No\"",
					"IF CAD = \"True\" THEN CAD.Disease_Group = \"Cardiovascular Disease\" AND CAD.Is_Supporting_Data = \"No\"",
					"IF CHF = \"True\" THEN CHF.Disease_Group = \"Cardiovascular Disease\" AND CHF.Is_Supporting_Data = \"No\"",
					"IF COLO = \"True\" THEN COLO.Disease_Group = \"Colorectal Disease\" AND COLO.Is_Supporting_Data = \"Yes\"",
					"IF COPD = \"True\" THEN COPD.Disease_Group = \"Respiratory Disorders\" AND COPD.Is_Supporting_Data = \"No\"",
					"IF CRA = \"True\" THEN CRA.Disease_Group = \"Non-Medical Risk\" AND CRA.Is_Supporting_Data = \"No\"",
					"IF DEL = \"True\" THEN DEL.Disease_Group = \"Mental & Behavioral Disorders\" AND DEL.Is_Supporting_Data = \"No\"",
					"IF DUI = \"True\" THEN DUI.Disease_Group = \"Non-Medical Risk\" AND DUI.Is_Supporting_Data = \"No\"",
					"IF DUI = \"True\" THEN DUI.Disease_Group = \"Alcohol & Substance Use\" AND DUI.Is_Supporting_Data = \"No\"",
					"IF FH_MELA = \"True\" THEN FH_MELA.Disease_Group = \"Family History\" AND FH_MELA.Is_Supporting_Data = \"No\"",
					"IF  FH_SARC = \"True\" THEN  FH_SARC.Disease_Group = \"Family History\" AND  FH_SARC.Is_Supporting_Data = \"No\"",
					"IF LIPO1 = \"True\" THEN LIPO1.Disease_Group = \"Lipoprotein Metabolism\" AND.LIPO1.Is_Supporting_Data = \"No\"",
					"IF LIPO2 = \"True\" THEN LIPO2.Disease_Group = \"Lipoprotein Metabolism\" AND.LIPO2.Is_Supporting_Data = \"No\"",
					"IF LIPO3 = \"True\" THEN LIPO3.Disease_Group = \"Lipoprotein Metabolism\" AND.LIPO3.Is_Supporting_Data = \"No\"",
					"IF PN = \"True\" THEN PN.Disease_Group = \"Peripheral Nervous System\" AND PN.Is_Supporting_Data = \"No\"",
					"IF PN = \"True\" THEN PN.Disease_Group = \"Diabetes\" AND PN.Is_Supporting_Data = \"No\"",
					"IF PN = \"True\" THEN PN.Disease_Group = \"Cardiovascular\" AND PN.Is_Supporting_Data = \"No\"",
					"IF SPCP = \"True\" THEN SPCP.Disease_Group = \"Colorectal Disease\" AND SPCP.Is_Supporting_Data = \"Yes\"",
					"IF STIS = \"True\" THEN STIS.Disease_Group = \"Skin Disorders\" AND STIS.Is_Supporting_Data = \"Yes\"",
					"IF SUBT = \"True\" THEN SUBT.Disease_Group = \"Alcohol & Substance Use\" AND SUBT.Is_Supporting_Data = \"No\"",
					"IF ULTRA1 = \"True\" THEN ULTRA1.Disease_Group = \"Breast Disorders\" AND ULTRA1.Is_Supporting_Data = \"Yes\"",
					"IF XRAY2 = \"True\" THEN XRAY2.Disease_Group = \"Breast Disorders\" AND XRAY2.Is_Supporting_Data = \"Yes\"",
					"IF XRAY4 = \"True\" AND XRAY4.Imaging_Reason = \"Suspected Neoplasm\" THEN XRAY4.Disease_Group = \"Benign Neoplasms\" AND XRAY4.Is_Supporting_Data = \"Yes\"",
					"IF XRAY4 = \"True\" AND XRAY4.Imaging_Reason = \"Suspected Neoplasm\" THEN XRAY4.Disease_Group = \"Maligant Neoplasms\" AND XRAY4.Is_Supporting_Data = \"Yes\"",
					"IF A1C = \"True\" THEN A1C.Disease_Group = \"Cardiovascular Disease\" AND A1C.Is_Supporting_Data = \"Yes\"",
					"IF ALCY = \"True\" THEN ALCY.Disease_Group = \"Alcohol & Substance Use\" AND ALCY.Is_Supporting_Data = \"No\"",
					"IF ALRD = \"True\" THEN ALRD.Disease_Group = \"Alchohol & Substance Use\" AND ALRD.Is_Supporting_Data = \"No\"",
					"IF AST = \"True\"THEN AST.Disease_Group = \"Alcohol & Substance Use\" AND AST.Is_Supporting_Data = \"Yes\"",
					"IF AUT = \"True\" THEN AUT.Disease_Group = \"Developmental Disorders\" AND AUT.Is_Supporting_Data = \"No\"",
					"IF BRD = \"True\" THEN BRD.Disease_Group = \"Liver Disease\" AND BRD.Is_Supporting_Data = \"Yes\"",
					"IF BRD = \"True\" THEN BRD.Disease_Group = \"Alcohol & Substance Use\" AND BRD.Is_Supporting_Data = \"Yes\"",
					"IF BRT = \"True\" THEN BRT.Disease_Group = \"Liver Disease\" AND BRT.Is_Supporting_Data = \"Yes\"",
					"IF BRT = \"True\" THEN BRT.Disease_Group = \"Alcohol & Substance Use\" AND BRT.Is_Supporting_Data = \"Yes\"",
					"IF ETOH = \"True\" THEN ETOH.Disease_Group = \"Alcohol & Substance Use\" AND ETOH.Is_Supporting_Data = \"No\"",
					"IF SUBC = \"True\" THEN SUBC.Disease_Group = \"Alcohol & Substance Use\" AND SUBC.Is_Supporting_Data = \"No\"" };
			log.info("Grouping rules" + groupingrules.length);
			Assert.assertEquals(112, groupingrules.length);

			int j = 0;
			for (String rule : groupingrules) {
				String rulename = "GRP.rule" + j++;
				String ruletype = "Grouping";
				boolean isDataSetter = true;
				String[] synrule = new String[1];
				synrule[0] = rule;

				setRule(rulename, ruletype, synrule, isDataSetter);

				generateRule();

				Assert.assertTrue(getCode().contains(
						"SynIdGroup synidgroup = new SynIdGroup();"));
				Assert.assertTrue(getCode().contains(
						"synidgroup.setCaseId(sc.getCaseId());"));

				Assert.assertTrue(getCode().contains("sc.setPass(true);"));
				Assert.assertTrue(getCode().contains(
						"sc.setSynIdGroup(synidgroup);"));
				Assert.assertTrue(getCode().contains(
						"sc.setDataStatus(\"Grouping\");"));
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleFH_MELASupport() {
		try {
			String rulename = "FH_MELA.Group";
			String[] synrule = { "IF FH_MELA = \"True\" THEN FH_MELA.Disease_Group = \"Malignant Neoplams\" AND FH_MELA.Is_Supporting_Data = \"Yes\"" };

			String ruletype = "Grouping";
			boolean isDataSetter = true;
			setRule(rulename, ruletype, synrule, isDataSetter);

			generateRule();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void ruleLIPO2Support() {
		try {
			String rulename = "LIPO2.Group";
			String[] synrule = { "IF LIPO2 = \"True\" THEN LIPO2.Disease_Group = \"Lipoprotein Metabolism\" AND.LIPO2.Is_Supporting_Data = \"No\"" };

			String ruletype = "Grouping";
			boolean isDataSetter = true;
			setRule(rulename, ruletype, synrule, isDataSetter);

			generateRule();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			Assert.fail(e.getMessage());
		}
	}

}
