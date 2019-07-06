package com.synodex.qcai.testcases;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.synodex.qcai.antlr4.rule.templates.DroolsRuleTemplateTest;
import com.synodex.qcai.antlr4.rulegenerator.GenerateCodify;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDataStatus;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDateDiff;
import com.synodex.qcai.antlr4.rulegenerator.GenerateDecline;
import com.synodex.qcai.antlr4.rulegenerator.GenerateSpaceValue;

/*
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@RunWith(Suite.class)
@SuiteClasses({ DroolsRuleTemplateTest.class })
public class AllTemplate {
}
