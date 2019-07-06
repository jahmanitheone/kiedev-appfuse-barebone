package com.teaminformatics.synodex.dao;

import java.io.Serializable;
import java.util.List;

import com.teaminformatics.synodex.model.LOVValues;

public interface LOVValuesDao <T, PK extends Serializable> extends LoadableDao<T, PK>{
	
	public List<LOVValues> getLovValuesForExcluedePage();

}
