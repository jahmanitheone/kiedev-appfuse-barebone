package com.synodex.qcai.utils;

import static org.junit.Assert.*;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class StringReplaceMentTest {
	private final static Logger log = Logger
			.getLogger(StringReplaceMentTest.class);

	@Test
	public void replaceAllAmpersandWitnAndNull() {
		String text = null;
		String out = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
		Assert.assertNull(text);
	}

	@Test
	public void replaceAllAmpersandWitnAndBeginningPos() {
		String text = "& data with";
		String out = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
		Assert.assertEquals("and data with", out);
	}

	@Test
	public void replaceAllAmpersandWitnAndMidPos() {
		String text = "data & with";
		String out = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
		Assert.assertEquals("data and with", out);
	}

	@Test
	public void replaceAllAmpersandWitnAndEndPos() {
		String text = "data with &";
		String out = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
		Assert.assertEquals("data with and", out);
	}

	@Test
	public void replaceAllAmpersandWitnAndMultiplePosition() {
		String text = "& data & with &";
		String out = StringReplaceMent.replaceAllAmpersandWitnAnd(text);
		Assert.assertEquals("and data and with and", out);
	}

	/*
	@Test
	public void replaceAll�WitneMultiplePosition() {
		String text = "� data � with �";
		String out = StringReplaceMent.replaceAll�Witne(text);
		// log.info("In:" + text + ", Out: " + out);
		Assert.assertEquals("e data e with e", out);
	}
	
	@Test
	public void replaceAll�WitnaMultiplePosition() {
		String text = "� data � with �";
		String out = StringReplaceMent.replaceAll�Witna(text);
		// log.info("In:" + text + ", Out: " + out);
		Assert.assertEquals("a data a with a", out);
	}
*/

	@Test
	public void replaceMentRuleReplaceCharacters() {
		String text = "& - � - �";
		String out = StringReplaceMent.replaceMentRuleReplaceCharacters(text);
		// log.info("In:" + text + ", Out: " + out);
		Assert.assertEquals("and - e - a", out);
	}

	@Test
	public void replaceMentRuleRemoveDuplicateSpaces() {
		String text = "  word ";
		// log.info(text + " -- " + text.length());
		String outtext = StringReplaceMent
				.replaceMentRuleRemoveDuplicateSpaces(text);
		String result = " word ";
		Assert.assertEquals(result, outtext);

		text = "       word   ";
		outtext = StringReplaceMent.replaceMentRuleRemoveDuplicateSpaces(text);
		result = " word ";
		// log.info(outtext + " -- " + outtext.length());
		Assert.assertEquals(result, outtext);

		text = "        word      ";
		outtext = StringReplaceMent.replaceMentRuleRemoveDuplicateSpaces(text);
		result = " word ";
		// log.info(outtext + " -- " + outtext.length());
		Assert.assertEquals(result, outtext);

		text = " worda  wordb    wordc        ";
		outtext = StringReplaceMent.replaceMentRuleRemoveDuplicateSpaces(text);
		result = " worda wordb wordc ";
		// log.info(outtext + " -- " + outtext.length());
		Assert.assertEquals(result, outtext);
	}

	@Test
	public void replaceMentRuleAcceptableCharactersNoPeriodDashAndNoStrangeCharacter() {
		String text = "  worda  word2  workd3  ";
		String textout = StringReplaceMent.replaceMentRuleAcceptableCharacters(
				text, false);

		// log.info("textout: " + textout);
		Assert.assertEquals(text, textout);
	}

	@Test
	public void replaceMentRuleAcceptableCharactersWithNoPeriodDashAndNoStrangeCharacter() {
		String text = "  worda  - word2 - workd3  ";
		String textout = StringReplaceMent.replaceMentRuleAcceptableCharacters(
				text, false);

		// log.info("textout: " + textout);
		String result = "  worda   word2  workd3  ";
		Assert.assertEquals(result, textout);
	}

	@Test
	public void replaceMentRuleAcceptableCharactersWithNoPeriodDashAndStrangeCharacter() {
		String text = "  worda  & word2 � workd3  ";
		String textout = StringReplaceMent.replaceMentRuleAcceptableCharacters(
				text, false);

		// log.info("textout: " + textout);
		String result = "  worda   word2  workd3  ";
		Assert.assertEquals(result, textout);
	}

	@Test
	public void replaceMentRuleAcceptableCharactersWithPeriodDashAndStrangeCharacter() {
		String text = "  - worda  & word2 � workd3.";
		String textout = StringReplaceMent.replaceMentRuleAcceptableCharacters(
				text, true);

		// log.info("textout: " + textout);
		String result = "  - worda   word2  workd3.";
		Assert.assertEquals(result, textout);
	}

	@Test
	public void replaceMentRuleAcceptableCharactersWithPeriodDashAndNoStrangeCharacter() {
		String text = "  - worda   word2 workd3.";
		String textout = StringReplaceMent.replaceMentRuleAcceptableCharacters(
				text, true);

		// log.info("textout: " + textout);
		String result = "  - worda   word2 workd3.";
		Assert.assertEquals(result, textout);
	}

}
