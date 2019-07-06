package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.NotableDao;
import com.teaminformatics.synodex.dao.PageDao;
import com.teaminformatics.synodex.model.Notable;
import com.teaminformatics.synodex.model.Page;

public class NotableDaoImpl extends LoadableDaoHibernate<Notable,Long> implements NotableDao
{
	private static final Log log = LogFactory.getLog(NotableDaoImpl.class);
	
	public NotableDaoImpl()
    {
	    super(Notable.class);
    }

	public List<Long> getCasesForNotables(final Long[] notableIds)
    {
		return this.getHibernateTemplate().execute(new HibernateCallback<List<Long>>(){
			public List<Long> doInHibernate(Session session) throws HibernateException, SQLException
            {
				Query queryObject = session.createQuery("select distinct c.id from Notable as n inner join n.caseid as c where n.id in (:ids)");
				queryObject.setParameterList("ids", notableIds);
				return queryObject.list();
            }
		});
    }
}
