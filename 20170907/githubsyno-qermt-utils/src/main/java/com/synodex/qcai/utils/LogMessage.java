package com.synodex.qcai.utils;

import org.apache.log4j.Logger;

/**
 * Log formatted message
 * 
 * @author Philip Jahmani Chauvet (pchauvet)
 */
public class LogMessage {
	private static StringBuilder loginfo = new StringBuilder();
	private static LogMessage logMessage;

	private LogMessage() {
		loginfo = new StringBuilder();
	}

	public static void begin() {
		logMessage = new LogMessage();
	}

	public static void add(String msg) {
		validateInstance();

		if (msg != null)
			loginfo.append(msg);
	}

	/**
	 * Add a line with carriage return
	 * 
	 * @param msg
	 */
	public static void addCR(String msg) {
		validateInstance();

		if (msg != null)
			loginfo.append(msg + "\n");
	}

	private static void validateInstance() {
		if (logMessage == null)
			begin();
	}

	public static void stop() {
		loginfo = new StringBuilder();
	}

	public static String getMessage() {
		return loginfo.toString();
	}

	public static void info(Logger log, String msg) {
		log.info("");
		log.info(msg);
		log.info("");
	}

	public static void debug(Logger log, String msg) {
		log.debug("");
		log.debug(msg);
		log.debug("");
	}

	public static void error(Logger log, String msg) {
		log.error("");
		log.error(msg);
		log.error("");
	}

}
