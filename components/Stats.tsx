import React, { useRef } from 'react';
import { ArrowLeft, Settings, Verified, Camera } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { UserStats, ArtistStat } from '../types';

interface StatsProps {
  user: UserStats;
  topArtists: ArtistStat[];
  onBack?: () => void;
  onUpdateUser?: (user: Partial<UserStats>) => void;
}

const COLORS = ['#256af4', '#0ea5e9', '#6366f1', '#8b5cf6'];
const GENRE_DATA = [
  { name: 'Pop', value: 45 },
  { name: 'Rock', value: 30 },
  { name: 'Indie', value: 15 },
  { name: 'R&B', value: 10 },
];

export const Stats: React.FC<StatsProps> = ({ user, topArtists, onBack, onUpdateUser }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app we'd upload this. For now, we use the base64 string locally.
        onUpdateUser({ ...user, profileImage: reader.result as string } as any);
      };
      reader.readAsDataURL(file);
    }
  };

  // Use the profileImage from user if available, otherwise default
  const profileImage = user.profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBCkLE4QW4qDK3WIpkUwbADmBZGB84Lid7Zjih69jolpzmrMWZN0WX7zy4GQzRVforrfkSDqNh5bwI_7PmRsqIxPRvwLl1_RrI7kA_7AIWA2fPLwfvQk12UMBFqe8dvOrypK7-2SPqRlWSp0SKc_DFWkNan5UKr1pUZ2t7JwbUWz-K4tccJhdbyZThCTJ-pmoGPG1GnyrwP33gzQfVTGkazgBwZRXnVG5yS0zU7B0CP-p5ffPxdXgO8Bf-XCUGjFspNnkUnHtxChA";

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white pb-48">
      {/* Nav */}
      <div className="sticky top-0 z-10 flex items-center border-b border-primary/10 bg-white p-4">
        {onBack && (
            <button onClick={onBack} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-slate-900">
                <ArrowLeft size={24} />
            </button>
        )}
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-slate-900">My Concert Stats</h2>
        <div className="flex w-10 items-center justify-end">
          <Settings size={24} className="text-slate-900" />
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center p-6">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div 
            className="h-24 w-24 rounded-full border-4 border-primary/10 bg-cover bg-center shadow-sm transition-opacity group-hover:opacity-80"
            style={{ backgroundImage: `url("${profileImage}")` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <Camera className="text-white drop-shadow-md" size={24} />
          </div>
          <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full border-2 border-white bg-primary p-1 text-white">
            <Verified size={12} />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>
        
        <div className="mt-4 w-full max-w-[240px] text-center">
          <p className="text-2xl font-bold tracking-tight text-slate-900">{user.name || 'Alex Reed'}</p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="mb-8 grid grid-cols-3 gap-3 px-4">
        {[
          { val: user.concertCount, label: 'Concerts' },
          { val: user.artistCount, label: 'Artists' },
          { val: user.topVenue, label: 'Top Venue', isText: true },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1 rounded-xl border border-primary/10 bg-primary/5 p-4 text-center">
            <p className={`font-bold text-primary ${stat.isText ? 'text-xs leading-tight line-clamp-2 min-h-[2rem] flex items-center justify-center' : 'text-2xl'}`}>
              {stat.val}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-900">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Top Artists */}
      <div className="mb-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Top Artists</h3>
          <span className="cursor-pointer text-sm font-semibold text-primary">View All</span>
        </div>
        <div className="space-y-3">
          {topArtists.map((artist, i) => (
            <div key={artist.id} className={`flex items-center gap-4 rounded-xl p-3 ${i === 0 ? 'bg-background-light border border-transparent hover:border-primary/20' : 'bg-background-light'}`}>
              <span className={`text-lg font-bold w-4 ${i === 0 ? 'text-primary' : i === 1 ? 'text-primary/60' : 'text-primary/40'}`}>{i + 1}</span>
              <div className="h-12 w-12 rounded-lg bg-cover bg-center shadow-sm" style={{ backgroundImage: `url(${artist.imageUrl})` }}></div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{artist.name}</p>
                <p className="text-xs text-gray-500">{artist.genre}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{artist.showCount}</p>
                <p className="text-[10px] font-medium text-gray-500">SHOWS</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibe Breakdown */}
      <div className="mb-8 px-4">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Vibe Breakdown</h3>
        <div className="space-y-6 rounded-2xl border border-primary/10 bg-primary/5 p-6">
          {[
            { label: 'Audio Quality', val: 8.5 },
            { label: 'Visuals & Production', val: 9.2 },
            { label: 'Crowd Energy', val: 7.8 },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-900">{stat.label}</span>
                <span className="text-sm font-bold text-primary">{stat.val}/10</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-primary" style={{ width: `${stat.val * 10}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Mix - Circle Graph */}
      <div className="px-4 mb-4">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Genre Mix</h3>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="h-72 w-full max-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GENRE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={0} // Full circle pie
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {GENRE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Based on your concert history</p>
        </div>
      </div>
    </div>
  );
};
