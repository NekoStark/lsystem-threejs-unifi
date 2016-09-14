function Params(axiom, iterations, delta, branchLength,
          branchRadius, branchReduction, branchMinRadius) {
  this.axiom = axiom ? axiom : "F";
  this.iterations = iterations ? iterations : 4;
  this.delta = delta ? delta : 25;
  this.branchLength = branchLength ? branchLength : 3;
  this.branchRadius = branchRadius ? branchRadius : 0.4;
  this.branchReduction = branchReduction ? branchReduction : 0.1;
  this.branchMinRadius = branchMinRadius ? branchMinRadius : 0.1;
}
