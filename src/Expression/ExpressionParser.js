import antlr4 from "antlr4";
import searchLexer from "./searchLexer";
import searchParser from "./searchParser";
import searchVisitor from "./searchVisitor";
import {ConsoleErrorListener} from "antlr4/src/antlr4/error/ErrorListener";


const identifierToGetter = (identifier) => {
    switch (identifier) {
        case "name":
            return {
                evaluate: (item) => {
                    if(item.name) {
                        return item.name.toLowerCase()
                    } else {
                        return ""
                    }
                }
            }
        case "description":
            return {
                evaluate: (item) => {
                    return item.description.toLowerCase()
                }
            }
        case "flags":
            return {
                evaluate: (item) => {
                    return item.flags
                }
            }
        case "id":
            return {
                evaluate: (item) => {
                    return item.item.toLowerCase()
                }
            }
        default:
            throw new Error(`unknown identifier ${identifier}`)
    }
}

const expectSingleResult = (result) => {
    if(result instanceof Array && result.length === 1) {
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
            const finalResult = stringResult.substring(1, stringResult.length-1)
            return {
                evaluate: (item) => {
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
                evaluate: (item) => decimalResult
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
            evaluate: (item) => {
                return result
            }
        }
    }

    visitContainsExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.strCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.strCompExpVisitor))
        return {
            evaluate: (item) => {
                return right.evaluate(item).includes(left.evaluate(item))
            }
        }
    }

    visitStringCompExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.strCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.strCompExpVisitor))
        const op = ctx.op.getChild(0).symbol.type

        if (op === searchLexer.EQ) {
            return {
                evaluate: (item) => {
                    return left.evaluate(item) === right.evaluate(item)
                }
            }
        } else if (op === searchLexer.NEQ) {
            return {
                evaluate: (item) => {
                    return left.evaluate(item) !== right.evaluate(item)
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
                    evaluate: (item) => {
                        return left.evaluate(item) && right.evaluate(item)
                    }
                }
            case searchLexer.OR:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) || right.evaluate(item)
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

        switch (op) {
            case searchLexer.EQ:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) === right.evaluate(item)
                    }
                }
            case searchLexer.NEQ:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) !== right.evaluate(item)
                    }
                }
            default:
                throw new Error(`unsupported binary comparator operation ${ctx.op.getText()}`)
        }
    }

    visitDecimalCompExpression(ctx) {
        const left = expectSingleResult(ctx.left.accept(this.decimalCompExpVisitor))
        const right = expectSingleResult(ctx.right.accept(this.decimalCompExpVisitor))
        const op = ctx.op.getChild(0).symbol.type

        switch (op) {
            case searchLexer.GT:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) > right.evaluate(item)
                    }
                }
            case searchLexer.GE:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) >= right.evaluate(item)
                    }
                }
            case searchLexer.LT:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) < right.evaluate(item)
                    }
                }
            case searchLexer.LE:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) <= right.evaluate(item)
                    }
                }
            case searchLexer.EQ:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) === right.evaluate(item)
                    }
                }
            case searchLexer.NEQ:
                return {
                    evaluate: (item) => {
                        return left.evaluate(item) !== right.evaluate(item)
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

export const parseExpression = (expression) => {
    const chars = new antlr4.InputStream(expression)
    const lexer = new searchLexer(chars)
    const tokens = new antlr4.CommonTokenStream(lexer)
    const parser = new searchParser(tokens)

    lexer.removeErrorListeners()
    parser.removeErrorListeners()

    try {
        const tree = parser.parse()
        const visitor = new exprVisitor()
        return expectSingleResult(tree.accept(visitor)[0])
    } catch (e) {
        return undefined
    }
}