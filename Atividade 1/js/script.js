var rotacionar = function(camera, angulo){
	var anguloRadianos = (angulo) * Math.PI / 180
	var a = Math.sin(anguloRadianos) * camera.position.x * -1
	var b = Math.cos(anguloRadianos) * camera.position.z
	var c = Math.cos(anguloRadianos) * camera.position.x
	var d = Math.sin(anguloRadianos) * camera.position.z
	
	camera.position.x = c + d
	camera.position.z = a + b

	camera.lookAt(0, 0, 0); // Tem que corrigir isso
	camera.updateProjectionMatrix()
}

var container, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();

function init() {
container = document.createElement( 'div' );
document.body.appendChild( container );
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

scene = new THREE.Scene();
var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
scene.add( ambientLight );
// var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
// camera.add( pointLight );
scene.add( camera );
// model
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
					}
				};
				var onError = function () { };
				THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
				new THREE.MTLLoader()
					.setPath( '../res/eyeball/' )
					.load( 'eyeball.mtl', function ( materials ) {
						materials.preload();
						new THREE.OBJLoader()
							.setMaterials( materials )
							.setPath( '../res/eyeball/' )
							.load( 'eyeball.obj', function ( object ) {
								scene.add( object );
							}, onProgress, onError );
					} );
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
				camera.position.set(0, 0, 10)
			}
			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function onDocumentMouseMove( event ) {
				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				rotacionar(camera, -1)
				render();
			}
			function render() {
				// camera.position.x += ( mouseX - camera.position.x ) * .05;
				// camera.position.y += ( - mouseY - camera.position.y ) * .05;
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
		
