package com.synodex.qcai.utils;

import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;
import org.apache.log4j.Logger;

/**
 * Property file handling util
 * 
 * @author Philip Jahmani Chauvet (pchauvet)
 */
public class PropertyUtil {
	private static Logger log = Logger.getLogger(PropertyUtil.class);
	private Properties props = null;

	/**
	 * Get the properties from a property file.
	 * 
	 * @param String
	 *            The full path to the the property file.
	 * @return Properties The properties read from the file.
	 */
	public PropertyUtil(String path) throws Exception {
		try {
			props = new Properties();
			log.info("========================================================================================================>>>>> Property Path - " + path);
			props.load(new FileInputStream(path));
		} catch (IOException e) {
			throw new Exception("Property file " + path + " was not loaded!");
		}
	}

	/**
	 * Get a property.
	 * 
	 * @param String
	 *            A property name to read.
	 * @param String
	 *            Directory to read property from.
	 * @return String The property value read.
	 */
	public static String getProperty(String propname, String path) {
		String propvalue = "";
		Properties props = new Properties();
		FileInputStream in = null;
		try {
			in = new java.io.FileInputStream(path);
			props.load(in);

			propvalue = props.getProperty(propname);
		} catch (Exception e) {
			log.error(e.getMessage());
		} finally {
			try {
				if (in != null)
					in.close();
			} catch (Exception e) {
			}
		}

		return propvalue;
	}

	/**
	 * Get a property.
	 * 
	 * @param String
	 *            A property name to read.
	 * @param String
	 *            Directory to read property from.
	 * @return String The property value read.
	 */
	public String getProperty(String propname) {
		String propvalue = "";
		try {
			propvalue = props.getProperty(propname);
		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return propvalue;
	}

}
