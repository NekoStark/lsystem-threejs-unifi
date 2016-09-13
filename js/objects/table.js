function Table() {
  var tableTexture = new THREE.TextureLoader().load( "textures/wood.jpg" );

  var tableGeometry = new THREE.BoxGeometry( 20, 10, 0.5 );
  var tableMaterial = new THREE.MeshBasicMaterial( { color: 'white', map: tableTexture } );
  var table = new THREE.Mesh( tableGeometry, tableMaterial );

  var tableLegGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 15, 32 );
  var legBackDx = new THREE.Mesh( tableLegGeometry, tableMaterial );
  var legBackSx = new THREE.Mesh( tableLegGeometry, tableMaterial );
  var legFrontDx = new THREE.Mesh( tableLegGeometry, tableMaterial );
  var legFrontSx = new THREE.Mesh( tableLegGeometry, tableMaterial );
  legBackDx.rotation.x = 1.5;
  legBackSx.rotation.x = 1.5;
  legFrontDx.rotation.x = 1.5;
  legFrontSx.rotation.x = 1.5;
  legBackDx.position.copy( new THREE.Vector3( 9, 3.5, -7.5 ) );
  legBackSx.position.copy( new THREE.Vector3( -9, 3.5, -7.5 ) );
  legFrontDx.position.copy( new THREE.Vector3( 9, -3.5, -7.5 ) );
  legFrontSx.position.copy( new THREE.Vector3( -9, -3.5, -7.5 ) );

  var tableObj = new THREE.Object3D();
  tableObj.add( table );
  tableObj.add( legBackDx );
  tableObj.add( legBackSx );
  tableObj.add( legFrontDx );
  tableObj.add( legFrontSx );

  return tableObj;
}
