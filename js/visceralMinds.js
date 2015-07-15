var container;
var scene, renderer, camera, controls;
var mouseX = 0, mouseY = 0;
var time = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var start = Date.now(); 

var meshes = [];
var sparkles = [], sparkleTex;
var path = "tex/studio1/";
var format = '.png';
var urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format
];
var reflectionCube, rainbowTex;
init();
animate();

function init() {
        
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);
    camera.position.set(0,0, 10);

    controls = new THREE.OrbitControls2( camera );
    controls.radius = 10;
    controls.speed = 1;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( {alpha: true, preserveDrawingBuffer: true} );
    renderer.setClearColor(0x000000, 0)
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;
    
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    for(var i = 0; i < 1000; i++){
        var s = new Sparkle();
        sparkles.push(s);
    }

    window.addEventListener( 'resize', onWindowResize, false );
    
}
function animate(){
	window.requestAnimationFrame(animate);
	draw();
}
function draw(){
    time+=0.001;
    
    for(var i = 0; i< sparkles.length; i++){
        sparkles[i].update();
    }

    controls.update();

	renderer.render(scene, camera);
}

function onWindowResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}