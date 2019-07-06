package com.synodex.qcai.utils;

/*
 * Exception for File Util
 */
public class FileUtilException extends Exception {
	private static final long serialVersionUID = 5775486053222955852L;
	private Throwable cause;

	public FileUtilException(String message) {
		super(message);
	}

	public FileUtilException(Throwable cause) {
		super(cause.getMessage());
		this.cause = cause;
	}

	public Throwable getCause() {
		return this.cause;
	}

}
