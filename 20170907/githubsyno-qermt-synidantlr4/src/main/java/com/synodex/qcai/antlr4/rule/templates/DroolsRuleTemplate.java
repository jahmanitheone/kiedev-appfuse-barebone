package com.synodex.qcai.antlr4.rule.templates;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import com.synodex.qcai.antlr4.rule.base.Template;

public class DroolsRuleTemplate implements Template {
	private String filePath;
	private String content;
	private InputStream inputStream;

	public DroolsRuleTemplate(String file) throws TemplateException {
		this.filePath = file;

		validateFile();
		setInputStrteam(filePath);
		setTemplateContent();
	}

	private void validateFile() throws TemplateException {
		if (filePath == null)
			throw new TemplateException("File parameter can not be blank!");
	}

	/**
	 * Get the template from the full path of the file
	 * 
	 * @param file
	 * @return
	 * @throws TemplateException
	 */
	private void setInputStrteam(String file) throws TemplateException {
		try {
			inputStream = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			throw new TemplateException(e.getMessage());
		}
	}

	private void setTemplateContent() {
		java.util.Scanner s = new java.util.Scanner(inputStream)
				.useDelimiter("\\A");
		content = s.hasNext() ? s.next() : "";
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	/**
	 * Get the contents in the template file
	 * 
	 * @return
	 */
	public String getContent() {
		return content;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

}
