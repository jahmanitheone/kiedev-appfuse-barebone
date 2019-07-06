package com.synodex.qcai.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.apache.log4j.Logger;

/**
 * Utility for getting time interval
 * 
 * 1. Interval can be started by calling: getInstance() method
 * 
 * 2. Once started it can be restared by calling: beg() method
 * 
 * 3. Finally, the time inteval is stopped by calling: end() method. Once
 * called, all inteval variations are calculated.
 * 
 * @author Philip Jahmani Chauvet pchauvet@synodex.com
 */
public class TimerUtil {
	private final static Logger log = Logger.getLogger(TimerUtil.class);
	private Calendar startTime;
	private Calendar endTime;
	private long intervalDays;
	private long intervalHours;
	private long intervalMinutes;
	private long intervalSeconds;
	private long intervalMilliseconds;
	private String formatedTimeInterval;

	private TimerUtil() {
		startTime = Calendar.getInstance();
	}

	/**
	 * Start the time interval
	 */
	public static TimerUtil getInstance() {
		return new TimerUtil();
	}

	/**
	 * Restart the time interval
	 */
	public void beg() {
		startTime = Calendar.getInstance();
	}

	/**
	 * End the time interval
	 */
	public void end() {
		if (endTime == null)
			endTime = Calendar.getInstance();

		calculateTimeInterval();
	}

	private void calculateTimeInterval() {
		intervalMilliseconds = endTime.getTimeInMillis()
				- startTime.getTimeInMillis();
		intervalDays = intervalMilliseconds / (24 * 60 * 60 * 1000);
		intervalHours = intervalMilliseconds / (60 * 60 * 1000);
		intervalMinutes = intervalMilliseconds / (60 * 1000);
		intervalSeconds = intervalMilliseconds / 1000;

		setFormatedTime(intervalDays, intervalHours, intervalMinutes,
				intervalSeconds, intervalMilliseconds);
	}

	private void setFormatedTime(long dDays, long dHours, long dMinutes,
			long dSeconds, long dMilliseconds) {
		String timemsg = "";

		long tmphours = dHours;
		long tmpminutes = dMinutes - (dHours * 60);
		long tmpseconds = dSeconds - (dMinutes * 60);
		long tmpmilliseconds = dMilliseconds - (dSeconds * 1000);

		/*
		 * ShowUtil.showInfo(log, "tmphours: " + tmphours);
		 * ShowUtil.showInfo(log, "tmpminutes: " + tmpminutes);
		 * ShowUtil.showInfo(log, "tmpseconds: " + tmpseconds);
		 * ShowUtil.showInfo(log, "tmpmilliseconds: " + tmpmilliseconds);
		 */
		timemsg = padTimeDigit(tmphours) + ":" + padTimeDigit(tmpminutes) + ":"
				+ padTimeDigit(tmpseconds) + "." + tmpmilliseconds;

		formatedTimeInterval = timemsg;
	}

	/**
	 * Set the calendar date using this date format
	 * 
	 * @param sdate
	 *            The date as a formated string: MM-dd-yyyy hh:mm:ss.S, where
	 *            capital S is the milliseconds.
	 * 
	 * @return Calendar The date as calendar object.
	 */
	public Calendar setDateAsMM_dd_yyyy_HH_mm_SS(String sdate) {
		// String str_date = "09-1-13 4:17:0";
		Calendar cal = null;
		try {
			DateFormat formatter = new SimpleDateFormat("MM-dd-yyyy hh:mm:ss.S");
			Date date = (Date) formatter.parse(sdate);
			cal = Calendar.getInstance();
			cal.setTime(date);
		} catch (ParseException e) {
			log.warn(sdate + "was not set");
		}

		return cal;
	}

	private String padTimeDigit(long ttime) {
		String fmttime = "" + ttime;
		if (ttime < 10)
			fmttime = "0" + ttime;

		return fmttime;
	}

	public Calendar getStartTime() {
		return startTime;
	}

	public void setStartTime(Calendar startTime) {
		this.startTime = startTime;
	}

	public Calendar getEndTime() {
		return endTime;
	}

	public void setEndTime(Calendar endTime) {
		this.endTime = endTime;
	}

	/**
	 * Get the time interval as a formatted message
	 * 
	 * @return the formatedTimeInterval
	 */
	public String getFormatedTimeInterval() {
		return formatedTimeInterval;
	}

	public long getIntervalDays() {
		return intervalDays;
	}

	public long getIntervalHours() {
		return intervalHours;
	}

	public long getIntervalMinutes() {
		return intervalMinutes;
	}

	public long getIntervalSeconds() {
		return intervalSeconds;
	}

	public long getIntervalMilliseconds() {
		return intervalMilliseconds;
	}

	@Override
	public String toString() {
		return "TimerUtil [startTime=" + startTime.getTime() + ", endTime="
				+ endTime.getTime() + ", intervalDays=" + intervalDays
				+ ", intervalHours=" + intervalHours + ", intervalMinutes="
				+ intervalMinutes + ", intervalSeconds=" + intervalSeconds
				+ ", intervalMilliseconds=" + intervalMilliseconds
				+ ", formatedTimeInterval=" + formatedTimeInterval + "]";
	}

}
