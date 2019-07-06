package com.synodex.qcai.testcases;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.synodex.qcai.antlr4.rulegenerator.GenerateRulesToFix;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInValidRuleSynIdDeclarationTest;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInValidSynIdPropertyTest;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInvalidConditionTest;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInvalidIFTest;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInvalidSynIdTest;
import com.synodex.qcai.antlr4.synrule.invalid.SynRuleInvalidTHENTest;

/*
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@RunWith(Suite.class)
@SuiteClasses({ SynRuleInvalidConditionTest.class, SynRuleInvalidIFTest.class,
		SynRuleInValidRuleSynIdDeclarationTest.class,
		SynRuleInValidSynIdPropertyTest.class, SynRuleInvalidSynIdTest.class,
		SynRuleInvalidTHENTest.class, GenerateRulesToFix.class })
public class AllInValidSynRule {
}
//