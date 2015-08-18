
var noiseChunck = {  

	text:[

		"vec3 mod289(vec3 x){",
		  "return x - floor(x * (1.0 / 289.0)) * 289.0;",
		"}",

		"vec4 mod289(vec4 x){",
		  "return x - floor(x * (1.0 / 289.0)) * 289.0;",
		"}",

		"vec4 permute(vec4 x){",
		  "return mod289(((x*34.0)+1.0)*x);",
		"}",

		"vec4 taylorInvSqrt(vec4 r){",
		  "return 1.79284291400159 - 0.85373472095314 * r;",
		"}",

		"vec3 fade(vec3 t) {",
		  "return t*t*t*(t*(t*6.0-15.0)+10.0);",
		"}",

		"float pnoise(vec3 P, vec3 rep){",
		  "vec3 Pi0 = mod(floor(P), rep);",
		  "vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);",
		  "Pi0 = mod289(Pi0);",
		  "Pi1 = mod289(Pi1);",
		  "vec3 Pf0 = fract(P);",
		  "vec3 Pf1 = Pf0 - vec3(1.0);",
		  "vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);",
		  "vec4 iy = vec4(Pi0.yy, Pi1.yy);",
		  "vec4 iz0 = Pi0.zzzz;",
		  "vec4 iz1 = Pi1.zzzz;",

		  "vec4 ixy = permute(permute(ix) + iy);",
		  "vec4 ixy0 = permute(ixy + iz0);",
		  "vec4 ixy1 = permute(ixy + iz1);",

		  "vec4 gx0 = ixy0 * (1.0 / 7.0);",
		  "vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;",
		  "gx0 = fract(gx0);",
		  "vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);",
		  "vec4 sz0 = step(gz0, vec4(0.0));",
		  "gx0 -= sz0 * (step(0.0, gx0) - 0.5);",
		  "gy0 -= sz0 * (step(0.0, gy0) - 0.5);",

		  "vec4 gx1 = ixy1 * (1.0 / 7.0);",
		  "vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;",
		  "gx1 = fract(gx1);",
		  "vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);",
		  "vec4 sz1 = step(gz1, vec4(0.0));",
		  "gx1 -= sz1 * (step(0.0, gx1) - 0.5);",
		  "gy1 -= sz1 * (step(0.0, gy1) - 0.5);",

		  "vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);",
		  "vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);",
		  "vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);",
		  "vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);",
		  "vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);",
		  "vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);",
		  "vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);",
		  "vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);",

		  "vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));",
		  "g000 *= norm0.x;",
		  "g010 *= norm0.y;",
		  "g100 *= norm0.z;",
		  "g110 *= norm0.w;",
		  "vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));",
		  "g001 *= norm1.x;",
		  "g011 *= norm1.y;",
		  "g101 *= norm1.z;",
		  "g111 *= norm1.w;",

		  "float n000 = dot(g000, Pf0);",
		  "float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));",
		  "float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));",
		  "float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));",
		  "float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));",
		  "float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));",
		  "float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));",
		  "float n111 = dot(g111, Pf1);",

		  "vec3 fade_xyz = fade(Pf0);",
		  "vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);",
		  "vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);",
		  "float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);", 
		  "return 2.2 * n_xyz;",
		"}",

		"float turbulence( vec3 p){",
			"float w = 100.0;",
			"float t = -0.5;",
			"for(float f = 1.0; f<=10.0; f++){",
				"float power = pow(2.0, f);",
				"t += abs( pnoise( vec3( power * p ), vec3( 10.0,10.0,10.0) ) / power);",
			"}",
			"return t;",
		"}",
		"vec3 doTwist( vec3 pos, float t ){",
			"float st = sin(t);",
			"float ct = cos(t);",
			"vec3 new_pos;",
			
			"new_pos.x = pos.x*ct - pos.z*st;",
			"new_pos.z = pos.x*st + pos.z*ct;",
			
			"new_pos.y = pos.y;",
			
			"return new_pos;",
		"}"
	].join("\n")
};
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
		"	vec4 pos = vec4(position.x, position.y, -z*0.05 + 1000.0,1.0);"
		// "	gl_Position = projectionMatrix * modelViewMatrix * pos;"

	].join("\n")
};
var matcapShader =  {

	uniforms: THREE.UniformsUtils.merge( [

		{
			"tMatCap" : {type: 't', value: null },
			"map" : {type: 't', value: null },
			"noiseScale":{type: "f", value:0.0},
			"noiseDetail":{type: "f", value:0.0},
			"time":{type: "f", value:0.0},
			"width":{type: "f", value:640},
			"height":{type: "f", value:480},
			"nearClipping":{type: "f", value:850},
			"farClipping":{type: "f", value:4000},
		}
	] ),

	vertexShader: [

		// noiseChunck.text,

		"varying vec2 vN;",
		"varying vec2 vUv;",
		"varying float noise;",
		"uniform float noiseDetail;",
		"uniform float noiseScale;",
		"uniform float time;",
		"uniform sampler2D map;",
		"uniform float width;",
		"uniform float height;",
		"uniform float nearClipping, farClipping;",

		"void main() {",
		"	vUv = uv;",

	    depthChunck.text,

		"    vec4 p = vec4( pos.xyz, 1. );",

		"    vec3 e = normalize( vec3( modelViewMatrix * p ) );",
		"    vec3 n = normalize( normalMatrix * normal );",

		"    vec3 r = reflect( e, n );",
		"    float m = 2. * sqrt( ",
		"        pow( r.x, 2. ) + ",
		"        pow( r.y, 2. ) + ",
		"        pow( r.z + 1., 2. ) ",
		"    );",
		"    vN = r.xy / m + .5;",

	    // "noise = 10.0 *  -.10 * turbulence( .5 * normal );",
	    // "float b = 5.0 * pnoise( 0.05 * position, vec3( 100.0 ) );",
	    // "float displacement = - 10. * noise + b;",


	    // "vec3 newPosition = position + normal * displacement;",
	    "gl_Position = projectionMatrix * modelViewMatrix * vec4( pos.xyz, 1.0 );",


		"}"
	
	].join("\n"),
	
	fragmentShader: [
		
		// "uniform sampler2D tMatCap;",

		// "varying vec2 vN;",

		// "void main() {",
		// "    ",
		// "    vec3 base = texture2D( tMatCap, vN ).rgb;",
		// "    gl_FragColor = vec4( base, 1. );",

		// "}"

		"varying vec2 vN;",
		"varying float noise;",
		"uniform sampler2D tMatCap;",

		"float random( vec3 scale, float seed ){",
		"    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;",
		"}",

		"void main() {",

		"    float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );",
		"    vec2 tPos = vec2( 0, 1.0 - 1.3 * noise + r );",
		"    vec4 color = texture2D( tMatCap, vN );",

		"    gl_FragColor = vec4( color.rgb, 1.0 );",

		"}"
	
	].join("\n")
	
}
console.log(matcapShader);
