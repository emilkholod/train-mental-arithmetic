const Calculator = (function() {
    var id = 'expression_input';

    function highlightInput(cls, timeout) {
        $('#expression_input').addClass(cls);
        setTimeout(function() {
            $('#expression_input').removeClass(cls);
        }, timeout);
    }

    function translateSymbol(key) {
        switch (key) {
            case 'Decimal':
                return '.';
            case 'Esc':
                return 'Escape';
            default:
                return key;
        }
    }

    function clear() {
        Expression.init();
        document.getElementById(id).value = '';
        highlightInput('highlight-correct-input', 250);
    }

    function remove() {
        Expression.remove();
        document.getElementById(id).value = Expression.render();
        highlightInput('highlight-correct-input', 250);
    }

    function append(key) {
        var was_key_added = Expression.append(key);
        if (was_key_added) {
            document.getElementById(id).value = Expression.render();

            var elem = document.getElementById(id);
            elem.scrollLeft = elem.scrollWidth;

            highlightInput('highlight-correct-input', 250);
        } else {
            console.log('Символ ', key, ' не добавлен в выражение');
            highlightInput('highlight-error', 250);
        }
    }

    return {
        init: function() {
            Expression.init();
        },
        clickedOn: function(key_in) {
            var key = translateSymbol(key_in)
            switch (key) {
                case 'clear':
                case 'Escape':
                    return clear();
                case 'remove':
                case 'Backspace':
                    return remove();
                case 'Next':
                    return Trainer.next();
                case 'Check':
                    return Trainer.check();
                default:
                    return append(key);
            }
        },
        highlightCorrect: function() {
            highlightInput('highlight-correct-input', 500);
        },
        highlightError: function() {
            highlightInput('highlight-error', 500);
        },
    }
})();
