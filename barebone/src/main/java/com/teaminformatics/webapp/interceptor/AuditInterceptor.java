package com.teaminformatics.webapp.interceptor;

import java.io.Serializable;
import java.util.Date;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import org.hibernate.CallbackException;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;

import com.teaminformatics.synodex.dao.AuditDao;
import com.teaminformatics.synodex.model.Audit;
import com.teaminformatics.synodex.model.interceptor.IAuditLog;
import com.teaminformatics.synodex.model.interceptor.IComponent;
import com.teaminformatics.webapp.util.ControllerUtil;

public class AuditInterceptor extends EmptyInterceptor{

	/**
	 * 
	 */
	private ConcurrentHashMap<String, Audit> updates = new ConcurrentHashMap<String, Audit>();
	private ConcurrentHashMap<String, Audit> inserts = new ConcurrentHashMap<String, Audit>();
	
	private static final long serialVersionUID = 5307150846185464432L;
	private AuditDao auditDao = null;
	private final String ignoreFields = "updatedBy,updatedOn,updatedStageId,createdBy,createdOn,createdStageId";
	 
	@Autowired
	public void setAuditDao(AuditDao auditDao) {
		this.auditDao = auditDao;
	}
	/**
	 * called for hibernate inserts
	 */
	public boolean onSave(Object entity,Serializable id,Object[] state,String[] propertyNames,Type[] types)throws CallbackException {

		//first we check if the object implements the IAuditLog interface... this means it is a table we have marked for audit
		if (entity instanceof IAuditLog){
			IAuditLog auditEntity = (IAuditLog)entity;
			//check the stage table to see if we are auditing Inserts
			if (isAuditable(auditEntity, "C")){

				String sCurrVal="";
				String columnName ="";
				for(int i=0;i<state.length;i++){
					//check for fields we know we don't need to audit
					if (ignoreFields.indexOf(propertyNames[i]) < 0){
						Object oCurrVal = state[i];
						if (oCurrVal == null) oCurrVal = new String();
						//if instance of IComponent, this means it is a many-to-one object (foreign key)
						if (oCurrVal instanceof IComponent){
							//now we get the Id field for these objects
							IComponent curr = (IComponent)oCurrVal;
							sCurrVal = curr.getId().toString();
							columnName = ControllerUtil.getColumnName(entity.getClass(), propertyNames[i],true);
						}
						else{
							//else it is a simple data type (string, long, date, etc)
							if (oCurrVal instanceof Date){
								sCurrVal = ControllerUtil.convertToDifferentDateFormat(oCurrVal);
							}
							else{
								sCurrVal = oCurrVal.toString();
							}
							columnName = ControllerUtil.getColumnName(entity.getClass(), propertyNames[i],false);
						}
						//build the audit object for save
						if(!sCurrVal.isEmpty() && !sCurrVal.equals("[]")){
							Audit audit = setCommonAuditValues(auditEntity, columnName);
							audit.setModifiedValue(sCurrVal);
						    //action id 17 = Insert Table
						    audit.set_action(Long.valueOf(17));
						    
						    inserts.put(propertyNames[i], audit);
						}
					    //lastly set created by for current entity
						if (propertyNames[i] == "createdBy")
							state[i] = 	ControllerUtil.getAuthenticatedUserId();
					}
						
				}

			}
		}
		
		
		return true;
		
	 
	}

	/**
	 *  called for hibernate updates
	 */
	public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) {
		
		//first we check if the object implements the IAuditLog interface... this means it is a table we have marked for audit
		if (entity instanceof IAuditLog){
			IAuditLog auditEntity = (IAuditLog)entity;
			//check the stage table to see if we are auditing updates
			if (isAuditable(auditEntity, "U")){
				//set our objects
				Object oCurrVal = null, oPrevVal = null;
				String sCurrVal="", sPrevVal = "";
				//loop through the currentstate object. this object is an array of objects that hold our fields
				for(int i=0;i<currentState.length;i++){
					//check for fields we know we don't need to audit
					if (ignoreFields.indexOf(propertyNames[i]) < 0){
						oCurrVal = currentState[i];
						//we also get the previous state so we can only audit changes
						oPrevVal = previousState[i];
						String columnName="";
						//we need to check for nulls (especially for previous values).. if we find one create an empty string
						if (oCurrVal == null) oCurrVal = new String();
						if (oPrevVal == null) oPrevVal = new String();
						if (isChanged(oPrevVal, oCurrVal)){
							//check to see if the value implements the IComponent interface 
							//we mark all fields that have one-to-many / many-to-one relationship
							if (oCurrVal instanceof IComponent){
								//now we get the Id field for these objects
								IComponent prev = (IComponent)oPrevVal;
								sPrevVal = prev.getId().toString();
								IComponent curr = (IComponent)oCurrVal;
								sCurrVal = curr.getId().toString();
								columnName = ControllerUtil.getColumnName(entity.getClass(), propertyNames[i],true);
							}
							else{
								//else it is a simple data type (string, long, date, etc)
								sPrevVal = oPrevVal.toString();
								if (oCurrVal instanceof Date){
									sCurrVal = ControllerUtil.convertToDifferentDateFormat(oCurrVal);
								}
								else{
									sCurrVal = oCurrVal.toString();
								}
								columnName = ControllerUtil.getColumnName(entity.getClass(), propertyNames[i],false);
							}
							//build the audit object for save
							Audit audit = setCommonAuditValues(auditEntity, columnName);
							audit.setOriginalValue(sPrevVal);
							audit.setModifiedValue(sCurrVal);
						    //action id 16 = Update Table
						    audit.set_action(Long.valueOf(16));
						    updates.put(propertyNames[i], audit);
						}
					}
				    //lastly set updatedby, updatedOn and updatedStageNumber for current entity
					if (propertyNames[i] == "updatedBy")
						currentState[i] = 	ControllerUtil.getAuthenticatedUserId();
					if (propertyNames[i] == "updatedOn")
						currentState[i] = 	ControllerUtil.getTimestamp();
					if (propertyNames[i] == "updatedStageId")
						currentState[i] = 	auditEntity.getStage().getId();
				}
	
			}
		}
	    
		return true;
	
	}
/**
 * 
 * @param currentState
 * @param previousState
 * @return true if objects are different
 */
    private boolean isChanged(Object currentState, Object previousState) {
        return (previousState == null && currentState != null) // nothing to something
            || (previousState != null && currentState == null) // something to nothing
            || (previousState != null && !previousState.equals(currentState)); // something to something else
    }
    /**
     * 
     * @param entity
     * @param fieldName
     * @return populated audit object
     */
    private Audit setCommonAuditValues(IAuditLog entity, String fieldName){
    	
    	Audit audit = new Audit();
    	String tableName = ControllerUtil.getTableName(entity.getClass());
    	audit.setObjectType(tableName+"."+fieldName.toUpperCase());
		audit.set_case(entity.getCaseId());
	    audit.set_stage(entity.getStage().getId());
	    audit.setTime(ControllerUtil.getTimestamp());
	    audit.set_user(ControllerUtil.getAuthenticatedUserId());
	    audit.setObjectId(entity.getId());
	    audit.set_session(ControllerUtil.getGlobalSessionId());
	    audit.setOriginalStageId(entity.getStage().getId());
	    audit.setOriginalTimestamp(ControllerUtil.getTimestamp());
	    audit.setOriginalUserId(ControllerUtil.getAuthenticatedUserId());
	    
	    return audit;
	    
    	
    }
    /**
     * checks to see if we should be auditing this stage / action
     * @param entity
     * @param action
     * @return true if we should audit
    s */
    private boolean isAuditable(IAuditLog entity, String action){
    	return entity.getStage() != null && entity.getStage().getAuditAction() != null && entity.getStage().getAuditAction().toUpperCase().contains(action);
    }
  /**
   * called after committed into database
   */
  	public void postFlush(Iterator iterator){
  		try{
  			//save updates
  			for (Audit audit : updates.values()) {
	  			auditDao.saveAuditLog(audit);
	  		}
  			//save inserts
  			for (Audit audit : inserts.values()) {
	  			auditDao.saveAuditLog(audit);
	  		}
  		}
	  	catch (Exception ex){
	  		ex.printStackTrace();
	  	}
  		finally {
  			updates.clear();
  			inserts.clear();
  		}
  }	    
    
}

