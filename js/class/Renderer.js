function Renderer(object) {
  //init renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x99ffff );
  document.body.appendChild( renderer.domElement );

  //init scene & camera
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camera.position.set(0,200,600);
	camera.lookAt(scene.position);

  //init controls
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.maxDistance = camera.far/2;
  controls.maxPolarAngle = 120 * Math.PI/180;

  //FIELD
  var fieldGeometry = new THREE.CircleGeometry( 2500, 16 );
  var plane = new THREE.Mesh( fieldGeometry, new THREE.MeshBasicMaterial( {color: 'green', side: THREE.DoubleSide} ) );
  plane.quaternion.multiply( new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1, 0, 0), 90 * Math.PI/180 ) );
  scene.add( plane );


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
