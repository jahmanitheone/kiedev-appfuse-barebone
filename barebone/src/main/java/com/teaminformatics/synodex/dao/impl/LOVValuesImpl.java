package com.teaminformatics.synodex.dao.impl;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.LOVValuesDao;
import com.teaminformatics.synodex.model.LOVValues;

public class LOVValuesImpl <T, PK extends Serializable> extends
LoadableDaoHibernate<T, PK> implements LOVValuesDao<T, PK> {
	
	 private Log log = LogFactory.getLog(getClass());
	    private Class<T> persistentClass = null;

	    public LOVValuesImpl(final Class<T> persistentClass) {
		super(persistentClass);
		this.persistentClass = persistentClass;
	    }

	    public LOVValuesImpl(final Class<T> persistentClass,
		    SessionFactory sessionFactory) {
		super(persistentClass, sessionFactory);
		this.persistentClass = persistentClass;
	    }

	public List<LOVValues> getLovValuesForExcluedePage() {
		return (List<LOVValues>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<LOVValues>>() {
				    public List<LOVValues> doInHibernate(Session session)
					    throws HibernateException, SQLException {
					String hql = null;
					try
					{
					    //get  lovValuese for excludePage based on the LOV id
						Criteria query = session.createCriteria(LOVValues.class);
					   /* hql = "SELECT lov.sequence,lov._lov,lov.lvid,lov.lovvalue" +
					    "FROM LOVValues lov " +
					    "WHERE lov._lov= 49 ";*/
						query.createAlias("_lov","lov");
						query.add(Restrictions.eq("lov.lovid", new Long(49)));
						query.addOrder(Order.asc("sequence"));
					    List<LOVValues> entries = query.list();
					    return entries;
					}
					catch(HibernateException he)
					{
					    he.printStackTrace();
					    throw he;
					}
					
				    }

				});
	}

}
