package com.teaminformatics.webapp.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.servlet.http.HttpSession;

import org.appfuse.model.User;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.teaminformatics.synodex.model.Case;
import com.teaminformatics.synodex.model.CaseHistory;
import com.teaminformatics.synodex.model.Page;

public final class ControllerUtil {

	/**
	 * helper function to return current date/time
	 * @return current date/time
	 */
	public static Date getTimestamp(){
		return new Date(System.currentTimeMillis());
	}
	
	/**
	 * get the current user id from the authenticated session
	 * @return userid
	 */
	public static Long getAuthenticatedUserId(){
		User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user != null)
			return user.getId();
		else
			return new Long(-1);
		
			
	}
	/**
	 * gets the global session id
	 * @return global session id from session table... this is saved in the SingleSignOnFilter during authentication
	 */
	public static Long getGlobalSessionId(){
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
	    HttpSession session = attr.getRequest().getSession(false); // true == allow create
	    return session.getAttribute("globalSessionId") == null ? null: (Long)session.getAttribute("globalSessionId");
	}
/**
 * 	
 * @param c
 * @param isCaseStarting
 * @return populated case history object
 */
public static CaseHistory setCaseHistory(Case c, boolean isCaseStarting){
	
	CaseHistory history = new CaseHistory();
	history.setUserId(getAuthenticatedUserId());
	history.set_case(c);
	history.setStage(c.getStage());
	if (isCaseStarting)
		history.setStageStartTimestamp(getTimestamp());
	else
		history.setStageCompleteTimestamp(getTimestamp());
	return history;
	
	
}

/**
 * gets table name from the model POJO
 * @param c
 * @return table name
 */
public static String getTableName(Class<?> c){
	
	Table table = c.getAnnotation(Table.class);
	return table.name();
}
/**
 * gets the column name from the POJO
 * @param c
 * @param fieldName
 * @param isJoinColumn
 * @return column name
 */
public static String getColumnName(Class<?> c, String fieldName, boolean isJoinColumn){
	try {
		Field f = c.getDeclaredField(fieldName);

		if (isJoinColumn){ 
			JoinColumn column = f.getAnnotation(JoinColumn.class);
			return column == null || column.name().equals("")? f.getName() : column.name();
		}
		else{
			Column column = f.getAnnotation(Column.class);
			return column == null || column.name().equals("")? f.getName() : column.name();
		}	
		
		
	} catch (SecurityException e) {
		return fieldName;
	} catch (NoSuchFieldException e) {
		return fieldName;
	}


}
/**
 * Helper method which convert the format "Day Mmm dd HH:mm:ss IST yyyy" to "yyyy-MM-dd HH:mm:ss.S"
 * 
 * @param oCurrVal
 * @return
 */
public static String convertToDifferentDateFormat(Object oCurrVal){
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
	return sdf.format(oCurrVal);
}


/**
 * get Authenticated User Name
 * 
 */
public static String getAuthenticatedUserName(){
	User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	if (user != null)
		return user.getFullName();
	else
		return "";
}
	
}
