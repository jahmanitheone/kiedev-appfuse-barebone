package com.teaminformatics.synodex.model.oracle;

import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

public class ValidityCheckStoredProc extends StoredProcedure
{
    private static final Log log = LogFactory.getLog(ValidityCheckStoredProc.class);

    private static final String STORED_PROC_NAME = "IWS_AUTHORIZE";
    
    public ValidityCheckStoredProc(DataSource ds) {
        super(ds, STORED_PROC_NAME);

        declareParameter(new SqlParameter("pStageId", Types.NUMERIC));
        declareParameter(new SqlParameter("pCaseId", Types.NUMERIC));
        declareParameter(new SqlParameter("pUserId", Types.NUMERIC));
        declareParameter(new SqlOutParameter("pAuthorized", Types.CHAR));
        compile();
    }

    public boolean execute(Long stageId, Long caseId, Long userId) {
        Map<String,Object> inParams = new HashMap<String,Object>(4);
        inParams.put("pStageId", stageId);
        inParams.put("pCaseId", caseId);
        inParams.put("pUserId", userId);
        inParams.put("pAuthorized", 'N');

        Map outParams = execute(inParams);
        if (outParams.size() > 0) {
        	Object obj = outParams.get("pAuthorized");
            return obj == null ? false : String.valueOf(obj).trim().equalsIgnoreCase("Y");
        }
        
        return false;
    }
}
