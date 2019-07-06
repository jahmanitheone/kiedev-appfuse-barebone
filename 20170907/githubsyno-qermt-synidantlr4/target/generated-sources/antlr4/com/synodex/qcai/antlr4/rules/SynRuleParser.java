// Generated from com\synodex\qcai\antlr4\rules\SynRule.g4 by ANTLR 4.0
package com.synodex.qcai.antlr4.rules;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class SynRuleParser extends Parser {
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
	public static final String[] tokenNames = {
		"<INVALID>", "'d'", "RESERVEWORD_IF", "RESERVEWORD_THEN", "RESERVEWORD_TRUE", 
		"RESERVEWORD_FALSE", "RESERVEWORD_DATEDIFF", "RESERVEWORD_ISMOSTRECENT", 
		"RESERVEWORD_MOSTRECENT", "LOGICALOPERATORS", "LOGICALOPERATOR_AND", "LOGICALOPERATOR_OR", 
		"ALPHALOWERCASE", "SINGLEALPHALOWERCASE", "ALPHAUPPERCASE", "SINGLEALPHAUPPERCASE", 
		"ALPHA", "SINGLEALPHA", "'.'", "'-'", "'_'", "CONSTANT_AND", "'='", "'!='", 
		"CONSTANT_QUOTE", "'\"'", "','", "'('", "')'", "'['", "']'", "'{'", "'}'", 
		"'%'", "'&'", "OPERATORS", "OPERATOR_NOT", "FLOAT", "DIGITS", "DIGIT", 
		"PERCENT", "ALPHADIGITS", "DIGITSALPHA", "OPERATORS_FUNCTIONS", "ISNULL", 
		"ISNOTNULL", "INT", "NEWLINE", "WS"
	};
	public static final int
		RULE_synrule = 0, RULE_ruleDeclaration = 1, RULE_assignRuleSynId = 2, 
		RULE_ruleConditions = 3, RULE_ruleAssignment = 4, RULE_synid = 5, RULE_synproperty = 6, 
		RULE_synpropertychars = 7, RULE_sypropertyseperators = 8, RULE_synidproperty = 9, 
		RULE_assignStringSynIdPropertyValue = 10, RULE_assignRuleAssignmentPropertyValue = 11, 
		RULE_synidValues = 12, RULE_synidValue = 13, RULE_synidsSingleValue = 14, 
		RULE_dateDiff = 15, RULE_mostRecent = 16, RULE_isMostRecent = 17;
	public static final String[] ruleNames = {
		"synrule", "ruleDeclaration", "assignRuleSynId", "ruleConditions", "ruleAssignment", 
		"synid", "synproperty", "synpropertychars", "sypropertyseperators", "synidproperty", 
		"assignStringSynIdPropertyValue", "assignRuleAssignmentPropertyValue", 
		"synidValues", "synidValue", "synidsSingleValue", "dateDiff", "mostRecent", 
		"isMostRecent"
	};

	@Override
	public String getGrammarFileName() { return "SynRule.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public SynRuleParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class SynruleContext extends ParserRuleContext {
		public RuleDeclarationContext ruleDeclaration() {
			return getRuleContext(RuleDeclarationContext.class,0);
		}
		public SynruleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synrule; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynrule(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynrule(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynrule(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynruleContext synrule() throws RecognitionException {
		SynruleContext _localctx = new SynruleContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_synrule);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(36); ruleDeclaration();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RuleDeclarationContext extends ParserRuleContext {
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, 0); }
		public RuleConditionsContext ruleConditions() {
			return getRuleContext(RuleConditionsContext.class,0);
		}
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, 0); }
		public AssignRuleSynIdContext assignRuleSynId() {
			return getRuleContext(AssignRuleSynIdContext.class,0);
		}
		public TerminalNode RESERVEWORD_IF() { return getToken(SynRuleParser.RESERVEWORD_IF, 0); }
		public RuleAssignmentContext ruleAssignment() {
			return getRuleContext(RuleAssignmentContext.class,0);
		}
		public TerminalNode RESERVEWORD_THEN() { return getToken(SynRuleParser.RESERVEWORD_THEN, 0); }
		public RuleDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ruleDeclaration; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterRuleDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitRuleDeclaration(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitRuleDeclaration(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RuleDeclarationContext ruleDeclaration() throws RecognitionException {
		RuleDeclarationContext _localctx = new RuleDeclarationContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_ruleDeclaration);
		try {
			setState(52);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(38); match(RESERVEWORD_IF);
				setState(39); assignRuleSynId();
				setState(40); ruleConditions();
				setState(41); match(RESERVEWORD_THEN);
				setState(42); ruleAssignment();
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(44); match(RESERVEWORD_IF);
				setState(45); match(CONSTANT_LEFT_ROUNDBRACKET);
				setState(46); assignRuleSynId();
				setState(47); ruleConditions();
				setState(48); match(CONSTANT_RIGHT_ROUNDBRACKET);
				setState(49); match(RESERVEWORD_THEN);
				setState(50); ruleAssignment();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignRuleSynIdContext extends ParserRuleContext {
		public List<TerminalNode> CONSTANT_RIGHT_ROUNDBRACKET() { return getTokens(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET); }
		public List<TerminalNode> CONSTANT_LEFT_ROUNDBRACKET() { return getTokens(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET); }
		public SynidContext synid() {
			return getRuleContext(SynidContext.class,0);
		}
		public TerminalNode CONSTANT_NOTEQUAL() { return getToken(SynRuleParser.CONSTANT_NOTEQUAL, 0); }
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET(int i) {
			return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, i);
		}
		public TerminalNode RESERVEWORD_FALSE() { return getToken(SynRuleParser.RESERVEWORD_FALSE, 0); }
		public List<AssignRuleSynIdContext> assignRuleSynId() {
			return getRuleContexts(AssignRuleSynIdContext.class);
		}
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET(int i) {
			return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, i);
		}
		public TerminalNode CONSTANT_EQUAL() { return getToken(SynRuleParser.CONSTANT_EQUAL, 0); }
		public List<TerminalNode> CONSTANT_QUOTE() { return getTokens(SynRuleParser.CONSTANT_QUOTE); }
		public TerminalNode RESERVEWORD_TRUE() { return getToken(SynRuleParser.RESERVEWORD_TRUE, 0); }
		public TerminalNode CONSTANT_QUOTE(int i) {
			return getToken(SynRuleParser.CONSTANT_QUOTE, i);
		}
		public AssignRuleSynIdContext assignRuleSynId(int i) {
			return getRuleContext(AssignRuleSynIdContext.class,i);
		}
		public AssignRuleSynIdContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignRuleSynId; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterAssignRuleSynId(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitAssignRuleSynId(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitAssignRuleSynId(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AssignRuleSynIdContext assignRuleSynId() throws RecognitionException {
		AssignRuleSynIdContext _localctx = new AssignRuleSynIdContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_assignRuleSynId);
		int _la;
		try {
			setState(69);
			switch (_input.LA(1)) {
			case ALPHALOWERCASE:
			case ALPHAUPPERCASE:
			case ALPHA:
			case CONSTANT_PERIOD:
			case CONSTANT_DASH:
			case CONSTANTS_UNDERSCORE:
			case ALPHADIGITS:
				enterOuterAlt(_localctx, 1);
				{
				setState(54); synid();
				setState(55);
				_la = _input.LA(1);
				if ( !(_la==CONSTANT_EQUAL || _la==CONSTANT_NOTEQUAL) ) {
				_errHandler.recoverInline(this);
				}
				consume();
				setState(56); match(CONSTANT_QUOTE);
				setState(57);
				_la = _input.LA(1);
				if ( !(_la==RESERVEWORD_TRUE || _la==RESERVEWORD_FALSE) ) {
				_errHandler.recoverInline(this);
				}
				consume();
				setState(58); match(CONSTANT_QUOTE);
				}
				break;
			case RESERVEWORD_THEN:
			case LOGICALOPERATORS:
			case CONSTANT_LEFT_ROUNDBRACKET:
			case CONSTANT_RIGHT_ROUNDBRACKET:
				enterOuterAlt(_localctx, 2);
				{
				setState(66);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==CONSTANT_LEFT_ROUNDBRACKET) {
					{
					{
					setState(60); match(CONSTANT_LEFT_ROUNDBRACKET);
					setState(61); assignRuleSynId();
					setState(62); match(CONSTANT_RIGHT_ROUNDBRACKET);
					}
					}
					setState(68);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RuleConditionsContext extends ParserRuleContext {
		public AssignStringSynIdPropertyValueContext assignStringSynIdPropertyValue(int i) {
			return getRuleContext(AssignStringSynIdPropertyValueContext.class,i);
		}
		public TerminalNode LOGICALOPERATORS(int i) {
			return getToken(SynRuleParser.LOGICALOPERATORS, i);
		}
		public List<TerminalNode> CONSTANT_RIGHT_ROUNDBRACKET() { return getTokens(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET); }
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET(int i) {
			return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, i);
		}
		public List<TerminalNode> CONSTANT_LEFT_ROUNDBRACKET() { return getTokens(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET); }
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET(int i) {
			return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, i);
		}
		public List<AssignStringSynIdPropertyValueContext> assignStringSynIdPropertyValue() {
			return getRuleContexts(AssignStringSynIdPropertyValueContext.class);
		}
		public List<TerminalNode> LOGICALOPERATORS() { return getTokens(SynRuleParser.LOGICALOPERATORS); }
		public RuleConditionsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ruleConditions; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterRuleConditions(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitRuleConditions(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitRuleConditions(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RuleConditionsContext ruleConditions() throws RecognitionException {
		RuleConditionsContext _localctx = new RuleConditionsContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_ruleConditions);
		int _la;
		try {
			setState(95);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(75);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==LOGICALOPERATORS) {
					{
					{
					setState(71); match(LOGICALOPERATORS);
					setState(72); assignStringSynIdPropertyValue();
					}
					}
					setState(77);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(92);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==LOGICALOPERATORS) {
					{
					{
					setState(78); match(LOGICALOPERATORS);
					setState(79); match(CONSTANT_LEFT_ROUNDBRACKET);
					setState(80); assignStringSynIdPropertyValue();
					setState(85);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==LOGICALOPERATORS) {
						{
						{
						setState(81); match(LOGICALOPERATORS);
						setState(82); assignStringSynIdPropertyValue();
						}
						}
						setState(87);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(88); match(CONSTANT_RIGHT_ROUNDBRACKET);
					}
					}
					setState(94);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RuleAssignmentContext extends ParserRuleContext {
		public TerminalNode LOGICALOPERATORS(int i) {
			return getToken(SynRuleParser.LOGICALOPERATORS, i);
		}
		public List<AssignRuleAssignmentPropertyValueContext> assignRuleAssignmentPropertyValue() {
			return getRuleContexts(AssignRuleAssignmentPropertyValueContext.class);
		}
		public List<TerminalNode> LOGICALOPERATORS() { return getTokens(SynRuleParser.LOGICALOPERATORS); }
		public AssignRuleAssignmentPropertyValueContext assignRuleAssignmentPropertyValue(int i) {
			return getRuleContext(AssignRuleAssignmentPropertyValueContext.class,i);
		}
		public RuleAssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ruleAssignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterRuleAssignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitRuleAssignment(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitRuleAssignment(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RuleAssignmentContext ruleAssignment() throws RecognitionException {
		RuleAssignmentContext _localctx = new RuleAssignmentContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_ruleAssignment);
		int _la;
		try {
			setState(107);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(97); assignRuleAssignmentPropertyValue();
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(104);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << ALPHALOWERCASE) | (1L << ALPHAUPPERCASE) | (1L << ALPHA) | (1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE) | (1L << ALPHADIGITS))) != 0)) {
					{
					{
					setState(98); assignRuleAssignmentPropertyValue();
					setState(99); match(LOGICALOPERATORS);
					setState(100); assignRuleAssignmentPropertyValue();
					}
					}
					setState(106);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynidContext extends ParserRuleContext {
		public SynpropertycharsContext synpropertychars(int i) {
			return getRuleContext(SynpropertycharsContext.class,i);
		}
		public List<SynpropertycharsContext> synpropertychars() {
			return getRuleContexts(SynpropertycharsContext.class);
		}
		public SynidContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synid; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynid(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynid(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynid(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynidContext synid() throws RecognitionException {
		SynidContext _localctx = new SynidContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_synid);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(110); 
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,9,_ctx);
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(109); synpropertychars();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(112); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,9,_ctx);
			} while ( _alt!=2 && _alt!=-1 );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynpropertyContext extends ParserRuleContext {
		public SynpropertycharsContext synpropertychars(int i) {
			return getRuleContext(SynpropertycharsContext.class,i);
		}
		public List<SynpropertycharsContext> synpropertychars() {
			return getRuleContexts(SynpropertycharsContext.class);
		}
		public SynpropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synproperty; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynproperty(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynproperty(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynproperty(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynpropertyContext synproperty() throws RecognitionException {
		SynpropertyContext _localctx = new SynpropertyContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_synproperty);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(115); 
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(114); synpropertychars();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(117); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			} while ( _alt!=2 && _alt!=-1 );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynpropertycharsContext extends ParserRuleContext {
		public TerminalNode ALPHAUPPERCASE() { return getToken(SynRuleParser.ALPHAUPPERCASE, 0); }
		public TerminalNode ALPHADIGITS() { return getToken(SynRuleParser.ALPHADIGITS, 0); }
		public SypropertyseperatorsContext sypropertyseperators() {
			return getRuleContext(SypropertyseperatorsContext.class,0);
		}
		public TerminalNode ALPHALOWERCASE() { return getToken(SynRuleParser.ALPHALOWERCASE, 0); }
		public TerminalNode ALPHA() { return getToken(SynRuleParser.ALPHA, 0); }
		public SynpropertycharsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synpropertychars; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynpropertychars(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynpropertychars(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynpropertychars(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynpropertycharsContext synpropertychars() throws RecognitionException {
		SynpropertycharsContext _localctx = new SynpropertycharsContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_synpropertychars);
		try {
			setState(124);
			switch (_input.LA(1)) {
			case ALPHA:
				enterOuterAlt(_localctx, 1);
				{
				setState(119); match(ALPHA);
				}
				break;
			case ALPHALOWERCASE:
				enterOuterAlt(_localctx, 2);
				{
				setState(120); match(ALPHALOWERCASE);
				}
				break;
			case ALPHAUPPERCASE:
				enterOuterAlt(_localctx, 3);
				{
				setState(121); match(ALPHAUPPERCASE);
				}
				break;
			case ALPHADIGITS:
				enterOuterAlt(_localctx, 4);
				{
				setState(122); match(ALPHADIGITS);
				}
				break;
			case CONSTANT_PERIOD:
			case CONSTANT_DASH:
			case CONSTANTS_UNDERSCORE:
				enterOuterAlt(_localctx, 5);
				{
				setState(123); sypropertyseperators();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SypropertyseperatorsContext extends ParserRuleContext {
		public TerminalNode CONSTANTS_UNDERSCORE() { return getToken(SynRuleParser.CONSTANTS_UNDERSCORE, 0); }
		public TerminalNode CONSTANT_PERIOD() { return getToken(SynRuleParser.CONSTANT_PERIOD, 0); }
		public TerminalNode CONSTANT_DASH() { return getToken(SynRuleParser.CONSTANT_DASH, 0); }
		public SypropertyseperatorsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sypropertyseperators; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSypropertyseperators(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSypropertyseperators(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSypropertyseperators(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SypropertyseperatorsContext sypropertyseperators() throws RecognitionException {
		SypropertyseperatorsContext _localctx = new SypropertyseperatorsContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_sypropertyseperators);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(126);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			consume();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynidpropertyContext extends ParserRuleContext {
		public List<SynpropertyContext> synproperty() {
			return getRuleContexts(SynpropertyContext.class);
		}
		public TerminalNode CONSTANT_PERIOD() { return getToken(SynRuleParser.CONSTANT_PERIOD, 0); }
		public SynpropertyContext synproperty(int i) {
			return getRuleContext(SynpropertyContext.class,i);
		}
		public SynidContext synid() {
			return getRuleContext(SynidContext.class,0);
		}
		public SynidpropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synidproperty; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynidproperty(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynidproperty(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynidproperty(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynidpropertyContext synidproperty() throws RecognitionException {
		SynidpropertyContext _localctx = new SynidpropertyContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_synidproperty);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(128); synid();
			setState(129); match(CONSTANT_PERIOD);
			setState(131); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(130); synproperty();
				}
				}
				setState(133); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << ALPHALOWERCASE) | (1L << ALPHAUPPERCASE) | (1L << ALPHA) | (1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE) | (1L << ALPHADIGITS))) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignStringSynIdPropertyValueContext extends ParserRuleContext {
		public SynidpropertyContext synidproperty() {
			return getRuleContext(SynidpropertyContext.class,0);
		}
		public TerminalNode OPERATOR_NOT() { return getToken(SynRuleParser.OPERATOR_NOT, 0); }
		public MostRecentContext mostRecent() {
			return getRuleContext(MostRecentContext.class,0);
		}
		public SynidValuesContext synidValues(int i) {
			return getRuleContext(SynidValuesContext.class,i);
		}
		public TerminalNode CONSTANT_NOTEQUAL() { return getToken(SynRuleParser.CONSTANT_NOTEQUAL, 0); }
		public DateDiffContext dateDiff() {
			return getRuleContext(DateDiffContext.class,0);
		}
		public IsMostRecentContext isMostRecent() {
			return getRuleContext(IsMostRecentContext.class,0);
		}
		public TerminalNode OPERATORS() { return getToken(SynRuleParser.OPERATORS, 0); }
		public AssignRuleSynIdContext assignRuleSynId() {
			return getRuleContext(AssignRuleSynIdContext.class,0);
		}
		public TerminalNode OPERATORS_FUNCTIONS() { return getToken(SynRuleParser.OPERATORS_FUNCTIONS, 0); }
		public TerminalNode CONSTANT_EQUAL() { return getToken(SynRuleParser.CONSTANT_EQUAL, 0); }
		public List<TerminalNode> CONSTANT_QUOTE() { return getTokens(SynRuleParser.CONSTANT_QUOTE); }
		public SynidValueContext synidValue() {
			return getRuleContext(SynidValueContext.class,0);
		}
		public TerminalNode CONSTANT_QUOTE(int i) {
			return getToken(SynRuleParser.CONSTANT_QUOTE, i);
		}
		public List<SynidValuesContext> synidValues() {
			return getRuleContexts(SynidValuesContext.class);
		}
		public AssignStringSynIdPropertyValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignStringSynIdPropertyValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterAssignStringSynIdPropertyValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitAssignStringSynIdPropertyValue(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitAssignStringSynIdPropertyValue(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AssignStringSynIdPropertyValueContext assignStringSynIdPropertyValue() throws RecognitionException {
		AssignStringSynIdPropertyValueContext _localctx = new AssignStringSynIdPropertyValueContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_assignStringSynIdPropertyValue);
		int _la;
		try {
			int _alt;
			setState(180);
			switch ( getInterpreter().adaptivePredict(_input,19,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(135); synidproperty();
				setState(136);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << CONSTANT_EQUAL) | (1L << CONSTANT_NOTEQUAL) | (1L << OPERATORS))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				consume();
				setState(150);
				switch (_input.LA(1)) {
				case LOGICALOPERATORS:
				case ALPHALOWERCASE:
				case SINGLEALPHALOWERCASE:
				case ALPHAUPPERCASE:
				case SINGLEALPHAUPPERCASE:
				case ALPHA:
				case SINGLEALPHA:
				case CONSTANT_PERIOD:
				case CONSTANT_DASH:
				case CONSTANTS_UNDERSCORE:
				case CONSTANT_COMMA:
				case CONSTANT_LEFT_ROUNDBRACKET:
				case CONSTANT_RIGHT_ROUNDBRACKET:
				case CONSTANT_LEFT_SQUAREBRACKET:
				case CONSTANT_RIGHT_SQUAREBRACKET:
				case CONSTANT_LEFT_CURLYBRACKET:
				case CONSTANT_RIGHT_CURLYBRACKET:
				case CONSTANT_PERCENT:
				case CONSTANT_AMPERSAND:
				case FLOAT:
				case DIGITS:
				case DIGIT:
				case PERCENT:
				case ALPHADIGITS:
				case DIGITSALPHA:
					{
					setState(138); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
					do {
						switch (_alt) {
						case 1:
							{
							{
							setState(137); synidValues(0);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						setState(140); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
					} while ( _alt!=2 && _alt!=-1 );
					}
					break;
				case CONSTANT_QUOTE:
					{
					setState(142); match(CONSTANT_QUOTE);
					setState(144); 
					_errHandler.sync(this);
					_la = _input.LA(1);
					do {
						{
						{
						setState(143); synidValues(0);
						}
						}
						setState(146); 
						_errHandler.sync(this);
						_la = _input.LA(1);
					} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LOGICALOPERATORS) | (1L << ALPHALOWERCASE) | (1L << SINGLEALPHALOWERCASE) | (1L << ALPHAUPPERCASE) | (1L << SINGLEALPHAUPPERCASE) | (1L << ALPHA) | (1L << SINGLEALPHA) | (1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE) | (1L << CONSTANT_COMMA) | (1L << CONSTANT_LEFT_ROUNDBRACKET) | (1L << CONSTANT_RIGHT_ROUNDBRACKET) | (1L << CONSTANT_LEFT_SQUAREBRACKET) | (1L << CONSTANT_RIGHT_SQUAREBRACKET) | (1L << CONSTANT_LEFT_CURLYBRACKET) | (1L << CONSTANT_RIGHT_CURLYBRACKET) | (1L << CONSTANT_PERCENT) | (1L << CONSTANT_AMPERSAND) | (1L << FLOAT) | (1L << DIGITS) | (1L << DIGIT) | (1L << PERCENT) | (1L << ALPHADIGITS) | (1L << DIGITSALPHA))) != 0) );
					setState(148); match(CONSTANT_QUOTE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(152); synidproperty();
				setState(153); match(OPERATORS_FUNCTIONS);
				}
				break;

			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(155); dateDiff();
				setState(156); match(OPERATORS);
				setState(157); synidValue();
				}
				break;

			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(159); mostRecent();
				setState(160);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << CONSTANT_EQUAL) | (1L << CONSTANT_NOTEQUAL) | (1L << OPERATORS))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				consume();
				setState(174);
				switch (_input.LA(1)) {
				case LOGICALOPERATORS:
				case ALPHALOWERCASE:
				case SINGLEALPHALOWERCASE:
				case ALPHAUPPERCASE:
				case SINGLEALPHAUPPERCASE:
				case ALPHA:
				case SINGLEALPHA:
				case CONSTANT_PERIOD:
				case CONSTANT_DASH:
				case CONSTANTS_UNDERSCORE:
				case CONSTANT_COMMA:
				case CONSTANT_LEFT_ROUNDBRACKET:
				case CONSTANT_RIGHT_ROUNDBRACKET:
				case CONSTANT_LEFT_SQUAREBRACKET:
				case CONSTANT_RIGHT_SQUAREBRACKET:
				case CONSTANT_LEFT_CURLYBRACKET:
				case CONSTANT_RIGHT_CURLYBRACKET:
				case CONSTANT_PERCENT:
				case CONSTANT_AMPERSAND:
				case FLOAT:
				case DIGITS:
				case DIGIT:
				case PERCENT:
				case ALPHADIGITS:
				case DIGITSALPHA:
					{
					setState(162); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,16,_ctx);
					do {
						switch (_alt) {
						case 1:
							{
							{
							setState(161); synidValues(0);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						setState(164); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,16,_ctx);
					} while ( _alt!=2 && _alt!=-1 );
					}
					break;
				case CONSTANT_QUOTE:
					{
					setState(166); match(CONSTANT_QUOTE);
					setState(168); 
					_errHandler.sync(this);
					_la = _input.LA(1);
					do {
						{
						{
						setState(167); synidValues(0);
						}
						}
						setState(170); 
						_errHandler.sync(this);
						_la = _input.LA(1);
					} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LOGICALOPERATORS) | (1L << ALPHALOWERCASE) | (1L << SINGLEALPHALOWERCASE) | (1L << ALPHAUPPERCASE) | (1L << SINGLEALPHAUPPERCASE) | (1L << ALPHA) | (1L << SINGLEALPHA) | (1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE) | (1L << CONSTANT_COMMA) | (1L << CONSTANT_LEFT_ROUNDBRACKET) | (1L << CONSTANT_RIGHT_ROUNDBRACKET) | (1L << CONSTANT_LEFT_SQUAREBRACKET) | (1L << CONSTANT_RIGHT_SQUAREBRACKET) | (1L << CONSTANT_LEFT_CURLYBRACKET) | (1L << CONSTANT_RIGHT_CURLYBRACKET) | (1L << CONSTANT_PERCENT) | (1L << CONSTANT_AMPERSAND) | (1L << FLOAT) | (1L << DIGITS) | (1L << DIGIT) | (1L << PERCENT) | (1L << ALPHADIGITS) | (1L << DIGITSALPHA))) != 0) );
					setState(172); match(CONSTANT_QUOTE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(176); assignRuleSynId();
				}
				break;

			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(177); isMostRecent();
				}
				break;

			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(178); match(OPERATOR_NOT);
				setState(179); isMostRecent();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignRuleAssignmentPropertyValueContext extends ParserRuleContext {
		public TerminalNode CONSTANT_NOTEQUAL() { return getToken(SynRuleParser.CONSTANT_NOTEQUAL, 0); }
		public SynidpropertyContext synidproperty() {
			return getRuleContext(SynidpropertyContext.class,0);
		}
		public SynidValueContext synidValue(int i) {
			return getRuleContext(SynidValueContext.class,i);
		}
		public TerminalNode OPERATORS() { return getToken(SynRuleParser.OPERATORS, 0); }
		public TerminalNode CONSTANT_EQUAL() { return getToken(SynRuleParser.CONSTANT_EQUAL, 0); }
		public List<SynidValueContext> synidValue() {
			return getRuleContexts(SynidValueContext.class);
		}
		public List<TerminalNode> CONSTANT_QUOTE() { return getTokens(SynRuleParser.CONSTANT_QUOTE); }
		public SynidValuesContext synidValues(int i) {
			return getRuleContext(SynidValuesContext.class,i);
		}
		public TerminalNode CONSTANT_QUOTE(int i) {
			return getToken(SynRuleParser.CONSTANT_QUOTE, i);
		}
		public List<SynidValuesContext> synidValues() {
			return getRuleContexts(SynidValuesContext.class);
		}
		public AssignRuleAssignmentPropertyValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignRuleAssignmentPropertyValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterAssignRuleAssignmentPropertyValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitAssignRuleAssignmentPropertyValue(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitAssignRuleAssignmentPropertyValue(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AssignRuleAssignmentPropertyValueContext assignRuleAssignmentPropertyValue() throws RecognitionException {
		AssignRuleAssignmentPropertyValueContext _localctx = new AssignRuleAssignmentPropertyValueContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_assignRuleAssignmentPropertyValue);
		int _la;
		try {
			int _alt;
			setState(206);
			switch ( getInterpreter().adaptivePredict(_input,24,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(182); synidproperty();
				setState(183);
				_la = _input.LA(1);
				if ( !(_la==CONSTANT_EQUAL || _la==CONSTANT_NOTEQUAL) ) {
				_errHandler.recoverInline(this);
				}
				consume();
				setState(197);
				switch (_input.LA(1)) {
				case LOGICALOPERATORS:
				case ALPHALOWERCASE:
				case SINGLEALPHALOWERCASE:
				case ALPHAUPPERCASE:
				case SINGLEALPHAUPPERCASE:
				case ALPHA:
				case SINGLEALPHA:
				case CONSTANT_PERIOD:
				case CONSTANT_DASH:
				case CONSTANTS_UNDERSCORE:
				case CONSTANT_COMMA:
				case CONSTANT_LEFT_ROUNDBRACKET:
				case CONSTANT_RIGHT_ROUNDBRACKET:
				case CONSTANT_LEFT_SQUAREBRACKET:
				case CONSTANT_RIGHT_SQUAREBRACKET:
				case CONSTANT_LEFT_CURLYBRACKET:
				case CONSTANT_RIGHT_CURLYBRACKET:
				case CONSTANT_PERCENT:
				case CONSTANT_AMPERSAND:
				case FLOAT:
				case DIGITS:
				case DIGIT:
				case PERCENT:
				case ALPHADIGITS:
				case DIGITSALPHA:
					{
					setState(185); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
					do {
						switch (_alt) {
						case 1:
							{
							{
							setState(184); synidValues(0);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						setState(187); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
					} while ( _alt!=2 && _alt!=-1 );
					}
					break;
				case CONSTANT_QUOTE:
					{
					setState(189); match(CONSTANT_QUOTE);
					setState(191); 
					_errHandler.sync(this);
					_la = _input.LA(1);
					do {
						{
						{
						setState(190); synidValues(0);
						}
						}
						setState(193); 
						_errHandler.sync(this);
						_la = _input.LA(1);
					} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LOGICALOPERATORS) | (1L << ALPHALOWERCASE) | (1L << SINGLEALPHALOWERCASE) | (1L << ALPHAUPPERCASE) | (1L << SINGLEALPHAUPPERCASE) | (1L << ALPHA) | (1L << SINGLEALPHA) | (1L << CONSTANT_PERIOD) | (1L << CONSTANT_DASH) | (1L << CONSTANTS_UNDERSCORE) | (1L << CONSTANT_COMMA) | (1L << CONSTANT_LEFT_ROUNDBRACKET) | (1L << CONSTANT_RIGHT_ROUNDBRACKET) | (1L << CONSTANT_LEFT_SQUAREBRACKET) | (1L << CONSTANT_RIGHT_SQUAREBRACKET) | (1L << CONSTANT_LEFT_CURLYBRACKET) | (1L << CONSTANT_RIGHT_CURLYBRACKET) | (1L << CONSTANT_PERCENT) | (1L << CONSTANT_AMPERSAND) | (1L << FLOAT) | (1L << DIGITS) | (1L << DIGIT) | (1L << PERCENT) | (1L << ALPHADIGITS) | (1L << DIGITSALPHA))) != 0) );
					setState(195); match(CONSTANT_QUOTE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(199); synidproperty();
				setState(200); match(OPERATORS);
				setState(202); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,23,_ctx);
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(201); synidValue();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(204); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,23,_ctx);
				} while ( _alt!=2 && _alt!=-1 );
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynidValuesContext extends ParserRuleContext {
		public int _p;
		public TerminalNode DIGIT(int i) {
			return getToken(SynRuleParser.DIGIT, i);
		}
		public List<TerminalNode> ALPHAUPPERCASE() { return getTokens(SynRuleParser.ALPHAUPPERCASE); }
		public TerminalNode ALPHADIGITS(int i) {
			return getToken(SynRuleParser.ALPHADIGITS, i);
		}
		public TerminalNode CONSTANT_PERIOD() { return getToken(SynRuleParser.CONSTANT_PERIOD, 0); }
		public List<TerminalNode> ALPHADIGITS() { return getTokens(SynRuleParser.ALPHADIGITS); }
		public TerminalNode ALPHALOWERCASE(int i) {
			return getToken(SynRuleParser.ALPHALOWERCASE, i);
		}
		public List<TerminalNode> ALPHALOWERCASE() { return getTokens(SynRuleParser.ALPHALOWERCASE); }
		public TerminalNode ALPHAUPPERCASE(int i) {
			return getToken(SynRuleParser.ALPHAUPPERCASE, i);
		}
		public List<TerminalNode> DIGIT() { return getTokens(SynRuleParser.DIGIT); }
		public SynidValueContext synidValue() {
			return getRuleContext(SynidValueContext.class,0);
		}
		public List<TerminalNode> ALPHA() { return getTokens(SynRuleParser.ALPHA); }
		public TerminalNode ALPHA(int i) {
			return getToken(SynRuleParser.ALPHA, i);
		}
		public SynidValuesContext synidValues() {
			return getRuleContext(SynidValuesContext.class,0);
		}
		public SynidValuesContext(ParserRuleContext parent, int invokingState) { super(parent, invokingState); }
		public SynidValuesContext(ParserRuleContext parent, int invokingState, int _p) {
			super(parent, invokingState);
			this._p = _p;
		}
		@Override public int getRuleIndex() { return RULE_synidValues; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynidValues(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynidValues(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynidValues(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynidValuesContext synidValues(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		SynidValuesContext _localctx = new SynidValuesContext(_ctx, _parentState, _p);
		SynidValuesContext _prevctx = _localctx;
		int _startState = 24;
		enterRecursionRule(_localctx, RULE_synidValues);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(209); synidValue();
			}
			_ctx.stop = _input.LT(-1);
			setState(250);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			while ( _alt!=2 && _alt!=-1 ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(248);
					switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
					case 1:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(211);
						if (!(6 >= _localctx._p)) throw new FailedPredicateException(this, "6 >= $_p");
						setState(212); match(CONSTANT_PERIOD);
						setState(214); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(213); match(DIGIT);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(216); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;

					case 2:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(218);
						if (!(5 >= _localctx._p)) throw new FailedPredicateException(this, "5 >= $_p");
						setState(220); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,26,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(219); match(ALPHA);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(222); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,26,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;

					case 3:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(224);
						if (!(4 >= _localctx._p)) throw new FailedPredicateException(this, "4 >= $_p");
						setState(226); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(225); match(ALPHALOWERCASE);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(228); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;

					case 4:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(230);
						if (!(3 >= _localctx._p)) throw new FailedPredicateException(this, "3 >= $_p");
						setState(232); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(231); match(ALPHAUPPERCASE);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(234); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;

					case 5:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(236);
						if (!(2 >= _localctx._p)) throw new FailedPredicateException(this, "2 >= $_p");
						setState(238); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(237); match(ALPHADIGITS);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(240); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;

					case 6:
						{
						_localctx = new SynidValuesContext(_parentctx, _parentState, _p);
						pushNewRecursionContext(_localctx, _startState, RULE_synidValues);
						setState(242);
						if (!(1 >= _localctx._p)) throw new FailedPredicateException(this, "1 >= $_p");
						setState(244); 
						_errHandler.sync(this);
						_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(243); match(DIGIT);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(246); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,30,_ctx);
						} while ( _alt!=2 && _alt!=-1 );
						}
						break;
					}
					} 
				}
				setState(252);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class SynidValueContext extends ParserRuleContext {
		public TerminalNode ALPHAUPPERCASE() { return getToken(SynRuleParser.ALPHAUPPERCASE, 0); }
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, 0); }
		public TerminalNode CONSTANT_RIGHT_CURLYBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_CURLYBRACKET, 0); }
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, 0); }
		public TerminalNode PERCENT() { return getToken(SynRuleParser.PERCENT, 0); }
		public TerminalNode ALPHADIGITS() { return getToken(SynRuleParser.ALPHADIGITS, 0); }
		public TerminalNode CONSTANT_PERIOD() { return getToken(SynRuleParser.CONSTANT_PERIOD, 0); }
		public TerminalNode CONSTANT_AMPERSAND() { return getToken(SynRuleParser.CONSTANT_AMPERSAND, 0); }
		public TerminalNode ALPHALOWERCASE() { return getToken(SynRuleParser.ALPHALOWERCASE, 0); }
		public TerminalNode CONSTANT_PERCENT() { return getToken(SynRuleParser.CONSTANT_PERCENT, 0); }
		public TerminalNode DIGITS() { return getToken(SynRuleParser.DIGITS, 0); }
		public TerminalNode DIGITSALPHA() { return getToken(SynRuleParser.DIGITSALPHA, 0); }
		public TerminalNode CONSTANTS_UNDERSCORE() { return getToken(SynRuleParser.CONSTANTS_UNDERSCORE, 0); }
		public TerminalNode CONSTANT_RIGHT_SQUAREBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_SQUAREBRACKET, 0); }
		public TerminalNode FLOAT() { return getToken(SynRuleParser.FLOAT, 0); }
		public TerminalNode CONSTANT_LEFT_CURLYBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_CURLYBRACKET, 0); }
		public TerminalNode CONSTANT_LEFT_SQUAREBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_SQUAREBRACKET, 0); }
		public TerminalNode LOGICALOPERATORS() { return getToken(SynRuleParser.LOGICALOPERATORS, 0); }
		public SynidsSingleValueContext synidsSingleValue() {
			return getRuleContext(SynidsSingleValueContext.class,0);
		}
		public TerminalNode ALPHA() { return getToken(SynRuleParser.ALPHA, 0); }
		public TerminalNode CONSTANT_DASH() { return getToken(SynRuleParser.CONSTANT_DASH, 0); }
		public TerminalNode CONSTANT_COMMA() { return getToken(SynRuleParser.CONSTANT_COMMA, 0); }
		public SynidValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synidValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynidValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynidValue(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynidValue(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynidValueContext synidValue() throws RecognitionException {
		SynidValueContext _localctx = new SynidValueContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_synidValue);
		try {
			setState(275);
			switch (_input.LA(1)) {
			case ALPHA:
				enterOuterAlt(_localctx, 1);
				{
				setState(253); match(ALPHA);
				}
				break;
			case ALPHADIGITS:
				enterOuterAlt(_localctx, 2);
				{
				setState(254); match(ALPHADIGITS);
				}
				break;
			case ALPHALOWERCASE:
				enterOuterAlt(_localctx, 3);
				{
				setState(255); match(ALPHALOWERCASE);
				}
				break;
			case ALPHAUPPERCASE:
				enterOuterAlt(_localctx, 4);
				{
				setState(256); match(ALPHAUPPERCASE);
				}
				break;
			case DIGITS:
				enterOuterAlt(_localctx, 5);
				{
				setState(257); match(DIGITS);
				}
				break;
			case DIGITSALPHA:
				enterOuterAlt(_localctx, 6);
				{
				setState(258); match(DIGITSALPHA);
				}
				break;
			case FLOAT:
				enterOuterAlt(_localctx, 7);
				{
				setState(259); match(FLOAT);
				}
				break;
			case LOGICALOPERATORS:
				enterOuterAlt(_localctx, 8);
				{
				setState(260); match(LOGICALOPERATORS);
				}
				break;
			case PERCENT:
				enterOuterAlt(_localctx, 9);
				{
				setState(261); match(PERCENT);
				}
				break;
			case CONSTANT_DASH:
				enterOuterAlt(_localctx, 10);
				{
				setState(262); match(CONSTANT_DASH);
				}
				break;
			case CONSTANT_COMMA:
				enterOuterAlt(_localctx, 11);
				{
				setState(263); match(CONSTANT_COMMA);
				}
				break;
			case CONSTANTS_UNDERSCORE:
				enterOuterAlt(_localctx, 12);
				{
				setState(264); match(CONSTANTS_UNDERSCORE);
				}
				break;
			case CONSTANT_PERIOD:
				enterOuterAlt(_localctx, 13);
				{
				setState(265); match(CONSTANT_PERIOD);
				}
				break;
			case CONSTANT_PERCENT:
				enterOuterAlt(_localctx, 14);
				{
				setState(266); match(CONSTANT_PERCENT);
				}
				break;
			case CONSTANT_LEFT_ROUNDBRACKET:
				enterOuterAlt(_localctx, 15);
				{
				setState(267); match(CONSTANT_LEFT_ROUNDBRACKET);
				}
				break;
			case CONSTANT_RIGHT_ROUNDBRACKET:
				enterOuterAlt(_localctx, 16);
				{
				setState(268); match(CONSTANT_RIGHT_ROUNDBRACKET);
				}
				break;
			case CONSTANT_LEFT_SQUAREBRACKET:
				enterOuterAlt(_localctx, 17);
				{
				setState(269); match(CONSTANT_LEFT_SQUAREBRACKET);
				}
				break;
			case CONSTANT_RIGHT_SQUAREBRACKET:
				enterOuterAlt(_localctx, 18);
				{
				setState(270); match(CONSTANT_RIGHT_SQUAREBRACKET);
				}
				break;
			case CONSTANT_LEFT_CURLYBRACKET:
				enterOuterAlt(_localctx, 19);
				{
				setState(271); match(CONSTANT_LEFT_CURLYBRACKET);
				}
				break;
			case CONSTANT_RIGHT_CURLYBRACKET:
				enterOuterAlt(_localctx, 20);
				{
				setState(272); match(CONSTANT_RIGHT_CURLYBRACKET);
				}
				break;
			case CONSTANT_AMPERSAND:
				enterOuterAlt(_localctx, 21);
				{
				setState(273); match(CONSTANT_AMPERSAND);
				}
				break;
			case SINGLEALPHALOWERCASE:
			case SINGLEALPHAUPPERCASE:
			case SINGLEALPHA:
			case DIGIT:
				enterOuterAlt(_localctx, 22);
				{
				setState(274); synidsSingleValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SynidsSingleValueContext extends ParserRuleContext {
		public TerminalNode DIGIT() { return getToken(SynRuleParser.DIGIT, 0); }
		public TerminalNode SINGLEALPHA() { return getToken(SynRuleParser.SINGLEALPHA, 0); }
		public TerminalNode SINGLEALPHAUPPERCASE() { return getToken(SynRuleParser.SINGLEALPHAUPPERCASE, 0); }
		public TerminalNode SINGLEALPHALOWERCASE() { return getToken(SynRuleParser.SINGLEALPHALOWERCASE, 0); }
		public SynidsSingleValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_synidsSingleValue; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterSynidsSingleValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitSynidsSingleValue(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitSynidsSingleValue(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SynidsSingleValueContext synidsSingleValue() throws RecognitionException {
		SynidsSingleValueContext _localctx = new SynidsSingleValueContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_synidsSingleValue);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(277);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SINGLEALPHALOWERCASE) | (1L << SINGLEALPHAUPPERCASE) | (1L << SINGLEALPHA) | (1L << DIGIT))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			consume();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DateDiffContext extends ParserRuleContext {
		public TerminalNode RESERVEWORD_DATEDIFF() { return getToken(SynRuleParser.RESERVEWORD_DATEDIFF, 0); }
		public List<SynidpropertyContext> synidproperty() {
			return getRuleContexts(SynidpropertyContext.class);
		}
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, 0); }
		public TerminalNode CONSTANT_COMMA(int i) {
			return getToken(SynRuleParser.CONSTANT_COMMA, i);
		}
		public SynidpropertyContext synidproperty(int i) {
			return getRuleContext(SynidpropertyContext.class,i);
		}
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, 0); }
		public MostRecentContext mostRecent() {
			return getRuleContext(MostRecentContext.class,0);
		}
		public List<TerminalNode> CONSTANT_QUOTE() { return getTokens(SynRuleParser.CONSTANT_QUOTE); }
		public TerminalNode CONSTANT_QUOTE(int i) {
			return getToken(SynRuleParser.CONSTANT_QUOTE, i);
		}
		public List<TerminalNode> CONSTANT_COMMA() { return getTokens(SynRuleParser.CONSTANT_COMMA); }
		public DateDiffContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dateDiff; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterDateDiff(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitDateDiff(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitDateDiff(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DateDiffContext dateDiff() throws RecognitionException {
		DateDiffContext _localctx = new DateDiffContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_dateDiff);
		try {
			setState(301);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(279); match(RESERVEWORD_DATEDIFF);
				setState(280); match(CONSTANT_LEFT_ROUNDBRACKET);
				setState(281); match(CONSTANT_QUOTE);
				setState(282); match(1);
				setState(283); match(CONSTANT_QUOTE);
				setState(284); match(CONSTANT_COMMA);
				setState(285); synidproperty();
				setState(286); match(CONSTANT_COMMA);
				setState(287); synidproperty();
				setState(288); match(CONSTANT_RIGHT_ROUNDBRACKET);
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(290); match(RESERVEWORD_DATEDIFF);
				setState(291); match(CONSTANT_LEFT_ROUNDBRACKET);
				setState(292); match(CONSTANT_QUOTE);
				setState(293); match(1);
				setState(294); match(CONSTANT_QUOTE);
				setState(295); match(CONSTANT_COMMA);
				setState(296); mostRecent();
				setState(297); match(CONSTANT_COMMA);
				setState(298); synidproperty();
				setState(299); match(CONSTANT_RIGHT_ROUNDBRACKET);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MostRecentContext extends ParserRuleContext {
		public SynidpropertyContext synidproperty() {
			return getRuleContext(SynidpropertyContext.class,0);
		}
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, 0); }
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, 0); }
		public TerminalNode RESERVEWORD_MOSTRECENT() { return getToken(SynRuleParser.RESERVEWORD_MOSTRECENT, 0); }
		public List<TerminalNode> CONSTANT_QUOTE() { return getTokens(SynRuleParser.CONSTANT_QUOTE); }
		public TerminalNode CONSTANT_QUOTE(int i) {
			return getToken(SynRuleParser.CONSTANT_QUOTE, i);
		}
		public MostRecentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_mostRecent; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterMostRecent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitMostRecent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitMostRecent(this);
			else return visitor.visitChildren(this);
		}
	}

	public final MostRecentContext mostRecent() throws RecognitionException {
		MostRecentContext _localctx = new MostRecentContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_mostRecent);
		try {
			setState(315);
			switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(303); match(RESERVEWORD_MOSTRECENT);
				setState(304); match(CONSTANT_LEFT_ROUNDBRACKET);
				setState(305); synidproperty();
				setState(306); match(CONSTANT_RIGHT_ROUNDBRACKET);
				}
				break;

			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(308); match(RESERVEWORD_MOSTRECENT);
				setState(309); match(CONSTANT_LEFT_ROUNDBRACKET);
				setState(310); match(CONSTANT_QUOTE);
				setState(311); synidproperty();
				setState(312); match(CONSTANT_QUOTE);
				setState(313); match(CONSTANT_RIGHT_ROUNDBRACKET);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IsMostRecentContext extends ParserRuleContext {
		public TerminalNode CONSTANT_RIGHT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_RIGHT_ROUNDBRACKET, 0); }
		public TerminalNode CONSTANT_LEFT_ROUNDBRACKET() { return getToken(SynRuleParser.CONSTANT_LEFT_ROUNDBRACKET, 0); }
		public TerminalNode RESERVEWORD_ISMOSTRECENT() { return getToken(SynRuleParser.RESERVEWORD_ISMOSTRECENT, 0); }
		public IsMostRecentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_isMostRecent; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).enterIsMostRecent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof SynRuleListener ) ((SynRuleListener)listener).exitIsMostRecent(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof SynRuleVisitor ) return ((SynRuleVisitor<? extends T>)visitor).visitIsMostRecent(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IsMostRecentContext isMostRecent() throws RecognitionException {
		IsMostRecentContext _localctx = new IsMostRecentContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_isMostRecent);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(317); match(RESERVEWORD_ISMOSTRECENT);
			setState(318); match(CONSTANT_LEFT_ROUNDBRACKET);
			setState(319); match(CONSTANT_RIGHT_ROUNDBRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 12: return synidValues_sempred((SynidValuesContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean synidValues_sempred(SynidValuesContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0: return 6 >= _localctx._p;

		case 1: return 5 >= _localctx._p;

		case 2: return 4 >= _localctx._p;

		case 3: return 3 >= _localctx._p;

		case 4: return 2 >= _localctx._p;

		case 5: return 1 >= _localctx._p;
		}
		return true;
	}

	public static final String _serializedATN =
		"\2\3\62\u0144\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b"+
		"\4\t\t\t\4\n\t\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t"+
		"\20\4\21\t\21\4\22\t\22\4\23\t\23\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3\67\n\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3"+
		"\4\3\4\3\4\7\4C\n\4\f\4\16\4F\13\4\5\4H\n\4\3\5\3\5\7\5L\n\5\f\5\16\5"+
		"O\13\5\3\5\3\5\3\5\3\5\3\5\7\5V\n\5\f\5\16\5Y\13\5\3\5\3\5\7\5]\n\5\f"+
		"\5\16\5`\13\5\5\5b\n\5\3\6\3\6\3\6\3\6\3\6\7\6i\n\6\f\6\16\6l\13\6\5\6"+
		"n\n\6\3\7\6\7q\n\7\r\7\16\7r\3\b\6\bv\n\b\r\b\16\bw\3\t\3\t\3\t\3\t\3"+
		"\t\5\t\177\n\t\3\n\3\n\3\13\3\13\3\13\6\13\u0086\n\13\r\13\16\13\u0087"+
		"\3\f\3\f\3\f\6\f\u008d\n\f\r\f\16\f\u008e\3\f\3\f\6\f\u0093\n\f\r\f\16"+
		"\f\u0094\3\f\3\f\5\f\u0099\n\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f"+
		"\6\f\u00a5\n\f\r\f\16\f\u00a6\3\f\3\f\6\f\u00ab\n\f\r\f\16\f\u00ac\3\f"+
		"\3\f\5\f\u00b1\n\f\3\f\3\f\3\f\3\f\5\f\u00b7\n\f\3\r\3\r\3\r\6\r\u00bc"+
		"\n\r\r\r\16\r\u00bd\3\r\3\r\6\r\u00c2\n\r\r\r\16\r\u00c3\3\r\3\r\5\r\u00c8"+
		"\n\r\3\r\3\r\3\r\6\r\u00cd\n\r\r\r\16\r\u00ce\5\r\u00d1\n\r\3\16\3\16"+
		"\3\16\3\16\3\16\3\16\6\16\u00d9\n\16\r\16\16\16\u00da\3\16\3\16\6\16\u00df"+
		"\n\16\r\16\16\16\u00e0\3\16\3\16\6\16\u00e5\n\16\r\16\16\16\u00e6\3\16"+
		"\3\16\6\16\u00eb\n\16\r\16\16\16\u00ec\3\16\3\16\6\16\u00f1\n\16\r\16"+
		"\16\16\u00f2\3\16\3\16\6\16\u00f7\n\16\r\16\16\16\u00f8\7\16\u00fb\n\16"+
		"\f\16\16\16\u00fe\13\16\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3"+
		"\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\17\5\17\u0116"+
		"\n\17\3\20\3\20\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21"+
		"\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\5\21\u0130\n\21"+
		"\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\5\22\u013e"+
		"\n\22\3\23\3\23\3\23\3\23\3\23\2\24\2\4\6\b\n\f\16\20\22\24\26\30\32\34"+
		"\36 \"$\2\t\3\30\31\3\6\7\3\24\26\4\30\31%%\4\30\31%%\3\30\31\6\17\17"+
		"\21\21\23\23))\u0175\2&\3\2\2\2\4\66\3\2\2\2\6G\3\2\2\2\ba\3\2\2\2\nm"+
		"\3\2\2\2\fp\3\2\2\2\16u\3\2\2\2\20~\3\2\2\2\22\u0080\3\2\2\2\24\u0082"+
		"\3\2\2\2\26\u00b6\3\2\2\2\30\u00d0\3\2\2\2\32\u00d2\3\2\2\2\34\u0115\3"+
		"\2\2\2\36\u0117\3\2\2\2 \u012f\3\2\2\2\"\u013d\3\2\2\2$\u013f\3\2\2\2"+
		"&\'\5\4\3\2\'\3\3\2\2\2()\7\4\2\2)*\5\6\4\2*+\5\b\5\2+,\7\5\2\2,-\5\n"+
		"\6\2-\67\3\2\2\2./\7\4\2\2/\60\7\35\2\2\60\61\5\6\4\2\61\62\5\b\5\2\62"+
		"\63\7\36\2\2\63\64\7\5\2\2\64\65\5\n\6\2\65\67\3\2\2\2\66(\3\2\2\2\66"+
		".\3\2\2\2\67\5\3\2\2\289\5\f\7\29:\t\2\2\2:;\7\32\2\2;<\t\3\2\2<=\7\32"+
		"\2\2=H\3\2\2\2>?\7\35\2\2?@\5\6\4\2@A\7\36\2\2AC\3\2\2\2B>\3\2\2\2CF\3"+
		"\2\2\2DB\3\2\2\2DE\3\2\2\2EH\3\2\2\2FD\3\2\2\2G8\3\2\2\2GD\3\2\2\2H\7"+
		"\3\2\2\2IJ\7\13\2\2JL\5\26\f\2KI\3\2\2\2LO\3\2\2\2MK\3\2\2\2MN\3\2\2\2"+
		"Nb\3\2\2\2OM\3\2\2\2PQ\7\13\2\2QR\7\35\2\2RW\5\26\f\2ST\7\13\2\2TV\5\26"+
		"\f\2US\3\2\2\2VY\3\2\2\2WU\3\2\2\2WX\3\2\2\2XZ\3\2\2\2YW\3\2\2\2Z[\7\36"+
		"\2\2[]\3\2\2\2\\P\3\2\2\2]`\3\2\2\2^\\\3\2\2\2^_\3\2\2\2_b\3\2\2\2`^\3"+
		"\2\2\2aM\3\2\2\2a^\3\2\2\2b\t\3\2\2\2cn\5\30\r\2de\5\30\r\2ef\7\13\2\2"+
		"fg\5\30\r\2gi\3\2\2\2hd\3\2\2\2il\3\2\2\2jh\3\2\2\2jk\3\2\2\2kn\3\2\2"+
		"\2lj\3\2\2\2mc\3\2\2\2mj\3\2\2\2n\13\3\2\2\2oq\5\20\t\2po\3\2\2\2qr\3"+
		"\2\2\2rp\3\2\2\2rs\3\2\2\2s\r\3\2\2\2tv\5\20\t\2ut\3\2\2\2vw\3\2\2\2w"+
		"u\3\2\2\2wx\3\2\2\2x\17\3\2\2\2y\177\7\22\2\2z\177\7\16\2\2{\177\7\20"+
		"\2\2|\177\7+\2\2}\177\5\22\n\2~y\3\2\2\2~z\3\2\2\2~{\3\2\2\2~|\3\2\2\2"+
		"~}\3\2\2\2\177\21\3\2\2\2\u0080\u0081\t\4\2\2\u0081\23\3\2\2\2\u0082\u0083"+
		"\5\f\7\2\u0083\u0085\7\24\2\2\u0084\u0086\5\16\b\2\u0085\u0084\3\2\2\2"+
		"\u0086\u0087\3\2\2\2\u0087\u0085\3\2\2\2\u0087\u0088\3\2\2\2\u0088\25"+
		"\3\2\2\2\u0089\u008a\5\24\13\2\u008a\u0098\t\5\2\2\u008b\u008d\5\32\16"+
		"\2\u008c\u008b\3\2\2\2\u008d\u008e\3\2\2\2\u008e\u008c\3\2\2\2\u008e\u008f"+
		"\3\2\2\2\u008f\u0099\3\2\2\2\u0090\u0092\7\32\2\2\u0091\u0093\5\32\16"+
		"\2\u0092\u0091\3\2\2\2\u0093\u0094\3\2\2\2\u0094\u0092\3\2\2\2\u0094\u0095"+
		"\3\2\2\2\u0095\u0096\3\2\2\2\u0096\u0097\7\32\2\2\u0097\u0099\3\2\2\2"+
		"\u0098\u008c\3\2\2\2\u0098\u0090\3\2\2\2\u0099\u00b7\3\2\2\2\u009a\u009b"+
		"\5\24\13\2\u009b\u009c\7-\2\2\u009c\u00b7\3\2\2\2\u009d\u009e\5 \21\2"+
		"\u009e\u009f\7%\2\2\u009f\u00a0\5\34\17\2\u00a0\u00b7\3\2\2\2\u00a1\u00a2"+
		"\5\"\22\2\u00a2\u00b0\t\6\2\2\u00a3\u00a5\5\32\16\2\u00a4\u00a3\3\2\2"+
		"\2\u00a5\u00a6\3\2\2\2\u00a6\u00a4\3\2\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00b1"+
		"\3\2\2\2\u00a8\u00aa\7\32\2\2\u00a9\u00ab\5\32\16\2\u00aa\u00a9\3\2\2"+
		"\2\u00ab\u00ac\3\2\2\2\u00ac\u00aa\3\2\2\2\u00ac\u00ad\3\2\2\2\u00ad\u00ae"+
		"\3\2\2\2\u00ae\u00af\7\32\2\2\u00af\u00b1\3\2\2\2\u00b0\u00a4\3\2\2\2"+
		"\u00b0\u00a8\3\2\2\2\u00b1\u00b7\3\2\2\2\u00b2\u00b7\5\6\4\2\u00b3\u00b7"+
		"\5$\23\2\u00b4\u00b5\7&\2\2\u00b5\u00b7\5$\23\2\u00b6\u0089\3\2\2\2\u00b6"+
		"\u009a\3\2\2\2\u00b6\u009d\3\2\2\2\u00b6\u00a1\3\2\2\2\u00b6\u00b2\3\2"+
		"\2\2\u00b6\u00b3\3\2\2\2\u00b6\u00b4\3\2\2\2\u00b7\27\3\2\2\2\u00b8\u00b9"+
		"\5\24\13\2\u00b9\u00c7\t\7\2\2\u00ba\u00bc\5\32\16\2\u00bb\u00ba\3\2\2"+
		"\2\u00bc\u00bd\3\2\2\2\u00bd\u00bb\3\2\2\2\u00bd\u00be\3\2\2\2\u00be\u00c8"+
		"\3\2\2\2\u00bf\u00c1\7\32\2\2\u00c0\u00c2\5\32\16\2\u00c1\u00c0\3\2\2"+
		"\2\u00c2\u00c3\3\2\2\2\u00c3\u00c1\3\2\2\2\u00c3\u00c4\3\2\2\2\u00c4\u00c5"+
		"\3\2\2\2\u00c5\u00c6\7\32\2\2\u00c6\u00c8\3\2\2\2\u00c7\u00bb\3\2\2\2"+
		"\u00c7\u00bf\3\2\2\2\u00c8\u00d1\3\2\2\2\u00c9\u00ca\5\24\13\2\u00ca\u00cc"+
		"\7%\2\2\u00cb\u00cd\5\34\17\2\u00cc\u00cb\3\2\2\2\u00cd\u00ce\3\2\2\2"+
		"\u00ce\u00cc\3\2\2\2\u00ce\u00cf\3\2\2\2\u00cf\u00d1\3\2\2\2\u00d0\u00b8"+
		"\3\2\2\2\u00d0\u00c9\3\2\2\2\u00d1\31\3\2\2\2\u00d2\u00d3\b\16\1\2\u00d3"+
		"\u00d4\5\34\17\2\u00d4\u00fc\3\2\2\2\u00d5\u00d6\6\16\2\3\u00d6\u00d8"+
		"\7\24\2\2\u00d7\u00d9\7)\2\2\u00d8\u00d7\3\2\2\2\u00d9\u00da\3\2\2\2\u00da"+
		"\u00d8\3\2\2\2\u00da\u00db\3\2\2\2\u00db\u00fb\3\2\2\2\u00dc\u00de\6\16"+
		"\3\3\u00dd\u00df\7\22\2\2\u00de\u00dd\3\2\2\2\u00df\u00e0\3\2\2\2\u00e0"+
		"\u00de\3\2\2\2\u00e0\u00e1\3\2\2\2\u00e1\u00fb\3\2\2\2\u00e2\u00e4\6\16"+
		"\4\3\u00e3\u00e5\7\16\2\2\u00e4\u00e3\3\2\2\2\u00e5\u00e6\3\2\2\2\u00e6"+
		"\u00e4\3\2\2\2\u00e6\u00e7\3\2\2\2\u00e7\u00fb\3\2\2\2\u00e8\u00ea\6\16"+
		"\5\3\u00e9\u00eb\7\20\2\2\u00ea\u00e9\3\2\2\2\u00eb\u00ec\3\2\2\2\u00ec"+
		"\u00ea\3\2\2\2\u00ec\u00ed\3\2\2\2\u00ed\u00fb\3\2\2\2\u00ee\u00f0\6\16"+
		"\6\3\u00ef\u00f1\7+\2\2\u00f0\u00ef\3\2\2\2\u00f1\u00f2\3\2\2\2\u00f2"+
		"\u00f0\3\2\2\2\u00f2\u00f3\3\2\2\2\u00f3\u00fb\3\2\2\2\u00f4\u00f6\6\16"+
		"\7\3\u00f5\u00f7\7)\2\2\u00f6\u00f5\3\2\2\2\u00f7\u00f8\3\2\2\2\u00f8"+
		"\u00f6\3\2\2\2\u00f8\u00f9\3\2\2\2\u00f9\u00fb\3\2\2\2\u00fa\u00d5\3\2"+
		"\2\2\u00fa\u00dc\3\2\2\2\u00fa\u00e2\3\2\2\2\u00fa\u00e8\3\2\2\2\u00fa"+
		"\u00ee\3\2\2\2\u00fa\u00f4\3\2\2\2\u00fb\u00fe\3\2\2\2\u00fc\u00fa\3\2"+
		"\2\2\u00fc\u00fd\3\2\2\2\u00fd\33\3\2\2\2\u00fe\u00fc\3\2\2\2\u00ff\u0116"+
		"\7\22\2\2\u0100\u0116\7+\2\2\u0101\u0116\7\16\2\2\u0102\u0116\7\20\2\2"+
		"\u0103\u0116\7(\2\2\u0104\u0116\7,\2\2\u0105\u0116\7\'\2\2\u0106\u0116"+
		"\7\13\2\2\u0107\u0116\7*\2\2\u0108\u0116\7\25\2\2\u0109\u0116\7\34\2\2"+
		"\u010a\u0116\7\26\2\2\u010b\u0116\7\24\2\2\u010c\u0116\7#\2\2\u010d\u0116"+
		"\7\35\2\2\u010e\u0116\7\36\2\2\u010f\u0116\7\37\2\2\u0110\u0116\7 \2\2"+
		"\u0111\u0116\7!\2\2\u0112\u0116\7\"\2\2\u0113\u0116\7$\2\2\u0114\u0116"+
		"\5\36\20\2\u0115\u00ff\3\2\2\2\u0115\u0100\3\2\2\2\u0115\u0101\3\2\2\2"+
		"\u0115\u0102\3\2\2\2\u0115\u0103\3\2\2\2\u0115\u0104\3\2\2\2\u0115\u0105"+
		"\3\2\2\2\u0115\u0106\3\2\2\2\u0115\u0107\3\2\2\2\u0115\u0108\3\2\2\2\u0115"+
		"\u0109\3\2\2\2\u0115\u010a\3\2\2\2\u0115\u010b\3\2\2\2\u0115\u010c\3\2"+
		"\2\2\u0115\u010d\3\2\2\2\u0115\u010e\3\2\2\2\u0115\u010f\3\2\2\2\u0115"+
		"\u0110\3\2\2\2\u0115\u0111\3\2\2\2\u0115\u0112\3\2\2\2\u0115\u0113\3\2"+
		"\2\2\u0115\u0114\3\2\2\2\u0116\35\3\2\2\2\u0117\u0118\t\b\2\2\u0118\37"+
		"\3\2\2\2\u0119\u011a\7\b\2\2\u011a\u011b\7\35\2\2\u011b\u011c\7\32\2\2"+
		"\u011c\u011d\7\3\2\2\u011d\u011e\7\32\2\2\u011e\u011f\7\34\2\2\u011f\u0120"+
		"\5\24\13\2\u0120\u0121\7\34\2\2\u0121\u0122\5\24\13\2\u0122\u0123\7\36"+
		"\2\2\u0123\u0130\3\2\2\2\u0124\u0125\7\b\2\2\u0125\u0126\7\35\2\2\u0126"+
		"\u0127\7\32\2\2\u0127\u0128\7\3\2\2\u0128\u0129\7\32\2\2\u0129\u012a\7"+
		"\34\2\2\u012a\u012b\5\"\22\2\u012b\u012c\7\34\2\2\u012c\u012d\5\24\13"+
		"\2\u012d\u012e\7\36\2\2\u012e\u0130\3\2\2\2\u012f\u0119\3\2\2\2\u012f"+
		"\u0124\3\2\2\2\u0130!\3\2\2\2\u0131\u0132\7\n\2\2\u0132\u0133\7\35\2\2"+
		"\u0133\u0134\5\24\13\2\u0134\u0135\7\36\2\2\u0135\u013e\3\2\2\2\u0136"+
		"\u0137\7\n\2\2\u0137\u0138\7\35\2\2\u0138\u0139\7\32\2\2\u0139\u013a\5"+
		"\24\13\2\u013a\u013b\7\32\2\2\u013b\u013c\7\36\2\2\u013c\u013e\3\2\2\2"+
		"\u013d\u0131\3\2\2\2\u013d\u0136\3\2\2\2\u013e#\3\2\2\2\u013f\u0140\7"+
		"\t\2\2\u0140\u0141\7\35\2\2\u0141\u0142\7\36\2\2\u0142%\3\2\2\2&\66DG"+
		"MW^ajmrw~\u0087\u008e\u0094\u0098\u00a6\u00ac\u00b0\u00b6\u00bd\u00c3"+
		"\u00c7\u00ce\u00d0\u00da\u00e0\u00e6\u00ec\u00f2\u00f8\u00fa\u00fc\u0115"+
		"\u012f\u013d";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
	}
}