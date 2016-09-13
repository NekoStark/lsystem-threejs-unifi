function TreeBuilder(string, params) {
  this.string = string;
  this.params = params;

  this.build = function() {
    //init params
    var state = {
      bRadius : this.params.branchRadius,
      bLength : this.params.branchLength,
      bReductionStep : this.params.branchReduction,
      bReduction : this.params.branchReduction,
      bMinSize : this.params.branchMinSize,
      position : new THREE.Vector3( 0, 0, 0 ),
      rotation : new THREE.Quaternion()
    }
    var stateStack = [];

    //init object
    var tree = new THREE.Object3D();

    for(var i = 0; i < this.string.length; i++) {
      var char = this.string.charAt(i);
      if(char == "F") {
        tree.add(buildBranch(state, new THREE.MeshBasicMaterial( {color: 'black'} ) ));
      }
      if(char == "X") {
        tree.add(buildLeaf(state, new THREE.MeshBasicMaterial( {color: 'red'} ) ));
      }
      if(char == "+") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0, 0, 1), this.params.delta * Math.PI/180 ) );
      }
      if(char == "-") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0, 0, 1), -this.params.delta * Math.PI/180 ) );
      }
      if(char == "&") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0, 1, 0), -this.params.delta * Math.PI/180 ) );
      }
      if(char == "^") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(0, 1, 0), this.params.delta * Math.PI/180 ) );
      }
      if(char == "<") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1, 0, 0), -this.params.delta * Math.PI/180 ) );
      }
      if(char == ">") {
        state.rotation.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1, 0, 0), this.params.delta * Math.PI/180 ) );
      }
      if(char == "[") {
        stateStack.push( cloneState(state) );
      }
      if(char == "]") {
        state = cloneState( stateStack.pop() );
      }

    }

    return tree;

  }

}

function buildBranch(state, material) {
  var transform = new THREE.Quaternion();
  transform.multiply( state.rotation );

  var position = new THREE.Vector3( 0.0, state.bLength/2, 0.0 );
  position.applyQuaternion( state.rotation );
  state.position.add( position );

  var newReduction = (state.bRadius - (state.bReduction + state.bReductionStep)) > state.bMinSize ?
            state.bReduction + state.bReductionStep : state.bReduction;

  var geometry = new THREE.CylinderGeometry( state.bRadius - newReduction, state.bRadius - state.bReduction, state.bLength, 16 );
  var branch = new THREE.Mesh( geometry, material );
  branch.quaternion.copy( state.rotation );
  branch.position.copy( state.position );

  state.bReduction = newReduction;
  state.position.add(position);
  return branch;

}

function buildLeaf(state, material) {
  var transform = new THREE.Quaternion();
  transform.multiply( state.rotation );

  var position = new THREE.Vector3( 0, state.bLength/8, 0.0 );
  position.applyQuaternion( state.rotation );
  state.position.add( position );

  var geometry = new THREE.SphereGeometry( state.bLength/4, 16 );
  var branch = new THREE.Mesh( geometry, material );
  branch.quaternion.copy( state.rotation );
  branch.position.copy( state.position );

  state.position.add( new THREE.Vector3( 0, -state.bLength/8, 0.0 ) );

  return branch;
}

function cloneState(state) {
  return {
    bRadius : state.bRadius,
    bLength : state.bLength,
    bReductionStep : state.bReductionStep,
    bReduction : state.bReduction,
    bMinSize : state.bMinSize,
    position : new THREE.Vector3().copy(state.position),
    rotation : new THREE.Quaternion().copy(state.rotation)
  }
}
