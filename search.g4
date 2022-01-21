grammar search;

parse
 : binaryExpression EOF
 ;

decimalComparable : DECIMAL | IDENTIFIER;
stringComparable : STRING | IDENTIFIER;

containsExpression : left=stringComparable op=containsOp right=stringComparable;
decimalCompExpression : left=decimalComparable op=decimalComparatorOp right=decimalComparable;
stringCompExpression : left=stringComparable op=strBinComparatorOp right=stringComparable;

binaryExpression
 : LPAREN binaryExpression RPAREN                                       #parenExp
 | NOT binaryExpression                                                 #notExp
 | decimalCompExpression                                                #decimalCompExp
 | stringCompExpression                                                 #stringCompExp
 | containsExpression                                                   #containsExp
 | left=binaryExpression op=binary right=binaryExpression               #binExp
 | left=binaryExpression op=strBinComparatorOp right=binaryExpression   #binaryCompExp
 | bool                                                                 #boolExp
 ;

containsOp
 : IN
 ;

decimalComparatorOp
 : GT | GE | LT | LE | EQ | NEQ
 ;

strBinComparatorOp : EQ | NEQ;

binary
 : AND | OR
 ;

bool
 : TRUE | FALSE
 ;


IN         : 'in' ;
AND        : 'and' ;
OR         : 'or' ;
NOT        : 'not';
TRUE       : 'true' ;
FALSE      : 'false' ;
GT         : '>' ;
GE         : '>=' ;
LT         : '<' ;
LE         : '<=' ;
EQ         : '=' ;
NEQ        : '!=' ;
LPAREN     : '(' ;
RPAREN     : ')' ;
DECIMAL    : '-'? [0-9]+ ( '.' [0-9]+ )? ;
IDENTIFIER : [a-zA-Z_.] [a-zA-Z_0-9.]* ;
STRING : '"' .*? '"' ;
WS         : [ \r\t\u000C\n]+ -> channel(HIDDEN);
