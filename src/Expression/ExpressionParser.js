import antlr4 from "antlr4";
import searchLexer from "./searchLexer";
import searchParser from "./searchParser";
import searchVisitor from "./searchVisitor";
import searchListener from "./searchListener";
import {valueGetters} from "../Data/valueGetters"
import {DECIMAL, IDENTIFIER, OPERATOR, STRING} from "./constants";

const identifierToGetter = (identifier) => {
    switch (identifier) {
        case "name":
            return {
                evaluate: (item, lang) => {
                    if(!item) {
                        return ""
                    }
                    if (item.name) {
                        return item.name.toLowerCase()
                    } else {
                        return ""
                    }
                }
            }
        case "description":
            return {
                evaluate: (item, lang) => {
                    return item.description.toLowerCase()
                }
            }
        case "flags":
            return {
                evaluate: (item, lang) => {
                    return item.flags
                }
            }
        case "id":
            return {
                evaluate: (item, lang) => {
                    return item.item.toLowerCase()
                }
            }
        default:
            if(identifier.startsWith("req.") || identifier.startsWith("prot.") || identifier.startsWith("dam.")) {
                if(valueGetters.hasOwnProperty(identifier)) {
                    return {
                        evaluate: (item, lang) => {
                            if(item.hasOwnProperty("values")) {
                                for(const getter of valueGetters[identifier][lang]) {
                                    for(const [valueName, value] of item.values) {
                                        if (valueName === getter) {
                                            return value
                                        }
                                    }
                                }
                            }
                            return undefined
                        }
                    }
                }
            }
            throw new Error(`unknown identifier ${identifier}`)
    }
}

const expectSingleResult = (result) => {
    if (result instanceof Array && result.length === 1) {
        return result[0]
    } else if (result) {
        return result
    } else {
        throw new Error("result not returned")
    }

}

class StringCompExpArgsVisitor extends searchVisitor {
    visitTerminal(ctx) {
        if (ctx.symbol.type === searchLexer.STRING) {
            const stringResult = ctx.getText()
            const finalResult = stringResult.substring(1, stringResult.length - 1)
            return {
                evaluate: (item, lang) => {
                    return finalResult
                }
            }
        } else if (ctx.symbol.type === searchLexer.IDENTIFIER) {
            return identifierToGetter(ctx.getText())
        } else {
            throw new Error(`unsupported terminal node ${ctx.getText()}`)
        }
    }
}

class DecimalCompExpArgsVisitor extends searchVisitor {
    visitTerminal(ctx) {
        if (ctx.symbol.type === searchLexer.DECIMAL) {
            const decimalResult = parseFloat(ctx.getText())
            return {
                evaluate: (item, lang) => decimalResult
            }
        } else if (ctx.symbol.type === searchLexer.IDENTIFIER) {
            return identifierToGetter(ctx.getText())
        } else {
            throw new Error(`unsupported terminal node ${ctx.getText()}`)
        }
    }
}

class exprVisitor extends searchVisitor {
    constructor() {
        super();
        this.strCompExpVisitor = new StringCompExpArgsVisitor()
        this.decimalCompExpVisitor = new DecimalCompExpArgsVisitor()
    }

    visitBoolExp(ctx) {
        const result = ctx.getText() === "true"
        return {
            evaluate: (item, lang) => {
                return result
            }
        }
    }

    visitContainsExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.strCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.strCompExpVisitor))
        return {
            evaluate: (item, lang) => {
                return right.evaluate(item, lang).includes(left.evaluate(item, lang))
            }
        }
    }

    visitStringCompExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.strCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.strCompExpVisitor))
        const op = ctx.op.getChild(0).symbol.type

        if (op === searchLexer.EQ) {
            return {
                evaluate: (item, lang) => {
                    return left.evaluate(item, lang) === right.evaluate(item, lang)
                }
            }
        } else if (op === searchLexer.NEQ) {
            return {
                evaluate: (item, lang) => {
                    return left.evaluate(item, lang) !== right.evaluate(item, lang)
                }
            }
        }
    }

    visitBinExp(ctx) {
        const op = ctx.op.getChild(0).symbol.type
        const left = expectSingleResult(ctx.left.accept(this))
        const right = expectSingleResult(ctx.right.accept(this))

        switch (op) {
            case searchLexer.AND:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) && right.evaluate(item, lang)
                    }
                }
            case searchLexer.OR:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) || right.evaluate(item, lang)
                    }
                }
            default:
                throw new Error(`unsupported binary operation ${ctx.op.getText()}`)
        }
    }

    visitBinaryCompExp(ctx) {
        const left = expectSingleResult(ctx.left.accept(this))
        const right = expectSingleResult(ctx.right.accept(this))
        const op = ctx.op.getChild(0).symbol.type

        if(!(left && right)) {
            throw new Error(`left or right operand of '${op}' is missing`)
        }

        switch (op) {
            case searchLexer.EQ:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) === right.evaluate(item, lang)
                    }
                }
            case searchLexer.NEQ:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) !== right.evaluate(item, lang)
                    }
                }
            default:
                throw new Error(`unsupported binary comparator operation ${ctx.op.getText()}`)
        }
    }

    visitNotExp(ctx) {
        const right = expectSingleResult(ctx.getChild(1).accept(this))

        if(!right) {
            throw new Error("operand of 'not' is missing")
        }

        return {
            evaluate: (item, lang) => {
                return !right.evaluate(item, lang)
            }
        }
    }

    visitDecimalCompExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.decimalCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.decimalCompExpVisitor))
        const op = ctx.op.getChild(0).symbol.type

        if(!(left && right)) {
            throw new Error(`left or right operand of '${op}' is missing`)
        }

        switch (op) {
            case searchLexer.GT:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) > right.evaluate(item, lang)
                    }
                }
            case searchLexer.GE:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) >= right.evaluate(item, lang)
                    }
                }
            case searchLexer.LT:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) < right.evaluate(item, lang)
                    }
                }
            case searchLexer.LE:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) <= right.evaluate(item, lang)
                    }
                }
            case searchLexer.EQ:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) === right.evaluate(item, lang)
                    }
                }
            case searchLexer.NEQ:
                return {
                    evaluate: (item, lang) => {
                        return left.evaluate(item, lang) !== right.evaluate(item, lang)
                    }
                }
            default:
                throw new Error(`unsupported binary decimal operation ${ctx.op.getText()}`)
        }
    }

    visitErrorNode(ctx) {
        throw Error("error in expression")
    }
}

class HighlightListener extends searchListener {
    constructor() {
        super();
        this.highlight = []
    }

    visitTerminal(node) {
        switch (node.symbol.type) {
            case searchLexer.DECIMAL:
                this.highlight.push(
                    {
                        type: DECIMAL,
                        start: node.symbol.start,
                        stop: node.symbol.stop
                    }
                )
                break;
            case searchLexer.STRING:
                this.highlight.push(
                    {
                        type: STRING,
                        start: node.symbol.start,
                        stop: node.symbol.stop
                    }
                )
                break;
            case searchLexer.IDENTIFIER:
                this.highlight.push(
                    {
                        type: IDENTIFIER,
                        start: node.symbol.start,
                        stop: node.symbol.stop
                    }
                )
                break;
            case searchLexer.IN:
            case searchLexer.AND:
            case searchLexer.OR:
            case searchLexer.NOT:
            case searchLexer.TRUE:
            case searchLexer.FALSE:
            case searchLexer.GT:
            case searchLexer.GE:
            case searchLexer.LT:
            case searchLexer.LE:
            case searchLexer.EQ:
            case searchLexer.NEQ:
                this.highlight.push(
                    {
                        type: OPERATOR,
                        start: node.symbol.start,
                        stop: node.symbol.stop
                    }
                )
                break;
            default:
                break;
        }
    }

    visitErrorNode(node) {

    }
}


export const parseExpression = (expression) => {
    const chars = new antlr4.InputStream(expression)
    const lexer = new searchLexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)
    const parser = new searchParser(tokens)

    lexer.removeErrorListeners()
    parser.removeErrorListeners()

    const highlight = new HighlightListener()
    parser.addParseListener(highlight)

    try {
        const tree = parser.parse()
        const visitor = new exprVisitor()
        return {
            highlight: highlight.highlight,
            predicate: expectSingleResult(tree.accept(visitor)[0]),
        }
    } catch (e) {
        return {
            highlight: highlight.highlight,
            predicate: {
                evaluate: () => false
            },
        }
    }
}