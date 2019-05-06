var novoCubo = function(x, y, z){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = new THREE.MeshBasicMaterial();
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	return cube
}

var novaCamera = function(pi, pv){
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 500);
	camera.position.set(pi[0], pi[1], pi[2]);
	camera.lookAt(pv[0], pv[1], pv[2]);
	return camera
}

var rotacionar = function(camera, angulo){
	var anguloRadianos = (angulo) * Math.PI / 180
	var a = Math.sin(anguloRadianos) * camera.position.x * -1
	var b = Math.cos(anguloRadianos) * camera.position.z
	var c = Math.cos(anguloRadianos) * camera.position.x
	var d = Math.sin(anguloRadianos) * camera.position.z
	
	camera.position.x = c + d
	camera.position.z = a + b

	camera.lookAt(0, 0, 0); // Tem que corrigir isso pra
	camera.updateProjectionMatrix()
}

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cubo = novoCubo(2, 2, 2)
camera = novaCamera([0, 0, 5], [0, 0, 0])

var animate = function() {
	requestAnimationFrame(animate);
	rotacionar(camera, -1)
	renderer.render(scene, camera);
};

animate()