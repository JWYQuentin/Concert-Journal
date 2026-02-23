import React, { useState, useRef } from 'react';
import { ArrowLeft, Calendar, MapPin, Music, Save, Camera, Image as ImageIcon, X, Volume2, Eye, Zap, Star } from 'lucide-react';
import { Concert } from '../types';

interface CreateEntryProps {
  onBack: () => void;
  onSave: (concert: Concert) => void;
}

export const CreateEntry: React.FC<CreateEntryProps> = ({ onBack, onSave }) => {
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState('');
  
  // Quality Stats
  const [rating, setRating] = useState(8.0);
  const [audioQuality, setAudioQuality] = useState(5.0);
  const [visualsQuality, setVisualsQuality] = useState(5.0);
  const [crowdEnergy, setCrowdEnergy] = useState(5.0);
  
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [mediaImages, setMediaImages] = useState<string[]>([]);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSave = () => {
    if (!artist || !date) {
      alert("Please enter an artist and date");
      return;
    }

    // Basic date formatting (YYYY-MM-DD -> Month DD, YYYY)
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newConcert: Concert = {
      id: Date.now().toString(),
      artist,
      date: formattedDate,
      venue: venue || 'Unknown Venue',
      location: venue || 'Unknown Location', // Simplified for demo
      notes,
      imageUrl: coverImage || 'https://images.unsplash.com/photo-1459749411177-3c27a7364905?auto=format&fit=crop&q=80&w=2070', // Fallback image
      images: mediaImages,
      // Values from form
      rating: rating,
      emojis: ['🎵'],
      tags: [], // No default tags
      audioQuality,
      visualsQuality,
      crowdEnergy,
      genre: 'Pop' 
    };

    onSave(newConcert);
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center border-b border-gray-100 bg-white p-4">
        <button onClick={onBack} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-900 hover:bg-slate-50">
           <ArrowLeft size={24} />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-slate-900">Log New Concert</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Artist Input */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Artist</label>
            <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="h-14 w-full rounded-2xl border-none bg-slate-50 pl-12 pr-4 font-medium text-slate-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none" 
                  placeholder="Who did you see?" 
                  type="text" 
                />
            </div>
        </div>

        {/* Venue & Date */}
        <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Date</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-14 w-full rounded-2xl border-none bg-slate-50 pl-12 pr-4 font-medium text-slate-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none" 
                      type="date" 
                    />
                </div>
            </div>
             <div className="flex flex-1 flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Venue</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="h-14 w-full rounded-2xl border-none bg-slate-50 pl-12 pr-4 font-medium text-slate-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none" 
                      placeholder="City or Venue" 
                      type="text" 
                    />
                </div>
            </div>
        </div>

        {/* Quality Assessment */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-4">
             <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Quality Assessment</label>
             
             {/* Overall Rating */}
             <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2 text-slate-900"><Star size={16} className="text-primary fill-current"/> Overall Rating</span>
                    <span className="text-primary">{rating.toFixed(1)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" max="10" step="0.1" 
                    value={rating} 
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary"
                />
             </div>

             <div className="h-px bg-gray-200/50 w-full my-1"></div>

             {/* Audio */}
             <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2 text-gray-600"><Volume2 size={16}/> Audio Quality</span>
                    <span className="text-primary">{audioQuality.toFixed(1)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" max="10" step="0.1" 
                    value={audioQuality} 
                    onChange={(e) => setAudioQuality(parseFloat(e.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary"
                />
             </div>

             {/* Visuals */}
             <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2 text-gray-600"><Eye size={16}/> Visuals</span>
                    <span className="text-primary">{visualsQuality.toFixed(1)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" max="10" step="0.1" 
                    value={visualsQuality} 
                    onChange={(e) => setVisualsQuality(parseFloat(e.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary"
                />
             </div>

             {/* Crowd */}
             <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                    <span className="flex items-center gap-2 text-gray-600"><Zap size={16}/> Crowd Energy</span>
                    <span className="text-primary">{crowdEnergy.toFixed(1)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" max="10" step="0.1" 
                    value={crowdEnergy} 
                    onChange={(e) => setCrowdEnergy(parseFloat(e.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary"
                />
             </div>
        </div>

        {/* Cover Photo - New Section */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Cover Photo</label>
            <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleCoverUpload} />
            
            {coverImage ? (
              <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-sm group">
                <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
                <button 
                  onClick={() => setCoverImage(null)}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white backdrop-blur-md hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => coverInputRef.current?.click()}
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50 text-gray-400 transition-colors hover:bg-slate-100 hover:border-primary/30 hover:text-primary"
              >
                  <ImageIcon size={32} />
                  <span className="text-sm font-medium">Add Cover Image</span>
              </div>
            )}
        </div>

        {/* Photos & Videos - Updated */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Photos & Videos</label>
            <input type="file" ref={mediaInputRef} className="hidden" accept="image/*" multiple onChange={handleMediaUpload} />
            
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
               <div 
                  onClick={() => mediaInputRef.current?.click()}
                  className="flex h-24 w-24 flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 bg-slate-50 text-gray-400 transition-colors hover:bg-slate-100 hover:border-primary/30 hover:text-primary"
                >
                  <Camera size={24} />
                  <span className="text-xs font-medium">Add</span>
                </div>
                {mediaImages.map((img, idx) => (
                  <div key={idx} className="relative h-24 w-24 flex-none overflow-hidden rounded-xl bg-gray-100">
                    <img src={img} alt={`Media ${idx}`} className="h-full w-full object-cover" />
                    <button 
                      onClick={() => setMediaImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white backdrop-blur-md"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
            </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Memories</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[160px] w-full resize-none rounded-2xl border-none bg-slate-50 p-4 leading-relaxed text-slate-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 outline-none" 
              placeholder="What was the vibe? Best songs?..." 
            />
        </div>

        <button onClick={handleSave} className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
            <Save size={20} />
            Save Entry
        </button>
      </div>
    </div>
  );
};
