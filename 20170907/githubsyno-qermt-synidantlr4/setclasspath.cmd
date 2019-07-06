echo off
set PATH=%PATH%;
set CLASSPATH=%CLASSPATH%;C:\bin\antlr4\antlr-4.0-complete.jar
set PATH=%PATH%;C:\bin\antlr4\antlr-4.0-complete.jar

set PRJ_DRIVE=c:
set PRJ_PATH=C:\dev\workspaceantlrnew\chapter3\

echo .
echo PATH=%PATH%;
echo CLASSPATH=%CLASSPATH%
echo 
echo PRJ_PATH=%PRJ_PATH%

rem java org.antlr.v4.runtime.misc.TestRig


set VALUE1={99, 3, 451}
echo .
echo . Test values:
echo %VALUE1%