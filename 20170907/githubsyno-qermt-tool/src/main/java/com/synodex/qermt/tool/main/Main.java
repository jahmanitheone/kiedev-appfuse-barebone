package com.synodex.qermt.tool.main;

import java.util.List;

import org.apache.log4j.Logger;

import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.qermt.tool.exception.QERMTToolException;

/**
 * Main class called to start the QeRMT (QCAI Engine Rules Management Tool)
 * 
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
public class Main {
	private final static Logger log = Logger.getLogger(Main.class);
	private static QERMTTool qermttool;

	/**
	 * @param arguments
	 *            :<br>
	 *            #1: base direcory;<br>
	 *            #2: excel file to run<br>
	 */
	public static void main(String[] args) throws Exception {
		try {
			if (args != null && args.length > 0) {
				String basedir = null;
				String excelfile = null;

				log.info("args.length: " + args.length);

				if (args.length == 1) {
					excelfile = args[0];
					log.info("excelfile: " + excelfile);
					try {
						qermttool = new QERMTTool(excelfile);
						process();
					} catch (QERMTToolException e) {
						log.error(e.getMessage());
						throw new QERMTToolException(e.getMessage());
					}
				} else if (args.length == 2 || args.length == 3) {
					basedir = args[0];
					excelfile = args[1];
					log.info("basedir: " + basedir);
					log.info("excelfile: " + excelfile);

					try {
						qermttool = new QERMTTool(basedir, excelfile);
						if (args.length >= 3) {
							try {
								if (args[2] != null)
									qermttool
											.setShowWF3RulesBeanList(Boolean
													.parseBoolean(args[2]
															.toLowerCase()));
							} catch (Exception e) {
								throw new Exception(e.getMessage());
							}
						}
						process();
					} catch (QERMTToolException e) {
						log.error(e.getMessage());
						throw new QERMTToolException(e.getMessage());
					}
				} else if (args.length == 4) {
					basedir = args[0];
					excelfile = args[1];
					log.info("basedir: " + basedir);
					log.info("excelfile: " + excelfile);

					try {
						qermttool = new QERMTTool(basedir, excelfile);
						qermttool.processDroolRules();

						List<WF3RulesBean> wf3RulesBeanList = qermttool
								.getWf3RulesBeanList();
						WF3RuleSynRuleHandler wf3RuleSynRuleHandler = qermttool
								.getWF3RuleSynRuleHandler();
						qermttool.generateDroolsRulesTesting();

						log.info("..");
						log.info("Rules " + wf3RulesBeanList.size());
					} catch (QERMTToolException e) {
						log.error(e.getMessage());
						throw new QERMTToolException(e.getMessage());
					}
				}

			} else {
				throw new Exception("Arguments where not defined!");
			}
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	private static void process() throws QERMTToolException {
		qermttool.processDroolRules();
		qermttool.createFiles();
		qermttool.showProcessingMessage();
		qermttool.showFilesGenerated();
	}

}
