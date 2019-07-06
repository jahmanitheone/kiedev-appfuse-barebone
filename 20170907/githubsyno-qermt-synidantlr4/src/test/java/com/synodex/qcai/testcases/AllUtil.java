package com.synodex.qcai.testcases;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;
import com.synodex.qcai.antlr4.synrule.base.DoughsRules02Test;
import com.synodex.qcai.antlr4.util.RuleTextValueMapKeysTest;

/*
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
@RunWith(Suite.class)
@SuiteClasses({ RuleTextValueMapKeysTest.class, DoughsRules02Test.class })
public class AllUtil {
}
