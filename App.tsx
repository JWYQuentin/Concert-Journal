import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Feed } from './components/Feed';
import { Navigation } from './components/Navigation';
import { Detail } from './components/Detail';
import { Stats } from './components/Stats';
import { Onboarding } from './components/Onboarding';
import { CreateEntry } from './components/CreateEntry';
import { MOCK_CONCERTS, MOCK_USER, TOP_ARTISTS } from './constants';
import { Concert, UserStats } from './types';

const App = () => {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('journal');
  const [selectedConcertId, setSelectedConcertId] = useState<string | null>(null);
  
  // Lift concerts to state so we can add to it
  const [concerts, setConcerts] = useState<Concert[]>(MOCK_CONCERTS);
  const [user, setUser] = useState<UserStats>(MOCK_USER);

  const handleSaveEntry = (newConcert: Concert) => {
    setConcerts(prev => [newConcert, ...prev]);
    setActiveTab('journal');
  };

  const handleUpdateUser = (updatedUser: Partial<UserStats>) => {
      setUser(prev => ({ ...prev, ...updatedUser }));
  };

  if (isOnboarding) {
    return <Onboarding onComplete={() => setIsOnboarding(false)} onUpdateUser={handleUpdateUser} />;
  }

  const selectedConcert = selectedConcertId 
    ? concerts.find(c => c.id === selectedConcertId) 
    : null;

  // Calculate dynamic stats
  const concertCount = concerts.length;
  const uniqueArtists = new Set(concerts.map(c => c.artist)).size;
  
  const venueCounts = concerts.reduce((acc, concert) => {
    acc[concert.venue] = (acc[concert.venue] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topVenue = Object.entries(venueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None yet';

  const userWithStats = {
    ...user,
    concertCount,
    artistCount: uniqueArtists,
    topVenue
  };

  // View Routing Logic
  let content;
  
  if (selectedConcert) {
    content = (
      <Detail 
        concert={selectedConcert} 
        onBack={() => setSelectedConcertId(null)} 
      />
    );
  } else if (activeTab === 'profile') {
    content = (
        <Stats 
            user={userWithStats} 
            topArtists={TOP_ARTISTS} 
            onBack={() => setActiveTab('journal')}
            onUpdateUser={handleUpdateUser}
        />
    );
  } else if (activeTab === 'create') {
    content = (
      <CreateEntry 
        onBack={() => setActiveTab('journal')}
        onSave={handleSaveEntry}
      />
    );
  } else {
    // Default Feed for Journal
    content = (
      <Feed 
        concerts={concerts} 
        onConcertClick={setSelectedConcertId}
      />
    );
  }

  return (
    <HashRouter>
      <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-white shadow-xl">
        {content}
        
        {!selectedConcert && activeTab !== 'create' && (
          <Navigation currentTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </HashRouter>
  );
};

export default App;
