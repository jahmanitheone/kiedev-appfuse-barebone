package com.synodex.qcai.utils;

import java.util.Map;

public class MapUtil {

	/**
	 * Get the keys of a Map
	 * 
	 * @param map
	 * @return String[] of keys
	 */
	public static String[] getMapKeysToArray(Map map) {
		String[] result = {};

		if (map != null && map.size() > 0) {
			result = (String[]) map.keySet().toArray(new String[map.size()]);
		}

		return result;
	}

}
