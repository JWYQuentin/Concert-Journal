import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Share2, MoreVertical, Calendar, MapPin, Volume2, Eye, Zap, Camera, Sparkles, Save, Edit2, Upload, Plus, X, Star } from 'lucide-react';
import { Concert } from '../types';
import { analyzeConcertMemory } from '../services/geminiService';

interface DetailProps {
  concert: Concert;
  onBack: () => void;
}

export const Detail: React.FC<DetailProps> = ({ concert, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [geminiResult, setGeminiResult] = useState<{ summary?: string; vibe?: string[] } | null>(null);
  
  // Local state for editing functionality
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable Fields
  const [imageUrl, setImageUrl] = useState(concert.imageUrl);
  const [images, setImages] = useState<string[]>(concert.images);
  const [notes, setNotes] = useState(concert.notes);
  const [rating, setRating] = useState(concert.rating);
  const [audioQuality, setAudioQuality] = useState(concert.audioQuality);
  const [visualsQuality, setVisualsQuality] = useState(concert.visualsQuality);
  const [crowdEnergy, setCrowdEnergy] = useState(concert.crowdEnergy);
  const [tags, setTags] = useState<string[]>(concert.tags || []);
  const [activeEmotions, setActiveEmotions] = useState<string[]>(['Euphoric', 'Nostalgic']); // Default/Mock logic

  // Helper references
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const availableEmotions = [
    { label: 'Euphoric', emoji: '🤩' },
    { label: 'Nostalgic', emoji: '🥹' },
    { label: 'Energetic', emoji: '🔥' },
    { label: 'Sentimental', emoji: '🥺' },
    { label: 'Chill', emoji: '😌' }
  ];

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeConcertMemory(notes);
    if (result) {
      setGeminiResult({
        summary: result['summary'],
        vibe: result['tags']
      });
    }
    setIsAnalyzing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEmotion = (emotionLabel: string) => {
    if (!isEditing) return;
    setActiveEmotions(prev => 
      prev.includes(emotionLabel) 
        ? prev.filter(e => e !== emotionLabel) 
        : [...prev, emotionLabel]
    );
  };

  const handleAddTag = () => {
    const newTag = prompt("Enter new tag:");
    if (newTag) {
      setTags(prev => [...prev, newTag]);
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-20 flex flex-col gap-2 border-b border-gray-100 bg-white px-6 pb-4 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center justify-center rounded-full p-2 text-slate-900 transition-colors hover:bg-gray-100">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center justify-center rounded-full p-2 transition-colors ${isEditing ? 'bg-primary/10 text-primary' : 'text-slate-900 hover:bg-gray-100'}`}
            >
              <Edit2 size={20} />
            </button>
            <button className="flex items-center justify-center rounded-full p-2 text-slate-900 transition-colors hover:bg-gray-100">
              <Share2 size={24} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold leading-tight text-slate-900">{concert.artist}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
            <Calendar size={16} />
            <span>{concert.date}</span>
            <span className="text-slate-300">•</span>
            <MapPin size={16} />
            <span>{concert.venue}</span>
          </div>
          <p className="mt-1 pl-[2px] text-xs font-medium uppercase tracking-wide text-slate-500">
            {concert.section}, {concert.row}
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-8 px-6 py-6">
        {/* Hero Image */}
        <div className="group relative h-48 w-full overflow-hidden rounded-xl shadow-sm bg-gray-100">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
          {concert.tour && (
            <div className="absolute bottom-4 left-4 z-20">
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                {concert.tour}
              </span>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute right-4 top-4 z-20 flex items-center justify-center rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
            <span className="text-sm font-bold text-white">{rating.toFixed(1)}/10</span>
          </div>

          <img
            src={imageUrl}
            alt="Concert Hero"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Change Cover Option */}
          {isEditing && (
             <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <button 
                  onClick={() => coverInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition-transform active:scale-95"
                >
                  <Upload size={16} /> Change Cover
                </button>
                <input 
                  type="file" 
                  ref={coverInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleCoverUpload} 
                />
             </div>
          )}
        </div>
        
        {/* Helper text for cover change if editing */}
        {isEditing && (
            <div className="flex justify-center -mt-6">
                <button 
                    onClick={() => coverInputRef.current?.click()}
                    className="text-xs font-semibold text-primary underline"
                >
                    Change cover image
                </button>
            </div>
        )}

        {/* Quality Assessment */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-slate-900">Quality Assessment</h3>
          <div className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-slate-50 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            
            {/* Overall Rating */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Star size={18} className="text-primary fill-current" />
                  <span>Overall Rating</span>
                </div>
                <span className="rounded border border-gray-100 bg-white px-2 py-0.5 font-bold text-slate-900 shadow-sm">
                  {rating.toFixed(1)}
                </span>
              </div>
              {isEditing ? (
                  <input 
                  type="range" 
                  min="0" max="10" step="0.1"
                  value={rating} 
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary cursor-pointer"
                  />
              ) : (
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${rating * 10}%` }}></div>
                </div>
              )}
            </div>

            <div className="h-px w-full bg-gray-200/60"></div>

            {[
              { label: 'Audio Quality', val: audioQuality, icon: Volume2, setter: setAudioQuality },
              { label: 'Visuals & Choreography', val: visualsQuality, icon: Eye, setter: setVisualsQuality },
              { label: 'Crowd Energy', val: crowdEnergy, icon: Zap, setter: setCrowdEnergy },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  <span className="rounded border border-gray-100 bg-white px-2 py-0.5 font-bold text-slate-900 shadow-sm">
                    {item.val.toFixed(1)}
                  </span>
                </div>
                {isEditing ? (
                   <input 
                    type="range" 
                    min="0" max="10" step="0.1"
                    value={item.val} 
                    onChange={(e) => item.setter(parseFloat(e.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary cursor-pointer"
                   />
                ) : (
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.val * 10}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Context */}
        <section className="flex flex-col gap-4 rounded-2xl border-2 border-dashed border-primary/30 p-4">
          <h3 className="text-lg font-bold text-slate-900">Concert Context</h3>
          
          {/* Tags */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tags</p>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, idx) => (
                <div key={idx} className="group relative">
                    <span className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary/20">
                    {tag}
                    </span>
                    {isEditing && (
                        <button 
                            onClick={() => setTags(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white group-hover:flex"
                        >
                            <X size={10} />
                        </button>
                    )}
                </div>
              ))}
              
              {/* New Entry Button / Add Tag */}
              {isEditing && (
                  <button 
                    onClick={handleAddTag}
                    className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary/20 hover:bg-blue-600 transition-colors active:scale-95"
                  >
                    <Plus size={14} /> Add Tag
                  </button>
              )}
            </div>
          </div>
          
          {/* Emotional Impact */}
          <div className="mt-1 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Emotional Impact</p>
            <div className="flex flex-wrap gap-2">
               {availableEmotions.map((emotion) => {
                 const isActive = activeEmotions.includes(emotion.label);
                 if (!isEditing && !isActive) return null; // Only show active in view mode
                 
                 return (
                   <button
                     key={emotion.label}
                     onClick={() => toggleEmotion(emotion.label)}
                     disabled={!isEditing}
                     className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                       isActive 
                        ? 'border border-primary/20 bg-primary/10 text-primary ring-2 ring-primary/20' 
                        : 'border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                     } ${isEditing ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                   >
                      <span>{emotion.label}</span> <span className="text-base">{emotion.emoji}</span>
                   </button>
                 );
               })}
            </div>
          </div>
        </section>

        {/* Memory Log */}
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h3 className="text-lg font-bold text-slate-900">Memory Log</h3>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                    <Camera size={16} /> Add Media
                </button>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload} 
          />

          {/* Carousel */}
          <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 pb-2">
            {images.map((img, i) => (
              <div key={i} className="group relative h-28 w-28 flex-none overflow-hidden rounded-lg shadow-sm">
                 <img src={img} alt="" className="h-full w-full object-cover" />
                 {isEditing && (
                    <button 
                        onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute right-1 top-1 rounded bg-red-500/80 p-1 text-white backdrop-blur-sm"
                    >
                        <X size={12} />
                    </button>
                 )}
              </div>
            ))}
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex h-28 w-28 flex-none flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-slate-50 text-gray-400 transition-colors hover:bg-gray-100"
             >
               <Camera size={24} />
               <span className="text-xs font-medium">Add</span>
             </button>
          </div>

          {/* AI Journal */}
          <div className="relative mt-2">
            <textarea 
              readOnly={!isEditing}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`min-h-[160px] w-full resize-none rounded-xl border-none p-4 leading-relaxed text-gray-700 shadow-inner focus:ring-0 outline-none transition-colors ${isEditing ? 'bg-white ring-2 ring-primary/20' : 'bg-slate-100'}`}
            />
            
            {geminiResult && (
              <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-bold flex items-center gap-2 mb-1"><Sparkles size={14}/> AI Summary</p>
                {geminiResult.summary}
              </div>
            )}

            {!geminiResult && !isEditing && (
              <button 
                onClick={handleAIAnalysis}
                disabled={isAnalyzing}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm hover:bg-gray-50 disabled:opacity-50"
              >
                {isAnalyzing ? (
                   <span className="animate-spin">⌛</span>
                ) : (
                  <Sparkles size={14} />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Analyze Memory'}
              </button>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer Action */}
      <footer className="fixed bottom-0 z-30 w-full max-w-md border-t border-gray-100 bg-white/90 p-4 pb-8 backdrop-blur-lg">
        <button className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98] hover:bg-blue-600">
          <Save size={20} />
          {isEditing ? 'Save Changes' : 'Save Memory to Profile'}
        </button>
      </footer>
    </div>
  );
};
