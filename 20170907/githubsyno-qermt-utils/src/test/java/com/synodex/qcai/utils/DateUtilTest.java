package com.synodex.qcai.utils;

import java.util.Calendar;
import java.util.Date;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class DateUtilTest {
	private final static Logger log = Logger.getLogger(DateUtilTest.class);

	@Test
	public void getDate() {
		Date now = DateUtil.getDate();

		Assert.assertNotNull(now);
		log.debug("Now: " + now);
	}

	@Test
	public void resetDefaultDate() {
		try {
			Date now = DateUtil.getDate();
			Assert.assertNotNull(now);
			log.debug("Now: " + now);

			Date date = DateUtil.getDate("2006-04-12 13:45:14",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss);
			DateUtil.setDate(date);
			date = DateUtil.getDate();

			Assert.assertNotNull(date);
			log.debug("Reset date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getNowAsCalendar() {
		Calendar nowascalendar = DateUtil.getNowAsCalendar();

		Assert.assertNotNull(nowascalendar);
		log.debug(nowascalendar);
	}

	@Test
	public void getFormatteNowVersion1() {
		String format = "yyyy-MM-dd HH:mm:ss";
		log.debug("format: " + format);

		String formatteddate;
		try {
			formatteddate = getFormattedNow(format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getInvalidFormatteNowVersion1() {
		String format = "YYYY-MM-dd HH:mm:ss";
		log.debug("format: " + format);

		String formatteddate;
		try {
			formatteddate = getFormattedNow(format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getAllDefinedFormatteNow() {
		int formatcnt = DateUtil.FORMATS.length;

		log.debug("formats defined: " + formatcnt);
		int j = 0;
		for (String format : DateUtil.FORMATS) {
			String formatteddate;
			try {
				j++;
				formatteddate = getFormattedNow(format);
				Assert.assertNotNull(formatteddate);
				log.debug(j + ": format=" + format + ", formatteddate="
				        + formatteddate);
			} catch (DateUtilException e) {
				log.error(e.getMessage());
				Assert.fail(e.getMessage());
				break;
			}
		}

		log.debug("Did we count all? j=" + j + ", formatcnt=" + formatcnt);
		Assert.assertTrue(j == formatcnt);
	}

	@Test
	public void getNowMinutes() {
		String format = "mm";
		log.debug("format: " + format);

		String formatteddate;
		try {
			formatteddate = getFormattedNow(format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getNowHour() {
		String format = "HH";
		log.debug("format: " + format);

		String formatteddate;
		try {
			formatteddate = getFormattedNow(format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	private String getFormattedNow(String format) throws DateUtilException {
		String formatteddate = DateUtil.getNowToString(format);
		return formatteddate;
	}

	@Test
	public void getDateToStringVersion1() {
		String format = "EEE MMM dd hh:mm:ss zzz yyyy";
		log.debug("format: " + format);

		try {
			String formatteddate = DateUtil.getDateToString(DateUtil.getDate(),
			        format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void getDateToStringVersion2() {
		String format = DateUtil.FORMAT_YEAR_MM_DD;
		log.debug("format: " + format);

		try {
			String formatteddate = DateUtil.getDateToString("2003-12-11",
			        format);
			Assert.assertNotNull(formatteddate);
			log.debug(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void getDateVersion2() {
		String format = "EEE MMM dd hh:mm:ss zzz yyyy";
		log.debug("format: " + format);

		try {
			Date date = DateUtil.getDate(DateUtil.getDate(), format);
			Assert.assertNotNull(date);
			log.debug(date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void getDateToStringVersion3() {
		String format = "EEE MMM dd hh:mm:ss zzz yyyy";
		log.debug("format: " + format);

		try {
			String date = DateUtil.getDateToString(DateUtil.getDate(), format);
			Assert.assertNotNull(date);
			log.debug(date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void getDateToStringVersion4() {
		try {
			String date = DateUtil.getDateToString("2003-12-11",
			        DateUtil.FORMAT_YEAR_MM_DD, DateUtil.FORMAT_DD_MM_YEAR);

			Assert.assertNotNull(date);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

	@Test
	public void getDateFromStringValueVersion2() {
		try {
			String date = DateUtil.getDateToString(
			        "Wed Apr 12 13:45:14 EDT 2006",
			        DateUtil.FORMAT_EEEE_MMMM_DD_HH_MM_SS_TZ_YYY,
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss);

			Assert.assertNotNull(date);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDateFromStringValueVersion3() {
		try {
			String date = DateUtil.getDateToString("2006-04-12 13:45:14",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss,
			        DateUtil.FORMAT_EEEE_MMMM_DD_HH_MM_SS_TZ_YYY);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDateFromStringValueVersion4() {
		try {
			Date date = DateUtil.getDate("2006-04-12 13:45:14",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDateFromStringValueVersion5() {
		try {
			String date = DateUtil.getDateToString("2006-04-12 13:45:14",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDateFromString() {
		try {
			Date date = DateUtil.getDate("2006-04-12 13:45:14",
			        DateUtil.FORMAT_YEAR_MM_DD_HH_MM_ss,
			        DateUtil.FORMAT_EEEE_MMMM_DD_HH_MM_SS_TZ_YYY);
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getSimpleDate() {
		try {
			Date date = DateUtil.getSimpleDate(DateUtil.getDate());
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getSimpleDateToString() {
		try {
			String date = DateUtil.getSimpleDateToString(DateUtil.getDate());
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getSimpleDateFormatReset() {
		try {
			DateUtil.setSimpleDateFormat(DateUtil.FORMAT_MM_DD_YEAR_MM_HH_MM_ss);
			String date = DateUtil.getSimpleDateToString(DateUtil.getDate());
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getTime() {
		try {
			DateUtil.setSimpleDateFormat(DateUtil.FORMAT_MM_DD_YEAR_MM_HH_MM_ss);
			String date = DateUtil.getTimeToString(DateUtil.getDate());
			log.debug("date: " + date);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getMoveDateYears() {
		try {
			// Create a date
			Date date = DateUtil.getDate("2006-04-12",
			        DateUtil.FORMAT_YEAR_MM_DD);

			// Move the date back 2 years
			Date movedate = DateUtil.getMoveDateYears(date, -2);
			log.debug("movedate: " + movedate);

			// Establish the before date
			com.synodex.qcai.utils.Date bfdate = new com.synodex.qcai.utils.Date(
			        date);
			log.debug("ddate: " + bfdate.getDate());

			// Establish the after date
			com.synodex.qcai.utils.Date aftdate = new com.synodex.qcai.utils.Date(
			        movedate);

			// Validate
			Assert.assertEquals(2006, bfdate.getYear());
			Assert.assertEquals(2004, aftdate.getYear());

			int dif = aftdate.getYear() - bfdate.getYear();
			log.debug("dif: " + dif);
			Assert.assertEquals(2, 2);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getMoveDateDays() {
		try {
			// Create a date
			Date date = DateUtil.getDate("2006-04-12",
			        DateUtil.FORMAT_YEAR_MM_DD);

			// Move the date by 2 days
			Date movedate = DateUtil.getMoveDateDays(date, 2);
			log.debug("movedate: " + movedate);

			// Establish the before date
			com.synodex.qcai.utils.Date bfdate = new com.synodex.qcai.utils.Date(
			        date);
			log.debug("ddate: " + bfdate.getDate());

			// Establish the after date
			com.synodex.qcai.utils.Date aftdate = new com.synodex.qcai.utils.Date(
			        movedate);

			// Validate
			Assert.assertEquals(2, bfdate.getDay());
			Assert.assertEquals(4, aftdate.getDay());

			int dif = aftdate.getDay() - bfdate.getDay();
			log.debug("dif: " + dif);
			Assert.assertEquals(2, 2);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getMoveDateMonths() {
		try {
			// Create a date
			Date date = DateUtil.getDate("2006-04-12",
			        DateUtil.FORMAT_YEAR_MM_DD);

			// Move the date 2 months
			Date movedate = DateUtil.getMoveDateMonths(date, 2);
			log.debug("movedate: " + movedate);

			// Establish the before date
			com.synodex.qcai.utils.Date bfdate = new com.synodex.qcai.utils.Date(
			        date);
			log.debug("ddate: " + bfdate.getDate());

			// Establish the after date
			com.synodex.qcai.utils.Date aftdate = new com.synodex.qcai.utils.Date(
			        movedate);

			// Validate
			Assert.assertEquals(4, bfdate.getMonth());
			Assert.assertEquals(6, aftdate.getMonth());

			int dif = aftdate.getMonth() - bfdate.getMonth();
			log.debug("dif: " + dif);
			Assert.assertEquals(2, 2);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getMoveDateDaysIntoNextMonth() {
		try {
			// Create a date
			Date date = DateUtil.getDate("2006-04-28",
			        DateUtil.FORMAT_YEAR_MM_DD);

			// Move the date by 15 days
			Date movedate = DateUtil.getMoveDateDays(date, 15);
			log.debug("movedate: " + movedate);

			// Establish the before date
			com.synodex.qcai.utils.Date bfdate = new com.synodex.qcai.utils.Date(
			        date);
			log.debug("ddate: " + bfdate.getDate());

			// Establish the after date
			com.synodex.qcai.utils.Date aftdate = new com.synodex.qcai.utils.Date(
			        movedate);

			// Validate
			Assert.assertEquals(4, bfdate.getMonth());
			Assert.assertEquals(5, aftdate.getMonth());

			int dif = aftdate.getMonth() - bfdate.getMonth();
			log.debug("dif: " + dif);
			Assert.assertEquals(2, 2);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getLastDayofMonth() {

		try {
			com.synodex.qcai.utils.Date date = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date);
			Date movedate = date.getDate();
			log.debug("movedate: " + movedate);

			for (int j = 1; j <= 12; j++) {
				if (j != 1) {
					int mvdays = 30;
					if (j == 2 || j == 9)
						mvdays = 32;

					// Move the date 30 days
					movedate = DateUtil.getMoveDateDays(movedate, mvdays);
					log.debug("movedate: " + movedate);
				}

				int lastday = DateUtil.getLastDayofMonth(movedate);
				log.debug("Month " + j + " lastday: " + lastday);
			}
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isDateBefore() {
		try {
			com.synodex.qcai.utils.Date date1 = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date1);

			com.synodex.qcai.utils.Date date2 = new com.synodex.qcai.utils.Date(
			        "2006-05-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date2);

			boolean result = DateUtil.isDateBefore(date1.getDate(),
			        date2.getDate());

			Assert.assertTrue(result);

			log.info("date1.hashCode(): " + date1.hashCode());
			log.info("date2.hashCode(): " + date2.hashCode());

			Assert.assertTrue(date1.hashCode() < date2.hashCode());
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isDateAfter() {
		try {
			com.synodex.qcai.utils.Date date1 = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date1);

			com.synodex.qcai.utils.Date date2 = new com.synodex.qcai.utils.Date(
			        "2006-05-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date2);

			boolean result = DateUtil.isDateAfter(date1.getDate(),
			        date2.getDate());

			Assert.assertFalse(result);

			log.info("date1.hashCode(): " + date1.hashCode());
			log.info("date2.hashCode(): " + date2.hashCode());

			Assert.assertFalse(date1.hashCode() > date2.hashCode());
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isDateEqual() {
		try {
			com.synodex.qcai.utils.Date date1 = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date1);

			com.synodex.qcai.utils.Date date2 = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date2);

			boolean result = DateUtil.isDateEqual(date1.getDate(),
			        date2.getDate());

			Assert.assertTrue(result);

			log.info("date1.hashCode(): " + date1.hashCode());
			log.info("date2.hashCode(): " + date2.hashCode());

			Assert.assertTrue(date1.hashCode() == date2.hashCode());
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void isDateNotEqual() {
		try {
			com.synodex.qcai.utils.Date date1 = new com.synodex.qcai.utils.Date(
			        "2006-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date1);

			com.synodex.qcai.utils.Date date2 = new com.synodex.qcai.utils.Date(
			        "2008-01-01", DateUtil.FORMAT_YEAR_MM_DD);
			log.info(date2);

			boolean result = DateUtil.isDateEqual(date1.getDate(),
			        date2.getDate());

			Assert.assertFalse(result);

			log.info("date1.hashCode(): " + date1.hashCode());
			log.info("date2.hashCode(): " + date2.hashCode());

			Assert.assertFalse(date1.hashCode() == date2.hashCode());
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}
	}

	@Test
	public void getDataDate() {
		String format = "MM/dd/yyyy";
		log.info("format: " + format);

		try {
			String formatteddate = DateUtil.getDateToString(DateUtil.getDate(),
			        format);
			Assert.assertNotNull(formatteddate);
			log.info(formatteddate);
			
			System.out.println(formatteddate);
		} catch (DateUtilException e) {
			log.error(e.getMessage());
			Assert.fail(e.getMessage());
		}

	}

}
