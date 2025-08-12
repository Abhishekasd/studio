
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const [isMounted, setIsMounted] = useState(false);
  const particlesRef = useRef<THREE.InstancedMesh>();
  const dummy = useRef(new THREE.Object3D()).current;
  const particlesData = useRef<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const particlesCount = 5000;
    
    // Main golden squares
    const squareGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    const squareMaterial = new THREE.MeshBasicMaterial({ color: 'hsl(45, 100%, 75%)' });
    const squares = new THREE.InstancedMesh(squareGeometry, squareMaterial, particlesCount);
    
    particlesData.current = [];
    for (let i = 0; i < particlesCount; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;

        dummy.position.set(x, y, z);
        dummy.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        dummy.updateMatrix();
        squares.setMatrixAt(i, dummy.matrix);

        particlesData.current.push({
            position: new THREE.Vector3(x, y, z),
            rotation: new THREE.Euler(dummy.rotation.x, dummy.rotation.y, dummy.rotation.z),
            velocity: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01),
            rotationSpeed: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01)
        });
    }
    squares.instanceMatrix.needsUpdate = true;
    particlesRef.current = squares;
    scene.add(squares);

    // Starfield
    const starVertices = [];
    const starColors = [];
    const starColor = new THREE.Color(0xffffff);
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 30;
        starVertices.push(x, y, z);
        starColors.push(starColor.r, starColor.g, starColor.b);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
        size: 0.01,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);


    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate golden squares
      if (particlesRef.current) {
        for (let i = 0; i < particlesCount; i++) {
            const data = particlesData.current[i];
            
            data.position.add(data.velocity);
            data.rotation.x += data.rotationSpeed.x;
            data.rotation.y += data.rotationSpeed.y;
            
            if (data.position.x > 10 || data.position.x < -10) data.velocity.x *= -1;
            if (data.position.y > 10 || data.position.y < -10) data.velocity.y *= -1;
            if (data.position.z > 10 || data.position.z < -10) data.velocity.z *= -1;
            
            dummy.position.copy(data.position);
            dummy.rotation.copy(data.rotation);
            dummy.updateMatrix();
            particlesRef.current.setMatrixAt(i, dummy.matrix);
        }
        particlesRef.current.instanceMatrix.needsUpdate = true;
      }
      
      // Animate camera for parallax
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.1) * 0.5;
      camera.lookAt(scene.position);

      stars.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.remove(squares);
      scene.remove(stars);
      squareGeometry.dispose();
      squareMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, [isMounted, dummy]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-20 h-full w-full">
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        "bg-gradient-to-b from-[hsl(220,40%,10%)] to-[hsl(220,40%,4%)]"
      )}/>
      <div ref={mountRef} className="h-full w-full" />
    </div>
  );
};

export default ThreeBackground;
