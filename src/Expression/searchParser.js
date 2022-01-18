// Generated from D:/dev/com-interactive-map\search.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import searchListener from './searchListener.js';
import searchVisitor from './searchVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0014R\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\b9\n\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0007\bC\n\b\f\b",
    "\u000e\bF\u000b\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0002\u0003\u000e\u000e",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u0002\b",
    "\u0003\u0002\u0011\u0012\u0003\u0002\u0012\u0013\u0003\u0002\t\u000e",
    "\u0003\u0002\r\u000e\u0003\u0002\u0004\u0005\u0003\u0002\u0007\b\u0002",
    "L\u0002\u001a\u0003\u0002\u0002\u0002\u0004\u001d\u0003\u0002\u0002",
    "\u0002\u0006\u001f\u0003\u0002\u0002\u0002\b!\u0003\u0002\u0002\u0002",
    "\n%\u0003\u0002\u0002\u0002\f)\u0003\u0002\u0002\u0002\u000e8\u0003",
    "\u0002\u0002\u0002\u0010G\u0003\u0002\u0002\u0002\u0012I\u0003\u0002",
    "\u0002\u0002\u0014K\u0003\u0002\u0002\u0002\u0016M\u0003\u0002\u0002",
    "\u0002\u0018O\u0003\u0002\u0002\u0002\u001a\u001b\u0005\u000e\b\u0002",
    "\u001b\u001c\u0007\u0002\u0002\u0003\u001c\u0003\u0003\u0002\u0002\u0002",
    "\u001d\u001e\t\u0002\u0002\u0002\u001e\u0005\u0003\u0002\u0002\u0002",
    "\u001f \t\u0003\u0002\u0002 \u0007\u0003\u0002\u0002\u0002!\"\u0005",
    "\u0006\u0004\u0002\"#\u0005\u0010\t\u0002#$\u0005\u0006\u0004\u0002",
    "$\t\u0003\u0002\u0002\u0002%&\u0005\u0004\u0003\u0002&\'\u0005\u0012",
    "\n\u0002\'(\u0005\u0004\u0003\u0002(\u000b\u0003\u0002\u0002\u0002)",
    "*\u0005\u0006\u0004\u0002*+\u0005\u0014\u000b\u0002+,\u0005\u0006\u0004",
    "\u0002,\r\u0003\u0002\u0002\u0002-.\b\b\u0001\u0002./\u0007\u000f\u0002",
    "\u0002/0\u0005\u000e\b\u000201\u0007\u0010\u0002\u000219\u0003\u0002",
    "\u0002\u000223\u0007\u0006\u0002\u000239\u0005\u000e\b\t49\u0005\n\u0006",
    "\u000259\u0005\f\u0007\u000269\u0005\b\u0005\u000279\u0005\u0018\r\u0002",
    "8-\u0003\u0002\u0002\u000282\u0003\u0002\u0002\u000284\u0003\u0002\u0002",
    "\u000285\u0003\u0002\u0002\u000286\u0003\u0002\u0002\u000287\u0003\u0002",
    "\u0002\u00029D\u0003\u0002\u0002\u0002:;\f\u0005\u0002\u0002;<\u0005",
    "\u0016\f\u0002<=\u0005\u000e\b\u0006=C\u0003\u0002\u0002\u0002>?\f\u0004",
    "\u0002\u0002?@\u0005\u0014\u000b\u0002@A\u0005\u000e\b\u0005AC\u0003",
    "\u0002\u0002\u0002B:\u0003\u0002\u0002\u0002B>\u0003\u0002\u0002\u0002",
    "CF\u0003\u0002\u0002\u0002DB\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002",
    "\u0002E\u000f\u0003\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002GH\u0007",
    "\u0003\u0002\u0002H\u0011\u0003\u0002\u0002\u0002IJ\t\u0004\u0002\u0002",
    "J\u0013\u0003\u0002\u0002\u0002KL\t\u0005\u0002\u0002L\u0015\u0003\u0002",
    "\u0002\u0002MN\t\u0006\u0002\u0002N\u0017\u0003\u0002\u0002\u0002OP",
    "\t\u0007\u0002\u0002P\u0019\u0003\u0002\u0002\u0002\u00058BD"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class searchParser extends antlr4.Parser {

    static grammarFileName = "search.g4";
    static literalNames = [ null, "'in'", "'and'", "'or'", "'not'", "'true'", 
                            "'false'", "'>'", "'>='", "'<'", "'<='", "'='", 
                            "'!='", "'('", "')'" ];
    static symbolicNames = [ null, "IN", "AND", "OR", "NOT", "TRUE", "FALSE", 
                             "GT", "GE", "LT", "LE", "EQ", "NEQ", "LPAREN", 
                             "RPAREN", "DECIMAL", "IDENTIFIER", "STRING", 
                             "WS" ];
    static ruleNames = [ "parse", "decimalComparable", "stringComparable", 
                         "containsExpression", "decimalCompExpression", 
                         "stringCompExpression", "binaryExpression", "containsOp", 
                         "decimalComparatorOp", "strBinComparatorOp", "binary", 
                         "bool" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = searchParser.ruleNames;
        this.literalNames = searchParser.literalNames;
        this.symbolicNames = searchParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 6:
    	    		return this.binaryExpression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    binaryExpression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 3);
    		case 1:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	parse() {
	    let localctx = new ParseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, searchParser.RULE_parse);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 24;
	        this.binaryExpression(0);
	        this.state = 25;
	        this.match(searchParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decimalComparable() {
	    let localctx = new DecimalComparableContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, searchParser.RULE_decimalComparable);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 27;
	        _la = this._input.LA(1);
	        if(!(_la===searchParser.DECIMAL || _la===searchParser.IDENTIFIER)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stringComparable() {
	    let localctx = new StringComparableContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, searchParser.RULE_stringComparable);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29;
	        _la = this._input.LA(1);
	        if(!(_la===searchParser.IDENTIFIER || _la===searchParser.STRING)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	containsExpression() {
	    let localctx = new ContainsExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, searchParser.RULE_containsExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 31;
	        localctx.left = this.stringComparable();
	        this.state = 32;
	        localctx.op = this.containsOp();
	        this.state = 33;
	        localctx.right = this.stringComparable();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decimalCompExpression() {
	    let localctx = new DecimalCompExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, searchParser.RULE_decimalCompExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 35;
	        localctx.left = this.decimalComparable();
	        this.state = 36;
	        localctx.op = this.decimalComparatorOp();
	        this.state = 37;
	        localctx.right = this.decimalComparable();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stringCompExpression() {
	    let localctx = new StringCompExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, searchParser.RULE_stringCompExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 39;
	        localctx.left = this.stringComparable();
	        this.state = 40;
	        localctx.op = this.strBinComparatorOp();
	        this.state = 41;
	        localctx.right = this.stringComparable();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	binaryExpression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new BinaryExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 12;
	    this.enterRecursionRule(localctx, 12, searchParser.RULE_binaryExpression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new ParenExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 44;
	            this.match(searchParser.LPAREN);
	            this.state = 45;
	            this.binaryExpression(0);
	            this.state = 46;
	            this.match(searchParser.RPAREN);
	            break;

	        case 2:
	            localctx = new NotExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 48;
	            this.match(searchParser.NOT);
	            this.state = 49;
	            this.binaryExpression(7);
	            break;

	        case 3:
	            localctx = new DecimalCompExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 50;
	            this.decimalCompExpression();
	            break;

	        case 4:
	            localctx = new StringCompExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 51;
	            this.stringCompExpression();
	            break;

	        case 5:
	            localctx = new ContainsExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 52;
	            this.containsExpression();
	            break;

	        case 6:
	            localctx = new BoolExpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 53;
	            this.bool();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 66;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 64;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BinExpContext(this, new BinaryExpressionContext(this, _parentctx, _parentState));
	                    localctx.left = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, searchParser.RULE_binaryExpression);
	                    this.state = 56;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 57;
	                    localctx.op = this.binary();
	                    this.state = 58;
	                    localctx.right = this.binaryExpression(4);
	                    break;

	                case 2:
	                    localctx = new BinaryCompExpContext(this, new BinaryExpressionContext(this, _parentctx, _parentState));
	                    localctx.left = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, searchParser.RULE_binaryExpression);
	                    this.state = 60;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 61;
	                    localctx.op = this.strBinComparatorOp();
	                    this.state = 62;
	                    localctx.right = this.binaryExpression(3);
	                    break;

	                } 
	            }
	            this.state = 68;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	containsOp() {
	    let localctx = new ContainsOpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, searchParser.RULE_containsOp);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 69;
	        this.match(searchParser.IN);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decimalComparatorOp() {
	    let localctx = new DecimalComparatorOpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, searchParser.RULE_decimalComparatorOp);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 71;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << searchParser.GT) | (1 << searchParser.GE) | (1 << searchParser.LT) | (1 << searchParser.LE) | (1 << searchParser.EQ) | (1 << searchParser.NEQ))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	strBinComparatorOp() {
	    let localctx = new StrBinComparatorOpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, searchParser.RULE_strBinComparatorOp);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 73;
	        _la = this._input.LA(1);
	        if(!(_la===searchParser.EQ || _la===searchParser.NEQ)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	binary() {
	    let localctx = new BinaryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, searchParser.RULE_binary);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 75;
	        _la = this._input.LA(1);
	        if(!(_la===searchParser.AND || _la===searchParser.OR)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bool() {
	    let localctx = new BoolContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, searchParser.RULE_bool);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 77;
	        _la = this._input.LA(1);
	        if(!(_la===searchParser.TRUE || _la===searchParser.FALSE)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

searchParser.EOF = antlr4.Token.EOF;
searchParser.IN = 1;
searchParser.AND = 2;
searchParser.OR = 3;
searchParser.NOT = 4;
searchParser.TRUE = 5;
searchParser.FALSE = 6;
searchParser.GT = 7;
searchParser.GE = 8;
searchParser.LT = 9;
searchParser.LE = 10;
searchParser.EQ = 11;
searchParser.NEQ = 12;
searchParser.LPAREN = 13;
searchParser.RPAREN = 14;
searchParser.DECIMAL = 15;
searchParser.IDENTIFIER = 16;
searchParser.STRING = 17;
searchParser.WS = 18;

searchParser.RULE_parse = 0;
searchParser.RULE_decimalComparable = 1;
searchParser.RULE_stringComparable = 2;
searchParser.RULE_containsExpression = 3;
searchParser.RULE_decimalCompExpression = 4;
searchParser.RULE_stringCompExpression = 5;
searchParser.RULE_binaryExpression = 6;
searchParser.RULE_containsOp = 7;
searchParser.RULE_decimalComparatorOp = 8;
searchParser.RULE_strBinComparatorOp = 9;
searchParser.RULE_binary = 10;
searchParser.RULE_bool = 11;

class ParseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_parse;
    }

	binaryExpression() {
	    return this.getTypedRuleContext(BinaryExpressionContext,0);
	};

	EOF() {
	    return this.getToken(searchParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterParse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitParse(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitParse(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DecimalComparableContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_decimalComparable;
    }

	DECIMAL() {
	    return this.getToken(searchParser.DECIMAL, 0);
	};

	IDENTIFIER() {
	    return this.getToken(searchParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterDecimalComparable(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitDecimalComparable(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitDecimalComparable(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StringComparableContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_stringComparable;
    }

	STRING() {
	    return this.getToken(searchParser.STRING, 0);
	};

	IDENTIFIER() {
	    return this.getToken(searchParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterStringComparable(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitStringComparable(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitStringComparable(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ContainsExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_containsExpression;
        this.left = null; // StringComparableContext
        this.op = null; // ContainsOpContext
        this.right = null; // StringComparableContext
    }

	stringComparable = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StringComparableContext);
	    } else {
	        return this.getTypedRuleContext(StringComparableContext,i);
	    }
	};

	containsOp() {
	    return this.getTypedRuleContext(ContainsOpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterContainsExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitContainsExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitContainsExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DecimalCompExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_decimalCompExpression;
        this.left = null; // DecimalComparableContext
        this.op = null; // DecimalComparatorOpContext
        this.right = null; // DecimalComparableContext
    }

	decimalComparable = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DecimalComparableContext);
	    } else {
	        return this.getTypedRuleContext(DecimalComparableContext,i);
	    }
	};

	decimalComparatorOp() {
	    return this.getTypedRuleContext(DecimalComparatorOpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterDecimalCompExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitDecimalCompExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitDecimalCompExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StringCompExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_stringCompExpression;
        this.left = null; // StringComparableContext
        this.op = null; // StrBinComparatorOpContext
        this.right = null; // StringComparableContext
    }

	stringComparable = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StringComparableContext);
	    } else {
	        return this.getTypedRuleContext(StringComparableContext,i);
	    }
	};

	strBinComparatorOp() {
	    return this.getTypedRuleContext(StrBinComparatorOpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterStringCompExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitStringCompExpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitStringCompExpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BinaryExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_binaryExpression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class BinExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        this.left = null; // BinaryExpressionContext;
        this.op = null; // BinaryContext;
        this.right = null; // BinaryExpressionContext;
        super.copyFrom(ctx);
    }

	binaryExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BinaryExpressionContext);
	    } else {
	        return this.getTypedRuleContext(BinaryExpressionContext,i);
	    }
	};

	binary() {
	    return this.getTypedRuleContext(BinaryContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterBinExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitBinExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitBinExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.BinExpContext = BinExpContext;

class BinaryCompExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        this.left = null; // BinaryExpressionContext;
        this.op = null; // StrBinComparatorOpContext;
        this.right = null; // BinaryExpressionContext;
        super.copyFrom(ctx);
    }

	binaryExpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BinaryExpressionContext);
	    } else {
	        return this.getTypedRuleContext(BinaryExpressionContext,i);
	    }
	};

	strBinComparatorOp() {
	    return this.getTypedRuleContext(StrBinComparatorOpContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterBinaryCompExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitBinaryCompExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitBinaryCompExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.BinaryCompExpContext = BinaryCompExpContext;

class ParenExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(searchParser.LPAREN, 0);
	};

	binaryExpression() {
	    return this.getTypedRuleContext(BinaryExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(searchParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterParenExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitParenExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitParenExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.ParenExpContext = ParenExpContext;

class BoolExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	bool() {
	    return this.getTypedRuleContext(BoolContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterBoolExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitBoolExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitBoolExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.BoolExpContext = BoolExpContext;

class DecimalCompExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	decimalCompExpression() {
	    return this.getTypedRuleContext(DecimalCompExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterDecimalCompExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitDecimalCompExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitDecimalCompExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.DecimalCompExpContext = DecimalCompExpContext;

class ContainsExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	containsExpression() {
	    return this.getTypedRuleContext(ContainsExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterContainsExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitContainsExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitContainsExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.ContainsExpContext = ContainsExpContext;

class NotExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(searchParser.NOT, 0);
	};

	binaryExpression() {
	    return this.getTypedRuleContext(BinaryExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterNotExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitNotExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitNotExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.NotExpContext = NotExpContext;

class StringCompExpContext extends BinaryExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	stringCompExpression() {
	    return this.getTypedRuleContext(StringCompExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterStringCompExp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitStringCompExp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitStringCompExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

searchParser.StringCompExpContext = StringCompExpContext;

class ContainsOpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_containsOp;
    }

	IN() {
	    return this.getToken(searchParser.IN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterContainsOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitContainsOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitContainsOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DecimalComparatorOpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_decimalComparatorOp;
    }

	GT() {
	    return this.getToken(searchParser.GT, 0);
	};

	GE() {
	    return this.getToken(searchParser.GE, 0);
	};

	LT() {
	    return this.getToken(searchParser.LT, 0);
	};

	LE() {
	    return this.getToken(searchParser.LE, 0);
	};

	EQ() {
	    return this.getToken(searchParser.EQ, 0);
	};

	NEQ() {
	    return this.getToken(searchParser.NEQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterDecimalComparatorOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitDecimalComparatorOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitDecimalComparatorOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StrBinComparatorOpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_strBinComparatorOp;
    }

	EQ() {
	    return this.getToken(searchParser.EQ, 0);
	};

	NEQ() {
	    return this.getToken(searchParser.NEQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterStrBinComparatorOp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitStrBinComparatorOp(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitStrBinComparatorOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BinaryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_binary;
    }

	AND() {
	    return this.getToken(searchParser.AND, 0);
	};

	OR() {
	    return this.getToken(searchParser.OR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterBinary(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitBinary(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitBinary(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BoolContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = searchParser.RULE_bool;
    }

	TRUE() {
	    return this.getToken(searchParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(searchParser.FALSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.enterBool(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof searchListener ) {
	        listener.exitBool(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof searchVisitor ) {
	        return visitor.visitBool(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




searchParser.ParseContext = ParseContext; 
searchParser.DecimalComparableContext = DecimalComparableContext; 
searchParser.StringComparableContext = StringComparableContext; 
searchParser.ContainsExpressionContext = ContainsExpressionContext; 
searchParser.DecimalCompExpressionContext = DecimalCompExpressionContext; 
searchParser.StringCompExpressionContext = StringCompExpressionContext; 
searchParser.BinaryExpressionContext = BinaryExpressionContext; 
searchParser.ContainsOpContext = ContainsOpContext; 
searchParser.DecimalComparatorOpContext = DecimalComparatorOpContext; 
searchParser.StrBinComparatorOpContext = StrBinComparatorOpContext; 
searchParser.BinaryContext = BinaryContext; 
searchParser.BoolContext = BoolContext; 
