function RefractiveGeometry(SCENE, POS, ROT, SCALE, OFFSET){
    
    this.scene = SCENE; 
    this.time = 0.0;    
    this.offset = OFFSET

    this.shader = wireframeShader;
    // this.shader = matcapShader;
    // this.geometry = new THREE.BoxGeometry( 500,500,500,100,100,100 );
    this.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight,500,500);
    // this.geometry = new THREE.PlaneGeometry(640,480,10,10);
    this.geometry.mergeVertices();
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals(true);
    // this.geometry = new THREE.SphereGeometry( 40, 100,100 ),
    this.cubeCamera = new THREE.CubeCamera( 1, 10000, 1024 );
    this.cubeCamera.renderTarget.minFilter = this.cubeCamera.renderTarget.magFilter = THREE.NearestFilter;
    this.scene.add( this.cubeCamera );

    var path = "assets/tex/grid";
    var format = '.png';
    var urls = [
        path /*+ 'px'*/ + format, path /*+ 'nx'*/ + format,
        path /*+ 'py'*/ + format, path /*+ 'ny'*/ + format,
        path /*+ 'pz'*/ + format, path /*+ 'nz'*/ + format
    ];
    this.textureCube = THREE.ImageUtils.loadTextureCube( urls );
    this.textureCube.minFilter = this.textureCube.magFilter = THREE.NearestFilter;
    video = document.createElement("video");
    video.src = "assets/tex/kinect.webm";
    video.play();
    video.loop = true;
    this.texture = new THREE.Texture(video);

    vidGeometry = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
    vidMaterial = new THREE.MeshBasicMaterial({map: this.texture, transparent:true, opacity:0.0, side:2});
    vidMesh = new THREE.Mesh(vidGeometry, vidMaterial);
    vidMesh.position.z = 0;
    // mesh.visible = false;
    scene.add(vidMesh);
    this.material = new THREE.ShaderMaterial({
        uniforms: this.shader.uniforms,
        vertexShader: this.shader.vertexShader,
        fragmentShader: this.shader.fragmentShader,
        side: 2,
        shading: THREE.FlatShading,
        // morphNormals: true
        // wireframe: true
    })
    this.material.uniforms["time"].value = this.time;
    this.material.uniforms["envMap"].value = this.textureCube;
    this.material.uniforms["tMatCap"].value = THREE.ImageUtils.loadTexture("assets/tex/matcap3.jpg");
    this.material.uniforms["map"].value = this.texture;
    // this.material.uniforms["flipEnvMap"].value = 1;
    this.material.uniforms["noiseScale"].value = 15.0;
    this.material.uniforms["noiseDetail"].value = 0.05;

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.scene.add(this.mesh);


    this.mesh.position.set(POS.x, POS.y, POS.z);
    this.mesh.rotation.set(ROT.x, ROT.y, ROT.z);
    this.mesh.scale.set(SCALE, SCALE, SCALE);
    
    this.orb = new THREE.Mesh( new THREE.SphereGeometry( 10, 10, 10 ), new THREE.MeshBasicMaterial({color: 0xff0000,map: THREE.ImageUtils.loadTexture("assets/tex/vessel2.jpg"), side:THREE.DoubleSide}) );
    this.orb.rotation.x = -Math.PI/2;
    this.orb.position.z = -100;
    // this.orb.position.y = 100;
    // this.scene.add( this.orb );
    
    this.update = function(){
       
        this.time+=0.01;
        this.texture.needsUpdate = true;
        this.material.uniforms["time"].value = this.time;
        this.geometry.verticesNeedUpdate = true;
    // this.geometry.mergeVertices();

        this.cubeCamera.position.y = this.orb.position.y = this.mesh.position.y;
        this.cubeCamera.position.z = 1000.0;
        // this.cubeCamera.position.copy(this.mesh.position);
        // this.orb.position.z = 500.0;

        this.cubeCamera.updateCubeMap( renderer, this.scene );

        // this.orb.position.z = Math.sin(this.time)*100;

        // this.orb.position.x = Math.cos(this.time)*100;

        // this.geometry.verticesNeedUpdate = true;
    }

    this.killSelf = function(){
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();

        this.scene.remove(this.mesh);
    }
}