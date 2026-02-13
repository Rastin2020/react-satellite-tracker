import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { useStore } from '../store';
import { getPositionFromLatLon } from '../utils/math';

export const ISS = () => {
  const issRef = useRef<Mesh>(null!);
  const setISSData = useStore((state) => state.setISSData);
  
  // Start slightly off-screen so it doesn't "teleport" in view
  const [targetPos, setTargetPos] = useState(new Vector3(2, 0, 0));

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await res.json();

        // Earth radius is 2.5. Clouds are 2.53. 
        // We set radius to 2.65 to ensure it floats above the clouds.
        const pos = getPositionFromLatLon(data.latitude, data.longitude, 2.65); 
        setTargetPos(pos);

        // Update the Store for the UI
        setISSData({
          lat: data.latitude,
          long: data.longitude,
          alt: data.altitude,
          vel: data.velocity
        });
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 2000);
    return () => clearInterval(interval);
  }, [setISSData]);

  useFrame(() => {
    if (issRef.current) {
      // Smoothly interpolate position
      issRef.current.position.lerp(targetPos, 0.1);
      
      // Make the ISS look at the center of the Earth (optional, for orientation)
      issRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh ref={issRef}>
      {/* Increased size slightly for better visibility */}
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial 
        color="#ff0000" 
        emissive="#ff0000" 
        emissiveIntensity={3} // Make it glow brighter
        toneMapped={false}    // Helps the glow stand out against the bright Earth
      />
    </mesh>
  );
};