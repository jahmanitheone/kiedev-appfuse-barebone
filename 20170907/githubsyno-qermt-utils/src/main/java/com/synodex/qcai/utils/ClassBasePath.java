package com.synodex.qcai.utils;

import java.net.URL;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Get the path information for a Class.
 * 
 * @author pchauvet
 * 
 */
public class ClassBasePath {
	private static final Log log = LogFactory.getLog(ClassBasePath.class);

	/**
	 * Get the class root path, that is the path including the /classes
	 * directory. * Example:<br>
	 * If the class is at c:/base/application/classes/mytarget.class, the
	 * directory c:/base/application/classes/ is returned.
	 * 
	 * @return String The base full path where the class is found.
	 */
	public static String getBaseClassPath() {
		String dir = ClassBasePath.getClassBasePath(ClassBasePath.class, "com");
		return dir;
	}

	/**
	 * Get the class root path, that is the path including the /classes
	 * directory. * Example:<br>
	 * If the class is at c:/base/application/classes/mytarget.class, the
	 * directory c:/base/application/classes/ is returned.
	 * 
	 * @param cclas
	 *            The class to get its root directory
	 * 
	 * @param subdirectory
	 *            Return the path without the subdirectory provided.
	 * 
	 * @return String The base full path where the class is found.
	 */
	public static String getClassBasePath(Class cclass, String subdirectory) {
		URL main = cclass.getResource("");
		String path = main.getPath().trim();

		path = fixFilePrefix(path);
		path = fixFilepathFromJar(path);
		path = fixLinuxHomePath(path);
		path = fixFileInJar(path);
		path = fixWindowsPath(path);
		
		if (subdirectory != null)
			path = extractSubDirectory(path, subdirectory);

		return path;
	}

	private static String fixFilePrefix(String path) {
		String extrainfo = "file:/";
		if (path.startsWith(extrainfo))
			path = path.substring(extrainfo.length() + 1);

		return path;
	}

	private static String fixFilepathFromJar(String path) {
		if (path.contains("lib/")) {
			int pos = path.indexOf("lib/");
			path = path.substring(0, pos);
		}

		return path;
	}

	private static String fixLinuxHomePath(String path) {
		if (path.contains("home")) {
			path = "/" + path;
		}
		return path;
	}

	/**
	 * If the path is from a jar, extract the real path
	 * 
	 * @param path
	 * @return
	 */
	private static String fixFileInJar(String path) {
		int pos = path.indexOf("jar");
		if (pos > 0) {
			path = path.substring(0, pos + 1);
		}
		// Remove the jar file
		pos = path.lastIndexOf("/");
		if (pos > 0) {
			path = path.substring(0, pos + 1);
		}

		return path;
	}

	/**
	 * In windows the path may may /C:xxxx, remove the first /
	 * 
	 * @param path
	 * @return
	 */
	private static String fixWindowsPath(String path) {
		int pos = path.indexOf(":");
		if (path.startsWith("/") && pos > 0)
			path = path.substring(1);

		return path;
	}

	/**
	 * Extract the path information from the directory, and return the path
	 * prefix.
	 * 
	 * @param path
	 * @param pathsuffix
	 * @return
	 */
	public static String extractSubDirectory(String path, String pathsuffix) {
		if (pathsuffix != null) {
			int pos = path.indexOf(pathsuffix);
			if (pos > 0) {
				path = path.substring(0, pos + 1);
			}
		}

		return path;
	}

}


