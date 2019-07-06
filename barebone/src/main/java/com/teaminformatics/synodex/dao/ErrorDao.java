package com.teaminformatics.synodex.dao;

import com.teaminformatics.synodex.model.Error;


public interface ErrorDao extends LoadableDao<Error, Long>
{
	public Boolean saveErrorLog(final Error error) throws Exception;
}