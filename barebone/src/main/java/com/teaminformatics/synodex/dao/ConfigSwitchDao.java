package com.teaminformatics.synodex.dao;

import java.util.List;

import com.teaminformatics.synodex.model.ConfigSwitches;

/**
 * DAO for accessing application config switch
 * 
 * @author <a href="mailto:pchauvet@synodex.com">Philip Jahmani Chauvet</a>
 */
public interface ConfigSwitchDao extends LoadableDao<ConfigSwitches, Long> {	
	public String getMaxSectionsPerSelection(int clientid, String cfgswitch) throws Exception;
	
	public String getPopPageThresholdValue(Long clientid,String cfgswitch)throws Exception;
}
