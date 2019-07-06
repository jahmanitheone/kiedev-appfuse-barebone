package com.synodex.qcai.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import org.apache.log4j.Logger;

public class DateUtil {
	private static Logger log = Logger.getLogger(DateUtil.class);
	private static Calendar NOW = null;
	private static java.util.Date DATE = null;
	public static int YEAR = 0;
	public static int MONTH = 0;
	public static int DAYOFMONTH = 0;
	public static int SECOND = 0;
	public static int MILLISECOND = 0;
	public static String FORMAT_YEAR_MM_DD = "yyyy-MM-dd";
	public static String FORMAT_MM_DD_YEAR = "MM/dd/yyyy";
	public static String FORMAT_DD_MM_YEAR = "dd/MM/yyyy";
	public static String FORMAT_YEAR_MM_DD_HH_MM_ss = "yyyy-MM-dd HH:mm:ss";
	public static String FORMAT_MM_DD_YEAR_MM_HH_MM_ss = "MM/dd/yyyy HH:mm:ss";
	public static String FORMAT_YEAR_MM_DD_HH_MM_ss_SS = "yyyy-MM-dd HH:mm:ss SSS";
	public static String FORMAT_EEEE_MMMM_DD_HH_MM_SS_TZ_YYY = "EEE MMM dd hh:mm:ss zzz yyyy";
	public static String FORMAT_SYNODEX_ORACLE_DATE = "MM/dd/yyyy hh:mm:ss.SSSS aaa";
	public static String FORMAT_EEEE_MMMM_DD_YYY = "EEEE, MMMM dd yyyy";
	public static String FORMAT_HH_mm_ss = "HH:mm:ss";
	public static String FORMAT_hh_mm_ss = "hh:mm:ss";
	public static final String FORMAT_DAY = "dd";
	public static final String FORMAT_MONTH = "MM";
	public static final String FORMAT_YEAR = "yyyy";
	public static final String FORMAT_HOUR = "HH";
	public static final String FORMAT_MINUTE = "mm";
	public static final String FORMAT_SECOND = "ss";
	public static final String FORMAT_MILLISECOND = "SSS";
	private static String FORMATE_SIMPLEDATE = FORMAT_YEAR_MM_DD;

	/**
	 * Initialize the default date to the current date to these constants:<br>
	 * DATE - The standard java.util.Date for the current time<br>
	 * NOW - The standard java.util.Calendar date from the current time base on
	 * DATE<br>
	 * <br>
	 * Once set the date constants can be set:<br>
	 * YEAR, MONTH, DAYOFMONTH, SECOND, MILLISECOND<br>
	 */
	static {
		DATE = new java.util.Date();
		setDefaultDate();
	}

	/**
	 * Note: As we add constants - Add here as a format
	 */
	public static final String[] FORMATS = { FORMAT_YEAR_MM_DD,
	        FORMAT_MM_DD_YEAR, FORMAT_DD_MM_YEAR, FORMAT_YEAR_MM_DD_HH_MM_ss,
	        FORMAT_YEAR_MM_DD_HH_MM_ss_SS, FORMAT_MM_DD_YEAR_MM_HH_MM_ss,
	        FORMAT_EEEE_MMMM_DD_YYY, FORMAT_EEEE_MMMM_DD_HH_MM_SS_TZ_YYY,
	        FORMAT_HH_mm_ss, FORMAT_hh_mm_ss, FORMATE_SIMPLEDATE, "MM", "dd",
	        "yyyy", "HH", "mm", "ss", "SSS" };

	private static void setDefaultDate() {
		NOW = new GregorianCalendar();
		NOW.setTime(DATE);

		YEAR = NOW.get(1);
		DAYOFMONTH = NOW.get(5);
		MONTH = NOW.get(2);
		SECOND = NOW.get(13);
		MILLISECOND = NOW.get(14);
	}

	public static void setDate(java.util.Date date) throws DateUtilException {
		if (date == null) {
			throw new DateUtilException("The date can not be null");
		}
		DATE = date;
		setDefaultDate();
	}

	/**
	 * Get the current date as a Calendar date
	 * 
	 * @return
	 */
	public static Calendar getNowAsCalendar() {
		return NOW;
	}

	/**
	 * Get the current date as a java.util.Date
	 * 
	 * @return
	 */
	public static java.util.Date getDate() {
		return DATE;
	}

	/**
	 * Get now using a formatted date
	 * 
	 * @param format Example, provide this string format yyyy-MM-dd HH:mm:ss
	 * @return Date is return as a formatted, for the example as:<br>
	 *         yyyy-MM-dd HH:mm:ss
	 * @throws DateUtilException
	 */
	public static String getNowToString(String format) throws DateUtilException {
		String fdate = null;
		try {
			fdate = getDateToString(getDate(), format);
		} catch (Exception e) {
			throwException(e);
		}

		return fdate;
	}

	/**
	 * Get a formatted date
	 * 
	 * @param date The java.util.Date
	 * @param format The formatted used to create the date
	 * @return The generated date as a string
	 * @throws DateUtilException
	 */
	public static String getDateToString(java.util.Date date, String format)
	        throws DateUtilException {
		String dateformat = null;
		try {
			SimpleDateFormat dformat = new SimpleDateFormat(format);
			dateformat = dformat.format(date);
		} catch (Exception e) {
			throwException(e);
		}

		return dateformat;
	}

	/**
	 * Get a date from a desired format
	 * 
	 * @param date The java.util.Date
	 * @param format The formatted used to create the date
	 * @return The generated date
	 * @throws DateUtilException
	 */
	public static java.util.Date getDate(java.util.Date date, String format)
	        throws DateUtilException {
		java.util.Date fdate = null;
		try {
			SimpleDateFormat dformat = new SimpleDateFormat(format);
			fdate = dformat.parse(dformat.format(date));
		} catch (Exception e) {
			throwException(e);
		}

		return fdate;
	}

	/**
	 * Get a date from a string value. A from / to formatted a source desired
	 * result respectively. A formatted date string is returned.<br>
	 * 
	 * @param String Date formatted as a string, ex: "2003-12-11".
	 * 
	 * @param String Source SimpleDateFormat format, ex: "yyyy-MM-dd".
	 * 
	 * @param String Target SimpleDateFormat format, ex: "dd/MM/yyyy".
	 * 
	 * @return String Returns a new formatted date format.
	 */
	public static String getDateToString(String datestring,
	        String targetdateformat) throws DateUtilException {
		String resultdatestring = null;
		try {
			java.util.Date tdate = getDate(datestring, targetdateformat);

			resultdatestring = getDateToString(tdate, targetdateformat);
		} catch (Exception e) {
			throwException(e);
		}

		return resultdatestring;
	}

	/**
	 * Get a date from a string value. A formatted source is provided.
	 * 
	 * @param String Date formatted as a string, ex: "2003-12-11".
	 * 
	 * @param String Source SimpleDateFormat format, ex: "yyyy-MM-dd".
	 * 
	 * @return String Returns a java.util.Date
	 */
	public static java.util.Date getDate(String datestring,
	        String targetdateformat) throws DateUtilException {
		java.util.Date tdate = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat(targetdateformat);

			tdate = format.parse(datestring);
		} catch (ParseException e) {
			throwException(e);
		}

		return tdate;
	}

	/**
	 * Get a string date from a desired format
	 * 
	 * @param date The java.util.Date
	 * @param format The formatted used to create the date
	 * @return The generated date as a string
	 * @throws DateUtilException
	 */
	public static String getDateToString(java.util.Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("ss");
		String fdate = formatter.format(date);
		return fdate;
	}

	/**
	 * Get a date from a string value. A from / to formatted a source desired
	 * result respectively. A formatted date string is returned.<br>
	 * 
	 * @param String Date formatted as a string, ex: "2003-12-11".
	 * 
	 * @param String Source SimpleDateFormat format, ex: "yyyy-MM-dd".
	 * 
	 * @param String Target SimpleDateFormat format, ex: "dd/MM/yyyy".
	 * 
	 * @return String Returns a new formatted date format.
	 */
	public static String getDateToString(String datestring,
	        String sourcedateformat, String targetdateformat)
	        throws DateUtilException {
		String resultdatestring = null;
		try {
			java.util.Date date = getDate(datestring, sourcedateformat);
			resultdatestring = getDateToString(date, targetdateformat);
		} catch (Exception e) {
			throwException(e);
		}

		return resultdatestring;
	}

	/**
	 * Get a date from a string value. A from / to formatted a source desired
	 * result respectively. A formatted date string is returned.<br>
	 * 
	 * @param String Date formatted as a string, ex: "2003-12-11".
	 * 
	 * @param String Source SimpleDateFormat format, ex: "yyyy-MM-dd".
	 * 
	 * @param String Target SimpleDateFormat format, ex: "dd/MM/yyyy".
	 * 
	 * @return String Returns a new formatted date format.
	 */
	public static java.util.Date getDate(String datestring,
	        String sourcedateformat, String targetdateformat)
	        throws DateUtilException {
		java.util.Date fdate = null;
		try {
			java.util.Date date = getDate(datestring, sourcedateformat);
			fdate = getDate(date, targetdateformat);
		} catch (Exception e) {
			throwException(e);
		}

		return fdate;
	}

	/**
	 * Return a date formatted as yyyy-MM-dd
	 * 
	 * @param date
	 * @return
	 * @throws DateUtilException
	 */
	public static java.util.Date getSimpleDate(java.util.Date date)
	        throws DateUtilException {
		java.util.Date fdate = null;
		try {
			fdate = getDate(date, getSimpleDateFormat());
		} catch (DateUtilException e) {
			throwException(e);
		}
		return fdate;
	}

	/**
	 * Return a date formatted as yyyy-MM-dd
	 * 
	 * @param date as string
	 * @return
	 * @throws DateUtilException
	 */
	public static String getSimpleDateToString(java.util.Date date)
	        throws DateUtilException {
		String fdate = null;
		try {
			fdate = getDateToString(date, getSimpleDateFormat());
		} catch (DateUtilException e) {
			throwException(e);
		}
		return fdate;
	}

	/**
	 * Return a time formatted as HH_mm_ss
	 * 
	 * @param date as string
	 * @return
	 * @throws DateUtilException
	 */
	public static String getTimeToString(java.util.Date date)
	        throws DateUtilException {
		String time = null;
		try {
			time = getDateToString(date, FORMAT_HH_mm_ss);
		} catch (DateUtilException e) {
			throwException(e);
		}
		return time;
	}

	/**
	 * The old fashion new java.util.Date(date), creating a new date from a
	 * passed date is being deprecated. This is a convenience method which does
	 * it for the recommended Calendar date.
	 * 
	 * @param date
	 * @return
	 */
	public static java.util.Date getDate(java.util.Date date) {
		Calendar c2 = new GregorianCalendar();
		c2.setTime(date);

		return c2.getTime();
	}

	/**
	 * Move a date into the past or future year.
	 * 
	 * @param Date The target date to be moved into the past or future.
	 * 
	 * @param int The number of years in the future. If in the past use negative
	 *        numbers.
	 * 
	 * @return Date The future or past date.
	 */
	public static java.util.Date getMoveDateYears(java.util.Date curdate,
	        int days) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(curdate);
		c1.add(1, days);

		return c1.getTime();
	}

	/**
	 * Move a date into the past or future months.
	 * 
	 * @param Date The target date to be moved into the past or future.
	 * 
	 * @param int The number of months in the future. If in the past use
	 *        negative numbers.
	 * 
	 * @return Date The future or past date.
	 */
	public static java.util.Date getMoveDateMonths(java.util.Date curdate,
	        int days) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(curdate);
		c1.add(2, days);

		return c1.getTime();
	}

	/**
	 * Move a date into the past or future days.
	 * 
	 * @param Date The target date to be moved into the past or future.
	 * 
	 * @param int The number of days in the future. If in the past use negative
	 *        numbers.
	 * 
	 * @return Date The future or past date.
	 */
	public static java.util.Date getMoveDateDays(java.util.Date curdate,
	        int days) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(curdate);
		c1.add(5, days);

		return c1.getTime();
	}

	/**
	 * Get the last day for a month
	 * 
	 * @param Date The target date to last day of month
	 * 
	 * @return int The last day of the month.
	 */
	public static int getLastDayofMonth(java.util.Date curdate) {
		Calendar c2 = new GregorianCalendar();
		c2.setTime(curdate);

		return c2.getActualMaximum(5);
	}

	/**
	 * Date before another date
	 * 
	 * @param firstdate The date to start to
	 * 
	 * @param secondate The date to compare against
	 * 
	 * @param boolean true if first date is before second date
	 */
	public static boolean isDateBefore(java.util.Date firstdate,
	        java.util.Date secondate) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(firstdate);

		Calendar c2 = new GregorianCalendar();
		c2.setTime(secondate);

		return c1.before(c2);
	}

	/**
	 * Date after another date
	 * 
	 * @param firstdate The date to start to
	 * 
	 * @param secondate The date to compare against
	 * 
	 * @param boolean true if first date is before second date
	 */
	public static boolean isDateAfter(java.util.Date firstdate,
	        java.util.Date secondate) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(firstdate);

		Calendar c2 = new GregorianCalendar();
		c2.setTime(secondate);

		return c1.after(c2);
	}

	/**
	 * Dates equal
	 * 
	 * @param firstdate The date to start to
	 * 
	 * @param secondate The date to compare agaiknst
	 * 
	 * @param boolean true if firstdate is equal seconddate
	 */
	public static boolean isDateEqual(java.util.Date firstdate,
	        java.util.Date secondate) {
		Calendar c1 = new GregorianCalendar();
		c1.setTime(firstdate);

		Calendar c2 = new GregorianCalendar();
		c2.setTime(secondate);

		return c1.equals(c2);
	}

	public static long getDateDiffByYear(Date date1, Date date2)
	        throws DateUtilException {
		return date2.getYear() - date1.getYear();
	}

	public static long getDateDiffByMonth(Date date1, Date date2)
	        throws DateUtilException {
		int month = 12;
		long yeardif = getDateDiffByYear(date1, date2);
		log.info("yeardif: " + yeardif);

		int month1 = date1.getMonth();
		int month2 = date2.getMonth();
		int monthdif = month2 - month1;
		log.info("monthdif: " + monthdif);

		int day1 = date1.getDay();
		int day2 = date2.getDay();
		int daydiff = day2 = day1;
		log.info("daydiff: " + daydiff);

		if ((month2 < month1) || ((month1 == month2) && (day2 < day1))) {
			yeardif -= 1L;
			log.info("yeardif reset: " + yeardif);
		}

		return yeardif * month + monthdif;
	}

	public static long getDateDiffByDay(Date date1, Date date2)
	        throws DateUtilException {
		long hour = 86400000L;
		java.util.Date startDate = date1.getDate();
		java.util.Date endDate = date2.getDate();

		long startTime = startDate.getTime();
		long endTime = endDate.getTime();

		long diffTime = endTime - startTime;
		long diffDays = diffTime / hour;

		return diffDays;
	}

	public static long getDateDiffByDayUsingUtilDontUse(Date date1, Date date2)
	        throws DateUtilException {
		int month = 12;
		int year = 365;
		int days = 31;
		long yeardif = getDateDiffByYear(date1, date2);
		log.info("yeardif: " + yeardif);

		int month1 = date1.getMonth();
		int month2 = date2.getMonth();
		int monthdif = month2 - month1;
		log.info("monthdif: " + monthdif);

		int day1 = date1.getDay();
		int day2 = date2.getDay();
		int daydiff = day2 - day1;
		log.info("daydiff: " + daydiff);

		long calcyearsdif = yeardif * year;
		log.info("year calcyearsdif: " + calcyearsdif);
		long calcmonthdif = monthdif * days;
		log.info("month calcmonthdif: " + calcmonthdif);
		long calcdaydif = daydiff * days;
		log.info("day calcdaydif: " + calcdaydif);

		long calcdaysdif = calcyearsdif + calcmonthdif + calcdaydif;
		log.info("* calcdaysdif: " + calcdaysdif);

		return calcdaysdif;
	}

	/**
	 * Todo - get it to work. Currently does nothing.
	 * 
	 */
	public static java.util.Date getLeapYearDate(java.util.Date date) {
		/*
		 * if ( date.getYear() %4 == 0 ) { java.util.Calendar cal =
		 * java.util.Calendar.getInstance(); cal.setTime( date ); int newhour =
		 * (cal.AM_PM + cal.HOUR_OF_DAY + 2 ); cal.set( cal.HOUR_OF_DAY, newhour
		 * ); date = cal.getTime(); }
		 */

		return date;
	}

	private static void throwException(Exception e) throws DateUtilException {
		throw new DateUtilException(showException(e));
	}

	private static String showException(Exception e) {
		String errmsg = "A parameter is null, or the format is invalid: "
		        + e.getMessage();

		log.error(errmsg);

		return errmsg;
	}

	public static String getSimpleDateFormat() {
		return FORMATE_SIMPLEDATE;
	}

	public static void setSimpleDateFormat(String format) {
		FORMATE_SIMPLEDATE = format;
	}

}