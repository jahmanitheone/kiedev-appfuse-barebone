package com.teaminformatics.synodex.dao;

import java.io.Serializable;
import java.util.List;
import com.teaminformatics.synodex.model.Case;


public interface CaseDao<T, PK extends Serializable> extends LoadableDao<T, PK>
{
    public List <Case> getCase(final Long caseId) throws Exception;
}
