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
          localResult += rule;
        } else {
          localResult += char;
        }
  		}
      result = localResult;
    }
		return result;
  };

}
