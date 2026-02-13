import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';

export const Earth = () => {
  const earthRef = useRef<Mesh>(null!);
  const cloudsRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  // Load all textures from the Three.js CDN
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  useFrame(() => {
    // Rotate the Earth slowly
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0002; 
    }
    // Rotate clouds slightly faster for a parallax effect
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. THE EARTH SPHERE */}
      <mesh ref={earthRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap} // Adds bumpiness to mountains
          specularMap={specularMap} // Makes oceans shiny, land matte
          specular={0x333333} // Greyish reflection
          shininess={5}
        />
      </mesh>

      {/* 2. THE CLOUD LAYER (Slightly larger than Earth) */}
      <mesh ref={cloudsRef} scale={2.53}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={2} // Additive blending for a glow effect
          side={2} // Render on both sides
        />
      </mesh>
    </group>
  );
};