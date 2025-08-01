import React, { useEffect, useRef } from 'react';
import { Play, UserPlus } from 'lucide-react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader } from 'three';

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8); // Moved camera back to accommodate larger model

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting - Holographic blue theme for earth globe
    const ambientLight = new THREE.AmbientLight(0x1E3A8A, 0.4); // Blue ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x3B82F6, 1.8); // Bright blue directional light
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x60A5FA, 2.5, 100); // Very bright blue point light
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Holographic accent lights
    const accentLight1 = new THREE.SpotLight(0x2563EB, 1.5, 50, Math.PI / 6, 0.5);
    accentLight1.position.set(-3, 3, 3);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x1D4ED8, 1.2, 30);
    accentLight2.position.set(3, -2, 1);
    scene.add(accentLight2);

    // Holographic rim light
    const rimLight = new THREE.DirectionalLight(0x1E40AF, 1.0);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Additional holographic glow
    const glowLight = new THREE.PointLight(0x00FFFF, 1.0, 40);
    glowLight.position.set(0, 0, 3);
    scene.add(glowLight);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      '/earth_emission_color_and_alpha.png',
      undefined,
      undefined,
      (error) => console.error('Error loading earth texture:', error)
    );
    const raysTexture = textureLoader.load(
      '/rays_color_and_alpha.png',
      undefined,
      undefined,
      (error) => console.error('Error loading rays texture:', error)
    );

    // Load FBX model
    const loader = new FBXLoader();
    loader.load(
      '/earth_globe_hologram.fbx',
      (object) => {
        // Scale and position the model - Earth globe hologram
        object.scale.setScalar(0.05); // Adjusted for earth globe size
        object.position.set(0, 0, 0);
        
        // Apply textures to the model
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Apply textures based on material names or mesh names
            if (child.material) {
              const materialName = child.material.name.toLowerCase();
              const meshName = child.name.toLowerCase();
              
              // Apply earth texture to earth-related materials
              if (materialName.includes('earth') || meshName.includes('earth') || 
                  materialName.includes('globe') || meshName.includes('globe')) {
                child.material.map = earthTexture;
                child.material.emissiveMap = earthTexture;
                child.material.emissive = new THREE.Color(0x00ffff);
                child.material.emissiveIntensity = 0.5;
                child.material.transparent = true;
                child.material.opacity = 0.9;
              } 
              // Apply rays texture to ray-related materials
              else if (materialName.includes('rays') || meshName.includes('rays') ||
                       materialName.includes('hologram') || meshName.includes('hologram')) {
                child.material.map = raysTexture;
                child.material.transparent = true;
                child.material.opacity = 0.8;
                child.material.blending = THREE.AdditiveBlending;
              }
              // Apply default holographic effect to other materials
              else {
                child.material.transparent = true;
                child.material.opacity = 0.7;
                child.material.emissive = new THREE.Color(0x00ffff);
                child.material.emissiveIntensity = 0.3;
              }
              
              child.material.needsUpdate = true;
            }
          }
        });

        modelRef.current = object;
        scene.add(object);
        setIsLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
      },
      (error) => {
        console.error('Error loading FBX model:', error);
        setIsLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        // Rotate the model
        modelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle mouse movement for interactive rotation - only when hovering over the model
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Check if mouse is within the model container bounds
      if (mouseX >= rect.left && mouseX <= rect.right && 
          mouseY >= rect.top && mouseY <= rect.bottom) {
        isMouseDown = true;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || !modelRef.current) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = mouseX - lastMouseX;
      const deltaY = mouseY - lastMouseY;
      
      // Rotate based on mouse movement (clockwise/counterclockwise)
      modelRef.current.rotation.y += deltaX * 0.01; // Horizontal rotation
      modelRef.current.rotation.x += deltaY * 0.01; // Vertical rotation
      
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-600 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 bg-clip-text text-transparent animate-pulse">
              United Hacks V6
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              The Ultimate Global Online Hackathon - Code. Create. Compete.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                <Play size={20} />
                Watch Trailer
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                <UserPlus size={20} />
                Register Now
              </button>
            </div>
          </div>

          {/* 3D Model - Now on the right */}
          <div className="lg:w-1/2 flex justify-center">
            <div 
              ref={mountRef} 
              className="model-container relative cursor-grab active:cursor-grabbing"
              style={{ width: '500px', height: '500px' }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-blue-400">Loading 3D Model...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;