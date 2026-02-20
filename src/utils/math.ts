import { Vector3 } from 'three';

/**
 * Converts Lat/Long/Altitude to 3D Cartesian coordinates
 * @param lat - Latitude in degrees
 * @param lng - Longitude in degrees
 * @param radius - Radius of the sphere (Earth)
 * @returns Vector3 (x, y, z)
 */
export const getPositionFromLatLon = (lat: number, lng: number, radius: number): Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new Vector3(x, y, z);
};