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

    this.geometry = new THREE.PlaneBufferGeometry(3,3);
    // this.geometry = new THREE.TetrahedronGeometry(6,3);
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.scale.set(0.1,0.1,1.0);
	
	scene.add(this.mesh);
	this.inc = 0.0;

    var zPos = -20;
    var DISPLAY_HEIGHT = 2 * (-zPos) * Math.tan(camera.fov / 2 * (Math.PI / 180));
    
    var DISPLAY_WIDTH = DISPLAY_HEIGHT * (window.innerWidth / window.innerHeight);
    
	var MAX_X = DISPLAY_WIDTH / 2;
	var MIN_X = - (DISPLAY_WIDTH / 2);
	var MAX_Y = DISPLAY_HEIGHT / 2;
	var MIN_Y = - (DISPLAY_HEIGHT / 2);
	this.xPos = -20+Math.random()*60;
	console.log(MAX_X, MIN_X, MAX_Y, MIN_Y);
	// this.xPos = Math.random()*MIN_X + MIN_X;
	this.yPos = -20+Math.random()*40;
	// this.yPos = Math.random()*MIN_Y + MIN_Y;
	this.zPos = -20;

	this.xRot = Math.random()*Math.PI*2;
	this.yRot = Math.random()*Math.PI*2;
	this.zRot = Math.random()*Math.PI*2;

	this.mesh.position.set(this.xPos, this.yPos, this.zPos);

	// this.hght = -3+Math.random()*6;

	this.update = function(){
		this.inc+=(this.partSpeed*.01);

		this.mesh.position.x = this.xPos - Math.cos(this.inc)*10; 
		this.mesh.position.y = this.yPos + Math.sin(this.inc)*10; 
		// this.mesh.position.z = this.zPos + Math.sin(this.inc)*this.hght; 

		this.mesh.rotation.y = this.xRot + Date.now()*0.001; 
		this.mesh.rotation.x = this.yRot + Date.now()*0.001; 
		this.mesh.rotation.z = this.zRot + Date.now()*0.001; 
	}
	
}