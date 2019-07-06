package com.synodex.qcai.antlr4.synrule.codegenerator;

import junit.framework.Assert;

import org.apache.log4j.Logger;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class DroolsCodeGenerationBaseTest {
	private final static Logger log = Logger
			.getLogger(DroolsCodeGenerationBaseTest.class);
	private static DroolsCodeGenerationBase droolscodegenerationbase;

	@BeforeClass
	public static void setUp() {
		droolscodegenerationbase = new DroolsCodeGenerationBase();
	}

	@AfterClass
	public static void tearDown() {
		droolscodegenerationbase = null;
	}

	@Test
	public void getSynIdAsVar() {
		String synid = "ANAC.Stage_Group";
		droolscodegenerationbase.getRuleSynid();
		
		String synvar = droolscodegenerationbase.getSynIdAsVar(synid);
		Assert.assertEquals("anacStage_Group", synvar);
	}

}
