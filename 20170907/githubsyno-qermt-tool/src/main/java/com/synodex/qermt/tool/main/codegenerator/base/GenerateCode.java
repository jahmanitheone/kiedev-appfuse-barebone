package com.synodex.qermt.tool.main.codegenerator.base;

import com.synodex.qermt.tool.exception.QERMTToolException;

public interface GenerateCode {
	void beginMessage();

	void before();

	void generateCode();

	void after();

	void process() throws QERMTToolException;

	String getGeneratedCode();

	void saveFile() throws QERMTToolException;

	void endMessage();

	String getFileName();

	String getFilePath();
}
