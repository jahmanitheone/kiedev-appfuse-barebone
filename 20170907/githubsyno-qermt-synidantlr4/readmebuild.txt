--------------------------
Build with maven exclipe config
--------------------------
Go to Run Configurations

Maven Build
	New Maven Build
	name: mvn antlrbuild
	Base directory: synodex-qermt-synidantlr4
	Goals: clean generate-sources install test-compile -DskipTests=true
	Apply

Add to Java BuildPath
	target/generated-sources/antlr

Run configuration:	
	mvn antlrbuild 
	run


----------------
If the build is crazy
-----------------
target/generated-sources
do select project
Run As -> clean
Run As -> maven install
Run As -> generated-sources
Projec clean
After that I don't know and $^*###. u***

----------------
More notes
-----------------
src/main/antlr4
	The antlr4 grammar goes here

Generate antlr4 code
	mvn generate-sources
		- create an run configuration
	
	targer/classes/*.class
	anltr4 generates the parser lexer here

Note:	
	I added the to the src directory:
		target/generated-sources/antlr	
	
	
