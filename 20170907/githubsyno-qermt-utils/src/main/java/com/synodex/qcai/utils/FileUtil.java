package com.synodex.qcai.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import org.apache.log4j.Logger;

/**
 * File Utility for reading, getting file path from the class name, etc..
 */
public class FileUtil {
	private final static Logger log = Logger.getLogger(FileUtil.class);
	private FileWriter filewriter;

	/**
	 * Read the file contents of a text file, and return it in a String.
	 * 
	 * @param aFile
	 *            Full path for a file to read.
	 * @throws FileUtilException
	 */
	public static String readFile(File aFile) throws FileUtilException {
		StringBuilder contents = new StringBuilder();

		try {
			BufferedReader input = new BufferedReader(new FileReader(aFile));
			try {
				String line = null; // not declared within while loop
				while ((line = input.readLine()) != null) {
					contents.append(line);
					contents.append(System.getProperty("line.separator"));
				}
			} finally {
				input.close();
			}
		} catch (IOException ex) {
			log.warn(ex);
			// ex.printStackTrace();
			throw new FileUtilException(ex.getMessage());
		}

		return contents.toString();
	}

	public static void write(String file, String data) throws Exception {
		try {
			FileWriter out = new FileWriter(file);
			out.write(data);
			out.flush();
			out.close();
		} catch (IOException e) {
			throw new Exception(e);
		}
	}

	public static void delete(String file) throws Exception {
		try {
			if (file != null)
				throw new Exception("File parameter can not be null");

			File tfile = new File(file);
			tfile.delete();
			log.info("Deleted " + file);
		} catch (IOException e) {
			log.error("Deleted failed, it may not exist: " + file);
			throw new Exception(e);
		}
	}

}
