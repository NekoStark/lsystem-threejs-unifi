function Renderer() {
  //init renderer
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  $("#canvas-div").append( renderer.domElement );

  //init scene & camera
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 6000 );
  camera.position.set(0,20,60);
	camera.lookAt(scene.position);

  //init controls
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.maxDistance = camera.far/16;
  controls.minDistance = camera.near*100;
  controls.maxPolarAngle = 80 * Math.PI/180;

  //AMBIENT light
  scene.add( new THREE.AmbientLight(0xffffff, 2) );

  //FIELD
  var textureLoader = new THREE.TextureLoader();
  var fieldGeometry = new THREE.CircleGeometry( 1000, 16 );
  var texture = textureLoader.load( "textures/grass.jpg" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 250, 250 );

  // var plane = new THREE.Mesh( fieldGeometry, new THREE.MeshBasicMaterial( {color: 'green', side: THREE.DoubleSide} ) );
  var plane = new THREE.Mesh( fieldGeometry,
    new THREE.MeshPhongMaterial( {color: 'green', side: THREE.DoubleSide, map: texture} ) );
  plane.quaternion.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1, 0, 0), 90 * Math.PI/180 ) );
  plane.receiveShadow = true;
  plane.castShadow = false;
  scene.add( plane );

  //SKY
  var materials = [
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/xpos.png"), side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/xneg.png"), side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/ypos.png"), side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/yneg.png"), side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/zpos.png"), side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: textureLoader.load( "textures/sky/zneg.png"), side: THREE.BackSide } )
  ];

  // var skyMaterial = new THREE.MeshBasicMaterial( {color: 'aqua', side: THREE.BackSide} );
  var skyMaterial = new THREE.MultiMaterial( materials );

  var skyGeometry = new THREE.CubeGeometry( 4000, 4000, 4000 );
  var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );

  this.scene = scene;
  animate();

  //animate
  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
  }

  //render
  function render() {
    renderer.render( scene, camera );
  }

}
