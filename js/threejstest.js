import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up the renderer with transparency
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
document.body.appendChild(renderer.domElement);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set the camera position
camera.position.z = 5;

// Load the MTL file
const mtlLoader = new MTLLoader();
mtlLoader.load(
    '3d/pierre/pvic.mtl',
    (materials) => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            '3d/pierre/pvic.obj',
            (object) => {
                // Traverse the object and set a basic material for each mesh
                object.traverse((child) => {
                    if (child.isMesh) {
                        // Ensure the material handles transparency
                        child.material = new THREE.MeshBasicMaterial({
                            map: child.material.map, // Keep the texture from the MTL file
                            side: THREE.DoubleSide,  // Make sure the texture is visible from both sides
                            transparent: true,       // Enable transparency
                            opacity: 1.0,           // Full opacity (adjust this if needed)
                        });

                        // Check if the texture exists and has an alpha channel (for transparency)
                        if (child.material.map && child.material.map.isTexture && child.material.map.image) {
                            const textureImage = child.material.map.image;
                            // Check for an alpha channel (or any transparency information)
                            if (textureImage && textureImage.hasOwnProperty('alpha')) {
                                child.material.alphaTest = 0.5; // Set alpha threshold to discard pixels below this value
                            }
                        }

                        // Disable texture filtering (set to NearestFilter)
                        if (child.material.map) {
                            child.material.map.magFilter = THREE.NearestFilter;
                            child.material.map.minFilter = THREE.NearestFilter;
                        }
                    }
                });
                scene.add(object);
            },
            (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
            (error) => console.log('An error happened', error)
        );
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded (MTL)'),
    (error) => console.log('An error happened while loading the MTL file', error)
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
