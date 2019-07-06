package com.synodex.qcai.utils;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;

public class StringUtilTest {
	private final static Logger log = Logger.getLogger(StringUtilTest.class);

	@Test
	public void getStringBeforeNumberWithNullParam() {
		String rtn = StringUtil.getStringBeforeNumber(null);
		Assert.assertNull(rtn);
	}

	@Test
	public void getStringBeforeNumberUsingWithBlankParam() {
		String rtn = StringUtil.getStringBeforeNumber("");
		Assert.assertNull(rtn);
	}

	@Test
	public void getStringBeforeNumberWithNumberAtBegining() {
		String input = "0abcdefghijklmnl";
		String rtn = StringUtil.getStringBeforeNumber(input);
		Assert.assertNull(rtn);
	}

	@Test
	public void getStringBeforeNumberWithNumberAtMiddle() {
		String input = "abcdefg6hijklmnl";
		String rtn = StringUtil.getStringBeforeNumber(input);
		Assert.assertNotNull(rtn);
		Assert.assertEquals("abcdefg", rtn);
	}

	@Test
	public void getStringBeforeNumberWithNumberAtEnd() {
		String input = "abcdefghijklmnl9";
		String rtn = StringUtil.getStringBeforeNumber(input);
		Assert.assertNotNull(rtn);
		Assert.assertEquals("abcdefghijklmnl", rtn);
	}

}
