package com.synodex.qcai.utils;

import java.text.SimpleDateFormat;
import org.apache.log4j.Logger;

public class Date {
	private static Logger log = Logger.getLogger(DateUtil.class);
	private static final long serialVersionUID = -7658979440734657569L;
	java.util.Date date;
	int year;
	int month;
	int day;
	int hour;
	int minute;
	int second;
	int milliSecond;

	public Date(java.util.Date date) throws DateUtilException {
		this.date = date;

		setDateInfo();
	}

	public Date(String date, String format) throws DateUtilException {
		this.date = DateUtil.getDate(date, format);

		setDateInfo();
	}

	private void setDateInfo() throws DateUtilException {
		setYear();
		setMonth();
		setDay();
		setHour();
		setMinute();
		setSecond();
		setMilliSecond();
	}

	public java.util.Date getDate() {
		return this.date;
	}

	public void setDate(java.util.Date date) {
		this.date = date;
	}

	public int getYear() {
		return this.year;
	}

	public int getMonth() {
		return this.month;
	}

	public int getDay() {
		return this.day;
	}

	public int getHour() {
		return this.hour;
	}

	public int getMinute() {
		return this.minute;
	}

	public int getSecond() {
		return this.second;
	}

	public int getMilliSecond() {
		return this.milliSecond;
	}

	private void setYear() throws DateUtilException {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy");

			String fdate = formatter.format(this.date);
			this.year = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
			throwException(e);
		}
	}

	private void setMonth() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("MM");

			String fdate = formatter.format(this.date);
			this.month = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private void setDay() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("dd");

			String fdate = formatter.format(this.date);
			this.day = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private void setHour() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("HH");

			String fdate = formatter.format(this.date);
			this.hour = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private void setMinute() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("mm");

			String fdate = formatter.format(this.date);
			this.minute = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private void setSecond() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("ss");

			String fdate = formatter.format(this.date);
			this.second = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private void setMilliSecond() {
		try {
			SimpleDateFormat formatter = new SimpleDateFormat("SSS");

			String fdate = formatter.format(this.date);
			this.milliSecond = Integer.parseInt(fdate);
		} catch (Exception e) {
			showException(e);
		}
	}

	private static String showException(Exception e) {
		String errmsg = "The format is invalid: " + e.getMessage();
		log.error(errmsg);

		return errmsg;
	}

	private static void throwException(Exception e) throws DateUtilException {
		throw new DateUtilException(showException(e));
	}

	public int getDateValue() {
		return this.year + this.month + this.day + this.hour + this.minute
		        + this.second + this.milliSecond;
	}

	public int hashCode() {
		return this.date.hashCode() * getDateValue();
	}

	public boolean equals(Object o) {
		if (this.date.equals(o)) {
			return true;
		}
		return false;
	}

	public String toString() {
		return "Date [date=" + this.date + ", year=" + this.year + ", month="
		        + this.month + ", day=" + this.day + ", hour=" + this.hour
		        + ", minute=" + this.minute + ", second=" + this.second
		        + ", milliSecond=" + this.milliSecond + "]";
	}
}