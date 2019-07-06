package com.teaminformatics.synodex.dao.impl;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.teaminformatics.synodex.dao.PageDao;

@ContextConfiguration
public class PageDaoTest extends
AbstractTransactionalJUnit4SpringContextTests {
	
	@Autowired
	protected PageDao pageDao;
	
	
	@Test
	public void getPagesCountForCase()
	{
		Long caseId=new Long(1884);
		try{
			Integer pageCount=pageDao.getPagesCountForCase(caseId);
			//Assert.assertNotNull(pageCount);
			//Assert.assertEquals(new Integer(6), pageCount);
		}catch(Exception e)
		{
			Assert.fail(e.getMessage());	
		}
	}

}
