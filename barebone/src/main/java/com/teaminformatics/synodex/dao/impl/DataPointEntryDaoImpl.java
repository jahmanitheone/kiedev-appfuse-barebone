package com.teaminformatics.synodex.dao.impl;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.synodex.io.DataPointEntryUtils;
import com.teaminformatics.synodex.dao.DataPointEntryDao;
import com.teaminformatics.synodex.model.AuditLogView;
import com.teaminformatics.synodex.model.CategorizedView;
import com.teaminformatics.synodex.model.DataPointEntry;
import com.teaminformatics.synodex.model.LOVValues;
import com.teaminformatics.synodex.model.QCAICodesView;


public class DataPointEntryDaoImpl extends LoadableDaoHibernate<DataPointEntry,Long> implements DataPointEntryDao
{
	private static final Log log = LogFactory.getLog(DataPointEntryDaoImpl.class);
	
	public DataPointEntryDaoImpl()
    {
	    super(DataPointEntry.class);
    }
	
	public List<Long> getCasesForDataPointEntries(final Long[] dataPointEntyIds)
	{
		return this.getHibernateTemplate().execute(new HibernateCallback<List<Long>>(){
			public List<Long> doInHibernate(Session session) throws HibernateException, SQLException
            {
				String hql = "select distinct c.id from DataPointEntry as dpe inner join dpe._page as p inner join p._case as c where dpe.id in (:ids) and dpe.isDeleted='N'";
				
				Query queryObject = session.createQuery(hql);
				queryObject.setParameterList("ids", dataPointEntyIds);
				return queryObject.list();
            }
			
		});
	}

	public Integer softDeleteDataPoint(final Long entryId) {
		return this.getHibernateTemplate().execute(
				new HibernateCallback<Integer>() {
					public Integer doInHibernate(Session session)
							throws HibernateException, SQLException {

						DataPointEntry entry = get(entryId);
						entry.setIsDeleted(new Boolean(true));
						entry.setUpdatedOn(new java.util.Date());

						save(entry);
						session.flush();

						return new Integer(1);
					}
				});
	}
	/**
	 * save DataPointEntry Transcription for DpEntryId 
	 */
	public String saveDataPointTranscript(final Long entryId,final DataPointEntry dataPointEntry, final Integer transcriptDataFieldNumber) {
		return this.getHibernateTemplate().execute(
				new HibernateCallback<String>() {
					public String doInHibernate(Session session)
							throws HibernateException, SQLException {

						DataPointEntry entry = get(entryId);
						
						if(transcriptDataFieldNumber==1)
							entry.setDataField1Value(dataPointEntry.getDataField1Value());
						else if (transcriptDataFieldNumber==2)
							entry.setDataField2Value(dataPointEntry.getDataField2Value());
						else if(transcriptDataFieldNumber==3)
							entry.setDataField3Value(dataPointEntry.getDataField3Value());
						else if(transcriptDataFieldNumber==4)
							entry.setDataField4Value(dataPointEntry.getDataField4Value());
						else if (transcriptDataFieldNumber==5)
							entry.setDataField5Value(dataPointEntry.getDataField5Value());
						else if(transcriptDataFieldNumber==6)
							entry.setDataField6Value(dataPointEntry.getDataField6Value());
						else if(transcriptDataFieldNumber==7)
							entry.setDataField7Value(dataPointEntry.getDataField7Value());
						else if(transcriptDataFieldNumber==8) 
							entry.setDataField8Value(dataPointEntry.getDataField8Value());
						else if(transcriptDataFieldNumber==9)
							entry.setDataField9Value(dataPointEntry.getDataField9Value());
						else if(transcriptDataFieldNumber==10)
							entry.setDataField10Value(dataPointEntry.getDataField10Value());
						else if(transcriptDataFieldNumber==11)
							entry.setDataField11Value(dataPointEntry.getDataField11Value());
						else if(transcriptDataFieldNumber==12) 
							entry.setDataField12Value(dataPointEntry.getDataField12Value());
						
						entry.setIsHandwriting(dataPointEntry.getIsHandwriting());
						entry.setUpdatedOn(new java.util.Date());
						
						save(entry);
						session.flush();

						return "Success";
					}
				});
	}

	public List<CategorizedView> getBackGroundDataEntries(final Long caseId) {
		// TODO Auto-generated method stub
		return (List<CategorizedView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<CategorizedView>>() {
					public List<CategorizedView> doInHibernate(Session session)
							throws HibernateException, SQLException {

						List<CategorizedView> recordlist	= new LinkedList<CategorizedView>();
					
						String sql = "SELECT iws_app_utils.getEpochMillisecond(dpe.datadate), " //index 0
									+ "dpe.suspendnote, " //index 1
									+ "dpe.isrejected, " //index 2
									+ "dpe.iscompleted, " //index 3
									+ "p.finalpagenumber, " //index 4
									+ "dpe.startSectionNumber, " //index 5
									+ "dpe.endSectionNumber, " //index 6
								    + "dpe.dpentryId, " //index 7						
									+ "mh.name, "//index 8
									+ " dpe.rejectreason, " //index 9
									+ " dpe.pageid, "//index10
							        + " qcd.returnstatus, "//index 11
							        + " qcd.returnvalue, "//index 12
							        + " qcd.iscodeAccepted, "//indeX13
							        + "dpe.hid, " //index 14
									+ "mh.dataField1, " //index 15
									+ "mh.dataField1Type, " //index 16
									+ "mh.dataField1Ref, "  //index 17
									+ "dpe.dataField1Value, " //index 18
									+ "mh.dataField2, " //index 19
									+ "mh.dataField2Type, " //index 20
									+ "mh.dataField2Ref, " //index 21
									+ "dpe.dataField2Value, " //index 22
									+ "mh.dataField3, " //index 23
									+ "mh.dataField3Type, " //index 24
									+ "mh.dataField3Ref, " //index 25
									+ "dpe.dataField3Value, " //index 26
									+ "mh.dataField4, " //index 27
									+ "mh.dataField4Type, " //index 28
									+ "mh.dataField4Ref, " //index 29
									+ "dpe.dataField4Value, " //index 30
									+ "dpe.iscritical, " //index 31
									+ "mh.codetype, " //index 32
									+ "mh.dataField5, " //index 33
									+ "mh.dataField5Type, " //index 34
									+ "mh.dataField5Ref, "  //index 35
									+ "dpe.dataField5Value, " //index 36
									+ "mh.dataField6, " //index 37
									+ "mh.dataField6Type, " //index 38
									+ "mh.dataField6Ref, " //index 39								
									+ "dpe.dataField6Value, " //index 40
									+ "mh.dataField7, " //index 41
									+ "mh.dataField7Type, " //index 42	
									+ "mh.dataField7Ref, " //index 43
									+ "dpe.dataField7Value, " //index 44
									+ "mh.dataField8, " //index 45
									+ "mh.dataField8Type, " //index 46
									+ "mh.dataField8Ref, " //index 47
									+ "dpe.dataField8Value, " //index 48
						            + "mh.description, "//index 49
						            + "c.HIERARCHYREVISION, "//index 50
									+ "dpe.HID_PREVIOUS, "//index 51
									+ "c.TOTALPAGES, "//index 52
						            + "mh.dataField9, " //index 53
									+ "mh.dataField9Type, " //index 54
									+ "mh.dataField9Ref, "  //index 55
									+ "dpe.dataField9Value, " //index 56
									+ "mh.dataField10, " //index 57
									+ "mh.dataField10Type, " //index 58
									+ "mh.dataField10Ref, " //index 59								
									+ "dpe.dataField10Value, " //index 60
									+ "mh.dataField11, " //index 61
									+ "mh.dataField11Type, " //index 62	
									+ "mh.dataField11Ref, " //index 63
									+ "dpe.dataField11Value, " //index 64
									+ "mh.dataField12, " //index 65
									+ "mh.dataField12Type, " //index 66
									+ "mh.dataField12Ref, " //index 67
									+ "dpe.dataField12Value "; //index 68
									
									
						sql += "FROM dpentries dpe, medicalhierarchy mh, cases c, pages p, QCAICODES qcd "+
								"WHERE dpe.hid           =mh.id "+
								" AND c.hierarchyrevision = mh.revision "+
								" AND mh.name in ('NAME','GENDER','AGE','DOB','HEIGHT','WEIGHT','TOB1','RX','RANGE') "+
								" AND dpe.isDeleted       ='N' "+
								" AND dpe.dpentryId=qcd.dpentryId(+) "+
								" AND c.caseid = p.caseid AND p.pageid = dpe.pageid " +
								" AND c.caseid            = :CaseId" +
								" order by dpe.datadate desc ";
						Query query = session.createSQLQuery(sql);
						query.setLong("CaseId", caseId);
						//query.setString("code", code);
						
						List<Object[]> result = query.list();
						
						String[] bkgrndSequenceArr = {"NAME","GENDER","AGE","DOB","HEIGHT","WEIGHT","TOB1","RX","RANGE"};
						List<String> bkgrndSeq = Arrays.asList(bkgrndSequenceArr);

						LinkedList<CategorizedView> bkgrndSortedResults =new LinkedList<CategorizedView>();
						
						for (Object[] record : result) {
							CategorizedView view = new CategorizedView();
							view.setDataDate(new java.util.Date(((BigDecimal) record[0]).longValue()));
							view.setSuspendnote((String) record[1]);
							view.setIsRejected((Character) record[2]);
							view.setIsCompleted((Character) record[3]);
							view.setFinalPageNumber(((BigDecimal) record[4]).longValue());
							if(record[5] != null && record[6] != null ){
								Long startSectionNo = ((BigDecimal) record[5]).longValue();
								Long endSectionNo = ((BigDecimal) record[6]).longValue();
								if(startSectionNo.equals(endSectionNo))
									view.setSectionRange(startSectionNo.toString());
								else
									view.setSectionRange(startSectionNo.toString() + "-" + endSectionNo.toString() );
							}
							view.setEntryId(((BigDecimal) record[7]).longValue());
							view.setCodeName((String)record[8]);
							view.setRejectReason((String)record[9]);
							view.setPageId(((BigDecimal)record[10]).longValue());
							view.setReturnStatus((String)record[11]);
							view.setReturnValue((String)record[12]);
							view.setIsCodeAccepted((String)record[13]);
							view.setCodeId(((BigDecimal) record[14]).longValue()); 
							view.setDataField1((String)record[15]);
							view.setDataField1Type((String)record[16]);
			                 if( record[17]!=null)
			                 view.setDataField1Ref(((BigDecimal) record[17]).longValue());
			                 else 
			                 view.setDataField1Ref(0L);
		                     view.setDataField1Value((String)record[18]);
			                 view.setDataField2((String)record[19]);
			                 view.setDataField2Type((String)record[20]);
			                 if(record[21]!=null)
			                 view.setDataField2Ref(((BigDecimal) record[21]).longValue());
			                 else
			                 view.setDataField2Ref(0L);
		                     view.setDataField2Value((String)record[22]);
			                 view.setDataField3((String)record[23]);
			                 view.setDataField3Type((String)record[24]);
			                 if(record[25]!=null)
			                 view.setDataField3Ref(((BigDecimal) record[25]).longValue());
			                 else
			                 view.setDataField3Ref(0L);
		                     view.setDataField3Value((String)record[26]);
			                 view.setDataField4((String)record[27]);
			                 view.setDataField4Type((String)record[28]);
			                 if(record[29]!=null)
					          view.setDataField4Ref(((BigDecimal) record[29]).longValue());
			                 else 
			                  view.setDataField4Ref(0L);
			                	
							view.setDataField4Value((String) record[30]);
							view.setIsCritical((String) record[31]);
							view.setCodetype((String) record[32]);

							view.setDataField5((String) record[33]);
							view.setDataField5Type((String) record[34]);
							if (record[35] != null)
								view.setDataField5Ref(((BigDecimal) record[35])
										.longValue());
							else
								view.setDataField5Ref(0L);
							view.setDataField5Value((String) record[36]);
							view.setDataField6((String) record[37]);
							view.setDataField6Type((String) record[38]);
							if (record[39] != null)
								view.setDataField6Ref(((BigDecimal) record[39])
										.longValue());
							else
								view.setDataField6Ref(0L);
							view.setDataField6Value((String) record[40]);
							view.setDataField7((String) record[41]);
							view.setDataField7Type((String) record[42]);
							if (record[44] != null)
								view.setDataField7Ref(((BigDecimal) record[43])
										.longValue());
							else
								view.setDataField7Ref(0L);
							view.setDataField7Value((String) record[44]);
							view.setDataField8((String) record[45]);
							view.setDataField8Type((String) record[46]);
							if (record[47] != null)
								view.setDataField8Ref(((BigDecimal) record[47])
										.longValue());
							else
								view.setDataField8Ref(0L);
							view.setDataField8Value((String) record[48]);
							view.setCodeDesc((String)record[49]);
							view.setHierarchyrevision((String)record[50]);
							if (record[51] != null)
								view.setHidPrevious(((BigDecimal) record[51]).longValue());
							else
								view.setHidPrevious(0L);
							view.setTotalPages(((BigDecimal) record[52]).longValue());
							if(record[53]!=null){
								view.setDataField9((String) record[53]);
								view.setDataField9Type((String) record[54]);
								if (record[55] != null)
									view.setDataField9Ref(((BigDecimal) record[55])
											.longValue());
								else
									view.setDataField9Ref(0L);
								view.setDataField9Value((String) record[56]);
								view.setDataField10((String) record[57]);
								view.setDataField10Type((String) record[58]);
								if (record[59] != null)
									view.setDataField10Ref(((BigDecimal) record[59])
											.longValue());
								else
									view.setDataField10Ref(0L);
								view.setDataField10Value((String) record[60]);
								view.setDataField11((String) record[61]);
								view.setDataField11Type((String) record[62]);
								if (record[63] != null)
									view.setDataField11Ref(((BigDecimal) record[63])
											.longValue());
								else
									view.setDataField11Ref(0L);
								view.setDataField11Value((String) record[64]);
								view.setDataField12((String) record[65]);
								view.setDataField12Type((String) record[66]);
								if (record[67] != null)
									view.setDataField12Ref(((BigDecimal) record[67])
											.longValue());
								else
									view.setDataField12Ref(0L);
								view.setDataField12Value((String) record[68]);
							 }
							recordlist.add(view);
						}
						
						// sorted according to bkgrndSequenceArr =  {"NAME","GENDER","AGE","DOB","HEIGHT","WEIGHT","TOB1","RX","RANGE"}
						for (String sequence : bkgrndSeq) {
							for (CategorizedView view : recordlist) {
								CategorizedView categorizedView = view;
								if (view.getCodeName().equalsIgnoreCase(
										sequence)) {
									bkgrndSortedResults.add(categorizedView);
								}
							}
						}

						return bkgrndSortedResults;
					}
				});
	}

	/**
	 * Used by DataPointController.getDataPointEntries method and Ajax call /dataPoint/loadDPEntries/{caseId}/{modifiedOnly}
	 */
	public List<CategorizedView> getDataPointEntries(final Long caseId,final Boolean modifiedOnly) {
		// TODO Auto-generated method stub
		return (List<CategorizedView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<CategorizedView>>() {
					public List<CategorizedView> doInHibernate(Session session)
							throws HibernateException, SQLException {

						String sql = "SELECT "
								+ "p.caseid, " //index 0
								+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))) category, " //index 1 
								+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))-1) subcategory, " //index 2
								+ "code.name codename, " //index 3
								+ "code.codedesc, " //index 4
								+ "p.finalpagenumber, " //index 5
								+ "dpe.sectionnumber, " //index 6
								+ "iws_app_utils.getEpochMillisecond(dpe.datadate), " //index 7
								+ "dpe.dpentryId, " //index 8
								+ "code.hid, " //index 9
								+ "code.dataField1, " //index 10
								+ "code.dataField1Type, " //index 11
								+ "code.dataField1Ref, "  //index 12
								+ "dpe.dataField1Value, " //index 13
								+ "code.dataField2, " //index 14
								+ "code.dataField2Type, " //index 15
								+ "code.dataField2Ref, " //index 16
								+ "dpe.dataField2Value, " //index 17
								+ "code.dataField3, " //index 18
								+ "code.dataField3Type, " //index 19
								+ "code.dataField3Ref, " //index 20
								+ "dpe.dataField3Value, " //index 21
								+ "code.dataField4, " //index 22
								+ "code.dataField4Type, " //index 23
								+ "code.dataField4Ref, " //index 24
								+ "dpe.dataField4Value, " //index 25
								+ "dpe.iscritical, " //index 26
								+ "dpe.startSectionNumber, " //index 27
								+ "dpe.endSectionNumber, " //index 28
								+ "code.codetype, " //index 29
								+ "code.dataField5, " //index 30
								+ "code.dataField5Type, " //index 31
								+ "code.dataField5Ref, "  //index 32
								+ "dpe.dataField5Value, " //index 43
								+ "code.dataField6, " //index 34
								+ "code.dataField6Type, " //index 35
								+ "code.dataField6Ref, " //index 36
								+ "dpe.dataField6Value, " //index 37
								+ "code.dataField7, " //index 38
								+ "code.dataField7Type, " //index 39
								+ "code.dataField7Ref, " //index 40
								+ "dpe.dataField7Value, " //index 41
								+ "code.dataField8, " //index 42
								+ "code.dataField8Type, " //index 43
								+ "code.dataField8Ref, " //index 44
								+ "dpe.dataField8Value, " //index 45
								+ "dpe.USERFEEDBACK, "  // index 46
								+ "dpe.suspendnote, "//index 47
								+ "dpe.isrejected, " //index 48
								+ "dpe.iscompleted, "//index 49
								+" dpe.rejectreason, "//index 50
								+" dpe.hid, "//index 51
								+ "p.pageid, " //index 52
								+ "c.HIERARCHYREVISION, "// index 53
								+ "dpe.HID_PREVIOUS, "//index 54
								+ "dpe.sequence, " //index 55
								+ "code.dataField9, " //index 56
								+ "code.dataField9Type, " //index 57
								+ "code.dataField9Ref, "  //index 58
								+ "dpe.dataField9Value, " //index 59
								+ "code.dataField10, " //index 60
								+ "code.dataField10Type, " //index 61
								+ "code.dataField10Ref, " //index 62
								+ "dpe.dataField10Value, " //index 63
								+ "code.dataField11, " //index 64
								+ "code.dataField11Type, " //index 65
								+ "code.dataField11Ref, " //index 66
								+ "dpe.dataField11Value, " //index 67
								+ "code.dataField12, " //index 68
								+ "code.dataField12Type, " //index 69
								+ "code.dataField12Ref, " //index 70
								+ "dpe.dataField12Value, " //index 71
								+ "dpe.criticality, " //index 72 - code scale
								+ "(SELECT max(displayrank) FROM medicalhierarchy where name = regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))) " +
								"START WITH id=dpe.hid CONNECT BY PRIOR parentid = id) displayrankcat, " //index 73
								+ "(SELECT max(displayrank) FROM medicalhierarchy where name = regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))-1) " +
								"START WITH id=dpe.hid CONNECT BY PRIOR parentid = id) displayranksubcat " //index 74
								+ "FROM dpentries dpe, pages p, MEDICALHIERARCHY_LEAF_LEVEL_V code, cases c " 
								+ "WHERE dpe.pageid = p.pageid "
								+ "AND dpe.hid = code.hid AND dpe.isDeleted = 'N' "
								+ "AND c.caseid = p.caseId "
								+ "AND c.caseId=:caseId ";
								if(modifiedOnly){
							    sql+="AND dpe.dpentryId in(SELECT distinct OBJECTID AS DPENTRYID "
                                    +"FROM AUDITLOG aud "
                                    +"WHERE (ORIGINALVALUE <> MODIFIEDVALUE  "
                                    +"OR (ORIGINALVALUE IS NULL AND MODIFIEDVALUE IS NOT NULL) "
                                    +"OR (ORIGINALVALUE IS NOT NULL AND MODIFIEDVALUE IS NULL)) "
                                    +"AND OBJECTTYPE IN ('DPENTRIES.DATADATE', "
                                    +"'DPENTRIES.DATAFIELD1VALUE', 'DPENTRIES.DATAFIELD2VALUE', 'DPENTRIES.DATAFIELD3VALUE', 'DPENTRIES.DATAFIELD4VALUE', "
                                    +"'DPENTRIES.DATAFIELD5VALUE', 'DPENTRIES.DATAFIELD6VALUE', 'DPENTRIES.DATAFIELD7VALUE', 'DPENTRIES.DATAFIELD8VALUE', " 
                                    +"'DPENTRIES.HID', "
                                    +"'DPENTRIES.SUSPENDNOTE', 'DPENTRIES.PAGEID', 'DPENTRIES.STARTSECTIONNUMBER', 'DPENTRIES.ENDSECTIONNUMBER') "
                                    +"AND aud.TIMESTAMP >= (SELECT MAX(ch.stagecompletiontimestamp) FROM casehistorysum ch WHERE stagecompletiontimestamp is not null and ch.caseid=aud.caseid) "
                                    +"AND aud.CASEID = :caseId) ";	
								}
						        sql+="ORDER BY displayrankcat DESC NULLS LAST, category, displayranksubcat DESC NULLS LAST, subcategory, "
						        	+ "codedesc, codename, "
						        	+ "dpe.datadate desc, p.finalpagenumber, dpe.sectionnumber";
						
						Query query = session.createSQLQuery(sql);
						query.setLong("caseId", caseId);
						//query.setB
						List<CategorizedView> recordlist	= new LinkedList<CategorizedView>();
						List<Object[]> result = query.list();
						for(Iterator it=result.iterator();it.hasNext();){
							CategorizedView cateObj = new CategorizedView();
				                 Object[] bgObject = (Object[])it.next();
				                 cateObj.setCategory((String)bgObject[1]);
				                 cateObj.setSubcategory((String)bgObject[2]);
				                 cateObj.setCodeName((String)bgObject[3]);
				                 cateObj.setCodeDesc((String)bgObject[4]);
				                 cateObj.setFinalPageNumber(((BigDecimal) bgObject[5]).longValue());
				                 cateObj.setSectionnumber(((BigDecimal) bgObject[6]).longValue());
				                 cateObj.setDataDate(new java.util.Date(((BigDecimal) bgObject[7]).longValue()));
				                 cateObj.setEntryId(((BigDecimal) bgObject[8]).longValue());
				                 cateObj.setHid(((BigDecimal) bgObject[9]).longValue());
				                 cateObj.setDataField1((String)bgObject[10]);
					                 cateObj.setDataField1Type((String)bgObject[11]);
					                 if( bgObject[12]!=null)
					                 cateObj.setDataField1Ref(((BigDecimal) bgObject[12]).longValue());
					                 else 
					                 cateObj.setDataField1Ref(0L);
				                     cateObj.setDataField1Value((String)bgObject[13]);
					                 cateObj.setDataField2((String)bgObject[14]);
					                 cateObj.setDataField2Type((String)bgObject[15]);
					                 if(bgObject[16]!=null)
					                 cateObj.setDataField2Ref(((BigDecimal) bgObject[16]).longValue());
					                 else
					                 cateObj.setDataField2Ref(0L);
				                     cateObj.setDataField2Value((String)bgObject[17]);
					                 cateObj.setDataField3((String)bgObject[18]);
					                 cateObj.setDataField3Type((String)bgObject[19]);
					                 if(bgObject[20]!=null)
					                 cateObj.setDataField3Ref(((BigDecimal) bgObject[20]).longValue());
					                 else
					                 cateObj.setDataField3Ref(0L);
				                     cateObj.setDataField3Value((String)bgObject[21]);
					                 cateObj.setDataField4((String)bgObject[22]);
					                 cateObj.setDataField4Type((String)bgObject[23]);
					                 if(bgObject[24]!=null)
							          cateObj.setDataField4Ref(((BigDecimal) bgObject[24]).longValue());
					                 else 
					                  cateObj.setDataField4Ref(0L);
					                	
				                      cateObj.setDataField4Value((String)bgObject[25]);
				                      cateObj.setIsCritical((String)bgObject[26]);
				                 if(bgObject[27] != null && bgObject[28] != null ){
										Long startSectionNo = ((BigDecimal) bgObject[27]).longValue();
										Long endSectionNo = ((BigDecimal) bgObject[28]).longValue();
										if(startSectionNo.equals(endSectionNo))
											cateObj.setSectionRange(startSectionNo.toString());
										else
											cateObj.setSectionRange(startSectionNo.toString() + "-" + endSectionNo.toString() );
									}else{ // need to remove this else once section number column will be get removed
										cateObj.setSectionRange(String.valueOf(((BigDecimal) bgObject[6]).longValue()));
									}
					                     cateObj.setCodetype((String)bgObject[29]);
				                 
					                     cateObj.setDataField5((String)bgObject[30]);
						                 cateObj.setDataField5Type((String)bgObject[31]);
						                 if(bgObject[32]!=null)
						                	 cateObj.setDataField5Ref(((BigDecimal) bgObject[32]).longValue());
						                 else 
						                	 cateObj.setDataField5Ref(0L);
					                     cateObj.setDataField5Value((String)bgObject[33]);
						                 cateObj.setDataField6((String)bgObject[34]);
						                 cateObj.setDataField6Type((String)bgObject[35]);
						                 if( bgObject[36]!=null)
						                	 cateObj.setDataField6Ref(((BigDecimal) bgObject[36]).longValue());
						                 else 
						                	 cateObj.setDataField6Ref(0L);
					                     cateObj.setDataField6Value((String)bgObject[37]);
						                 cateObj.setDataField7((String)bgObject[38]);
						                 cateObj.setDataField7Type((String)bgObject[39]);
						                 if(bgObject[40]!=null)
						                	 cateObj.setDataField7Ref(((BigDecimal) bgObject[40]).longValue());
						                 else 
						                	 cateObj.setDataField7Ref(0L);
					                     cateObj.setDataField7Value((String)bgObject[41]);
						                 cateObj.setDataField8((String)bgObject[42]);
						                 cateObj.setDataField8Type((String)bgObject[43]);
						                 if( bgObject[44]!=null)
						                	 cateObj.setDataField8Ref(((BigDecimal) bgObject[44]).longValue());
						                 else 
						                	 cateObj.setDataField8Ref(0L);
					                     cateObj.setDataField8Value((String)bgObject[45]);
					                     cateObj.setUserFeedback((String)bgObject[46]);
					                     cateObj.setSuspendnote((String)bgObject[47]);
					                     cateObj.setIsRejected((Character)bgObject[48]);
					                     cateObj.setIsCompleted((Character)bgObject[49]);
					                     cateObj.setRejectReason((String)bgObject[50]);
					                     cateObj.setCodeId(((BigDecimal) bgObject[51]).longValue());
					                     cateObj.setPageId(((BigDecimal) bgObject[52]).longValue());
					                     cateObj.setHierarchyrevision((String)bgObject[53]);
					                     if (bgObject[54] != null)
					                    	 cateObj.setHidPrevious(((BigDecimal) bgObject[54]).longValue());
										 else
											 cateObj.setHidPrevious(0L);
					                     cateObj.setSequence(((BigDecimal) bgObject[55]).longValue());
					                  // data fields from 9 to 12
					                     if(bgObject[56]!=null){
					                     cateObj.setDataField9((String)bgObject[56]);
						                 cateObj.setDataField9Type((String)bgObject[57]);
						                 if(bgObject[58]!=null)
						                	 cateObj.setDataField9Ref(((BigDecimal) bgObject[58]).longValue());
						                 else 
						                	 cateObj.setDataField9Ref(0L);
					                     cateObj.setDataField9Value((String)bgObject[59]);
						                 cateObj.setDataField10((String)bgObject[60]);
						                 cateObj.setDataField10Type((String)bgObject[61]);
						                 if( bgObject[62]!=null)
						                	 cateObj.setDataField10Ref(((BigDecimal) bgObject[62]).longValue());
						                 else 
						                	 cateObj.setDataField10Ref(0L);
					                     cateObj.setDataField10Value((String)bgObject[63]);
						                 cateObj.setDataField11((String)bgObject[64]);
						                 cateObj.setDataField11Type((String)bgObject[65]);
						                 if(bgObject[66]!=null)
						                	 cateObj.setDataField11Ref(((BigDecimal) bgObject[66]).longValue());
						                 else 
						                	 cateObj.setDataField11Ref(0L);
					                     cateObj.setDataField11Value((String)bgObject[67]);
						                 cateObj.setDataField12((String)bgObject[68]);
						                 cateObj.setDataField12Type((String)bgObject[69]);
						                 if( bgObject[70]!=null)
						                	 cateObj.setDataField12Ref(((BigDecimal) bgObject[70]).longValue());
						                 else 
						                	 cateObj.setDataField12Ref(0L);
					                     cateObj.setDataField12Value((String)bgObject[71]);
					                     }
					                     
					                     //set code scale value
					                     if(bgObject[72]!=null)
									         cateObj.setCodeScale(Integer.parseInt(bgObject[72].toString()));
									     else
									    	 cateObj.setCodeScale(1);
					                     
					                     cateObj.setAllDataFieldsValue(DataPointEntryUtils.getDataValue(cateObj, false));
					                     if(modifiedOnly)
					                    	 cateObj.setAuditLogView(getDataPointAuditLogs(caseId,cateObj.getEntryId()));
					                     cateObj.setQcaiCodesView(getDataPointQCAICodes(caseId,cateObj.getEntryId()));
					                     
					                     //IWN-450: Add Legend symbols to DP List Report View
					                     String criticalSymbol = "";
					                     if(cateObj.getCodeScale() == 3 && ((cateObj.getCategory().equals("Disease") || cateObj.getCategory().equals("Injuries")))) { //for critical codes, RPT-28
											criticalSymbol="!!";
					                     }
					                     else if (cateObj.getCodeScale() == 2 && ((cateObj.getCategory().equals("Disease") || cateObj.getCategory().equals("Injuries")))) { //for major codes, RPT-28
					                    	 criticalSymbol="!";
					                     }
					                     criticalSymbol+=" "+ getLegendValue(cateObj);
					                     cateObj.setLegends(criticalSymbol.trim());

					                     recordlist.add(cateObj);
								 }
						
						return recordlist;
					}
				});
		
	}
	
	/** This method is to getDatapoint Audiot logs for a specific case and dpentyrid
	 * 
	 */
	
	public List<AuditLogView> getDataPointAuditLogs(final Long caseId, final Long dpEntryId) {
		// TODO Auto-generated method stub
		return (List<AuditLogView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<AuditLogView>>() {
					public List<AuditLogView> doInHibernate(Session session)
							throws HibernateException, SQLException {

						String sql = "SELECT "
								+ "aud.objectid, " //index 0
								+ "aud.originalvalue, " //index 1
								+ "aud.modifiedvalue, " //index 2
								+ "aud.objecttype " //index 3
								+ "FROM AUDITLOG aud " 
								+ "WHERE (aud.originalvalue <> aud.modifiedvalue " //-- if value changed
								+ "OR (aud.originalvalue IS NULL AND aud.modifiedvalue IS NOT NULL) " // -- if new value entered
								+ "OR (aud.originalvalue IS NOT NULL AND aud.modifiedvalue IS NULL))  "// -- if new value entered
								+ "AND aud.objecttype IN " 
									+ "('DPENTRIES.DATADATE', " // -- if data date changed
									+ "'DPENTRIES.DATAFIELD1VALUE', 'DPENTRIES.DATAFIELD2VALUE', 'DPENTRIES.DATAFIELD3VALUE', 'DPENTRIES.DATAFIELD4VALUE', " // -- if data field value changed
									+ "'DPENTRIES.DATAFIELD5VALUE', 'DPENTRIES.DATAFIELD6VALUE', 'DPENTRIES.DATAFIELD7VALUE', 'DPENTRIES.DATAFIELD8VALUE', " // -- if data field value changed
									+ "'DPENTRIES.DATAFIELD9VALUE', 'DPENTRIES.DATAFIELD10VALUE', 'DPENTRIES.DATAFIELD11VALUE', 'DPENTRIES.DATAFIELD12VALUE', " // -- if data field value changed
									+ "'DPENTRIES.HID', " //-- if code is replaced
									+ "'DPENTRIES.SUSPENDNOTE', "//-- if review note entered in QA Review step
									+ "'DPENTRIES.PAGEID', 'DPENTRIES.STARTSECTIONNUMBER', 'DPENTRIES.ENDSECTIONNUMBER') " //-- if page/section changed
								+ "AND aud.timestamp >= (SELECT MAX(ch.stagecompletiontimestamp) FROM casehistorysum ch WHERE stagecompletiontimestamp is not null and ch.caseid=aud.caseid) " // -- capture changed DP entries since last stage change
								+ "AND aud.caseid = :caseId " 
								+ "AND aud.objectid = :dpentryId "
						        + "Group by aud.OBJECTID,aud.originalValue,aud.modifiedvalue,aud.objecttype ";

						Query query = session.createSQLQuery(sql);
						query.setLong("caseId", caseId);
						query.setLong("dpentryId", dpEntryId);

						List<Object[]> result = query.list();
						List<AuditLogView> auditLogList = new ArrayList<AuditLogView>();

						for (Object[] auditLog : result) {
							AuditLogView auditLogView = new AuditLogView();
							auditLogView.setObjectId(((BigDecimal) auditLog[0]).longValue());
							auditLogView.setOriginalValue((String) auditLog[1]);
							auditLogView.setModifiedValue((String) auditLog[2]);
							auditLogView.setObjectType((String) auditLog[3]);
							auditLogList.add(auditLogView);
						}

						return auditLogList;
					}
				});

	}
	/** This method is to getDatapoint QCAIcodes entry for a specific case and dpentyrid
	 * 
	 */
	public List<QCAICodesView> getDataPointQCAICodes(final Long caseId, final Long dpEntryId) {
		// TODO Auto-generated method stub
		return (List<QCAICodesView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<QCAICodesView>>() {
					public List<QCAICodesView> doInHibernate(Session session)
							throws HibernateException, SQLException {

						String sql ="select q.iscodeaccepted,q.returnstatus,q.returnvalue,q.confidence,q.ranking from qcaicodes q " +
								    "where q.dpentryid=:dpentryId and q.caseid=:caseId order by confidence, returnvalue asc";
						Query query = session.createSQLQuery(sql);
						query.setLong("caseId", caseId);
						query.setLong("dpentryId", dpEntryId);

						List<Object[]> result = query.list();
						List<QCAICodesView> QcaiCodeList = new ArrayList<QCAICodesView>();

						for (Object[] QcaiCodes : result) {
							QCAICodesView qcaiCodesView = new QCAICodesView();
							qcaiCodesView.setIsCodeAccepted((String) QcaiCodes[0]);
							qcaiCodesView.setReturnStatus((String) QcaiCodes[1]);
							qcaiCodesView.setReturnValue((String) QcaiCodes[2]);
							qcaiCodesView.setConfidence(((BigDecimal) QcaiCodes[3]).longValue());
							if(QcaiCodes[4]!=null)
							qcaiCodesView.setRanking(((BigDecimal) QcaiCodes[4]).longValue());
							
							QcaiCodeList.add(qcaiCodesView);
						}

						return QcaiCodeList;
					}
				});

	}

	public Integer getCaseImpairedOrStandard(final Long caseId) {
		return this.getHibernateTemplate().execute(
				new HibernateCallback<Integer>() {
					public Integer doInHibernate(Session session)
							throws HibernateException, SQLException {
						String sql="select count(*) as count from dpentries d,pages p where d.isdeleted='N' and d.pageid=p.pageid " +
								"and IWS_APP_UTILS.getCodeScaleForDP(d.dpentryid) > 1 and p.caseid=:CaseId"; //IWN-428 and RPT-28: only flag as impaired case if having major or critical codes in Disease and Injuries
						Query query = session.createSQLQuery(sql).addScalar("count",StandardBasicTypes.INTEGER);
						query.setLong("CaseId", caseId);
						//query.setString("code", code);
						
						List result = query.list();
						Integer count=0;
						if(result.get(0)!=null){
							count=(Integer)result.get(0);
							
						}
						if(count>0)
						return new Integer(1);
						else 
						return new Integer(0);
					}
				});// TODO Auto-generated method stub
	}
	
	/**
	 * Get legend symbol from all data fields (legends are category specific)
	 * @param CategorizedView obj
	 * @return legend symbol for all data fields
	 */
	private String getLegendValue(CategorizedView obj)
	{
		String value="";
		
		if(obj.getDataField1()!=null && obj.getDataField1().equalsIgnoreCase("Legend") && obj.getDataField1Type().equalsIgnoreCase("LOVS") && obj.getDataField1Value()!=null && !obj.getDataField1Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField1Value(), obj.getDataField1Ref().intValue());
		else if(obj.getDataField2()!=null && obj.getDataField2().equalsIgnoreCase("Legend") && obj.getDataField2Type().equalsIgnoreCase("LOVS") && obj.getDataField2Value()!=null && !obj.getDataField2Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField2Value(), obj.getDataField2Ref().intValue());
		else if(obj.getDataField3()!=null && obj.getDataField3().equalsIgnoreCase("Legend") && obj.getDataField3Type().equalsIgnoreCase("LOVS") && obj.getDataField3Value()!=null && !obj.getDataField3Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField3Value(), obj.getDataField3Ref().intValue());
		else if(obj.getDataField4()!=null && obj.getDataField4().equalsIgnoreCase("Legend") && obj.getDataField4Type().equalsIgnoreCase("LOVS") && obj.getDataField4Value()!=null && !obj.getDataField4Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField4Value(), obj.getDataField4Ref().intValue());
		else if(obj.getDataField5()!=null && obj.getDataField5().equalsIgnoreCase("Legend") && obj.getDataField5Type().equalsIgnoreCase("LOVS") && obj.getDataField5Value()!=null && !obj.getDataField5Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField5Value(), obj.getDataField5Ref().intValue());
		else if(obj.getDataField6()!=null && obj.getDataField6().equalsIgnoreCase("Legend") && obj.getDataField6Type().equalsIgnoreCase("LOVS") && obj.getDataField6Value()!=null && !obj.getDataField6Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField6Value(), obj.getDataField6Ref().intValue());
		else if(obj.getDataField7()!=null && obj.getDataField7().equalsIgnoreCase("Legend") && obj.getDataField7Type().equalsIgnoreCase("LOVS") && obj.getDataField7Value()!=null && !obj.getDataField7Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField7Value(), obj.getDataField7Ref().intValue());
		else if(obj.getDataField8()!=null && obj.getDataField8().equalsIgnoreCase("Legend") && obj.getDataField8Type().equalsIgnoreCase("LOVS") && obj.getDataField8Value()!=null && !obj.getDataField8Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField8Value(), obj.getDataField8Ref().intValue());
		else if(obj.getDataField9()!=null && obj.getDataField9().equalsIgnoreCase("Legend") && obj.getDataField9Type().equalsIgnoreCase("LOVS") && obj.getDataField9Value()!=null && !obj.getDataField9Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField9Value(), obj.getDataField9Ref().intValue());
		else if(obj.getDataField10()!=null && obj.getDataField10().equalsIgnoreCase("Legend") && obj.getDataField10Type().equalsIgnoreCase("LOVS") && obj.getDataField10Value()!=null && !obj.getDataField10Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField10Value(), obj.getDataField10Ref().intValue());
		else if(obj.getDataField11()!=null && obj.getDataField11().equalsIgnoreCase("Legend") && obj.getDataField11Type().equalsIgnoreCase("LOVS") && obj.getDataField11Value()!=null && !obj.getDataField11Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField11Value(), obj.getDataField11Ref().intValue());
		else if(obj.getDataField12()!=null && obj.getDataField12().equalsIgnoreCase("Legend") && obj.getDataField12Type().equalsIgnoreCase("LOVS") && obj.getDataField12Value()!=null && !obj.getDataField12Value().equalsIgnoreCase(""))
			value = extractLegendValue(obj.getDataField12Value(), obj.getDataField12Ref().intValue());
		
		return value;
	}

	/**
	 * Helper method to get legend symbol for one data field
	 */
	private String extractLegendValue(String dataFieldValue, int dataFieldRef) {
		String value = "";
		List<LOVValues> object=null;
		try {
			object = getLovValues(new Long(dataFieldRef), dataFieldValue);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (object != null) {
			for(int i=0;i<object.size();i++)
			{
				LOVValues lov_obj=object.get(i);
				if(i==0)
					value=lov_obj.getNotes();
				else
				value+=","+lov_obj.getNotes();
			}
		}
		return value;
	}	

	/**
	 * Helper method to get lovvalues objects based on lovid and lovvalue
	 */
	private List<LOVValues> getLovValues(final Long lovid, final String lovValue)
	{
		return this.getHibernateTemplate().execute(new HibernateCallback<List<LOVValues>>(){
			public List<LOVValues> doInHibernate(Session session) throws HibernateException, SQLException
            {
				String hql = "from LOVValues lovValues where lovValues._lov.lovid = :lovid and lovValues.lovValue = :lovvalue";
				Query query =   session.createQuery(hql);
	            query.setLong("lovid", lovid);
	            query.setString("lovvalue", lovValue);
				return query.list();
            }
			
		});
	}	
	
}


