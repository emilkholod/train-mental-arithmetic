const Digits = (function Digits() {
    return {
        name: "Digits",
        check: function(key) {
            var regexp = /^[0-9.-]$/g;
            return regexp.test(key);
        }
    }
})();

const RulesAddingToExpression = (function() {
    return {
        canBeAddAsDigit: function(out, key) {
            var b = Digits.check(key);
            if (out.length == 0) {
                return b;
            }
            return b;
        },
    }
})();

const Expression = (function() {
    var out;
    var arithLevel;
    var currArithLevel;

    function add(type, value) {
        out.push({
            type: type,
            value: value
        });
    }

    function appendToPreviousNumber(key) {
        out[out.length - 1].value += key;
    }

    return {
        init: function() {
            out = [];
            arithLevel = [];
            currArithLevel = 0;
        },
        append: function(key) {
            var was_key_added = true;
            if (RulesAddingToExpression.canBeAddAsDigit(out, key)) {
                if ((out.length == 0) || (out[out.length - 1].type != Digits)) {
                    add(Digits, key);
                } else if (out[out.length - 1].type == Digits) {
                    if (key != '.' || (key === '.' && out[out.length - 1].value.indexOf('.') == -1)) {
                        appendToPreviousNumber(key);
                    } else {
                        console.log('Запятая уже поставлена', key);
                        was_key_added = false;
                    }
                }
            } else {
                console.log('Символ не подходит по правилам', key);
                was_key_added = false;
            }
            return was_key_added;
        },
        getCurrentLevel: function() {
            return currArithLevel;
        },
        getExpression: function() {
            return out;
        },
        remove: function() {
            var lastObj = out[out.length - 1]
            if (lastObj.type == Digits) {
                out[out.length - 1].value = lastObj.value.slice(0, lastObj.value.length - 1);
                if (out[out.length - 1].value.length == 0) {
                    out = out.slice(0, out.length - 1);
                    arithLevel = arithLevel.slice(0, arithLevel.length - 1);
                }
            } else if ([UnaryOperators, BinaryOperators, Brackets.Open, Brackets.Close, Consts].indexOf(lastObj.type) != -1) {
                out = out.slice(0, out.length - 1);
                arithLevel = arithLevel.slice(0, arithLevel.length - 1);
            }
        },
        render: function() {
            var res = ''
            for (var i = 0, l = out.length; i < l; i++) {
                res += (out[i].value);
            }
            return res;
        }
    }
})();
