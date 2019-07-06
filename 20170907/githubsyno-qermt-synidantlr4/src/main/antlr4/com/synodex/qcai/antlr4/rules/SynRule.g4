/************************************************************************
Author: Philip Jahmani Chauvet (pchauvet@synodex.com)
Dated Changes: 
	10/14/2013 - 10/18/2013  Original rule creation
	11/13/2013 - 11/13/2013  Handle Is Null
	11/14/2013 - 11/14/2013  Rules with {dash}-{number} in conditions fail to generate
	11/19/2013 - 11/19/2013  Values with 4 space delimited terms 
	11/20/2013 - 11/20/2013  Rules with single-quote 
	11/21/2013 - 11/21/2013  Handing parens within quotes
	11/22/2013 - 11/22/2013  Missing end quote in MetaRule 
	11/26/2013 - 11/26/2013  MetaData with more than one "True" conditions
	12/03/2013 - 12/03/2013  Handling ORs that are nested within conditional Parens
	12/06/2013 - 12/06/2013  Implement "BMI.Grouping" support
	12/09/2013 - 12/09/2013  Rule with numeric condition	
	12/09/2013 - 12/09/2013  Rule with single values	
	02/15/2014 - 02/17/2014  Add Grouping Rule processing
	02/18/2014 - 02/21/2014  Add isMostRecent, isEarliest Rule processing
	02/24/2014 - 02/24/2014  Add MostRecent !isMostRecent Rule processing
************************************************************************/
grammar SynRule;

//*****************************
//Parser rules
//*****************************
synrule : ruleDeclaration;

ruleDeclaration
	: 
	  RESERVEWORD_IF
	  assignRuleSynId
	  ruleConditions
	  RESERVEWORD_THEN
	  ruleAssignment
	|
	  RESERVEWORD_IF
  	  CONSTANT_LEFT_ROUNDBRACKET
	  assignRuleSynId
	  ruleConditions
	  CONSTANT_RIGHT_ROUNDBRACKET
	  RESERVEWORD_THEN
	  ruleAssignment
	;

assignRuleSynId
	:
	synid 
	(
		CONSTANT_EQUAL|CONSTANT_NOTEQUAL) 
		CONSTANT_QUOTE 
		(RESERVEWORD_TRUE|RESERVEWORD_FALSE) 
		CONSTANT_QUOTE
	|
	(
		CONSTANT_LEFT_ROUNDBRACKET
		assignRuleSynId
		CONSTANT_RIGHT_ROUNDBRACKET
	)*
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
		(
		  LOGICALOPERATORS
		  assignStringSynIdPropertyValue
		)*
		CONSTANT_RIGHT_ROUNDBRACKET
	)*
	;

ruleAssignment
	:
	assignRuleAssignmentPropertyValue
	|
	(
		assignRuleAssignmentPropertyValue LOGICALOPERATORS assignRuleAssignmentPropertyValue
	)*
	;

synid
	:
	synpropertychars+
	;

synproperty
    :
    synpropertychars+
	;

synpropertychars
    :
	ALPHA
	| ALPHALOWERCASE
	| ALPHAUPPERCASE
	| ALPHADIGITS
	| sypropertyseperators
	;

sypropertyseperators
	:
	CONSTANT_DASH
	|
	CONSTANTS_UNDERSCORE
	|
	CONSTANT_PERIOD
	;

synidproperty
	:
	synid CONSTANT_PERIOD synproperty+
	;


assignStringSynIdPropertyValue
	:
	synidproperty
	(CONSTANT_EQUAL|CONSTANT_NOTEQUAL|OPERATORS)
	(
		synidValues+
		|
		CONSTANT_QUOTE synidValues+ CONSTANT_QUOTE
	)
	|
	synidproperty OPERATORS_FUNCTIONS
	|
	dateDiff OPERATORS synidValue
	|
	mostRecent 
	(CONSTANT_EQUAL|CONSTANT_NOTEQUAL|OPERATORS)
	(
		synidValues+
		|
		CONSTANT_QUOTE synidValues+ CONSTANT_QUOTE
	)
	|
	assignRuleSynId
	|
	isMostRecent
	|
	OPERATOR_NOT isMostRecent
	;

assignRuleAssignmentPropertyValue
	: 
	synidproperty
    (CONSTANT_EQUAL|CONSTANT_NOTEQUAL)
	(
		synidValues+
		|
		CONSTANT_QUOTE synidValues+ CONSTANT_QUOTE
	)
	| 
	synidproperty OPERATORS synidValue+
	;

	
synidValues
	:
	synidValue
	| synidValues CONSTANT_PERIOD DIGIT+
	| synidValues ALPHA+
	| synidValues ALPHALOWERCASE+
	| synidValues ALPHAUPPERCASE+
	| synidValues ALPHADIGITS+
	| synidValues DIGIT+
	;
	

synidValue:
	ALPHA
	| ALPHADIGITS
	| ALPHALOWERCASE
	| ALPHAUPPERCASE
	| DIGITS
	| DIGITSALPHA
	| FLOAT
	| LOGICALOPERATORS
	| PERCENT
	| CONSTANT_DASH
	| CONSTANT_COMMA
	| CONSTANTS_UNDERSCORE
	| CONSTANT_PERIOD
	| CONSTANT_PERCENT
	| CONSTANT_LEFT_ROUNDBRACKET
	| CONSTANT_RIGHT_ROUNDBRACKET
	| CONSTANT_LEFT_SQUAREBRACKET
	| CONSTANT_RIGHT_SQUAREBRACKET
	| CONSTANT_LEFT_CURLYBRACKET
	| CONSTANT_RIGHT_CURLYBRACKET
	| CONSTANT_AMPERSAND
	| synidsSingleValue
	;

synidsSingleValue:
	DIGIT
    | SINGLEALPHA
    | SINGLEALPHAUPPERCASE
    | SINGLEALPHALOWERCASE
	;


dateDiff
	:
	RESERVEWORD_DATEDIFF
	CONSTANT_LEFT_ROUNDBRACKET
		CONSTANT_QUOTE
		'd'
		CONSTANT_QUOTE
		CONSTANT_COMMA
		synidproperty
		CONSTANT_COMMA
		synidproperty
	CONSTANT_RIGHT_ROUNDBRACKET
	|
	RESERVEWORD_DATEDIFF
	CONSTANT_LEFT_ROUNDBRACKET
		CONSTANT_QUOTE
		'd'
		CONSTANT_QUOTE
		CONSTANT_COMMA
		mostRecent
		CONSTANT_COMMA
		synidproperty
	CONSTANT_RIGHT_ROUNDBRACKET	
	;

mostRecent
	:
	RESERVEWORD_MOSTRECENT
	CONSTANT_LEFT_ROUNDBRACKET
		synidproperty
	CONSTANT_RIGHT_ROUNDBRACKET
	|
	RESERVEWORD_MOSTRECENT
	CONSTANT_LEFT_ROUNDBRACKET
		CONSTANT_QUOTE
		synidproperty
		CONSTANT_QUOTE
	CONSTANT_RIGHT_ROUNDBRACKET
	;


isMostRecent
	:
	RESERVEWORD_ISMOSTRECENT
	CONSTANT_LEFT_ROUNDBRACKET
	CONSTANT_RIGHT_ROUNDBRACKET
	;

//*****************************
//Lexar rules
//*****************************
RESERVEWORD_IF
	: I F
	;

RESERVEWORD_THEN
	: T H E N
	;

RESERVEWORD_TRUE
	: T R U E
	;

RESERVEWORD_FALSE
	:
	F A L S E
	;

RESERVEWORD_DATEDIFF
	: D A T E D I F F
	;

RESERVEWORD_ISMOSTRECENT
	: I S M O S T R E C E N T
	;

RESERVEWORD_MOSTRECENT
	: M O S T R E C E N T
	;

LOGICALOPERATORS
	:
	LOGICALOPERATOR_AND | LOGICALOPERATOR_OR
	;

LOGICALOPERATOR_AND
	:
	A N D
	;

LOGICALOPERATOR_OR
	:
	O R
	;

ALPHALOWERCASE
	:
	SINGLEALPHALOWERCASE+
	;

SINGLEALPHALOWERCASE
	:
	[a-z]
	;

ALPHAUPPERCASE
	:
	SINGLEALPHAUPPERCASE+
	;

SINGLEALPHAUPPERCASE
	:
	[A-Z]
	;

ALPHA
	:
	SINGLEALPHA+
	;

SINGLEALPHA
	:
	[a-zA-Z]
	;

CONSTANT_PERIOD
	:
	'.'
	;


CONSTANT_DASH
	:
	'-'
	;

CONSTANTS_UNDERSCORE
	:
	'_'
	;

CONSTANT_AND
	:
	LOGICALOPERATOR_AND
	;

CONSTANT_EQUAL
	:
	'='
	;

CONSTANT_NOTEQUAL
	:
	'!='
	;

CONSTANT_QUOTE
	:
	CONSTANT_DOUBLEQUOTE
	;

CONSTANT_DOUBLEQUOTE
	:
	'"'
	;

CONSTANT_COMMA
	:
	','
	;

CONSTANT_LEFT_ROUNDBRACKET
	:
	'('
	;

CONSTANT_RIGHT_ROUNDBRACKET
	:
	')'
	;

CONSTANT_LEFT_SQUAREBRACKET
	:
	'['
	;

CONSTANT_RIGHT_SQUAREBRACKET
	:
	']'
	;

CONSTANT_LEFT_CURLYBRACKET
	:
	'{'
	;

CONSTANT_RIGHT_CURLYBRACKET
	:
	'}'
	;

CONSTANT_PERCENT
	:
	'%'
	;

CONSTANT_AMPERSAND
	:
	'&'
	;

OPERATORS
	:
	('!'|'=='|CONSTANT_NOTEQUAL|'>'|'<'|'>='|'<=')
	;

OPERATOR_NOT
	:
	('!')
	;

FLOAT
	:
	DIGITS CONSTANT_PERIOD DIGITS
	;


DIGITS
	:
	DIGIT+
	;
	
DIGIT
	: [0-9]
	;

PERCENT
	:
	DIGITS '%'
	| DIGITS CONSTANT_PERIOD DIGITS '%'
   		;

ALPHADIGITS
	:
	(ALPHA|DIGITS)+
	;

DIGITSALPHA
	:
	DIGITS|ALPHA
	;

OPERATORS_FUNCTIONS
	:
	ISNULL
	|
	ISNOTNULL
	;

ISNULL
	: I S (' ')+ N U L L
	;

ISNOTNULL
	: I S (' ')+ N O T (' ')+ N U L L
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
