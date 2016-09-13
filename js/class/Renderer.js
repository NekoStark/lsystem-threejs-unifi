function Renderer(object) {
  //init renderer
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //init scene & camera
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 6000 );
  camera.position.set(0,20,60);
	camera.lookAt(scene.position);

  //init controls
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.maxDistance = camera.far/2;
  controls.maxPolarAngle = 120 * Math.PI/180;

  //FIELD
  var textureLoader = new THREE.TextureLoader();
  var fieldGeometry = new THREE.CircleGeometry( 250, 16 );
  var texture = textureLoader.load( "textures/grass.png" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 20, 20 );

  var plane = new THREE.Mesh( fieldGeometry,
    new THREE.MeshBasicMaterial( {color: 'green', side: THREE.DoubleSide, map: texture} ) );
  plane.quaternion.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1, 0, 0), 90 * Math.PI/180 ) );
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

  var skyMaterial = new THREE.MultiMaterial( materials );

  var skyGeometry = new THREE.CubeGeometry( 4000, 4000, 4000 );
  // var skyBox = new THREE.Mesh( skyGeometry, new THREE.MeshBasicMaterial( {color: 0x99ffff, side: THREE.BackSide}) );
  var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );


  scene.add(object);
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
