package com.teaminformatics.webapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teaminformatics.synodex.dao.LOVValuesDao;
import com.teaminformatics.synodex.model.LOVValues;

@Controller
@RequestMapping("/lovLabel")
public class LovLabelController {
	
	 private LOVValuesDao<LOVValues, Long> lOVValuesDao = null;
	 
	 @Autowired
	 public void setLOVValuesDao(LOVValuesDao<LOVValues, Long> lOVValuesDao) {
		this.lOVValuesDao = lOVValuesDao;
	 }


	@RequestMapping("/lovLabelExcludePage//{port}")
	@PreAuthorize("isAuthenticated()")
	public @ResponseBody
	List<LOVValues> getLovValuesForExcludePage(@PathVariable Long port) throws Exception{

		return lOVValuesDao.getLovValuesForExcluedePage();
	}

}
