import { useStore } from '../store';

export const HUD = () => {
  const { lat, long, vel, alt } = useStore();

  return (
    <div className="absolute top-4 left-4 z-10 p-4 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-white w-64 shadow-2xl">
      <h2 className="text-xl font-bold mb-2 tracking-wider text-indigo-400">ISS TRACKER</h2>
      
      <div className="space-y-2 text-sm font-mono">
        <div className="flex justify-between">
          <span className="text-gray-400">LATITUDE</span>
          <span>{lat.toFixed(4)}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">LONGITUDE</span>
          <span>{long.toFixed(4)}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">ALTITUDE</span>
          <span>{alt.toFixed(2)} km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">VELOCITY</span>
          <span className="text-green-400">{Math.round(vel).toLocaleString()} km/h</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
        LIVE DATA FEED • NASA API
      </div>
    </div>
  );
};