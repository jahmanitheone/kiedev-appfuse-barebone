package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.webapp.interceptor.AuditInterceptor;
import com.teaminformatics.webapp.util.ControllerUtil;



public class AuditDaoImpl extends LoadableDaoHibernate<Audit,Long> implements AuditDao
{
	private static final Log log = LogFactory.getLog(AuditDaoImpl.class);
	
	public AuditDaoImpl()
    {
	    super(Audit.class);
    }

    public Boolean saveAuditLog(final Audit audit) throws Exception{
    	return (Boolean) this.getHibernateTemplate().execute(new HibernateCallback<Boolean>() {
		    public Boolean doInHibernate(Session session) throws HibernateException, SQLException {
		    	
		    	 Session tempSession = session.getSessionFactory().openSession(new AuditInterceptor());
		         try {
		        	 audit.setCreatedBy(ControllerUtil.getAuthenticatedUserId());
		        	 tempSession.save(audit);
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
	