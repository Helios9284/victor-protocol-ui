'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export default function VictorProtocolLanding() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Enhanced lighting for glass material
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main lights for glass reflections
    const pointLight1 = new THREE.PointLight(0x3b82f6, 2.0, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x60a5fa, 1.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Additional lights for glass effect
    const pointLight3 = new THREE.PointLight(0x87ceeb, 1.2, 100);
    pointLight3.position.set(0, 5, 5);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0x93c5fd, 1.0, 100);
    pointLight4.position.set(-8, 0, 0);
    scene.add(pointLight4);

    // Directional light for better glass reflections
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Load STL model
    const loader = new STLLoader();
    const modelGroup = new THREE.Group();
    modelRef.current = modelGroup;

    loader.load(
      '/landing.stl',
      (geometry) => {
        // Calculate bounding box from geometry
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        // Center the geometry at origin
        geometry.translate(-center.x, -center.y, -center.z);
        
        // Recalculate bounding box after centering
        geometry.computeBoundingBox();
        const newBox = geometry.boundingBox!;
        const newSize = newBox.getSize(new THREE.Vector3());
        
        // Calculate scale to fit nicely in view - doubled size
        const maxDim = Math.max(newSize.x, newSize.y, newSize.z);
        const scale = (2.5 * 2) / maxDim; // Double the size
        
        // Glass material - transparent, reflective, with blue tint
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x60a5fa,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.1, // Glass transparency
          thickness: 0.1, // Glass thickness for refraction
          ior: 5.5, // Index of refraction (glass)
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
          envMapIntensity: 1.0
        });

        const mesh = new THREE.Mesh(geometry, glassMaterial);
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(0, 0, 0);
        
        // Rotate model to stand upright (rotate 90 degrees on X-axis if model is lying down)
        mesh.rotation.x = -Math.PI / 2; // Rotate to stand upright
        
        modelGroup.add(mesh);

        // Add edge highlights for glass effect
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: 0x60a5fa,
          linewidth: 1,
          transparent: true,
          opacity: 0.3
        });
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        edgeLines.scale.set(scale, scale, scale);
        edgeLines.position.set(0, 0, 0);
        edgeLines.rotation.x = -Math.PI / 2; // Match mesh rotation
        modelGroup.add(edgeLines);

        // Ensure model group is centered and stable
        modelGroup.position.set(0, 0, 0);
        modelGroup.rotation.set(0, 0, 0); // Reset all rotations
        scene.add(modelGroup);
        setLoaded(true);
      },
      (progress) => {
        // Loading progress (optional)
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`Loading: ${percent.toFixed(0)}%`);
      },
      (error) => {
        console.error('Error loading STL:', error);
      }
    );

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      if (modelRef.current) {
        // Reverse direction and slightly faster rotation on Y-axis (standing upright)
        modelRef.current.rotation.y -= 0.008;
        
        // Subtle float animation - keep it minimal
        modelRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        
        // Keep X and Z rotations at 0 to prevent falling/tilting
        modelRef.current.rotation.x = 0;
        modelRef.current.rotation.z = 0;
      }

      // Animate lights for glass reflections
      pointLight1.position.x = 5 + Math.sin(time * 0.5) * 1;
      pointLight1.position.y = 5 + Math.cos(time * 0.3) * 1;
      pointLight2.position.x = -5 + Math.sin(time * 0.4) * 1;
      pointLight2.position.y = -5 + Math.cos(time * 0.6) * 1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
      
      <div className="relative z-10 flex items-center justify-between h-full max-w-7xl mx-auto px-8">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">
              VICTOR
            </h1>
            <h2 className="text-6xl font-bold text-blue-100">
              PROTOCOL
            </h2>
          </div>
          
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          
          <p className="text-xl text-blue-200 max-w-lg leading-relaxed">
            Next-generation security infrastructure powered by advanced cryptographic protocols
          </p>
          
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-blue-500 text-blue-300 hover:bg-blue-500/10 font-semibold rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right side - Three.js STL Model */}
        <div className="flex-1 h-full relative">
          <div 
            ref={mountRef} 
            className={`w-full h-full transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-blue-400 text-xl">Loading 3D Model...</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
}