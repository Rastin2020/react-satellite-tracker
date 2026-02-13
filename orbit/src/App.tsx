import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Loader } from '@react-three/drei';

import { Earth } from './components/Earth';
import { ISS } from './components/ISS';
import { HUD } from './components/HUD';

function App() {
  return (
    <div className="h-screen w-full bg-black relative">
      
      {/* The 2D UI Overlay */}
      <HUD />

      {/* The 3D Scene */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        
        {/* LIGHTING */}
        {/* Ambient Light: Soft base light so shadows aren't pitch black */}
        <ambientLight intensity={0.1} /> 
        
        {/* Directional Light: The "Sun" hitting the Earth */}
        <directionalLight position={[10, 5, 5]} intensity={1.5} />
        
        {/* BACKGROUND */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        {/* OBJECTS (Wrapped in Suspense for texture loading) */}
        <Suspense fallback={null}>
          <Earth />
          <ISS />
        </Suspense>

        {/* CONTROLS */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          minDistance={3.5} 
          maxDistance={12} 
        />
      </Canvas>
      
      <Loader />
    </div>
  );
}

export default App;