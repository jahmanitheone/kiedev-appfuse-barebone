package com.synodex.qermt.tool.main.helper;

import org.apache.log4j.Logger;
import com.synodex.excel.ExcelFileException;
import com.synodex.excel.tool.WF3RuleExcelTool;
import com.synodex.qcai.utils.ClassBasePath;
import com.synodex.qcai.utils.DirectoryUtil;
import com.synodex.qcai.utils.LogMessage;
import com.synodex.qcai.utils.ShowUtil;
import com.synodex.qermt.tool.Constants;
import com.synodex.qermt.tool.exception.QERMTToolException;

public class ExcelFileHelper {
	private final static Logger log = Logger.getLogger(ExcelFileHelper.class);
	private WF3RuleExcelTool wf3RuleExcelTool;
	private String excelFile;
	private String basePath;
	private String excelRuleDirPath;
	private String excelFilePath;

	/**
	 * Process excel file from the default rule directory: ruledir
	 * 
	 * @param excelfile
	 * @throws QERMTToolException
	 */
	public ExcelFileHelper(String excelfile) throws QERMTToolException {
		this.setExcelFile(excelfile);

		setDefaultBasePath();
		validateParams(getExcelRuleDirPath(), excelfile);

		setExcelFilePath(getExcelRuleDirPath() + getExcelFile());
		setWF3RuleExcelTool();
	}

	/**
	 * Process excel file from the provided basepath
	 * 
	 * @param basepath
	 * @param excelfile
	 * @throws QERMTToolException
	 */
	public ExcelFileHelper(String basepath, String excelfile)
			throws QERMTToolException {
		this.setBasePath(basepath);
		this.setExcelFile(excelfile);

		validateParams(getBasePath(), excelfile);

		setExcelFilePath();
		setWF3RuleExcelTool();
	}

	private void validateParams(String basepath, String excelfile)
			throws QERMTToolException {
		if (basepath == null || basepath.isEmpty())
			throw new QERMTToolException(
					"No base directory was provided to retrieve excel file");

		if (excelfile == null || excelfile.isEmpty())
			throw new QERMTToolException("No excel file was not provided");
	}

	private void setDefaultBasePath() throws QERMTToolException {
		String path = ClassBasePath.getClassBasePath(ExcelFileHelper.class, "");
		path = cleanBasePath(path);
		log.debug("path " + path);
		this.setBasePath(path);

		path += Constants.SUBDIR_RULEDIR;
		path = addLastSlash(path);
		excelRuleDirPath = path;
		log.debug("excelRuleDirPath: " + excelRuleDirPath);

	}

	private String cleanBasePath(String path) {
		path = removeExtraSubDirectories(path);
		path = DirectoryUtil.replaceSeperator(path);
		path = addLastSlash(path);

		return path;
	}

	private String removeExtraSubDirectories(String path) {
		path = ClassBasePath.extractSubDirectory(path, "/target/classes/");
		path = ClassBasePath.extractSubDirectory(path, "/target/test-classes/");
		return path;
	}

	private void setExcelFilePath() throws QERMTToolException {
		String path = getBasePath();
		path = cleanBasePath(path);
		path = addLastSlash(path);
		path += Constants.SUBDIR_RULEDIR;
		path = addLastSlash(path);
		excelRuleDirPath = path;

		path = getExcelRuleDirPath() + getExcelFile();

		setExcelFilePath(path);
		log.debug("excelFilePath: " + excelFilePath);
	}

	private void setWF3RuleExcelTool() throws QERMTToolException {
		try {
			setWf3RuleExcelTool(new WF3RuleExcelTool(getExcelFilePath()));
		} catch (ExcelFileException e) {
			String msg = e.getMessage();

			if (e.getMessage().contains("volume label syntax is incorrect"))
				msg = "Check that the basedir is before the excel file! " + msg;

			throw new QERMTToolException(msg);
		}
	}

	/**
	 * Make sure a path has the last last
	 * 
	 * @param String
	 *            The path to add the /
	 * 
	 * @return String The directory with added /
	 */
	public static String addLastSlash(String path) {
		if (path != null) {
			path = DirectoryUtil.replaceSeperator(path);
			if (path.charAt(path.length() - 1) != '/')
				path += "/";
		}

		return path;
	}

	public void showExcelPathInfo() {
		LogMessage.begin();
		LogMessage.addCR("");
		LogMessage.addCR("Excel Processing Information");
		LogMessage.addCR("    Base directory: " + getBasePath());
		LogMessage.addCR("    Excel file: " + getExcelFile());
		LogMessage.addCR("    Excel path: " + getExcelFilePath());

		ShowUtil.showSubSectionNoSpacer(log, LogMessage.getMessage());
	}

	public String getExcelFile() {
		return excelFile;
	}

	private void setExcelFile(String excelFile) {
		this.excelFile = excelFile;
	}

	public String getBasePath() {
		return basePath;
	}

	private void setBasePath(String basePath) {
		this.basePath = basePath;
	}

	public String getExcelFilePath() {
		return excelFilePath;
	}

	private void setExcelFilePath(String excelFilePath) {
		this.excelFilePath = excelFilePath;
	}

	public WF3RuleExcelTool getWf3RuleExcelTool() {
		return wf3RuleExcelTool;
	}

	private void setWf3RuleExcelTool(WF3RuleExcelTool wf3RuleExcelTool) {
		this.wf3RuleExcelTool = wf3RuleExcelTool;
	}

	public String getExcelRuleDirPath() {
		return excelRuleDirPath;
	}

	public void setExcelRuleDirPath(String excelRuleDirPath) {
		this.excelRuleDirPath = excelRuleDirPath;
	}

}
