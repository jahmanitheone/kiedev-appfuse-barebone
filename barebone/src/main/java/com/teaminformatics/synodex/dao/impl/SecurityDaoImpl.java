package com.teaminformatics.synodex.dao.impl;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

import com.teaminformatics.synodex.dao.SecurityDao;
import com.teaminformatics.synodex.model.oracle.AuthenticationCheckStoredProc;
import com.teaminformatics.synodex.model.oracle.ValidityCheckStoredProc;

public class SecurityDaoImpl implements SecurityDao
{
	private DataSource dataSource;

	@Autowired
    public void setDataSource(DataSource dataSource) 
	{
        this.dataSource = dataSource;
    }

	public Long retrieveAuthenticationForSession(String sessionId)
    {
		AuthenticationCheckStoredProc proc = new AuthenticationCheckStoredProc(dataSource);
        Long userId = proc.execute(sessionId);
        return userId;
    }

	public boolean retrieveAuthorization(Long stageId, Long caseId, Long userId)
    {
		ValidityCheckStoredProc proc = new ValidityCheckStoredProc(dataSource);
	    boolean bAuthorized = proc.execute(stageId, caseId, userId);
	    return bAuthorized;
    }
}
