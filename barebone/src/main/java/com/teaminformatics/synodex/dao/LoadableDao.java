package com.teaminformatics.synodex.dao;

import java.io.Serializable;

import org.appfuse.dao.GenericDao;

import com.teaminformatics.synodex.model.Case;


public interface LoadableDao<T, PK extends Serializable> extends GenericDao<T, PK>
{
	
	public T getWithPropertiesLoaded(final PK id, final String ... properties );
	
	/*
	 * Sorting thumbnails 
	 * Input Params : id , filter criteria and pages 
	 * Output Params : Case Object
	 */
	public Case getSortedInfo(final PK id, final String sortString, final String filterString,final Long stageId,final String... properties) ;
	/*
	 * get Assigned Document type for a user in Step 2-POP stage
	 */
	public String getAssignedDocTypeForParallelizedStage(final PK id,final Long stageId,final Long userId);
	/**
	 * Close Case for Step 2 POP
	 * @param id
	 * @param stageId
	 * @param userId
	 * @return
	 */
	public Long setCloseParallelizedStagePOP(final PK id,final Long stageId,final Long userId);
	
}
