package com.teaminformatics.synodex.reporting;

import java.util.HashMap; 
import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;
import net.sf.jasperreports.engine.JRRuntimeException;

import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.type.Type;

/**
 * Base abstract Hibernate data source.
 * 
 * @author Lucian Chirita (lucianc@users.sourceforge.net)
 * @version $Id: JRHibernateAbstractDataSource.java 2694 2009-03-24 18:11:24Z teodord $
 */
public abstract class JRHibernateAbstractDataSource implements JRDataSource
{
	private final boolean useFieldDescription;
	private final Map fieldReaders;
	protected final JRHibernateQueryExecuter queryExecuter; 
	private Object currentReturnValue;
	
	
	/**
	 * Creates a Hibernate data source.
	 * 
	 * @param queryExecuter the query executer
	 * @param useFieldDescription whether to use field descriptions for fields to results mapping
	 * @param useIndexOnSingleReturn whether to use indexed addressing even when the query has only one return column
	 */
	protected JRHibernateAbstractDataSource(JRHibernateQueryExecuter queryExecuter, boolean useFieldDescription, boolean useIndexOnSingleReturn)
	{
		this.useFieldDescription = useFieldDescription;
		
		this.queryExecuter = queryExecuter;

		fieldReaders = assignReaders(useIndexOnSingleReturn);
	}
	
	/**
	 * Assigns field readers to report fields.
	 * 
	 * @param useIndexOnSingleReturn  whether to use indexed addressing even when the query has only one return column
	 * @return a report field name to field reader mapping
	 * @see FieldReader
	 */
	protected Map assignReaders(boolean useIndexOnSingleReturn)
	{
		Map readers = new HashMap();
		
		JRField[] fields = queryExecuter.getDataset().getFields();
		Type[] returnTypes = queryExecuter.getReturnTypes();
		String[] aliases = queryExecuter.getReturnAliases();
		
		Map aliasesMap = new HashMap();
		if (aliases != null)
		{
			for (int i = 0; i < aliases.length; i++)
			{
				aliasesMap.put(aliases[i], new Integer(i));
			}
		}
		
		if (returnTypes.length == 1)
		{
			if (returnTypes[0].isEntityType() || returnTypes[0].isComponentType())
			{
				for (int i = 0; i < fields.length; i++)
				{
					JRField field = fields[i];
					readers.put(field.getName(), getFieldReaderSingleReturn(aliasesMap, field, useIndexOnSingleReturn));
				}
			}
			else
			{
				if (fields.length > 1)
				{
					throw new JRRuntimeException("The HQL query returns only one non-entity and non-component result but there are more than one fields.");
				}
				
				if (fields.length == 1)
				{
					JRField field = fields[0];
					if (useIndexOnSingleReturn)
					{
						readers.put(field.getName(), new IndexFieldReader(0));
					}
					else
					{
						readers.put(field.getName(), new IdentityFieldReader());
					}
				}
			}
		}
		else
		{
			for (int i = 0; i < fields.length; i++)
			{
				JRField field = fields[i];
				readers.put(field.getName(), getFieldReader(returnTypes, aliasesMap, field));				
			}
		}

		return readers;
	}

	protected FieldReader getFieldReaderSingleReturn(Map aliasesMap, JRField field, boolean useIndex)
	{
		FieldReader reader;
		
		String fieldMapping = getFieldMapping(field);
		if (aliasesMap.containsKey(fieldMapping))
		{
			if (useIndex)
			{
				reader = new IndexFieldReader(0);
			}
			else
			{
				reader = new IdentityFieldReader();
			}
		}
		else
		{
			int firstNestedIdx = fieldMapping.indexOf(PropertyUtils.NESTED_DELIM);

			if (firstNestedIdx >= 0 && aliasesMap.containsKey(fieldMapping.substring(0, firstNestedIdx)))
			{
				fieldMapping = fieldMapping.substring(firstNestedIdx + 1);
			}

			if (useIndex)
			{
				reader = new IndexPropertyFieldReader(0, fieldMapping);
			}
			else
			{
				reader = new PropertyFieldReader(fieldMapping);
			}
		}
		
		return reader;
	}

	protected FieldReader getFieldReader(Type[] returnTypes, Map aliasesMap, JRField field)
	{
		FieldReader reader;
		
		String fieldMapping = getFieldMapping(field);
		Integer fieldIdx = (Integer) aliasesMap.get(fieldMapping);
		if (fieldIdx == null)
		{
			int firstNestedIdx = fieldMapping.indexOf(PropertyUtils.NESTED_DELIM);
			
			if (firstNestedIdx < 0)
			{
				throw new JRRuntimeException("Unknown HQL return alias \"" + fieldMapping + "\".");
			}
			
			String fieldAlias = fieldMapping.substring(0, firstNestedIdx);
			String fieldProperty = fieldMapping.substring(firstNestedIdx + 1);
			
			fieldIdx = (Integer) aliasesMap.get(fieldAlias);
			if (fieldIdx == null)
			{
				throw new JRRuntimeException("The HQL query does not have a \"" + fieldAlias + "\" alias.");
			}
			
			Type type = returnTypes[fieldIdx.intValue()];
			if (!type.isEntityType() && !type.isComponentType())
			{
				throw new JRRuntimeException("The HQL query does not have a \"" + fieldAlias + "\" alias.");
			}
			
			reader = new IndexPropertyFieldReader(fieldIdx.intValue(), fieldProperty);
		}
		else
		{
			reader = new IndexFieldReader(fieldIdx.intValue());
		}
		
		return reader;
	}

	
	/**
	 * Sets the current row of the query result.
	 * 
	 * @param currentReturnValue the current row value
	 */
	protected void setCurrentRowValue(Object currentReturnValue)
	{
		this.currentReturnValue = currentReturnValue;
	}
	
	
	public Object getFieldValue(JRField jrField) throws JRException
	{
		FieldReader reader = (FieldReader) fieldReaders.get(jrField.getName());
		if (reader == null)
		{
			throw new JRRuntimeException("No filed reader for " + jrField.getName());
		}
		return reader.getFieldValue(currentReturnValue);
	}

	protected String getFieldMapping(JRField field)
	{
		if(useFieldDescription)
		{
			if (field.getDescription() == null)
			{
				return field.getName();
			}
			return field.getDescription();
		}
		else
		{
			return field.getName();
		}
	}
	
	
	/**
	 * Interface used to get the value of a report field from a result row.
	 */
	protected static interface FieldReader
	{
		Object getFieldValue(Object resultValue) throws JRException;
	}
	
	protected static class IdentityFieldReader implements FieldReader
	{
		public Object getFieldValue(Object resultValue)
		{
			return resultValue;
		}	
	}
	
	protected static class IndexFieldReader implements FieldReader
	{
		private final int idx;

		protected IndexFieldReader(int idx)
		{
			this.idx = idx;
		}
		
		public Object getFieldValue(Object resultValue)
		{
			return ((Object[]) resultValue)[idx];
		}
	}
	
	protected static class PropertyFieldReader implements FieldReader
	{
		private final String property;

		protected PropertyFieldReader(String property)
		{
			this.property = property;
		}
		
		public Object getFieldValue(Object resultValue) throws JRException
		{
			return getBeanProperty(resultValue, property);
		}
	}
	
	protected static class IndexPropertyFieldReader implements FieldReader
	{
		private final int idx;
		private final String property;

		protected IndexPropertyFieldReader(int idx, String property)
		{
			this.idx = idx;
			this.property = property;
		}
		
		public Object getFieldValue(Object resultValue) throws JRException
		{
			return getBeanProperty(((Object[]) resultValue)[idx], property);
		}
	}
	
	protected static Object getBeanProperty(Object bean, String propertyName) throws JRException
	{
		Object value = null;
		
		if ("_THIS".equals(propertyName))
		{
			value = bean;
		}
		else if (bean != null)
		{
			try
			{
				value = PropertyUtils.getProperty(bean, propertyName);
			}
			catch (java.lang.IllegalAccessException e)
			{
				throw new JRException("Error retrieving field value from bean : " + propertyName, e);
			}
			catch (java.lang.reflect.InvocationTargetException e)
			{
				throw new JRException("Error retrieving field value from bean : " + propertyName, e);
			}
			catch (java.lang.NoSuchMethodException e)
			{
				throw new JRException("Error retrieving field value from bean : " + propertyName, e);
			}
			catch (IllegalArgumentException e)
			{
				//FIXME replace with NestedNullException when upgrading to BeanUtils 1.7
				if (!e.getMessage().startsWith("Null property value for ")) 
				{
					throw e;
				}
			}
		}

		return value;
	}
	
}
