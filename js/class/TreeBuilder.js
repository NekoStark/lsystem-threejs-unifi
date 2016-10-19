function TreeBuilder(string, params, startingPosition) {
  this.string = string;
  this.params = params;

  this.build = function() {
    //init params
    var state = {
      bRadius : this.params.branchRadius,
      bLength : this.params.branchLength,
      bReduction : this.params.branchReduction,
      bMinRadius : this.params.branchMinRadius,
      position : startingPosition ? startingPosition : new THREE.Vector3( 0, 0, 0 ),
      rotation : new THREE.Quaternion()
    }
    var stateStack = [];

    //init object
    var tree = new THREE.Object3D();
    var textureLoader = new THREE.TextureLoader();
    // var branchMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
    // var appleMaterial = new THREE.MeshBasicMaterial( {color: 'red'} );
    var branchMaterial = new THREE.MeshBasicMaterial( {color: 'brown', map: textureLoader.load( "textures/branch.jpg" )} );
    var appleMaterial = new THREE.MeshBasicMaterial( {color: 'red', map: textureLoader.load( "textures/apple.jpg" )} );

    for(var i = 0; i < this.string.length; i++) {
      var char = this.string.charAt(i);
      if(char == "F") {
        tree.add(buildBranch(state, branchMaterial));
      }
      if(char == "X") {
        tree.add(buildLeaf(state, appleMaterial ));
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
        state.bRadius = (state.bRadius - state.bReduction) > state.bMinRadius ? (state.bRadius - state.bReduction) : state.bRadius;
      }
      if(char == "]") {
        state = cloneState( stateStack.pop() );
      }

    }
    tree.castShadow = true;
    return tree;
  }

}

function buildBranch(state, material) {
  var transform = new THREE.Quaternion();
  transform.multiply( state.rotation );

  var position = new THREE.Vector3( 0.0, state.bLength/2, 0.0 );
  position.applyQuaternion( state.rotation );
  state.position.add( position );

  var geometry = new THREE.CylinderBufferGeometry( state.bRadius, state.bRadius, state.bLength, 16 );
  var branch = new THREE.Mesh( geometry, material );
  branch.quaternion.copy( state.rotation );
  branch.position.copy( state.position );

  state.position.add(position);
  branch.castShadow = true;
  return branch;

}

function buildLeaf(state, material) {
  var transform = new THREE.Quaternion();
  transform.multiply( state.rotation );

  var originalPosition = new THREE.Vector3().copy(state.position);
  var position = new THREE.Vector3( 0, state.bLength/8, 0.0 );
  position.applyQuaternion( state.rotation );
  state.position.add( position );

  var geometry = new THREE.SphereBufferGeometry( state.bLength/4, 16 );
  var branch = new THREE.Mesh( geometry, material );
  branch.quaternion.copy( state.rotation );
  branch.position.copy( state.position );

  state.position = new THREE.Vector3().copy( originalPosition );
  branch.castShadow = true;
  return branch;
}

function cloneState(state) {
  return {
    bRadius : state.bRadius,
    bLength : state.bLength,
    bReduction : state.bReduction,
    bMinRadius : state.bMinRadius,
    position : new THREE.Vector3().copy(state.position),
    rotation : new THREE.Quaternion().copy(state.rotation)
  }
}
