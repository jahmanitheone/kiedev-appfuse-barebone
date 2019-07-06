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
import com.teaminformatics.synodex.dao.ConfigSwitchDao;
import com.teaminformatics.synodex.dao.WorkFlowsDao;
import com.teaminformatics.synodex.model.ConfigSwitches;

/**
 * Read the config switch from the DB
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
public class ConfigSwitchDaoImpl extends
		LoadableDaoHibernate<ConfigSwitches, Long> implements ConfigSwitchDao {

	public ConfigSwitchDaoImpl() {
		super(ConfigSwitches.class);
	}

	public String getMaxSectionsPerSelection(final int clientid, final String cfgswitch)
			throws Exception {

		return (String) this.getHibernateTemplate().execute(
				new HibernateCallback<Object>() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {

						String swithval = (String) session
								.createSQLQuery(
										"SELECT IWS_APP_UTILS.GETCONFIGSWITCHVALUE(:clientid, :switch) FROM DUAL")
								.setParameter("clientid", clientid)
								.setParameter("switch", cfgswitch)
								.uniqueResult();

						return swithval;
					}

				});

	}

	public String getPopPageThresholdValue(final Long clientid, final String cfgswitch)
			throws Exception {
		// TODO Auto-generated method stub
		return (String) this.getHibernateTemplate().execute(
				new HibernateCallback<Object>() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {

						String swithval = (String) session
								.createSQLQuery(
										"SELECT IWS_APP_UTILS.getConfigSwitchValue(:clientid,:switch) FROM DUAL")
								.setParameter("clientid", clientid)
								.setParameter("switch", cfgswitch)
								.uniqueResult();

						return swithval;
					}

				});
	}

}
