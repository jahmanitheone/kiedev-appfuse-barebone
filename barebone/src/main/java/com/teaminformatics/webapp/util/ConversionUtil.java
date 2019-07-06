package com.teaminformatics.webapp.util;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.MultiValueMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class ConversionUtil {
    private static final Log log = LogFactory.getLog(ConversionUtil.class);

    private static Hashtable<Class<?>, Convertable> converters = new Hashtable<Class<?>,Convertable>();
    
    static {
    	converters.put(Boolean.class, new Convertable(){
			public Object fromString(String str) 
            {
	            return Boolean.parseBoolean(str);
            }
    	});
    	converters.put(boolean.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Boolean.parseBoolean(str);
            }
    	});
    	converters.put(Integer.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Integer.parseInt(str);
            }
    	});
    	converters.put(int.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Integer.parseInt(str);
            }
    	});
    	converters.put(Long.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Long.parseLong(str);
            }
    	});
    	converters.put(long.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Long.parseLong(str);
            }
    	});
    	converters.put(Double.class, new Convertable(){
			public Object fromString(String str)
            {
	            return Double.parseDouble(str);
            }
    	});
    	converters.put(Date.class, new Convertable(){
			@SuppressWarnings("deprecation")
            public Object fromString(String str)
            {
				try
				{
					return new Date(Long.parseLong(str));
				}
				catch(NumberFormatException nfe)
				{
					return Date.parse(str);
				}
            }
    	});
    	converters.put(String.class, new Convertable(){
			public Object fromString(String str)
            {
	            return str;
            }
    	});
    }
    
    private ConversionUtil() {
    }
    
    public static Object convert(Class<?> to, String str)
    {
    	if(log.isDebugEnabled())
    	{
    		log.debug("Finding converter for [" + to + "] and value [" + str + "]");
    	}
    	
    	if("null".equalsIgnoreCase(str) || str == null)
    	{
    		return null;
    	}
    	
    	if(converters.containsKey(to))
    	{
    		return converters.get(to).fromString(str);
    	}
    	else
    	{
    		log.warn("Unable to find conversion class for [" + to + "]");
    	}
    	
    	return str;
    }

    private interface Convertable {
    	Object fromString(String str);
    }
    
    /**
     * Retrieve a collection of key <-> value parameters within an embedded form style variable mapping
     * 
     * Ex: 
     * pages[0][id] = 1
     * pages[0][name] = Name 1
     * pages[1][id] = 2
     * pages[1][name] = Name 2
     * 
     * Would return two Map<String,String> within the collection, each with the keys id & name.
     * 
     * @param name The collection parameter name, for the above example, pages.
     * @param map The parameter map to extract values from.
     * @return
     */
    public static Collection<Map<String,String>> getParameterCollection(String name, Map<String,String> map)
	{
		Hashtable<String,Map<String,String>> collectionValues = new Hashtable<String,Map<String,String>>();
		
		Pattern p = Pattern.compile(String.format("(%1$s\\[[0-9]+\\])\\[(.*?)\\]", name));
		for(String key : map.keySet())
		{
			Matcher matcher = p.matcher(key);
			if(matcher.find() && matcher.groupCount() == 2)
			{
				String oKey = matcher.group(1);
				String oAttr = matcher.group(2);
				if(!collectionValues.containsKey(oKey))
				{
					collectionValues.put(oKey, new HashMap<String,String>());
				}
				collectionValues.get(oKey).put(oAttr, map.get(key));
			}
		}
		
		return collectionValues.values();
	}
    
    /**
     * Retrieve a collection of key <-> value parameters within an embedded form style variable mapping
     * 
     * Ex: 
     * pages[0][id] = 1
     * pages[0][name] = Name 1
     * pages[1][id] = 2
     * pages[1][name] = Name 2
     * 
     * Would return two Map<String,String> within the collection, each with the keys id & name.
     * 
     * @param name The collection parameter name, for the above example, pages.
     * @param map The parameter map to extract values from.
     * @return
     */
    public static List<String> getParameterCollectionAttributeValues(String name, String attribute, Map<String,String> map)
	{
		Vector<String> collectionValues = new Vector<String>();
		
		for(Map<String,String> uPage : ConversionUtil.getParameterCollection("pages", map))
		{
			if(uPage.containsKey(attribute))
			{
				collectionValues.add(uPage.get(attribute));
			}
		}
		
		return collectionValues;
	}
    
    @SuppressWarnings("unchecked")
    public static <T> List<T> getParameterCollectionAttributeValues(Class<?> klass, String name, String attribute, Map<String,String> map) {
    	Vector<T> collectionValues = new Vector<T>();
		
		for(Map<String,String> uPage : ConversionUtil.getParameterCollection(name, map))
		{
			if(uPage.containsKey(attribute))
			{
				String str = uPage.get(attribute);
				collectionValues.add((T)ConversionUtil.convert(klass, str));
			}
		}
		
		return collectionValues;
    }
    
    public static <T> List<T> convertCommaDelimitedList(Class<?> klass, String str)
	{
		String[] tokens = str.split(",");
		List<T> ids = new Vector<T>(tokens.length);
		for(String token : tokens)
		{
			ids.add((T)ConversionUtil.convert(klass, token));
		}
		return ids;
	}
}
