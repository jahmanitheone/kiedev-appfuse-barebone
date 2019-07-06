package com.synodex.qcai.utils;

import org.apache.log4j.Logger;

public class StringUtil {
	private static final Logger log = Logger.getLogger(StringUtil.class);

	/**
	 * Finds the first numeric and returns the string preceding the numeric
	 * 
	 * @param String qstr The input string to be processed having numbers
	 * @return String qstr It's string preceding the numeric position, else null
	 */
	public static String getStringBeforeNumber(String qstr) {
		char[] numbers = "0123456789".toCharArray();

		if (qstr == null)
			return null;

		// If there is nothing to process, stop, don't do loop
		qstr = qstr.trim();
		if (qstr.length() <= 0)
			return null;

		for (int j = 0; j < numbers.length; j++) {
			// Find a number in the string
			int pos = qstr.indexOf(numbers[j]);
			if (pos > 0)
				return qstr.substring(0, pos);
		}

		return null;
	}

	public enum cleantext {
		as_phrase_09AZSpace(0), as_phrase_09AZSpaceDotDash(1), as_word_09AZ(2), as_word_AZ(
		        3);

		int code;

		private cleantext(int c) {
			code = c;
		}

		public int getCode() {
			return code;
		}
	}


	/**
	 * Useful method to test if String is null or has blank space values
	 * 
	 * @param value
	 * @return
	 */
	public static boolean isEmpty(String value) {
		return value == null || value.isEmpty();
	}

}