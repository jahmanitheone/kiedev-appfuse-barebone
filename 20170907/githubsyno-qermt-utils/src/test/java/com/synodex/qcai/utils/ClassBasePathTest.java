package com.synodex.qcai.utils;

import static org.junit.Assert.*;

import java.net.URL;

import junit.framework.Assert;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.junit.Test;

public class ClassBasePathTest {
	private static Logger log = Logger.getLogger(ClassBasePathTest.class);


	@Test
	public void getBaseClassPathFromClass() {
		String basepath = ClassBasePath.getClassBasePath(ClassBasePathTest.class, "com");
		Assert.assertNotNull(basepath);
		log.info("basepath: " + basepath);
	}

	@Test
	public void getBasexClassPathFromClassInJar() {		
		java.net.URL main = ExceptionUtils.class.getResource("");
		String path = main.getPath().trim();
		log.info(path);

		path = ClassBasePath.getClassBasePath(ExceptionUtils.class, "com");
		Assert.assertNotNull(path);
		log.info(path);
	}

}
