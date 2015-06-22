var textureCubeShader = {

		uniforms: { 
					"tCube": { type: "t", value: null },
					"tFlip": { type: "f", value: - 1 }
				  },

		vertexShader: [

			"varying vec3 vWorldPosition;",
			
			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],
			"vec3 transformDirection( in vec3 normal, in mat4 matrix ) {",
			"	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );",
			"}",
			"void main() {",

			"	vWorldPosition = transformDirection( position, modelMatrix );",

			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform samplerCube tCube;",
			"uniform float tFlip;",

			"varying vec3 vWorldPosition;",

			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"}"

		].join("\n")

	}