package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.DataPointEntryCodeDao;
import com.teaminformatics.synodex.model.DataPointEntryCode;

public class DataPointEntryCodeDaoImpl extends LoadableDaoHibernate<DataPointEntryCode,Long> implements DataPointEntryCodeDao
{
	private static final Log log = LogFactory.getLog(DataPointEntryCodeDaoImpl.class);
	
	public DataPointEntryCodeDaoImpl()
    {
	    super(DataPointEntryCode.class);
    }

	public List<Long> getCasesForDataPointEntryCodes(final Long[] dataPointEntryCodeIds) {
		return this.getHibernateTemplate().execute(new HibernateCallback<List<Long>>(){
			public List<Long> doInHibernate(Session session) throws HibernateException, SQLException
            {
				String hql = "select distinct c.id from DataPointEntryCode as dpec inner join dpec._dpentry as dpe inner join dpe._page as p inner join p._case as c where dpec.id in (:ids)";
				
				Query queryObject = session.createQuery(hql);
				queryObject.setParameterList("ids", dataPointEntryCodeIds);
				return queryObject.list();
            }
			
		});
	}
}
