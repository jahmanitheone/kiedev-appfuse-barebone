package com.teaminformatics.synodex.dao;

import com.teaminformatics.synodex.model.Audit;


public interface AuditDao extends LoadableDao<Audit, Long>
{
	public Boolean saveAuditLog(final Audit audit) throws Exception;
}
