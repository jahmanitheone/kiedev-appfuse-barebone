// Generated from com\synodex\qcai\antlr4\rules\SynRule.g4 by ANTLR 4.0
package com.synodex.qcai.antlr4.rules;
import org.antlr.v4.runtime.tree.*;
import org.antlr.v4.runtime.Token;

public interface SynRuleVisitor<T> extends ParseTreeVisitor<T> {
	T visitSynidproperty(SynRuleParser.SynidpropertyContext ctx);

	T visitAssignStringSynIdPropertyValue(SynRuleParser.AssignStringSynIdPropertyValueContext ctx);

	T visitMostRecent(SynRuleParser.MostRecentContext ctx);

	T visitRuleAssignment(SynRuleParser.RuleAssignmentContext ctx);

	T visitSypropertyseperators(SynRuleParser.SypropertyseperatorsContext ctx);

	T visitSynid(SynRuleParser.SynidContext ctx);

	T visitRuleDeclaration(SynRuleParser.RuleDeclarationContext ctx);

	T visitDateDiff(SynRuleParser.DateDiffContext ctx);

	T visitRuleConditions(SynRuleParser.RuleConditionsContext ctx);

	T visitIsMostRecent(SynRuleParser.IsMostRecentContext ctx);

	T visitSynrule(SynRuleParser.SynruleContext ctx);

	T visitSynproperty(SynRuleParser.SynpropertyContext ctx);

	T visitAssignRuleSynId(SynRuleParser.AssignRuleSynIdContext ctx);

	T visitSynpropertychars(SynRuleParser.SynpropertycharsContext ctx);

	T visitAssignRuleAssignmentPropertyValue(SynRuleParser.AssignRuleAssignmentPropertyValueContext ctx);

	T visitSynidValue(SynRuleParser.SynidValueContext ctx);

	T visitSynidsSingleValue(SynRuleParser.SynidsSingleValueContext ctx);

	T visitSynidValues(SynRuleParser.SynidValuesContext ctx);
}