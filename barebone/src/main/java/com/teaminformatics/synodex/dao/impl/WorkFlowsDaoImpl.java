package com.teaminformatics.synodex.dao.impl;

import java.sql.SQLException;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import com.teaminformatics.synodex.dao.WorkFlowsDao;
import com.teaminformatics.synodex.model.WorkFlows;
import com.teaminformatics.webapp.util.ControllerUtil;

/**
 * Implementation of WorkFlowsDAO for automating next staging step for a work
 * flow. Currently steps 1 - 4 are affected.
 * <p/>
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
public class WorkFlowsDaoImpl extends LoadableDaoHibernate<WorkFlows, Long>
		implements WorkFlowsDao {
	private static final String WORKFLOWS_REJECTION = "REJECTION";
	private static final String WORKFLOWS_COMPLETION = "COMPLETION";
	private static final Log log = LogFactory.getLog(WorkFlowsDaoImpl.class);

	public WorkFlowsDaoImpl() {
		super(WorkFlows.class);
	}

	public WorkFlows getClientCompletionWorkFlow(final Long clientid,
			final Long stageid) throws Exception {

		return (WorkFlows) this.getHibernateTemplate().execute(
				new HibernateCallback<WorkFlows>() {
					public WorkFlows doInHibernate(Session session)
							throws HibernateException, SQLException {

						try {

							String hql = "from WorkFlows wf where wf.clientId = :clientid and wf.stageId = :stageid and wf.condition = '"
									+ WORKFLOWS_COMPLETION + "'";							
							Query query = session.createQuery(hql);
							query.setLong("clientid", clientid);
							query.setLong("stageid", stageid);

							return (WorkFlows) query.uniqueResult();
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}
	

	public WorkFlows getClientRejectionWorkFlow(final Long clientid,
			final Long stageid) throws Exception {

		return (WorkFlows) this.getHibernateTemplate().execute(
				new HibernateCallback<WorkFlows>() {
					public WorkFlows doInHibernate(Session session)
							throws HibernateException, SQLException {

						
						try {

							String hql = "from WorkFlows wf where wf.clientId = :clientid and wf.stageId = :stageid and wf.condition = '"
									+ WORKFLOWS_REJECTION + "')";							
							Query query = session.createQuery(hql);
							query.setLong("clientid", clientid);
							query.setLong("stageid", stageid);

							return (WorkFlows) query.uniqueResult();
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

/**
 * Implementation of WorkFlowsDAO for checking whether the any incomplete page still left to complete.
 * <p/>
 * 
 * @author <a href="mailto:djena@innodata.com">Debabrata Jena</a>
 */	
	public Long getIncompleteAndExcludedPageInfo(final Long caseId)
			throws Exception {
		final String sql = "select count(*) from Cases s inner join pages p on s.caseid=p.caseid where s.caseid="
				+ caseId + " and p.ISCOMPLETED = 'N' and p.isDeleted= 'N' ";
		Long count = (Long) this.getHibernateTemplate().execute(
				new HibernateCallback<Long>() {
					@SuppressWarnings("unchecked")
					public Long doInHibernate(Session session)
							throws HibernateException, SQLException {
						SQLQuery query = session.createSQLQuery(sql);
						long value = ((Number) query.uniqueResult())
								.longValue();
						return Long.valueOf(value);
					}
				});
		return count;
	}
	
	/* Will get all Assigned Categories for given parameters for Parallelized OP Stage(POP)
	 * (non-Javadoc)
	 * @see com.teaminformatics.synodex.dao.WorkFlowsDao#getAssignedCategoriesForParallelizedStage(java.lang.Long, java.lang.Long)
	 */
	public String getAssignedCategoriesForParallelizedStage(final Long caseId, final Long stageId)
			throws Exception {

		return (String) this.getHibernateTemplate().execute(
				new HibernateCallback<Object>() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {

						String POPAssignedCategories = (String) session
								.createSQLQuery("SELECT IWS_APP_UTILS.getVisibleCategories(:userId, :caseId, :stageId) FROM DUAL")
								.setParameter("userId", ControllerUtil.getAuthenticatedUserId())
								.setParameter("caseId", caseId)
								.setParameter("stageId", stageId)
								.uniqueResult();

						return POPAssignedCategories;
					}

				});

	}
	
}
