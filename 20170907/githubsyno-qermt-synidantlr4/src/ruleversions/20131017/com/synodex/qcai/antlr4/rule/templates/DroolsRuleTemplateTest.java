package com.synodex.qcai.antlr4.rule.templates;

import java.io.InputStream;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;

import com.synodex.qcai.antlr4.rule.base.Template;
import com.synodex.qcai.antlr4.rule.templates.DroolsRuleTemplate;
import com.synodex.qcai.antlr4.rule.templates.TemplateException;

public class DroolsRuleTemplateTest {
	private final Logger log = Logger.getLogger(DroolsRuleTemplateTest.class);

	@Test
	public void droolsRuleTemplate() {
		String file = "C:/dev/workspaceantlrnew/synodex-ruletest02/src/main/antlr4/droolstemplate/droolsrule.drl";
		try {
			Template templateutil = new DroolsRuleTemplate(file);

			InputStream is = templateutil.getInputStream();
			Assert.assertNotNull(is);

			String content = templateutil.getContent();
			Assert.assertNotNull(content);
			log.info(content);
		} catch (TemplateException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
