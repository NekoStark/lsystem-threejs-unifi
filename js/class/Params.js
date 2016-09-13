function Params(axiom, iterations, delta, branchLength, branchRadius) {
  this.axiom = axiom ? axiom : "F";
  this.iterations = iterations ? iterations : 4;
  this.delta = delta ? delta : 25;
  this.branchLength = branchLength ? branchLength : 30;
  this.branchRadius = branchRadius ? branchRadius : 10;
  this.branchReduction = 1;
  this.branchMinSize = 1;
}
