import { Concert, UserStats, ArtistStat } from './types';

export const MOCK_CONCERTS: Concert[] = [
  {
    id: '1',
    artist: 'Taylor Swift',
    tour: 'The Eras Tour',
    date: 'Oct 26, 2024',
    venue: 'SoFi Stadium',
    location: 'Los Angeles, CA',
    rating: 9.5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1Bk7HpJ3D1XsuprGPVyo50SD0L1CPI5idqHPk3C7O6DrB8R4o7yUL5vr9EBlZVeRg6xFVQeAB6HsST0LVIjS0DSCJWvgHMjmTaqV_n_3VJYxm0pTaPaeHvqV5sev5bpjOGCRcn59_YytBDJJOLhNqtwJtL-qqavkHtBeKNeYc3Y_zkBx94lI946gRs1hp5bHhjszfZsgQTxSCdo_LrasoD17VA0RjT2ZwkwDcK3ZqvzJuABq4ZzshRkokLvNcHwHWXBQ-gIGIzw',
    emojis: ['🤩', '🥹', '🎆'],
    tags: ['Arena Tour', 'Pop Genre', 'Solo Act'],
    audioQuality: 9.2,
    visualsQuality: 9.5,
    crowdEnergy: 10.0,
    section: 'SECTION 112',
    row: 'ROW F',
    notes: "The energy tonight was absolutely unreal. When she played the surprise song on the acoustic guitar, the entire stadium went silent. I've never felt so connected to a crowd before. Best night ever! 🌌✨",
    images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uor2uFzadCfPMDPcGaNDRTH-KYaRe7luOjduaVVwZ9ghH8TxQk9EjORxtEbmqhpc6kR1xlVcvKAtQpNmvBOIMIY6yJC8z1671bSOWEt8s3vR6SjrnRFsL3cIcsZrFnGjVnBAGIhJKUXji0-NR_xDZZ4z0sJYafk-zvdWpJQZvCwXcuUqN1PTNqrfjDLbo39pha0ubHZGiXUs_iMrkrgZPe6_JX3kxQhqJpPvDUq692Ip0EvPR-ngquspjl1s2uAvHms8H_nFPQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDzu2Z79qJXECAoJSN1-s0VZgi2JvI3dRpliojEJvfdTB40MCkBRHZxfzWmRjLYzIS0v78bufY9joFY8s2bMs0r8mByx_o7xLAkGp2Iigi5kuL25I_dwZ-A2xK4-ADbg_xe97eg9gL86xgtuuhGtNktGy2YElSlvEm6tnWZHvd-RqJ7vC0d58_4bKvZEO7-2UpS0AQavJ88_j7OmO5Hv9gZzfrZebI-4G9FNrjqnK0Vi-5V-2VcsYvp3qmnniCnuFlA9mMKCzJB0A',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA0kJ5yVekAiuMuEYHaXie4ZkZAZeMegZYHPxge53NR7UjcnXb9t4GxKjS7VUQlwN_ivbyu_-udS1A0Db1lW3hYqHY1lhJ0ZaaqMFYIsVnsJvxcaKMKdGi_0Mia0n6ITixIxyeaC1Bm_hgGqyTd8krc3_B3vMVaQVv-jIAOT3YwiucobQVtTyS7l8UNreuXfdXUNdAupjTNc7DshDuT3rOamJyO8ApSwrU3iRbw81-yNkS4OFsx4yVN20foFQWmALYPNwP2frvEGw'
    ],
    genre: 'Pop'
  },
  {
    id: '2',
    artist: 'The Weeknd',
    date: 'Sep 02, 2023',
    venue: 'Wembley Stadium',
    location: 'London, UK',
    rating: 10,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDds_ZA8sLmjDbjvzIRDlZlDfDc-1gv6J_BF3dAGokKP-LgxtSC-uDqQ53hZzOskuc9XS3Y_gKgKtT5i3HSDE6iE0mRd5TLN3AKapzAuFUhMfjDM2PO05uLQ1MMyege0AAL40BR1MpNtxh-wRojAlJ9TnigQHx2m7Yod7mw2F61f6v3mh3HB1MLKAxmXfEFZtI7Tv76qUAU5CSqfqfiIgy86SKqLaZ04ssHDtIE5PtcACfsoihIKHY3EhGFRlHvslWU8WWAhkg1VA',
    emojis: ['🔥', '🕺', '🌑'],
    tags: ['Stadium Tour', 'R&B'],
    audioQuality: 9.8,
    visualsQuality: 10,
    crowdEnergy: 9.5,
    section: 'Golden Circle',
    row: 'Standing',
    notes: 'The moon structure was massive. Vocal performance was pristine.',
    images: [],
    genre: 'R&B'
  },
  {
    id: '3',
    artist: 'Arctic Monkeys',
    date: 'Aug 15, 2023',
    venue: 'Ziggo Dome',
    location: 'Amsterdam, NL',
    rating: 8.5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsx9xwlnSVOCKgHeUhvhvyp3T5iBqx70wXvE6QjNAOUYAhPXyOqEJsbqB0uXGQ40yixsELqKpKVKbHbK0Z2LlwSFYCaOqr7yt8HgnDG8L-IJS3_gazZtYeEcnv2rb8slczZhFM4xMlAFa0kF3Ot0moCqP3OJ0ki0tIX-W_Tag1yJ-d9j705cTknNjAwwfSqbogNFO_sk9ZwLXM4AZapSdIE9EwaiOdyrDR744Xz9syI2sEHjcYxvBo-9gzwG6GrYNLESB602c9jA',
    emojis: ['🎸', '🍻'],
    tags: ['Indie Rock', 'Band'],
    audioQuality: 8.5,
    visualsQuality: 7.0,
    crowdEnergy: 9.0,
    section: 'Floor',
    row: 'GA',
    notes: 'Classic setlist. Alex Turner has so much swagger.',
    images: [],
    genre: 'Indie'
  }
];

export const MOCK_USER: UserStats = {
    concertCount: 42,
    artistCount: 38,
    topVenue: 'Wembley Stadium'
};

export const TOP_ARTISTS: ArtistStat[] = [
    { id: '1', name: 'Taylor Swift', genre: 'Pop, Country', showCount: 4, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxGS2JUbAsWO18dDK8IhpO_0I-YZeKDqR3aHiYp-aoHS1tFaC-MJRxzrdH_sgLcgE6CRrZ9gW5faxs_z0qd9cuhTjCAXEsrwHFCtHfEws6K7S6ExnD8N1wTjlLHf6L4hZx6QMAzDq5ebJjHGll7u5HR7WRTWkLsqafUvnJIGq7JvKT3XSBzKTG1qTtxEGRPa-kPewwM1X0Km3C_Lbw4oSVAK4e_UCDMJaU4HDyQCbmnGdccyNb3fLeSK-11r6XEYakQal8H2Gx6Q', rank: 1 },
    { id: '2', name: 'The Weeknd', genre: 'R&B, Pop', showCount: 3, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zOHbW1C7s2dZr9FCWOQsXSWT5YQN23g_kXgSgjvnD5QSi6qvrQEVdtfSIm4_Eb52XUC3C69dcgDWTQqPnJEssJB0UGij9luxJ0qPgnFt_TQnQTy8Dxk1lQXYlTkWoMrI1ULf3gCSCzL3O8vuapUxwaMGuUSMddXGI7U2Xr2-75hTM1XhJozOxLPmDgZlZFjJV7k1eUft4IgvaCHt00yTlTy9JzqlU96dVvutIaSu2w02WXK_6H9-_HCCpB_LYBCzbkvydmSeng', rank: 2 },
    { id: '3', name: 'Arctic Monkeys', genre: 'Indie Rock', showCount: 2, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfkz9bk8isR_uvY3mGsquuOkWLoMaJI9fBHqpFUpplyXCeRBEPP2msbdVEt-i62Wi5a7mKYC4jYTFmVH2egnHvubV7_XME-7dSWGssyHfE7gEXUwoE6yasPnD36_NT76Ajr1a2EEP9pnSAExd3u1Dl4N4YHr3B0zWv4mN_v1h1lclsp4-uyq7sSeeg21mTszjNGKh6BSqSUmwMz0wJktxuEjjEpMeY9Lms_CN5ytW4q4tuFEYPsea9EXY-tw9LQyGidxAEZBBhw', rank: 3 }
];
