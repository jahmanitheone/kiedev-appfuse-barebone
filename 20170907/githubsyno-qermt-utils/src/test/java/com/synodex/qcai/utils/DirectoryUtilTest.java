package com.synodex.qcai.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class DirectoryUtilTest {
	private static Logger log = Logger.getLogger(DirectoryUtilTest.class);

	@Test
	public void makeDir() {
		String path = null;
		//path = "C:\\dev\\workspaceqermttool\\synodex-qermt-utils\\test";
		path = "C:/dev/workspaceqermttool/synodex-qermt-utils/test/";
		boolean created = DirectoryUtil.makeDir(path);
		if(!created)
			Assert.fail("Directory was not created");	
	}

	@Test
	public void getBaseClassPathFromClass() {
		String basepath = DirectoryUtil.getBaseClassPath(DirectoryUtil.class);
		Assert.assertNotNull(basepath);
		log.info("basepath: " + basepath);
	}

	@Test
	public void getBaseClassPath() {
		String basepath = DirectoryUtil.getBaseClassPath();
		Assert.assertNotNull(basepath);
		log.info("basepath: " + basepath);
	}

	@Test
	public void getFilesNames() {
		String path = null;
		path = "F:/workspacesynoceconnect/synodexconnect-web/src/main/webapp/resources/user/";
		path = "C:\\dev\\workspace\\synodexconnect-web\\src\\main\\webapp\\resources\\admin\\";
		log.info("1 path: " + path);
		path = DirectoryUtil.replaceSeperator(path);
		log.info("2 path: " + path);

		path = "F:\\workspacesynoceconnect\\synodexconnect-web\\src\\main\\webapp\\resources\\user\\";
		path = "C:/dev/workspace/synodexconnect-web/src/main/webapp/resources/admin/";
		log.info("3 path: " + path);
		path = DirectoryUtil.replaceSeperator(path);
		log.info("4 path: " + path);

		String[] files = DirectoryUtil.getFileNames(path);
		Assert.assertNotNull(files);
		log.info("files.size(): " + files.length);
		for (String file : files) {
			log.info(file);
		}
	}

	@Test
	public void getFiles() {
		String path = null;
		path = "C:/dev/workspace/synodexconnect-web/src/main/webapp/resources/admin/";

		List<File> files = DirectoryUtil.getFiles(path);
		Assert.assertNotNull(files);
		log.info("files.size(): " + files.size());
		for (File file : files) {
			log.info(file);
		}
	}

	@Test
	public void deleteDir() {
		String path = null;
		path = "C:/dev/workspace/synodexconnect-web/src/main/webapp/resources/user/tmp/";

		DirectoryUtil.deleteDir(new File(path), true);
	}

	@Test
	public void copyDirBadir() {
		String path = null;
		path = "C:/dev/bad";
		File indir = new File(path);
		File outdir = new File("c:/bad/");

		try {
			DirectoryUtil.copyDirectory(indir, outdir);
		} catch (IOException e) {
			//log.error(e);
			Assert.assertTrue(e.getMessage().contains("he system cannot find"));
		}
	}
	
}	
