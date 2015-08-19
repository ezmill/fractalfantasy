/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas : !! window.CanvasRenderingContext2D,
	webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers : !! window.Worker,
	fileapi : window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage : function () {

		var domElement = document.createElement( 'div' );

		
		domElement.style.fontFamily = 'monospace';
		domElement.style.font = 'bold 9px Avenir';
		domElement.style.textAlign = 'center';
		domElement.style.background = '#000' ;
		domElement.style.opacity = "0.75" ;
		domElement.style.border = "solid #eee";
		domElement.style.color = '#eee';
		domElement.style.padding = '1em';
		domElement.style.width = '70%'; 
		domElement.style.bottom = '70%';
		domElement.style.position = 'absolute';
		domElement.style.left = '12%'
		
		
		document.body.style.backgroundImage = "url('http://fractalfantasy.net/img/mixtapenogl.jpg')";
		document.body.style.backgroundSize = 'auto 100%';
		document.body.style.backgroundPosition = "top";
	

		if ( ! this.webgl ) {
		
			domElement.innerHTML = window.WebGLRenderingContext ? [
				'THIS VISUAL REQUIRES WEBGL<br><br />',
				'TRY LOADING WITH GOOGLE CHROME ON YOUR LAPTOP OR DESKTOP'
			]
			
			
			.join( '\n' ) : [
				'THIS VISUAL REQUIRES WEBGL<br />',
				'TRY LOADING WITH GOOGLE CHROME ON YOUR LAPTOP OR DESKTOP'
			]
			
			.join( '\n' );

		}

		return domElement;

	},

	addGetWebGLMessage : function ( parameters ) {

		var parent, id, domElement;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		domElement = Detector.getWebGLErrorMessage();
		domElement.id = id;

		parent.appendChild( domElement );

	}

};
