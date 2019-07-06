package com.teaminformatics.webapp.controller;
 
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.teaminformatics.synodex.dao.LoadableDao;
import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.webapp.util.ControllerUtil;

@Controller
@RequestMapping("/sortcases")
@SessionAttributes ("Case")
public class SortController
{
    
    @Autowired(required = true)  
    private HttpSession session;   
	private LoadableDao<Case, Long> caseDao = null;
	
	@Autowired
	public void setCaseDao(LoadableDao<Case, Long> caseDao) 
	{
		this.caseDao = caseDao; 
	}
	
	@RequestMapping("/{caseId}/{sortString}/{filterString}/{stageId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody Case getSortedCase(@PathVariable Long caseId, @PathVariable String  sortString, @PathVariable String  filterString ,@PathVariable Long stageId, HttpSession session) 
	{
	    Case objCase = caseDao.getSortedInfo(caseId, sortString, filterString, stageId,new String[]{"pages"});
	    session.setAttribute("Case",objCase);
		return objCase;
	}
	
	
	@RequestMapping("/{caseId}/{stageId}")
	@PreAuthorize("isAuthenticated() and hasPermission(#caseId, 'isCaseAllowed')")
	public @ResponseBody String getDocTypesForPOP(@PathVariable Long caseId, @PathVariable Long stageId) 
	{
		Long userId=ControllerUtil.getAuthenticatedUserId();
	    String docTypes=caseDao.getAssignedDocTypeForParallelizedStage(caseId, stageId,userId);
		return docTypes;
	}
	
	
	
}


