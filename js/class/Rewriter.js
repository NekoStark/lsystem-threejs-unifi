function Rewriter(rules) {
  this.rules = rules;

  this.rewrite = function(params) {
		var result = params.axiom;
    for(var i = 0; i < params.iterations; i++) {
      var localResult = "";
      for(var j = 0; j < result.length; j++) {
        var char = result.charAt(j);
        var rule = this.rules[char];
        if(rule !== undefined) {
            if(Array.isArray(rule)) {
              localResult += stochasticRule(rule);
            } else {
              localResult += rule;
            }
        } else {
          localResult += char;
        }
  		}
      result = localResult;
    }
		return result;
  };

}

function stochasticRule(rules) {
  console.log('ciao')
  var probability = rules.length;
  var choice = parseInt( (((Math.random() * probability) + 1) * 1000) / 1000 ) - 1;

  return rules[choice];
}
