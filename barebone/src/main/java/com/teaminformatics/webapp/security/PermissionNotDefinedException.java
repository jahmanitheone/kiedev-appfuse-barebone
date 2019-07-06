package com.teaminformatics.webapp.security;

public class PermissionNotDefinedException extends RuntimeException
{

	/**
     * 
     */
    private static final long serialVersionUID = -4444772328890604714L;

	public PermissionNotDefinedException()
    {
	    super();
    }

	public PermissionNotDefinedException(String arg0, Throwable arg1)
    {
	    super(arg0, arg1);
    }

	public PermissionNotDefinedException(String arg0)
    {
	    super(arg0);
    }

	public PermissionNotDefinedException(Throwable arg0)
    {
	    super(arg0);
    }

}
