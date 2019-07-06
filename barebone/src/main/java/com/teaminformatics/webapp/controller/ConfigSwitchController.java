package com.teaminformatics.webapp.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.teaminformatics.synodex.dao.ConfigSwitchDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.CaseHistory;
import com.teaminformatics.synodex.model.Stage;

@Controller
@RequestMapping("/configswitch")
public class ConfigSwitchController {
	@Autowired
	protected ConfigSwitchDao configSwitchDao;
	private static final Log log = LogFactory.getLog(ConfigSwitchController.class);
	private SessionFactory sessionFactory = null;
	private static final String MAX_SECTIONS_PER_SELECTION = "MAX_SECTIONS_PER_SELECTION";
	private static final int MAXVAL5 = 995;

	public void setConfigSwitchDao(ConfigSwitchDao configswitchdao) {
		this.configSwitchDao = configswitchdao;
	}

	@RequestMapping("/maxsectionsperselection/{clientId}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	int getMaxSectionsPerSelection(@PathVariable int clientId) throws Exception {
		log.debug("clientId=" + clientId + ", switch=");
		int val = MAXVAL5;
		try {
			String rtn = configSwitchDao.getMaxSectionsPerSelection(clientId,
					MAX_SECTIONS_PER_SELECTION);
			val = new Integer(rtn).intValue();
		} catch (Exception e) {
			throw new Exception("get max section per selection: "
					+ e.getMessage());
		}

		return val;
	}

}
