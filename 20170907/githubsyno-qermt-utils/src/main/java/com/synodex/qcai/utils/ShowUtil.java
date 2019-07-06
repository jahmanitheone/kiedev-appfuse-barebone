package com.synodex.qcai.utils;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import org.apache.log4j.Logger;

/*
 * Fancy logging messages
 * 
 * @author Philip Jahmani Chauvet pchauvetg@synodex.com
 */
public class ShowUtil {
	private static boolean showLog = true;

	public static void showList(Logger log, String name, List<String> words) {
		name = name == null ? "" : name;
		ShowUtil.showInfo(log, "--> " + name + ": list count: " + words.size());
		ShowUtil.showInfo(log,
				Arrays.toString(words.toArray(new String[words.size()])));
	}

	public static void showArray(Logger log, String name, String[] words) {
		name = name == null ? "" : name;
		ShowUtil.showInfo(log, "--> " + name + ": array count: " + words.length);
		ShowUtil.showInfo(log, Arrays.toString(words));
	}

	public static void showComboList(Logger log, String name,
			LinkedList<String[]> combolist) {
		name = name == null ? "" : name;
		ShowUtil.showInfo(log,
				"--> " + name + ": combo count: " + combolist.size());
		for (String[] words : combolist)
			ShowUtil.showInfo(log, Arrays.toString(words));
	}

	public static void showSection(Logger log, String section) {
		ShowUtil.showInfo(log, "");
		section = "++++++++++++++++++++++++ [" + section
				+ "] ++++++++++++++++++++++++";
		ShowUtil.showInfo(log, section);
		ShowUtil.showInfo(log, "");
	}

	public static void showSectionNoSpacer(Logger log, String section) {
		section = "++++++++++++++++++++++++ [" + section
				+ "] ++++++++++++++++++++++++";
		ShowUtil.showInfo(log, section);
	}

	public static void showWarnSection(Logger log, String section) {
		ShowUtil.showWarn(log, "");
		section = "++++++++++++++++++++++++ [" + section
				+ "] ++++++++++++++++++++++++";
		ShowUtil.showWarn(log, section);
		ShowUtil.showWarn(log, "");
	}

	public static void showErrorSection(Logger log, String section) {
		ShowUtil.showError(log, "");
		section = "++++++++++++++++++++++++ [" + section
				+ "] ++++++++++++++++++++++++";
		ShowUtil.showError(log, section);
		ShowUtil.showError(log, "");
	}

	public static void showSectionUnFlagged(Logger log, String section) {
		log.info("");
		section = "++++++++++++++++++++++++ [" + section
				+ "] ++++++++++++++++++++++++";
		log.info(section);
		log.info("");
	}

	public static void showMainSection(Logger log, String section) {
		ShowUtil.showInfo(log, "");
		ShowUtil.showInfo(
				log,
				"**********************************************************************************");
		ShowUtil.showInfo(log, section);
		ShowUtil.showInfo(
				log,
				"**********************************************************************************");
		ShowUtil.showInfo(log, "");
	}

	public static void showMainSectionUnFlagged(Logger log, String section) {
		log.info("");
		log.info("**********************************************************************************");
		log.info(section);
		log.info("**********************************************************************************");
		log.info("");
	}

	public static void showMainSectionNoSpacer(Logger log, String section) {
		ShowUtil.showInfo(
				log,
				"**********************************************************************************");
		ShowUtil.showInfo(log, section);
		ShowUtil.showInfo(
				log,
				"**********************************************************************************");
	}

	public static void showSubSectionNoSpacer(Logger log, String section) {
		ShowUtil.showInfo(
				log,
				"----------------------------------------------------------------------------------");
		ShowUtil.showInfo(log, section);
		ShowUtil.showInfo(
				log,
				"----------------------------------------------------------------------------------");
	}

	public static void showSubSection(Logger log, String section) {
		ShowUtil.showInfo(log, "");
		ShowUtil.showInfo(
				log,
				"----------------------------------------------------------------------------------");
		ShowUtil.showInfo(log, section);
		ShowUtil.showInfo(
				log,
				"----------------------------------------------------------------------------------");
		ShowUtil.showInfo(log, "");
	}

	public static void showWarnSubSection(Logger log, String section) {
		ShowUtil.showWarn(log, "");
		ShowUtil.showWarn(
				log,
				"----------------------------------------------------------------------------------");
		ShowUtil.showWarn(log, section);
		ShowUtil.showWarn(
				log,
				"----------------------------------------------------------------------------------");
		ShowUtil.showWarn(log, "");
	}

	public static void showSimpleMarker(Logger log) {
		ShowUtil.showInfo(log, "---------------------");
	}

	public static void showDotMarker(Logger log) {
		ShowUtil.showInfo(log, ".");
	}

	public static void showDashMarker(Logger log) {
		ShowUtil.showInfo(log, "-");
	}

	public static void showInfo(Logger log, Object msg) {
		if (isShowLog())
			log.info(msg);
	}

	public static void showWarn(Logger log, Object msg) {
		if (isShowLog())
			log.warn(msg);
	}

	public static void showDebug(Logger log, Object msg) {
		if (isShowLog())
			log.debug(msg);
	}

	public static void showError(Logger log, Object msg) {
		if (isShowLog())
			log.error(msg);
	}

	public static boolean isShowLog() {
		return showLog;
	}

	public static void setShowLog(boolean show) {
		showLog = show;
	}

	public static void showDashSeperator(Logger log) {
		ShowUtil.showInfo(log, "");
		ShowUtil.showInfo(log, "-");
		ShowUtil.showInfo(log, "");
	}

	public static void showDotSeperator(Logger log) {
		ShowUtil.showInfo(log, "");
		ShowUtil.showInfo(log, ".");
		ShowUtil.showInfo(log, "");
	}

}
