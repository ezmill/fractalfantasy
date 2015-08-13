
			var container;

			var scene, camera, light, renderer;
			var geometry, cube, mesh, material;
			var mouse, center;
			var stats;
			var container;
			var scene, renderer, camera, controls;
			var fbScene, fbRenderer, fbCamera, fbTexture, fbShaders, fbMaterial;
			var mouseX = 0, mouseY = 0;
			var time = 0;
			var texture;
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var start = Date.now(); 
			var gradient, tex;
			var meshes = [];
			var obj;
			var counter = 0;
			var rtt;
			var captureFrame = 0;
			var sizeMult = 1;
			var capturer = new CCapture( { format: 'webm', workersPath: 'js/' } );

			var video, texture;

			init();
			fbInit();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );


				scene = new THREE.Scene();
				center = new THREE.Vector3();
				center.z = - 1000;

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 0, 500 );
				scene.add( camera );

				video = document.createElement( 'video' );

				texture = new THREE.Texture( video );
				video.loop = true;
				video.src = 'textures/kinect.webm';
				video.play();
				vidGeometry = new THREE.PlaneBufferGeometry(640, 480);
				vidMaterial = new THREE.MeshBasicMaterial({map: texture, transparent:true, opacity:0.0});
				vidMesh = new THREE.Mesh(vidGeometry, vidMaterial);
				vidMesh.position.z = 0;
				// mesh.visible = false;
				scene.add(vidMesh);
				video.addEventListener( 'loadedmetadata', function ( event ) {
					var width = 640, height = 480;
					var nearClipping = 850/*850*/, farClipping = 4000/*4000*/;

					// geometry = new THREE.Geometry();

					// for ( var i = 0, l = width * height; i < l; i ++ ) {
 
					// 	var position = new THREE.Vector3();
					// 	position.x = ( i % width );
					// 	position.y = Math.floor( i / width );

					// 	geometry.vertices.push( position );

					// }
					geometry = new THREE.PlaneBufferGeometry(1000, 1000,500,500);
					// var testTex = THREE.ImageUtils.loadTexture("textures/testTex.jpg");
					material = new THREE.ShaderMaterial( {

						uniforms: {

							"map": { type: "t", value: 0, texture: texture },
							"width": { type: "f", value: width },
							"height": { type: "f", value: height },
							"nearClipping": { type: "f", value: nearClipping },
							"farClipping": { type: "f", value: farClipping }

						},
						vertexShader: document.getElementById( 'vs' ).textContent,
						fragmentShader: document.getElementById( 'fs' ).textContent,
						// depthWrite: false

					} );
					// material = new THREE.PointCloudMaterial({map: texture});
					// material = new THREE.MeshBasicMaterial({map: texture});

					// mesh = new THREE.PointCloud( geometry, material );
					mesh = new THREE.Mesh(geometry, material);
					mesh.position.x = -500;
					// mesh.position.y = -500;
					// mesh.position.z = -1000;
					mesh.rotation.z = Math.PI;
					scene.add( mesh );


				}, false );


				renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setClearColor(0x000000,1.0);
				// container.appendChild( renderer.domElement );

				mouse = new THREE.Vector3( 0, 0, 1 );
				// projector = new THREE.Projector();
				// ray = new THREE.Ray( camera.position );

				// renderer.autoClearColor = false;


				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			}

			function onDocumentMouseMove( event ) {

				mouse.x = ( event.clientX - window.innerWidth / 2 ) * 8;
				mouse.y = ( event.clientY - window.innerHeight / 2 ) * 8;

			    unMappedMouseX = (event.clientX );
			    unMappedMouseY = (event.clientY );
			    mouseX = map(unMappedMouseX, window.innerWidth, -1.0,1.0);
			    mouseY = map(unMappedMouseY, window.innerHeight, -1.0,1.0);
			    
			    
			    for(var i = 0; i < fbMaterial.fbos.length; i++){
			      fbMaterial.fbos[i].material.uniforms.mouse.value = new THREE.Vector2(mouseX, 1.0);
			    }
    

			}

			function animate() {

				requestAnimationFrame( animate );

				render();
			    fbDraw();

			}

			function render() {
				texture.needsUpdate = true;
				camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
				camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
				camera.lookAt( center );

				renderer.render( scene, camera );


			}

			function fbInit(){

			    fbScene = new THREE.Scene();
			    fbCamera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
			    fbCamera.position.set(0,0,0);

			    fbCamera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);
			    fbCamera2.position.z = 750;

			    // controls = new THREE.OrbitControls(fbCamera2);


			    fbRenderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true/*, alpha: true*/});
			    fbRenderer.setClearColor(0xffffff, 1.0);
			    fbRenderer.setSize(window.innerWidth/sizeMult, window.innerHeight/sizeMult);
			    
			    container.appendChild(fbRenderer.domElement);

			    fbScene = new THREE.Scene();
			    

			    canv = document.createElement("CANVAS");
			    canv.width = window.innerWidth;
			    canv.height = window.innerHeight;
			    ctx = canv.getContext("2d");
			    ctx.fillStyle = "white";
			    ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
			    ctx.drawImage(renderer.domElement,0,0, window.innerWidth, window.innerHeight);
			    fbTexture = new THREE.Texture(canv);
			    // fbTexture = THREE.ImageUtils.loadTexture("tex/rach.jpg")
			    // fbTexture = THREE.ImageUtils.loadTexture("tex/rgblcd.jpg");
			    // var clone = rtt.clone();

			    var customShaders = new CustomShaders();
			    var customShaders2 = new CustomShaders();

			    // fbShaders = [ 
			    //     customShaders.warp2, 
			    //     customShaders.blurShader, 
			    //     customShaders.diffShader2, 
			    //     customShaders.warp2, 
			    //     customShaders.sharpenShader,
			    //     customShaders.passShader
			    // ];

			    fbShaders = [ 
			        customShaders.blurShader, 
			        customShaders.reposShader, 
			        customShaders.diffShader2, 
			        customShaders.colorShader, 
			        customShaders.sharpenShader,
			        customShaders.passShader
			    ];

			    fbMaterial = new FeedbackMaterial(fbRenderer, fbScene, fbCamera, fbTexture, fbShaders);
			        
			    fbMaterial.init();


			    document.addEventListener( 'keydown', function(){screenshot(fbRenderer)}, false );
			    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
			    // window.addEventListener( 'resize', onWindowResize, false );

			}
			function fbDraw(){
    
			    ctx.fillStyle = "white";
			    ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
			    ctx.drawImage(renderer.domElement, 0, 0, window.innerWidth, window.innerHeight);
			    time+=0.01;
			    for(var i = 0; i < fbMaterial.fbos.length; i++){
			      fbMaterial.fbos[i].material.uniforms.time.value = time;
			    }
			    fbTexture.needsUpdate = true;
			        
			    fbMaterial.update();
			    // fbMaterial.expand(1.01);

			    fbRenderer.render(fbScene, fbCamera);

			    fbMaterial.getNewFrame();
			    fbMaterial.swapBuffers();

			    capturer.capture( fbRenderer.domElement );

			    
			}
