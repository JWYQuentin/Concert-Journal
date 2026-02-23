import React, { useState, useRef } from 'react';
import { Music, ArrowRight, Camera, AtSign, Plus, ChevronRight, Search } from 'lucide-react';
import { UserStats } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  onUpdateUser: (user: Partial<UserStats>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onUpdateUser }) => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState(['Indie Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz']);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [newGenre, setNewGenre] = useState('');
  
  // Profile State
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setStep(s => s + 1);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleAddGenre = () => {
    if (newGenre.trim()) {
      const genre = newGenre.trim();
      if (!availableGenres.includes(genre)) {
        setAvailableGenres(prev => [...prev, genre]);
      }
      if (!selectedGenres.includes(genre)) {
        setSelectedGenres(prev => [...prev, genre]);
      }
      setNewGenre('');
      setIsAddingGenre(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    onUpdateUser({
      name: username || 'Music Fan',
      profileImage: profileImage || undefined
    });
    onComplete();
  };

  if (step === 1) {
    return (
      <section className="relative flex h-screen w-full flex-col justify-end shrink-0 snap-start overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXigOy321FA8S7X7Ks5ZCHlF-SEtUPkYSsFoUXhQZNGeJK9bf282x9eCV60jCSQ-1zIASuUjfkPjngpVTGTjwGBRPm7bDCDjQhqqLRzRtPIh3sZSvytwb0PAHnVGr1r-igNTBklhN4RaayPcy3Z_XoS_LK9fTy8hrqhc1aTrBydhRCfGWWJYPu_tV0118r2VfHlZ3wax1dvyTXWXv6c6AbqTJ1uT9vNWXHHrYH3Uh5Xmyx8BK94XOUputXk5xR-XDf9Crmz-9mFQ")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        </div>
        <div className="relative z-10 flex w-full flex-col gap-6 px-6 pb-12">
          <div className="flex flex-col gap-2">
            <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
              <Music className="text-primary" size={14} />
              <span className="text-xs font-bold uppercase tracking-wide text-white">Concert Journal</span>
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
              Welcome to Your <br />
              <span className="text-primary">Concert Journal</span>
            </h1>
            <p className="text-lg font-medium leading-relaxed text-white/80">
              Your musical journey starts here. Track every beat, remember every show.
            </p>
          </div>
          <div className="pt-4">
            <button onClick={nextStep} className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-blue-600 active:scale-[0.98]">
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="flex min-h-screen w-full flex-col bg-background-light px-6 py-8">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
          <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
          <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="mb-2 text-3xl font-bold leading-tight text-slate-900">Let's get you set up</h2>
          <p className="mb-8 text-gray-500">Create your profile to start connecting.</p>
          
          <div className="mb-8 flex justify-center">
            <div className="group relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div 
                className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 bg-cover bg-center shadow-sm" 
                style={{ backgroundImage: `url("${profileImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVVY-zrzf8dlqwYB-cRr-ij6p0dzJsvDsnFzsbBC61ZH8VPWHWv7mkOxIiRhK4-eMWDDiIODMwvaEy_4dFm1M2BisihXZ3NtsE1pGAPJhOsjtjCHsZnQUbiuZmLb1diTgvDhDdgha0cOnZqlplbjFUNKMNFVJRwxsuy-s-fmnf3Q28l-zLGd1RQE4ivAskP5Cy1fJPtS6mN9nlsC7KS46HczYO9ffFi9EoGBxIKPi-nn64U9bh2kNJa6C4hC3JdvizjcM9VNayVQ'}")` }}
              ></div>
              <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full border-4 border-background-light bg-primary p-2 text-white shadow-sm">
                <Camera size={16} />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="ml-1 text-sm font-bold uppercase tracking-wide text-slate-900">Username</span>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 w-full rounded-full border-none bg-white pl-12 pr-4 font-medium text-slate-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-primary/20" 
                  placeholder="e.g. RockFan88" 
                  type="text" 
                />
              </div>
            </label>
            <div className="flex flex-col gap-3">
              <span className="ml-1 text-sm font-bold uppercase tracking-wide text-slate-900">Favorite Music Genres</span>
              <div className="flex flex-wrap gap-2">
                {availableGenres.map(genre => (
                  <button 
                    key={genre} 
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-transform active:scale-95 ${
                      selectedGenres.includes(genre) 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'bg-white text-gray-600 border border-gray-100'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
                
                {isAddingGenre ? (
                   <div className="flex items-center rounded-full border border-primary bg-white px-3 py-1.5 shadow-sm">
                      <input 
                        autoFocus
                        className="w-24 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder-gray-400"
                        placeholder="Search genre..."
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddGenre();
                          if (e.key === 'Escape') setIsAddingGenre(false);
                        }}
                        onBlur={() => {
                          if(newGenre) handleAddGenre();
                          setIsAddingGenre(false);
                        }}
                      />
                   </div>
                ) : (
                  <button 
                    onClick={() => setIsAddingGenre(true)}
                    className="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-200"
                  >
                    <Plus size={16} /> More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <button onClick={nextStep} className="h-14 w-full rounded-full bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-blue-600 active:scale-[0.98]">
            Next Step
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen w-full flex-col bg-white px-6 py-8">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-primary opacity-30"></div>
        <div className="h-1.5 flex-1 rounded-full bg-primary opacity-30"></div>
        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
      </div>
      <div className="flex flex-1 flex-col items-center pt-4">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-blue-50 relative">
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-2 border-dashed border-primary/30"></div>
          <span className="text-6xl">🎉</span>
        </div>
        <h2 className="mb-10 text-center text-3xl font-bold leading-tight text-slate-900">Ready to log your first show?</h2>
        
        <div className="flex w-full flex-col gap-4">
          <button onClick={handleComplete} className="group w-full rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-1 text-left transition-all hover:from-blue-100 hover:to-indigo-100">
            <div className="flex h-full items-center gap-4 rounded-xl border border-blue-100/50 bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <Plus className="text-primary" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900">Start a new entry</span>
                <span className="text-sm text-gray-500">Manually add details & photos</span>
              </div>
              <ChevronRight className="ml-auto text-gray-300 transition-colors group-hover:text-primary" />
            </div>
          </button>
        </div>
      </div>
      <div className="mt-auto flex justify-center pt-6">
        <button onClick={handleComplete} className="rounded-full px-4 py-2 text-sm font-semibold text-gray-400 transition-colors hover:text-primary">
          Skip for now
        </button>
      </div>
    </section>
  );
};
