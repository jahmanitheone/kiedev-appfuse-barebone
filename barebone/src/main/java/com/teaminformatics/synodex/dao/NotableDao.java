package com.teaminformatics.synodex.dao;

import java.util.List;

import com.teaminformatics.synodex.model.Notable;

public interface NotableDao extends LoadableDao<Notable, Long>
{
	public List<Long> getCasesForNotables(Long ... notableIds);
}
