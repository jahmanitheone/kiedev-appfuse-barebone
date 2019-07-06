package com.synodex.qcai.utils;
import java.io.File;
import java.io.IOException;
import java.util.List;
import junit.framework.Assert;
import org.apache.log4j.Logger;
import org.junit.Test;

public class FileUtilTest {
	private static Logger log = Logger.getLogger(FileUtilTest.class);

	@Test
	public void moveFile() {
		String path = "C:/synodexconnectfilestore/admin/to-synodex/tmp/clien1tiffile1.tiff";
		String tofile = "C:/synodexconnectfilestore/admin/to-synodex/xxx/clien1tiffile1.tiff";
		File src = new File(path);
		File dst = new File(tofile);

//		try {
//			FileUtil.moveFile(src, dst);
//		} catch (IOException e) {
//			log.error(e);
//		}
	}

	@Test
	public void moveFileUsingString() {
		String src = "C:/synodexconnectfilestore/admin/to-synodex/tmp/clien1tiffile1.tiff";
		String dst = "C:/synodexconnectfilestore/admin/to-synodex/xxx/clien1tiffile1.tiff";

//		try {
//			FileUtil.moveFile(src, dst);
//		} catch (IOException e) {
//			log.error(e);
//		}
	}

}
