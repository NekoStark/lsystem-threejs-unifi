function Params(axiom, iterations, delta, branchLength, branchRadius) {
  this.axiom = axiom ? axiom : "F";
  this.iterations = iterations ? iterations : 4;
  this.delta = delta ? delta : 25;
  this.branchLength = branchLength ? branchLength : 3;
  this.branchRadius = branchRadius ? branchRadius : 1;
  this.branchReduction = 0.1;
  this.branchMinSize = 0.3;
}
