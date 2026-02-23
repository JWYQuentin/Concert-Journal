import React from 'react';
import { Calendar, MapPin, Bell } from 'lucide-react';
import { Concert } from '../types';

interface FeedProps {
  concerts: Concert[];
  onConcertClick: (id: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ concerts, onConcertClick }) => {
  return (
    <div className="flex-1 px-4 pb-24 pt-2">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 pb-4 pt-4 backdrop-blur-md -mx-4 px-8 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Concert Journal</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-6">
        {concerts.map((concert) => (
          <div
            key={concert.id}
            onClick={() => onConcertClick(concert.id)}
            className="group relative h-[400px] overflow-hidden rounded-[2rem] shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={concert.imageUrl}
                alt={concert.artist}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* Badge */}
            <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-md bg-primary shadow-lg shadow-primary/30 text-white">
              <span className="text-xs font-bold">{concert.rating.toFixed(1)}/10</span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <div className="mb-2 flex items-center gap-2">
                {concert.emojis.map((emoji, idx) => (
                  <span key={idx} className="rounded-full bg-white/20 px-2 py-1 text-xs backdrop-blur-sm">
                    {emoji}
                  </span>
                ))}
              </div>
              <h2 className="mb-1 text-3xl font-bold leading-tight text-white drop-shadow-sm">
                {concert.artist} {concert.tour && `- ${concert.tour}`}
              </h2>
              <div className="flex items-center gap-1 text-slate-200">
                <Calendar size={16} />
                <span className="text-sm font-medium ml-1">{concert.date}</span>
                <span className="mx-1">•</span>
                <MapPin size={16} />
                <span className="text-sm font-medium ml-1">{concert.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
