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

import com.teaminformatics.synodex.dao.DataPointDao;
import com.teaminformatics.synodex.model.DataPointCategory;
import com.teaminformatics.synodex.model.DataPointCategoryGroup;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.DataPointFormEntity;
import com.teaminformatics.synodex.model.LOVValues;
import com.teaminformatics.synodex.model.Languages;
import com.teaminformatics.synodex.model.Notable;
import com.teaminformatics.synodex.model.MasterCodes;
import com.teaminformatics.synodex.model.WorkFlows;


public class DataPointDaoImpl<T, PK extends Serializable> extends
	LoadableDaoHibernate<T, PK> implements DataPointDao<T, PK> {

    private Log log = LogFactory.getLog(getClass());
    private Class<T> persistentClass = null;

    public DataPointDaoImpl(final Class<T> persistentClass) {
	super(persistentClass);
	this.persistentClass = persistentClass;
    }

    public DataPointDaoImpl(final Class<T> persistentClass,
	    SessionFactory sessionFactory) {
	super(persistentClass, sessionFactory);
	this.persistentClass = persistentClass;
    }
    
    
    /**
     * Load DataPoint Entries from DataPointEntry table based on caseId
     * Used in step 2 and 3 RHS
     */
    public List<DataPointEntry> getDPEntries(final Long caseId, final Long stepNo) throws Exception{

	return (List<DataPointEntry>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<DataPointEntry>>() {
			public List<DataPointEntry> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			try
			{
			  	//here we use criteria based query to better control order by variables    
				Criteria query = session.createCriteria(DataPointEntry.class);
				query.createAlias("_page","page");
				query.add(Restrictions.eq("page._case.id", caseId));
				if (stepNo == 2){
					//sort by finalPageNumber and section number... pretty straight forward
					query.addOrder(Order.asc("page.finalPageNumber"));
					query.addOrder(Order.asc("sectionnumber"));
					query.addOrder(Order.desc("suspendnote"));
				}
				else {
					//this one, not so straight forward, we are ordering by tables that are 3 joins away. EG. entry->formentity->category->name
					query.createAlias("_dataPointFormEntity", "form");
					query.createAlias("form._dataPointCategory", "category");
					query.createAlias("form._subCategory", "subcat");
					query.addOrder(Order.asc("category.dpcategoryname"));
					query.addOrder(Order.desc("dataDate"));
					query.addOrder(Order.desc("suspendnote"));
					query.addOrder(Order.asc("subcat.dpsubcatname"));
				}
				
				List<DataPointEntry> entries =  query.list();
				//if(stepNo != 2){
					//we are back loading the codes, otherwise we get duplicate rows if we do a query.setFetchMode(codes)
					for (DataPointEntry entry : entries){
				    		Hibernate.initialize(BeanUtils.getBeanProperty(entry, "codes"));
					}
				//}
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

    /**
     * Load DataPoint Entries from DataPointEntry table based on caseId, PageId and rowNumber
     * Used in step 2
     */
    public List<DataPointEntry> getDPEntriesForCurrentSection(final Long caseId, final Long stepNo, final Long pageId, final int rowNumber) throws Exception{

	return (List<DataPointEntry>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<DataPointEntry>>() {
			public List<DataPointEntry> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			try
			{
			  	//Here we use criteria based query to better control order by variables    
				Criteria query = session.createCriteria(DataPointEntry.class);
				query.createAlias("_page","page");
				query.add(Restrictions.eq("page._case.id", caseId));
				query.add(Restrictions.eq("page.id", pageId));
				query.add(Restrictions.eq("sectionnumber", new Integer(rowNumber)));
				//sort by finalPageNumber and section number... pretty straight forward
				query.addOrder(Order.asc("page.finalPageNumber"));
				query.addOrder(Order.asc("sectionnumber"));
				query.addOrder(Order.desc("suspendnote"));
				List<DataPointEntry> entries =  query.list();
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

    /**
     * gets the data point entries with the codes lazy loaded...based on the caseId
     * used in step 4 LHS
     * REMOVE ...made obsolete by getDPEntries
     */
    public List <DataPointEntry> getDataPointEntriesByCase(final Long caseId ) throws Exception{
	return (List<DataPointEntry>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<DataPointEntry>>() {
		    public List<DataPointEntry> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			
			String hql ;
			
			try
			{
			    //get  data point categories based on the client group id
			    hql = "from DataPointEntry entry where entry._page._case.id=:caseid";
			    Query query = session.createQuery(hql);
			    query.setLong("caseid", caseId);
			    
			    List<DataPointEntry> entries = query.list();
			    //lazy load the codes for better performance when we don't need them
			    for (DataPointEntry entry : entries){
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
    
    
    /**
     * gets the data point entries with the codes lazy loaded...based on the codeId
     * used in step 2 OP
    */
    public List <DataPointEntry> getDataPointEntriesByCodeAndCase(final Long codeId, final Long caseId ) throws Exception{
	return (List<DataPointEntry>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<DataPointEntry>>() {
		    public List<DataPointEntry> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			
			String hql ;
			
			try
			{
			    //get  data point categories based on the client group id
			    hql = "from DataPointEntry entry where entry._medicalHierarchy.id=:codeid and entry._page._case.id=:caseid order by entry._page.finalPageNumber asc, entry.sectionnumber asc, entry.dataDate desc";
			    Query query = session.createQuery(hql);
			    query.setLong("codeid", codeId);
			    query.setLong("caseid", caseId);
			    
			    List<DataPointEntry> entries = query.list();
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
/**
 *  gets a list of data point categories and sub categories
 *  used in step 2 and step 3
 */
    @SuppressWarnings("unchecked")
    public List<DataPointCategory> getDataPointCategories(final Long groupId, final boolean loadSubCats) throws Exception{

	return (List<DataPointCategory>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<DataPointCategory>>() {
		    public List<DataPointCategory> doInHibernate(Session session)
			    throws HibernateException, SQLException {

		    String hql ;
			
		    try
			{
			    //get  data point categories based on the client group id
			    hql = "from DataPointCategoryGroup g where g.groupid=:groupid";

			    Query query = session.createQuery(hql);
			    query.setLong("groupid", groupId);
			    List<DataPointCategoryGroup> groups = query.list();
			    List<DataPointCategory> categories =  new ArrayList<DataPointCategory>();
			    //loop through groups and load categories
			    for (DataPointCategoryGroup group : groups){
			    	//if load subcats, loop through and lazy load sub categories so they are available on the front end
			    	if (loadSubCats){
			    		for (String property : new String[]{"subCategories"}) {
						    Hibernate.initialize(BeanUtils.getBeanProperty(group.getDpCategory(), property));
				    	}
			    	
					}
			    	//add the category to the return array	
			    	categories.add(group.getDpCategory());
			    }
			    //return a list of categories based on the client group id.
			    return categories;
			}
			catch(HibernateException he)
			{
			    he.printStackTrace();
			    throw he;
			}

		    }

		});

    }
    /**
     * gets the data point form from DataPointFormEntities by category and optional sub category
     * used in step 2
     */
    public DataPointFormEntity getDataPointForm(final Long catId, final Long subCatId) throws Exception{

	return (DataPointFormEntity) this.getHibernateTemplate().execute(
		new HibernateCallback<DataPointFormEntity>() {
		    public DataPointFormEntity doInHibernate(Session session)
			    throws HibernateException, SQLException {
			
			
			StringBuilder hql = new StringBuilder();
			
			try
			{
			    //get  data point categories based on the client group id
			    hql.append("from DataPointFormEntity dpform where dpform._dataPointCategory.dpcategoryid=:catid ");
			    //some forms have both a category and subcategory, others only have category... add additional clause if category is included.
			    if (subCatId !=null)
			    	hql.append("and dpform._subCategory.dpsubcatid=:subcatid");
			    Query query = session.createQuery(hql.toString());
			    query.setLong("catid", catId);
			    //add parameter for additional clause
			    if (subCatId !=null)
			    	query.setLong("subcatid", subCatId);
			    
			    //only one result should be returning here
			    DataPointFormEntity form = (DataPointFormEntity) query.uniqueResult();
			    
				for (String property : new String[]{"values"}) {
				    log.debug("loading property [" + property
					    + "] for hibernate object.");
				    if (form.get_lov()!= null)
				    	Hibernate.initialize(BeanUtils.getBeanProperty(form.get_lov(), property));
				  
				}
			    
			   
			    return form;
			}
			catch(HibernateException he)
			{
			    he.printStackTrace();
			    throw he;
			}
		    }

		});
    }

    /** Load Notable for step4  Id for Step4
     * expects case id 
     * return value  list of objects
     **/
     
     @SuppressWarnings("unchecked")
     public List<Notable> getDPNotables(final Long caseId) throws Exception{

    	return (List<Notable>) this.getHibernateTemplate().execute(
    		new HibernateCallback<List<Notable>>() {
    		    public List<Notable> doInHibernate(Session session)
    			    throws HibernateException, SQLException {
    			StringBuilder hql = new StringBuilder();
    			try
    			{
    			    hql = hql.append("from Notable n where n.caseid = :caseid order by n.dataPointCategory");
    			 
    			    Query query =   session.createQuery(hql.toString());
    			    query.setLong("caseid", caseId);
    			    List<Notable> notables =  query.list();	
    			    return notables;
    			}
    			catch(HibernateException he)
    			{
    			    he.printStackTrace();
    			    throw he;
    			}

    			
    		    }

    		});

     }
     
     /** Load DP Lov values for step2 Datapointing
      * expects lov's 
      * return value  list of objects
      **/

     @SuppressWarnings("unchecked")
     public List<LOVValues> getLovValues(final Long lovId) throws Exception{

    	 return (List<LOVValues>) this.getHibernateTemplate().execute(
    			 new HibernateCallback<List<LOVValues>>() {
    				 public List<LOVValues> doInHibernate(Session session)
    						 throws HibernateException, SQLException {
    					 StringBuilder hql = new StringBuilder();
    					 try{
    						 hql = hql.append("from LOVValues lovValues where lovValues._lov.lovid = :lovid order by lovValues.lovValue");

    						 Query query =   session.createQuery(hql.toString());
    						 query.setLong("lovid", lovId);
    						 List<LOVValues> lovValues =  query.list();	
    						 return lovValues;
    					 }
    					 catch(HibernateException he){
    						 he.printStackTrace();
    						 throw he;
    					 }


    				 }
    			 });
     }
     
     /**
      *  used in step 3 for searching medical codes based on description
      */
     public List<MasterCodes> getMedicalCodeInfoIWS2( final Long subCategoryID,  final String type, final String version) throws Exception{

     	return (List<MasterCodes>) this.getHibernateTemplate().execute(
     		new HibernateCallback<List<MasterCodes>>() {
     		    public List<MasterCodes> doInHibernate(Session session)
     			    throws HibernateException, SQLException {
     			StringBuilder hql = new StringBuilder();
     			try
     			{
     			/*	hql = hql.append("from MasterCodes master where  master.status = 'ACTIVE' and master.codeid IN(select dpscodes._code.codeid from DataPointSubCategoryCodes dpscodes " +
     						        "where dpscodes._dataPointSubCategory.dpsubcatid = :subCategoryID)");*/
     				
     				hql = hql.append("from MasterCodes master where  master.status = 'DE-ACTIVE'");
				
     				
     				Query query = session.createQuery(hql.toString());
     			//	query.setLong("subCategoryID", subCategoryID);
     				List<MasterCodes> codes = query.list();
     				
     				return codes;
     			}
     			catch(HibernateException he)
     			{
     			    he.printStackTrace();
     			    throw he;
     			}
     			
     		  }

     		});

         }
     
/**
 *  used in step 3 for searching medical codes based on description
 */
public List<MasterCodes> getMedicalCodeInfo( final String searchText,  final String type, final String version) throws Exception{

	return (List<MasterCodes>) this.getHibernateTemplate().execute(
		new HibernateCallback<List<MasterCodes>>() {
		    public List<MasterCodes> doInHibernate(Session session)
			    throws HibernateException, SQLException {
			StringBuilder hql = new StringBuilder();
			try
			{
				hql = hql.append("from MasterCodes master where  master.status = 'ACTIVE' and UPPER(master.description) like UPPER(:searchText) and UPPER(master.codeType)= UPPER(:type) and UPPER(master.version)= UPPER(:version) ");
				Query query = session.createQuery(hql.toString());
				query.setString("searchText", "%"+searchText+"%");
				query.setString("type", type);
				query.setString("version", version);
				List<MasterCodes> codes = query.list();
				
				return codes;
			}
			catch(HibernateException he)
			{
			    he.printStackTrace();
			    throw he;
			}
			
		  }

		});

    }
   
/**
 * used in step 3 for returning a single code object based on a code
 */
  @SuppressWarnings("unchecked")
    public Object getMedicalCodeDescription( final String code, final String type, final String version) throws Exception{

	return (Object) this.getHibernateTemplate().execute(
		new HibernateCallback<Object>() {
		    public Object doInHibernate(Session session)
			    throws HibernateException, SQLException {
			StringBuilder hql = new StringBuilder();
			try
			{
				hql = hql.append("from MasterCodes master where  master.status = 'ACTIVE' and UPPER(master.code)= UPPER(:code) and UPPER(master.codeType)= UPPER(:type) and UPPER(master.version)= UPPER(:version)");
				Query query = session.createQuery(hql.toString());
				query.setString("code", code);
				query.setString("type", type);
				query.setString("version", version);
				List<Object> codes = query.list();
				return codes;
			}
			catch(HibernateException he)
			{
			    he.printStackTrace();
			    throw he;
			}
		 }

		});
    }
  
  /**
   * Used in step 3 for checking if a code is required for a data point entry.
   */
  @SuppressWarnings("unchecked")
  public List<Object> getIsCodeRequired( final int clientid, final String category, final String subcategory, final String status ) throws Exception{

	return (List<Object>) this.getHibernateTemplate().execute(
		new HibernateCallback<Object>() {
		    public Object doInHibernate(Session session)
			    throws HibernateException, SQLException {
		    	
		    		Query query = session.createSQLQuery(
		    			"SELECT IWS_APP_UTILS.ISCODEREQUIRED(:clientid, :category, :subcategory, :status) FROM DUAL")
		    			.setParameter("clientid", clientid)
		    			.setParameter("category", category)
		    			.setParameter("subcategory", subcategory)
		    			.setParameter("status", status);
		    		 
		    		List result = query.list();
		    		
		    		return result;					
		    	}

		});
  }

  
  /** Load dateFormat values for the basis of LangugeId
   * expects dateFormat 
   * return value  list of objects
   **/

  @SuppressWarnings("unchecked")
  public List<Languages> getdateFormatValues(final Long languageId) throws Exception{

 	 return (List<Languages>) this.getHibernateTemplate().execute(
 			 new HibernateCallback<List<Languages>>() {
 				 public List<Languages> doInHibernate(Session session)
 						 throws HibernateException, SQLException {
 					 StringBuilder hql = new StringBuilder();
 					 try{
 						 hql = hql.append("from Languages languages where languages.id = :id ");

 						 Query query =   session.createQuery(hql.toString());
 						 query.setLong("id", languageId);
 						 List<Languages> dateFormat =  query.list();	
 						 return dateFormat;
 					 }
 					 catch(HibernateException he){
 						 he.printStackTrace();
 						 throw he;
 					 }


 				 }
 			 });
  }

  
  
  
  
}  
