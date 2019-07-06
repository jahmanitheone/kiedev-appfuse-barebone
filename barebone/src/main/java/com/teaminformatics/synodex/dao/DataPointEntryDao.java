package com.teaminformatics.synodex.dao;

import java.util.List;

import com.teaminformatics.synodex.model.AuditLogView;
import com.teaminformatics.synodex.model.CategorizedView;
import com.teaminformatics.synodex.model.DataPointEntry;

public interface DataPointEntryDao extends LoadableDao<DataPointEntry, Long>
{
	public List<Long> getCasesForDataPointEntries(Long ... dataPointEntyIds);
	public Integer softDeleteDataPoint(Long entryId);
	public String saveDataPointTranscript(Long entryId,DataPointEntry dataPointEntry,Integer fieldNumber);
	/**
	 * Get BackGround/Summary Data for case file
	 * @param caseId
	 * @return
	 */
	public List<CategorizedView> getBackGroundDataEntries(final Long caseId);
	public List<CategorizedView> getDataPointEntries(final Long caseId,final Boolean modifiedOnly);
	public List<AuditLogView> getDataPointAuditLogs(final Long caseId, final Long dpEntryId);
	
	public Integer getCaseImpairedOrStandard(final Long caseId);
	
	
	
}
