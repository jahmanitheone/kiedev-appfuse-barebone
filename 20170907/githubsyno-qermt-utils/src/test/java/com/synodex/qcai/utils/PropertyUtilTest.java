package com.synodex.qcai.utils;
import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class PropertyUtilTest {
	private static Logger log = Logger.getLogger(PropertyUtil.class);
	private static PropertyUtil proputil;

	@BeforeClass
	public static void setUp() {
		String path = DirectoryUtil.getBaseClassPath(PropertyUtilTest.class)
				+ "synodexconnect.properties";
		log.info("path: " + path);
		try {
			proputil = new PropertyUtil(path);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	@Test
	public void scBaseFileTransferPath() {
		String dir = proputil.getProperty("sc_filetransferbasepath");
		Assert.assertNotNull(dir);
		log.info(dir);
	}
}
