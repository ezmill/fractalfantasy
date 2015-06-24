function Sparkle(){
	this.partSpeed = Math.random()*0.2;
	// this.spriteMaterial = new THREE.SpriteMaterial({map:sparkleTex, useScreenCoordinates: false, fog: true, color: 0xffffff, transparent:false, blending:THREE.AdditiveBlending});
	// this.mesh= new THREE.Sprite( this.spriteMaterial );
	var shader = THREE.FresnelShader;
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );    
    
    uniforms[ "tCube" ].value = reflectionCube;
    uniforms["texture"].value = rainbowTex;
    uniforms["textureScl"].value = 1.0;
    var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms };
    // this.material = new THREE.ShaderMaterial( parameters );
    this.material = new THREE.MeshBasicMaterial( {envMap: reflectionCube, opacity: 0.5, transparent: true} );
    this.material.transparent = true;
    this.material.side = 2;
    // this.material = sparkleShader();
    // this.material.side = 2;

    // this.geometry = new THREE.PlaneBufferGeometry(3,3);
    this.geometry = new THREE.TetrahedronGeometry(0.2);
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.scale.set(0.1,0.1,0.1);
	
	scene.add(this.mesh);

	this.glowMaterial = sparkleShader();
	this.glowMesh = new THREE.Mesh(this.geometry, this.glowMaterial);
	this.glowMesh.scale.set(0.15,0.15,0.15);
	// this.glowMesh.scale.set(1.003, 1.003, 1.003);
	scene.add(this.glowMesh);

	this.inc = 0.0;

    var zPos = -20;
    var DISPLAY_HEIGHT = 2 * (-zPos) * Math.tan(camera.fov / 2 * (Math.PI / 180));
    
    var DISPLAY_WIDTH = DISPLAY_HEIGHT * (window.innerWidth / window.innerHeight);
    
	var MAX_X = DISPLAY_WIDTH / 2;
	var MIN_X = - (DISPLAY_WIDTH / 2);
	var MAX_Y = DISPLAY_HEIGHT / 2;
	var MIN_Y = - (DISPLAY_HEIGHT / 2);

	this.xPos = this.oldX = -20+Math.random()*60;
	this.yPos = this.oldY = -20+Math.random()*40;
	this.zPos = -20;

	this.xRot = Math.random()*Math.PI*2;
	this.yRot = Math.random()*Math.PI*2;
	this.zRot = Math.random()*Math.PI*2;

	this.mesh.position.set(this.xPos, this.yPos, this.zPos);
	this.glowMesh.position.set(this.xPos, this.yPos, this.zPos);


	this.mouse = new THREE.Vector2(0.0,0.0);
	// this.hght = -3+Math.random()*6;

	this.update = function(){
		this.inc+=(this.partSpeed*.01);

		// this.mesh.position.x = this.glowMesh.position.x = this.xPos - Math.cos(this.inc)*10; 
		// this.mesh.position.y = this.glowMesh.position.y = this.yPos + Math.sin(this.inc)*10; 
		this.attract(this.mouse.x, this.mouse.y);
		this.integrate();
		this.mesh.position.x = this.glowMesh.position.x = this.xPos;
		this.mesh.position.y = this.glowMesh.position.y = this.yPos;
		// this.mesh.position.z = this.zPos + Math.sin(this.inc)*this.hght; 

		this.mesh.rotation.x = this.glowMesh.rotation.x = this.xRot + Date.now()*0.001; 
		this.mesh.rotation.y = this.glowMesh.rotation.y = this.yRot + Date.now()*0.001; 
		this.mesh.rotation.z = this.glowMesh.rotation.z = this.zRot + Date.now()*0.001; 
	}
	this.integrate = function(){
		var velocityX = this.xPos - this.oldX;
		var velocityY = this.yPos - this.oldY;
		this.oldX = this.xPos;
		this.oldY = this.yPos;
		this.xPos += velocityX;
		this.yPos += velocityY;
	}
	this.attract = function(x, y) {
	  var dx = x - this.xPos;
	  var dy = y - this.yPos;
	  var distance = Math.sqrt(dx * dx + dy * dy);  // Pythagorean theorum
	  this.xPos += (dx / distance)*0.01;
	  this.yPos += (dy / distance)*0.01;
	}

}