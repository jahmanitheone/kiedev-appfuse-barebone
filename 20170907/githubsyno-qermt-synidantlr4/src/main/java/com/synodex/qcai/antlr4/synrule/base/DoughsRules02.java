package com.synodex.qcai.antlr4.synrule.base;

import java.util.ArrayList;
import java.util.List;

public class DoughsRules02 {
	private final static List<String> rulelist = new ArrayList<String>();

	static {
		setList();
	}

	public static List<String> getList() {
		return rulelist;
	}

	public static String getRule(int pos) {
		return rulelist.get(pos);
	}

	private static void setList() {
		//1
		rulelist.add("IF A1C.Value > 11.0 AND DateDiff(\"d\", A1C.Date, IDATE.Date) <= 91 THEN A1C.DataStatus = \"Decline\"");
		rulelist.add("IF A1CA.Value > 11.0 AND (DB1 = \"True\" OR DB2 = \"True\") AND DateDiff(\"d\", A1C.Date, IDATE.Date) <= 91 THEN A1CA.DataStatus = \"Decline\"");
		rulelist.add("IF (DB1 = \"True\" OR DB2 = \"True\") AND A1CA.Value > 10% THEN A1CA.DataStatus = \"Decline\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Unspecified\" THEN AD.Code = \"ICD-10-CM-2013 G30.9\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Early Onset\" AND AD.Type2 = \"Behavioral Disturbance\" THEN AD.Code = \"ICD-10-CM-2013 G30.0\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Late Onset\" THEN AD.Type2 = \"Behavioral Disturbance\" THEN AD.Code = \"ICD-10-CM-2013 G30.1\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 <> \"Early Onset\" AND AD.Type1 <> \"Late Onset\"AND AD.Type2 = \"Behavioral Disturbance\" THEN AD.Code = \"ICD-10-CM-2013 G30.8\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1  is Null AND AD.Type2 is Null THEN AD.Code = \"ICD-10-CM-2013 G30.9\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Unspecified\" AND AD.Type2 = \"Behavioral Disturbance\" THEN AD.Code = \"ICD-10-CM-2013 G30.9\"");
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Early Onset\" AND AD.Type is Null THEN AD.Code = \"ICD-10-CM-2013 G30.0\"");
		//10
		rulelist.add("IF AD = \"True\" AND AD.Type1 = \"Late Onset\" AND AD.Type is Null THEN AD.Code = \"ICD-10-CM-2013 G30.1\"");
		rulelist.add("IF AD.DiagnosisDate is Not Null AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) <= 365 THEN AD.MIBDateCode = \"N\"");
		rulelist.add("IF AD.DiagnosisDate is Null AND DateDiff(\"d\", IDATE.Date, AD.Date) <= 365 THEN AD.MIBDateCode = \"N\"");
		rulelist.add("IF AD.DiagnosisDate is Not Null AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) > 365 AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) <= 730 THEN AD.MIBDateCode = \"B\"");
		rulelist.add("IF AD.DiagnosisDate is Null AND DateDiff(\"d\", IDATE.Date, AD.Date) > 365 AND  DateDiff(\"d\", IDATE.Date, AD.Date) <= 730 THEN AD.MIBDateCode = \"B\"");
		rulelist.add("IF AD.DiagnosisDate is Not Null AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) > 730 AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) <= 1826 THEN AD.MIBDateCode = \"C\"");
		rulelist.add("IF AD.DiagnosisDate is Null AND DateDiff(\"d\", IDATE.Date, AD.Date) > 730 AND  DateDiff(\"d\", IDATE.Date, AD.Date) <= 1826 THEN AD.MIBDateCode = \"C\"");
		rulelist.add("IF AD.DiagnosisDate is Not Null AND DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) > 1826 AND  DateDiff(\"d\", IDATE.Date, AD.DiagnosisDate) <= 3652 THEN AD.MIBDateCode = \"D\"");
		rulelist.add("IF AD.DiagnosisDate is Null AND DateDiff(\"d\", IDATE.Date, AD.Date) <= 1826 AND DateDiff(\"d\", IDATE.Date, AD.Date) <= 3652 THEN AD.MIBDateCode = \"D\"");
		rulelist.add("IF AD = \"True\" THEN AD.DataStatus = \"Decline\"");
		//20
		rulelist.add("IF ADL = \"True\" AND Age.Value >= 65 AND ADL.ActivitiesLost is not Null THEN ADL.DataStatus = \"Decline\"");
		rulelist.add("IF AH = \"True\" AND DateDiff (\"d\",AH.DiagnosisDate, IDATE.Date) <= 365 OR DateDiff(\"d\",AH.LastTreatmentDate, IDATE.Date) < 365) THEN AH.DataStatus = \"Decline\"");
		rulelist.add("IF AL = \"True\" THEN AL.DataStatus = 'Decline\"");
		rulelist.add("IF ALB.Value < 3.1 AND ALB.Unit=g/dL AND(DateDiff(\"d\", ALB.Date, IDATE.Date) <= 365) THEN ALB.DataStatus = \"Decline\"");
		rulelist.add("IF ALC.Status = \"Current Use of Alcohol\" AND (ALC1.Status = \"Current Treatment\" OR ALC1.Status = \"Previous Treatment\") THEN ALC.DataStatus = \"Decline\"");
		rulelist.add("IF ALC1.Status = \"Current Treatment\" THEN ALC1.DataStatus = \"Decline\"");
		rulelist.add("IF ALC1 = \"True\" AND ALC1.Status = \"Treatment last 2 years\" THEN ALC1.DataStatus = \"Decline\"");
		rulelist.add("IF ALC2 = \"True\" AND ALC2.Status = \"Current Medication\" AND ALC2.Medication is not Null THEN ALC2.DataStatus = 'Decline\"");
		rulelist.add("IF ALC2 = \"True\" AND ALC2.Status = \"Current Medication\" AND ALC2.Medication is Null THEN ALC2.DataStatus = 'Warning\"");
		//30
		rulelist.add("IF ALL = \"True\" THEN ALL.DataStatus = 'Decline\"");
		rulelist.add("IF ALP.Value > (5 * ALP.UpperLimit) AND DateDiff (\"d\",ALP.Date, IDATE.Date) <= 365 THEN ALP.DataStatus = \"Decline\"");
		rulelist.add("IF ALT.Value > (5 * ALT.UpperLimit)  AND DateDiff (\"d\",ALT.Date, IDATE.Date) <= 365  THEN ALT.DataStatus = \"Decline\"");
		rulelist.add("IF AML = \"True\" THEN AML.DataStatus = 'Decline\"");
		rulelist.add("IF ANG = \"True\" AND ANG.Status = \"Worsening\" THEN ANG.DataStatus = \"Decline\"");
		rulelist.add("IF ASM = \"True\" AND (ASM.Type = \"Severe\" OR ASM.Type = \"Severe Persistent\") AND ASM.Treatment = \"Treatment Noncompliance\" THEN ASM.DataStatus = \"Decline\"");
		rulelist.add("IF ASM = \"True\"  AND(ASM.LifeThreateningEvent = \"Unable to Breath\" OR ASM.LifeThreateningEvent = \"Resuscitation\") AND DateDiff(\"d\",ASM.LifeThreateningEventDate, IDATE.Date) <= 730 THEN ASM.DataStatus = \"Decline\"");
		rulelist.add("IF AST.Value > (5 * AST.UpperLimit) AND DateDiff (\"d\",AST.Date, IDATE.Date) <= 365  THEN AST.DataStatus = \"Decline\"");
		rulelist.add("IF AUT = \"True\" AND ASP = \"False\" THEN AUT.DataStatus = \"Decline\"");
		rulelist.add("IF AVM = \"True\" AND AVM.Status = \"No surgery\" THEN AVM.DataStatus = \"Decline\"");
		//30
		rulelist.add("IF BC = \"True\" and (BC.Stage = \"Stage III\" OR BC.Stage = \"Stage IIIA\" OR BC.Stage = \"Stage IIIB\" OR BC.Stage = \"Stage IIIC\" OR BC.Stage = \"Stage IV\") AND  DateDiff(\"d\", IDATE.Date, BC.InitialTreatment Date) < 3652 THEN BC.DataStatus = \"Decline\"");
		rulelist.add("IF BC = \"True\" and (BC.Stage = \"Stage III\" OR BC.Stage = \"Stage IIIA\" OR BC.Stage = \"Stage IIIB\" OR BC.Stage = \"Stage IIIC\" OR BC.Stage = \"Stage IV\") AND  DateDiff(\"d\", IDATE.Date, BC.LastRelapse Date) < 5478 THEN BC.DataStatus = \"Decline\"");
		rulelist.add("IF BMI.Value >= 50 AND BMI.Value <= 59.9 AND Age >= 21 THEN BMICode.Code = \"ICD-10-CM-2013 Z68.43\"");
		rulelist.add("IF BMI.Value  > 40 AND Age >= 21 THEN BMIGroup.Group = \"Obese Class III - Very severely obese\"");
		rulelist.add("IF BMI.Value > 55  AND DateDiff(\"d\", IDATE.Date, BMI.Date) <= 365 THEN BMI.DataStatus = \"Decline\"");
		rulelist.add("IF BMI.Value >= 50 THEN BMI.DataStatus = \"Decline\"");
		rulelist.add("IF BNB = \"True\" AND (BNB.Type = \"Meningioma\" OR BNB.Type = \"Meningioma with sarcomatous change\") THEN BNB.DataStatus = \"Decline\"");
		rulelist.add("IF BNB = \"True\" AND DateDiff(\"d\", IDATE.Date, BNB.InitialTreatmentDate) <= 1826 THEN BNB.DataStatus = \"Decline\"");
		rulelist.add("IF BNB = \"True\" AND (BNB.OtherFactors = \"Incomplete Removal\" OR  BNB.OtherFactors = \"Severe Neurological Impairment\") THEN BNB.DataStatus = \"Decline\"");
		rulelist.add("IF BNB = \"True\" AND BNB.Status = \"In Relapse\" THEN BNB.DataStatus = \"Decline\"");
		//40
		rulelist.add("IF BNB = \"True\" AND (BNB.TumorType = \"Pineocytoma\" OR BNB.TumorType = \"Astrocytoma Grade 2\" OR BNB.TumorType = \"\"Astrocytoma Grade 3\" OR BNB.TumorType = \"Astrocytoma Grade 4\" OR BNB.TumorType = \"Ependymoma\" ) THEN BNB.DataStatus = \"Decline\"");
		rulelist.add("IF BRD.Value > (5 * BRD.UpperLimit) AND DateDiff(\"d\", IDATE.Date, BRD.Date) <= 365 THEN BRD.DataStatus = \"Decline\"");
		rulelist.add("IF BRT.Value > (5 * BRT.UpperLimit) AND DateDiff(\"d\", IDATE.Date, BRT.Date) <= 365 THEN BRT.DataStatus = \"Decline\"");
		rulelist.add("IF CA = \"True\" AND (CA.Size > 1.9 AND CA.Unit = \"cm\") OR (CA.Size > 19 AND CA.Unit = \"mm\") OR (CA.Size > .748031 AND CA.Unit = \"in\")  THEN CA.DataStatus= \"Decline\"");
		rulelist.add("IF CAA = \"True\" AND CAA.Status = \"No surgery\" THEN CAA.DataStatus = \"Decline\"");
		rulelist.add("IF CAD = \"True\" AND Age.Value < 40 AND CAD.NumberOfVessels >=1 THEN CAD.DataStatus = \"Decline\"");
		rulelist.add("IF CAD = \"True\" AND CAD.NumberOfVessels >=3  AND (CAD.Status = \"Untreated\" OR CAD.Status = \"Other\" CAD.Status = \"Unknown\") THEN CAD.DataStatus = \"Decline\"");
		rulelist.add("IF CC = \"True\" AND  (CC.DukeStage = \"C2\" OR CC.DukeStage = \"D\") AND DateDiff(\"d\", IDATE.Date,CC.DukeStageDate ) <= 3652 THEN CC.DataStatus = \"Decline\"");
		rulelist.add("IF CC = \"True\" AND  (TNM.Stage = \"N1\" OR TNM.Stage = \"N2\" OR TNM.Stage = \"N3\" OR TNM.Stage = \"M1a\" OR TNM.Stage = \"M1b\" OR TNM.Stage = \"M1c\" AND DateDiff(\"d\", IDATE.Date,CC.TNMStageDate ) <= 3652 THEN CC.DataStatus = \"Decline\"");
		rulelist.add("IF CHF = \"True\" THEN CHF.DataStatus = \"Decline\"");
		//50
		rulelist.add("IF CHF = \"True\" AND (CHF.Status = \"Chronic\" OR CHF.Status = \"Recurrent\") THEN CHF.DataStatus = \"Decline\"");
		rulelist.add("IF CKD = \"True\" AND CKD.Status = \"Chronic\" AND CKD.eGFR < 40 THEN CKD.DataStatus = \"Decline\"");
		rulelist.add("IF COPD = \"True\" AND COPD.OxygenStatus = \"Home Oxygen Use\" THEN COPD.DataStatus = 'Decline\"");
		rulelist.add("IF COPD = \"True\" AND COPD.SmokingStatus = \"Current Smoker\" AND (COPD.LastFEV1 < 40% OR COPD.LastFVC < 50%) THEN COPD.DataStatus = \"Decline\"");
		rulelist.add("IF COPD = \"True\" AND COPD.SmokingStatus = \"Non-smoker\" AND (COPD.LastFEV1 < 50% OR COPD.LastFVC < 60%) THEN COPD.DataStatus = \"Decline\"");
		rulelist.add("IF  CRA = \"True\" AND CRA.Activity Is Not Null THEN CRA.DataStatus = \"Decline\"");
		rulelist.add("IF CSA = \"True\" AND (CSA.Status = \"Current Condition\" OR CSA.Status = \"Unknown\") THEN CSA.DataStatus = \"Decline\"");
		rulelist.add("IF CSA = \"True\" AND (CSA.Status = \"Past Condition\"  THEN CSA.DataStatus = \"Warning\"");
		rulelist.add("IF CVA = \"True\" AND  DateDiff(\"d\",CVA.FirstEventDate, IDATE.Date) <= 365 OR DateDiff(\"d\",CVA.LastEventDate, IDATE.Date) <= 365) THEN CVA.DataStatus = \"Decline\"");
		rulelist.add("IF CVA = \"True\" AND CVA.History = \"Multiple CVA\"  THEN CVA.DataStaus = \"Decline\"");
		//60
		rulelist.add("IF CVA = \"True\" AND CVA.History <> \"Multiple CVA\" AND CVA.FirstEventDate is Null AND CVA.LastEventDate is Null THEN CVA.DataStatus =\"Warning\"");
		rulelist.add("IF CVA = \"True\" AND (CVA.Complications = \"Severe Neurological Impairment\" OR CVA.NIHSSScale > 15) THEN CVA.DataStatus = \"Decline\"");
		rulelist.add("IF DB1 = \"True\" AND DB1.LastHospitalizationDate = \"True\" AND DateDiff(\"d\",DB1.LastHospitalizationDate, IDATE.Date) < 365 AND DB1.Complications = \"True\" THEN DB1.DataStatus = \"Decline\"");
		rulelist.add("IF DB2 = \"True\" AND DB2.LastHospitalizationDate = \"True\" AND DateDiff(\"d\",DB2.LastHospitalizationDate, IDATE.Date) < 365 AND DB2.Complications = \"True\" THEN DB2.DataStatus = \"Decline\"");
		rulelist.add("IF DEM = \"True\" AND( DateDiff(\"d\",DEM.LastTreatmentDate, IDATE.Date) < 365 OR DateDiff(\"d\",DEM.DiagnosistDate, IDATE.Date) < 365)  THEN DEM.DataStatus = \"Decline\"");
		rulelist.add("IF EF.EjectionFraction < 35% AND DateDiff(\"d\",EF.Date, IDATE.Date) <=730 AND EF.Ventricle <> RV THEN EF.DataStatus = \"Decline\"");
		rulelist.add("IF EF.EjectionFraction < 35% AND DateDiff(\"d\",EF.Date, IDATE.Date) <= 730 THEN EF.WarningStatus = \"Warning\"");
		rulelist.add("IF EF.EjectionFraction < 35% AND DateDiff(\"d\",EF.Date, IDATE.Date) <= 730 AND EF.Ventricle = RV THEN EF.WarningStatus = \"Warning\"");
		rulelist.add("IF EF.EjectionFraction < 40% AND EF.Status =\"Last EF reading\" AND EF.Ventricle <> RV THEN EF.DataStatus = \"Decline\"");
		rulelist.add("IF EF.EjectionFraction < 40% AND EF.Status = \"Older EF reading\" AND EF.Ventricle <> RV THEN EF.DataStatus = \"Warning\"");
		//70
		rulelist.add("IF EPL = \"True\" AND EPL.Status = \"Status Epilepticus\" THEN EPL.DataStatus = \"Decline\"");
		rulelist.add("IF ETOH.Status = \"Current Treatment\" AND  (DateDiff (\"d\",ETOH.BeginTreatmentDate, IDATE.Date) <= 365 OR  DateDiff (\"d\",ETOH.EndTreatmentDate, IDATE.Date) <= 365) THEN ETOH.DataStatus = \"Decline\"");
		rulelist.add("IF FALL =\"True\" AND Age.Value >= 65 THEN FALL.DataStatus = \"Decline\"");
		rulelist.add("IF GGT.Value > (5 * GGT.UpperLimit) AND DateDiff(\"d\",GGT.Date, IDATE.Date) <= 365 THEN GGT.DataStatus = \"Decline\"");
		rulelist.add("IF HD = \"True\" THEN HD.DataStatus = \"Decline\"");
		rulelist.add("IF HEPB = \"True\" AND ALT.Value > (3 * ALT.UpperLimit) THEN HEPB.DataStatus = \"Decline\"");
		rulelist.add("IF HEPB = \"True\" AND AST.Value > (3 * AST.UpperLimit) THEN HEPB.DataStatus = \"Decline\"");
		rulelist.add("IF HEPB = \"True\" AND HEPB.Complications = \"Cirrhosis\" THEN HEPB.DataStatus = \"Decline\"");
		rulelist.add("IF HEPB = \"True\" AND HEPB.Complications = \"Biopsy with Severe Hepatitis\" THEN HEPB.DataStatus = \"Decline\"");
		rulelist.add("IF HEPB = \"True\" AND HEPB.Complications = \"Biopsy with Severe Fibrosis\" THEN HEPB.DataStatus = \"Decline\"");
		//80
		rulelist.add("IF HEPB = \"True\" AND HEPB.Complications = \"Current Heavy Alcohol Use\" THEN HEPB.DataStatus = \"Decline\"");		
		rulelist.add("IF HEPC = \"True\" AND ALT.Value > (3 * ALT.UpperLimit) THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HEPC = \"True\" AND AST.Value > (3 * AST.UpperLimit) THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HEPC = \"True\" AND HEPC.Complications = \"Cirrhosis\" THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HEPC = \"True\" AND HEPC.Complications = \"Biopsy with Severe Hepatitis\" THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HEPC = \"True\" AND HEPC.Complications = \"Biopsy with Severe Fibrosis\" THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HEPC = \"True\" AND HEPC.Complications = \"Current Heavy Alcohol Use\" THEN HEPC.DataStatus = \"Decline\"");
		rulelist.add("IF HL = \"True\" AND (HL.Stage = \"Stage III\" OR HL.Stage = \"Stage IV\") AND DateDiff(\"d\",HL.InitialTreatmentDate, IDATE.Date) <= 1826 THEN HL.DataStatus = \"Decline\"");
		rulelist.add("IF HL = \"True\" AND (HL.Stage = \"Stage III\" OR HL.Stage = \"Stage IV\") AND DateDiff(\"d\",HL.LastRelapseDate, IDATE.Date) <= 3652 THEN HL.DataStatus = \"Decline\"");
		rulelist.add("IF HL = \"True\" AND (HL.Stage = \"Stage III\" OR HL.Stage = \"Stage IV\") AND DateDiff(\"d\",HL.LastTransplantDate, IDATE.Date) <= 3652 THEN HL.DataStatus = \"Decline\"");
		//90
		rulelist.add("IF HTN = \"True\" AND (BP.Systolic > 200 OR BP.Diastolic > 120) AND HTN.Type <> \"Stress Test\" AND DateDiff(\"d\",BP.Date, IDATE.Date) <= 365 THEN HTN.DataStatus = \"Decline\"");
		rulelist.add("IF IAC = \"True\" THEN IAC.DataStatus  = \"Decline\"");
		rulelist.add("IF IADL = \"True\" AND  (IADL.LastIADLScore < 22 OR IADL.AOTAList is not Null) THEN IADL.DataStatus = \"True\"");
		rulelist.add("IF ICD = \"True\"  THEN ICD.Status = \"Decline\"");
		rulelist.add("IF ICH = \"True\" AND (ICH.Status = \"Multiple Episodes\" OR ICH.Status = \"Chronic\") THEN ICH.DataStatus = \"Decline\"");
		rulelist.add("IF ICH = \"True\" AND ICH.Complications = \"Severe Neurological Impairment\" THEN ICH.DataStatus = \"Decline\"");
		rulelist.add("IF LMD = \"True\" AND (LMD.Status = \"Untreated\" OR LMD.Status = \"Other\" LMD.Status = \"Unknown\") AND LMD.Narrowing > 40% THEN LMD.DataStatus = \"Decline\"");
		rulelist.add("IF LMD = \"True\" AND  LMD.Narrowing > 40% THEN LMD.DataStatus = \"Decline\"");
		rulelist.add("IF LMD = \"True\" AND (LMD.Status = \"Untreated\" OR LMD.Status = \"Other\" LMD.Status = \"Unknown\") THEN LMD.DataStatus = \"Decline\"");
		rulelist.add("IF MEL = \"True\" AND (MEL.Status = \"Multiple\" OR MEL.Status = \"Recurring\") THEN MEL.DataStatus = \"Decline\"");
		//100
		rulelist.add("IF MEL = \"True\" AND MEL.Status = \"Unknown\" THEN MEL.DataStatus = \"Warning\"");
		rulelist.add("IF MEL = \"True\" AND (MEL.Stage = \"Stage III\" OR MELTNM.Stage = \"N1\" OR MELTNM.Stage = \"N2\" OR MELTNM.Stage = \"N3\") AND DateDiff(\"d\",MEL.FirstTreatmentDate , IDATE.Date) < 3652 THEN MEL.DataStatus = \"Decline\"");
		rulelist.add("IF MEL = \"True\" AND (MEL.Stage = \"Stage IV\" OR MELTNM.Stage = \"M1a\" OR MELTNM.Stage = \"M1b\" OR MELTNM.Stage = \"M1c\") THEN MEL.DataStatus = \"Decline\"");
		rulelist.add("IF MNB = \"True\" AND MNB.Type = \"Meningioma with Sarcomatous Change\" THEN  MNB.DataStatus = \"Decline\"");
		rulelist.add("IF MNB = \"True\" AND DateDiff(\"d\", IDATE.Date, MNB.InitialTreatmentDate) <= 1826 THEN MNB.DataStatus = \"Decline\"");
		rulelist.add("IF MNB = \"True\" AND (MNB.OtherFactors = \"Incomplete Removal\" OR  MNB.OtherFactors = \"Severe Neurological Impairment\") THEN MNB.DataStatus = \"Decline\"");
		rulelist.add("IF MNB = \"True\" AND MNB.Status = \"In Relapse\" THEN BNB.DataStatus = \"Decline\"");
		rulelist.add("IF MNB = \"True\" AND MNB.TumorType is Not Null THEN  MNB.DataStatus = \"Decline\"");
		rulelist.add("IF MS = \"True\" AND (MS.OtherFactors = \"Severe functional limitation\" OR MS.OtherFactors = \"Pulmonary Problems\") THEN MS.DataStatus = \"Decline\"");
		rulelist.add("IF MS = \"True\" AND (MS.OtherFactors = \"Clinical Cerebellar/Brain Stem Manifestation\" THEN MS.DataStatus = \"Decline\"");
		//110
		rulelist.add("IF MYE = \"True\" AND MYE.Status = \"Chronic\" AND DateDiff(\"d\",MYE.LastTransplantDate, IDATE.Date) <= 3652 THEN MYE.DataStatus = \"Decline\"");
		rulelist.add("IF MYE = \"True\" AND MYE.Status = \"Chronic\" AND DateDiff(\"d\",MYE.LastTreatmentDate, IDATE.Date) <= 3652 THEN MYE.DataStatus = \"Decline\"");
		rulelist.add("IF NAOH = \"True\" AND Age.Value >= 65 THEN NAOH.DataStatus = \"Decline\"");
		rulelist.add("IF NHL = \"True\" AND (NHL.Stage = \"Stage III\" OR NHL.Stage = \"Stage IV\") ) AND DateDiff(\"d\",NHL.InitialTreatmentDate, IDATE.Date) <= 1826 THEN NHL.DataStatus = \"Decline\"");
		rulelist.add("IF NHL = \"True\" AND (NHL.Stage = \"Stage III\" OR NHL.Stage = \"Stage IV\") AND DateDiff(\"d\",NHL.LastRelapseDate, IDATE.Date) <= 3652 THEN NHL.DataStatus = \"Decline\"");
		rulelist.add("IF NHL = \"True\" AND (NHL.Stage = \"Stage III\" OR NHL.Stage = \"Stage IV\") AND DateDiff(\"d\",NHL.LastTransplantDate, IDATE.Date) <= 3652 THEN NHL.DataStatus = \"Decline\"");
		rulelist.add("IF NS = \"True\" AND (PRO.Value > 1500 OR PCR.Value > 150) THEN NS.DataStatus = \"Decline\"");
		rulelist.add("IF PAN = \"True\" AND DateDiff(\"d\",PAN.DiagnosisDate, IDATE.Date) <= 365 OR DateDiff(\"d\",PAN.LastTreatmentDate, IDATE.Date) < 365) THEN PAN.DataStatus = \"Decline\"");
		rulelist.add("IF PAN = \"True\" AND PAN.DiagnosisDate is Null AND PAN.LastTreatment is Null THEN PAN.DataStatus = \"Warning\"");
		rulelist.add("IF PC = \"True\" AND (PC.Stage = \"Stage IV\" OR PC.TNMStage = \"M1a\" OR  PC.TNMStage = \"M1b\" OR  PC.TNMStage = \"M1c\") THEN PC.DataStatus = \"Decline\"");
		//120
		rulelist.add("IF PFF = \"True\" AND PFF.Treatment = \"Oxygen Required\" THEN PFF.DataStatus = \"Decline\"");
		rulelist.add("IF PH = 'True\" AND (PH.Treatment = \"Oxygen Required\" OR PH.Treatment = \"Intravenous Medications\") THEN PH.DataStatus = \"Decline\"");
		rulelist.add("IF PML = \"True\" THEN PML.DataStatus = 'Decline\"");
		rulelist.add("IF PSA.Value > 10 AND PSA.Unit = \"ng/mL\" THEN PSA.DataStatus = \"Decline\"");
		rulelist.add("IF SA = \"True\" AND DateDiff(\"d\",SA.LastAttemptDate, IDATE.Date) <= 730 THEN SA.DataStatus = \"Decline\"");
		rulelist.add("IF SA = \"True\" AND DateDiff(\"d\",SA.LastAttemptDate, IDATE.Date) <= 365 THEN SA.DataStatus = \"Decline\"");
		rulelist.add("IF SA = \"True\" AND SA.NumberAttempts = \"2+ in last 2 years\" THEN SA.DataStatus = \"Decline\"");
		rulelist.add("REMOVEDw");
		rulelist.add("IF SUB2.Status = \"Current Treatment\" AND (DateDiff(\"d\",SUB2.Date, IDATE.Date) <= 365 OR DateDiff(\"d\",SUB2.BeginTreatmentDate, IDATE.Date) <= 365 OR DateDiff(\"d\",SUB2.EndTreatmentDate, IDATE.Date) <= 365)THEN  SUB2.DataStatus = \"Decline\"");
		rulelist.add("IF SUB3= \"True\" AND DateDiff(\"d\",SUB3.RelapseDate, IDATE.Date) <= 1826    THEN SUB3.DataStatus = \"Decline\"");
		//130
		rulelist.add("IF SUB4= \"True\" AND DateDiff(\"d\",SUB4.Date, IDATE.Date) <= 1095 THEN SUB4.DataStatus = \"Decline\"");
		rulelist.add("IF SZP = \"True\" AND SZP.Status= \"Current Condition\" and (DateDiff(\"d\",SZP.HospitalDate, IDATE.Date) <= 1826 OR  DateDiff(\"d\",SZP.PsychosisDate, IDATE.Date) <= 1826) THEN SZP.DataStatus = \"Decline\"");
		rulelist.add("IF VF = \"True\" AND VF.Status = \"Current Condition\" THEN VF.DataStatus = \"Decline\"");
		rulelist.add("IF VT = \"True\" AND VT.Status = \"Current Condition\" THEN VT.DataStatus = \"Decline\"");
		rulelist.add("IF (WL.LastWeight - WL.PreviousWeight) / WL.LastWeight) < 10% THEN WL.ErrorStatus = \"Error1\"");
		rulelist.add("IF DateDiff(\"d\",WL.RecentDate, IDATE.Date) >= 365 THEN WL.ErrorStatus = \"Error2\"");
		rulelist.add("IF WL = \"True\" AND DateDiff(\"d\", IDATE.Date, WL.Date)  <= 365  THEN WL.DataStatus = \"Decline\"");
	}

}