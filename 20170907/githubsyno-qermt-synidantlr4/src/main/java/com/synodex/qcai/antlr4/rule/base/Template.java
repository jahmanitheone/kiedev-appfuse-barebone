package com.synodex.qcai.antlr4.rule.base;

import java.io.InputStream;

public interface Template {
	String getFilePath();

	String getContent();

	InputStream getInputStream();
}
