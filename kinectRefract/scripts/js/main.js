var container;

var camera, scene, renderer;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var mouseDown = false;

var mouseX = 0.0, mouseY = 0.0;
var noiseBall, room;
var video;
init();
animate();

function init() {
    
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000000 );
	// camera = new THREE.OrthographicCamera(window.innerWidth/2, -window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, -10000,9990)
	camera.position.z = 1100;
	camera.position.y = 0;
	controls = new THREE.OrbitControls(camera);

	scene = new THREE.Scene();
	// scene.fog = new THREE.Fog( 0x000000, 1, 10 );
    scene.add(new THREE.DirectionalLight( 0xffffff, 1.0 ));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;

	container.appendChild( renderer.domElement );
    
    rGeo = new RefractiveGeometry(scene, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), 1.0, 0);


    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mousedown', onMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );
    
    // scene.add(new THREE.Mesh(new THREE.BoxGeometry(10,10,10), new THREE.MeshBasicMaterial({color:0xff0000})));
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX ) * 20;
	mouseY = ( event.clientY - windowHalfY ) * 20;

}

function onMouseDown(event) {

// video.pause();

}

function animate() {

	requestAnimationFrame( animate );

	render();
    
}

function render() {
    	
    rGeo.update();
    
	renderer.render( scene, camera );

}