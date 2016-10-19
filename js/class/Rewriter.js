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
            localResult += getRule(rule);
        } else {
          localResult += char;
        }
  		}
      result = localResult;
    }
		return result;
  };

}

function getRule(rules) {
  var probability = rules.length;
  var choice = probability > 1 ?
      parseInt( (((Math.random() * probability) + 1) * 1000) / 1000 ) - 1 : 0;

  return rules[choice];
}
