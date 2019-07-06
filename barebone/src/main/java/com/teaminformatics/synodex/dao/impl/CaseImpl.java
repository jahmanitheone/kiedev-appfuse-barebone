package com.teaminformatics.synodex.dao.impl;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import net.sf.ehcache.hibernate.management.impl.BeanUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.CaseDao;
import com.teaminformatics.synodex.model.Case;

public class CaseImpl<T, PK extends Serializable> extends
	LoadableDaoHibernate<T, PK> implements CaseDao<T, PK> {
	private Log log = LogFactory.getLog(getClass());
	
    public CaseImpl(Class<T> persistentClass) {
		super(persistentClass);
	}

    public List <Case> getCase(final Long caseId ) throws Exception{
	return (List<Case>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<Case>>() {
		    public List<Case> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			
			String hql ;
			
			try
			{
			    hql = "from Case entry where caseid :caseid";
			    Query query = session.createQuery(hql);
			    query.setLong("caseid", caseId);
			    
			    List<Case> entries = query.list();
			    //lazy load the codes for better performance when we don't need them
			    for (Case entry : entries){
			    	for (String property : new String[]{"codes"}) {
			    		log.debug("loading property [" + property
			    				+ "] for hibernate object.");
			    		Hibernate.initialize(BeanUtils.getBeanProperty(entry, property));
				  
			    	}
			    }
	
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
