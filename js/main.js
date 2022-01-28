import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const elem = document.body;

elem.addEventListener("keypress", camMove);
//elem.addEventListener("", camRotate);

camera.position.z = 4;
camera.position.y = 0;
camera.rotation.x = -0.1;


function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    render();
};

function camMove(e) {
    if (e.code == "KeyW") {
        camera.position.z -= 0.1;
        console.log("W");
    } else if (e.code == "KeyS") {
        camera.position.z += 0.1;
        console.log("S");
    } else if (e.code == "KeyA") {
        camera.position.x -= 0.1;
        console.log("A");
    } else if (e.code == "KeyD") {
        camera.position.x += 0.1;
        console.log("D");
    } else if (e.code == "KeyQ") {
        camera.position.y = 0;
        camera.position.z = 4;
        camera.rotation.x = 0;

        //TODO: fix camera rotation
        console.log("Q");
    }

};

function render() {
    renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

animate();