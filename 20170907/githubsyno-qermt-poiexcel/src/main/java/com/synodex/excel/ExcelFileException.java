package com.synodex.excel;

public class ExcelFileException extends Exception {
	private static final long serialVersionUID = 6378663043029486025L;

	public ExcelFileException() {
	}

	public ExcelFileException(String message) {
		super(message);
	}

	public ExcelFileException(Throwable cause) {
		super(cause);
	}

	public ExcelFileException(String message, Throwable cause) {
		super(message, cause);
	}

}
