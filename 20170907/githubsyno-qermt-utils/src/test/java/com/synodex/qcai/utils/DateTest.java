package com.synodex.qcai.utils;

import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.BeforeClass;
import org.junit.Test;
import com.synodex.qcai.utils.Date;

public class DateTest {
	private static Logger log = Logger.getLogger(DateTest.class);
	private static Date DATE;

	@BeforeClass
	public static void setUp() {
		try {
			java.util.Date date = DateUtil.getDate("1902-11-27 22:45:14 232",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss_SS);
			log.debug("date: " + date);

			DATE = new Date(date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getYear() {
		int year = DATE.getYear();
		Assert.assertEquals(1902, year);
		log.debug("year: " + year);
	}

	@Test
	public void getMonth() {
		int month = DATE.getMonth();
		Assert.assertEquals(11, month);
		log.debug("month: " + month);
	}

	@Test
	public void getDay() {
		int day = DATE.getDay();
		Assert.assertEquals(27, day);
		log.debug("day: " + day);
	}

	@Test
	public void getHour() {
		int hour = DATE.getHour();
		Assert.assertEquals(22, hour);
		log.debug("hour: " + hour);
	}

	@Test
	public void getMinute() {
		int minute = DATE.getMinute();
		Assert.assertEquals(45, minute);
		log.debug("minute: " + minute);
	}

	@Test
	public void getSecond() {
		int second = DATE.getSecond();
		Assert.assertEquals(14, second);
		log.debug("second: " + second);
	}

	@Test
	public void getMilliSecond() {
		int millisecond = DATE.getMilliSecond();
		Assert.assertEquals(232, millisecond);
		log.debug("millisecond: " + millisecond);
	}

	@Test
	public void getDate() {
		try {
			Date date = new Date("1902-11-27 22:45:14 232",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss_SS);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

}
