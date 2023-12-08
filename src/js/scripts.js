//Las importaciones
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//Perspectiva
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

//Color del fondo
renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

//Posición de la camara
camera.position.set(6, 6, 6);
orbit.update();

//Grid
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

//Variables de los encoders
const gltfLoader = new GLTFLoader();

const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 4;

let myModel;

//Generación y cargado de las texturas en ruta
rgbeLoader.load('./assets/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('./assets/scene.gltf', function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        myModel = model;
    });
});

//Renderizado de la animación
function animate(time) {
 /*   if(myModel)
        myModel.rotation.y = - time / 2000;*/
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

//Reajustar la pantalla
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});