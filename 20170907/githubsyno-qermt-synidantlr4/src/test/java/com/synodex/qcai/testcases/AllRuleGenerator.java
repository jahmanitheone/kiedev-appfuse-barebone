package com.synodex.qcai.testcases;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.synodex.qcai.antlr4.rulegenerator.GenerateBrackets;
import com.synodex.qcai.antlr4.rulegenerator.GenerateCodify;
import com.synodex.qcai.antlr4.rulegenerator.GenerateComparisonOperation;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDataStatus;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDateDiff;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDecline;
import com.synodex.qcai.antlr4.rulegenerator.GenerateIsMostRecent;
import com.synodex.qcai.antlr4.rulegenerator.GenerateIsMostRecentALLRule;
import com.synodex.qcai.antlr4.rulegenerator.GenerateIsStringEqualFunction;
import com.synodex.qcai.antlr4.rulegenerator.GenerateJiraFixes;
import com.synodex.qcai.antlr4.rulegenerator.GenerateGroupValue;
import com.synodex.qcai.antlr4.rulegenerator.GenerateMissingQuotes;
import com.synodex.qcai.antlr4.rulegenerator.GenerateMostRecent;
import com.synodex.qcai.antlr4.rulegenerator.GenerateMultipelSynidAssignment;
import com.synodex.qcai.antlr4.rulegenerator.GenerateNotification;
import com.synodex.qcai.antlr4.rulegenerator.GenerateNullNotNull;
import com.synodex.qcai.antlr4.rulegenerator.GenerateNumValue;
import com.synodex.qcai.antlr4.rulegenerator.GenerateNumValueRange;
import com.synodex.qcai.antlr4.rulegenerator.GenerateRuleAssignment;
import com.synodex.qcai.antlr4.rulegenerator.GenerateRuleClassifyTest;
import com.synodex.qcai.antlr4.rulegenerator.GenerateRuleGrouping;
import com.synodex.qcai.antlr4.rulegenerator.GenerateRuleMajor;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSingleQuotes;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSpaceValue;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSpecialCharacters;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSynIdWithSpecialTextValue;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSynidExist;
import com.synodex.qcai.antlr4.rulegenerator.GenerateTestAnyRule;
import com.synodex.qcai.antlr4.synrule.codegenerator.DroolsCodeGenerationBaseTest;

/*
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@RunWith(Suite.class)
@SuiteClasses({ GenerateBrackets.class, GenerateCodify.class,
		GenerateComparisonOperation.class, GenerateDataStatus.class,
		GenerateDateDiff.class, GenerateDecline.class,
		GenerateMissingQuotes.class, GenerateNotification.class,
		GenerateNullNotNull.class, GenerateRuleAssignment.class,
		GenerateSingleQuotes.class, GenerateSpaceValue.class,
		GenerateSpecialCharacters.class, GenerateSynidExist.class,
		GenerateSynIdWithSpecialTextValue.class, GenerateTestAnyRule.class,
		GenerateMultipelSynidAssignment.class, GenerateGroupValue.class,
		GenerateJiraFixes.class, GenerateNumValue.class,
		GenerateNumValueRange.class, GenerateIsStringEqualFunction.class,
		DroolsCodeGenerationBaseTest.class, GenerateRuleMajor.class,
		GenerateRuleClassifyTest.class, GenerateRuleGrouping.class,
		GenerateIsMostRecent.class, GenerateIsMostRecentALLRule.class,
		GenerateMostRecent.class })
public class AllRuleGenerator {
}
