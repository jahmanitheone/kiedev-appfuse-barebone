package com.synodex.qcai.testcases;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidAssignAndCoditionWithBracketTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidAssignRuleWithBracketTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidCoditionWithBracketTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidFromDoughTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidRuleSynIdAssignTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidRuleSynIdDeclarationTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidRuleSynIdDeclarationWithConditionTest;
import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidRuleSynIdDeclarationWithConditionWithBracketTest;

/*
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@RunWith(Suite.class)
@SuiteClasses({ SynRuleValidFromDoughTest.class,
		SynRuleValidRuleSynIdAssignTest.class,
		SynRuleValidRuleSynIdDeclarationTest.class,
		SynRuleValidAssignRuleWithBracketTest.class,
		SynRuleValidRuleSynIdDeclarationWithConditionTest.class,
		SynRuleValidRuleSynIdDeclarationWithConditionWithBracketTest.class,
		SynRuleValidCoditionWithBracketTest.class,
		SynRuleValidAssignRuleWithBracketTest.class,
		SynRuleValidAssignAndCoditionWithBracketTest.class })
public class AllValidSynRule {
}
