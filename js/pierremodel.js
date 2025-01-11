import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);

// Get the container
const container = document.getElementById('canvas');

// Set up the renderer with transparency
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
renderer.setSize(containerWidth, containerHeight);

// Set a transparent background
renderer.setClearColor(0x000000, 0); // Transparent background

// Append the renderer's canvas to the container
container.appendChild(renderer.domElement);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set the camera position
camera.position.x = -0.02;
camera.position.y = 1.09
camera.position.z = -0.95;

// Load the MTL file
let model = null
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
                model = object;

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

                // After adding the model, we can set the target of the controls to the model's position
                // To focus on the model
                const bbox = new THREE.Box3().setFromObject(object); // Get the bounding box of the object
                const center = bbox.getCenter(new THREE.Vector3()); // Get the center of the bounding box

                controls.target.copy(center); // Set the target of OrbitControls to the center of the model

                // Optionally, adjust the camera position based on the model's size
                //const size = bbox.getSize(new THREE.Vector3()).length();
                //camera.position.set(center.x, center.y, size * 2); // Adjust camera position relative to the size of the model
                //camera.lookAt(center); // Ensure the camera is looking at the model's center
            },
            (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
            (error) => console.log('An error happened', error)
        );
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded (MTL)'),
    (error) => console.log('An error happened while loading the MTL file', error)
);

// Function to log camera position and direction
function logCameraInfo() {
    // Log camera position
    console.log('Camera Position:', camera.position);

    // Log camera direction (normalized vector pointing where the camera is looking)
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    console.log('Camera Direction:', direction);
}

window.addEventListener('keydown', (e) => {
    if (e.code == "KeyD") {
        logCameraInfo();
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    //setCameraDirection(-0.06, 2, 0.9);
    //console.log(rer)

    if (model) {
        model.rotation.y += 0.03;
    }
    
}
animate();

/* Handle resizing
window.addEventListener('resize', () => {
    // Update the renderer and camera when the window resizes
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);

    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
});*/