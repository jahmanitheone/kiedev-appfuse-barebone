package com.teaminformatics.synodex.dao.impl;

import static org.appfuse.Constants.STAGE_POP;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.ehcache.hibernate.management.impl.BeanUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appfuse.dao.hibernate.GenericDaoHibernate;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Property;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.Page;
import com.teaminformatics.webapp.util.ControllerUtil;

public class LoadableDaoHibernate<T, PK extends Serializable> extends
	GenericDaoHibernate<T, PK> implements LoadableDao<T, PK> {
    private Log log = LogFactory.getLog(getClass());
    private Class<T> persistentClass = null;

    public LoadableDaoHibernate(final Class<T> persistentClass) {
	super(persistentClass);
	this.persistentClass = persistentClass;
    }
   	public LoadableDaoHibernate(final Class<T> persistentClass,
	    SessionFactory sessionFactory) {
	super(persistentClass, sessionFactory);
	this.persistentClass = persistentClass;
    }

    public T getWithPropertiesLoaded(final PK id, final String... properties) {
	return this.getHibernateTemplate().execute(new HibernateCallback<T>() {
	    public T doInHibernate(Session session) throws HibernateException,
		    SQLException {
		@SuppressWarnings("unchecked")
		T c = (T) session.createCriteria(persistentClass)
			.add(Property.forName("id").eq(id)).uniqueResult();
		for (String property : properties) {
		    log.debug("loading property [" + property
			    + "] for hibernate object.");
		    Hibernate.initialize(BeanUtils.getBeanProperty(c, property));
		}
		return c;
	    }

	 });
    }

    public Case getSortedInfo(final PK id, final String sortString, final String filterString, final Long stageId,final String... properties) {
	return this.getHibernateTemplate().execute(new HibernateCallback<Case>() {
	    @SuppressWarnings("unchecked")
	    public Case doInHibernate(Session session) throws HibernateException,
		    SQLException {
	    	String assignedDocTypeForPOP=null;
  		    StringBuilder hql = new StringBuilder();
		  
			  hql.append("from Case s inner join fetch s.pages as p where s.id=")
	 	        .append(id)
	 	        .append(prepareWhereClause(filterString))
	 	        .append(prepareOrderBy(sortString));
		  
		     log.debug("HQL  Query :: "+ hql.toString());
		     
		     Query query = session.createQuery(hql.toString());
		     //IWN-49 On thumbnail page of a parallelized stage, filter thumbnails by default to show only designated document types for a user
						if (stageId == STAGE_POP && filterString.trim().equals("assigneddoctypes")) {
							Long userId = ControllerUtil.getAuthenticatedUserId();
							assignedDocTypeForPOP = getAssignedDocTypeForParallelizedStage(id, stageId, userId);

							if (assignedDocTypeForPOP != null) {
								String[] docTypesArr = assignedDocTypeForPOP.split(",");
								String[] trimmedArray = new String[docTypesArr.length];
								for (int i = 0; i < docTypesArr.length; i++)
									trimmedArray[i] = docTypesArr[i].trim();
								query.setParameterList("assignedDocTypes",trimmedArray);
							}
						}
		        List results = query.list();
		        List<Page> pages = new ArrayList<Page>();
		        Case c = new Case();
		        Iterator iter = results.iterator();
		        while (iter.hasNext()) {
		             c = (Case) iter.next();
		             pages = c.getPages();
		        }
		        
		        Iterator iter1 = pages.iterator();
		        while (iter1.hasNext()) {
		            Page page = (Page) iter1.next();
		           
		        }
		return c;
	    }
    });
		
	}
    

	private StringBuilder prepareOrderBy(String sortString)
	{
	    String[] result = sortString.split("_");  
	    StringBuilder s = new StringBuilder(" ");
	    
	    if (result.length > 1){	
	    	s.append("order by ");
	    	for (int i= 1;i < result.length-1; i++ ){
				s.append(" p.");
				s.append(result[i]);
				if(i<result.length-2)
					s.append(",");  
	    	}
		    s.append(" ");
		    s.append(result[result.length-1]);
		    //IWS 219: This code has been added for document ordering 
		    if(result[1].equalsIgnoreCase("documentDate"))
		    {
		    	s.append(" ")
		    	 .append(",")
		    	 //IWS-219:This code has been modified for SubDocumentOrder Asc and Date Desc
		    	 .append("p.subDocumentOrder ASC")
		    	 .append(" ")
		    	
		    	 .append(" ")
		    	 .append(",")
		    	  //IWS-219:This code has been modified for SubDocumentPageNumber Asc and Date Desc
		    	 .append("p.subDocumentPageNumber ASC")
		    	 .append(" ");
		    }
	   }
	   return s;
	    
	}
	
	private StringBuilder prepareWhereClause(String filterString)
	{
	    
	    StringBuilder s = new StringBuilder(" ");
	    if (filterString.trim().equals("allnonexcluded"))
	    {
		
		s.append(" and isDeleted='N' ");
	    }
	    else if (filterString.trim().equals("processed"))
	    {
		s.append("  and isCompleted='Y' ");
	    }else if (filterString.trim().equals("unprocessed"))
	    {
		s.append(" and isCompleted='N' ");
	    }
	    else if (filterString.trim().equals("excluded"))
	    {
		s.append(" and isDeleted='Y' ");
	    }
	    else if (filterString.trim().equals("flagged"))
	    {
		s.append(" and suspendNote is not null ");
	    }
	    else if (filterString.trim().equals("assigneddoctypes"))
	    {
		s.append(" and p._docType.name in (:assignedDocTypes)");
	    }
	   
	    return s;
	    
	}
	
	public String getAssignedDocTypeForParallelizedStage(final PK caseId,final  Long stageId,final Long userId) {
		return this.getHibernateTemplate().execute(new HibernateCallback<String>() {
		    @SuppressWarnings("unchecked")
		    public String doInHibernate(Session session) throws HibernateException,
			    SQLException {
			
                String assignedDocTypesForPOP = (String) session
                        .createSQLQuery("SELECT IWS_APP_UTILS.getVisibleDocTypes(:userId, :caseId, :stageId) FROM DUAL")
                        .setParameter("userId", userId)
                        .setParameter("caseId", caseId)
                        .setParameter("stageId", stageId)
                        .uniqueResult();

                       return assignedDocTypesForPOP;
		    }
	    });
	}
	
	public Long setCloseParallelizedStagePOP(final PK id,final Long stageId,final Long userId) {
		// TODO Auto-generated method stub
		final String sql="  update parallelcasestatus pl set pl.iscompleted =:updateFlag where pl.caseid=:caseId and pl.stageid=:stageId and pl.userid=:userId and pl.iscompleted='N'";
		Long updateCount = (Long) this.getHibernateTemplate().execute(
				new HibernateCallback<Long>() {
					@SuppressWarnings("unchecked")
					public Long doInHibernate(Session session)
							throws HibernateException, SQLException {
						SQLQuery query = session.createSQLQuery(sql);
						query.setParameter("caseId", id);
						query.setLong("stageId", stageId);
						query.setLong("userId", userId);
						query.setCharacter("updateFlag", 'Y');
						int updateRow=query.executeUpdate();
						return Long.valueOf(((long)updateRow));
						
					}
				});
		return updateCount;
	}
	
}
