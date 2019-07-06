package com.synodex.qermt.tool.main;

import java.util.List;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Row;
import com.synodex.excel.ExcelFileException;
import com.synodex.excel.base.ExcelFileDAO;
import com.synodex.excel.bean.WF3RulesBean;
import com.synodex.excel.dao.ReadExcelFile;
import com.synodex.excel.dao.WF3RulesExcelFileDAO;
import com.synodex.qcai.utils.ShowUtil;
import com.synodex.qermt.tool.Constants;
import com.synodex.qermt.tool.exception.QERMTToolException;
import com.synodex.qermt.tool.main.codegenerator.GenerateDroolsErrors;
import com.synodex.qermt.tool.main.codegenerator.GenerateDroolsInsertStatement;
import com.synodex.qermt.tool.main.codegenerator.GenerateDroolsMetaData;
import com.synodex.qermt.tool.main.codegenerator.GenerateDroolsRulesTesting;
import com.synodex.qermt.tool.main.codegenerator.base.GenerateCode;
import com.synodex.qermt.tool.main.helper.ExcelFileHelper;
import com.synodex.excel.helper.WF3RuleSynRuleHandler;
import com.synodex.excel.tool.WF3RuleExcelTool;

public class QERMTTool {
	private final static Logger log = Logger.getLogger(QERMTTool.class);
	private ExcelFileHelper excelFileHelper;
	private WF3RulesExcelFileDAO wf3rulesexcelfiledao = null;
	private List<WF3RulesBean> wf3RulesBeanList;
	private static ExcelFileDAO readexcelfile;
	private boolean showWF3RulesBeanList;
	private WF3RuleExcelTool wf3ruleexceltool;
	private WF3RuleSynRuleHandler wf3RuleSynRuleHandler;
	private StringBuilder fileCreated = new StringBuilder();

	public QERMTTool(String excelfile) throws QERMTToolException {
		excelFileHelper = new ExcelFileHelper(excelfile);
		excelFileHelper.showExcelPathInfo();
	}

	public QERMTTool(String basedir, String excelfile)
			throws QERMTToolException {
		excelFileHelper = new ExcelFileHelper(basedir, excelfile);
		excelFileHelper.showExcelPathInfo();
	}

	public void createFiles() throws QERMTToolException {
		generateDroolsInsertStatement();
		generateDroolsErrors();
		generateDroolsMetadata();
	}

	public void processDroolRules() throws QERMTToolException {
		wf3rulesexcelfiledao = new WF3RulesExcelFileDAO();
		setReadExcelFile();
		setExcelFileRows();

		if (isShowWF3RulesBeanList())
			showWf3RulesBean();

		try {
			wf3ruleexceltool = excelFileHelper.getWf3RuleExcelTool();

			String droolstemplatpath = getDroolTemplateFile();

			wf3RuleSynRuleHandler = new WF3RuleSynRuleHandler(
					wf3ruleexceltool.getWF3RulesBeans(), droolstemplatpath);

			wf3RuleSynRuleHandler.process();
		} catch (Exception e) {
			throw new QERMTToolException(e.getMessage());
		}
	}

	private String getDroolTemplateFile() {
		String droolstemplatpath = excelFileHelper.getBasePath();
		droolstemplatpath = ExcelFileHelper.addLastSlash(droolstemplatpath);
		droolstemplatpath += Constants.SUBDIR_DROOLSTEMPLATE;
		droolstemplatpath = ExcelFileHelper.addLastSlash(droolstemplatpath);
		droolstemplatpath += Constants.DROOLSRULE_TEMPLATEFILE;
		return droolstemplatpath;
	}

	private void showWf3RulesBean() {
		List<WF3RulesBean> wf3rulesbeanlist = getWf3RulesBeanList();
		for (WF3RulesBean wf3entry : wf3rulesbeanlist) {
			log.info(wf3entry);
		}
	}

	private void setReadExcelFile() throws QERMTToolException {
		readexcelfile = new ReadExcelFile();
		readexcelfile.setFilePath(excelFileHelper.getExcelFilePath());

		try {
			readexcelfile.readExcelFile();
		} catch (ExcelFileException e) {
			throw new QERMTToolException(e.getMessage());
		}
	}

	private void setExcelFileRows() throws QERMTToolException {
		try {
			List<Row> rows = readexcelfile.getExcelFileRows();
			wf3rulesexcelfiledao.setExcelFileRows(rows);

			wf3RulesBeanList = wf3rulesexcelfiledao.getWF3RulesBeans();
		} catch (ExcelFileException e) {
			throw new QERMTToolException(e.getMessage());
		}
	}

	public void generateDroolsInsertStatement() throws QERMTToolException {
		try {
			GenerateCode code = new GenerateDroolsInsertStatement(
					wf3RuleSynRuleHandler, excelFileHelper);
			code.process();
			fileCreated.append(Constants.SPACE_FOUR
					+ "Rules Drools Insert Statement file: "
					+ code.getFileName() + "\n");
			fileCreated.append(Constants.SPACE_FOUR + Constants.SPACE_FOUR
					+ code.getFilePath() + "\n");
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			throw new QERMTToolException(e.getMessage());
		}
	}

	public void generateDroolsErrors() throws QERMTToolException {
		try {
			GenerateCode code = new GenerateDroolsErrors(wf3RuleSynRuleHandler,
					excelFileHelper);
			code.process();
			fileCreated.append(Constants.SPACE_FOUR
					+ "Rules Drools Error file: " + code.getFileName() + "\n");
			fileCreated.append(Constants.SPACE_FOUR + Constants.SPACE_FOUR
					+ code.getFilePath() + "\n");
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			throw new QERMTToolException(e.getMessage());
		}
	}

	public void generateDroolsMetadata() throws QERMTToolException {
		try {
			GenerateCode code = new GenerateDroolsMetaData(
					wf3RuleSynRuleHandler, excelFileHelper);
			code.process();
			fileCreated.append(Constants.SPACE_FOUR + "Rules Metadata file: "
					+ code.getFileName() + "\n");
			fileCreated.append(Constants.SPACE_FOUR + Constants.SPACE_FOUR
					+ code.getFilePath() + "\n");
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			throw new QERMTToolException(e.getMessage());
		}
	}

	public void generateDroolsRulesTesting() throws QERMTToolException {
		try {
			GenerateCode code = new GenerateDroolsRulesTesting(
					wf3RuleSynRuleHandler, excelFileHelper);
			code.process();
			fileCreated.append(Constants.SPACE_FOUR
					+ "Rules Drools Rules Testing file: " + code.getFileName()
					+ "\n");
			fileCreated.append(Constants.SPACE_FOUR + Constants.SPACE_FOUR
					+ code.getFilePath() + "\n");
		} catch (QERMTToolException e) {
			log.error(e.getMessage());
			throw new QERMTToolException(e.getMessage());
		}
	}

	public ExcelFileHelper getExcelFileHelper() {
		return excelFileHelper;
	}

	public List<WF3RulesBean> getWf3RulesBeanList() {
		return wf3RulesBeanList;
	}

	public boolean isShowWF3RulesBeanList() {
		return showWF3RulesBeanList;
	}

	public void setShowWF3RulesBeanList(boolean showWF3RulesBeanList) {
		this.showWF3RulesBeanList = showWF3RulesBeanList;
	}

	public WF3RuleSynRuleHandler getWF3RuleSynRuleHandler() {
		return wf3RuleSynRuleHandler;
	}

	public void showProcessingMessage() {
		ShowUtil.showMainSection(log, "Completed Processing file: "
				+ excelFileHelper.getExcelFile());
		excelFileHelper.showExcelPathInfo();
		log.info("    Valid rules count:  "
				+ wf3RuleSynRuleHandler.getValidSynRuleHandlerList().size());
		log.info("    InValid rules count:  "
				+ wf3RuleSynRuleHandler.getInValidSynRuleHandlerList().size());

	}

	public void showFilesGenerated() {
		ShowUtil.showSubSectionNoSpacer(log, "Completed Generated files: ");
		log.info("\n" + fileCreated.toString());
	}

}
