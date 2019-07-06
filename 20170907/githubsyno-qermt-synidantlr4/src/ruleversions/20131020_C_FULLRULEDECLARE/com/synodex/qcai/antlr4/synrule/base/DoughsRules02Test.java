package com.synodex.qcai.antlr4.synrule.base;

import static org.junit.Assert.*;

import java.util.List;

import junit.framework.Assert;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.synodex.qcai.antlr4.synrule.valid.SynRuleValidFromDoughTest;

public class DoughsRules02Test {
	private final static Logger log = Logger
			.getLogger(SynRuleValidFromDoughTest.class);

	@Test
	public void getRuleList() {
		List<String> list = DoughsRules02.getList();
		Assert.assertNotNull(list);
		Assert.assertTrue(list.size()>0);
		
		log.info("List size: " + list.size());
	}

	@Test
	public void getRule4() {
		String doughsrule = DoughsRules02.getRule(4);
		Assert.assertNotNull(doughsrule);

		log.info(doughsrule);
	}

}
