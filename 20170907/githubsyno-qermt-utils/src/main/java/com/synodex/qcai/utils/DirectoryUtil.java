package com.synodex.qcai.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

public class DirectoryUtil {
	private final static Logger log = Logger.getLogger(DirectoryUtil.class);

	public static String getBaseClassPath() {
		String dir = ClassBasePath.getClassBasePath(DirectoryUtil.class, "com");
		return dir;
	}

	/**
	 * Get the root class path location of a class. Used to get the full path of
	 * the ./classes directory for a class. The class has to have the "com" in
	 * the package file.
	 * 
	 * @See String getClassBasePath(Class cclass, String packagemarker)
	 * 
	 * @param Class
	 *            The class to determine path.
	 * 
	 * @return String The full path of the class file. That is the .../classes/
	 *         directory. The full packaged path is not return, but root
	 *         directory of ../classes/
	 */
	public static String getBaseClassPath(Class tclass) {
		return ClassBasePath.getClassBasePath(tclass, "com");
	}

	/**
	 * Get the file names from a directory path
	 * 
	 * @param path
	 *            The directory to list files.
	 * 
	 * @return String[] The names of the files, Else length = 0;
	 */
	public static String[] getFileNames(String path) {
		return listFileNames(new File(replaceSeperator(path)));
	}

	/**
	 * Get the files from a directory path
	 * 
	 * @param path
	 *            The directory to list files.
	 * 
	 * @return List<File> The files, Else length = 0;
	 */
	public static List<File> getFiles(String path) {
		return listFiles(new File(replaceSeperator(path)));
	}

	/**
	 * List the files of a directory. No subdirectory listing.
	 * 
	 * @param File
	 *            The directory to list.
	 * 
	 * @return String[] The names of the files referencing the full path, Else
	 *         length = 0;
	 */
	private static String[] listFileNames(File dir) {
		boolean isDir = dir.isDirectory();
		ArrayList<String> files = new ArrayList<String>();
		File tmpfile = null;

		if (isDir) {
			String[] children = dir.list();
			if (children != null) {
				for (int i = 0; i < children.length; i++) {
					tmpfile = new File(dir + "/" + children[i]);
					if (!tmpfile.isDirectory())
						files.add(tmpfile.getAbsolutePath());
				}
			}
		}

		return toStringArray(files.toArray());
	}

	/**
	 * List the files of a directory. No subdirectory listing.
	 * 
	 * @param File
	 *            The directory to list.
	 * 
	 * @return List<File> The list of files read
	 */
	private static List<File> listFiles(File dir) {
		boolean isDir = dir.isDirectory();
		ArrayList<File> files = new ArrayList<File>();
		File tmpfile = null;

		if (isDir) {
			String[] children = dir.list();
			if (children != null) {
				for (int i = 0; i < children.length; i++) {
					tmpfile = new File(dir + "/" + children[i]);

					if (!tmpfile.isDirectory())
						files.add(tmpfile);
				}
			}
		}

		return files;
	}

	/**
	 * Convert an object[] to its String[] array
	 */
	private static String[] toStringArray(Object[] a) {
		if (a == null)
			return null;

		String[] as = new String[a.length];
		System.arraycopy(a, 0, as, 0, as.length);

		return as;
	}

	/**
	 * Make a directory if it does not exist.
	 * 
	 * @param String
	 *            The directory to created.
	 * 
	 * @return false if the directory is invalid. true if directory exist or
	 *         created new directory.
	 */
	public static boolean makeDir(String path) {
		if (!DirectoryUtil.validateDir(path)) {
			newDir(path);
		}

		return true;
	}

	/**
	 * Create a new directory.
	 * 
	 * @param String
	 *            The directory to create.
	 * 
	 * @return boolean true if the directoy was created or exist, false
	 *         otherwise.
	 */
	private static boolean newDir(String directory) {
		boolean rtrn = false;

		try {
			File newDir = new File(replaceSeperator(directory));
			rtrn = newDir.mkdirs();
		} catch (Exception e) {
		}

		return rtrn;
	}

	/**
	 * iS path is valid.
	 * 
	 * @param String
	 *            The directory to validated.
	 * 
	 * @return boolean true if the exist, false otherwise.
	 */
	public static boolean validateDir(String dir) {
		if (dir == null || dir.trim().equals(""))
			return false;

		File newDir = new File(replaceSeperator(dir));

		// Test if file exist and is directory
		if (newDir.exists() && newDir.isDirectory()) {
			return true;
		}

		return false;
	}

	/**
	 * Replace the path seperator \, //, ; or / with Java's File.separator and
	 * path is closed by adding last /.
	 * 
	 * @param String
	 *            The directory to replace seperator
	 * 
	 * @return String The directory with the replaced seperator.
	 */
	public static String replaceSeperator(String path) {
		String fixpath = path;
		String SEPERATORS[] = { "////", "\\\\", ";", "//", "\\", "/\\" };

		for (int i = 0; i < SEPERATORS.length; i++) {
			fixpath = replaceAString(fixpath, SEPERATORS[i], "/");
		}

		fixpath = addLastSlath(fixpath);

		return fixpath;
	}

	/**
	 * Replace all occurence of a string
	 * 
	 * @param String
	 *            Original source string
	 * 
	 * @param String
	 *            Targeted string to look for
	 * 
	 * @param String
	 *            Targeted new string value
	 * 
	 * @return String Changed string or original if string is not found
	 */
	public static String replaceAString(String srcstring, String frmstring,
			String tostring) {
		String pulledstring = null;
		String rmdrstring = srcstring;
		String replacestring = "";
		int begpos, endpos;
		StringBuffer buf = null;

		if (srcstring == null || frmstring == null || tostring == null)
			return "";

		begpos = rmdrstring.indexOf(frmstring);
		while (begpos >= 0) {
			endpos = begpos + frmstring.length();

			if (endpos < rmdrstring.length()) {
				// Pull 1st occurance
				pulledstring = rmdrstring.substring(0, endpos);
				// Get the remaind line
				rmdrstring = rmdrstring.substring(endpos, rmdrstring.length());
			} else {
				pulledstring = rmdrstring;
				rmdrstring = "";
			}

			// Replace string
			buf = new StringBuffer(pulledstring);
			replacestring += buf.replace(begpos, endpos, tostring);

			begpos = rmdrstring.indexOf(frmstring);
		}

		replacestring += rmdrstring;

		return replacestring;
	}

	public static void copyDirectory(String srcdir, String trgdir)
			throws IOException {
		copyDirectory(new File(srcdir), new File(trgdir));
	}

	/**
	 * Copy a source to a target directory recursively.
	 * 
	 * @param File
	 *            Source directory.
	 * 
	 * @param File
	 *            Target directory.
	 */
	public static void copyDirectory(File srcDir, File dstDir)
			throws IOException {
		log.info("Copying " + srcDir + " to " + dstDir);
		if (srcDir.isDirectory()) {
			if (!dstDir.exists()) {
				dstDir.mkdir();
			}

			String[] children = srcDir.list();
			for (int i = 0; i < children.length; i++) {
				copyDirectory(new File(srcDir, children[i]), new File(dstDir,
						children[i]));
			}
		} else {
			copyFile(srcDir, dstDir);
		}
	}

	/**
	 * Copy a file.
	 * 
	 * @param File
	 *            Source file.
	 * 
	 * @param File
	 *            Target file.
	 */
	public static void copyFile(File src, File dst) throws IOException {
		if (src.isDirectory()) {
			// System.out.println( "The source file" + src + " is a directory"
			// );
			return;
		}
		if (dst.isDirectory()) {
			// System.out.println( "The target file" + dst + " is a directory"
			// );
			return;
		}

		InputStream in = new FileInputStream(src);
		OutputStream out = new FileOutputStream(dst);

		// Transfer bytes from in to out
		byte[] buf = new byte[1024];
		int len;
		while ((len = in.read(buf)) > 0) {
			out.write(buf, 0, len);
		}

		in.close();
		out.close();
	}

	/**
	 * Get the fulll path of a class.
	 * 
	 * @param Class
	 *            The class to determine path.
	 * 
	 * @return String The full path of the class file.
	 */
	public static String getPath(Class theclass) {
		String propfiledir = null;
		try {
			// Setup the default directory path
			propfiledir = theclass.getResource("").toString();
			// getProtectionDomain().getCodeSource().getLocation().toString();
			propfiledir = java.net.URLDecoder.decode(propfiledir);
			// Get rid of "file:"
			propfiledir = propfiledir.substring(5, propfiledir.length());
			// Windows type propfiledir - Get rid of initial /
			if (propfiledir.indexOf(":") > 0)
				propfiledir = propfiledir.substring(1, propfiledir.length());
		} catch (Exception e) {
			propfiledir = null;
		}

		return propfiledir;
	}

	/**
	 * Returns the active root directory of a directory based on the URL of a
	 * Web Context.
	 * 
	 * @return String The current set root directory base on the URL of the
	 *         directory returned from getDirectory(). The setDirectory() should
	 *         have been used to set the root directory.
	 * 
	 *         Todo: Work on this - Getting the root directory for a Web
	 *         context.
	 */
	public String getRoot(String dir) {
		URL url = null;

		try {
			url = DirectoryUtil.class.getClass().getResource(
					replaceSeperator(dir));
			if (url == null) {
				log.info("root directory does not exist!");
			}
		} catch (Exception e) {
			log.info("" + e);
		}

		return url.toString();
	}

	/**
	 * Recursive delete a directory, includes subdirectories.
	 * 
	 * @param File
	 *            The directory to delete.
	 * 
	 * @param boolean true to show files, else false
	 * 
	 * @return true if directory is delete, else false.
	 */
	public boolean delete(File dir, boolean showfiles) {
		boolean isDir = dir.isDirectory();
		boolean notrootdir = false;

		if (isDir) {
			String[] children = dir.list();
			if (children != null) {
				for (int i = 0; i < children.length; i++) {
					File child = new File(dir, children[i]);
					boolean childisDir = child.isDirectory();
					boolean success = delete(child, showfiles);
					if (!success) {
						return false;
					} else {
						if (showfiles && !childisDir)
							log.info((success ? "Deleted "
									: "Could not delete ") + child);
					}
				}
			}
		}

		boolean success = false;
		if (!notrootdir) {
			success = dir.delete();
			if (isDir) {
				log.info((success ? "Deleted " : "Could not delete ")
						+ dir.getPath());
			}
		}

		return success;
	}

	/**
	 * Delete a file
	 * 
	 * @param File
	 *            The file to delete.
	 * 
	 * @return true if file is delete, else false.
	 */
	public static boolean delFile(File file) {
		boolean success = false;
		if (!file.isDirectory())
			success = file.delete();

		return success;
	}

	/**
	 * Recursive delete a directory, includes subdirectories.
	 * 
	 * @param File
	 *            The directory to delete.
	 * 
	 * @param boolean true to show files, else false
	 * 
	 * @param boolean true to delete the root directory, else false Ex:
	 *        ../xx/root - true to delete root.
	 * 
	 * @return true if directory is delete, else false.
	 */
	public static boolean deleteDir(File dir, boolean showfiles) {
		DirectoryUtil directoryutil = new DirectoryUtil();
		return directoryutil.delete(dir, showfiles);
	}

	/**
	 * Make sure a path has the last last
	 * 
	 * @param String
	 *            The path to add the /
	 * 
	 * @return String The directory with added /
	 */
	public static String addLastSlath(String path) {
		if (path != null) {
			if (path.charAt(path.length() - 1) != '/')
				path += "/";
		}

		return path;
	}

	
	
	
}
