export interface Concert {
  id: string;
  artist: string;
  tour?: string;
  date: string;
  venue: string;
  location: string;
  rating: number; // 0-10
  imageUrl: string;
  emojis: string[];
  tags: string[];
  audioQuality: number;
  visualsQuality: number;
  crowdEnergy: number;
  section?: string;
  row?: string;
  notes: string;
  images: string[]; // Additional gallery images
  genre: 'Pop' | 'Rock' | 'Indie' | 'R&B' | 'Hip Hop' | 'Electronic' | 'Jazz' | 'Country';
}

export interface UserStats {
  name?: string;
  profileImage?: string;
  concertCount: number;
  artistCount: number;
  topVenue: string;
}

export interface ArtistStat {
  id: string;
  name: string;
  genre: string;
  showCount: number;
  imageUrl: string;
  rank: number;
}
