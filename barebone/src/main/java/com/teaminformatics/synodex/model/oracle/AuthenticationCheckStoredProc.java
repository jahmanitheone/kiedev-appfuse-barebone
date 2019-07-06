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

public class AuthenticationCheckStoredProc extends StoredProcedure
{
	private static final Log log = LogFactory.getLog(AuthenticationCheckStoredProc.class);
    
    private static final String STORED_PROC_NAME = "IWS_AUTHENTICATE";
    
    public AuthenticationCheckStoredProc(DataSource ds) {
        super(ds, STORED_PROC_NAME);
        declareParameter(new SqlParameter("pApexSessionId", Types.VARCHAR));
        declareParameter(new SqlOutParameter("pUserId", Types.NUMERIC));
        compile();
    }

    public Long execute(String singleSignOnId) {
        Map<String,Object> inParams = new HashMap<String,Object>(5);
        inParams.put("pApexSessionId", singleSignOnId);
        inParams.put("pUserId", -1);

        Map outParams = execute(inParams);
        if (outParams.size() > 0) {
        	Object obj = outParams.get("pUserId");
            return obj == null ? null : new Long(obj.toString());
        } else {
            return null;
        }
    }
}