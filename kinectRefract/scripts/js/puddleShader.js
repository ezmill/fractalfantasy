var depthChunck = {
	text: [

		// "	vUv = vec2( position.x / width, 1.0 - ( position.y / height ) );",

		"	vec4 color = texture2D( map, vUv );",
		"	float depth = ( color.r + color.g + color.b ) / 3.0;",

		"	float z = ( 1.0 - depth ) * (farClipping - nearClipping) + nearClipping;",

		// "	vec4 pos = vec4(",
		// "		( position.x / width - 0.5 ) * z * XtoZ,",
		// "		( position.y / height - 0.5 ) * z * YtoZ,",
		// "		- z + 1000.0,",
		// "		1.0);",
		// "	vec4 pos = vec4(position.x, position.y, -z*0.05 + 1000.0,1.0);"
		"	vec4 pos = vec4(position.x, position.y, -z*0.05,1.0);"
		// "	vec4 pos = vec4(position.x, position.y, -z*0.1 ,1.0);"
		// "	gl_Position = projectionMatrix * modelViewMatrix * pos;"

	].join("\n")
};

var puddleShader = {

		uniforms: { 
					"envMap": { type: "t", value: null },
					"map": { type: "t", value: null },
					"tMatCap": { type: "t", value: null },
					"flipEnvMap": { type: "f", value: 1.0 },
					"time": { type: "f", value: 0.0 },
					"noiseScale":{type: "f", value:0.0},
					"noiseDetail":{type: "f", value:0.0},
					"refractionRatio":{type: "f", value:1.0},
					"diffuse":{type: "v3", value:new THREE.Vector3(1.0,1.0,1.0)},
					"reflectivity":{type: "f", value:1.0},
					"width":{type: "f", value:640},
					"height":{type: "f", value:480},
					"nearClipping":{type: "f", value:850},
					"farClipping":{type: "f", value:4000},
				  },

		vertexShader: [

			"varying vec3 vReflect;",
			"uniform float refractionRatio;",

			"varying float noise;",
			"varying vec2 vUv;",
			"varying vec2 vN;",
			"varying vec3 vNormal;",

			"uniform float noiseDetail;",
			"uniform float noiseScale;",
			"uniform float time;",

			"uniform sampler2D map;",
			"uniform float width;",
			"uniform float height;",
			"uniform float nearClipping, farClipping;",

			"const float XtoZ = 1.11146; // tan( 1.0144686 / 2.0 ) * 2.0;",
			"const float YtoZ = 0.83359; // tan( 0.7898090 / 2.0 ) * 2.0;",

			// noiseChunck.text, 
			"vec3 transformDirection( in vec3 normal, in mat4 matrix ) {",
			"	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );",
			"}",
			"void main(){",

		    // "noise = 10.0 *  -.10 * turbulence( .5 * normal + time);",
		    // "float b = noiseScale * pnoise( noiseDetail * position + vec3( 2.0 * time ), vec3( 100.0 ) );",
		    // "float displacement = - 10. * noise + b;",
		    // "vec3 newPosition = position + normal * displacement;",
			"	vUv = uv;",

		    depthChunck.text,

			"	vec4 mvPosition = modelViewMatrix * vec4( pos.xyz, 1.0 );",
			"	gl_Position = projectionMatrix * mvPosition;",
			"	vec3 objectNormal = normal;",
			"	vec4 worldPosition = modelMatrix * vec4( pos.xyz, 1.0 );	",
			"	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );",
			"	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );",
			// "	vReflect = refract( cameraToVertex, worldNormal, refractionRatio );",
			"	vReflect = reflect( cameraToVertex, worldNormal );",
			// "    vec3 e = normalize( vec3( modelViewMatrix * pos ) );",
			// "    vec3 n = normalize( normalMatrix * worldNormal );",
			"	vNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			// "    vec3 r = reflect( normalize(worldNormal), normalize(pos.xyz) );",
			// "    float m = 2. * sqrt( ",
			// "        pow( r.x, 2. ) + ",
			// "        pow( r.y, 2. ) + ",
			// "        pow( r.z + 1., 2. ) ",
			// "    );",
			// "    vN = r.xy / m + .5;",
			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float reflectivity;",
			"uniform samplerCube envMap;",
			"uniform sampler2D map;",
			"uniform sampler2D tMatCap;",
			"uniform float flipEnvMap;",

			"varying vec3 vReflect;",
			"varying vec2 vUv;",
			"uniform vec3 diffuse;",
			"varying vec2 vN;",
			"varying vec3 vNormal;",

			"void main() {",
			"	vec3 outgoingLight = vec3( 0.0 );",
			"	vec4 diffuseColor = vec4( diffuse, 1.0 );",
			"	float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );",
			"	float specularStrength;",
			"	specularStrength = 1.0;",
			"	outgoingLight = diffuseColor.rgb;",

			"	vec3 reflectVec = vReflect;",

			// "	vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, -reflectVec.yz ) );",
			// "	vec4 envColor = texture2D( map, vUv );",
			// "    vec4 envColor = texture2D( tMatCap, vN );",

			// "	envColor.xyz = inputToLinear( envColor.xyz );",
			"	vec3 reflectView = normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));",
			"	vec4 envColor = texture2D( tMatCap, reflectView.xy * 0.5 + 0.5 );",
			"	outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );",
			"	vec4 shading = texture2D(map, vec2(vNormal.xyz * vec3(0.495) + vec3(0.5)));",
			"	gl_FragColor = shading;",
			// "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
			// "	gl_FragColor = color;",

			"}"

		].join("\n")
	}



