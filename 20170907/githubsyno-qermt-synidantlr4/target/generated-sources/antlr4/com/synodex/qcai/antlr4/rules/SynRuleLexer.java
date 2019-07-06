// Generated from com\synodex\qcai\antlr4\rules\SynRule.g4 by ANTLR 4.0
package com.synodex.qcai.antlr4.rules;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class SynRuleLexer extends Lexer {
	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, RESERVEWORD_IF=2, RESERVEWORD_THEN=3, RESERVEWORD_TRUE=4, RESERVEWORD_FALSE=5, 
		RESERVEWORD_DATEDIFF=6, RESERVEWORD_ISMOSTRECENT=7, RESERVEWORD_MOSTRECENT=8, 
		LOGICALOPERATORS=9, LOGICALOPERATOR_AND=10, LOGICALOPERATOR_OR=11, ALPHALOWERCASE=12, 
		SINGLEALPHALOWERCASE=13, ALPHAUPPERCASE=14, SINGLEALPHAUPPERCASE=15, ALPHA=16, 
		SINGLEALPHA=17, CONSTANT_PERIOD=18, CONSTANT_DASH=19, CONSTANTS_UNDERSCORE=20, 
		CONSTANT_AND=21, CONSTANT_EQUAL=22, CONSTANT_NOTEQUAL=23, CONSTANT_QUOTE=24, 
		CONSTANT_DOUBLEQUOTE=25, CONSTANT_COMMA=26, CONSTANT_LEFT_ROUNDBRACKET=27, 
		CONSTANT_RIGHT_ROUNDBRACKET=28, CONSTANT_LEFT_SQUAREBRACKET=29, CONSTANT_RIGHT_SQUAREBRACKET=30, 
		CONSTANT_LEFT_CURLYBRACKET=31, CONSTANT_RIGHT_CURLYBRACKET=32, CONSTANT_PERCENT=33, 
		CONSTANT_AMPERSAND=34, OPERATORS=35, OPERATOR_NOT=36, FLOAT=37, DIGITS=38, 
		DIGIT=39, PERCENT=40, ALPHADIGITS=41, DIGITSALPHA=42, OPERATORS_FUNCTIONS=43, 
		ISNULL=44, ISNOTNULL=45, INT=46, NEWLINE=47, WS=48;
	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] tokenNames = {
		"<INVALID>",
		"'d'", "RESERVEWORD_IF", "RESERVEWORD_THEN", "RESERVEWORD_TRUE", "RESERVEWORD_FALSE", 
		"RESERVEWORD_DATEDIFF", "RESERVEWORD_ISMOSTRECENT", "RESERVEWORD_MOSTRECENT", 
		"LOGICALOPERATORS", "LOGICALOPERATOR_AND", "LOGICALOPERATOR_OR", "ALPHALOWERCASE", 
		"SINGLEALPHALOWERCASE", "ALPHAUPPERCASE", "SINGLEALPHAUPPERCASE", "ALPHA", 
		"SINGLEALPHA", "'.'", "'-'", "'_'", "CONSTANT_AND", "'='", "'!='", "CONSTANT_QUOTE", 
		"'\"'", "','", "'('", "')'", "'['", "']'", "'{'", "'}'", "'%'", "'&'", 
		"OPERATORS", "OPERATOR_NOT", "FLOAT", "DIGITS", "DIGIT", "PERCENT", "ALPHADIGITS", 
		"DIGITSALPHA", "OPERATORS_FUNCTIONS", "ISNULL", "ISNOTNULL", "INT", "NEWLINE", 
		"WS"
	};
	public static final String[] ruleNames = {
		"T__0", "RESERVEWORD_IF", "RESERVEWORD_THEN", "RESERVEWORD_TRUE", "RESERVEWORD_FALSE", 
		"RESERVEWORD_DATEDIFF", "RESERVEWORD_ISMOSTRECENT", "RESERVEWORD_MOSTRECENT", 
		"LOGICALOPERATORS", "LOGICALOPERATOR_AND", "LOGICALOPERATOR_OR", "ALPHALOWERCASE", 
		"SINGLEALPHALOWERCASE", "ALPHAUPPERCASE", "SINGLEALPHAUPPERCASE", "ALPHA", 
		"SINGLEALPHA", "CONSTANT_PERIOD", "CONSTANT_DASH", "CONSTANTS_UNDERSCORE", 
		"CONSTANT_AND", "CONSTANT_EQUAL", "CONSTANT_NOTEQUAL", "CONSTANT_QUOTE", 
		"CONSTANT_DOUBLEQUOTE", "CONSTANT_COMMA", "CONSTANT_LEFT_ROUNDBRACKET", 
		"CONSTANT_RIGHT_ROUNDBRACKET", "CONSTANT_LEFT_SQUAREBRACKET", "CONSTANT_RIGHT_SQUAREBRACKET", 
		"CONSTANT_LEFT_CURLYBRACKET", "CONSTANT_RIGHT_CURLYBRACKET", "CONSTANT_PERCENT", 
		"CONSTANT_AMPERSAND", "OPERATORS", "OPERATOR_NOT", "FLOAT", "DIGITS", 
		"DIGIT", "PERCENT", "ALPHADIGITS", "DIGITSALPHA", "OPERATORS_FUNCTIONS", 
		"ISNULL", "ISNOTNULL", "INT", "NEWLINE", "WS", "A", "B", "C", "D", "E", 
		"F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
		"T", "U", "V", "W", "X", "Y", "Z"
	};


	public SynRuleLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "SynRule.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	@Override
	public void action(RuleContext _localctx, int ruleIndex, int actionIndex) {
		switch (ruleIndex) {
		case 47: WS_action((RuleContext)_localctx, actionIndex); break;
		}
	}
	private void WS_action(RuleContext _localctx, int actionIndex) {
		switch (actionIndex) {
		case 0: skip();  break;
		}
	}

	public static final String _serializedATN =
		"\2\4\62\u01a5\b\1\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b"+
		"\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20"+
		"\t\20\4\21\t\21\4\22\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27"+
		"\t\27\4\30\t\30\4\31\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36"+
		"\t\36\4\37\t\37\4 \t \4!\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4"+
		"(\t(\4)\t)\4*\t*\4+\t+\4,\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62"+
		"\t\62\4\63\t\63\4\64\t\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4"+
		":\t:\4;\t;\4<\t<\4=\t=\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\4C\tC\4D\tD\4E\t"+
		"E\4F\tF\4G\tG\4H\tH\4I\tI\4J\tJ\4K\tK\3\2\3\2\3\3\3\3\3\3\3\4\3\4\3\4"+
		"\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3"+
		"\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b"+
		"\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\n\3\n\5\n\u00d0\n\n\3\13"+
		"\3\13\3\13\3\13\3\f\3\f\3\f\3\r\6\r\u00da\n\r\r\r\16\r\u00db\3\16\3\16"+
		"\3\17\6\17\u00e1\n\17\r\17\16\17\u00e2\3\20\3\20\3\21\6\21\u00e8\n\21"+
		"\r\21\16\21\u00e9\3\22\3\22\3\23\3\23\3\24\3\24\3\25\3\25\3\26\3\26\3"+
		"\27\3\27\3\30\3\30\3\30\3\31\3\31\3\32\3\32\3\33\3\33\3\34\3\34\3\35\3"+
		"\35\3\36\3\36\3\37\3\37\3 \3 \3!\3!\3\"\3\"\3#\3#\3$\3$\3$\3$\3$\3$\3"+
		"$\3$\3$\5$\u011a\n$\3%\3%\3&\3&\3&\3&\3\'\6\'\u0123\n\'\r\'\16\'\u0124"+
		"\3(\3(\3)\3)\3)\3)\3)\3)\3)\3)\5)\u0131\n)\3*\3*\6*\u0135\n*\r*\16*\u0136"+
		"\3+\3+\5+\u013b\n+\3,\3,\5,\u013f\n,\3-\3-\3-\6-\u0144\n-\r-\16-\u0145"+
		"\3-\3-\3-\3-\3-\3.\3.\3.\6.\u0150\n.\r.\16.\u0151\3.\3.\3.\3.\6.\u0158"+
		"\n.\r.\16.\u0159\3.\3.\3.\3.\3.\3/\6/\u0162\n/\r/\16/\u0163\3\60\5\60"+
		"\u0167\n\60\3\60\3\60\3\61\6\61\u016c\n\61\r\61\16\61\u016d\3\61\3\61"+
		"\3\62\3\62\3\63\3\63\3\64\3\64\3\65\3\65\3\66\3\66\3\67\3\67\38\38\39"+
		"\39\3:\3:\3;\3;\3<\3<\3=\3=\3>\3>\3?\3?\3@\3@\3A\3A\3B\3B\3C\3C\3D\3D"+
		"\3E\3E\3F\3F\3G\3G\3H\3H\3I\3I\3J\3J\3K\3K\2L\3\3\1\5\4\1\7\5\1\t\6\1"+
		"\13\7\1\r\b\1\17\t\1\21\n\1\23\13\1\25\f\1\27\r\1\31\16\1\33\17\1\35\20"+
		"\1\37\21\1!\22\1#\23\1%\24\1\'\25\1)\26\1+\27\1-\30\1/\31\1\61\32\1\63"+
		"\33\1\65\34\1\67\35\19\36\1;\37\1= \1?!\1A\"\1C#\1E$\1G%\1I&\1K\'\1M("+
		"\1O)\1Q*\1S+\1U,\1W-\1Y.\1[/\1]\60\1_\61\1a\62\2c\2\1e\2\1g\2\1i\2\1k"+
		"\2\1m\2\1o\2\1q\2\1s\2\1u\2\1w\2\1y\2\1{\2\1}\2\1\177\2\1\u0081\2\1\u0083"+
		"\2\1\u0085\2\1\u0087\2\1\u0089\2\1\u008b\2\1\u008d\2\1\u008f\2\1\u0091"+
		"\2\1\u0093\2\1\u0095\2\1\3\2#\3c|\3C\\\4C\\c|\4>>@@\3\62;\3\62;\4\13\13"+
		"\"\"\4CCcc\4DDdd\4EEee\4FFff\4GGgg\4HHhh\4IIii\4JJjj\4KKkk\4LLll\4MMm"+
		"m\4NNnn\4OOoo\4PPpp\4QQqq\4RRrr\4SSss\4TTtt\4UUuu\4VVvv\4WWww\4XXxx\4"+
		"YYyy\4ZZzz\4[[{{\4\\\\||\u019f\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t"+
		"\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2"+
		"\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2"+
		"\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2"+
		"+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2"+
		"\2\67\3\2\2\2\29\3\2\2\2\2;\3\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2\2\2\2"+
		"C\3\2\2\2\2E\3\2\2\2\2G\3\2\2\2\2I\3\2\2\2\2K\3\2\2\2\2M\3\2\2\2\2O\3"+
		"\2\2\2\2Q\3\2\2\2\2S\3\2\2\2\2U\3\2\2\2\2W\3\2\2\2\2Y\3\2\2\2\2[\3\2\2"+
		"\2\2]\3\2\2\2\2_\3\2\2\2\2a\3\2\2\2\3\u0097\3\2\2\2\5\u0099\3\2\2\2\7"+
		"\u009c\3\2\2\2\t\u00a1\3\2\2\2\13\u00a6\3\2\2\2\r\u00ac\3\2\2\2\17\u00b5"+
		"\3\2\2\2\21\u00c2\3\2\2\2\23\u00cf\3\2\2\2\25\u00d1\3\2\2\2\27\u00d5\3"+
		"\2\2\2\31\u00d9\3\2\2\2\33\u00dd\3\2\2\2\35\u00e0\3\2\2\2\37\u00e4\3\2"+
		"\2\2!\u00e7\3\2\2\2#\u00eb\3\2\2\2%\u00ed\3\2\2\2\'\u00ef\3\2\2\2)\u00f1"+
		"\3\2\2\2+\u00f3\3\2\2\2-\u00f5\3\2\2\2/\u00f7\3\2\2\2\61\u00fa\3\2\2\2"+
		"\63\u00fc\3\2\2\2\65\u00fe\3\2\2\2\67\u0100\3\2\2\29\u0102\3\2\2\2;\u0104"+
		"\3\2\2\2=\u0106\3\2\2\2?\u0108\3\2\2\2A\u010a\3\2\2\2C\u010c\3\2\2\2E"+
		"\u010e\3\2\2\2G\u0119\3\2\2\2I\u011b\3\2\2\2K\u011d\3\2\2\2M\u0122\3\2"+
		"\2\2O\u0126\3\2\2\2Q\u0130\3\2\2\2S\u0134\3\2\2\2U\u013a\3\2\2\2W\u013e"+
		"\3\2\2\2Y\u0140\3\2\2\2[\u014c\3\2\2\2]\u0161\3\2\2\2_\u0166\3\2\2\2a"+
		"\u016b\3\2\2\2c\u0171\3\2\2\2e\u0173\3\2\2\2g\u0175\3\2\2\2i\u0177\3\2"+
		"\2\2k\u0179\3\2\2\2m\u017b\3\2\2\2o\u017d\3\2\2\2q\u017f\3\2\2\2s\u0181"+
		"\3\2\2\2u\u0183\3\2\2\2w\u0185\3\2\2\2y\u0187\3\2\2\2{\u0189\3\2\2\2}"+
		"\u018b\3\2\2\2\177\u018d\3\2\2\2\u0081\u018f\3\2\2\2\u0083\u0191\3\2\2"+
		"\2\u0085\u0193\3\2\2\2\u0087\u0195\3\2\2\2\u0089\u0197\3\2\2\2\u008b\u0199"+
		"\3\2\2\2\u008d\u019b\3\2\2\2\u008f\u019d\3\2\2\2\u0091\u019f\3\2\2\2\u0093"+
		"\u01a1\3\2\2\2\u0095\u01a3\3\2\2\2\u0097\u0098\7f\2\2\u0098\4\3\2\2\2"+
		"\u0099\u009a\5s:\2\u009a\u009b\5m\67\2\u009b\6\3\2\2\2\u009c\u009d\5\u0089"+
		"E\2\u009d\u009e\5q9\2\u009e\u009f\5k\66\2\u009f\u00a0\5}?\2\u00a0\b\3"+
		"\2\2\2\u00a1\u00a2\5\u0089E\2\u00a2\u00a3\5\u0085C\2\u00a3\u00a4\5\u008b"+
		"F\2\u00a4\u00a5\5k\66\2\u00a5\n\3\2\2\2\u00a6\u00a7\5m\67\2\u00a7\u00a8"+
		"\5c\62\2\u00a8\u00a9\5y=\2\u00a9\u00aa\5\u0087D\2\u00aa\u00ab\5k\66\2"+
		"\u00ab\f\3\2\2\2\u00ac\u00ad\5i\65\2\u00ad\u00ae\5c\62\2\u00ae\u00af\5"+
		"\u0089E\2\u00af\u00b0\5k\66\2\u00b0\u00b1\5i\65\2\u00b1\u00b2\5s:\2\u00b2"+
		"\u00b3\5m\67\2\u00b3\u00b4\5m\67\2\u00b4\16\3\2\2\2\u00b5\u00b6\5s:\2"+
		"\u00b6\u00b7\5\u0087D\2\u00b7\u00b8\5{>\2\u00b8\u00b9\5\177@\2\u00b9\u00ba"+
		"\5\u0087D\2\u00ba\u00bb\5\u0089E\2\u00bb\u00bc\5\u0085C\2\u00bc\u00bd"+
		"\5k\66\2\u00bd\u00be\5g\64\2\u00be\u00bf\5k\66\2\u00bf\u00c0\5}?\2\u00c0"+
		"\u00c1\5\u0089E\2\u00c1\20\3\2\2\2\u00c2\u00c3\5{>\2\u00c3\u00c4\5\177"+
		"@\2\u00c4\u00c5\5\u0087D\2\u00c5\u00c6\5\u0089E\2\u00c6\u00c7\5\u0085"+
		"C\2\u00c7\u00c8\5k\66\2\u00c8\u00c9\5g\64\2\u00c9\u00ca\5k\66\2\u00ca"+
		"\u00cb\5}?\2\u00cb\u00cc\5\u0089E\2\u00cc\22\3\2\2\2\u00cd\u00d0\5\25"+
		"\13\2\u00ce\u00d0\5\27\f\2\u00cf\u00cd\3\2\2\2\u00cf\u00ce\3\2\2\2\u00d0"+
		"\24\3\2\2\2\u00d1\u00d2\5c\62\2\u00d2\u00d3\5}?\2\u00d3\u00d4\5i\65\2"+
		"\u00d4\26\3\2\2\2\u00d5\u00d6\5\177@\2\u00d6\u00d7\5\u0085C\2\u00d7\30"+
		"\3\2\2\2\u00d8\u00da\5\33\16\2\u00d9\u00d8\3\2\2\2\u00da\u00db\3\2\2\2"+
		"\u00db\u00d9\3\2\2\2\u00db\u00dc\3\2\2\2\u00dc\32\3\2\2\2\u00dd\u00de"+
		"\t\2\2\2\u00de\34\3\2\2\2\u00df\u00e1\5\37\20\2\u00e0\u00df\3\2\2\2\u00e1"+
		"\u00e2\3\2\2\2\u00e2\u00e0\3\2\2\2\u00e2\u00e3\3\2\2\2\u00e3\36\3\2\2"+
		"\2\u00e4\u00e5\t\3\2\2\u00e5 \3\2\2\2\u00e6\u00e8\5#\22\2\u00e7\u00e6"+
		"\3\2\2\2\u00e8\u00e9\3\2\2\2\u00e9\u00e7\3\2\2\2\u00e9\u00ea\3\2\2\2\u00ea"+
		"\"\3\2\2\2\u00eb\u00ec\t\4\2\2\u00ec$\3\2\2\2\u00ed\u00ee\7\60\2\2\u00ee"+
		"&\3\2\2\2\u00ef\u00f0\7/\2\2\u00f0(\3\2\2\2\u00f1\u00f2\7a\2\2\u00f2*"+
		"\3\2\2\2\u00f3\u00f4\5\25\13\2\u00f4,\3\2\2\2\u00f5\u00f6\7?\2\2\u00f6"+
		".\3\2\2\2\u00f7\u00f8\7#\2\2\u00f8\u00f9\7?\2\2\u00f9\60\3\2\2\2\u00fa"+
		"\u00fb\5\63\32\2\u00fb\62\3\2\2\2\u00fc\u00fd\7$\2\2\u00fd\64\3\2\2\2"+
		"\u00fe\u00ff\7.\2\2\u00ff\66\3\2\2\2\u0100\u0101\7*\2\2\u01018\3\2\2\2"+
		"\u0102\u0103\7+\2\2\u0103:\3\2\2\2\u0104\u0105\7]\2\2\u0105<\3\2\2\2\u0106"+
		"\u0107\7_\2\2\u0107>\3\2\2\2\u0108\u0109\7}\2\2\u0109@\3\2\2\2\u010a\u010b"+
		"\7\177\2\2\u010bB\3\2\2\2\u010c\u010d\7\'\2\2\u010dD\3\2\2\2\u010e\u010f"+
		"\7(\2\2\u010fF\3\2\2\2\u0110\u011a\7#\2\2\u0111\u0112\7?\2\2\u0112\u011a"+
		"\7?\2\2\u0113\u011a\5/\30\2\u0114\u011a\t\5\2\2\u0115\u0116\7@\2\2\u0116"+
		"\u011a\7?\2\2\u0117\u0118\7>\2\2\u0118\u011a\7?\2\2\u0119\u0110\3\2\2"+
		"\2\u0119\u0111\3\2\2\2\u0119\u0113\3\2\2\2\u0119\u0114\3\2\2\2\u0119\u0115"+
		"\3\2\2\2\u0119\u0117\3\2\2\2\u011aH\3\2\2\2\u011b\u011c\7#\2\2\u011cJ"+
		"\3\2\2\2\u011d\u011e\5M\'\2\u011e\u011f\5%\23\2\u011f\u0120\5M\'\2\u0120"+
		"L\3\2\2\2\u0121\u0123\5O(\2\u0122\u0121\3\2\2\2\u0123\u0124\3\2\2\2\u0124"+
		"\u0122\3\2\2\2\u0124\u0125\3\2\2\2\u0125N\3\2\2\2\u0126\u0127\t\6\2\2"+
		"\u0127P\3\2\2\2\u0128\u0129\5M\'\2\u0129\u012a\7\'\2\2\u012a\u0131\3\2"+
		"\2\2\u012b\u012c\5M\'\2\u012c\u012d\5%\23\2\u012d\u012e\5M\'\2\u012e\u012f"+
		"\7\'\2\2\u012f\u0131\3\2\2\2\u0130\u0128\3\2\2\2\u0130\u012b\3\2\2\2\u0131"+
		"R\3\2\2\2\u0132\u0135\5!\21\2\u0133\u0135\5M\'\2\u0134\u0132\3\2\2\2\u0134"+
		"\u0133\3\2\2\2\u0135\u0136\3\2\2\2\u0136\u0134\3\2\2\2\u0136\u0137\3\2"+
		"\2\2\u0137T\3\2\2\2\u0138\u013b\5M\'\2\u0139\u013b\5!\21\2\u013a\u0138"+
		"\3\2\2\2\u013a\u0139\3\2\2\2\u013bV\3\2\2\2\u013c\u013f\5Y-\2\u013d\u013f"+
		"\5[.\2\u013e\u013c\3\2\2\2\u013e\u013d\3\2\2\2\u013fX\3\2\2\2\u0140\u0141"+
		"\5s:\2\u0141\u0143\5\u0087D\2\u0142\u0144\7\"\2\2\u0143\u0142\3\2\2\2"+
		"\u0144\u0145\3\2\2\2\u0145\u0143\3\2\2\2\u0145\u0146\3\2\2\2\u0146\u0147"+
		"\3\2\2\2\u0147\u0148\5}?\2\u0148\u0149\5\u008bF\2\u0149\u014a\5y=\2\u014a"+
		"\u014b\5y=\2\u014bZ\3\2\2\2\u014c\u014d\5s:\2\u014d\u014f\5\u0087D\2\u014e"+
		"\u0150\7\"\2\2\u014f\u014e\3\2\2\2\u0150\u0151\3\2\2\2\u0151\u014f\3\2"+
		"\2\2\u0151\u0152\3\2\2\2\u0152\u0153\3\2\2\2\u0153\u0154\5}?\2\u0154\u0155"+
		"\5\177@\2\u0155\u0157\5\u0089E\2\u0156\u0158\7\"\2\2\u0157\u0156\3\2\2"+
		"\2\u0158\u0159\3\2\2\2\u0159\u0157\3\2\2\2\u0159\u015a\3\2\2\2\u015a\u015b"+
		"\3\2\2\2\u015b\u015c\5}?\2\u015c\u015d\5\u008bF\2\u015d\u015e\5y=\2\u015e"+
		"\u015f\5y=\2\u015f\\\3\2\2\2\u0160\u0162\t\7\2\2\u0161\u0160\3\2\2\2\u0162"+
		"\u0163\3\2\2\2\u0163\u0161\3\2\2\2\u0163\u0164\3\2\2\2\u0164^\3\2\2\2"+
		"\u0165\u0167\7\17\2\2\u0166\u0165\3\2\2\2\u0166\u0167\3\2\2\2\u0167\u0168"+
		"\3\2\2\2\u0168\u0169\7\f\2\2\u0169`\3\2\2\2\u016a\u016c\t\b\2\2\u016b"+
		"\u016a\3\2\2\2\u016c\u016d\3\2\2\2\u016d\u016b\3\2\2\2\u016d\u016e\3\2"+
		"\2\2\u016e\u016f\3\2\2\2\u016f\u0170\b\61\2\2\u0170b\3\2\2\2\u0171\u0172"+
		"\t\t\2\2\u0172d\3\2\2\2\u0173\u0174\t\n\2\2\u0174f\3\2\2\2\u0175\u0176"+
		"\t\13\2\2\u0176h\3\2\2\2\u0177\u0178\t\f\2\2\u0178j\3\2\2\2\u0179\u017a"+
		"\t\r\2\2\u017al\3\2\2\2\u017b\u017c\t\16\2\2\u017cn\3\2\2\2\u017d\u017e"+
		"\t\17\2\2\u017ep\3\2\2\2\u017f\u0180\t\20\2\2\u0180r\3\2\2\2\u0181\u0182"+
		"\t\21\2\2\u0182t\3\2\2\2\u0183\u0184\t\22\2\2\u0184v\3\2\2\2\u0185\u0186"+
		"\t\23\2\2\u0186x\3\2\2\2\u0187\u0188\t\24\2\2\u0188z\3\2\2\2\u0189\u018a"+
		"\t\25\2\2\u018a|\3\2\2\2\u018b\u018c\t\26\2\2\u018c~\3\2\2\2\u018d\u018e"+
		"\t\27\2\2\u018e\u0080\3\2\2\2\u018f\u0190\t\30\2\2\u0190\u0082\3\2\2\2"+
		"\u0191\u0192\t\31\2\2\u0192\u0084\3\2\2\2\u0193\u0194\t\32\2\2\u0194\u0086"+
		"\3\2\2\2\u0195\u0196\t\33\2\2\u0196\u0088\3\2\2\2\u0197\u0198\t\34\2\2"+
		"\u0198\u008a\3\2\2\2\u0199\u019a\t\35\2\2\u019a\u008c\3\2\2\2\u019b\u019c"+
		"\t\36\2\2\u019c\u008e\3\2\2\2\u019d\u019e\t\37\2\2\u019e\u0090\3\2\2\2"+
		"\u019f\u01a0\t \2\2\u01a0\u0092\3\2\2\2\u01a1\u01a2\t!\2\2\u01a2\u0094"+
		"\3\2\2\2\u01a3\u01a4\t\"\2\2\u01a4\u0096\3\2\2\2\24\2\u00cf\u00db\u00e2"+
		"\u00e9\u0119\u0124\u0130\u0134\u0136\u013a\u013e\u0145\u0151\u0159\u0163"+
		"\u0166\u016d";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
	}
}