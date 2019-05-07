function rotacionar(camera, angulo){
	var anguloRadianos = (angulo) * Math.PI / 180
	var a = Math.sin(anguloRadianos) * camera.position.x * -1
	var b = Math.cos(anguloRadianos) * camera.position.z
	var c = Math.cos(anguloRadianos) * camera.position.x
	var d = Math.sin(anguloRadianos) * camera.position.z
	
	camera.position.x = c + d
	camera.position.z = a + b

	camera.lookAt(scene.position);
	camera.updateProjectionMatrix()
}

function novaCamera(pi, pv){
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 500);
	camera.position.set(pi[0], pi[1], pi[2]);
	camera.lookAt(pv[0], pv[1], pv[2]);
	return camera
}

function init() {
	scene = new THREE.Scene();
	camera = novaCamera([0, 0, 10], [0, 0, 0])
	container = document.createElement('div');
	renderer = new THREE.WebGLRenderer();

	document.body.appendChild(container);
	container.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.add(camera);
	scene.add(new THREE.AmbientLight(0xffffff, 2));

	THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
	new THREE.MTLLoader().setPath('../res/eyeball/').load('eyeball.mtl', function(materials){
		materials.preload();

		new THREE.OBJLoader().setMaterials(materials).setPath('../res/eyeball/')
		.load('eyeball.obj', function(object){
			scene.add(object);
		});
	});
				
}

function animate() {
	requestAnimationFrame(animate);
	rotacionar(camera, -1)
	renderer.render(scene, camera);
}

var camera, scene, container, renderer;

init();
animate();