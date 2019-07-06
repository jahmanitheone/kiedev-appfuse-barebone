package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.synodex.model.Page;

public class PageDaoImpl extends LoadableDaoHibernate<Page,Long> implements PageDao
{
	private static final Log log = LogFactory.getLog(PageDaoImpl.class);
	
	public PageDaoImpl()
    {
	    super(Page.class);
    }

	public void rotate(final List<Long> pageIds, final Integer orientation)
    {
		this.getHibernateTemplate().execute(new HibernateCallback<Integer>(){
			public Integer doInHibernate(Session session) throws HibernateException, SQLException
            {
				Query queryObject = session.createQuery("update Page set orientation = :orientation where id in (:ids)");
				queryObject.setInteger("orientation", orientation);
				queryObject.setParameterList("ids", pageIds);
				return queryObject.executeUpdate();
            }
			
		});
		
		//this.getHibernateTemplate().bulkUpdate("update Page set orientation = ? where id in (?)", orientation, pageIds);
    }

	public List<Long> getCasesForPages(final Long[] pageIds)
    {
		return this.getHibernateTemplate().execute(new HibernateCallback<List<Long>>(){
			public List<Long> doInHibernate(Session session) throws HibernateException, SQLException
            {
				Query queryObject = session.createQuery("select distinct c.id from Page as p inner join p._case as c where p.id in (:ids)");
				queryObject.setParameterList("ids", pageIds);
				return queryObject.list();
            }
			
		});
    }

	public List<Long> getCasesForContentItems(final String[] contentIds)
    {
		return this.getHibernateTemplate().execute(new HibernateCallback<List<Long>>(){
			public List<Long> doInHibernate(Session session) throws HibernateException, SQLException
            {
				Query queryObject = session.createQuery("select distinct c.id from Page as p inner join p._case as c where p.spContentID in (:ids)");
				queryObject.setParameterList("ids", contentIds);
				return queryObject.list();
            }
		});
    }

	public Integer getPagesCountForCase(final Long caseId) {
	
		return this.getHibernateTemplate().execute(new HibernateCallback<Integer>(){
			public Integer doInHibernate(Session session) throws HibernateException, SQLException
            {
				Integer pageCount=0;
				Query query = session.createSQLQuery("select count(*) as Count from pages where ISDELETED='N' and CASEID=:caseId").addScalar("Count",StandardBasicTypes.INTEGER);
				query.setLong("caseId", caseId);
				if(query.list() != null && query.list().size() > 0)
					pageCount = (Integer) query.list().get(0);
				return pageCount;
            }
		});
	}
}
