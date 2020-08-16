const Trainer = (function() {
    var answer=0;
    var expression=" ";
    function get_int_from_class (el) {
        return parseInt($(el).get(0).value)
    }

    function rand_int(min_val, max_val) {
        min = Math.ceil(min_val);
        max = Math.floor(max_val);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        next: function() {
            var min_val=get_int_from_class(".math_min_val");
            var max_val=get_int_from_class(".math_max_val") + 1;

            var mod_val=get_int_from_class(".math_mod_val");
            if (mod_val===0) {
                mod_val=1;
            };
            var math_signs=$(".math_signs").get(0).value;

            var math_count=get_int_from_class(".math_count");
            if (math_count>5) {
                math_count=5;
            }
            val = rand_int(min_val, max_val);
            val = val - val%mod_val;
            answer=val;
            expression=[val];
            for (var i=0; i<math_count-1;i++){
                val = rand_int(min_val, max_val);
                val = val - val%mod_val;
                sign_ind = rand_int(0, math_signs.length);
                sign = math_signs[sign_ind];
                if (sign==="+") {
                    answer+=val;
                    expression.push(sign)
                    expression.push(val)
                } else if (sign==="-") {
                    answer-=val;
                    expression.push(sign)
                    expression.push(val)
                }
            }
            answer=""+answer;
            $("#expression_to_evaluate").get(0).value = expression.join("");
            Calculator.clickedOn("clear");
        },
        check: function() {
            var user_answer = $("#expression_input").get(0).value;
            if (user_answer===answer) {
                Calculator.highlightCorrect();
                Trainer.next();
                Calculator.clickedOn("clear");
            } else {
                Calculator.highlightError();
            }
        },

    }
})();
