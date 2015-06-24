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
    // controls = new THREE.OrbitControls(camera);
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
    
    // var texCube = createTexCube("tex/cube", ".jpg", true);
    // for(var i = 0; i < 50; i++){
    //     var mesh = new THREE.Mesh(
    //         new THREE.BoxGeometry(0.5,0.5,0.5),
    //         new THREE.MeshBasicMaterial({envMap: texCube, refractionRatio: 0.001,})
    //     )

    //     mesh.position.set(Math.random()*15 - 7.5, Math.random()*15 - 7.5, 0);
    //     scene.add(mesh);
    //     meshes.push(mesh);
    //     mesh.rotation.x = Math.random()*Math.PI*2;
    //     mesh.rotation.y = Math.random();
    //     mesh.rotation.z = Math.random()*Math.PI;
    // }

    sparkleTex = THREE.ImageUtils.loadTexture("tex/glow.png");
    rainbowTex = THREE.ImageUtils.loadTexture("tex/bwTex.png");
    reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
    reflectionCube.format = THREE.RGBFormat;

    for(var i = 0; i < 2000; i++){
        var s = new Sparkle();
        sparkles.push(s);
    }

    // var material = sparkleShader();
    // var geometry = new THREE.IcosahedronGeometry(10,3);
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0,0,-20);
    // scene.add(mesh);
    // var mesh2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:0xffffff}));
    // mesh2.position.set(0,0,-20);
    // mesh2.scale.set(0.9,0.9,0.9);
    // scene.add(mesh2);
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'keydown', function(){screenshot(renderer)}, false );
    // window.addEventListener( 'resize', onWindowResize, false );
    
}
function animate(){
	window.requestAnimationFrame(animate);
	draw();
}
function draw(){
    time+=0.001;
    // for(var i = 0; i < meshes.length; i++){
    //     meshes[i].rotation.x += 0.01;
    //     meshes[i].rotation.y += 0.01;
    //     meshes[i].rotation.z += 0.01;
    //     if(i%2 == 0){
    //         meshes[i].position.x += Math.sin(time*0.001)*0.01;
    //         meshes[i].position.y += Math.cos(time*0.001)*0.01;
    //     } else {
    //         meshes[i].position.x -= Math.sin(time*0.001)*0.01;
    //         meshes[i].position.y -= Math.cos(time*0.001)*0.01;
    //     }
        
    //     // meshes[i].position.z += Math.sin(time)*0.01;
    // }
    for(var i = 0; i< sparkles.length; i++){
        sparkles[i].update();
    }

                controls.update();

	renderer.render(scene, camera);
}