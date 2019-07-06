package com.synodex.qcai.utils;

import java.lang.reflect.Method;
import org.apache.log4j.Logger;

public class ReflectionUtil {
	private final static Logger log = Logger.getLogger(ReflectionUtil.class);

	/**
	 * Set the data of an object using reflection
	 * 
	 * @param obj
	 * @param methodname
	 * @param data
	 * @throws Exception 
	 */
	public static void setMethod(Object obj, String methodname, String data) throws Exception {
		if(obj==null)
			throw new Exception("No object was defined to set reflective method");

		if(methodname==null || methodname.isEmpty())
			throw new Exception("No method was defined to set reflective method");

		try {
			Class<? extends Object> cls = obj.getClass();
			try {
				Method method = cls.getDeclaredMethod(methodname, String.class);

				method.invoke(obj, data);
			} catch (Exception e) {
				throw new Exception(methodname
				        + "() is not defined in class " + cls.getName());
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

}
