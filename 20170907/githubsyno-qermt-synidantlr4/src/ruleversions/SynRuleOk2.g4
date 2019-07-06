/**************************************************************
Antlr4 Rule: Antlr4 Rules for Synthetic Code Rules
DAte: 10/14/2013 - 10/18/13
Author: Philip Jahmani Chauvet (pchauvet@synodex.com)
**************************************************************
Versions:
10/17/2013 - Simple rule: IF <condition> THEN <assign>
---------
10/19/2013 - ruleDeclaration: IF <condition> THEN <assign>
             <condition>: DB = "True" - declare the rule being processed
             <assign>: DB.DataStatus = "Decline" - Set Decline status
---------
10/20/2013 - ruleDeclaration: IF <assignRuleSynId> THEN <assign>
             <assignRuleSynId>: (DB = "True") - declare the rule being processed with round brackets
---------
10/20/2013 - ruleDeclaration: IF <assignRuleSynId> <ruleConditions> THEN <assign>
             <assignRuleSynId>: (DB = "True") - declare the rule being processed with round brackets
             <ruleConditions>: AND ETOH.Status = "Current Treatment", 
                               OR ETOH.Status = "Current Treatment"
---------
10/20/2013 - ruleDeclaration: IF <assignRuleSynId> <ruleConditions> THEN <assign>
             <assign>: 
             	HD.DataStatus = "Decline"
             	HD.Value = "200"
             	HD.Value = "20.21"
             	HD.Value = ".21"
             	HD.Value = "23.8%"
**************************************************************/
grammar SynRule;

//*****************************
//Parser rules
//*****************************
synrule : ruleDeclaration;

ruleDeclaration 
	: RESERVEWORD_IF 
	  assignRuleSynId 
	  ruleConditions 
	  RESERVEWORD_THEN 
	  ruleAssignment
	;

ruleAssignment 
	: 
	assignStringSynIdPropertyValue
	;

ruleConditions 
	: 
	(
		LOGICALOPERATORS 
		assignStringSynIdPropertyValue
	)*
	| 
	(
		LOGICALOPERATORS 
		CONSTANT_LEFT_ROUNDBRACKET 
		assignStringSynIdPropertyValue 
		CONSTANT_RIGHT_ROUNDBRACKET
	)*
	| synidproperty OPERATORS_FUNCTIONS 	
	;

synid : ALPHAUPPERCASE;

synproperty 
    :
	ALPHA
	|  ALPHADIGITS (ALPHADIGITS)*;

synidproperty 
	: 
	synid CONSTANT_PERIOD synproperty+
	;

assignRuleSynId 
	: 
	synid (CONSTANT_EQUAL|CONSTANT_NOTEQUAL) CONSTANT_QUOTE (RESERVEWORD_TRUE|RESERVEWORD_FALSE) CONSTANT_QUOTE  
	| CONSTANT_LEFT_ROUNDBRACKET assignRuleSynId CONSTANT_RIGHT_ROUNDBRACKET
	;

assignStringSynIdPropertyValue 
	: synidproperty 
	  (CONSTANT_EQUAL|CONSTANT_NOTEQUAL) 
	  CONSTANT_QUOTE 
	  synidValues
	  CONSTANT_QUOTE
	;  

synidValues
	: 
	synidValue (synidValue)+
	| synidValues CONSTANT_PERIOD DIGIT+
	;

synidValue:
	ALPHA
	| ALPHADIGITS
	| ALPHALOWERCASE
	| ALPHAUPPERCASE
	| DIGITS 
	| ALPHADIGITS
	| DIGITSALPHA 
	| FLOAT 
	| PERCENT 
	| CONSTANT_DASH
	| UNDERSCORE
	| CONSTANT_PERIOD
	;

//*****************************
//Lexar rules
//*****************************
RESERVEWORD_IF : I F;
RESERVEWORD_THEN : T H E N;
RESERVEWORD_TRUE : T R U E;
RESERVEWORD_FALSE : F A L S E;
LOGICALOPERATORS : LOGICALOPERATOR_AND | LOGICALOPERATOR_OR;
LOGICALOPERATOR_AND :  A N D ;
LOGICALOPERATOR_OR : O R;
ISNULL 
	: I S (' ')+ N U L L
	;
ALPHALOWERCASE : [a-z]+;
ALPHAUPPERCASE : [A-Z]+;
ALPHA : [a-zA-Z]+;
CONSTANT_PERIOD : '.';
CONSTANT_EQUAL : '=';
CONSTANT_NOTEQUAL : '!=';
CONSTANT_QUOTE : CONSTANT_SINGLEQUOTE|CONSTANT_DOUBLEQUOTE;
CONSTANT_DOUBLEQUOTE : '"';
CONSTANT_SINGLEQUOTE : '\'';
CONSTANT_DASH: '-' ;
CONSTANT_LEFT_ROUNDBRACKET : '(';
CONSTANT_RIGHT_ROUNDBRACKET : ')';
OPERATORS : ('!'|'=='|CONSTANT_NOTEQUAL|'>'|'<'|'>='|'<=');
OPERATORS_FUNCTIONS
	: 
	(ISNULL)
	; 
FLOAT 
	: 
	DIGITS CONSTANT_PERIOD DIGITS
	;
DIGIT : [0-9] ;
DIGITS : DIGIT+ ;
PERCENT
	: 
	DIGITS '%' 
	| DIGITS CONSTANT_PERIOD DIGITS '%'
   		;
UNDERSCORE : '_' ;
ALPHADIGITS 
	: 
	(ALPHA|DIGITS)+
	;
DIGITSALPHA 
	: 
	DIGITS|ALPHA
	;


//*****************************
//Lexar constants
//*****************************
INT :   [0-9]+ ;         	// match integers
NEWLINE :'\r'? '\n' ;     	// return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ; 	// toss out whitespace


//*****************************
//Lexar fragments
//*****************************
fragment A:('a'|'A');
fragment B:('b'|'B');
fragment C:('c'|'C');
fragment D:('d'|'D');
fragment E:('e'|'E');
fragment F:('f'|'F');
fragment G:('g'|'G');
fragment H:('h'|'H');
fragment I:('i'|'I');
fragment J:('j'|'J');
fragment K:('k'|'K');
fragment L:('l'|'L');
fragment M:('m'|'M');
fragment N:('N'|'n');
fragment O:('o'|'O');
fragment P:('p'|'P');
fragment Q:('q'|'Q');
fragment R:('r'|'R');
fragment S:('s'|'S');
fragment T:('t'|'T');
fragment U:('u'|'U');
fragment V:('v'|'V');
fragment W:('w'|'W');
fragment X:('x'|'X');
fragment Y:('y'|'Y');
fragment Z:('z'|'Z');


