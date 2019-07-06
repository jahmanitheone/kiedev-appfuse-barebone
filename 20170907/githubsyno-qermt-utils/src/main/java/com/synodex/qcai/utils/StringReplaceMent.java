package com.synodex.qcai.utils;

import org.apache.log4j.Logger;

/**
 * This is the one stop shopping for string replacement for QCAI. Different
 * string values, rules, are replaced.
 * 
 * @autho Philip Jahmani Chauvet @pchauvet@synodex.com
 * 
 */
public class StringReplaceMent {
	private final static Logger log = Logger.getLogger(StringReplaceMent.class);

	/**
	 * Ref VBCode: BBoxLoader.ProcessEnteredDescription() Replace & with and
	 * 
	 * @param text
	 *            The string to be processes
	 * 
	 * @return All & in string to and
	 */
	public static String replaceAllAmpersandWitnAnd(String text) {
		if (text != null)
			text = text.replaceAll("&", "and");

		return text;
	}

	/**
	 * Replace � with e
	 * 
	 * @param text
	 *            The string to be processes
	 * 
	 * @return � with e
	public static String replaceAll�Witne(String text) {
		if (text != null)
			text = text.replaceAll("�", "e");

		return text;
	}
	 */

	/**
	 * Replace � with a
	 * 
	 * @param text
	 *            The string to be processes
	 * 
	 * @return � with a
	 */
	public static String replaceAll�Witna(String text) {
		if (text != null)
			text = text.replaceAll("�", "a");

		return text;
	}

	/**
	 * 1. Replace & with and
	 * 
	 * 2. Replace � with a Replace � with e
	 * 
	 * 3. Replace � with e
	 * 
	 * 4. Replace the word null with blank
	 * 
	 * @param text
	 *            The string to be processes
	 * 
	 * @return Text with the above characters replaced
	 * 
	 *         Ref VBCode: BBoxLoader.codeAdjust()
	 */
	public static String replaceMentRuleReplaceCharacters(String text) {
		if (text != null) {
			text = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
			text = StringReplaceMent.replaceAll�Witne(text);
			text = StringReplaceMent.replaceAll�Witna(text);
			if (text.equals("null"))
				text = "";
		}

		return text;
	}

	/**
	 * Remove duplicate spaces
	 * 
	 * @param text
	 *            The string to be processes
	 * 
	 * @return Text without duplicate spaces
	 * 
	 *         Ref VBCode: BBoxLoader.codeAdjust()
	 */
	public static String replaceMentRuleRemoveDuplicateSpaces(String text) {
		if (text != null) {
			while ((text.indexOf("  ") >= 0))
				text = text.replaceAll("  ", " ");
		}
		return text;
	}

	/**
	 * Removes all symbols which are not A-Z, a-z, 0-9. and spaces. If
	 * allowdashperiod is true, allow '-' and '.'. Meaning capture acceptable
	 * characters.
	 * 
	 * @param text
	 *            The string to be processes
	 * @param allowdashperiod
	 *            If true Allow '-' and '.' in text
	 * 
	 * @return Text with the defined character rule above
	 * 
	 *         Ref VBCode: BBoxLoader.codeAdjust()
	 */
	public static String replaceMentRuleAcceptableCharacters(String text,
			boolean allowdashperiod) {
		String[] allowed_symbols = { " 0123456789abcdefghijklmnopqrstuvwxyz^",
				" -.0123456789abcdefghijklmnopqrstuvwxyz^" };
		String allowedchars = allowdashperiod ? allowed_symbols[1]
				: allowed_symbols[0];

		// log.info(allowdashperiod + " - 0 " + allowed_symbols[0].length());
		// log.info(allowdashperiod + " - 1 " + allowed_symbols[1].length());

		StringBuilder builder = new StringBuilder();
		char[] textchars = text.toCharArray();

		// log.info("allowedchars " + allowedchars + " --> " +
		// allowedchars.length());
		for (char c : textchars) {
			// If char is allowed add it
			boolean isfound = allowedchars.indexOf(c) >= 0;

			// if (c == ' ')
			// log.info("isfound: " + isfound);

			if (isfound)
				builder.append(c);
		}

		return builder.toString();
	}

}
