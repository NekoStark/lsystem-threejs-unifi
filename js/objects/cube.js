function Cube(x, y, z, texture, position, rotation) {
  var cubeTexture = texture ? texture : new THREE.TextureLoader().load( "textures/cube.png" );
  var cubeGeometry = new THREE.BoxGeometry( x, y, z );
  var cubeMaterial = new THREE.MeshBasicMaterial( { color: 'white', map: cubeTexture } );
  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.quaternion.copy( rotation ? rotation : new THREE.Quaternion(0, 0, 1, 0.2) );
  cube.position.copy( position ? position : new THREE.Vector3( 0, 0, 1.3 ) );

  return cube;
}
