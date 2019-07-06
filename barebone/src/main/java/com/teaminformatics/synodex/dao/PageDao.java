package com.teaminformatics.synodex.dao;

import java.util.List;

import com.teaminformatics.synodex.model.Page;

public interface PageDao extends LoadableDao<Page, Long>
{
	public void rotate(List<Long> pageIds, Integer orientation);
	
	public List<Long> getCasesForPages(Long ... pageIds);
	public List<Long> getCasesForContentItems(String ... contentIds);
	public Integer getPagesCountForCase(Long caseid);
	
	
}
