function Sparkle(){
	this.partSpeed = Math.random()*0.2;

    this.material = new THREE.MeshBasicMaterial( {envMap: reflectionCube, opacity: 1.0, transparent: true} );
    this.material.transparent = true;
    this.material.side = 2;

    this.geometry = new THREE.TetrahedronGeometry(0.1);
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.scale.set(0.1,0.1,0.1);
	
	scene.add(this.mesh);

	this.glowMaterial = sparkleShader();
	this.glowMesh = new THREE.Mesh(this.geometry, this.glowMaterial);
	this.glowMesh.scale.set(0.15,0.15,0.15);
	scene.add(this.glowMesh);

	this.inc = 0.0;

    var zPos = -20;
    var DISPLAY_HEIGHT = 2 * (-zPos) * Math.tan(camera.fov / 2 * (Math.PI / 180));
    
    var DISPLAY_WIDTH = DISPLAY_HEIGHT * (window.innerWidth / window.innerHeight);
    
	var MAX_X = DISPLAY_WIDTH / 2;
	var MIN_X = - (DISPLAY_WIDTH / 2);
	var MAX_Y = DISPLAY_HEIGHT / 2;
	var MIN_Y = - (DISPLAY_HEIGHT / 2);

	this.xPos = -20+Math.random()*60;
	// this.xPos = 0;
	this.yPos = -20+Math.random()*40;
	// this.yPos = 0;
	this.zPos = -20+Math.random()*40;
	// this.zPos = 0;

	this.xRot = Math.random()*Math.PI*2;
	this.yRot = Math.random()*Math.PI*2;
	this.zRot = Math.random()*Math.PI*2;

	this.mesh.position.set(this.xPos, this.yPos, this.zPos);
	this.glowMesh.position.set(this.xPos, this.yPos, this.zPos);

	this.update = function(){
		this.inc+=(this.partSpeed*.01);

		this.mesh.position.x = this.glowMesh.position.x = this.xPos - Math.cos(this.inc)*10; 
		this.mesh.position.y = this.glowMesh.position.y = this.yPos + Math.sin(this.inc)*10; 

		// this.mesh.position.x = this.glowMesh.position.x = Math.sin( this.timer * 2.3 ) * 10.5 + 0.5;
		// this.mesh.position.y = this.glowMesh.position.y	= Math.cos( this.timer * 2.5 ) * 10.5 + 0.5;
		// this.mesh.position.z = this.glowMesh.position.z	= Math.sin( this.timer * 2.7 ) * 10.5 + 0.5; 
		// this.mesh.position.z = this.zPos + Math.sin(this.inc)*this.hght; 
		this.xRot += Date.now()*0.001;
		this.yRot += Date.now()*0.001;
		this.zRot += Date.now()*0.001;
		this.mesh.rotation.set(this.xRot, this.yRot, this.zRot);
		this.glowMesh.rotation.set(this.xRot, this.yRot, this.zRot);
	}
	
}