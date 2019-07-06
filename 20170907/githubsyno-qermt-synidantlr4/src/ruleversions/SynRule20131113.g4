/**************************************************************
Antlr4 Rule: Antlr4 Rules for Synthetic Code Rules
DAte: 10/14/2013 - 10/18/13
Author: Philip Jahmani Chauvet (pchauvet@synodex.com)
See: Change log in SynRuleChanges.txt
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

ruleConditions
	:
	(
		LOGICALOPERATORS
		assignStringSynIdPropertyValue
	)*
	|
	(
		LOGICALOPERATORS
		bracketedValue
	)*
	;

ruleAssignment
	:
	assignRuleAssignemntPropertyValue
	;

synid
	:
	ALPHAUPPERCASE
	| ALPHADIGITS
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
	CONSTANT_DASH|CONSTANTS_UNDERSCORE|CONSTANT_PERIOD
	;
	
synidproperty
	:
	synid CONSTANT_PERIOD synproperty+
	;

assignRuleSynId
	:
	synid (CONSTANT_EQUAL|CONSTANT_NOTEQUAL) CONSTANT_QUOTE (RESERVEWORD_TRUE|RESERVEWORD_FALSE) CONSTANT_QUOTE
	| CONSTANT_LEFT_ROUNDBRACKET assignRuleSynId CONSTANT_RIGHT_ROUNDBRACKET
	;

bracketedValue
	:
	CONSTANT_LEFT_ROUNDBRACKET
	assignStringSynIdPropertyValue+
	CONSTANT_RIGHT_ROUNDBRACKET
	|
	CONSTANT_RIGHT_ROUNDBRACKET
	(
	LOGICALOPERATORS
	assignStringSynIdPropertyValue
	)+
	CONSTANT_RIGHT_ROUNDBRACKET
	;
		
assignStringSynIdPropertyValue
	: synidproperty
	  (CONSTANT_EQUAL|CONSTANT_NOTEQUAL)
	  CONSTANT_QUOTE
	  synidValues
	  CONSTANT_QUOTE
	| synidproperty OPERATORS_FUNCTIONS
	| synidproperty OPERATORS synidValue
	| dateDiff OPERATORS synidValue
	;

assignRuleAssignemntPropertyValue
	: synidproperty
	  (CONSTANT_EQUAL|CONSTANT_NOTEQUAL)
	  CONSTANT_QUOTE
	  synidValues
	  CONSTANT_QUOTE
	| synidproperty OPERATORS_FUNCTIONS
	| synidproperty OPERATORS synidValue
	| dateDiff OPERATORS synidValue
	;

synidValues
	:
	synidValue
	| synidValue+
	| synidValues CONSTANT_PERIOD DIGIT+
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
	| PERCENT
	| CONSTANT_DASH
	| CONSTANTS_UNDERSCORE
	| CONSTANT_PERIOD
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
	[a-z]+
	;
	
ALPHAUPPERCASE 
	: 
	[A-Z]+
	;
	
ALPHA 
	: 
	[a-zA-Z]+
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
	
CONSTANT_SINGLEQUOTE 
	: 
	'\''
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

OPERATORS 
	: 
	('!'|'=='|CONSTANT_NOTEQUAL|'>'|'<'|'>='|'<=')
	;
	
FLOAT
	:
	DIGITS CONSTANT_PERIOD DIGITS
	;
	
DIGIT 
	: [0-9] 
	;
	
DIGITS 
	:
	DIGIT+ 
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
	(ISNULL)
	;
	
ISNULL
	: I S (' ')+ N U L L
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


