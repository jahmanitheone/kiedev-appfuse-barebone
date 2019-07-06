package com.synodex.qcai.antlr4.rule.util;

import java.util.Arrays;
import org.antlr.v4.runtime.Parser;
import org.antlr.v4.runtime.ParserRuleContext;
import org.apache.log4j.Logger;
import com.synodex.qcai.antlr4.rules.SynRuleParser;

public class AntlrRuleUtil {
	private final static Logger log = Logger.getLogger(AntlrRuleUtil.class);
	public Parser parser;

	public AntlrRuleUtil(Parser parser) {
		this.parser = parser;
	}

	public String showRuleInfo(ParserRuleContext ctx) {
		String templatecontent = "";

		if (ctx.getChildCount() > 0) {
			templatecontent += "-------------------------------------\r\n";
			templatecontent += "ctx.getRuleIndex: " + ctx.getRuleIndex()
					+ " - " + getRuleName(ctx.getRuleIndex()) + "\r\n";
			templatecontent += "-------------------------------------\r\n";
			templatecontent += "ctx.getText=" + ctx.getText() + "\r\n";
			templatecontent += "ctx.getChildCount=" + ctx.getChildCount()
					+ "\r\n";
			templatecontent += showRule(ctx, "Rule");
			templatecontent += showContext(ctx, "Context");
			templatecontent += showID(ctx, "ID");
		}

		return templatecontent;
	}

	public String showBaseInfo() {
		String templatecontent = "";
		templatecontent += showRuleNames();
		templatecontent += showTokenNames();

		return templatecontent;
	}

	private String showRuleNames() {
		String templatecontent = "";
		String rulenames = Arrays.toString(parser.getRuleNames());
		templatecontent += "Rulenames\r\n: " + rulenames;
		templatecontent += "\r\n----\r\n";

		return templatecontent;
	}

	private String showTokenNames() {
		String templatecontent = "";
		String tokens = Arrays.toString(parser.getTokenNames());
		templatecontent += "Tokens\r\n: " + tokens;
		templatecontent += "\r\n----\r\n";

		return templatecontent;
	}

	public String getRuleName(int j) {
		return parser.getRuleNames()[j];
	}

	public String showContext(ParserRuleContext ctx, String cntxname) {
		String templatecontent = "";

		if (ctx.getChildCount() > 0) {
			templatecontent += getRuleName(ctx.getRuleIndex()) + "." + cntxname
					+ "'s--> ";
			for (int j = 0; j < ctx.getChildCount(); j++) {
				templatecontent += "(" + j + ")" + ctx.getChild(j) + " ";
				// ctx.get
			}
			templatecontent += "\r\n";
		}

		return templatecontent;
	}

	public String showRule(ParserRuleContext ctx, String cntxname) {
		String templatecontent = "";
		templatecontent += getRuleName(ctx.getRuleIndex()) + "." + cntxname
				+ "--> ";
		for (int j = 0; j < ctx.getChildCount(); j++) {
			templatecontent += ctx.getChild(j) + " ";
		}
		templatecontent += "\r\n";
		return templatecontent;
	}

	public String showID(ParserRuleContext ctx, String cntxname) {
		String templatecontent = "";
		templatecontent += getRuleName(ctx.getRuleIndex()) + "." + cntxname
				+ "'s--> ";
		for (int j = 0; j < ctx.getChildCount(); j++) {
			templatecontent += "(" + j + ")"
					+ ctx.getToken(SynRuleParser.ALPHA, j) + " ";
			// ctx.get
		}
		templatecontent += "\r\n";
		return templatecontent;
	}

}
