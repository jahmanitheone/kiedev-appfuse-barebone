package com.teaminformatics.synodex.dao.impl;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.teaminformatics.synodex.dao.MedicalHierarchyViewDao;
import com.teaminformatics.synodex.model.DataPointEntryView;
import com.teaminformatics.synodex.model.MedicalHierarchy;
import com.teaminformatics.synodex.model.MedicalHierarchyView;

/**
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 * @dated 2012/04/25
 */
public class MedicalHierarchyViewDaoImpl extends
		LoadableDaoHibernate<MedicalHierarchyView, Long> implements
		MedicalHierarchyViewDao {
	private static final int STARTING_ID_0 = 54;
	private static final int ROOT_LEVEL_1 = 1; // Unseen root level
	private static final int LEVEL_2 = 2; // Main level used in presentation
	private static final Log log = LogFactory
			.getLog(MedicalHierarchyViewDaoImpl.class);

	public MedicalHierarchyViewDaoImpl() {
		super(MedicalHierarchyView.class);
	}

	
	public MedicalHierarchy getMedicalHierarchyData(final long id) throws Exception {
		try {
			return(this.getHibernateTemplate().get(MedicalHierarchy.class, id));
		} catch (HibernateException he) {
			he.printStackTrace();
			throw he;
		}
	}
	/**
	 * 
	 * @param id Case ID
	 * @return returns a list of MedicalHierarchyView
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getMainLevelMedicalHierarchyViews(final Long id)
			throws Exception {
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							String hql = "SELECT  "
									+ "m1.id, "
									+ "m1.name, "
									+ "m1.description, "
									+ "m1.parentid, "
									+ "m1.billable, "
									+ "m1.displayrank, "
									+ "m1.greenflag, "
									+ "m1.yellowflag, "
									+ "m1.redflag, "
									+ "m1.commonname, "
									+ "m1.revision, "
									+ "1 as pseudolevel, "
									+ "m1.name hiearhydetail, "
									+ "m1.linktoid "
									+ "FROM MEDICALHIERARCHY m1, cases c, medicalhierarchy_leaf_level_v mv "
									+ "WHERE m1.revision = c.hierarchyrevision and c.caseid=:id and m1.id = mv.hid and mv.node_level = 1 "
									+ "ORDER BY m1.displayrank DESC NULLS LAST, m1.name";

							Query query = session.createSQLQuery(hql);
							query.setLong("id", id);
							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								view.setGreenFlag((String) record[6]);
								view.setYellowFlag((String) record[7]);
								view.setRedFlag((String) record[8]);
								view.setCommonName((String) record[9]);
								view.setRevision((String) record[10]);
								view.setLevel(((BigDecimal) record[11])
										.longValue());
								view.setHierarchyDetails((String) record[12]);
								if(record[13]!=null)
									view.setLinkToId(((BigDecimal) record[13]).longValue());
									
								recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}
	
	/**
	 * 
	 * @param id Case ID
	 * @return returns a list of MedicalHierarchyView
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getMedicalHierarchyData(final String name, final String revision,final Long CaseId)
			throws Exception {
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						String names[]=name.split("_");
						try {
							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();
							for(int i=0;i<names.length;i++){
							String hql = "SELECT  "
									+ "mh.id, "
									+ "mh.name, "
									+ "mh.description, "
									+ "mh.parentid, "
									+ "mh.billable, "
									+ "mh.datafield1, "
									+ "mh.datafield1type, "
									+ "mh.datafield1ref, "
									+ "mh.datafield2, "
									+ "mh.datafield2type, "
									+ "mh.datafield2ref, "
									+ "mh.datafield3, "
									+ "mh.datafield3type, "
									+ "mh.datafield3ref, "
									+ "mh.datafield4, "
									+ "mh.datafield4type, "
									+ "mh.datafield4ref, "
									+ "mh.datafield5, "
									+ "mh.datafield5type, "
									+ "mh.datafield5ref, "
									+ "mh.datafield6, "
									+ "mh.datafield6type, "
									+ "mh.datafield6ref, "
									+ "mh.datafield7, "
									+ "mh.datafield7type, "
									+ "mh.datafield7ref, "
									+ "mh.datafield8, "
									+ "mh.datafield8type, "
									+ "mh.datafield8ref, "
									+ "mh.displayrank, "
									+ "mh.greenflag, "
									+ "mh.yellowflag, "
									+ "mh.redflag, "
									+ "mh.commonname, "
									+ "mh.revision, "
									+"IWS_APP_UTILS.isCodeCritical2(:caseId, mh.id) isCritical,  "//index 35
									+ "mh.datafield9, "//index 36
									+ "mh.datafield9type, "//index 37
									+ "mh.datafield9ref, "//index 38
									+ "mh.datafield10, "//index 39
									+ "mh.datafield10type, "//index 40
									+ "mh.datafield10ref, "//index 41
									+ "mh.datafield11, "//index 42
									+ "mh.datafield11type, "//index 43
									+ "mh.datafield11ref, "//index 44
									+ "mh.datafield12, "//index 45
									+ "mh.datafield12type, "//index 46
									+ "mh.datafield12ref, "//index 47
									+ "IWS_APP_UTILS.getCodeScale2(:caseId, mh.id) " //index 48
									+ "FROM medicalhierarchy mh "
									+ "WHERE mh.name = :name AND mh.revision = :revision and mh.depth is null";
									

							Query query = session.createSQLQuery(hql);
							//query.setLong("id", id);
							query.setString("name", names[i].trim());
							query.setString("revision", revision);
							query.setLong("caseId", CaseId);

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								if(record[5]!=null)
								view.setDataField1((String) record[5]);
								else
									view.setDataField1("");	
								if(record[6]!=null)
								view.setDataField1Type((String) record[6]);
								if(record[7]!=null)
								view.setDataField1Ref(((BigDecimal) record[7])
										.longValue());
								if(record[8]!=null)
								view.setDataField2((String) record[8]);
								if(record[9]!=null)
								view.setDataField2Type((String) record[9]);
								if(record[10]!=null)
								view.setDataField2Ref(((BigDecimal) record[10])
										.longValue());
								if(record[11]!=null)
								view.setDataField3((String) record[11]);
								if(record[12]!=null)
								view.setDataField3Type((String) record[12]);
								if(record[13]!=null)
								view.setDataField3Ref(((BigDecimal) record[13])
										.longValue());
								if(record[14]!=null)
								view.setDataField4((String) record[14]);
								if(record[15]!=null)
								view.setDataField4Type((String) record[15]);
								if(record[16]!=null)
								view.setDataField4Ref(((BigDecimal) record[16])
										.longValue());
								if(record[17]!=null)
								view.setDataField5((String) record[17]);
								if(record[18]!=null)
								view.setDataField5Type((String) record[18]);
								if(record[19]!=null)
								view.setDataField5Ref(((BigDecimal) record[19])
										.longValue());
								if(record[20]!=null)
								view.setDataField6((String) record[20]);
								if(record[21]!=null)
								view.setDataField6Type((String) record[21]);
								if(record[22]!=null)
								view.setDataField6Ref(((BigDecimal) record[22])
										.longValue());
								if(record[23]!=null)
								view.setDataField7((String) record[23]);
								if(record[24]!=null)
								view.setDataField7Type((String) record[24]);
								if(record[25]!=null)
								view.setDataField7Ref(((BigDecimal) record[25])
										.longValue());
								if(record[26]!=null)
								view.setDataField8((String) record[26]);
								if(record[27]!=null)
								view.setDataField8Type((String) record[27]);
								if(record[28]!=null)
								view.setDataField8Ref(((BigDecimal) record[28])
										.longValue());
								if(record[29]!=null)
								view.setDisplayRank(((BigDecimal) record[29])
										.longValue());
								if(record[30]!=null)
								view.setGreenFlag((String) record[30]);
								if(record[31]!=null)
								view.setYellowFlag((String) record[31]);
								if(record[32]!=null)
								view.setRedFlag((String) record[32]);
								if(record[33]!=null)
								view.setCommonName((String) record[33]);
								if(record[34]!=null)
								view.setRevision((String) record[34]);
								view.setIsCritical((String)record[35]);
								// data fields from 9 to 12
								if(record[36]!=null){
									view.setDataField9((String) record[36]);
									if(record[37]!=null)
									view.setDataField9Type((String) record[37]);
									if(record[38]!=null)
									view.setDataField9Ref(((BigDecimal) record[38])
											.longValue());
									if(record[39]!=null)
									view.setDataField10((String) record[39]);
									if(record[40]!=null)
									view.setDataField10Type((String) record[40]);
									if(record[41]!=null)
									view.setDataField10Ref(((BigDecimal) record[41])
											.longValue());
									if(record[42]!=null)
									view.setDataField11((String) record[42]);
									if(record[43]!=null)
									view.setDataField11Type((String) record[43]);
									if(record[44]!=null)
									view.setDataField11Ref(((BigDecimal) record[44])
											.longValue());
									if(record[45]!=null)
									view.setDataField12((String) record[45]);
									if(record[46]!=null)
									view.setDataField12Type((String) record[46]);
									if(record[47]!=null)
									view.setDataField12Ref(((BigDecimal) record[47])
											.longValue());
								}
								 if(record[48]!=null)
							         view.setCodeScale(Integer.parseInt(record[48].toString()));
							    else
							    	 view.setCodeScale(0);
								recordlist.add(view);
								
							}
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	/**
	 * 
	 * @param id Case ID
	 * @param searchType Search type: Category, Code, and Both
	 * @param searchTerm search term, such as alcohol abuse
	 * @return returns a list of MedicalHierarchyView of the 1st level
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getMainLevelMedicalHierarchyViews(final Long id, final String searchType, final String searchTerm)
			throws Exception {
		final String containsClause = constructContainClause(searchTerm);
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							Query query = null;
							String hql = null;
							if (searchType.equals("Category")) {
								hql = "SELECT  "
										+ "id, "
										+ "name, "
										+ "description, "
										+ "parentid, "
										+ "billable, "
										+ "displayrank, "
										+ "greenflag, "
										+ "yellowflag, "
										+ "redflag, "
										+ "commonname, "
										+ "revision, "
										+ "level-1 as pseudolevel, "
										+ "CASE "
										+ "  WHEN CONNECT_BY_ISleaf = 1 "
										+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
										+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
										+ "END hiearhydetail, "
										+ "linktoid, "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, mh.id) isCritical, "
										+ "IWS_APP_UTILS.getProductSpec(:id, mh.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, mh.id) isExcluded, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, mh.id) " //index 17
										+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
										"(SELECT id FROM medicalhierarchy START WITH id IN " +
										"( (SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
										"AND contains (name, :containsClause, 1) > 0 " +
										"and depth is not null ) ) " +
										"CONNECT BY PRIOR parentid = id ) ) mh " +
										"WHERE level = 2 " +
										"START WITH NAME = 'Root' CONNECT BY prior id = parentid " +
										"ORDER SIBLINGS BY displayrank DESC NULLS LAST, name";
								query = session.createSQLQuery(hql);
								query.setLong("id", id);
								query.setString("containsClause", containsClause);
							} else if (searchType.equals("Code")) {
								hql = "SELECT  "
										+ "id, "
										+ "name, "
										+ "description, "
										+ "parentid, "
										+ "billable, "
										+ "displayrank, "
										+ "greenflag, "
										+ "yellowflag, "
										+ "redflag, "
										+ "commonname, "
										+ "revision, "
										+ "level-1 as pseudolevel, "
										+ "CASE "
										+ "  WHEN CONNECT_BY_ISleaf = 1 "
										+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
										+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
										+ "END hiearhydetail, "
										+ "linktoid,  "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, mh.id) isCritical, "
										+ "IWS_APP_UTILS.getProductSpec(:id, mh.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, mh.id) isExcluded, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, mh.id) " //index 17
										+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
										"(SELECT id FROM medicalhierarchy START WITH id IN " +
										"( (SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
										"AND contains (name, :containsClause, 1) > 0 " +
										"and depth is null ) ) " +
										"CONNECT BY PRIOR parentid = id ) ) mh " +
										"WHERE level = 2 " +
										"START WITH NAME = 'Root' CONNECT BY prior id = parentid " +
										"ORDER SIBLINGS BY displayrank DESC NULLS LAST, name";
								query = session.createSQLQuery(hql);
								query.setLong("id", id);
								query.setString("containsClause", containsClause);
							} else if (searchType.equals("CategoryAndCode")) {
								hql = "SELECT  "
										+ "id, "
										+ "name, "
										+ "description, "
										+ "parentid, "
										+ "billable, "
										+ "displayrank, "
										+ "greenflag, "
										+ "yellowflag, "
										+ "redflag, "
										+ "commonname, "
										+ "revision, "
										+ "level-1 as pseudolevel, "
										+ "CASE "
										+ "  WHEN CONNECT_BY_ISleaf = 1 "
										+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
										+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
										+ "END hiearhydetail, "
										+ "linktoid,  "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, mh.id) isCritical, "
										+ "IWS_APP_UTILS.getProductSpec(:id, mh.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, mh.id) isExcluded, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, mh.id) " //index 17
										+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
										"(SELECT id FROM medicalhierarchy START WITH id IN " +
										"( SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
										"AND contains (name, :containsClause, 1) > 0 )" +
										"CONNECT BY PRIOR parentid = id ) ) mh " +
										"WHERE level = 2 " +
										"START WITH NAME = 'Root' CONNECT BY prior id = parentid " +
										"ORDER SIBLINGS BY displayrank DESC NULLS LAST, name";
								query = session.createSQLQuery(hql);
								query.setLong("id", id);
								query.setString("containsClause", containsClause);
							} else if (searchType.equals("ExactCode")) {
								hql = "SELECT  "
										+ "id, "
										+ "name, "
										+ "description, "
										+ "parentid, "
										+ "billable, "
										+ "displayrank, "
										+ "greenflag, "
										+ "yellowflag, "
										+ "redflag, "
										+ "commonname, "
										+ "revision, "
										+ "1 as pseudolevel, "
										+ "name hiearhydetail, "
										+ "linktoid,  "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, mh.id) isCritical, "
										+ "IWS_APP_UTILS.getProductSpec(:id, mh.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, mh.id) isExcluded, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, mh.id) " //index 17
										+ "FROM (select * FROM (SELECT m1.* FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id) " +
										"WHERE Name <> 'Root' START WITH NAME = :name CONNECT BY prior parentid = id ORDER by level desc) mh " +
										"where rownum=1";
								query = session.createSQLQuery(hql);
								query.setLong("id", id);
								query.setString("name", searchTerm.toUpperCase());
							}
							
							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								view.setGreenFlag((String) record[6]);
								view.setYellowFlag((String) record[7]);
								view.setRedFlag((String) record[8]);
								view.setCommonName((String) record[9]);
								view.setRevision((String) record[10]);
								view.setLevel(((BigDecimal) record[11])
										.longValue());
								view.setHierarchyDetails((String) record[12]);
								if(record[13]!=null)
									view.setLinkToId(((BigDecimal) record[13]).longValue());
								//get is critical flag
								if (record[14] != null)
									view.setIsCritical((String) record[14]);
								//get prod spec
								if (record[15] != null)
									view.setSpec((String) record[15]);
								//get is excluded flag
								if (record[16] != null)
									view.setIsExcluded((String) record[16]);
								//set code scale value
			                    if(record[17]!=null)
							        view.setCodeScale(Integer.parseInt(record[17].toString()));
							    else
							    	view.setCodeScale(0);
								recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getAllMedicalHierarchyViews()
			throws Exception {
		return getAllDecendantView(ROOT_LEVEL_1, STARTING_ID_0);
	}

	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getAllDecendantView(final int level,
			final int startid) throws Exception {

		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							String hql = "SELECT  "
									+ "id, "
									+ "name, "
									+ "description, "
									+ "parentid, "
									+ "billable, "
									+ "displayrank, "
									+ "greenflag, "
									+ "yellowflag, "
									+ "redflag, "
									+ "commonname, "
									+ "revision, "
									+ "level-1 as pseudolevel, "
									+ "CASE "
									+ "  WHEN CONNECT_BY_ISleaf = 1 "
									+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
									+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
									+ "END hiearhydetail, "
									+ "linktoid "
									+ "FROM SNX_IWS2.MEDICALHIERARCHY "
									+ "WHERE level > :level"
									+ "  START WITH id = :startid"
									+ "  CONNECT BY prior id = parentid ";

							Query query = session.createSQLQuery(hql);
							query.setLong("level", new Long(level));
							query.setLong("startid", new Long(startid));

							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								view.setGreenFlag((String) record[6]);
								view.setYellowFlag((String) record[7]);
								view.setRedFlag((String) record[8]);
								view.setCommonName((String) record[9]);
								view.setRevision((String) record[10]);
								view.setLevel(((BigDecimal) record[11])
										.longValue());
								view.setHierarchyDetails((String) record[12]);
								if(record[13]!=null)
									view.setLinkToId(((BigDecimal) record[13]).longValue());

								recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	/**
	 * Used by DataPointController class to retrieve child nodes for the left side navigation
	 * @param id case ID
	 * @param startid Hierarchy ID of the parent
	 * @return returns a child node list of MedicalHierarchyView to the parent
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getNextDecendantView(final int startid, final Long id) throws Exception {

		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							String hql = "SELECT  "
									+ "id, "
									+ "name, "
									+ "description, "
									+ "parentid, "
									+ "billable, "
									+ "datafield1, "
									+ "datafield1type, "
									+ "datafield1ref, "
									+ "datafield2, "
									+ "datafield2type, "
									+ "datafield2ref, "
									+ "datafield3, "
									+ "datafield3type, "
									+ "datafield3ref, "
									+ "datafield4, "
									+ "datafield4type, "
									+ "datafield4ref, "
									+ "displayrank, "
									+ "greenflag, "
									+ "yellowflag, "
									+ "redflag, "
									+ "commonname, "
									+ "revision, "
									+ "level-1 as pseudolevel, "
									+ "CASE "
									+ "  WHEN CONNECT_BY_ISleaf = 1 "
									+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
									+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
									+ "END hiearhydetail, "
									+ "linktoid, "
									+ "datafield5, "
									+ "datafield5type, "
									+ "datafield5ref, "
									+ "datafield6, "
									+ "datafield6type, "
									+ "datafield6ref, "
									+ "datafield7, "
									+ "datafield7type, "
									+ "datafield7ref, "
									+ "datafield8, "
									+ "datafield8type, "
									+ "datafield8ref, "
									//get DP entry count for the code
									+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:caseId and hid=m.id) dpEntryCount, "
									//get is critical flag
									+ "IWS_APP_UTILS.isCodeCritical2(:caseId, m.id) isCritical, " //index 39
									+ "IWS_APP_UTILS.getProductSpec(:caseId, m.name) spec, "
									+ "IWS_APP_UTILS.isCodeExcluded(:caseId, m.id) isExcluded, "
									+ "datafield9, "
									+ "datafield9type, "
									+ "datafield9ref, "
									+ "datafield10, "
									+ "datafield10type, "
									+ "datafield10ref, "
									+ "datafield11, "
									+ "datafield11type, "
									+ "datafield11ref, "
									+ "datafield12, "
									+ "datafield12type, "
									+ "datafield12ref, "
									+ "IWS_APP_UTILS.getCodeScale2(:caseId, m.id) " //index 54
									+ "FROM SNX_IWS2.MEDICALHIERARCHY m "
									+ "WHERE level = 2 "
									+ "  START WITH id = :startid "
									+ "  CONNECT BY prior id = parentid ORDER SIBLINGS BY displayrank DESC NULLS LAST, " +
									"isExcluded, " +
									"Case When codetype='SYNP' Then description End, name";

							Query query = session.createSQLQuery(hql);
							query.setInteger("startid", startid);
							query.setLong("caseId", id);
							
							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								view.setDataField1((String) record[5]);
								view.setDataField1Type((String) record[6]);
								if( record[7] != null)
									view.setDataField1Ref(((BigDecimal) record[7]).longValue());
								view.setDataField2((String) record[8]);
								view.setDataField2Type((String) record[9]);
								if( record[10] != null)
									view.setDataField2Ref(((BigDecimal) record[10]).longValue());
								view.setDataField3((String) record[11]);
								view.setDataField3Type((String) record[12]);
								if( record[13] != null)
									view.setDataField3Ref(((BigDecimal) record[13]).longValue());
								view.setDataField4((String) record[14]);
								view.setDataField4Type((String) record[15]);
								if( record[16] != null)
									view.setDataField4Ref(((BigDecimal) record[16]).longValue());
								view.setGreenFlag((String) record[18]);
								view.setYellowFlag((String) record[19]);
								view.setRedFlag((String) record[20]);
								view.setCommonName((String) record[21]);
								view.setRevision((String) record[22]);
								view.setLevel(((BigDecimal) record[23])
										.longValue());
								view.setHierarchyDetails((String) record[24]);
								if(record[25]!=null)
									view.setLinkToId(((BigDecimal) record[25]).longValue());
								if((String) record[26] != null){
								view.setDataField5((String) record[26]);
								view.setDataField5Type((String) record[27]);
								if( record[28] != null)
									view.setDataField5Ref(((BigDecimal) record[28]).longValue());
								view.setDataField6((String) record[29]);
								view.setDataField6Type((String) record[30]);
								if( record[31] != null)
									view.setDataField6Ref(((BigDecimal) record[31]).longValue());
								view.setDataField7((String) record[32]);
								view.setDataField7Type((String) record[33]);
								if( record[34] != null)
									view.setDataField7Ref(((BigDecimal) record[34]).longValue());
								view.setDataField8((String) record[35]);
								view.setDataField8Type((String) record[36]);
								if( record[37] != null)
									view.setDataField8Ref(((BigDecimal) record[37]).longValue());
								}
								//get DP entry count for the code
								if (record[38] != null)
									view.setDpEntryCount(((BigDecimal) record[38]).intValue());
								//get is critical flag
								if (record[39] != null)
									view.setIsCritical((String) record[39]);
								//get prod spec
								if (record[40] != null)
									view.setSpec((String) record[40]);
								//get is excluded flag
								if (record[41] != null)
									view.setIsExcluded((String) record[41]);
								
								if((String) record[42] != null){
									view.setDataField9((String) record[42]);
									view.setDataField9Type((String) record[43]);
									if( record[44] != null)
										view.setDataField9Ref(((BigDecimal) record[44]).longValue());
									view.setDataField10((String) record[45]);
									view.setDataField10Type((String) record[46]);
									if( record[47] != null)
										view.setDataField10Ref(((BigDecimal) record[47]).longValue());
									view.setDataField11((String) record[48]);
									view.setDataField11Type((String) record[49]);
									if( record[50] != null)
										view.setDataField11Ref(((BigDecimal) record[50]).longValue());
									view.setDataField12((String) record[51]);
									view.setDataField12Type((String) record[52]);
									if( record[53] != null)
										view.setDataField12Ref(((BigDecimal) record[53]).longValue());
								}
								//set code scale value
			                    if(record[54]!=null)
							         view.setCodeScale(Integer.parseInt(record[54].toString()));
							    else
							    	 view.setCodeScale(0);

								recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
 	}

	/**
	 * Used by DataPointController class to retrieve child nodes for the left side navigation while searching
	 * @param startid Hierarchy ID of the parent
	 * @param depth of the branch, if known
	 * @param id Case ID
	 * @param searchType Search type: Category, Code, and Both
	 * @param searchTerm search term, such as alcohol abuse
	 * @return returns a child node list of MedicalHierarchyView to the parent based on search condition, as well as DP entry count for the codes
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getNextDecendantView(final int startid, final Long depth, final Long id, final String searchType, final String searchTerm) throws Exception {

		final String containsClause = constructContainClause(searchTerm);
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							Long depth1 = null;
							if (depth == null)
								//get how many child levels there are for the parent
								depth1 = getTreeDepth(startid);
							else
								depth1 = depth;
							
							String hql = null;
							Query query = null;
							
							if (searchType.equals("Category")) {
								if (depth1 == 2) { //will get leaf nodes
									hql = "SELECT  "
											+ "id, name, description, parentid, billable, "
											+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
											+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
											+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
											+ "level-1 as pseudolevel, "
											+ "CASE "
											+ "  WHEN CONNECT_BY_ISleaf = 1 "
											+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
											+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
											+ "END hiearhydetail, "
											+ "linktoid,  "
											+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
											+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
											+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:caseId and hid=m.id) dpEntryCount, "
											//get is critical flag
											+ "IWS_APP_UTILS.isCodeCritical2(:caseId, m.id) isCritical, " //index 39
											+ "IWS_APP_UTILS.getProductSpec(:caseId, m.name) spec, "
											+ "IWS_APP_UTILS.isCodeExcluded(:caseId, m.id) isExcluded, "
											+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
											+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
											+ "IWS_APP_UTILS.getCodeScale2(:caseId, m.id) " //index 54
											+ "FROM MEDICALHIERARCHY m WHERE level = 2 " +
											"START WITH ID = :startid " +
											"CONNECT BY prior id = parentid " +
											"ORDER SIBLINGS BY displayrank DESC NULLS LAST, isExcluded, name";
									query = session.createSQLQuery(hql);
									query.setLong("startid", new Long(startid));
									query.setLong("caseId", id);
								} else { //get non-leaf nodes
									hql = "SELECT  "
											+ "id, name, description, parentid, billable, "
											+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
											+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
											+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
											+ "level-1 as pseudolevel, "
											+ "CASE "
											+ "  WHEN CONNECT_BY_ISleaf = 1 "
											+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
											+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
											+ "END hiearhydetail, "
											+ "linktoid,  "
											+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
											+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
											+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:id and hid=m.id) dpEntryCount, "
											//get is critical flag
											+ "IWS_APP_UTILS.isCodeCritical2(:id, m.id) isCritical, " //index 39
											+ "IWS_APP_UTILS.getProductSpec(:id, m.name) spec, "
											+ "IWS_APP_UTILS.isCodeExcluded(:id, m.id) isExcluded, "
											+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
											+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
											+ "IWS_APP_UTILS.getCodeScale2(:id, m.id) " //index 54
											+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
											"(SELECT id FROM medicalhierarchy START WITH id IN " +
											"( (SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
											"AND contains (name, :containsClause, 1) > 0 " +
											"MINUS " +
											"SELECT id FROM (SELECT m2.* FROM MEDICALHIERARCHY m2, cases c WHERE m2.revision=c.hierarchyrevision and c.caseid=:id) " +
											"WHERE CONNECT_BY_ISleaf = 1 " +
											"AND level > 1 START WITH NAME = 'Root' CONNECT BY prior id = parentid ) ) " +
											"CONNECT BY PRIOR parentid = id ) ) m " +
											"WHERE level = 2 " +
											"START WITH ID = :startid CONNECT BY prior id = parentid " +
											"ORDER SIBLINGS BY displayrank DESC NULLS LAST, " +
											"Case When codetype='SYNP' Then description End, name";
									query = session.createSQLQuery(hql);
									query.setLong("startid", new Long(startid));
									query.setLong("id", id);
									query.setString("containsClause", containsClause);
								}

							} else if (searchType.equals("Code")) {
								hql = "SELECT  "
										+ "id, name, description, parentid, billable, "
										+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
										+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
										+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
										+ "level-1 as pseudolevel, "
										+ "CASE "
										+ "  WHEN CONNECT_BY_ISleaf = 1 "
										+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
										+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
										+ "END hiearhydetail, "
										+ "linktoid,  "
										+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
										+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
										+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:id and hid=m.id) dpEntryCount, "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, m.id) isCritical, " //index 39
										+ "IWS_APP_UTILS.getProductSpec(:id, m.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, m.id) isExcluded, "
										+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
										+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, m.id) " //index 54
										+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
										"(SELECT id FROM medicalhierarchy START WITH id IN " +
										"( (SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
										"AND contains (name, :containsClause, 1) > 0 " +
										"and depth is null ) ) " +
										"CONNECT BY PRIOR parentid = id ) ) m " +
										"WHERE level = 2 " +
										"START WITH ID = :startid CONNECT BY prior id = parentid " +
										"ORDER SIBLINGS BY displayrank DESC NULLS LAST, " +
										"isExcluded, " +
										"Case When codetype='SYNP' Then description End, name";
								query = session.createSQLQuery(hql);
								query.setLong("startid", new Long(startid));
								query.setLong("id", id);
								query.setString("containsClause", containsClause);
							} else if (searchType.equals("CategoryAndCode")) {
								if (depth1 == 2) { //will get leaf nodes
									hql = "SELECT  "
											+ "id, name, description, parentid, billable, "
											+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
											+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
											+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
											+ "level-1 as pseudolevel, "
											+ "CASE "
											+ "  WHEN CONNECT_BY_ISleaf = 1 "
											+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
											+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
											+ "END hiearhydetail, "
											+ "linktoid,  "
											+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
											+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
											+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:caseId and hid=m.id) dpEntryCount, "
											//get is critical flag
											+ "IWS_APP_UTILS.isCodeCritical2(:caseId, m.id) isCritical, " //index 39
											+ "IWS_APP_UTILS.getProductSpec(:caseId, m.name) spec, "
											+ "IWS_APP_UTILS.isCodeExcluded(:caseId, m.id) isExcluded, "
											+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
											+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
											+ "IWS_APP_UTILS.getCodeScale2(:caseId, m.id) " //index 54
											+ "FROM MEDICALHIERARCHY m WHERE level = 2 " +
											"START WITH ID = :startid " +
											"CONNECT BY prior id = parentid " +
											"ORDER SIBLINGS BY displayrank DESC NULLS LAST, isExcluded, name";
									query = session.createSQLQuery(hql);
									query.setLong("startid", new Long(startid));
									query.setLong("caseId", id);
								} else { //get non-leaf nodes
									hql = "SELECT  "
											+ "id, name, description, parentid, billable, "
											+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
											+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
											+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
											+ "level-1 as pseudolevel, "
											+ "CASE "
											+ "  WHEN CONNECT_BY_ISleaf = 1 "
											+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
											+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
											+ "END hiearhydetail, "
											+ "linktoid,  "
											+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
											+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
											+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:id and hid=m.id) dpEntryCount, "
											//get is critical flag
											+ "IWS_APP_UTILS.isCodeCritical2(:id, m.id) isCritical, " //index 39
											+ "IWS_APP_UTILS.getProductSpec(:id, m.name) spec, "
											+ "IWS_APP_UTILS.isCodeExcluded(:id, m.id) isExcluded, "
											+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
											+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
											+ "IWS_APP_UTILS.getCodeScale2(:id, m.id) " //index 54
											+ "FROM (SELECT * FROM medicalhierarchy WHERE id IN " +
											"(SELECT id FROM medicalhierarchy START WITH id IN " +
											"( SELECT m1.id FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id " +
											"AND contains (name, :containsClause, 1) > 0 )" +
											"CONNECT BY PRIOR parentid = id ) ) m " +
											"WHERE level = 2 " +
											"START WITH ID = :startid CONNECT BY prior id = parentid " +
											"ORDER SIBLINGS BY displayrank DESC NULLS LAST, " +
											"Case When codetype='SYNP' Then description End, name";
									query = session.createSQLQuery(hql);
									query.setLong("startid", new Long(startid));
									query.setLong("id", id);
									query.setString("containsClause", containsClause);
								}
							} else if (searchType.equals("ExactCode")) {
								hql = "SELECT  "
										+ "id, name, description, parentid, billable, "
										+ "datafield1, datafield1type, datafield1ref, datafield2, datafield2type, datafield2ref, "
										+ "datafield3, datafield3type, datafield3ref, datafield4, datafield4type, datafield4ref, "
										+ "displayrank, greenflag, yellowflag, redflag, commonname, revision, "
										+ "level-1 as pseudolevel, "
										+ "CASE "
										+ "  WHEN CONNECT_BY_ISleaf = 1 "
										+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
										+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
										+ "END hiearhydetail, "
										+ "linktoid,  "
										+ "datafield5, datafield5type, datafield5ref, datafield6, datafield6type, datafield6ref, "
										+ "datafield7, datafield7type, datafield7ref, datafield8, datafield8type, datafield8ref, "
										+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:id and hid=m.id) dpEntryCount, "
										//get is critical flag
										+ "IWS_APP_UTILS.isCodeCritical2(:id, m.id) isCritical, " //index 39
										+ "IWS_APP_UTILS.getProductSpec(:id, m.name) spec, "
										+ "IWS_APP_UTILS.isCodeExcluded(:id, m.id) isExcluded, "
										+ "datafield9, datafield9type, datafield9ref, datafield10, datafield10type, datafield10ref, "
										+ "datafield11, datafield11type, datafield11ref, datafield12, datafield12type, datafield12ref, "
										+ "IWS_APP_UTILS.getCodeScale2(:id, m.id) " //index 54
										+ "FROM (select * FROM (SELECT m1.* FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id) " +
										"START WITH NAME = :name and depth is null CONNECT BY prior parentid = id) m " +
										"where level=2 start with id=:startid connect by prior id=parentid";
								query = session.createSQLQuery(hql);
								query.setLong("startid", new Long(startid));
								query.setLong("id", id);
								query.setString("name", searchTerm.toUpperCase());
							}
							
							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								view.setDataField1((String) record[5]);
								view.setDataField1Type((String) record[6]);
								if( record[7] != null)
									view.setDataField1Ref(((BigDecimal) record[7]).longValue());
								view.setDataField2((String) record[8]);
								view.setDataField2Type((String) record[9]);
								if( record[10] != null)
									view.setDataField2Ref(((BigDecimal) record[10]).longValue());
								view.setDataField3((String) record[11]);
								view.setDataField3Type((String) record[12]);
								if( record[13] != null)
									view.setDataField3Ref(((BigDecimal) record[13]).longValue());
								view.setDataField4((String) record[14]);
								view.setDataField4Type((String) record[15]);
								if( record[16] != null)
									view.setDataField4Ref(((BigDecimal) record[16]).longValue());

								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								view.setGreenFlag((String) record[18]);
								view.setYellowFlag((String) record[19]);
								view.setRedFlag((String) record[20]);
								view.setCommonName((String) record[21]);
								view.setRevision((String) record[22]);
								view.setLevel(((BigDecimal) record[23])
										.longValue());
								view.setHierarchyDetails((String) record[24]);
								if(record[25]!=null)
									view.setLinkToId(((BigDecimal) record[25]).longValue());
								if((String) record[26] != null){
								view.setDataField5((String) record[26]);
								view.setDataField5Type((String) record[27]);
								if( record[28] != null)
									view.setDataField5Ref(((BigDecimal) record[28]).longValue());
								view.setDataField6((String) record[29]);
								view.setDataField6Type((String) record[30]);
								if( record[31] != null)
									view.setDataField6Ref(((BigDecimal) record[31]).longValue());
								view.setDataField7((String) record[32]);
								view.setDataField7Type((String) record[33]);
								if( record[34] != null)
									view.setDataField7Ref(((BigDecimal) record[34]).longValue());
								view.setDataField8((String) record[35]);
								view.setDataField8Type((String) record[36]);
								if( record[37] != null)
									view.setDataField8Ref(((BigDecimal) record[37]).longValue());
								}
								//get DP entry count for the code
								if (record[38] != null)
									view.setDpEntryCount(((BigDecimal) record[38]).intValue());
								//get is critical flag
								if (record[39] != null)
									view.setIsCritical((String) record[39]);
								//get prod spec
								if (record[40] != null)
									view.setSpec((String) record[40]);
								//get is excluded flag
								if (record[41] != null)
									view.setIsExcluded((String) record[41]);
								
								if((String) record[42] != null){
									view.setDataField9((String) record[42]);
									view.setDataField9Type((String) record[43]);
									if( record[44] != null)
										view.setDataField9Ref(((BigDecimal) record[44]).longValue());
									view.setDataField10((String) record[45]);
									view.setDataField10Type((String) record[46]);
									if( record[47] != null)
										view.setDataField10Ref(((BigDecimal) record[47]).longValue());
									view.setDataField11((String) record[48]);
									view.setDataField11Type((String) record[49]);
									if( record[50] != null)
										view.setDataField11Ref(((BigDecimal) record[50]).longValue());
									view.setDataField12((String) record[51]);
									view.setDataField12Type((String) record[52]);
									if( record[53] != null)
										view.setDataField12Ref(((BigDecimal) record[53]).longValue());
								}
								
								//set code scale value
			                    if(record[54]!=null)
							         view.setCodeScale(Integer.parseInt(record[54].toString()));
							    else
							    	 view.setCodeScale(0);
			                    
			                    recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
 	}

	public List<MedicalHierarchyView> getNextDecendantRangeView(final int levelbeg, final int levelend,
			final int startid, final String caseId) throws Exception {
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {

						try {
							String hql = "SELECT  "
									+ "id, "
									+ "name, "
									+ "description, "
									+ "parentid, "
									+ "billable, "
									+ "datafield1, "
									+ "datafield1type, "
									+ "datafield1ref, "
									+ "datafield2, "
									+ "datafield2type, "
									+ "datafield2ref, "
									+ "datafield3, "
									+ "datafield3type, "
									+ "datafield3ref, "
									+ "datafield4, "
									+ "datafield4type, "
									+ "datafield4ref, "
									+ "datafield5, "
									+ "datafield5type, "
									+ "datafield5ref, "
									+ "datafield6, "
									+ "datafield6type, "
									+ "datafield6ref, "
									+ "datafield7, "
									+ "datafield7type, "
									+ "datafield7ref, "
									+ "datafield8, "
									+ "datafield8type, "
									+ "datafield8ref, "
									+ "displayrank, "
									+ "greenflag, "
									+ "yellowflag, "
									+ "redflag, "
									+ "commonname, "
									+ "revision, "
									+ "level-1 as pseudolevel, "
									+ "CASE "
									+ "  WHEN CONNECT_BY_ISleaf = 1 "
									+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
									+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
									+ "END hiearhydetail, "
									+ "linktoid, "
									//get DP entry count for the code
									+ "(select count(*) from dpentries dpe, pages p where dpe.pageid=p.pageid and dpe.isdeleted='N' and p.caseid=:caseId and hid=m.id) dpEntryCount, "
									//get is critical flag
									+ "IWS_APP_UTILS.isCodeCritical2(:caseId, m.id) isCritical, " //index 39
									+ "IWS_APP_UTILS.getProductSpec(:caseId, m.name) spec, "
									+ "IWS_APP_UTILS.isCodeExcluded(:caseId, m.id) isExcluded, "
									+ "datafield9, "
									+ "datafield9type, "
									+ "datafield9ref, "
									+ "datafield10, "
									+ "datafield10type, "
									+ "datafield10ref, "
									+ "datafield11, "
									+ "datafield11type, "
									+ "datafield11ref, "
									+ "datafield12, "
									+ "datafield12type, "
									+ "datafield12ref, "
									+ "IWS_APP_UTILS.getCodeScale2(:caseId, m.id) "
									+ "FROM SNX_IWS2.MEDICALHIERARCHY m "
									+ "WHERE level >= :levelbeg AND level <= :levelend"
									+ "  START WITH id = :startid "
									+ "  CONNECT BY prior id = parentid " +
									"ORDER SIBLINGS BY displayrank DESC NULLS LAST, " +
									"isExcluded, " +
									"Case When codetype='SYNP' Then description End, name";

							Query query = session.createSQLQuery(hql);
							query.setLong("levelbeg", new Long(levelbeg));
							query.setLong("levelend", new Long(levelend));
							query.setLong("startid", new Long(startid));
							query.setLong("caseId", new Long(caseId));
							
							//a test with paging
							//query.setFirstResult(0).setMaxResults(100);

							List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								MedicalHierarchyView view = new MedicalHierarchyView();
								view.setId(((BigDecimal) record[0]).longValue());
								view.setName((String) record[1]);
								view.setDescription((String) record[2]);
								view.setParentid(((BigDecimal) record[3])
										.longValue());
								view.setBillable((String) record[4]);
								view.setDataField1((String) record[5]);
								view.setDataField1Type((String) record[6]);
								if( record[7] != null)
									view.setDataField1Ref(((BigDecimal) record[7]).longValue());
								view.setDataField2((String) record[8]);
								view.setDataField2Type((String) record[9]);
								if( record[10] != null)
									view.setDataField2Ref(((BigDecimal) record[10]).longValue());
								view.setDataField3((String) record[11]);
								view.setDataField3Type((String) record[12]);
								if( record[13] != null)
									view.setDataField3Ref(((BigDecimal) record[13]).longValue());
								view.setDataField4((String) record[14]);
								view.setDataField4Type((String) record[15]);
								if( record[16] != null)
									view.setDataField4Ref(((BigDecimal) record[16]).longValue());
								// Evry code can have datafields1-4 
								
								// But , as per revision1.6 data, if datafield5 lable doesnt exist 
								// that means datafields5/6/7/8 and related fields are not valid for this current revision
								// so dont need to popualte these in View as performance reason
								if((String) record[17] != null){
									view.setDataField5((String) record[17]);
									view.setDataField5Type((String) record[18]);
									if( record[19] != null)
										view.setDataField5Ref(((BigDecimal) record[19]).longValue());
									view.setDataField6((String) record[20]);
									view.setDataField6Type((String) record[21]);
									if( record[22] != null)
										view.setDataField6Ref(((BigDecimal) record[22]).longValue());
									view.setDataField7((String) record[23]);
									view.setDataField7Type((String) record[24]);
									if( record[25] != null)
										view.setDataField7Ref(((BigDecimal) record[25]).longValue());
									view.setDataField8((String) record[26]);
									view.setDataField8Type((String) record[27]);
									if( record[28] != null)
										view.setDataField8Ref(((BigDecimal) record[28]).longValue());
								}
								// view.setDisplayRank(((BigDecimal)record[5]).longValue());
								view.setGreenFlag((String) record[30]);
								view.setYellowFlag((String) record[31]);
								view.setRedFlag((String) record[32]);
								view.setCommonName((String) record[33]);
								view.setRevision((String) record[34]);
								view.setLevel(((BigDecimal) record[35])
										.longValue());
								view.setHierarchyDetails((String) record[36]);
								if(record[37]!=null)
									view.setLinkToId(((BigDecimal) record[37]).longValue());
								//get DP entry count for the code
								if (record[38] != null)
									view.setDpEntryCount(((BigDecimal) record[38]).intValue());
								//get is critical flag
								if (record[39] != null)
									view.setIsCritical((String) record[39]);
								//get prod spec
								if (record[40] != null)
									view.setSpec((String) record[40]);
								//get is excluded flag
								if (record[41] != null)
									view.setIsExcluded((String) record[41]);
								
								if((String) record[42] != null){
									view.setDataField9((String) record[42]);
									view.setDataField9Type((String) record[43]);
									if( record[44] != null)
										view.setDataField9Ref(((BigDecimal) record[44]).longValue());
									view.setDataField10((String) record[45]);
									view.setDataField10Type((String) record[46]);
									if( record[47] != null)
										view.setDataField10Ref(((BigDecimal) record[47]).longValue());
									view.setDataField11((String) record[48]);
									view.setDataField11Type((String) record[49]);
									if( record[50] != null)
										view.setDataField11Ref(((BigDecimal) record[50]).longValue());
									view.setDataField12((String) record[51]);
									view.setDataField12Type((String) record[52]);
									if( record[53] != null)
										view.setDataField12Ref(((BigDecimal) record[53]).longValue());
								}
								
								//set code scale value
			                    if(record[54]!=null)
							         view.setCodeScale(Integer.parseInt(record[54].toString()));
							    else
							    	 view.setCodeScale(0);
			                    
			                    recordlist.add(view);
							}

							// return null;
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	/**
	 * 
	 * @param startid Hierarchy ID
	 * @return returns the depth of the tree from this node, including itself. If it gets to leaf node for some reason, return 1.
	 */
	public Long getTreeDepth(final int startid) throws HibernateException {
		return (Long) this.getHibernateTemplate().execute(
				new HibernateCallback<Long>() {
					public Long doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						try {
							//get how many child levels there are for the parent
							Long depth = new Long(0);
							String sublevel_sql = "SELECT depth FROM MEDICALHIERARCHY WHERE id=:startid";
							Query query = session.createSQLQuery(sublevel_sql);
							//must use bind variable, otherwise there will be too many cursors open in the database!
							query.setLong("startid", new Long(startid));
							List<Object[]> result = query.list();
							for (Iterator i = result.iterator(); i.hasNext();) {
								depth=((BigDecimal) i.next()).longValue();
							}
							return depth;
						} catch (HibernateException he) {
							//if it gets to leaf node for some reason, return 1
							return new Long(1);
						} /*finally {
							try {
								if (session != null) session.close();
							} catch (HibernateException e) {
									e.printStackTrace();
									throw e;
							}
						}*/
					}

				});
	}
							
							
	public List<DataPointEntryView> getDataForFullDPList(final Long caseId) throws Exception {
		return (List<DataPointEntryView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<DataPointEntryView>>() {
					public List<DataPointEntryView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						try {
							String hql = "SELECT "
											+ "p.caseid, "
											+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))) category, "
											+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))-1) subcategory, "
											+ "code.name codename, "
											+ "code.codedesc, "
											+ "p.finalpagenumber, "
											+ "dpe.sectionnumber, "
											+ "iws_app_utils.getEpochMillisecond(dpe.datadate), "
											+ "dpe.dpentryId, "
											+ "p.spcontentid, "
											+ "dpe.suspendnote, "
											+ "dpe.iscompleted, "
											+ "dpe.isrejected, "
											+ "code.hid, "
											+ "dpe.dataField1Value, "
											+ "dpe.dataField2Value, "
											+ "dpe.dataField3Value, "
											+ "dpe.dataField4Value, "
											+ "dpe.dataField5Value, "
											+ "dpe.dataField6Value, "
											+ "dpe.dataField7Value, "
											+ "dpe.dataField8Value, "
											+ "dpe.dataField9Value, "
											+ "dpe.dataField10Value, "
											+ "dpe.dataField11Value, "
											+ "dpe.dataField12Value, "
											+ "code.datafield1, "
											+ "code.datafield2, "
											+ "code.datafield3, "
											+ "code.datafield4, "
											+ "code.datafield5, "
											+ "code.datafield6, "
											+ "code.datafield7, "
											+ "code.datafield8, "
											+ "code.datafield9, "
											+ "code.datafield10, "
											+ "code.datafield11, "
											+ "code.datafield12, "
											+ "dpe.istext, "
											+ "dpe.ishandwriting, "
											+ "p.pageid, "
											+ "dpe.startSectionNumber, "
											+ "dpe.endSectionNumber, "
											+ "code.codetype, "
											+ "code.datafield1type, "
											+ "code.datafield2type, "
											+ "code.datafield3type, "
											+ "code.datafield4type, "
											+ "code.datafield5type, "
											+ "code.datafield6type, "
											+ "code.datafield7type, "
											+ "code.datafield8type, "
											+ "code.datafield9type, "
											+ "code.datafield10type, "
											+ "code.datafield11type, "
											+ "code.datafield12type, "
											+ "dpe.sequence, " 
											+ "dpe.iscritical, "
											+ "dpe.criticality "
											+ "FROM dpentries dpe, pages p, MEDICALHIERARCHY_LEAF_LEVEL_V code "
											+ "WHERE dpe.pageid = p.pageid AND dpe.isDeleted = 'N' "
											+ "AND dpe.hid = code.hid "
											+ "AND caseid = :caseId " 
											+ "ORDER BY codename, category, subcategory, p.finalpagenumber, dpe.sectionnumber, dpe.datadate ";

							Query query = session.createSQLQuery(hql);
							query.setLong("caseId", caseId);

							List<DataPointEntryView> recordlist = new LinkedList<DataPointEntryView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								DataPointEntryView view = new DataPointEntryView();
								view.setCaseId(((BigDecimal) record[0]).longValue());
								view.setCategory((String) record[1]);
								view.setSubCategory((String) record[2]);
								view.setCodeName((String) record[3]);
								view.setCodeDesc((String) record[4]);
								view.setFinalpagenumber(((BigDecimal) record[5]).longValue());
								view.setSectionNumber(((BigDecimal) record[6]).longValue());
								view.setDataDate(new java.util.Date(((BigDecimal) record[7]).longValue()));
								view.setDpentryId(((BigDecimal) record[8]).longValue());
								view.setSpcontentid((String) record[9]);
								view.setSuspendnote((String) record[10]);
								view.setIsCompleted((Character) record[11]);
								view.setIsRejected((Character) record[12]);
								view.setHid(((BigDecimal) record[13]).longValue());
								view.setDataField1Value((String)record[14]);
								view.setDataField2Value((String)record[15]);
								view.setDataField3Value((String)record[16]);
								view.setDataField4Value((String)record[17]);
								if(record[30]!=null){    // Set the datafield values if dataField5Value is not null 
									view.setDataField5Value((String)record[18]);
									view.setDataField6Value((String)record[19]);
									view.setDataField7Value((String)record[20]);
									view.setDataField8Value((String)record[21]);
									view.setDataField9Value((String)record[22]);
									view.setDataField10Value((String)record[23]);
									view.setDataField11Value((String)record[24]);
									view.setDataField12Value((String)record[25]);
								}
								view.setDatafield1((String)record[26]);
								view.setDatafield2((String)record[27]);
								view.setDatafield3((String)record[28]);
								view.setDatafield4((String)record[29]);
								if(record[30]!=null){   // Set the datafields if dataField5Value is not null 
									view.setDatafield5((String)record[30]);
									view.setDatafield6((String)record[31]);
									view.setDatafield7((String)record[32]);
									view.setDatafield8((String)record[33]);
									view.setDatafield9((String)record[34]);
									view.setDatafield10((String)record[35]);
									view.setDatafield11((String)record[36]);
									view.setDatafield12((String)record[37]);
								}
								view.setIstext((String)record[38]);
								view.setIshandwriting((String)record[39]);
								view.setPageId(((BigDecimal) record[40]).longValue());
								if(record[41] != null && record[42] != null ){
									Long startSectionNo = ((BigDecimal) record[41]).longValue();
									Long endSectionNo = ((BigDecimal) record[42]).longValue();
									if(startSectionNo.equals(endSectionNo))
										view.setSectionRange(startSectionNo.toString());
									else
										view.setSectionRange(startSectionNo.toString() + "-" + endSectionNo.toString() );
								}else{ // need to remove this else once section number column will be get removed
									view.setSectionRange(String.valueOf(((BigDecimal) record[6]).longValue()));
								}
								view.setCodeType((String)record[43]);
								view.setDataField1Type((String)record[44]);
								view.setDataField2Type((String)record[45]);
								view.setDataField3Type((String)record[46]);
								view.setDataField4Type((String)record[47]);
								view.setDataField5Type((String)record[48]);
								view.setDataField6Type((String)record[49]);
								view.setDataField7Type((String)record[50]);
								view.setDataField8Type((String)record[51]);
								view.setDataField9Type((String)record[52]);
								view.setDataField10Type((String)record[53]);
								view.setDataField11Type((String)record[54]);
								view.setDataField12Type((String)record[55]);
								view.setSequence(((BigDecimal) record[56]).longValue());
								view.setIsCritical((String)record[57]);
								 //set code scale value
			                     if(record[58]!=null)
			                    	 view.setCodeScale(Integer.parseInt(record[58].toString()));
							     else
							    	 view.setCodeScale(1);
			                     
								recordlist.add(view);
							}
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}
	
	/**
	 * 
	 * @param filterString such as: processed
	 * @return return the exact filter value
	 */
	private String prepareWhereClause(String filterString){ 
		if (filterString.trim().equals("allnonexcluded")){
	    	filterString = " and dpe.isDeleted = 'N' ";
	    }else if (filterString.trim().equals("processed")){
			filterString = "  and dpe.isCompleted='Y' ";
	    }else if (filterString.trim().equals("unprocessed")){
			filterString = " and dpe.isCompleted='N' ";
	    }else if (filterString.trim().equals("excluded")){
	    	filterString = " and dpe.isDeleted='Y' ";
		}else if (filterString.trim().equals("flagged")){
			filterString = " and dpe.suspendnote is not null ";
	    }else{
	    	filterString = " and dpe.isDeleted = 'N' ";
	    }
	    return filterString;    
	}
	
	
	/**
	 * 
	 * @param searchTerm such as: alcohol abuse. Should not have any special characters as they have been removed before the ajax call.
	 * @return returns the contains clause for text search, such as: (alcohol and abuse), ($alcohol and $abuse), (alcohol% and abuse%)
	 */
	private String constructContainClause(String searchTerm) {
		//remove "and" "or" from the search terms, and reduce consecutive space characters to one
		searchTerm = searchTerm.toLowerCase().replaceAll(" and ", " ").replaceAll(" or ", " ").replaceAll("\\s{2,}", " ");
		String[] tokens = searchTerm.split("\\s");
		String wholeWord = "";
		String stemWord = "";
		String prefixWord = "";
	    for (int x = 0; x < tokens.length; x++) {
	    	if (x == 0) {
	    		wholeWord = tokens[x];
	    		stemWord = "$" + tokens[x];
	    		prefixWord = tokens[x] + "%";
	    	} else {
		    	wholeWord = wholeWord + " and " + tokens[x];
		 		stemWord = stemWord + " and $" + tokens[x];
		 		prefixWord = prefixWord + " and " + tokens[x] + "%";
	    	}
	    }
		String containClause = "("+wholeWord+"), ("+stemWord+"), ("+prefixWord+")";
		//escape any hyphens in the search term
		containClause = containClause.replaceAll("\\-", "\\\\-");
		return containClause;
	}


	public List<DataPointEntryView> getDataForSectionSpecificDPList(final Long caseId, final Long stepNo, final Long pageId, final String rowNumber) throws Exception {
		return (List<DataPointEntryView>) this.getHibernateTemplate().execute(
				new HibernateCallback<List<DataPointEntryView>>() {
					public List<DataPointEntryView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						try {
							String startSectionNumber = "";
							String endSectionNumber = "";
							String rowNumberArray[];
							if(rowNumber.contains("-")){
								rowNumberArray = rowNumber.split("-");
								startSectionNumber = rowNumberArray[0];
								endSectionNumber = rowNumberArray[1];
							}else{
								startSectionNumber = rowNumber;
								endSectionNumber = rowNumber;
							}
							String hql = "SELECT "
									+ "p.caseid, "
									+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))) category, "
									+ "regexp_substr(code.path,'[^/]+', 1, length(regexp_replace(code.path,'[^/]',''))-1) subcategory, "
									+ "code.name codename, "
									+ "code.codedesc, "
									+ "p.finalpagenumber, "
									+ "dpe.sectionnumber, "
									+ "iws_app_utils.getEpochMillisecond(dpe.datadate), "
									+ "dpe.dpentryId, "
									+ "p.spcontentid, "
									+ "dpe.suspendnote, "
									+ "dpe.iscompleted, "
									+ "dpe.isrejected, "
									+ "code.hid, "
									+ "dpe.dataField1Value, "
									+ "dpe.dataField2Value, "
									+ "dpe.dataField3Value, "
									+ "dpe.dataField4Value, "
									+ "dpe.dataField5Value, "
									+ "dpe.dataField6Value, "
									+ "dpe.dataField7Value, "
									+ "dpe.dataField8Value, "
									+ "dpe.dataField9Value, "
									+ "dpe.dataField10Value, "
									+ "dpe.dataField11Value, "
									+ "dpe.dataField12Value, "
									+ "code.datafield1, "
									+ "code.datafield2, "
									+ "code.datafield3, "
									+ "code.datafield4, "
									+ "code.datafield5, "
									+ "code.datafield6, "
									+ "code.datafield7, "
									+ "code.datafield8, "
									+ "code.datafield9, "
									+ "code.datafield10, "
									+ "code.datafield11, "
									+ "code.datafield12, "
									+ "dpe.istext, "
									+ "dpe.ishandwriting, " 
									+ "p.pageid, "
									+ "dpe.startSectionNumber, " 
									+ "dpe.endSectionNumber, "
									+ "code.codetype, "
									+ "code.datafield1type, "
									+ "code.datafield2type, "
									+ "code.datafield3type, "
									+ "code.datafield4type, "
									+ "code.datafield5type, "
									+ "code.datafield6type, "
									+ "code.datafield7type, "
									+ "code.datafield8type, "
									+ "code.datafield9type, "
									+ "code.datafield10type, "
									+ "code.datafield11type, "
									+ "code.datafield12type, "
									+ "dpe.iscritical, "
									+ "dpe.sequence, " 
									+ "dpe.criticality "
									+ "FROM dpentries dpe, pages p, MEDICALHIERARCHY_LEAF_LEVEL_V code "
									+ "WHERE dpe.pageid = p.pageid "
									+ "AND dpe.hid = code.hid AND dpe.isDeleted = 'N'  "
									+ "AND caseid = :caseId AND p.pageid = :pageId AND dpe.startSectionNumber = :startsectionNumber AND dpe.endSectionNumber = :endsectionNumber "  
									+ "ORDER BY codename, category, subcategory, p.finalpagenumber, dpe.sectionnumber, dpe.datadate ";

							Query query = session.createSQLQuery(hql);
							query.setLong("caseId", caseId);
							query.setLong("pageId", pageId);
							query.setString("startsectionNumber", startSectionNumber);
							query.setString("endsectionNumber", endSectionNumber);
							
							List<DataPointEntryView> recordlist = new LinkedList<DataPointEntryView>();

							List<Object[]> result = query.list();
							for (Object[] record : result) {
								DataPointEntryView view = new DataPointEntryView();
								view.setCaseId(((BigDecimal) record[0]).longValue());
								view.setCategory((String) record[1]);
								view.setSubCategory((String) record[2]);
								view.setCodeName((String) record[3]);
								view.setCodeDesc((String) record[4]);
								view.setFinalpagenumber(((BigDecimal) record[5]).longValue());
								view.setSectionNumber(((BigDecimal) record[6]).longValue());
								view.setDataDate(new java.util.Date(((BigDecimal) record[7]).longValue()));
								view.setDpentryId(((BigDecimal) record[8]).longValue());
								view.setSpcontentid((String) record[9]);
								view.setSuspendnote((String) record[10]);
								view.setIsCompleted((Character) record[11]);
								view.setIsRejected((Character) record[12]);
								view.setHid(((BigDecimal) record[13]).longValue());
								view.setDataField1Value((String)record[14]);
								view.setDataField2Value((String)record[15]);
								view.setDataField3Value((String)record[16]);
								view.setDataField4Value((String)record[17]);
								
								if(record[30]!=null){    // Set the datafield values if dataField5Value is not null 
									view.setDataField5Value((String)record[18]);
									view.setDataField6Value((String)record[19]);
									view.setDataField7Value((String)record[20]);
									view.setDataField8Value((String)record[21]);
									view.setDataField9Value((String)record[22]);
									view.setDataField10Value((String)record[23]);
									view.setDataField11Value((String)record[24]);
									view.setDataField12Value((String)record[25]);
								}
								view.setDatafield1((String)record[26]);
								view.setDatafield2((String)record[27]);
								view.setDatafield3((String)record[28]);
								view.setDatafield4((String)record[29]);
								if(record[30]!=null){   // Set the datafields if dataField5Value is not null 
									view.setDatafield5((String)record[30]);
									view.setDatafield6((String)record[31]);
									view.setDatafield7((String)record[32]);
									view.setDatafield8((String)record[33]);
									view.setDatafield9((String)record[34]);
									view.setDatafield10((String)record[35]);
									view.setDatafield11((String)record[36]);
									view.setDatafield12((String)record[37]);
								}
								view.setIstext((String)record[38]);
								view.setIshandwriting((String)record[39]);
								view.setPageId(((BigDecimal) record[40]).longValue());
								if(record[41] != null && record[42] != null ){
									Long startSectionNo = ((BigDecimal) record[41]).longValue();
									Long endSectionNo = ((BigDecimal) record[42]).longValue();
									if(startSectionNo.equals(endSectionNo))
										view.setSectionRange(startSectionNo.toString());
									else
										view.setSectionRange(startSectionNo.toString() + "-" + endSectionNo.toString() );
								}else{ // need to remove this else once section number column will be get removed
									view.setSectionRange(String.valueOf(((BigDecimal) record[6]).longValue()));
								}
								view.setCodeType((String)record[43]);
								view.setDataField1Type((String)record[44]);
								view.setDataField2Type((String)record[45]);
								view.setDataField3Type((String)record[46]);
								view.setDataField4Type((String)record[47]);
								view.setDataField5Type((String)record[48]);
								view.setDataField6Type((String)record[49]);
								view.setDataField7Type((String)record[50]);
								view.setDataField8Type((String)record[51]);
								view.setDataField9Type((String)record[52]);
								view.setDataField10Type((String)record[53]);
								view.setDataField11Type((String)record[54]);
								view.setDataField12Type((String)record[55]);
								view.setIsCritical((String)record[56]);
								view.setSequence(((BigDecimal) record[57]).longValue());
								 //set code scale value
			                     if(record[58]!=null)
			                    	 view.setCodeScale(Integer.parseInt(record[58].toString()));
							     else
							    	 view.setCodeScale(1);
								
								recordlist.add(view);
							}
							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	/*
	 * Get the navigation path for an ICD10 Code. How did we get to the code
	 * from the navigation menu from the category/subcategory/Parent Code,
	 * 
	 * @return List<MedicalHierarchyView> Provides the navigation path from the
	 * menu to the desired code Position 0 is the top level-category, position 1
	 * is the subcategory, position 3 is parent code, finally the desired code.
	 */
	public List<MedicalHierarchyView> getCodeParentPaths(final long id)
			throws Exception {

		return (List<MedicalHierarchyView>) this.getHibernateTemplate()
				.execute(new HibernateCallback<List<MedicalHierarchyView>>() {
					public List<MedicalHierarchyView> doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						try {
							String hql = "SELECT (select node_level from medicalhierarchy_leaf_level_v where hid=m.id) nav_level, m.id, m.name, m.description, m.parentid, m.revision "
									+ "FROM medicalhierarchy m "
									+ "WHERE name <> 'Root' "
									+ "START WITH id = :id "
									+ "CONNECT BY PRIOR parentid = id "
									+ "ORDER BY nav_level";

							Query query = session.createSQLQuery(hql);
							query.setLong("id", id);

							List<MedicalHierarchyView> recordlist = setMedicalHiearchyViewRecordsForNavigation(query.list());

							return recordlist;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}

	/*
	 * Set the MedicalHierachyView Record with limited data containing
	 * navigation information: level, id, name, description, parentid and
	 * revision
	 * 
	 * @return List<MedicalHierarchyView> Limited set of data in
	 * MedicalHierarchyView to be used for code's parents navigation
	 */
	private List<MedicalHierarchyView> setMedicalHiearchyViewRecordsForNavigation(
			List<Object[]> result) {
		List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

		for (Object[] record : result) {
			MedicalHierarchyView view = new MedicalHierarchyView();
			view.setLevel(((BigDecimal) record[0]).longValue());
			view.setId(((BigDecimal) record[1]).longValue());
			view.setName((String) record[2]);
			view.setDescription((String) record[3]);
			view.setParentid(((BigDecimal) record[4]).longValue());
			view.setRevision((String) record[5]);

			recordlist.add(view);
		}

		return recordlist;
	}
	
/*
 * Validate the code and revision whether exist in the database or not
 * (non-Javadoc)
 * @see com.teaminformatics.synodex.dao.MedicalHierarchyViewDao#checkForMedicalCodeExistance(java.lang.String, java.lang.String)
 */

@SuppressWarnings("unchecked")
public List<MedicalHierarchy> checkForMedicalCodeExistance(final String icd10Code, final String revision) throws Exception {
	// TODO Auto-generated method stub
	return (List<MedicalHierarchy>) this.getHibernateTemplate().execute(new HibernateCallback<List>() {
			public List<MedicalHierarchy> doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "from MedicalHierarchy as mh where mh.name = :code and mh.revision = :revision and mh.depth is null";
				
				Query queryObject = session.createQuery(hql);
				queryObject.setString("code", icd10Code);
				queryObject.setString("revision", revision);
				List<MedicalHierarchy> codeList = queryObject.list();
				return codeList;
		}

	});
}

	/**
	 * 
	 * @param id Case ID
	 * @return returns the top two level MedicalHierarchyView, with non-leaf nodes, for navigation tree
	 */
	@SuppressWarnings("unchecked")
	public List<MedicalHierarchyView> getTopTwoLevelNavigationTree(final Long id)
			throws Exception {
		return (List<MedicalHierarchyView>) this.getHibernateTemplate().execute(
			new HibernateCallback<List<MedicalHierarchyView>>() {
				public List<MedicalHierarchyView> doInHibernate(
						Session session) throws HibernateException,
						SQLException {

					try {
						String hql = "SELECT  "
								+ "id, "
								+ "name, "
								+ "description, "
								+ "parentid, "
								+ "billable, "
								+ "displayrank, "
								+ "greenflag, "
								+ "yellowflag, "
								+ "redflag, "
								+ "commonname, "
								+ "revision, "
								+ "level-1 as pseudolevel, "
								+ "CASE "
								+ "  WHEN CONNECT_BY_ISleaf = 1 "
								+ "  THEN lpad(' ',2*(level-2), ' ') || name || ' ' ||description "
								+ "  ELSE lpad(' ',2*(level-2), ' ') || name "
								+ "END hiearhydetail, "
								+ "linktoid, "
								//get is critical flag
								+ "IWS_APP_UTILS.isCodeCritical2(:id, m.id) isCritical, "
								+ "IWS_APP_UTILS.getProductSpec(:id, m.name) spec, "
								+ "IWS_APP_UTILS.isCodeExcluded(:id, m.id) isExcluded, "
								+ "IWS_APP_UTILS.getCodeScale2(:id, m.id) " //index 17
								+ "FROM (SELECT m1.* FROM MEDICALHIERARCHY m1, cases c WHERE m1.revision=c.hierarchyrevision and c.caseid=:id) m "
								+ "WHERE level between 2 and 3 and CONNECT_BY_ISleaf = 0"
								+ "  START WITH NAME = 'Root'"
								+ "  CONNECT BY prior id = parentid ORDER SIBLINGS BY displayrank DESC NULLS LAST, name";

						Query query = session.createSQLQuery(hql);
						query.setLong("id", id);
						List<MedicalHierarchyView> recordlist = new LinkedList<MedicalHierarchyView>();

						List<Object[]> result = query.list();
						for (Object[] record : result) {
							MedicalHierarchyView view = new MedicalHierarchyView();
							view.setId(((BigDecimal) record[0]).longValue());
							view.setName((String) record[1]);
							view.setDescription((String) record[2]);
							view.setParentid(((BigDecimal) record[3])
									.longValue());
							view.setBillable((String) record[4]);
							// view.setDisplayRank(((BigDecimal)record[5]).longValue());
							view.setGreenFlag((String) record[6]);
							view.setYellowFlag((String) record[7]);
							view.setRedFlag((String) record[8]);
							view.setCommonName((String) record[9]);
							view.setRevision((String) record[10]);
							view.setLevel(((BigDecimal) record[11])
									.longValue());
							view.setHierarchyDetails((String) record[12]);
							if(record[13]!=null)
								view.setLinkToId(((BigDecimal) record[13]).longValue());
							//get is critical flag
							if (record[14] != null)
								view.setIsCritical((String) record[14]);
							//get prod spec
							if (record[15] != null)
								view.setSpec((String) record[15]);
							//get is excluded flag
							if (record[16] != null)
								view.setIsExcluded((String) record[16]);
							//set code scale value
		                    if(record[17]!=null)
						         view.setCodeScale(Integer.parseInt(record[17].toString()));
						    else
						    	 view.setCodeScale(0);
		                    recordlist.add(view);
						}

						// return null;
						return recordlist;
					} catch (HibernateException he) {
						he.printStackTrace();
						throw he;
					}
				}

			});
	}

	/*
	 * Get the navigation path for an ICD10 Code by name
	 * 
	 * @param name The Code name
	 * @param revision The revision for the code
	 * 
	 * @return String Provides the navigation path from the
	 * menu to the desired code
	 */
	public String getCodeParentPaths(final String name,
			final String revision) throws Exception {

		return (String) this.getHibernateTemplate()
				.execute(new HibernateCallback<String>() {
					public String doInHibernate(
							Session session) throws HibernateException,
							SQLException {
						try {
							String path = null;
							String hql = "select mv.path from MEDICALHIERARCHY m, MEDICALHIERARCHY_LEAF_LEVEL_V mv "
									+ "where m.id = mv.hid AND m.NAME = :name AND m.REVISION = :revision and m.depth is null";

							Query query = session.createSQLQuery(hql);
							query.setString("name", name);
							query.setString("revision", revision);

							List<String> result = query.list();
							for (String record : result) {
								path = ((String) record);
							}

							return path;
						} catch (HibernateException he) {
							he.printStackTrace();
							throw he;
						}
					}

				});
	}



}
