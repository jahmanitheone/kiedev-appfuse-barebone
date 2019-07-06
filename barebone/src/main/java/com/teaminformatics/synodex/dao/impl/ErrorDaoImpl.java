package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import com.teaminformatics.synodex.dao.ErrorDao;
import com.teaminformatics.synodex.model.Error;

public class ErrorDaoImpl extends LoadableDaoHibernate<Error,Long> implements ErrorDao
{
	private static final Log log = LogFactory.getLog(ErrorDaoImpl.class);
	
	public ErrorDaoImpl()
    {
	    super(Error.class);
    }

    public Boolean saveErrorLog(final Error error) throws Exception{
    	return (Boolean) this.getHibernateTemplate().execute(new HibernateCallback<Boolean>() {
		    public Boolean doInHibernate(Session session) throws HibernateException, SQLException {

		    	// Session tempSession = session.getSessionFactory().openSession(new AuditInterceptor());
		    	Session tempSession = session.getSessionFactory().openSession();
		    	
		         try {
		        	 tempSession.save(error);
		        	 tempSession.flush();
		         }
		         catch (HibernateException he){
		        	 throw he;
		         }
		         finally {	
		        	 tempSession.close();		
		         }		
		    	return true;
		    	
		    }
		});

    }
}
	