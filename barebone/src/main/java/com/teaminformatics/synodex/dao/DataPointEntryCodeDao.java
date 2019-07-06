package com.teaminformatics.synodex.dao;

import java.util.List;


import com.teaminformatics.synodex.model.DataPointEntryCode;

public interface DataPointEntryCodeDao extends LoadableDao<DataPointEntryCode, Long>
{
	public List<Long> getCasesForDataPointEntryCodes(Long ... dataPointEntryCodesIds);
}
