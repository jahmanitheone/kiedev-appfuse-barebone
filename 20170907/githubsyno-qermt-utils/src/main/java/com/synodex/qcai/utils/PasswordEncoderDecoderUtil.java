package com.synodex.qcai.utils;

import java.security.MessageDigest;
import java.util.Formatter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class PasswordEncoderDecoderUtil {
	private static final Log log = LogFactory.getLog(PasswordEncoderDecoderUtil.class);
	public static String calculateHash(MessageDigest algorithm,String password) throws Exception{

    	algorithm.update(password.getBytes(), 0, password.getBytes().length);
    		
        // get the hash value as byte array
        byte[] hash = algorithm.digest();

        return byteArray2Hex(hash);
    }

    // To covert byte array to hexadecimal String
    private static String byteArray2Hex(byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }

	public static String getHashedPassword(String password){
		String tempPassword="";
		try {
			if(password !=""){
				MessageDigest sha1 = MessageDigest.getInstance("SHA1");
				tempPassword= calculateHash(sha1, password);
			}
		} catch (Exception e) {
			log.info("Password encryption error:"+e.getStackTrace());
		}
		
		return tempPassword;
	}
}
