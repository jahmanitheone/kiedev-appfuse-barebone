/**************************************************************
Antlr4 Rule: Antlr4 Rules for Synthetic Code Rules
DAte: 10/14/2013 - 10/18/13
Author: Philip Jahmani Chauvet (pchauvet@synodex.com)
**************************************************************
Versions:
10/17/2013 - Simple rule: IF <condition> THEN <assign>
**************************************************************/
grammar SynRule;

//*****************************
//Parser rules
//*****************************
synrule: ruleDeclaration;

ruleDeclaration: RESERVEWORD_IF ruleConditions RESERVEWORD_THEN ruleAssignment;

ruleConditions: ID;

ruleAssignment: ID;

//*****************************
//Lexar rules
//*****************************
RESERVEWORD_IF : I F;

RESERVEWORD_THEN : T H E N;


ID  :   [a-zA-Z]+ ;      	// match identifiers <label id="code.tour.expr.3"/>
INT :   [0-9]+ ;         	// match integers
NEWLINE:'\r'? '\n' ;     	// return newlines to parser (is end-statement signal)
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