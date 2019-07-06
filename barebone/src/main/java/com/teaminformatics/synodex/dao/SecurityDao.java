package com.teaminformatics.synodex.dao;

public interface SecurityDao
{
	public Long retrieveAuthenticationForSession(String sessionId);
	public boolean retrieveAuthorization(Long stageId, Long caseId, Long userId);
}
