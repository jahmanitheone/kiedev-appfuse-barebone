package com.synodex.qermt.tool.main;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class MainTest {
	private final static Logger log = Logger.getLogger(MainTest.class);

	@Test
	public void applicationStarterWithNoArguments() {
		String[] args = null;
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void applicationStarterWithNullExcelFile() {
		String[] args = {};
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void applicationStarterWithExcelFile() {
		String[] args = { "WF3RulesXLSX.xlsx" };
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void applicationStarterWithBaseDirAndExcelFileSwapped() {
		String[] args = { "WF3RulesXLSX.xlsx",
				"C:/dev/workspaceqermttool/synodex-qermt-tool/ruledir/" };
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void applicationStarterWithBaseDirAndExcelFile() {
		String[] args = {
				"C:/dev/workspaceqermttool/synodex-qermt-tool/",
				"WF3RulesXLSX.xlsx" };
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void getRunMain() {
		String[] args = {
				"C:/dev/workspaceqermttool/synodex-qermt-tool/",
				"WF3RulesMunichFromRichard.xlsx" };
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

	@Test
	public void getRunMainForTest() {
		String[] args = {
				"C:/dev/workspaceqermttool/synodex-qermt-tool/",
				"WF3RulesMunichFromRichard.xlsx", "aa", "bb" };
	
		try {
			Main.main(args);
		} catch (Exception e) {
			log.error(e.getMessage());
			Assert.assertTrue(e.getMessage().contains(
					"Arguments where not defined"));
		}
	}

}
